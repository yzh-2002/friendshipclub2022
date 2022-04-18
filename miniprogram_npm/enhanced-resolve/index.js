module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1650257737095, function(require, module, exports) {
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


const ResolverFactory = require("./ResolverFactory");

const NodeJsInputFileSystem = require("./NodeJsInputFileSystem");
const CachedInputFileSystem = require("./CachedInputFileSystem");

const nodeFileSystem = new CachedInputFileSystem(
	new NodeJsInputFileSystem(),
	4000
);

const nodeContext = {
	environments: ["node+es3+es5+process+native"]
};

const asyncResolver = ResolverFactory.createResolver({
	extensions: [".js", ".json", ".node"],
	fileSystem: nodeFileSystem
});
module.exports = function resolve(
	context,
	path,
	request,
	resolveContext,
	callback
) {
	if (typeof context === "string") {
		callback = resolveContext;
		resolveContext = request;
		request = path;
		path = context;
		context = nodeContext;
	}
	if (typeof callback !== "function") {
		callback = resolveContext;
	}
	asyncResolver.resolve(context, path, request, resolveContext, callback);
};

const syncResolver = ResolverFactory.createResolver({
	extensions: [".js", ".json", ".node"],
	useSyncFileSystemCalls: true,
	fileSystem: nodeFileSystem
});
module.exports.sync = function resolveSync(context, path, request) {
	if (typeof context === "string") {
		request = path;
		path = context;
		context = nodeContext;
	}
	return syncResolver.resolveSync(context, path, request);
};

const asyncContextResolver = ResolverFactory.createResolver({
	extensions: [".js", ".json", ".node"],
	resolveToContext: true,
	fileSystem: nodeFileSystem
});
module.exports.context = function resolveContext(
	context,
	path,
	request,
	resolveContext,
	callback
) {
	if (typeof context === "string") {
		callback = resolveContext;
		resolveContext = request;
		request = path;
		path = context;
		context = nodeContext;
	}
	if (typeof callback !== "function") {
		callback = resolveContext;
	}
	asyncContextResolver.resolve(
		context,
		path,
		request,
		resolveContext,
		callback
	);
};

const syncContextResolver = ResolverFactory.createResolver({
	extensions: [".js", ".json", ".node"],
	resolveToContext: true,
	useSyncFileSystemCalls: true,
	fileSystem: nodeFileSystem
});
module.exports.context.sync = function resolveContextSync(
	context,
	path,
	request
) {
	if (typeof context === "string") {
		request = path;
		path = context;
		context = nodeContext;
	}
	return syncContextResolver.resolveSync(context, path, request);
};

const asyncLoaderResolver = ResolverFactory.createResolver({
	extensions: [".js", ".json", ".node"],
	moduleExtensions: ["-loader"],
	mainFields: ["loader", "main"],
	fileSystem: nodeFileSystem
});
module.exports.loader = function resolveLoader(
	context,
	path,
	request,
	resolveContext,
	callback
) {
	if (typeof context === "string") {
		callback = resolveContext;
		resolveContext = request;
		request = path;
		path = context;
		context = nodeContext;
	}
	if (typeof callback !== "function") {
		callback = resolveContext;
	}
	asyncLoaderResolver.resolve(context, path, request, resolveContext, callback);
};

const syncLoaderResolver = ResolverFactory.createResolver({
	extensions: [".js", ".json", ".node"],
	moduleExtensions: ["-loader"],
	mainFields: ["loader", "main"],
	useSyncFileSystemCalls: true,
	fileSystem: nodeFileSystem
});
module.exports.loader.sync = function resolveLoaderSync(
	context,
	path,
	request
) {
	if (typeof context === "string") {
		request = path;
		path = context;
		context = nodeContext;
	}
	return syncLoaderResolver.resolveSync(context, path, request);
};

module.exports.create = function create(options) {
	options = Object.assign(
		{
			fileSystem: nodeFileSystem
		},
		options
	);
	const resolver = ResolverFactory.createResolver(options);
	return function(context, path, request, resolveContext, callback) {
		if (typeof context === "string") {
			callback = resolveContext;
			resolveContext = request;
			request = path;
			path = context;
			context = nodeContext;
		}
		if (typeof callback !== "function") {
			callback = resolveContext;
		}
		resolver.resolve(context, path, request, resolveContext, callback);
	};
};

module.exports.create.sync = function createSync(options) {
	options = Object.assign(
		{
			useSyncFileSystemCalls: true,
			fileSystem: nodeFileSystem
		},
		options
	);
	const resolver = ResolverFactory.createResolver(options);
	return function(context, path, request) {
		if (typeof context === "string") {
			request = path;
			path = context;
			context = nodeContext;
		}
		return resolver.resolveSync(context, path, request);
	};
};

// Export Resolver, FileSystems and Plugins
module.exports.ResolverFactory = ResolverFactory;

module.exports.NodeJsInputFileSystem = NodeJsInputFileSystem;
module.exports.CachedInputFileSystem = CachedInputFileSystem;

}, function(modId) {var map = {"./ResolverFactory":1650257737096,"./NodeJsInputFileSystem":1650257737131,"./CachedInputFileSystem":1650257737132}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737096, function(require, module, exports) {
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


const Resolver = require("./Resolver");

const SyncAsyncFileSystemDecorator = require("./SyncAsyncFileSystemDecorator");

const ParsePlugin = require("./ParsePlugin");
const DescriptionFilePlugin = require("./DescriptionFilePlugin");
const NextPlugin = require("./NextPlugin");
const TryNextPlugin = require("./TryNextPlugin");
const ModuleKindPlugin = require("./ModuleKindPlugin");
const FileKindPlugin = require("./FileKindPlugin");
const JoinRequestPlugin = require("./JoinRequestPlugin");
const ModulesInHierachicDirectoriesPlugin = require("./ModulesInHierachicDirectoriesPlugin");
const ModulesInRootPlugin = require("./ModulesInRootPlugin");
const AliasPlugin = require("./AliasPlugin");
const AliasFieldPlugin = require("./AliasFieldPlugin");
const ConcordExtensionsPlugin = require("./ConcordExtensionsPlugin");
const ConcordMainPlugin = require("./ConcordMainPlugin");
const ConcordModulesPlugin = require("./ConcordModulesPlugin");
const DirectoryExistsPlugin = require("./DirectoryExistsPlugin");
const FileExistsPlugin = require("./FileExistsPlugin");
const SymlinkPlugin = require("./SymlinkPlugin");
const MainFieldPlugin = require("./MainFieldPlugin");
const UseFilePlugin = require("./UseFilePlugin");
const AppendPlugin = require("./AppendPlugin");
const RootPlugin = require("./RootPlugin");
const RestrictionsPlugin = require("./RestrictionsPlugin");
const ResultPlugin = require("./ResultPlugin");
const ModuleAppendPlugin = require("./ModuleAppendPlugin");
const UnsafeCachePlugin = require("./UnsafeCachePlugin");

exports.createResolver = function(options) {
	//// OPTIONS ////

	// A list of directories to resolve modules from, can be absolute path or folder name
	let modules = options.modules || ["node_modules"];

	// A list of description files to read from
	const descriptionFiles = options.descriptionFiles || ["package.json"];

	// A list of additional resolve plugins which should be applied
	// The slice is there to create a copy, because otherwise pushing into plugins
	// changes the original options.plugins array, causing duplicate plugins
	const plugins = (options.plugins && options.plugins.slice()) || [];

	// A list of main fields in description files
	let mainFields = options.mainFields || ["main"];

	// A list of alias fields in description files
	const aliasFields = options.aliasFields || [];

	// A list of main files in directories
	const mainFiles = options.mainFiles || ["index"];

	// A list of extensions which should be tried for files
	let extensions = options.extensions || [".js", ".json", ".node"];

	// Enforce that a extension from extensions must be used
	const enforceExtension = options.enforceExtension || false;

	// A list of module extensions which should be tried for modules
	let moduleExtensions = options.moduleExtensions || [];

	// Enforce that a extension from moduleExtensions must be used
	const enforceModuleExtension = options.enforceModuleExtension || false;

	// A list of module alias configurations or an object which maps key to value
	let alias = options.alias || [];

	// Resolve symlinks to their symlinked location
	const symlinks =
		typeof options.symlinks !== "undefined" ? options.symlinks : true;

	// Resolve to a context instead of a file
	const resolveToContext = options.resolveToContext || false;

	// A list of root paths
	const roots = options.roots || [];

	// Ignore errors happening when resolving roots
	const ignoreRootsErrors = options.ignoreRootsErrors || false;

	// Prefer to resolve server-relative urls as absolute paths before falling back to resolve in roots
	const preferAbsolute = options.preferAbsolute || false;

	const restrictions = options.restrictions || [];

	// Use this cache object to unsafely cache the successful requests
	let unsafeCache = options.unsafeCache || false;

	// Whether or not the unsafeCache should include request context as part of the cache key.
	const cacheWithContext =
		typeof options.cacheWithContext !== "undefined"
			? options.cacheWithContext
			: true;

	// Enable concord description file instructions
	const enableConcord = options.concord || false;

	// A function which decides whether a request should be cached or not.
	// an object is passed with `path` and `request` properties.
	const cachePredicate =
		options.cachePredicate ||
		function() {
			return true;
		};

	// The file system which should be used
	const fileSystem = options.fileSystem;

	// Use only the sync constiants of the file system calls
	const useSyncFileSystemCalls = options.useSyncFileSystemCalls;

	// A prepared Resolver to which the plugins are attached
	let resolver = options.resolver;

	//// options processing ////

	if (!resolver) {
		resolver = new Resolver(
			useSyncFileSystemCalls
				? new SyncAsyncFileSystemDecorator(fileSystem)
				: fileSystem
		);
	}

	extensions = [].concat(extensions);
	moduleExtensions = [].concat(moduleExtensions);

	modules = mergeFilteredToArray([].concat(modules), item => {
		return !isAbsolutePath(item);
	});

	mainFields = mainFields.map(item => {
		if (typeof item === "string" || Array.isArray(item)) {
			item = {
				name: item,
				forceRelative: true
			};
		}
		return item;
	});

	if (typeof alias === "object" && !Array.isArray(alias)) {
		alias = Object.keys(alias).map(key => {
			let onlyModule = false;
			let obj = alias[key];
			if (/\$$/.test(key)) {
				onlyModule = true;
				key = key.substr(0, key.length - 1);
			}
			if (typeof obj === "string") {
				obj = {
					alias: obj
				};
			}
			obj = Object.assign(
				{
					name: key,
					onlyModule: onlyModule
				},
				obj
			);
			return obj;
		});
	}

	if (unsafeCache && typeof unsafeCache !== "object") {
		unsafeCache = {};
	}

	//// pipeline ////

	resolver.ensureHook("resolve");
	resolver.ensureHook("parsedResolve");
	resolver.ensureHook("describedResolve");
	resolver.ensureHook("rawModule");
	resolver.ensureHook("module");
	resolver.ensureHook("relative");
	resolver.ensureHook("describedRelative");
	resolver.ensureHook("directory");
	resolver.ensureHook("existingDirectory");
	resolver.ensureHook("undescribedRawFile");
	resolver.ensureHook("rawFile");
	resolver.ensureHook("file");
	resolver.ensureHook("existingFile");
	resolver.ensureHook("resolved");

	// resolve
	if (unsafeCache) {
		plugins.push(
			new UnsafeCachePlugin(
				"resolve",
				cachePredicate,
				unsafeCache,
				cacheWithContext,
				"new-resolve"
			)
		);
		plugins.push(new ParsePlugin("new-resolve", "parsed-resolve"));
	} else {
		plugins.push(new ParsePlugin("resolve", "parsed-resolve"));
	}

	// parsed-resolve
	plugins.push(
		new DescriptionFilePlugin(
			"parsed-resolve",
			descriptionFiles,
			"described-resolve"
		)
	);
	plugins.push(new NextPlugin("after-parsed-resolve", "described-resolve"));

	// described-resolve
	if (alias.length > 0)
		plugins.push(new AliasPlugin("described-resolve", alias, "resolve"));
	if (enableConcord) {
		plugins.push(new ConcordModulesPlugin("described-resolve", {}, "resolve"));
	}
	aliasFields.forEach(item => {
		plugins.push(new AliasFieldPlugin("described-resolve", item, "resolve"));
	});
	plugins.push(new ModuleKindPlugin("after-described-resolve", "raw-module"));
	if (preferAbsolute) {
		plugins.push(new JoinRequestPlugin("after-described-resolve", "relative"));
	}
	roots.forEach(root => {
		plugins.push(
			new RootPlugin(
				"after-described-resolve",
				root,
				"relative",
				ignoreRootsErrors
			)
		);
	});
	if (!preferAbsolute) {
		plugins.push(new JoinRequestPlugin("after-described-resolve", "relative"));
	}

	// raw-module
	moduleExtensions.forEach(item => {
		plugins.push(new ModuleAppendPlugin("raw-module", item, "module"));
	});
	if (!enforceModuleExtension)
		plugins.push(new TryNextPlugin("raw-module", null, "module"));

	// module
	modules.forEach(item => {
		if (Array.isArray(item))
			plugins.push(
				new ModulesInHierachicDirectoriesPlugin("module", item, "resolve")
			);
		else plugins.push(new ModulesInRootPlugin("module", item, "resolve"));
	});

	// relative
	plugins.push(
		new DescriptionFilePlugin(
			"relative",
			descriptionFiles,
			"described-relative"
		)
	);
	plugins.push(new NextPlugin("after-relative", "described-relative"));

	// described-relative
	plugins.push(new FileKindPlugin("described-relative", "raw-file"));
	plugins.push(
		new TryNextPlugin("described-relative", "as directory", "directory")
	);

	// directory
	plugins.push(new DirectoryExistsPlugin("directory", "existing-directory"));

	if (resolveToContext) {
		// existing-directory
		plugins.push(new NextPlugin("existing-directory", "resolved"));
	} else {
		// existing-directory
		if (enableConcord) {
			plugins.push(new ConcordMainPlugin("existing-directory", {}, "resolve"));
		}
		mainFields.forEach(item => {
			plugins.push(new MainFieldPlugin("existing-directory", item, "resolve"));
		});
		mainFiles.forEach(item => {
			plugins.push(
				new UseFilePlugin("existing-directory", item, "undescribed-raw-file")
			);
		});

		// undescribed-raw-file
		plugins.push(
			new DescriptionFilePlugin(
				"undescribed-raw-file",
				descriptionFiles,
				"raw-file"
			)
		);
		plugins.push(new NextPlugin("after-undescribed-raw-file", "raw-file"));

		// raw-file
		if (!enforceExtension) {
			plugins.push(new TryNextPlugin("raw-file", "no extension", "file"));
		}
		if (enableConcord) {
			plugins.push(new ConcordExtensionsPlugin("raw-file", {}, "file"));
		}
		extensions.forEach(item => {
			plugins.push(new AppendPlugin("raw-file", item, "file"));
		});

		// file
		if (alias.length > 0)
			plugins.push(new AliasPlugin("file", alias, "resolve"));
		if (enableConcord) {
			plugins.push(new ConcordModulesPlugin("file", {}, "resolve"));
		}
		aliasFields.forEach(item => {
			plugins.push(new AliasFieldPlugin("file", item, "resolve"));
		});
		if (symlinks) plugins.push(new SymlinkPlugin("file", "relative"));
		plugins.push(new FileExistsPlugin("file", "existing-file"));

		// existing-file
		plugins.push(new NextPlugin("existing-file", "resolved"));
	}

	// resolved
	if (restrictions.length > 0) {
		plugins.push(new RestrictionsPlugin(resolver.hooks.resolved, restrictions));
	}
	plugins.push(new ResultPlugin(resolver.hooks.resolved));

	//// RESOLVER ////

	plugins.forEach(plugin => {
		plugin.apply(resolver);
	});

	return resolver;
};

function mergeFilteredToArray(array, filter) {
	return array.reduce((array, item) => {
		if (filter(item)) {
			const lastElement = array[array.length - 1];
			if (Array.isArray(lastElement)) {
				lastElement.push(item);
			} else {
				array.push([item]);
			}
			return array;
		} else {
			array.push(item);
			return array;
		}
	}, []);
}

function isAbsolutePath(path) {
	return /^[A-Z]:|^\//.test(path);
}

}, function(modId) { var map = {"./Resolver":1650257737097,"./SyncAsyncFileSystemDecorator":1650257737099,"./ParsePlugin":1650257737100,"./DescriptionFilePlugin":1650257737101,"./NextPlugin":1650257737104,"./TryNextPlugin":1650257737105,"./ModuleKindPlugin":1650257737106,"./FileKindPlugin":1650257737107,"./JoinRequestPlugin":1650257737108,"./ModulesInHierachicDirectoriesPlugin":1650257737109,"./ModulesInRootPlugin":1650257737111,"./AliasPlugin":1650257737112,"./AliasFieldPlugin":1650257737113,"./ConcordExtensionsPlugin":1650257737115,"./ConcordMainPlugin":1650257737118,"./ConcordModulesPlugin":1650257737119,"./DirectoryExistsPlugin":1650257737120,"./FileExistsPlugin":1650257737121,"./SymlinkPlugin":1650257737122,"./MainFieldPlugin":1650257737123,"./UseFilePlugin":1650257737124,"./AppendPlugin":1650257737125,"./RootPlugin":1650257737126,"./RestrictionsPlugin":1650257737127,"./ResultPlugin":1650257737128,"./ModuleAppendPlugin":1650257737129,"./UnsafeCachePlugin":1650257737130}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737097, function(require, module, exports) {
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


const util = require("util");

const Tapable = require("tapable/lib/Tapable");
const SyncHook = require("tapable/lib/SyncHook");
const AsyncSeriesBailHook = require("tapable/lib/AsyncSeriesBailHook");
const AsyncSeriesHook = require("tapable/lib/AsyncSeriesHook");
const createInnerContext = require("./createInnerContext");

const REGEXP_NOT_MODULE = /^\.$|^\.[\\/]|^\.\.$|^\.\.[\\/]|^\/|^[A-Z]:[\\/]/i;
const REGEXP_DIRECTORY = /[\\/]$/i;

const memoryFsJoin = require("memory-fs/lib/join");
const memoizedJoin = new Map();
const memoryFsNormalize = require("memory-fs/lib/normalize");

function withName(name, hook) {
	hook.name = name;
	return hook;
}

function toCamelCase(str) {
	return str.replace(/-([a-z])/g, str => str.substr(1).toUpperCase());
}

const deprecatedPushToMissing = util.deprecate((set, item) => {
	set.add(item);
}, "Resolver: 'missing' is now a Set. Use add instead of push.");

const deprecatedResolveContextInCallback = util.deprecate(x => {
	return x;
}, "Resolver: The callback argument was splitted into resolveContext and callback.");

const deprecatedHookAsString = util.deprecate(x => {
	return x;
}, "Resolver#doResolve: The type arguments (string) is now a hook argument (Hook). Pass a reference to the hook instead.");

class Resolver extends Tapable {
	constructor(fileSystem) {
		super();
		this.fileSystem = fileSystem;
		this.hooks = {
			resolveStep: withName("resolveStep", new SyncHook(["hook", "request"])),
			noResolve: withName("noResolve", new SyncHook(["request", "error"])),
			resolve: withName(
				"resolve",
				new AsyncSeriesBailHook(["request", "resolveContext"])
			),
			result: new AsyncSeriesHook(["result", "resolveContext"])
		};
		this._pluginCompat.tap("Resolver: before/after", options => {
			if (/^before-/.test(options.name)) {
				options.name = options.name.substr(7);
				options.stage = -10;
			} else if (/^after-/.test(options.name)) {
				options.name = options.name.substr(6);
				options.stage = 10;
			}
		});
		this._pluginCompat.tap("Resolver: step hooks", options => {
			const name = options.name;
			const stepHook = !/^resolve(-s|S)tep$|^no(-r|R)esolve$/.test(name);
			if (stepHook) {
				options.async = true;
				this.ensureHook(name);
				const fn = options.fn;
				options.fn = (request, resolverContext, callback) => {
					const innerCallback = (err, result) => {
						if (err) return callback(err);
						if (result !== undefined) return callback(null, result);
						callback();
					};
					for (const key in resolverContext) {
						innerCallback[key] = resolverContext[key];
					}
					fn.call(this, request, innerCallback);
				};
			}
		});
	}

	ensureHook(name) {
		if (typeof name !== "string") return name;
		name = toCamelCase(name);
		if (/^before/.test(name)) {
			return this.ensureHook(
				name[6].toLowerCase() + name.substr(7)
			).withOptions({
				stage: -10
			});
		}
		if (/^after/.test(name)) {
			return this.ensureHook(
				name[5].toLowerCase() + name.substr(6)
			).withOptions({
				stage: 10
			});
		}
		const hook = this.hooks[name];
		if (!hook) {
			return (this.hooks[name] = withName(
				name,
				new AsyncSeriesBailHook(["request", "resolveContext"])
			));
		}
		return hook;
	}

	getHook(name) {
		if (typeof name !== "string") return name;
		name = toCamelCase(name);
		if (/^before/.test(name)) {
			return this.getHook(name[6].toLowerCase() + name.substr(7)).withOptions({
				stage: -10
			});
		}
		if (/^after/.test(name)) {
			return this.getHook(name[5].toLowerCase() + name.substr(6)).withOptions({
				stage: 10
			});
		}
		const hook = this.hooks[name];
		if (!hook) {
			throw new Error(`Hook ${name} doesn't exist`);
		}
		return hook;
	}

	resolveSync(context, path, request) {
		let err,
			result,
			sync = false;
		this.resolve(context, path, request, {}, (e, r) => {
			err = e;
			result = r;
			sync = true;
		});
		if (!sync)
			throw new Error(
				"Cannot 'resolveSync' because the fileSystem is not sync. Use 'resolve'!"
			);
		if (err) throw err;
		return result;
	}

	resolve(context, path, request, resolveContext, callback) {
		// TODO remove in enhanced-resolve 5
		// For backward compatiblity START
		if (typeof callback !== "function") {
			callback = deprecatedResolveContextInCallback(resolveContext);
			// resolveContext is a function containing additional properties
			// It's now used for resolveContext and callback
		}
		// END
		const obj = {
			context: context,
			path: path,
			request: request
		};

		const message = "resolve '" + request + "' in '" + path + "'";

		// Try to resolve assuming there is no error
		// We don't log stuff in this case
		return this.doResolve(
			this.hooks.resolve,
			obj,
			message,
			{
				missing: resolveContext.missing,
				stack: resolveContext.stack
			},
			(err, result) => {
				if (!err && result) {
					return callback(
						null,
						result.path === false ? false : result.path + (result.query || ""),
						result
					);
				}

				const localMissing = new Set();
				// TODO remove in enhanced-resolve 5
				localMissing.push = item => deprecatedPushToMissing(localMissing, item);
				const log = [];

				return this.doResolve(
					this.hooks.resolve,
					obj,
					message,
					{
						log: msg => {
							if (resolveContext.log) {
								resolveContext.log(msg);
							}
							log.push(msg);
						},
						missing: localMissing,
						stack: resolveContext.stack
					},
					(err, result) => {
						if (err) return callback(err);

						const error = new Error("Can't " + message);
						error.details = log.join("\n");
						error.missing = Array.from(localMissing);
						this.hooks.noResolve.call(obj, error);
						return callback(error);
					}
				);
			}
		);
	}

	doResolve(hook, request, message, resolveContext, callback) {
		// TODO remove in enhanced-resolve 5
		// For backward compatiblity START
		if (typeof callback !== "function") {
			callback = deprecatedResolveContextInCallback(resolveContext);
			// resolveContext is a function containing additional properties
			// It's now used for resolveContext and callback
		}
		if (typeof hook === "string") {
			const name = toCamelCase(hook);
			hook = deprecatedHookAsString(this.hooks[name]);
			if (!hook) {
				throw new Error(`Hook "${name}" doesn't exist`);
			}
		}
		// END
		if (typeof callback !== "function")
			throw new Error("callback is not a function " + Array.from(arguments));
		if (!resolveContext)
			throw new Error(
				"resolveContext is not an object " + Array.from(arguments)
			);

		const stackLine =
			hook.name +
			": (" +
			request.path +
			") " +
			(request.request || "") +
			(request.query || "") +
			(request.directory ? " directory" : "") +
			(request.module ? " module" : "");

		let newStack;
		if (resolveContext.stack) {
			newStack = new Set(resolveContext.stack);
			if (resolveContext.stack.has(stackLine)) {
				// Prevent recursion
				const recursionError = new Error(
					"Recursion in resolving\nStack:\n  " +
						Array.from(newStack).join("\n  ")
				);
				recursionError.recursion = true;
				if (resolveContext.log)
					resolveContext.log("abort resolving because of recursion");
				return callback(recursionError);
			}
			newStack.add(stackLine);
		} else {
			newStack = new Set([stackLine]);
		}
		this.hooks.resolveStep.call(hook, request);

		if (hook.isUsed()) {
			const innerContext = createInnerContext(
				{
					log: resolveContext.log,
					missing: resolveContext.missing,
					stack: newStack
				},
				message
			);
			return hook.callAsync(request, innerContext, (err, result) => {
				if (err) return callback(err);
				if (result) return callback(null, result);
				callback();
			});
		} else {
			callback();
		}
	}

	parse(identifier) {
		if (identifier === "") return null;
		const part = {
			request: "",
			query: "",
			module: false,
			directory: false,
			file: false
		};
		const idxQuery = identifier.indexOf("?");
		if (idxQuery === 0) {
			part.query = identifier;
		} else if (idxQuery > 0) {
			part.request = identifier.slice(0, idxQuery);
			part.query = identifier.slice(idxQuery);
		} else {
			part.request = identifier;
		}
		if (part.request) {
			part.module = this.isModule(part.request);
			part.directory = this.isDirectory(part.request);
			if (part.directory) {
				part.request = part.request.substr(0, part.request.length - 1);
			}
		}
		return part;
	}

	isModule(path) {
		return !REGEXP_NOT_MODULE.test(path);
	}

	isDirectory(path) {
		return REGEXP_DIRECTORY.test(path);
	}

	join(path, request) {
		let cacheEntry;
		let pathCache = memoizedJoin.get(path);
		if (typeof pathCache === "undefined") {
			memoizedJoin.set(path, (pathCache = new Map()));
		} else {
			cacheEntry = pathCache.get(request);
			if (typeof cacheEntry !== "undefined") return cacheEntry;
		}
		cacheEntry = memoryFsJoin(path, request);
		pathCache.set(request, cacheEntry);
		return cacheEntry;
	}

	normalize(path) {
		return memoryFsNormalize(path);
	}
}

module.exports = Resolver;

}, function(modId) { var map = {"./createInnerContext":1650257737098}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737098, function(require, module, exports) {
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


module.exports = function createInnerContext(
	options,
	message,
	messageOptional
) {
	let messageReported = false;
	const childContext = {
		log: (() => {
			if (!options.log) return undefined;
			if (!message) return options.log;
			const logFunction = msg => {
				if (!messageReported) {
					options.log(message);
					messageReported = true;
				}
				options.log("  " + msg);
			};
			return logFunction;
		})(),
		stack: options.stack,
		missing: options.missing
	};
	return childContext;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737099, function(require, module, exports) {
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


function SyncAsyncFileSystemDecorator(fs) {
	this.fs = fs;
	if (fs.statSync) {
		this.stat = function(arg, callback) {
			let result;
			try {
				result = fs.statSync(arg);
			} catch (e) {
				return callback(e);
			}
			callback(null, result);
		};
	}
	if (fs.readdirSync) {
		this.readdir = function(arg, callback) {
			let result;
			try {
				result = fs.readdirSync(arg);
			} catch (e) {
				return callback(e);
			}
			callback(null, result);
		};
	}
	if (fs.readFileSync) {
		this.readFile = function(arg, callback) {
			let result;
			try {
				result = fs.readFileSync(arg);
			} catch (e) {
				return callback(e);
			}
			callback(null, result);
		};
	}
	if (fs.readlinkSync) {
		this.readlink = function(arg, callback) {
			let result;
			try {
				result = fs.readlinkSync(arg);
			} catch (e) {
				return callback(e);
			}
			callback(null, result);
		};
	}
	if (fs.readJsonSync) {
		this.readJson = function(arg, callback) {
			let result;
			try {
				result = fs.readJsonSync(arg);
			} catch (e) {
				return callback(e);
			}
			callback(null, result);
		};
	}
}
module.exports = SyncAsyncFileSystemDecorator;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737100, function(require, module, exports) {
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


module.exports = class ParsePlugin {
	constructor(source, target) {
		this.source = source;
		this.target = target;
	}

	apply(resolver) {
		const target = resolver.ensureHook(this.target);
		resolver
			.getHook(this.source)
			.tapAsync("ParsePlugin", (request, resolveContext, callback) => {
				const parsed = resolver.parse(request.request);
				const obj = Object.assign({}, request, parsed);
				if (request.query && !parsed.query) {
					obj.query = request.query;
				}
				if (parsed && resolveContext.log) {
					if (parsed.module) resolveContext.log("Parsed request is a module");
					if (parsed.directory)
						resolveContext.log("Parsed request is a directory");
				}
				resolver.doResolve(target, obj, null, resolveContext, callback);
			});
	}
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737101, function(require, module, exports) {
/*
MIT License http://www.opensource.org/licenses/mit-license.php
Author Tobias Koppers @sokra
*/


const DescriptionFileUtils = require("./DescriptionFileUtils");

module.exports = class DescriptionFilePlugin {
	constructor(source, filenames, target) {
		this.source = source;
		this.filenames = [].concat(filenames);
		this.target = target;
	}

	apply(resolver) {
		const target = resolver.ensureHook(this.target);
		resolver
			.getHook(this.source)
			.tapAsync(
				"DescriptionFilePlugin",
				(request, resolveContext, callback) => {
					const directory = request.path;
					DescriptionFileUtils.loadDescriptionFile(
						resolver,
						directory,
						this.filenames,
						resolveContext,
						(err, result) => {
							if (err) return callback(err);
							if (!result) {
								if (resolveContext.missing) {
									this.filenames.forEach(filename => {
										resolveContext.missing.add(
											resolver.join(directory, filename)
										);
									});
								}
								if (resolveContext.log)
									resolveContext.log("No description file found");
								return callback();
							}
							const relativePath =
								"." +
								request.path
									.substr(result.directory.length)
									.replace(/\\/g, "/");
							const obj = Object.assign({}, request, {
								descriptionFilePath: result.path,
								descriptionFileData: result.content,
								descriptionFileRoot: result.directory,
								relativePath: relativePath
							});
							resolver.doResolve(
								target,
								obj,
								"using description file: " +
									result.path +
									" (relative path: " +
									relativePath +
									")",
								resolveContext,
								(err, result) => {
									if (err) return callback(err);

									// Don't allow other processing
									if (result === undefined) return callback(null, null);
									callback(null, result);
								}
							);
						}
					);
				}
			);
	}
};

}, function(modId) { var map = {"./DescriptionFileUtils":1650257737102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737102, function(require, module, exports) {
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


const forEachBail = require("./forEachBail");

function loadDescriptionFile(
	resolver,
	directory,
	filenames,
	resolveContext,
	callback
) {
	(function findDescriptionFile() {
		forEachBail(
			filenames,
			(filename, callback) => {
				const descriptionFilePath = resolver.join(directory, filename);
				if (resolver.fileSystem.readJson) {
					resolver.fileSystem.readJson(descriptionFilePath, (err, content) => {
						if (err) {
							if (typeof err.code !== "undefined") return callback();
							return onJson(err);
						}
						onJson(null, content);
					});
				} else {
					resolver.fileSystem.readFile(descriptionFilePath, (err, content) => {
						if (err) return callback();
						let json;
						try {
							json = JSON.parse(content);
						} catch (e) {
							onJson(e);
						}
						onJson(null, json);
					});
				}

				function onJson(err, content) {
					if (err) {
						if (resolveContext.log)
							resolveContext.log(
								descriptionFilePath + " (directory description file): " + err
							);
						else
							err.message =
								descriptionFilePath + " (directory description file): " + err;
						return callback(err);
					}
					callback(null, {
						content: content,
						directory: directory,
						path: descriptionFilePath
					});
				}
			},
			(err, result) => {
				if (err) return callback(err);
				if (result) {
					return callback(null, result);
				} else {
					directory = cdUp(directory);
					if (!directory) {
						return callback();
					} else {
						return findDescriptionFile();
					}
				}
			}
		);
	})();
}

function getField(content, field) {
	if (!content) return undefined;
	if (Array.isArray(field)) {
		let current = content;
		for (let j = 0; j < field.length; j++) {
			if (current === null || typeof current !== "object") {
				current = null;
				break;
			}
			current = current[field[j]];
		}
		if (typeof current === "object") {
			return current;
		}
	} else {
		if (typeof content[field] === "object") {
			return content[field];
		}
	}
}

function cdUp(directory) {
	if (directory === "/") return null;
	const i = directory.lastIndexOf("/"),
		j = directory.lastIndexOf("\\");
	const p = i < 0 ? j : j < 0 ? i : i < j ? j : i;
	if (p < 0) return null;
	return directory.substr(0, p || 1);
}

exports.loadDescriptionFile = loadDescriptionFile;
exports.getField = getField;
exports.cdUp = cdUp;

}, function(modId) { var map = {"./forEachBail":1650257737103}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737103, function(require, module, exports) {
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


module.exports = function forEachBail(array, iterator, callback) {
	if (array.length === 0) return callback();
	let currentPos = array.length;
	let currentResult;
	let done = [];
	for (let i = 0; i < array.length; i++) {
		const itCb = createIteratorCallback(i);
		iterator(array[i], itCb);
		if (currentPos === 0) break;
	}

	function createIteratorCallback(i) {
		return (...args) => {
			if (i >= currentPos) return; // ignore
			done.push(i);
			if (args.length > 0) {
				currentPos = i + 1;
				done = done.filter(item => {
					return item <= i;
				});
				currentResult = args;
			}
			if (done.length === currentPos) {
				callback.apply(null, currentResult);
				currentPos = 0;
			}
		};
	}
};

module.exports.withIndex = function forEachBailWithIndex(
	array,
	iterator,
	callback
) {
	if (array.length === 0) return callback();
	let currentPos = array.length;
	let currentResult;
	let done = [];
	for (let i = 0; i < array.length; i++) {
		const itCb = createIteratorCallback(i);
		iterator(array[i], i, itCb);
		if (currentPos === 0) break;
	}

	function createIteratorCallback(i) {
		return (...args) => {
			if (i >= currentPos) return; // ignore
			done.push(i);
			if (args.length > 0) {
				currentPos = i + 1;
				done = done.filter(item => {
					return item <= i;
				});
				currentResult = args;
			}
			if (done.length === currentPos) {
				callback.apply(null, currentResult);
				currentPos = 0;
			}
		};
	}
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737104, function(require, module, exports) {
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


module.exports = class NextPlugin {
	constructor(source, target) {
		this.source = source;
		this.target = target;
	}

	apply(resolver) {
		const target = resolver.ensureHook(this.target);
		resolver
			.getHook(this.source)
			.tapAsync("NextPlugin", (request, resolveContext, callback) => {
				resolver.doResolve(target, request, null, resolveContext, callback);
			});
	}
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737105, function(require, module, exports) {
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


module.exports = class TryNextPlugin {
	constructor(source, message, target) {
		this.source = source;
		this.message = message;
		this.target = target;
	}

	apply(resolver) {
		const target = resolver.ensureHook(this.target);
		resolver
			.getHook(this.source)
			.tapAsync("TryNextPlugin", (request, resolveContext, callback) => {
				resolver.doResolve(
					target,
					request,
					this.message,
					resolveContext,
					callback
				);
			});
	}
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737106, function(require, module, exports) {
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


module.exports = class ModuleKindPlugin {
	constructor(source, target) {
		this.source = source;
		this.target = target;
	}

	apply(resolver) {
		const target = resolver.ensureHook(this.target);
		resolver
			.getHook(this.source)
			.tapAsync("ModuleKindPlugin", (request, resolveContext, callback) => {
				if (!request.module) return callback();
				const obj = Object.assign({}, request);
				delete obj.module;
				resolver.doResolve(
					target,
					obj,
					"resolve as module",
					resolveContext,
					(err, result) => {
						if (err) return callback(err);

						// Don't allow other alternatives
						if (result === undefined) return callback(null, null);
						callback(null, result);
					}
				);
			});
	}
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737107, function(require, module, exports) {
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


module.exports = class FileKindPlugin {
	constructor(source, target) {
		this.source = source;
		this.target = target;
	}

	apply(resolver) {
		const target = resolver.ensureHook(this.target);
		resolver
			.getHook(this.source)
			.tapAsync("FileKindPlugin", (request, resolveContext, callback) => {
				if (request.directory) return callback();
				const obj = Object.assign({}, request);
				delete obj.directory;
				resolver.doResolve(target, obj, null, resolveContext, callback);
			});
	}
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737108, function(require, module, exports) {
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


module.exports = class JoinRequestPlugin {
	constructor(source, target) {
		this.source = source;
		this.target = target;
	}

	apply(resolver) {
		const target = resolver.ensureHook(this.target);
		resolver
			.getHook(this.source)
			.tapAsync("JoinRequestPlugin", (request, resolveContext, callback) => {
				const obj = Object.assign({}, request, {
					path: resolver.join(request.path, request.request),
					relativePath:
						request.relativePath &&
						resolver.join(request.relativePath, request.request),
					request: undefined
				});
				resolver.doResolve(target, obj, null, resolveContext, callback);
			});
	}
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737109, function(require, module, exports) {
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


const forEachBail = require("./forEachBail");
const getPaths = require("./getPaths");

module.exports = class ModulesInHierachicDirectoriesPlugin {
	constructor(source, directories, target) {
		this.source = source;
		this.directories = [].concat(directories);
		this.target = target;
	}

	apply(resolver) {
		const target = resolver.ensureHook(this.target);
		resolver
			.getHook(this.source)
			.tapAsync(
				"ModulesInHierachicDirectoriesPlugin",
				(request, resolveContext, callback) => {
					const fs = resolver.fileSystem;
					const addrs = getPaths(request.path)
						.paths.map(p => {
							return this.directories.map(d => resolver.join(p, d));
						})
						.reduce((array, p) => {
							array.push.apply(array, p);
							return array;
						}, []);
					forEachBail(
						addrs,
						(addr, callback) => {
							fs.stat(addr, (err, stat) => {
								if (!err && stat && stat.isDirectory()) {
									const obj = Object.assign({}, request, {
										path: addr,
										request: "./" + request.request
									});
									const message = "looking for modules in " + addr;
									return resolver.doResolve(
										target,
										obj,
										message,
										resolveContext,
										callback
									);
								}
								if (resolveContext.log)
									resolveContext.log(
										addr + " doesn't exist or is not a directory"
									);
								if (resolveContext.missing) resolveContext.missing.add(addr);
								return callback();
							});
						},
						callback
					);
				}
			);
	}
};

}, function(modId) { var map = {"./forEachBail":1650257737103,"./getPaths":1650257737110}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737110, function(require, module, exports) {
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


module.exports = function getPaths(path) {
	const parts = path.split(/(.*?[\\/]+)/);
	const paths = [path];
	const seqments = [parts[parts.length - 1]];
	let part = parts[parts.length - 1];
	path = path.substr(0, path.length - part.length - 1);
	for (let i = parts.length - 2; i > 2; i -= 2) {
		paths.push(path);
		part = parts[i];
		path = path.substr(0, path.length - part.length) || "/";
		seqments.push(part.substr(0, part.length - 1));
	}
	part = parts[1];
	seqments.push(part);
	paths.push(part);
	return {
		paths: paths,
		seqments: seqments
	};
};

module.exports.basename = function basename(path) {
	const i = path.lastIndexOf("/"),
		j = path.lastIndexOf("\\");
	const p = i < 0 ? j : j < 0 ? i : i < j ? j : i;
	if (p < 0) return null;
	const s = path.substr(p + 1);
	return s;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737111, function(require, module, exports) {
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


module.exports = class ModulesInRootPlugin {
	constructor(source, path, target) {
		this.source = source;
		this.path = path;
		this.target = target;
	}

	apply(resolver) {
		const target = resolver.ensureHook(this.target);
		resolver
			.getHook(this.source)
			.tapAsync("ModulesInRootPlugin", (request, resolveContext, callback) => {
				const obj = Object.assign({}, request, {
					path: this.path,
					request: "./" + request.request
				});
				resolver.doResolve(
					target,
					obj,
					"looking for modules in " + this.path,
					resolveContext,
					callback
				);
			});
	}
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737112, function(require, module, exports) {
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


function startsWith(string, searchString) {
	const stringLength = string.length;
	const searchLength = searchString.length;

	// early out if the search length is greater than the search string
	if (searchLength > stringLength) {
		return false;
	}
	let index = -1;
	while (++index < searchLength) {
		if (string.charCodeAt(index) !== searchString.charCodeAt(index)) {
			return false;
		}
	}
	return true;
}

module.exports = class AliasPlugin {
	constructor(source, options, target) {
		this.source = source;
		this.options = Array.isArray(options) ? options : [options];
		this.target = target;
	}

	apply(resolver) {
		const target = resolver.ensureHook(this.target);
		resolver
			.getHook(this.source)
			.tapAsync("AliasPlugin", (request, resolveContext, callback) => {
				const innerRequest = request.request || request.path;
				if (!innerRequest) return callback();
				for (const item of this.options) {
					if (
						innerRequest === item.name ||
						(!item.onlyModule && startsWith(innerRequest, item.name + "/"))
					) {
						if (
							innerRequest !== item.alias &&
							!startsWith(innerRequest, item.alias + "/")
						) {
							const newRequestStr =
								item.alias + innerRequest.substr(item.name.length);
							const obj = Object.assign({}, request, {
								request: newRequestStr
							});
							return resolver.doResolve(
								target,
								obj,
								"aliased with mapping '" +
									item.name +
									"': '" +
									item.alias +
									"' to '" +
									newRequestStr +
									"'",
								resolveContext,
								(err, result) => {
									if (err) return callback(err);

									// Don't allow other aliasing or raw request
									if (result === undefined) return callback(null, null);
									callback(null, result);
								}
							);
						}
					}
				}
				return callback();
			});
	}
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737113, function(require, module, exports) {
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


const DescriptionFileUtils = require("./DescriptionFileUtils");
const getInnerRequest = require("./getInnerRequest");

module.exports = class AliasFieldPlugin {
	constructor(source, field, target) {
		this.source = source;
		this.field = field;
		this.target = target;
	}

	apply(resolver) {
		const target = resolver.ensureHook(this.target);
		resolver
			.getHook(this.source)
			.tapAsync("AliasFieldPlugin", (request, resolveContext, callback) => {
				if (!request.descriptionFileData) return callback();
				const innerRequest = getInnerRequest(resolver, request);
				if (!innerRequest) return callback();
				const fieldData = DescriptionFileUtils.getField(
					request.descriptionFileData,
					this.field
				);
				if (typeof fieldData !== "object") {
					if (resolveContext.log)
						resolveContext.log(
							"Field '" +
								this.field +
								"' doesn't contain a valid alias configuration"
						);
					return callback();
				}
				const data1 = fieldData[innerRequest];
				const data2 = fieldData[innerRequest.replace(/^\.\//, "")];
				const data = typeof data1 !== "undefined" ? data1 : data2;
				if (data === innerRequest) return callback();
				if (data === undefined) return callback();
				if (data === false) {
					const ignoreObj = Object.assign({}, request, {
						path: false
					});
					return callback(null, ignoreObj);
				}
				const obj = Object.assign({}, request, {
					path: request.descriptionFileRoot,
					request: data
				});
				resolver.doResolve(
					target,
					obj,
					"aliased from description file " +
						request.descriptionFilePath +
						" with mapping '" +
						innerRequest +
						"' to '" +
						data +
						"'",
					resolveContext,
					(err, result) => {
						if (err) return callback(err);

						// Don't allow other aliasing or raw request
						if (result === undefined) return callback(null, null);
						callback(null, result);
					}
				);
			});
	}
};

}, function(modId) { var map = {"./DescriptionFileUtils":1650257737102,"./getInnerRequest":1650257737114}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737114, function(require, module, exports) {
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


module.exports = function getInnerRequest(resolver, request) {
	if (
		typeof request.__innerRequest === "string" &&
		request.__innerRequest_request === request.request &&
		request.__innerRequest_relativePath === request.relativePath
	)
		return request.__innerRequest;
	let innerRequest;
	if (request.request) {
		innerRequest = request.request;
		if (/^\.\.?\//.test(innerRequest) && request.relativePath) {
			innerRequest = resolver.join(request.relativePath, innerRequest);
		}
	} else {
		innerRequest = request.relativePath;
	}
	request.__innerRequest_request = request.request;
	request.__innerRequest_relativePath = request.relativePath;
	return (request.__innerRequest = innerRequest);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737115, function(require, module, exports) {
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


const concord = require("./concord");
const DescriptionFileUtils = require("./DescriptionFileUtils");
const forEachBail = require("./forEachBail");

module.exports = class ConcordExtensionsPlugin {
	constructor(source, options, target) {
		this.source = source;
		this.options = options;
		this.target = target;
	}

	apply(resolver) {
		const target = resolver.ensureHook(this.target);
		resolver
			.getHook(this.source)
			.tapAsync(
				"ConcordExtensionsPlugin",
				(request, resolveContext, callback) => {
					const concordField = DescriptionFileUtils.getField(
						request.descriptionFileData,
						"concord"
					);
					if (!concordField) return callback();
					const extensions = concord.getExtensions(
						request.context,
						concordField
					);
					if (!extensions) return callback();
					forEachBail(
						extensions,
						(appending, callback) => {
							const obj = Object.assign({}, request, {
								path: request.path + appending,
								relativePath:
									request.relativePath && request.relativePath + appending
							});
							resolver.doResolve(
								target,
								obj,
								"concord extension: " + appending,
								resolveContext,
								callback
							);
						},
						(err, result) => {
							if (err) return callback(err);

							// Don't allow other processing
							if (result === undefined) return callback(null, null);
							callback(null, result);
						}
					);
				}
			);
	}
};

}, function(modId) { var map = {"./concord":1650257737116,"./DescriptionFileUtils":1650257737102,"./forEachBail":1650257737103}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737116, function(require, module, exports) {
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


const globToRegExp = require("./globToRegExp").globToRegExp;

function parseType(type) {
	const items = type.split("+");
	const t = items.shift();
	return {
		type: t === "*" ? null : t,
		features: items
	};
}

function isTypeMatched(baseType, testedType) {
	if (typeof baseType === "string") baseType = parseType(baseType);
	if (typeof testedType === "string") testedType = parseType(testedType);
	if (testedType.type && testedType.type !== baseType.type) return false;
	return testedType.features.every(requiredFeature => {
		return baseType.features.indexOf(requiredFeature) >= 0;
	});
}

function isResourceTypeMatched(baseType, testedType) {
	baseType = baseType.split("/");
	testedType = testedType.split("/");
	if (baseType.length !== testedType.length) return false;
	for (let i = 0; i < baseType.length; i++) {
		if (!isTypeMatched(baseType[i], testedType[i])) return false;
	}
	return true;
}

function isResourceTypeSupported(context, type) {
	return (
		context.supportedResourceTypes &&
		context.supportedResourceTypes.some(supportedType => {
			return isResourceTypeMatched(supportedType, type);
		})
	);
}

function isEnvironment(context, env) {
	return (
		context.environments &&
		context.environments.every(environment => {
			return isTypeMatched(environment, env);
		})
	);
}

const globCache = {};

function getGlobRegExp(glob) {
	const regExp = globCache[glob] || (globCache[glob] = globToRegExp(glob));
	return regExp;
}

function matchGlob(glob, relativePath) {
	const regExp = getGlobRegExp(glob);
	return regExp.exec(relativePath);
}

function isGlobMatched(glob, relativePath) {
	return !!matchGlob(glob, relativePath);
}

function isConditionMatched(context, condition) {
	const items = condition.split("|");
	return items.some(function testFn(item) {
		item = item.trim();
		const inverted = /^!/.test(item);
		if (inverted) return !testFn(item.substr(1));
		if (/^[a-z]+:/.test(item)) {
			// match named condition
			const match = /^([a-z]+):\s*/.exec(item);
			const value = item.substr(match[0].length);
			const name = match[1];
			switch (name) {
				case "referrer":
					return isGlobMatched(value, context.referrer);
				default:
					return false;
			}
		} else if (item.indexOf("/") >= 0) {
			// match supported type
			return isResourceTypeSupported(context, item);
		} else {
			// match environment
			return isEnvironment(context, item);
		}
	});
}

function isKeyMatched(context, key) {
	for (;;) {
		const match = /^\[([^\]]+)\]\s*/.exec(key);
		if (!match) return key;
		key = key.substr(match[0].length);
		const condition = match[1];
		if (!isConditionMatched(context, condition)) {
			return false;
		}
	}
}

function getField(context, configuration, field) {
	let value;
	Object.keys(configuration).forEach(key => {
		const pureKey = isKeyMatched(context, key);
		if (pureKey === field) {
			value = configuration[key];
		}
	});
	return value;
}

function getMain(context, configuration) {
	return getField(context, configuration, "main");
}

function getExtensions(context, configuration) {
	return getField(context, configuration, "extensions");
}

function matchModule(context, configuration, request) {
	const modulesField = getField(context, configuration, "modules");
	if (!modulesField) return request;
	let newRequest = request;
	const keys = Object.keys(modulesField);
	let iteration = 0;
	let match;
	let index;
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		const pureKey = isKeyMatched(context, key);
		match = matchGlob(pureKey, newRequest);
		if (match) {
			const value = modulesField[key];
			if (typeof value !== "string") {
				return value;
			} else if (/^\(.+\)$/.test(pureKey)) {
				newRequest = newRequest.replace(getGlobRegExp(pureKey), value);
			} else {
				index = 1;
				newRequest = value.replace(/(\/?\*)?\*/g, replaceMatcher);
			}
			i = -1;
			if (iteration++ > keys.length) {
				throw new Error("Request '" + request + "' matches recursively");
			}
		}
	}
	return newRequest;

	function replaceMatcher(find) {
		switch (find) {
			case "/**": {
				const m = match[index++];
				return m ? "/" + m : "";
			}
			case "**":
			case "*":
				return match[index++];
		}
	}
}

function matchType(context, configuration, relativePath) {
	const typesField = getField(context, configuration, "types");
	if (!typesField) return undefined;
	let type;
	Object.keys(typesField).forEach(key => {
		const pureKey = isKeyMatched(context, key);
		if (isGlobMatched(pureKey, relativePath)) {
			const value = typesField[key];
			if (!type && /\/\*$/.test(value))
				throw new Error(
					"value ('" +
						value +
						"') of key '" +
						key +
						"' contains '*', but there is no previous value defined"
				);
			type = value.replace(/\/\*$/, "/" + type);
		}
	});
	return type;
}

exports.parseType = parseType;
exports.isTypeMatched = isTypeMatched;
exports.isResourceTypeSupported = isResourceTypeSupported;
exports.isEnvironment = isEnvironment;
exports.isGlobMatched = isGlobMatched;
exports.isConditionMatched = isConditionMatched;
exports.isKeyMatched = isKeyMatched;
exports.getField = getField;
exports.getMain = getMain;
exports.getExtensions = getExtensions;
exports.matchModule = matchModule;
exports.matchType = matchType;

}, function(modId) { var map = {"./globToRegExp":1650257737117}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737117, function(require, module, exports) {
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


function globToRegExp(glob) {
	// * [^\\\/]*
	// /**/ /.+/
	// ^* \./.+ (concord special)
	// ? [^\\\/]
	// [!...] [^...]
	// [^...] [^...]
	// / [\\\/]
	// {...,...} (...|...)
	// ?(...|...) (...|...)?
	// +(...|...) (...|...)+
	// *(...|...) (...|...)*
	// @(...|...) (...|...)
	if (/^\(.+\)$/.test(glob)) {
		// allow to pass an RegExp in brackets
		return new RegExp(glob.substr(1, glob.length - 2));
	}
	const tokens = tokenize(glob);
	const process = createRoot();
	const regExpStr = tokens.map(process).join("");
	return new RegExp("^" + regExpStr + "$");
}

const SIMPLE_TOKENS = {
	"@(": "one",
	"?(": "zero-one",
	"+(": "one-many",
	"*(": "zero-many",
	"|": "segment-sep",
	"/**/": "any-path-segments",
	"**": "any-path",
	"*": "any-path-segment",
	"?": "any-char",
	"{": "or",
	"/": "path-sep",
	",": "comma",
	")": "closing-segment",
	"}": "closing-or"
};

function tokenize(glob) {
	return glob
		.split(
			/([@?+*]\(|\/\*\*\/|\*\*|[?*]|\[[!^]?(?:[^\]\\]|\\.)+\]|\{|,|\/|[|)}])/g
		)
		.map(item => {
			if (!item) return null;
			const t = SIMPLE_TOKENS[item];
			if (t) {
				return {
					type: t
				};
			}
			if (item[0] === "[") {
				if (item[1] === "^" || item[1] === "!") {
					return {
						type: "inverted-char-set",
						value: item.substr(2, item.length - 3)
					};
				} else {
					return {
						type: "char-set",
						value: item.substr(1, item.length - 2)
					};
				}
			}
			return {
				type: "string",
				value: item
			};
		})
		.filter(Boolean)
		.concat({
			type: "end"
		});
}

function createRoot() {
	const inOr = [];
	const process = createSeqment();
	let initial = true;
	return function(token) {
		switch (token.type) {
			case "or":
				inOr.push(initial);
				return "(";
			case "comma":
				if (inOr.length) {
					initial = inOr[inOr.length - 1];
					return "|";
				} else {
					return process(
						{
							type: "string",
							value: ","
						},
						initial
					);
				}
			case "closing-or":
				if (inOr.length === 0) throw new Error("Unmatched '}'");
				inOr.pop();
				return ")";
			case "end":
				if (inOr.length) throw new Error("Unmatched '{'");
				return process(token, initial);
			default: {
				const result = process(token, initial);
				initial = false;
				return result;
			}
		}
	};
}

function createSeqment() {
	const inSeqment = [];
	const process = createSimple();
	return function(token, initial) {
		switch (token.type) {
			case "one":
			case "one-many":
			case "zero-many":
			case "zero-one":
				inSeqment.push(token.type);
				return "(";
			case "segment-sep":
				if (inSeqment.length) {
					return "|";
				} else {
					return process(
						{
							type: "string",
							value: "|"
						},
						initial
					);
				}
			case "closing-segment": {
				const segment = inSeqment.pop();
				switch (segment) {
					case "one":
						return ")";
					case "one-many":
						return ")+";
					case "zero-many":
						return ")*";
					case "zero-one":
						return ")?";
				}
				throw new Error("Unexcepted segment " + segment);
			}
			case "end":
				if (inSeqment.length > 0) {
					throw new Error("Unmatched segment, missing ')'");
				}
				return process(token, initial);
			default:
				return process(token, initial);
		}
	};
}

function createSimple() {
	return function(token, initial) {
		switch (token.type) {
			case "path-sep":
				return "[\\\\/]+";
			case "any-path-segments":
				return "[\\\\/]+(?:(.+)[\\\\/]+)?";
			case "any-path":
				return "(.*)";
			case "any-path-segment":
				if (initial) {
					return "\\.[\\\\/]+(?:.*[\\\\/]+)?([^\\\\/]+)";
				} else {
					return "([^\\\\/]*)";
				}
			case "any-char":
				return "[^\\\\/]";
			case "inverted-char-set":
				return "[^" + token.value + "]";
			case "char-set":
				return "[" + token.value + "]";
			case "string":
				return token.value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
			case "end":
				return "";
			default:
				throw new Error("Unsupported token '" + token.type + "'");
		}
	};
}

exports.globToRegExp = globToRegExp;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737118, function(require, module, exports) {
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


const path = require("path");
const concord = require("./concord");
const DescriptionFileUtils = require("./DescriptionFileUtils");

module.exports = class ConcordMainPlugin {
	constructor(source, options, target) {
		this.source = source;
		this.options = options;
		this.target = target;
	}

	apply(resolver) {
		const target = resolver.ensureHook(this.target);
		resolver
			.getHook(this.source)
			.tapAsync("ConcordMainPlugin", (request, resolveContext, callback) => {
				if (request.path !== request.descriptionFileRoot) return callback();
				const concordField = DescriptionFileUtils.getField(
					request.descriptionFileData,
					"concord"
				);
				if (!concordField) return callback();
				const mainModule = concord.getMain(request.context, concordField);
				if (!mainModule) return callback();
				const obj = Object.assign({}, request, {
					request: mainModule
				});
				const filename = path.basename(request.descriptionFilePath);
				return resolver.doResolve(
					target,
					obj,
					"use " + mainModule + " from " + filename,
					resolveContext,
					callback
				);
			});
	}
};

}, function(modId) { var map = {"./concord":1650257737116,"./DescriptionFileUtils":1650257737102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737119, function(require, module, exports) {
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


const concord = require("./concord");
const DescriptionFileUtils = require("./DescriptionFileUtils");
const getInnerRequest = require("./getInnerRequest");

module.exports = class ConcordModulesPlugin {
	constructor(source, options, target) {
		this.source = source;
		this.options = options;
		this.target = target;
	}

	apply(resolver) {
		const target = resolver.ensureHook(this.target);
		resolver
			.getHook(this.source)
			.tapAsync("ConcordModulesPlugin", (request, resolveContext, callback) => {
				const innerRequest = getInnerRequest(resolver, request);
				if (!innerRequest) return callback();
				const concordField = DescriptionFileUtils.getField(
					request.descriptionFileData,
					"concord"
				);
				if (!concordField) return callback();
				const data = concord.matchModule(
					request.context,
					concordField,
					innerRequest
				);
				if (data === innerRequest) return callback();
				if (data === undefined) return callback();
				if (data === false) {
					const ignoreObj = Object.assign({}, request, {
						path: false
					});
					return callback(null, ignoreObj);
				}
				const obj = Object.assign({}, request, {
					path: request.descriptionFileRoot,
					request: data
				});
				resolver.doResolve(
					target,
					obj,
					"aliased from description file " +
						request.descriptionFilePath +
						" with mapping '" +
						innerRequest +
						"' to '" +
						data +
						"'",
					resolveContext,
					(err, result) => {
						if (err) return callback(err);

						// Don't allow other aliasing or raw request
						if (result === undefined) return callback(null, null);
						callback(null, result);
					}
				);
			});
	}
};

}, function(modId) { var map = {"./concord":1650257737116,"./DescriptionFileUtils":1650257737102,"./getInnerRequest":1650257737114}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737120, function(require, module, exports) {
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


module.exports = class DirectoryExistsPlugin {
	constructor(source, target) {
		this.source = source;
		this.target = target;
	}

	apply(resolver) {
		const target = resolver.ensureHook(this.target);
		resolver
			.getHook(this.source)
			.tapAsync(
				"DirectoryExistsPlugin",
				(request, resolveContext, callback) => {
					const fs = resolver.fileSystem;
					const directory = request.path;
					fs.stat(directory, (err, stat) => {
						if (err || !stat) {
							if (resolveContext.missing) resolveContext.missing.add(directory);
							if (resolveContext.log)
								resolveContext.log(directory + " doesn't exist");
							return callback();
						}
						if (!stat.isDirectory()) {
							if (resolveContext.missing) resolveContext.missing.add(directory);
							if (resolveContext.log)
								resolveContext.log(directory + " is not a directory");
							return callback();
						}
						resolver.doResolve(
							target,
							request,
							"existing directory",
							resolveContext,
							callback
						);
					});
				}
			);
	}
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737121, function(require, module, exports) {
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


module.exports = class FileExistsPlugin {
	constructor(source, target) {
		this.source = source;
		this.target = target;
	}

	apply(resolver) {
		const target = resolver.ensureHook(this.target);
		const fs = resolver.fileSystem;
		resolver
			.getHook(this.source)
			.tapAsync("FileExistsPlugin", (request, resolveContext, callback) => {
				const file = request.path;
				fs.stat(file, (err, stat) => {
					if (err || !stat) {
						if (resolveContext.missing) resolveContext.missing.add(file);
						if (resolveContext.log) resolveContext.log(file + " doesn't exist");
						return callback();
					}
					if (!stat.isFile()) {
						if (resolveContext.missing) resolveContext.missing.add(file);
						if (resolveContext.log) resolveContext.log(file + " is not a file");
						return callback();
					}
					resolver.doResolve(
						target,
						request,
						"existing file: " + file,
						resolveContext,
						callback
					);
				});
			});
	}
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737122, function(require, module, exports) {
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


const getPaths = require("./getPaths");
const forEachBail = require("./forEachBail");

module.exports = class SymlinkPlugin {
	constructor(source, target) {
		this.source = source;
		this.target = target;
	}

	apply(resolver) {
		const target = resolver.ensureHook(this.target);
		const fs = resolver.fileSystem;
		resolver
			.getHook(this.source)
			.tapAsync("SymlinkPlugin", (request, resolveContext, callback) => {
				const pathsResult = getPaths(request.path);
				const pathSeqments = pathsResult.seqments;
				const paths = pathsResult.paths;

				let containsSymlink = false;
				forEachBail.withIndex(
					paths,
					(path, idx, callback) => {
						fs.readlink(path, (err, result) => {
							if (!err && result) {
								pathSeqments[idx] = result;
								containsSymlink = true;
								// Shortcut when absolute symlink found
								if (/^(\/|[a-zA-Z]:($|\\))/.test(result))
									return callback(null, idx);
							}
							callback();
						});
					},
					(err, idx) => {
						if (!containsSymlink) return callback();
						const resultSeqments =
							typeof idx === "number"
								? pathSeqments.slice(0, idx + 1)
								: pathSeqments.slice();
						const result = resultSeqments.reverse().reduce((a, b) => {
							return resolver.join(a, b);
						});
						const obj = Object.assign({}, request, {
							path: result
						});
						resolver.doResolve(
							target,
							obj,
							"resolved symlink to " + result,
							resolveContext,
							callback
						);
					}
				);
			});
	}
};

}, function(modId) { var map = {"./getPaths":1650257737110,"./forEachBail":1650257737103}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737123, function(require, module, exports) {
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


const path = require("path");

module.exports = class MainFieldPlugin {
	constructor(source, options, target) {
		this.source = source;
		this.options = options;
		this.target = target;
	}

	apply(resolver) {
		const target = resolver.ensureHook(this.target);
		resolver
			.getHook(this.source)
			.tapAsync("MainFieldPlugin", (request, resolveContext, callback) => {
				if (request.path !== request.descriptionFileRoot) return callback();
				if (request.alreadyTriedMainField === request.descriptionFilePath)
					return callback();
				const content = request.descriptionFileData;
				const filename = path.basename(request.descriptionFilePath);
				let mainModule;
				const field = this.options.name;
				if (Array.isArray(field)) {
					let current = content;
					for (let j = 0; j < field.length; j++) {
						if (current === null || typeof current !== "object") {
							current = null;
							break;
						}
						current = current[field[j]];
					}
					if (typeof current === "string") {
						mainModule = current;
					}
				} else {
					if (typeof content[field] === "string") {
						mainModule = content[field];
					}
				}
				if (!mainModule) return callback();
				if (this.options.forceRelative && !/^\.\.?\//.test(mainModule))
					mainModule = "./" + mainModule;
				const obj = Object.assign({}, request, {
					request: mainModule,
					alreadyTriedMainField: request.descriptionFilePath
				});
				return resolver.doResolve(
					target,
					obj,
					"use " +
						mainModule +
						" from " +
						this.options.name +
						" in " +
						filename,
					resolveContext,
					callback
				);
			});
	}
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737124, function(require, module, exports) {
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


module.exports = class UseFilePlugin {
	constructor(source, filename, target) {
		this.source = source;
		this.filename = filename;
		this.target = target;
	}

	apply(resolver) {
		const target = resolver.ensureHook(this.target);
		resolver
			.getHook(this.source)
			.tapAsync("UseFilePlugin", (request, resolveContext, callback) => {
				const filePath = resolver.join(request.path, this.filename);
				const obj = Object.assign({}, request, {
					path: filePath,
					relativePath:
						request.relativePath &&
						resolver.join(request.relativePath, this.filename)
				});
				resolver.doResolve(
					target,
					obj,
					"using path: " + filePath,
					resolveContext,
					callback
				);
			});
	}
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737125, function(require, module, exports) {
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


module.exports = class AppendPlugin {
	constructor(source, appending, target) {
		this.source = source;
		this.appending = appending;
		this.target = target;
	}

	apply(resolver) {
		const target = resolver.ensureHook(this.target);
		resolver
			.getHook(this.source)
			.tapAsync("AppendPlugin", (request, resolveContext, callback) => {
				const obj = Object.assign({}, request, {
					path: request.path + this.appending,
					relativePath:
						request.relativePath && request.relativePath + this.appending
				});
				resolver.doResolve(
					target,
					obj,
					this.appending,
					resolveContext,
					callback
				);
			});
	}
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737126, function(require, module, exports) {
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Ivan Kopeykin @vankop
*/



/** @typedef {import("./Resolver")} Resolver */
/** @typedef {import("./Resolver").ResolveStepHook} ResolveStepHook */

class RootPlugin {
	/**
	 * @param {string | ResolveStepHook} source source hook
	 * @param {Array<string>} root roots
	 * @param {string | ResolveStepHook} target target hook
	 * @param {boolean=} ignoreErrors ignore error during resolving of root paths
	 */
	constructor(source, root, target, ignoreErrors) {
		this.root = root;
		this.source = source;
		this.target = target;
		this._ignoreErrors = ignoreErrors;
	}

	/**
	 * @param {Resolver} resolver the resolver
	 * @returns {void}
	 */
	apply(resolver) {
		const target = resolver.ensureHook(this.target);

		resolver
			.getHook(this.source)
			.tapAsync("RootPlugin", (request, resolveContext, callback) => {
				const req = request.request;
				if (!req) return callback();
				if (!req.startsWith("/")) return callback();

				const path = resolver.join(this.root, req.slice(1));
				const obj = Object.assign(request, {
					path,
					relativePath: request.relativePath && path
				});
				resolver.doResolve(
					target,
					obj,
					`root path ${this.root}`,
					resolveContext,
					this._ignoreErrors
						? (err, result) => {
								if (err) {
									if (resolveContext.log) {
										resolveContext.log(
											`Ignored fatal error while resolving root path:\n${err}`
										);
									}
									return callback();
								}
								if (result) return callback(null, result);
								callback();
						  }
						: callback
				);
			});
	}
}

module.exports = RootPlugin;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737127, function(require, module, exports) {
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Ivan Kopeykin @vankop
*/



const slashCode = "/".charCodeAt(0);
const backslashCode = "\\".charCodeAt(0);

const isInside = (path, parent) => {
	if (!path.startsWith(parent)) return false;
	if (path.length === parent.length) return true;
	const charCode = path.charCodeAt(parent.length);
	return charCode === slashCode || charCode === backslashCode;
};

module.exports = class RestrictionsPlugin {
	constructor(source, restrictions) {
		this.source = source;
		this.restrictions = restrictions;
	}

	apply(resolver) {
		resolver
			.getHook(this.source)
			.tapAsync("RestrictionsPlugin", (request, resolveContext, callback) => {
				if (typeof request.path === "string") {
					const path = request.path;

					for (let i = 0; i < this.restrictions.length; i++) {
						const rule = this.restrictions[i];
						if (typeof rule === "string") {
							if (!isInside(path, rule)) {
								if (resolveContext.log) {
									resolveContext.log(
										`${path} is not inside of the restriction ${rule}`
									);
								}
								return callback(null, null);
							}
						} else if (!rule.test(path)) {
							if (resolveContext.log) {
								resolveContext.log(
									`${path} doesn't match the restriction ${rule}`
								);
							}
							return callback(null, null);
						}
					}
				}

				callback();
			});
	}
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737128, function(require, module, exports) {
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


module.exports = class ResultPlugin {
	constructor(source) {
		this.source = source;
	}

	apply(resolver) {
		this.source.tapAsync(
			"ResultPlugin",
			(request, resolverContext, callback) => {
				const obj = Object.assign({}, request);
				if (resolverContext.log)
					resolverContext.log("reporting result " + obj.path);
				resolver.hooks.result.callAsync(obj, resolverContext, err => {
					if (err) return callback(err);
					callback(null, obj);
				});
			}
		);
	}
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737129, function(require, module, exports) {
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


module.exports = class ModuleAppendPlugin {
	constructor(source, appending, target) {
		this.source = source;
		this.appending = appending;
		this.target = target;
	}

	apply(resolver) {
		const target = resolver.ensureHook(this.target);
		resolver
			.getHook(this.source)
			.tapAsync("ModuleAppendPlugin", (request, resolveContext, callback) => {
				const i = request.request.indexOf("/"),
					j = request.request.indexOf("\\");
				const p = i < 0 ? j : j < 0 ? i : i < j ? i : j;
				let moduleName, remainingRequest;
				if (p < 0) {
					moduleName = request.request;
					remainingRequest = "";
				} else {
					moduleName = request.request.substr(0, p);
					remainingRequest = request.request.substr(p);
				}
				if (moduleName === "." || moduleName === "..") return callback();
				const moduleFinalName = moduleName + this.appending;
				const obj = Object.assign({}, request, {
					request: moduleFinalName + remainingRequest
				});
				resolver.doResolve(
					target,
					obj,
					"module variation " + moduleFinalName,
					resolveContext,
					callback
				);
			});
	}
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737130, function(require, module, exports) {
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


function getCacheId(request, withContext) {
	return JSON.stringify({
		context: withContext ? request.context : "",
		path: request.path,
		query: request.query,
		request: request.request
	});
}

module.exports = class UnsafeCachePlugin {
	constructor(source, filterPredicate, cache, withContext, target) {
		this.source = source;
		this.filterPredicate = filterPredicate;
		this.withContext = withContext;
		this.cache = cache || {};
		this.target = target;
	}

	apply(resolver) {
		const target = resolver.ensureHook(this.target);
		resolver
			.getHook(this.source)
			.tapAsync("UnsafeCachePlugin", (request, resolveContext, callback) => {
				if (!this.filterPredicate(request)) return callback();
				const cacheId = getCacheId(request, this.withContext);
				const cacheEntry = this.cache[cacheId];
				if (cacheEntry) {
					return callback(null, cacheEntry);
				}
				resolver.doResolve(
					target,
					request,
					null,
					resolveContext,
					(err, result) => {
						if (err) return callback(err);
						if (result) return callback(null, (this.cache[cacheId] = result));
						callback();
					}
				);
			});
	}
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737131, function(require, module, exports) {
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


const fs = require("graceful-fs");

class NodeJsInputFileSystem {
	readdir(path, callback) {
		fs.readdir(path, (err, files) => {
			callback(
				err,
				files &&
					files.map(file => {
						return file.normalize ? file.normalize("NFC") : file;
					})
			);
		});
	}

	readdirSync(path) {
		const files = fs.readdirSync(path);
		return (
			files &&
			files.map(file => {
				return file.normalize ? file.normalize("NFC") : file;
			})
		);
	}
}

const fsMethods = [
	"stat",
	"statSync",
	"readFile",
	"readFileSync",
	"readlink",
	"readlinkSync"
];

for (const key of fsMethods) {
	Object.defineProperty(NodeJsInputFileSystem.prototype, key, {
		configurable: true,
		writable: true,
		value: fs[key].bind(fs)
	});
}

module.exports = NodeJsInputFileSystem;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737132, function(require, module, exports) {
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


class Storage {
	constructor(duration) {
		this.duration = duration;
		this.running = new Map();
		this.data = new Map();
		this.levels = [];
		if (duration > 0) {
			this.levels.push(
				new Set(),
				new Set(),
				new Set(),
				new Set(),
				new Set(),
				new Set(),
				new Set(),
				new Set(),
				new Set()
			);
			for (let i = 8000; i < duration; i += 500) this.levels.push(new Set());
		}
		this.count = 0;
		this.interval = null;
		this.needTickCheck = false;
		this.nextTick = null;
		this.passive = true;
		this.tick = this.tick.bind(this);
	}

	ensureTick() {
		if (!this.interval && this.duration > 0 && !this.nextTick)
			this.interval = setInterval(
				this.tick,
				Math.floor(this.duration / this.levels.length)
			);
	}

	finished(name, err, result) {
		const callbacks = this.running.get(name);
		this.running.delete(name);
		if (this.duration > 0) {
			this.data.set(name, [err, result]);
			const levelData = this.levels[0];
			this.count -= levelData.size;
			levelData.add(name);
			this.count += levelData.size;
			this.ensureTick();
		}
		for (let i = 0; i < callbacks.length; i++) {
			callbacks[i](err, result);
		}
	}

	finishedSync(name, err, result) {
		if (this.duration > 0) {
			this.data.set(name, [err, result]);
			const levelData = this.levels[0];
			this.count -= levelData.size;
			levelData.add(name);
			this.count += levelData.size;
			this.ensureTick();
		}
	}

	provide(name, provider, callback) {
		if (typeof name !== "string") {
			callback(new TypeError("path must be a string"));
			return;
		}
		let running = this.running.get(name);
		if (running) {
			running.push(callback);
			return;
		}
		if (this.duration > 0) {
			this.checkTicks();
			const data = this.data.get(name);
			if (data) {
				return process.nextTick(() => {
					callback.apply(null, data);
				});
			}
		}
		this.running.set(name, (running = [callback]));
		provider(name, (err, result) => {
			this.finished(name, err, result);
		});
	}

	provideSync(name, provider) {
		if (typeof name !== "string") {
			throw new TypeError("path must be a string");
		}
		if (this.duration > 0) {
			this.checkTicks();
			const data = this.data.get(name);
			if (data) {
				if (data[0]) throw data[0];
				return data[1];
			}
		}
		let result;
		try {
			result = provider(name);
		} catch (e) {
			this.finishedSync(name, e);
			throw e;
		}
		this.finishedSync(name, null, result);
		return result;
	}

	tick() {
		const decay = this.levels.pop();
		for (let item of decay) {
			this.data.delete(item);
		}
		this.count -= decay.size;
		decay.clear();
		this.levels.unshift(decay);
		if (this.count === 0) {
			clearInterval(this.interval);
			this.interval = null;
			this.nextTick = null;
			return true;
		} else if (this.nextTick) {
			this.nextTick += Math.floor(this.duration / this.levels.length);
			const time = new Date().getTime();
			if (this.nextTick > time) {
				this.nextTick = null;
				this.interval = setInterval(
					this.tick,
					Math.floor(this.duration / this.levels.length)
				);
				return true;
			}
		} else if (this.passive) {
			clearInterval(this.interval);
			this.interval = null;
			this.nextTick =
				new Date().getTime() + Math.floor(this.duration / this.levels.length);
		} else {
			this.passive = true;
		}
	}

	checkTicks() {
		this.passive = false;
		if (this.nextTick) {
			while (!this.tick());
		}
	}

	purge(what) {
		if (!what) {
			this.count = 0;
			clearInterval(this.interval);
			this.nextTick = null;
			this.data.clear();
			this.levels.forEach(level => {
				level.clear();
			});
		} else if (typeof what === "string") {
			for (let key of this.data.keys()) {
				if (key.startsWith(what)) this.data.delete(key);
			}
		} else {
			for (let i = what.length - 1; i >= 0; i--) {
				this.purge(what[i]);
			}
		}
	}
}

module.exports = class CachedInputFileSystem {
	constructor(fileSystem, duration) {
		this.fileSystem = fileSystem;
		this._statStorage = new Storage(duration);
		this._readdirStorage = new Storage(duration);
		this._readFileStorage = new Storage(duration);
		this._readJsonStorage = new Storage(duration);
		this._readlinkStorage = new Storage(duration);

		this._stat = this.fileSystem.stat
			? this.fileSystem.stat.bind(this.fileSystem)
			: null;
		if (!this._stat) this.stat = null;

		this._statSync = this.fileSystem.statSync
			? this.fileSystem.statSync.bind(this.fileSystem)
			: null;
		if (!this._statSync) this.statSync = null;

		this._readdir = this.fileSystem.readdir
			? this.fileSystem.readdir.bind(this.fileSystem)
			: null;
		if (!this._readdir) this.readdir = null;

		this._readdirSync = this.fileSystem.readdirSync
			? this.fileSystem.readdirSync.bind(this.fileSystem)
			: null;
		if (!this._readdirSync) this.readdirSync = null;

		this._readFile = this.fileSystem.readFile
			? this.fileSystem.readFile.bind(this.fileSystem)
			: null;
		if (!this._readFile) this.readFile = null;

		this._readFileSync = this.fileSystem.readFileSync
			? this.fileSystem.readFileSync.bind(this.fileSystem)
			: null;
		if (!this._readFileSync) this.readFileSync = null;

		if (this.fileSystem.readJson) {
			this._readJson = this.fileSystem.readJson.bind(this.fileSystem);
		} else if (this.readFile) {
			this._readJson = (path, callback) => {
				this.readFile(path, (err, buffer) => {
					if (err) return callback(err);
					let data;
					try {
						data = JSON.parse(buffer.toString("utf-8"));
					} catch (e) {
						return callback(e);
					}
					callback(null, data);
				});
			};
		} else {
			this.readJson = null;
		}
		if (this.fileSystem.readJsonSync) {
			this._readJsonSync = this.fileSystem.readJsonSync.bind(this.fileSystem);
		} else if (this.readFileSync) {
			this._readJsonSync = path => {
				const buffer = this.readFileSync(path);
				const data = JSON.parse(buffer.toString("utf-8"));
				return data;
			};
		} else {
			this.readJsonSync = null;
		}

		this._readlink = this.fileSystem.readlink
			? this.fileSystem.readlink.bind(this.fileSystem)
			: null;
		if (!this._readlink) this.readlink = null;

		this._readlinkSync = this.fileSystem.readlinkSync
			? this.fileSystem.readlinkSync.bind(this.fileSystem)
			: null;
		if (!this._readlinkSync) this.readlinkSync = null;
	}

	stat(path, callback) {
		this._statStorage.provide(path, this._stat, callback);
	}

	readdir(path, callback) {
		this._readdirStorage.provide(path, this._readdir, callback);
	}

	readFile(path, callback) {
		this._readFileStorage.provide(path, this._readFile, callback);
	}

	readJson(path, callback) {
		this._readJsonStorage.provide(path, this._readJson, callback);
	}

	readlink(path, callback) {
		this._readlinkStorage.provide(path, this._readlink, callback);
	}

	statSync(path) {
		return this._statStorage.provideSync(path, this._statSync);
	}

	readdirSync(path) {
		return this._readdirStorage.provideSync(path, this._readdirSync);
	}

	readFileSync(path) {
		return this._readFileStorage.provideSync(path, this._readFileSync);
	}

	readJsonSync(path) {
		return this._readJsonStorage.provideSync(path, this._readJsonSync);
	}

	readlinkSync(path) {
		return this._readlinkStorage.provideSync(path, this._readlinkSync);
	}

	purge(what) {
		this._statStorage.purge(what);
		this._readdirStorage.purge(what);
		this._readFileStorage.purge(what);
		this._readlinkStorage.purge(what);
		this._readJsonStorage.purge(what);
	}
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1650257737095);
})()
//miniprogram-npm-outsideDeps=["util","tapable/lib/Tapable","tapable/lib/SyncHook","tapable/lib/AsyncSeriesBailHook","tapable/lib/AsyncSeriesHook","memory-fs/lib/join","memory-fs/lib/normalize","path","graceful-fs"]
//# sourceMappingURL=index.js.map