'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = promiseMiddleware;
function isPromise(val) {
  return val && typeof val.then === 'function';
}

function promiseMiddleware(_ref) {
  var dispatch = _ref.dispatch;

  return function (next) {
    return function (action) {
      return isPromise(action) ? action.then(dispatch) : next(action);
    };
  };
}
module.exports = exports['default'];

//# sourceMappingURL=promise.js