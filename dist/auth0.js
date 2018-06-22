'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLock = exports.defaultLockOptions = exports.authIsRequired = undefined;

var _auth0Lock = require('auth0-lock');

var _auth0Lock2 = _interopRequireDefault(_auth0Lock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
var AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;

var authIsRequired = exports.authIsRequired = AUTH0_CLIENT_ID && AUTH0_DOMAIN;
var defaultLockOptions = exports.defaultLockOptions = {
  auth: {
    params: {
      scope: 'openid analyst offline_access'
    },
    redirect: false
  },
  closeable: false,
  autoclose: true
};
var getLock = exports.getLock = function getLock(lockOptions) {
  return new _auth0Lock2.default(AUTH0_CLIENT_ID, AUTH0_DOMAIN, lockOptions);
};

//# sourceMappingURL=auth0.js