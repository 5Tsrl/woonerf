"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = multiMiddleware;
function multiMiddleware(_ref) {
  var dispatch = _ref.dispatch;

  return function (next) {
    return function (action) {
      return Array.isArray(action) ? action.filter(Boolean).map(dispatch) : next(action);
    };
  };
}
module.exports = exports["default"];

//# sourceMappingURL=multi.js