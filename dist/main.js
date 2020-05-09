/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/cursorUtils.js":
/*!****************************!*\
  !*** ./src/cursorUtils.js ***!
  \****************************/
/*! exports provided: makeCursor, withOffset, getCursorWithOffset, getCursorLine, getLineBeforeCursor, mergeCursors */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"makeCursor\", function() { return makeCursor; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"withOffset\", function() { return withOffset; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getCursorWithOffset\", function() { return getCursorWithOffset; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getCursorLine\", function() { return getCursorLine; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getLineBeforeCursor\", function() { return getLineBeforeCursor; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mergeCursors\", function() { return mergeCursors; });\nvar makeCursor = function makeCursor(ch, line) {\n  return {\n    ch: ch,\n    line: line\n  };\n};\nvar withOffset = function withOffset(cursor) {\n  var chs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n  var lines = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;\n  return {\n    ch: cursor.ch + chs,\n    line: cursor.line + lines\n  };\n};\nvar getCursorWithOffset = function getCursorWithOffset(cm) {\n  var chs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n  var lines = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;\n  return withOffset(cm.getCursor(), chs, lines);\n};\nvar getCursorLine = function getCursorLine(cm) {\n  var _cm$getCursor = cm.getCursor(),\n      line = _cm$getCursor.line;\n\n  return cm.getLine(line);\n};\nvar getLineBeforeCursor = function getLineBeforeCursor(cm) {\n  var cursor = cm.getCursor();\n  var cursorLine = cm.getLine(cursor.line);\n  return cursorLine.slice(0, cursor.ch);\n};\nvar mergeCursors = function mergeCursors() {\n  var mergeTwoCursors = function mergeTwoCursors(c1, c2) {\n    var ch = c1.ch + c2.ch >= 0 ? c1.ch + c2.ch : 0;\n    var line = c1.line + c2.line >= 0 ? c1.line + c2.line : 0;\n    return {\n      ch: ch,\n      line: line\n    };\n  };\n\n  for (var _len = arguments.length, cursors = new Array(_len), _key = 0; _key < _len; _key++) {\n    cursors[_key] = arguments[_key];\n  }\n\n  return cursors.reduce(mergeTwoCursors, {\n    ch: 0,\n    line: 0\n  });\n};\n\n//# sourceURL=webpack:///./src/cursorUtils.js?");

/***/ }),

/***/ "./src/defaultSnippets.js":
/*!********************************!*\
  !*** ./src/defaultSnippets.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  // ${...} represents the placeholder\n  // dataframe methods\n  sel: 'select(${*cols})',\n  gb: 'groupBy(${*cols})',\n  ob: 'orderBy(${*cols, ascending})',\n  obaf: 'orderBy(${*cols}, ascending=False)',\n  pb: 'partitionBy(${*cols})',\n  fil: 'filter(${condition})',\n  filcol: 'filter(F.col(${col}))',\n  fna: 'fillna(${value})',\n  wc: 'withColumn(${colName, col})',\n  wcr: 'withColumnRenamed(${existing, new})',\n  jo: 'join(${other, on, how})',\n  un: 'union(${other})',\n  una: 'unionAll(${other})',\n  dp: 'display(${df_or_fig})',\n  dph: 'displayHTML(${html})',\n  sh: 'show(${nrows, truncate})',\n  ps: 'printSchema()',\n  sam: 'sample(${withReplacement, fraction, seed})',\n  samb: 'sampleBy(${col, fractions, seed=None})',\n  st: 'subtract(${other})',\n  dt: 'distinct()',\n  dr: 'drop(${*cols})',\n  drn: 'dropna(${how, thresh, subset})',\n  drd: 'dropDuplicates(${subset})',\n  tpd: 'toPandas()',\n  // column methods\n  al: 'alias(${alias})',\n  ca: 'cast(${dataType})',\n  at: 'astype(dataType)',\n  ow: 'otherwise(${value})',\n  ew: 'endswith(${other})',\n  sw: 'startswith(${other})',\n  isn: 'isNull()',\n  isnn: 'isNotNull()',\n  isin: 'isin(${*cols})',\n  btw: 'between(${lower, upper})',\n  // functions\n  col: 'F.col(${col})',\n  lit: 'F.lit(${col})',\n  std: 'F.stddev(${col})',\n  cnt: 'F.count(${col})',\n  cntd: 'F.countDistinct(${col})',\n  sum: 'F.sum(${col})',\n  sumd: 'F.sumDistinct(${col})',\n  min: 'F.min(${col})',\n  max: 'F.max(${col})',\n  mean: 'F.mean(${col})',\n  avg: 'F.avg(${col})',\n  len: 'F.length(${col})',\n  rnd: 'F.round(${col, scale})',\n  uxt: 'F.unix_timestamp(${timestamp, format})',\n  up: 'F.upper(${col})',\n  low: 'F.lower(${col})',\n  tr: 'F.trim(${col})',\n  ltr: 'F.ltrim(${col})',\n  rtr: 'F.rtrim(${col})',\n  ss: 'F.substring(${str, pos, len})',\n  rr: 'F.regexp_replace(${str, pattern, replacement})',\n  rep: 'F.repeat(${col, n})',\n  rev: 'F.reverse(${col})',\n  tdt: 'F.to_date(${col})',\n  dtad: 'F.date_add(${date})',\n  dtsb: 'F.date_sub(${date})',\n  dtfmt: 'F.date_format(${date, format})',\n  dtdf: 'F.datediff(${end, start})',\n  sec: 'F.second(${col})',\n  epl: 'F.explode(${col})',\n  // io\n  srt: 'spark.read.table(${tableName})',\n  src: 'spark.read.csv(${path})',\n  srp: 'spark.read.parquet(${path})',\n  wcsv: 'write.csv(${path})',\n  wp: 'write.parquet(${path})',\n  wmop: \"write.mode('overwrite').parquet(${path})\",\n  wmap: \"write.mode('append').parquet(${path})\",\n  wmep: \"write.mode('error').parquet(${path})\",\n  wmip: \"write.mode('ignore').parquet(${path})\",\n  // aggregations\n  ag: 'agg(${*exprs})',\n  agcnt: 'agg(F.count(${col}))',\n  agcntd: 'agg(F.countDistinct(${col}))',\n  agsum: 'agg(F.sum(${col}))',\n  agsumd: 'agg(F.sumDistinct(${col}))',\n  agmean: 'agg(F.mean(${col}))',\n  agavg: 'agg(F.avg(${col}))',\n  agmin: 'agg(F.min(${col}))',\n  agmax: 'agg(F.max(${col}))',\n  // aggregations with alias\n  agcnta: \"agg(F.count('${col}').alias('${col}_cnt'))\",\n  agcntda: \"agg(F.countDistinct('${col}').alias('${col}_cntd'))\",\n  agsuma: \"agg(F.sum('${col}').alias('${col}_sum'))\",\n  agsumda: \"agg(F.sumDistinct('${col}').alias('${col}_sumd'))\",\n  agmna: \"agg(F.mean('${col}').alias('${col}_mean'))\",\n  agavga: \"agg(F.avg('${col}').alias('${col}_avg'))\",\n  agmina: \"agg(F.min('${col}').alias('${col}_min'))\",\n  agmaxa: \"agg(F.max('${col}').alias('${col}_max'))\",\n  // dbutils\n  dwg: 'dbutils.widgets.get(${varName})',\n  dnr: 'dbutils.notebook.run(${notebookPath})',\n  dne: 'dbutils.notebook.exit(${value})',\n  pypi: 'dbutils.library.installPyPI(${packageName})',\n  // udf\n  udf: '@F.udf(${type})',\n  udfstr: '@F.udf(T.StringType())',\n  udfbl: '@F.udf(T.BooleanType())',\n  udfsht: '@F.udf(T.ShortType())',\n  udfint: '@F.udf(T.IntegerType())',\n  udflong: '@F.udf(T.LongType())',\n  udfflt: '@F.udf(T.FloatType())',\n  udfdbl: '@F.udf(T.DoubleType())',\n  udfarr: '@F.udf(T.ArrayType(${dataType}))',\n  // libraries for data analysis\n  np: 'import numpy as np',\n  pd: 'import pandas as pd',\n  plt: 'import matplotlib.pyplot as plt',\n  sns: 'import seaborn as sns',\n  // others\n  scs: 'sqlContext.sql()',\n  ftw: 'from pyspark.sql import functions as F, types as T, window as W',\n  shcnt: \"select(F.count(${'*'})).show()\",\n  af: 'ascending=False'\n});\n\n//# sourceURL=webpack:///./src/defaultSnippets.js?");

/***/ }),

/***/ "./src/enableSnippets.js":
/*!*******************************!*\
  !*** ./src/enableSnippets.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cursorUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cursorUtils */ \"./src/cursorUtils.js\");\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n/* eslint-disable no-param-reassign */\n\n\nvar replacePlaceholder = function replacePlaceholder(body) {\n  var ranges = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];\n  // recursive function to replace placeholders and return their ranges\n  var pattern = /\\$\\{([^{}]*)\\}/;\n  var match = body.match(pattern);\n\n  if (!match) {\n    return [body, ranges];\n  }\n\n  var _match = _slicedToArray(match, 2),\n      placeholder = _match[0],\n      defaultStr = _match[1];\n\n  var head = _cursorUtils__WEBPACK_IMPORTED_MODULE_0__[\"makeCursor\"](match.index, 0);\n  var anchor = _cursorUtils__WEBPACK_IMPORTED_MODULE_0__[\"withOffset\"](head, defaultStr.length);\n  var newBody = body.replace(placeholder, defaultStr);\n  return replacePlaceholder(newBody, [].concat(_toConsumableArray(ranges), [{\n    head: head,\n    anchor: anchor\n  }]));\n};\n\nvar escapeRegExp = function escapeRegExp(string) {\n  var reRegExpChar = /[\\\\^$.*+?()[\\]{}|]/g;\n  var reHasRegExpChar = RegExp(reRegExpChar.source);\n  return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, '\\\\$&') : string;\n};\n\nvar expandSnippet = function expandSnippet(cm) {\n  var snippets = cm.snippets;\n  var argSep = '/';\n  var lineBeforeCursor = _cursorUtils__WEBPACK_IMPORTED_MODULE_0__[\"getLineBeforeCursor\"](cm);\n  var regex = new RegExp(\"[^a-zA-Z0-9_]?([\".concat(escapeRegExp(argSep), \"a-zA-Z0-9_,]+)$\"));\n  var match = lineBeforeCursor.match(regex);\n\n  if (!match) {\n    return false;\n  }\n\n  var text = match[1];\n  var pieces = text.split(argSep);\n  var prefix = pieces[0];\n  var args = pieces.length > 1 ? pieces.slice(1) : [];\n\n  if (prefix && prefix in snippets) {\n    // TODO: add some comments here\n    var body = snippets[prefix];\n    var selections = cm.listSelections(); // for multiple selections\n\n    var rangesToReplace = selections.map(function (_ref) {\n      var anchor = _ref.anchor,\n          head = _ref.head;\n      var len = (prefix + [''].concat(_toConsumableArray(args)).join(argSep)).length;\n      return {\n        anchor: anchor,\n        head: {\n          line: head.line,\n          ch: head.ch - len\n        }\n      };\n    });\n\n    var _replacePlaceholder = replacePlaceholder(body),\n        _replacePlaceholder2 = _slicedToArray(_replacePlaceholder, 2),\n        newBody = _replacePlaceholder2[0],\n        rangesToSelect = _replacePlaceholder2[1]; // selections after expanding snippets\n\n\n    var newSelections = selections.map(function (sel) {\n      return rangesToSelect.map(function (range) {\n        var len = (prefix + [''].concat(_toConsumableArray(args)).join(argSep)).length;\n        var anchor = _cursorUtils__WEBPACK_IMPORTED_MODULE_0__[\"withOffset\"](_cursorUtils__WEBPACK_IMPORTED_MODULE_0__[\"mergeCursors\"](sel.anchor, range.anchor), -len);\n        var head = _cursorUtils__WEBPACK_IMPORTED_MODULE_0__[\"withOffset\"](_cursorUtils__WEBPACK_IMPORTED_MODULE_0__[\"mergeCursors\"](sel.head, range.head), -len);\n        return {\n          anchor: anchor,\n          head: head\n        };\n      });\n    }).flat();\n    cm.setSelections(rangesToReplace);\n    cm.replaceSelections(Array(selections.length).fill(newBody));\n    cm.setSelections(newSelections); // if arguments were given, replace the current selections with the arguments\n\n    if (args.length) {\n      var replacement = args.map(function (arg) {\n        return \"'\".concat(arg, \"'\");\n      }).join(', ');\n      cm.replaceSelections(Array(selections.length).fill(replacement));\n    }\n\n    return true; // snippet found\n  }\n\n  return false;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (cm) {\n  // if snippet not found, execute the default Tab function\n  var defaultTabFunc = cm.options.extraKeys.Tab;\n\n  cm.options.extraKeys.Tab = function (cm_) {\n    return !expandSnippet(cm_) && defaultTabFunc(cm_);\n  };\n});\n\n//# sourceURL=webpack:///./src/enableSnippets.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _enableSnippets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enableSnippets */ \"./src/enableSnippets.js\");\n/* harmony import */ var _defaultSnippets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./defaultSnippets */ \"./src/defaultSnippets.js\");\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n(function () {\n  var updateCell = function updateCell() {\n    var activeCell = document.querySelector('div.is-editing div.CodeMirror');\n\n    if (activeCell && activeCell.CodeMirror) {\n      // override default sippets with the user snippets\n      var userSnippets = JSON.parse(document.querySelector('textarea#user-snippets').textContent);\n\n      var snippets = _objectSpread({}, _defaultSnippets__WEBPACK_IMPORTED_MODULE_1__[\"default\"], userSnippets);\n\n      var cm = activeCell.CodeMirror;\n\n      if (!cm.snippets) {\n        Object(_enableSnippets__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(cm);\n      }\n\n      cm.snippets = snippets;\n    }\n  };\n\n  document.addEventListener('mouseup', updateCell, false);\n  document.addEventListener('keyup', updateCell, false);\n})();\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });