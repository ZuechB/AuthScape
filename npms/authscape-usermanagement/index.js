"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompanyEditor = CompanyEditor;
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
var _authscape = require("authscape");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
// import {renderCustomField, renderSystemField} from './EditorFields';

function CompanyEditor(_ref) {
  var _ref$companyId = _ref.companyId,
    companyId = _ref$companyId === void 0 ? null : _ref$companyId,
    _ref$onSaved = _ref.onSaved,
    onSaved = _ref$onSaved === void 0 ? null : _ref$onSaved;
  var _useForm = (0, _reactHookForm.useForm)(),
    control = _useForm.control,
    register = _useForm.register,
    handleSubmit = _useForm.handleSubmit,
    errors = _useForm.formState.errors,
    watch = _useForm.watch,
    setValue = _useForm.setValue;
  var refTimeoutToken = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    customFields = _useState2[0],
    setCustomFields = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    company = _useState4[0],
    setCompany = _useState4[1];
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
  var _useState5 = (0, _react.useState)(0),
    _useState6 = _slicedToArray(_useState5, 2),
    tabValue = _useState6[0],
    setTabValue = _useState6[1];
  var handleTabChange = function handleTabChange(event, newValue) {
    setTabValue(newValue);
  };
  (0, _react.useEffect)(function () {
    var fetchData = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var response;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _authscape.apiService)().get("/UserManagement/GetCompany?companyId=" + companyId);
            case 2:
              response = _context.sent;
              if (response != null && response.status == 200) {
                setCompany(response.data);
                if (response.data.customFields != null) {
                  setCustomFields(response.data.customFields);
                }
              }
            case 4:
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
  var fields = ["Title"
  // "LastName",
  // "IsActive",
  // "Email"
  ];

  function a11yProps(index) {
    return {
      id: "simple-tab-".concat(index),
      'aria-controls': "simple-tabpanel-".concat(index)
    };
  }
  return /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      paddingTop: 0,
      minWidth: 600
    }
  }, /*#__PURE__*/_react["default"].createElement("form", {
    onSubmit: handleSubmit( /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data) {
        var companyCustomFields, response;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              companyCustomFields = [];
              customFields && customFields.forEach(function (customField) {
                companyCustomFields.push({
                  customFieldId: customField.customFieldId,
                  name: customField.name,
                  isRequired: customField.isRequired,
                  customFieldType: customField.customFieldType,
                  value: data[customField.customFieldId].toString()
                });
              });
              _context2.next = 4;
              return (0, _authscape.apiService)().post("/UserManagement/UpdateCompany", {
                id: companyId,
                title: data.Title,
                customFields: companyCustomFields
              });
            case 4:
              response = _context2.sent;
              if (response != null && response.status == 200) {
                if (onSaved != null) {
                  onSaved();
                }
              }

              // let response = await apiService().put("/UserManagement/UpdateUser", {
              //     id: userId,
              //     firstName: data.FirstName,
              //     lastName: data.LastName,
              //     companyId: company != null ? company.id : null,
              //     locationId: location != null ? location.id : null,
              //     email: data.Email,
              //     isActive: data.IsActive,
              //     roles: selectedRoles != "" ? selectedRoles : null,
              //     permissions: selectedPermission != "" ? selectedPermission : null,
              //     userCustomFields: userCustomFields
              // });
            case 6:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    }()),
    noValidate: true,
    autoComplete: "off"
  }, /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      padding: 2
    }
  }, company != null && company.logo != null && /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      backgroundImage: "url(".concat(company.logo, ")"),
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      marginTop: 1,
      width: "100%",
      height: 80,
      cursor: "pointer"
    }
  }), company != null && company.logo == null && /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      marginTop: 1,
      width: 100,
      height: 100,
      border: "1px dashed black",
      cursor: "pointer"
    }
  }, /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      marginTop: 4.5
    }
  }, "No Image"))), /*#__PURE__*/_react["default"].createElement(_system.Box, null, /*#__PURE__*/_react["default"].createElement(_system.Box, null, /*#__PURE__*/_react["default"].createElement(_material.Tabs, {
    value: tabValue,
    onChange: handleTabChange,
    variant: "fullWidth",
    "aria-label": "basic tabs example",
    centered: true
  }, /*#__PURE__*/_react["default"].createElement(_material.Tab, _extends({
    label: "Information"
  }, a11yProps(0))), /*#__PURE__*/_react["default"].createElement(_material.Tab, _extends({
    label: "Description"
  }, a11yProps(1))))), tabValue === 0 && /*#__PURE__*/_react["default"].createElement(_material.Grid, {
    spacing: 2,
    sx: {
      paddingLeft: 2,
      paddingRight: 2,
      paddingTop: 2
    }
  }, renderSystemField(companyId, company, control, errors, register, fields), customFields != null && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, renderCustomField(companyId, company, control, errors, register, customFields))), tabValue === 1 && /*#__PURE__*/_react["default"].createElement(_material.Grid, {
    spacing: 2,
    sx: {
      paddingLeft: 2,
      paddingRight: 2,
      paddingTop: 2
    }
  }, "Description here..."), (tabValue == 0 || tabValue == 1 || tabValue == 2) && /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      paddingTop: 1,
      paddingBottom: 4,
      paddingLeft: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_material.Button, {
    variant: "contained",
    type: "submit"
  }, companyId == -1 ? "Create Company" : "Update Company")))));
}
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
exports.CustomFields = CustomFields;
var _react = _interopRequireWildcard(require("react"));
var _system = require("@mui/system");
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
var _material = require("@mui/material");
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
var _Table = _interopRequireDefault(require("@mui/material/Table"));
var _TableBody = _interopRequireDefault(require("@mui/material/TableBody"));
var _TableCell = _interopRequireDefault(require("@mui/material/TableCell"));
var _TableContainer = _interopRequireDefault(require("@mui/material/TableContainer"));
var _TableHead = _interopRequireDefault(require("@mui/material/TableHead"));
var _TableRow = _interopRequireDefault(require("@mui/material/TableRow"));
var _Paper = _interopRequireDefault(require("@mui/material/Paper"));
var _authscape = require("authscape");
var _Dialog = _interopRequireDefault(require("@mui/material/Dialog"));
var _DialogActions = _interopRequireDefault(require("@mui/material/DialogActions"));
var _DialogContent = _interopRequireDefault(require("@mui/material/DialogContent"));
var _DialogContentText = _interopRequireDefault(require("@mui/material/DialogContentText"));
var _DialogTitle = _interopRequireDefault(require("@mui/material/DialogTitle"));
var _FormControl = _interopRequireDefault(require("@mui/material/FormControl"));
var _InputLabel = _interopRequireDefault(require("@mui/material/InputLabel"));
var _Select = _interopRequireDefault(require("@mui/material/Select"));
var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));
var _FormControlLabel = _interopRequireDefault(require("@mui/material/FormControlLabel"));
var _Switch = _interopRequireDefault(require("@mui/material/Switch"));
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
function CustomFields(_ref) {
  var platformType = _ref.platformType;
  var roleNameRef = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    customFields = _useState2[0],
    setCustomFields = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    newCustomFieldOpen = _useState4[0],
    setNewCustomFieldOpen = _useState4[1];
  var _useState5 = (0, _react.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    newTabFieldOpen = _useState6[0],
    setNewTabFieldOpen = _useState6[1];
  var RefreshFields = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var response;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _authscape.apiService)().get("/UserManagement/GetCustomFields?platformType=" + platformType);
          case 2:
            response = _context.sent;
            if (response != null && response.status == 200) {
              setCustomFields(response.data);
            }
          case 4:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function RefreshFields() {
      return _ref2.apply(this, arguments);
    };
  }();
  (0, _react.useEffect)(function () {
    var fetchData = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return RefreshFields();
            case 2:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      return function fetchData() {
        return _ref3.apply(this, arguments);
      };
    }();
    fetchData();
  }, []);
  var AddNewCustomField = function AddNewCustomField() {
    var refName = (0, _react.useRef)(null);
    var _useState7 = (0, _react.useState)(1),
      _useState8 = _slicedToArray(_useState7, 2),
      fieldType = _useState8[0],
      setFieldType = _useState8[1];
    var _useState9 = (0, _react.useState)(1),
      _useState10 = _slicedToArray(_useState9, 2),
      gridSize = _useState10[0],
      setGridSize = _useState10[1];
    var _useState11 = (0, _react.useState)(false),
      _useState12 = _slicedToArray(_useState11, 2),
      isRequired = _useState12[0],
      setIsRequired = _useState12[1];
    var _useState13 = (0, _react.useState)(null),
      _useState14 = _slicedToArray(_useState13, 2),
      tabOptions = _useState14[0],
      setTabOptions = _useState14[1];
    var _useState15 = (0, _react.useState)(null),
      _useState16 = _slicedToArray(_useState15, 2),
      tabSelection = _useState16[0],
      setTabSelection = _useState16[1];
    var refTabName = (0, _react.useRef)(null);
    var refreshTabOptions = /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var customTabResponse;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return (0, _authscape.apiService)().get("/UserManagement/GetCustomTabs?platformType=" + platformType);
            case 2:
              customTabResponse = _context3.sent;
              if (customTabResponse != null && customTabResponse.status == 200) {
                setTabOptions(customTabResponse.data);
              }
            case 4:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      return function refreshTabOptions() {
        return _ref4.apply(this, arguments);
      };
    }();
    (0, _react.useEffect)(function () {
      if (newCustomFieldOpen != null && newCustomFieldOpen != -1) {
        // look up the record for this custom field so we can display the values on the components
        var fetchData = /*#__PURE__*/function () {
          var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
            var customFieldResponse;
            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return refreshTabOptions();
                case 2:
                  _context4.next = 4;
                  return (0, _authscape.apiService)().get("/UserManagement/GetCustomField?id=" + newCustomFieldOpen);
                case 4:
                  customFieldResponse = _context4.sent;
                  if (customFieldResponse != null && customFieldResponse.status == 200) {
                    refName.current.value = customFieldResponse.data.name;
                    setFieldType(customFieldResponse.data.fieldType);
                    setIsRequired(customFieldResponse.data.isRequired);
                    setGridSize(customFieldResponse.data.gridSize);
                    setTabSelection(customFieldResponse.data.tabId);
                  }
                case 6:
                case "end":
                  return _context4.stop();
              }
            }, _callee4);
          }));
          return function fetchData() {
            return _ref5.apply(this, arguments);
          };
        }();
        fetchData();
      }
    }, [newCustomFieldOpen]);
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_Dialog["default"], {
      open: newTabFieldOpen != null ? true : false,
      fullWidth: true,
      onClose: function onClose() {
        setNewTabFieldOpen(null);
      },
      "aria-labelledby": "alert-dialog-title",
      "aria-describedby": "alert-dialog-description"
    }, /*#__PURE__*/_react["default"].createElement(_DialogTitle["default"], {
      id: "alert-dialog-title"
    }, newTabFieldOpen == -1 && newTabFieldOpen != null && "Create Tab", newTabFieldOpen != -1 && newTabFieldOpen != null && "Edit Tab"), /*#__PURE__*/_react["default"].createElement(_DialogContent["default"], null, /*#__PURE__*/_react["default"].createElement(_TextField["default"], {
      inputRef: refTabName,
      label: "Name",
      variant: "outlined",
      fullWidth: true,
      InputLabelProps: {
        shrink: true
      },
      sx: {
        paddingBottom: 2,
        marginTop: 2
      }
    })), /*#__PURE__*/_react["default"].createElement(_DialogActions["default"], null, /*#__PURE__*/_react["default"].createElement(_material.Button, {
      onClick: function onClick() {
        setNewTabFieldOpen(null);
      }
    }, "Cancel"), /*#__PURE__*/_react["default"].createElement(_material.Button, {
      onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var id;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              id = null;
              if (newTabFieldOpen != -1) {
                id = newTabFieldOpen;
              }
              _context5.next = 4;
              return (0, _authscape.apiService)().post("/UserManagement/CreateTab", {
                id: id,
                name: refTabName.current.value,
                platformType: platformType
              });
            case 4:
              _context5.next = 6;
              return refreshTabOptions();
            case 6:
              setNewTabFieldOpen(null);
            case 7:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      })),
      autoFocus: true
    }, "Add"))), /*#__PURE__*/_react["default"].createElement(_Dialog["default"], {
      open: newCustomFieldOpen,
      onClose: function onClose() {
        setNewCustomFieldOpen(null);
      },
      "aria-labelledby": "alert-dialog-title",
      "aria-describedby": "alert-dialog-description"
    }, /*#__PURE__*/_react["default"].createElement(_DialogTitle["default"], {
      id: "alert-dialog-title"
    }, newCustomFieldOpen == -1 && newCustomFieldOpen != null && "New Custom Field", newCustomFieldOpen != -1 && newCustomFieldOpen != null && "Edit Custom Field"), /*#__PURE__*/_react["default"].createElement(_DialogContent["default"], null, /*#__PURE__*/_react["default"].createElement(_TextField["default"], {
      inputRef: refName,
      label: "Name",
      variant: "outlined",
      fullWidth: true,
      InputLabelProps: {
        shrink: true
      },
      sx: {
        paddingBottom: 2,
        marginTop: 2
      }
    }), /*#__PURE__*/_react["default"].createElement(_FormControl["default"], {
      fullWidth: true,
      sx: {
        paddingBottom: 2
      }
    }, /*#__PURE__*/_react["default"].createElement(_InputLabel["default"], {
      id: "demo-simple-select-label"
    }, "Field Type"), /*#__PURE__*/_react["default"].createElement(_Select["default"], {
      labelId: "demo-simple-select-label",
      id: "demo-simple-select",
      value: fieldType,
      label: "Field Type",
      onChange: function onChange(event) {
        setFieldType(event.target.value);
      }
    }, /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
      value: 1
    }, "TextField"), /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
      value: 2
    }, "RichTextField"), /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
      value: 3
    }, "Number"), /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
      value: 4
    }, "Date"), /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
      value: 5
    }, "Yes / No"))), /*#__PURE__*/_react["default"].createElement(_system.Box, {
      sx: {
        paddingBottom: 2
      }
    }, /*#__PURE__*/_react["default"].createElement(_FormControl["default"], {
      fullWidth: true
    }, /*#__PURE__*/_react["default"].createElement(_InputLabel["default"], {
      id: "tab-simple-select-label"
    }, "Tabs"), /*#__PURE__*/_react["default"].createElement(_Select["default"], {
      labelId: "tab-simple-select-label",
      id: "tab-simple-select",
      value: tabSelection,
      label: "Tabs",
      onChange: function onChange(event) {
        setTabSelection(event.target.value);
      }
    }, tabOptions != null && tabOptions.map(function (tab) {
      return /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
        value: tab.id
      }, tab.name);
    }))), /*#__PURE__*/_react["default"].createElement(_system.Box, {
      sx: {
        textAlign: "right"
      }
    }, /*#__PURE__*/_react["default"].createElement(_material.Button, {
      variant: "text",
      onClick: function onClick() {
        setNewTabFieldOpen(-1);
      }
    }, "Create Tab"))), /*#__PURE__*/_react["default"].createElement(_FormControlLabel["default"], {
      control: /*#__PURE__*/_react["default"].createElement(_Switch["default"], {
        checked: isRequired,
        onChange: function onChange(event) {
          setIsRequired(event.target.checked);
        }
      }),
      label: "Is Required",
      sx: {
        paddingBottom: 2
      }
    }), /*#__PURE__*/_react["default"].createElement(_FormControl["default"], {
      fullWidth: true,
      sx: {
        paddingBottom: 2
      }
    }, /*#__PURE__*/_react["default"].createElement(_InputLabel["default"], {
      id: "demo-simple-select-label"
    }, "Grid Size"), /*#__PURE__*/_react["default"].createElement(_Select["default"], {
      labelId: "demo-simple-select-label",
      id: "demo-simple-select",
      value: gridSize,
      label: "Grid Size",
      onChange: function onChange(event) {
        setGridSize(event.target.value);
      }
    }, /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
      value: 1
    }, "1"), /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
      value: 2
    }, "2"), /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
      value: 3
    }, "3"), /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
      value: 4
    }, "4"), /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
      value: 5
    }, "5"), /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
      value: 6
    }, "6"), /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
      value: 7
    }, "7"), /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
      value: 8
    }, "8"), /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
      value: 9
    }, "9"), /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
      value: 10
    }, "10"), /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
      value: 11
    }, "11"), /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
      value: 12
    }, "12")))), /*#__PURE__*/_react["default"].createElement(_DialogActions["default"], null, /*#__PURE__*/_react["default"].createElement(_material.Button, {
      onClick: function onClick() {
        setNewCustomFieldOpen(null);
      }
    }, "Cancel"), /*#__PURE__*/_react["default"].createElement(_material.Button, {
      onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        var id;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              id = null;
              if (newCustomFieldOpen != -1) {
                id = newCustomFieldOpen;
              }
              _context6.next = 4;
              return (0, _authscape.apiService)().post("/UserManagement/AddOrUpdateCustomField", {
                id: id,
                name: refName.current.value,
                fieldType: fieldType,
                customFieldPlatformType: platformType,
                isRequired: isRequired,
                gridSize: gridSize,
                tabSelection: tabSelection
              });
            case 4:
              _context6.next = 6;
              return RefreshFields();
            case 6:
              setNewCustomFieldOpen(null);
            case 7:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      })),
      autoFocus: true
    }, "Update"))));
  };
  return /*#__PURE__*/_react["default"].createElement(_system.Box, null, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
    variant: "h3",
    gutterBottom: true
  }, "Custom Fields"), /*#__PURE__*/_react["default"].createElement(_material.Button, {
    variant: "contained",
    sx: {
      width: 200,
      marginTop: 2
    },
    onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            // let response = await apiService().post("/UserManagement/AddPermission", { name: roleNameRef.current.value });
            // if (response != null)
            // {
            //     await RefreshRoles();
            //     // should refresh the getallroles dataset
            // }

            setNewCustomFieldOpen(-1);
          case 1:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    }))
  }, "Add Custom Field"), /*#__PURE__*/_react["default"].createElement(_TableContainer["default"], {
    component: _Paper["default"],
    sx: {
      marginTop: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_Table["default"], {
    sx: {
      minWidth: 650
    },
    "aria-label": "simple table"
  }, /*#__PURE__*/_react["default"].createElement(_TableHead["default"], null, /*#__PURE__*/_react["default"].createElement(_TableRow["default"], null, /*#__PURE__*/_react["default"].createElement(_TableCell["default"], null, "Id"), /*#__PURE__*/_react["default"].createElement(_TableCell["default"], null, "Name"), /*#__PURE__*/_react["default"].createElement(_TableCell["default"], null, "Field Type"), /*#__PURE__*/_react["default"].createElement(_TableCell["default"], null, "Tabs"), /*#__PURE__*/_react["default"].createElement(_TableCell["default"], null, "Is Required"), /*#__PURE__*/_react["default"].createElement(_TableCell["default"], null, "Grid Size"))), /*#__PURE__*/_react["default"].createElement(_TableBody["default"], null, customFields.map(function (row) {
    return /*#__PURE__*/_react["default"].createElement(_TableRow["default"], {
      key: row.id,
      sx: {
        '&:last-child td, &:last-child th': {
          border: 0
        },
        cursor: "pointer"
      },
      onClick: function onClick() {
        setNewCustomFieldOpen(row.id);
      }
    }, /*#__PURE__*/_react["default"].createElement(_TableCell["default"], {
      component: "th",
      scope: "row"
    }, row.id), /*#__PURE__*/_react["default"].createElement(_TableCell["default"], {
      component: "th",
      scope: "row"
    }, row.name), /*#__PURE__*/_react["default"].createElement(_TableCell["default"], {
      component: "th",
      scope: "row"
    }, row.fieldType == 1 && "Text Field", row.fieldType == 2 && "Rich Text Field", row.fieldType == 3 && "Number", row.fieldType == 4 && "Date", row.fieldType == 5 && "Yes / No"), /*#__PURE__*/_react["default"].createElement(_TableCell["default"], {
      component: "th",
      scope: "row"
    }, row.customFieldTab.name), /*#__PURE__*/_react["default"].createElement(_TableCell["default"], {
      component: "th",
      scope: "row"
    }, row.isRequired == true ? "Required" : "Not Required"), /*#__PURE__*/_react["default"].createElement(_TableCell["default"], {
      component: "th",
      scope: "row"
    }, row.gridSize));
  })))), AddNewCustomField());
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderSystemField = exports.renderCustomField = exports.findTheValue = void 0;
var _react = _interopRequireDefault(require("react"));
var _material = require("@mui/material");
var _reactHookForm = require("react-hook-form");
var _FormControlLabel = _interopRequireDefault(require("@mui/material/FormControlLabel"));
var _Switch = _interopRequireDefault(require("@mui/material/Switch"));
var _Grid = _interopRequireDefault(require("@mui/material/Grid2"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
// import { RichTextEditor } from "./RichTextEditor";

var findTheValue = function findTheValue(fieldObject, field) {
  var result = "";
  if (fieldObject != null) {
    Object.getOwnPropertyNames(fieldObject).forEach(function (element) {
      if (field.toLowerCase() == element.toLowerCase()) {
        result = fieldObject[element];
      }
    });
  }
  return result;
};
exports.findTheValue = findTheValue;
var findCustomFieldValue = function findCustomFieldValue(fieldObject, field) {
  var result = null;
  if (fieldObject != null && fieldObject.customFields) {
    fieldObject.customFields.forEach(function (userCustomField) {
      if (field.toLowerCase() == userCustomField.name.toLowerCase()) {
        if (userCustomField.customFieldType == 5) {
          result = userCustomField.value === "true";
        } else {
          result = userCustomField.value;
        }
      }
    });
  }
  return result;
};
var renderCustomField = function renderCustomField(identifier, fieldObject, control, errors, register, setValue, customFields) {
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, (identifier != -1 ? fieldObject != null : true) && customFields.map(function (field) {
    var result = findCustomFieldValue(fieldObject, field.name);
    return /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
      size: field.size != null ? field.size : 12
    }, /*#__PURE__*/_react["default"].createElement(_reactHookForm.Controller, {
      name: field.customFieldId,
      control: control,
      defaultValue: result
      // defaultChecked={result}
      ,
      rules: {
        required: field.isRequired
      },
      render: function render(_ref) {
        var _ref$field = _ref.field,
          onChange = _ref$field.onChange,
          value = _ref$field.value;
        return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, field.customFieldType === 1 && /*#__PURE__*/_react["default"].createElement(_material.TextField, _extends({
          label: field.name,
          variant: "outlined",
          margin: "normal",
          fullWidth: true
        }, register(field.customFieldId, {
          required: field.isRequired
        }), {
          onChange: onChange,
          value: value || ''
        })), field.customFieldType == 2 && /*#__PURE__*/_react["default"].createElement(_material.Box, {
          sx: {
            height: 10
          }
        })

        // <TextField
        //   label={field.name}
        //   variant="outlined"
        //   margin="normal"
        //   fullWidth
        //   {...register(field.customFieldId, { required: field.isRequired })}
        //   onChange={onChange}
        //   value={value || ''}
        // />
        , field.customFieldType === 5 && /*#__PURE__*/_react["default"].createElement(_FormControlLabel["default"], {
          control: /*#__PURE__*/_react["default"].createElement(_Switch["default"], _extends({
            checked: value || false
          }, register(field.customFieldId, {
            required: field.isRequired
          }), {
            onChange: onChange
          })),
          label: field.name
        }));
      }
    }), errors[field.customFieldId] && /*#__PURE__*/_react["default"].createElement(_material.Typography, {
      color: "red"
    }, field.name, " is required."));
  }));
};
exports.renderCustomField = renderCustomField;
var renderSystemField = function renderSystemField(identifier, fieldObject, control, errors, register, customFields) {
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, (identifier != -1 ? fieldObject != null : true) && customFields.map(function (field) {
    var result = findTheValue(fieldObject, field);
    var isRequied = true;
    if (field == "PhoneNumber") {
      isRequied = false;
    }
    return /*#__PURE__*/_react["default"].createElement(_material.Box, null, field == "IsActive" && /*#__PURE__*/_react["default"].createElement(_material.Box, null, /*#__PURE__*/_react["default"].createElement(_reactHookForm.Controller, {
      name: field,
      control: control,
      rules: {
        required: false
      },
      render: function render(_ref2) {
        var renderField = _ref2.renderField;
        return /*#__PURE__*/_react["default"].createElement(_FormControlLabel["default"], _extends({
          control: /*#__PURE__*/_react["default"].createElement(_Switch["default"], {
            defaultChecked: result
          }),
          label: field
        }, register(field, {
          required: false
        }), renderField));
      }
    }), errors[field] && /*#__PURE__*/_react["default"].createElement(_material.Typography, {
      color: "red"
    }, field, " is required.")), field != "IsActive" && /*#__PURE__*/_react["default"].createElement(_material.Box, null, /*#__PURE__*/_react["default"].createElement(_reactHookForm.Controller, {
      name: field,
      control: control,
      rules: {
        required: isRequied
      },
      render: function render(_ref3) {
        var renderField = _ref3.renderField;
        return /*#__PURE__*/_react["default"].createElement(_material.TextField, _extends({
          label: field,
          variant: "outlined",
          defaultValue: result,
          margin: "normal",
          fullWidth: true
        }, register(field, {
          required: isRequied
        }), renderField));
      }
    }), errors[field] && /*#__PURE__*/_react["default"].createElement(_material.Typography, {
      color: "red"
    }, field, " is required.")));
  }));
};
exports.renderSystemField = renderSystemField;
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
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
var _BusinessRounded = _interopRequireDefault(require("@mui/icons-material/BusinessRounded"));
var _authscape = require("authscape");
var _Grid = _interopRequireDefault(require("@mui/material/Grid2"));
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
// remove when publishing
// import {renderCustomField, renderSystemField } from './EditorFields';
var UserEditor = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var _ref$userId = _ref.userId,
    userId = _ref$userId === void 0 ? null : _ref$userId,
    platformType = _ref.platformType,
    _ref$onSaved = _ref.onSaved,
    onSaved = _ref$onSaved === void 0 ? null : _ref$onSaved;
  var _useForm = (0, _reactHookForm.useForm)(),
    control = _useForm.control,
    register = _useForm.register,
    handleSubmit = _useForm.handleSubmit,
    errors = _useForm.formState.errors,
    watch = _useForm.watch,
    setValue = _useForm.setValue;
  var refTimeoutToken = (0, _react.useRef)(null);
  var refShouldClose = (0, _react.useRef)(null);
  var refSubmitButton = (0, _react.useRef)(null);
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
  var _useState25 = (0, _react.useState)([]),
    _useState26 = _slicedToArray(_useState25, 2),
    tabOptions = _useState26[0],
    setTabOptions = _useState26[1];
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
  var _useState27 = (0, _react.useState)(""),
    _useState28 = _slicedToArray(_useState27, 2),
    newPassword = _useState28[0],
    setNewPassword = _useState28[1];
  var _useState29 = (0, _react.useState)(""),
    _useState30 = _slicedToArray(_useState29, 2),
    confirmPassword = _useState30[0],
    setConfirmPassword = _useState30[1];
  var _useState31 = (0, _react.useState)(0),
    _useState32 = _slicedToArray(_useState31, 2),
    tabValue = _useState32[0],
    setTabValue = _useState32[1];
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
                  if (response.data.customFields != null) {
                    setCustomFields(response.data.customFields);
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
  var fields = ["FirstName", "LastName", "IsActive", "Email", "PhoneNumber"];
  function a11yProps(index) {
    return {
      id: "simple-tab-".concat(index),
      'aria-controls': "simple-tabpanel-".concat(index)
    };
  }
  var refreshTabOptions = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      var customTabResponse, dataElement;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _authscape.apiService)().get("/UserManagement/GetCustomTabs?platformType=" + platformType);
          case 2:
            customTabResponse = _context3.sent;
            if (customTabResponse != null && customTabResponse.status == 200) {
              dataElement = customTabResponse.data;
              setTabOptions(dataElement);
              if (dataElement.length > 0) {
                setTabValue(dataElement[0].id);
              }
            }
          case 4:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function refreshTabOptions() {
      return _ref4.apply(this, arguments);
    };
  }();
  (0, _react.useEffect)(function () {
    var fetchData = /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var response2;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return (0, _authscape.apiService)().get("/UserManagement/GetCompanies?name=" + inputCompanyValue);
            case 2:
              response2 = _context4.sent;
              if (response2 != null && response2.status == 200) {
                setCompanies(response2.data);
              }
              _context4.next = 6;
              return refreshTabOptions();
            case 6:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      return function fetchData() {
        return _ref5.apply(this, arguments);
      };
    }();

    // sets a delay so the user can type
    clearTimeout(refTimeoutToken.current);
    refTimeoutToken.current = setTimeout(function () {
      clearTimeout(refTimeoutToken.current);
      fetchData();
    }, 1000);
  }, [inputCompanyValue]);
  (0, _react.useEffect)(function () {
    var fetchData = /*#__PURE__*/function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var response, _response;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              if (!(company != null)) {
                _context5.next = 12;
                break;
              }
              if (!(inputLocationValue == null || inputLocationValue == "")) {
                _context5.next = 8;
                break;
              }
              _context5.next = 4;
              return (0, _authscape.apiService)().get("/UserManagement/GetLocations?companyId=" + company.id);
            case 4:
              response = _context5.sent;
              if (response != null && response.status == 200) {
                setLocations(response.data);
              }
              _context5.next = 12;
              break;
            case 8:
              _context5.next = 10;
              return (0, _authscape.apiService)().get("/UserManagement/GetLocations?companyId=" + company.id + "&name=" + inputLocationValue);
            case 10:
              _response = _context5.sent;
              if (_response != null && _response.status == 200) {
                setLocations(_response.data);
              }
            case 12:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      return function fetchData() {
        return _ref6.apply(this, arguments);
      };
    }();
    if (user != null || userId == -1) {
      fetchData();
    }
  }, [user, userId, inputLocationValue, company]);
  var saveChanges = function saveChanges(shouldClose) {
    refShouldClose.current = shouldClose;
    refSubmitButton.current.click();
  };
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      saveChanges: saveChanges
    };
  });
  return /*#__PURE__*/_react["default"].createElement(_system.Box, null, /*#__PURE__*/_react["default"].createElement("form", {
    onSubmit: handleSubmit( /*#__PURE__*/function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(data) {
        var userCustomFields, response;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              userCustomFields = [];
              customFields && customFields.forEach(function (customField) {
                var newValue = data[customField.customFieldId];
                if (newValue != null) {
                  userCustomFields.push({
                    customFieldId: customField.customFieldId,
                    name: customField.name,
                    isRequired: customField.isRequired,
                    customFieldType: customField.customFieldType,
                    value: newValue.toString()
                  });
                }
              });
              _context6.next = 4;
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
                customFields: userCustomFields
              });
            case 4:
              response = _context6.sent;
              if (response != null && response.status == 200) {
                if (onSaved != null) {
                  onSaved(refShouldClose.current);
                }
              }
            case 6:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }));
      return function (_x2) {
        return _ref7.apply(this, arguments);
      };
    }()),
    noValidate: true,
    autoComplete: "off"
  }, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    container: true,
    spacing: 2,
    sx: {
      paddingTop: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    size: 3,
    sx: {
      backgroundColor: "#f5f8fa",
      borderRadius: 2,
      border: "1px solid lightgray",
      padding: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_system.Box, {
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
  })), /*#__PURE__*/_react["default"].createElement("hr", null), /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      fontWeight: "bold",
      paddingBottom: 1
    }
  }, "About this contact"), renderSystemField(userId, user, control, errors, register, fields), /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      fontWeight: "bold",
      paddingTop: 1,
      paddingBottom: 1
    }
  }, "Companies and Locations"), /*#__PURE__*/_react["default"].createElement(_system.Box, null, /*#__PURE__*/_react["default"].createElement(_material.Autocomplete, {
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
    noOptionsText: "No companies",
    onChange: function onChange(event, newValue) {
      //setCompanies(newValue ? [newValue, ...companies] : companies);
      setCompany(newValue);
      setLocation(null);
    },
    onInputChange: function onInputChange(event, newInputValue) {
      setInputCompanyValue(newInputValue);
      setLocation(null);
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

      return /*#__PURE__*/_react["default"].createElement("li", _extends({}, props, {
        key: "company-" + props.id
      }), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
        container: true,
        alignItems: "center"
      }, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
        item: true,
        sx: {
          display: 'flex',
          width: 44
        }
      }, /*#__PURE__*/_react["default"].createElement(_BusinessRounded["default"], {
        sx: {
          color: 'text.secondary'
        }
      })), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
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
      //setInputCompanyValue(newInputValue);
    },
    renderInput: function renderInput(params) {
      return /*#__PURE__*/_react["default"].createElement(_TextField["default"], _extends({}, params, {
        label: "Location",
        fullWidth: true
      }));
    },
    renderOption: function renderOption(props, option) {
      return /*#__PURE__*/_react["default"].createElement("li", props, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
        container: true,
        alignItems: "center"
      }, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
        item: true,
        sx: {
          display: 'flex',
          width: 44
        }
      }, /*#__PURE__*/_react["default"].createElement(_BusinessRounded["default"], {
        sx: {
          color: 'text.secondary'
        }
      })), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
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
  })), /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      fontWeight: "bold",
      paddingTop: 2
    }
  }, "Roles and Permissions"), /*#__PURE__*/_react["default"].createElement(_system.Box, null, /*#__PURE__*/_react["default"].createElement(_FormControl["default"], {
    sx: {
      marginTop: 3,
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
      marginTop: 3,
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
  }, "permissions", " is required."))), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    size: 9
  }, /*#__PURE__*/_react["default"].createElement(_system.Box, null, /*#__PURE__*/_react["default"].createElement(_system.Box, null, /*#__PURE__*/_react["default"].createElement(_material.Tabs, {
    value: tabValue,
    onChange: handleTabChange,
    variant: "fullWidth",
    "aria-label": "basic tabs example",
    centered: true
  }, tabOptions.map(function (tab, index) {
    return /*#__PURE__*/_react["default"].createElement(_material.Tab, {
      label: tab.name,
      value: tab.id
    });
  }))), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    container: true,
    spacing: 1,
    sx: {
      paddingLeft: 2,
      paddingRight: 2,
      paddingTop: 2
    }
  }, tabOptions.map(function (tab, index) {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, tabValue === tab.id && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, customFields != null && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, renderCustomField(userId, user, control, errors, register, setValue, customFields.filter(function (s) {
      return s.tabId == tab.id;
    })))));
  }), /*#__PURE__*/_react["default"].createElement(_material.Button, {
    ref: refSubmitButton,
    variant: "contained",
    type: "submit",
    sx: {
      display: "none"
    }
  }, "Save Changes")))))));
});
UserEditor.displayName = "UserEditor";
var _default = UserEditor;
exports["default"] = _default;
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
var _authscape = require("authscape");
var _Grid = _interopRequireDefault(require("@mui/material/Grid2"));
var _KeyboardBackspaceRounded = _interopRequireDefault(require("@mui/icons-material/KeyboardBackspaceRounded"));
var _AddRounded = _interopRequireDefault(require("@mui/icons-material/AddRounded"));
var _SaveRounded = _interopRequireDefault(require("@mui/icons-material/SaveRounded"));
var _SettingsRounded = _interopRequireDefault(require("@mui/icons-material/SettingsRounded"));
var _PasswordRounded = _interopRequireDefault(require("@mui/icons-material/PasswordRounded"));
var _Autocomplete = _interopRequireDefault(require("@mui/material/Autocomplete"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
// comment this out when done
// import UserEditor from './UserEditor'; // remove when done
// import { CompanyEditor } from './CompanyEditor' // remove when done
// import { CSVUsersUpload } from './CSVUsersUpload'; // remove when done
// import { CustomFields } from './CustomFields'; // remove when done
function UserManagement(_ref) {
  var _ref$height = _ref.height,
    height = _ref$height === void 0 ? "50vh" : _ref$height,
    _ref$platformType = _ref.platformType,
    platformType = _ref$platformType === void 0 ? 1 : _ref$platformType,
    _ref$onUploadComplete = _ref.onUploadCompleted,
    onUploadCompleted = _ref$onUploadComplete === void 0 ? null : _ref$onUploadComplete;
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    showUserDetails = _useState2[0],
    setShowUserDetails = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    showCustomSettings = _useState4[0],
    setShowCustomSettings = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    showContactDialog = _useState6[0],
    setShowContactDialog = _useState6[1];
  var _useState7 = (0, _react.useState)([]),
    _useState8 = _slicedToArray(_useState7, 2),
    allRoles = _useState8[0],
    setAllRoles = _useState8[1];
  var _useState9 = (0, _react.useState)([]),
    _useState10 = _slicedToArray(_useState9, 2),
    allCompanies = _useState10[0],
    setAllCompanies = _useState10[1];
  var _useState11 = (0, _react.useState)(false),
    _useState12 = _slicedToArray(_useState11, 2),
    showChangePasswordDialog = _useState12[0],
    setShowChangePasswordDialog = _useState12[1];
  var _useState13 = (0, _react.useState)(null),
    _useState14 = _slicedToArray(_useState13, 2),
    newPassword = _useState14[0],
    setNewPassword = _useState14[1];
  var _useState15 = (0, _react.useState)(null),
    _useState16 = _slicedToArray(_useState15, 2),
    confirmPassword = _useState16[0],
    setConfirmPassword = _useState16[1];
  var _useState17 = (0, _react.useState)(0),
    _useState18 = _slicedToArray(_useState17, 2),
    dataGridRefreshKey = _useState18[0],
    setDataGridRefreshKey = _useState18[1];
  var _useState19 = (0, _react.useState)(false),
    _useState20 = _slicedToArray(_useState19, 2),
    uploadUsersShowDialog = _useState20[0],
    setUploadUsersShowDialog = _useState20[1];
  var _useState21 = (0, _react.useState)(''),
    _useState22 = _slicedToArray(_useState21, 2),
    searchByName = _useState22[0],
    setSearchByName = _useState22[1];
  var _useState23 = (0, _react.useState)(null),
    _useState24 = _slicedToArray(_useState23, 2),
    searchByCompanyId = _useState24[0],
    setSearchByCompanyId = _useState24[1];
  var _useState25 = (0, _react.useState)(null),
    _useState26 = _slicedToArray(_useState25, 2),
    searchByRoleId = _useState26[0],
    setSearchByRoleId = _useState26[1];
  var userEditorRef = (0, _react.useRef)();
  var newFirstName = (0, _react.useRef)();
  var newLastName = (0, _react.useRef)();
  var newEmail = (0, _react.useRef)();
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
  var companiesColumns = [{
    field: 'logo',
    headerName: 'Logo',
    flex: 1,
    renderCell: function renderCell(param) {
      return /*#__PURE__*/_react["default"].createElement(_system.Box, {
        sx: {
          backgroundImage: "url(".concat(param.row.logo, ")"),
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          marginTop: 1
        },
        height: 50
      });
    }
  }, {
    field: 'title',
    headerName: 'Name',
    flex: 1,
    renderCell: function renderCell(param) {
      return param.row.title;
    }
  }, {
    field: 'numberOfLocations',
    headerName: 'Number of Locations',
    flex: 1,
    renderCell: function renderCell(param) {
      return param.row.numberOfLocations != null ? param.row.numberOfLocations : "";
    }
  }, {
    field: 'numberOfUsers',
    headerName: 'Number of Users',
    flex: 1,
    renderCell: function renderCell(param) {
      return param.row.numberOfUsers != null ? param.row.numberOfUsers : "";
    }
  }];
  (0, _react.useEffect)(function () {
    setDataGridRefreshKey(dataGridRefreshKey + 1);
  }, [searchByName]);
  var getDataGrid = function getDataGrid() {
    getAllCompanies();
    getAllRoles();
    var response = "";
    if (platformType == 1) {
      response = "/UserManagement/GetUsers";
    } else if (platformType == 2) {
      response = "/UserManagement/GetCompanies";
    } else if (platformType == 3) {}
    return response;
  };
  var getColumns = function getColumns() {
    if (platformType == 1) {
      return userColumns;
    } else if (platformType == 2) {
      return companiesColumns;
    } else if (platformType == 3) {
      return null;
    }
  };
  var getAllCompanies = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var results, response;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            results = [];
            _context.next = 3;
            return (0, _authscape.apiService)().get("/UserManagement/GetCompanies");
          case 3:
            response = _context.sent;
            response.data.forEach(function (element) {
              results.push({
                label: element.title,
                id: element.id
              });
            });
            setAllCompanies(results);
          case 6:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function getAllCompanies() {
      return _ref2.apply(this, arguments);
    };
  }();
  var getAllRoles = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var results, response;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            results = [];
            _context2.next = 3;
            return (0, _authscape.apiService)().get("/UserManagement/GetRoles");
          case 3:
            response = _context2.sent;
            response.data.forEach(function (element) {
              results.push({
                label: element.name,
                id: element.id
              });
            });
            setAllRoles(results);
          case 6:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function getAllRoles() {
      return _ref3.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/_react["default"].createElement(_system.Box, null, /*#__PURE__*/_react["default"].createElement(_material.AppBar, {
    color: "invert",
    position: "static",
    sx: {
      borderRadius: 1,
      paddingLeft: 3,
      paddingRight: 3,
      minHeight: 50
    }
  }, /*#__PURE__*/_react["default"].createElement(_material.Toolbar, {
    disableGutters: true
  }, !showCustomSettings && showUserDetails && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      paddingRight: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_KeyboardBackspaceRounded["default"], {
    sx: {
      display: {
        xs: 'none',
        md: 'flex'
      },
      mr: 1,
      cursor: "pointer"
    },
    onClick: function onClick() {
      setShowUserDetails(null);
    }
  })), /*#__PURE__*/_react["default"].createElement(_material.Divider, {
    orientation: "vertical",
    flexItem: true
  })), showCustomSettings && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      paddingRight: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_KeyboardBackspaceRounded["default"], {
    sx: {
      display: {
        xs: 'none',
        md: 'flex'
      },
      mr: 1,
      cursor: "pointer"
    },
    onClick: function onClick() {
      setShowCustomSettings(false);
    }
  })), /*#__PURE__*/_react["default"].createElement(_material.Divider, {
    orientation: "vertical",
    flexItem: true
  })), !showCustomSettings && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, showUserDetails && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      paddingRight: 2,
      paddingLeft: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_material.Button, {
    variant: "text",
    startIcon: /*#__PURE__*/_react["default"].createElement(_SaveRounded["default"], null),
    onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            userEditorRef.current.saveChanges();
          case 1:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }))
  }, "Save")), /*#__PURE__*/_react["default"].createElement(_material.Divider, {
    orientation: "vertical",
    flexItem: true
  })), showUserDetails && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      paddingRight: 2,
      paddingLeft: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_material.Button, {
    variant: "text",
    startIcon: /*#__PURE__*/_react["default"].createElement(_SaveRounded["default"], null),
    onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            userEditorRef.current.saveChanges(true);
            setShowUserDetails(null);
          case 2:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }))
  }, "Save & close")), /*#__PURE__*/_react["default"].createElement(_material.Divider, {
    orientation: "vertical",
    flexItem: true
  })), showUserDetails && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      paddingRight: 2,
      paddingLeft: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_material.Button, {
    variant: "text",
    startIcon: /*#__PURE__*/_react["default"].createElement(_PasswordRounded["default"], null),
    onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            setShowChangePasswordDialog(true);
          case 1:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }))
  }, "Change Password")), /*#__PURE__*/_react["default"].createElement(_material.Divider, {
    orientation: "vertical",
    flexItem: true
  })), !showUserDetails && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      paddingRight: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_material.Typography, {
    variant: "body",
    sx: {
      fontSize: 20,
      fontWeight: "bold"
    }
  }, platformType == 1 && "Contacts", platformType == 2 && "Companies", platformType == 3 && "Locations")), /*#__PURE__*/_react["default"].createElement(_material.Divider, {
    orientation: "vertical",
    flexItem: true
  })), !showUserDetails && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      paddingRight: 2,
      paddingLeft: 1
    }
  }, /*#__PURE__*/_react["default"].createElement(_material.Button, {
    variant: "text",
    startIcon: /*#__PURE__*/_react["default"].createElement(_AddRounded["default"], null),
    onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            setShowContactDialog(true);
          case 1:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    }))
  }, "Add Contact")), /*#__PURE__*/_react["default"].createElement(_material.Divider, {
    orientation: "vertical",
    flexItem: true
  })), !showUserDetails && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      paddingRight: 2,
      paddingLeft: 1
    }
  }, /*#__PURE__*/_react["default"].createElement(_material.Button, {
    variant: "text",
    startIcon: /*#__PURE__*/_react["default"].createElement(_UploadRounded["default"], null),
    onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            setUploadUsersShowDialog(true);
          case 1:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    }))
  }, "Upload Users")), /*#__PURE__*/_react["default"].createElement(_material.Divider, {
    orientation: "vertical",
    flexItem: true
  }))), /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      flexGrow: 1,
      display: {
        xs: 'none',
        md: 'flex'
      }
    }
  }), /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      flexGrow: 0
    }
  }, /*#__PURE__*/_react["default"].createElement(_material.Tooltip, {
    title: "Custom Fields"
  }, /*#__PURE__*/_react["default"].createElement(_IconButton["default"], {
    sx: {
      p: 0
    },
    onClick: function onClick() {
      setShowCustomSettings(true);
    }
  }, /*#__PURE__*/_react["default"].createElement(_SettingsRounded["default"], {
    sx: {
      fontSize: 25
    }
  }))), /*#__PURE__*/_react["default"].createElement(_material.Menu, {
    sx: {
      mt: '45px'
    },
    id: "menu-appbar"
    // anchorEl={anchorElUser}
    ,
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'right'
    },
    keepMounted: true,
    transformOrigin: {
      vertical: 'top',
      horizontal: 'right'
    }
  })))), /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      marginTop: 1,
      padding: 2,
      borderRadius: 1,
      boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
    }
  }, showUserDetails == null && /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      paddingBottom: 1
    }
  }, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    container: true,
    spacing: 2
  }, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    size: 4
  }, /*#__PURE__*/_react["default"].createElement(_authscape.AutoSaveTextField, {
    label: "name or email ",
    fullWidth: true,
    onChanged: function onChanged(value) {
      setSearchByName(value);
      setDataGridRefreshKey(dataGridRefreshKey + 1);
    }
  })), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    size: 4
  }, /*#__PURE__*/_react["default"].createElement(_Autocomplete["default"], {
    disablePortal: true,
    options: allCompanies,
    renderInput: function renderInput(params) {
      return /*#__PURE__*/_react["default"].createElement(_material.TextField, _extends({}, params, {
        label: "Companies"
      }));
    },
    onChange: function onChange(event, newValue) {
      if (newValue != null) {
        setSearchByCompanyId(newValue.id);
        setDataGridRefreshKey(dataGridRefreshKey + 1);
      } else {
        setSearchByCompanyId(null);
        setDataGridRefreshKey(dataGridRefreshKey + 1);
      }
    }
  })), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    size: 4
  }, /*#__PURE__*/_react["default"].createElement(_Autocomplete["default"], {
    disablePortal: true,
    options: allRoles,
    renderInput: function renderInput(params) {
      return /*#__PURE__*/_react["default"].createElement(_material.TextField, _extends({}, params, {
        label: "Roles"
      }));
    },
    onChange: function onChange(event, newValue) {
      if (newValue != null) {
        setSearchByRoleId(newValue.id);
        setDataGridRefreshKey(dataGridRefreshKey + 1);
      } else {
        setSearchByRoleId(null);
        setDataGridRefreshKey(dataGridRefreshKey + 1);
      }
    }
  })))), !showCustomSettings && /*#__PURE__*/_react["default"].createElement(_system.Box, null, showUserDetails == null && /*#__PURE__*/_react["default"].createElement(_authscape.EditableDatagrid, {
    key: dataGridRefreshKey,
    height: height,
    pageSize: 25,
    url: getDataGrid(),
    columns: getColumns(),
    params: {
      searchByName: searchByName,
      searchByCompanyId: searchByCompanyId,
      searchByRoleId: searchByRoleId
    },
    onRowClick: function onRowClick(row) {
      setShowUserDetails(row.id);
    }
  }), /*#__PURE__*/_react["default"].createElement(_system.Box, null, showUserDetails != null && /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    item: true,
    xs: 12
  }, /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      width: '100%'
    }
  }, platformType == 1 && /*#__PURE__*/_react["default"].createElement(UserEditor, {
    platformType: platformType,
    ref: userEditorRef,
    userId: showUserDetails,
    onSaved: function onSaved(shouldClose) {
      setDataGridRefreshKey(dataGridRefreshKey + 1);
      if (shouldClose) {
        setShowUserDetails(null);
      }
    }
  }), platformType == 2 && /*#__PURE__*/_react["default"].createElement(CompanyEditor, {
    companyId: showUserDetails,
    onSaved: function onSaved(shouldClose) {
      setDataGridRefreshKey(dataGridRefreshKey + 1);
      if (shouldClose) {
        setShowUserDetails(null);
      }
    }
  }))))), /*#__PURE__*/_react["default"].createElement(_material.Dialog, {
    open: showChangePasswordDialog,
    onClose: function onClose() {
      setShowChangePasswordDialog(false);
    },
    "aria-labelledby": "alert-dialog-title",
    "aria-describedby": "alert-dialog-description"
  }, /*#__PURE__*/_react["default"].createElement(_material.DialogTitle, {
    id: "alert-dialog-title"
  }, "Change Password"), /*#__PURE__*/_react["default"].createElement(_material.DialogContent, null, /*#__PURE__*/_react["default"].createElement(_material.DialogContentText, {
    id: "alert-dialog-description"
  }, "Please provide the new password that you want to change for this users account."), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    size: 12
  }, /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      paddingTop: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_material.TextField, {
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
  }, /*#__PURE__*/_react["default"].createElement(_material.TextField, {
    id: "txtConfirmPassword",
    label: "Confirm Password",
    variant: "outlined",
    fullWidth: true,
    onChange: function onChange(val) {
      setConfirmPassword(val.currentTarget.value);
    }
  }), newPassword !== confirmPassword && /*#__PURE__*/_react["default"].createElement(_material.Typography, {
    color: "red"
  }, "New Password and Confirm Password", " does not match.")))), /*#__PURE__*/_react["default"].createElement(_material.DialogActions, null, /*#__PURE__*/_react["default"].createElement(_material.Button, {
    onClick: function onClick() {
      setShowChangePasswordDialog(false);
    }
  }, "Cancel"), /*#__PURE__*/_react["default"].createElement(_material.Button, {
    onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
      var response;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            if (!(newPassword != null && confirmPassword != null && confirmPassword != "" && newPassword != "")) {
              _context8.next = 5;
              break;
            }
            _context8.next = 3;
            return (0, _authscape.apiService)().put("/UserManagement/ChangeUserPassword", {
              userId: parseInt(showUserDetails),
              password: newPassword
            });
          case 3:
            response = _context8.sent;
            if (response.data != null && response.data.error != null) {
              alert(response.data.error);
            } else {
              setShowChangePasswordDialog(false);
            }
          case 5:
          case "end":
            return _context8.stop();
        }
      }, _callee8);
    }))
  }, "Change Password"))), /*#__PURE__*/_react["default"].createElement(_material.Dialog, {
    open: showContactDialog,
    onClose: function onClose() {
      setShowContactDialog(false);
    },
    "aria-labelledby": "alert-dialog-title",
    "aria-describedby": "alert-dialog-description"
  }, /*#__PURE__*/_react["default"].createElement(_material.DialogTitle, {
    id: "alert-dialog-title"
  }, "Setup Contact Account"), /*#__PURE__*/_react["default"].createElement(_material.DialogContent, null, /*#__PURE__*/_react["default"].createElement(_material.DialogContentText, {
    id: "alert-dialog-description"
  }, "Please provide the following information to proceed and complete the account setup."), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    container: true,
    spacing: 2,
    sx: {
      paddingTop: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    size: 6
  }, /*#__PURE__*/_react["default"].createElement(_material.TextField, {
    inputRef: newFirstName,
    label: "First Name",
    variant: "outlined",
    fullWidth: true
  })), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    size: 6
  }, /*#__PURE__*/_react["default"].createElement(_material.TextField, {
    inputRef: newLastName,
    label: "Last Name",
    variant: "outlined",
    fullWidth: true
  })), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    size: 12
  }, /*#__PURE__*/_react["default"].createElement(_material.TextField, {
    inputRef: newEmail,
    label: "Email",
    variant: "outlined",
    fullWidth: true
  })))), /*#__PURE__*/_react["default"].createElement(_material.DialogActions, null, /*#__PURE__*/_react["default"].createElement(_material.Button, {
    onClick: function onClick() {
      setShowChangePasswordDialog(false);
    }
  }, "Cancel"), /*#__PURE__*/_react["default"].createElement(_material.Button, {
    onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            alert(newFirstName.current.value);
            alert(newLastName.current.value);
            alert(newEmail.current.value);

            // if (newPassword != null && confirmPassword != null && confirmPassword != "" && newPassword != "")
            // {
            //     let response = await apiService().put("/UserManagement/ChangeUserPassword", {
            //         userId: parseInt(showUserDetails),
            //         password: newPassword
            //     });

            //     if (response.data != null && response.data.error != null)
            //     {
            //         alert(response.data.error);
            //     }
            //     else
            //     {
            //         setShowChangePasswordDialog(false);
            //     }
            // }
          case 3:
          case "end":
            return _context9.stop();
        }
      }, _callee9);
    }))
  }, "create contact"))), showCustomSettings && /*#__PURE__*/_react["default"].createElement(CustomFields, {
    platformType: platformType
  }), /*#__PURE__*/_react["default"].createElement(CSVUsersUpload, {
    showDialog: uploadUsersShowDialog,
    onClose: function onClose() {
      setUploadUsersShowDialog(false);
    }
  })));
}
