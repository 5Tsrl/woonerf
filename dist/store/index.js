'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = createStore;

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

var _redux = require('redux');

var _reactRouterRedux = require('react-router-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configureStore = null;

if (process.env.NODE_ENV === 'production') {
  configureStore = require('./store.production');
} else if (process.env.NODE_ENV === 'test') {
  configureStore = require('./store.mock');
} else {
  configureStore = require('./store.development');
}

function createStore(reducers) {
  var configuredState = safeParse(process.env.STORE);
  var locallyStoredState = safeParse(window.localStorage ? window.localStorage.getItem('state') : {});
  var store = configureStore((0, _redux.combineReducers)((0, _extends3.default)({ routing: _reactRouterRedux.routerReducer }, reducers)), (0, _merge2.default)(configuredState, locallyStoredState));
  return store;
}

function safeParse(str) {
  try {
    return JSON.parse(str) || {};
  } catch (e) {
    return {};
  }
}
module.exports = exports['default'];

//# sourceMappingURL=index.js