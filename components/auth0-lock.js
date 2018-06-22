'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _reactRouterRedux = require('react-router-redux');

var _user = require('../actions/user');

var _auth = require('../auth0');

var _pure = require('./pure');

var _pure2 = _interopRequireDefault(_pure);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Auth0 = function (_Pure) {
  (0, _inherits3.default)(Auth0, _Pure);

  function Auth0() {
    (0, _classCallCheck3.default)(this, Auth0);
    return (0, _possibleConstructorReturn3.default)(this, (Auth0.__proto__ || (0, _getPrototypeOf2.default)(Auth0)).apply(this, arguments));
  }

  (0, _createClass3.default)(Auth0, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          lockOptions = _props.lockOptions,
          push = _props.push,
          setAuth0User = _props.setAuth0User;

      var lock = (0, _auth.getLock)(lockOptions);
      lock.show();
      lock.on('authenticated', function (authResult) {
        lock.hide();
        lock.getProfile(authResult.idToken, function (error, profile) {
          if (error) {
            setAuth0User(null);
            push('/login');
          } else {
            var user = (0, _extends3.default)({}, authResult, {
              profile: profile
            });
            window.localStorage.setItem('user', (0, _stringify2.default)(user));
            setAuth0User(user);
            push('/');
          }
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return Auth0;
}(_pure2.default);

Auth0.propTypes = {
  lockOptions: _propTypes2.default.object,
  push: _propTypes2.default.func.isRequired,
  setAuth0User: _propTypes2.default.func.isRequired
};


function mapStateToProps(state, props) {
  return {
    lockOptions: props.lockOptions || _auth.defaultLockOptions
  };
}
var mapDispatchToProps = {
  push: _reactRouterRedux.push,
  setAuth0User: _user.setAuth0User
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Auth0);
module.exports = exports['default'];

//# sourceMappingURL=auth0-lock.js