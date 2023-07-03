{
  const INIT_FUNC_NAME = '**VMInitInjection**';
  if (window[INIT_FUNC_NAME] !== 1)
        window[INIT_FUNC_NAME] = function (IS_FIREFOX,PAGE_MODE_HANDSHAKE,VAULT_ID) {
          const module = { __proto__: null };
          /* eslint-disable no-unused-vars */

/**
 * This file is used first by the entire `src` including `injected`.
 * `global` is used instead of WebPack's polyfill which we disable in webpack.conf.js.
 * Not exporting NodeJS built-in globals as this file is imported in the test scripts.
 */
const global = false ? globalThis : this; // eslint-disable-line no-undef

const {
  window
} = global; // it's unforgeable so we extract it primarily to improve minification

const VIOLENTMONKEY = 'Violentmonkey';
const AUTO = 'auto';
const CONTENT = 'content';
const EXPOSE = 'expose';
const FORCE_CONTENT = 'forceContent';
const IDS = 'ids';
const ID_BAD_REALM = -1;
const ID_INJECTING = 2;
const INJECT_INTO = 'injectInto';
const MORE = 'more';
const PAGE = 'page';
const RUN_AT = 'runAt';
const SCRIPTS = 'scripts';
const VALUES = 'values';
const kResponse = 'response';
const kResponseHeaders = 'responseHeaders';
const kResponseText = 'responseText';
const kResponseType = 'responseType';
const kSessionId = 'sessionId';

const isFunction = val => typeof val === 'function';

const isObject = val => val != null && typeof val === 'object';
/* eslint-disable no-unused-vars */

/**
 * This file runs before safe-globals of `injected-content` and `injected-web` entries.
 * `export` is stripped in the final output and is only used for our NodeJS test scripts.
 * WARNING! Don't use exported functions from @/common anywhere in injected!
 */
const PROTO = 'prototype';
const CALLBACK_ID = '__CBID';
const kFileName = 'fileName';

const throwIfProtoPresent = false && (obj => {
  if (!obj || obj.__proto__) {
    // eslint-disable-line no-proto
    throw 'proto is not null';
  }
});

const isString = val => typeof val === 'string';

const getOwnProp = (obj, key, defVal) => {
  // obj may be a Proxy that throws in has() or its getter throws
  try {
    if (obj && hasOwnProperty(obj, key)) {
      defVal = obj[key];
    }
  } catch (e) {
    /* NOP */
  }

  return defVal;
};
/**
 * @param {T} obj
 * @param {string|Symbol} key
 * @param {?} value
 * @param {boolean} [mutable]
 * @param {'set' | 'get'} [valueKey]
 * @return {T}
 * @template T
 */


const setOwnProp = (obj, key, value, mutable = true, valueKey) => defineProperty(obj, key, {
  __proto__: null,
  [valueKey || 'value']: value,
  [!valueKey && 'writable']: mutable,
  // only allowed for 'value'
  configurable: mutable,
  enumerable: mutable
});

const nullObjFrom = src => false ? global.Object.assign({
  __proto__: null
}, src) : assign(createNullObj(), src);
/** If `dst` has a proto, it'll be copied into a new proto:null object */


const safePickInto = (dst, src, keys) => {
  if (getPrototypeOf(dst)) {
    dst = nullObjFrom(dst);
  }

  if (src) {
    safeCall(forEach, keys, key => {
      if (hasOwnProperty(src, key)) {
        dst[key] = src[key];
      }
    });
  }

  return dst;
}; // WARNING! `obj` must use __proto__:null


const ensureNestedProp = (obj, bucketId, key, defaultValue) => {
  var _bucket$key;

  if (false) throwIfProtoPresent(obj);
  const bucket = obj[bucketId] || (obj[bucketId] = createNullObj());
  const val = (_bucket$key = bucket[key]) != null ? _bucket$key : bucket[key] = defaultValue != null ? defaultValue : createNullObj();
  return val;
};

const promiseResolve = async val => val; // Using just one random() to avoid many methods in vault just for this


const safeGetUniqId = (prefix = 'VM') => prefix + mathRandom();
/** args is [tags?, ...rest] */


const log = (level, ...args) => {
  let s = `[${VIOLENTMONKEY}]`;
  if (args[0]) safeCall(forEach, args[0], tag => {
    s += `[${tag}]`;
  });
  args[0] = s;
  safeApply(logging[level], logging, args);
};
/**
 * Object.defineProperty seems to be inherently broken: it reads inherited props from desc
 * (even though the purpose of this API is to define own props) and then complains when it finds
 * invalid props like an inherited setter when you only provide `{value}`.
 */


const safeDefineProperty = (obj, key, desc) => defineProperty(obj, key, getPrototypeOf(desc) ? nullObjFrom(desc) : desc);
/** Unlike ::push() this one doesn't call possibly spoofed Array.prototype setters */


const safePush = (arr, val) => setOwnProp(arr, arr.length, val);
/* eslint-disable one-var, one-var-declaration-per-line, no-unused-vars,
   prefer-const */

/**
 * `safeCall` is used by our modified babel-plugin-safe-bind.js.
 * `export` is stripped in the final output and is only used for our NodeJS test scripts.
 * To ensure the minified name is 1 char we declare the super frequently used names first.
 */
let safeCall, // ~50 "::" calls
createNullObj, // ~25 calls
forEach, // ~15 calls
safeApply, safeBind, // window
SafeCustomEvent, SafeDOMParser, SafeError, SafeEventTarget, SafeKeyboardEvent, SafeMouseEvent, Object, SafeProxy, SafeSymbol, UnsafePromise, fire, getWindowLength, getWindowParent, off, on, // Symbol
toStringTagSym, // Object
assign, defineProperty, describeProperty, getPrototypeOf, objectKeys, objectValues,
/** Array.prototype can be eavesdropped via setters like '0','1',...
 * on `push` and `arr[i] = 123`, as well as via getters if you read beyond
 * its length or from an unassigned `hole`. */
concat, filter, indexOf, // Element.prototype
remove, // String.prototype
slice, // various values
builtinGlobals, // various methods
URLToString, arrayIsArray, createObjectURL, formDataEntries, hasOwnProperty, jsonParse, jsonStringify, logging, mathRandom, parseFromString, // DOMParser
reflectOwnKeys, stopImmediatePropagation, then, urlSearchParamsToString, // various getters
getCurrentScript, // Document
getDetail, // CustomEvent
getRelatedTarget; // MouseEvent

const cloneInto = PAGE_MODE_HANDSHAKE ? null : global.cloneInto;
/**
 * VAULT consists of the parent's safe globals to protect our communications/globals
 * from a page that creates an iframe with src = location and modifies its contents
 * immediately after adding it to DOM via direct manipulation in frame.contentWindow
 * or window[0] before our content script runs at document_start, https://crbug.com/1261964 */

const VAULT = (() => {
  let ArrayP;
  let Reflect;
  let SafeObject;
  let i = -1;
  let call;
  /** Precaution against browser bugs: Symbol.toStringTag was exposed on `window` in FF88 */

  let getOwnPropertyNames;
  let res;
  let srcFF;
  let src = global; // FF defines some stuff only on `global` in content mode

  let srcWindow = window;

  if (VAULT_ID) {
    res = window[VAULT_ID];
    delete window[VAULT_ID];
  }

  if (res && !isFunction(res[0])) {
    // res is [this, addVaultExports object]
    // injectPageSandbox iframe's `global` is `window` because it's in page mode
    src = res[0];
    srcWindow = src; // In FF some stuff from a detached iframe doesn't work, so we export it from content

    srcFF = IS_FIREFOX && res[1];
    res = false;
  }

  if (!res) {
    res = {
      __proto__: null
    };
  }

  res = [// window
  SafeCustomEvent = res[i += 1] || src.CustomEvent, SafeDOMParser = res[i += 1] || src.DOMParser, SafeError = res[i += 1] || src.Error, SafeEventTarget = res[i += 1] || src.EventTarget, SafeKeyboardEvent = res[i += 1] || src.KeyboardEvent, SafeMouseEvent = res[i += 1] || src.MouseEvent, Object = res[i += 1] || src.Object, SafeSymbol = res[i += 1] || src.Symbol, // In FF content mode global.Proxy !== window.Proxy
  SafeProxy = res[i += 1] || src.Proxy, fire = res[i += 1] || src.dispatchEvent, off = res[i += 1] || src.removeEventListener, on = res[i += 1] || src.addEventListener, // Object - using SafeObject to pacify eslint without disabling the rule
  defineProperty = (SafeObject = Object) && res[i += 1] || SafeObject.defineProperty, describeProperty = res[i += 1] || SafeObject.getOwnPropertyDescriptor, getOwnPropertyNames = res[i += 1] || SafeObject.getOwnPropertyNames, getPrototypeOf = res[i += 1] || SafeObject.getPrototypeOf, assign = res[i += 1] || SafeObject.assign, objectKeys = res[i += 1] || SafeObject.keys, objectValues = res[i += 1] || SafeObject.values, // Array.prototype
  concat = res[i += 1] || (ArrayP = src.Array[PROTO]).concat, filter = res[i += 1] || ArrayP.filter, forEach = res[i += 1] || ArrayP.forEach, indexOf = res[i += 1] || ArrayP.indexOf, // Element.prototype
  remove = res[i += 1] || src.Element[PROTO].remove, // String.prototype
  slice = res[i += 1] || src.String[PROTO].slice, // safeCall
  safeApply = res[i += 1] || (Reflect = src.Reflect).apply, safeCall = res[i += 1] || (call = SafeObject.call).bind(call), // WARNING! In FF bind fails when used with `window` events, see proxyDescribe
  safeBind = res[i += 1] || call.bind(SafeObject.bind), // various methods
  URLToString = res[i += 1] || src.URL[PROTO].toString, createNullObj = res[i += 1] || safeBind(SafeObject.create, SafeObject, null), createObjectURL = res[i += 1] || src.URL.createObjectURL, formDataEntries = res[i += 1] || src.FormData[PROTO].entries, hasOwnProperty = res[i += 1] || safeBind(call, SafeObject[PROTO].hasOwnProperty), arrayIsArray = res[i += 1] || src.Array.isArray,
  /* Exporting JSON methods separately instead of exporting SafeJSON as its props may be broken
   * by the page if it gains access to any Object from the vault e.g. a thrown SafeError. */
  jsonParse = res[i += 1] || src.JSON.parse, jsonStringify = res[i += 1] || src.JSON.stringify, logging = res[i += 1] || nullObjFrom((srcFF || src).console), mathRandom = res[i += 1] || src.Math.random, parseFromString = res[i += 1] || SafeDOMParser[PROTO].parseFromString, reflectOwnKeys = res[i += 1] || Reflect.ownKeys, stopImmediatePropagation = res[i += 1] || src.Event[PROTO].stopImmediatePropagation, then = res[i += 1] || src.Promise[PROTO].then, urlSearchParamsToString = res[i += 1] || src.URLSearchParams[PROTO].toString, // various getters
  getCurrentScript = res[i += 1] || describeProperty(src.Document[PROTO], 'currentScript').get, getDetail = res[i += 1] || describeProperty(SafeCustomEvent[PROTO], 'detail').get, getRelatedTarget = res[i += 1] || describeProperty(SafeMouseEvent[PROTO], 'relatedTarget').get, getWindowLength = res[i += 1] || describeProperty(srcWindow, 'length').get || (() => getOwnProp(window, 'length', 1e9)), // Chrome<=85 https://crrev.com/793165
  getWindowParent = res[i += 1] || describeProperty(srcWindow, 'parent').get || (() => getOwnProp(window, 'parent')), // Chrome<=85 https://crrev.com/793165
  // various values
  builtinGlobals = res[i += 1] || [getOwnPropertyNames(srcWindow), src !== srcWindow && getOwnPropertyNames(src)]]; // Well-known Symbols are unforgeable

  toStringTagSym = SafeSymbol.toStringTag;
  return res;
})();

try {
  /* We can't use safe Promise from vault because it stops working when iframe is removed,
   * so we use the unsafe current global - only for userscript API stuff, not internally.
   * Using `try` because the `Promise` global may be an already spoofed getter.
   * TODO: try reimplementing Promise in our sandbox wrapper if it can work with user code */
  UnsafePromise = Promise;
} catch (e) {
  /**/
}/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({__proto__: null,/***/ "./src/injected/web/bridge.js":
/*!************************************!*\
  !*** ./src/injected/web/bridge.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {__proto__: null,/* harmony export */   "addHandlers": () => (/* binding */ addHandlers),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const handlers = createNullObj();
const addHandlers = obj => assign(handlers, obj);
const callbacks = {
  __proto__: null,

  Error(err) {
    throw err;
  }

};
/**
 * @property {VMScriptGMInfoPlatform} ua
 * @property {VMBridgePostFunc} post
 * @property {VMBridgeMode} mode
 */

const bridge = {
  __proto__: null,
  callbacks,

  onHandle({
    cmd,
    data,
    node
  }) {
    const fn = handlers[cmd];
    if (fn) safeCall(fn, node, data);
  },

  send(cmd, data, node) {
    let cb;
    let res;

    try {
      res = new UnsafePromise(resolve => {
        cb = resolve;
      });
    } catch (e) {// Unavoidable since vault's Promise can't be used after the iframe is removed
    }

    postWithCallback(cmd, data, node, cb);
    return res;
  },

  call: postWithCallback
};
let callbackResult;

function postWithCallback(cmd, data, node, cb, customCallbackId) {
  const id = safeGetUniqId();
  callbacks[id] = cb || defaultCallback;

  if (customCallbackId) {
    setOwnProp(data, customCallbackId, id);
  } else {
    data = {
      [CALLBACK_ID]: id,
      data
    };
  }

  bridge.post(cmd, data, node);
  if (!cb) return callbackResult;
}

function defaultCallback(val) {
  callbackResult = val;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (bridge);

/***/ }),

/***/ "./src/injected/web/gm-api-wrapper.js":
/*!********************************************!*\
  !*** ./src/injected/web/gm-api-wrapper.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {__proto__: null,/* harmony export */   "makeGmApiWrapper": () => (/* binding */ makeGmApiWrapper)
/* harmony export */ });
/* harmony import */ var _bridge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bridge */ "./src/injected/web/bridge.js");
/* harmony import */ var _gm_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gm-api */ "./src/injected/web/gm-api.js");
/* harmony import */ var _gm_global_wrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gm-global-wrapper */ "./src/injected/web/gm-global-wrapper.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util */ "./src/injected/web/util.js");




/** Name in Greasemonkey4 -> name in GM */

const GM4_ALIAS = {
  __proto__: null,
  getResourceUrl: 'getResourceURL',
  xmlHttpRequest: 'xmlhttpRequest'
};
const GM4_ASYNC = {
  __proto__: null,
  getResourceUrl: 1,
  getValue: 1,
  deleteValue: 1,
  setValue: 1,
  listValues: 1
};
const componentUtils = (0,_util__WEBPACK_IMPORTED_MODULE_3__.makeComponentUtils)();

const sendTabClose = () => _bridge__WEBPACK_IMPORTED_MODULE_0__["default"].post('TabClose');

const sendTabFocus = () => _bridge__WEBPACK_IMPORTED_MODULE_0__["default"].post('TabFocus');
/**
 * @param {VMInjection.Script} script
 * @returns {Object}
 */


function makeGmApiWrapper(script) {
  // Add GM functions
  // Reference: http://wiki.greasespot.net/Greasemonkey_Manual:API
  const {
    id,
    meta
  } = script;
  const {
    grant
  } = meta;
  const resources = nullObjFrom(meta.resources);
  /** @type {GMContext} */

  const context = {
    __proto__: null,
    // necessary for optional props like `async`
    id,
    script,
    resources,
    resCache: createNullObj()
  };
  const gmInfo = makeGmInfo(script.gmi, meta, resources);
  const gm4 = {
    __proto__: null,
    info: gmInfo
  };
  const gm = {
    __proto__: null,
    GM: gm4,
    GM_info: gmInfo,
    unsafeWindow: global
  };
  let contextAsync;
  let wrapper;
  let numGrants = grant.length;

  if (numGrants === 1 && grant[0] === 'none') {
    numGrants = 0;
  }

  assign(gm, componentUtils);
  safeCall(forEach, grant, name => {
    const namePrefix = safeCall(slice, name, 0, 3);
    const gm4name = namePrefix === 'GM.' && safeCall(slice, name, 3);
    const gmName = gm4name ? `GM_${GM4_ALIAS[name = gm4name] || gm4name}` : name;
    const fnBound = _gm_api__WEBPACK_IMPORTED_MODULE_1__.GM_API.bound[gmName];
    let fn = fnBound || _gm_api__WEBPACK_IMPORTED_MODULE_1__.GM_API.free[gmName];

    if (fnBound) {
      fn = safeBind(fn, GM4_ASYNC[gm4name] ? contextAsync || (contextAsync = assign(createNullObj(), {
        async: true
      }, context)) : context);
    } else if (!fn && (fn = name === 'window.close' && sendTabClose || name === 'window.focus' && sendTabFocus)) {
      name = safeCall(slice, name, 7); // 'window.'.length
    }

    if (fn) {
      (gm4name ? gm4 : gm)[name] = fn;
    }
  });

  if (numGrants) {
    wrapper = (0,_gm_global_wrapper__WEBPACK_IMPORTED_MODULE_2__.makeGlobalWrapper)(gm);
    /* Exposing the fast cache of resolved properties,
     * using a name that'll never be added to the web platform */

    gm.c = gm;
  }

  return {
    gm,
    wrapper
  };
}

function makeGmInfo(gmInfo, meta, resources) {
  const resourcesArr = objectKeys(resources);
  safeCall(forEach, resourcesArr, (name, i) => {
    resourcesArr[i] = {
      name,
      url: resources[name]
    };
  }); // No __proto__:null because these are standard objects for userscripts

  meta.resources = resourcesArr;
  return safeAssign(gmInfo, {
    [INJECT_INTO]: _bridge__WEBPACK_IMPORTED_MODULE_0__["default"].mode,
    platform: safeAssign({}, _bridge__WEBPACK_IMPORTED_MODULE_0__["default"].ua),
    script: meta,
    scriptHandler: VIOLENTMONKEY,
    version: "2.14.2"
  });
}

function safeAssign(dst, src) {
  for (let _i = 0, _objectKeys = objectKeys(src); _i < _objectKeys.length; _i++) {
    const key = _objectKeys[_i];
    setOwnProp(dst, key, src[key]);
  }

  return dst;
}

/***/ }),

/***/ "./src/injected/web/gm-api.js":
/*!************************************!*\
  !*** ./src/injected/web/gm-api.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {__proto__: null,/* harmony export */   "GM_API": () => (/* binding */ GM_API)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./src/injected/util/index.js");
/* harmony import */ var _bridge__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bridge */ "./src/injected/web/bridge.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./store */ "./src/injected/web/store.js");
/* harmony import */ var _tabs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tabs */ "./src/injected/web/tabs.js");
/* harmony import */ var _requests__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./requests */ "./src/injected/web/requests.js");
/* harmony import */ var _notifications__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./notifications */ "./src/injected/web/notifications.js");
/* harmony import */ var _gm_values__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./gm-values */ "./src/injected/web/gm-values.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./util */ "./src/injected/web/util.js");









const resolveOrReturn = (context, val) => context.async ? promiseResolve(val) : val;

const GM_API = {
  bound: {
    __proto__: null,

    /** @this {GMContext} */
    GM_deleteValue(key) {
      const {
        id
      } = this;
      const values = (0,_gm_values__WEBPACK_IMPORTED_MODULE_6__.loadValues)(id);
      const oldRaw = values[key];
      delete values[key]; // using `undefined` to match the documentation and TM for GM_addValueChangeListener

      return (0,_gm_values__WEBPACK_IMPORTED_MODULE_6__.dumpValue)(id, key, undefined, null, oldRaw, this);
    },

    /** @this {GMContext} */
    GM_getValue(key, def) {
      const raw = (0,_gm_values__WEBPACK_IMPORTED_MODULE_6__.loadValues)(this.id)[key];
      return resolveOrReturn(this, raw ? (0,_gm_values__WEBPACK_IMPORTED_MODULE_6__.decodeValue)(raw) : def);
    },

    /** @this {GMContext} */
    GM_listValues() {
      return resolveOrReturn(this, objectKeys((0,_gm_values__WEBPACK_IMPORTED_MODULE_6__.loadValues)(this.id)));
    },

    /** @this {GMContext} */
    GM_setValue(key, val) {
      const {
        id
      } = this;
      const raw = (0,_util__WEBPACK_IMPORTED_MODULE_0__.dumpScriptValue)(val, _util__WEBPACK_IMPORTED_MODULE_7__.jsonDump) || null;
      const values = (0,_gm_values__WEBPACK_IMPORTED_MODULE_6__.loadValues)(id);
      const oldRaw = values[key];
      values[key] = raw;
      return (0,_gm_values__WEBPACK_IMPORTED_MODULE_6__.dumpValue)(id, key, val, raw, oldRaw, this);
    },

    /**
     * @callback GMValueChangeListener
     * @param {String} key
     * @param {?} oldValue - `undefined` means value was created
     * @param {?} newValue - `undefined` means value was removed
     * @param {boolean} remote - `true` means value was modified in another tab
     */

    /**
     * @this {GMContext}
     * @param {String} key - name of the value to monitor
     * @param {GMValueChangeListener} fn - callback
     * @returns {String} listenerId
     */
    GM_addValueChangeListener(key, fn) {
      if (!isString(key)) key = `${key}`;
      if (!isFunction(fn)) return;
      const hooks = ensureNestedProp(_gm_values__WEBPACK_IMPORTED_MODULE_6__.changeHooks, this.id, key);
      const i = safeCall(indexOf, objectValues(hooks), fn);
      let listenerId = i >= 0 && objectKeys(hooks)[i];

      if (!listenerId) {
        listenerId = safeGetUniqId('VMvc');
        hooks[listenerId] = fn;
      }

      return listenerId;
    },

    /**
     * @this {GMContext}
     * @param {String} listenerId
     */
    GM_removeValueChangeListener(listenerId) {
      const keyHooks = _gm_values__WEBPACK_IMPORTED_MODULE_6__.changeHooks[this.id];
      if (!keyHooks) return;
      if (false) {}

      for (const key in keyHooks) {
        /* proto is null */
        // eslint-disable-line guard-for-in
        const hooks = keyHooks[key];

        if (listenerId in hooks) {
          delete hooks[listenerId];
          if ((0,_util__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(hooks)) delete keyHooks[key];
          break;
        }
      }

      if ((0,_util__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(keyHooks)) delete _gm_values__WEBPACK_IMPORTED_MODULE_6__.changeHooks[this.id];
    },

    /** @this {GMContext} */
    GM_getResourceText(name) {
      return getResource(this, name);
    },

    /** @this {GMContext} */
    GM_getResourceURL(name, isBlobUrl) {
      return getResource(this, name, !!isBlobUrl, isBlobUrl === undefined);
    },

    /** @this {GMContext} */
    GM_registerMenuCommand(cap, func) {
      const {
        id
      } = this;
      const key = `${id}:${cap}`;
      _store__WEBPACK_IMPORTED_MODULE_2__["default"].commands[key] = func;
      _bridge__WEBPACK_IMPORTED_MODULE_1__["default"].post('RegisterMenu', {
        id,
        cap
      });
      return cap;
    },

    /** @this {GMContext} */
    GM_unregisterMenuCommand(cap) {
      const {
        id
      } = this;
      const key = `${id}:${cap}`;
      delete _store__WEBPACK_IMPORTED_MODULE_2__["default"].commands[key];
      _bridge__WEBPACK_IMPORTED_MODULE_1__["default"].post('UnregisterMenu', {
        id,
        cap
      });
    },

    /**
     * @this {GMContext}
     * @param {VMScriptGMDownloadOptions|string} opts
     * @param {string} [name]
     */
    GM_download(opts, name) {
      let onload;

      if (isString(opts)) {
        opts = nullObjFrom({
          url: opts,
          name
        });
      } else if (opts) {
        opts = nullObjFrom(opts);
        name = opts.name;
        onload = opts.onload;
      }

      if (!name ? name = 'missing' : !isString(name) && (name = 'not a string')) {
        (0,_requests__WEBPACK_IMPORTED_MODULE_4__.onRequestInitError)(opts, new SafeError(`Required parameter "name" is ${name}.`));
        return;
      }

      assign(opts, {
        [kResponseType]: 'blob',
        data: null,
        method: 'GET',
        overrideMimeType: 'application/octet-stream',
        // Must be present and a function to trigger downloadBlob in content bridge
        onload: isFunction(onload) ? onload : () => {}
      });
      return (0,_requests__WEBPACK_IMPORTED_MODULE_4__.onRequestCreate)(opts, this, name);
    },

    /** @this {GMContext} */
    GM_xmlhttpRequest(opts) {
      return (0,_requests__WEBPACK_IMPORTED_MODULE_4__.onRequestCreate)(nullObjFrom(opts), this);
    }

  },
  free: {
    __proto__: null,

    /**
     * Bypasses site's CSP for inline `style`, `link`, and `script`.
     * @param {Node} [parent]
     * @param {string} tag
     * @param {Object} [attributes]
     * @returns {HTMLElement} it also has .then() so it should be compatible with TM
     */
    GM_addElement(parent, tag, attributes) {
      return isString(parent) ? webAddElement(null, parent, tag) : webAddElement(parent, tag, attributes);
    },

    /**
     * Bypasses site's CSP for inline `style`.
     * @param {string} css
     * @returns {HTMLElement} it also has .then() so it should be compatible with TM and old VM
     */
    GM_addStyle(css) {
      return webAddElement(null, 'style', {
        textContent: css,
        id: safeGetUniqId('VMst')
      });
    },

    GM_openInTab(url, options) {
      options = nullObjFrom(isObject(options) ? options : {
        active: !options
      });
      options.url = url;
      return (0,_tabs__WEBPACK_IMPORTED_MODULE_3__.onTabCreate)(options);
    },

    GM_notification(text, title, image, onclick) {
      const options = isObject(text) ? text : {
        __proto__: null,
        text,
        title,
        image,
        onclick
      };

      if (!options.text) {
        throw new SafeError('GM_notification: `text` is required!');
      }

      const id = (0,_notifications__WEBPACK_IMPORTED_MODULE_5__.onNotificationCreate)(options);
      return {
        remove: () => _bridge__WEBPACK_IMPORTED_MODULE_1__["default"].send('RemoveNotification', id)
      };
    },

    GM_setClipboard(data, type) {
      _bridge__WEBPACK_IMPORTED_MODULE_1__["default"].post('SetClipboard', {
        data,
        type
      });
    },

    // using the native console.log so the output has a clickable link to the caller's source
    GM_log: logging.log
  }
};

function webAddElement(parent, tag, attrs) {
  let el;
  let errorInfo;
  _bridge__WEBPACK_IMPORTED_MODULE_1__["default"].call('AddElement', {
    tag,
    attrs
  }, parent, function _(res) {
    el = this;
    errorInfo = res;
  }, 'cbId'); // DOM error in content script can't be caught by a page-mode userscript so we rethrow it here

  if (errorInfo) {
    const err = new SafeError(errorInfo[0]);
    err.stack += `\n${errorInfo[1]}`;
    throw err;
  }
  /* A Promise polyfill is not actually necessary because DOM messaging is synchronous,
     but we keep it for compatibility with GM_addStyle in VM of 2017-2019
     https://github.com/violentmonkey/violentmonkey/issues/217
     as well as for GM_addElement in Tampermonkey. */


  return setOwnProp(el, 'then', async cb => // Preventing infinite resolve loop
  delete el.then // Native Promise ignores non-function
  && (isFunction(cb) ? cb(el) : el));
}
/**
 * @param {GMContext} context
 * @param name
 * @param isBlob
 * @param isBlobAuto
 */


function getResource(context, name, isBlob, isBlobAuto) {
  let res;
  const {
    id,
    resCache,
    resources
  } = context;
  const key = resources[name];

  if (key) {
    // data URIs aren't cached in bridge, so we'll send them
    const isData = safeCall(slice, key, 0, 5) === 'data:';
    const bucketKey = isBlob == null ? 0 : 1 + (isBlob = isBlobAuto ? !isData : isBlob);
    res = isData && isBlob === false || ensureNestedProp(resCache, bucketKey, key, false);

    if (!res) {
      res = _bridge__WEBPACK_IMPORTED_MODULE_1__["default"].call('GetResource', {
        id,
        isBlob,
        key,
        raw: isData && key
      });

      if (res !== true && isBlob) {
        // Creating Blob URL in page context to make it accessible for page userscripts
        res = createObjectURL(res);
      }

      ensureNestedProp(resCache, bucketKey, key, res);
    }
  }

  return resolveOrReturn(context, res === true ? key : res);
}

/***/ }),

/***/ "./src/injected/web/gm-global-wrapper.js":
/*!***********************************************!*\
  !*** ./src/injected/web/gm-global-wrapper.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {__proto__: null,/* harmony export */   "makeGlobalWrapper": () => (/* binding */ makeGlobalWrapper)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/injected/web/util.js");

const scopeSym = SafeSymbol.unscopables;
const globalKeysSet = (0,_util__WEBPACK_IMPORTED_MODULE_0__.FastLookup)();

const globalKeys = function makeGlobalKeys() {
  const kWrappedJSObject = 'wrappedJSObject';
  const isContentMode = !PAGE_MODE_HANDSHAKE;
  const names = builtinGlobals[0]; // `window` keys

  const numFrames = safeCall(getWindowLength, window); // True if `names` is usable as is, but FF is bugged: its names have duplicates

  let ok = !IS_FIREFOX;

  for (let _i = 0; _i < names.length; _i++) {
    const key = names[_i];

    if (+key >= 0 && key < numFrames || isContentMode && (key === "**VMInitInjection**" || key === 'browser' || key === 'chrome')) {
      ok = false;
    } else {
      globalKeysSet.set(key, 1);
    }
  }
  /* Chrome and FF page mode: `global` is `window`
     FF content mode: `global` is different, some props e.g. `isFinite` are defined only there */


  if (global !== window) {
    safeCall(forEach, builtinGlobals[1], key => {
      if (!(+key >= 0 && key < numFrames)) {
        // keep the `!` inversion to avoid safe-guarding isNaN
        globalKeysSet.set(key, -1);
        ok = false;
      }
    });
  } // wrappedJSObject is not included in getOwnPropertyNames so we add it explicitly.


  if (IS_FIREFOX && !PAGE_MODE_HANDSHAKE && kWrappedJSObject in global && !globalKeysSet.get(kWrappedJSObject)) {
    globalKeysSet.set(kWrappedJSObject, 1);
    if (ok) setOwnProp(names, names.length, kWrappedJSObject);
  }

  return ok ? names : globalKeysSet.toArray();
}();

const inheritedKeys = createNullObj();
const globalDesc = createNullObj();

const updateGlobalDesc = name => {
  let src;
  let desc;
  let fn;

  if ((src = inheritedKeys[name]) || (src = globalKeysSet.get(name)) && (src = src > 0 ? window : global)) {
    if (desc = describeProperty(src, name)) {
      desc = nullObjFrom(desc);
      /* ~45 enumerable action functions belong to `window` and need to be bound to it,
       * the non-enum ~10 can be unbound, and `eval` MUST be unbound to run in scope. */

      if (name >= 'a' && desc.enumerable && isFunction(fn = desc.value)) {
        // TODO: switch to SafeProxy and preserve thisArg when it's not our wrapper or its cache?
        fn = safeBind(fn, src === global ? global : window);
        desc.value = defineProperty(fn, 'name', {
          __proto__: null,
          value: name
        });
      } // Using `!` to avoid the need to use and safe-guard isNaN


      if (!(+name >= 0 && name < safeCall(getWindowLength, window))) {
        globalDesc[name] = desc;
      }

      return desc;
    }
  }
};

safeCall(forEach, [SafeEventTarget, Object], src => {
  safeCall(forEach, reflectOwnKeys(src = src[PROTO]), key => {
    inheritedKeys[key] = src;
  });
});
builtinGlobals = null; // eslint-disable-line no-global-assign

/**
 * @desc Wrap helpers to prevent unexpected modifications.
 */

function makeGlobalWrapper(local) {
  let globals = globalKeysSet; // will be copied only if modified

  /* Browsers may return [object Object] for Object.prototype.toString(window)
     on our `window` proxy so jQuery libs see it as a plain object and throw
     when trying to clone its recursive properties like `self` and `window`. */

  setOwnProp(local, toStringTagSym, () => 'Window', false, 'get');
  const events = createNullObj();
  const wrapper = new SafeProxy(local, {
    __proto__: null,

    defineProperty(_, name, desc) {
      if (name in local || !(_ = globalDesc[name] || updateGlobalDesc(name)) || _.configurable) {
        /* It's up to caller to protect proto */
        // eslint-disable-next-line no-restricted-syntax
        return defineProperty(local, name, desc);
      }
    },

    deleteProperty(_, name) {
      if ((_ = delete local[name]) && (_ = globalDesc[name] || updateGlobalDesc(name)) && (_ = _.configurable)) {
        if (globals === globalKeysSet) {
          globals = globalKeysSet.clone();
        }

        globals.delete(name);
      }

      return !!_;
    },

    get: (_, name) => {
      if (name === 'undefined' || name === scopeSym) return;
      if ((_ = local[name]) !== undefined || name in local) return _;
      return proxyDescribe(local, name, wrapper, events) && local[name];
    },
    getOwnPropertyDescriptor: (_, name) => describeProperty(local, name) || proxyDescribe(local, name, wrapper, events),
    has: (_, name) => name in globalDesc || name in local || updateGlobalDesc(name),
    ownKeys: () => makeOwnKeys(local, globals),

    preventExtensions() {},

    set(_, name, value) {
      if (!(name in local)) proxyDescribe(local, name, wrapper, events);
      local[name] = value;
      return true;
    }

  });
  return wrapper;
}

function makeOwnKeys(local, globals) {
  /** Note that arrays can be eavesdropped via prototype setters like '0','1',...
   * on `push` and `arr[i] = 123`, as well as via getters if you read beyond
   * its length or from an unassigned `hole`. */
  const frameIndexes = [];
  const len = safeCall(getWindowLength, window);

  for (let i = 0, str; i < len && getOwnProp(window, str = `${i}`); i += 1) {
    if (!(str in local)) safePush(frameIndexes, str);
  }

  return (0,_util__WEBPACK_IMPORTED_MODULE_0__.safeConcat)(frameIndexes, globals === globalKeysSet ? globalKeys : globals.toArray(), safeCall(filter, reflectOwnKeys(local), notIncludedIn, globals.get));
}

function proxyDescribe(local, name, wrapper, events) {
  let desc = globalDesc[name] || updateGlobalDesc(name);
  if (!desc) return;
  const {
    get,
    set,
    value
  } = desc;
  const isWindow = value === window || name === 'window' || name === 'self' || name === 'globalThis' || name === 'top' && window === top // `top` is unforgeable
  || name === 'parent' && window === safeCall(getWindowParent, window);

  if (isWindow) {
    desc.value = wrapper;
    delete desc.get;
    delete desc.set;
  } else if (get && set && typeof name === 'string' // Spoofed String index getters won't be called within length, length itself is unforgeable
  && name.length >= 3 && name[0] === 'o' && name[1] === 'n') {
    setWindowEvent(desc, name, events, wrapper);
  } else {
    if (get) desc.get = safeBind(get, window);
    if (set) desc.set = safeBind(set, window);
  }

  defineProperty(local, name, desc);
  /* proto is null */
  // eslint-disable-line no-restricted-syntax

  return desc;
}

function setWindowEvent(desc, name, events, wrapper) {
  name = safeCall(slice, name, 2);

  desc.get = () => events[name] || null;

  desc.set = fn => {
    safeCall(off, window, name, events[name]);

    if (isFunction(fn)) {
      // the handler will be unique so that one script couldn't remove something global
      // like console.log set by another script
      safeCall(on, window, name, events[name] = // FF chokes on safeBind because the result belongs to Vault's window
      IS_FIREFOX && PAGE_MODE_HANDSHAKE ? evt => safeCall(fn, wrapper, evt) : safeBind(fn, wrapper));
    } else {
      delete events[name];
    }
  };
}
/** @this {FastLookup.get} */


function notIncludedIn(key) {
  return !this(key);
}

/***/ }),

/***/ "./src/injected/web/gm-values.js":
/*!***************************************!*\
  !*** ./src/injected/web/gm-values.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {__proto__: null,/* harmony export */   "changeHooks": () => (/* binding */ changeHooks),
/* harmony export */   "decodeValue": () => (/* binding */ decodeValue),
/* harmony export */   "dumpValue": () => (/* binding */ dumpValue),
/* harmony export */   "loadValues": () => (/* binding */ loadValues)
/* harmony export */ });
/* harmony import */ var _bridge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bridge */ "./src/injected/web/bridge.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store */ "./src/injected/web/store.js");

 // Nested objects: scriptId -> keyName -> listenerId -> GMValueChangeListener

const changeHooks = createNullObj();
const dataDecoders = {
  __proto__: null,
  o: jsonParse,
  n: val => +val,
  b: val => val === 'true'
};
(0,_bridge__WEBPACK_IMPORTED_MODULE_0__.addHandlers)({
  UpdatedValues(updates) {
    safeCall(forEach, objectKeys(updates), id => {
      const oldData = _store__WEBPACK_IMPORTED_MODULE_1__["default"][VALUES][id];

      if (oldData) {
        const update = updates[id];
        const keyHooks = changeHooks[id];
        if (keyHooks) changedRemotely(keyHooks, oldData, update);else applyPartialUpdate(oldData, update);
      }
    });
  }

});
function loadValues(id) {
  return _store__WEBPACK_IMPORTED_MODULE_1__["default"][VALUES][id];
}
/**
 * @param {number} id
 * @param {string} key
 * @param {?} val
 * @param {?string} raw
 * @param {?string} oldRaw
 * @param {GMContext} context
 * @return {void|Promise<void>}
 */

function dumpValue(id, key, val, raw, oldRaw, context) {
  let res;

  if (raw !== oldRaw) {
    var _changeHooks$id;

    res = _bridge__WEBPACK_IMPORTED_MODULE_0__["default"][context.async ? 'send' : 'post']('UpdateValue', {
      id,
      key,
      raw
    });
    const hooks = (_changeHooks$id = changeHooks[id]) == null ? void 0 : _changeHooks$id[key];
    if (hooks) notifyChange(hooks, key, val, raw, oldRaw);
  } else if (context.async) {
    res = promiseResolve();
  }

  return res;
}
function decodeValue(raw) {
  const type = raw[0];
  const handle = dataDecoders[type];
  let val = safeCall(slice, raw, 1);

  try {
    if (handle) val = handle(val);
  } catch (e) {
    if (false) {}
  }

  return val;
}

function applyPartialUpdate(data, update) {
  safeCall(forEach, objectKeys(update), key => {
    const val = update[key];
    if (val) data[key] = val;else delete data[key];
  });
}

function changedRemotely(keyHooks, data, update) {
  safeCall(forEach, objectKeys(update), key => {
    const raw = update[key] || undefined; // partial `update` currently uses null for deleted values

    const oldRaw = data[key];

    if (oldRaw !== raw) {
      if (raw) data[key] = raw;else delete data[key];
      const hooks = keyHooks[key];
      if (hooks) notifyChange(hooks, key, undefined, raw, oldRaw, true);
    }
  });
}

function notifyChange(hooks, key, val, raw, oldRaw, remote = false) {
  // converting `null` from messaging to `undefined` to match the documentation and TM
  const oldVal = (oldRaw || undefined) && decodeValue(oldRaw);
  const newVal = val === undefined && raw ? decodeValue(raw) : val;
  safeCall(forEach, objectValues(hooks), fn => {
    try {
      fn(key, oldVal, newVal, remote);
    } catch (e) {
      log('error', ['GM_addValueChangeListener', 'callback'], e);
    }
  });
}

/***/ }),

/***/ "./src/injected/web/notifications.js":
/*!*******************************************!*\
  !*** ./src/injected/web/notifications.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {__proto__: null,/* harmony export */   "onNotificationCreate": () => (/* binding */ onNotificationCreate)
/* harmony export */ });
/* harmony import */ var _bridge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bridge */ "./src/injected/web/bridge.js");

let lastId = 0;
const notifications = createNullObj();
(0,_bridge__WEBPACK_IMPORTED_MODULE_0__.addHandlers)({
  NotificationClicked(id) {
    var _notifications$id;

    (_notifications$id = notifications[id]) == null ? void 0 : _notifications$id.onclick == null ? void 0 : _notifications$id.onclick();
  },

  NotificationClosed(id) {
    const options = notifications[id];

    if (options) {
      delete notifications[id];
      options.ondone == null ? void 0 : options.ondone();
    }
  }

});
function onNotificationCreate(options) {
  lastId += 1;
  notifications[lastId] = options;
  _bridge__WEBPACK_IMPORTED_MODULE_0__["default"].post('Notification', {
    id: lastId,
    text: options.text,
    title: options.title,
    image: options.image
  });
  return lastId;
}

/***/ }),

/***/ "./src/injected/web/requests.js":
/*!**************************************!*\
  !*** ./src/injected/web/requests.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {__proto__: null,/* harmony export */   "onRequestCreate": () => (/* binding */ onRequestCreate),
/* harmony export */   "onRequestInitError": () => (/* binding */ onRequestInitError)
/* harmony export */ });
/* harmony import */ var _bridge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bridge */ "./src/injected/web/bridge.js");

/** @type {Object<string,GMReq.Web>} */

const idMap = createNullObj();
const kContentTextHtml = 'text/html';
const kResponse = 'response';
const kResponseXML = 'responseXML';
const kDocument = 'document';
const EVENTS_TO_NOTIFY = ['abort', 'error', 'load', 'loadend', 'loadstart', 'progress', 'readystatechange', 'timeout'];
const OPTS_TO_KEEP = ['context', kResponseType];
const OPTS_TO_PASS = ['headers', 'method', 'overrideMimeType', 'password', 'timeout', 'user'];
const PARSEABLE_TYPES = ['application/xhtml+xml', 'application/xml', 'image/svg+xml', 'text/xml', kContentTextHtml];
const XHR_TYPE = {
  __proto__: null,
  arraybuffer: 1,
  blob: 1,
  json: 0,
  [kDocument]: 0,
  text: 0,
  '': 0
};
(0,_bridge__WEBPACK_IMPORTED_MODULE_0__.addHandlers)({
  /** @param {GMReq.Message.BG} msg */
  HttpRequested(msg) {
    const req = idMap[msg.id];

    if (!req) {
      return;
    }

    const {
      type
    } = msg;
    const cb = req.cb[type];

    if (type === 'loadend') {
      delete idMap[req.id];
    }

    if (!cb) {
      return;
    }

    if (hasOwnProperty(msg, 'error')) {
      cb(new SafeError(
      /** @type {BGError} */
      msg.error));
      return;
    }

    const {
      data
    } = msg;
    const {
      [kResponse]: response,
      [kResponseHeaders]: headers,
      [kResponseText]: text
    } = data;

    if (response != null) {
      req.raw = response;
    }

    if (headers != null) {
      req[kResponseHeaders] = headers;
    }

    if (text != null) {
      req[kResponseText] = getOwnProp(text, 0) === 'same' ? response : text;
    }

    setOwnProp(data, 'context', req.context);
    setOwnProp(data, kResponseHeaders, req[kResponseHeaders]);
    setOwnProp(data, kResponseText, req[kResponseText]);
    setOwnProp(data, kResponseXML, safeBind(parseRaw, data, req, msg, kResponseXML), true, 'get');
    setOwnProp(data, kResponse, safeBind(parseRaw, data, req, msg, kResponse), true, 'get');
    cb(data);
  }

});
/**
 * `response` is sent only when changed so we need to remember it for response-less events
 * `raw` is decoded once per `response` change so we reuse the result just like native XHR
 * @this {VMScriptResponseObject}
 * @param {GMReq.Web} req
 * @param {GMReq.Message.BG} msg
 * @param {string} propName
 * @returns {string | Blob | ArrayBuffer | null}
 */

function parseRaw(req, msg, propName) {
  const {
    [kResponseType]: responseType
  } = req;
  let res, ct;

  if ('raw' in req) {
    res = req.raw;

    if (responseType === kDocument && (ct = kContentTextHtml) || !responseType && propName === kResponseXML && safeCall(indexOf, PARSEABLE_TYPES, ct = getContentType(msg) || kContentTextHtml) >= 0 || responseType === 'json') {
      try {
        res = ct ? safeCall(parseFromString, new SafeDOMParser(), res, ct) : jsonParse(res);
      } catch (e) {
        res = null;
        /* per specification */
      }
    }

    if (responseType === kDocument) {
      const otherPropName = propName === kResponse ? kResponseXML : kResponse;
      setOwnProp(this, otherPropName, res);
      req[otherPropName] = res;
    } // TODO: should we implement this spec behavior?
    // if (propName === kResponseXML && responseType && responseType !== kDocument) {
    //   throw new SafeError('responseXML failed: responseType must be "document" or "" or absent.');
    // }


    if (responseType) {
      delete req.raw;
    }

    req[propName] = res;
  } else {
    res = req[propName];
  }

  if (res === undefined) {
    res = null;
  }

  setOwnProp(this, propName, res);
  return res;
}
/**
 * @param {GMReq.UserOpts} opts - must already have a null proto
 * @param {GMContext} context
 * @param {string} fileName
 * @return {VMScriptXHRControl}
 */


function onRequestCreate(opts, context, fileName) {
  if (false) {}
  let {
    data,
    url,
    [kResponseType]: type = ''
  } = opts;
  let err; // XHR spec requires `url` but allows ''/null/non-string

  if (!url && !('url' in opts)) {
    err = new SafeError('Required parameter "url" is missing.');
  } else if (!isString(url)) {
    if (url === location) {
      url = url.href;
    } // safe window.location is unforgeable
    else {
      try {
        url = safeCall(URLToString, url);
      } // safe window.URL getter
      catch (e) {
        try {
          url = `${url}`;
        } // unsafe toString may throw e.g. for Symbol or if spoofed
        catch (e) {
          err = e;
        }
      }
    }

    opts.url = url;
  }

  if (err) {
    onRequestInitError(opts, err);
    return; // not returning the abort controller as there's no request to abort
  }

  if (!(type in XHR_TYPE)) {
    logging.warn(`Unknown ${kResponseType} "${type}"`);
    type = '';
  }

  const scriptId = context.id;
  const id = safeGetUniqId('VMxhr');
  const cb = createNullObj();
  const req = safePickInto({
    cb,
    id,
    scriptId
  }, opts, OPTS_TO_KEEP); // withCredentials is for GM4 compatibility and used only if `anonymous` is not set,
  // it's true by default per the standard/historical behavior of gmxhr

  const {
    withCredentials = true,
    anonymous = !withCredentials
  } = opts;
  idMap[id] = req;
  data = data == null && [] // `binary` is for TM/GM-compatibility + non-objects = must use a string `data`
  || (opts.binary || !isObject(data)) && [`${data}`] // No browser can send FormData/URLSearchParams directly across worlds
  || getFormData(data) // FF56+ can send any cloneable data directly, FF52-55 can't due to https://bugzil.la/1371246
  || IS_FIREFOX >= 56 && [data] || [data, 'bin'];
  /** @type {GMReq.Message.Web} */

  _bridge__WEBPACK_IMPORTED_MODULE_0__["default"].call('HttpRequest', safePickInto({
    anonymous,
    data,
    id,
    scriptId,
    url,
    [kFileName]: fileName,
    [kResponseType]: type,
    events: safeCall(filter, EVENTS_TO_NOTIFY, key => isFunction(cb[key] = opts[`on${key}`])),
    xhrType: XHR_TYPE[type] ? type : ''
  }, opts, OPTS_TO_PASS));
  return {
    abort() {
      _bridge__WEBPACK_IMPORTED_MODULE_0__["default"].post('AbortRequest', id);
    }

  };
}
function onRequestInitError({
  onerror
}, err) {
  if (isFunction(onerror)) onerror(err);else throw err;
}
/**
 * Not using RegExp because it internally depends on proto stuff that can be easily broken,
 * and safe-guarding all of it is ridiculously disproportional.
 * @param {GMReq.Message.BG} msg
 */

function getContentType(msg) {
  const type = msg.contentType || '';
  const len = type.length;
  let i = 0;
  let c; // Cutting everything after , or ; or whitespace

  while (i < len && (c = type[i]) !== ',' && c !== ';' && c > ' ') {
    i += 1;
  }

  return safeCall(slice, type, 0, i);
}
/** Chrome/FF can't directly transfer FormData to isolated world so we explode it,
 * trusting its iterator is usable because the only reason for a site to break it
 * is to fight a userscript, which it can do by breaking FormData constructor anyway */


function getFormData(data) {
  try {
    return [[...safeCall(formDataEntries, data)], 'fd']; // eslint-disable-line no-restricted-syntax
  } catch (e) {
    /**/
  }

  try {
    return [safeCall(urlSearchParamsToString, data), 'usp'];
  } catch (e) {
    /**/
  }
}

/***/ }),

/***/ "./src/injected/web/store.js":
/*!***********************************!*\
  !*** ./src/injected/web/store.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {__proto__: null,/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  commands: createNullObj(),
  [VALUES]: createNullObj()
});

/***/ }),

/***/ "./src/injected/web/tabs.js":
/*!**********************************!*\
  !*** ./src/injected/web/tabs.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {__proto__: null,/* harmony export */   "onTabCreate": () => (/* binding */ onTabCreate)
/* harmony export */ });
/* harmony import */ var _bridge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bridge */ "./src/injected/web/bridge.js");

let lastId = 0;
const tabs = createNullObj();
(0,_bridge__WEBPACK_IMPORTED_MODULE_0__.addHandlers)({
  TabClosed(key) {
    const item = tabs[key];

    if (item) {
      item.closed = true;
      delete tabs[key];
      item.onclose == null ? void 0 : item.onclose();
    }
  }

});
function onTabCreate(data) {
  lastId += 1;
  const key = lastId;
  const item = {
    onclose: null,
    closed: false,

    close() {
      _bridge__WEBPACK_IMPORTED_MODULE_0__["default"].post('TabClose', key);
    }

  };
  tabs[key] = item;
  _bridge__WEBPACK_IMPORTED_MODULE_0__["default"].post('TabOpen', {
    key,
    data
  });
  return item;
}

/***/ }),

/***/ "./src/injected/web/util.js":
/*!**********************************!*\
  !*** ./src/injected/web/util.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {__proto__: null,/* harmony export */   "FastLookup": () => (/* binding */ FastLookup),
/* harmony export */   "jsonDump": () => (/* binding */ jsonDump),
/* harmony export */   "makeComponentUtils": () => (/* binding */ makeComponentUtils),
/* harmony export */   "safeConcat": () => (/* binding */ safeConcat)
/* harmony export */ });
const isConcatSpreadableSym = SafeSymbol.isConcatSpreadable;
const safeConcat = (...arrays) => {
  const dest = [];
  /* A page can use a getter on Array.prototype that returns false when checked by our code
   * (detectable via `new Error().stack`), so we'll just always set this symbol on our arrays. */

  setOwnProp(dest, isConcatSpreadableSym, true);
  safeCall(forEach, arrays, arr => setOwnProp(arr, isConcatSpreadableSym, true)); // Using a dummy [] is simpler/safer/faster than (getOwnProp(arrays, 0), arrays::slice(1))

  return safeApply(concat, dest, arrays);
};
/**
 * When running in the page context we must beware of sites that override Array#toJSON
 * leading to an invalid result, which is why our jsonDump() ignores toJSON.
 */

const jsonDump = (value, stack) => {
  let res;

  if (value === null) {
    res = 'null';
  } else if (typeof value === 'object') {
    if (!stack) {
      stack = [value]; // Creating the array here, only when type is object.
    } else if (safeCall(indexOf, stack, value) >= 0) {
      throw new SafeError('Converting circular structure to JSON');
    } else {
      setOwnProp(stack, stack.length, value);
    }

    if (arrayIsArray(value)) {
      res = '['; // Must enumerate all values to include holes in sparse arrays

      for (let i = 0, len = value.length; i < len; i += 1) {
        var _jsonDump;

        res += `${i ? ',' : ''}${(_jsonDump = jsonDump(value[i], stack)) != null ? _jsonDump : 'null'}`;
      }

      res += ']';
    } else {
      res = '{';
      safeCall(forEach, objectKeys(value), key => {
        const v = jsonDump(value[key], stack); // JSON.stringify skips keys with `undefined` or incompatible values

        if (v !== undefined) {
          res += `${res.length > 1 ? ',' : ''}${jsonStringify(key)}:${v}`;
        }
      });
      res += '}';
    }

    stack.length -= 1;
  } else if (value !== undefined) {
    res = jsonStringify(value);
  }

  return res;
};
/**
 * 2x faster than `Set`, 5x faster than flat object
 * @param {Object} [hubs]
 */

const FastLookup = (hubs = createNullObj()) => {
  /** @namespace FastLookup */
  return {
    clone() {
      const clone = createNullObj();
      if (false) {}

      for (const group in hubs) {
        /* proto is null */
        // eslint-disable-line guard-for-in
        clone[group] = nullObjFrom(hubs[group]);
      }

      return FastLookup(clone);
    },

    delete: key => {
      var _getHub;

      return (_getHub = getHub(key)) == null ? true : delete _getHub[key];
    },
    get: key => {
      var _getHub2;

      return (_getHub2 = getHub(key)) == null ? void 0 : _getHub2[key];
    },
    set: (key, val) => getHub(key, true)[key] = val,
    toArray: () => {
      const values = objectValues(hubs);
      safeCall(forEach, values, (val, i) => {
        values[i] = objectKeys(val);
      });
      return safeApply(safeConcat, null, values);
    }
  };

  function getHub(key, autoCreate) {
    const group = key.length ? key[0] : ''; // length is unforgeable, index getters aren't

    const hub = hubs[group] || (autoCreate ? hubs[group] = createNullObj() : null);
    return hub;
  }
};
/**
 * Adding the polyfills in Chrome (always as it doesn't provide them)
 * and in Firefox page mode (while preserving the native ones in content mode)
 * for compatibility with many [old] scripts that use these utils blindly
 */

const makeComponentUtils = () => {
  const CREATE_OBJECT_IN = 'createObjectIn';
  const EXPORT_FUNCTION = 'exportFunction';
  const src = IS_FIREFOX && !PAGE_MODE_HANDSHAKE && global;

  const defineIn = !src && ((target, as, val) => {
    if (as && (as = getOwnProp(as, 'defineAs'))) {
      setOwnProp(target, as, val);
    }

    return val;
  });

  return {
    cloneInto: cloneInto || (obj => obj),
    [CREATE_OBJECT_IN]: src && src[CREATE_OBJECT_IN] || ((target, as) => defineIn(target, as, {})),
    [EXPORT_FUNCTION]: src && src[EXPORT_FUNCTION] || ((func, target, as) => defineIn(target, as, func))
  };
};

/***/ }),

/***/ "./src/common/consts.js":
/*!******************************!*\
  !*** ./src/common/consts.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {__proto__: null,/* harmony export */   "BLACKLIST": () => (/* binding */ BLACKLIST),
/* harmony export */   "BLACKLIST_ERRORS": () => (/* binding */ BLACKLIST_ERRORS),
/* harmony export */   "CHARSET_UTF8": () => (/* binding */ CHARSET_UTF8),
/* harmony export */   "FORM_URLENCODED": () => (/* binding */ FORM_URLENCODED),
/* harmony export */   "HOMEPAGE_URL": () => (/* binding */ HOMEPAGE_URL),
/* harmony export */   "INFERRED": () => (/* binding */ INFERRED),
/* harmony export */   "INJECTABLE_TAB_URL_RE": () => (/* binding */ INJECTABLE_TAB_URL_RE),
/* harmony export */   "KNOWN_INJECT_INTO": () => (/* binding */ KNOWN_INJECT_INTO),
/* harmony export */   "METABLOCK_RE": () => (/* binding */ METABLOCK_RE),
/* harmony export */   "META_STR": () => (/* binding */ META_STR),
/* harmony export */   "NEWLINE_END_RE": () => (/* binding */ NEWLINE_END_RE),
/* harmony export */   "RUN_AT_RE": () => (/* binding */ RUN_AT_RE),
/* harmony export */   "SUPPORT_URL": () => (/* binding */ SUPPORT_URL),
/* harmony export */   "TIMEOUT_24HOURS": () => (/* binding */ TIMEOUT_24HOURS),
/* harmony export */   "TIMEOUT_HOUR": () => (/* binding */ TIMEOUT_HOUR),
/* harmony export */   "TIMEOUT_MAX": () => (/* binding */ TIMEOUT_MAX),
/* harmony export */   "TIMEOUT_WEEK": () => (/* binding */ TIMEOUT_WEEK),
/* harmony export */   "USERSCRIPT_META_INTRO": () => (/* binding */ USERSCRIPT_META_INTRO),
/* harmony export */   "WATCH_STORAGE": () => (/* binding */ WATCH_STORAGE),
/* harmony export */   "browser": () => (/* binding */ browser)
/* harmony export */ });
// SAFETY WARNING! Exports used by `injected` must make ::safe() calls and use __proto__:null
const CHARSET_UTF8 = 'charset=UTF-8';
const FORM_URLENCODED = 'application/x-www-form-urlencoded';
const INFERRED = 'inferred';
const HOMEPAGE_URL = 'homepageURL';
const SUPPORT_URL = 'supportURL'; // Allow metadata lines to start with WHITESPACE? '//' SPACE
// Allow anything to follow the predefined text of the metaStart/End
// The SPACE must be on the same line and specifically \x20 as \s would also match \r\n\t
// Note: when there's no valid metablock, an empty string is matched for convenience

const USERSCRIPT_META_INTRO = '// ==UserScript==';
const METABLOCK_RE = /((?:^|\n)\s*\/\/\x20==UserScript==)([\s\S]*?\n)\s*\/\/\x20==\/UserScript==|$/;
const META_STR = 'metaStr';
const NEWLINE_END_RE = /\n((?!\n)\s)*$/;
const INJECTABLE_TAB_URL_RE = /^(https?|file|ftps?):/;
const WATCH_STORAGE = 'watchStorage'; // `browser` is a local variable since we remove the global `chrome` and `browser` in injected*
// to prevent exposing them to userscripts with `@inject-into content`

const browser =  false && 0; // setTimeout truncates the delay to a 32-bit signed integer so the max delay is ~24 days

const TIMEOUT_MAX = 0x7FFFFFFF;
const TIMEOUT_HOUR = 60 * 60 * 1000;
const TIMEOUT_24HOURS = 24 * 60 * 60 * 1000;
const TIMEOUT_WEEK = 7 * 24 * 60 * 60 * 1000;
const BLACKLIST = 'blacklist';
const BLACKLIST_ERRORS = `${BLACKLIST}Errors`;
const RUN_AT_RE = /^document-(start|body|end|idle)$/;
const KNOWN_INJECT_INTO = {
  // Using the default injection order: auto, page, content
  [AUTO]: 1,
  [PAGE]: 1,
  [CONTENT]: 1
};

/***/ }),

/***/ "./src/common/index.js":
/*!*****************************!*\
  !*** ./src/common/index.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {__proto__: null,/* harmony export */   "blob2base64": () => (/* reexport safe */ _util__WEBPACK_IMPORTED_MODULE_2__.blob2base64),
/* harmony export */   "browserWindows": () => (/* binding */ browserWindows),
/* harmony export */   "buffer2string": () => (/* reexport safe */ _util__WEBPACK_IMPORTED_MODULE_2__.buffer2string),
/* harmony export */   "compareVersion": () => (/* reexport safe */ _util__WEBPACK_IMPORTED_MODULE_2__.compareVersion),
/* harmony export */   "dataUri2text": () => (/* reexport safe */ _util__WEBPACK_IMPORTED_MODULE_2__.dataUri2text),
/* harmony export */   "debounce": () => (/* reexport safe */ _util__WEBPACK_IMPORTED_MODULE_2__.debounce),
/* harmony export */   "decodeFilename": () => (/* binding */ decodeFilename),
/* harmony export */   "defaultImage": () => (/* binding */ defaultImage),
/* harmony export */   "dumpScriptValue": () => (/* reexport safe */ _util__WEBPACK_IMPORTED_MODULE_2__.dumpScriptValue),
/* harmony export */   "encodeFilename": () => (/* binding */ encodeFilename),
/* harmony export */   "ensureArray": () => (/* reexport safe */ _util__WEBPACK_IMPORTED_MODULE_2__.ensureArray),
/* harmony export */   "formatByteLength": () => (/* reexport safe */ _util__WEBPACK_IMPORTED_MODULE_2__.formatByteLength),
/* harmony export */   "formatTime": () => (/* reexport safe */ _util__WEBPACK_IMPORTED_MODULE_2__.formatTime),
/* harmony export */   "getActiveTab": () => (/* binding */ getActiveTab),
/* harmony export */   "getFullUrl": () => (/* binding */ getFullUrl),
/* harmony export */   "getLocaleString": () => (/* binding */ getLocaleString),
/* harmony export */   "getRandomString": () => (/* reexport safe */ _util__WEBPACK_IMPORTED_MODULE_2__.getRandomString),
/* harmony export */   "getScriptHome": () => (/* binding */ getScriptHome),
/* harmony export */   "getScriptName": () => (/* binding */ getScriptName),
/* harmony export */   "getScriptPrettyUrl": () => (/* binding */ getScriptPrettyUrl),
/* harmony export */   "getScriptRunAt": () => (/* binding */ getScriptRunAt),
/* harmony export */   "getScriptSupportUrl": () => (/* binding */ getScriptSupportUrl),
/* harmony export */   "getScriptUpdateUrl": () => (/* binding */ getScriptUpdateUrl),
/* harmony export */   "getUniqId": () => (/* reexport safe */ _util__WEBPACK_IMPORTED_MODULE_2__.getUniqId),
/* harmony export */   "i18n": () => (/* reexport safe */ _util__WEBPACK_IMPORTED_MODULE_2__.i18n),
/* harmony export */   "ignoreNoReceiver": () => (/* binding */ ignoreNoReceiver),
/* harmony export */   "initHooks": () => (/* binding */ initHooks),
/* harmony export */   "isDataUri": () => (/* reexport safe */ _util__WEBPACK_IMPORTED_MODULE_2__.isDataUri),
/* harmony export */   "isEmpty": () => (/* reexport safe */ _util__WEBPACK_IMPORTED_MODULE_2__.isEmpty),
/* harmony export */   "isHttpOrHttps": () => (/* reexport safe */ _util__WEBPACK_IMPORTED_MODULE_2__.isHttpOrHttps),
/* harmony export */   "isRemote": () => (/* reexport safe */ _util__WEBPACK_IMPORTED_MODULE_2__.isRemote),
/* harmony export */   "leftpad": () => (/* binding */ leftpad),
/* harmony export */   "makeDataUri": () => (/* binding */ makeDataUri),
/* harmony export */   "makePause": () => (/* binding */ makePause),
/* harmony export */   "makeRaw": () => (/* binding */ makeRaw),
/* harmony export */   "memoize": () => (/* reexport safe */ _util__WEBPACK_IMPORTED_MODULE_2__.memoize),
/* harmony export */   "noop": () => (/* reexport safe */ _util__WEBPACK_IMPORTED_MODULE_2__.noop),
/* harmony export */   "normalizeKeys": () => (/* reexport safe */ _object__WEBPACK_IMPORTED_MODULE_1__.normalizeKeys),
/* harmony export */   "request": () => (/* reexport safe */ _util__WEBPACK_IMPORTED_MODULE_2__.request),
/* harmony export */   "requestLocalFile": () => (/* reexport safe */ _util__WEBPACK_IMPORTED_MODULE_2__.requestLocalFile),
/* harmony export */   "sendCmd": () => (/* binding */ sendCmd),
/* harmony export */   "sendCmdDirectly": () => (/* binding */ sendCmdDirectly),
/* harmony export */   "sendMessage": () => (/* binding */ sendMessage),
/* harmony export */   "sendMessageRetry": () => (/* binding */ sendMessageRetry),
/* harmony export */   "sendTabCmd": () => (/* binding */ sendTabCmd),
/* harmony export */   "string2uint8array": () => (/* reexport safe */ _util__WEBPACK_IMPORTED_MODULE_2__.string2uint8array),
/* harmony export */   "throttle": () => (/* reexport safe */ _util__WEBPACK_IMPORTED_MODULE_2__.throttle),
/* harmony export */   "toString": () => (/* reexport safe */ _util__WEBPACK_IMPORTED_MODULE_2__.toString),
/* harmony export */   "trueJoin": () => (/* binding */ trueJoin),
/* harmony export */   "tryUrl": () => (/* binding */ tryUrl)
/* harmony export */ });
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ "./src/common/consts.js");
/* harmony import */ var _object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./object */ "./src/common/object.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ "./src/common/util.js");
// SAFETY WARNING! Exports used by `injected` must make ::safe() calls and use __proto__:null






if (false) {}

const browserWindows = _consts__WEBPACK_IMPORTED_MODULE_0__.browser.windows;
const defaultImage =  false && 0;
/** Will be encoded to avoid splitting the URL in devtools UI */

const BAD_URL_CHAR = /[#/?]/g;
/** Fullwidth range starts at 0xFF00, normal range starts at space char code 0x20 */

const replaceWithFullWidthForm = s => String.fromCharCode(s.charCodeAt(0) - 0x20 + 0xFF00);

const PORT_ERROR_RE = /(Receiving end does not exist)|The message port closed before|$/;
function initHooks() {
  const hooks = [];

  function fire(data) {
    hooks.slice().forEach(cb => {
      cb(data);
    });
  }

  function hook(callback) {
    hooks.push(callback);
    return () => {
      const i = hooks.indexOf(callback);
      if (i >= 0) hooks.splice(i, 1);
    };
  }

  return {
    hook,
    fire
  };
}
/**
 * Used by `injected`
 * @param {string} cmd
 * @param data
 * @param {{retry?: boolean}} [options]
 * @return {Promise}
 */

function sendCmd(cmd, data, options) {
  // Firefox+Vue3 bug workaround for "Proxy object could not be cloned"
  if (false) {}

  return sendMessage({
    cmd,
    data
  }, options);
} // These need `src` parameter so we'll use sendCmd for them. We could have forged `src` via
// browser.tabs.getCurrent but there's no need as they normally use only a tiny amount of data.

const COMMANDS_WITH_SRC = ['ConfirmInstall', 'Notification', 'TabClose', 'TabFocus', 'TabOpen'
/*
  These are used only by content scripts where sendCmdDirectly can't be used anyway
  'GetInjected',
  'GetRequestId',
  'HttpRequest',
  'InjectionFeedback',
  'SetPopup',
*/
];

const getBgPage = () => _consts__WEBPACK_IMPORTED_MODULE_0__.browser.extension.getBackgroundPage == null ? void 0 : _consts__WEBPACK_IMPORTED_MODULE_0__.browser.extension.getBackgroundPage();
/**
 * Sends the command+data directly so it's synchronous and faster than sendCmd thanks to deepCopy.
 * WARNING! Make sure `cmd` handler doesn't use `src` or `cmd` is listed in COMMANDS_WITH_SRC.
 */


function sendCmdDirectly(cmd, data, options, fakeSrc) {
  const bg = !COMMANDS_WITH_SRC.includes(cmd) && getBgPage();
  const bgCopy = bg && bg !== window && bg.deepCopy;

  if (!bgCopy) {
    return sendCmd(cmd, data, options);
  }

  if (fakeSrc) {
    fakeSrc = bgCopy(fakeSrc);
    fakeSrc.fake = true;
  }

  return bg.handleCommandMessage(bgCopy({
    cmd,
    data
  }), fakeSrc).then(_object__WEBPACK_IMPORTED_MODULE_1__.deepCopy);
}
/**
 * @param {number} tabId
 * @param {string} cmd
 * @param data
 * @param {{frameId?: number}} [options]
 * @return {Promise}
 */

function sendTabCmd(tabId, cmd, data, options) {
  return _consts__WEBPACK_IMPORTED_MODULE_0__.browser.tabs.sendMessage(tabId, {
    cmd,
    data
  }, options).catch(ignoreNoReceiver);
} // Used by `injected`

function sendMessage(payload, {
  retry
} = {}) {
  if (retry) return sendMessageRetry(payload);
  let promise = _consts__WEBPACK_IMPORTED_MODULE_0__.browser.runtime.sendMessage(payload); // Ignoring errors when sending from the extension script because it's a broadcast

  if (false) {}

  return promise;
}
/**
 * Used by `injected`
 * The active tab page and its [content] scripts load before the extension's
 * persistent background script when Chrome starts with a URL via command line
 * or when configured to restore the session, https://crbug.com/314686
 */

async function sendMessageRetry(payload, maxDuration = 10e3) {
  for (let start = performance.now(); performance.now() - start < maxDuration;) {
    try {
      const data = await sendMessage(payload);

      if (data !== undefined) {
        return data;
      }
    } catch (e) {
      if (!PORT_ERROR_RE.exec(e)[1]) {
        throw e;
      }
    } // Not using setTimeout which may be cleared by the web page


    await _consts__WEBPACK_IMPORTED_MODULE_0__.browser.storage.local.get(VIOLENTMONKEY);
  }

  throw new Error(VIOLENTMONKEY + ' cannot connect to the background page.');
}
function ignoreNoReceiver(err) {
  if (!PORT_ERROR_RE.exec(err)[0]) {
    return Promise.reject(err);
  }
}
function leftpad(input, length, pad = '0') {
  let num = input.toString();

  while (num.length < length) num = `${pad}${num}`;

  return num;
}
/**
 * Get locale attributes such as `@name:zh-CN`
 */

function getLocaleString(meta, key) {
  const localeMeta = navigator.languages // Use `lang.toLowerCase()` since v2.6.5
  .map(lang => meta[`${key}:${lang}`] || meta[`${key}:${lang.toLowerCase()}`]).find(Boolean);
  return localeMeta || meta[key] || '';
}
/**
 * @param {VMScript} script
 * @returns {string | undefined}
 */

function getScriptHome(script) {
  var _script$INFERRED;

  let meta;
  return script.custom[_consts__WEBPACK_IMPORTED_MODULE_0__.HOMEPAGE_URL] || (meta = script.meta)[_consts__WEBPACK_IMPORTED_MODULE_0__.HOMEPAGE_URL] || ((_script$INFERRED = script[_consts__WEBPACK_IMPORTED_MODULE_0__.INFERRED]) == null ? void 0 : _script$INFERRED[_consts__WEBPACK_IMPORTED_MODULE_0__.HOMEPAGE_URL]) || meta.homepage || meta.website || meta.source;
}
/**
 * @param {VMScript} script
 * @returns {string | undefined}
 */

function getScriptSupportUrl(script) {
  var _script$INFERRED2;

  return script.meta[_consts__WEBPACK_IMPORTED_MODULE_0__.SUPPORT_URL] || ((_script$INFERRED2 = script[_consts__WEBPACK_IMPORTED_MODULE_0__.INFERRED]) == null ? void 0 : _script$INFERRED2[_consts__WEBPACK_IMPORTED_MODULE_0__.SUPPORT_URL]);
}
function getScriptName(script) {
  var _script$props$id;

  return script.custom.name || getLocaleString(script.meta, 'name') || `#${(_script$props$id = script.props.id) != null ? _script$props$id : (0,_util__WEBPACK_IMPORTED_MODULE_2__.i18n)('labelNoName')}`;
}
/** @returns {VMInjection.RunAt} without "document-" */

function getScriptRunAt(script) {
  var _match;

  return ((_match = `${script.custom[RUN_AT] || script.meta[RUN_AT] || ''}`.match(_consts__WEBPACK_IMPORTED_MODULE_0__.RUN_AT_RE)) == null ? void 0 : _match[1]) || 'end';
}
/** URL that shows the name of the script and opens in devtools sources or in our editor */

function getScriptPrettyUrl(script, displayName) {
  return `${extensionRoot}${// When called from prepareScript, adding a space to group scripts in one block visually
  displayName && IS_FIREFOX ? '%20' : ''}${encodeURIComponent((displayName || getScriptName(script)).replace(BAD_URL_CHAR, replaceWithFullWidthForm))}.user.js#${script.props.id}`;
}
/**
 * @param {VMScript} script
 * @param {boolean} [all] - to return all two urls (1: check, 2: download)
 * @return {Array<string>|string|void}
 */

function getScriptUpdateUrl(script, all) {
  if (script.config.shouldUpdate) {
    const {
      custom,
      meta
    } = script;
    /* URL in meta may be set to an invalid value to enforce disabling of the automatic updates
     * e.g. GreasyFork sets it to `none` when the user installs an old version.
     * We'll show such script as non-updatable. */

    const downloadURL = tryUrl(custom.downloadURL || meta.downloadURL || custom.lastInstallURL);
    const updateURL = tryUrl(custom.updateURL || meta.updateURL || downloadURL);
    const url = downloadURL || updateURL;
    if (url) return all ? [downloadURL, updateURL] : url;
  }
}
function getFullUrl(url, base) {
  let obj;

  try {
    obj = new URL(url, base);
  } catch (e) {
    return `data:,${e.message} ${url}`;
  } // Use protocol whitelist to filter URLs


  if (!['http:', 'https:', 'ftp:', 'data:'].includes(obj.protocol)) obj.protocol = 'http:';
  return obj.href;
}
function encodeFilename(name) {
  // `escape` generated URI has % in it
  return name.replace(/[-\\/:*?"<>|%\s]/g, m => {
    let code = m.charCodeAt(0).toString(16);
    if (code.length < 2) code = `0${code}`;
    return `-${code}`;
  });
}
function decodeFilename(filename) {
  return filename.replace(/-([0-9a-f]{2})/g, (_m, g) => String.fromCharCode(parseInt(g, 16)));
}
async function getActiveTab() {
  return (await _consts__WEBPACK_IMPORTED_MODULE_0__.browser.tabs.query({
    active: true,
    currentWindow: true
  }))[0] || browserWindows && ( // Chrome bug workaround when an undocked devtools window is focused
  await _consts__WEBPACK_IMPORTED_MODULE_0__.browser.tabs.query({
    active: true,
    windowId: (await browserWindows.getCurrent()).id
  }))[0];
}
function makePause(ms) {
  return ms < 0 ? Promise.resolve() : new Promise(resolve => setTimeout(resolve, ms));
}
function trueJoin(separator) {
  return this.filter(Boolean).join(separator);
}
/** @returns {string|undefined} */

function tryUrl(str) {
  try {
    if (str && new URL(str)) {
      return str; // throws on invalid urls
    }
  } catch (e) {// undefined
  }
}
/**
 * @param {string} url
 * @param {string} raw - raw value in storage.cache
 * @returns {?string}
 */

function makeDataUri(raw, url) {
  if ((0,_util__WEBPACK_IMPORTED_MODULE_2__.isDataUri)(url)) return url;

  if (/^(i,|image\/)/.test(raw)) {
    // workaround for bugs in old VM, see 2e135cf7
    const i = raw.lastIndexOf(',');
    const type = raw.startsWith('image/') ? raw.slice(0, i) : 'image/png';
    return `data:${type};base64,${raw.slice(i + 1)}`;
  }

  return raw;
}
/**
 * @param {VMReq.Response} response
 * @param {boolean} [noJoin]
 * @returns {string|string[]}
 */

async function makeRaw(response, noJoin) {
  const type = (response.headers.get('content-type') || '').split(';')[0] || '';
  const body = await (0,_util__WEBPACK_IMPORTED_MODULE_2__.blob2base64)(response.data);
  return noJoin ? [type, body] : `${type},${body}`;
}

/***/ }),

/***/ "./src/common/object.js":
/*!******************************!*\
  !*** ./src/common/object.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {__proto__: null,/* harmony export */   "deepCopy": () => (/* binding */ deepCopy),
/* harmony export */   "deepCopyDiff": () => (/* binding */ deepCopyDiff),
/* harmony export */   "deepEqual": () => (/* binding */ deepEqual),
/* harmony export */   "deepSize": () => (/* binding */ deepSize),
/* harmony export */   "forEachEntry": () => (/* binding */ forEachEntry),
/* harmony export */   "forEachKey": () => (/* binding */ forEachKey),
/* harmony export */   "forEachValue": () => (/* binding */ forEachValue),
/* harmony export */   "mapEntry": () => (/* binding */ mapEntry),
/* harmony export */   "normalizeKeys": () => (/* binding */ normalizeKeys),
/* harmony export */   "objectGet": () => (/* binding */ objectGet),
/* harmony export */   "objectPick": () => (/* binding */ objectPick),
/* harmony export */   "objectSet": () => (/* binding */ objectSet)
/* harmony export */ });
/** @type {boolean} */
let deepDiff;
function normalizeKeys(key) {
  if (key == null) return [];
  if (Array.isArray(key)) return key;
  return `${key}`.split('.').filter(Boolean);
}
function objectGet(obj, rawKey) {
  for (let _i = 0, _normalizeKeys = normalizeKeys(rawKey); _i < _normalizeKeys.length; _i++) {
    const key = _normalizeKeys[_i];
    if (!obj || typeof obj !== 'object') break;
    obj = obj[key];
  }

  return obj;
}
/**
 * @param {Object} [obj = {}]
 * @param {string|string[]} [rawKey]
 * @param {?} [val] - if `undefined` or omitted the value is deleted
 * @param {boolean} [retParent]
 * @return {Object} the original object or the parent of `val` if retParent is set
 */

function objectSet(obj, rawKey, val, retParent) {
  rawKey = normalizeKeys(rawKey);
  let res = obj || {};
  let key;

  for (let i = 0; key = rawKey[i], i < rawKey.length - 1; i += 1) {
    res = res[key] || (res[key] = {});
  }

  if (val === undefined) {
    delete res[key];
  } else {
    res[key] = val;
  }

  return retParent ? res : obj;
}
/**
 * @param {{}} obj
 * @param {string[]} keys
 * @param {function(value,key):?} [transform]
 * @returns {{}}
 */

function objectPick(obj, keys, transform) {
  const res = {};

  for (let _i2 = 0; _i2 < keys.length; _i2++) {
    const key = keys[_i2];
    let value = obj == null ? void 0 : obj[key];
    if (transform) value = transform(value, key);
    if (value !== undefined) res[key] = value;
  }

  return res;
}
/**
 * @param {function} [fnValue] - (value, newKey, obj) => newValue
 * @param {function} [fnKey] - (key, val, obj) => newKey (if newKey is falsy the key is skipped)
 * @param {Object} [thisObj] - passed as `this` to both functions
 * @return {Object}
 */

function mapEntry(fnValue, fnKey, thisObj) {
  const res = {};

  for (let _i3 = 0, _Object$keys = Object.keys(this); _i3 < _Object$keys.length; _i3++) {
    let key = _Object$keys[_i3];
    const val = this[key];

    if (!fnKey || (key = safeCall(fnKey, thisObj, key, val, this))) {
      res[key] = fnValue ? safeCall(fnValue, thisObj, val, key, this) : val;
    }
  }

  return res;
} // invoked as obj::forEachEntry(([key, value], i, allEntries) => {})

function forEachEntry(func, thisObj) {
  if (this) Object.entries(this).forEach(func, thisObj);
} // invoked as obj::forEachKey(key => {}, i, allKeys)

function forEachKey(func, thisObj) {
  if (this) Object.keys(this).forEach(func, thisObj);
} // invoked as obj::forEachValue(value => {}, i, allValues)

function forEachValue(func, thisObj) {
  if (this) Object.values(this).forEach(func, thisObj);
}
function deepCopy(src) {
  if (!src || typeof src !== 'object') return src;
  /* Not using `map` because its result belongs to the `window` of the source,
   * so it becomes "dead object" in Firefox after GC collects it. */

  if (Array.isArray(src)) return Array.from(src, deepCopy);
  return safeCall(mapEntry, src, deepCopy);
} // Simplified deep equality checker

function deepEqual(a, b) {
  let res;

  if (!a || !b || typeof a !== typeof b || typeof a !== 'object') {
    res = a === b;
  } else if (Array.isArray(a)) {
    res = a.length === b.length && a.every((item, i) => deepEqual(item, b[i]));
  } else {
    const keysA = Object.keys(a);
    /* Not checking hasOwnProperty because 1) we only use own properties and
     * 2) this can be slow for a large value storage that has thousands of keys */

    res = keysA.length === Object.keys(b).length && keysA.every(key => deepEqual(a[key], b[key]));
  }

  return res;
}
/** @return {?} `undefined` if equal */

function deepCopyDiff(src, sample) {
  if (src === sample) return;
  if (!src || typeof src !== 'object') return src;
  if (!sample || typeof sample !== 'object') return deepCopy(src);
  if (deepDiff = false, src = deepCopyDiffObjects(src, sample), deepDiff) return src;
}

function deepCopyDiffObjects(src, sample) {
  const isArr = Array.isArray(src);
  const arr1 = isArr ? src : Object.keys(src);
  const arr2 = isArr ? sample : Object.keys(sample);
  const res = isArr ? [] : {};

  if (arr1.length !== arr2.length) {
    deepDiff = true;
  }

  for (let i = 0, key, a, b; i < arr1.length; i += 1) {
    key = isArr ? i : arr1[i];
    a = src[key];
    /* Not checking hasOwnProperty because 1) we only use own properties and
     * 2) this can be slow for a large value storage that has thousands of keys */

    b = sample[key];

    if (a && typeof a === 'object') {
      if (b && typeof b === 'object') {
        a = deepCopyDiffObjects(a, b);
      } else {
        a = deepCopy(a);
        deepDiff = true;
      }
    } else if (a !== b) {
      deepDiff = true;
    }

    res[key] = a;
  }

  return res;
}

function deepSize(val) {
  if (val === undefined) return 0;
  if (val === true || val == null) return 4;
  if (val === false) return 5;
  if (typeof val === 'string') return val.length + 2; // not counting escapes for \n\r\t and so on

  if (typeof val !== 'object') return `${val}`.length; // number and whatever

  if (Array.isArray(val)) return val.reduce((sum, v) => sum + 1 + deepSize(v), 2);
  return Object.keys(val).reduce((sum, k) => sum + k.length + 4 + deepSize(val[k]), 2);
}

/***/ }),

/***/ "./src/common/util.js":
/*!****************************!*\
  !*** ./src/common/util.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {__proto__: null,/* harmony export */   "blob2base64": () => (/* binding */ blob2base64),
/* harmony export */   "buffer2string": () => (/* binding */ buffer2string),
/* harmony export */   "compareVersion": () => (/* binding */ compareVersion),
/* harmony export */   "dataUri2text": () => (/* binding */ dataUri2text),
/* harmony export */   "debounce": () => (/* binding */ debounce),
/* harmony export */   "dumpScriptValue": () => (/* binding */ dumpScriptValue),
/* harmony export */   "ensureArray": () => (/* binding */ ensureArray),
/* harmony export */   "formatByteLength": () => (/* binding */ formatByteLength),
/* harmony export */   "formatTime": () => (/* binding */ formatTime),
/* harmony export */   "getRandomString": () => (/* binding */ getRandomString),
/* harmony export */   "getUniqId": () => (/* binding */ getUniqId),
/* harmony export */   "i18n": () => (/* binding */ i18n),
/* harmony export */   "isDataUri": () => (/* binding */ isDataUri),
/* harmony export */   "isEmpty": () => (/* binding */ isEmpty),
/* harmony export */   "isHttpOrHttps": () => (/* binding */ isHttpOrHttps),
/* harmony export */   "isRemote": () => (/* binding */ isRemote),
/* harmony export */   "memoize": () => (/* binding */ memoize),
/* harmony export */   "noop": () => (/* binding */ noop),
/* harmony export */   "request": () => (/* binding */ request),
/* harmony export */   "requestLocalFile": () => (/* binding */ requestLocalFile),
/* harmony export */   "string2uint8array": () => (/* binding */ string2uint8array),
/* harmony export */   "throttle": () => (/* binding */ throttle),
/* harmony export */   "toString": () => (/* binding */ toString)
/* harmony export */ });
/* harmony import */ var _home_runner_work_violentmonkey_violentmonkey_src_common_consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/common/consts */ "./src/common/consts.js");
// SAFETY WARNING! Exports used by `injected` must make ::safe() calls and use __proto__:null

function i18n(name, args) {
  return _home_runner_work_violentmonkey_violentmonkey_src_common_consts__WEBPACK_IMPORTED_MODULE_0__.browser.i18n.getMessage(name, args) || name;
}
function toString(param) {
  if (param == null) return '';
  return `${param}`;
}
function memoize(func, resolver = toString) {
  const cacheMap = {};

  function memoized(...args) {
    // Used in safe context
    // eslint-disable-next-line no-restricted-syntax
    const key = resolver(...args);
    let cache = cacheMap[key];

    if (!cache) {
      cache = {
        value: func.apply(this, args)
      };
      cacheMap[key] = cache;
    }

    return cache.value;
  }

  return memoized;
}
function debounce(func, time) {
  let startTime;
  let timer;
  let callback;
  time = Math.max(0, +time || 0);

  function checkTime() {
    timer = null;
    if (performance.now() >= startTime) callback();else checkTimer();
  }

  function checkTimer() {
    if (!timer) {
      const delta = startTime - performance.now();
      timer = setTimeout(checkTime, delta);
    }
  }

  function debouncedFunction(...args) {
    startTime = performance.now() + time;

    callback = () => {
      callback = null;
      func.apply(this, args);
    };

    checkTimer();
  }

  return debouncedFunction;
}
function throttle(func, time) {
  let lastTime = 0;
  time = Math.max(0, +time || 0);

  function throttledFunction(...args) {
    const now = performance.now();

    if (lastTime + time < now) {
      lastTime = now;
      func.apply(this, args);
    }
  }

  return throttledFunction;
}
function noop() {}
function getRandomString(minLength = 10, maxLength = 0) {
  for (let rnd = ''; rnd += Math.random().toString(36).slice(2);) {
    if (rnd.length >= minLength) return maxLength ? rnd.slice(0, maxLength) : rnd;
  }
}
function getUniqId(prefix = 'VM') {
  return prefix + getRandomString();
}
/**
 * @param {ArrayBuffer|Uint8Array|Array} buf
 * @param {number} [offset]
 * @param {number} [length]
 * @return {string} a binary string i.e. one byte per character
 */

function buffer2string(buf, offset = 0, length = 1e99) {
  // The max number of arguments varies between JS engines but it's >32k so we're safe
  const sliceSize = 8192;
  const slices = [];
  const arrayLen = buf.length; // present on Uint8Array/Array

  const end = Math.min(arrayLen || buf.byteLength, offset + length);
  const needsSlicing = arrayLen == null || offset || end > sliceSize;

  for (; offset < end; offset += sliceSize) {
    slices.push(String.fromCharCode.apply(null, needsSlicing ? new Uint8Array(buf, offset, Math.min(sliceSize, end - offset)) : buf));
  }

  return slices.join('');
}
/**
 * Faster than buffer2string+btoa: 2x in Chrome, 10x in FF
 * @param {Blob} blob
 * @param {number} [offset]
 * @param {number} [length]
 * @return {Promise<string>} base64-encoded contents
 */

function blob2base64(blob, offset = 0, length = 1e99) {
  if (offset || length < blob.size) {
    blob = blob.slice(offset, offset + length);
  }

  return !blob.size ? '' : new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);

    reader.onload = () => {
      const res = reader.result;
      resolve(res.slice(res.indexOf(',') + 1));
    };
  });
}
function dataUri2text(url) {
  const i = url.indexOf(','); // a non-base64 data: uri may have many `,`

  const meta = url.slice(0, i);
  url = decodeURIComponent(url.slice(i + 1));
  url = /(^|;)\s*base64\s*(;|$)/.test(meta) ? atob(url) : url;
  return /[\x80-\xFF]/.test(url) ? new TextDecoder().decode(string2uint8array(url)) : url;
}
function string2uint8array(str) {
  const len = str.length;
  const array = new Uint8Array(len);

  for (let i = 0; i < len; i += 1) {
    array[i] = str.charCodeAt(i);
  }

  return array;
}
const VERSION_RE = /^(.*?)-([-.0-9a-z]+)|$/i;
const DIGITS_RE = /^\d+$/; // using regexp to avoid +'1e2' being parsed as 100

/** @return -1 | 0 | 1 */

function compareVersion(ver1, ver2) {
  // Used in safe context
  // eslint-disable-next-line no-restricted-syntax
  const [, main1 = ver1 || '', pre1] = VERSION_RE.exec(ver1); // eslint-disable-next-line no-restricted-syntax

  const [, main2 = ver2 || '', pre2] = VERSION_RE.exec(ver2);
  const delta = compareVersionChunk(main1, main2) || !pre1 - !pre2 // 1.2.3-pre-release is less than 1.2.3
  || pre1 && compareVersionChunk(pre1, pre2, true); // if pre1 is present, pre2 is too

  return delta < 0 ? -1 : +!!delta;
}

function compareVersionChunk(ver1, ver2, isSemverMode) {
  const parts1 = ver1.split('.');
  const parts2 = ver2.split('.');
  const len1 = parts1.length;
  const len2 = parts2.length;
  const len = (isSemverMode ? Math.min : Math.max)(len1, len2);
  let delta;

  for (let i = 0; !delta && i < len; i += 1) {
    const a = parts1[i];
    const b = parts2[i];

    if (isSemverMode) {
      delta = DIGITS_RE.test(a) && DIGITS_RE.test(b) ? a - b : a > b || a < b && -1;
    } else {
      delta = (parseInt(a, 10) || 0) - (parseInt(b, 10) || 0);
    }
  }

  return delta || isSemverMode && len1 - len2;
}

const units = [['min', 60], ['h', 24], ['d', 1000, 365], ['y']];
function formatTime(duration) {
  duration /= 60 * 1000;
  const unitInfo = units.find(item => {
    const max = item[1];
    if (!max || duration < max) return true;
    const step = item[2] || max;
    duration /= step;
    return false;
  });
  return `${duration | 0}${unitInfo[0]}`;
}
function formatByteLength(len, noBytes) {
  if (!len) return '';
  if (len < 1024 && !noBytes) return `${len} B`;
  if ((len /= 1024) < 1024) return `${Math.round(len)} k`;
  return `${+(len / 1024).toFixed(1)} M`;
} // Used by `injected`

function isEmpty(obj) {
  for (const key in obj) {
    if (hasOwnProperty(obj, key)) {
      return false;
    }
  }

  return true;
}
function ensureArray(data) {
  return Array.isArray(data) ? data : [data];
}
const binaryTypes = ['blob', 'arraybuffer'];
/**
 * @param {string} url
 * @param {VMReq.Options} options
 * @return {Promise<VMReq.Response>}
 */

async function requestLocalFile(url, options = {}) {
  // only GET method is allowed for local files
  // headers is meaningless
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    /** @type {VMReq.Response} */

    const result = {
      headers: {
        get: name => xhr.getResponseHeader(name)
      }
    };
    const {
      [kResponseType]: responseType
    } = options;
    xhr.open('GET', url, true);
    if (binaryTypes.includes(responseType)) xhr[kResponseType] = responseType;

    xhr.onload = () => {
      // status for `file:` protocol will always be `0`
      result.status = xhr.status || 200;
      result.data = xhr[binaryTypes.includes(responseType) ? kResponse : kResponseText];

      if (responseType === 'json') {
        try {
          result.data = JSON.parse(result.data);
        } catch (_unused) {// ignore invalid JSON
        }
      }

      if (result.status > 300) {
        reject(result);
      } else {
        resolve(result);
      }
    };

    xhr.onerror = () => {
      result.status = -1;
      reject(result);
    };

    xhr.send();
  });
}
const isLocalUrlRe = /^(file:\/\/|about:|data:|https?:\/\/([^@/]*@)?(localhost|127\.0\.0\.1|(192\.168|172\.16|10\.0)\.\d+\.\d+|\[(::1|(fe80|fc00)::[.:0-9a-f]+)]|[^/:]+\.(test|example|invalid|localhost))(:\d+|\/|$))/i;
const isDataUri = url => /^data:/i.test(url);
const isHttpOrHttps = url => /^https?:\/\//i.test(url);
const isRemote = url => url && !isLocalUrlRe.test(decodeURI(url));
/**
 * Make a request.
 * @param {string} url
 * @param {VMReq.Options} options
 * @return {Promise<VMReq.Response>}
 */

async function request(url, options = {}) {
  // fetch does not support local file
  if (url.startsWith('file://')) return requestLocalFile(url, options);
  const {
    body,
    headers,
    [kResponseType]: responseType
  } = options;
  const isBodyObj = body && safeCall({}.toString, body) === '[object Object]';
  const [, scheme, auth, hostname, urlTail] = url.match(/^([-\w]+:\/\/)([^@/]*@)?([^/]*)(.*)|$/); // Avoiding LINK header prefetch of js in 404 pages which cause CSP violations in our console
  // TODO: toggle a webRequest/declarativeNetRequest rule to strip LINK headers

  const accept = (hostname === 'greasyfork.org' || hostname === 'sleazyfork.org') && 'application/javascript, text/plain, text/css';
  const init = Object.assign({
    cache: isRemote(url) ? undefined : 'no-cache'
  }, options, {
    body: isBodyObj ? JSON.stringify(body) : body,
    headers: isBodyObj || accept || auth ? Object.assign({}, headers, isBodyObj && {
      'Content-Type': 'application/json'
    }, auth && {
      Authorization: `Basic ${btoa(decodeURIComponent(auth.slice(0, -1)))}`
    }, accept && {
      accept
    }) : headers
  });
  let result = {
    url,
    status: -1
  };

  try {
    const urlNoAuth = auth ? scheme + hostname + urlTail : url;
    const resp = await fetch(urlNoAuth, init);
    const loadMethod = {
      arraybuffer: 'arrayBuffer',
      blob: 'blob',
      json: 'json'
    }[responseType] || 'text'; // status for `file:` protocol will always be `0`

    result.status = resp.status || 200;
    result.headers = resp.headers;
    result.data = await resp[loadMethod]();
  } catch (err) {
    result = Object.assign(err, result);
    result.message += '\n' + url;
  }

  if (result.status < 0 || result.status > 300) throw result;
  return result;
} // Used by `injected`

const SIMPLE_VALUE_TYPE = {
  __proto__: null,
  string: 's',
  number: 'n',
  boolean: 'b'
}; // Used by `injected`

function dumpScriptValue(value, jsonDump = JSON.stringify) {
  if (value !== undefined) {
    const simple = SIMPLE_VALUE_TYPE[typeof value];
    return `${simple || 'o'}${simple ? value : jsonDump(value)}`;
  }
}

/***/ }),

/***/ "./src/injected/util/index.js":
/*!************************************!*\
  !*** ./src/injected/util/index.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {__proto__: null,/* harmony export */   "BLACKLIST": () => (/* reexport safe */ _home_runner_work_violentmonkey_violentmonkey_src_common_consts__WEBPACK_IMPORTED_MODULE_1__.BLACKLIST),
/* harmony export */   "BLACKLIST_ERRORS": () => (/* reexport safe */ _home_runner_work_violentmonkey_violentmonkey_src_common_consts__WEBPACK_IMPORTED_MODULE_1__.BLACKLIST_ERRORS),
/* harmony export */   "CHARSET_UTF8": () => (/* reexport safe */ _home_runner_work_violentmonkey_violentmonkey_src_common_consts__WEBPACK_IMPORTED_MODULE_1__.CHARSET_UTF8),
/* harmony export */   "FORM_URLENCODED": () => (/* reexport safe */ _home_runner_work_violentmonkey_violentmonkey_src_common_consts__WEBPACK_IMPORTED_MODULE_1__.FORM_URLENCODED),
/* harmony export */   "HOMEPAGE_URL": () => (/* reexport safe */ _home_runner_work_violentmonkey_violentmonkey_src_common_consts__WEBPACK_IMPORTED_MODULE_1__.HOMEPAGE_URL),
/* harmony export */   "INFERRED": () => (/* reexport safe */ _home_runner_work_violentmonkey_violentmonkey_src_common_consts__WEBPACK_IMPORTED_MODULE_1__.INFERRED),
/* harmony export */   "INJECTABLE_TAB_URL_RE": () => (/* reexport safe */ _home_runner_work_violentmonkey_violentmonkey_src_common_consts__WEBPACK_IMPORTED_MODULE_1__.INJECTABLE_TAB_URL_RE),
/* harmony export */   "KNOWN_INJECT_INTO": () => (/* reexport safe */ _home_runner_work_violentmonkey_violentmonkey_src_common_consts__WEBPACK_IMPORTED_MODULE_1__.KNOWN_INJECT_INTO),
/* harmony export */   "METABLOCK_RE": () => (/* reexport safe */ _home_runner_work_violentmonkey_violentmonkey_src_common_consts__WEBPACK_IMPORTED_MODULE_1__.METABLOCK_RE),
/* harmony export */   "META_STR": () => (/* reexport safe */ _home_runner_work_violentmonkey_violentmonkey_src_common_consts__WEBPACK_IMPORTED_MODULE_1__.META_STR),
/* harmony export */   "NEWLINE_END_RE": () => (/* reexport safe */ _home_runner_work_violentmonkey_violentmonkey_src_common_consts__WEBPACK_IMPORTED_MODULE_1__.NEWLINE_END_RE),
/* harmony export */   "RUN_AT_RE": () => (/* reexport safe */ _home_runner_work_violentmonkey_violentmonkey_src_common_consts__WEBPACK_IMPORTED_MODULE_1__.RUN_AT_RE),
/* harmony export */   "SUPPORT_URL": () => (/* reexport safe */ _home_runner_work_violentmonkey_violentmonkey_src_common_consts__WEBPACK_IMPORTED_MODULE_1__.SUPPORT_URL),
/* harmony export */   "TIMEOUT_24HOURS": () => (/* reexport safe */ _home_runner_work_violentmonkey_violentmonkey_src_common_consts__WEBPACK_IMPORTED_MODULE_1__.TIMEOUT_24HOURS),
/* harmony export */   "TIMEOUT_HOUR": () => (/* reexport safe */ _home_runner_work_violentmonkey_violentmonkey_src_common_consts__WEBPACK_IMPORTED_MODULE_1__.TIMEOUT_HOUR),
/* harmony export */   "TIMEOUT_MAX": () => (/* reexport safe */ _home_runner_work_violentmonkey_violentmonkey_src_common_consts__WEBPACK_IMPORTED_MODULE_1__.TIMEOUT_MAX),
/* harmony export */   "TIMEOUT_WEEK": () => (/* reexport safe */ _home_runner_work_violentmonkey_violentmonkey_src_common_consts__WEBPACK_IMPORTED_MODULE_1__.TIMEOUT_WEEK),
/* harmony export */   "USERSCRIPT_META_INTRO": () => (/* reexport safe */ _home_runner_work_violentmonkey_violentmonkey_src_common_consts__WEBPACK_IMPORTED_MODULE_1__.USERSCRIPT_META_INTRO),
/* harmony export */   "WATCH_STORAGE": () => (/* reexport safe */ _home_runner_work_violentmonkey_violentmonkey_src_common_consts__WEBPACK_IMPORTED_MODULE_1__.WATCH_STORAGE),
/* harmony export */   "bindEvents": () => (/* binding */ bindEvents),
/* harmony export */   "browser": () => (/* reexport safe */ _home_runner_work_violentmonkey_violentmonkey_src_common_consts__WEBPACK_IMPORTED_MODULE_1__.browser),
/* harmony export */   "dumpScriptValue": () => (/* reexport safe */ _home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_0__.dumpScriptValue),
/* harmony export */   "fireBridgeEvent": () => (/* binding */ fireBridgeEvent),
/* harmony export */   "isEmpty": () => (/* reexport safe */ _home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_0__.isEmpty)
/* harmony export */ });
/* harmony import */ var _home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/common */ "./src/common/index.js");
/* harmony import */ var _home_runner_work_violentmonkey_violentmonkey_src_common_consts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/common/consts */ "./src/common/consts.js");
/* eslint-disable no-restricted-imports */

/* WARNING!
 * Make sure all re-exported functions survive in a spoofed/broken environment:
 * use only ::safe() globals that are initialized in a corresponding safe-globals* file,
 * use __proto__:null or get/set own props explicitly. */


const fireBridgeEvent = (eventId, msg) => {
  const detail = cloneInto ? cloneInto(msg, document) : msg;
  const evtMain = new SafeCustomEvent(eventId, {
    __proto__: null,
    detail
  });
  safeCall(fire, window, evtMain);
};
const bindEvents = (srcId, destId, bridge) => {
  /* Using a separate event for `node` because CustomEvent can't transfer nodes,
   * whereas MouseEvent (and some others) can't transfer objects without stringification. */
  let incomingNodeEvent;
  safeCall(on, window, srcId, e => {
    safeCall(stopImmediatePropagation, e);

    if (false) {}

    if (!incomingNodeEvent) {
      // CustomEvent is the main message
      const detail = safeCall(getDetail, e);
      const data = cloneInto ? cloneInto(detail, window) : detail;
      incomingNodeEvent = data.node && data;
      if (!incomingNodeEvent) bridge.onHandle(data);
    } else {
      // MouseEvent is the second event when the main event has `node: true`
      incomingNodeEvent.node = safeCall(getRelatedTarget, e);
      bridge.onHandle(incomingNodeEvent);
      incomingNodeEvent = null;
    }
  }, true);
  /** In Content bridge `pageNode` is `realm` which is wired in setupContentInvoker */

  bridge.post = (cmd, data, pageNode, contNode) => {
    const node = bridge[IDS] ? contNode : pageNode; // Constructing the event now so we don't send anything if it throws on invalid `node`

    const evtNode = node && new SafeMouseEvent(destId, {
      __proto__: null,
      relatedTarget: node
    });
    fireBridgeEvent(destId, {
      cmd,
      data,
      node: !!evtNode
    });
    if (evtNode) safeCall(fire, window, evtNode);
  };
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {__proto__: null};for (let i = 0, props="dor"; i < props.length; i++)
      defineProperty(__webpack_require__, props[i], {__proto__: null, value: 0, writable: 1});

/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {__proto__: null,/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {__proto__: null}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(!(key in exports)) {
/******/ 					defineProperty(exports, key, {__proto__: null,enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (hasOwnProperty(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(true) {
/******/ 				defineProperty(exports, toStringTagSym, {__proto__: null,value: 'Module' });
/******/ 			}
/******/ 			defineProperty(exports, '__esModule', {__proto__: null,value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {__proto__: null};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************************!*\
  !*** ./src/injected/web/index.js ***!
  \***********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {__proto__: null,/* harmony export */   "default": () => (/* binding */ initialize)
/* harmony export */ });
/* harmony import */ var _bridge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bridge */ "./src/injected/web/bridge.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store */ "./src/injected/web/store.js");
/* harmony import */ var _gm_api_wrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gm-api-wrapper */ "./src/injected/web/gm-api-wrapper.js");
/* harmony import */ var _gm_values__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gm-values */ "./src/injected/web/gm-values.js");
/* harmony import */ var _notifications__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./notifications */ "./src/injected/web/notifications.js");
/* harmony import */ var _requests__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./requests */ "./src/injected/web/requests.js");
/* harmony import */ var _tabs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tabs */ "./src/injected/web/tabs.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../util */ "./src/injected/util/index.js");







 // Make sure to call safe::methods() in code that may run after userscripts

const toRun = createNullObj();
function initialize(invokeHost) {
  if (PAGE_MODE_HANDSHAKE) {
    safeCall(on, window, PAGE_MODE_HANDSHAKE + '*', e => {
      e = safeCall(getDetail, e);
      (0,_util__WEBPACK_IMPORTED_MODULE_7__.bindEvents)(e[0], e[1], _bridge__WEBPACK_IMPORTED_MODULE_0__["default"]);
    }, {
      __proto__: null,
      once: true,
      capture: true
    });
    safeCall(fire, window, new SafeCustomEvent(PAGE_MODE_HANDSHAKE));
    _bridge__WEBPACK_IMPORTED_MODULE_0__["default"].mode = PAGE;
    (0,_bridge__WEBPACK_IMPORTED_MODULE_0__.addHandlers)({
      /** @this {Node} contentWindow */
      WriteVault(id) {
        this[id] = VAULT;
      }

    });
  } else {
    _bridge__WEBPACK_IMPORTED_MODULE_0__["default"].mode = CONTENT;

    _bridge__WEBPACK_IMPORTED_MODULE_0__["default"].post = (cmd, data, node) => {
      invokeHost({
        cmd,
        data,
        node
      }, CONTENT);
    };

    global.chrome = undefined;
    global.browser = undefined;
    return (cmd, data, realm, node) => {
      if (false) {}
      _bridge__WEBPACK_IMPORTED_MODULE_0__["default"].onHandle({
        cmd,
        data,
        node
      });
    };
  }
}
(0,_bridge__WEBPACK_IMPORTED_MODULE_0__.addHandlers)({
  Command({
    id,
    cap,
    evt
  }) {
    const constructor = evt.key ? SafeKeyboardEvent : SafeMouseEvent;
    const fn = _store__WEBPACK_IMPORTED_MODULE_1__["default"].commands[`${id}:${cap}`];
    if (fn) fn(new constructor(evt.type, evt));
  },

  /** @this {Node} */
  Callback({
    id,
    data
  }) {
    const fn = _bridge__WEBPACK_IMPORTED_MODULE_0__["default"].callbacks[id];
    delete _bridge__WEBPACK_IMPORTED_MODULE_0__["default"].callbacks[id];
    if (fn) safeCall(fn, this, data);
  },

  async Plant({
    data: dataKey,
    win: winKey
  }) {
    setOwnProp(window, winKey, onCodeSet, true, 'set');
    /* Cleaning up for a script that didn't compile at all due to a syntax error.
     * Note that winKey can be intercepted via MutationEvent in this case. */

    await 0;
    delete toRun[dataKey];
    delete window[winKey];
  },

  /**
   * @param {VMInjection.Info} info
   * @param {VMInjection.Script[]} items
   */
  ScriptData({
    info,
    items
  }) {
    if (info) {
      assign(_bridge__WEBPACK_IMPORTED_MODULE_0__["default"], info);
    }

    const toRunNow = [];

    for (let _i = 0; _i < items.length; _i++) {
      const script = items[_i];
      const {
        key
      } = script;
      toRun[key.data] = script;
      _store__WEBPACK_IMPORTED_MODULE_1__["default"][VALUES][script.id] = nullObjFrom(script[VALUES]);

      if (!PAGE_MODE_HANDSHAKE) {
        const winKey = key.win;
        const data = window[winKey];

        if (data) {
          // executeScript ran before GetInjected response
          safePush(toRunNow, data);
          delete window[winKey];
        } else {
          safeDefineProperty(window, winKey, {
            configurable: true,
            set: onCodeSet
          });
        }
      }
    }

    if (!PAGE_MODE_HANDSHAKE) safeCall(forEach, toRunNow, onCodeSet);else if (IS_FIREFOX) _bridge__WEBPACK_IMPORTED_MODULE_0__["default"].post('InjectList', items[0][RUN_AT]);
  },

  Expose() {
    external[VIOLENTMONKEY] = {
      version: "2.14.2",
      isInstalled: (name, namespace) => _bridge__WEBPACK_IMPORTED_MODULE_0__["default"].send('GetScriptVer', {
        meta: {
          name,
          namespace
        }
      })
    };
  }

});

function onCodeSet(fn) {
  const item = toRun[fn.name];
  const el = safeCall(getCurrentScript, document);
  const {
    gm,
    wrapper = global
  } = (0,_gm_api_wrapper__WEBPACK_IMPORTED_MODULE_2__.makeGmApiWrapper)(item); // Deleting now to prevent interception via DOMNodeRemoved on el::remove()

  delete window[item.key.win];

  if (false) {}

  if (el) {
    safeCall(remove, el);
  }

  _bridge__WEBPACK_IMPORTED_MODULE_0__["default"].post('Run', item.id);
  safeCall(fn, wrapper, gm, logging.error);
}
})();

module.exports = __webpack_exports__;
/******/ })()
;
          const { exports } = module;
          return exports.__esModule ? exports.default : exports;
        }};0;