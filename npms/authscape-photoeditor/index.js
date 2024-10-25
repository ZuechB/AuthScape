"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Action = void 0;
var _react = _interopRequireWildcard(require("react"));
var _excluded = ["active", "className", "cursor", "icon", "style"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
// import classNames from 'classnames';

var Action = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var active = _ref.active,
    className = _ref.className,
    cursor = _ref.cursor,
    icon = _ref.icon,
    style = _ref.style,
    props = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/_react["default"].createElement("button", _extends({
    ref: ref
  }, props, {
    className: "Action",
    tabIndex: 0,
    style: _objectSpread(_objectSpread({}, style), {}, {
      cursor: cursor,
      '--fill': active === null || active === void 0 ? void 0 : active.fill,
      '--background': active === null || active === void 0 ? void 0 : active.background
    })
  }), icon());
});
exports.Action = Action;
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Container = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _excluded = ["children", "columns", "handleProps", "horizontal", "hover", "onClick", "containerStyles", "onRemove", "label", "placeholder", "style", "scrollable", "shadow", "disableHandle", "disableDelete", "unstyled"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
/// use in testing
// import { Handle } from './Handle';
// import { Remove } from './Remove';

var Container = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var children = _ref.children,
    _ref$columns = _ref.columns,
    columns = _ref$columns === void 0 ? 1 : _ref$columns,
    handleProps = _ref.handleProps,
    horizontal = _ref.horizontal,
    hover = _ref.hover,
    onClick = _ref.onClick,
    containerStyles = _ref.containerStyles,
    onRemove = _ref.onRemove,
    label = _ref.label,
    placeholder = _ref.placeholder,
    style = _ref.style,
    scrollable = _ref.scrollable,
    shadow = _ref.shadow,
    _ref$disableHandle = _ref.disableHandle,
    disableHandle = _ref$disableHandle === void 0 ? false : _ref$disableHandle,
    _ref$disableDelete = _ref.disableDelete,
    disableDelete = _ref$disableDelete === void 0 ? false : _ref$disableDelete,
    unstyled = _ref.unstyled,
    props = _objectWithoutProperties(_ref, _excluded);
  var Component = onClick ? 'button' : 'div';
  return /*#__PURE__*/_react["default"].createElement(Component, _extends({}, props, {
    ref: ref,
    style: _objectSpread(_objectSpread({}, style), {}, {
      '--columns': columns
    }),
    className: (0, _classnames["default"])(containerStyles.Container, unstyled && containerStyles.unstyled, horizontal && containerStyles.horizontal, hover && containerStyles.hover, placeholder && containerStyles.placeholder, scrollable && containerStyles.scrollable, shadow && containerStyles.shadow),
    onClick: onClick,
    tabIndex: onClick ? 0 : undefined
  }), label ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "Header"
  }, label, /*#__PURE__*/_react["default"].createElement("div", {
    className: "Actions"
  }, !disableDelete && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, onRemove ? /*#__PURE__*/_react["default"].createElement(Remove, {
    onClick: onRemove
  }) : undefined), !disableHandle && /*#__PURE__*/_react["default"].createElement(Handle, handleProps))) : null, placeholder ? children : /*#__PURE__*/_react["default"].createElement("ul", {
    style: {
      paddingLeft: "10px",
      paddingRight: "10px",
      marginTop: "5px"
    }
  }, children));
});
exports.Container = Container;
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRange = createRange;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function createRange(length, initializer) {
  return _toConsumableArray(new Array(length)).map(function (_, index) {
    return initializer(index);
  });
}
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Handle = void 0;
var _react = _interopRequireWildcard(require("react"));
var _DragIndicatorRounded = _interopRequireDefault(require("@mui/icons-material/DragIndicatorRounded"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
/// use in testing
// import {Action} from './Action';
var dragIcon = function dragIcon() {
  return /*#__PURE__*/_react["default"].createElement(_DragIndicatorRounded["default"], null);
};
var Handle = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
  return /*#__PURE__*/_react["default"].createElement(Action, _extends({
    icon: dragIcon,
    ref: ref,
    cursor: "grab",
    "data-cypress": "draggable-handle"
  }, props));
});
exports.Handle = Handle;
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Item = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _material = require("@mui/material");
var _excluded = ["color", "dragOverlay", "dragging", "disabled", "fadeIn", "name", "handle", "handleProps", "height", "itemStyles", "cardDetail", "CardTemplate", "index", "listeners", "onRemove", "onCardClicked", "renderItem", "sorting", "style", "transition", "transform", "value", "handleMoreClick", "handleMoreClose", "wrapperStyle"]; /// use in testing
// import { Handle } from './Handle';
// import { Remove } from './Remove';
// import styles from './dist/Item.module.css';
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var Item = /*#__PURE__*/_react["default"].memo( /*#__PURE__*/_react["default"].forwardRef(function (_ref, ref) {
  var color = _ref.color,
    dragOverlay = _ref.dragOverlay,
    dragging = _ref.dragging,
    disabled = _ref.disabled,
    fadeIn = _ref.fadeIn,
    name = _ref.name,
    handle = _ref.handle,
    handleProps = _ref.handleProps,
    height = _ref.height,
    itemStyles = _ref.itemStyles,
    cardDetail = _ref.cardDetail,
    CardTemplate = _ref.CardTemplate,
    index = _ref.index,
    listeners = _ref.listeners,
    onRemove = _ref.onRemove,
    onCardClicked = _ref.onCardClicked,
    renderItem = _ref.renderItem,
    sorting = _ref.sorting,
    style = _ref.style,
    transition = _ref.transition,
    transform = _ref.transform,
    value = _ref.value,
    handleMoreClick = _ref.handleMoreClick,
    handleMoreClose = _ref.handleMoreClose,
    wrapperStyle = _ref.wrapperStyle,
    props = _objectWithoutProperties(_ref, _excluded);
  (0, _react.useEffect)(function () {
    if (!dragOverlay) {
      return;
    }
    document.body.style.cursor = 'grabbing';
    return function () {
      document.body.style.cursor = '';
    };
  }, [dragOverlay]);
  cardDetail.moreClicked = handleMoreClick;
  return renderItem ? renderItem({
    dragOverlay: Boolean(dragOverlay),
    dragging: Boolean(dragging),
    sorting: Boolean(sorting),
    index: index,
    fadeIn: Boolean(fadeIn),
    listeners: listeners,
    ref: ref,
    style: style,
    transform: transform,
    transition: transition,
    value: value
  }) : /*#__PURE__*/_react["default"].createElement("li", {
    className: (0, _classnames["default"])(itemStyles.Wrapper, fadeIn && itemStyles.fadeIn, sorting && itemStyles.sorting, dragOverlay && itemStyles.dragOverlay),
    style: _objectSpread(_objectSpread({}, wrapperStyle), {}, {
      transition: [transition, wrapperStyle === null || wrapperStyle === void 0 ? void 0 : wrapperStyle.transition].filter(Boolean).join(', '),
      '--translate-x': transform ? "".concat(Math.round(transform.x), "px") : undefined,
      '--translate-y': transform ? "".concat(Math.round(transform.y), "px") : undefined,
      '--scale-x': transform !== null && transform !== void 0 && transform.scaleX ? "".concat(transform.scaleX) : undefined,
      '--scale-y': transform !== null && transform !== void 0 && transform.scaleY ? "".concat(transform.scaleY) : undefined,
      '--index': index,
      '--color': color,
      paddingTop: "10px"
    }),
    ref: ref
  }, /*#__PURE__*/_react["default"].createElement(_material.Box, _extends({
    className: (0, _classnames["default"])(itemStyles.Item, dragging && itemStyles.dragging, handle && itemStyles.withHandle, dragOverlay && itemStyles.dragOverlay, disabled && itemStyles.disabled, color && itemStyles.color),
    onClick: function onClick(e) {
      if (onCardClicked != null) {
        e.stopPropagation();
        onCardClicked(value);
      }
    },
    style: style,
    "data-cypress": "draggable-item"
  }, !handle ? listeners : undefined, props, {
    tabIndex: !handle ? 0 : undefined
  }), CardTemplate != null && /*#__PURE__*/_react["default"].createElement(CardTemplate, {
    props: cardDetail
  }), CardTemplate == null && /*#__PURE__*/_react["default"].createElement(_material.Box, null, name), /*#__PURE__*/_react["default"].createElement("span", {
    className: "Actions"
  }, onRemove ? /*#__PURE__*/_react["default"].createElement(Remove, {
    className: "Remove",
    onClick: onRemove
  }) : null, handle ? /*#__PURE__*/_react["default"].createElement(Handle, _extends({}, handleProps, listeners)) : null)));
}));
exports.Item = Item;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TRASH_ID = void 0;
exports["default"] = Kanban;
var _react = _interopRequireWildcard(require("react"));
var _reactDom = require("react-dom");
var _core = require("@dnd-kit/core");
var _sortable = require("@dnd-kit/sortable");
var _utilities = require("@dnd-kit/utilities");
var _authscape = require("authscape");
var _material = require("@mui/material");
var _excluded = ["children", "columns", "disabled", "id", "containerStyles", "items", "disableHandle", "disableDelete", "style"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } /// use in testing
// import {coordinateGetter as multipleContainersCoordinateGetter} from './multipleContainersKeyboardCoordinates';
// import { Item } from './item';
// import { Container } from './container';
var animateLayoutChanges = function animateLayoutChanges(args) {
  return (0, _sortable.defaultAnimateLayoutChanges)(_objectSpread(_objectSpread({}, args), {}, {
    wasDragging: true
  }));
};
function DroppableContainer(_ref) {
  var _active$data$current;
  var children = _ref.children,
    _ref$columns = _ref.columns,
    columns = _ref$columns === void 0 ? 1 : _ref$columns,
    disabled = _ref.disabled,
    id = _ref.id,
    containerStyles = _ref.containerStyles,
    items = _ref.items,
    _ref$disableHandle = _ref.disableHandle,
    disableHandle = _ref$disableHandle === void 0 ? false : _ref$disableHandle,
    _ref$disableDelete = _ref.disableDelete,
    disableDelete = _ref$disableDelete === void 0 ? false : _ref$disableDelete,
    style = _ref.style,
    props = _objectWithoutProperties(_ref, _excluded);
  var _useSortable = (0, _sortable.useSortable)({
      id: id,
      data: {
        type: 'container',
        children: items
      },
      animateLayoutChanges: animateLayoutChanges
    }),
    active = _useSortable.active,
    attributes = _useSortable.attributes,
    isDragging = _useSortable.isDragging,
    listeners = _useSortable.listeners,
    over = _useSortable.over,
    setNodeRef = _useSortable.setNodeRef,
    transition = _useSortable.transition,
    transform = _useSortable.transform;
  var isOverContainer = over ? id === over.id && (active === null || active === void 0 ? void 0 : (_active$data$current = active.data.current) === null || _active$data$current === void 0 ? void 0 : _active$data$current.type) !== 'container' || items.includes(over.id) : false;
  return /*#__PURE__*/_react["default"].createElement(Container, _extends({
    ref: disabled ? undefined : setNodeRef,
    disableHandle: disableHandle,
    disableDelete: disableDelete,
    containerStyles: containerStyles,
    style: _objectSpread(_objectSpread({}, style), {}, {
      transition: transition,
      transform: _utilities.CSS.Translate.toString(transform),
      opacity: isDragging ? 0.5 : undefined
    }),
    hover: isOverContainer,
    handleProps: _objectSpread(_objectSpread({}, attributes), listeners),
    columns: columns
  }, props), children);
}
var dropAnimation = {
  sideEffects: (0, _core.defaultDropAnimationSideEffects)({
    styles: {
      active: {
        opacity: '0.5'
      }
    }
  })
};
var TRASH_ID = 'void';
exports.TRASH_ID = TRASH_ID;
var PLACEHOLDER_ID = 'placeholder';
var empty = [];
function Kanban(_ref2) {
  var _ref2$adjustScale = _ref2.adjustScale,
    adjustScale = _ref2$adjustScale === void 0 ? false : _ref2$adjustScale,
    _ref2$itemCount = _ref2.itemCount,
    itemCount = _ref2$itemCount === void 0 ? 3 : _ref2$itemCount,
    cancelDrop = _ref2.cancelDrop,
    _ref2$Menu = _ref2.Menu,
    Menu = _ref2$Menu === void 0 ? null : _ref2$Menu,
    columns = _ref2.columns,
    _ref2$loadedUser = _ref2.loadedUser,
    loadedUser = _ref2$loadedUser === void 0 ? true : _ref2$loadedUser,
    _ref2$handle = _ref2.handle,
    handle = _ref2$handle === void 0 ? false : _ref2$handle,
    _ref2$CardTemplate = _ref2.CardTemplate,
    CardTemplate = _ref2$CardTemplate === void 0 ? null : _ref2$CardTemplate,
    initialItems = _ref2.items,
    _ref2$disableContaine = _ref2.disableContainerHandle,
    disableContainerHandle = _ref2$disableContaine === void 0 ? false : _ref2$disableContaine,
    _ref2$disableContaine2 = _ref2.disableContainerDelete,
    disableContainerDelete = _ref2$disableContaine2 === void 0 ? false : _ref2$disableContaine2,
    _ref2$disableAddColum = _ref2.disableAddColumn,
    disableAddColumn = _ref2$disableAddColum === void 0 ? false : _ref2$disableAddColum,
    containerStyles = _ref2.containerStyles,
    itemStyles = _ref2.itemStyles,
    _ref2$identifier = _ref2.identifier,
    identifier = _ref2$identifier === void 0 ? null : _ref2$identifier,
    containerStyle = _ref2.containerStyle,
    _ref2$coordinateGette = _ref2.coordinateGetter,
    coordinateGetter = _ref2$coordinateGette === void 0 ? multipleContainersCoordinateGetter : _ref2$coordinateGette,
    _ref2$getItemStyles = _ref2.getItemStyles,
    getItemStyles = _ref2$getItemStyles === void 0 ? function () {
      return {};
    } : _ref2$getItemStyles,
    _ref2$wrapperStyle = _ref2.wrapperStyle,
    wrapperStyle = _ref2$wrapperStyle === void 0 ? function () {
      return {};
    } : _ref2$wrapperStyle,
    _ref2$minimal = _ref2.minimal,
    minimal = _ref2$minimal === void 0 ? false : _ref2$minimal,
    modifiers = _ref2.modifiers,
    renderItem = _ref2.renderItem,
    _ref2$strategy = _ref2.strategy,
    strategy = _ref2$strategy === void 0 ? _sortable.verticalListSortingStrategy : _ref2$strategy,
    _ref2$trashable = _ref2.trashable,
    trashable = _ref2$trashable === void 0 ? false : _ref2$trashable,
    _ref2$vertical = _ref2.vertical,
    vertical = _ref2$vertical === void 0 ? false : _ref2$vertical,
    onCardClicked = _ref2.onCardClicked,
    _ref2$onCardChangedSt = _ref2.onCardChangedState,
    onCardChangedState = _ref2$onCardChangedSt === void 0 ? null : _ref2$onCardChangedSt,
    scrollable = _ref2.scrollable;
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    initItems = _useState2[0],
    setInitItems = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    cards = _useState4[0],
    setCards = _useState4[1];
  var _useState5 = (0, _react.useState)(),
    _useState6 = _slicedToArray(_useState5, 2),
    items = _useState6[0],
    setItems = _useState6[1];
  var _useState7 = (0, _react.useState)(),
    _useState8 = _slicedToArray(_useState7, 2),
    containers = _useState8[0],
    setContainers = _useState8[1];
  var fetchData = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var response, _containers, _initItems, cardNames, container;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            response = null;
            if (!(identifier == null)) {
              _context.next = 7;
              break;
            }
            _context.next = 4;
            return (0, _authscape.apiService)().get("/Kanban/GetKanban");
          case 4:
            response = _context.sent;
            _context.next = 10;
            break;
          case 7:
            _context.next = 9;
            return (0, _authscape.apiService)().get("/Kanban/GetKanban?identifier=" + identifier);
          case 9:
            response = _context.sent;
          case 10:
            if (response != null && response.status == 200) {
              _containers = [];
              _initItems = response.data;
              cardNames = [];
              container = {};
              _initItems.forEach(function (element) {
                _containers.push(element.id);
                var cards = [];
                element.cards.forEach(function (card) {
                  cards.push(card.id);
                  cardNames.push(card);
                });
                container[element.id] = cards;
              });
              setInitItems(_initItems);
              setCards(cardNames);
              setItems(container);
              setContainers(_containers);
            }
          case 11:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function fetchData() {
      return _ref3.apply(this, arguments);
    };
  }();
  (0, _react.useEffect)(function () {
    if (loadedUser) {
      fetchData();
    }
  }, [loadedUser]);
  var getContainerName = function getContainerName(containerId) {
    var name = "";
    initItems.forEach(function (element) {
      if (containerId == element.id) {
        name = element.name;
      }
    });
    return name;
  };
  var getCardName = function getCardName(cardId) {
    var name = "";
    if (cards != null) {
      cards.forEach(function (card) {
        if (cardId == card.id) {
          name = card.name;
        }
      });
    }
    return name;
  };
  var getCardDetails = function getCardDetails(cardId) {
    var cardDetail = {};
    if (cards != null) {
      cards.forEach(function (card) {
        if (cardId == card.id) {
          cardDetail = card;
        }
      });
    }
    return cardDetail;
  };
  var _useState9 = (0, _react.useState)(null),
    _useState10 = _slicedToArray(_useState9, 2),
    activeId = _useState10[0],
    setActiveId = _useState10[1];
  var lastOverId = (0, _react.useRef)(null);
  var recentlyMovedToNewContainer = (0, _react.useRef)(false);
  var isSortingContainer = activeId ? containers.includes(activeId) : false;

  /**
   * Custom collision detection strategy optimized for multiple containers
   *
   * - First, find any droppable containers intersecting with the pointer.
   * - If there are none, find intersecting containers with the active draggable.
   * - If there are no intersecting containers, return the last matched intersection
   *
   */
  var collisionDetectionStrategy = (0, _react.useCallback)(function (args) {
    if (activeId && activeId in items) {
      return (0, _core.closestCenter)(_objectSpread(_objectSpread({}, args), {}, {
        droppableContainers: args.droppableContainers.filter(function (container) {
          return container.id in items;
        })
      }));
    }

    // Start by finding any intersecting droppable
    var pointerIntersections = (0, _core.pointerWithin)(args);
    var intersections = pointerIntersections.length > 0 ?
    // If there are droppables intersecting with the pointer, return those
    pointerIntersections : (0, _core.rectIntersection)(args);
    var overId = (0, _core.getFirstCollision)(intersections, 'id');
    if (overId != null) {
      if (overId === TRASH_ID) {
        // If the intersecting droppable is the trash, return early
        // Remove this if you're not using trashable functionality in your app
        return intersections;
      }
      if (overId in items) {
        var containerItems = items[overId];

        // If a container is matched and it contains items (columns 'A', 'B', 'C')
        if (containerItems.length > 0) {
          var _closestCenter$;
          // Return the closest droppable within that container
          overId = (_closestCenter$ = (0, _core.closestCenter)(_objectSpread(_objectSpread({}, args), {}, {
            droppableContainers: args.droppableContainers.filter(function (container) {
              return container.id !== overId && containerItems.includes(container.id);
            })
          }))[0]) === null || _closestCenter$ === void 0 ? void 0 : _closestCenter$.id;
        }
      }
      lastOverId.current = overId;
      return [{
        id: overId
      }];
    }

    // When a draggable item moves to a new container, the layout may shift
    // and the `overId` may become `null`. We manually set the cached `lastOverId`
    // to the id of the draggable item that was moved to the new container, otherwise
    // the previous `overId` will be returned which can cause items to incorrectly shift positions
    if (recentlyMovedToNewContainer.current) {
      lastOverId.current = activeId;
    }

    // If no droppable is matched, return the last match
    return lastOverId.current ? [{
      id: lastOverId.current
    }] : [];
  }, [activeId, items]);
  var _useState11 = (0, _react.useState)(null),
    _useState12 = _slicedToArray(_useState11, 2),
    clonedItems = _useState12[0],
    setClonedItems = _useState12[1];
  var sensors = (0, _core.useSensors)((0, _core.useSensor)(_core.MouseSensor, {
    activationConstraint: {
      distance: 8
    }
  }), (0, _core.useSensor)(_core.TouchSensor, {
    activationConstraint: {
      distance: 8
    }
  }), (0, _core.useSensor)(_core.KeyboardSensor, {
    coordinateGetter: coordinateGetter,
    activationConstraint: {
      distance: 8
    }
  }));
  var findContainer = function findContainer(id) {
    if (id in items) {
      return id;
    }
    return Object.keys(items).find(function (key) {
      return items[key].includes(id);
    });
  };
  var getIndex = function getIndex(id) {
    var container = findContainer(id);
    if (!container) {
      return -1;
    }
    var index = items[container].indexOf(id);
    return index;
  };
  var onDragCancel = function onDragCancel() {
    if (clonedItems) {
      // Reset items to their original state in case items have been
      // Dragged across containers
      setItems(clonedItems);
    }
    setActiveId(null);
    setClonedItems(null);
  };
  (0, _react.useEffect)(function () {
    requestAnimationFrame(function () {
      recentlyMovedToNewContainer.current = false;
    });
  }, [items]);
  var _useState13 = (0, _react.useState)(null),
    _useState14 = _slicedToArray(_useState13, 2),
    anchorEl = _useState14[0],
    setAnchorEl = _useState14[1];
  var _useState15 = (0, _react.useState)(null),
    _useState16 = _slicedToArray(_useState15, 2),
    SelectedCardId = _useState16[0],
    setSelectedCardId = _useState16[1];
  var open = Boolean(anchorEl);
  var _handleMoreClick = function handleMoreClick(event) {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  var _handleMoreClose = function handleMoreClose() {
    setAnchorEl(null);
  };
  return /*#__PURE__*/_react["default"].createElement(_material.Box, null, loadedUser && containers != null && cards != null && items != null && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.DndContext, {
    sensors: sensors,
    collisionDetection: collisionDetectionStrategy,
    measuring: {
      droppable: {
        strategy: _core.MeasuringStrategy.Always
      }
    },
    onDragStart: function onDragStart(_ref4) {
      var active = _ref4.active;
      setActiveId(active.id);
      setClonedItems(items);
    },
    onDragOver: function onDragOver(_ref5) {
      var active = _ref5.active,
        over = _ref5.over;
      var overId = over === null || over === void 0 ? void 0 : over.id;
      if (overId == null || overId === TRASH_ID || active.id in items) {
        return;
      }
      var overContainer = findContainer(overId);
      var activeContainer = findContainer(active.id);
      if (!overContainer || !activeContainer) {
        return;
      }
      if (activeContainer !== overContainer) {
        setItems(function (items) {
          var _objectSpread2;
          var activeItems = items[activeContainer];
          var overItems = items[overContainer];
          var overIndex = overItems.indexOf(overId);
          var activeIndex = activeItems.indexOf(active.id);
          var newIndex;
          if (overId in items) {
            newIndex = overItems.length + 1;
          } else {
            var isBelowOverItem = over && active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height;
            var modifier = isBelowOverItem ? 1 : 0;
            newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
          }
          recentlyMovedToNewContainer.current = true;
          return _objectSpread(_objectSpread({}, items), {}, (_objectSpread2 = {}, _defineProperty(_objectSpread2, activeContainer, items[activeContainer].filter(function (item) {
            return item !== active.id;
          })), _defineProperty(_objectSpread2, overContainer, [].concat(_toConsumableArray(items[overContainer].slice(0, newIndex)), [items[activeContainer][activeIndex]], _toConsumableArray(items[overContainer].slice(newIndex, items[overContainer].length)))), _objectSpread2));
        });
      }
    },
    onDragEnd: function onDragEnd(_ref6) {
      var active = _ref6.active,
        over = _ref6.over;
      if (active.id in items && over !== null && over !== void 0 && over.id) {
        setContainers(function (containers) {
          var activeIndex = containers.indexOf(active.id);
          var overIndex = containers.indexOf(over.id);
          var array = (0, _sortable.arrayMove)(containers, activeIndex, overIndex);
          (0, _authscape.apiService)().put("/Kanban/SetColumnOrder", {
            columnsIds: array
          });
          return array;
        });
      }
      var activeContainer = findContainer(active.id);
      if (!activeContainer) {
        setActiveId(null);
        return;
      }
      var overId = over === null || over === void 0 ? void 0 : over.id;
      if (overId == null) {
        setActiveId(null);
        return;
      }
      if (overId === TRASH_ID) {
        setItems(function (items) {
          return _objectSpread(_objectSpread({}, items), {}, _defineProperty({}, activeContainer, items[activeContainer].filter(function (id) {
            return id !== activeId;
          })));
        });
        setActiveId(null);
        return;
      }
      if (overId === PLACEHOLDER_ID) {
        var newContainerId = getNextContainerId();
        (0, _reactDom.unstable_batchedUpdates)(function () {
          setContainers(function (containers) {
            return [].concat(_toConsumableArray(containers), [newContainerId]);
          });
          setItems(function (items) {
            var _objectSpread4;
            return _objectSpread(_objectSpread({}, items), {}, (_objectSpread4 = {}, _defineProperty(_objectSpread4, activeContainer, items[activeContainer].filter(function (id) {
              return id !== activeId;
            })), _defineProperty(_objectSpread4, newContainerId, [active.id]), _objectSpread4));
          });
          setActiveId(null);
        });
        return;
      }
      var overContainer = findContainer(overId);
      if (overContainer) {
        // you can't get the item from the key in an array, you need to search for it

        var name = getContainerName(overContainer);

        //alert(activeContainer + " \n" + overContainer)

        var activeIndex = items[activeContainer].indexOf(active.id);
        var overIndex = items[overContainer].indexOf(overId);

        //alert(activeIndex + " - " + active.id + " !== " + overId + " - " + overIndex)

        if (activeIndex !== overIndex) {
          var newArray = (0, _sortable.arrayMove)(items[overContainer], activeIndex, overIndex);
          setItems(function (items) {
            return _objectSpread(_objectSpread({}, items), {}, _defineProperty({}, overContainer, newArray));
          });

          // get the items we need to rearrange
          // alert(JSON.stringify(newArray))

          (0, _authscape.apiService)().put("/Kanban/AssignCardsBasedOnOrder", {
            cardId: active.id,
            columnId: overContainer,
            cards: newArray
          });
          var changeStateData = /*#__PURE__*/function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    if (!(onCardChangedState != null)) {
                      _context2.next = 5;
                      break;
                    }
                    _context2.next = 3;
                    return onCardChangedState(overContainer, active.id);
                  case 3:
                    _context2.next = 5;
                    return fetchData();
                  case 5:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            return function changeStateData() {
              return _ref7.apply(this, arguments);
            };
          }();
          changeStateData();
        } else {
          // assign the order of the cards
          (0, _authscape.apiService)().put("/Kanban/AssignColumnForCard", {
            columnId: overContainer,
            cardId: active.id,
            orderId: 0
          });
          var _changeStateData = /*#__PURE__*/function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
              return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    if (!(onCardChangedState != null)) {
                      _context3.next = 5;
                      break;
                    }
                    _context3.next = 3;
                    return onCardChangedState(overContainer, active.id);
                  case 3:
                    _context3.next = 5;
                    return fetchData();
                  case 5:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3);
            }));
            return function _changeStateData() {
              return _ref8.apply(this, arguments);
            };
          }();
          _changeStateData();
        }
      }
      setActiveId(null);
    },
    cancelDrop: cancelDrop,
    onDragCancel: onDragCancel,
    modifiers: modifiers
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: 'inline-grid',
      boxSizing: 'border-box',
      padding: 20,
      gridAutoFlow: vertical ? 'row' : 'column'
    }
  }, /*#__PURE__*/_react["default"].createElement(_sortable.SortableContext, {
    items: [].concat(_toConsumableArray(containers), [PLACEHOLDER_ID]),
    strategy: vertical ? _sortable.verticalListSortingStrategy : _sortable.horizontalListSortingStrategy
  }, containers.map(function (containerId) {
    var containerName = getContainerName(containerId);
    return /*#__PURE__*/_react["default"].createElement(DroppableContainer, {
      key: containerId,
      containerStyles: containerStyles,
      id: containerId,
      disableHandle: disableContainerHandle,
      disableDelete: disableContainerDelete,
      label: containerName,
      columns: columns,
      items: items[containerId],
      scrollable: scrollable,
      style: containerStyle,
      unstyled: minimal,
      onRemove: function onRemove() {
        return handleRemove(containerId);
      }
    }, /*#__PURE__*/_react["default"].createElement(_sortable.SortableContext, {
      items: items[containerId],
      strategy: strategy
    }, items[containerId].map(function (value, index) {
      return /*#__PURE__*/_react["default"].createElement(SortableItem, {
        disabled: isSortingContainer,
        key: value,
        onCardClicked: onCardClicked,
        itemStyles: itemStyles,
        id: value,
        cardDetail: getCardDetails(value),
        CardTemplate: CardTemplate,
        handleMoreClick: function handleMoreClick(event) {
          _handleMoreClick(event);
          setSelectedCardId(value);
        },
        handleMoreClose: function handleMoreClose() {
          _handleMoreClose();
          setSelectedCardId(null);
        },
        name: getCardName(value),
        index: index,
        handle: handle,
        style: getItemStyles,
        wrapperStyle: wrapperStyle,
        renderItem: renderItem,
        containerId: containerId,
        getIndex: getIndex
      });
    })));
  }), minimal ? undefined : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, !disableAddColumn && /*#__PURE__*/_react["default"].createElement(DroppableContainer, {
    id: PLACEHOLDER_ID,
    containerStyles: containerStyles,
    disabled: isSortingContainer,
    items: empty,
    onClick: handleAddColumn,
    placeholder: true
  }, "+ Add column")))), /*#__PURE__*/(0, _reactDom.createPortal)( /*#__PURE__*/_react["default"].createElement(_core.DragOverlay, {
    adjustScale: adjustScale,
    dropAnimation: dropAnimation
  }, activeId ? containers.includes(activeId) ? renderContainerDragOverlay(CardTemplate, activeId, containerStyles) : renderSortableItemDragOverlay(CardTemplate, activeId) : null), document.body), trashable && activeId && !containers.includes(activeId) ? /*#__PURE__*/_react["default"].createElement(Trash, {
    id: TRASH_ID
  }) : null), Menu != null && /*#__PURE__*/_react["default"].createElement(Menu, {
    anchorEl: anchorEl,
    open: open,
    handleMoreClose: _handleMoreClose,
    cardId: SelectedCardId
  })));
  function renderSortableItemDragOverlay(CardTemplate, id) {
    return /*#__PURE__*/_react["default"].createElement(Item, {
      value: id,
      itemStyles: itemStyles,
      name: getCardName(id),
      cardDetail: getCardDetails(id),
      onCardClicked: onCardClicked,
      CardTemplate: CardTemplate,
      handle: handle,
      style: getItemStyles({
        containerId: findContainer(id),
        overIndex: -1,
        index: getIndex(id),
        value: id,
        isSorting: true,
        isDragging: true,
        isDragOverlay: true
      }),
      color: getColor(id),
      wrapperStyle: wrapperStyle({
        index: 0
      }),
      renderItem: renderItem,
      dragOverlay: true
    });
  }
  function renderContainerDragOverlay(CardTemplate, containerId, containerStyles) {
    return /*#__PURE__*/_react["default"].createElement(Container, {
      label: getContainerName(containerId),
      containerStyles: containerStyles,
      columns: columns,
      style: {
        height: '100%',
        paddingRight: "10px"
      },
      shadow: true,
      unstyled: false
    }, items[containerId].map(function (item, index) {
      return /*#__PURE__*/_react["default"].createElement(Item, {
        key: item,
        onCardClicked: onCardClicked,
        value: item,
        itemStyles: itemStyles,
        CardTemplate: CardTemplate,
        cardDetail: getCardDetails(item),
        name: getCardName(item),
        handle: handle,
        style: getItemStyles({
          containerId: containerId,
          overIndex: -1,
          index: getIndex(item),
          value: item,
          isDragging: false,
          isSorting: false,
          isDragOverlay: false
        }),
        color: getColor(item),
        wrapperStyle: wrapperStyle({
          index: index
        }),
        renderItem: renderItem
      });
    }));
  }
  function handleRemove(containerID) {
    setContainers(function (containers) {
      return containers.filter(function (id) {
        return id !== containerID;
      });
    });
  }
  function handleAddColumn() {
    var newContainerId = getNextContainerId();
    (0, _reactDom.unstable_batchedUpdates)(function () {
      setContainers(function (containers) {
        return [].concat(_toConsumableArray(containers), [newContainerId]);
      });
      setItems(function (items) {
        return _objectSpread(_objectSpread({}, items), {}, _defineProperty({}, newContainerId, []));
      });
    });
  }
  function getNextContainerId() {
    var containerIds = Object.keys(items);
    var lastContainerId = containerIds[containerIds.length - 1];
    return String.fromCharCode(lastContainerId.charCodeAt(0) + 1);
  }
}
function getColor(id) {
  switch (String(id)[0]) {
    case 'A':
      return '#7193f1';
    case 'B':
      return '#ffda6c';
    case 'C':
      return '#00bcd4';
    case 'D':
      return '#ef769f';
  }
  return undefined;
}
function Trash(_ref9) {
  var id = _ref9.id;
  var _useDroppable = (0, _core.useDroppable)({
      id: id
    }),
    setNodeRef = _useDroppable.setNodeRef,
    isOver = _useDroppable.isOver;
  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: setNodeRef,
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'fixed',
      left: '50%',
      marginLeft: -150,
      bottom: 20,
      width: 300,
      height: 60,
      borderRadius: 5,
      border: '1px solid',
      borderColor: isOver ? 'red' : '#DDD'
    }
  }, "Drop here to delete");
}
function SortableItem(_ref10) {
  var disabled = _ref10.disabled,
    id = _ref10.id,
    index = _ref10.index,
    handle = _ref10.handle,
    name = _ref10.name,
    renderItem = _ref10.renderItem,
    onCardClicked = _ref10.onCardClicked,
    CardTemplate = _ref10.CardTemplate,
    cardDetail = _ref10.cardDetail,
    handleMoreClick = _ref10.handleMoreClick,
    itemStyles = _ref10.itemStyles,
    handleMoreClose = _ref10.handleMoreClose,
    style = _ref10.style,
    containerId = _ref10.containerId,
    getIndex = _ref10.getIndex,
    wrapperStyle = _ref10.wrapperStyle;
  var _useSortable2 = (0, _sortable.useSortable)({
      id: id
    }),
    setNodeRef = _useSortable2.setNodeRef,
    setActivatorNodeRef = _useSortable2.setActivatorNodeRef,
    listeners = _useSortable2.listeners,
    isDragging = _useSortable2.isDragging,
    isSorting = _useSortable2.isSorting,
    over = _useSortable2.over,
    overIndex = _useSortable2.overIndex,
    transform = _useSortable2.transform,
    transition = _useSortable2.transition;
  var mounted = useMountStatus();
  var mountedWhileDragging = isDragging && !mounted;
  return /*#__PURE__*/_react["default"].createElement(Item, {
    ref: disabled ? undefined : setNodeRef,
    value: id,
    itemStyles: itemStyles,
    onCardClicked: onCardClicked,
    dragging: isDragging,
    sorting: isSorting,
    cardDetail: cardDetail,
    CardTemplate: CardTemplate,
    handleMoreClick: handleMoreClick,
    handleMoreClose: handleMoreClose,
    name: name,
    handle: handle,
    handleProps: handle ? {
      ref: setActivatorNodeRef
    } : undefined,
    index: index,
    wrapperStyle: wrapperStyle({
      index: index
    }),
    style: style({
      index: index,
      value: id,
      isDragging: isDragging,
      isSorting: isSorting,
      overIndex: over ? getIndex(over.id) : overIndex,
      containerId: containerId
    }),
    color: getColor(id),
    transition: transition,
    transform: transform,
    fadeIn: mountedWhileDragging,
    listeners: listeners,
    renderItem: renderItem
  });
}
function useMountStatus() {
  var _useState17 = (0, _react.useState)(false),
    _useState18 = _slicedToArray(_useState17, 2),
    isMounted = _useState18[0],
    setIsMounted = _useState18[1];
  (0, _react.useEffect)(function () {
    var timeout = setTimeout(function () {
      return setIsMounted(true);
    }, 500);
    return function () {
      return clearTimeout(timeout);
    };
  }, []);
  return isMounted;
}
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.multipleContainersCoordinateGetter = void 0;
var _react = _interopRequireWildcard(require("react"));
var _core = require("@dnd-kit/core");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var directions = [_core.KeyboardCode.Down, _core.KeyboardCode.Right, _core.KeyboardCode.Up, _core.KeyboardCode.Left];
var multipleContainersCoordinateGetter = function multipleContainersCoordinateGetter(event, _ref) {
  var _ref$context = _ref.context,
    active = _ref$context.active,
    droppableRects = _ref$context.droppableRects,
    droppableContainers = _ref$context.droppableContainers,
    collisionRect = _ref$context.collisionRect;
  if (directions.includes(event.code)) {
    event.preventDefault();
    if (!active || !collisionRect) {
      return;
    }
    var filteredContainers = [];
    droppableContainers.getEnabled().forEach(function (entry) {
      if (!entry || entry !== null && entry !== void 0 && entry.disabled) {
        return;
      }
      var rect = droppableRects.get(entry.id);
      if (!rect) {
        return;
      }
      var data = entry.data.current;
      if (data) {
        var type = data.type,
          children = data.children;
        if (type === 'container' && (children === null || children === void 0 ? void 0 : children.length) > 0) {
          var _active$data$current;
          if (((_active$data$current = active.data.current) === null || _active$data$current === void 0 ? void 0 : _active$data$current.type) !== 'container') {
            return;
          }
        }
      }
      switch (event.code) {
        case _core.KeyboardCode.Down:
          if (collisionRect.top < rect.top) {
            filteredContainers.push(entry);
          }
          break;
        case _core.KeyboardCode.Up:
          if (collisionRect.top > rect.top) {
            filteredContainers.push(entry);
          }
          break;
        case _core.KeyboardCode.Left:
          if (collisionRect.left >= rect.left + rect.width) {
            filteredContainers.push(entry);
          }
          break;
        case _core.KeyboardCode.Right:
          if (collisionRect.left + collisionRect.width <= rect.left) {
            filteredContainers.push(entry);
          }
          break;
      }
    });
    var collisions = (0, _core.closestCorners)({
      active: active,
      collisionRect: collisionRect,
      droppableRects: droppableRects,
      droppableContainers: filteredContainers,
      pointerCoordinates: null
    });
    var closestId = (0, _core.getFirstCollision)(collisions, 'id');
    if (closestId != null) {
      var newDroppable = droppableContainers.get(closestId);
      var newNode = newDroppable === null || newDroppable === void 0 ? void 0 : newDroppable.node.current;
      var newRect = newDroppable === null || newDroppable === void 0 ? void 0 : newDroppable.rect.current;
      if (newNode && newRect) {
        var _newDroppable$data$cu;
        if (newDroppable.id === 'placeholder') {
          return {
            x: newRect.left + (newRect.width - collisionRect.width) / 2,
            y: newRect.top + (newRect.height - collisionRect.height) / 2
          };
        }
        if (((_newDroppable$data$cu = newDroppable.data.current) === null || _newDroppable$data$cu === void 0 ? void 0 : _newDroppable$data$cu.type) === 'container') {
          return {
            x: newRect.left + 20,
            y: newRect.top + 74
          };
        }
        return {
          x: newRect.left,
          y: newRect.top
        };
      }
    }
  }
  return undefined;
};
exports.multipleContainersCoordinateGetter = multipleContainersCoordinateGetter;
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Remove = Remove;
var _react = _interopRequireWildcard(require("react"));
var _DeleteRounded = _interopRequireDefault(require("@mui/icons-material/DeleteRounded"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
/// use in testing
// import {Action} from './Action';
var removeIcon = function removeIcon() {
  return /*#__PURE__*/_react["default"].createElement(_DeleteRounded["default"], null);
};
function Remove(props) {
  return /*#__PURE__*/_react["default"].createElement(Action, _extends({
    icon: removeIcon
  }, props, {
    active: {
      fill: 'rgba(255, 70, 70, 0.95)',
      background: 'rgba(255, 70, 70, 0.1)'
    }
  }));
}
