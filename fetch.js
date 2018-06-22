'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchError = exports.fetchMultiple = exports.fetchAction = exports.decrementFetches = exports.incrementFetches = exports.FETCH_ERROR = exports.FETCH_MULTIPLE = exports.FETCH = exports.DECREMENT_FETCH = exports.INCREMENT_FETCH = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.middleware = middleware;
exports.runFetch = runFetch;
exports.runFetchAction = runFetchAction;
exports.runFetchMultiple = runFetchMultiple;

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _createAction = require('redux-actions/lib/createAction');

var _createAction2 = _interopRequireDefault(_createAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (typeof fetch === 'undefined') {
  require('isomorphic-fetch');
}

var INCREMENT_FETCH = exports.INCREMENT_FETCH = 'increment outstanding fetches';
var DECREMENT_FETCH = exports.DECREMENT_FETCH = 'decrement outstanding fetches';
var FETCH = exports.FETCH = 'fetch';
var FETCH_MULTIPLE = exports.FETCH_MULTIPLE = 'fetch multiple';
var FETCH_ERROR = exports.FETCH_ERROR = 'fetch error';

var incrementFetches = exports.incrementFetches = (0, _createAction2.default)(INCREMENT_FETCH);
var decrementFetches = exports.decrementFetches = (0, _createAction2.default)(DECREMENT_FETCH);
var fetchAction = exports.fetchAction = (0, _createAction2.default)(FETCH);
var fetchMultiple = exports.fetchMultiple = (0, _createAction2.default)(FETCH_MULTIPLE);
var fetchError = exports.fetchError = (0, _createAction2.default)(FETCH_ERROR);

function middleware(store) {
  return function (next) {
    return function (action) {
      if (action.type === FETCH) {
        return store.dispatch(runFetchAction(action.payload, store.getState()));
      } else if (action.type === FETCH_MULTIPLE) {
        return store.dispatch(runFetchMultiple(action.payload, store.getState()));
      } else {
        return next(action);
      }
    };
  };
}

exports.default = fetchAction;

/**
 * Calls fetch, adds Auth and Content header if needed. Automatically parses content based on type.
 *
 * @returns Promise
 */

function runFetch(_ref, state) {
  var _this = this;

  var _ref$options = _ref.options,
      options = _ref$options === undefined ? {} : _ref$options,
      _ref$retry = _ref.retry,
      retry = _ref$retry === undefined ? false : _ref$retry,
      url = _ref.url;

  var headers = (0, _extends3.default)({}, createAuthorizationHeader(state), createContentHeader(options.body), options.headers || {});

  var filteredHeaders = {};

  // allow removing generated headers by specifiying { header: null } in options.headers
  // do this in two steps because otherwise we're modifying the object as we're iterating over it
  (0, _keys2.default)(headers).filter(function (key) {
    return headers[key] !== null && headers[key] !== undefined;
  }).forEach(function (key) {
    filteredHeaders[key] = headers[key];
  });

  return fetch(url, (0, _extends3.default)({}, options, {
    body: serialize(options.body),
    headers: filteredHeaders
  })).then(checkStatus).then(createResponse).then(function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(response) {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = retry;

              if (!_context.t0) {
                _context.next = 5;
                break;
              }

              _context.next = 4;
              return retry(response);

            case 4:
              _context.t0 = _context.sent;

            case 5:
              if (!_context.t0) {
                _context.next = 9;
                break;
              }

              _context.t1 = runFetch({ options: options, retry: retry, url: url }, state);
              _context.next = 10;
              break;

            case 9:
              _context.t1 = response;

            case 10:
              return _context.abrupt('return', _context.t1);

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }());
}

function runFetchAction(_ref3, state) {
  var next = _ref3.next,
      _ref3$options = _ref3.options,
      options = _ref3$options === undefined ? {} : _ref3$options,
      _ref3$retry = _ref3.retry,
      retry = _ref3$retry === undefined ? false : _ref3$retry,
      url = _ref3.url;

  var dispatchFetchError = !next || next.length < 2;
  var wrappedNext = wrapNext(next);

  return [incrementFetches({ options: options, url: url }), runFetch({ options: options, retry: retry, url: url }, state).then(function (response) {
    return [decrementFetches({ options: options, url: url }), wrappedNext(null, response)];
  }).catch(function (error) {
    return createErrorResponse(error).then(function (response) {
      var actions = [decrementFetches({ options: options, url: url }), wrappedNext(error, response)];
      if (dispatchFetchError) actions.push(fetchError(response));
      return actions;
    });
  })];
}

/**
 * @returns Promise
 */
function runFetchMultiple(_ref4, state) {
  var fetches = _ref4.fetches,
      next = _ref4.next;

  var dispatchFetchError = !next || next.length < 2;
  var wrappedNext = wrapNext(next);

  return [].concat((0, _toConsumableArray3.default)(fetches.map(function (_ref5) {
    var options = _ref5.options,
        url = _ref5.url;
    return incrementFetches({ options: options, url: url });
  })), [_promise2.default.all(fetches.map(function (fetch) {
    return runFetch(fetch, state);
  })).then(function (responses) {
    return [].concat((0, _toConsumableArray3.default)(fetches.map(function (_ref6) {
      var options = _ref6.options,
          url = _ref6.url;
      return decrementFetches({ options: options, url: url });
    })), [wrappedNext(null, responses)]);
  }).catch(function (error) {
    return createErrorResponse(error).then(function (response) {
      var actions = fetches.map(function (_ref7) {
        var options = _ref7.options,
            url = _ref7.url;
        return decrementFetches({ options: options, url: url });
      });
      if (dispatchFetchError) actions.push(fetchError(response));
      return [].concat((0, _toConsumableArray3.default)(actions), [wrappedNext(error, response)]);
    });
  })]);
}

function createAuthorizationHeader(state) {
  return state.user && state.user.idToken ? { Authorization: 'bearer ' + state.user.idToken } : {};
}

function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res;
  } else {
    throw res;
  }
}

function createContentHeader(body) {
  if (body instanceof window.FormData) {
    return {};
  } else if ((0, _isObject2.default)(body)) {
    return { 'Accept': 'application/json', 'Content-Type': 'application/json;charset=UTF-8' };
  } else {
    return {};
  }
}

function createErrorResponse(res) {
  return res.headers ? createResponse(res) : _promise2.default.resolve(res);
}

function createResponse(res) {
  return deserialize(res).then(function (value) {
    return {
      url: res.url,
      status: res.status,
      statusText: res.statusText,
      headers: res.headers,
      value: value
    };
  }).catch(function (err) {
    return {
      value: err
    };
  });
}

function deserialize(res) {
  var header = res.headers.get('Content-Type') + ' ' + res.headers.get('Content');
  if (header.indexOf('application/json') > -1) return res.json();
  if (header.indexOf('application/ld+json') > -1) return res.json();
  if (header.indexOf('application/octet-stream') > -1) return res.arrayBuffer();
  return res.text();
}

function serialize(body) {
  if (body instanceof window.FormData) {
    return body;
  } else if ((0, _isObject2.default)(body)) {
    return (0, _stringify2.default)(body);
  } else {
    return body;
  }
}

function wrapNext(next) {
  return function (error, response) {
    if (next) {
      if (next.length > 1) {
        return next(error, response);
      } else if (!error) {
        return next(response);
      }
    }
  };
}

//# sourceMappingURL=fetch.js