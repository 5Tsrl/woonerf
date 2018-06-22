'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.default = mount;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _reactRouterRedux = require('react-router-redux');

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function create(_ref) {
  var app = _ref.app,
      reducers = _ref.reducers;

  var store = (0, _store2.default)(reducers);
  var history = process.env.NODE_ENV !== 'test' ? (0, _reactRouterRedux.syncHistoryWithStore)(_reactRouter.browserHistory, store) : {};
  return _react2.default.createElement(_reactRedux.Provider, { store: store }, _react2.default.createElement(app, { history: history, store: store }));
}

function mount(_ref2) {
  var app = _ref2.app,
      _ref2$id = _ref2.id,
      id = _ref2$id === undefined ? 'root' : _ref2$id,
      reducers = _ref2.reducers;

  return (0, _reactDom.render)(create({ app: app, reducers: reducers }), document.getElementById(id));
}

//# sourceMappingURL=mount.js