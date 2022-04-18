module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1650257737082, function(require, module, exports) {
/**
 * Module dependencies.
 */

var http = require('http');

/**
 * Invoking the library as a function delegates to attach if the first argument
 * is an `http.Server`.
 *
 * If there are no arguments or the first argument is an options object, then
 * a new Server instance is returned.
 *
 * @param {http.Server} server (if specified, will be attached to by the new Server instance)
 * @param {Object} options
 * @return {Server} engine server
 * @api public
 */

exports = module.exports = function () {
  // backwards compatible use as `.attach`
  // if first argument is an http server
  if (arguments.length && arguments[0] instanceof http.Server) {
    return attach.apply(this, arguments);
  }

  // if first argument is not an http server, then just make a regular eio server
  return exports.Server.apply(null, arguments);
};

/**
 * Protocol revision number.
 *
 * @api public
 */

exports.protocol = 1;

/**
 * Expose Server constructor.
 *
 * @api public
 */

exports.Server = require('./server');

/**
 * Expose Socket constructor.
 *
 * @api public
 */

exports.Socket = require('./socket');

/**
 * Expose Transport constructor.
 *
 * @api public
 */

exports.Transport = require('./transport');

/**
 * Expose mutable list of available transports.
 *
 * @api public
 */

exports.transports = require('./transports');

/**
 * Exports parser.
 *
 * @api public
 */

exports.parser = require('engine.io-parser');

/**
 * Creates an http.Server exclusively used for WS upgrades.
 *
 * @param {Number} port
 * @param {Function} callback
 * @param {Object} options
 * @return {Server} websocket.io server
 * @api public
 */

exports.listen = listen;

function listen (port, options, fn) {
  if ('function' === typeof options) {
    fn = options;
    options = {};
  }

  var server = http.createServer(function (req, res) {
    res.writeHead(501);
    res.end('Not Implemented');
  });

  // create engine server
  var engine = exports.attach(server, options);
  engine.httpServer = server;

  server.listen(port, fn);

  return engine;
}

/**
 * Captures upgrade requests for a http.Server.
 *
 * @param {http.Server} server
 * @param {Object} options
 * @return {Server} engine server
 * @api public
 */

exports.attach = attach;

function attach (server, options) {
  var engine = new exports.Server(options);
  engine.attach(server, options);
  return engine;
}

}, function(modId) {var map = {"./server":1650257737083,"./socket":1650257737090,"./transport":1650257737087,"./transports":1650257737084}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737083, function(require, module, exports) {

/**
 * Module dependencies.
 */

var qs = require('querystring');
var parse = require('url').parse;
var base64id = require('base64id');
var transports = require('./transports');
var EventEmitter = require('events').EventEmitter;
var Socket = require('./socket');
var util = require('util');
var debug = require('debug')('engine');
var cookieMod = require('cookie');

/**
 * Module exports.
 */

module.exports = Server;

/**
 * Server constructor.
 *
 * @param {Object} options
 * @api public
 */

function Server (opts) {
  if (!(this instanceof Server)) {
    return new Server(opts);
  }

  this.clients = {};
  this.clientsCount = 0;

  opts = opts || {};

  this.wsEngine = opts.wsEngine || process.env.EIO_WS_ENGINE || 'ws';
  this.pingTimeout = opts.pingTimeout || 5000;
  this.pingInterval = opts.pingInterval || 25000;
  this.upgradeTimeout = opts.upgradeTimeout || 10000;
  this.maxHttpBufferSize = opts.maxHttpBufferSize || 10E7;
  this.transports = opts.transports || Object.keys(transports);
  this.allowUpgrades = false !== opts.allowUpgrades;
  this.allowRequest = opts.allowRequest;
  this.cookie = false !== opts.cookie ? (opts.cookie || 'io') : false;
  this.cookiePath = false !== opts.cookiePath ? (opts.cookiePath || '/') : false;
  this.cookieHttpOnly = false !== opts.cookieHttpOnly;
  this.perMessageDeflate = opts.perMessageDeflate || false;
  this.httpCompression = false !== opts.httpCompression ? (opts.httpCompression || {}) : false;
  this.initialPacket = opts.initialPacket;

  var self = this;

  // initialize compression options
  ['perMessageDeflate', 'httpCompression'].forEach(function (type) {
    var compression = self[type];
    if (true === compression) self[type] = compression = {};
    if (compression && null == compression.threshold) {
      compression.threshold = 1024;
    }
  });

  this.init();
}

/**
 * Protocol errors mappings.
 */

Server.errors = {
  UNKNOWN_TRANSPORT: 0,
  UNKNOWN_SID: 1,
  BAD_HANDSHAKE_METHOD: 2,
  BAD_REQUEST: 3,
  FORBIDDEN: 4
};

Server.errorMessages = {
  0: 'Transport unknown',
  1: 'Session ID unknown',
  2: 'Bad handshake method',
  3: 'Bad request',
  4: 'Forbidden'
};

/**
 * Inherits from EventEmitter.
 */

util.inherits(Server, EventEmitter);

/**
 * Initialize websocket server
 *
 * @api private
 */

Server.prototype.init = function () {
  if (!~this.transports.indexOf('websocket')) return;

  if (this.ws) this.ws.close();

  // add explicit require for bundlers like webpack
  var wsModule = this.wsEngine === 'ws' ? require('ws') : require(this.wsEngine);
  this.ws = new wsModule.Server({
    noServer: true,
    clientTracking: false,
    perMessageDeflate: this.perMessageDeflate,
    maxPayload: this.maxHttpBufferSize
  });
};

/**
 * Returns a list of available transports for upgrade given a certain transport.
 *
 * @return {Array}
 * @api public
 */

Server.prototype.upgrades = function (transport) {
  if (!this.allowUpgrades) return [];
  return transports[transport].upgradesTo || [];
};

/**
 * Verifies a request.
 *
 * @param {http.IncomingMessage}
 * @return {Boolean} whether the request is valid
 * @api private
 */

Server.prototype.verify = function (req, upgrade, fn) {
  // transport check
  var transport = req._query.transport;
  if (!~this.transports.indexOf(transport)) {
    debug('unknown transport "%s"', transport);
    return fn(Server.errors.UNKNOWN_TRANSPORT, false);
  }

  // 'Origin' header check
  var isOriginInvalid = checkInvalidHeaderChar(req.headers.origin);
  if (isOriginInvalid) {
    req.headers.origin = null;
    debug('origin header invalid');
    return fn(Server.errors.BAD_REQUEST, false);
  }

  // sid check
  var sid = req._query.sid;
  if (sid) {
    if (!this.clients.hasOwnProperty(sid)) {
      debug('unknown sid "%s"', sid);
      return fn(Server.errors.UNKNOWN_SID, false);
    }
    if (!upgrade && this.clients[sid].transport.name !== transport) {
      debug('bad request: unexpected transport without upgrade');
      return fn(Server.errors.BAD_REQUEST, false);
    }
  } else {
    // handshake is GET only
    if ('GET' !== req.method) return fn(Server.errors.BAD_HANDSHAKE_METHOD, false);
    if (!this.allowRequest) return fn(null, true);
    return this.allowRequest(req, fn);
  }

  fn(null, true);
};

/**
 * Prepares a request by processing the query string.
 *
 * @api private
 */

Server.prototype.prepare = function (req) {
  // try to leverage pre-existing `req._query` (e.g: from connect)
  if (!req._query) {
    req._query = ~req.url.indexOf('?') ? qs.parse(parse(req.url).query) : {};
  }
};

/**
 * Closes all clients.
 *
 * @api public
 */

Server.prototype.close = function () {
  debug('closing all open clients');
  for (var i in this.clients) {
    if (this.clients.hasOwnProperty(i)) {
      this.clients[i].close(true);
    }
  }
  if (this.ws) {
    debug('closing webSocketServer');
    this.ws.close();
    // don't delete this.ws because it can be used again if the http server starts listening again
  }
  return this;
};

/**
 * Handles an Engine.IO HTTP request.
 *
 * @param {http.IncomingMessage} request
 * @param {http.ServerResponse|http.OutgoingMessage} response
 * @api public
 */

Server.prototype.handleRequest = function (req, res) {
  debug('handling "%s" http request "%s"', req.method, req.url);
  this.prepare(req);
  req.res = res;

  var self = this;
  this.verify(req, false, function (err, success) {
    if (!success) {
      sendErrorMessage(req, res, err);
      return;
    }

    if (req._query.sid) {
      debug('setting new request for existing client');
      self.clients[req._query.sid].transport.onRequest(req);
    } else {
      self.handshake(req._query.transport, req);
    }
  });
};

/**
 * Sends an Engine.IO Error Message
 *
 * @param {http.ServerResponse} response
 * @param {code} error code
 * @api private
 */

function sendErrorMessage (req, res, code) {
  var headers = { 'Content-Type': 'application/json' };

  var isForbidden = !Server.errorMessages.hasOwnProperty(code);
  if (isForbidden) {
    res.writeHead(403, headers);
    res.end(JSON.stringify({
      code: Server.errors.FORBIDDEN,
      message: code || Server.errorMessages[Server.errors.FORBIDDEN]
    }));
    return;
  }
  if (req.headers.origin) {
    headers['Access-Control-Allow-Credentials'] = 'true';
    headers['Access-Control-Allow-Origin'] = req.headers.origin;
  } else {
    headers['Access-Control-Allow-Origin'] = '*';
  }
  if (res !== undefined) {
    res.writeHead(400, headers);
    res.end(JSON.stringify({
      code: code,
      message: Server.errorMessages[code]
    }));
  }
}

/**
 * generate a socket id.
 * Overwrite this method to generate your custom socket id
 *
 * @param {Object} request object
 * @api public
 */

Server.prototype.generateId = function (req) {
  return base64id.generateId();
};

/**
 * Handshakes a new client.
 *
 * @param {String} transport name
 * @param {Object} request object
 * @api private
 */

Server.prototype.handshake = function (transportName, req) {
  var id = this.generateId(req);

  debug('handshaking client "%s"', id);

  try {
    var transport = new transports[transportName](req);
    if ('polling' === transportName) {
      transport.maxHttpBufferSize = this.maxHttpBufferSize;
      transport.httpCompression = this.httpCompression;
    } else if ('websocket' === transportName) {
      transport.perMessageDeflate = this.perMessageDeflate;
    }

    if (req._query && req._query.b64) {
      transport.supportsBinary = false;
    } else {
      transport.supportsBinary = true;
    }
  } catch (e) {
    debug('error handshaking to transport "%s"', transportName);
    sendErrorMessage(req, req.res, Server.errors.BAD_REQUEST);
    return;
  }
  var socket = new Socket(id, this, transport, req);
  var self = this;

  if (false !== this.cookie) {
    transport.on('headers', function (headers) {
      if (typeof self.cookie === 'object') {
        headers['Set-Cookie'] = cookieMod.serialize(self.cookie.name, id, self.cookie);
      } else {
        headers['Set-Cookie'] = cookieMod.serialize(self.cookie, id,
          {
            path: self.cookiePath,
            httpOnly: self.cookiePath ? self.cookieHttpOnly : false,
            sameSite: true
          });
      }
    });
  }

  transport.onRequest(req);

  this.clients[id] = socket;
  this.clientsCount++;

  socket.once('close', function () {
    delete self.clients[id];
    self.clientsCount--;
  });

  this.emit('connection', socket);
};

/**
 * Handles an Engine.IO HTTP Upgrade.
 *
 * @api public
 */

Server.prototype.handleUpgrade = function (req, socket, upgradeHead) {
  this.prepare(req);

  var self = this;
  this.verify(req, true, function (err, success) {
    if (!success) {
      abortConnection(socket, err);
      return;
    }

    var head = Buffer.from(upgradeHead); // eslint-disable-line node/no-deprecated-api
    upgradeHead = null;

    // delegate to ws
    self.ws.handleUpgrade(req, socket, head, function (conn) {
      self.onWebSocket(req, conn);
    });
  });
};

/**
 * Called upon a ws.io connection.
 *
 * @param {ws.Socket} websocket
 * @api private
 */

Server.prototype.onWebSocket = function (req, socket) {
  socket.on('error', onUpgradeError);

  if (transports[req._query.transport] !== undefined && !transports[req._query.transport].prototype.handlesUpgrades) {
    debug('transport doesnt handle upgraded requests');
    socket.close();
    return;
  }

  // get client id
  var id = req._query.sid;

  // keep a reference to the ws.Socket
  req.websocket = socket;

  if (id) {
    var client = this.clients[id];
    if (!client) {
      debug('upgrade attempt for closed client');
      socket.close();
    } else if (client.upgrading) {
      debug('transport has already been trying to upgrade');
      socket.close();
    } else if (client.upgraded) {
      debug('transport had already been upgraded');
      socket.close();
    } else {
      debug('upgrading existing transport');

      // transport error handling takes over
      socket.removeListener('error', onUpgradeError);

      var transport = new transports[req._query.transport](req);
      if (req._query && req._query.b64) {
        transport.supportsBinary = false;
      } else {
        transport.supportsBinary = true;
      }
      transport.perMessageDeflate = this.perMessageDeflate;
      client.maybeUpgrade(transport);
    }
  } else {
    // transport error handling takes over
    socket.removeListener('error', onUpgradeError);

    this.handshake(req._query.transport, req);
  }

  function onUpgradeError () {
    debug('websocket error before upgrade');
    // socket.close() not needed
  }
};

/**
 * Captures upgrade requests for a http.Server.
 *
 * @param {http.Server} server
 * @param {Object} options
 * @api public
 */

Server.prototype.attach = function (server, options) {
  var self = this;
  options = options || {};
  var path = (options.path || '/engine.io').replace(/\/$/, '');

  var destroyUpgradeTimeout = options.destroyUpgradeTimeout || 1000;

  // normalize path
  path += '/';

  function check (req) {
    if ('OPTIONS' === req.method && false === options.handlePreflightRequest) {
      return false;
    }
    return path === req.url.substr(0, path.length);
  }

  // cache and clean up listeners
  var listeners = server.listeners('request').slice(0);
  server.removeAllListeners('request');
  server.on('close', self.close.bind(self));
  server.on('listening', self.init.bind(self));

  // add request handler
  server.on('request', function (req, res) {
    if (check(req)) {
      debug('intercepting request for path "%s"', path);
      if ('OPTIONS' === req.method && 'function' === typeof options.handlePreflightRequest) {
        options.handlePreflightRequest.call(server, req, res);
      } else {
        self.handleRequest(req, res);
      }
    } else {
      for (var i = 0, l = listeners.length; i < l; i++) {
        listeners[i].call(server, req, res);
      }
    }
  });

  if (~self.transports.indexOf('websocket')) {
    server.on('upgrade', function (req, socket, head) {
      if (check(req)) {
        self.handleUpgrade(req, socket, head);
      } else if (false !== options.destroyUpgrade) {
        // default node behavior is to disconnect when no handlers
        // but by adding a handler, we prevent that
        // and if no eio thing handles the upgrade
        // then the socket needs to die!
        setTimeout(function () {
          if (socket.writable && socket.bytesWritten <= 0) {
            return socket.end();
          }
        }, destroyUpgradeTimeout);
      }
    });
  }
};

/**
 * Closes the connection
 *
 * @param {net.Socket} socket
 * @param {code} error code
 * @api private
 */

function abortConnection (socket, code) {
  socket.on('error', () => {
    debug('ignoring error from closed connection');
  });
  if (socket.writable) {
    var message = Server.errorMessages.hasOwnProperty(code) ? Server.errorMessages[code] : String(code || '');
    var length = Buffer.byteLength(message);
    socket.write(
      'HTTP/1.1 400 Bad Request\r\n' +
      'Connection: close\r\n' +
      'Content-type: text/html\r\n' +
      'Content-Length: ' + length + '\r\n' +
      '\r\n' +
      message
    );
  }
  socket.destroy();
}

/* eslint-disable */

/**
 * From https://github.com/nodejs/node/blob/v8.4.0/lib/_http_common.js#L303-L354
 *
 * True if val contains an invalid field-vchar
 *  field-value    = *( field-content / obs-fold )
 *  field-content  = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 *  field-vchar    = VCHAR / obs-text
 *
 * checkInvalidHeaderChar() is currently designed to be inlinable by v8,
 * so take care when making changes to the implementation so that the source
 * code size does not exceed v8's default max_inlined_source_size setting.
 **/
var validHdrChars = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, // 0 - 15
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 16 - 31
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 32 - 47
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 48 - 63
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 64 - 79
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 80 - 95
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 96 - 111
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, // 112 - 127
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 128 ...
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1  // ... 255
];

function checkInvalidHeaderChar(val) {
  val += '';
  if (val.length < 1)
    return false;
  if (!validHdrChars[val.charCodeAt(0)]) {
    debug('invalid header, index 0, char "%s"', val.charCodeAt(0));
    return true;
  }
  if (val.length < 2)
    return false;
  if (!validHdrChars[val.charCodeAt(1)]) {
    debug('invalid header, index 1, char "%s"', val.charCodeAt(1));
    return true;
  }
  if (val.length < 3)
    return false;
  if (!validHdrChars[val.charCodeAt(2)]) {
    debug('invalid header, index 2, char "%s"', val.charCodeAt(2));
    return true;
  }
  if (val.length < 4)
    return false;
  if (!validHdrChars[val.charCodeAt(3)]) {
    debug('invalid header, index 3, char "%s"', val.charCodeAt(3));
    return true;
  }
  for (var i = 4; i < val.length; ++i) {
    if (!validHdrChars[val.charCodeAt(i)]) {
      debug('invalid header, index "%i", char "%s"', i, val.charCodeAt(i));
      return true;
    }
  }
  return false;
}

}, function(modId) { var map = {"./transports":1650257737084,"./socket":1650257737090}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737084, function(require, module, exports) {

/**
 * Module dependencies.
 */

var XHR = require('./polling-xhr');
var JSONP = require('./polling-jsonp');

/**
 * Export transports.
 */

module.exports = exports = {
  polling: polling,
  websocket: require('./websocket')
};

/**
 * Export upgrades map.
 */

exports.polling.upgradesTo = ['websocket'];

/**
 * Polling polymorphic constructor.
 *
 * @api private
 */

function polling (req) {
  if ('string' === typeof req._query.j) {
    return new JSONP(req);
  } else {
    return new XHR(req);
  }
}

}, function(modId) { var map = {"./polling-xhr":1650257737085,"./polling-jsonp":1650257737088,"./websocket":1650257737089}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737085, function(require, module, exports) {

/**
 * Module dependencies.
 */

var Polling = require('./polling');
var util = require('util');

/**
 * Module exports.
 */

module.exports = XHR;

/**
 * Ajax polling transport.
 *
 * @api public
 */

function XHR (req) {
  Polling.call(this, req);
}

/**
 * Inherits from Polling.
 */

util.inherits(XHR, Polling);

/**
 * Overrides `onRequest` to handle `OPTIONS`..
 *
 * @param {http.IncomingMessage}
 * @api private
 */

XHR.prototype.onRequest = function (req) {
  if ('OPTIONS' === req.method) {
    var res = req.res;
    var headers = this.headers(req);
    headers['Access-Control-Allow-Headers'] = 'Content-Type';
    res.writeHead(200, headers);
    res.end();
  } else {
    Polling.prototype.onRequest.call(this, req);
  }
};

/**
 * Returns headers for a response.
 *
 * @param {http.IncomingMessage} request
 * @param {Object} extra headers
 * @api private
 */

XHR.prototype.headers = function (req, headers) {
  headers = headers || {};

  if (req.headers.origin) {
    headers['Access-Control-Allow-Credentials'] = 'true';
    headers['Access-Control-Allow-Origin'] = req.headers.origin;
  } else {
    headers['Access-Control-Allow-Origin'] = '*';
  }

  return Polling.prototype.headers.call(this, req, headers);
};

}, function(modId) { var map = {"./polling":1650257737086}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737086, function(require, module, exports) {

/**
 * Module requirements.
 */

var Transport = require('../transport');
var parser = require('engine.io-parser');
var zlib = require('zlib');
var accepts = require('accepts');
var util = require('util');
var debug = require('debug')('engine:polling');

var compressionMethods = {
  gzip: zlib.createGzip,
  deflate: zlib.createDeflate
};

/**
 * Exports the constructor.
 */

module.exports = Polling;

/**
 * HTTP polling constructor.
 *
 * @api public.
 */

function Polling (req) {
  Transport.call(this, req);

  this.closeTimeout = 30 * 1000;
  this.maxHttpBufferSize = null;
  this.httpCompression = null;
}

/**
 * Inherits from Transport.
 *
 * @api public.
 */

util.inherits(Polling, Transport);

/**
 * Transport name
 *
 * @api public
 */

Polling.prototype.name = 'polling';

/**
 * Overrides onRequest.
 *
 * @param {http.IncomingMessage}
 * @api private
 */

Polling.prototype.onRequest = function (req) {
  var res = req.res;

  if ('GET' === req.method) {
    this.onPollRequest(req, res);
  } else if ('POST' === req.method) {
    this.onDataRequest(req, res);
  } else {
    res.writeHead(500);
    res.end();
  }
};

/**
 * The client sends a request awaiting for us to send data.
 *
 * @api private
 */

Polling.prototype.onPollRequest = function (req, res) {
  if (this.req) {
    debug('request overlap');
    // assert: this.res, '.req and .res should be (un)set together'
    this.onError('overlap from client');
    res.writeHead(500);
    res.end();
    return;
  }

  debug('setting request');

  this.req = req;
  this.res = res;

  var self = this;

  function onClose () {
    self.onError('poll connection closed prematurely');
  }

  function cleanup () {
    req.removeListener('close', onClose);
    self.req = self.res = null;
  }

  req.cleanup = cleanup;
  req.on('close', onClose);

  this.writable = true;
  this.emit('drain');

  // if we're still writable but had a pending close, trigger an empty send
  if (this.writable && this.shouldClose) {
    debug('triggering empty send to append close packet');
    this.send([{ type: 'noop' }]);
  }
};

/**
 * The client sends a request with data.
 *
 * @api private
 */

Polling.prototype.onDataRequest = function (req, res) {
  if (this.dataReq) {
    // assert: this.dataRes, '.dataReq and .dataRes should be (un)set together'
    this.onError('data request overlap from client');
    res.writeHead(500);
    res.end();
    return;
  }

  var isBinary = 'application/octet-stream' === req.headers['content-type'];

  this.dataReq = req;
  this.dataRes = res;

  var chunks = isBinary ? Buffer.concat([]) : '';
  var self = this;

  function cleanup () {
    req.removeListener('data', onData);
    req.removeListener('end', onEnd);
    req.removeListener('close', onClose);
    self.dataReq = self.dataRes = chunks = null;
  }

  function onClose () {
    cleanup();
    self.onError('data request connection closed prematurely');
  }

  function onData (data) {
    var contentLength;
    if (isBinary) {
      chunks = Buffer.concat([chunks, data]);
      contentLength = chunks.length;
    } else {
      chunks += data;
      contentLength = Buffer.byteLength(chunks);
    }

    if (contentLength > self.maxHttpBufferSize) {
      chunks = isBinary ? Buffer.concat([]) : '';
      req.connection.destroy();
    }
  }

  function onEnd () {
    self.onData(chunks);

    var headers = {
      // text/html is required instead of text/plain to avoid an
      // unwanted download dialog on certain user-agents (GH-43)
      'Content-Type': 'text/html',
      'Content-Length': 2
    };

    res.writeHead(200, self.headers(req, headers));
    res.end('ok');
    cleanup();
  }

  req.on('close', onClose);
  if (!isBinary) req.setEncoding('utf8');
  req.on('data', onData);
  req.on('end', onEnd);
};

/**
 * Processes the incoming data payload.
 *
 * @param {String} encoded payload
 * @api private
 */

Polling.prototype.onData = function (data) {
  debug('received "%s"', data);
  var self = this;
  var callback = function (packet) {
    if ('close' === packet.type) {
      debug('got xhr close packet');
      self.onClose();
      return false;
    }

    self.onPacket(packet);
  };

  parser.decodePayload(data, callback);
};

/**
 * Overrides onClose.
 *
 * @api private
 */

Polling.prototype.onClose = function () {
  if (this.writable) {
    // close pending poll request
    this.send([{ type: 'noop' }]);
  }
  Transport.prototype.onClose.call(this);
};

/**
 * Writes a packet payload.
 *
 * @param {Object} packet
 * @api private
 */

Polling.prototype.send = function (packets) {
  this.writable = false;

  if (this.shouldClose) {
    debug('appending close packet to payload');
    packets.push({ type: 'close' });
    this.shouldClose();
    this.shouldClose = null;
  }

  var self = this;
  parser.encodePayload(packets, this.supportsBinary, function (data) {
    var compress = packets.some(function (packet) {
      return packet.options && packet.options.compress;
    });
    self.write(data, { compress: compress });
  });
};

/**
 * Writes data as response to poll request.
 *
 * @param {String} data
 * @param {Object} options
 * @api private
 */

Polling.prototype.write = function (data, options) {
  debug('writing "%s"', data);
  var self = this;
  this.doWrite(data, options, function () {
    self.req.cleanup();
  });
};

/**
 * Performs the write.
 *
 * @api private
 */

Polling.prototype.doWrite = function (data, options, callback) {
  var self = this;

  // explicit UTF-8 is required for pages not served under utf
  var isString = typeof data === 'string';
  var contentType = isString
    ? 'text/plain; charset=UTF-8'
    : 'application/octet-stream';

  var headers = {
    'Content-Type': contentType
  };

  if (!this.httpCompression || !options.compress) {
    respond(data);
    return;
  }

  var len = isString ? Buffer.byteLength(data) : data.length;
  if (len < this.httpCompression.threshold) {
    respond(data);
    return;
  }

  var encoding = accepts(this.req).encodings(['gzip', 'deflate']);
  if (!encoding) {
    respond(data);
    return;
  }

  this.compress(data, encoding, function (err, data) {
    if (err) {
      self.res.writeHead(500);
      self.res.end();
      callback(err);
      return;
    }

    headers['Content-Encoding'] = encoding;
    respond(data);
  });

  function respond (data) {
    headers['Content-Length'] = 'string' === typeof data ? Buffer.byteLength(data) : data.length;
    self.res.writeHead(200, self.headers(self.req, headers));
    self.res.end(data);
    callback();
  }
};

/**
 * Compresses data.
 *
 * @api private
 */

Polling.prototype.compress = function (data, encoding, callback) {
  debug('compressing');

  var buffers = [];
  var nread = 0;

  compressionMethods[encoding](this.httpCompression)
    .on('error', callback)
    .on('data', function (chunk) {
      buffers.push(chunk);
      nread += chunk.length;
    })
    .on('end', function () {
      callback(null, Buffer.concat(buffers, nread));
    })
    .end(data);
};

/**
 * Closes the transport.
 *
 * @api private
 */

Polling.prototype.doClose = function (fn) {
  debug('closing');

  var self = this;
  var closeTimeoutTimer;

  if (this.dataReq) {
    debug('aborting ongoing data request');
    this.dataReq.destroy();
  }

  if (this.writable) {
    debug('transport writable - closing right away');
    this.send([{ type: 'close' }]);
    onClose();
  } else if (this.discarded) {
    debug('transport discarded - closing right away');
    onClose();
  } else {
    debug('transport not writable - buffering orderly close');
    this.shouldClose = onClose;
    closeTimeoutTimer = setTimeout(onClose, this.closeTimeout);
  }

  function onClose () {
    clearTimeout(closeTimeoutTimer);
    fn();
    self.onClose();
  }
};

/**
 * Returns headers for a response.
 *
 * @param {http.IncomingMessage} request
 * @param {Object} extra headers
 * @api private
 */

Polling.prototype.headers = function (req, headers) {
  headers = headers || {};

  // prevent XSS warnings on IE
  // https://github.com/LearnBoost/socket.io/pull/1333
  var ua = req.headers['user-agent'];
  if (ua && (~ua.indexOf(';MSIE') || ~ua.indexOf('Trident/'))) {
    headers['X-XSS-Protection'] = '0';
  }

  this.emit('headers', headers);
  return headers;
};

}, function(modId) { var map = {"../transport":1650257737087}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737087, function(require, module, exports) {

/**
 * Module dependencies.
 */

var EventEmitter = require('events').EventEmitter;
var parser = require('engine.io-parser');
var util = require('util');
var debug = require('debug')('engine:transport');

/**
 * Expose the constructor.
 */

module.exports = Transport;

/**
 * Noop function.
 *
 * @api private
 */

function noop () {}

/**
 * Transport constructor.
 *
 * @param {http.IncomingMessage} request
 * @api public
 */

function Transport (req) {
  this.readyState = 'open';
  this.discarded = false;
}

/**
 * Inherits from EventEmitter.
 */

util.inherits(Transport, EventEmitter);

/**
 * Flags the transport as discarded.
 *
 * @api private
 */

Transport.prototype.discard = function () {
  this.discarded = true;
};

/**
 * Called with an incoming HTTP request.
 *
 * @param {http.IncomingMessage} request
 * @api private
 */

Transport.prototype.onRequest = function (req) {
  debug('setting request');
  this.req = req;
};

/**
 * Closes the transport.
 *
 * @api private
 */

Transport.prototype.close = function (fn) {
  if ('closed' === this.readyState || 'closing' === this.readyState) return;

  this.readyState = 'closing';
  this.doClose(fn || noop);
};

/**
 * Called with a transport error.
 *
 * @param {String} message error
 * @param {Object} error description
 * @api private
 */

Transport.prototype.onError = function (msg, desc) {
  if (this.listeners('error').length) {
    var err = new Error(msg);
    err.type = 'TransportError';
    err.description = desc;
    this.emit('error', err);
  } else {
    debug('ignored transport error %s (%s)', msg, desc);
  }
};

/**
 * Called with parsed out a packets from the data stream.
 *
 * @param {Object} packet
 * @api private
 */

Transport.prototype.onPacket = function (packet) {
  this.emit('packet', packet);
};

/**
 * Called with the encoded packet data.
 *
 * @param {String} data
 * @api private
 */

Transport.prototype.onData = function (data) {
  this.onPacket(parser.decodePacket(data));
};

/**
 * Called upon transport close.
 *
 * @api private
 */

Transport.prototype.onClose = function () {
  this.readyState = 'closed';
  this.emit('close');
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737088, function(require, module, exports) {

/**
 * Module dependencies.
 */

var Polling = require('./polling');
var qs = require('querystring');
var rDoubleSlashes = /\\\\n/g;
var rSlashes = /(\\)?\\n/g;
var util = require('util');

/**
 * Module exports.
 */

module.exports = JSONP;

/**
 * JSON-P polling transport.
 *
 * @api public
 */

function JSONP (req) {
  Polling.call(this, req);

  this.head = '___eio[' + (req._query.j || '').replace(/[^0-9]/g, '') + '](';
  this.foot = ');';
}

/**
 * Inherits from Polling.
 */

util.inherits(JSONP, Polling);

/**
 * Handles incoming data.
 * Due to a bug in \n handling by browsers, we expect a escaped string.
 *
 * @api private
 */

JSONP.prototype.onData = function (data) {
  // we leverage the qs module so that we get built-in DoS protection
  // and the fast alternative to decodeURIComponent
  data = qs.parse(data).d;
  if ('string' === typeof data) {
    // client will send already escaped newlines as \\\\n and newlines as \\n
    // \\n must be replaced with \n and \\\\n with \\n
    data = data.replace(rSlashes, function (match, slashes) {
      return slashes ? match : '\n';
    });
    Polling.prototype.onData.call(this, data.replace(rDoubleSlashes, '\\n'));
  }
};

/**
 * Performs the write.
 *
 * @api private
 */

JSONP.prototype.doWrite = function (data, options, callback) {
  // we must output valid javascript, not valid json
  // see: http://timelessrepo.com/json-isnt-a-javascript-subset
  var js = JSON.stringify(data)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');

  // prepare response
  data = this.head + js + this.foot;

  Polling.prototype.doWrite.call(this, data, options, callback);
};

}, function(modId) { var map = {"./polling":1650257737086}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737089, function(require, module, exports) {

/**
 * Module dependencies.
 */

var Transport = require('../transport');
var parser = require('engine.io-parser');
var util = require('util');
var debug = require('debug')('engine:ws');

/**
 * Export the constructor.
 */

module.exports = WebSocket;

/**
 * WebSocket transport
 *
 * @param {http.IncomingMessage}
 * @api public
 */

function WebSocket (req) {
  Transport.call(this, req);
  var self = this;
  this.socket = req.websocket;
  this.socket.on('message', this.onData.bind(this));
  this.socket.once('close', this.onClose.bind(this));
  this.socket.on('error', this.onError.bind(this));
  this.socket.on('headers', onHeaders);
  this.writable = true;
  this.perMessageDeflate = null;

  function onHeaders (headers) {
    self.emit('headers', headers);
  }
}

/**
 * Inherits from Transport.
 */

util.inherits(WebSocket, Transport);

/**
 * Transport name
 *
 * @api public
 */

WebSocket.prototype.name = 'websocket';

/**
 * Advertise upgrade support.
 *
 * @api public
 */

WebSocket.prototype.handlesUpgrades = true;

/**
 * Advertise framing support.
 *
 * @api public
 */

WebSocket.prototype.supportsFraming = true;

/**
 * Processes the incoming data.
 *
 * @param {String} encoded packet
 * @api private
 */

WebSocket.prototype.onData = function (data) {
  debug('received "%s"', data);
  Transport.prototype.onData.call(this, data);
};

/**
 * Writes a packet payload.
 *
 * @param {Array} packets
 * @api private
 */

WebSocket.prototype.send = function (packets) {
  var self = this;

  for (var i = 0; i < packets.length; i++) {
    var packet = packets[i];
    parser.encodePacket(packet, self.supportsBinary, send);
  }

  function send (data) {
    debug('writing "%s"', data);

    // always creates a new object since ws modifies it
    var opts = {};
    if (packet.options) {
      opts.compress = packet.options.compress;
    }

    if (self.perMessageDeflate) {
      var len = 'string' === typeof data ? Buffer.byteLength(data) : data.length;
      if (len < self.perMessageDeflate.threshold) {
        opts.compress = false;
      }
    }

    self.writable = false;
    self.socket.send(data, opts, onEnd);
  }

  function onEnd (err) {
    if (err) return self.onError('write error', err.stack);
    self.writable = true;
    self.emit('drain');
  }
};

/**
 * Closes the transport.
 *
 * @api private
 */

WebSocket.prototype.doClose = function (fn) {
  debug('closing');
  this.socket.close();
  fn && fn();
};

}, function(modId) { var map = {"../transport":1650257737087}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737090, function(require, module, exports) {
/**
 * Module dependencies.
 */

var EventEmitter = require('events').EventEmitter;
var util = require('util');
var debug = require('debug')('engine:socket');

/**
 * Module exports.
 */

module.exports = Socket;

/**
 * Client class (abstract).
 *
 * @api private
 */

function Socket (id, server, transport, req) {
  this.id = id;
  this.server = server;
  this.upgrading = false;
  this.upgraded = false;
  this.readyState = 'opening';
  this.writeBuffer = [];
  this.packetsFn = [];
  this.sentCallbackFn = [];
  this.cleanupFn = [];
  this.request = req;

  // Cache IP since it might not be in the req later
  if (req.websocket && req.websocket._socket) {
    this.remoteAddress = req.websocket._socket.remoteAddress;
  } else {
    this.remoteAddress = req.connection.remoteAddress;
  }

  this.checkIntervalTimer = null;
  this.upgradeTimeoutTimer = null;
  this.pingTimeoutTimer = null;

  this.setTransport(transport);
  this.onOpen();
}

/**
 * Inherits from EventEmitter.
 */

util.inherits(Socket, EventEmitter);

/**
 * Called upon transport considered open.
 *
 * @api private
 */

Socket.prototype.onOpen = function () {
  this.readyState = 'open';

  // sends an `open` packet
  this.transport.sid = this.id;
  this.sendPacket('open', JSON.stringify({
    sid: this.id,
    upgrades: this.getAvailableUpgrades(),
    pingInterval: this.server.pingInterval,
    pingTimeout: this.server.pingTimeout
  }));

  if (this.server.initialPacket) {
    this.sendPacket('message', this.server.initialPacket);
  }

  this.emit('open');
  this.setPingTimeout();
};

/**
 * Called upon transport packet.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onPacket = function (packet) {
  if ('open' === this.readyState) {
    // export packet event
    debug('packet');
    this.emit('packet', packet);

    // Reset ping timeout on any packet, incoming data is a good sign of
    // other side's liveness
    this.setPingTimeout();

    switch (packet.type) {
      case 'ping':
        debug('got ping');
        this.sendPacket('pong');
        this.emit('heartbeat');
        break;

      case 'error':
        this.onClose('parse error');
        break;

      case 'message':
        this.emit('data', packet.data);
        this.emit('message', packet.data);
        break;
    }
  } else {
    debug('packet received with closed socket');
  }
};

/**
 * Called upon transport error.
 *
 * @param {Error} error object
 * @api private
 */

Socket.prototype.onError = function (err) {
  debug('transport error');
  this.onClose('transport error', err);
};

/**
 * Sets and resets ping timeout timer based on client pings.
 *
 * @api private
 */

Socket.prototype.setPingTimeout = function () {
  var self = this;
  clearTimeout(self.pingTimeoutTimer);
  self.pingTimeoutTimer = setTimeout(function () {
    self.onClose('ping timeout');
  }, self.server.pingInterval + self.server.pingTimeout);
};

/**
 * Attaches handlers for the given transport.
 *
 * @param {Transport} transport
 * @api private
 */

Socket.prototype.setTransport = function (transport) {
  var onError = this.onError.bind(this);
  var onPacket = this.onPacket.bind(this);
  var flush = this.flush.bind(this);
  var onClose = this.onClose.bind(this, 'transport close');

  this.transport = transport;
  this.transport.once('error', onError);
  this.transport.on('packet', onPacket);
  this.transport.on('drain', flush);
  this.transport.once('close', onClose);
  // this function will manage packet events (also message callbacks)
  this.setupSendCallback();

  this.cleanupFn.push(function () {
    transport.removeListener('error', onError);
    transport.removeListener('packet', onPacket);
    transport.removeListener('drain', flush);
    transport.removeListener('close', onClose);
  });
};

/**
 * Upgrades socket to the given transport
 *
 * @param {Transport} transport
 * @api private
 */

Socket.prototype.maybeUpgrade = function (transport) {
  debug('might upgrade socket transport from "%s" to "%s"'
    , this.transport.name, transport.name);

  this.upgrading = true;

  var self = this;

  // set transport upgrade timer
  self.upgradeTimeoutTimer = setTimeout(function () {
    debug('client did not complete upgrade - closing transport');
    cleanup();
    if ('open' === transport.readyState) {
      transport.close();
    }
  }, this.server.upgradeTimeout);

  function onPacket (packet) {
    if ('ping' === packet.type && 'probe' === packet.data) {
      transport.send([{ type: 'pong', data: 'probe' }]);
      self.emit('upgrading', transport);
      clearInterval(self.checkIntervalTimer);
      self.checkIntervalTimer = setInterval(check, 100);
    } else if ('upgrade' === packet.type && self.readyState !== 'closed') {
      debug('got upgrade packet - upgrading');
      cleanup();
      self.transport.discard();
      self.upgraded = true;
      self.clearTransport();
      self.setTransport(transport);
      self.emit('upgrade', transport);
      self.setPingTimeout();
      self.flush();
      if (self.readyState === 'closing') {
        transport.close(function () {
          self.onClose('forced close');
        });
      }
    } else {
      cleanup();
      transport.close();
    }
  }

  // we force a polling cycle to ensure a fast upgrade
  function check () {
    if ('polling' === self.transport.name && self.transport.writable) {
      debug('writing a noop packet to polling for fast upgrade');
      self.transport.send([{ type: 'noop' }]);
    }
  }

  function cleanup () {
    self.upgrading = false;

    clearInterval(self.checkIntervalTimer);
    self.checkIntervalTimer = null;

    clearTimeout(self.upgradeTimeoutTimer);
    self.upgradeTimeoutTimer = null;

    transport.removeListener('packet', onPacket);
    transport.removeListener('close', onTransportClose);
    transport.removeListener('error', onError);
    self.removeListener('close', onClose);
  }

  function onError (err) {
    debug('client did not complete upgrade - %s', err);
    cleanup();
    transport.close();
    transport = null;
  }

  function onTransportClose () {
    onError('transport closed');
  }

  function onClose () {
    onError('socket closed');
  }

  transport.on('packet', onPacket);
  transport.once('close', onTransportClose);
  transport.once('error', onError);

  self.once('close', onClose);
};

/**
 * Clears listeners and timers associated with current transport.
 *
 * @api private
 */

Socket.prototype.clearTransport = function () {
  var cleanup;

  var toCleanUp = this.cleanupFn.length;

  for (var i = 0; i < toCleanUp; i++) {
    cleanup = this.cleanupFn.shift();
    cleanup();
  }

  // silence further transport errors and prevent uncaught exceptions
  this.transport.on('error', function () {
    debug('error triggered by discarded transport');
  });

  // ensure transport won't stay open
  this.transport.close();

  clearTimeout(this.pingTimeoutTimer);
};

/**
 * Called upon transport considered closed.
 * Possible reasons: `ping timeout`, `client error`, `parse error`,
 * `transport error`, `server close`, `transport close`
 */

Socket.prototype.onClose = function (reason, description) {
  if ('closed' !== this.readyState) {
    this.readyState = 'closed';
    clearTimeout(this.pingTimeoutTimer);
    clearInterval(this.checkIntervalTimer);
    this.checkIntervalTimer = null;
    clearTimeout(this.upgradeTimeoutTimer);
    var self = this;
    // clean writeBuffer in next tick, so developers can still
    // grab the writeBuffer on 'close' event
    process.nextTick(function () {
      self.writeBuffer = [];
    });
    this.packetsFn = [];
    this.sentCallbackFn = [];
    this.clearTransport();
    this.emit('close', reason, description);
  }
};

/**
 * Setup and manage send callback
 *
 * @api private
 */

Socket.prototype.setupSendCallback = function () {
  var self = this;
  this.transport.on('drain', onDrain);

  this.cleanupFn.push(function () {
    self.transport.removeListener('drain', onDrain);
  });

  // the message was sent successfully, execute the callback
  function onDrain () {
    if (self.sentCallbackFn.length > 0) {
      var seqFn = self.sentCallbackFn.splice(0, 1)[0];
      if ('function' === typeof seqFn) {
        debug('executing send callback');
        seqFn(self.transport);
      } else if (Array.isArray(seqFn)) {
        debug('executing batch send callback');
        for (var l = seqFn.length, i = 0; i < l; i++) {
          if ('function' === typeof seqFn[i]) {
            seqFn[i](self.transport);
          }
        }
      }
    }
  }
};

/**
 * Sends a message packet.
 *
 * @param {String} message
 * @param {Object} options
 * @param {Function} callback
 * @return {Socket} for chaining
 * @api public
 */

Socket.prototype.send =
Socket.prototype.write = function (data, options, callback) {
  this.sendPacket('message', data, options, callback);
  return this;
};

/**
 * Sends a packet.
 *
 * @param {String} packet type
 * @param {String} optional, data
 * @param {Object} options
 * @api private
 */

Socket.prototype.sendPacket = function (type, data, options, callback) {
  if ('function' === typeof options) {
    callback = options;
    options = null;
  }

  options = options || {};
  options.compress = false !== options.compress;

  if ('closing' !== this.readyState && 'closed' !== this.readyState) {
    debug('sending packet "%s" (%s)', type, data);

    var packet = {
      type: type,
      options: options
    };
    if (data) packet.data = data;

    // exports packetCreate event
    this.emit('packetCreate', packet);

    this.writeBuffer.push(packet);

    // add send callback to object, if defined
    if (callback) this.packetsFn.push(callback);

    this.flush();
  }
};

/**
 * Attempts to flush the packets buffer.
 *
 * @api private
 */

Socket.prototype.flush = function () {
  if ('closed' !== this.readyState &&
                this.transport.writable &&
                this.writeBuffer.length) {
    debug('flushing buffer to transport');
    this.emit('flush', this.writeBuffer);
    this.server.emit('flush', this, this.writeBuffer);
    var wbuf = this.writeBuffer;
    this.writeBuffer = [];
    if (!this.transport.supportsFraming) {
      this.sentCallbackFn.push(this.packetsFn);
    } else {
      this.sentCallbackFn.push.apply(this.sentCallbackFn, this.packetsFn);
    }
    this.packetsFn = [];
    this.transport.send(wbuf);
    this.emit('drain');
    this.server.emit('drain', this);
  }
};

/**
 * Get available upgrades for this socket.
 *
 * @api private
 */

Socket.prototype.getAvailableUpgrades = function () {
  var availableUpgrades = [];
  var allUpgrades = this.server.upgrades(this.transport.name);
  for (var i = 0, l = allUpgrades.length; i < l; ++i) {
    var upg = allUpgrades[i];
    if (this.server.transports.indexOf(upg) !== -1) {
      availableUpgrades.push(upg);
    }
  }
  return availableUpgrades;
};

/**
 * Closes the socket and underlying transport.
 *
 * @param {Boolean} optional, discard
 * @return {Socket} for chaining
 * @api public
 */

Socket.prototype.close = function (discard) {
  if ('open' !== this.readyState) return;

  this.readyState = 'closing';

  if (this.writeBuffer.length) {
    this.once('drain', this.closeTransport.bind(this, discard));
    return;
  }

  this.closeTransport(discard);
};

/**
 * Closes the underlying transport.
 *
 * @param {Boolean} discard
 * @api private
 */

Socket.prototype.closeTransport = function (discard) {
  if (discard) this.transport.discard();
  this.transport.close(this.onClose.bind(this, 'forced close'));
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1650257737082);
})()
//miniprogram-npm-outsideDeps=["http","engine.io-parser","querystring","url","base64id","events","util","debug","cookie","ws","zlib","accepts"]
//# sourceMappingURL=index.js.map