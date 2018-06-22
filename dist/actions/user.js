'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setAuth0User = exports.logout = undefined;

var _createAction = require('redux-actions/lib/createAction');

var _createAction2 = _interopRequireDefault(_createAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logout = exports.logout = (0, _createAction2.default)('log out');
var setAuth0User = exports.setAuth0User = (0, _createAction2.default)('set auth0 user');

//# sourceMappingURL=user.js