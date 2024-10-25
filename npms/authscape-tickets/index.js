"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Comments = Comments;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _InputBase = _interopRequireDefault(require("@mui/material/InputBase"));
var _IconButton = _interopRequireDefault(require("@mui/material/IconButton"));
var _QuestionAnswerOutlined = _interopRequireDefault(require("@mui/icons-material/QuestionAnswerOutlined"));
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
var _Grid = _interopRequireDefault(require("@mui/material/Grid"));
var _List = _interopRequireDefault(require("@mui/material/List"));
var _ListItem = _interopRequireDefault(require("@mui/material/ListItem"));
var _Avatar = _interopRequireDefault(require("@mui/material/Avatar"));
var _SendRounded = _interopRequireDefault(require("@mui/icons-material/SendRounded"));
var _scrollIntoViewIfNeeded = _interopRequireDefault(require("scroll-into-view-if-needed"));
var _Stack = _interopRequireDefault(require("@mui/material/Stack"));
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
function Comments(_ref) {
  var ticketId = _ref.ticketId,
    isNote = _ref.isNote,
    isDisabled = _ref.isDisabled,
    currentUser = _ref.currentUser;
  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    comments = _useState2[0],
    setComments = _useState2[1];
  var _useState3 = (0, _react.useState)(""),
    _useState4 = _slicedToArray(_useState3, 2),
    message = _useState4[0],
    setMessage = _useState4[1];
  // const [messageDialogOpen, setMessageDialogOpen] = useState(false);

  var reloadMessages = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var response, node;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _authscape.apiService)().get("/Ticket/GetMessages?TicketId=" + ticketId + "&isNote=" + isNote);
          case 2:
            response = _context.sent;
            if (response != null && response.status == 200) {
              setComments(response.data);
            }
            node = document.getElementById('messages');
            if (node != null) {
              (0, _scrollIntoViewIfNeeded["default"])(node, {
                behavior: 'smooth',
                scrollMode: 'if-needed'
              });
            }

            // setIsLoading(false);
          case 6:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function reloadMessages() {
      return _ref2.apply(this, arguments);
    };
  }();
  (0, _react.useEffect)(function () {
    if (ticketId != null) {
      var asyncPush = /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return reloadMessages();
              case 2:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }));
        return function asyncPush() {
          return _ref3.apply(this, arguments);
        };
      }();
      asyncPush();
    }
  }, [ticketId]);
  var SendMessage = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      var response;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            if (!(message !== "")) {
              _context3.next = 8;
              break;
            }
            _context3.next = 3;
            return (0, _authscape.apiService)().post("/Ticket/CreateMessage", {
              ticketId: ticketId,
              name: currentUser.firstName,
              message: message,
              isNote: isNote
            });
          case 3:
            response = _context3.sent;
            if (!(response != null && response.status == 200)) {
              _context3.next = 8;
              break;
            }
            _context3.next = 7;
            return reloadMessages();
          case 7:
            // messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            // let messages = comments.slice();
            // messages.push(message);
            // setComments(messages);
            setMessage("");
          case 8:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function SendMessage() {
      return _ref4.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/_react["default"].createElement(_material.Box, {
    sx: {
      display: "flex",
      flexDirection: "column",
      height: "100%"
    }
  }, /*#__PURE__*/_react["default"].createElement(_material.Box, {
    sx: {
      backgroundColor: "#F3F5F7",
      overflow: "auto",
      flex: "1 1 auto"
    }
  }, /*#__PURE__*/_react["default"].createElement(_material.Box, null, comments.length == 0 && /*#__PURE__*/_react["default"].createElement(_material.Box, {
    sx: {
      paddingLeft: 4
    }
  }, /*#__PURE__*/_react["default"].createElement(_QuestionAnswerOutlined["default"], {
    sx: {
      fill: "gray",
      position: "relative",
      top: "4px",
      marginRight: 2
    },
    fontSize: "2px"
  }), /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
    variant: "subtitle2",
    color: "text.secondary",
    component: "span",
    sx: {
      marginTop: 1
    }
  }, "Add your first ", isNote ? "note" : "message", ". ", isNote ? "Your notes" : "The conversation history", " will appear here")), /*#__PURE__*/_react["default"].createElement(_material.Box, {
    sx: {
      overflow: "scroll",
      height: "300px"
    }
  }, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    container: true
  }, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    item: true,
    xs: 12
  }, /*#__PURE__*/_react["default"].createElement(_List["default"], null, comments != null && comments.map(function (comment, index) {
    return /*#__PURE__*/_react["default"].createElement(_ListItem["default"], {
      key: index,
      sx: {
        marginTop: 1
      }
    }, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
      container: true
    }, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
      item: true,
      xs: 1
    }, /*#__PURE__*/_react["default"].createElement(_Avatar["default"], null)), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
      item: true,
      xs: 11
    }, /*#__PURE__*/_react["default"].createElement(_Stack["default"], {
      direction: "row",
      spacing: 1
    }, /*#__PURE__*/_react["default"].createElement(_material.Box, {
      sx: {
        fontSize: 12
      }
    }, comment.firstName), /*#__PURE__*/_react["default"].createElement(_material.Box, {
      sx: {
        fontSize: 12
      }
    }, comment.created)), /*#__PURE__*/_react["default"].createElement(_material.Box, {
      sx: {
        fontSize: 16
      }
    }, comment.message))));
  }), /*#__PURE__*/_react["default"].createElement(_ListItem["default"], null, /*#__PURE__*/_react["default"].createElement("div", {
    id: "messages"
  })))))))), /*#__PURE__*/_react["default"].createElement(_material.Box, {
    sx: {
      flex: "0 1 40px"
    }
  }, /*#__PURE__*/_react["default"].createElement(_material.Paper, {
    sx: {
      p: '2px 4px',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/_react["default"].createElement(_InputBase["default"], {
    sx: {
      ml: 1,
      flex: 1
    },
    disabled: isDisabled,
    onKeyUp: function onKeyUp(event) {
      if (event.key == "Enter") {
        SendMessage();
      }
    },
    placeholder: !isNote ? "Write your message here..." : "Write your notes here...",
    value: message,
    onChange: function onChange(value) {
      setMessage(value.target.value);
    }
  }), /*#__PURE__*/_react["default"].createElement(_IconButton["default"], {
    disabled: isDisabled,
    type: "button",
    sx: {
      p: '10px'
    },
    "aria-label": "search",
    onClick: function onClick() {
      SendMessage();
    }
  }, /*#__PURE__*/_react["default"].createElement(_SendRounded["default"], null)))));
}
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TicketDetail = void 0;
var _react = _interopRequireWildcard(require("react"));
var _system = require("@mui/system");
var _Grid = _interopRequireDefault(require("@mui/material/Grid"));
var _Tabs = _interopRequireDefault(require("@mui/material/Tabs"));
var _Tab = _interopRequireDefault(require("@mui/material/Tab"));
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
var _InputLabel = _interopRequireDefault(require("@mui/material/InputLabel"));
var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));
var _FormControl = _interopRequireDefault(require("@mui/material/FormControl"));
var _Select = _interopRequireDefault(require("@mui/material/Select"));
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
var _Autocomplete = _interopRequireWildcard(require("@mui/material/Autocomplete"));
var _material = require("@mui/material");
var _InsertDriveFileRounded = _interopRequireDefault(require("@mui/icons-material/InsertDriveFileRounded"));
var _ArrowBackIosRounded = _interopRequireDefault(require("@mui/icons-material/ArrowBackIosRounded"));
var _authscape = require("authscape");
var _IconButton = _interopRequireDefault(require("@mui/material/IconButton"));
var _CloseRounded = _interopRequireDefault(require("@mui/icons-material/CloseRounded"));
var _excluded = ["children", "value", "index"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
//import {Comments} from './comments';

var TicketDetail = function TicketDetail(_ref) {
  var ticketId = _ref.ticketId,
    setIsLoading = _ref.setIsLoading,
    currentUser = _ref.currentUser,
    _ref$GoBackToViewTick = _ref.GoBackToViewTickets,
    GoBackToViewTickets = _ref$GoBackToViewTick === void 0 ? null : _ref$GoBackToViewTick,
    _ref$customTabName = _ref.customTabName,
    customTabName = _ref$customTabName === void 0 ? null : _ref$customTabName,
    _ref$customTabElement = _ref.customTabElement,
    customTabElement = _ref$customTabElement === void 0 ? null : _ref$customTabElement;
  var _useState = (0, _react.useState)(0),
    _useState2 = _slicedToArray(_useState, 2),
    value = _useState2[0],
    setValue = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    status = _useState4[0],
    setStatus = _useState4[1];
  var _useState5 = (0, _react.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    ticketType = _useState6[0],
    setTicketType = _useState6[1];
  var _useState7 = (0, _react.useState)(null),
    _useState8 = _slicedToArray(_useState7, 2),
    ticket = _useState8[0],
    setTicket = _useState8[1];
  var _useState9 = (0, _react.useState)(0),
    _useState10 = _slicedToArray(_useState9, 2),
    priorty = _useState10[0],
    setPriority = _useState10[1];
  var _useState11 = (0, _react.useState)([]),
    _useState12 = _slicedToArray(_useState11, 2),
    participants = _useState12[0],
    setParticipants = _useState12[1];
  var _useState13 = (0, _react.useState)([]),
    _useState14 = _slicedToArray(_useState13, 2),
    ticketAttachments = _useState14[0],
    setTicketAttachments = _useState14[1];
  var _useState15 = (0, _react.useState)(null),
    _useState16 = _slicedToArray(_useState15, 2),
    customTabPayload = _useState16[0],
    setCustomTabPayload = _useState16[1];
  var _useState17 = (0, _react.useState)(null),
    _useState18 = _slicedToArray(_useState17, 2),
    ticketDescription = _useState18[0],
    setTicketDescription = _useState18[1];
  var _useState19 = (0, _react.useState)([]),
    _useState20 = _slicedToArray(_useState19, 2),
    createdByList = _useState20[0],
    setCreatedByList = _useState20[1];
  var _useState21 = (0, _react.useState)(null),
    _useState22 = _slicedToArray(_useState21, 2),
    selectedCreatedBy = _useState22[0],
    setSelectedCreatedBy = _useState22[1];
  (0, _react.useEffect)(function () {
    var fetchData = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var response;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              setIsLoading(true);
              _context.next = 3;
              return (0, _authscape.apiService)().get("/Ticket/GetTicket?ticketId=" + ticketId);
            case 3:
              response = _context.sent;
              if (response != null && response.status == 200) {
                setTicket(response.data);
                setIsLoading(false);
                setStatus(response.data.selectedTicketStatusId);
                setTicketType(response.data.selectedTicketTypeId);
                setPriority(response.data.selectedPriortyId);
                setSelectedCreatedBy(response.data.selectedCreatedBy);
                setParticipants(response.data.participants);
                setTicketAttachments(response.data.attachments);
                setCustomTabPayload(response.data.customTabPayload);
                setTicketDescription(response.data.description);
              }
            case 5:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function fetchData() {
        return _ref2.apply(this, arguments);
      };
    }();
    if (ticketId != null) {
      fetchData();
    }
  }, [ticketId]);
  function TabPanel(props) {
    var children = props.children,
      value = props.value,
      index = props.index,
      other = _objectWithoutProperties(props, _excluded);
    return /*#__PURE__*/_react["default"].createElement("div", _extends({
      role: "tabpanel",
      hidden: value !== index,
      id: "simple-tabpanel-".concat(index),
      "aria-labelledby": "simple-tab-".concat(index)
    }, other), value === index && /*#__PURE__*/_react["default"].createElement(_system.Box, {
      sx: {
        p: 3
      }
    }, /*#__PURE__*/_react["default"].createElement(_Typography["default"], null, children)));
  }
  function a11yProps(index) {
    return {
      id: "simple-tab-".concat(index),
      'aria-controls': "simple-tabpanel-".concat(index)
    };
  }
  var handleChange = function handleChange(event, newValue) {
    setValue(newValue);
  };
  var refreshCreatedByList = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(query) {
      var response;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _authscape.apiService)().get("/ticket/findUser?query=" + query);
          case 2:
            response = _context2.sent;
            if (response != null && response.status == 200) {
              setCreatedByList(response.data);
            }
          case 4:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function refreshCreatedByList(_x2) {
      return _ref3.apply(this, arguments);
    };
  }();
  var DownloadFile = function DownloadFile(_ref4) {
    var fileName = _ref4.fileName,
      uri = _ref4.uri;
    return /*#__PURE__*/_react["default"].createElement(_material.Card, {
      sx: {
        border: "1px solid black",
        padding: "10px",
        margin: "10px",
        width: "200px",
        textAlign: "center",
        // display: "flex",
        // alignItems: "center",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/_react["default"].createElement(_material.Stack, {
      spacing: 2
    }, /*#__PURE__*/_react["default"].createElement(_system.Box, {
      sx: {
        textAlign: "center"
      }
    }, /*#__PURE__*/_react["default"].createElement(_InsertDriveFileRounded["default"], {
      sx: {
        fontSize: 50
      }
    })), /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
      variant: "h6",
      component: "div"
    }, fileName), /*#__PURE__*/_react["default"].createElement(_material.Button, {
      variant: "contained",
      color: "primary",
      onClick: function onClick() {
        window.open(uri);
      }
    }, "Download")));
  };
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      width: '100%'
    }
  }, /*#__PURE__*/_react["default"].createElement(_IconButton["default"], {
    "aria-label": "delete",
    size: "small",
    sx: {
      position: "absolute",
      right: 20,
      top: 20
    },
    onClick: function onClick() {
      if (GoBackToViewTickets != null) {
        GoBackToViewTickets();
      }
    }
  }, /*#__PURE__*/_react["default"].createElement(_CloseRounded["default"], {
    fontSize: "inherit",
    sx: {
      width: 40,
      height: 40
    }
  })), /*#__PURE__*/_react["default"].createElement(_system.Box, null, /*#__PURE__*/_react["default"].createElement("h2", null, ticket != null && ticket.name)), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    container: true,
    spacing: 2
  }, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    item: true,
    xs: 4
  }, /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      minWidth: 120
    }
  }, /*#__PURE__*/_react["default"].createElement(_system.Box, null, "Status:"), /*#__PURE__*/_react["default"].createElement(_FormControl["default"], {
    fullWidth: true
  }, /*#__PURE__*/_react["default"].createElement(_Select["default"], {
    labelId: "demo-simple-select-label",
    id: "demo-simple-select",
    value: status,
    displayEmpty: true,
    inputProps: {
      'aria-label': 'Without label'
    },
    InputLabelProps: {
      shrink: true
    },
    onChange: /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(val) {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              setStatus(val.target.value);
              _context3.next = 3;
              return (0, _authscape.apiService)().put("/ticket/UpdateStatus", {
                id: ticket.id,
                ticketStatusId: val.target.value
              });
            case 3:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      return function (_x3) {
        return _ref5.apply(this, arguments);
      };
    }()
  }, ticket != null && ticket.ticketStatuses.map(function (status, index) {
    return /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
      key: index,
      value: status.id
    }, status.name);
  })))), /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      paddingTop: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_system.Box, null, "Assigned to:"), selectedCreatedBy != null && /*#__PURE__*/_react["default"].createElement(_Autocomplete["default"], {
    disablePortal: true,
    options: createdByList,
    value: selectedCreatedBy,
    onChange: /*#__PURE__*/function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(event, newValue) {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              setSelectedCreatedBy(newValue.id);
            case 1:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      return function (_x4, _x5) {
        return _ref6.apply(this, arguments);
      };
    }(),
    renderInput: function renderInput(params) {
      return /*#__PURE__*/_react["default"].createElement(_TextField["default"], _extends({}, params, {
        label: "",
        onChange: function onChange(val) {
          refreshCreatedByList(val.currentTarget.value);
        }
      }));
    }
  }), ticket != null && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      paddingTop: 1,
      fontSize: 18
    }
  }, ticket.assignedFirstName + " " + ticket.assignedLastName, " (", ticket.assignedEmail, ")"))), /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      paddingTop: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      minWidth: 120
    }
  }, /*#__PURE__*/_react["default"].createElement(_system.Box, null, "Priority:"), /*#__PURE__*/_react["default"].createElement(_FormControl["default"], {
    fullWidth: true
  }, /*#__PURE__*/_react["default"].createElement(_InputLabel["default"], {
    id: "demo-simple-select-label"
  }), /*#__PURE__*/_react["default"].createElement(_Select["default"], {
    labelId: "demo-simple-select-label",
    id: "demo-simple-select",
    value: priorty,
    label: "",
    onChange: /*#__PURE__*/function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(val) {
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              setPriority(val.target.value);
              _context5.next = 3;
              return (0, _authscape.apiService)().put("/ticket/UpdateTicketPriority", {
                id: ticket.id,
                priorityLevel: val.target.value
              });
            case 3:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      return function (_x6) {
        return _ref7.apply(this, arguments);
      };
    }()
  }, /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
    value: 0
  }, "None"), /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
    value: 1
  }, "Low"), /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
    value: 2
  }, "Medium"), /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
    value: 3
  }, "High"), /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
    value: 4
  }, "Urgent")))))), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    item: true,
    xs: 4
  }, /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      minWidth: 120
    }
  }, /*#__PURE__*/_react["default"].createElement(_system.Box, null, "Ticket Type:"), /*#__PURE__*/_react["default"].createElement(_FormControl["default"], {
    fullWidth: true
  }, /*#__PURE__*/_react["default"].createElement(_InputLabel["default"], {
    id: "demo-simple-select-label"
  }), /*#__PURE__*/_react["default"].createElement(_Select["default"], {
    labelId: "demo-simple-select-label",
    id: "ticketType",
    value: ticketType,
    label: "",
    onChange: /*#__PURE__*/function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(val) {
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              setTicketType(val.target.value);
              _context6.next = 3;
              return (0, _authscape.apiService)().put("/ticket/UpdateTicketType", {
                id: ticket.id,
                TicketTypeId: val.target.value
              });
            case 3:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }));
      return function (_x7) {
        return _ref8.apply(this, arguments);
      };
    }()
  }, ticket != null && ticket.ticketTypes.map(function (status, index) {
    return /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
      key: index,
      value: status.id
    }, status.name);
  })))), /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      paddingTop: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_system.Box, null, "Participants:"), /*#__PURE__*/_react["default"].createElement(_Autocomplete["default"], {
    multiple: true,
    disablePortal: true,
    value: participants,
    options: createdByList,
    onChange: /*#__PURE__*/function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(event, newValue) {
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return (0, _authscape.apiService)().put("/ticket/UpdateParticipants", {
                ticketId: ticketId,
                participants: newValue
              });
            case 2:
              setParticipants(newValue);
            case 3:
            case "end":
              return _context7.stop();
          }
        }, _callee7);
      }));
      return function (_x8, _x9) {
        return _ref9.apply(this, arguments);
      };
    }(),
    renderInput: function renderInput(params) {
      return /*#__PURE__*/_react["default"].createElement(_TextField["default"], _extends({}, params, {
        label: "",
        onChange: function onChange(val) {
          refreshCreatedByList(val.currentTarget.value);
        }
      }));
    }
  }))), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    item: true,
    xs: 4
  }, /*#__PURE__*/_react["default"].createElement(_system.Box, null, /*#__PURE__*/_react["default"].createElement(_system.Box, null, "Created:"), /*#__PURE__*/_react["default"].createElement(_TextField["default"], {
    id: "created",
    fullWidth: true,
    InputLabelProps: {
      shrink: true
    },
    disabled: true,
    label: "",
    variant: "outlined",
    autoFocus: true,
    value: ticket != null ? ticket.created : ""
  })), /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      paddingTop: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_system.Box, null, "Last Updated:"), /*#__PURE__*/_react["default"].createElement(_TextField["default"], {
    id: "lastUpdated",
    fullWidth: true,
    InputLabelProps: {
      shrink: true
    },
    disabled: true,
    label: "",
    variant: "outlined",
    autoFocus: true,
    value: ticket != null ? ticket.lastUpdated : ""
  }))))), /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      width: '100%',
      marginTop: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      borderBottom: 1,
      borderColor: 'divider'
    }
  }, /*#__PURE__*/_react["default"].createElement(_Tabs["default"], {
    value: value,
    onChange: handleChange,
    "aria-label": "basic tabs example"
  }, /*#__PURE__*/_react["default"].createElement(_Tab["default"], _extends({
    label: "Description"
  }, a11yProps(0))), /*#__PURE__*/_react["default"].createElement(_Tab["default"], _extends({
    label: "Chat"
  }, a11yProps(1))), /*#__PURE__*/_react["default"].createElement(_Tab["default"], _extends({
    label: "Notes"
  }, a11yProps(2))), /*#__PURE__*/_react["default"].createElement(_Tab["default"], _extends({
    label: "Attachments"
  }, a11yProps(3))), customTabName != null && /*#__PURE__*/_react["default"].createElement(_Tab["default"], _extends({
    label: customTabName
  }, a11yProps(4))))), /*#__PURE__*/_react["default"].createElement(TabPanel, {
    value: value,
    index: 0
  }, /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      whiteSpace: "pre-wrap"
    }
  }, /*#__PURE__*/_react["default"].createElement(_system.Box, {
    dangerouslySetInnerHTML: {
      __html: ticketDescription
    }
  }))), /*#__PURE__*/_react["default"].createElement(TabPanel, {
    value: value,
    index: 1
  }, ticket != null && /*#__PURE__*/_react["default"].createElement(Comments, {
    ticketId: ticket.id,
    isDisabled: false,
    isNote: false,
    currentUser: currentUser
  })), /*#__PURE__*/_react["default"].createElement(TabPanel, {
    value: value,
    index: 2
  }, ticket != null && /*#__PURE__*/_react["default"].createElement(Comments, {
    ticketId: ticket.id,
    isDisabled: false,
    isNote: true,
    currentUser: currentUser
  })), /*#__PURE__*/_react["default"].createElement(TabPanel, {
    value: value,
    index: 3
  }, ticket != null && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, ticketAttachments.map(function (attachment) {
    return /*#__PURE__*/_react["default"].createElement(DownloadFile, {
      fileName: attachment.name,
      uri: attachment.url
    });
  }), ticketAttachments.length == 0 && /*#__PURE__*/_react["default"].createElement(_system.Box, null, "There are no attachments"))), customTabName != null && /*#__PURE__*/_react["default"].createElement(TabPanel, {
    value: value,
    index: 4
  }, customTabElement(customTabPayload))));
};
exports.TicketDetail = TicketDetail;
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Tickets;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _system = require("@mui/system");
var _xDataGrid = require("@mui/x-data-grid");
var _DeleteRounded = _interopRequireDefault(require("@mui/icons-material/DeleteRounded"));
var _VisibilityRounded = _interopRequireDefault(require("@mui/icons-material/VisibilityRounded"));
var _InputLabel = _interopRequireDefault(require("@mui/material/InputLabel"));
var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));
var _FormControl = _interopRequireDefault(require("@mui/material/FormControl"));
var _Select = _interopRequireWildcard(require("@mui/material/Select"));
var _router = require("next/router");
var _authscape = require("authscape");
var _Dialog = _interopRequireDefault(require("@mui/material/Dialog"));
var _DialogContent = _interopRequireDefault(require("@mui/material/DialogContent"));
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
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; } //import { TicketDetail } from './ticketDetail';
function Tickets(_ref) {
  var setIsLoading = _ref.setIsLoading,
    currentUser = _ref.currentUser,
    _ref$customTabName = _ref.customTabName,
    customTabName = _ref$customTabName === void 0 ? null : _ref$customTabName,
    _ref$customTabElement = _ref.customTabElement,
    customTabElement = _ref$customTabElement === void 0 ? null : _ref$customTabElement;
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    archiveTicketId = _useState2[0],
    setArchiveTicketId = _useState2[1];
  var _useState3 = (0, _react.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    ticketStatuses = _useState4[0],
    setTicketStatuses = _useState4[1];
  var _useState5 = (0, _react.useState)([]),
    _useState6 = _slicedToArray(_useState5, 2),
    ticketTypes = _useState6[0],
    setTicketTypes = _useState6[1];
  var _useState7 = (0, _react.useState)(null),
    _useState8 = _slicedToArray(_useState7, 2),
    ticketTypeId = _useState8[0],
    setTicketTypeId = _useState8[1];
  var _useState9 = (0, _react.useState)(0),
    _useState10 = _slicedToArray(_useState9, 2),
    dataGridRefreshKey = _useState10[0],
    setDataGridRefreshKey = _useState10[1];
  var _useState11 = (0, _react.useState)(null),
    _useState12 = _slicedToArray(_useState11, 2),
    statusId = _useState12[0],
    setStatusId = _useState12[1];
  var _useState13 = (0, _react.useState)(null),
    _useState14 = _slicedToArray(_useState13, 2),
    selectedTicketId = _useState14[0],
    setSelectedTicketId = _useState14[1];
  var router = (0, _router.useRouter)();
  (0, _react.useEffect)(function () {
    if (router.query.id != null) {
      setSelectedTicketId(router.query.id);
    }
  }, [router.isReady]);
  var columns = [{
    field: 'id',
    headerName: 'Id',
    width: 150
  }, {
    field: 'title',
    flex: 1,
    headerName: 'Customer',
    width: 200
  }, {
    field: 'ticketStatus',
    headerName: 'Status',
    width: 150
  }, {
    field: 'ticketType',
    headerName: 'Ticket Type',
    width: 150
  }, {
    field: 'created',
    headerName: 'Created',
    width: 150
  }, {
    field: 'ticketParticipants',
    headerName: 'Participants',
    width: 150
  }, {
    field: 'messages',
    headerName: 'Messages',
    width: 150
  }, {
    field: "actions",
    type: "actions",
    width: 200,
    headerName: "Actions",
    cellClassName: "actions",
    getActions: function getActions(_ref2) {
      var id = _ref2.id,
        row = _ref2.row;
      return [/*#__PURE__*/_react["default"].createElement(_xDataGrid.GridActionsCellItem, {
        key: id,
        icon: /*#__PURE__*/_react["default"].createElement(_VisibilityRounded["default"], null),
        label: "View",
        onClick: function onClick() {
          setSelectedTicketId(row.id);
        }
      }), /*#__PURE__*/_react["default"].createElement(_xDataGrid.GridActionsCellItem, {
        key: id,
        icon: /*#__PURE__*/_react["default"].createElement(_DeleteRounded["default"], null),
        label: "Delete",
        className: "textPrimary",
        onClick: function onClick() {
          setArchiveTicketId(row.id);
        }
      })];
    }
  }];
  (0, _react.useEffect)(function () {
    var fetchStatusesAndTypes = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var responseStatus, responseType;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _authscape.apiService)().get("/Ticket/GetStatuses");
            case 2:
              responseStatus = _context.sent;
              if (responseStatus != null && responseStatus.status == 200) {
                setTicketStatuses(responseStatus.data);
              }
              _context.next = 6;
              return (0, _authscape.apiService)().get("/Ticket/GetTicketTypes");
            case 6:
              responseType = _context.sent;
              if (responseType != null && responseType.status == 200) {
                setTicketTypes(responseType.data);
              }
            case 8:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function fetchStatusesAndTypes() {
        return _ref3.apply(this, arguments);
      };
    }();
    fetchStatusesAndTypes();
    setTicketStatuses();
  }, []);
  (0, _react.useEffect)(function () {
    var newKey = dataGridRefreshKey + 1;
    setDataGridRefreshKey(newKey);
  }, [ticketTypeId, statusId]);
  return /*#__PURE__*/_react["default"].createElement(_system.Box, null, /*#__PURE__*/_react["default"].createElement(_material.Grid, {
    container: true,
    spacing: 2,
    sx: {
      paddingTop: 2,
      paddingBottom: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_material.Grid, {
    item: true,
    xs: 4
  }, /*#__PURE__*/_react["default"].createElement(_system.Box, null, /*#__PURE__*/_react["default"].createElement(_FormControl["default"], {
    fullWidth: true
  }, /*#__PURE__*/_react["default"].createElement(_InputLabel["default"], {
    id: "demo-simple-select-label"
  }, "Ticket Status"), /*#__PURE__*/_react["default"].createElement(_Select["default"], {
    labelId: "demo-simple-select-label",
    id: "demo-simple-select",
    value: statusId,
    label: "ticketStatus",
    onChange: function onChange(event) {
      setStatusId(event.target.value);
    }
  }, /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
    value: null
  }, "Not Assigned"), ticketStatuses != null && ticketStatuses.map(function (tStatus) {
    return /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
      value: tStatus.id
    }, tStatus.name);
  }))))), /*#__PURE__*/_react["default"].createElement(_material.Grid, {
    item: true,
    xs: 4
  }, /*#__PURE__*/_react["default"].createElement(_system.Box, null, /*#__PURE__*/_react["default"].createElement(_FormControl["default"], {
    fullWidth: true
  }, /*#__PURE__*/_react["default"].createElement(_InputLabel["default"], {
    id: "demo-simple-select-label"
  }, "Ticket Type"), /*#__PURE__*/_react["default"].createElement(_Select["default"], {
    labelId: "demo-simple-select-label",
    id: "demo-simple-select",
    value: ticketTypeId,
    label: "TicketType",
    onChange: function onChange(event) {
      setTicketTypeId(event.target.value);
    }
  }, /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
    value: null
  }, "Not Assigned"), ticketTypes != null && ticketTypes.map(function (tTicketType) {
    return /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
      value: tTicketType.id
    }, tTicketType.name);
  })))))), /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      height: 600,
      width: '100%'
    }
  }, /*#__PURE__*/_react["default"].createElement(_authscape.EditableDatagrid, {
    height: "80vh",
    key: dataGridRefreshKey,
    url: "/ticket/GetTickets",
    params: {
      ticketStatusId: statusId,
      ticketTypeId: ticketTypeId
    },
    columns: columns
  })), /*#__PURE__*/_react["default"].createElement(_Dialog["default"], {
    open: selectedTicketId != null ? true : false,
    onClose: function onClose() {
      var newKey = dataGridRefreshKey + 1;
      setDataGridRefreshKey(newKey);
      setSelectedTicketId(null);
    },
    fullWidth: true,
    maxWidth: "lg",
    "aria-labelledby": "alert-dialog-title",
    "aria-describedby": "alert-dialog-description"
  }, /*#__PURE__*/_react["default"].createElement(_DialogContent["default"], null, /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      padding: 2,
      width: "100%"
    }
  }, /*#__PURE__*/_react["default"].createElement(TicketDetail, {
    ticketId: selectedTicketId,
    setIsLoading: setIsLoading,
    currentUser: currentUser,
    customTabName: customTabName,
    customTabElement: customTabElement,
    GoBackToViewTickets: function GoBackToViewTickets() {
      var newKey = dataGridRefreshKey + 1;
      setDataGridRefreshKey(newKey);
      setSelectedTicketId(null);
    }
  })))), /*#__PURE__*/_react["default"].createElement(_authscape.YesNoDialog, {
    open: archiveTicketId != null ? true : false,
    title: "Remove Ticket",
    message: "Are you sure you want to close this ticket?",
    YesAction: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var newKey;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _authscape.apiService)()["delete"]("/Ticket/ArchiveTicket?id=" + archiveTicketId);
          case 2:
            newKey = dataGridRefreshKey + 1;
            setDataGridRefreshKey(newKey);
            setArchiveTicketId(null);
            setSelectedTicketId(null);
          case 6:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    })),
    NoAction: function NoAction() {
      var newKey = dataGridRefreshKey + 1;
      setDataGridRefreshKey(newKey);
      setArchiveTicketId(null);
      setSelectedTicketId(null);
    }
  }));
}
