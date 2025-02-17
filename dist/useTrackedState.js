"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTrackedState = void 0;

var _react = require("react");

var _Provider = require("./Provider");

var _utils = require("./utils");

var _deepProxy = require("./deepProxy");

var useTrackedState = function useTrackedState() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _opts$customContext = opts.customContext,
      customContext = _opts$customContext === void 0 ? _Provider.defaultContext : _opts$customContext;
  var forceUpdate = (0, _utils.useForceUpdate)();

  var _useContext = (0, _react.useContext)(customContext),
      state = _useContext.state,
      subscribe = _useContext.subscribe;

  var affected = new WeakMap();
  var lastTracked = (0, _react.useRef)(null);
  (0, _utils.useIsomorphicLayoutEffect)(function () {
    lastTracked.current = {
      state: state,
      affected: affected,
      cache: new WeakMap(),

      /* eslint-disable no-nested-ternary, indent, @typescript-eslint/indent */
      assumeChangedIfNotAffected: opts.unstable_forceUpdateForStateChange ? true : opts.unstable_ignoreIntermediateObjectUsage ? false :
      /* default */
      null
      /* eslint-enable no-nested-ternary, indent, @typescript-eslint/indent */

    };
  });
  (0, _react.useEffect)(function () {
    var callback = function callback(nextState) {
      if (lastTracked.current.state === nextState || !(0, _deepProxy.isDeepChanged)(lastTracked.current.state, nextState, lastTracked.current.affected, lastTracked.current.cache, lastTracked.current.assumeChangedIfNotAffected)) {
        // not changed
        return;
      }

      forceUpdate();
    };

    var unsubscribe = subscribe(callback);
    return unsubscribe;
  }, [subscribe, forceUpdate]);
  var proxyCache = (0, _react.useRef)(new WeakMap()); // per-hook proxyCache

  return (0, _deepProxy.createDeepProxy)(state, affected, proxyCache.current);
};

exports.useTrackedState = useTrackedState;