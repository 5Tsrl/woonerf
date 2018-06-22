'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureStore;

var _reactRouter = require('react-router');

var _reactRouterRedux = require('react-router-redux');

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _fetch = require('../fetch');

var _multi = require('./multi');

var _multi2 = _interopRequireDefault(_multi);

var _promise = require('./promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function configureStore(rootReducer, initialState) {
  return (0, _redux.createStore)(rootReducer, initialState, (0, _redux.applyMiddleware)((0, _reactRouterRedux.routerMiddleware)(_reactRouter.browserHistory), _fetch.middleware, _multi2.default, _promise2.default, _reduxThunk2.default));
}
module.exports = exports['default'];

//# sourceMappingURL=store.production.js