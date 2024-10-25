"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthScapeApp = AuthScapeApp;
var _react = _interopRequireWildcard(require("react"));
var _reactToastify = require("react-toastify");
var _styles = require("@mui/material/styles");
var _head = _interopRequireDefault(require("next/head"));
var _navigation = require("next/navigation");
var _axios = _interopRequireDefault(require("axios"));
var _queryString = _interopRequireDefault(require("query-string"));
var _router = _interopRequireDefault(require("next/router"));
var _ga4React = _interopRequireDefault(require("ga-4-react"));
var _zustand = require("zustand");
var _reactMicrosoftClarity = require("react-microsoft-clarity");
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
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; } // import Cookies from 'js-cookie';
// comment this out
// import { authService, apiService, setupOEMProps, OEMStyleSheet } from 'authscape';

function AuthScapeApp(_ref) {
  var Component = _ref.Component,
    layout = _ref.layout,
    loadingLayout = _ref.loadingLayout,
    pageProps = _ref.pageProps,
    _ref$muiTheme = _ref.muiTheme,
    muiTheme = _ref$muiTheme === void 0 ? {} : _ref$muiTheme,
    _ref$store = _ref.store,
    store = _ref$store === void 0 ? {} : _ref$store,
    _ref$enforceLoggedIn = _ref.enforceLoggedIn,
    enforceLoggedIn = _ref$enforceLoggedIn === void 0 ? false : _ref$enforceLoggedIn,
    _ref$enableAuth = _ref.enableAuth,
    enableAuth = _ref$enableAuth === void 0 ? true : _ref$enableAuth;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    frontEndLoadedState = _useState2[0],
    setFrontEndLoadedState = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isLoadingShow = _useState4[0],
    setIsLoadingShow = _useState4[1];
  var _useState5 = (0, _react.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    signedInUserState = _useState6[0],
    setSignedInUserState = _useState6[1];
  var loadingAuth = (0, _react.useRef)(false);
  var frontEndLoaded = (0, _react.useRef)(false);
  var signedInUser = (0, _react.useRef)(null);
  var queryCodeUsed = (0, _react.useRef)(null);
  var ga4React = (0, _react.useRef)(null);
  var searchParams = (0, _navigation.useSearchParams)();
  var queryRef = searchParams.get('ref');
  var queryCode = searchParams.get('code');
  var pathname = (0, _navigation.usePathname)();
  var signInValidator = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(queryCode) {
      var codeVerifier, headers, queryString, response, domainHost, redirectUri;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!(queryCodeUsed.current != queryCode)) {
              _context.next = 4;
              break;
            }
            queryCodeUsed.current = queryCode;
            _context.next = 5;
            break;
          case 4:
            return _context.abrupt("return");
          case 5:
            codeVerifier = window.localStorage.getItem("verifier");
            if (!(queryCode != null && codeVerifier != null)) {
              _context.next = 28;
              break;
            }
            headers = {
              'Content-Type': 'application/x-www-form-urlencoded'
            };
            queryString = _queryString["default"].stringify({
              code: queryCode,
              grant_type: "authorization_code",
              redirect_uri: window.location.origin + "/signin-oidc",
              client_id: process.env.client_id,
              client_secret: process.env.client_secret,
              code_verifier: codeVerifier
            });
            _context.prev = 9;
            _context.next = 12;
            return _axios["default"].post(process.env.authorityUri + '/connect/token', queryString, {
              headers: headers
            });
          case 12:
            response = _context.sent;
            domainHost = window.location.hostname.split('.').slice(-2).join('.');
            window.localStorage.removeItem("verifier");
            _context.next = 17;
            return setCookie('access_token', response.data.access_token, {
              maxAge: 60 * 60 * 24 * 365,
              // 1 year,
              path: '/',
              domain: domainHost,
              secure: true
            });
          case 17:
            _context.next = 19;
            return setCookie('expires_in', response.data.expires_in, {
              maxAge: 60 * 60 * 24 * 365,
              // 1 year,
              path: '/',
              domain: domainHost,
              secure: true
            });
          case 19:
            _context.next = 21;
            return setCookie('refresh_token', response.data.refresh_token, {
              maxAge: 60 * 60 * 24 * 365,
              // 1 year,
              path: '/',
              domain: domainHost,
              secure: true
            });
          case 21:
            // await setCookie(null, "access_token", response.data.access_token,
            // {
            //     maxAge: 2147483647,
            //     path: '/',
            //     domain: domainHost,
            //     secure: true
            // });
            // await setCookie(null, "expires_in", response.data.expires_in,
            // {
            //     maxAge: 2147483647,
            //     path: '/',
            //     domain: domainHost,
            //     secure: true
            // });
            // await setCookie(null, "refresh_token", response.data.refresh_token,
            // {
            //     maxAge: 2147483647,
            //     path: '/',
            //     domain: domainHost,
            //     secure: true
            // });
            redirectUri = localStorage.getItem("redirectUri");
            localStorage.clear();
            if (redirectUri != null) {
              window.location.href = redirectUri;
            } else {
              window.location.href = "/";
            }
            _context.next = 28;
            break;
          case 26:
            _context.prev = 26;
            _context.t0 = _context["catch"](9);
          case 28:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[9, 26]]);
    }));
    return function signInValidator(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  function initGA(_x3) {
    return _initGA.apply(this, arguments);
  }
  function _initGA() {
    _initGA = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(G) {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            if (!(!_ga4React["default"].isInitialized() && G && process.browser)) {
              _context3.next = 10;
              break;
            }
            ga4React.current = new _ga4React["default"](G, {
              debug_mode: !process.env.production
            });
            _context3.prev = 2;
            _context3.next = 5;
            return ga4React.current.initialize();
          case 5:
            _context3.next = 10;
            break;
          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](2);
            console.error(_context3.t0);
          case 10:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[2, 7]]);
    }));
    return _initGA.apply(this, arguments);
  }
  var logEvent = function logEvent(category, action, label) {
    if (ga4React != null && ga4React.current != null && ga4React != "") {
      ga4React.current.event(action, label, category);
    }
    if (process.env.enableDatabaseAnalytics == "true") {
      var userId = null;
      var locationId = null;
      var companyId = null;
      var host = window.location.protocol + "//" + window.location.host;
      if (signedInUser.current != null) {
        userId = signedInUser.current.id;
        locationId = signedInUser.current.locationId;
        companyId = signedInUser.current.companyId;
      }
      apiService().post("/Analytics/Event", {
        userId: userId,
        locationId: locationId,
        companyId: companyId,
        uri: window.location.pathname,
        category: category,
        action: action,
        label: label,
        host: host
      });
    }
  };
  var databaseDrivenPageView = function databaseDrivenPageView(pathName) {
    if (process.env.enableDatabaseAnalytics == "true") {
      var userId = null;
      var locationId = null;
      var companyId = null;
      var host = window.location.protocol + "//" + window.location.host;
      if (signedInUser.current != null) {
        userId = signedInUser.current.id;
        locationId = signedInUser.current.locationId;
        companyId = signedInUser.current.companyId;
      }
      if (pathName == "/signin-oidc") {
        return;
      }
      apiService().post("/Analytics/PageView", {
        userId: userId,
        locationId: locationId,
        companyId: companyId,
        uri: pathName,
        host: host
      });
    }
  };
  (0, _react.useEffect)(function () {
    if (frontEndLoadedState) {
      if (process.env.googleAnalytics4 != "") {
        initGA(process.env.googleAnalytics4);
      }
      if (process.env.microsoftClarityTrackingCode != "") {
        _reactMicrosoftClarity.clarity.init(process.env.microsoftClarityTrackingCode);
        if (signedInUser.current != null && _reactMicrosoftClarity.clarity.hasStarted()) {
          _reactMicrosoftClarity.clarity.identify('USER_ID', {
            userProperty: signedInUser.current.id.toString()
          });
        }
      }
      databaseDrivenPageView(window.location.pathname);
      _router["default"].events.on('routeChangeComplete', function () {
        if (ga4React != null && ga4React != "") {
          try {
            ga4React.current.pageview(window.location.pathname);
          } catch (exp) {}
        }
        databaseDrivenPageView(window.location.pathname);
      });
    }
  }, [frontEndLoadedState]);
  var validateUserSignedIn = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var usr;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            loadingAuth.current = true;
            if (!enableAuth) {
              _context2.next = 6;
              break;
            }
            _context2.next = 4;
            return apiService().GetCurrentUser();
          case 4:
            usr = _context2.sent;
            if (usr != null) {
              signedInUser.current = usr;
            }
          case 6:
            setFrontEndLoadedState(true);
            frontEndLoaded.current = true;
            setSignedInUserState(signedInUser.current);
          case 9:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function validateUserSignedIn() {
      return _ref3.apply(this, arguments);
    };
  }();
  if (queryCode != null) {
    signInValidator(queryCode);
  } else {
    if (!loadingAuth.current) {
      validateUserSignedIn();
    }
  }
  (0, _react.useEffect)(function () {
    if (signedInUserState == null && enforceLoggedIn && pathname != "/signin-oidc" && frontEndLoadedState == true) {
      authService().login();
    }
  }, [signedInUserState, enforceLoggedIn, frontEndLoadedState]);
  var setIsLoading = function setIsLoading(isLoading) {
    setIsLoadingShow(isLoading);
  };
  var logPurchase = function logPurchase(transactionId, amount, tax, items) {
    if (ga4React != null && ga4React != "") {
      ga4React.current.gtag("event", "purchase", {
        transaction_id: transactionId,
        value: amount,
        tax: tax,
        currency: "USD",
        items: items
      });
    }
  };
  var setToastMessage = function setToastMessage(message) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    if (options != null) {
      (0, _reactToastify.toast)(message, options);
    } else {
      (0, _reactToastify.toast)(message);
    }
  };
  var setInfoToastMessage = function setInfoToastMessage(message) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    if (options != null) {
      _reactToastify.toast.info(message, options);
    } else {
      _reactToastify.toast.info(message);
    }
  };
  var setSuccessToastMessage = function setSuccessToastMessage(message) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    if (options != null) {
      _reactToastify.toast.success(message, options);
    } else {
      _reactToastify.toast.success(message);
    }
  };
  var setWarnToastMessage = function setWarnToastMessage(message) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    if (options != null) {
      _reactToastify.toast.warn(message, options);
    } else {
      _reactToastify.toast.warn(message);
    }
  };
  var setErrorToastMessage = function setErrorToastMessage(message) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    if (options != null) {
      _reactToastify.toast.error(message, options);
    } else {
      _reactToastify.toast.error(message);
    }
  };
  var GetSignedInUser = function GetSignedInUser() {
    if (signedInUser != null) {
      var _signedInUser = signedInUser.current;
      if (_signedInUser != null) {
        _signedInUser.hasRole = function (name) {
          if (_signedInUser.roles != null) {
            if (_signedInUser.roles.find(function (r) {
              return r.name === name;
            }) != null) {
              return true;
            } else {
              return false;
            }
          }
        };
        _signedInUser.hasRoleId = function (id) {
          if (_signedInUser.roles != null) {
            if (_signedInUser.roles.find(function (r) {
              return r.id === id;
            }) != null) {
              return true;
            } else {
              return false;
            }
          }
        };
        _signedInUser.hasPermission = function (name) {
          if (_signedInUser.permissions != null) {
            if (_signedInUser.permissions.find(function (r) {
              return r === name;
            }) != null) {
              return true;
            } else {
              return false;
            }
          }
        };
      }
      return _signedInUser;
    } else {
      return null;
    }
  };
  var useStore = (0, _zustand.create)(function (set) {
    return store;
  });
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_head["default"], null, /*#__PURE__*/_react["default"].createElement("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=0.86, maximum-scale=5.0, minimum-scale=0.86"
  }), pageProps != null && pageProps.oemCompanyId != null ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("link", {
    href: process.env.apiUri + "/api/PrivateLabel/GetDataFromRecord?oemCompanyId=" + pageProps.oemCompanyId,
    rel: "stylesheet"
  }), /*#__PURE__*/_react["default"].createElement("link", {
    rel: "icon",
    href: "/favicon.ico"
  })) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("link", {
    rel: "icon",
    href: "/favicon.ico"
  }))), /*#__PURE__*/_react["default"].createElement(_styles.ThemeProvider, {
    theme: muiTheme
  }, frontEndLoadedState != null && frontEndLoadedState && pathname != "/signin-oidc" && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, layout != null && layout({
    children: /*#__PURE__*/_react["default"].createElement(Component, _extends({}, pageProps, {
      currentUser: GetSignedInUser(),
      loadedUser: frontEndLoadedState,
      setIsLoading: setIsLoading,
      logEvent: logEvent,
      logPurchase: logPurchase,
      store: useStore,
      setToastMessage: setToastMessage,
      setInfoToastMessage: setInfoToastMessage,
      setSuccessToastMessage: setSuccessToastMessage,
      setWarnToastMessage: setWarnToastMessage,
      setErrorToastMessage: setErrorToastMessage
    })),
    currentUser: GetSignedInUser(),
    logEvent: logEvent,
    setIsLoading: setIsLoading,
    toast: _reactToastify.toast,
    store: useStore,
    setToastMessage: setToastMessage,
    pageProps: pageProps,
    setInfoToastMessage: setInfoToastMessage,
    setSuccessToastMessage: setSuccessToastMessage,
    setWarnToastMessage: setWarnToastMessage,
    setErrorToastMessage: setErrorToastMessage
  }), layout == null && /*#__PURE__*/_react["default"].createElement(Component, _extends({}, pageProps, {
    currentUser: GetSignedInUser(),
    loadedUser: frontEndLoadedState,
    setIsLoading: setIsLoading,
    logEvent: logEvent,
    logPurchase: logPurchase,
    store: useStore,
    setToastMessage: setToastMessage,
    setInfoToastMessage: setInfoToastMessage,
    setSuccessToastMessage: setSuccessToastMessage,
    setWarnToastMessage: setWarnToastMessage,
    setErrorToastMessage: setErrorToastMessage
  }))), /*#__PURE__*/_react["default"].createElement(_reactToastify.ToastContainer, null)), loadingLayout && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, loadingLayout(isLoadingShow)));
}
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoSaveTextField = AutoSaveTextField;
var _react = _interopRequireWildcard(require("react"));
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function AutoSaveTextField(_ref) {
  var _ref$label = _ref.label,
    label = _ref$label === void 0 ? "" : _ref$label,
    _ref$value = _ref.value,
    value = _ref$value === void 0 ? null : _ref$value,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? "outlined" : _ref$variant,
    _ref$timeout = _ref.timeout,
    timeout = _ref$timeout === void 0 ? 2000 : _ref$timeout,
    _ref$isMultiLine = _ref.isMultiLine,
    isMultiLine = _ref$isMultiLine === void 0 ? false : _ref$isMultiLine,
    _ref$rows = _ref.rows,
    rows = _ref$rows === void 0 ? 1 : _ref$rows,
    _ref$fullWidth = _ref.fullWidth,
    fullWidth = _ref$fullWidth === void 0 ? false : _ref$fullWidth,
    _ref$onChanged = _ref.onChanged,
    onChanged = _ref$onChanged === void 0 ? null : _ref$onChanged;
  var _useState = (0, _react.useState)(value),
    _useState2 = _slicedToArray(_useState, 2),
    text = _useState2[0],
    setText = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isComponentMounted = _useState4[0],
    setComponentMounted = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isFirstLoaded = _useState6[0],
    setIsFirstLoaded = _useState6[1];
  (0, _react.useEffect)(function () {
    // Set the componentMounted flag to true after the initial render
    if (!isComponentMounted) {
      setComponentMounted(true);
    }
  }, []);
  (0, _react.useEffect)(function () {
    if (isComponentMounted && text != null) {
      if (isFirstLoaded) {
        // Simulate saving text to a server or any storage mechanism
        // In a real-world scenario, you would send a request to a server to save the text
        // For this example, we'll just update the savedText state after 2 seconds
        var saveTimeout = setTimeout(function () {
          if (onChanged != null) {
            onChanged(text);
          }
        }, timeout);

        // Clean up the timeout to avoid unnecessary saves if the text changes again
        return function () {
          return clearTimeout(saveTimeout);
        };
      }
      setIsFirstLoaded(true);
    }
  }, [text, isComponentMounted]);
  var handleTextChange = function handleTextChange(event) {
    var newText = event.target.value;
    setText(newText);
  };
  return /*#__PURE__*/_react["default"].createElement(_TextField["default"], {
    label: label,
    fullWidth: fullWidth,
    autoComplete: "off",
    variant: variant,
    multiline: isMultiLine,
    rows: rows,
    value: text,
    onChange: handleTextChange
  });
}
;
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorPicker = ColorPicker;
var _react = _interopRequireWildcard(require("react"));
var _reactColor = require("react-color");
var _reactcss = _interopRequireDefault(require("reactcss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ColorPicker(_ref) {
  var name = _ref.name,
    defaultColor = _ref.defaultColor,
    onColorChanged = _ref.onColorChanged;
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    rgbColor = _useState2[0],
    setColor = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    displayColorPicker = _useState4[0],
    setDisplayColorPicker = _useState4[1];
  var _useState5 = (0, _react.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    completedColor = _useState6[0],
    setCompletedColor = _useState6[1];
  var _useState7 = (0, _react.useState)(null),
    _useState8 = _slicedToArray(_useState7, 2),
    timeoutToken = _useState8[0],
    setTimeoutToken = _useState8[1];
  var styles = (0, _reactcss["default"])({
    'default': {
      color: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: rgbColor != null ? "rgba(".concat(rgbColor.r, ", ").concat(rgbColor.g, ", ").concat(rgbColor.b, ", ").concat(rgbColor.a, ")") : defaultColor
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer'
      },
      popover: {
        position: 'absolute',
        zIndex: '2'
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px'
      }
    }
  });
  var handleClick = function handleClick() {
    setDisplayColorPicker(!displayColorPicker);
  };
  var handleClose = function handleClose() {
    setDisplayColorPicker(false);
  };
  var handleChange = function handleChange(color) {
    setColor(color.rgb);
  };
  (0, _react.useEffect)(function () {
    if (!displayColorPicker && completedColor != null) {
      clearTimeout(timeoutToken);
      setTimeoutToken(setTimeout(function () {
        onColorChanged(name, completedColor);
      }, 500));
    }
    if (!displayColorPicker && completedColor == null && defaultColor != null) {
      setColor(defaultColor);
    }
  }, [displayColorPicker, completedColor, defaultColor]);
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    style: styles.swatch,
    onClick: handleClick
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: styles.color
  })), displayColorPicker ? /*#__PURE__*/_react["default"].createElement("div", {
    style: styles.popover
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: styles.cover,
    onClick: handleClose
  }), /*#__PURE__*/_react["default"].createElement(_reactColor.SketchPicker, {
    color: rgbColor != null ? rgbColor : "#fff",
    onChange: handleChange,
    onChangeComplete: function onChangeComplete() {
      setCompletedColor("rgba(".concat(rgbColor.r, ", ").concat(rgbColor.g, ", ").concat(rgbColor.b, ", ").concat(rgbColor.a, ")"));
    }
  })) : null);
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Datatable = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactDataTableComponent = _interopRequireWildcard(require("react-data-table-component"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } //import {apiService} from 'authscape';
var Datatable = /*#__PURE__*/function (_Component) {
  _inherits(Datatable, _Component);
  var _super = _createSuper(Datatable);
  function Datatable(props) {
    var _this;
    _classCallCheck(this, Datatable);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "componentDidMount", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _this.GetDataFromUrl(_this.state.pageNumber, _this.state.pageLength, _this.props.params);
          case 2:
            (0, _reactDataTableComponent.createTheme)('dataTable', {
              text: {}
            });
          case 3:
          case "end":
            return _context.stop();
        }
      }, _callee);
    })));
    _defineProperty(_assertThisInitialized(_this), "reload", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      var reset,
        _args3 = arguments;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            reset = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : false;
            if (!(reset === true)) {
              _context3.next = 5;
              break;
            }
            _this.setState({
              pageNumber: 1
            }, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return _this.GetDataFromUrl(_this.state.pageNumber, _this.state.pageLength, _this.props.params);
                  case 2:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            })));
            _context3.next = 7;
            break;
          case 5:
            _context3.next = 7;
            return _this.GetDataFromUrl(_this.state.pageNumber, _this.state.pageLength, _this.props.params);
          case 7:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    })));
    _defineProperty(_assertThisInitialized(_this), "GetDataFromUrl", function (page, length) {
      var postData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      _this.setState({
        loading: true
      }, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var data, response;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              data = postData;
              data.offset = page;
              data.length = length;
              response = null;
              if (!(this.props.methodType == "get")) {
                _context4.next = 10;
                break;
              }
              _context4.next = 7;
              return apiService().get(this.props.url);
            case 7:
              response = _context4.sent;
              _context4.next = 13;
              break;
            case 10:
              _context4.next = 12;
              return apiService().post(this.props.url, postData);
            case 12:
              response = _context4.sent;
            case 13:
              if (response != null && response.status === 200) {
                if (this.props.returnResult != null) {
                  this.props.returnResult(response.data.data);
                }
                this.setState({
                  totalRows: response.data.recordsTotal,
                  data: response.data.data,
                  loading: false
                });
              } else {
                //console.error(response.status + " - " + response.data);
              }
            case 14:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      })));
    });
    _defineProperty(_assertThisInitialized(_this), "handlePageChange", /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(page) {
        var pageLength;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              pageLength = _this.state.pageLength;
              _this.setState({
                pageNumber: page
              });
              _context5.next = 4;
              return _this.GetDataFromUrl(page, pageLength, _this.props.params);
            case 4:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      return function (_x) {
        return _ref5.apply(this, arguments);
      };
    }());
    _this.state = {
      pageNumber: 1,
      pageLength: props.pageLength ? props.pageLength : 10,
      data: [],
      loading: false,
      totalRows: 0
    };
    return _this;
  }
  _createClass(Datatable, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_reactDataTableComponent["default"], _extends({
        title: this.props.title,
        columns: this.props.columns,
        data: this.state.data,
        paginationRowsPerPageOptions: this.props.pageLength ? [this.props.pageLength] : [10],
        progressPending: this.state.loading
        //customStyles={this.props.customStyles}
        ,
        paginationPerPage: this.props.pageLength ? this.props.pageLength : 10,
        paginationServer: true,
        pagination: true
      }, this.props.options, {
        //expandableRows={this.props.expandableRows}
        //expandableRowsComponent={this.props.expandableRowsComponent}
        paginationTotalRows: this.state.totalRows
        // onChangeRowsPerPage={this.handlePerRowsChange}
        ,
        onChangePage: this.handlePageChange,
        noDataComponent: this.props.noDataComponent
      })));
    }
  }]);
  return Datatable;
}(_react.Component);
exports.Datatable = Datatable;
_defineProperty(Datatable, "defaultProps", {
  options: {}
});
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DocumentManager = void 0;
var _material = require("@mui/material");
var _react = _interopRequireWildcard(require("react"));
var _AddRounded = _interopRequireDefault(require("@mui/icons-material/AddRounded"));
var _DeleteRounded = _interopRequireDefault(require("@mui/icons-material/DeleteRounded"));
var _Folder = _interopRequireDefault(require("@mui/icons-material/Folder"));
var _InsertDriveFile = _interopRequireDefault(require("@mui/icons-material/InsertDriveFile"));
var _styles = require("@mui/material/styles");
var _Menu = _interopRequireDefault(require("@mui/material/Menu"));
var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));
var _Divider = _interopRequireDefault(require("@mui/material/Divider"));
var _KeyboardArrowDown = _interopRequireDefault(require("@mui/icons-material/KeyboardArrowDown"));
var _InsertDriveFileOutlined = _interopRequireDefault(require("@mui/icons-material/InsertDriveFileOutlined"));
var _Breadcrumbs = _interopRequireDefault(require("@mui/material/Breadcrumbs"));
var _Link = _interopRequireDefault(require("@mui/material/Link"));
var _PublishRounded = _interopRequireDefault(require("@mui/icons-material/PublishRounded"));
var _Dialog = _interopRequireDefault(require("@mui/material/Dialog"));
var _DialogActions = _interopRequireDefault(require("@mui/material/DialogActions"));
var _DialogContent = _interopRequireDefault(require("@mui/material/DialogContent"));
var _DialogContentText = _interopRequireDefault(require("@mui/material/DialogContentText"));
var _DialogTitle = _interopRequireDefault(require("@mui/material/DialogTitle"));
var _LockRounded = _interopRequireDefault(require("@mui/icons-material/LockRounded"));
var _Tooltip = _interopRequireDefault(require("@mui/material/Tooltip"));
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
// remove before merging back
// import { FileUploader, apiService, NextImage } from 'authscape';

var DocumentManager = function DocumentManager(_ref) {
  var loadedUser = _ref.loadedUser,
    setIsLoading = _ref.setIsLoading,
    _ref$viewDocumentType = _ref.viewDocumentType,
    viewDocumentType = _ref$viewDocumentType === void 0 ? 1 : _ref$viewDocumentType,
    _ref$disablePreview = _ref.disablePreview,
    disablePreview = _ref$disablePreview === void 0 ? false : _ref$disablePreview,
    _ref$openToFolderId = _ref.openToFolderId,
    openToFolderId = _ref$openToFolderId === void 0 ? null : _ref$openToFolderId,
    _ref$xs = _ref.xs,
    xs = _ref$xs === void 0 ? 12 : _ref$xs,
    _ref$sm = _ref.sm,
    sm = _ref$sm === void 0 ? 6 : _ref$sm,
    _ref$md = _ref.md,
    md = _ref$md === void 0 ? 4 : _ref$md,
    _ref$lg = _ref.lg,
    lg = _ref$lg === void 0 ? 2 : _ref$lg,
    _ref$overrideLockMess = _ref.overrideLockMessage,
    overrideLockMessage = _ref$overrideLockMess === void 0 ? "The directory cannot be removed." : _ref$overrideLockMess,
    _ref$zeroStateView = _ref.zeroStateView,
    zeroStateView = _ref$zeroStateView === void 0 ? null : _ref$zeroStateView,
    _ref$fieldId = _ref.fieldId1,
    fieldId1 = _ref$fieldId === void 0 ? null : _ref$fieldId,
    _ref$fieldId2 = _ref.fieldId2,
    fieldId2 = _ref$fieldId2 === void 0 ? null : _ref$fieldId2,
    _ref$fieldId3 = _ref.fieldId3,
    fieldId3 = _ref$fieldId3 === void 0 ? null : _ref$fieldId3;
  var fileUploaderRef = (0, _react.useRef)();
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    files = _useState2[0],
    setFiles = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    update = _useState4[0],
    setUpdate = _useState4[1];
  var _useState5 = (0, _react.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    folderParent = _useState6[0],
    setFolderParent = _useState6[1];
  var _useState7 = (0, _react.useState)(null),
    _useState8 = _slicedToArray(_useState7, 2),
    masterFolder = _useState8[0],
    setMasterFolder = _useState8[1];
  var _useState9 = (0, _react.useState)([]),
    _useState10 = _slicedToArray(_useState9, 2),
    breadCrumb = _useState10[0],
    setBreadCrumb = _useState10[1];
  var _useState11 = (0, _react.useState)(null),
    _useState12 = _slicedToArray(_useState11, 2),
    uploadParentId = _useState12[0],
    setUploadParentId = _useState12[1];
  var _useState13 = (0, _react.useState)(null),
    _useState14 = _slicedToArray(_useState13, 2),
    contextMenu = _useState14[0],
    setContextMenu = _useState14[1];
  var _useState15 = (0, _react.useState)(null),
    _useState16 = _slicedToArray(_useState15, 2),
    contextFile = _useState16[0],
    setContextFile = _useState16[1];
  var _useState17 = (0, _react.useState)(false),
    _useState18 = _slicedToArray(_useState17, 2),
    dialogDelete = _useState18[0],
    setDialogDelete = _useState18[1];
  var handleContextMenu = function handleContextMenu(event, file) {
    event.preventDefault();
    setContextFile(file);
    if (!file.isLocked) {
      setContextMenu(contextMenu === null ? {
        mouseX: event.clientX + 2,
        mouseY: event.clientY - 6
      } :
      // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
      // Other native context menus might behave different.
      // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
      null);
    }
  };
  (0, _react.useEffect)(function () {
    if (loadedUser) {
      var fetchDocuments = /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var folderId, folderResponse, params, response, _response;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                folderId = null;
                if (!(folderParent == null && openToFolderId != null)) {
                  _context.next = 9;
                  break;
                }
                folderId = openToFolderId;
                // should get the current document...
                _context.next = 5;
                return apiService().get("/Document/GetDocumentByFolderId?folderId=" + folderId);
              case 5:
                folderResponse = _context.sent;
                if (folderResponse != null && folderResponse.status == 200) {
                  setFolderParent(folderResponse.data);
                  setMasterFolder(folderResponse.data);
                  folderId = folderResponse.id;
                }
                _context.next = 10;
                break;
              case 9:
                if (folderParent != null) {
                  folderId = folderParent.id;
                }
              case 10:
                setUploadParentId(folderId);
                params = "";
                if (fieldId1 != null) {
                  params = "&fieldId1=" + fieldId1;
                }
                if (fieldId2 != null) {
                  params = "&fieldId2=" + fieldId2;
                }
                if (fieldId3 != null) {
                  params = "&fieldId3=" + fieldId3;
                }
                if (!(folderId != null)) {
                  _context.next = 22;
                  break;
                }
                _context.next = 18;
                return apiService().get("/Document/GetDocumentsAndFiles?parentFolderId=" + folderId + "&ViewDocumentType=" + viewDocumentType + params);
              case 18:
                response = _context.sent;
                if (response != null && response.status == 200) {
                  // setTimeout(() => {
                  setFiles(response.data);
                  // }, 500);
                }
                _context.next = 26;
                break;
              case 22:
                _context.next = 24;
                return apiService().get("/Document/GetDocumentsAndFiles?ViewDocumentType=" + viewDocumentType + params);
              case 24:
                _response = _context.sent;
                if (_response != null && _response.status == 200) {
                  setFiles(_response.data);
                }
              case 26:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }));
        return function fetchDocuments() {
          return _ref2.apply(this, arguments);
        };
      }();
      fetchDocuments();
    }
  }, [loadedUser, folderParent, update]);
  var _useState19 = (0, _react.useState)(null),
    _useState20 = _slicedToArray(_useState19, 2),
    anchorEl = _useState20[0],
    setAnchorEl = _useState20[1];
  var open = Boolean(anchorEl);
  var handleClick = function handleClick(event) {
    setAnchorEl(event.currentTarget);
  };
  var handleClose = function handleClose() {
    setAnchorEl(null);
    setContextMenu(null);
  };
  var StyledMenu = (0, _styles.styled)(function (props) {
    return /*#__PURE__*/_react["default"].createElement(_Menu["default"], _extends({
      elevation: 0,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
      },
      transformOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
    }, props));
  })(function (_ref3) {
    var theme = _ref3.theme;
    return {
      '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
          padding: '4px 0'
        },
        '& .MuiMenuItem-root': {
          '& .MuiSvgIcon-root': {
            fontSize: 18,
            color: theme.palette.text.secondary,
            marginRight: theme.spacing(1.5)
          },
          '&:active': {
            backgroundColor: (0, _styles.alpha)(theme.palette.primary.main, theme.palette.action.selectedOpacity)
          }
        }
      }
    };
  });
  var handleFileClick = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(file) {
      var addToBread,
        newBC,
        newList,
        hasBeenFound,
        index,
        element,
        _args2 = arguments;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            addToBread = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : true;
            if (!(file.type == "folder")) {
              _context2.next = 25;
              break;
            }
            setFolderParent(file);
            if (!addToBread) {
              _context2.next = 9;
              break;
            }
            newBC = _toConsumableArray(breadCrumb);
            newBC.push(file);
            setBreadCrumb(newBC);
            _context2.next = 23;
            break;
          case 9:
            newList = [];
            hasBeenFound = false;
            index = 0;
          case 12:
            if (!(index < breadCrumb.length)) {
              _context2.next = 22;
              break;
            }
            element = breadCrumb[index];
            if (!(element.id == file.id)) {
              _context2.next = 18;
              break;
            }
            hasBeenFound = true;
            newList.push(element);
            return _context2.abrupt("break", 22);
          case 18:
            if (!hasBeenFound) {
              newList.push(element);
            }
          case 19:
            index++;
            _context2.next = 12;
            break;
          case 22:
            setBreadCrumb(newList);
          case 23:
            _context2.next = 28;
            break;
          case 25:
            setIsLoading(true);
            _context2.next = 28;
            return apiService().DownloadFile("/Document/DownloadDocument?documentId=" + file.id + "&ViewDocumentType=" + viewDocumentType, file.name, function () {
              setIsLoading(false);
            });
          case 28:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function handleFileClick(_x2) {
      return _ref4.apply(this, arguments);
    };
  }();
  var dialogDeleteClosed = function dialogDeleteClosed() {
    setContextFile(null);
    setContextMenu(null);
    setDialogDelete(false);
  };
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_material.Box, {
    sx: {
      flexGrow: 1
    }
  }, (files != null && files.documentSegments.length == 0 || folderParent != null) && /*#__PURE__*/_react["default"].createElement(_material.AppBar, {
    position: "static",
    color: "inherit",
    elevation: 0
  }, /*#__PURE__*/_react["default"].createElement(_material.Toolbar, null, /*#__PURE__*/_react["default"].createElement(_material.Box, null, /*#__PURE__*/_react["default"].createElement(_material.Button, {
    id: "demo-customized-button",
    "aria-controls": open ? 'demo-customized-menu' : undefined,
    "aria-haspopup": "true",
    "aria-expanded": open ? 'true' : undefined,
    variant: "contained",
    disableElevation: true,
    onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      var newDocumentName, response;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            newDocumentName = prompt("New folder name");
            if (!(newDocumentName != null && newDocumentName != "")) {
              _context3.next = 6;
              break;
            }
            _context3.next = 4;
            return apiService().post("/Document/CreateFolder", {
              folderName: newDocumentName,
              parentFolderId: folderParent != null ? folderParent.id : null,
              viewDocumentType: viewDocumentType
            });
          case 4:
            response = _context3.sent;
            if (response != null && response.status == 200) {
              // refresh
              setUpdate(!update);
            }
          case 6:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    })),
    startIcon: /*#__PURE__*/_react["default"].createElement(_InsertDriveFile["default"], null)
  }, "New Folder")), (files != null && files.documentSegments.length == 0 || folderParent != null) && /*#__PURE__*/_react["default"].createElement(FileUploader, {
    refOveride: fileUploaderRef,
    url: "/Document/UploadFile",
    params: {
      viewType: viewDocumentType,
      parentFolderId: uploadParentId
    },
    multiple: true,
    variant: "custom",
    onUploadCompleted: function onUploadCompleted() {
      setUpdate(!update);
      handleClose();
    }
  }, /*#__PURE__*/_react["default"].createElement(_material.Button, {
    id: "FileUploader",
    "aria-controls": open ? 'demo-customized-menu' : undefined,
    "aria-haspopup": "true",
    "aria-expanded": open ? 'true' : undefined,
    variant: "text",
    disableElevation: true,
    startIcon: /*#__PURE__*/_react["default"].createElement(_PublishRounded["default"], null),
    sx: {
      marginLeft: 1
    }
  }, "Upload File(s)")))), /*#__PURE__*/_react["default"].createElement(_Divider["default"], null), /*#__PURE__*/_react["default"].createElement(_Breadcrumbs["default"], {
    "aria-label": "breadcrumb",
    separator: ">",
    sx: {
      marginLeft: 1,
      marginBottom: 2,
      marginTop: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_Link["default"], {
    underline: "hover",
    color: "inherit",
    sx: {
      cursor: "pointer",
      fontWeight: "bold"
    },
    onClick: function onClick() {
      setFolderParent(null);
      setBreadCrumb([]);
    }
  }, masterFolder == null && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, "My Files"), masterFolder != null && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, masterFolder.name)), breadCrumb.map(function (bread, index) {
    return /*#__PURE__*/_react["default"].createElement(_Link["default"], {
      key: index,
      underline: "hover",
      sx: {
        cursor: "pointer"
      },
      color: "inherit",
      onClick: function onClick() {
        handleFileClick(bread, false);
      }
    }, bread.name);
  }))), /*#__PURE__*/_react["default"].createElement(_material.Box, {
    sx: {
      height: "85vh",
      width: '100%'
    }
  }, files != null && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, masterFolder == null && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, files.documentSegments.length > 0 && folderParent == null && files.documentSegments.map(function (segment, index) {
    return /*#__PURE__*/_react["default"].createElement(_material.Box, {
      sx: {
        paddingTop: 3
      }
    }, /*#__PURE__*/_react["default"].createElement(_material.Typography, {
      variant: "h6",
      gutterBottom: true
    }, segment.name), /*#__PURE__*/_react["default"].createElement(_material.Grid, {
      container: true,
      spacing: 2
    }, files.documentAndFiles.filter(function (item) {
      return item.segmentId == segment.id;
    }).map(function (file, index) {
      return /*#__PURE__*/_react["default"].createElement(_material.Grid, {
        onContextMenu: function onContextMenu(event) {
          handleContextMenu(event, file);
        },
        item: true,
        key: index,
        xs: xs,
        sm: sm,
        md: md,
        lg: lg,
        onClick: function onClick() {
          return handleFileClick(file);
        }
      }, /*#__PURE__*/_react["default"].createElement(_material.Paper, {
        sx: {
          padding: 2,
          flexDirection: 'column',
          height: "100%",
          display: "flex",
          alignItems: "center",
          cursor: 'pointer',
          maxHeight: 300,
          position: "relative",
          '&:hover': {
            backgroundColor: '#F5F5F5'
          }
        }
      }, file.type === 'folder' && /*#__PURE__*/_react["default"].createElement(_material.Box, {
        sx: {
          position: "absolute",
          top: 45,
          color: "white"
        }
      }, file.count), file.isLocked && /*#__PURE__*/_react["default"].createElement(_material.Box, {
        sx: {
          position: "absolute",
          top: 10,
          right: 10,
          color: "black"
        }
      }, /*#__PURE__*/_react["default"].createElement(_Tooltip["default"], {
        title: overrideLockMessage
      }, /*#__PURE__*/_react["default"].createElement(_LockRounded["default"], null))), file.type === 'folder' ? /*#__PURE__*/_react["default"].createElement(_Folder["default"], {
        sx: {
          fontSize: 80,
          color: "orange"
        }
      }) : file.documentFileExtentionType == 0 || disablePreview ? /*#__PURE__*/_react["default"].createElement(_InsertDriveFileOutlined["default"], {
        sx: {
          fontSize: 60
        }
      }) : /*#__PURE__*/_react["default"].createElement(NextImage, {
        src: file.uri,
        alt: "Image",
        width: 80,
        height: 80
      }), /*#__PURE__*/_react["default"].createElement(_material.Typography, {
        variant: "subtitle1",
        sx: {
          paddingTop: 1,
          fontSize: 14
        }
      }, file.name), /*#__PURE__*/_react["default"].createElement(_material.Typography, {
        variant: "subtitle2",
        sx: {
          paddingTop: 0,
          fontSize: 11
        }
      }, file.lastUpdated)));
    })), files != null && files.documentAndFiles != null && zeroStateView != null && /*#__PURE__*/_react["default"].createElement(_material.Box, null, zeroStateView(segment, files.documentAndFiles)));
  })), (files.documentSegments.length == 0 || folderParent != null) && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_material.Grid, {
    container: true,
    spacing: 2
  }, files.documentAndFiles.map(function (file, index) {
    return /*#__PURE__*/_react["default"].createElement(_material.Grid, {
      onContextMenu: function onContextMenu(event) {
        handleContextMenu(event, file);
      },
      item: true,
      key: index,
      xs: xs,
      sm: sm,
      md: md,
      lg: lg,
      onClick: function onClick() {
        return handleFileClick(file);
      }
    }, /*#__PURE__*/_react["default"].createElement(_material.Paper, {
      sx: {
        padding: 2,
        flexDirection: 'column',
        height: "100%",
        display: "flex",
        alignItems: "center",
        cursor: 'pointer',
        maxHeight: 300,
        position: "relative",
        '&:hover': {
          backgroundColor: '#F5F5F5'
        }
      }
    }, file.type === 'folder' && /*#__PURE__*/_react["default"].createElement(_material.Box, {
      sx: {
        position: "absolute",
        top: 45,
        color: "white"
      }
    }, file.count), file.isLocked && /*#__PURE__*/_react["default"].createElement(_material.Box, {
      sx: {
        position: "absolute",
        top: 10,
        right: 10,
        color: "black"
      }
    }, /*#__PURE__*/_react["default"].createElement(_Tooltip["default"], {
      title: overrideLockMessage
    }, /*#__PURE__*/_react["default"].createElement(_LockRounded["default"], null))), file.type === 'folder' ? /*#__PURE__*/_react["default"].createElement(_Folder["default"], {
      sx: {
        fontSize: 80,
        color: "orange"
      }
    }) : file.documentFileExtentionType == 0 || disablePreview ? /*#__PURE__*/_react["default"].createElement(_InsertDriveFileOutlined["default"], {
      sx: {
        fontSize: 60
      }
    }) : /*#__PURE__*/_react["default"].createElement(NextImage, {
      src: file.uri,
      alt: "Image",
      width: 80,
      height: 80
    }), /*#__PURE__*/_react["default"].createElement(_material.Typography, {
      variant: "subtitle1",
      sx: {
        paddingTop: 1,
        fontSize: 14
      }
    }, file.name), /*#__PURE__*/_react["default"].createElement(_material.Typography, {
      variant: "subtitle2",
      sx: {
        paddingTop: 0,
        fontSize: 11
      }
    }, file.lastUpdated)));
  })), files != null && files.documentAndFiles != null && zeroStateView != null && /*#__PURE__*/_react["default"].createElement(_material.Box, null, zeroStateView()))), /*#__PURE__*/_react["default"].createElement(_Menu["default"], {
    open: contextMenu !== null,
    onClose: handleClose,
    anchorReference: "anchorPosition",
    anchorPosition: contextMenu !== null ? {
      top: contextMenu.mouseY,
      left: contextMenu.mouseX
    } : undefined
  }, /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
    startIcon: /*#__PURE__*/_react["default"].createElement(_DeleteRounded["default"], null),
    onClick: function onClick() {
      setDialogDelete(true);
      handleClose();
    }
  }, "Delete"))), /*#__PURE__*/_react["default"].createElement(_Dialog["default"], {
    open: dialogDelete,
    onClose: function onClose() {
      dialogDeleteClosed();
    },
    "aria-labelledby": "alert-dialog-title",
    "aria-describedby": "alert-dialog-description"
  }, /*#__PURE__*/_react["default"].createElement(_DialogTitle["default"], {
    id: "alert-dialog-title"
  }, "Are you sure you wan to delete ", contextFile != null ? contextFile.name : "", "?"), /*#__PURE__*/_react["default"].createElement(_DialogContent["default"], null, /*#__PURE__*/_react["default"].createElement(_DialogContentText["default"], {
    id: "alert-dialog-description"
  }, contextFile != null && contextFile.type != null && contextFile.type == 'folder' && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, "If you delete ", contextFile != null ? contextFile.name : "", ", you will delete all files and folders within  ", contextFile != null ? contextFile.name : "", "."), contextFile != null && contextFile.type != null && contextFile.type != 'folder' && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, "If you delete ", contextFile != null ? contextFile.name : "", " this file will be gone forever."))), /*#__PURE__*/_react["default"].createElement(_DialogActions["default"], null, /*#__PURE__*/_react["default"].createElement(_material.Button, {
    onClick: function onClick() {
      dialogDeleteClosed();
    }
  }, "Cancel"), /*#__PURE__*/_react["default"].createElement(_material.Button, {
    onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
      var response, _response2;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            dialogDeleteClosed();
            if (!(contextFile.type == "folder")) {
              _context4.next = 8;
              break;
            }
            _context4.next = 4;
            return apiService()["delete"]("/Document/DeleteFolder?documentId=" + contextFile.id);
          case 4:
            response = _context4.sent;
            if (response != null && response.status == 200) {
              setUpdate(!update);
            }
            _context4.next = 12;
            break;
          case 8:
            _context4.next = 10;
            return apiService()["delete"]("/Document/DeleteFile?documentId=" + contextFile.id);
          case 10:
            _response2 = _context4.sent;
            if (_response2 != null && _response2.status == 200) {
              setUpdate(!update);
            }
          case 12:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    })),
    autoFocus: true
  }, "Delete"))));
};
exports.DocumentManager = DocumentManager;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dropzone = void 0;
var _Box = _interopRequireDefault(require("@mui/material/Box"));
var _react = _interopRequireWildcard(require("react"));
var _reactDropzone = require("react-dropzone");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  paddingTop: "50px",
  paddingBottom: "50px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};
var focusedStyle = {
  borderColor: '#2196f3'
};
var acceptStyle = {
  borderColor: '#00e676'
};
var rejectStyle = {
  borderColor: '#ff1744'
};
var Dropzone = function Dropzone(_ref) {
  var _ref$text = _ref.text,
    text = _ref$text === void 0 ? "Drag 'n' drop some files here, or click to select files" : _ref$text,
    _ref$image = _ref.image,
    image = _ref$image === void 0 ? null : _ref$image,
    _ref$styleOverride = _ref.styleOverride,
    styleOverride = _ref$styleOverride === void 0 ? null : _ref$styleOverride,
    _ref$onDrop = _ref.onDrop,
    _onDrop = _ref$onDrop === void 0 ? null : _ref$onDrop,
    _ref$maxFiles = _ref.maxFiles,
    maxFiles = _ref$maxFiles === void 0 ? 1 : _ref$maxFiles,
    _ref$multiple = _ref.multiple,
    multiple = _ref$multiple === void 0 ? false : _ref$multiple,
    _ref$accept = _ref.accept,
    accept = _ref$accept === void 0 ? {
      'image/*': []
    } : _ref$accept;
  if (styleOverride != null) {
    var combined = _objectSpread(_objectSpread({}, baseStyle), styleOverride);
    baseStyle = combined;
  }
  var _useDropzone = (0, _reactDropzone.useDropzone)({
      accept: accept,
      maxFiles: maxFiles,
      multiple: multiple,
      onDrop: function onDrop(files) {
        if (multiple) {
          _onDrop(files);
        } else {
          _onDrop(files[0]);
        }
      }
    }),
    getRootProps = _useDropzone.getRootProps,
    getInputProps = _useDropzone.getInputProps,
    isFocused = _useDropzone.isFocused,
    isDragAccept = _useDropzone.isDragAccept,
    isDragReject = _useDropzone.isDragReject;
  var style = (0, _react.useMemo)(function () {
    return _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, baseStyle), isFocused ? focusedStyle : {}), isDragAccept ? acceptStyle : {}), isDragReject ? rejectStyle : {});
  }, [isFocused, isDragAccept, isDragReject]);
  return /*#__PURE__*/_react["default"].createElement(_Box["default"], {
    className: "container",
    sx: {
      cursor: "pointer"
    }
  }, /*#__PURE__*/_react["default"].createElement(_Box["default"], getRootProps({
    style: style
  }), /*#__PURE__*/_react["default"].createElement("input", getInputProps()), /*#__PURE__*/_react["default"].createElement(_Box["default"], {
    sx: {
      paddingBottom: 1
    }
  }, image != null && /*#__PURE__*/_react["default"].createElement("img", {
    src: image,
    width: 200,
    height: 200,
    style: {
      objectFit: "contain"
    }
  })), /*#__PURE__*/_react["default"].createElement(_Box["default"], null, text)));
};
exports.Dropzone = Dropzone;
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditableDatagrid = void 0;
var _react = _interopRequireWildcard(require("react"));
var _xDataGrid = require("@mui/x-data-grid");
var _Box = _interopRequireDefault(require("@mui/material/Box"));
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
var EditableDatagrid = function EditableDatagrid(_ref) {
  var _ref$url = _ref.url,
    url = _ref$url === void 0 ? null : _ref$url,
    _ref$eRows = _ref.eRows,
    eRows = _ref$eRows === void 0 ? null : _ref$eRows,
    columns = _ref.columns,
    _ref$isCellEditable = _ref.isCellEditable,
    _isCellEditable = _ref$isCellEditable === void 0 ? null : _ref$isCellEditable,
    _ref$onCellClick = _ref.onCellClick,
    onCellClick = _ref$onCellClick === void 0 ? null : _ref$onCellClick,
    _ref$onCellEdited = _ref.onCellEdited,
    onCellEdited = _ref$onCellEdited === void 0 ? null : _ref$onCellEdited,
    _ref$params = _ref.params,
    params = _ref$params === void 0 ? null : _ref$params,
    _ref$sx = _ref.sx,
    sx = _ref$sx === void 0 ? {} : _ref$sx,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? "50vh" : _ref$height,
    _ref$pageSize = _ref.pageSize,
    pageSize = _ref$pageSize === void 0 ? 50 : _ref$pageSize,
    _ref$rowsPerPage = _ref.rowsPerPage,
    rowsPerPage = _ref$rowsPerPage === void 0 ? [25, 50, 100] : _ref$rowsPerPage,
    _ref$rowHeight = _ref.rowHeight,
    rowHeight = _ref$rowHeight === void 0 ? 70 : _ref$rowHeight,
    _ref$key = _ref.key,
    key = _ref$key === void 0 ? null : _ref$key,
    _ref$onRowClick = _ref.onRowClick,
    onRowClick = _ref$onRowClick === void 0 ? null : _ref$onRowClick;
  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    rows = _useState2[0],
    setRows = _useState2[1];
  var _useState3 = (0, _react.useState)(0),
    _useState4 = _slicedToArray(_useState3, 2),
    totalRows = _useState4[0],
    setTotalRows = _useState4[1];
  // const [offset, setOffset] = useState(0);

  var _React$useState = _react["default"].useState({
      page: 0,
      pageSize: pageSize
    }),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    paginationModel = _React$useState2[0],
    setPaginationModel = _React$useState2[1];
  (0, _react.useEffect)(function () {
    reloadDataGrid();
  }, [paginationModel]);
  var reloadDataGrid = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var response;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!(url != null)) {
              _context.next = 16;
              break;
            }
            response = null;
            if (!(params == null)) {
              _context.next = 8;
              break;
            }
            _context.next = 5;
            return apiService().post(url, {
              offset: paginationModel.page,
              length: paginationModel.pageSize
            });
          case 5:
            response = _context.sent;
            _context.next = 13;
            break;
          case 8:
            params.offset = paginationModel.page;
            params.length = paginationModel.pageSize;
            _context.next = 12;
            return apiService().post(url, params);
          case 12:
            response = _context.sent;
          case 13:
            if (response != null && response.status == 200) {
              setTotalRows(response.data.recordsTotal);
              setRows(response.data.data);
            }
            _context.next = 17;
            break;
          case 16:
            if (rows != null) {
              setTotalRows(eRows.length);
              setRows(eRows);
            }
          case 17:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function reloadDataGrid() {
      return _ref2.apply(this, arguments);
    };
  }();
  var handleCellEditCommit = _react["default"].useCallback(function () {
    return /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(params) {
        var id, field, value, editedRow;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              id = params.id, field = params.field, value = params.value;
              editedRow = {
                id: id,
                field: field,
                value: value
              };
              onCellEdited(editedRow);
            case 3:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    }();
  }, []);
  return /*#__PURE__*/_react["default"].createElement(_Box["default"], {
    sx: {
      height: height
    }
  }, /*#__PURE__*/_react["default"].createElement(_xDataGrid.DataGrid, {
    rows: rows,
    sx: sx,
    key: key,
    columns: columns,
    rowCount: totalRows,
    onRowClick: onRowClick,
    paginationMode: "server",
    pageSizeOptions: rowsPerPage,
    rowHeight: rowHeight,
    paginationModel: paginationModel,
    onPaginationModelChange: setPaginationModel,
    disableSelectionOnClick: true,
    onCellClick: onCellClick,
    onCellEditCommit: handleCellEditCommit(),
    isCellEditable: function isCellEditable(params) {
      if (_isCellEditable != null) {
        _isCellEditable(params);
      }
      return true;
    }
  }));
};
exports.EditableDatagrid = EditableDatagrid;
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileUploader = void 0;
var _react = _interopRequireWildcard(require("react"));
var _LinearProgress = _interopRequireDefault(require("@mui/material/LinearProgress"));
var _Box = _interopRequireDefault(require("@mui/system/Box"));
var _Grid = _interopRequireDefault(require("@mui/material/Grid"));
var _FileCopyRounded = _interopRequireDefault(require("@mui/icons-material/FileCopyRounded"));
var _UploadRounded = _interopRequireDefault(require("@mui/icons-material/UploadRounded"));
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
var _Stack = _interopRequireDefault(require("@mui/material/Stack"));
var _FileDownloadOutlined = _interopRequireDefault(require("@mui/icons-material/FileDownloadOutlined"));
var _IconButton = _interopRequireDefault(require("@mui/material/IconButton"));
var _Delete = _interopRequireDefault(require("@mui/icons-material/Delete"));
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _Dialog = _interopRequireDefault(require("@mui/material/Dialog"));
var _DialogActions = _interopRequireDefault(require("@mui/material/DialogActions"));
var _DialogContent = _interopRequireDefault(require("@mui/material/DialogContent"));
var _DialogContentText = _interopRequireDefault(require("@mui/material/DialogContentText"));
var _DialogTitle = _interopRequireDefault(require("@mui/material/DialogTitle"));
var _Tooltip = _interopRequireDefault(require("@mui/material/Tooltip"));
var _Backdrop = _interopRequireDefault(require("@mui/material/Backdrop"));
var _CircularProgress = _interopRequireDefault(require("@mui/material/CircularProgress"));
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
var FileUploader = function FileUploader(_ref) {
  var url = _ref.url,
    params = _ref.params,
    _ref$multiple = _ref.multiple,
    multiple = _ref$multiple === void 0 ? false : _ref$multiple,
    _ref$fileLoaderUri = _ref.fileLoaderUri,
    fileLoaderUri = _ref$fileLoaderUri === void 0 ? null : _ref$fileLoaderUri,
    children = _ref.children,
    _ref$isHidden = _ref.isHidden,
    isHidden = _ref$isHidden === void 0 ? false : _ref$isHidden,
    _ref$refOveride = _ref.refOveride,
    refOveride = _ref$refOveride === void 0 ? null : _ref$refOveride,
    _ref$primaryColor = _ref.primaryColor,
    primaryColor = _ref$primaryColor === void 0 ? "#000" : _ref$primaryColor,
    _ref$onConfirmDelete = _ref.onConfirmDelete,
    onConfirmDelete = _ref$onConfirmDelete === void 0 ? null : _ref$onConfirmDelete,
    _ref$accept = _ref.accept,
    accept = _ref$accept === void 0 ? "" : _ref$accept,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? "filemanager" : _ref$variant,
    _ref$onUploadComplete = _ref.onUploadCompleted,
    onUploadCompleted = _ref$onUploadComplete === void 0 ? null : _ref$onUploadComplete;
  // Declare a new state variable, which we'll call "count"
  var _useState = (0, _react.useState)(""),
    _useState2 = _slicedToArray(_useState, 2),
    message = _useState2[0],
    setMessage = _useState2[1];
  var _useState3 = (0, _react.useState)(0),
    _useState4 = _slicedToArray(_useState3, 2),
    loaded = _useState4[0],
    setLoaded = _useState4[1];
  // const [selectedFile, setSelectedFile] = useState(null);
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    uploading = _useState6[0],
    setUploading = _useState6[1];
  var _useState7 = (0, _react.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    viewDeleteDialog = _useState8[0],
    setViewDeleteDialog = _useState8[1];
  var _useState9 = (0, _react.useState)([]),
    _useState10 = _slicedToArray(_useState9, 2),
    filesUploaded = _useState10[0],
    setFilesUploaded = _useState10[1];
  var _useState11 = (0, _react.useState)(null),
    _useState12 = _slicedToArray(_useState11, 2),
    orderFileId = _useState12[0],
    setOrderFileId = _useState12[1];
  var _useState13 = (0, _react.useState)(null),
    _useState14 = _slicedToArray(_useState13, 2),
    filesDownloadable = _useState14[0],
    setFilesDownloadable = _useState14[1];
  var _useState15 = (0, _react.useState)([]),
    _useState16 = _slicedToArray(_useState15, 2),
    parameters = _useState16[0],
    setParameters = _useState16[1];
  var fileUploader = (0, _react.useRef)();
  var handleUpload = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(event) {
      var selectedFiles, fileCount, fileIndex, responses, selectedIndex, selectedFile, data, index, element, response;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            selectedFiles = event.target.files;
            setLoaded(0);
            setMessage(event.target.files[0] ? event.target.files[0].name : "");
            if (!uploading) {
              _context.next = 5;
              break;
            }
            return _context.abrupt("return");
          case 5:
            if (selectedFiles) {
              _context.next = 8;
              break;
            }
            setMessage("Select a file first");
            return _context.abrupt("return");
          case 8:
            setUploading(true);
            fileCount = selectedFiles.length;
            fileIndex = 1;
            responses = [];
            selectedIndex = 0;
          case 13:
            if (!(selectedIndex < selectedFiles.length)) {
              _context.next = 34;
              break;
            }
            selectedFile = selectedFiles[selectedIndex];
            data = new FormData();
            data.append("file", selectedFile, selectedFile.name);
            for (index = 0; index < parameters.length; index++) {
              element = parameters[index];
              data.append(element.key, element.value);
            }
            response = null;
            _context.prev = 19;
            _context.next = 22;
            return apiService().post(url, data, {
              onUploadProgress: function onUploadProgress(ProgressEvent) {
                var loadedTotal = Math.round(ProgressEvent.loaded / ProgressEvent.total * 100);
                var percent = fileIndex / fileCount * 100;
                setLoaded(percent);
                if (percent == 100) {
                  setTimeout(function () {
                    setLoaded(0);
                    setMessage("");
                    reloadFiles();
                  }, 2000);
                }
              }
            });
          case 22:
            response = _context.sent;
            _context.next = 29;
            break;
          case 25:
            _context.prev = 25;
            _context.t0 = _context["catch"](19);
            setUploading(false);
            setMessage("Failed to upload");
          case 29:
            responses.push(response);
            fileIndex++;
          case 31:
            selectedIndex++;
            _context.next = 13;
            break;
          case 34:
            if (onUploadCompleted != null) {
              onUploadCompleted(responses);
            }
            setUploading(false);
            setMessage("Uploaded successfully");
          case 37:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[19, 25]]);
    }));
    return function handleUpload(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  var handleUploadFileInput = function handleUploadFileInput() {
    fileUploader.current.click();
  };
  (0, _react.useEffect)(function () {
    if (params != null) {
      var propertyNames = Object.keys(params);
      var propertyValues = Object.values(params);
      var array = [];
      for (var index = 0; index < propertyNames.length; index++) {
        if (propertyNames[index] != null && propertyValues[index] != null) {
          array.push({
            key: propertyNames[index],
            value: propertyValues[index]
          });
        }
      }
      setParameters(array);
    }
  }, [params]);
  var reloadFiles = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var response;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return apiService().get(fileLoaderUri);
          case 2:
            response = _context2.sent;
            if (response != null && response.status == 200) {
              setFilesDownloadable(response.data);
            }
          case 4:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function reloadFiles() {
      return _ref3.apply(this, arguments);
    };
  }();
  (0, _react.useEffect)(function () {
    if (fileLoaderUri != null) {
      var fetchAsync = /*#__PURE__*/function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return reloadFiles();
              case 2:
              case "end":
                return _context3.stop();
            }
          }, _callee3);
        }));
        return function fetchAsync() {
          return _ref4.apply(this, arguments);
        };
      }();
      fetchAsync();
    }
  }, [fileLoaderUri]);
  return /*#__PURE__*/_react["default"].createElement(_Box["default"], {
    sx: {
      display: isHidden ? "none" : "block"
    }
  }, /*#__PURE__*/_react["default"].createElement("input", {
    className: "inputfile",
    id: "file",
    type: "file",
    name: "file",
    multiple: multiple,
    accept: accept,
    ref: fileUploader,
    onChange: handleUpload,
    style: {
      display: "none"
    }
  }), variant == "custom" && /*#__PURE__*/_react["default"].createElement(_Box["default"], {
    ref: refOveride,
    onClick: function onClick() {
      handleUploadFileInput();
    }
  }, children), variant == "filemanager" && /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    container: true,
    spacing: 2
  }, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    ref: refOveride,
    item: true,
    xs: 12,
    onClick: handleUploadFileInput
  }, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    container: true,
    sx: {
      padding: 2,
      backgroundColor: "#ECEDED",
      fontSize: "14px",
      cursor: "pointer",
      borderRadius: "8px",
      border: "1px dashed #C8D4D5"
    }
  }, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    item: true,
    xs: 2
  }, /*#__PURE__*/_react["default"].createElement(_Box["default"], null, /*#__PURE__*/_react["default"].createElement(_FileCopyRounded["default"], {
    sx: {
      fill: "#C8D4D5",
      width: 50,
      height: 50
    }
  }))), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    item: true,
    xs: 10
  }, /*#__PURE__*/_react["default"].createElement(_Box["default"], null, "Drag and drop files here or"), /*#__PURE__*/_react["default"].createElement(_Box["default"], {
    sx: {
      marginTop: 1
    }
  }, /*#__PURE__*/_react["default"].createElement(_Stack["default"], {
    direction: "row",
    spacing: 2
  }, /*#__PURE__*/_react["default"].createElement(_UploadRounded["default"], {
    sx: {
      fill: primaryColor,
      width: 30,
      height: 30
    }
  }), /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
    variant: "h3",
    component: "span",
    sx: {
      color: primaryColor,
      paddingTop: 0.6
    }
  }, "Upload")))), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    item: true,
    xs: 12
  }, loaded > 0 && /*#__PURE__*/_react["default"].createElement(_LinearProgress["default"], {
    variant: "buffer",
    value: loaded,
    sx: {
      marginTop: 2
    }
  }), loaded == 100 && /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
    variant: "h3",
    component: "span",
    sx: {
      color: primaryColor,
      paddingTop: 0.6
    }
  }, "Completed")))), children, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    container: true,
    sx: {
      paddingTop: 1
    }
  }, filesDownloadable != null && filesDownloadable.map(function (fileUpload, idx) {
    return /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
      key: "fileDownloadable-" + idx,
      item: true,
      xs: 8,
      sm: 8,
      md: 5,
      lg: 3,
      sx: {
        marginLeft: 2,
        padding: 1,
        marginTop: 1,
        backgroundColor: "#ECEDED",
        position: "relative",
        fontSize: "14px",
        cursor: "pointer",
        borderRadius: "8px",
        border: "1px solid #54C7DD"
      },
      onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              window.open(fileUpload.uri);
            case 1:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }))
    }, /*#__PURE__*/_react["default"].createElement(_Tooltip["default"], {
      placement: "left",
      arrow: true,
      title: fileUpload.name
    }, /*#__PURE__*/_react["default"].createElement(_Stack["default"], {
      direction: "row",
      spacing: 1,
      display: "flex",
      justifyContent: "space-between"
    }, /*#__PURE__*/_react["default"].createElement(_Box["default"], {
      display: "flex",
      alignItems: "center"
    }, /*#__PURE__*/_react["default"].createElement(_FileDownloadOutlined["default"], {
      sx: {
        fill: "#92D6E3"
      }
    }), /*#__PURE__*/_react["default"].createElement(_Box["default"], {
      sx: {
        paddingTop: 0.6,
        marginLeft: "5px"
      }
    }, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
      sx: {
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        width: "350px"
      }
    }, fileUpload.name)), /*#__PURE__*/_react["default"].createElement(_IconButton["default"], {
      "aria-label": "delete",
      sx: {
        position: "absolute",
        right: "0"
      },
      onClick: function onClick(evt) {
        evt.stopPropagation();
        setOrderFileId(fileUpload.id);
        setViewDeleteDialog(true);
      }
    }, /*#__PURE__*/_react["default"].createElement(_Delete["default"], null))))));
  }))), /*#__PURE__*/_react["default"].createElement(_Dialog["default"], {
    open: viewDeleteDialog,
    fullWidth: true,
    maxWidth: "xs",
    onClose: function onClose() {
      setViewDeleteDialog(false);
    },
    "aria-labelledby": "alert-dialog-title",
    "aria-describedby": "alert-dialog-description"
  }, /*#__PURE__*/_react["default"].createElement(_DialogTitle["default"], null, "Remove File"), /*#__PURE__*/_react["default"].createElement(_DialogContent["default"], null, /*#__PURE__*/_react["default"].createElement(_DialogContentText["default"], null, "Are you sure you want to remove this file?")), /*#__PURE__*/_react["default"].createElement(_DialogActions["default"], null, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    onClick: function onClick() {
      setViewDeleteDialog(false);
    }
  }, "No"), /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            if (onConfirmDelete != null) {
              onConfirmDelete();
            }
          case 1:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    })),
    autoFocus: true
  }, "Yes"))), /*#__PURE__*/_react["default"].createElement(_Backdrop["default"], {
    sx: {
      color: '#fff',
      zIndex: 99999
    },
    open: uploading
  }, /*#__PURE__*/_react["default"].createElement(_CircularProgress["default"], {
    color: "inherit"
  })));
};
exports.FileUploader = FileUploader;
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Overview = exports.GoogleMapsHeatmap = exports.GoogleMaps = void 0;
var _react = _interopRequireWildcard(require("react"));
var _api = require("@react-google-maps/api");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var containerStyle = {
  width: '100%',
  height: '100%'
};
var center = {
  lat: 38,
  lng: -98
};
var GoogleMaps = function GoogleMaps(_ref) {
  var apiKey = _ref.apiKey,
    hasLoaded = _ref.hasLoaded,
    children = _ref.children;
  return /*#__PURE__*/_react["default"].createElement(_api.LoadScript, {
    googleMapsApiKey: apiKey,
    libraries: ['visualization']
  }, /*#__PURE__*/_react["default"].createElement(_api.GoogleMap, {
    mapContainerStyle: containerStyle,
    center: center,
    zoom: 5
  }, hasLoaded && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, children)));
};
exports.GoogleMaps = GoogleMaps;
var GoogleMapsHeatmap = function GoogleMapsHeatmap(_ref2) {
  var apiKey = _ref2.apiKey,
    _ref2$data = _ref2.data,
    data = _ref2$data === void 0 ? [] : _ref2$data,
    _ref2$gradient = _ref2.gradient,
    gradient = _ref2$gradient === void 0 ? null : _ref2$gradient,
    _ref2$radius = _ref2.radius,
    radius = _ref2$radius === void 0 ? 50 : _ref2$radius,
    _ref2$opacity = _ref2.opacity,
    opacity = _ref2$opacity === void 0 ? 0.6 : _ref2$opacity,
    overlay = _ref2.overlay;
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    heatmapData = _useState2[0],
    setHeatmapData = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    hasLoaded = _useState4[0],
    setHasLoaded = _useState4[1];
  (0, _react.useEffect)(function () {
    if (window.google) {
      var mappingData = [];
      data.forEach(function (element) {
        mappingData.push({
          location: new google.maps.LatLng(element.lat, element.lng),
          weight: element.weight,
          data: element
        });
      });
      setHeatmapData(mappingData);
    }
  }, []);
  (0, _react.useEffect)(function () {
    if (heatmapData != null) {
      setHasLoaded(true);
    }
  }, [heatmapData]);
  return /*#__PURE__*/_react["default"].createElement(GoogleMaps, {
    apiKey: apiKey,
    hasLoaded: hasLoaded
  }, /*#__PURE__*/_react["default"].createElement(_api.HeatmapLayerF, {
    data: heatmapData,
    options: {
      radius: radius,
      opacity: opacity,
      gradient: gradient != null ? gradient : ['rgba(0, 255, 255, 0)', 'rgba(0, 255, 255, 1)', 'rgba(0, 191, 255, 1)', 'rgba(0, 127, 255, 1)', 'rgba(0, 63, 255, 1)', 'rgba(0, 0, 255, 1)', 'rgba(0, 0, 223, 1)', 'rgba(0, 0, 191, 1)', 'rgba(0, 0, 159, 1)', 'rgba(0, 0, 127, 1)', 'rgba(63, 0, 91, 1)', 'rgba(127, 0, 63, 1)', 'rgba(191, 0, 31, 1)', 'rgba(255, 0, 0, 1)']
    }
  }), heatmapData != null && heatmapData.map(function (point) {
    return /*#__PURE__*/_react["default"].createElement(_api.OverlayViewF, {
      position: {
        lat: point.location.lat(),
        lng: point.location.lng()
      },
      mapPaneName: _api.OverlayView.OVERLAY_MOUSE_TARGET
    }, overlay(point));
  }));
};

// components
exports.GoogleMapsHeatmap = GoogleMapsHeatmap;
var Overview = function Overview(_ref3) {
  var lat = _ref3.lat,
    lng = _ref3.lng,
    children = _ref3.children;
  return /*#__PURE__*/_react["default"].createElement(_api.OverlayViewF, {
    position: {
      lat: lat,
      lng: lng
    },
    mapPaneName: _api.OverlayView.OVERLAY_MOUSE_TARGET
  }, children);
};
exports.Overview = Overview;
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GoogleMapsAutoComplete = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Box = _interopRequireDefault(require("@mui/system/Box"));
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
var _Grid = _interopRequireDefault(require("@mui/material/Grid"));
var _MenuList = _interopRequireDefault(require("@mui/material/MenuList"));
var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));
var _ListItemIcon = _interopRequireDefault(require("@mui/material/ListItemIcon"));
var _LocationOnRounded = _interopRequireDefault(require("@mui/icons-material/LocationOnRounded"));
var _ListItemText = _interopRequireDefault(require("@mui/material/ListItemText"));
var _reactCoolOnclickoutside = _interopRequireDefault(require("react-cool-onclickoutside"));
var _Stack = _interopRequireDefault(require("@mui/material/Stack"));
var _usePlacesAutocomplete = _interopRequireWildcard(require("use-places-autocomplete"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var AutoCompleteDialog = function AutoCompleteDialog(_ref) {
  var placeholder = _ref.placeholder,
    onSelected = _ref.onSelected,
    defaultValue = _ref.defaultValue,
    onChange = _ref.onChange;
  var txtAddressField = (0, _react.useRef)(null);
  var dismissSuggestions = function dismissSuggestions() {
    clearSuggestions();
  };
  var ref = (0, _reactCoolOnclickoutside["default"])(dismissSuggestions);
  var _usePlacesAutocomplet = (0, _usePlacesAutocomplete["default"])({
      requestOptions: {
        /* Define search scope here */
      },
      debounce: 1000
    }),
    ready = _usePlacesAutocomplet.ready,
    value = _usePlacesAutocomplet.value,
    _usePlacesAutocomplet2 = _usePlacesAutocomplet.suggestions,
    status = _usePlacesAutocomplet2.status,
    data = _usePlacesAutocomplet2.data,
    setValue = _usePlacesAutocomplet.setValue,
    clearSuggestions = _usePlacesAutocomplet.clearSuggestions;
  var handleInput = function handleInput(e) {
    e.stopPropagation();

    // Update the keyword of the input element
    setValue(e.target.value);
    onChange(e.target.value);
  };

  // useEffect(() => {

  //   setValue(defaultValue) // test this!!!!

  // }, [defaultValue])

  var determineComponentType = function determineComponentType(component) {
    var returnVal = {};
    for (var index = 0; index < component.types.length; index++) {
      var componentType = component.types[index];
      switch (componentType) {
        case "street_number":
          returnVal = {
            componentType: "Street_number",
            long_name: component.long_name,
            short_name: component.short_name
          };
          break;
        case "route":
          returnVal = {
            componentType: "Route",
            long_name: component.long_name,
            short_name: component.short_name
          };
          break;
        case "locality":
          returnVal = {
            componentType: "City",
            long_name: component.long_name,
            short_name: component.short_name
          };
          break;
        case "administrative_area_level_2":
          returnVal = {
            componentType: "County",
            long_name: component.long_name,
            short_name: component.short_name
          };
          break;
        case "administrative_area_level_1":
          returnVal = {
            componentType: "State",
            long_name: component.long_name,
            short_name: component.short_name
          };
          break;
        case "country":
          returnVal = {
            componentType: "country",
            long_name: component.long_name,
            short_name: component.short_name
          };
          break;
        case "postal_code":
          returnVal = {
            componentType: "postal_code",
            long_name: component.long_name,
            short_name: component.short_name
          };
          break;
        case "postal_code_suffix":
          returnVal = {
            componentType: "postal_code_suffix",
            long_name: component.long_name,
            short_name: component.short_name
          };
          break;
      }
    }
    return returnVal;
  };
  var getSimplifyResult = function getSimplifyResult(result) {
    var street_number = "";
    var route = "";
    var city = "";
    var county = "";
    var state = "";
    var country = "";
    var postal_code = "";
    var postal_code_suffix = "";
    var lat = null;
    var _long = null;
    var mapUrl = "";
    var placeId = null;
    for (var index = 0; index < result.address_components.length; index++) {
      var component = result.address_components[index];
      var response = determineComponentType(component);
      if (response.componentType == "Street_number") {
        street_number = response.long_name;
      } else if (response.componentType == "Route") {
        route = response.long_name;
      } else if (response.componentType == "City") {
        city = response.long_name;
      } else if (response.componentType == "County") {
        county = response.long_name;
      } else if (response.componentType == "State") {
        state = response.short_name;
      } else if (response.componentType == "country") {
        country = response.long_name;
      } else if (response.componentType == "postal_code") {
        postal_code = response.long_name;
      } else if (response.componentType == "postal_code_suffix") {
        postal_code_suffix = response.long_name;
      }
    }
    if (result.geometry != null && result.geometry.location != null) {
      lat = result.geometry.location.lat;
      _long = result.geometry.location.lng;
    }
    mapUrl = result.url;
    placeId = result.place_id;
    return {
      address: street_number + " " + route,
      city: city,
      state: state,
      county: county,
      postalCode: postal_code,
      country: country,
      lat: lat,
      "long": _long,
      mapUrl: mapUrl,
      placeId: placeId
    };
  };
  var handleSelect = function handleSelect(_ref2) {
    var description = _ref2.description,
      place_id = _ref2.place_id;
    return function () {
      var parameter = {
        // Use the "place_id" of suggestion from the dropdown (object), here just taking first suggestion for brevity
        placeId: place_id
        // Specify the return data that you want (optional)
        //fields: ["name", "rating"],
      };

      clearSuggestions();
      (0, _usePlacesAutocomplete.getDetails)(parameter).then(function (result) {
        var response = getSimplifyResult(result);
        if (response != null) {
          onSelected(response);
          setValue(response.address, false);
        }
      })["catch"](function (error) {
        alert(error);
      });
    };
  };
  var renderSuggestions = function renderSuggestions() {
    return data.map(function (suggestion) {
      var place_id = suggestion.place_id,
        _suggestion$structure = suggestion.structured_formatting,
        main_text = _suggestion$structure.main_text,
        secondary_text = _suggestion$structure.secondary_text;
      return /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
        key: place_id,
        onClick: handleSelect(suggestion, place_id),
        sx: {
          paddingRight: 2
        }
      }, /*#__PURE__*/_react["default"].createElement(_ListItemIcon["default"], null, /*#__PURE__*/_react["default"].createElement(_LocationOnRounded["default"], {
        fontSize: "small"
      })), /*#__PURE__*/_react["default"].createElement(_ListItemText["default"], null, /*#__PURE__*/_react["default"].createElement("strong", null, main_text), " ", /*#__PURE__*/_react["default"].createElement("small", null, secondary_text)));
    });
  };
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_Stack["default"], null, /*#__PURE__*/_react["default"].createElement(_TextField["default"], {
    ref: txtAddressField,
    defaultValue: defaultValue,
    name: "address",
    autoComplete: "new-password",
    label: placeholder,
    variant: "outlined",
    fullWidth: true,
    value: value,
    onChange: handleInput
  })), status == "OK" && /*#__PURE__*/_react["default"].createElement(_MenuList["default"], {
    ref: ref,
    sx: {
      position: "absolute",
      zIndex: 9999,
      backgroundColor: "white",
      border: "1px solid black"
    }
  }, renderSuggestions()));
};
var GoogleMapsAutoComplete = function GoogleMapsAutoComplete(_ref3) {
  var onAddressSelected = _ref3.onAddressSelected,
    _ref3$_address = _ref3._address,
    _address = _ref3$_address === void 0 ? "" : _ref3$_address,
    _ref3$_city = _ref3._city,
    _city = _ref3$_city === void 0 ? "" : _ref3$_city,
    _ref3$_state = _ref3._state,
    _state = _ref3$_state === void 0 ? "" : _ref3$_state,
    _ref3$_postalCode = _ref3._postalCode,
    _postalCode = _ref3$_postalCode === void 0 ? "" : _ref3$_postalCode;
  var _useState = (0, _react.useState)(_address),
    _useState2 = _slicedToArray(_useState, 2),
    address = _useState2[0],
    setAddress = _useState2[1];
  var _useState3 = (0, _react.useState)(_city),
    _useState4 = _slicedToArray(_useState3, 2),
    city = _useState4[0],
    setCity = _useState4[1];
  var _useState5 = (0, _react.useState)(_state),
    _useState6 = _slicedToArray(_useState5, 2),
    state = _useState6[0],
    setState = _useState6[1];
  var _useState7 = (0, _react.useState)(_postalCode),
    _useState8 = _slicedToArray(_useState7, 2),
    zip = _useState8[0],
    setPostalcode = _useState8[1];
  var _useState9 = (0, _react.useState)(null),
    _useState10 = _slicedToArray(_useState9, 2),
    lat = _useState10[0],
    setLat = _useState10[1];
  var _useState11 = (0, _react.useState)(null),
    _useState12 = _slicedToArray(_useState11, 2),
    lng = _useState12[0],
    setLng = _useState12[1];
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_Box["default"], null, /*#__PURE__*/_react["default"].createElement(AutoCompleteDialog, {
    placeholder: "Address",
    defaultValue: address,
    onSelected: function onSelected(data) {
      setAddress(data.address);
      setCity(data.city);
      setState(data.state);
      setPostalcode(data.postalCode);
      setLat(data.lat);
      setLng(data["long"]);
      onAddressSelected(data.address, data.city, data.state, data.postalCode, data.lat, data["long"]);
    },
    onChange: function onChange(address) {
      setAddress(address);
    }
  }), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    container: true,
    spacing: 1,
    sx: {
      marginTop: 1
    }
  }, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    item: true,
    xs: 6
  }, /*#__PURE__*/_react["default"].createElement(_Box["default"], null, /*#__PURE__*/_react["default"].createElement(_TextField["default"], {
    id: "outlined-basic",
    label: "City",
    name: "city",
    variant: "outlined",
    fullWidth: true,
    value: city,
    onChange: function onChange(val) {
      setCity(val.currentTarget.value);
    }
  }))), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    item: true,
    xs: 6
  }, /*#__PURE__*/_react["default"].createElement(_Box["default"], null, /*#__PURE__*/_react["default"].createElement(_TextField["default"], {
    id: "outlined-basic",
    label: "State",
    name: "state",
    variant: "outlined",
    fullWidth: true,
    value: state,
    onChange: function onChange(val) {
      setState(val.currentTarget.value);
    }
  })))), /*#__PURE__*/_react["default"].createElement(_Box["default"], {
    sx: {
      marginTop: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_TextField["default"], {
    id: "outlined-basic",
    label: "Postal code",
    name: "postalCode",
    variant: "outlined",
    fullWidth: true,
    value: zip,
    onChange: function onChange(val) {
      setPostalcode(val.currentTarget.value);
    }
  }))));
};
exports.GoogleMapsAutoComplete = GoogleMapsAutoComplete;
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AssignMapping = AssignMapping;
var _react = _interopRequireWildcard(require("react"));
var _system = require("@mui/system");
var _Container = _interopRequireDefault(require("@mui/material/Container"));
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
var _material = require("@mui/material");
var _Dialog = _interopRequireDefault(require("@mui/material/Dialog"));
var _DialogActions = _interopRequireDefault(require("@mui/material/DialogActions"));
var _DialogContent = _interopRequireDefault(require("@mui/material/DialogContent"));
var _DialogTitle = _interopRequireDefault(require("@mui/material/DialogTitle"));
var _Close = _interopRequireDefault(require("@mui/icons-material/Close"));
var _IconButton = _interopRequireDefault(require("@mui/material/IconButton"));
var _ArrowRightAltRounded = _interopRequireDefault(require("@mui/icons-material/ArrowRightAltRounded"));
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
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; } // import { apiService } from 'authscape';
// import MappedColumn from './MappedColumn';
// import ConditionBasedTool from './conditionBasedTool';
// import SpreadsheetViewer from '../spreadsheetViewer';
function AssignMapping(_ref) {
  var currentUser = _ref.currentUser,
    documentComponentId = _ref.documentComponentId,
    _ref$setIsLoading = _ref.setIsLoading,
    setIsLoading = _ref$setIsLoading === void 0 ? null : _ref$setIsLoading,
    _ref$onCancel = _ref.onCancel,
    onCancel = _ref$onCancel === void 0 ? null : _ref$onCancel,
    _ref$onPublished = _ref.onPublished,
    onPublished = _ref$onPublished === void 0 ? null : _ref$onPublished;
  var _useState = (0, _react.useState)(documentComponentId),
    _useState2 = _slicedToArray(_useState, 2),
    documentId = _useState2[0],
    setDocumentId = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    fromColumnOptions = _useState4[0],
    setFromColumnOptions = _useState4[1];
  var _useState5 = (0, _react.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    toColumnOptions = _useState6[0],
    setToColumnOptions = _useState6[1];
  var _useState7 = (0, _react.useState)(null),
    _useState8 = _slicedToArray(_useState7, 2),
    documentType = _useState8[0],
    setDocumentType = _useState8[1];
  var _useState9 = (0, _react.useState)(null),
    _useState10 = _slicedToArray(_useState9, 2),
    documentName = _useState10[0],
    setDocumentName = _useState10[1];
  var _useState11 = (0, _react.useState)(1),
    _useState12 = _slicedToArray(_useState11, 2),
    urlTick = _useState12[0],
    setURLTick = _useState12[1];
  var _useState13 = (0, _react.useState)(null),
    _useState14 = _slicedToArray(_useState13, 2),
    spreadSheetAddress = _useState14[0],
    setSpreadSheetAddress = _useState14[1];
  var _useState15 = (0, _react.useState)(false),
    _useState16 = _slicedToArray(_useState15, 2),
    showPreviewDialog = _useState16[0],
    setShowPreviewDialog = _useState16[1];
  var _useState17 = (0, _react.useState)(null),
    _useState18 = _slicedToArray(_useState17, 2),
    advanceQuery = _useState18[0],
    setAdvanceQuery = _useState18[1];
  var spreadSheetRef = (0, _react.useRef)(null);
  var fetchMappingTo = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var response;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return apiService().get("/DocumentMapping/GetMappedDynamicFieldsForCompany?companyId=" + currentUser.companyId + "&documentId=" + documentComponentId);
          case 2:
            response = _context.sent;
            if (response != null) {
              setToColumnOptions(response.data);
            }
          case 4:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function fetchMappingTo() {
      return _ref2.apply(this, arguments);
    };
  }();
  var fetchMappingFrom = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var response;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return apiService().post("/DocumentMapping/GetMapping", {
              documentComponentId: documentComponentId,
              companyId: currentUser.companyId
            });
          case 2:
            response = _context2.sent;
            if (response != null) {
              setFromColumnOptions(response.data.documentMappings);
              setDocumentName(response.data.name);
              setDocumentType(response.data.documentType);
            }
          case 4:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function fetchMappingFrom() {
      return _ref3.apply(this, arguments);
    };
  }();
  (0, _react.useEffect)(function () {
    if (documentComponentId != null) {
      if (setIsLoading != null) {
        setIsLoading(true);
      }
      setSpreadSheetAddress("/DocumentMappingPreview/PreviewMappedData?companyId=" + currentUser.companyId + "&documentComponentId=" + documentComponentId);
      var fetchData = /*#__PURE__*/function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return fetchMappingFrom();
              case 2:
                _context3.next = 4;
                return fetchMappingTo();
              case 4:
                if (setIsLoading != null) {
                  setIsLoading(false);
                }
              case 5:
              case "end":
                return _context3.stop();
            }
          }, _callee3);
        }));
        return function fetchData() {
          return _ref4.apply(this, arguments);
        };
      }();
      fetchData();
    }
  }, [documentComponentId]);
  return /*#__PURE__*/_react["default"].createElement(_system.Box, null, /*#__PURE__*/_react["default"].createElement(_Container["default"], {
    maxWidth: "xl",
    sx: {
      marginTop: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_material.Grid, {
    container: true,
    spacing: 2
  }, /*#__PURE__*/_react["default"].createElement(_material.Grid, {
    item: true,
    xs: 6
  }, /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      position: "sticky",
      top: 20
    }
  }, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
    variant: "h4",
    gutterBottom: true,
    sx: {
      paddingBottom: 2
    }
  }, "File Uploaded: ", /*#__PURE__*/_react["default"].createElement("br", null), " ", documentName), /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
    variant: "subtitle1",
    gutterBottom: true,
    sx: {
      paddingBottom: 2
    }
  }, "You have ", fromColumnOptions != null && fromColumnOptions.length, " columns that can be created or mapped"), /*#__PURE__*/_react["default"].createElement(_material.Button, {
    variant: "outlined",
    sx: {
      marginRight: 2
    },
    onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            if (onCancel != null) {
              onCancel();
            }
          case 1:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }))
  }, "Cancel"), /*#__PURE__*/_react["default"].createElement(_material.Button, {
    variant: "contained",
    endIcon: /*#__PURE__*/_react["default"].createElement(_ArrowRightAltRounded["default"], null),
    sx: {
      marginRight: 2
    },
    onClick: function onClick() {
      setShowPreviewDialog(true);
    }
  }, "Next, Preview your mapping"))), /*#__PURE__*/_react["default"].createElement(_material.Grid, {
    item: true,
    xs: 5
  }, fromColumnOptions != null && fromColumnOptions.map(function (column) {
    return /*#__PURE__*/_react["default"].createElement(_system.Box, null, /*#__PURE__*/_react["default"].createElement(MappedColumn, {
      companyId: currentUser.companyId,
      documentId: documentId,
      documentType: documentType,
      documentMappingId: column.id,
      name: column.name,
      toName: column.toName,
      isMapped: column.toName == null || column.toName == "" ? true : false,
      toOptions: toColumnOptions,
      onResponse: function onResponse() {
        fetchMappingFrom();
        fetchMappingTo();
      }
    }));
  })))), /*#__PURE__*/_react["default"].createElement(_Dialog["default"], {
    open: showPreviewDialog,
    onClose: function onClose() {
      setShowPreviewDialog(false);
    },
    fullWidth: true,
    maxWidth: "xl",
    "aria-labelledby": "alert-dialog-title",
    "aria-describedby": "alert-dialog-description"
  }, /*#__PURE__*/_react["default"].createElement(_DialogTitle["default"], {
    id: "alert-dialog-title",
    sx: {
      fontSize: "25px",
      paddingTop: 4
    }
  }, "Preview your mapping"), /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      paddingLeft: 3
    }
  }, "Ensure that the data uploaded is accurately mapped and all (Required) fields are completed."), /*#__PURE__*/_react["default"].createElement(_IconButton["default"], {
    "aria-label": "close",
    onClick: function onClick() {
      setShowPreviewDialog(false);
    },
    sx: {
      position: 'absolute',
      right: 8,
      top: 8,
      color: function color(theme) {
        return theme.palette.grey[500];
      }
    }
  }, /*#__PURE__*/_react["default"].createElement(_Close["default"], null)), /*#__PURE__*/_react["default"].createElement(_DialogContent["default"], null, /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      paddingBottom: 1
    }
  }, /*#__PURE__*/_react["default"].createElement(ConditionBasedTool, {
    toColumnOptions: toColumnOptions,
    documentId: documentId,
    onConditionApplied: function onConditionApplied(currentQuery) {
      var incrementNum = urlTick + 1;
      setURLTick(incrementNum);
      setAdvanceQuery(currentQuery);

      // setSpreadSheetAddress("/DocumentMappingPreview/PreviewMappedData?companyId=" + currentUser.companyId + "&documentComponentId=" + documentComponentId + "&tick=" + incrementNum);
    }
  })), spreadSheetAddress != null && /*#__PURE__*/_react["default"].createElement(SpreadsheetViewer, {
    ref: spreadSheetRef,
    url: spreadSheetAddress,
    advanceQuery: advanceQuery,
    currentUser: currentUser,
    hideToolbar: true,
    loadedUser: true
  })), /*#__PURE__*/_react["default"].createElement(_DialogActions["default"], null, /*#__PURE__*/_react["default"].createElement(_material.Button, {
    onClick: function onClick() {
      setShowPreviewDialog(false);
    }
  }, "Cancel"), /*#__PURE__*/_react["default"].createElement(_material.Button, {
    variant: "contained",
    onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
      var publishedRows, response;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            if (setIsLoading != null) {
              setIsLoading(true);
            }
            publishedRows = spreadSheetRef.current.getRows();
            _context5.next = 4;
            return apiService().post("/DocumentMapping/Publish", {
              companyId: currentUser.companyId,
              documentId: documentId,
              publishedRows: publishedRows
            });
          case 4:
            response = _context5.sent;
            if (response != null && response.status == 200) {
              setShowPreviewDialog(false);
              if (onPublished != null) {
                onPublished();
              }
            } else {
              alert(JSON.stringify(response.data));
            }
            if (setIsLoading != null) {
              setIsLoading(false);
            }
          case 7:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }))
  }, "Publish"))));
}
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConditionBasedTool = ConditionBasedTool;
var _react = _interopRequireWildcard(require("react"));
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _system = require("@mui/system");
var _Accordion = _interopRequireDefault(require("@mui/material/Accordion"));
var _AccordionSummary = _interopRequireDefault(require("@mui/material/AccordionSummary"));
var _AccordionDetails = _interopRequireDefault(require("@mui/material/AccordionDetails"));
var _ExpandMore = _interopRequireDefault(require("@mui/icons-material/ExpandMore"));
var _reactQuerybuilder = require("react-querybuilder");
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
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; } // import { apiService, FileUploader} from 'authscape';
function ConditionBasedTool(_ref) {
  var toColumnOptions = _ref.toColumnOptions,
    documentId = _ref.documentId,
    onConditionApplied = _ref.onConditionApplied;
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    currentQuery = _useState2[0],
    setCurrentQuery = _useState2[1];

  // const fields = [
  //     { name: 'firstName', label: 'First Name' },
  //     { name: 'lastName', label: 'Last Name' }
  // ];

  (0, _react.useEffect)(function () {
    if (documentId != null) {
      var fetchData = /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var response;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return apiService().get("/DocumentMapping/GetRules?documentComponentId=" + documentId);
              case 2:
                response = _context.sent;
                if (response != null && response.status == 200) {
                  if (response.data != null && response.data != "") {
                    setCurrentQuery(response.data);
                  } else {
                    setCurrentQuery(null);
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
    }
  }, [documentId]);
  var getFields = function getFields() {
    var fields = [];
    for (var index = 0; index < toColumnOptions.length; index++) {
      var toColumn = toColumnOptions[index];
      if (toColumn.isMapped)
        // only show filters that are mapped
        {
          fields.push({
            name: toColumn.name,
            label: toColumn.visibleName
          });
        }
    }
    return fields;
  };
  var customOperators = [{
    name: 'contains',
    label: 'Contains'
  }, {
    name: 'notContains',
    label: 'Does not contain'
  }];
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_system.Box, null, /*#__PURE__*/_react["default"].createElement(_Accordion["default"], null, /*#__PURE__*/_react["default"].createElement(_AccordionSummary["default"], {
    expandIcon: /*#__PURE__*/_react["default"].createElement(_ExpandMore["default"], null),
    "aria-controls": "panel1-content",
    id: "panel1-header"
  }, "Advance filtering"), /*#__PURE__*/_react["default"].createElement(_AccordionDetails["default"], null, /*#__PURE__*/_react["default"].createElement(_reactQuerybuilder.QueryBuilder, {
    fields: getFields(),
    operators: customOperators,
    query: currentQuery,
    onQueryChange: setCurrentQuery
  }), /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    variant: "contained",
    sx: {
      marginTop: 1
    },
    onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var response;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return apiService().put("/DocumentMapping/ApplyFilterForViewer", {
              documentComponentId: documentId,
              rules: JSON.stringify(currentQuery)
            });
          case 2:
            response = _context2.sent;
            if (response != null && response.status == 200) {
              onConditionApplied(currentQuery);
            }
          case 4:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))
  }, "Apply Filter")))));
}
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Datasources = Datasources;
var _react = _interopRequireWildcard(require("react"));
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _system = require("@mui/system");
var _Dialog = _interopRequireDefault(require("@mui/material/Dialog"));
var _DialogActions = _interopRequireDefault(require("@mui/material/DialogActions"));
var _DialogContent = _interopRequireDefault(require("@mui/material/DialogContent"));
var _DialogContentText = _interopRequireDefault(require("@mui/material/DialogContentText"));
var _DialogTitle = _interopRequireDefault(require("@mui/material/DialogTitle"));
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
var _InputLabel = _interopRequireDefault(require("@mui/material/InputLabel"));
var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));
var _FormControl = _interopRequireDefault(require("@mui/material/FormControl"));
var _Select = _interopRequireDefault(require("@mui/material/Select"));
var _Radio = _interopRequireDefault(require("@mui/material/Radio"));
var _RadioGroup = _interopRequireDefault(require("@mui/material/RadioGroup"));
var _FormControlLabel = _interopRequireDefault(require("@mui/material/FormControlLabel"));
var _FormLabel = _interopRequireDefault(require("@mui/material/FormLabel"));
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
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; } // import {apiService, authService, StripeConnect, ReactDraft, EditableDatagrid, FileUploader} from 'authscape';
function Datasources(_ref) {
  var _ref$disableTraining = _ref.disableTraining,
    disableTraining = _ref$disableTraining === void 0 ? false : _ref$disableTraining;
  var documentColumns = [{
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: false
  }, {
    field: "type",
    type: "actions",
    width: 200,
    flex: 1,
    headerName: "Data Source",
    getActions: function getActions(_ref2) {
      var id = _ref2.id,
        row = _ref2.row;
      return [/*#__PURE__*/_react["default"].createElement(_system.Box, {
        sx: {
          textAlign: "left"
        }
      }, row.type == 0 ? "Database" : "", row.type == 1 ? "Dynamic Mapping" : "", row.type == 2 ? "Custom Model" : "")];
    }
  }, {
    field: "Detail",
    type: "actions",
    width: 200,
    flex: 1,
    headerName: "Mapping To",
    getActions: function getActions(_ref3) {
      var id = _ref3.id,
        row = _ref3.row;
      return [/*#__PURE__*/_react["default"].createElement(_system.Box, {
        sx: {
          textAlign: "left"
        }
      }, row.type == 0 ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, "Table: ", row.tableName) : "", row.type == 1 ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, "Database driven mapping") : "", row.type == 2 ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, "Type Name: ", row.typeName, /*#__PURE__*/_react["default"].createElement("br", null), " Assembly Fullname: ", row.assemblyFullName) : "")];
    }
  }
  // {
  //     field: "actions",
  //     type: "actions",
  //     width: 200,
  //     headerName: "Archive",
  //     cellClassName: "actions",
  //     getActions: ({ id, row }) => {
  //       return [
  //         <GridActionsCellItem key={id}
  //           icon={<DeleteRoundedIcon />}
  //           label="Archive"
  //           className="textPrimary"
  //           onClick={async () => {

  //             let documentMappingId = "";
  //             let documentComponentId = "";

  //             // archive the column
  //             await apiService().delete("/DocumentMapping/RemoveColumnFromDocumentComponent?documentMappingId=" + documentMappingId + "&documentComponentId=" + documentComponentId)

  //           }}
  //         />,
  //       ];
  //     },
  // }
  ];

  var refDatabaseTableSelect = (0, _react.useRef)(null);
  var refNewDocTypeName = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(0),
    _useState2 = _slicedToArray(_useState, 2),
    dataGridRefreshKey = _useState2[0],
    setDataGridRefreshKey = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    document = _useState4[0],
    setDocument = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    showDatasource = _useState6[0],
    setShowDatasource = _useState6[1];
  var _useState7 = (0, _react.useState)(null),
    _useState8 = _slicedToArray(_useState7, 2),
    databaseTables = _useState8[0],
    setDatabaseTables = _useState8[1];
  var _useState9 = (0, _react.useState)("database"),
    _useState10 = _slicedToArray(_useState9, 2),
    mappingType = _useState10[0],
    setMappingType = _useState10[1];
  var refTypeName = (0, _react.useRef)(null);
  var refAssemblyFullName = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    var fetchData = /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var response;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return apiService().get("/DocumentMapping/GetTablesFromDatabase");
            case 2:
              response = _context.sent;
              if (response != null && response.status == 200) {
                setDatabaseTables(response.data);
              }
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function fetchData() {
        return _ref4.apply(this, arguments);
      };
    }();
    fetchData();
  }, []);
  return /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      marginTop: 6
    }
  }, /*#__PURE__*/_react["default"].createElement(_system.Box, null, !disableTraining && /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      textAlign: "right",
      marginBottom: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    variant: "contained",
    onClick: function onClick() {
      setShowDatasource(true);
    }
  }, "Add Data Source")), /*#__PURE__*/_react["default"].createElement(EditableDatagrid, {
    key: dataGridRefreshKey,
    loadedUser: true,
    url: "/DocumentMapping/GetDocumentTypes",
    columns: documentColumns
  })), /*#__PURE__*/_react["default"].createElement(_Dialog["default"], {
    open: showDatasource,
    onClose: function onClose() {
      setShowDatasource(false);
    },
    "aria-labelledby": "alert-dialog-title",
    "aria-describedby": "alert-dialog-description"
  }, /*#__PURE__*/_react["default"].createElement(_DialogTitle["default"], {
    id: "alert-dialog-title"
  }, "Data Source"), /*#__PURE__*/_react["default"].createElement(_DialogContent["default"], null, /*#__PURE__*/_react["default"].createElement(_DialogContentText["default"], {
    id: "alert-dialog-description"
  }, "A data source is a place or system where data is stored and collected. It can be a database, file, web service, or sensor. Data is extracted, transformed, and used for analysis and other purposes. Managing data sources is crucial for data-driven decision-making."), /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      marginTop: 3
    }
  }, /*#__PURE__*/_react["default"].createElement(_TextField["default"], {
    inputRef: refNewDocTypeName,
    label: "Name for data source",
    variant: "outlined",
    fullWidth: true
  })), /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      marginTop: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_FormControl["default"], null, /*#__PURE__*/_react["default"].createElement(_FormLabel["default"], {
    id: "demo-row-radio-buttons-group-label"
  }, "How the data will connect:"), /*#__PURE__*/_react["default"].createElement(_RadioGroup["default"], {
    value: mappingType,
    row: true,
    "aria-labelledby": "demo-row-radio-buttons-group-label",
    name: "row-radio-buttons-group",
    onChange: function onChange(env) {
      setMappingType(env.currentTarget.value);
    }
  }, /*#__PURE__*/_react["default"].createElement(_FormControlLabel["default"], {
    value: "database",
    control: /*#__PURE__*/_react["default"].createElement(_Radio["default"], null),
    label: "Database"
  }), /*#__PURE__*/_react["default"].createElement(_FormControlLabel["default"], {
    value: "mappingTable",
    control: /*#__PURE__*/_react["default"].createElement(_Radio["default"], null),
    label: "Dynamic Mapping Table"
  }), /*#__PURE__*/_react["default"].createElement(_FormControlLabel["default"], {
    value: "customModelMapping",
    control: /*#__PURE__*/_react["default"].createElement(_Radio["default"], null),
    label: "Custom Model"
  })))), mappingType == "database" && /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      marginTop: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      minWidth: 120
    }
  }, /*#__PURE__*/_react["default"].createElement(_FormControl["default"], {
    fullWidth: true
  }, /*#__PURE__*/_react["default"].createElement(_InputLabel["default"], {
    id: "demo-simple-select-label"
  }, "Database Tables"), /*#__PURE__*/_react["default"].createElement(_Select["default"], {
    inputRef: refDatabaseTableSelect,
    labelId: "demo-simple-select-label",
    label: "Age"
  }, databaseTables != null && databaseTables.map(function (table, index) {
    return /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
      value: table.tableName
    }, table.tableName);
  }))))), mappingType == "customModelMapping" && /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      marginTop: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      minWidth: 120
    }
  }, /*#__PURE__*/_react["default"].createElement(_TextField["default"], {
    inputRef: refTypeName,
    label: "Type Name (Example: API.Controllers.InvoiceUpload)",
    variant: "outlined",
    fullWidth: true,
    sx: {
      marginTop: 1
    }
  }), /*#__PURE__*/_react["default"].createElement(_TextField["default"], {
    inputRef: refAssemblyFullName,
    label: "Assembly Full Name (Example: API)",
    variant: "outlined",
    fullWidth: true,
    sx: {
      marginTop: 1
    }
  })))), /*#__PURE__*/_react["default"].createElement(_DialogActions["default"], null, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    onClick: function onClick() {
      setShowDatasource(false);
    }
  }, "Cancel"), /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var response, _response;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            if (!(mappingType == "customModelMapping")) {
              _context2.next = 7;
              break;
            }
            _context2.next = 3;
            return apiService().post("/DocumentMapping/AddDataSource", {
              name: refNewDocTypeName.current.value,
              dataTable: refNewDocTypeName.current.value,
              documentType: 2,
              typeName: refTypeName.current.value,
              assemblyFullName: refAssemblyFullName.current.value
            });
          case 3:
            response = _context2.sent;
            if (response != null && response.data.error != null) {
              alert(response.data.error);
            } else {
              if (response != null && (response.status == 204 || response.status == 200)) {
                setDataGridRefreshKey(dataGridRefreshKey + 1);
                setShowDatasource(false);
              }
            }
            _context2.next = 11;
            break;
          case 7:
            _context2.next = 9;
            return apiService().post("/DocumentMapping/AddDataSource", {
              name: refNewDocTypeName.current.value,
              dataTable: refDatabaseTableSelect.current != null ? refDatabaseTableSelect.current.value : "",
              documentType: mappingType == "database" ? 0 : 1
            });
          case 9:
            _response = _context2.sent;
            if (_response != null && (_response.status == 204 || _response.status == 200)) {
              setDataGridRefreshKey(dataGridRefreshKey + 1);
              setShowDatasource(false);
            }
          case 11:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))
  }, "Add Data Source"))));
}
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileMapping = FileMapping;
var _react = _interopRequireWildcard(require("react"));
var _system = require("@mui/system");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
// import ManageMappingDocuments from './manageMappingDocuments';
// import AssignMapping from './AssignMapping';

function FileMapping(_ref) {
  var currentUser = _ref.currentUser,
    _ref$fileUploadName = _ref.fileUploadName,
    fileUploadName = _ref$fileUploadName === void 0 ? "Upload Document" : _ref$fileUploadName,
    _ref$hideDocumentMana = _ref.hideDocumentManager,
    hideDocumentManager = _ref$hideDocumentMana === void 0 ? false : _ref$hideDocumentMana,
    _ref$setIsLoading = _ref.setIsLoading,
    setIsLoading = _ref$setIsLoading === void 0 ? null : _ref$setIsLoading,
    _ref$documentTypeId = _ref.documentTypeId,
    documentTypeId = _ref$documentTypeId === void 0 ? null : _ref$documentTypeId,
    _ref$onOpened = _ref.onOpened,
    onOpened = _ref$onOpened === void 0 ? null : _ref$onOpened,
    _ref$onPublished = _ref.onPublished,
    _onPublished = _ref$onPublished === void 0 ? null : _ref$onPublished,
    _ref$onCanceled = _ref.onCanceled,
    onCanceled = _ref$onCanceled === void 0 ? null : _ref$onCanceled,
    _ref$onArchived = _ref.onArchived,
    onArchived = _ref$onArchived === void 0 ? null : _ref$onArchived;
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    documentComponentId = _useState2[0],
    setDocumentComponentId = _useState2[1];
  (0, _react.useEffect)(function () {
    if (documentComponentId != null) {
      if (onOpened != null) {
        onOpened(documentComponentId);
      }
    }
  }, [documentComponentId]);
  return /*#__PURE__*/_react["default"].createElement(_system.Box, null, documentComponentId == null && /*#__PURE__*/_react["default"].createElement(ManageMappingDocuments, {
    fileUploadName: fileUploadName,
    documentTypeId: documentTypeId,
    hideDocumentManager: hideDocumentManager,
    companyId: currentUser != null ? currentUser.companyId : null,
    onManageField: function onManageField(documentComponentId) {
      setDocumentComponentId(documentComponentId);
    },
    onArchive: function onArchive(documentComponentId) {
      //alert(documentComponentId);
      if (onArchived != null) {
        onArchived(documentComponentId);
      }
    }
  }), documentComponentId != null && /*#__PURE__*/_react["default"].createElement(AssignMapping, {
    currentUser: currentUser,
    setIsLoading: setIsLoading,
    documentComponentId: documentComponentId,
    onCancel: function onCancel() {
      setDocumentComponentId(null);
      if (onCanceled != null) {
        onCanceled(documentComponentId);
      }
    },
    onPublished: function onPublished() {
      setDocumentComponentId(null);
      if (_onPublished != null) {
        _onPublished(documentComponentId);
      }
    }
  }));
}
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManageMappingDocuments = ManageMappingDocuments;
var _react = _interopRequireWildcard(require("react"));
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _system = require("@mui/system");
var _Dialog = _interopRequireDefault(require("@mui/material/Dialog"));
var _DialogActions = _interopRequireDefault(require("@mui/material/DialogActions"));
var _DialogContent = _interopRequireDefault(require("@mui/material/DialogContent"));
var _DialogContentText = _interopRequireDefault(require("@mui/material/DialogContentText"));
var _DialogTitle = _interopRequireDefault(require("@mui/material/DialogTitle"));
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
var _InputLabel = _interopRequireDefault(require("@mui/material/InputLabel"));
var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));
var _FormControl = _interopRequireDefault(require("@mui/material/FormControl"));
var _Select = _interopRequireDefault(require("@mui/material/Select"));
var _xDataGrid = require("@mui/x-data-grid");
var _DeleteRounded = _interopRequireDefault(require("@mui/icons-material/DeleteRounded"));
var _ListRounded = _interopRequireDefault(require("@mui/icons-material/ListRounded"));
var _PublishRounded = _interopRequireDefault(require("@mui/icons-material/PublishRounded"));
var _Grid = _interopRequireDefault(require("@mui/material/Grid"));
var _DownloadRounded = _interopRequireDefault(require("@mui/icons-material/DownloadRounded"));
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
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; } // import {apiService, authService, StripeConnect, ReactDraft, EditableDatagrid, FileUploader} from 'authscape';
function ManageMappingDocuments(_ref) {
  var fileUploadName = _ref.fileUploadName,
    _ref$hideDocumentMana = _ref.hideDocumentManager,
    hideDocumentManager = _ref$hideDocumentMana === void 0 ? false : _ref$hideDocumentMana,
    _ref$documentTypeId = _ref.documentTypeId,
    documentTypeId = _ref$documentTypeId === void 0 ? null : _ref$documentTypeId,
    _ref$companyId = _ref.companyId,
    companyId = _ref$companyId === void 0 ? null : _ref$companyId,
    _ref$locationId = _ref.locationId,
    locationId = _ref$locationId === void 0 ? null : _ref$locationId,
    _ref$userId = _ref.userId,
    userId = _ref$userId === void 0 ? null : _ref$userId,
    _ref$onManageField = _ref.onManageField,
    onManageField = _ref$onManageField === void 0 ? null : _ref$onManageField,
    _ref$onArchive = _ref.onArchive,
    onArchive = _ref$onArchive === void 0 ? null : _ref$onArchive;
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    document = _useState2[0],
    setDocument = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    addColumnDialog = _useState4[0],
    setAddColumnDialog = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    showAddNewDocument = _useState6[0],
    setShowAddNewDocument = _useState6[1];
  var _useState7 = (0, _react.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    showTrainingDocument = _useState8[0],
    setShowTrainingDocument = _useState8[1];
  var _useState9 = (0, _react.useState)(''),
    _useState10 = _slicedToArray(_useState9, 2),
    columnName = _useState10[0],
    setColumnName = _useState10[1];
  var _useState11 = (0, _react.useState)(null),
    _useState12 = _slicedToArray(_useState11, 2),
    selectedAddedColumn = _useState12[0],
    setSelectedAddedColumn = _useState12[1];
  var _useState13 = (0, _react.useState)(null),
    _useState14 = _slicedToArray(_useState13, 2),
    documentMappingColumns = _useState14[0],
    setDocumentMappingColumns = _useState14[1];
  var _useState15 = (0, _react.useState)(null),
    _useState16 = _slicedToArray(_useState15, 2),
    toColumnOptions = _useState16[0],
    setToColumnOptions = _useState16[1];
  var _useState17 = (0, _react.useState)(null),
    _useState18 = _slicedToArray(_useState17, 2),
    removeDocument = _useState18[0],
    setRemoveDocument = _useState18[1];
  var _useState19 = (0, _react.useState)(null),
    _useState20 = _slicedToArray(_useState19, 2),
    selectedDocumentComponentId = _useState20[0],
    setSelectedDocumentComponentId = _useState20[1];
  var _useState21 = (0, _react.useState)(0),
    _useState22 = _slicedToArray(_useState21, 2),
    dataGridRefreshKey = _useState22[0],
    setDataGridRefreshKey = _useState22[1];
  var _useState23 = (0, _react.useState)(0),
    _useState24 = _slicedToArray(_useState23, 2),
    dataGridMappingRefreshKey = _useState24[0],
    setDataGridMappingRefreshKey = _useState24[1];
  var _useState25 = (0, _react.useState)(null),
    _useState26 = _slicedToArray(_useState25, 2),
    selectedDocument = _useState26[0],
    setSelectedDocument = _useState26[1];
  var _useState27 = (0, _react.useState)(0),
    _useState28 = _slicedToArray(_useState27, 2),
    status = _useState28[0],
    setStatus = _useState28[1];
  var _useState29 = (0, _react.useState)([]),
    _useState30 = _slicedToArray(_useState29, 2),
    componentTypes = _useState30[0],
    setComponentTypes = _useState30[1];
  var refHeaderRowInput = (0, _react.useRef)(null);
  var fileUploaderRef = (0, _react.useRef)(null);
  var refNewDocumentName = (0, _react.useRef)(null);
  var refSelectDocumentType = (0, _react.useRef)(null);
  var refNewColumnFileColumn = (0, _react.useRef)(null);
  var documentColumns = [{
    field: 'name',
    flex: 1,
    headerName: 'Document Name',
    width: 150,
    editable: false
  }, {
    field: 'documentTypeName',
    flex: 1,
    headerName: 'Document Type',
    width: 150,
    editable: false
  }, {
    field: "actions",
    type: "actions",
    width: 200,
    flex: 1,
    headerName: "",
    cellClassName: "actions",
    getActions: function getActions(_ref2) {
      var id = _ref2.id,
        row = _ref2.row;
      return [/*#__PURE__*/_react["default"].createElement(_Button["default"], {
        variant: "text",
        startIcon: /*#__PURE__*/_react["default"].createElement(_ListRounded["default"], null),
        onClick: function onClick() {
          if (onManageField != null) {
            onManageField(row.id);
          }
        }
      }, "Manage Fields"), /*#__PURE__*/_react["default"].createElement(_Button["default"], {
        variant: "text",
        startIcon: /*#__PURE__*/_react["default"].createElement(_DownloadRounded["default"], null),
        onClick: function onClick() {
          window.open("https://view.officeapps.live.com/op/view.aspx?src=" + row.fileUri + "&wdOrigin=BROWSELINK");
        }
      }, "Download File"), /*#__PURE__*/_react["default"].createElement(_Button["default"], {
        variant: "text",
        startIcon: /*#__PURE__*/_react["default"].createElement(_DeleteRounded["default"], null),
        onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var documentMappingId;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                documentMappingId = row.id;
                setRemoveDocument({
                  companyId: companyId,
                  documentMappingId: documentMappingId
                });
              case 2:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }))
      }, "Remove")];
    }
  }];
  (0, _react.useEffect)(function () {
    if (document != null) {
      var fetchData = /*#__PURE__*/function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          var response;
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return apiService().get("/DocumentMapping/GetMappingFieldsForDocument?documentId=" + document.id);
              case 2:
                response = _context3.sent;
                if (response != null) {
                  setToColumnOptions(response.data);
                  setDocumentMappingColumns([{
                    field: 'name',
                    flex: 1,
                    headerName: 'File Column',
                    width: 150,
                    editable: true
                  }, {
                    field: 'toName',
                    headerName: 'Upload To',
                    flex: 1,
                    width: 150,
                    editable: true,
                    type: 'singleSelect',
                    valueOptions: response.data
                  }, {
                    field: "actions",
                    type: "actions",
                    width: 200,
                    headerName: "Archive Fields",
                    cellClassName: "actions",
                    getActions: function getActions(_ref5) {
                      var id = _ref5.id,
                        row = _ref5.row;
                      return [/*#__PURE__*/_react["default"].createElement(_xDataGrid.GridActionsCellItem, {
                        key: id,
                        icon: /*#__PURE__*/_react["default"].createElement(_DeleteRounded["default"], null),
                        label: "Archive",
                        className: "textPrimary",
                        onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
                          var documentMappingId, documentComponentId, response;
                          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                            while (1) switch (_context2.prev = _context2.next) {
                              case 0:
                                documentMappingId = row.id;
                                documentComponentId = row.documentComponentId; // archive the column
                                _context2.next = 4;
                                return apiService()["delete"]("/DocumentMapping/RemoveColumnFromDocumentComponent?documentMappingId=" + documentMappingId + "&documentComponentId=" + documentComponentId);
                              case 4:
                                response = _context2.sent;
                                if (response != null && response.status == 200) {
                                  setDataGridMappingRefreshKey(dataGridMappingRefreshKey + 1);
                                }
                              case 6:
                              case "end":
                                return _context2.stop();
                            }
                          }, _callee2);
                        }))
                      })];
                    }
                  }]);
                }
              case 4:
              case "end":
                return _context3.stop();
            }
          }, _callee3);
        }));
        return function fetchData() {
          return _ref4.apply(this, arguments);
        };
      }();
      fetchData();
    }
  }, [document]);
  (0, _react.useEffect)(function () {
    if (showAddNewDocument && documentTypeId == null) {
      // get all document types
      var fetchData = /*#__PURE__*/function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
          var response;
          return _regeneratorRuntime().wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return apiService().post("/DocumentMapping/GetDocumentTypes");
              case 2:
                response = _context4.sent;
                if (response != null && response.status == 200) {
                  setComponentTypes(response.data.data);
                }
              case 4:
              case "end":
                return _context4.stop();
            }
          }, _callee4);
        }));
        return function fetchData() {
          return _ref7.apply(this, arguments);
        };
      }();
      fetchData();
    }
  }, [showAddNewDocument, documentTypeId]);
  var GetHeaderRowData = /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(documentComponentId) {
      var response;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return apiService().get("/DocumentMapping/GetHeaderRow?documentComponentId=" + documentComponentId);
          case 2:
            response = _context5.sent;
            if (response != null && response.status == 200) {
              refHeaderRowInput.current.value = response.data;
            }
          case 4:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }));
    return function GetHeaderRowData(_x2) {
      return _ref8.apply(this, arguments);
    };
  }();
  (0, _react.useEffect)(function () {
    if (status != null) {
      setDataGridRefreshKey(dataGridRefreshKey + 1);
    }
  }, [status]);
  return /*#__PURE__*/_react["default"].createElement(_system.Box, null, !hideDocumentManager && /*#__PURE__*/_react["default"].createElement(_system.Box, null, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    container: true,
    spacing: 2,
    sx: {
      paddingBottom: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    item: true,
    xs: 3
  }, /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      minWidth: 120
    }
  }, /*#__PURE__*/_react["default"].createElement(_FormControl["default"], {
    fullWidth: true
  }, /*#__PURE__*/_react["default"].createElement(_InputLabel["default"], {
    id: "demo-simple-select-label"
  }, "Status"), /*#__PURE__*/_react["default"].createElement(_Select["default"], {
    labelId: "demo-simple-select-label",
    id: "demo-simple-select",
    value: status,
    label: "Status",
    onChange: function onChange(event) {
      setStatus(event.target.value);
    }
  }, /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
    value: 0
  }, "Open"), /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
    value: 2
  }, "Published"), /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
    value: 1
  }, "Archived"))))), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    item: true,
    xs: 9
  }, /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      textAlign: "right",
      marginBottom: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    variant: "contained",
    onClick: function onClick() {
      setShowAddNewDocument(true);
    }
  }, fileUploadName)))), /*#__PURE__*/_react["default"].createElement(EditableDatagrid, {
    key: dataGridRefreshKey,
    loadedUser: true,
    params: {
      companyId: companyId,
      userId: userId,
      locationId: locationId,
      status: status
    },
    url: "/DocumentMapping/GetDocumentComponents",
    columns: documentColumns
  })), hideDocumentManager && /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    variant: "contained",
    onClick: function onClick() {
      setShowAddNewDocument(true);
    }
  }, fileUploadName), /*#__PURE__*/_react["default"].createElement(_Dialog["default"], {
    open: showAddNewDocument,
    onClose: function onClose() {
      setShowAddNewDocument(false);
    },
    fullWidth: true,
    "aria-labelledby": "alert-dialog-title",
    "aria-describedby": "alert-dialog-description"
  }, /*#__PURE__*/_react["default"].createElement(_DialogTitle["default"], {
    id: "alert-dialog-title"
  }, "Upload Document"), /*#__PURE__*/_react["default"].createElement(_DialogContent["default"], null, documentTypeId == null && /*#__PURE__*/_react["default"].createElement(_DialogContentText["default"], {
    id: "alert-dialog-description",
    sx: {
      paddingBottom: 2
    }
  }, "Please select the type of document, then click \"Choose a file\""), documentTypeId == null && /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      marginTop: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      minWidth: 120
    }
  }, /*#__PURE__*/_react["default"].createElement(_FormControl["default"], {
    fullWidth: true
  }, /*#__PURE__*/_react["default"].createElement(_InputLabel["default"], {
    id: "demo-simple-select-label"
  }, "Document Type"), /*#__PURE__*/_react["default"].createElement(_Select["default"], {
    labelId: "demo-simple-select-label",
    id: "demo-simple-select",
    inputRef: refSelectDocumentType,
    onChange: function onChange(val) {
      var _selectedDocument = componentTypes.find(function (s) {
        return s.id == val.target.value;
      });
      setSelectedDocument(_selectedDocument);
    },
    label: "DocumentType"
  }, componentTypes != null && componentTypes.map(function (componentType) {
    return /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
      value: componentType.id
    }, componentType.name);
  }))))), (selectedDocument != null || selectedDocument == null && documentTypeId != null) && /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      textAlign: "center",
      width: "100%",
      display: "flex",
      alignItems: "center",
      paddingTop: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(FileUploader, {
    refOveride: fileUploaderRef,
    params: {
      documentTypeId: documentTypeId == null ? selectedDocument.id : documentTypeId,
      companyId: companyId
    },
    url: "/DocumentMapping/SyncDocument",
    multiple: true,
    variant: "custom",
    onUploadCompleted: function onUploadCompleted(responses) {
      if (responses.length > 0) {
        var row = responses[0].data;
        if (onManageField != null) {
          onManageField(row.id);
        }
      }
      setShowAddNewDocument(false);
    }
  }, /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/_react["default"].createElement(_system.Box, {
    htmlFor: "file-upload",
    sx: {
      border: "2px dashed #aaa",
      padding: 20,
      textAlign: "center",
      cursor: "pointer"
    }
  }, 'Choose a file'))))), /*#__PURE__*/_react["default"].createElement(_DialogActions["default"], null, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    onClick: function onClick() {
      setShowAddNewDocument(false);
    }
  }, "Cancel"))), /*#__PURE__*/_react["default"].createElement(_Dialog["default"], {
    open: showTrainingDocument,
    onClose: function onClose() {
      setShowTrainingDocument(false);
    },
    fullWidth: true,
    "aria-labelledby": "alert-dialog-title",
    "aria-describedby": "alert-dialog-description"
  }, /*#__PURE__*/_react["default"].createElement(_DialogTitle["default"], {
    id: "alert-dialog-title"
  }, "Setup Mapping"), /*#__PURE__*/_react["default"].createElement(_DialogContent["default"], null, /*#__PURE__*/_react["default"].createElement(_DialogContentText["default"], {
    id: "alert-dialog-description"
  }, "If you'd like to submit a file, we can assist in configuring the fields to match the formatting of your document."), document != null && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(FileUploader, {
    refOveride: fileUploaderRef,
    url: "/DocumentMapping/TrainDocument",
    params: {
      documentComponentId: document.id,
      companyId: companyId,
      locationId: locationId,
      userId: userId
    },
    multiple: false,
    variant: "custom",
    onUploadCompleted: function onUploadCompleted() {
      setDataGridMappingRefreshKey(dataGridMappingRefreshKey + 1);

      // setUpdate(!update);
      // handleClose();
    }
  }, /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      marginTop: 2,
      borderRadius: 2,
      backgroundColor: "#f5f5f5",
      border: "1px solid lightgray",
      cursor: "pointer",
      padding: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    id: "FileUploader",
    "aria-controls": open ? 'demo-customized-menu' : undefined,
    "aria-haspopup": "true",
    "aria-expanded": open ? 'true' : undefined,
    variant: "text",
    disableElevation: true,
    startIcon: /*#__PURE__*/_react["default"].createElement(_PublishRounded["default"], null),
    sx: {
      marginLeft: 1
    }
  }, "Upload Sample File"))))), /*#__PURE__*/_react["default"].createElement(_DialogActions["default"], null, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    onClick: function onClick() {
      setShowTrainingDocument(false);
    }
  }, "No, thank you"))), /*#__PURE__*/_react["default"].createElement(_Dialog["default"], {
    open: addColumnDialog,
    onClose: function onClose() {
      setAddColumnDialog(false);
    },
    fullWidth: true,
    "aria-labelledby": "alert-dialog-title",
    "aria-describedby": "alert-dialog-description"
  }, /*#__PURE__*/_react["default"].createElement(_DialogTitle["default"], {
    id: "alert-dialog-title"
  }, "Add Column"), /*#__PURE__*/_react["default"].createElement(_DialogContent["default"], null, /*#__PURE__*/_react["default"].createElement(_DialogContentText["default"], {
    id: "alert-dialog-description"
  }, "Include a column for document mapping"), /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      marginTop: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_TextField["default"], {
    inputRef: refNewColumnFileColumn,
    id: "outlined-basic",
    label: "File Column",
    fullWidth: true,
    variant: "outlined"
  })), /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      marginTop: 4
    }
  }, /*#__PURE__*/_react["default"].createElement(_FormControl["default"], {
    fullWidth: true
  }, /*#__PURE__*/_react["default"].createElement(_InputLabel["default"], {
    id: "demo-simple-select-label"
  }, "Column Name"), /*#__PURE__*/_react["default"].createElement(_Select["default"], {
    labelId: "demo-simple-select-label",
    id: "demo-simple-select",
    value: selectedAddedColumn,
    label: "Column Name",
    onChange: function onChange(data) {
      setSelectedAddedColumn(data.target.value);
    }
  })))), /*#__PURE__*/_react["default"].createElement(_DialogActions["default"], null, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    onClick: function onClick() {
      setAddColumnDialog(false);
    }
  }, "Cancel"), /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
      var response;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return apiService().post("/DocumentMapping/AddNewField", {
              tableName: document.name,
              fieldName: refNewColumnFileColumn.current.value,
              fileColumn: selectedAddedColumn,
              companyId: companyId,
              locationId: locationId,
              userId: userId
            });
          case 2:
            response = _context6.sent;
            if (response != null && response.status == 200) {
              setDataGridMappingRefreshKey(dataGridMappingRefreshKey + 1);
              setAddColumnDialog(false);
            }
          case 4:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    })),
    autoFocus: true
  }, "Add Column"))), /*#__PURE__*/_react["default"].createElement(_Dialog["default"], {
    open: removeDocument != null ? true : false,
    onClose: function onClose() {
      setRemoveDocument(null);
    },
    fullWidth: true,
    "aria-labelledby": "alert-dialog-title",
    "aria-describedby": "alert-dialog-description"
  }, /*#__PURE__*/_react["default"].createElement(_DialogTitle["default"], {
    id: "alert-dialog-title"
  }, "Remove the document"), /*#__PURE__*/_react["default"].createElement(_DialogContent["default"], null, /*#__PURE__*/_react["default"].createElement(_DialogContentText["default"], {
    id: "alert-dialog-description"
  }, "Are you sure you want to remove this document?")), /*#__PURE__*/_react["default"].createElement(_DialogActions["default"], null, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    onClick: function onClick() {
      setRemoveDocument(null);
    }
  }, "Cancel"), /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
      var response;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            response = null;
            if (!(companyId != null)) {
              _context7.next = 7;
              break;
            }
            _context7.next = 4;
            return apiService()["delete"]("/DocumentMapping/RemoveDocument?companyId=" + removeDocument.companyId + "&documentId=" + removeDocument.documentMappingId);
          case 4:
            response = _context7.sent;
            _context7.next = 10;
            break;
          case 7:
            _context7.next = 9;
            return apiService()["delete"]("/DocumentMapping/RemoveDocument?documentId=" + removeDocument.documentMappingId);
          case 9:
            response = _context7.sent;
          case 10:
            if (response != null && response.status == 200) {
              setDataGridRefreshKey(dataGridRefreshKey + 1);
              setRemoveDocument(null);
              if (onArchive != null) {
                onArchive(removeDocument.documentMappingId);
              }
            }
          case 11:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    }))
  }, "Remove Document"))));
}
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MappedColumn = MappedColumn;
var _react = _interopRequireWildcard(require("react"));
var _Card = _interopRequireDefault(require("@mui/material/Card"));
var _CardActions = _interopRequireDefault(require("@mui/material/CardActions"));
var _CardContent = _interopRequireDefault(require("@mui/material/CardContent"));
var _system = require("@mui/system");
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
var _Link = _interopRequireDefault(require("@mui/icons-material/Link"));
var _LinkOff = _interopRequireDefault(require("@mui/icons-material/LinkOff"));
var _Stack = _interopRequireDefault(require("@mui/material/Stack"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; } // import NewMappingColumn from './newMappingColumn';
// import MatchExistingMappedColumn from './matchExisting';
// import { apiService } from 'authscape';

function MappedColumn(_ref) {
  var companyId = _ref.companyId,
    documentId = _ref.documentId,
    documentType = _ref.documentType,
    documentMappingId = _ref.documentMappingId,
    name = _ref.name,
    toName = _ref.toName,
    isMapped = _ref.isMapped,
    toOptions = _ref.toOptions,
    onResponse = _ref.onResponse;
  var notMatchedColor = "#ffe5e5";
  var matchedColor = "#fff";
  return /*#__PURE__*/_react["default"].createElement(_Card["default"], {
    sx: {
      marginTop: 1
    }
  }, /*#__PURE__*/_react["default"].createElement(_CardContent["default"], {
    sx: {
      position: "relative",
      backgroundColor: isMapped ? notMatchedColor : matchedColor
    }
  }, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
    gutterBottom: true,
    variant: "h5",
    component: "div"
  }, name), /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      position: "absolute",
      top: "10px",
      right: "10px"
    }
  }, isMapped ? /*#__PURE__*/_react["default"].createElement(_Stack["default"], {
    direction: "row",
    spacing: 1
  }, /*#__PURE__*/_react["default"].createElement(_LinkOff["default"], null), /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
    variant: "body2",
    sx: {
      paddingTop: 0.5
    }
  }, "Not Matched")) : /*#__PURE__*/_react["default"].createElement(_Stack["default"], {
    direction: "row",
    spacing: 1
  }, /*#__PURE__*/_react["default"].createElement(_Link["default"], null), /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
    variant: "body2",
    sx: {
      paddingTop: 0.5
    }
  }, "Matched"))), /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
    variant: "body2",
    color: "text.secondary"
  }, !isMapped && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, "This column is matched with ", toName), isMapped && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, "This column is not matched. If not matched it will not import"))), /*#__PURE__*/_react["default"].createElement(_CardActions["default"], {
    sx: {
      backgroundColor: isMapped ? notMatchedColor : matchedColor
    }
  }, !isMapped ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    startIcon: /*#__PURE__*/_react["default"].createElement(_LinkOff["default"], null),
    size: "small",
    sx: {
      paddingLeft: 3
    },
    onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var response;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return apiService()["delete"]("/DocumentMapping/RemoveMatch?companyId=" + companyId + "&documentId=" + documentId + "&documentMappingId=" + documentMappingId);
          case 2:
            response = _context.sent;
            if (response != null && response.status == 200) {
              onResponse();
            }
          case 4:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))
  }, "Remove Match")) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(MatchExistingMappedColumn, {
    companyId: companyId,
    documentId: documentId,
    documentMappingId: documentMappingId,
    fromName: name,
    toOptions: toOptions,
    onResponse: onResponse
  }), /*#__PURE__*/_react["default"].createElement(NewMappingColumn, {
    name: name,
    companyId: companyId,
    documentType: documentType,
    documentId: documentId,
    documentMappingId: documentMappingId,
    onResponse: onResponse
  }))));
}
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MatchExistingMappedColumn = MatchExistingMappedColumn;
var _react = _interopRequireWildcard(require("react"));
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _system = require("@mui/system");
var _LinkRounded = _interopRequireDefault(require("@mui/icons-material/LinkRounded"));
var _Dialog = _interopRequireDefault(require("@mui/material/Dialog"));
var _DialogActions = _interopRequireDefault(require("@mui/material/DialogActions"));
var _DialogContent = _interopRequireDefault(require("@mui/material/DialogContent"));
var _DialogContentText = _interopRequireDefault(require("@mui/material/DialogContentText"));
var _DialogTitle = _interopRequireDefault(require("@mui/material/DialogTitle"));
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
var _InputLabel = _interopRequireDefault(require("@mui/material/InputLabel"));
var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));
var _FormControl = _interopRequireDefault(require("@mui/material/FormControl"));
var _Select = _interopRequireDefault(require("@mui/material/Select"));
var _Checkbox = _interopRequireDefault(require("@mui/material/Checkbox"));
var _FormControlLabel = _interopRequireDefault(require("@mui/material/FormControlLabel"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; } // import {apiService, authService, StripeConnect, ReactDraft, EditableDatagrid, FileUploader} from 'authscape';
function MatchExistingMappedColumn(_ref) {
  var companyId = _ref.companyId,
    documentId = _ref.documentId,
    documentMappingId = _ref.documentMappingId,
    fromName = _ref.fromName,
    toOptions = _ref.toOptions,
    onResponse = _ref.onResponse;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    createNewOpen = _useState2[0],
    setCreateNewOpen = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    onlyAddRowIfFound = _useState4[0],
    setOnlyAddRowIfFound = _useState4[1];
  var _useState5 = (0, _react.useState)(true),
    _useState6 = _slicedToArray(_useState5, 2),
    rememberForNextTime = _useState6[0],
    setRememberForNextTime = _useState6[1];
  var _useState7 = (0, _react.useState)(null),
    _useState8 = _slicedToArray(_useState7, 2),
    selectedToColumn = _useState8[0],
    setSelectedToColumn = _useState8[1];
  var handleClose = function handleClose() {
    setCreateNewOpen(false);
  };
  var checkboxRememberLabel = {
    inputProps: {
      'aria-label': 'Checkbox Remember'
    }
  };
  var SelectedExistingColumns = function SelectedExistingColumns(_ref2) {
    var toOptions = _ref2.toOptions;
    return /*#__PURE__*/_react["default"].createElement(_system.Box, {
      sx: {
        minWidth: 120
      }
    }, /*#__PURE__*/_react["default"].createElement(_FormControl["default"], {
      fullWidth: true
    }, /*#__PURE__*/_react["default"].createElement(_InputLabel["default"], {
      id: "demo-simple-select-label"
    }, "Match to column"), /*#__PURE__*/_react["default"].createElement(_Select["default"], {
      labelId: "demo-simple-select-label",
      id: "demo-simple-select",
      value: selectedToColumn,
      label: "Age",
      onChange: function onChange(event) {
        setSelectedToColumn(event.target.value);
      }
    }, toOptions != null && toOptions.map(function (toOption) {
      var isRequiredMessage = "";
      if (toOption.isRequired) {
        isRequiredMessage = " (Required)";
      }
      return /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
        value: toOption.name
      }, toOption.visibleName, " ", isRequiredMessage);
    }))));
  };
  return /*#__PURE__*/_react["default"].createElement(_system.Box, null, /*#__PURE__*/_react["default"].createElement(_Dialog["default"], {
    open: createNewOpen,
    onClose: handleClose,
    fullWidth: true,
    "aria-labelledby": "alert-dialog-title",
    "aria-describedby": "alert-dialog-description"
  }, /*#__PURE__*/_react["default"].createElement(_DialogTitle["default"], {
    id: "alert-dialog-title"
  }, "Match existing column"), /*#__PURE__*/_react["default"].createElement(_DialogContent["default"], null, /*#__PURE__*/_react["default"].createElement(_DialogContentText["default"], {
    id: "alert-dialog-description"
  }, "***Inform the user about what it means to match existing columns***"), /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      paddingTop: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_TextField["default"], {
    id: "outlined-basic",
    label: "File Column Name",
    defaultValue: fromName,
    variant: "outlined",
    disabled: true,
    fullWidth: true
  })), /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      paddingTop: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(SelectedExistingColumns, {
    toOptions: toOptions
  })), /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      paddingTop: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_FormControlLabel["default"], {
    value: "end",
    control: /*#__PURE__*/_react["default"].createElement(_Checkbox["default"], _extends({}, checkboxRememberLabel, {
      defaultChecked: true,
      onChange: function onChange(event) {
        setRememberForNextTime(event.target.checked);
      }
    })),
    label: "Remember match for next time",
    labelPlacement: "end"
  }))), /*#__PURE__*/_react["default"].createElement(_DialogActions["default"], null, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    onClick: handleClose
  }, "Cancel"), /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var response;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return apiService().put("/DocumentMapping/AssignMapping", {
              companyId: companyId,
              documentId: documentId,
              fileColumnName: fromName,
              documentMappingId: documentMappingId,
              matchedColumn: selectedToColumn,
              onlyAddRowIfColumnFound: onlyAddRowIfFound,
              rememberForNextTime: rememberForNextTime
            });
          case 2:
            response = _context.sent;
            if (response != null && response.status == 200) {
              onResponse();
              handleClose();
            }
          case 4:
          case "end":
            return _context.stop();
        }
      }, _callee);
    })),
    autoFocus: true
  }, "Match Existing"))), /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    startIcon: /*#__PURE__*/_react["default"].createElement(_LinkRounded["default"], null),
    size: "small",
    sx: {
      paddingLeft: 3
    },
    onClick: function onClick() {
      setCreateNewOpen(true);
    }
  }, "Match Existing"));
}
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewMappingColumn = NewMappingColumn;
var _react = _interopRequireWildcard(require("react"));
var _Card = _interopRequireDefault(require("@mui/material/Card"));
var _CardContent = _interopRequireDefault(require("@mui/material/CardContent"));
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _system = require("@mui/system");
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
var _AddRounded = _interopRequireDefault(require("@mui/icons-material/AddRounded"));
var _LinkRounded = _interopRequireDefault(require("@mui/icons-material/LinkRounded"));
var _Dialog = _interopRequireDefault(require("@mui/material/Dialog"));
var _DialogActions = _interopRequireDefault(require("@mui/material/DialogActions"));
var _DialogContent = _interopRequireDefault(require("@mui/material/DialogContent"));
var _DialogContentText = _interopRequireDefault(require("@mui/material/DialogContentText"));
var _DialogTitle = _interopRequireDefault(require("@mui/material/DialogTitle"));
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
var _Grid = _interopRequireDefault(require("@mui/material/Grid"));
var _LocalParkingRounded = _interopRequireDefault(require("@mui/icons-material/LocalParkingRounded"));
var _TextFieldsRounded = _interopRequireDefault(require("@mui/icons-material/TextFieldsRounded"));
var _IntegrationInstructionsRounded = _interopRequireDefault(require("@mui/icons-material/IntegrationInstructionsRounded"));
var _ListAltRounded = _interopRequireDefault(require("@mui/icons-material/ListAltRounded"));
var _CalendarMonthRounded = _interopRequireDefault(require("@mui/icons-material/CalendarMonthRounded"));
var _CheckBoxRounded = _interopRequireDefault(require("@mui/icons-material/CheckBoxRounded"));
var _InsertPhotoRounded = _interopRequireDefault(require("@mui/icons-material/InsertPhotoRounded"));
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
// import { apiService } from 'authscape';

function NewMappingColumn(_ref) {
  var name = _ref.name,
    companyId = _ref.companyId,
    documentType = _ref.documentType,
    documentId = _ref.documentId,
    documentMappingId = _ref.documentMappingId,
    onResponse = _ref.onResponse;
  var newColumnNameRef = (0, _react.useRef)(null);
  var newColumnDescriptionRef = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    createNewOpen = _useState2[0],
    setCreateNewOpen = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    selectedAttributeId = _useState4[0],
    setSelectedAttributeId = _useState4[1];
  var handleClose = function handleClose() {
    setCreateNewOpen(false);
  };
  var AttributeTypeComponent = function AttributeTypeComponent(_ref2) {
    var id = _ref2.id,
      icon = _ref2.icon,
      text = _ref2.text;
    return /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
      item: true,
      xs: 3
    }, /*#__PURE__*/_react["default"].createElement(_Card["default"], {
      sx: {
        textAlign: "center",
        cursor: "pointer",
        backgroundColor: selectedAttributeId == id ? "#e5e5e5" : "none"
      },
      onClick: function onClick() {
        setSelectedAttributeId(id);
      }
    }, /*#__PURE__*/_react["default"].createElement(_CardContent["default"], null, icon, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
      variant: "body2",
      color: "text.secondary",
      sx: {
        paddingTop: 1
      }
    }, text))));
  };
  return /*#__PURE__*/_react["default"].createElement(_system.Box, null, /*#__PURE__*/_react["default"].createElement(_Dialog["default"], {
    open: createNewOpen,
    onClose: handleClose,
    fullWidth: true,
    "aria-labelledby": "alert-dialog-title",
    "aria-describedby": "alert-dialog-description"
  }, /*#__PURE__*/_react["default"].createElement(_DialogTitle["default"], {
    id: "alert-dialog-title"
  }, "Match to new column"), /*#__PURE__*/_react["default"].createElement(_DialogContent["default"], null, /*#__PURE__*/_react["default"].createElement(_DialogContentText["default"], {
    id: "alert-dialog-description"
  }, "inform the user about adding a new columna and what that means here..."), /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      paddingTop: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_TextField["default"], {
    inputRef: newColumnNameRef,
    defaultValue: name,
    id: "outlined-basic",
    label: "Name",
    variant: "outlined",
    fullWidth: true
  })), /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      paddingTop: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_TextField["default"], {
    inputRef: newColumnDescriptionRef,
    id: "outlined-basic",
    label: "Description (optional)",
    variant: "outlined",
    fullWidth: true
  })), /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      paddingTop: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_system.Box, null, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
    variant: "body1",
    gutterBottom: true
  }, "Select how this column will be formatted")), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    container: true,
    spacing: 2,
    sx: {
      paddingTop: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(AttributeTypeComponent, {
    id: 0,
    icon: /*#__PURE__*/_react["default"].createElement(_TextFieldsRounded["default"], null),
    text: "text"
  }), /*#__PURE__*/_react["default"].createElement(AttributeTypeComponent, {
    id: 1,
    icon: /*#__PURE__*/_react["default"].createElement(_LocalParkingRounded["default"], null),
    text: "Paragraph"
  }), /*#__PURE__*/_react["default"].createElement(AttributeTypeComponent, {
    id: 2,
    icon: /*#__PURE__*/_react["default"].createElement(_IntegrationInstructionsRounded["default"], null),
    text: "HTML"
  }), /*#__PURE__*/_react["default"].createElement(AttributeTypeComponent, {
    id: 3,
    icon: /*#__PURE__*/_react["default"].createElement(_system.Box, null, 123),
    text: "Integer"
  }), /*#__PURE__*/_react["default"].createElement(AttributeTypeComponent, {
    id: 4,
    icon: /*#__PURE__*/_react["default"].createElement(_system.Box, null, 10.23),
    text: "Decimal"
  }), /*#__PURE__*/_react["default"].createElement(AttributeTypeComponent, {
    id: 5,
    icon: /*#__PURE__*/_react["default"].createElement(_ListAltRounded["default"], null),
    text: "Dropdown"
  }), /*#__PURE__*/_react["default"].createElement(AttributeTypeComponent, {
    id: 6,
    icon: /*#__PURE__*/_react["default"].createElement(_CalendarMonthRounded["default"], null),
    text: "Date"
  }), /*#__PURE__*/_react["default"].createElement(AttributeTypeComponent, {
    id: 7,
    icon: /*#__PURE__*/_react["default"].createElement(_LinkRounded["default"], null),
    text: "URL"
  }), /*#__PURE__*/_react["default"].createElement(AttributeTypeComponent, {
    id: 8,
    icon: /*#__PURE__*/_react["default"].createElement(_CheckBoxRounded["default"], null),
    text: "Boolean"
  }), /*#__PURE__*/_react["default"].createElement(AttributeTypeComponent, {
    id: 9,
    icon: /*#__PURE__*/_react["default"].createElement(_InsertPhotoRounded["default"], null),
    text: "Photo"
  })))), /*#__PURE__*/_react["default"].createElement(_DialogActions["default"], null, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    onClick: handleClose
  }, "Cancel"), /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var response;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return apiService().post("/DocumentMapping/AddNewColumnAndMapping", {
              companyId: companyId,
              documentId: documentId,
              documentMappingId: documentMappingId,
              newColumn: newColumnNameRef.current.value,
              description: newColumnDescriptionRef.current.value,
              attributeFieldType: selectedAttributeId
            });
          case 2:
            response = _context.sent;
            if (response != null && response.status == 200) {
              handleClose();
              onResponse();
            }
          case 4:
          case "end":
            return _context.stop();
        }
      }, _callee);
    })),
    autoFocus: true
  }, "Create"))), documentType != null && documentType == 1 && /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    startIcon: /*#__PURE__*/_react["default"].createElement(_AddRounded["default"], null),
    size: "small",
    sx: {
      paddingLeft: 3
    },
    onClick: function onClick() {
      setCreateNewOpen(true);
    }
  }, "Create New Column"));
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SortableColumn = SortableColumn;
var _react = _interopRequireDefault(require("react"));
var _sortable = require("@dnd-kit/sortable");
var _utilities = require("@dnd-kit/utilities");
var _material = require("@mui/material");
var _Menu = _interopRequireDefault(require("@mui/icons-material/Menu"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function SortableColumn(props) {
  var _useSortable = (0, _sortable.useSortable)({
      id: props.id
    }),
    attributes = _useSortable.attributes,
    listeners = _useSortable.listeners,
    setNodeRef = _useSortable.setNodeRef,
    transform = _useSortable.transform,
    transition = _useSortable.transition;
  var style = {
    transform: _utilities.CSS.Transform.toString(transform),
    transition: transition
  };
  return /*#__PURE__*/_react["default"].createElement("div", _extends({
    ref: setNodeRef,
    style: style
  }, attributes, listeners), /*#__PURE__*/_react["default"].createElement(_material.ListItem, {
    disablePadding: true
  }, /*#__PURE__*/_react["default"].createElement(_material.ListItemButton, null, /*#__PURE__*/_react["default"].createElement(_material.ListItemIcon, null, /*#__PURE__*/_react["default"].createElement(_Menu["default"], null)), /*#__PURE__*/_react["default"].createElement(_material.ListItemText, {
    primary: props.id
  }))));
}
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploadMappedFile = UploadMappedFile;
var _react = _interopRequireWildcard(require("react"));
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _system = require("@mui/system");
var _PublishRounded = _interopRequireDefault(require("@mui/icons-material/PublishRounded"));
var _Menu = _interopRequireDefault(require("@mui/material/Menu"));
var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));
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
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; } // import { apiService, FileUploader} from 'authscape';
function UploadMappedFile(_ref) {
  var loadedUser = _ref.loadedUser,
    _ref$url = _ref.url,
    url = _ref$url === void 0 ? null : _ref$url,
    _ref$companyId = _ref.companyId,
    companyId = _ref$companyId === void 0 ? null : _ref$companyId,
    _ref$locationId = _ref.locationId,
    locationId = _ref$locationId === void 0 ? null : _ref$locationId,
    _ref$userId = _ref.userId,
    userId = _ref$userId === void 0 ? null : _ref$userId;
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    documentComponentOptions = _useState2[0],
    setDocumentComponentOptions = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    selectedDocumentComponentId = _useState4[0],
    setSelectedDocumentComponentId = _useState4[1];
  var _useState5 = (0, _react.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    anchorEl = _useState6[0],
    setAnchorEl = _useState6[1];
  var open = Boolean(anchorEl);
  var handleClose = function handleClose() {
    setAnchorEl(null);
  };
  var fileUploaderRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    if (selectedDocumentComponentId != null) {
      // trigger the file uploader, make sure param is filled in
      fileUploaderRef.current.click();
    }
  }, [selectedDocumentComponentId]);
  (0, _react.useEffect)(function () {
    if (loadedUser) {
      var fetchData = /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var _params, response;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _params = {};
                if (companyId != null) {
                  _params.companyId = companyId;
                }
                if (userId != null) {
                  _params.userId = userId;
                }
                if (locationId != null) {
                  _params.locationId = locationId;
                }
                _context.next = 6;
                return apiService().post("/DocumentMapping/GetDocumentComponents", _params);
              case 6:
                response = _context.sent;
                if (response != null && response.status == 200) {
                  setDocumentComponentOptions(response.data.data);
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
    }
  }, [loadedUser]);
  return /*#__PURE__*/_react["default"].createElement(_system.Box, null, /*#__PURE__*/_react["default"].createElement(FileUploader, {
    refOveride: fileUploaderRef,
    params: {
      documentComponentId: selectedDocumentComponentId,
      companyId: companyId,
      locationId: locationId,
      userId: userId
    },
    url: url,
    multiple: false,
    variant: "custom",
    onUploadCompleted: function onUploadCompleted() {
      setSelectedDocumentComponentId(null); // we need an onUploadCancelled
    }
  }), /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    id: "demo-positioned-button",
    "aria-controls": open ? 'demo-positioned-menu' : undefined,
    "aria-haspopup": "true",
    "aria-expanded": open ? 'true' : undefined,
    startIcon: /*#__PURE__*/_react["default"].createElement(_PublishRounded["default"], null),
    sx: {
      marginLeft: 1
    },
    onClick: function onClick(event) {
      setAnchorEl(event.currentTarget);
    }
  }, "Upload File(s)"), /*#__PURE__*/_react["default"].createElement(_Menu["default"], {
    id: "basic-menu",
    anchorEl: anchorEl,
    open: open,
    onClose: handleClose,
    MenuListProps: {
      'aria-labelledby': 'basic-button'
    }
  }, documentComponentOptions != null && documentComponentOptions.map(function (documentComponent) {
    return /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
      onClick: function onClick() {
        // assigns the param document component id
        setSelectedDocumentComponentId(documentComponent.id);

        // close the menu
        handleClose();
      }
    }, documentComponent.name + " (" + documentComponent.documentTypeName + ")");
  })));
}
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NextImage = void 0;
var _react = _interopRequireWildcard(require("react"));
var _image = _interopRequireDefault(require("next/image"));
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
var NextImage = function NextImage(_ref) {
  var src = _ref.src,
    alt = _ref.alt,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? 200 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 200 : _ref$height,
    _ref$objectFit = _ref.objectFit,
    objectFit = _ref$objectFit === void 0 ? "contain" : _ref$objectFit,
    _ref$enableAuth = _ref.enableAuth,
    enableAuth = _ref$enableAuth === void 0 ? false : _ref$enableAuth;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    imageError = _useState2[0],
    setImageError = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    imageSrc = _useState4[0],
    setImageSrc = _useState4[1];
  (0, _react.useEffect)(function () {
    if (enableAuth) {
      var fetchData = /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return apiService().DownloadFile(src, "", function (data) {
                  setImageSrc(data);
                }, true);
              case 2:
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
    }
  }, [enableAuth]);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, enableAuth && imageSrc != null && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_image["default"], {
    src: imageError ? process.env.fallbackImageSrc : imageSrc,
    alt: alt,
    width: width,
    height: height,
    style: {
      objectFit: objectFit
    },
    onError: function onError() {
      return setImageError(true);
    }
  })), !enableAuth && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_image["default"], {
    src: imageError ? process.env.fallbackImageSrc : src,
    alt: alt,
    width: width,
    height: height,
    style: {
      objectFit: objectFit
    },
    onError: function onError() {
      return setImageError(true);
    }
  })));
};
exports.NextImage = NextImage;
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageToPDF = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Box = _interopRequireDefault(require("@mui/material/Box"));
var _html2canvas = _interopRequireDefault(require("html2canvas"));
var _jspdf = require("jspdf");
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _DownloadRounded = _interopRequireDefault(require("@mui/icons-material/DownloadRounded"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var PageToPDF = function PageToPDF(_ref) {
  var _ref$buttonText = _ref.buttonText,
    buttonText = _ref$buttonText === void 0 ? "Download" : _ref$buttonText,
    _ref$startIcon = _ref.startIcon,
    startIcon = _ref$startIcon === void 0 ? /*#__PURE__*/_react["default"].createElement(_DownloadRounded["default"], null) : _ref$startIcon,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? "contained" : _ref$variant,
    elementById = _ref.elementById,
    _ref$scale = _ref.scale,
    scale = _ref$scale === void 0 ? 2 : _ref$scale,
    _ref$showHideClassEle = _ref.showHideClassElements,
    showHideClassElements = _ref$showHideClassEle === void 0 ? [] : _ref$showHideClassEle,
    _ref$fileName = _ref.fileName,
    fileName = _ref$fileName === void 0 ? "download" : _ref$fileName;
  var onHideElements = function onHideElements() {
    for (var index = 0; index < showHideClassElements.length; index++) {
      var element = showHideClassElements[index];
      var elements = document.getElementsByClassName(element);
      for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
      }
    }
  };
  var onShowElements = function onShowElements() {
    for (var index = 0; index < showHideClassElements.length; index++) {
      var element = showHideClassElements[index];
      var elements = document.getElementsByClassName(element);
      for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "block";
      }
    }
  };
  var printElement = function printElement() {
    onHideElements();
    var input = document.getElementById(elementById);
    (0, _html2canvas["default"])(input, {
      backgroundColor: null,
      scale: scale
    }).then(function (canvas) {
      var imgData = canvas.toDataURL("image/png", 1.0);
      var pdf = new _jspdf.jsPDF();
      var pdfWidth = pdf.internal.pageSize.getWidth();
      var pdfHeight = pdf.internal.pageSize.getHeight();
      var imgWidth = canvas.width;
      var imgHeight = canvas.height;
      var scaleFactor = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      var scaledWidth = imgWidth * scaleFactor;
      var scaledHeight = imgHeight * scaleFactor;
      var x = (pdfWidth - scaledWidth) / 2;
      var y = 0; // Set y coordinate to 0 to align to the top
      pdf.addImage(imgData, "PNG", x, y, scaledWidth, scaledHeight);
      pdf.save(fileName + ".pdf");
    });
    onShowElements();
  };
  return /*#__PURE__*/_react["default"].createElement(_Box["default"], null, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    startIcon: startIcon,
    variant: variant,
    onClick: function onClick() {
      printElement();
    }
  }, buttonText));
};
exports.PageToPDF = PageToPDF;
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pricing = Pricing;
var _react = _interopRequireDefault(require("react"));
var _system = require("@mui/system");
var _Grid = _interopRequireDefault(require("@mui/material/Grid"));
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
var _ChevronRightRounded = _interopRequireDefault(require("@mui/icons-material/ChevronRightRounded"));
var _InputLabel = _interopRequireDefault(require("@mui/material/InputLabel"));
var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));
var _FormControl = _interopRequireDefault(require("@mui/material/FormControl"));
var _Select = _interopRequireDefault(require("@mui/material/Select"));
var _reactHookForm = require("react-hook-form");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function Pricing(_ref) {
  var _ref$title = _ref.title,
    title = _ref$title === void 0 ? null : _ref$title,
    _ref$tiers = _ref.tiers,
    tiers = _ref$tiers === void 0 ? [] : _ref$tiers,
    _ref$features = _ref.features,
    features = _ref$features === void 0 ? null : _ref$features,
    _ref$onButtonClicked = _ref.onButtonClicked,
    onButtonClicked = _ref$onButtonClicked === void 0 ? null : _ref$onButtonClicked;
  var _useForm = (0, _reactHookForm.useForm)(),
    control = _useForm.control,
    register = _useForm.register,
    handleSubmit = _useForm.handleSubmit,
    errors = _useForm.formState.errors,
    watch = _useForm.watch,
    setValue = _useForm.setValue;
  var calculateQty = function calculateQty(qty) {
    var newMax = qty.minQty + qty.maxQty;
    var menuItemArray = [];
    var newIndex = 1;
    for (var index = qty.minQty; index < newMax; index++) {
      menuItemArray[newIndex] = newIndex;
      newIndex++;
    }
    return menuItemArray;
  };
  return /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      paddingTop: 2
    }
  }, /*#__PURE__*/_react["default"].createElement("form", null, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    container: true,
    spacing: 0,
    justifyContent: "center",
    alignItems: "stretch",
    direction: "row"
  }, title != null && /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    item: true,
    xs: 12,
    sm: 6,
    md: 3,
    key: "plans"
  }, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
    variant: "h4",
    gutterBottom: true
  }, title)), tiers.map(function (tier) {
    return /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
      item: true,
      xs: 12,
      sm: 6,
      md: 3,
      key: tier.title
    }, /*#__PURE__*/_react["default"].createElement(_system.Box, {
      sx: {
        paddingBottom: 2,
        padding: 2
      }
    }, /*#__PURE__*/_react["default"].createElement(_system.Box, {
      sx: {
        textAlign: "center",
        paddingTop: 2
      }
    }, tier.image != null && /*#__PURE__*/_react["default"].createElement("img", {
      src: tier.image,
      width: 200,
      height: 200
    }), /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
      variant: "h3",
      component: "h2",
      sx: {
        paddingTop: 3
      }
    }, tier.title), tier.subTitle && /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
      variant: "h6",
      component: "h2",
      sx: {
        paddingTop: 2
      }
    }, tier.subTitle), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
      container: true,
      spacing: 0
    }, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
      item: true,
      xs: tier.qty != null ? 6 : 12,
      sx: {
        padding: 4
      }
    }, /*#__PURE__*/_react["default"].createElement(_system.Box, {
      component: "span",
      sx: {
        fontSize: 30,
        fontWeight: "bold"
      }
    }, "$", tier.price), tier.duration != null && /*#__PURE__*/_react["default"].createElement(_system.Box, {
      component: "span"
    }, "/ ", tier.duration)), tier.qty != null && /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
      item: true,
      xs: 6,
      sx: {
        padding: 4
      }
    }, /*#__PURE__*/_react["default"].createElement(_reactHookForm.Controller, {
      name: "qty-" + tier.id,
      control: control,
      rules: {
        required: false
      },
      render: function render(_ref2) {
        var renderField = _ref2.renderField;
        return /*#__PURE__*/_react["default"].createElement(_FormControl["default"], {
          fullWidth: true
        }, /*#__PURE__*/_react["default"].createElement(_InputLabel["default"], {
          id: "demo-simple-select-label"
        }, "Quantity"), /*#__PURE__*/_react["default"].createElement(_Select["default"], _extends({}, register("qty-" + tier.id, {
          required: false
        }), renderField, {
          labelId: "demo-simple-select-label",
          id: "demo-simple-select",
          defaultValue: 1,
          label: "Quantity"
        }), calculateQty(tier.qty).map(function (menuItem, index) {
          return /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
            key: index,
            value: menuItem
          }, menuItem);
        })));
      }
    }))), tier.modifiers != null && /*#__PURE__*/_react["default"].createElement(_system.Box, {
      sx: {
        paddingBottom: 2
      }
    }, tier.modifiers.map(function (modifier, index) {
      return /*#__PURE__*/_react["default"].createElement(_reactHookForm.Controller, {
        name: "modifier-" + tier.id + modifier.name,
        control: control,
        rules: {
          required: false
        },
        render: function render(_ref3) {
          var renderField = _ref3.renderField;
          return /*#__PURE__*/_react["default"].createElement(_FormControl["default"], {
            fullWidth: true,
            key: index,
            sx: {
              marginTop: 2
            }
          }, /*#__PURE__*/_react["default"].createElement(_InputLabel["default"], {
            id: "demo-simple-select-label"
          }, modifier.name), /*#__PURE__*/_react["default"].createElement(_Select["default"], _extends({}, register("modifier-" + tier.id + "-" + modifier.name, {
            required: false
          }), renderField, {
            labelId: "demo-simple-select-label",
            id: "demo-simple-select",
            defaultValue: 0,
            label: modifier.name
          }), modifier.options.map(function (mod, index) {
            return /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
              key: index,
              value: index
            }, mod);
          })));
        }
      });
    })), /*#__PURE__*/_react["default"].createElement(_Button["default"], {
      fullWidth: true,
      variant: tier.buttonVariant,
      endIcon: /*#__PURE__*/_react["default"].createElement(_ChevronRightRounded["default"], null),
      sx: {
        height: 50
      },
      onClick: handleSubmit( /*#__PURE__*/function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
          var modifiers, qty, index, modifier;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                modifiers = {};
                qty = null;
                if (tier.modifiers != null) {
                  for (index = 0; index < tier.modifiers.length; index++) {
                    modifier = tier.modifiers[index]; // assign the modifier as a property
                    modifiers[modifier.name] = data["modifier-" + tier.id + "-" + modifier.name];
                  }
                }
                if (tier.qty != null) {
                  qty = parseInt(data["qty-" + tier.id]);
                }
                if (onButtonClicked != null) {
                  onButtonClicked({
                    id: tier.id,
                    modifiers: modifiers,
                    qty: qty
                  });
                }
              case 5:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }));
        return function (_x) {
          return _ref4.apply(this, arguments);
        };
      }())
    }, tier.buttonText), /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
      variant: "body2",
      sx: {
        paddingTop: 2,
        fontSize: 16,
        textAlign: "left",
        lineHeight: "1.5rem"
      }
    }, /*#__PURE__*/_react["default"].createElement("div", {
      dangerouslySetInnerHTML: {
        __html: tier.description
      }
    })))));
  })), features != null && /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      paddingTop: 1
    }
  }, features.map(function (feature) {
    return /*#__PURE__*/_react["default"].createElement(_system.Box, null, /*#__PURE__*/_react["default"].createElement(_system.Box, {
      sx: {
        backgroundColor: "lightgray",
        padding: 1,
        borderRadius: 2
      }
    }, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
      variant: "h5",
      gutterBottom: true
    }, feature.name)), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
      container: true,
      spacing: 0,
      justifyContent: "center"
    }, feature.subfeatures.map(function (subfeature, subFeatureIndex) {
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, subfeature.map(function (item, index) {
        return /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
          item: true,
          xs: 3,
          key: subfeature
        }, /*#__PURE__*/_react["default"].createElement(_system.Box, {
          sx: {
            padding: 2,
            height: 60,
            paddingTop: subFeatureIndex == 0 ? 3 : 2,
            textAlign: index == 0 ? "left" : "center"
          }
        }, item), feature.subfeatures.length - 1 != subFeatureIndex ? /*#__PURE__*/_react["default"].createElement("hr", null) : "");
      }));
    })));
  }))));
}
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddDomain = AddDomain;
var _react = _interopRequireWildcard(require("react"));
var _system = require("@mui/system");
var _Grid = _interopRequireDefault(require("@mui/material/Grid"));
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _styles = require("@mui/material/styles");
var _Dialog = _interopRequireDefault(require("@mui/material/Dialog"));
var _DialogTitle = _interopRequireDefault(require("@mui/material/DialogTitle"));
var _DialogContent = _interopRequireDefault(require("@mui/material/DialogContent"));
var _DialogActions = _interopRequireDefault(require("@mui/material/DialogActions"));
var _IconButton = _interopRequireDefault(require("@mui/material/IconButton"));
var _Close = _interopRequireDefault(require("@mui/icons-material/Close"));
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
var _Stepper = _interopRequireDefault(require("@mui/material/Stepper"));
var _Step = _interopRequireDefault(require("@mui/material/Step"));
var _StepLabel = _interopRequireDefault(require("@mui/material/StepLabel"));
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
var _FmdBadRounded = _interopRequireDefault(require("@mui/icons-material/FmdBadRounded"));
var _FormControl = _interopRequireDefault(require("@mui/material/FormControl"));
var _Select = _interopRequireDefault(require("@mui/material/Select"));
var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));
var _ContentCopyRounded = _interopRequireDefault(require("@mui/icons-material/ContentCopyRounded"));
var _CircularProgress = _interopRequireDefault(require("@mui/material/CircularProgress"));
var _material = require("@mui/material");
var _excluded = ["children", "onClose"];
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
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; } // import { apiService } from 'authscape';
function AddDomain(_ref) {
  var open = _ref.open,
    azureWebsite = _ref.azureWebsite,
    azureTxtValue = _ref.azureTxtValue,
    handleClose = _ref.handleClose;
  var steps = ['Enter a domain', 'Setup DNS Record', 'Go Live'];
  var _useState = (0, _react.useState)(0),
    _useState2 = _slicedToArray(_useState, 2),
    activeStep = _useState2[0],
    setActiveStep = _useState2[1];
  var _useState3 = (0, _react.useState)({}),
    _useState4 = _slicedToArray(_useState3, 2),
    completed = _useState4[0],
    setCompleted = _useState4[1];

  // const [domain, setDomain] = useState(null);
  var _useState5 = (0, _react.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    subDomains = _useState6[0],
    setSubDomains = _useState6[1];
  // const [topLevelDomains , setTopLevelDomains ] = useState(null);

  var _useState7 = (0, _react.useState)(null),
    _useState8 = _slicedToArray(_useState7, 2),
    fullDomain = _useState8[0],
    setFullDomain = _useState8[1];
  var _useState9 = (0, _react.useState)(null),
    _useState10 = _slicedToArray(_useState9, 2),
    errorMessage = _useState10[0],
    setErrorMessage = _useState10[1];
  var refDomain = (0, _react.useRef)(null);
  var refCNameTarget = (0, _react.useRef)(null);
  var reftxtTarget = (0, _react.useRef)(null);
  var refCNameName = (0, _react.useRef)(null);
  var reftxtName = (0, _react.useRef)(null);
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
  var getSubdomain = function getSubdomain(hostName) {
    var host = hostName; // e.g., subdomain.example.com
    var parts = host.split('.');
    if (parts.length > 2) {
      return parts[0]; // This will be 'subdomain'
    }

    return null; // No subdomain found
  };

  var handleStep = function handleStep(step) {
    return function () {
      setActiveStep(step);
    };
  };
  var handleComplete = function handleComplete() {
    var newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };
  var BootstrapDialog = (0, _styles.styled)(_Dialog["default"])(function (_ref2) {
    var theme = _ref2.theme;
    return {
      '& .MuiDialogContent-root': {
        padding: theme.spacing(2)
      },
      '& .MuiDialogActions-root': {
        padding: theme.spacing(1)
      }
    };
  });
  var handleReset = function handleReset() {
    setActiveStep(0);
    setCompleted({});
  };
  var createTheDomainRequest = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var response, aStep;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!(fullDomain == null || fullDomain == "")) {
              _context.next = 2;
              break;
            }
            return _context.abrupt("return");
          case 2:
            _context.next = 4;
            return apiService().post("/PrivateLabel/GenerateDomain", {
              hostName: fullDomain
            });
          case 4:
            response = _context.sent;
            if (response != null && response.status == 200) {
              if (handleClose != null) {
                handleClose();
              }
            } else {
              aStep = activeStep - 1;
              setActiveStep(aStep);
              setErrorMessage(response.data);
            }
          case 6:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function createTheDomainRequest() {
      return _ref3.apply(this, arguments);
    };
  }();
  (0, _react.useEffect)(function () {
    if (activeStep == 2) {
      createTheDomainRequest();
    }
  }, [activeStep]);
  var copyToClipboard = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(text) {
      var permissions;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return navigator.permissions.query({
              name: "clipboard-write"
            });
          case 3:
            permissions = _context2.sent;
            if (!(permissions.state === "granted" || permissions.state === "prompt")) {
              _context2.next = 9;
              break;
            }
            _context2.next = 7;
            return navigator.clipboard.writeText(text);
          case 7:
            _context2.next = 10;
            break;
          case 9:
            throw new Error("Can't access the clipboard. Check your browser permissions.");
          case 10:
            _context2.next = 15;
            break;
          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](0);
            alert('Error copying to clipboard:', _context2.t0);
          case 15:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 12]]);
    }));
    return function copyToClipboard(_x2) {
      return _ref4.apply(this, arguments);
    };
  }();
  function BootstrapDialogTitle(props) {
    var children = props.children,
      onClose = props.onClose,
      other = _objectWithoutProperties(props, _excluded);
    return /*#__PURE__*/_react["default"].createElement(_DialogTitle["default"], _extends({
      sx: {
        m: 0,
        p: 2
      }
    }, other), children, onClose ? /*#__PURE__*/_react["default"].createElement(_IconButton["default"], {
      "aria-label": "close",
      onClick: onClose,
      sx: {
        position: 'absolute',
        right: 8,
        top: 8,
        color: function color(theme) {
          return theme.palette.grey[500];
        }
      }
    }, /*#__PURE__*/_react["default"].createElement(_Close["default"], null)) : null);
  }
  return /*#__PURE__*/_react["default"].createElement(BootstrapDialog, {
    onClose: handleClose,
    "aria-labelledby": "customized-dialog-title",
    sx: {
      backgroundColor: "rgba(0, 0, 0, 0.6)"
    },
    fullWidth: true,
    maxWidth: "md",
    open: open
  }, /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      padding: 4
    }
  }, /*#__PURE__*/_react["default"].createElement(_Stepper["default"], {
    activeStep: activeStep,
    alternativeLabel: true
  }, steps.map(function (label) {
    return /*#__PURE__*/_react["default"].createElement(_Step["default"], {
      key: label
    }, /*#__PURE__*/_react["default"].createElement(_StepLabel["default"], {
      sx: {
        color: "#fff"
      }
    }, label));
  })), activeStep == 0 && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(BootstrapDialogTitle, {
    id: "customized-dialog-title",
    onClose: handleClose,
    sx: {
      textAlign: "center",
      fontSize: 30,
      marginTop: 2,
      lineHeight: 1
    }
  }, "What domain would you like to connect to ", process.env.companyName, "?"), /*#__PURE__*/_react["default"].createElement(_DialogContent["default"], null, /*#__PURE__*/_react["default"].createElement(_system.Box, null, /*#__PURE__*/_react["default"].createElement(_TextField["default"], {
    inputRef: refDomain,
    id: "domainTxt",
    label: "Enter subdomain URL e.g catalog.mydomain.com",
    fullWidth: true,
    variant: "outlined",
    sx: {
      color: "white",
      marginTop: 2
    }
  })), /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      marginTop: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
    gutterBottom: true,
    sx: {
      textAlign: "center",
      fontSize: 14
    }
  }, /*#__PURE__*/_react["default"].createElement(_FmdBadRounded["default"], {
    sx: {
      color: "#1976d2",
      position: "relative",
      top: 8
    }
  }), " You must own the domain and have the ability to add records"))), /*#__PURE__*/_react["default"].createElement(_DialogActions["default"], null, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    variant: "contained",
    onClick: function onClick() {
      if (refDomain.current.value == "") {
        return;
      }
      setFullDomain(refDomain.current.value);
      var _subDomain = getSubdomain(refDomain.current.value);
      setSubDomains(_subDomain);

      // var domainLand = parseDomain(refDomain.current.value);
      // setDomain(domainLand.domain);
      // setSubDomains(domainLand.subDomains);
      // setTopLevelDomains(domainLand.topLevelDomains);

      handleNext();
    }
  }, "Next: Setup DNS"))), activeStep == 1 && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(BootstrapDialogTitle, {
    id: "customized-dialog-title",
    onClose: handleClose,
    sx: {
      textAlign: "center",
      fontSize: 30,
      marginTop: 2
    }
  }, "Configure your DNS"), /*#__PURE__*/_react["default"].createElement(_DialogContent["default"], null, /*#__PURE__*/_react["default"].createElement(_system.Box, null, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
    gutterBottom: true,
    sx: {
      textAlign: "center",
      fontSize: 14
    }
  }, "Add a CNAME and TXT Record to your domain by visiting your DNS provider.")), /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      backgroundColor: "#f7f7f7",
      marginTop: 5,
      paddingLeft: 4,
      paddingRight: 4
    }
  }, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    container: true,
    spacing: 2,
    fullWidth: true
  }, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    item: true,
    xs: 2
  }, "Type", /*#__PURE__*/_react["default"].createElement(_FormControl["default"], {
    fullWidth: true,
    sx: {
      paddingTop: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_Select["default"], {
    value: 1,
    readOnly: true
  }, /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
    value: 1
  }, "CNAME")))), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    item: true,
    xs: 5
  }, "Name", /*#__PURE__*/_react["default"].createElement(_TextField["default"], {
    inputRef: refCNameName,
    id: "NameDomainTxt",
    label: "",
    fullWidth: true,
    value: subDomains,
    variant: "outlined",
    sx: {
      color: "white",
      paddingTop: 2
    }
  }), /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      textAlign: "center",
      paddingTop: 1
    }
  }, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    startIcon: /*#__PURE__*/_react["default"].createElement(_ContentCopyRounded["default"], null),
    sx: {
      width: "100%"
    },
    variant: "contained",
    onClick: function onClick() {
      copyToClipboard(refCNameName.current.value);
    }
  }, "Copy"))), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    item: true,
    xs: 5
  }, "Target", /*#__PURE__*/_react["default"].createElement(_TextField["default"], {
    inputRef: refCNameTarget,
    id: "targetDomainTxt",
    label: "",
    fullWidth: true,
    value: azureWebsite,
    variant: "outlined",
    sx: {
      color: "white",
      paddingTop: 2
    }
  }), /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      textAlign: "center",
      paddingTop: 1
    }
  }, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    startIcon: /*#__PURE__*/_react["default"].createElement(_ContentCopyRounded["default"], null),
    sx: {
      width: "100%"
    },
    variant: "contained",
    onClick: function onClick() {
      copyToClipboard(refCNameTarget.current.value);
    }
  }, "Copy"))))), /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      backgroundColor: "#f7f7f7",
      paddingLeft: 4,
      paddingRight: 4,
      marginTop: 2,
      paddingBottom: 4
    }
  }, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    container: true,
    spacing: 2,
    fullWidth: true
  }, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    item: true,
    xs: 2
  }, "Type", /*#__PURE__*/_react["default"].createElement(_FormControl["default"], {
    fullWidth: true,
    sx: {
      paddingTop: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_Select["default"], {
    value: 1,
    readOnly: true
  }, /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
    value: 1
  }, "TXT")))), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    item: true,
    xs: 5
  }, "Name", /*#__PURE__*/_react["default"].createElement(_TextField["default"], {
    inputRef: reftxtName,
    id: "NameDomain2Txt",
    label: "",
    fullWidth: true,
    value: "asuid." + subDomains,
    variant: "outlined",
    sx: {
      color: "white",
      marginTop: 2
    }
  }), /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      textAlign: "center",
      paddingTop: 1
    }
  }, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    startIcon: /*#__PURE__*/_react["default"].createElement(_ContentCopyRounded["default"], null),
    sx: {
      width: "100%"
    },
    variant: "contained",
    onClick: function onClick() {
      copyToClipboard(reftxtName.current.value);
    }
  }, "Copy"))), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    item: true,
    xs: 5
  }, "Target", /*#__PURE__*/_react["default"].createElement(_TextField["default"], {
    inputRef: reftxtTarget,
    id: "targetDomain2Txt",
    label: "",
    fullWidth: true,
    value: azureTxtValue,
    variant: "outlined",
    sx: {
      color: "white",
      marginTop: 2
    }
  }), /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      textAlign: "center",
      paddingTop: 1
    }
  }, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    startIcon: /*#__PURE__*/_react["default"].createElement(_ContentCopyRounded["default"], null),
    sx: {
      width: "100%"
    },
    variant: "contained",
    onClick: function onClick() {
      copyToClipboard(reftxtTarget.current.value);
    }
  }, "Copy")))))), /*#__PURE__*/_react["default"].createElement(_DialogActions["default"], null, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    variant: "contained",
    onClick: function onClick() {
      handleNext();
    }
  }, "Go Live"))), activeStep == 2 && /*#__PURE__*/_react["default"].createElement(_system.Box, null, /*#__PURE__*/_react["default"].createElement(BootstrapDialogTitle, {
    id: "customized-dialog-title",
    onClose: handleClose,
    sx: {
      textAlign: "center",
      fontSize: 30,
      marginTop: 4
    }
  }, "Creating your private label experience"), /*#__PURE__*/_react["default"].createElement(_DialogContent["default"], null, /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      paddingTop: 2,
      textAlign: "center"
    }
  }, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
    gutterBottom: true,
    sx: {
      textAlign: "center",
      fontSize: 18
    }
  }, "Please wait while we complete a few things on our side."), /*#__PURE__*/_react["default"].createElement(_system.Box, {
    sx: {
      paddingTop: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_CircularProgress["default"], {
    color: "inherit"
  })))))), /*#__PURE__*/_react["default"].createElement(_Dialog["default"], {
    open: errorMessage != null ? true : false,
    onClose: function onClose() {
      setErrorMessage(null);
    },
    "aria-labelledby": "alert-dialog-title",
    "aria-describedby": "alert-dialog-description"
  }, /*#__PURE__*/_react["default"].createElement(_DialogTitle["default"], {
    id: "alert-dialog-title"
  }, "Issue Detected"), /*#__PURE__*/_react["default"].createElement(_DialogContent["default"], null, /*#__PURE__*/_react["default"].createElement(_material.DialogContentText, {
    id: "alert-dialog-description"
  }, errorMessage)), /*#__PURE__*/_react["default"].createElement(_DialogActions["default"], null, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    onClick: function onClick() {
      setErrorMessage(null);
    },
    autoFocus: true
  }, "OK"))));
}
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrivateLabelEditor = PrivateLabelEditor;
var _react = _interopRequireWildcard(require("react"));
var _react2 = _interopRequireWildcard(require("@monaco-editor/react"));
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _Check = _interopRequireDefault(require("@mui/icons-material/Check"));
var _Tabs = _interopRequireDefault(require("@mui/material/Tabs"));
var _Tab = _interopRequireDefault(require("@mui/material/Tab"));
var _Box = _interopRequireDefault(require("@mui/material/Box"));
var _material = require("@mui/material");
var _xDataGrid = require("@mui/x-data-grid");
var _PublishRounded = _interopRequireDefault(require("@mui/icons-material/PublishRounded"));
var _InputLabel = _interopRequireDefault(require("@mui/material/InputLabel"));
var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));
var _FormControl = _interopRequireDefault(require("@mui/material/FormControl"));
var _Select = _interopRequireDefault(require("@mui/material/Select"));
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
// remove after NPM
// import {FileUploader, apiService, ColorPicker, Dropzone} from 'authscape';
// import AddDomain from "./AddDomainModal";

function PrivateLabelEditor(_ref) {
  var loadedUser = _ref.loadedUser,
    notification = _ref.notification,
    _ref$showAllDomains = _ref.showAllDomains,
    showAllDomains = _ref$showAllDomains === void 0 ? false : _ref$showAllDomains,
    _ref$companyId = _ref.companyId,
    companyId = _ref$companyId === void 0 ? null : _ref$companyId,
    _ref$azureWebsite = _ref.azureWebsite,
    azureWebsite = _ref$azureWebsite === void 0 ? "" : _ref$azureWebsite,
    _ref$azureTxtValue = _ref.azureTxtValue,
    azureTxtValue = _ref$azureTxtValue === void 0 ? "" : _ref$azureTxtValue;
  var monaco = (0, _react2.useMonaco)();
  var cssEditorRef = (0, _react.useRef)(null);
  var htmlEditorRef = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    data = _useState2[0],
    setData = _useState2[1];
  var _useState3 = (0, _react.useState)(0),
    _useState4 = _slicedToArray(_useState3, 2),
    value = _useState4[0],
    setValue = _useState4[1];
  var _useState5 = (0, _react.useState)([]),
    _useState6 = _slicedToArray(_useState5, 2),
    fonts = _useState6[0],
    setFonts = _useState6[1];
  var _useState7 = (0, _react.useState)([]),
    _useState8 = _slicedToArray(_useState7, 2),
    oEMDomainList = _useState8[0],
    setOEMDomainList = _useState8[1];
  var _useState9 = (0, _react.useState)([]),
    _useState10 = _slicedToArray(_useState9, 2),
    dnsFields = _useState10[0],
    setDnsFields = _useState10[1];
  var _useState11 = (0, _react.useState)(null),
    _useState12 = _slicedToArray(_useState11, 2),
    selectedFont = _useState12[0],
    setSelectedFont = _useState12[1];
  var _useState13 = (0, _react.useState)(null),
    _useState14 = _slicedToArray(_useState13, 2),
    fontUri = _useState14[0],
    setFontUri = _useState14[1];
  var _useState15 = (0, _react.useState)(null),
    _useState16 = _slicedToArray(_useState15, 2),
    oEMDomain = _useState16[0],
    setOEMDomain = _useState16[1];
  var _useState17 = (0, _react.useState)(''),
    _useState18 = _slicedToArray(_useState17, 2),
    stateBaseUri = _useState18[0],
    setBaseUri = _useState18[1];
  var _useState19 = (0, _react.useState)(false),
    _useState20 = _slicedToArray(_useState19, 2),
    isNewAccount = _useState20[0],
    setIsNewAccount = _useState20[1];
  var handleChange = function handleChange(event, newValue) {
    setValue(newValue);
  };
  var GetBaseUrl = function GetBaseUrl() {
    return window.location.protocol + "//" + window.location.host;
  };
  var loadDNSFields = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var _domain,
        domain,
        responseFields,
        _args = arguments;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _domain = _args.length > 0 && _args[0] !== undefined ? _args[0] : null;
            domain = null;
            if (_domain != null) {
              domain = _domain;
            } else {
              domain = GetBaseUrl();
            }
            _context.next = 5;
            return apiService().get("/PrivateLabel/GetFields?domain=" + domain + (companyId != null ? "&companyId=" + companyId : ""));
          case 5:
            responseFields = _context.sent;
            if (responseFields != null && responseFields.status == 200) {
              setDnsFields(responseFields.data);
            }
          case 7:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function loadDNSFields() {
      return _ref2.apply(this, arguments);
    };
  }();
  (0, _react.useEffect)(function () {
    if (oEMDomain != null) {
      loadDNSFields(oEMDomain);
    }
  }, [oEMDomain]);
  var FetchOEMData = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var response, _response, _response2;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return apiService().get("/PrivateLabel/GetFonts");
          case 2:
            response = _context2.sent;
            if (response != null && response.status == 200) {
              setFonts(response.data);
            }
            if (!showAllDomains) {
              _context2.next = 11;
              break;
            }
            _context2.next = 7;
            return apiService().get("/PrivateLabel/GetAllDomains");
          case 7:
            _response = _context2.sent;
            if (_response != null && _response.status == 200) {
              setOEMDomainList(_response.data);
              if (_response.data.length > 0) {
                setOEMDomain(_response.data[0].name);
              } else {
                setIsNewAccount(true);
              }
            }
            _context2.next = 15;
            break;
          case 11:
            _context2.next = 13;
            return apiService().get("/PrivateLabel/GetAllDomainsUser");
          case 13:
            _response2 = _context2.sent;
            if (_response2 != null && _response2.status == 200) {
              setOEMDomainList(_response2.data);
              if (_response2.data.length > 0) {
                setOEMDomain(_response2.data[0].name);
              } else {
                setIsNewAccount(true);
              }
            }
          case 15:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function FetchOEMData() {
      return _ref3.apply(this, arguments);
    };
  }();
  (0, _react.useEffect)(function () {
    if (loadedUser) {
      FetchOEMData();
    }
  }, [loadedUser]);
  var _React$useState = _react["default"].useState({
      page: 0,
      pageSize: 12
    }),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    paginationModel = _React$useState2[0],
    setPaginationModel = _React$useState2[1];
  function handleCSSEditorDidMount(editor, monaco) {
    cssEditorRef.current = editor;
  }
  function handleHtmlEditorDidMount(editor, monaco) {
    htmlEditorRef.current = editor;
  }
  var columns = [{
    field: "label",
    headerName: "Fonts",
    editable: false,
    width: 300,
    renderCell: function renderCell(params) {
      var RenderData = function RenderData(row) {
        // const { id, value, field } = params;
        // const apiRef = useGridApiContext();
        return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_Box["default"], {
          sx: {
            fontFamily: row.value,
            fontSize: 20,
            cursor: "pointer"
          }
        }, row.value), /*#__PURE__*/_react["default"].createElement("link", {
          href: "https://fonts.googleapis.com/css2?family=" + row.value,
          rel: "stylesheet"
        }));
      };
      return RenderData(params);
    }
  }];
  (0, _react.useEffect)(function () {
    var fetchData = /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var response;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              // if (monaco) {
              //     //console.log("here is the monaco instance:", monaco);
              // }

              setData(null);
              _context3.next = 3;
              return apiService().get("/PrivateLabel/GetEditorData?domain=" + oEMDomain + (companyId != null ? "&companyId=" + companyId : ""));
            case 3:
              response = _context3.sent;
              if (response.status == 200) {
                setData(response.data);
                setSelectedFont(response.data.fontFamily);
                setFontUri(response.data.fontUrl);
              }
            case 5:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      return function fetchData() {
        return _ref4.apply(this, arguments);
      };
    }();
    fetchData();
  }, [monaco, oEMDomain]);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_Box["default"], {
    sx: {
      width: '100%'
    }
  }, selectedFont != null && fontUri == null && /*#__PURE__*/_react["default"].createElement("link", {
    href: "https://fonts.googleapis.com/css2?family=" + selectedFont,
    rel: "stylesheet"
  }), /*#__PURE__*/_react["default"].createElement(_Box["default"], {
    sx: {
      paddingTop: 6
    }
  }, oEMDomain != null && /*#__PURE__*/_react["default"].createElement(_FormControl["default"], {
    fullWidth: true
  }, /*#__PURE__*/_react["default"].createElement(_InputLabel["default"], {
    id: "demo-simple-select-label"
  }, "Website Domain"), /*#__PURE__*/_react["default"].createElement(_Select["default"], {
    labelId: "demo-simple-select-label",
    id: "demo-simple-select",
    defaultValue: oEMDomain,
    label: "Website Domain",
    onChange: function onChange(val) {
      setOEMDomain(val.target.value);
    }
  }, oEMDomainList.map(function (dns) {
    return /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
      value: dns.name
    }, dns.name);
  })))), /*#__PURE__*/_react["default"].createElement(_Box["default"], {
    sx: {
      borderBottom: 1,
      borderColor: 'divider',
      paddingTop: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_Tabs["default"], {
    value: value,
    onChange: handleChange,
    "aria-label": "basic tabs example"
  }, /*#__PURE__*/_react["default"].createElement(_Tab["default"], {
    label: "App Icon / Colors"
  }), /*#__PURE__*/_react["default"].createElement(_Tab["default"], {
    label: "Fonts"
  }), /*#__PURE__*/_react["default"].createElement(_Tab["default"], {
    label: "Style Sheet Editor"
  }), /*#__PURE__*/_react["default"].createElement(_Tab["default"], {
    label: "HTML Import Editor"
  }))), /*#__PURE__*/_react["default"].createElement(_Box["default"], null, /*#__PURE__*/_react["default"].createElement(_Box["default"], {
    sx: {
      padding: 2
    }
  }, value == 0 && /*#__PURE__*/_react["default"].createElement(_Box["default"], null, data != null && /*#__PURE__*/_react["default"].createElement(_Box["default"], null, /*#__PURE__*/_react["default"].createElement(_material.Grid, {
    container: true,
    spacing: 2
  }, /*#__PURE__*/_react["default"].createElement(_material.Grid, {
    item: true,
    xs: 4
  }, /*#__PURE__*/_react["default"].createElement(_Box["default"], {
    sx: {
      paddingBottom: 4
    }
  }, /*#__PURE__*/_react["default"].createElement(Dropzone, {
    image: "/DefaultNoImage.svg",
    text: "Drag 'n' drop your app icon here",
    onDrop: /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(file) {
        var data, response;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              data = new FormData();
              data.append("file", file);
              data.append("domain", stateBaseUri);
              _context4.next = 5;
              return apiService().post("/PrivateLabel/UploadAppIcon", data);
            case 5:
              response = _context4.sent;
              if (response != null && response.status == 200) {
                window.location.reload();
              }
            case 7:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      return function (_x2) {
        return _ref5.apply(this, arguments);
      };
    }()
  }))), /*#__PURE__*/_react["default"].createElement(_material.Grid, {
    item: true,
    xs: 8
  }, /*#__PURE__*/_react["default"].createElement(_Box["default"], {
    sx: {
      paddingBottom: 2,
      fontWeight: "bold",
      fontSize: 16
    }
  }, "Adjust the colors for your site"), /*#__PURE__*/_react["default"].createElement(_Box["default"], null, dnsFields != null && dnsFields.map(function (dnsField, index) {
    return /*#__PURE__*/_react["default"].createElement(_Box["default"], {
      key: index
    }, /*#__PURE__*/_react["default"].createElement(_material.Grid, {
      container: true,
      spacing: 2
    }, /*#__PURE__*/_react["default"].createElement(_material.Grid, {
      item: true,
      xs: 3
    }, dnsField.name), /*#__PURE__*/_react["default"].createElement(_material.Grid, {
      item: true,
      xs: 9
    }, /*#__PURE__*/_react["default"].createElement(ColorPicker, {
      name: dnsField.name,
      defaultColor: dnsField.value,
      onColorChanged: /*#__PURE__*/function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(name, hex) {
          return _regeneratorRuntime().wrap(function _callee5$(_context5) {
            while (1) switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return apiService().post("/PrivateLabel/SetFieldValue", {
                  id: dnsField.id,
                  fieldId: dnsField.fieldId,
                  value: hex
                });
              case 2:
                notification(dnsField.name + " Saved");
              case 3:
              case "end":
                return _context5.stop();
            }
          }, _callee5);
        }));
        return function (_x3, _x4) {
          return _ref6.apply(this, arguments);
        };
      }()
    }))));
  })))))), value == 1 && /*#__PURE__*/_react["default"].createElement(_Box["default"], {
    value: value,
    index: 1
  }, data != null && /*#__PURE__*/_react["default"].createElement(_Box["default"], null, /*#__PURE__*/_react["default"].createElement(_material.Grid, {
    container: true,
    spacing: 2
  }, /*#__PURE__*/_react["default"].createElement(_material.Grid, {
    item: true,
    xs: 6
  }, loadedUser == true && /*#__PURE__*/_react["default"].createElement(_Box["default"], null, /*#__PURE__*/_react["default"].createElement(_xDataGrid.DataGrid, {
    rows: fonts,
    columns: columns,
    sx: {
      height: "80vh",
      width: "100%"
    },
    pagination: true,
    disableSelectionOnClick: true,
    onPaginationModelChange: setPaginationModel,
    paginationModel: paginationModel
    //pageSizeOptions={[5]}
    // rowCount={100}
    // rowSelectionModel={selectedFont}
    ,
    onRowClick: /*#__PURE__*/function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(params) {
        var response;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return apiService().post("/PrivateLabel/SetFont", {
                companyId: companyId,
                domain: oEMDomain,
                value: params.row.label
              });
            case 2:
              response = _context6.sent;
              if (response != null && response.status == 200) {
                setSelectedFont(params.row.label);
                setFontUri(null);
                notification("Font saved!");
              }
            case 4:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }));
      return function (_x5) {
        return _ref7.apply(this, arguments);
      };
    }()
  }))), /*#__PURE__*/_react["default"].createElement(_material.Grid, {
    item: true,
    xs: 6
  }, /*#__PURE__*/_react["default"].createElement(FileUploader, {
    url: "/PrivateLabel/UploadCustomFont",
    accept: ".otf,.ttf,.woff",
    params: {
      domain: stateBaseUri
    },
    multiple: true,
    variant: "custom",
    onUploadCompleted: function onUploadCompleted() {
      window.location.reload();
    }
  }, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    color: "primary",
    variant: "contained",
    fullWidth: true,
    sx: {
      height: 50
    },
    startIcon: /*#__PURE__*/_react["default"].createElement(_PublishRounded["default"], null)
  }, /*#__PURE__*/_react["default"].createElement(_Box["default"], null, "Upload Font"), "\xA0", /*#__PURE__*/_react["default"].createElement(_Box["default"], {
    sx: {
      textAlign: "center"
    }
  }, /*#__PURE__*/_react["default"].createElement("small", null, "(.OTF, .TTF, OR .WOFF)")))), /*#__PURE__*/_react["default"].createElement(_Box["default"], {
    sx: {
      marginTop: 4
    }
  }, "Font Selected:"), /*#__PURE__*/_react["default"].createElement(_Box["default"], {
    sx: {
      marginBottom: 2,
      fontWeight: "bold",
      fontSize: 20
    }
  }, " ", selectedFont), /*#__PURE__*/_react["default"].createElement("hr", null), /*#__PURE__*/_react["default"].createElement(_Box["default"], {
    sx: {
      fontFamily: selectedFont
    }
  }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut ultricies odio. Nunc ut quam turpis. In hac habitasse platea dictumst. Suspendisse potenti. Nullam malesuada, purus id sagittis vestibulum, massa tellus gravida elit, vitae ultrices tortor nulla ac nunc. Aenean tempus semper est vel convallis. Sed feugiat, risus eu tincidunt eleifend, purus metus vulputate nulla, et condimentum sapien erat in nisi. Nunc non malesuada libero. Donec tempus tincidunt mi at vulputate. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse potenti. Etiam nec eleifend orci. Suspendisse in est vel nunc rhoncus bibendum vitae id felis. Integer bibendum dolor elit, at tincidunt lacus tempor ac. Maecenas lobortis, mauris at condimentum feugiat, nulla orci condimentum massa, sed facilisis tellus ligula vitae metus. Aliquam erat volutpat. Quisque dignissim felis augue, at semper nisl posuere ut. Proin fringilla diam vitae faucibus finibus.", /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("br", null), "Aenean tempus semper est vel convallis. Sed feugiat, risus eu tincidunt eleifend, purus metus vulputate nulla, et condimentum sapien erat in nisi. Nunc non malesuada libero. Donec tempus tincidunt mi at vulputate. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse potenti"))))), value == 2 && /*#__PURE__*/_react["default"].createElement(_Box["default"], {
    value: value,
    index: 3
  }, /*#__PURE__*/_react["default"].createElement(_material.Grid, {
    container: true,
    spacing: 2
  }, /*#__PURE__*/_react["default"].createElement(_material.Grid, {
    item: true,
    xs: 6
  }, /*#__PURE__*/_react["default"].createElement("h4", {
    style: {
      marginBottom: "0px"
    }
  }, "Global CSS edits"), /*#__PURE__*/_react["default"].createElement("small", null, "You can make edits to your stylesheet")), /*#__PURE__*/_react["default"].createElement(_material.Grid, {
    item: true,
    xs: 6,
    sx: {
      textAlign: "right"
    }
  }, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    startIcon: /*#__PURE__*/_react["default"].createElement(_Check["default"], null),
    sx: {
      marginTop: 4
    },
    variant: "contained",
    onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
      var response;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return apiService().post("/PrivateLabel/SetGlobalCSS", {
              companyId: companyId,
              domain: oEMDomain,
              value: cssEditorRef.current.getValue()
            });
          case 2:
            response = _context7.sent;
            if (response != null && response.status == 200) {
              notification("CSS Saved!");
            }
          case 4:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    }))
  }, "Save Changes"))), /*#__PURE__*/_react["default"].createElement(_Box["default"], {
    sx: {
      paddingTop: 1
    }
  }, data != null && /*#__PURE__*/_react["default"].createElement(_react2["default"], {
    height: "70vh",
    onMount: handleCSSEditorDidMount,
    defaultLanguage: "css",
    theme: "vs-dark",
    defaultValue: data == null || data.prettyCSS == null ? "" : data.prettyCSS
  }))), value == 3 && /*#__PURE__*/_react["default"].createElement(_Box["default"], {
    value: value,
    index: 4
  }, /*#__PURE__*/_react["default"].createElement(_material.Grid, {
    container: true,
    spacing: 2
  }, /*#__PURE__*/_react["default"].createElement(_material.Grid, {
    item: true,
    xs: 6
  }, /*#__PURE__*/_react["default"].createElement("h4", {
    style: {
      marginBottom: "0px"
    }
  }, "HTML import Edits"), /*#__PURE__*/_react["default"].createElement("small", null, "You can add imports such as google analytics or clarity")), /*#__PURE__*/_react["default"].createElement(_material.Grid, {
    item: true,
    xs: 6,
    sx: {
      textAlign: "right"
    }
  }, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    startIcon: /*#__PURE__*/_react["default"].createElement(_Check["default"], null),
    sx: {
      marginTop: 4
    },
    variant: "contained",
    onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
      var response;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return apiService().post("/PrivateLabel/SetGlobalHTML", {
              companyId: companyId,
              domain: oEMDomain,
              value: htmlEditorRef.current.getValue()
            });
          case 2:
            response = _context8.sent;
            if (response != null && response.status == 200) {
              notification("HTML saved!");
            }
          case 4:
          case "end":
            return _context8.stop();
        }
      }, _callee8);
    }))
  }, "Save Changes"))), /*#__PURE__*/_react["default"].createElement(_Box["default"], {
    sx: {
      paddingTop: 1
    }
  }, data != null && /*#__PURE__*/_react["default"].createElement(_react2["default"], {
    height: "70vh",
    onMount: handleHtmlEditorDidMount,
    defaultLanguage: "html",
    theme: "vs-dark",
    defaultValue: data == null || data.prettyHTML == null ? "" : data.prettyHTML
  }))))), /*#__PURE__*/_react["default"].createElement(AddDomain, {
    open: isNewAccount,
    azureWebsite: azureWebsite,
    azureTxtValue: azureTxtValue,
    handleClose: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            setIsNewAccount(false);
            _context9.next = 3;
            return FetchOEMData();
          case 3:
          case "end":
            return _context9.stop();
        }
      }, _callee9);
    }))
  })));
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RichTextEditor = void 0;
var _react = _interopRequireWildcard(require("react"));
var _draftJs = require("draft-js");
var _draftjsToHtml = _interopRequireDefault(require("draftjs-to-html"));
var _dynamic = _interopRequireDefault(require("next/dynamic"));
var _Box = _interopRequireDefault(require("@mui/material/Box"));
var _Button = _interopRequireDefault(require("@mui/material/Button"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var Editor = (0, _dynamic["default"])(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('react-draft-wysiwyg'));
  }).then(function (mod) {
    return mod.Editor;
  });
}, {
  ssr: false
});
var RichTextEditor = function RichTextEditor(_ref) {
  var html = _ref.html,
    onSave = _ref.onSave,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 400 : _ref$height,
    _ref$isDisabled = _ref.isDisabled,
    isDisabled = _ref$isDisabled === void 0 ? false : _ref$isDisabled;
  var _useState = (0, _react.useState)(_draftJs.EditorState.createEmpty()),
    _useState2 = _slicedToArray(_useState, 2),
    editorState = _useState2[0],
    setEditorState = _useState2[1];
  var onEditorStateChange = function onEditorStateChange(editorState) {
    setEditorState(editorState);
  };
  (0, _react.useEffect)(function () {
    if (html != null) {
      var contentBlock = (0, _draftJs.convertFromHTML)(html);
      if (contentBlock) {
        var contentState = _draftJs.ContentState.createFromBlockArray(contentBlock.contentBlocks);
        var _editorState = _draftJs.EditorState.createWithContent(contentState);
        setEditorState(_editorState);
      }
    }
  }, [html]);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(Editor, {
    editorState: editorState,
    toolbarClassName: "toolbarClassName",
    wrapperClassName: "wrapperClassName",
    editorClassName: "editorClassName",
    readOnly: isDisabled,
    editorStyle: {
      height: height
    },
    onEditorStateChange: onEditorStateChange
    // mention={{
    //   separator: " ",
    //   trigger: "@",
    //   suggestions: [
    //     { text: "APPLE", value: "apple" },
    //     { text: "BANANA", value: "banana", url: "banana" },
    //     { text: "CHERRY", value: "cherry", url: "cherry" },
    //     { text: "DURIAN", value: "durian", url: "durian" },
    //     { text: "EGGFRUIT", value: "eggfruit", url: "eggfruit" },
    //     { text: "FIG", value: "fig", url: "fig" },
    //     { text: "GRAPEFRUIT", value: "grapefruit", url: "grapefruit" },
    //     { text: "HONEYDEW", value: "honeydew", url: "honeydew" }
    //   ]
    // }}
  }), /*#__PURE__*/_react["default"].createElement("hr", null), /*#__PURE__*/_react["default"].createElement(_Box["default"], {
    sx: {
      textAlign: "right"
    }
  }, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    variant: "contained",
    disabled: isDisabled,
    onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return onSave((0, _draftjsToHtml["default"])((0, _draftJs.convertToRaw)(editorState.getCurrentContent())));
          case 2:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))
  }, "Save")));
};
exports.RichTextEditor = RichTextEditor;
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpreadsheetViewer = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Box = _interopRequireDefault(require("@mui/material/Box"));
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _List = _interopRequireDefault(require("@mui/material/List"));
var _Table = _interopRequireDefault(require("@mui/material/Table"));
var _TableBody = _interopRequireDefault(require("@mui/material/TableBody"));
var _TableCell = _interopRequireDefault(require("@mui/material/TableCell"));
var _TableContainer = _interopRequireDefault(require("@mui/material/TableContainer"));
var _TableHead = _interopRequireDefault(require("@mui/material/TableHead"));
var _TableRow = _interopRequireDefault(require("@mui/material/TableRow"));
var _reactgrid = require("@silevis/reactgrid");
var _reactDeviceDetect = require("react-device-detect");
var signalR = _interopRequireWildcard(require("@microsoft/signalr"));
var _Avatar = _interopRequireDefault(require("@mui/material/Avatar"));
var _Stack = _interopRequireDefault(require("@mui/material/Stack"));
var _Tooltip = _interopRequireDefault(require("@mui/material/Tooltip"));
var _AppBar = _interopRequireDefault(require("@mui/material/AppBar"));
var _Toolbar = _interopRequireDefault(require("@mui/material/Toolbar"));
var _VisibilityOffRounded = _interopRequireDefault(require("@mui/icons-material/VisibilityOffRounded"));
var _FilterListRounded = _interopRequireDefault(require("@mui/icons-material/FilterListRounded"));
var _SwapVertRounded = _interopRequireDefault(require("@mui/icons-material/SwapVertRounded"));
var _LineWeightRounded = _interopRequireDefault(require("@mui/icons-material/LineWeightRounded"));
var _PivotTableChartRounded = _interopRequireDefault(require("@mui/icons-material/PivotTableChartRounded"));
var _ViewWeekRounded = _interopRequireDefault(require("@mui/icons-material/ViewWeekRounded"));
var _Dialog = _interopRequireDefault(require("@mui/material/Dialog"));
var _DialogActions = _interopRequireDefault(require("@mui/material/DialogActions"));
var _DialogContent = _interopRequireDefault(require("@mui/material/DialogContent"));
var _DialogContentText = _interopRequireDefault(require("@mui/material/DialogContentText"));
var _DialogTitle = _interopRequireDefault(require("@mui/material/DialogTitle"));
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
var _core = require("@dnd-kit/core");
var _sortable = require("@dnd-kit/sortable");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
// import { SortableColumn } from './Mapping/sortableColumn';

var SpreadsheetViewer = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var loadedUser = _ref.loadedUser,
    currentUser = _ref.currentUser,
    documentId = _ref.documentId,
    url = _ref.url,
    sx = _ref.sx,
    _ref$hideToolbar = _ref.hideToolbar,
    hideToolbar = _ref$hideToolbar === void 0 ? false : _ref$hideToolbar,
    _ref$onFocusLocationC = _ref.onFocusLocationChanged,
    _onFocusLocationChanged = _ref$onFocusLocationC === void 0 ? null : _ref$onFocusLocationC,
    _ref$advanceQuery = _ref.advanceQuery,
    advanceQuery = _ref$advanceQuery === void 0 ? null : _ref$advanceQuery,
    _ref$onChange = _ref.onChange,
    onChange = _ref$onChange === void 0 ? null : _ref$onChange,
    _ref$hubUrl = _ref.hubUrl,
    hubUrl = _ref$hubUrl === void 0 ? null : _ref$hubUrl;
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    data = _useState2[0],
    setData = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    rows = _useState4[0],
    setRows = _useState4[1];
  var _useState5 = (0, _react.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    columns = _useState6[0],
    setColumns = _useState6[1];
  var _useState7 = (0, _react.useState)(function () {
      return -1;
    }),
    _useState8 = _slicedToArray(_useState7, 2),
    cellChangesIndex = _useState8[0],
    setCellChangesIndex = _useState8[1];
  var _useState9 = (0, _react.useState)(function () {
      return [];
    }),
    _useState10 = _slicedToArray(_useState9, 2),
    cellChanges = _useState10[0],
    setCellChanges = _useState10[1];
  var highlightsRef = (0, _react.useRef)([]);
  var userIdRef = (0, _react.useRef)(0);
  var returnedRef = (0, _react.useRef)([]);
  var _useState11 = (0, _react.useState)(false),
    _useState12 = _slicedToArray(_useState11, 2),
    showStickyDialog = _useState12[0],
    setShowStickyDialog = _useState12[1];
  var leftColumnRef = (0, _react.useRef)(null);
  var rightColumnRef = (0, _react.useRef)(null);
  var topRowRef = (0, _react.useRef)(null);
  var bottomRowRef = (0, _react.useRef)(null);
  var _useState13 = (0, _react.useState)(null),
    _useState14 = _slicedToArray(_useState13, 2),
    leftColumnSticky = _useState14[0],
    setLeftColumnSticky = _useState14[1];
  var _useState15 = (0, _react.useState)(null),
    _useState16 = _slicedToArray(_useState15, 2),
    rightColumnSticky = _useState16[0],
    setRightColumnSticky = _useState16[1];
  var _useState17 = (0, _react.useState)(null),
    _useState18 = _slicedToArray(_useState17, 2),
    topRowSticky = _useState18[0],
    setTopRowSticky = _useState18[1];
  var _useState19 = (0, _react.useState)(null),
    _useState20 = _slicedToArray(_useState19, 2),
    bottomRowSticky = _useState20[0],
    setBottomRowSticky = _useState20[1];
  var _useState21 = (0, _react.useState)([]),
    _useState22 = _slicedToArray(_useState21, 2),
    highlights = _useState22[0],
    setHighlights = _useState22[1];
  var _useState23 = (0, _react.useState)([]),
    _useState24 = _slicedToArray(_useState23, 2),
    sessions = _useState24[0],
    setSessions = _useState24[1];
  var _useState25 = (0, _react.useState)([]),
    _useState26 = _slicedToArray(_useState25, 2),
    requestedChanges = _useState26[0],
    setRequestedChanges = _useState26[1];
  var _useState27 = (0, _react.useState)(null),
    _useState28 = _slicedToArray(_useState27, 2),
    hubConnection = _useState28[0],
    setHubConnection = _useState28[1];
  var getRows = function getRows() {
    return returnedRef.current;
  };
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      getRows: getRows
    };
  });
  (0, _react.useEffect)(function () {
    if (requestedChanges != null && requestedChanges.length > 0) {
      // go into each request
      for (var index = 0; index < requestedChanges.length; index++) {
        var request = requestedChanges[index];

        // go into each row
        for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
          // alert(request.rowId + "==" + rows[rowIndex].rowId)
          // found our row!
          if (request.rowId == rows[rowIndex].rowId) {
            // look into each cell of the row
            for (var cellIndex = 0; cellIndex < rows[rowIndex].cells.length; cellIndex++) {
              if (rows[rowIndex].cells[cellIndex].columnId == request.fieldName) {
                switch (rows[rowIndex].cells[cellIndex].type) {
                  case "text":
                    rows[rowIndex].cells[cellIndex].text = request.value;
                    break;
                  case "checkbox":
                    rows[rowIndex].cells[cellIndex].checked = Boolean(request.value);
                    break;
                  case "date":
                    rows[rowIndex].cells[cellIndex].date = Date.parse(request.value);
                    break;
                  case "dropdown":
                    rows[rowIndex].cells[cellIndex].selectedValue = request.value;
                    break;
                  case "email":
                    rows[rowIndex].cells[cellIndex].text = request.value;
                    break;
                  case "chevron":
                    rows[rowIndex].cells[cellIndex].text = request.value;
                    break;
                  case "header":
                    rows[rowIndex].cells[cellIndex].text = request.value;
                    break;
                  case "number":
                    rows[rowIndex].cells[cellIndex].text = parseFloat(request.value);
                    break;
                  case "time":
                    rows[rowIndex].cells[cellIndex].text = Date.parse(request.value);
                    break;
                  case "image":
                    rows[rowIndex].cells[cellIndex].url = request.value;
                    break;
                }
              }
            }
            break;
          }
        }
      }
      setRows(function (rowUpdate) {
        return rowUpdate;
      });

      // clear our selected changes
      setRequestedChanges([]);
    }
  }, [requestedChanges]);
  var validateAllCells = function validateAllCells(cells) {
    var hasData = false;
    cells.forEach(function (element) {
      if (element.text != "" && element.text != null) {
        hasData = true;
      }
    });
    return hasData;
  };
  var getSpreadSheetRows = function getSpreadSheetRows(headerCell, rows) {
    // returnedRef
    returnedRef.current = [];
    var dataRows = [{
      rowId: "header",
      cells: headerCell
    }];
    var _loop = function _loop() {
      var row = rows[index];
      if (rows != null && row.cells.length > 0 && advanceQuery != null && advanceQuery.rules.length > 0) {
        row.cells.forEach(function (element) {
          advanceQuery.rules.forEach(function (rule) {
            if (rule.field == element.columnId) {
              if (rule.operator == "contains") {
                if (element.text.toLowerCase().includes(rule.value.toLowerCase())) {
                  if (validateAllCells(row.cells)) {
                    dataRows.push({
                      rowId: row.rowId,
                      cells: row.cells
                    });
                    returnedRef.current.push(row);
                  }
                }
              } else if (rule.operator == "notContains") {
                if (!element.text.toLowerCase().includes(rule.value.toLowerCase())) {
                  if (validateAllCells(row.cells)) {
                    dataRows.push({
                      rowId: row.rowId,
                      cells: row.cells
                    });
                    returnedRef.current.push(row);
                  }
                }
              }
            }
          });
        });
      } else {
        if (validateAllCells(row.cells)) {
          dataRows.push({
            rowId: row.rowId,
            cells: row.cells
          });
          returnedRef.current.push(row);
        }
      }
    };
    for (var index = 0; index < rows.length; index++) {
      _loop();
    }
    return dataRows;
  };
  var handleUndoChanges = function handleUndoChanges() {
    if (cellChangesIndex >= 0) {
      setRows(function (prevPeople) {
        return undoChanges(cellChanges[cellChangesIndex], prevPeople);
      });
    }
  };
  var handleRedoChanges = function handleRedoChanges() {
    if (cellChangesIndex + 1 <= cellChanges.length - 1) {
      setRows(function (prevPeople) {
        return redoChanges(cellChanges[cellChangesIndex + 1], prevPeople);
      });
    }
  };
  (0, _react.useEffect)(function () {
    if (url) {
      setLeftColumnSticky(parseInt(localStorage.getItem("leftColumn")));
      setRightColumnSticky(parseInt(localStorage.getItem("rightColumn")));
      setTopRowSticky(parseInt(localStorage.getItem("topRow")));
      setBottomRowSticky(parseInt(localStorage.getItem("bottomRow")));
      var fetchData = /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var response;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return apiService().get(url);
              case 2:
                response = _context.sent;
                if (response != null && response.status == 200) {
                  setData(response.data);
                  setRows(response.data.rows);
                  setColumns(response.data.columns);
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
    }
  }, [url]);

  // useEffect(() => {

  //     if (rows != null && advanceQuery != null)
  //     {
  //         let newRows = [...rows];

  //         let index = 0;
  //         rows.forEach(row => {

  //             row.cells.forEach(element => {

  //                 advanceQuery.rules.forEach(rule => {

  //                     if (rule.field == element.columnId)
  //                     {

  //                         if (element.text.toLowerCase().includes(rule.value))
  //                         {
  //                             newRows.push(element);
  //                             index++;
  //                         }

  //                         //alert(rule.field + " - " + rule.operator + " - " + rule.value);
  //                     }
  //                 });

  //             });
  //         });

  //         setRows(newRows);

  //         // newRows.forEach(row => {
  //         //     alert(JSON.stringify(row));
  //         // });

  //         // alert("found " + index + " empty fields")
  //     }

  // }, [advanceQuery]);

  var getSessions = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var response, sessionData, _sessions;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return apiService().get("/AuthScapeSpreadSheet/GetActiveSessions?documentId=" + documentId);
          case 2:
            response = _context2.sent;
            sessionData = response.data;
            _sessions = [];
            if (sessionData != null && sessionData.length > 0) {
              sessionData.forEach(function (element) {
                if (_sessions.find(function (s) {
                  return s.userId == element.userId;
                }) == null) {
                  if (element.userId == userIdRef.current) {
                    _sessions.push({
                      userId: element.userId,
                      name: element.name,
                      borderColor: "#3579f8"
                    });
                  } else {
                    _sessions.push({
                      userId: element.userId,
                      name: element.name,
                      borderColor: element.borderColor
                    });
                  }
                }
              });
            }
            assignHighlights(highlightsRef.current);
            setSessions(_sessions);
          case 8:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function getSessions() {
      return _ref3.apply(this, arguments);
    };
  }();
  var assignHighlights = function assignHighlights(clonedAray) {
    var _sessions = [];
    clonedAray.forEach(function (element) {
      _sessions.push({
        rowId: element.rowId,
        columnId: element.columnId,
        borderColor: element.borderColor
      });
    });
    setHighlights(_sessions);
  };
  var onFocusClicked = function onFocusClicked(userId, color, rowId, columnId) {
    var isFound = false;
    var _highlights = highlightsRef.current;
    for (var index = 0; index < _highlights.length; index++) {
      var element = _highlights[index];
      if (element.userId == userId) {
        element.rowId = rowId;
        element.columnId = columnId;
        element.borderColor = color;
        isFound = true;
      }
    }
    if (isFound == false) {
      var newRecord = {
        userId: userId,
        columnId: columnId,
        rowId: rowId,
        borderColor: color
      };
      _highlights.push(newRecord);
    }
    highlightsRef.current = _highlights;
    assignHighlights(highlightsRef.current);
  };
  var getRandomColor = function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  (0, _react.useEffect)(function () {
    if (loadedUser) {
      userIdRef.current = currentUser.id;
      if (hubUrl == null) {
        return;
      }
      var connection = new signalR.HubConnectionBuilder().withUrl(hubUrl).build();
      connection.on("onUpdateUserSession", function () {
        getSessions();
      });
      connection.on("onClickSpreadsheet", function (userId, color, rowId, columnId) {
        if (userIdRef.current != userId) {
          onFocusClicked(userId, color, rowId, columnId);
        }
      });
      connection.on("onChangeValue", function (userId, rowId, fieldName, value) {
        if (userIdRef.current != userId) {
          setRequestedChanges(function (prevMessages) {
            return [].concat(_toConsumableArray(prevMessages), [{
              userId: userId,
              rowId: rowId,
              fieldName: fieldName,
              value: value
            }]);
          });
        }
      });
      connection.start().then(function (result) {
        var randomColor = getRandomColor();
        connection.invoke("Connect", currentUser.firstName + " " + currentUser.lastName, documentId, currentUser.id, randomColor);
        setHubConnection(connection);

        // get the init users, after that we need to hook it
        getSessions();
      });
    }
  }, [loadedUser]);
  var addEmptyRow = function addEmptyRow() {
    // Create a new empty row
    var emptyRow = Array.from({
      length: columns.length
    }, function () {
      return {
        value: ""
      };
    });
    setData(function (prevData) {
      return [].concat(_toConsumableArray(prevData), [emptyRow]);
    });
  };
  var applyNewValue = function applyNewValue(changes, prevPeople) {
    var usePrevValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    changes.forEach(function (change) {
      var personIndex = change.rowId;
      var fieldName = change.columnId;
      var cell = usePrevValue ? change.previousCell : change.newCell;
      prevPeople[personIndex][fieldName] = cell.text;
    });
    return _toConsumableArray(prevPeople);
  };
  var undoChanges = function undoChanges(changes, prevPeople) {
    var updated = applyNewValue(changes, prevPeople, true);
    setCellChangesIndex(cellChangesIndex - 1);
    return updated;
  };
  var redoChanges = function redoChanges(changes, prevPeople) {
    var updated = applyNewValue(changes, prevPeople);
    setCellChangesIndex(cellChangesIndex + 1);
    return updated;
  };
  var handleChanges = function handleChanges(changes) {
    setRows(function (prevPeople) {
      return applyChangesToPeople(changes, prevPeople);
    });
  };
  var applyChangesToPeople = function applyChangesToPeople(changes, prevDetails) {
    changes.forEach(function (change) {
      var dataRowId = change.rowId;
      var fieldName = change.columnId;

      // find the row and column
      var dataRow = prevDetails.find(function (d) {
        return d.rowId === dataRowId;
      });
      var cellItem = dataRow.cells.find(function (s) {
        return s.columnId.toLowerCase() == fieldName.toLowerCase();
      });
      if (cellItem.readOnly) {
        return;
      }
      var rowBuilder = {};
      for (var index = 0; index < dataRow.cells.length; index++) {
        var element = dataRow.cells[index];
        rowBuilder[element.columnId] = element.text;
      }
      var JSONBuilder = {};
      if (cellItem.type == "text") {
        JSONBuilder[cellItem.columnId] = cellItem.text;
        cellItem.text = change.newCell.text;
        if (onChange != null) {
          onChange(rowBuilder, dataRowId, fieldName, change.newCell.text);
        }
        try {
          hubConnection.invoke("CellChanged", documentId, userIdRef.current, dataRowId, fieldName, change.newCell.text.toString());
        } catch (exp) {
          console.error(exp);
        }
      } else if (cellItem.type == "number") {
        JSONBuilder[cellItem.columnId] = cellItem.value;
        cellItem.value = change.newCell.value;
        if (onChange != null) {
          onChange(rowBuilder, dataRowId, fieldName, change.newCell.value);
        }
        try {
          hubConnection.invoke("CellChanged", documentId, userIdRef.current, dataRowId, fieldName, change.newCell.value.toString());
        } catch (exp) {
          console.error(exp);
        }
      } else if (cellItem.type == "checkbox") {
        JSONBuilder[cellItem.columnId] = cellItem.checked;
        cellItem.checked = change.newCell.checked;
        if (onChange != null) {
          onChange(rowBuilder, dataRowId, fieldName, change.newCell.checked);
        }
        try {
          hubConnection.invoke("CellChanged", documentId, userIdRef.current, dataRowId, fieldName, change.newCell.checked.toString());
        } catch (exp) {
          console.error(exp);
        }
      } else if (cellItem.type == "dropdown") {
        cellItem.isOpen = change.newCell.isOpen;
        if (change.newCell.selectedValue && change.newCell.selectedValue !== change.previousCell.selectedValue) {
          JSONBuilder[cellItem.columnId] = cellItem.selectedValue;
          cellItem.selectedValue = change.newCell.selectedValue;
          if (onChange != null) {
            onChange(rowBuilder, dataRowId, fieldName, change.newCell.selectedValue);
          }
          try {
            hubConnection.invoke("CellChanged", documentId, userIdRef.current, dataRowId, fieldName, change.newCell.selectedValue.toString());
          } catch (exp) {
            console.error(exp);
          }
        }
      } else if (cellItem.type == "image") {
        JSONBuilder[cellItem.columnId] = cellItem.url;
        cellItem.url = change.newCell.url;
        if (onChange != null) {
          onChange(rowBuilder, dataRowId, fieldName, change.newCell.url);
        }
        try {
          hubConnection.invoke("CellChanged", documentId, userIdRef.current, dataRowId, fieldName, change.newCell.url.toString());
        } catch (exp) {
          console.error(exp);
        }
      }
    });
    return _toConsumableArray(prevDetails);
  };
  var handleColumnResize = function handleColumnResize(ci, width) {
    setColumns(function (prevColumns) {
      var columnIndex = prevColumns.findIndex(function (el) {
        return el.columnId === ci;
      });
      var resizedColumn = prevColumns[columnIndex];
      var updatedColumn = _objectSpread(_objectSpread({}, resizedColumn), {}, {
        width: width
      });
      prevColumns[columnIndex] = updatedColumn;
      return _toConsumableArray(prevColumns);
    });
  };
  var stringAvatar = function stringAvatar(name, color) {
    return {
      sx: {
        bgcolor: color
      },
      children: "".concat(name.split(' ')[0][0]).concat(name.split(' ')[1][0])
    };
  };
  var getaListOfColumns = function getaListOfColumns() {
    var arrayItem = [];
    for (var index = 0; index < columns.length; index++) {
      var column = columns[index];
      arrayItem.push(column.columnId);
    }
    return arrayItem;
  };
  return /*#__PURE__*/_react["default"].createElement(_Box["default"], null, !hideToolbar && /*#__PURE__*/_react["default"].createElement(_AppBar["default"], {
    position: "static",
    elevation: 0,
    sx: {
      backgroundColor: "white"
    }
  }, /*#__PURE__*/_react["default"].createElement(_Toolbar["default"], {
    disableGutters: true,
    sx: {
      color: "black"
    }
  }, /*#__PURE__*/_react["default"].createElement(_Box["default"], {
    sx: {
      flexGrow: 1
    }
  }, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    variant: "text",
    startIcon: /*#__PURE__*/_react["default"].createElement(_VisibilityOffRounded["default"], null),
    sx: {
      color: "black"
    }
  }, "Hide Fields"), /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    variant: "text",
    startIcon: /*#__PURE__*/_react["default"].createElement(_PivotTableChartRounded["default"], null),
    sx: {
      color: "black",
      paddingLeft: 4
    },
    onClick: function onClick() {
      setShowStickyDialog(true);
    }
  }, "Sticky"), /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    variant: "text",
    startIcon: /*#__PURE__*/_react["default"].createElement(_FilterListRounded["default"], null),
    sx: {
      color: "black",
      paddingLeft: 4
    }
  }, "Filter"), /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    variant: "text",
    startIcon: /*#__PURE__*/_react["default"].createElement(_SwapVertRounded["default"], null),
    sx: {
      color: "black",
      paddingLeft: 4
    }
  }, "Sort"), /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    variant: "text",
    startIcon: /*#__PURE__*/_react["default"].createElement(_LineWeightRounded["default"], null),
    sx: {
      color: "black",
      paddingLeft: 4
    }
  }, "Row Height"), /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    variant: "text",
    startIcon: /*#__PURE__*/_react["default"].createElement(_ViewWeekRounded["default"], null),
    sx: {
      color: "black",
      paddingLeft: 4
    }
  }, "Reorder Columns")), /*#__PURE__*/_react["default"].createElement(_Box["default"], {
    sx: {
      flexGrow: 0
    }
  }, /*#__PURE__*/_react["default"].createElement(_Stack["default"], {
    direction: "row",
    spacing: 2
  }, sessions.map(function (user) {
    return /*#__PURE__*/_react["default"].createElement(_Tooltip["default"], {
      title: user.name
    }, /*#__PURE__*/_react["default"].createElement(_Avatar["default"], _extends({}, stringAvatar(user.name, user.borderColor), {
      alt: user.name
    })));
  }))))), leftColumnSticky != null && rightColumnSticky != null && topRowSticky != null && bottomRowSticky != null && data != null && columns != null && /*#__PURE__*/_react["default"].createElement(_Box["default"], {
    sx: _objectSpread({}, sx)
  }, data != null && rows != null && /*#__PURE__*/_react["default"].createElement(_Box["default"], {
    className: "reactgrid-gold",
    onKeyDown: function onKeyDown(e) {
      var isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
      if (!_reactDeviceDetect.isMacOs && e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "z":
            handleUndoChanges();
            return;
          case "y":
            handleRedoChanges();
            return;
        }
      }
    }
  }, /*#__PURE__*/_react["default"].createElement(_reactgrid.ReactGrid, {
    rows: getSpreadSheetRows(data.headerCell, rows),
    highlights: highlights,
    columns: columns,
    enableFillHandle: true,
    onFocusLocationChanged: function onFocusLocationChanged(location) {
      try {
        hubConnection.invoke("FocusLocationChanged", documentId, userIdRef.current, location.rowId, location.columnId);
      } catch (exp) {
        console.error(exp);
      }
      if (_onFocusLocationChanged != null) {
        _onFocusLocationChanged(location.rowId, location.columnId);
      }
    },
    onCellsChanged: handleChanges,
    enableRowSelection: true,
    enableColumnSelection: true,
    enableRangeSelection: true
    //onContextMenu={simpleHandleContextMenu}
    ,
    onColumnResized: handleColumnResize,
    stickyTopRows: topRowSticky,
    stickyBottomRows: bottomRowSticky,
    stickyLeftColumns: leftColumnSticky,
    stickyRightColumns: rightColumnSticky
  }))), /*#__PURE__*/_react["default"].createElement(_Dialog["default"], {
    open: showStickyDialog,
    onClose: function onClose() {
      setShowStickyDialog(false);
    },
    "aria-labelledby": "alert-dialog-title",
    "aria-describedby": "alert-dialog-description"
  }, /*#__PURE__*/_react["default"].createElement(_DialogTitle["default"], {
    id: "alert-dialog-title"
  }, "Sticky"), /*#__PURE__*/_react["default"].createElement(_DialogContent["default"], null, /*#__PURE__*/_react["default"].createElement(_DialogContentText["default"], {
    id: "alert-dialog-description"
  }, "Stick chosen rows and columns at the top or bottom rows or left and right columns. Sticky rows or columns will remain visible at all times."), /*#__PURE__*/_react["default"].createElement(_TableContainer["default"], {
    sx: {
      paddingTop: 4
    }
  }, /*#__PURE__*/_react["default"].createElement(_Table["default"], {
    "aria-label": "customized table"
  }, /*#__PURE__*/_react["default"].createElement(_TableHead["default"], null, /*#__PURE__*/_react["default"].createElement(_TableRow["default"], null, /*#__PURE__*/_react["default"].createElement(_TableCell["default"], {
    align: "left"
  }, "Left Column"), /*#__PURE__*/_react["default"].createElement(_TableCell["default"], {
    align: "left"
  }, "Right Column"), /*#__PURE__*/_react["default"].createElement(_TableCell["default"], {
    align: "left"
  }, "Top Row"), /*#__PURE__*/_react["default"].createElement(_TableCell["default"], {
    align: "left"
  }, "Bottom Row"))), /*#__PURE__*/_react["default"].createElement(_TableBody["default"], null, /*#__PURE__*/_react["default"].createElement(_TableCell["default"], {
    sx: {
      paddingTop: 0
    }
  }, /*#__PURE__*/_react["default"].createElement(_TextField["default"], {
    inputRef: leftColumnRef,
    type: "number",
    defaultValue: "0",
    variant: "outlined"
  })), /*#__PURE__*/_react["default"].createElement(_TableCell["default"], {
    sx: {
      paddingTop: 0
    }
  }, /*#__PURE__*/_react["default"].createElement(_TextField["default"], {
    inputRef: rightColumnRef,
    type: "number",
    defaultValue: "0",
    variant: "outlined"
  })), /*#__PURE__*/_react["default"].createElement(_TableCell["default"], {
    sx: {
      paddingTop: 0
    }
  }, /*#__PURE__*/_react["default"].createElement(_TextField["default"], {
    inputRef: topRowRef,
    type: "number",
    defaultValue: "0",
    variant: "outlined"
  })), /*#__PURE__*/_react["default"].createElement(_TableCell["default"], {
    sx: {
      paddingTop: 0
    }
  }, /*#__PURE__*/_react["default"].createElement(_TextField["default"], {
    inputRef: bottomRowRef,
    type: "number",
    defaultValue: "0",
    variant: "outlined"
  })))))), /*#__PURE__*/_react["default"].createElement(_DialogActions["default"], null, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    onClick: function onClick() {
      setShowStickyDialog(false);
    }
  }, "Cancel"), /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    onClick: function onClick() {
      localStorage.setItem("leftColumn", leftColumnRef.current.value);
      localStorage.setItem("rightColumn", rightColumnRef.current.value);
      localStorage.setItem("topRow", topRowRef.current.value);
      localStorage.setItem("bottomRow", bottomRowRef.current.value);
      window.location.reload();
      // setLeftColumnSticky(leftColumnRef.current.value);
      // setRightColumnSticky(rightColumnRef.current.value);
      // setTopRowSticky(topRowRef.current.value);
      // setBottomRowSticky(bottomRowRef.current.value);                    

      setShowStickyDialog(false);
    },
    autoFocus: true
  }, "Apply"))), /*#__PURE__*/_react["default"].createElement(_Dialog["default"], {
    open: false,
    onClose: function onClose() {
      setShowStickyDialog(false);
    },
    "aria-labelledby": "alert-dialog-title",
    "aria-describedby": "alert-dialog-description"
  }, /*#__PURE__*/_react["default"].createElement(_DialogTitle["default"], {
    id: "alert-dialog-title"
  }, "Reorder Columns"), /*#__PURE__*/_react["default"].createElement(_DialogContent["default"], null, /*#__PURE__*/_react["default"].createElement(_DialogContentText["default"], {
    id: "alert-dialog-description"
  }, "Assign the column order from left to right."), columns != null && /*#__PURE__*/_react["default"].createElement(_List["default"], null, /*#__PURE__*/_react["default"].createElement(_core.DndContext, {
    onDragEnd: function onDragEnd(event) {
      var over = event.over;
      alert(over.id);
      // If the item is dropped over a container, set it as the parent
      // otherwise reset the parent to `null`
      //setParent(over ? over.id : null);
    }
  }, /*#__PURE__*/_react["default"].createElement(_sortable.SortableContext, {
    items: getaListOfColumns()
  }, columns.map(function (item) {
    return /*#__PURE__*/_react["default"].createElement(SortableColumn, {
      key: item.columnId,
      id: item.columnId
    });
  }))))), /*#__PURE__*/_react["default"].createElement(_DialogActions["default"], null, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    onClick: function onClick() {
      setShowStickyDialog(false);
    }
  }, "Cancel"), /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    onClick: function onClick() {},
    autoFocus: true
  }, "Apply"))));
});
exports.SpreadsheetViewer = SpreadsheetViewer;
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StripeConnect = void 0;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var StripeConnect = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var baseUrl, response;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          baseUrl = GetBaseUrl();
          _context.next = 3;
          return apiService().get("/Payment/SetupStripeConnect?returnBaseUrl=" + baseUrl);
        case 3:
          response = _context.sent;
          return _context.abrupt("return", response);
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function StripeConnect() {
    return _ref.apply(this, arguments);
  };
}();
exports.StripeConnect = StripeConnect;
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = StripePayment;
var _react = _interopRequireWildcard(require("react"));
var _reactStripeJs = require("@stripe/react-stripe-js");
var _stripeJs = require("@stripe/stripe-js");
var _PaymentRounded = _interopRequireDefault(require("@mui/icons-material/PaymentRounded"));
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
var _Select = _interopRequireDefault(require("@mui/material/Select"));
var _Grid = _interopRequireDefault(require("@mui/material/Grid"));
var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));
var _Box = _interopRequireDefault(require("@mui/material/Box"));
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _Tab = _interopRequireDefault(require("@mui/material/Tab"));
var _Tabs = _interopRequireDefault(require("@mui/material/Tabs"));
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
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
var CheckoutForm = function CheckoutForm(_ref) {
  var payButtonText = _ref.payButtonText,
    invoiceId = _ref.invoiceId,
    clientSecret = _ref.clientSecret,
    currentUser = _ref.currentUser,
    paymentMethodType = _ref.paymentMethodType,
    walletId = _ref.walletId,
    onResponse = _ref.onResponse,
    amount = _ref.amount;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isPaymentProcessing = _useState2[0],
    setIsPaymentProcessing = _useState2[1];
  var stripe = (0, _reactStripeJs.useStripe)();
  var elements = (0, _reactStripeJs.useElements)();
  var _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    errorMessage = _useState4[0],
    setErrorMessage = _useState4[1];
  var handleSubmit = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(event) {
      var _yield$stripe$confirm, error, response, setupIntent, addPaymentMethodResponse, _response, _response2, _yield$stripe$confirm2, _error, _response3, paymentIntent;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            setIsPaymentProcessing(true);

            // We don't want to let default form submission happen here,
            // which would refresh the page.
            event.preventDefault();
            if (!(!stripe || !elements)) {
              _context.next = 4;
              break;
            }
            return _context.abrupt("return");
          case 4:
            if (!(amount == null || currentUser != null)) {
              _context.next = 54;
              break;
            }
            _context.next = 7;
            return stripe.confirmSetup({
              //`Elements` instance that was used to create the Payment Element
              elements: elements,
              redirect: "if_required"
              // confirmParams: {
              //   return_url: process.env.websiteBaseUri + '/confirmSetup?redirectUrl=' + encodeURIComponent(window.location.search),
              // },
            });
          case 7:
            _yield$stripe$confirm = _context.sent;
            error = _yield$stripe$confirm.error;
            if (!error) {
              _context.next = 14;
              break;
            }
            // This point will only be reached if there is an immediate error when
            // confirming the payment. Show error to your customer (for example, payment
            // details incomplete)
            setIsPaymentProcessing(false);
            setErrorMessage(error.message);
            _context.next = 52;
            break;
          case 14:
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
            //setIsPaymentProcessing(false);
            response = null;
            _context.next = 17;
            return stripe.retrieveSetupIntent(clientSecret);
          case 17:
            response = _context.sent;
            setupIntent = response.setupIntent;
            _context.t0 = setupIntent.status;
            _context.next = _context.t0 === 'succeeded' ? 22 : _context.t0 === 'processing' ? 43 : _context.t0 === 'requires_payment_method' ? 46 : 49;
            break;
          case 22:
            _context.next = 24;
            return apiService().post("/Payment/AddPaymentMethod", {
              walletId: walletId,
              paymentMethodType: paymentMethodType,
              stripePaymentMethod: setupIntent.payment_method
            });
          case 24:
            addPaymentMethodResponse = _context.sent;
            if (!(addPaymentMethodResponse != null && addPaymentMethodResponse.status == 200)) {
              _context.next = 41;
              break;
            }
            onResponse("succeeded", setupIntent.id, setupIntent.payment_method);
            if (!(amount != null)) {
              _context.next = 39;
              break;
            }
            if (!(invoiceId != null)) {
              _context.next = 35;
              break;
            }
            _context.next = 31;
            return apiService().post("/Invoices/PayInvoice", {
              invoiceId: invoiceId,
              walletPaymentMethodId: addPaymentMethodResponse.data
            });
          case 31:
            _response = _context.sent;
            if (_response != null && _response.status == 200) {
              onResponse("paid", null);
            } else {
              onResponse("failed", null);
            }
            _context.next = 39;
            break;
          case 35:
            _context.next = 37;
            return apiService().post("/Payment/Charge", {
              paymentMethodType: paymentMethodType,
              walletPaymentMethodId: addPaymentMethodResponse.data,
              amount: amount
            });
          case 37:
            _response2 = _context.sent;
            if (_response2 != null && _response2.status == 200) {
              onResponse("paid", _response2.data.stripePaymentIntentId);
            } else {
              onResponse("failed", null);
            }
          case 39:
            _context.next = 42;
            break;
          case 41:
            onResponse("failed", null);
          case 42:
            return _context.abrupt("break", 52);
          case 43:
            onResponse("processing", setupIntent.id, setupIntent.payment_method);
            setIsPaymentProcessing(false);
            return _context.abrupt("break", 52);
          case 46:
            onResponse("requires_payment_method", null);
            setIsPaymentProcessing(false);
            return _context.abrupt("break", 52);
          case 49:
            onResponse("failed", null);
            setIsPaymentProcessing(false);
            return _context.abrupt("break", 52);
          case 52:
            _context.next = 88;
            break;
          case 54:
            _context.next = 56;
            return stripe.confirmPayment({
              //`Elements` instance that was used to create the Payment Element
              elements: elements,
              redirect: "if_required",
              confirmParams: {
                return_url: process.env.websiteBaseUri + '/confirmPayment?redirectUrl=' + encodeURIComponent(window.location.search)
              }
            });
          case 56:
            _yield$stripe$confirm2 = _context.sent;
            _error = _yield$stripe$confirm2.error;
            if (!_error) {
              _context.next = 63;
              break;
            }
            // This point will only be reached if there is an immediate error when
            // confirming the payment. Show error to your customer (for example, payment
            // details incomplete)
            setIsPaymentProcessing(false);
            setErrorMessage(_error.message);
            _context.next = 88;
            break;
          case 63:
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
            _response3 = null;
            if (!(amount == null)) {
              _context.next = 70;
              break;
            }
            _context.next = 67;
            return stripe.retrieveSetupIntent(clientSecret);
          case 67:
            _response3 = _context.sent;
            _context.next = 73;
            break;
          case 70:
            _context.next = 72;
            return stripe.retrievePaymentIntent(clientSecret);
          case 72:
            _response3 = _context.sent;
          case 73:
            paymentIntent = _response3.paymentIntent;
            _context.t1 = paymentIntent.status;
            _context.next = _context.t1 === 'succeeded' ? 77 : _context.t1 === 'processing' ? 79 : _context.t1 === 'requires_payment_method' ? 82 : 85;
            break;
          case 77:
            // need to store the payment intent with the customer if they are logged in... currentUser
            onResponse("succeeded", paymentIntent.id);
            return _context.abrupt("break", 88);
          case 79:
            onResponse("processing", paymentIntent.id);
            setIsPaymentProcessing(false);
            return _context.abrupt("break", 88);
          case 82:
            onResponse("requires_payment_method", null);
            setIsPaymentProcessing(false);
            return _context.abrupt("break", 88);
          case 85:
            onResponse("failed", null);
            setIsPaymentProcessing(false);
            return _context.abrupt("break", 88);
          case 88:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function handleSubmit(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/_react["default"].createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/_react["default"].createElement(_reactStripeJs.PaymentElement, null), /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    startIcon: /*#__PURE__*/_react["default"].createElement(_PaymentRounded["default"], null),
    type: "submit",
    fullWidth: true,
    variant: "contained",
    disabled: !stripe || isPaymentProcessing,
    sx: {
      marginTop: 2,
      padding: 2
    }
  }, payButtonText != null ? payButtonText : amount != null ? "Pay Now" : "Add Payment Method"), errorMessage && /*#__PURE__*/_react["default"].createElement("div", null, errorMessage));
};
function StripePayment(_ref3) {
  var _ref3$amount = _ref3.amount,
    amount = _ref3$amount === void 0 ? null : _ref3$amount,
    _ref3$priceId = _ref3.priceId,
    priceId = _ref3$priceId === void 0 ? null : _ref3$priceId,
    _ref3$stripeCustomerI = _ref3.stripeCustomerId,
    stripeCustomerId = _ref3$stripeCustomerI === void 0 ? null : _ref3$stripeCustomerI,
    logOffUserName = _ref3.logOffUserName,
    _ref3$invoiceId = _ref3.invoiceId,
    invoiceId = _ref3$invoiceId === void 0 ? null : _ref3$invoiceId,
    logOffEmail = _ref3.logOffEmail,
    _ref3$paymentMethodTy = _ref3.paymentMethodType,
    paymentMethodType = _ref3$paymentMethodTy === void 0 ? 3 : _ref3$paymentMethodTy,
    currentUser = _ref3.currentUser,
    onResponse = _ref3.onResponse,
    _ref3$payButtonText = _ref3.payButtonText,
    payButtonText = _ref3$payButtonText === void 0 ? null : _ref3$payButtonText;
  var stripePromise = (0, _stripeJs.loadStripe)(process.env.stripePublicKey);
  var _useState5 = (0, _react.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    options = _useState6[0],
    setOptions = _useState6[1];
  var _useState7 = (0, _react.useState)(null),
    _useState8 = _slicedToArray(_useState7, 2),
    walletId = _useState8[0],
    setWalletId = _useState8[1];
  var _useState9 = (0, _react.useState)(0),
    _useState10 = _slicedToArray(_useState9, 2),
    value = _useState10[0],
    setValue = _useState10[1];
  var _useState11 = (0, _react.useState)([]),
    _useState12 = _slicedToArray(_useState11, 2),
    paymentMethods = _useState12[0],
    setPaymentMethods = _useState12[1];
  var _useState13 = (0, _react.useState)(null),
    _useState14 = _slicedToArray(_useState13, 2),
    paymentMethod = _useState14[0],
    setPaymentMethod = _useState14[1];
  var paymentMethodOpened = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var response, responsePayments;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            response = null;
            if (!(currentUser == null)) {
              _context2.next = 7;
              break;
            }
            _context2.next = 4;
            return apiService().post("/Payment/ConnectCustomerNoAuth", {
              paymentMethodType: paymentMethodType,
              amount: amount,
              priceId: priceId,
              name: logOffUserName,
              email: logOffEmail,
              stripeCustomerId: stripeCustomerId
            });
          case 4:
            response = _context2.sent;
            _context2.next = 10;
            break;
          case 7:
            _context2.next = 9;
            return apiService().post("/Payment/ConnectCustomer", {
              paymentMethodType: paymentMethodType,
              amount: amount,
              priceId: priceId,
              stripeCustomerId: stripeCustomerId
            });
          case 9:
            response = _context2.sent;
          case 10:
            if (!(response != null && response.status == 200)) {
              _context2.next = 17;
              break;
            }
            setOptions({
              clientSecret: response.data.clientSecret
            });
            setWalletId(response.data.walletId);
            _context2.next = 15;
            return apiService().get("/Payment/GetPaymentMethods?paymentMethodType=" + paymentMethodType);
          case 15:
            responsePayments = _context2.sent;
            if (responsePayments != null && responsePayments.status == 200) {
              if (responsePayments.data.length > 0) {
                setValue(1);
              }
              setPaymentMethods(responsePayments.data);
            }
          case 17:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function paymentMethodOpened() {
      return _ref4.apply(this, arguments);
    };
  }();
  (0, _react.useEffect)(function () {
    paymentMethodOpened();
  }, []);
  var handleChange = function handleChange(event, newValue) {
    setValue(newValue);
  };
  function a11yProps(index) {
    return {
      id: "simple-tab-".concat(index),
      'aria-controls': "simple-tabpanel-".concat(index)
    };
  }
  var PaymentMethod = function PaymentMethod(_ref5) {
    var paymentMethod = _ref5.paymentMethod,
      clicked = _ref5.clicked;
    return /*#__PURE__*/_react["default"].createElement(_Box["default"], {
      fullWidth: true,
      sx: {
        height: 160,
        width: "100%",
        marginTop: 2,
        backgroundColor: "#2196F3",
        position: "relative",
        border: "1px solid #2196F3",
        borderRadius: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        cursor: "pointer"
      },
      onClick: function onClick() {
        clicked(paymentMethod.id);
      }
    }, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
      gutterBottom: true,
      variant: "body",
      component: "div",
      sx: {
        fontSize: 14,
        position: "absolute",
        left: 15,
        top: 10,
        color: "white"
      }
    }, paymentMethod.brand), /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
      gutterBottom: true,
      variant: "body",
      component: "div",
      sx: {
        verticalAlign: "middle",
        fontSize: 18,
        color: "white"
      }
    }, "* * * * \xA0 * * * * \xA0 * * * * \xA0 ", paymentMethod.last4), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
      container: true,
      spacing: 1,
      sx: {
        position: "absolute",
        bottom: 8,
        marginLeft: 0,
        width: "100%"
      }
    }, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
      item: true,
      xs: 12,
      sx: {
        textAlign: "right",
        paddingRight: 2
      }
    }, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
      gutterBottom: true,
      variant: "body",
      component: "div",
      sx: {
        fontSize: 12,
        marginLeft: 2,
        marginTop: 1,
        color: "#e9e9e9"
      }
    }, "EXPIRES"), /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
      gutterBottom: true,
      variant: "body",
      component: "div",
      sx: {
        fontSize: 12,
        marginLeft: 2,
        marginTop: "-9px",
        color: "white"
      }
    }, paymentMethod.expMonth, "/", paymentMethod.expYear))));
  };
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
    }, other), value === index && /*#__PURE__*/_react["default"].createElement(_Box["default"], {
      sx: {
        p: 3
      }
    }, /*#__PURE__*/_react["default"].createElement(_Typography["default"], null, children)));
  }
  var PaymentContent = function PaymentContent() {
    return /*#__PURE__*/_react["default"].createElement(_Box["default"], {
      sx: {
        width: '100%'
      }
    }, currentUser == null && /*#__PURE__*/_react["default"].createElement(_Box["default"], {
      mt: 4
    }, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
      container: true,
      spacing: 2
    }, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
      item: true,
      xs: 6
    }, /*#__PURE__*/_react["default"].createElement(_TextField["default"], {
      id: "outlined-basic",
      label: "First Name",
      variant: "outlined",
      fullWidth: true
    })), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
      item: true,
      xs: 6
    }, /*#__PURE__*/_react["default"].createElement(_TextField["default"], {
      id: "outlined-basic",
      label: "Last Name",
      variant: "outlined",
      fullWidth: true
    })), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
      item: true,
      xs: 12
    }, /*#__PURE__*/_react["default"].createElement(_TextField["default"], {
      id: "outlined-basic",
      label: "Email",
      variant: "outlined",
      fullWidth: true
    }))), options != null && process.env.stripePublicKey != null && /*#__PURE__*/_react["default"].createElement(_reactStripeJs.Elements, {
      stripe: stripePromise,
      options: options
    }, /*#__PURE__*/_react["default"].createElement(CheckoutForm, {
      payButtonText: payButtonText,
      invoiceId: invoiceId,
      clientSecret: options != null ? options.clientSecret : null,
      onResponse: onResponse,
      paymentMethodType: paymentMethodType,
      currentUser: currentUser,
      walletId: walletId,
      amount: amount
    }))), currentUser != null && /*#__PURE__*/_react["default"].createElement(_Box["default"], null, /*#__PURE__*/_react["default"].createElement(_Box["default"], {
      sx: {
        borderBottom: 1,
        borderColor: 'divider'
      }
    }, /*#__PURE__*/_react["default"].createElement(_Tabs["default"], {
      value: value,
      onChange: handleChange,
      "aria-label": "basic tabs example"
    }, /*#__PURE__*/_react["default"].createElement(_Tab["default"], _extends({
      label: "Add Payment Method"
    }, a11yProps(0))), paymentMethods.length > 0 && /*#__PURE__*/_react["default"].createElement(_Tab["default"], _extends({
      label: "Existing Payment Method"
    }, a11yProps(1))))), paymentMethods.length > 0 && /*#__PURE__*/_react["default"].createElement(TabPanel, {
      value: value,
      index: 1
    }, /*#__PURE__*/_react["default"].createElement(_Select["default"], {
      sx: {
        marginTop: 4
      },
      fullWidth: true,
      id: "demo-simple-select",
      value: paymentMethod,
      onChange: function onChange(val) {
        setPaymentMethod(val.target.value);
      }
    }, paymentMethods != null && paymentMethods.map(function (paymentMethod, index) {
      return /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
        key: index,
        value: paymentMethod.id,
        fullWidth: true,
        sx: {
          width: "100%"
        }
      }, /*#__PURE__*/_react["default"].createElement(PaymentMethod, {
        paymentMethod: paymentMethod,
        clicked: function clicked() {}
      }));
    })), amount != null && /*#__PURE__*/_react["default"].createElement(_Button["default"], {
      startIcon: /*#__PURE__*/_react["default"].createElement(_PaymentRounded["default"], null),
      type: "submit",
      variant: "contained",
      disabled: paymentMethod == null,
      sx: {
        marginTop: 2
      },
      onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var response, _response4;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (!(invoiceId != null)) {
                _context3.next = 7;
                break;
              }
              _context3.next = 3;
              return apiService().post("/Invoices/PayInvoice", {
                invoiceId: invoiceId,
                walletPaymentMethodId: paymentMethod
              });
            case 3:
              response = _context3.sent;
              if (response != null && response.status == 200) {
                onResponse("paid", null);
              }
              _context3.next = 11;
              break;
            case 7:
              _context3.next = 9;
              return apiService().post("/Payment/Charge", {
                paymentMethodType: paymentMethodType,
                walletPaymentMethodId: paymentMethod,
                amount: amount
              });
            case 9:
              _response4 = _context3.sent;
              if (_response4 != null && _response4.status == 200) {
                onResponse("paid", _response4.data.stripePaymentIntentId);
              }
            case 11:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }))
    }, payButtonText != null ? payButtonText : "Pay Now")), /*#__PURE__*/_react["default"].createElement(TabPanel, {
      value: value,
      index: 0
    }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_Box["default"], {
      mt: 4
    }, options != null && process.env.stripePublicKey != null && /*#__PURE__*/_react["default"].createElement(_reactStripeJs.Elements, {
      stripe: stripePromise,
      options: options
    }, /*#__PURE__*/_react["default"].createElement(CheckoutForm, {
      payButtonText: payButtonText,
      invoiceId: invoiceId,
      clientSecret: options != null ? options.clientSecret : null,
      onResponse: onResponse,
      paymentMethodType: paymentMethodType,
      walletId: walletId,
      currentUser: currentUser,
      amount: amount
    })))))));
  };
  return /*#__PURE__*/_react["default"].createElement(PaymentContent, null);
}
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YesNoDialog = YesNoDialog;
var _react = _interopRequireWildcard(require("react"));
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _Dialog = _interopRequireDefault(require("@mui/material/Dialog"));
var _DialogActions = _interopRequireDefault(require("@mui/material/DialogActions"));
var _DialogContent = _interopRequireDefault(require("@mui/material/DialogContent"));
var _DialogContentText = _interopRequireDefault(require("@mui/material/DialogContentText"));
var _DialogTitle = _interopRequireDefault(require("@mui/material/DialogTitle"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function YesNoDialog(_ref) {
  var open = _ref.open,
    title = _ref.title,
    message = _ref.message,
    _ref$yesText = _ref.yesText,
    yesText = _ref$yesText === void 0 ? "Yes" : _ref$yesText,
    _ref$noText = _ref.noText,
    noText = _ref$noText === void 0 ? "No" : _ref$noText,
    YesAction = _ref.YesAction,
    NoAction = _ref.NoAction;
  // Declare a new state variable, which we'll call "count"
  //const [count, setCount] = useState(0);

  return /*#__PURE__*/_react["default"].createElement(_Dialog["default"], {
    open: open,
    onClose: NoAction,
    "aria-labelledby": "alert-dialog-title",
    "aria-describedby": "alert-dialog-description"
  }, /*#__PURE__*/_react["default"].createElement(_DialogTitle["default"], {
    id: "alert-dialog-title"
  }, title), /*#__PURE__*/_react["default"].createElement(_DialogContent["default"], null, /*#__PURE__*/_react["default"].createElement(_DialogContentText["default"], {
    id: "alert-dialog-description"
  }, message)), /*#__PURE__*/_react["default"].createElement(_DialogActions["default"], null, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    onClick: NoAction
  }, noText), /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    onClick: YesAction,
    autoFocus: true
  }, yesText)));
}
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConversionEvents = ConversionEvents;
exports.init = init;
exports.logConvertion = logConvertion;
exports.logEvent = logEvent;
exports.logPageView = logPageView;
exports.logPageViews = logPageViews;
exports.logPurchase = logPurchase;
var _router = _interopRequireDefault(require("next/router"));
var _ga4React = _interopRequireDefault(require("ga-4-react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var ga4react;
function init(_x) {
  return _init.apply(this, arguments);
}
function _init() {
  _init = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(G) {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (!(!_ga4React["default"].isInitialized() && G && process.browser)) {
            _context3.next = 11;
            break;
          }
          ga4react = new _ga4React["default"](G, {
            debug_mode: !process.env.production
          });
          _context3.prev = 2;
          _context3.next = 5;
          return ga4react.initialize();
        case 5:
          logPageViews();
          _context3.next = 11;
          break;
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](2);
          console.error(_context3.t0);
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[2, 8]]);
  }));
  return _init.apply(this, arguments);
}
function logPageView() {
  if (ga4react != null) {
    ga4react.pageview(window.location.pathname);
  }
  if (process.env.databaseAnalytics) {
    var executePageView = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return apiService().post("/PageContent/PageView", {
                Uri: window.location.pathname + window.location.search,
                Referral: document.referrer,
                host: window.location.host
              });
            case 3:
              _context.next = 7;
              break;
            case 5:
              _context.prev = 5;
              _context.t0 = _context["catch"](0);
            case 7:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 5]]);
      }));
      return function executePageView() {
        return _ref.apply(this, arguments);
      };
    }();
    executePageView();
  }
}
function logPageViews() {
  if (ga4react != null) {
    logPageView();
    _router["default"].events.on('routeChangeComplete', function () {
      logPageView();
    });
  }
}
function logEvent(category, action, label) {
  //if (ga4react != null)
  //{
  ga4react.event(action, label, category);
  //}

  if (process.env.databaseAnalytics) {
    var executePageEvent = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return apiService().post("/PageContent/PageEvent", {
                Category: category,
                Action: action,
                label: label,
                host: window.location.host,
                Uri: window.location.pathname + window.location.search
              });
            case 3:
              _context2.next = 7;
              break;
            case 5:
              _context2.prev = 5;
              _context2.t0 = _context2["catch"](0);
            case 7:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 5]]);
      }));
      return function executePageEvent() {
        return _ref2.apply(this, arguments);
      };
    }();
    executePageEvent();
  }
}
function logPurchase(transactionId, amount, tax, items) {
  if (ga4react != null) {
    ga4react.gtag("event", "purchase", {
      transaction_id: transactionId,
      value: amount,
      tax: tax,
      currency: "USD",
      items: items
    });
  }
}
function logConvertion(transactionId, amount, tax, items) {
  if (ga4react != null) {
    ga4react.gtag("event", "purchase", {
      transaction_id: transactionId,
      value: amount,
      tax: tax,
      currency: "USD",
      items: items
    });
  }
}
function ConversionEvents(conversionName, payload) {
  if (ga4react != null) {
    ga4react.gtag("event", conversionName, payload);
  }
}
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiService = void 0;
var _axios = _interopRequireDefault(require("axios"));
var _queryString = _interopRequireDefault(require("query-string"));
var _jsFileDownload = _interopRequireDefault(require("js-file-download"));
var _jsCookie = _interopRequireDefault(require("js-cookie"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var setupDefaultOptions = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var ctx,
      defaultOptions,
      accessToken,
      _args = arguments;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          ctx = _args.length > 0 && _args[0] !== undefined ? _args[0] : null;
          defaultOptions = {};
          if (ctx == null) {
            accessToken = _jsCookie["default"].get('access_token') || '';
            if (accessToken !== null && accessToken !== undefined && accessToken != "") {
              defaultOptions = {
                headers: {
                  Authorization: "Bearer " + accessToken
                }
              };
            } else {
              defaultOptions = {
                headers: {}
              };
            }
          } else {
            defaultOptions = {
              headers: {}
            };
          }
          return _context.abrupt("return", defaultOptions);
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function setupDefaultOptions() {
    return _ref.apply(this, arguments);
  };
}();
var RefreshToken = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(originalRequest, instance) {
    var accessToken, refreshToken, response, domainHost;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          accessToken = _jsCookie["default"].get('access_token') || '';
          refreshToken = _jsCookie["default"].get('refresh_token') || '';
          _context2.next = 4;
          return instance.post(process.env.authorityUri + "/connect/token", _queryString["default"].stringify({
            grant_type: 'refresh_token',
            client_id: process.env.client_id,
            client_secret: process.env.client_secret,
            refresh_token: refreshToken
          }), {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": "Bearer " + accessToken
            }
          });
        case 4:
          response = _context2.sent;
          if (!(response != null && response.status == 200)) {
            _context2.next = 14;
            break;
          }
          domainHost = window.location.hostname.split('.').slice(-2).join('.');
          originalRequest.headers['Authorization'] = 'Bearer ' + response.data.access_token;
          _context2.next = 10;
          return setCookie('access_token', response.data.access_token, {
            maxAge: 60 * 60 * 24 * 365,
            // 1 year,
            path: '/',
            domain: domainHost,
            secure: true
          });
        case 10:
          _context2.next = 12;
          return setCookie('expires_in', response.data.expires_in, {
            maxAge: 60 * 60 * 24 * 365,
            // 1 year,
            path: '/',
            domain: domainHost,
            secure: true
          });
        case 12:
          _context2.next = 14;
          return setCookie('refresh_token', response.data.refresh_token, {
            maxAge: 60 * 60 * 24 * 365,
            // 1 year,
            path: '/',
            domain: domainHost,
            secure: true
          });
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function RefreshToken(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();
var apiService = function apiService() {
  var ctx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var env = process.env.stage;
  if (env == "development") {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  }
  var baseUri = process.env.apiUri + "/api";
  var instance = _axios["default"].create({
    baseURL: baseUri,
    //timeout: 10000,
    params: {} // do not remove this, its added to add params later in the config
  });

  instance.interceptors.response.use(function (response) {
    return response;
  }, /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(error) {
      var originalConfig, domainHost;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            originalConfig = error.config;
            if (!error.response) {
              _context3.next = 10;
              break;
            }
            if (!(error.response.status === 401 && !originalConfig._retry)) {
              _context3.next = 7;
              break;
            }
            originalConfig._retry = true;

            // Do something, call refreshToken() request for example;
            _context3.next = 6;
            return RefreshToken(originalConfig, instance);
          case 6:
            return _context3.abrupt("return", instance.request(originalConfig));
          case 7:
            if (!(error.response.status === 400)) {
              _context3.next = 10;
              break;
            }
            // Do something 

            if (error.response.config.url.includes("/connect/token"))
              // remove the access and refresh if invalid
              {
                domainHost = window.location.hostname.split('.').slice(-2).join('.');
                _jsCookie["default"].remove('access_token', {
                  path: '/',
                  domain: domainHost
                });
                _jsCookie["default"].remove('refresh_token', {
                  path: '/',
                  domain: domainHost
                });
                _jsCookie["default"].remove('expires_in', {
                  path: '/',
                  domain: domainHost
                });

                // destroyCookie(null, "access_token", {
                //     maxAge: 2147483647,
                //     path: '/',
                //     domain: domainHost
                // });

                // destroyCookie(null, "refresh_token", {
                //     maxAge: 2147483647,
                //     path: '/',
                //     domain: domainHost
                // });

                // destroyCookie(null, "expires_in", {
                //     maxAge: 2147483647,
                //     path: '/',
                //     domain: domainHost
                // });
              }
            return _context3.abrupt("return", Promise.reject(error));
          case 10:
            return _context3.abrupt("return", Promise.reject(error));
          case 11:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }());
  return {
    get: function () {
      var _get = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(url) {
        var options,
          defaultOptions,
          _args4 = arguments;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
              _context4.prev = 1;
              _context4.next = 4;
              return setupDefaultOptions(ctx);
            case 4:
              defaultOptions = _context4.sent;
              _context4.next = 7;
              return instance.get(url, _objectSpread(_objectSpread({}, defaultOptions), options));
            case 7:
              return _context4.abrupt("return", _context4.sent);
            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4["catch"](1);
              return _context4.abrupt("return", _context4.t0.response);
            case 13:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[1, 10]]);
      }));
      function get(_x4) {
        return _get.apply(this, arguments);
      }
      return get;
    }(),
    post: function () {
      var _post = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(url, data) {
        var options,
          defaultOptions,
          _args5 = arguments;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              options = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {};
              _context5.prev = 1;
              _context5.next = 4;
              return setupDefaultOptions(ctx);
            case 4:
              defaultOptions = _context5.sent;
              _context5.next = 7;
              return instance.post(url, data, _objectSpread(_objectSpread({}, defaultOptions), options));
            case 7:
              return _context5.abrupt("return", _context5.sent);
            case 10:
              _context5.prev = 10;
              _context5.t0 = _context5["catch"](1);
              return _context5.abrupt("return", _context5.t0.response);
            case 13:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[1, 10]]);
      }));
      function post(_x5, _x6) {
        return _post.apply(this, arguments);
      }
      return post;
    }(),
    put: function () {
      var _put = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(url, data) {
        var options,
          defaultOptions,
          _args6 = arguments;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              options = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : {};
              _context6.prev = 1;
              _context6.next = 4;
              return setupDefaultOptions(ctx);
            case 4:
              defaultOptions = _context6.sent;
              _context6.next = 7;
              return instance.put(url, data, _objectSpread(_objectSpread({}, defaultOptions), options));
            case 7:
              return _context6.abrupt("return", _context6.sent);
            case 10:
              _context6.prev = 10;
              _context6.t0 = _context6["catch"](1);
              return _context6.abrupt("return", _context6.t0.response);
            case 13:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[1, 10]]);
      }));
      function put(_x7, _x8) {
        return _put.apply(this, arguments);
      }
      return put;
    }(),
    "delete": function () {
      var _delete2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(url) {
        var options,
          defaultOptions,
          _args7 = arguments;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              options = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
              _context7.prev = 1;
              _context7.next = 4;
              return setupDefaultOptions(ctx);
            case 4:
              defaultOptions = _context7.sent;
              _context7.next = 7;
              return instance["delete"](url, _objectSpread(_objectSpread({}, defaultOptions), options));
            case 7:
              return _context7.abrupt("return", _context7.sent);
            case 10:
              _context7.prev = 10;
              _context7.t0 = _context7["catch"](1);
              return _context7.abrupt("return", _context7.t0.response);
            case 13:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[1, 10]]);
      }));
      function _delete(_x9) {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }(),
    GetCurrentUser: function () {
      var _GetCurrentUser = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
        var accessToken, defaultOptions, response;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              accessToken = _jsCookie["default"].get('access_token') || null;
              if (!accessToken) {
                _context8.next = 11;
                break;
              }
              _context8.next = 5;
              return setupDefaultOptions(null);
            case 5:
              defaultOptions = _context8.sent;
              _context8.next = 8;
              return instance.get('/UserManagement', defaultOptions);
            case 8:
              response = _context8.sent;
              if (!(response != null && response.status == 200)) {
                _context8.next = 11;
                break;
              }
              return _context8.abrupt("return", response.data);
            case 11:
              _context8.next = 16;
              break;
            case 13:
              _context8.prev = 13;
              _context8.t0 = _context8["catch"](0);
              //return -1;
              console.log(_context8.t0.message);
            case 16:
              return _context8.abrupt("return", null);
            case 17:
            case "end":
              return _context8.stop();
          }
        }, _callee8, null, [[0, 13]]);
      }));
      function GetCurrentUser() {
        return _GetCurrentUser.apply(this, arguments);
      }
      return GetCurrentUser;
    }(),
    DownloadFile: function () {
      var _DownloadFile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(url, fileName, completed) {
        var method,
          data,
          mimeType,
          passData,
          defaultOptions,
          options,
          response,
          _args9 = arguments;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              method = _args9.length > 3 && _args9[3] !== undefined ? _args9[3] : "get";
              data = _args9.length > 4 && _args9[4] !== undefined ? _args9[4] : {};
              mimeType = _args9.length > 5 && _args9[5] !== undefined ? _args9[5] : "application/octet-stream";
              passData = _args9.length > 6 && _args9[6] !== undefined ? _args9[6] : false;
              _context9.prev = 4;
              //let defaultOptions = await setupDefaultOptions();
              defaultOptions = {};
              options = {
                responseType: "blob"
              };
              response = null;
              if (!(method == "get")) {
                _context9.next = 14;
                break;
              }
              _context9.next = 11;
              return instance.get(url, _objectSpread(_objectSpread({}, defaultOptions), options));
            case 11:
              response = _context9.sent;
              _context9.next = 18;
              break;
            case 14:
              if (!(method == "post")) {
                _context9.next = 18;
                break;
              }
              _context9.next = 17;
              return instance.post(url, data, _objectSpread(_objectSpread({}, defaultOptions), options));
            case 17:
              response = _context9.sent;
            case 18:
              if (response != null && response.status === 200) {
                if (!passData) {
                  (0, _jsFileDownload["default"])(response.data, fileName, mimeType);
                  if (completed !== undefined) {
                    completed();
                  }
                } else {
                  completed(response.data);
                }
              }
              _context9.next = 25;
              break;
            case 21:
              _context9.prev = 21;
              _context9.t0 = _context9["catch"](4);
              console.error(_context9.t0);
              if (completed !== undefined) {
                completed();
              }
            case 25:
            case "end":
              return _context9.stop();
          }
        }, _callee9, null, [[4, 21]]);
      }));
      function DownloadFile(_x10, _x11, _x12) {
        return _DownloadFile.apply(this, arguments);
      }
      return DownloadFile;
    }()
  };
};
exports.apiService = apiService;
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthorizationComponent = AuthorizationComponent;
var _react = _interopRequireWildcard(require("react"));
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
//import apiService from './apiService';

function AuthorizationComponent(_ref) {
  var children = _ref.children,
    isEnabled = _ref.isEnabled,
    setCurrentUser = _ref.setCurrentUser,
    userLoaded = _ref.userLoaded,
    isLoading = _ref.isLoading;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    loaded = _useState2[0],
    setLoaded = _useState2[1];
  var validateUserSignedIn = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var signedInUser, usr;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            setLoaded(true);
            signedInUser = null;
            if (!isEnabled) {
              _context.next = 9;
              break;
            }
            _context.next = 5;
            return apiService().GetCurrentUser();
          case 5:
            usr = _context.sent;
            if (usr != null) {
              setCurrentUser(usr);
              signedInUser = usr;
            } else {
              setCurrentUser(null);
            }
            _context.next = 10;
            break;
          case 9:
            setCurrentUser(null);
          case 10:
            userLoaded(signedInUser);
          case 11:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function validateUserSignedIn() {
      return _ref2.apply(this, arguments);
    };
  }();
  (0, _react.useEffect)(function () {
    if (!loaded) {
      validateUserSignedIn();
    }
  }, [loaded]);
  return children;
}
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authService = void 0;
var _react = _interopRequireDefault(require("react"));
var _jsCookie = _interopRequireDefault(require("js-cookie"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var authService = function authService() {
  return {
    dec2hex: function dec2hex(dec) {
      return ('0' + dec.toString(16)).substr(-2);
    },
    generateRandomString: function generateRandomString() {
      var array = new Uint32Array(56 / 2);
      window.crypto.getRandomValues(array);
      return Array.from(array, authService().dec2hex).join('');
    },
    sha256: function sha256(plain) {
      var encoder = new TextEncoder();
      var data = encoder.encode(plain);
      return window.crypto.subtle.digest('SHA-256', data);
    },
    base64urlencode: function base64urlencode(a) {
      var str = "";
      var bytes = new Uint8Array(a);
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
        str += String.fromCharCode(bytes[i]);
      }
      return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    },
    challenge_from_verifier: function () {
      var _challenge_from_verifier = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(v) {
        var hashed, base64encoded;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return authService().sha256(v);
            case 2:
              hashed = _context.sent;
              base64encoded = authService().base64urlencode(hashed);
              return _context.abrupt("return", base64encoded);
            case 5:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function challenge_from_verifier(_x) {
        return _challenge_from_verifier.apply(this, arguments);
      }
      return challenge_from_verifier;
    }(),
    inviteUsers: function () {
      var _inviteUsers = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(inviteRequests) {
        var host, response;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              host = window.location.protocol + "//" + window.location.host;
              _context2.next = 3;
              return apiService().post(process.env.authorityUri + "/Invite/InviteUsers", {
                requests: inviteRequests,
                host: host
              });
            case 3:
              response = _context2.sent;
              return _context2.abrupt("return", response);
            case 5:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function inviteUsers(_x2) {
        return _inviteUsers.apply(this, arguments);
      }
      return inviteUsers;
    }(),
    inviteUser: function () {
      var _inviteUser = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(inviteRequest) {
        var inviteRequests, host, response;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              inviteRequests = [];
              inviteRequests.push(inviteRequest);
              host = window.location.protocol + "//" + window.location.host;
              _context3.next = 5;
              return apiService().post(process.env.authorityUri + "/Invite/InviteUsers", {
                requests: inviteRequests,
                host: host
              });
            case 5:
              response = _context3.sent;
              return _context3.abrupt("return", response);
            case 7:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function inviteUser(_x3) {
        return _inviteUser.apply(this, arguments);
      }
      return inviteUser;
    }(),
    login: function () {
      var _login = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var redirectUserUri,
          dnsRecord,
          deviceId,
          state,
          verifier,
          challenge,
          redirectUri,
          loginUri,
          _args4 = arguments;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              redirectUserUri = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : null;
              dnsRecord = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : null;
              deviceId = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : null;
              state = "1234";
              if (redirectUserUri != null) {
                localStorage.setItem("redirectUri", redirectUserUri);
              }
              verifier = authService().generateRandomString();
              _context4.next = 8;
              return authService().challenge_from_verifier(verifier);
            case 8:
              challenge = _context4.sent;
              window.localStorage.setItem("verifier", verifier);
              redirectUri = window.location.origin + "/signin-oidc";
              loginUri = process.env.authorityUri + "/connect/authorize?response_type=code&state=" + state + "&client_id=" + process.env.client_id + "&scope=email%20openid%20offline_access%20profile%20api1&redirect_uri=" + redirectUri + "&code_challenge=" + challenge + "&code_challenge_method=S256";
              if (deviceId) {
                loginUri += "&deviceId=" + deviceId; // will be for chrome extention and mobile apps later
              }

              window.location.href = loginUri;
            case 14:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      function login() {
        return _login.apply(this, arguments);
      }
      return login;
    }(),
    signUp: function signUp() {
      var redirectUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var AuthUri = process.env.authorityUri;
      var url = "";
      if (redirectUrl == null) {
        url = AuthUri + "/Identity/Account/Register?returnUrl=" + window.location.href;
        localStorage.setItem("redirectUri", window.location.href);
      } else {
        url = AuthUri + "/Identity/Account/Register?returnUrl=" + redirectUrl;
        localStorage.setItem("redirectUri", redirectUrl);
      }
      window.location.href = url;
    },
    manageAccount: function () {
      var _manageAccount = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              window.location.href = process.env.authorityUri + "/Identity/Account/Manage";
            case 1:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      function manageAccount() {
        return _manageAccount.apply(this, arguments);
      }
      return manageAccount;
    }(),
    logout: function () {
      var _logout = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        var redirectUri,
          domainHost,
          AuthUri,
          _args6 = arguments;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              redirectUri = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : null;
              domainHost = window.location.hostname.split('.').slice(-2).join('.');
              AuthUri = process.env.authorityUri;
              _jsCookie["default"].remove('access_token', {
                path: '/',
                domain: domainHost
              });
              _jsCookie["default"].remove('refresh_token', {
                path: '/',
                domain: domainHost
              });
              _jsCookie["default"].remove('expires_in', {
                path: '/',
                domain: domainHost
              });

              // destroyCookie({}, "access_token", {
              //     maxAge: 2147483647,
              //     path: '/',
              //     domain: domainHost
              // });

              // destroyCookie({}, "refresh_token", {
              //     maxAge: 2147483647,
              //     path: '/',
              //     domain: domainHost
              // });

              // destroyCookie({}, "expires_in", {
              //     maxAge: 2147483647,
              //     path: '/',
              //     domain: domainHost
              // });

              setTimeout(function () {
                if (redirectUri == null) {
                  window.location.href = AuthUri + "/connect/logout?redirect=" + window.location.href;
                } else {
                  window.location.href = AuthUri + "/connect/logout?redirect=" + redirectUri;
                }
              }, 500);
            case 7:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }));
      function logout() {
        return _logout.apply(this, arguments);
      }
      return logout;
    }()
  };
};
exports.authService = authService;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderRecords = HeaderRecords;
exports.PrivateLabelPageModule = PrivateLabelPageModule;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function PrivateLabelPageModule(_x, _x2) {
  return _PrivateLabelPageModule.apply(this, arguments);
}
function _PrivateLabelPageModule() {
  _PrivateLabelPageModule = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(apiUri, host) {
    var data, response;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          data = {};
          if (host.includes("localhost")) {
            host = "http://" + host;
          } else {
            host = "https://" + host;
          }
          _context.next = 4;
          return fetch(apiUri + "/api/PrivateLabel/GetCompanyIdFromDomain?domain=" + host);
        case 4:
          response = _context.sent;
          if (!(response.status == 200)) {
            _context.next = 10;
            break;
          }
          _context.next = 8;
          return response.json();
        case 8:
          data = _context.sent;
          if (data != null) {
            if (data.companyId != null) {
              data.oemCompanyId = data.companyId;
            }
            if (data.demoCompanyId != null) {
              data.demoId = data.demoCompanyId;
            }
            if (data.favIcon != null) {
              data.favIcon = data.favIcon;
            }
            if (data.companyName != null) {
              data.companyName = data.companyName;
            }
          }
        case 10:
          return _context.abrupt("return", data);
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _PrivateLabelPageModule.apply(this, arguments);
}
function HeaderRecords(_ref) {
  var pageProps = _ref.pageProps;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, pageProps != null && pageProps.oemCompanyId != null && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("link", {
    href: process.env.apiUri + "/api/PrivateLabel/GetDataFromRecord?oemCompanyId=" + pageProps.oemCompanyId,
    rel: "stylesheet"
  })));
}
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signInValidator = void 0;
var _react = _interopRequireWildcard(require("react"));
var _axios = _interopRequireDefault(require("axios"));
var _queryString = _interopRequireDefault(require("query-string"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// import Cookies from 'js-cookie';

var signInValidator = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(queryCode) {
    var codeVerifier, headers, queryString, response, domainHost, redirectUri;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          codeVerifier = window.localStorage.getItem("verifier");
          if (!(queryCode != null && codeVerifier != null)) {
            _context.next = 18;
            break;
          }
          headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
          };
          queryString = _queryString["default"].stringify({
            code: queryCode,
            grant_type: "authorization_code",
            redirect_uri: window.location.origin + "/signin-oidc",
            client_id: process.env.client_id,
            client_secret: process.env.client_secret,
            code_verifier: codeVerifier
          });
          _context.next = 6;
          return _axios["default"].post(process.env.authorityUri + '/connect/token', queryString, {
            headers: headers
          });
        case 6:
          response = _context.sent;
          domainHost = window.location.hostname.split('.').slice(-2).join('.');
          window.localStorage.removeItem("verifier");
          _context.next = 11;
          return setCookie('access_token', response.data.access_token, {
            maxAge: 60 * 60 * 24 * 365,
            // 1 year,
            path: '/',
            domain: domainHost,
            secure: true
          });
        case 11:
          _context.next = 13;
          return setCookie('expires_in', response.data.expires_in, {
            maxAge: 60 * 60 * 24 * 365,
            // 1 year,
            path: '/',
            domain: domainHost,
            secure: true
          });
        case 13:
          _context.next = 15;
          return setCookie('refresh_token', response.data.refresh_token, {
            maxAge: 60 * 60 * 24 * 365,
            // 1 year,
            path: '/',
            domain: domainHost,
            secure: true
          });
        case 15:
          // await setCookie(null, "access_token", response.data.access_token,
          // {
          //     maxAge: 2147483647,
          //     path: '/',
          //     domain: domainHost,
          //     secure: true
          // });
          // await setCookie(null, "expires_in", response.data.expires_in,
          // {
          //     maxAge: 2147483647,
          //     path: '/',
          //     domain: domainHost,
          //     secure: true
          // });
          // await setCookie(null, "refresh_token", response.data.refresh_token,
          // {
          //     maxAge: 2147483647,
          //     path: '/',
          //     domain: domainHost,
          //     secure: true
          // });
          redirectUri = localStorage.getItem("redirectUri");
          localStorage.clear();
          if (redirectUri != null) {
            window.location.href = redirectUri;
          } else {
            window.location.href = "/";
          }
        case 18:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function signInValidator(_x) {
    return _ref.apply(this, arguments);
  };
}();
exports.signInValidator = signInValidator;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slug = void 0;
var Slug = function Slug(slug) {
  var index = slug.lastIndexOf("-") + 1;
  if (slug.length > index) {
    slug = slug.substr(index);
    return slug;
  }
  return null;
};
exports.Slug = Slug;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storeWithExpiry = void 0;
var storeWithExpiry = function storeWithExpiry() {
  return {
    set: function set(key, value, ttl) {
      var now = new Date();
      var item = {
        value: value,
        expiry: now.getTime() + ttl
      };
      localStorage.setItem(key, JSON.stringify(item));
    },
    get: function get(key) {
      var itemStr = localStorage.getItem(key);
      if (!itemStr) {
        return null;
      }
      var item = JSON.parse(itemStr);
      var now = new Date();
      if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
      }
      return item.value;
    }
  };
};
exports.storeWithExpiry = storeWithExpiry;
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCookie = exports.GetBaseUrl = void 0;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var GetBaseUrl = function GetBaseUrl() {
  return window.location.protocol + "//" + window.location.host;
};
exports.GetBaseUrl = GetBaseUrl;
var setCookie = function setCookie(name, value) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return new Promise(function (resolve) {
    var cookieString = "".concat(name, "=").concat(value, ";");
    if (options.maxAge) {
      cookieString += "max-age=".concat(options.maxAge, ";");
    }
    if (options.path) {
      cookieString += "path=".concat(options.path, ";");
    }
    if (options.domain) {
      cookieString += "domain=".concat(options.domain, ";");
    }
    if (options.secure) {
      cookieString += "secure;";
    }
    document.cookie = cookieString;
    resolve();
  });
};
exports.setCookie = setCookie;
