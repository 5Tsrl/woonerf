'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialState = exports.reducers = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducers = exports.reducers = {
  'log out': function logOut(state, action) {
    return {};
  },
  'set auth0 user': function setAuth0User(state, action) {
    return (0, _extends3.default)({}, state, action.payload);
  },
  'set id token': function setIdToken(state, action) {
    return (0, _extends3.default)({}, state, {
      idToken: action.payload
    });
  }
};

var localStorageAvailable = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined' && typeof window.localStorage.getItem === 'function';

var initialState = exports.initialState = (0, _extends3.default)({}, JSON.parse(localStorageAvailable ? window.localStorage.getItem('user') : '{}'));

//# sourceMappingURL=user.js