module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1650257737596, function(require, module, exports) {
var Transform = require('readable-stream').Transform;
var inherits = require('inherits');
var cyclist = require('cyclist');
var util = require('util');

var ParallelTransform = function(maxParallel, opts, ontransform) {
	if (!(this instanceof ParallelTransform)) return new ParallelTransform(maxParallel, opts, ontransform);

	if (typeof maxParallel === 'function') {
		ontransform = maxParallel;
		opts = null;
		maxParallel = 1;
	}
	if (typeof opts === 'function') {
		ontransform = opts;
		opts = null;
	}

	if (!opts) opts = {};
	if (!opts.highWaterMark) opts.highWaterMark = Math.max(maxParallel, 16);
	if (opts.objectMode !== false) opts.objectMode = true;

	Transform.call(this, opts);

	this._maxParallel = maxParallel;
	this._ontransform = ontransform;
	this._destroyed = false;
	this._flushed = false;
	this._ordered = opts.ordered !== false;
	this._buffer = this._ordered ? cyclist(maxParallel) : [];
	this._top = 0;
	this._bottom = 0;
	this._ondrain = null;
};

inherits(ParallelTransform, Transform);

ParallelTransform.prototype.destroy = function() {
	if (this._destroyed) return;
	this._destroyed = true;
	this.emit('close');
};

ParallelTransform.prototype._transform = function(chunk, enc, callback) {
	var self = this;
	var pos = this._top++;

	this._ontransform(chunk, function(err, data) {
		if (self._destroyed) return;
		if (err) {
			self.emit('error', err);
			self.push(null);
			self.destroy();
			return;
		}
		if (self._ordered) {
			self._buffer.put(pos, (data === undefined || data === null) ? null : data);
		}
		else {
			self._buffer.push(data);
		}
		self._drain();
	});

	if (this._top - this._bottom < this._maxParallel) return callback();
	this._ondrain = callback;
};

ParallelTransform.prototype._flush = function(callback) {
	this._flushed = true;
	this._ondrain = callback;
	this._drain();
};

ParallelTransform.prototype._drain = function() {
	if (this._ordered) {
		while (this._buffer.get(this._bottom) !== undefined) {
			var data = this._buffer.del(this._bottom++);
			if (data === null) continue;
			this.push(data);
		}
	}
	else {
		while (this._buffer.length > 0) {
			var data =  this._buffer.pop();
			this._bottom++;
			if (data === null) continue;
			this.push(data);
		}
	}


	if (!this._drained() || !this._ondrain) return;

	var ondrain = this._ondrain;
	this._ondrain = null;
	ondrain();
};

ParallelTransform.prototype._drained = function() {
	var diff = this._top - this._bottom;
	return this._flushed ? !diff : diff < this._maxParallel;
};

module.exports = ParallelTransform;

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1650257737596);
})()
//miniprogram-npm-outsideDeps=["readable-stream","inherits","cyclist","util"]
//# sourceMappingURL=index.js.map