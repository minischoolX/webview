{
  const INIT_FUNC_NAME = '**VMInitInjection**';
  if (window[INIT_FUNC_NAME] !== 1) { /* eslint-disable no-unused-vars */

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
/* eslint-disable no-unused-vars, prefer-const */

/**
 * `safeCall` is used by our modified babel-plugin-safe-bind.js.
 * `export` is stripped in the final output and is only used for our NodeJS test scripts.
 * To ensure the minified name is 1 char we declare the super frequently used names first.
 */
const {
  apply: safeApply
} = Reflect;
const safeCall = safeApply.call.bind(safeApply.call); // ~75 "::" calls

const {
  Blob: SafeBlob,
  CustomEvent: SafeCustomEvent,
  Error,
  // for @/common e.g. in sendMessage
  MouseEvent: SafeMouseEvent,
  Object,
  // for minification and guarding webpack Object(import) calls
  Promise: SafePromise,
  Response: SafeResponse,
  Uint8Array: SafeUint8Array,
  atob: safeAtob,
  addEventListener: on,
  cloneInto,
  chrome,
  dispatchEvent: fire,
  removeEventListener: off
} = global; // eslint-disable-next-line no-restricted-syntax

const createNullObj = Object.create.bind(Object, null); // 25 calls

const SafeError = Error;
const ResponseProto = SafeResponse[PROTO];
const hasOwnProperty = safeApply.call.bind({}.hasOwnProperty);
const {
  forEach,
  includes
} = []; // `push` is unsafe as it may call a setter; use safePush()

const {
  then
} = SafePromise[PROTO];
const {
  indexOf: stringIndexOf,
  slice
} = '';
const safeCharCodeAt = safeApply.call.bind(''.charCodeAt); // faster than str::charCodeAt

const {
  append,
  appendChild,
  attachShadow,
  remove,
  setAttribute
} = Element[PROTO];
const {
  assign,
  defineProperty,
  getOwnPropertyDescriptor: describeProperty,
  getPrototypeOf,
  keys: objectKeys
} = Object;
const {
  random: mathRandom
} = Math;
const {
  toStringTag: toStringTagSym
} = Symbol; // used by ProtectWebpackBootstrapPlugin

const {
  stopImmediatePropagation
} = Event[PROTO];
const getDetail = describeProperty(SafeCustomEvent[PROTO], 'detail').get;
const getRelatedTarget = describeProperty(SafeMouseEvent[PROTO], 'relatedTarget').get;
const logging = nullObjFrom(console);
const VM_UUID = chrome.runtime.getURL('');
/** Unlike the built-in `instanceof` operator this doesn't call @@hasInstance which may be spoofed */

const isInstance = (instance, safeOriginalProto) => {
  for (let obj = instance; isObject(obj) && (obj = getPrototypeOf(obj));) {
    if (obj === safeOriginalProto) {
      return true;
    }
  }
};

const isPromise = (proto => val => isInstance(val, proto))(SafePromise[PROTO]);
/** It's unforgeable so we extract it primarily to improve minification.
 * The document's value can change only in about:blank but we don't inject there. */


const {
  document
} = global;
const {
  getElementsByTagName
} = document;
let IS_FIREFOX = !chrome.app;/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({__proto__: null,/***/ "./src/injected/content/bridge.js":
/*!****************************************!*\
  !*** ./src/injected/content/bridge.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {__proto__: null,/* harmony export */   "addBackgroundHandlers": () => (/* binding */ addBackgroundHandlers),
/* harmony export */   "addHandlers": () => (/* binding */ addHandlers),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "onScripts": () => (/* binding */ onScripts)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./src/injected/util/index.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/injected/content/util.js");


const handlers = createNullObj();
const bgHandlers = createNullObj();
/** @type {function(VMInjection)[]} */

const onScripts = [];

const addHandlersImpl = (dest, src, force) => {
  if (force || bridge[INJECT_INTO]) {
    // eslint-disable-line no-use-before-define
    assign(dest, src);
  } else {
    onScripts.push(() => assign(dest, src));
  }
};
/**
 * Without `force` handlers will be added only when userscripts are about to be injected.
 * { CommandName: true } will relay the request via sendCmd as is.
 * @param {Object.<string, MessageFromGuestHandler>} obj
 * @param {boolean} [force]
 */


const addHandlers = addHandlersImpl.bind({}, handlers);
const addBackgroundHandlers = addHandlersImpl.bind({}, bgHandlers);
/**
 * @property {VMBridgePostFunc} post
 * @property {VMScriptInjectInto} injectInto
 */

const bridge = {
  __proto__: null,

  /** @type {VMBridgeContentIds} */
  [IDS]: createNullObj(),
  cache: createNullObj(),
  pathMaps: createNullObj(),

  // realm is provided when called directly via invokeHost
  async onHandle({
    cmd,
    data,
    node
  }, realm) {
    const handle = handlers[cmd];
    let callbackId = data && getOwnProp(data, CALLBACK_ID);

    if (callbackId) {
      data = data.data;
    }

    let res;

    try {
      res = handle === true ? (0,_util__WEBPACK_IMPORTED_MODULE_1__.sendCmd)(cmd, data) : safeCall(handle, node, data, realm || PAGE);

      if (isPromise(res)) {
        res = await res;
      }
    } catch (e) {
      callbackId = 'Error';
      res = e;
    }

    if (callbackId) {
      bridge.post('Callback', {
        id: callbackId,
        data: res
      }, realm);
    }
  }

};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (bridge);
_util__WEBPACK_IMPORTED_MODULE_0__.browser.runtime.onMessage.addListener(async ({
  cmd,
  data
}, src) => {
  try {
    const fn = bgHandlers[cmd];
    if (fn) await fn(data, src); // awaiting to let the sender know when we're done
  } catch (err) {
    logging.error(err); // printing here in the tab
  }
});
/**
 * @callback MessageFromGuestHandler
 * @param {Object} [data]
 * @param {CONTENT | PAGE} realm -
 *   CONTENT when the message is from the content script context,
 *   PAGE otherwise. Make sure to specify the same realm when messaging
 *   the results back otherwise it won't reach the target script.
 */

/***/ }),

/***/ "./src/injected/content/clipboard.js":
/*!*******************************************!*\
  !*** ./src/injected/content/clipboard.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {__proto__: null,/* harmony export */   "onClipboardCopy": () => (/* binding */ onClipboardCopy)
/* harmony export */ });
/* harmony import */ var _bridge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bridge */ "./src/injected/content/bridge.js");

let onClipboardCopy;
let doCopy;
let clipboardData;
let setClipboard; // Attaching a dummy listener so the page can't prevent us (fwiw h@xx0rz excluded)

if (IS_FIREFOX) {
  on('copy', onClipboardCopy = e => clipboardData && doCopy(e), true);
}

_bridge__WEBPACK_IMPORTED_MODULE_0__.onScripts.push(({
  clipFF
}) => {
  if (clipFF) {
    const {
      execCommand
    } = document;
    const {
      setData
    } = DataTransfer[PROTO];
    const {
      get: getClipboardData
    } = describeProperty(ClipboardEvent[PROTO], 'clipboardData');
    const {
      preventDefault,
      stopPropagation
    } = Event[PROTO];

    doCopy = e => {
      safeCall(stopPropagation, e);
      safeCall(stopImmediatePropagation, e);
      safeCall(preventDefault, e);
      safeCall(setData, safeCall(getClipboardData, e), clipboardData.type || 'text/plain', clipboardData.data);
    };

    setClipboard = params => {
      clipboardData = params;

      if (!safeCall(execCommand, document, 'copy') && false) {}

      clipboardData = null;
    };
  }

  (0,_bridge__WEBPACK_IMPORTED_MODULE_0__.addHandlers)({
    SetClipboard: setClipboard || true
  });
});

/***/ }),

/***/ "./src/injected/content/cmd-run.js":
/*!*****************************************!*\
  !*** ./src/injected/content/cmd-run.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {__proto__: null,/* harmony export */   "Run": () => (/* binding */ Run)
/* harmony export */ });
/* harmony import */ var _bridge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bridge */ "./src/injected/content/bridge.js");
/* harmony import */ var _gm_api_content__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gm-api-content */ "./src/injected/content/gm-api-content.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ "./src/injected/content/util.js");



const getPersisted = describeProperty(PageTransitionEvent[PROTO], 'persisted').get;
const runningIds = [];
let pending;
_bridge__WEBPACK_IMPORTED_MODULE_0__.onScripts.push(() => {
  (0,_bridge__WEBPACK_IMPORTED_MODULE_0__.addHandlers)({
    Run
  }); // isTrusted is `unforgeable` per DOM spec

  on('pageshow', evt => evt.isTrusted && safeCall(getPersisted, evt) && sendSetBadge());
});
function Run(id, realm) {
  safePush(runningIds, id);
  _bridge__WEBPACK_IMPORTED_MODULE_0__["default"][IDS][id] = realm || PAGE;
  if (!pending) pending = sendSetBadge(2);
}

async function sendSetBadge(numThrottles) {
  while (--numThrottles >= 0) await (0,_util__WEBPACK_IMPORTED_MODULE_2__.nextTask)();

  (0,_util__WEBPACK_IMPORTED_MODULE_2__.sendCmd)('SetBadge', runningIds); // not awaiting to clear `pending` immediately

  (0,_gm_api_content__WEBPACK_IMPORTED_MODULE_1__.sendSetPopup)(true);
  pending = false;
}

/***/ }),

/***/ "./src/injected/content/gm-api-content.js":
/*!************************************************!*\
  !*** ./src/injected/content/gm-api-content.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {__proto__: null,/* harmony export */   "sendSetPopup": () => (/* binding */ sendSetPopup)
/* harmony export */ });
/* harmony import */ var _bridge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bridge */ "./src/injected/content/bridge.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/injected/content/util.js");


const menus = createNullObj();
const HEAD_TAGS = ['script', 'style', 'link', 'meta'];
const {
  toLowerCase
} = '';
let setPopupThrottle;
let isPopupShown;
(0,_bridge__WEBPACK_IMPORTED_MODULE_0__.addBackgroundHandlers)({
  PopupShown(state) {
    isPopupShown = state;
    sendSetPopup();
  }

}, true);
(0,_bridge__WEBPACK_IMPORTED_MODULE_0__.addHandlers)({
  /** @this {Node} */
  AddElement({
    tag,
    attrs,
    cbId
  }, realm) {
    let el;
    let res;

    try {
      const parent = this || safeCall(includes, HEAD_TAGS, safeCall(toLowerCase, `${tag}`)) && (0,_util__WEBPACK_IMPORTED_MODULE_1__.elemByTag)('head') || (0,_util__WEBPACK_IMPORTED_MODULE_1__.elemByTag)('body') || (0,_util__WEBPACK_IMPORTED_MODULE_1__.elemByTag)('*');
      el = (0,_util__WEBPACK_IMPORTED_MODULE_1__.makeElem)(tag, attrs);
      safeCall(appendChild, parent, el);
    } catch (e) {
      // A page-mode userscript can't catch DOM errors in a content script so we pass it explicitly
      // TODO: maybe move try/catch to bridge.onHandle and use bridge.sendSync in all web commands
      res = [`${e}`, e.stack];
    }

    _bridge__WEBPACK_IMPORTED_MODULE_0__["default"].post('Callback', {
      id: cbId,
      data: res
    }, realm, el);
  },

  GetResource({
    id,
    isBlob,
    key,
    raw
  }) {
    var _bridge$pathMaps$id;

    if (!raw) raw = _bridge__WEBPACK_IMPORTED_MODULE_0__["default"].cache[((_bridge$pathMaps$id = _bridge__WEBPACK_IMPORTED_MODULE_0__["default"].pathMaps[id]) == null ? void 0 : _bridge$pathMaps$id[key]) || key];
    return raw ? (0,_util__WEBPACK_IMPORTED_MODULE_1__.decodeResource)(raw, isBlob) : true;
  },

  RegisterMenu({
    id,
    cap
  }) {
    if (window === top) {
      ensureNestedProp(menus, id, cap, 1);
      sendSetPopup(true);
    }
  },

  UnregisterMenu({
    id,
    cap
  }) {
    if (window === top) {
      var _menus$id;

      (_menus$id = menus[id]) == null ? true : delete _menus$id[cap];
      sendSetPopup(true);
    }
  }

});
async function sendSetPopup(isDelayed) {
  if (isPopupShown) {
    if (isDelayed) {
      if (setPopupThrottle) return; // Preventing flicker in popup when scripts re-register menus

      setPopupThrottle = _util__WEBPACK_IMPORTED_MODULE_1__.nextTask;
      await setPopupThrottle;
      setPopupThrottle = null;
    }

    (0,_util__WEBPACK_IMPORTED_MODULE_1__.sendCmd)('SetPopup', safePickInto({
      menus
    }, _bridge__WEBPACK_IMPORTED_MODULE_0__["default"], [IDS, INJECT_INTO]));
  }
}

/***/ }),

/***/ "./src/injected/content/index.js":
/*!***************************************!*\
  !*** ./src/injected/content/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bridge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bridge */ "./src/injected/content/bridge.js");
/* harmony import */ var _clipboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clipboard */ "./src/injected/content/clipboard.js");
/* harmony import */ var _gm_api_content__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gm-api-content */ "./src/injected/content/gm-api-content.js");
/* harmony import */ var _inject__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./inject */ "./src/injected/content/inject.js");
/* harmony import */ var _notifications__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./notifications */ "./src/injected/content/notifications.js");
/* harmony import */ var _requests__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./requests */ "./src/injected/content/requests.js");
/* harmony import */ var _tabs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tabs */ "./src/injected/content/tabs.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./util */ "./src/injected/content/util.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../util */ "./src/injected/util/index.js");
/* harmony import */ var _cmd_run__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./cmd-run */ "./src/injected/content/cmd-run.js");










const {
  [IDS]: ids
} = _bridge__WEBPACK_IMPORTED_MODULE_0__["default"]; // Make sure to call obj::method() in code that may run after CONTENT userscripts

async function init() {
  const isXml = document instanceof XMLDocument;
  const xhrData = getXhrInjection();
  const dataPromise = (0,_util__WEBPACK_IMPORTED_MODULE_7__.sendCmd)('GetInjected', {
    /* In FF93 sender.url is wrong: https://bugzil.la/1734984,
     * in Chrome sender.url is ok, but location.href is wrong for text selection URLs #:~:text= */
    url: IS_FIREFOX && location.href,
    // XML document's appearance breaks when script elements are added
    [FORCE_CONTENT]: isXml,
    done: !!(xhrData || global.vmData)
  }, {
    retry: true
  }); // detecting if browser.contentScripts is usable, it was added in FF59 as well as composedPath

  /** @type {VMInjection} */

  const data = xhrData || (IS_FIREFOX && Event[PROTO].composedPath ? await getDataFF(dataPromise) : await dataPromise);
  assign(ids, data[IDS]);
  _bridge__WEBPACK_IMPORTED_MODULE_0__["default"][INJECT_INTO] = data[INJECT_INTO];

  if (data[EXPOSE] && !isXml && (0,_inject__WEBPACK_IMPORTED_MODULE_3__.injectPageSandbox)(data)) {
    (0,_bridge__WEBPACK_IMPORTED_MODULE_0__.addHandlers)({
      GetScriptVer: true
    });
    _bridge__WEBPACK_IMPORTED_MODULE_0__["default"].post('Expose');
  }

  if (IS_FIREFOX && !data.clipFF) {
    off('copy', _clipboard__WEBPACK_IMPORTED_MODULE_1__.onClipboardCopy, true);
  }

  if (data[SCRIPTS]) {
    _bridge__WEBPACK_IMPORTED_MODULE_0__.onScripts.forEach(fn => fn(data));
    await (0,_inject__WEBPACK_IMPORTED_MODULE_3__.injectScripts)(data, isXml);
  }

  _bridge__WEBPACK_IMPORTED_MODULE_0__.onScripts.length = 0;
  (0,_gm_api_content__WEBPACK_IMPORTED_MODULE_2__.sendSetPopup)();
}

(0,_bridge__WEBPACK_IMPORTED_MODULE_0__.addBackgroundHandlers)({
  Command: data => _bridge__WEBPACK_IMPORTED_MODULE_0__["default"].post('Command', data, ids[data.id]),
  Run: id => (0,_cmd_run__WEBPACK_IMPORTED_MODULE_9__.Run)(id, CONTENT),

  UpdatedValues(data) {
    const dataPage = createNullObj();
    const dataContent = createNullObj();
    safeCall(forEach, objectKeys(data), id => {
      (ids[id] === CONTENT ? dataContent : dataPage)[id] = data[id];
    });
    if (!(0,_util__WEBPACK_IMPORTED_MODULE_8__.isEmpty)(dataPage)) _bridge__WEBPACK_IMPORTED_MODULE_0__["default"].post('UpdatedValues', dataPage);
    if (!(0,_util__WEBPACK_IMPORTED_MODULE_8__.isEmpty)(dataContent)) _bridge__WEBPACK_IMPORTED_MODULE_0__["default"].post('UpdatedValues', dataContent, CONTENT);
  }

});
(0,_bridge__WEBPACK_IMPORTED_MODULE_0__.addHandlers)({
  TabFocus: true,
  UpdateValue: true
});
init().catch(IS_FIREFOX && logging.error); // Firefox can't show exceptions in content scripts

async function getDataFF(viaMessaging) {
  // global !== window in FF content scripts
  const data = global.vmData || (await SafePromise.race([new SafePromise(resolve => {
    global.vmResolve = resolve;
  }), viaMessaging]));
  delete global.vmResolve;
  delete global.vmData;
  return data;
}

function getXhrInjection() {
  try {
    const quotedKey = `"${INIT_FUNC_NAME}"`; // Accessing document.cookie may throw due to CSP sandbox

    const cookieValue = document.cookie.split(`${quotedKey}=`)[1];
    const blobId = cookieValue && cookieValue.split(';', 1)[0];

    if (blobId) {
      document.cookie = `${quotedKey}=0; max-age=0; SameSite=Lax`; // this removes our cookie

      const xhr = new XMLHttpRequest();
      const url = `blob:${VM_UUID}${blobId}`;
      xhr.open('get', url, false); // `false` = synchronous

      xhr.send();
      URL.revokeObjectURL(url);
      return JSON.parse(xhr[kResponse]);
    }
  } catch (_unused) {
    /* NOP */
  }
}

/***/ }),

/***/ "./src/injected/content/inject.js":
/*!****************************************!*\
  !*** ./src/injected/content/inject.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {__proto__: null,/* harmony export */   "injectPageSandbox": () => (/* binding */ injectPageSandbox),
/* harmony export */   "injectScripts": () => (/* binding */ injectScripts)
/* harmony export */ });
/* harmony import */ var _bridge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bridge */ "./src/injected/content/bridge.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/injected/content/util.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util */ "./src/injected/util/index.js");
/* harmony import */ var _cmd_run__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cmd-run */ "./src/injected/content/cmd-run.js");




const bridgeIds = _bridge__WEBPACK_IMPORTED_MODULE_0__["default"][IDS];
let tardyQueue;
let bridgeInfo;
let contLists;
let pageLists;
/** @type {?boolean} */

let pageInjectable;
let frameEventWnd;
/** @type {ShadowRoot} */

let injectedRoot; // https://bugzil.la/1408996

let VMInitInjection = window[INIT_FUNC_NAME];
/** Avoid running repeatedly due to new `documentElement` or with declarativeContent in Chrome.
 * The prop's mode is overridden to be unforgeable by a userscript in content mode. */

setOwnProp(window, INIT_FUNC_NAME, 1, false);
(0,_bridge__WEBPACK_IMPORTED_MODULE_0__.addHandlers)({
  /**
   * FF bug workaround to enable processing of sourceURL in injected page scripts
   */
  InjectList: IS_FIREFOX && injectPageList
});
function injectPageSandbox({
  [kSessionId]: sessionId
}) {
  pageInjectable = false;
  const VAULT_WRITER = sessionId + 'VW';
  const VAULT_WRITER_ACK = VAULT_WRITER + '*';
  const vaultId = safeGetUniqId();
  const handshakeId = safeGetUniqId();
  const contentId = safeGetUniqId();
  const webId = safeGetUniqId();

  if (IS_FIREFOX) {
    // In FF, content scripts running in a same-origin frame cannot directly call parent's functions
    safeCall(on, window, VAULT_WRITER, evt => {
      safeCall(stopImmediatePropagation, evt);

      if (!frameEventWnd) {
        // setupVaultId's first event is the frame's contentWindow
        frameEventWnd = safeCall(getRelatedTarget, evt);
      } else {
        // setupVaultId's second event is the vaultId
        safeCall(fire, frameEventWnd, new SafeCustomEvent(VAULT_WRITER_ACK, {
          __proto__: null,
          detail: tellBridgeToWriteVault(safeCall(getDetail, evt), frameEventWnd)
        }));
        frameEventWnd = null;
      }
    }, true);
  } else {
    setOwnProp(global, VAULT_WRITER, tellBridgeToWriteVault, false);
  }

  if (useOpener(opener) || useOpener(window !== top && parent)) {
    startHandshake();
  } else {
    /* Sites can do window.open(sameOriginUrl,'iframeNameOrNewWindowName').opener=null, spoof JS
     * environment and easily hack into our communication channel before our content scripts run.
     * Content scripts will see `document.opener = null`, not the original opener, so we have
     * to use an iframe to extract the safe globals. Detection via document.referrer won't work
     * is it can be emptied by the opener page, too. */
    inject({
      code: `parent["${vaultId}"] = [this, 0]`
      /* DANGER! See addVaultExports */

    }, () => {
      if (!IS_FIREFOX || addVaultExports(window.wrappedJSObject[vaultId])) {
        startHandshake();
      }
    });
  }

  return pageInjectable;

  function useOpener(opener) {
    let ok;

    try {
      ok = opener && describeProperty(opener.location, 'href').get;
    } catch (e) {// Old Chrome throws in sandboxed frames, TODO: remove `try` when minimum_chrome_version >= 86
    }

    if (ok) {
      ok = false; // TODO: Use a single PointerEvent with `pointerType: vaultId` when strict_min_version >= 59

      if (IS_FIREFOX) {
        const setOk = evt => {
          ok = safeCall(getDetail, evt);
        };

        safeCall(on, window, VAULT_WRITER_ACK, setOk, true);

        try {
          safeCall(fire, opener, new SafeMouseEvent(VAULT_WRITER, {
            relatedTarget: window
          }));
          safeCall(fire, opener, new SafeCustomEvent(VAULT_WRITER, {
            detail: vaultId
          }));
        } catch (e) {
          /* FF quirk or bug: opener may reject our fire */
        }

        safeCall(off, window, VAULT_WRITER_ACK, setOk, true);
      } else {
        ok = opener[VAULT_WRITER];
        ok = ok && ok(vaultId, window);
      }
    }

    return ok;
  }
  /** A page can read our script's textContent in a same-origin iframe via DOMNodeRemoved event.
   * Directly preventing it would require redefining ~20 DOM methods in the parent.
   * Instead, we'll send the ids via a temporary handshakeId event, to which the web-bridge
   * will listen only during its initial phase using vault-protected DOM methods.
   * TODO: simplify this when strict_min_version >= 63 (attachShadow in FF) */


  function startHandshake() {
    /* With `once` the listener is removed before DOMNodeInserted is dispatched by appendChild,
     * otherwise a same-origin parent page could use it to spoof the handshake. */
    safeCall(on, window, handshakeId, handshaker, {
      capture: true,
      once: true
    });
    inject({
      code: `(${VMInitInjection}(${IS_FIREFOX},'${handshakeId}','${vaultId}'))()` + `\n//# sourceURL=${VM_UUID}sandbox/injected-web.js`
    }); // Clean up in case CSP prevented the script from running

    safeCall(off, window, handshakeId, handshaker, true);
  }

  function handshaker(evt) {
    pageInjectable = true;
    safeCall(stopImmediatePropagation, evt);
    (0,_util__WEBPACK_IMPORTED_MODULE_2__.bindEvents)(contentId, webId, _bridge__WEBPACK_IMPORTED_MODULE_0__["default"]);
    (0,_util__WEBPACK_IMPORTED_MODULE_2__.fireBridgeEvent)(`${handshakeId}*`, [webId, contentId]);
  }
}
/**
 * @param {VMInjection} data
 * @param {boolean} isXml
 */

async function injectScripts(data, isXml) {
  var _pageLists, _contLists;

  const {
    errors,
    info,
    [MORE]: more
  } = data;
  const CACHE = 'cache';

  if (errors) {
    logging.warn(errors);
  }

  if (IS_FIREFOX) {
    IS_FIREFOX = parseFloat(info.ua.browserVersion); // eslint-disable-line no-global-assign
  }

  bridgeInfo = createNullObj();
  bridgeInfo[PAGE] = info;
  bridgeInfo[CONTENT] = info;
  assign(_bridge__WEBPACK_IMPORTED_MODULE_0__["default"][CACHE], data[CACHE]);

  if (isXml || data[FORCE_CONTENT]) {
    pageInjectable = false;
  } else if (data[PAGE] && pageInjectable == null) {
    injectPageSandbox(data);
  }

  const toContent = data[SCRIPTS].filter(scr => triageScript(scr) === CONTENT).map(scr => [scr.id, scr.key.data]);
  const moreData = (more || toContent.length) && (0,_util__WEBPACK_IMPORTED_MODULE_1__.sendCmd)('InjectionFeedback', {
    [FORCE_CONTENT]: !pageInjectable,
    [CONTENT]: toContent,
    [MORE]: more,
    url: IS_FIREFOX && location.href
  });
  const getReadyState = describeProperty(Document[PROTO], 'readyState').get;
  const hasInvoker = contLists;

  if (hasInvoker) {
    setupContentInvoker();
  }

  tardyQueue = createNullObj(); // Using a callback to avoid a microtask tick when the root element exists or appears.

  await (0,_util__WEBPACK_IMPORTED_MODULE_1__.onElement)('*', injectAll, 'start');

  if ((_pageLists = pageLists) != null && _pageLists.body || (_contLists = contLists) != null && _contLists.body) {
    await (0,_util__WEBPACK_IMPORTED_MODULE_1__.onElement)('body', injectAll, 'body');
  }

  if (more && (data = await moreData)) {
    assign(_bridge__WEBPACK_IMPORTED_MODULE_0__["default"][CACHE], data[CACHE]);

    if (safeCall(getReadyState, document) === 'loading') {
      await new SafePromise(resolve => {
        /* Since most sites listen to DOMContentLoaded on `document`, we let them run first
         * by listening on `window` which follows `document` when the event bubbles up. */
        on('DOMContentLoaded', resolve, {
          once: true
        });
      });
      await 0; // let the site's listeners on `window` run first
    }

    for (let _i = 0, _data$SCRIPTS = data[SCRIPTS]; _i < _data$SCRIPTS.length; _i++) {
      const scr = _data$SCRIPTS[_i];
      triageScript(scr);
    }

    if (contLists && !hasInvoker) {
      setupContentInvoker();
    }

    await injectAll('end');
    await injectAll('idle');
  } // release for GC


  bridgeInfo = contLists = pageLists = VMInitInjection = null;
}

function triageScript(script) {
  let realm = script[INJECT_INTO];
  realm = realm === AUTO && !pageInjectable || realm === CONTENT ? CONTENT : pageInjectable && PAGE;

  if (realm) {
    const lists = realm === CONTENT ? contLists || (contLists = createNullObj()) : pageLists || (pageLists = createNullObj());
    const {
      gmi,
      [_util__WEBPACK_IMPORTED_MODULE_2__.META_STR]: metaStr,
      pathMap,
      [RUN_AT]: runAt
    } = script;
    const list = lists[runAt] || (lists[runAt] = []);
    safePush(list, script);
    setOwnProp(gmi, 'scriptMetaStr', metaStr[0] || safeCall(slice, script.code[metaStr[1]], metaStr[2], metaStr[3]));
    delete script[_util__WEBPACK_IMPORTED_MODULE_2__.META_STR];
    if (pathMap) _bridge__WEBPACK_IMPORTED_MODULE_0__["default"].pathMaps[script.id] = pathMap;
  } else {
    bridgeIds[script.id] = ID_BAD_REALM;
  }

  return realm;
}

function inject(item, iframeCb) {
  const {
    code
  } = item;
  const isCodeArray = isObject(code);
  const script = (0,_util__WEBPACK_IMPORTED_MODULE_1__.makeElem)('script', !isCodeArray && code); // Firefox ignores sourceURL comment when a syntax error occurs so we'll print the name manually

  const onError = IS_FIREFOX && !iframeCb && (e => {
    const {
      stack
    } = e.error;

    if (!stack || `${stack}`.includes(VM_UUID)) {
      log('error', [item.displayName], e.error);
      e.preventDefault();
    }
  });

  const div = (0,_util__WEBPACK_IMPORTED_MODULE_1__.makeElem)('div'); // Hiding the script's code from mutation events like DOMNodeInserted or DOMNodeRemoved

  const divRoot = injectedRoot || (attachShadow ? safeCall(attachShadow, div, {
    mode: 'closed'
  }) : div);

  if (isCodeArray) {
    safeApply(append, script, code);
  }

  let iframe;
  let iframeDoc;

  if (iframeCb) {
    iframe = (0,_util__WEBPACK_IMPORTED_MODULE_1__.makeElem)('iframe', {
      /* Preventing other content scripts */
      // eslint-disable-next-line no-script-url
      src: 'javascript:void 0',
      sandbox: 'allow-same-origin allow-scripts',
      style: 'display:none!important'
    });
    /* In FF the opener receives DOMNodeInserted attached at creation so it can see window[0] */

    if (!IS_FIREFOX) {
      safeCall(appendChild, divRoot, iframe);
    }
  } else {
    safeCall(appendChild, divRoot, script);
  }

  if (onError) {
    safeCall(on, window, 'error', onError);
  }

  if (!injectedRoot) {
    // When using declarativeContent there's no documentElement so we'll append to `document`
    safeCall(appendChild, (0,_util__WEBPACK_IMPORTED_MODULE_1__.elemByTag)('*') || document, div);
  }

  if (onError) {
    safeCall(off, window, 'error', onError);
  }

  if (iframeCb) {
    injectedRoot = divRoot;
    if (IS_FIREFOX) safeCall(appendChild, divRoot, iframe); // Can be removed in DOMNodeInserted by a hostile web page or CSP forbids iframes(?)

    if (iframeDoc = iframe.contentDocument) {
      safeCall(appendChild, safeCall(getElementsByTagName, iframeDoc, '*')[0], script);
      iframeCb();
    }

    safeCall(remove, iframe);
    injectedRoot = null;
  } // Clean up in case something didn't load


  safeCall(remove, script);
  safeCall(remove, div);
}

function injectAll(runAt) {
  let res;

  for (let inPage = 1; inPage >= 0; inPage--) {
    const realm = inPage ? PAGE : CONTENT;
    const lists = inPage ? pageLists : contLists;
    const items = lists == null ? void 0 : lists[runAt];

    if (items) {
      _bridge__WEBPACK_IMPORTED_MODULE_0__["default"].post('ScriptData', {
        items,
        info: bridgeInfo[realm]
      }, realm);
      bridgeInfo[realm] = false; // must be a sendable value to have own prop in the receiver

      for (let _i2 = 0; _i2 < items.length; _i2++) {
        const {
          id
        } = items[_i2];
        tardyQueue[id] = 1;
      }

      if (!inPage) safeCall(then, (0,_util__WEBPACK_IMPORTED_MODULE_1__.nextTask)(), () => tardyQueueCheck(items));else if (!IS_FIREFOX) res = injectPageList(runAt);
    }
  }

  return res;
}

async function injectPageList(runAt) {
  const scripts = pageLists[runAt];

  for (let _i3 = 0; _i3 < scripts.length; _i3++) {
    const scr = scripts[_i3];

    if (scr.code) {
      if (runAt === 'idle') await (0,_util__WEBPACK_IMPORTED_MODULE_1__.nextTask)();
      if (runAt === 'end') await 0;
      tardyQueueCheck([scr]); // Exposing window.vmXXX setter just before running the script to avoid interception

      if (!scr.meta.unwrap) _bridge__WEBPACK_IMPORTED_MODULE_0__["default"].post('Plant', scr.key);
      inject(scr);
      scr.code = '';
      if (scr.meta.unwrap) (0,_cmd_run__WEBPACK_IMPORTED_MODULE_3__.Run)(scr.id);
    }
  }
}

function setupContentInvoker() {
  const invokeContent = VMInitInjection(IS_FIREFOX)(_bridge__WEBPACK_IMPORTED_MODULE_0__["default"].onHandle);
  const postViaBridge = _bridge__WEBPACK_IMPORTED_MODULE_0__["default"].post;

  _bridge__WEBPACK_IMPORTED_MODULE_0__["default"].post = (cmd, params, realm, node) => {
    const fn = realm === CONTENT ? invokeContent : postViaBridge;
    fn(cmd, params, undefined, node);
  };
}
/**
 * Chrome doesn't fire a syntax error event, so we'll mark ids that didn't start yet
 * as "still starting", so the popup can show them accordingly.
 */


function tardyQueueCheck(scripts) {
  for (let _i4 = 0; _i4 < scripts.length; _i4++) {
    const {
      id
    } = scripts[_i4];

    if (tardyQueue[id]) {
      if (bridgeIds[id] === 1) bridgeIds[id] = ID_INJECTING;
      delete tardyQueue[id];
    }
  }
}

function tellBridgeToWriteVault(vaultId, wnd) {
  const {
    post
  } = _bridge__WEBPACK_IMPORTED_MODULE_0__["default"];

  if (post) {
    // may be absent if this page doesn't have scripts
    post('WriteVault', vaultId, PAGE, wnd);
    return true;
  }
}

function addVaultExports(vaultSrc) {
  if (!vaultSrc) return; // blocked by CSP

  const exports = cloneInto(createNullObj(), document); // In FF a detached iframe's `console` doesn't print anything, we'll export it from content

  const exportedConsole = cloneInto(createNullObj(), document);
  safeCall(forEach, ['log', 'info', 'warn', 'error', 'debug'], k => {
    exportedConsole[k] = exportFunction(logging[k], document);
    /* global exportFunction */
  });
  exports.console = exportedConsole; // vaultSrc[0] is the iframe's `this`
  // DANGER! vaultSrc[1] must be initialized in injectPageSandbox to prevent prototype hooking

  vaultSrc[1] = exports;
  return true;
}

/***/ }),

/***/ "./src/injected/content/notifications.js":
/*!***********************************************!*\
  !*** ./src/injected/content/notifications.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bridge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bridge */ "./src/injected/content/bridge.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/injected/content/util.js");


const notifications = createNullObj();
(0,_bridge__WEBPACK_IMPORTED_MODULE_0__.addHandlers)({
  async Notification(options, realm) {
    const nid = await (0,_util__WEBPACK_IMPORTED_MODULE_1__.sendCmd)('Notification', options);
    notifications[nid] = {
      id: options.id,
      realm
    };
  },

  RemoveNotification(id) {
    for (const nid in notifications) {
      if (notifications[nid].id === id) {
        delete notifications[nid];
        return (0,_util__WEBPACK_IMPORTED_MODULE_1__.sendCmd)('RemoveNotification', nid);
      }
    }
  }

});
(0,_bridge__WEBPACK_IMPORTED_MODULE_0__.addBackgroundHandlers)({
  NotificationClick(nid) {
    const n = notifications[nid];
    if (n) _bridge__WEBPACK_IMPORTED_MODULE_0__["default"].post('NotificationClicked', n.id, n.realm);
  },

  NotificationClose(nid) {
    const n = notifications[nid];

    if (n) {
      _bridge__WEBPACK_IMPORTED_MODULE_0__["default"].post('NotificationClosed', n.id, n.realm);
      delete notifications[nid];
    }
  }

});

/***/ }),

/***/ "./src/injected/content/requests.js":
/*!******************************************!*\
  !*** ./src/injected/content/requests.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bridge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bridge */ "./src/injected/content/bridge.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/injected/content/util.js");


const {
  fetch: safeFetch,
  FileReader: SafeFileReader,
  FormData: SafeFormData
} = global;
const {
  arrayBuffer: getArrayBuffer,
  blob: getBlob
} = ResponseProto;
const {
  createObjectURL,
  revokeObjectURL
} = URL;
const BlobProto = SafeBlob[PROTO];
const getBlobType = describeProperty(BlobProto, 'type').get;
const getTypedArrayBuffer = describeProperty(getPrototypeOf(SafeUint8Array[PROTO]), 'buffer').get;
const getReaderResult = describeProperty(SafeFileReader[PROTO], 'result').get;
const readAsDataURL = SafeFileReader[PROTO].readAsDataURL;
const fdAppend = SafeFormData[PROTO].append;
const PROPS_TO_COPY = [kFileName];
/** @type {GMReq.Content} */

const requests = createNullObj();
let downloadChain = promiseResolve(); // TODO: extract all prop names used across files into consts.js to ensure sameness

(0,_bridge__WEBPACK_IMPORTED_MODULE_0__.addHandlers)({
  /**
   * @param {GMReq.Message.Web} msg
   * @param {VMScriptInjectInto} realm
   * @returns {Promise<void>}
   */
  async HttpRequest(msg, realm) {
    requests[msg.id] = safePickInto({
      realm,
      asBlob: msg.xhrType === 'blob'
    }, msg, PROPS_TO_COPY);
    let {
      data
    } = msg; // In Firefox we recreate FormData in bg::decodeBody

    if (!IS_FIREFOX && data.length > 1 && data[1] !== 'usp') {
      // TODO: support huge data by splitting it to multiple messages
      data = await encodeBody(data[0], data[1]);
      msg.data = cloneInto ? cloneInto(data, msg) : data;
    }

    return (0,_util__WEBPACK_IMPORTED_MODULE_1__.sendCmd)('HttpRequest', msg);
  },

  AbortRequest: true
});
(0,_bridge__WEBPACK_IMPORTED_MODULE_0__.addBackgroundHandlers)({
  /**
   * @param {GMReq.Message.BG} msg
   * @returns {Promise<void>}
   */
  async HttpRequested(msg) {
    const {
      id,
      data
    } = msg;
    const req = requests[id];

    if (!req) {
      if (true) console.warn('[HttpRequested][content]: no request for id', id);
      return;
    }

    if (hasOwnProperty(msg, 'chunk')) {
      processChunk(req, data, msg);
      return;
    }

    let response = data == null ? void 0 : data[kResponse];

    if (response && !IS_FIREFOX) {
      if (msg.blobbed) {
        response = await importBlob(req, response);
      }

      if (msg.chunked) {
        response = processChunk(req, response);
        response = req.asBlob ? new SafeBlob([response], {
          type: msg.contentType
        }) : safeCall(getTypedArrayBuffer, response);
        delete req.arr;
      }

      data[kResponse] = response;
    }

    if (response && req[kFileName]) {
      req[kResponse] = response;
    }

    if (msg.type === 'load' && req[kFileName]) {
      await downloadBlob(req[kResponse], req[kFileName]);
    }

    if (msg.type === 'loadend') {
      delete requests[msg.id];
    }

    _bridge__WEBPACK_IMPORTED_MODULE_0__["default"].post('HttpRequested', msg, req.realm);
  }

});
/**
 * Only a content script can read blobs from an extension:// URL
 * @param {GMReq.Content} req
 * @param {string} url
 * @returns {Promise<Blob|ArrayBuffer>}
 */

async function importBlob(req, url) {
  const data = await safeCall(req.asBlob ? getBlob : getArrayBuffer, await safeFetch(url));
  (0,_util__WEBPACK_IMPORTED_MODULE_1__.sendCmd)('RevokeBlob', url);
  return data;
}

function downloadBlob(blob, fileName) {
  const url = createObjectURL(blob);
  const a = (0,_util__WEBPACK_IMPORTED_MODULE_1__.makeElem)('a', {
    href: url,
    download: fileName
  });
  const res = safeCall(then, downloadChain, () => {
    safeCall(fire, a, new SafeMouseEvent('click'));
    revokeBlobAfterTimeout(url);
  }); // Frequent downloads are ignored in Chrome and possibly other browsers

  downloadChain = safeCall(then, res, () => (0,_util__WEBPACK_IMPORTED_MODULE_1__.sendCmd)('SetTimeout', 150));
  return res;
}

async function revokeBlobAfterTimeout(url) {
  await (0,_util__WEBPACK_IMPORTED_MODULE_1__.sendCmd)('SetTimeout', 3000);
  revokeObjectURL(url);
}
/**
 * @param {GMReq.Content} req
 * @param {string} data
 * @param {GMReq.Message.BGChunk} [msg]
 * @returns {Uint8Array}
 */


function processChunk(req, data, msg) {
  data = safeAtob(data);
  const len = data.length;
  const arr = req.arr || (req.arr = new SafeUint8Array(msg ? msg.size : len));

  for (let pos = (msg == null ? void 0 : msg.chunk) || 0, i = 0; i < len;) {
    arr[pos++] = safeCharCodeAt(data, i++);
  }

  return arr;
}
/** Doing it here because vault's SafeResponse+blob() doesn't work in injected-web */


async function encodeBody(body, mode) {
  if (mode === 'fd') {
    if (!body.length) {
      // see decodeBody comments about FormData in Chrome
      return [body, mode];
    }

    const fd = new SafeFormData();
    safeCall(forEach, body, entry => safeCall(fdAppend, fd, entry[0], entry[1]));
    body = fd;
  }

  const wasBlob = isInstance(body, BlobProto);
  const blob = wasBlob ? body : await safeCall(getBlob, new SafeResponse(body));
  const reader = new SafeFileReader();
  return new SafePromise(resolve => {
    safeCall(on, reader, 'load', () => resolve([safeCall(getReaderResult, reader), safeCall(getBlobType, blob), wasBlob]));
    safeCall(readAsDataURL, reader, blob);
  });
}

/***/ }),

/***/ "./src/injected/content/tabs.js":
/*!**************************************!*\
  !*** ./src/injected/content/tabs.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bridge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bridge */ "./src/injected/content/bridge.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/injected/content/util.js");


const tabIds = createNullObj();
const tabKeys = createNullObj();
const realms = createNullObj();
(0,_bridge__WEBPACK_IMPORTED_MODULE_0__.addHandlers)({
  async TabOpen({
    key,
    data
  }, realm) {
    const {
      id
    } = await (0,_util__WEBPACK_IMPORTED_MODULE_1__.sendCmd)('TabOpen', data);
    tabIds[key] = id;
    tabKeys[id] = key;
    realms[id] = realm;
  },

  TabClose(key) {
    const id = tabIds[key]; // !key => close current tab
    // id => close tab by id

    if (!key || id) (0,_util__WEBPACK_IMPORTED_MODULE_1__.sendCmd)('TabClose', {
      id
    });
  }

});
(0,_bridge__WEBPACK_IMPORTED_MODULE_0__.addBackgroundHandlers)({
  TabClosed(id) {
    const key = tabKeys[id];
    const realm = realms[id];
    delete realms[id];
    delete tabKeys[id];
    delete tabIds[key];
    if (key) _bridge__WEBPACK_IMPORTED_MODULE_0__["default"].post('TabClosed', key, realm);
  }

});

/***/ }),

/***/ "./src/injected/content/util-task.js":
/*!*******************************************!*\
  !*** ./src/injected/content/util-task.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {__proto__: null,/* harmony export */   "nextTask": () => (/* binding */ nextTask)
/* harmony export */ });
const getData = describeProperty(MessageEvent[PROTO], 'data').get;
const {
  port1,
  port2
} = new MessageChannel();
const postMessage = port1.postMessage.bind(port1);
const queue = createNullObj();
let uniqId = 0;

port2.onmessage = evt => {
  const id = safeCall(getData, evt);
  const cb = queue[id];
  delete queue[id];
  if (uniqId === id) uniqId -= 1;
  cb();
};

function nextTask() {
  return new SafePromise(resolve => {
    queue[uniqId += 1] = resolve;
    postMessage(uniqId);
  });
}

/***/ }),

/***/ "./src/injected/content/util.js":
/*!**************************************!*\
  !*** ./src/injected/content/util.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {__proto__: null,/* harmony export */   "decodeResource": () => (/* binding */ decodeResource),
/* harmony export */   "elemByTag": () => (/* binding */ elemByTag),
/* harmony export */   "makeElem": () => (/* binding */ makeElem),
/* harmony export */   "nextTask": () => (/* reexport safe */ _util_task__WEBPACK_IMPORTED_MODULE_1__.nextTask),
/* harmony export */   "onElement": () => (/* binding */ onElement),
/* harmony export */   "sendCmd": () => (/* reexport safe */ _home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_0__.sendCmd)
/* harmony export */ });
/* harmony import */ var _home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/common */ "./src/common/index.js");
/* harmony import */ var _util_task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util-task */ "./src/injected/content/util-task.js");
// eslint-disable-next-line no-restricted-imports


/** When looking for documentElement, use '*' to also support XML pages
 * Note that we avoid spoofed prototype getters by using hasOwnProperty, and not using `length`
 * as it searches for ALL matching nodes when this tag wasn't cached internally. */

const elemByTag = (tag, i) => getOwnProp(safeCall(getElementsByTagName, document, tag), i || 0);
const {
  TextDecoder: SafeTextDecoder
} = global;
const {
  createElementNS
} = document;
const tdDecode = SafeTextDecoder[PROTO].decode;
const regexpTest = RegExp[PROTO].test; // Deeply unsafe. TODO: remove.

/**
 * @param {string} tag
 * @param {function} cb - callback runs immediately, unlike a chained then()
 * @param {?} [arg]
 * @returns {Promise<void>}
 */

const onElement = (tag, cb, arg) => new SafePromise(resolve => {
  if (elemByTag(tag)) {
    resolve(cb(arg));
  } else {
    const observer = new MutationObserver(() => {
      if (elemByTag(tag)) {
        observer.disconnect();
        resolve(cb(arg));
      }
    }); // documentElement may be replaced so we'll observe the entire document

    observer.observe(document, {
      childList: true,
      subtree: true
    });
  }
});
const makeElem = (tag, attrs) => {
  const el = safeCall(createElementNS, document, 'http://www.w3.org/1999/xhtml', tag);

  if (attrs && isString(attrs)) {
    safeCall(append, el, attrs);
  } else if (attrs) {
    safeCall(forEach, objectKeys(attrs), key => {
      if (key === 'textContent') safeCall(append, el, attrs[key]);else safeCall(setAttribute, el, key, attrs[key]);
    });
  }

  return el;
};
const decodeResource = (raw, isBlob) => {
  let res;
  const pos = safeCall(stringIndexOf, raw, ',');
  const mimeType = pos < 0 ? '' : safeCall(slice, raw, 0, pos);
  const mimeData = pos < 0 ? raw : safeCall(slice, raw, pos + 1);

  if (isBlob === false) {
    return `data:${mimeType};base64,${mimeData}`;
  }

  res = safeAtob(mimeData); // TODO: do the check in BG and cache/store the result because safe-guarding all the stuff
  // regexp picks from an instance internally is inordinately complicated

  if (safeCall(regexpTest, /[\x80-\xFF]/, res)) {
    const len = res.length;
    const bytes = new SafeUint8Array(len);

    for (let i = 0; i < len; i += 1) {
      bytes[i] = safeCharCodeAt(res, i);
    }

    res = isBlob ? bytes : safeCall(tdDecode, new SafeTextDecoder(), bytes);
  }

  return isBlob ? new SafeBlob([res], {
    type: mimeType
  }) : res;
};

/***/ }),

/***/ "./src/common/browser.js":
/*!*******************************!*\
  !*** ./src/common/browser.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {__proto__: null,/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var _browser;

let {
  browser
} = global; // Since this also runs in a content script we'll guard against implicit global variables
// for DOM elements with 'id' attribute which is a standard feature, more info:
// https://github.com/mozilla/webextension-polyfill/pull/153
// https://html.spec.whatwg.org/multipage/window-object.html#named-access-on-the-window-object

if (!IS_FIREFOX && !((_browser = browser) != null && _browser.runtime)) {
  const {
    Proxy: SafeProxy
  } = global;
  const {
    bind
  } = SafeProxy;
  const MESSAGE = 'message';
  const STACK = 'stack';

  const isSyncMethodName = key => key === 'addListener' || key === 'removeListener' || key === 'hasListener' || key === 'hasListeners';
  /** API types or enums or literal constants */


  const proxifyValue = (target, key, src, metaVal) => {
    const srcVal = src[key];
    if (srcVal === undefined) return;
    let res;

    if (isFunction(metaVal)) {
      res = metaVal(src, srcVal);
    } else if (isFunction(srcVal)) {
      res = metaVal === 0 || isSyncMethodName(key) || !hasOwnProperty(src, key) ? safeCall(bind, srcVal, src) : wrapAsync(src, srcVal); // eslint-disable-line no-use-before-define
    } else if (isObject(srcVal) && metaVal !== 0) {
      res = proxifyGroup(srcVal, metaVal); // eslint-disable-line no-use-before-define
    } else {
      res = srcVal;
    }

    target[key] = res;
    return res;
  };

  const proxifyGroup = (src, meta) => new SafeProxy({
    __proto__: null
  }, {
    __proto__: null,
    get: (group, key) => {
      var _group$key;

      return (_group$key = group[key]) != null ? _group$key : proxifyValue(group, key, src, meta == null ? void 0 : meta[key]);
    }
  });
  /**
   * @param {Object} thisArg - original API group
   * @param {function} func - original API function
   * @param {WrapAsyncPreprocessorFunc} [preprocessorFunc] - modifies the API callback's response
    */


  const wrapAsync = (thisArg, func, preprocessorFunc) => (...args) => {
    let resolve;
    let reject;
    /* Using resolve/reject to call API in the scope of this function, not inside Promise,
       because an API validation exception is thrown synchronously both in Chrome and FF
       so the caller can use try/catch to detect it like we've been doing in icon.js */

    const promise = new SafePromise((_resolve, _reject) => {
      resolve = _resolve;
      reject = _reject;
    }); // Make the error messages actually useful by capturing a real stack

    const stackInfo = new SafeError(`callstack before invoking ${func.name || 'chrome API'}:`); // A single parameter `result` is fine because we don't use API that return more

    const cb = result => {
      const runtimeErr = chrome.runtime.lastError;
      const err = runtimeErr || (preprocessorFunc ? preprocessorFunc(resolve, result) : resolve(result)); // Prefer `reject` over `throw` which stops debugger in 'pause on exceptions' mode

      if (err) {
        if (!runtimeErr) stackInfo[STACK] = `${err[1]}\n${stackInfo[STACK]}`;
        stackInfo[MESSAGE] = runtimeErr ? err[MESSAGE] : `${err[0]}`;
        stackInfo.isRuntime = !!runtimeErr;
        reject(stackInfo);
      }
    };

    if (true) {
      safePush(args, cb);
      /* global safePush */

      try {
        safeApply(func, thisArg, args);
      } catch (e) {
        if (e[MESSAGE] === 'Extension context invalidated.') {
          /* global logging */
          // only used with process.env.IS_INJECTED=content
          logging.error(`Please reload the tab to restore ${VIOLENTMONKEY} API for userscripts.`);
        } else {
          throw e;
        }
      }
    } else {}

    if (false) {}
    return promise;
  };

  const wrapResponse = (result, error) => {
    if (false) {}
    return [result, error && (error[MESSAGE] ? [error[MESSAGE], error[STACK]] : [error, new SafeError()[STACK]])];
  };

  const sendResponseAsync = async (result, sendResponse) => {
    try {
      sendResponse(wrapResponse(await result));
    } catch (err) {
      sendResponse(wrapResponse(0, err));
    }
  };

  const onMessageListener = (listener, message, sender, sendResponse) => {
    if (false) {}

    try {
      const result = listener(message, sender);

      if (result && ( true ? isPromise(result)
      /* global isPromise */
      : 0)) {
        sendResponseAsync(result, sendResponse);
        return true;
      } else if (result !== undefined) {
        /* WARNING: when using onMessage in extension pages don't use `async`
         * and make sure to return `undefined` for content messages like GetInjected */
        sendResponse(wrapResponse(result));
      }
    } catch (err) {
      sendResponse(wrapResponse(0, err));
    }
  };
  /** @type {WrapAsyncPreprocessorFunc} */


  const unwrapResponse = (resolve, response) => !response && 'null response' || response[1] // error created in wrapResponse
  || resolve(response[0]) // result created in wrapResponse
  ;

  const wrapSendMessage = (runtime, sendMessage) => wrapAsync(runtime, sendMessage, unwrapResponse);
  /**
   * 0 = non-async method or the entire group
   * function = transformer like (originalObj, originalFunc): function
   */


  browser = global.browser = proxifyGroup(chrome, {
    extension: 0,
    // we don't use its async methods
    i18n: 0,
    // we don't use its async methods
    runtime: {
      connect: 0,
      getManifest: 0,
      getURL: 0,
      onMessage: {
        addListener: (onMessage, addListener) => listener => {
          if (false) {}

          return safeCall(addListener, onMessage, safeCall(bind, onMessageListener, null, listener));
        }
      },
      sendMessage: wrapSendMessage
    },
    tabs:  false && 0
  });
} else if (false) {}
/**
 * @callback WrapAsyncPreprocessorFunc
 * @param {function(any)} resolve - called on success
 * @param {any} response - API callback's response
 * @returns {?string[]} - [errorMessage, errorStack] array on error
 */


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (browser);

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

const browser =  true && global.browser; // setTimeout truncates the delay to a 32-bit signed integer so the max delay is ~24 days

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






if (true) {
  const get = () => {
    throw 'Do not use `for-of` with Map/Set. Use forEach or for-of with a [...copy]' + '\n(not supported due to our config of @babel/plugin-transform-for-of).';
  };

  for (let _i = 0, _ref = [Map, Set, WeakMap, WeakSet]; _i < _ref.length; _i++) {
    const obj = _ref[_i];
    Object.defineProperty(obj.prototype, 'length', {
      get,
      configurable: true
    });
  }
}

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
/*!*******************************!*\
  !*** ./src/injected/index.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _home_runner_work_violentmonkey_violentmonkey_src_common_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/common/browser */ "./src/common/browser.js");
/* harmony import */ var _home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/common */ "./src/common/index.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ "./src/injected/util/index.js");
/* harmony import */ var _content__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./content */ "./src/injected/content/index.js");
 // eslint-disable-line no-restricted-imports

 // eslint-disable-line no-restricted-imports


 // Script installation in Firefox as it does not support `onBeforeRequest` for `file:`
// Using pathname and a case-sensitive check to match webRequest `urls` filter behavior

if (IS_FIREFOX && window === top && location.protocol === 'file:' && location.pathname.endsWith('.user.js') && document.contentType === 'application/x-javascript' // FF uses this for file: scheme
) {
  (async () => {
    const {
      fetch,
      history
    } = global;
    const {
      referrer
    } = document;
    const {
      text: getText
    } = ResponseProto;
    const isFF68 = ('cookie' in Document[PROTO]);
    const url = location.href;

    const fetchCode = async () => safeCall(getText, await fetch(url, {
      mode: 'same-origin'
    }));

    let code = await fetchCode();
    let oldCode;

    if (safeCall(stringIndexOf, code, _util__WEBPACK_IMPORTED_MODULE_2__.USERSCRIPT_META_INTRO) < 0) {
      return;
    }

    await (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_1__.sendCmd)('ConfirmInstall', {
      code,
      url,
      from: referrer
    }); // FF68+ doesn't allow extension pages to get file: URLs anymore so we need to track it here
    // (detecting FF68 by a feature because we can't use getBrowserInfo here and UA may be altered)

    if (isFF68) {
      /** @param {chrome.runtime.Port} */
      _home_runner_work_violentmonkey_violentmonkey_src_common_browser__WEBPACK_IMPORTED_MODULE_0__["default"].runtime.onConnect.addListener(port => {
        if (port.name !== 'FetchSelf') return;
        port.onMessage.addListener(async () => {
          code = await fetchCode();

          if (code === oldCode) {
            code = null;
          } else {
            oldCode = code;
          }

          port.postMessage(code);
        });
        port.onDisconnect.addListener(async () => {
          oldCode = null; // The user may have reloaded the Confirm page so let's check

          if (!(await (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_1__.sendCmd)('CheckInstallerTab', port.sender.tab.id))) {
            closeSelf();
          }
        });
      });
    } else {
      closeSelf();
    }

    function closeSelf() {
      if (history.length > 1) {
        history.go(-1);
      } else {
        (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_1__.sendCmd)('TabClose');
      }
    }
  })().catch(logging.error); // FF doesn't show exceptions in content scripts
}
})();

/******/ })()
;}}