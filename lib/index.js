"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseQuery = exports.makeQuery = undefined;

var _pathOr2 = require("ramda/src/pathOr");

var _pathOr3 = _interopRequireDefault(_pathOr2);

var _dissoc2 = require("ramda/src/dissoc");

var _dissoc3 = _interopRequireDefault(_dissoc2);

var _identity2 = require("ramda/src/identity");

var _identity3 = _interopRequireDefault(_identity2);

var _tail2 = require("ramda/src/tail");

var _tail3 = _interopRequireDefault(_tail2);

var _head2 = require("ramda/src/head");

var _head3 = _interopRequireDefault(_head2);

var _ifElse2 = require("ramda/src/ifElse");

var _ifElse3 = _interopRequireDefault(_ifElse2);

var _filter2 = require("ramda/src/filter");

var _filter3 = _interopRequireDefault(_filter2);

var _assoc2 = require("ramda/src/assoc");

var _assoc3 = _interopRequireDefault(_assoc2);

var _split2 = require("ramda/src/split");

var _split3 = _interopRequireDefault(_split2);

var _reduce2 = require("ramda/src/reduce");

var _reduce3 = _interopRequireDefault(_reduce2);

var _keys2 = require("ramda/src/keys");

var _keys3 = _interopRequireDefault(_keys2);

var _map2 = require("ramda/src/map");

var _map3 = _interopRequireDefault(_map2);

var _join2 = require("ramda/src/join");

var _join3 = _interopRequireDefault(_join2);

var _concat2 = require("ramda/src/concat");

var _concat3 = _interopRequireDefault(_concat2);

var _compose2 = require("ramda/src/compose");

var _compose3 = _interopRequireDefault(_compose2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require("react");

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// ================
// Helper functions
// TODO: add tests
var makeQuery = exports.makeQuery = function makeQuery(params) {
  return (0, _compose3.default)((0, _concat3.default)("?"), (0, _join3.default)("&"), (0, _map3.default)(function (key) {
    return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
  }), _keys3.default)(params);
};

var parseQuery = exports.parseQuery = function parseQuery(query) {
  return (0, _compose3.default)((0, _reduce3.default)(function (acc, keyParam) {
    var _R$split = (0, _split3.default)("=")(keyParam),
        _R$split2 = _slicedToArray(_R$split, 2),
        key = _R$split2[0],
        param = _R$split2[1];

    return (0, _assoc3.default)(decodeURIComponent(key), decodeURIComponent(param), acc);
  }, {}), (0, _filter3.default)(Boolean), (0, _split3.default)("&"), (0, _ifElse3.default)(function (query) {
    return (0, _head3.default)(query) === "?";
  }, _tail3.default, _identity3.default))(query);
};

var pushUrlToWindow = function pushUrlToWindow(query) {
  if (!window) return;
  window.history.pushState({}, null, "" + window.location.origin + window.location.pathname + query);
};

// =======
// Context

function urlContext() {
  var _React$createContext = React.createContext({}),
      Provider = _React$createContext.Provider,
      Consumer = _React$createContext.Consumer;

  var UrlProvider = function (_React$PureComponent) {
    _inherits(UrlProvider, _React$PureComponent);

    function UrlProvider(props) {
      _classCallCheck(this, UrlProvider);

      var _this = _possibleConstructorReturn(this, (UrlProvider.__proto__ || Object.getPrototypeOf(UrlProvider)).call(this, props));

      _this.state = {
        params: {}
      };

      _this.addParam = function (key, param) {
        var params = (0, _assoc3.default)(key, param, _this.state.params);
        _this.props.pushUrl(makeQuery(params));
        _this.setState({
          params: params
        });
      };

      _this.removeParam = function (key) {
        var params = (0, _dissoc3.default)(key, _this.state.params);
        _this.props.pushUrl(makeQuery(params));
        _this.setState({
          params: params
        });
      };

      var initialState = (0, _compose3.default)(parseQuery, (0, _pathOr3.default)("", ["location", "search"]))(window);

      _this.state = {
        params: initialState
      };
      return _this;
    }

    _createClass(UrlProvider, [{
      key: "render",
      value: function render() {
        return React.createElement(
          Provider,
          {
            value: {
              state: this.state.params,
              addParam: this.addParam,
              removeParam: this.removeParam
            }
          },
          this.props.children
        );
      }
    }]);

    return UrlProvider;
  }(React.PureComponent);

  UrlProvider.defaultProps = {
    pushUrl: pushUrlToWindow
  };


  return {
    UrlProvider: UrlProvider,
    UrlConsumer: Consumer
  };
}

exports.default = urlContext;