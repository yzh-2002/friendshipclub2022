module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1650257737634, function(require, module, exports) {
const postcss = require('postcss')
const topologicalSort = require('./topologicalSort')

const declWhitelist = ['composes']
const declFilter = new RegExp(`^(${declWhitelist.join('|')})$`)
const matchImports = /^(.+?)\s+from\s+(?:"([^"]+)"|'([^']+)'|(global))$/
const icssImport = /^:import\((?:"([^"]+)"|'([^']+)')\)/

const VISITED_MARKER = 1

function createParentName(rule, root) {
  return `__${root.index(rule.parent)}_${rule.selector}`
}

function serializeImports(imports) {
  return imports.map(importPath => '`' + importPath + '`').join(', ')
}

/**
 * :import('G') {}
 *
 * Rule
 *   composes: ... from 'A'
 *   composes: ... from 'B'

 * Rule
 *   composes: ... from 'A'
 *   composes: ... from 'A'
 *   composes: ... from 'C'
 *
 * Results in:
 *
 * graph: {
 *   G: [],
 *   A: [],
 *   B: ['A'],
 *   C: ['A'],
 * }
 */
function addImportToGraph(importId, parentId, graph, visited) {
  const siblingsId = parentId + '_' + 'siblings'
  const visitedId = parentId + '_' + importId

  if (visited[visitedId] !== VISITED_MARKER) {
    if (!Array.isArray(visited[siblingsId])) visited[siblingsId] = []

    const siblings = visited[siblingsId]

    if (Array.isArray(graph[importId]))
      graph[importId] = graph[importId].concat(siblings)
    else graph[importId] = siblings.slice()

    visited[visitedId] = VISITED_MARKER
    siblings.push(importId)
  }
}

module.exports = postcss.plugin('modules-extract-imports', function(
  options = {}
) {
  const failOnWrongOrder = options.failOnWrongOrder

  return css => {
    const graph = {}
    const visited = {}

    const existingImports = {}
    const importDecls = {}
    const imports = {}

    let importIndex = 0

    const createImportedName = typeof options.createImportedName !== 'function'
      ? (importName /*, path*/) =>
          `i__imported_${importName.replace(/\W/g, '_')}_${importIndex++}`
      : options.createImportedName

    // Check the existing imports order and save refs
    css.walkRules(rule => {
      const matches = icssImport.exec(rule.selector)

      if (matches) {
        const [, /*match*/ doubleQuotePath, singleQuotePath] = matches
        const importPath = doubleQuotePath || singleQuotePath

        addImportToGraph(importPath, 'root', graph, visited)

        existingImports[importPath] = rule
      }
    })

    // Find any declaration that supports imports
    css.walkDecls(declFilter, decl => {
      let matches = decl.value.match(matchImports)
      let tmpSymbols

      if (matches) {
        let [
          ,
          /*match*/ symbols,
          doubleQuotePath,
          singleQuotePath,
          global
        ] = matches

        if (global) {
          // Composing globals simply means changing these classes to wrap them in global(name)
          tmpSymbols = symbols.split(/\s+/).map(s => `global(${s})`)
        } else {
          const importPath = doubleQuotePath || singleQuotePath
          const parentRule = createParentName(decl.parent, css)

          addImportToGraph(importPath, parentRule, graph, visited)

          importDecls[importPath] = decl
          imports[importPath] = imports[importPath] || {}

          tmpSymbols = symbols.split(/\s+/).map(s => {
            if (!imports[importPath][s]) {
              imports[importPath][s] = createImportedName(s, importPath)
            }

            return imports[importPath][s]
          })
        }

        decl.value = tmpSymbols.join(' ')
      }
    })

    const importsOrder = topologicalSort(graph, failOnWrongOrder)

    if (importsOrder instanceof Error) {
      const importPath = importsOrder.nodes.find(importPath =>
        importDecls.hasOwnProperty(importPath)
      )
      const decl = importDecls[importPath]

      const errMsg =
        'Failed to resolve order of composed modules ' +
        serializeImports(importsOrder.nodes) +
        '.'

      throw decl.error(errMsg, {
        plugin: 'modules-extract-imports',
        word: 'composes'
      })
    }

    let lastImportRule
    importsOrder.forEach(path => {
      const importedSymbols = imports[path]
      let rule = existingImports[path]

      if (!rule && importedSymbols) {
        rule = postcss.rule({
          selector: `:import("${path}")`,
          raws: { after: '\n' }
        })

        if (lastImportRule) css.insertAfter(lastImportRule, rule)
        else css.prepend(rule)
      }

      lastImportRule = rule

      if (!importedSymbols) return

      Object.keys(importedSymbols).forEach(importedSymbol => {
        rule.append(
          postcss.decl({
            value: importedSymbol,
            prop: importedSymbols[importedSymbol],
            raws: { before: '\n  ' }
          })
        )
      })
    })
  }
})

}, function(modId) {var map = {"./topologicalSort":1650257737635}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1650257737635, function(require, module, exports) {
const PERMANENT_MARKER = 2
const TEMPORARY_MARKER = 1

function createError(node, graph) {
  const er = new Error("Nondeterministic import's order")

  const related = graph[node]
  const relatedNode = related.find(
    relatedNode => graph[relatedNode].indexOf(node) > -1
  )

  er.nodes = [node, relatedNode]

  return er
}

function walkGraph(node, graph, state, result, strict) {
  if (state[node] === PERMANENT_MARKER) return
  if (state[node] === TEMPORARY_MARKER) {
    if (strict) return createError(node, graph)
    return
  }

  state[node] = TEMPORARY_MARKER

  const children = graph[node]
  const length = children.length

  for (let i = 0; i < length; ++i) {
    const er = walkGraph(children[i], graph, state, result, strict)
    if (er instanceof Error) return er
  }

  state[node] = PERMANENT_MARKER

  result.push(node)
}

function topologicalSort(graph, strict) {
  const result = []
  const state = {}

  const nodes = Object.keys(graph)
  const length = nodes.length

  for (let i = 0; i < length; ++i) {
    const er = walkGraph(nodes[i], graph, state, result, strict)
    if (er instanceof Error) return er
  }

  return result
}

module.exports = topologicalSort

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1650257737634);
})()
//miniprogram-npm-outsideDeps=["postcss"]
//# sourceMappingURL=index.js.map