"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CSVUsersUpload = CSVUsersUpload;
var _react = _interopRequireWildcard(require("react"));
var _system = require("@mui/system");
var _Dialog = _interopRequireDefault(require("@mui/material/Dialog"));
var _DialogActions = _interopRequireDefault(require("@mui/material/DialogActions"));
var _DialogContent = _interopRequireDefault(require("@mui/material/DialogContent"));
var _DialogContentText = _interopRequireDefault(require("@mui/material/DialogContentText"));
var _DialogTitle = _interopRequireDefault(require("@mui/material/DialogTitle"));
var _material = require("@mui/material");
var _authscape = require("authscape");
var _Stepper = _interopRequireDefault(require("@mui/material/Stepper"));
var _Step = _interopRequireDefault(require("@mui/material/Step"));
var _StepButton = _interopRequireDefault(require("@mui/material/StepButton"));
var _CloudDownloadRounded = _interopRequireDefault(require("@mui/icons-material/CloudDownloadRounded"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function CSVUsersUpload(_ref) {
  var customFields = _ref.customFields,
    showDialog = _ref.showDialog,
    _onClose = _ref.onClose;
  var _React$useState = _react["default"].useState(0),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    activeStep = _React$useState2[0],
    setActiveStep = _React$useState2[1];
  var _React$useState3 = _react["default"].useState({}),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    completed = _React$useState4[0],
    setCompleted = _React$useState4[1];
  var steps = ['Download CSV Template', 'Upload CSV Template'];
  var totalSteps = function totalSteps() {
    return steps.length;
  };
  var completedSteps = function completedSteps() {
    return Object.keys(completed).length;
  };
  var isLastStep = function isLastStep() {
    return activeStep === totalSteps() - 1;
  };
  var allStepsCompleted = function allStepsCompleted() {
    return completedSteps() === totalSteps();
  };
  var handleNext = function handleNext() {
    var newActiveStep = isLastStep() && !allStepsCompleted() ?
    // It's the last step, but not all steps have been completed,
    // find the first step that has been completed
    steps.findIndex(function (step, i) {
      return !(i in completed);
    }) : activeStep + 1;
    setActiveStep(newActiveStep);
  };
  var handleBack = function handleBack() {
    setActiveStep(function (prevActiveStep) {
      return prevActiveStep - 1;
    });
  };
  var handleStep = function handleStep(step) {
    return function () {
      setActiveStep(step);
    };
  };
  var handleComplete = function handleComplete() {
    alert("done");
    // const newCompleted = completed;
    // newCompleted[activeStep] = true;
    // setCompleted(newCompleted);
    // handleNext();
  };

  var handleReset = function handleReset() {
    setActiveStep(0);
    setCompleted({});
  };
  return /*#__PURE__*/_react["default"].createElement(_Dialog["default"], {
    open: showDialog,
    onClose: function onClose() {
      if (_onClose != null) {
        _onClose();
      }
    },
    fullWidth: true
  }, /*#__PURE__*/_react["default"].createElement(_DialogTitle["default"], null, "Upload users"), /*#__PURE__*/_react["default"].createElement(_DialogContent["default"], null, /*#__PURE__*/_react["default"].createElement(_DialogContentText["default"], null, "Upload multiple users using a CSV sheet"), /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      paddingBottom: 0,
      paddingTop: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_Stepper["default"], {
    nonLinear: true,
    activeStep: activeStep
  }, steps.map(function (label, index) {
    return /*#__PURE__*/_react["default"].createElement(_Step["default"], {
      key: label,
      completed: completed[index]
    }, /*#__PURE__*/_react["default"].createElement(_StepButton["default"], {
      color: "inherit",
      onClick: handleStep(index)
    }, label));
  })), /*#__PURE__*/_react["default"].createElement("div", null, allStepsCompleted() ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_material.Typography, {
    sx: {
      mt: 2,
      mb: 1
    }
  }, "All steps completed - you're finished"), /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      display: 'flex',
      flexDirection: 'row',
      pt: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      flex: '1 1 auto'
    }
  }), /*#__PURE__*/_react["default"].createElement(_material.Button, {
    onClick: handleReset
  }, "Reset"))) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      paddingTop: 4,
      paddingBottom: 4
    }
  }, activeStep == 0 && /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      fontSize: 14
    }
  }, "Download our CSV template to make sure your CSV is formatted correctly.", /*#__PURE__*/_react["default"].createElement(_material.Button, {
    startIcon: /*#__PURE__*/_react["default"].createElement(_CloudDownloadRounded["default"], null),
    variant: "contained",
    sx: {
      marginTop: 2
    },
    onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _authscape.apiService)().DownloadFile("/UserManagement/GetDownloadTemplate?customFields=" + JSON.stringify(customFields), "DownloadFile.csv", function () {});
          case 2:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))
  }, "Download Template")), activeStep == 1 && /*#__PURE__*/_react["default"].createElement(_system.Box, null, /*#__PURE__*/_react["default"].createElement(_authscape.FileUploader, {
    url: "/UserManagement/UploadUsers",
    onUploadCompleted: function onUploadCompleted(results) {
      if (_onClose != null) {
        _onClose();
      }
    }
  }))), /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      display: 'flex',
      flexDirection: 'row',
      pt: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_material.Button, {
    color: "inherit",
    disabled: activeStep === 0,
    onClick: handleBack,
    sx: {
      mr: 1
    }
  }, "Back"), /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      flex: '1 1 auto'
    }
  }), activeStep !== steps.length - 1 && /*#__PURE__*/_react["default"].createElement(_material.Button, {
    onClick: handleNext,
    sx: {
      mr: 1
    }
  }, "Next"))))), /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      height: 200
    }
  })), /*#__PURE__*/_react["default"].createElement(_DialogActions["default"], null, /*#__PURE__*/_react["default"].createElement(_material.Button, {
    onClick: function onClick() {
      if (_onClose != null) {
        _onClose();
      }
    }
  }, "Cancel")));
}
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserEditor = UserEditor;
var _react = _interopRequireWildcard(require("react"));
var _system = require("@mui/system");
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
var _material = require("@mui/material");
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
var _FormControl = _interopRequireDefault(require("@mui/material/FormControl"));
var _InputLabel = _interopRequireDefault(require("@mui/material/InputLabel"));
var _Select = _interopRequireDefault(require("@mui/material/Select"));
var _Checkbox = _interopRequireDefault(require("@mui/material/Checkbox"));
var _OutlinedInput = _interopRequireDefault(require("@mui/material/OutlinedInput"));
var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));
var _ListItemText = _interopRequireDefault(require("@mui/material/ListItemText"));
var _reactHookForm = require("react-hook-form");
var _FormControlLabel = _interopRequireDefault(require("@mui/material/FormControlLabel"));
var _Switch = _interopRequireDefault(require("@mui/material/Switch"));
var _BusinessRounded = _interopRequireDefault(require("@mui/icons-material/BusinessRounded"));
var _authscape = require("authscape");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function UserEditor(_ref) {
  var _ref$userId = _ref.userId,
    userId = _ref$userId === void 0 ? null : _ref$userId,
    _ref$onSaved = _ref.onSaved,
    onSaved = _ref$onSaved === void 0 ? null : _ref$onSaved,
    _ref$onPasswordChange = _ref.onPasswordChanged,
    onPasswordChanged = _ref$onPasswordChange === void 0 ? null : _ref$onPasswordChange;
  var _useForm = (0, _reactHookForm.useForm)(),
    control = _useForm.control,
    register = _useForm.register,
    handleSubmit = _useForm.handleSubmit,
    errors = _useForm.formState.errors,
    watch = _useForm.watch,
    setValue = _useForm.setValue;
  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    selectedRoles = _useState2[0],
    setSelectedRole = _useState2[1];
  var _useState3 = (0, _react.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    selectedPermission = _useState4[0],
    setSelectedPermission = _useState4[1];
  var _useState5 = (0, _react.useState)([]),
    _useState6 = _slicedToArray(_useState5, 2),
    companies = _useState6[0],
    setCompanies = _useState6[1];
  var _useState7 = (0, _react.useState)(null),
    _useState8 = _slicedToArray(_useState7, 2),
    company = _useState8[0],
    setCompany = _useState8[1];
  var _useState9 = (0, _react.useState)(''),
    _useState10 = _slicedToArray(_useState9, 2),
    inputCompanyValue = _useState10[0],
    setInputCompanyValue = _useState10[1];
  var _useState11 = (0, _react.useState)([]),
    _useState12 = _slicedToArray(_useState11, 2),
    locations = _useState12[0],
    setLocations = _useState12[1];
  var _useState13 = (0, _react.useState)(null),
    _useState14 = _slicedToArray(_useState13, 2),
    location = _useState14[0],
    setLocation = _useState14[1];
  var _useState15 = (0, _react.useState)(''),
    _useState16 = _slicedToArray(_useState15, 2),
    inputLocationValue = _useState16[0],
    setInputLocationValue = _useState16[1];
  var _useState17 = (0, _react.useState)([]),
    _useState18 = _slicedToArray(_useState17, 2),
    roles = _useState18[0],
    setRole = _useState18[1];
  var _useState19 = (0, _react.useState)([]),
    _useState20 = _slicedToArray(_useState19, 2),
    permissions = _useState20[0],
    setPermissions = _useState20[1];
  var _useState21 = (0, _react.useState)([]),
    _useState22 = _slicedToArray(_useState21, 2),
    customFields = _useState22[0],
    setCustomFields = _useState22[1];
  var _useState23 = (0, _react.useState)(null),
    _useState24 = _slicedToArray(_useState23, 2),
    user = _useState24[0],
    setUser = _useState24[1];
  var ITEM_HEIGHT = 48;
  var ITEM_PADDING_TOP = 8;
  var MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  };
  var _useState25 = (0, _react.useState)(""),
    _useState26 = _slicedToArray(_useState25, 2),
    newPassword = _useState26[0],
    setNewPassword = _useState26[1];
  var _useState27 = (0, _react.useState)(""),
    _useState28 = _slicedToArray(_useState27, 2),
    confirmPassword = _useState28[0],
    setConfirmPassword = _useState28[1];
  var _useState29 = (0, _react.useState)(0),
    _useState30 = _slicedToArray(_useState29, 2),
    tabValue = _useState30[0],
    setTabValue = _useState30[1];
  var handleTabChange = function handleTabChange(event, newValue) {
    setTabValue(newValue);
  };
  (0, _react.useEffect)(function () {
    var fetchData = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var responseRoles, responsePermissions;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _authscape.apiService)().get("/UserManagement/GetRoles");
            case 2:
              responseRoles = _context.sent;
              if (responseRoles != null && responseRoles.status == 200) {
                setRole(responseRoles.data);
              }
              _context.next = 6;
              return (0, _authscape.apiService)().get("/UserManagement/GetPermissions");
            case 6:
              responsePermissions = _context.sent;
              if (responsePermissions != null && responsePermissions.status == 200) {
                setPermissions(responsePermissions.data);
              }
            case 8:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function fetchData() {
        return _ref2.apply(this, arguments);
      };
    }();
    fetchData();
  }, []);
  (0, _react.useEffect)(function () {
    if (userId != null) {
      var fetchData = /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var response, roleNames, index, role, permissionNames, _index, permission;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _authscape.apiService)().get("/UserManagement/GetUser?userId=" + userId);
              case 2:
                response = _context2.sent;
                if (response != null && response.status == 200) {
                  setUser(response.data);
                  if (response.data.company != null) {
                    setCompany(response.data.company);
                  }
                  if (response.data.location != null) {
                    setLocation(response.data.location);
                  }
                  if (response.data.userCustomFields != null) {
                    setCustomFields(response.data.userCustomFields);
                  }

                  // assign all selected roles
                  if (response.data.roles != null) {
                    roleNames = [];
                    for (index = 0; index < response.data.roles.length; index++) {
                      role = response.data.roles[index];
                      roleNames.push(role);
                    }
                    setSelectedRole(roleNames);
                  }

                  // assign all selected permissions
                  if (response.data.permissions != null) {
                    permissionNames = [];
                    for (_index = 0; _index < response.data.permissions.length; _index++) {
                      permission = response.data.permissions[_index];
                      permissionNames.push(permission);
                    }
                    setSelectedPermission(permissionNames);
                  }
                }
              case 4:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }));
        return function fetchData() {
          return _ref3.apply(this, arguments);
        };
      }();
      if (userId != -1) {
        fetchData();
      }
    }
  }, [userId]);
  var fields = ["FirstName", "LastName", "IsActive", "Email"];
  var findTheValue = function findTheValue(field) {
    var result = "";
    if (user != null) {
      Object.getOwnPropertyNames(user).forEach(function (element) {
        if (field.toLowerCase() == element.toLowerCase()) {
          result = user[element];
        }
      });
    }
    return result;
  };
  var findCustomFieldValue = function findCustomFieldValue(field) {
    var result = "";
    if (user != null && user.userCustomFields) {
      user.userCustomFields.forEach(function (userCustomField) {
        if (field.toLowerCase() == userCustomField.name.toLowerCase()) {
          result = userCustomField.value;
        }
      });
    }
    return result;
  };
  var renderCustomField = function renderCustomField(customFields) {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, (userId != -1 ? user != null : true) && customFields.map(function (field) {
      var result = findCustomFieldValue(field.name);
      return /*#__PURE__*/_react["default"].createElement(_material.Grid, {
        item: true,
        xs: 6
      }, /*#__PURE__*/_react["default"].createElement(_reactHookForm.Controller, {
        name: field.customFieldId,
        control: control,
        rules: {
          required: field.isRequired
        },
        render: function render(_ref4) {
          var renderField = _ref4.renderField;
          return /*#__PURE__*/_react["default"].createElement(_TextField["default"], _extends({
            label: field.name,
            variant: "outlined",
            defaultValue: result,
            margin: "normal",
            fullWidth: true
          }, register(field.customFieldId, {
            required: field.isRequired
          }), renderField));
        }
      }), errors[field.name] && /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        color: "red"
      }, field.name, " is required."));
    }));
  };
  var renderSystemField = function renderSystemField(customFields) {
    var isSystemField = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, (userId != -1 ? user != null : true) && customFields.map(function (field) {
      var result = findTheValue(field);
      return /*#__PURE__*/_react["default"].createElement(_material.Grid, {
        item: true,
        xs: 6
      }, field == "IsActive" && /*#__PURE__*/_react["default"].createElement(_system.Box, null, /*#__PURE__*/_react["default"].createElement(_reactHookForm.Controller, {
        name: field,
        control: control,
        rules: {
          required: false
        },
        render: function render(_ref5) {
          var renderField = _ref5.renderField;
          return /*#__PURE__*/_react["default"].createElement(_FormControlLabel["default"], _extends({
            control: /*#__PURE__*/_react["default"].createElement(_Switch["default"], {
              defaultChecked: result
            }),
            label: field
          }, register(field, {
            required: false
          }), renderField));
        }
      }), errors[field] && /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        color: "red"
      }, field, " is required.")), field != "IsActive" && /*#__PURE__*/_react["default"].createElement(_system.Box, null, /*#__PURE__*/_react["default"].createElement(_reactHookForm.Controller, {
        name: field,
        control: control,
        rules: {
          required: true
        },
        render: function render(_ref6) {
          var renderField = _ref6.renderField;
          return /*#__PURE__*/_react["default"].createElement(_TextField["default"], _extends({
            label: field,
            variant: "outlined",
            defaultValue: result,
            margin: "normal",
            fullWidth: true
          }, register(field, {
            required: true
          }), renderField));
        }
      }), errors[field] && /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        color: "red"
      }, field, " is required.")));
    }));
  };
  function a11yProps(index) {
    return {
      id: "simple-tab-".concat(index),
      'aria-controls': "simple-tabpanel-".concat(index)
    };
  }
  (0, _react.useEffect)(function () {
    var fetchData = /*#__PURE__*/function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var response, _response;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (!(inputCompanyValue == null || inputCompanyValue == "")) {
                _context3.next = 7;
                break;
              }
              _context3.next = 3;
              return (0, _authscape.apiService)().get("/UserManagement/GetCompanies");
            case 3:
              response = _context3.sent;
              if (response != null && response.status == 200) {
                setCompanies(response.data);
              }
              _context3.next = 11;
              break;
            case 7:
              _context3.next = 9;
              return (0, _authscape.apiService)().get("/UserManagement/GetCompanies?name=" + inputCompanyValue);
            case 9:
              _response = _context3.sent;
              if (_response != null && _response.status == 200) {
                setCompanies(_response.data);
              }
            case 11:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      return function fetchData() {
        return _ref7.apply(this, arguments);
      };
    }();
    if (user != null || userId == -1) {
      fetchData();
    }
  }, [user, userId, inputCompanyValue]);
  (0, _react.useEffect)(function () {
    var fetchData = /*#__PURE__*/function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var response, _response2;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              if (!(company != null)) {
                _context4.next = 12;
                break;
              }
              if (!(inputLocationValue == null || inputLocationValue == "")) {
                _context4.next = 8;
                break;
              }
              _context4.next = 4;
              return (0, _authscape.apiService)().get("/UserManagement/GetLocations?companyId=" + company.id);
            case 4:
              response = _context4.sent;
              if (response != null && response.status == 200) {
                setLocations(response.data);
              }
              _context4.next = 12;
              break;
            case 8:
              _context4.next = 10;
              return (0, _authscape.apiService)().get("/UserManagement/GetLocations?companyId=" + company.id + "&name=" + inputLocationValue);
            case 10:
              _response2 = _context4.sent;
              if (_response2 != null && _response2.status == 200) {
                setLocations(_response2.data);
              }
            case 12:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      return function fetchData() {
        return _ref8.apply(this, arguments);
      };
    }();
    if (user != null || userId == -1) {
      fetchData();
    }
  }, [user, userId, inputLocationValue, company]);
  return /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      paddingTop: 0,
      minWidth: 600
    }
  }, /*#__PURE__*/_react["default"].createElement("form", {
    onSubmit: handleSubmit( /*#__PURE__*/function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(data) {
        var userCustomFields, response;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              userCustomFields = [];
              customFields && customFields.forEach(function (customField) {
                userCustomFields.push({
                  customFieldId: customField.customFieldId,
                  name: customField.name,
                  isRequired: customField.isRequired,
                  customFieldType: customField.customFieldType,
                  value: data[customField.customFieldId]
                });
              });
              _context5.next = 4;
              return (0, _authscape.apiService)().put("/UserManagement/UpdateUser", {
                id: userId,
                firstName: data.FirstName,
                lastName: data.LastName,
                companyId: company != null ? company.id : null,
                locationId: location != null ? location.id : null,
                email: data.Email,
                isActive: data.IsActive,
                roles: selectedRoles != "" ? selectedRoles : null,
                permissions: selectedPermission != "" ? selectedPermission : null,
                userCustomFields: userCustomFields
              });
            case 4:
              response = _context5.sent;
              if (response != null && response.status == 200) {
                if (onSaved != null) {
                  onSaved();
                }
              }
            case 6:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      return function (_x2) {
        return _ref9.apply(this, arguments);
      };
    }()),
    noValidate: true,
    autoComplete: "off"
  }, /*#__PURE__*/_react["default"].createElement(_system.Box, null, /*#__PURE__*/_react["default"].createElement(_system.Box, null, /*#__PURE__*/_react["default"].createElement(_material.Tabs, {
    value: tabValue,
    onChange: handleTabChange,
    variant: "fullWidth",
    "aria-label": "basic tabs example",
    centered: true
  }, /*#__PURE__*/_react["default"].createElement(_material.Tab, _extends({
    label: "Information"
  }, a11yProps(0))), /*#__PURE__*/_react["default"].createElement(_material.Tab, _extends({
    label: "Company & Locations"
  }, a11yProps(1))), /*#__PURE__*/_react["default"].createElement(_material.Tab, _extends({
    label: "Roles & Permissions"
  }, a11yProps(2))), /*#__PURE__*/_react["default"].createElement(_material.Tab, _extends({
    label: "Authentication & Authorization"
  }, a11yProps(3))))), tabValue === 0 && /*#__PURE__*/_react["default"].createElement(_material.Grid, {
    spacing: 2,
    sx: {
      paddingLeft: 2,
      paddingRight: 2,
      paddingTop: 2
    }
  }, renderSystemField(fields), customFields != null && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, renderCustomField(customFields))), tabValue === 1 && /*#__PURE__*/_react["default"].createElement(_material.Grid, {
    spacing: 2,
    sx: {
      paddingLeft: 2,
      paddingRight: 2,
      paddingTop: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_material.Autocomplete, {
    id: "companySelect",
    sx: {
      paddingTop: 2
    },
    getOptionLabel: function getOptionLabel(option) {
      return option.title;
    },
    filterOptions: function filterOptions(x) {
      return x;
    },
    options: companies != null ? companies : [],
    autoComplete: true,
    includeInputInList: true,
    filterSelectedOptions: true,
    value: company,
    noOptionsText: "No locations",
    onChange: function onChange(event, newValue) {
      setCompanies(newValue ? [newValue].concat(_toConsumableArray(companies)) : companies);
      setCompany(newValue);
      setLocation(null);
    },
    onInputChange: function onInputChange(event, newInputValue) {
      setInputCompanyValue(newInputValue);
    },
    renderInput: function renderInput(params) {
      return /*#__PURE__*/_react["default"].createElement(_TextField["default"], _extends({}, params, {
        label: "Company",
        fullWidth: true
      }));
    },
    renderOption: function renderOption(props, option) {
      // const matches =
      //   option.structured_formatting.main_text_matched_substrings || [];

      // const parts = parse(
      //   option.structured_formatting.main_text,
      //   matches.map((match) => [match.offset, match.offset + match.length]),
      // );

      return /*#__PURE__*/_react["default"].createElement("li", props, /*#__PURE__*/_react["default"].createElement(_material.Grid, {
        container: true,
        alignItems: "center"
      }, /*#__PURE__*/_react["default"].createElement(_material.Grid, {
        item: true,
        sx: {
          display: 'flex',
          width: 44
        }
      }, /*#__PURE__*/_react["default"].createElement(_BusinessRounded["default"], {
        sx: {
          color: 'text.secondary'
        }
      })), /*#__PURE__*/_react["default"].createElement(_material.Grid, {
        item: true,
        sx: {
          width: 'calc(100% - 44px)',
          wordWrap: 'break-word'
        }
      }, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        variant: "body2",
        color: "text.secondary"
      }, option.title))));
    }
  }), /*#__PURE__*/_react["default"].createElement(_material.Autocomplete, {
    id: "LocationSelect",
    sx: {
      paddingTop: 3
    },
    getOptionLabel: function getOptionLabel(option) {
      return option.title;
    },
    filterOptions: function filterOptions(x) {
      return x;
    },
    options: locations != null ? locations : [],
    autoComplete: true,
    includeInputInList: true,
    filterSelectedOptions: true,
    value: location,
    noOptionsText: "No locations",
    onChange: function onChange(event, newValue) {
      setLocations(newValue ? [newValue].concat(_toConsumableArray(locations)) : locations);
      setLocation(newValue);
    },
    onInputChange: function onInputChange(event, newInputValue) {
      setInputCompanyValue(newInputValue);
    },
    renderInput: function renderInput(params) {
      return /*#__PURE__*/_react["default"].createElement(_TextField["default"], _extends({}, params, {
        label: "Location",
        fullWidth: true
      }));
    },
    renderOption: function renderOption(props, option) {
      return /*#__PURE__*/_react["default"].createElement("li", props, /*#__PURE__*/_react["default"].createElement(_material.Grid, {
        container: true,
        alignItems: "center"
      }, /*#__PURE__*/_react["default"].createElement(_material.Grid, {
        item: true,
        sx: {
          display: 'flex',
          width: 44
        }
      }, /*#__PURE__*/_react["default"].createElement(BusinessRounded, {
        sx: {
          color: 'text.secondary'
        }
      })), /*#__PURE__*/_react["default"].createElement(_material.Grid, {
        item: true,
        sx: {
          width: 'calc(100% - 44px)',
          wordWrap: 'break-word'
        }
      }, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        variant: "body2",
        color: "text.secondary"
      }, option.title))));
    }
  })), tabValue === 2 && /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      paddingLeft: 2,
      paddingRight: 2,
      paddingTop: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_FormControl["default"], {
    sx: {
      paddingTop: 1,
      m: 1,
      width: "100%"
    }
  }, /*#__PURE__*/_react["default"].createElement(_InputLabel["default"], {
    id: "demo-multiple-checkbox-label"
  }, "Roles"), /*#__PURE__*/_react["default"].createElement(_Select["default"], _extends({
    fullWidth: true,
    labelId: "demo-multiple-checkbox-label",
    id: "demo-multiple-checkbox"
  }, register("roles", {
    required: false
  }), {
    multiple: true,
    value: selectedRoles,
    onChange: function onChange(event) {
      var value = event.target.value;
      setSelectedRole(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value);
    },
    input: /*#__PURE__*/_react["default"].createElement(_OutlinedInput["default"], {
      label: "Roles"
    }),
    renderValue: function renderValue(selected) {
      return selected.join(', ');
    },
    MenuProps: MenuProps
  }), roles.map(function (role) {
    return /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
      key: role.name,
      value: role.name
    }, /*#__PURE__*/_react["default"].createElement(_Checkbox["default"], {
      checked: selectedRoles.indexOf(role.name) > -1
    }), /*#__PURE__*/_react["default"].createElement(_ListItemText["default"], {
      primary: role.name
    }));
  }))), errors.roles && /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
    color: "red"
  }, "roles", " is required."), /*#__PURE__*/_react["default"].createElement(_FormControl["default"], {
    sx: {
      m: 1,
      paddingTop: 1,
      width: "100%"
    }
  }, /*#__PURE__*/_react["default"].createElement(_InputLabel["default"], {
    id: "demo-multiple-checkbox-label"
  }, "Permissions"), /*#__PURE__*/_react["default"].createElement(_Select["default"], _extends({
    fullWidth: true,
    labelId: "demo-multiple-checkbox-label",
    id: "demo-multiple-checkbox"
  }, register("permissions", {
    required: false
  }), {
    multiple: true,
    value: selectedPermission,
    onChange: function onChange(event) {
      var value = event.target.value;
      setSelectedPermission(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value);
    },
    input: /*#__PURE__*/_react["default"].createElement(_OutlinedInput["default"], {
      label: "Roles"
    }),
    renderValue: function renderValue(selected) {
      return selected.join(', ');
    },
    MenuProps: MenuProps
  }), permissions.map(function (permission) {
    return /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
      key: permission.name,
      value: permission.name
    }, /*#__PURE__*/_react["default"].createElement(_Checkbox["default"], {
      checked: selectedPermission.indexOf(permission.name) > -1
    }), /*#__PURE__*/_react["default"].createElement(_ListItemText["default"], {
      primary: permission.name
    }));
  }))), errors.permissions && /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
    color: "red"
  }, "permissions", " is required.")), tabValue === 3 && /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      paddingLeft: 2,
      paddingRight: 2,
      paddingTop: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      paddingTop: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_TextField["default"], {
    id: "txtNewPassword",
    label: "New Password",
    variant: "outlined",
    fullWidth: true,
    onChange: function onChange(val) {
      setNewPassword(val.currentTarget.value);
    }
  })), /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      paddingTop: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_TextField["default"], {
    id: "txtConfirmPassword",
    label: "Confirm Password",
    variant: "outlined",
    fullWidth: true,
    onChange: function onChange(val) {
      setConfirmPassword(val.currentTarget.value);
    }
  }), newPassword !== confirmPassword && /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
    color: "red"
  }, "New Password and Confirm Password", " does not match.")), /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      paddingTop: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_material.Button, {
    variant: "contained",
    type: "button",
    onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
      var response;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            if (!(newPassword != null && confirmPassword != null && confirmPassword != "" && newPassword != "")) {
              _context6.next = 5;
              break;
            }
            _context6.next = 3;
            return (0, _authscape.apiService)().put("/UserManagement/ChangeUserPassword", {
              userId: userId,
              password: newPassword
            });
          case 3:
            response = _context6.sent;
            if (onPasswordChanged != null) {
              onPasswordChanged(response);
            }
            // if (response != null && response.status == 200)
            // {
            //   if (response.data == null)
            //   {

            //   }
            //   else
            //   {

            //   }

            //   alert("Password Changed!");
            // }
            // else
            // {
            //   alert(JSON.stringify(response.data.error));
            // }
          case 5:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    }))
  }, "Change Password"))), (tabValue == 0 || tabValue == 1 || tabValue == 2) && /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      paddingTop: 1,
      paddingBottom: 4,
      paddingLeft: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_material.Button, {
    variant: "contained",
    type: "submit"
  }, userId == -1 ? "Create Account" : "Update Account")))));
}
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = UserManagement;
var _react = _interopRequireWildcard(require("react"));
var _system = require("@mui/system");
var _material = require("@mui/material");
var _IconButton = _interopRequireDefault(require("@mui/material/IconButton"));
var _UploadRounded = _interopRequireDefault(require("@mui/icons-material/UploadRounded"));
var _CloseRounded = _interopRequireDefault(require("@mui/icons-material/CloseRounded"));
var _authscape = require("authscape");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
// import { UserEditor } from './UserEditor'; // remove when done
// import { CSVUsersUpload } from './CSVUsersUpload'; // remove when done
function UserManagement(_ref) {
  var _ref$height = _ref.height,
    height = _ref$height === void 0 ? "50vh" : _ref$height,
    _ref$onUploadComplete = _ref.onUploadCompleted,
    onUploadCompleted = _ref$onUploadComplete === void 0 ? null : _ref$onUploadComplete,
    _ref$onPasswordChange = _ref.onPasswordChanged,
    onPasswordChanged = _ref$onPasswordChange === void 0 ? null : _ref$onPasswordChange;
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    showUserDetails = _useState2[0],
    setShowUserDetails = _useState2[1];
  var _useState3 = (0, _react.useState)(0),
    _useState4 = _slicedToArray(_useState3, 2),
    dataGridRefreshKey = _useState4[0],
    setDataGridRefreshKey = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    uploadUsersShowDialog = _useState6[0],
    setUploadUsersShowDialog = _useState6[1];
  var _useState7 = (0, _react.useState)(''),
    _useState8 = _slicedToArray(_useState7, 2),
    searchByName = _useState8[0],
    setSearchByName = _useState8[1];
  var userColumns = [{
    field: 'fullName',
    headerName: 'Full name',
    flex: 1,
    renderCell: function renderCell(param) {
      return param.row.firstName + " " + param.row.lastName;
    }
  }, {
    field: 'userName',
    flex: 1,
    headerName: 'Email',
    editable: false,
    headerClassName: 'invoiceHeaderColumn'
  }, {
    field: 'company',
    headerName: 'Company',
    flex: 1,
    renderCell: function renderCell(param) {
      return param.row.company != null ? param.row.company.title : "";
    }
  }, {
    field: 'location',
    headerName: 'Location',
    flex: 1,
    renderCell: function renderCell(param) {
      return param.row.location != null ? param.row.location.title : "";
    }
  }, {
    field: 'isActive',
    headerName: 'Status',
    flex: 1,
    renderCell: function renderCell(param) {
      return param.row.isActive ? "Active" : "Not Active";
    }
  }, {
    field: 'roles',
    headerName: 'Roles',
    flex: 1,
    renderCell: function renderCell(param) {
      return param.row.roles;
    }
  }, {
    field: 'permission',
    headerName: 'Permission',
    flex: 1,
    renderCell: function renderCell(param) {
      return param.row.permissions;
    }
  }];
  (0, _react.useEffect)(function () {
    setDataGridRefreshKey(dataGridRefreshKey + 1);
  }, [searchByName]);
  return /*#__PURE__*/_react["default"].createElement(_system.Box, null, /*#__PURE__*/_react["default"].createElement(_material.Grid, {
    container: true,
    spacing: 2,
    sx: {
      paddingBottom: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_material.Grid, {
    item: true,
    xs: 6
  }, /*#__PURE__*/_react["default"].createElement(_authscape.AutoSaveTextField, {
    label: "Search... ",
    fullWidth: true,
    onChanged: function onChanged(value) {
      setSearchByName(value);
      setDataGridRefreshKey(dataGridRefreshKey + 1);
    }
  })), /*#__PURE__*/_react["default"].createElement(_material.Grid, {
    item: true,
    xs: 6
  }, /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      textAlign: "right"
    }
  }, /*#__PURE__*/_react["default"].createElement(_material.Button, {
    variant: "contained",
    sx: {
      width: 200
    },
    onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            setShowUserDetails(-1);
          case 1:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))
  }, "Add User"), /*#__PURE__*/_react["default"].createElement(_material.Button, {
    startIcon: /*#__PURE__*/_react["default"].createElement(_UploadRounded["default"], null),
    variant: "contained",
    sx: {
      width: 200,
      marginLeft: 2
    },
    onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            setUploadUsersShowDialog(true);
          case 1:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))
  }, "Upload Users")))), /*#__PURE__*/_react["default"].createElement(_system.Box, null, /*#__PURE__*/_react["default"].createElement(_authscape.EditableDatagrid, {
    key: dataGridRefreshKey,
    height: height,
    pageSize: 25,
    url: "/UserManagement/GetUsers",
    columns: userColumns,
    params: {
      searchByName: searchByName
    },
    onRowClick: function onRowClick(row) {
      setShowUserDetails(row.id);
    }
  }), /*#__PURE__*/_react["default"].createElement(_material.Drawer, {
    anchor: "right",
    fullWidth: true,
    width: 800,
    open: showUserDetails != null ? true : false,
    onClose: function onClose() {
      setShowUserDetails(null);
    }
  }, /*#__PURE__*/_react["default"].createElement(_IconButton["default"], {
    size: "large",
    sx: {
      position: "absolute",
      right: 10,
      top: 6
    },
    onClick: function onClick() {
      setShowUserDetails(null);
    }
  }, /*#__PURE__*/_react["default"].createElement(_CloseRounded["default"], null)), /*#__PURE__*/_react["default"].createElement(_material.Grid, {
    item: true,
    xs: 12
  }, /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      padding: 2
    }
  }, "User Information"), /*#__PURE__*/_react["default"].createElement("hr", null), /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      padding: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_material.Avatar, {
    alt: "Remy Sharp",
    src: "/static/images/avatar/1.jpg",
    sx: {
      width: 100,
      height: 100
    }
  })), /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      width: '100%'
    }
  }, /*#__PURE__*/_react["default"].createElement(UserEditor, {
    userId: showUserDetails,
    onPasswordChanged: onPasswordChanged,
    onSaved: function onSaved() {
      setDataGridRefreshKey(dataGridRefreshKey + 1);
      setShowUserDetails(null);
    }
  }))))), /*#__PURE__*/_react["default"].createElement(CSVUsersUpload, {
    showDialog: uploadUsersShowDialog,
    onClose: function onClose() {
      setUploadUsersShowDialog(false);
    }
  }));
}
