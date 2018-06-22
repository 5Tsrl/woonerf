'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _react = require('react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Pure = function (_Component) {
  (0, _inherits3.default)(Pure, _Component);

  function Pure() {
    (0, _classCallCheck3.default)(this, Pure);
    return (0, _possibleConstructorReturn3.default)(this, (Pure.__proto__ || (0, _getPrototypeOf2.default)(Pure)).apply(this, arguments));
  }

  (0, _createClass3.default)(Pure, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(newProps, newState) {
      return !(0, _isEqual2.default)(newProps, this.props) || !(0, _isEqual2.default)(newState, this.state);
    }
  }]);
  return Pure;
}(_react.Component);

exports.default = Pure;
module.exports = exports['default'];

//# sourceMappingURL=pure.js