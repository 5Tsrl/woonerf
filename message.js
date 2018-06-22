'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeysUsed = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

exports.setMessages = setMessages;
exports.default = getMessage;

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dbg = (0, _debug2.default)('woonerf:message'

/**
 * Expose a Set of all the keys used
 */
);var KeysUsed = exports.KeysUsed = new _set2.default();

/**
 * Set the messages object
 */
function setMessages(newMessages) {
  messages = newMessages;
}

var messages = {};
if (process.env.MESSAGES) {
  setMessages(JSON.parse(process.env.MESSAGES));
}

/**
 * Requires a key, defaultMessage and parameters are optional
 */
function getMessage(key, defaultMessage, parameters) {
  if (defaultMessage == null) {
    defaultMessage = '';
    parameters = {};
  } else if ((typeof defaultMessage === 'undefined' ? 'undefined' : (0, _typeof3.default)(defaultMessage)) === 'object') {
    parameters = defaultMessage;
    defaultMessage = '';
  }

  // Store the used key
  KeysUsed.add(key

  // Get the message with "lodash/get" to allow nested keys ('noun.action' => {noun: {action: 'value'}})
  );var msg = (0, _get2.default)(messages, key, defaultMessage);
  var result = parameters ? replaceMessage(msg, parameters) : msg;
  dbg(key, result);
  return result;
}

function replaceMessage(msg, data) {
  return msg.replace(new RegExp('%\\((' + (0, _keys2.default)(data).join('|') + ')\\)', 'g'), function (m, key) {
    return data[key] || m;
  });
}

//# sourceMappingURL=message.js