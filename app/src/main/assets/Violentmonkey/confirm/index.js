{ /* eslint-disable no-unused-vars */

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
 * This file is used by entire `src` except `injected`.
 * `safeCall` is used by our modified babel-plugin-safe-bind.js.
 * Standard globals are extracted for better minification and marginally improved lookup speed.
 * Not exporting NodeJS built-in globals as this file is imported in the test scripts.
 */
const {
  Boolean,
  Error,
  Object,
  Promise,
  chrome,
  performance
} = global;
const SafePromise = Promise; // alias used by browser.js

const SafeError = Error; // alias used by browser.js

const {
  apply: safeApply
} = Reflect;
const hasOwnProperty = safeApply.call.bind({}.hasOwnProperty);
const safeCall = Object.call.bind(Object.call);
const IS_FIREFOX = !chrome.app;
const ROUTE_SCRIPTS = '#' + SCRIPTS;
const extensionRoot = chrome.runtime.getURL('/');
const extensionOrigin = extensionRoot.slice(0, -1);
const extensionManifest = chrome.runtime.getManifest(); // Using getURL because in Firefox manifest contains resolved (full) URLs

const extensionOptionsPage = chrome.runtime.getURL(extensionManifest.options_ui.page);
const ICON_PREFIX = chrome.runtime.getURL(extensionManifest.icons[16].replace("16.png", ""));/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/confirm/views/app.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/confirm/views/app.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vueleton_lib_tooltip__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vueleton/lib/tooltip */ "./node_modules/vueleton/lib/tooltip/index.js");
/* harmony import */ var _home_runner_work_violentmonkey_violentmonkey_src_common_ui_icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/common/ui/icon */ "./src/common/ui/icon.vue");
/* harmony import */ var _home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/common */ "./src/common/index.js");
/* harmony import */ var _home_runner_work_violentmonkey_violentmonkey_src_common_keyboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/common/keyboard */ "./src/common/keyboard.js");
/* harmony import */ var _home_runner_work_violentmonkey_violentmonkey_src_common_cache__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./src/common/cache */ "./src/common/cache.js");
/* harmony import */ var _home_runner_work_violentmonkey_violentmonkey_src_common_ui_externals__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./src/common/ui/externals */ "./src/common/ui/externals.vue");
/* harmony import */ var _home_runner_work_violentmonkey_violentmonkey_src_common_ui_setting_check__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./src/common/ui/setting-check */ "./src/common/ui/setting-check.vue");
/* harmony import */ var _home_runner_work_violentmonkey_violentmonkey_src_common_load_script_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./src/common/load-script-icon */ "./src/common/load-script-icon.js");
/* harmony import */ var _home_runner_work_violentmonkey_violentmonkey_src_common_object__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./src/common/object */ "./src/common/object.js");
/* harmony import */ var _home_runner_work_violentmonkey_violentmonkey_src_common_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./src/common/router */ "./src/common/router.js");
/* harmony import */ var _home_runner_work_violentmonkey_violentmonkey_src_common_ua__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./src/common/ua */ "./src/common/ua.js");











const KEEP_INFO_DELAY = 5000;
const RETRY_DELAY = 3000;
const RETRY_COUNT = 2;
const MAX_TITLE_NAME_LEN = 100;
const CONFIRM_HOTKEY = `${/Mac/.test(navigator.platform) ? 'Cmd' : 'Ctrl'}-Enter`;
const cache = (0,_home_runner_work_violentmonkey_violentmonkey_src_common_cache__WEBPACK_IMPORTED_MODULE_4__["default"])({
  lifetime: RETRY_DELAY * (RETRY_COUNT + 1)
});
/** @type {chrome.runtime.Port} */

let filePort;
/** @type {function()} */

let filePortResolve;
/** @type {boolean} */

let filePortNeeded;
let basicTitle;
let cachedCodePromise;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    Icon: _home_runner_work_violentmonkey_violentmonkey_src_common_ui_icon__WEBPACK_IMPORTED_MODULE_1__["default"],
    VmExternals: _home_runner_work_violentmonkey_violentmonkey_src_common_ui_externals__WEBPACK_IMPORTED_MODULE_5__["default"],
    SettingCheck: _home_runner_work_violentmonkey_violentmonkey_src_common_ui_setting_check__WEBPACK_IMPORTED_MODULE_6__["default"],
    Tooltip: vueleton_lib_tooltip__WEBPACK_IMPORTED_MODULE_0__["default"]
  },

  data() {
    return {
      installable: false,
      installed: false,
      message: '',
      cmOptions: {
        lineWrapping: true
      },
      code: '',
      commands: {
        close: this.close
      },
      confirmHotkey: CONFIRM_HOTKEY,

      /** @type {VM.ConfirmCache} */
      info: {},
      deps: {},
      // combines `this.require` and `this.resources` = all actually loaded deps
      descr: '',
      error: null,
      heading: this.i18n('msgLoadingData'),
      lists: null,
      listsShown: true,
      name: '...',
      reinstall: false,
      safeIcon: null,
      sameCode: false,
      script: null
    };
  },

  computed: {
    trackTooltip() {
      return _home_runner_work_violentmonkey_violentmonkey_src_common_ua__WEBPACK_IMPORTED_MODULE_10__["default"].firefox >= 68 ? this.i18n('installOptionTrackTooltip') : null;
    },

    isLocal() {
      return !(0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_2__.isRemote)(this.info.url);
    },

    icons() {
      const {
        script
      } = this;
      const homepageURL = script && (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_2__.getScriptHome)(script);
      const supportURL = script == null ? void 0 : script.meta.supportURL;
      return [homepageURL && [homepageURL, 'home', this.i18n('labelHomepage')], supportURL && [supportURL, 'question', this.i18n('buttonSupport')]].filter(Boolean);
    }

  },

  async mounted() {
    const id = _home_runner_work_violentmonkey_violentmonkey_src_common_router__WEBPACK_IMPORTED_MODULE_9__.route.paths[0];
    const key = `confirm-${id}`;
    const info = await (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_2__.sendCmdDirectly)('CacheLoad', key);
    this.info = info;

    if (!info) {
      this.close();
      return;
    }
    /* sendCmdDirectly makes the page load so fast that the local `ua` is still unverified,
       so we use the background `ua` to check for FF68 that disallows file: scheme in fetch() */


    filePortNeeded = info.ff >= 68 && info.url.startsWith('file:');
    cachedCodePromise = (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_2__.sendCmdDirectly)('CachePop', info.url);
    this.guard = setInterval(_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_2__.sendCmdDirectly, KEEP_INFO_DELAY, 'CacheHit', {
      key
    });
    await this.loadData();
    await this.parseMeta();
    await Promise.all([this.checkSameCode(), (async () => {
      let retries = RETRY_COUNT;

      while (!(await this.loadDeps()) && retries) {
        await (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_2__.makePause)(RETRY_DELAY);
        retries -= 1;
      }
    })()]);

    if (this.installable) {
      this.heading = this.reinstall ? this.i18n('labelReinstall') : this.i18n('labelInstall');
    }

    this.disposeList = [_home_runner_work_violentmonkey_violentmonkey_src_common_keyboard__WEBPACK_IMPORTED_MODULE_3__.keyboardService.register('ctrlcmd-enter', () => this.$refs.confirm.click())];
    _home_runner_work_violentmonkey_violentmonkey_src_common_keyboard__WEBPACK_IMPORTED_MODULE_3__.keyboardService.enable();
  },

  beforeUnmount() {
    var _this$disposeList;

    if (this.guard) {
      clearInterval(this.guard);
      this.guard = null;
    }

    (_this$disposeList = this.disposeList) == null ? void 0 : _this$disposeList.forEach(dispose => dispose());
  },

  methods: {
    async loadData(changedOnly) {
      this.installable = false;
      const code = filePortNeeded ? await new Promise(this.pingFilePort) : await this.getScript(this.info.url);
      if (code == null || changedOnly && this.code === code) throw 0;
      this.setCode(code);
    },

    setCode(code) {
      var _this$$refs$externals, _this$$refs$externals2;

      const lines = code.split(/\r?\n/);
      const cm = (_this$$refs$externals = this.$refs.externals) == null ? void 0 : (_this$$refs$externals2 = _this$$refs$externals.$refs.code) == null ? void 0 : _this$$refs$externals2.cm;
      let i = -1;
      let isDiff;

      if (cm) {
        cm.eachLine(({
          text
        }) => {
          isDiff = text !== lines[i += 1];
          return isDiff;
        });
      }

      this.code = code;

      if (isDiff || cm && i < lines.length - 1) {
        this.$nextTick(() => {
          cm.setCursor(i);
          cm.scrollIntoView(null, cm.display.lastWrapHeight / 3);
        });
      }
    },

    async parseMeta() {
      const {
        meta,
        errors
      } = await (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_2__.sendCmdDirectly)('ParseMeta', this.code);
      const name = (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_2__.getLocaleString)(meta, 'name');
      document.title = `${name.slice(0, MAX_TITLE_NAME_LEN)}${name.length > MAX_TITLE_NAME_LEN ? '...' : ''} - ${basicTitle || (basicTitle = document.title)}`;
      this.name = safeCall(_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_2__.trueJoin, [name, meta.version], ', ');
      this.descr = (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_2__.getLocaleString)(meta, 'description');
      this.lists = (0,_home_runner_work_violentmonkey_violentmonkey_src_common_object__WEBPACK_IMPORTED_MODULE_8__.objectPick)(meta, ['antifeature', 'grant', 'match', 'include', 'exclude', 'excludeMatch', 'compatible', 'connect'], list => (list == null ? void 0 : list.map(s => [s.replace(/^\W+/, '') || s, s]).sort(([a], [b]) => a < b ? -1 : a > b).map(([, s]) => s).join('\n')) || '');
      this.lists[''] = (errors == null ? void 0 : errors.join('\n')) || '';
      this.script = {
        meta,
        custom: {},
        props: {}
      };
      this.allDeps = [[...new Set(meta.require)], [...new Set(Object.values(meta.resources))]];
    },

    async loadDeps() {
      const {
        script,
        allDeps: [require, resource]
      } = this;

      if (!this.safeIcon) {
        (0,_home_runner_work_violentmonkey_violentmonkey_src_common_load_script_icon__WEBPACK_IMPORTED_MODULE_7__.loadScriptIcon)(script).then(url => {
          this.safeIcon = url;
        });
      }

      if (this.require && (0,_home_runner_work_violentmonkey_violentmonkey_src_common_object__WEBPACK_IMPORTED_MODULE_8__.deepEqual)(require.slice().sort(), Object.keys(this.require).sort()) && (0,_home_runner_work_violentmonkey_violentmonkey_src_common_object__WEBPACK_IMPORTED_MODULE_8__.deepEqual)(resource.slice().sort(), Object.keys(this.resources).sort())) {
        return;
      }

      this.require = {};
      this.resources = {};
      const length = require.length + resource.length;
      let finished = 0; // All resources may finish quickly so we delay the status to avoid flicker

      const STATUS_DELAY = 500;
      const startTime = performance.now();

      const updateStatus = () => {
        if (performance.now() - startTime > STATUS_DELAY) {
          this.message = this.i18n('msgLoadingDependency', [finished, length]);
        }
      };
      /** @returns {string|undefined} URL in case of error or `undefined` on success */


      const download = async (url, target, isBlob) => {
        const fullUrl = (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_2__.getFullUrl)(url, this.info.url);
        const depsUrl = `${+isBlob}${url}`; // the same URL may be listed in both categories

        try {
          const file = await this.getFile(fullUrl, {
            isBlob,
            useCache: true
          });
          target[fullUrl] = file;
          this.deps[depsUrl] = file;
          finished += 1;
          updateStatus();
        } catch (e) {
          this.deps[depsUrl] = false;
          return url;
        }
      };

      const delayedStatus = setTimeout(updateStatus, STATUS_DELAY);
      const promises = [...require.map(url => download(url, this.require, false)), ...resource.map(url => download(url, this.resources, true))];
      const error = safeCall(_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_2__.trueJoin, await Promise.all(promises), '\n');
      clearTimeout(delayedStatus);

      if (error) {
        this.message = this.i18n('msgErrorLoadingDependency');
        this.error = error;
      } else {
        this.error = null;
        this.installable = true;
        this.message = null;
        return true;
      }
    },

    close() {
      (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_2__.sendCmdDirectly)('TabClose');
    },

    async getFile(url, {
      isBlob,
      useCache
    } = {}) {
      const cacheKey = isBlob ? `blob+${url}` : `text+${url}`;

      if (useCache && cache.has(cacheKey)) {
        return cache.get(cacheKey);
      }

      const response = await (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_2__.request)(url, {
        [kResponseType]: isBlob ? 'blob' : null
      });
      const data = isBlob ? await (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_2__.makeRaw)(response) : response.data;
      if (useCache) cache.put(cacheKey, data);
      return data;
    },

    async getScript(url) {
      try {
        return cachedCodePromise && (await cachedCodePromise) || (await this.getFile(url));
      } catch (e) {
        this.message = this.i18n('msgErrorLoadingData');
        throw url;
      } finally {
        cachedCodePromise = null;
      }
    },

    async installScript() {
      this.installable = false;

      try {
        const {
          update
        } = await (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_2__.sendCmdDirectly)('ParseScript', {
          code: this.code,
          url: this.info.url,
          from: this.info.from,
          require: this.require,
          cache: this.resources
        });
        const time = new Date().toLocaleTimeString(['fr']);
        const time0 = this.confirmedTime || (this.confirmedTime = time);
        this.message = `${update.message} ${time0}${time0 === time ? '' : ` --> ${time}`}`;
        this.installed = true;

        if (this.isLocal && this.$refs.trackLocalFile.value) {
          this.trackLocalFile();
        } else if (this.$refs.closeAfterInstall.value) {
          this.close();
        }
      } catch (err) {
        this.message = `${err}`;
        this.installable = true;
      }
    },

    async trackLocalFile() {
      if (this.tracking || !this.isLocal || !this.installed) {
        return;
      }

      cachedCodePromise = null; // always re-read because the file may have changed since then

      this.tracking = true;

      while (this.$refs.trackLocalFile.value && this.tracking !== 'stop') {
        await (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_2__.makePause)(500);

        try {
          await this.loadData(true);
          await this.parseMeta();
          await this.loadDeps();
          await this.installScript();
          this.sameCode = false;
        } catch (e) {
          /* NOP */
        }
      }

      this.tracking = false;
    },

    async checkSameCode() {
      const {
        name,
        namespace
      } = this.script.meta || {};
      const old = await (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_2__.sendCmdDirectly)('GetScript', {
        meta: {
          name,
          namespace
        }
      });
      this.reinstall = !!old;
      this.sameCode = old && this.code === (await (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_2__.sendCmdDirectly)('GetScriptCode', old.props.id));
    },

    createFilePort() {
      filePort = browser.tabs.connect(this.info.tabId, {
        name: 'FetchSelf'
      });
      filePort.onMessage.addListener(code => {
        filePortResolve(code);
      });
      filePort.onDisconnect.addListener(() => {
        this.tracking = 'stop';
      });
    },

    pingFilePort(resolve) {
      if (!filePort) this.createFilePort();
      filePortResolve = resolve;
      filePort.postMessage(null);
    }

  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/confirm/views/app.vue?vue&type=template&id=74f0cb68":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/confirm/views/app.vue?vue&type=template&id=74f0cb68 ***!
  \************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm-bundler.js");

const _hoisted_1 = {
  class: "frame-block"
};
const _hoisted_2 = {
  class: "flex"
};

const _hoisted_3 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
  class: "image"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
  src: "/public/images/icon128.png"
})], -1
/* HOISTED */
);

const _hoisted_4 = {
  class: "info"
};
const _hoisted_5 = ["textContent"];
const _hoisted_6 = ["textContent"];
const _hoisted_7 = ["textContent"];
const _hoisted_8 = {
  class: "flex"
};
const _hoisted_9 = ["textContent"];
const _hoisted_10 = ["href"];
const _hoisted_11 = ["textContent"];
const _hoisted_12 = ["textContent"];
const _hoisted_13 = ["data-collapsed"];
const _hoisted_14 = ["data-type", "hidden"];
const _hoisted_15 = ["textContent"];
const _hoisted_16 = ["textContent"];
const _hoisted_17 = {
  class: "flex"
};
const _hoisted_18 = {
  class: "image flex"
};
const _hoisted_19 = ["src"];
const _hoisted_20 = {
  class: "actions flex flex-wrap mr-2c"
};
const _hoisted_21 = ["textContent", "data-hotkey", "disabled"];
const _hoisted_22 = ["textContent"];
const _hoisted_23 = {
  class: "flex flex-col my-1"
};
const _hoisted_24 = ["textContent"];
const _hoisted_25 = ["textContent", "title"];
const _hoisted_26 = ["textContent"];
const _hoisted_27 = {
  class: "frame-block flex-1 pos-rel"
};
function render(_ctx, _cache) {
  var _ctx$$refs$trackLocal;

  const _component_icon = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("icon");

  const _component_tooltip = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("tooltip");

  const _component_setting_check = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("setting-check");

  const _component_vm_externals = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("vm-externals");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["page-confirm frame flex flex-col h-screen", {
      reinstall: _ctx.reinstall
    }])
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [_hoisted_3, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    textContent: (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.heading)
  }, null, 8
  /* PROPS */
  , _hoisted_5), _ctx.sameCode ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
    key: 0,
    textContent: (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.i18n('msgSameCode')),
    style: {
      "font-weight": "normal"
    }
  }, null, 8
  /* PROPS */
  , _hoisted_6)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "ellipsis",
    textContent: (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.name)
  }, null, 8
  /* PROPS */
  , _hoisted_7)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_tooltip, {
    content: _ctx.i18n('editNavCode'),
    class: "abs-center",
    placement: "right"
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_icon, {
      name: "code"
    })]),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["content"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "ellipsis",
    textContent: (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.info.url ? decodeURIComponent(_ctx.info.url) : '...')
  }, null, 8
  /* PROPS */
  , _hoisted_9)]), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.icons, ([url, icon, title]) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("a", {
      key: icon,
      class: "flex",
      target: "_blank",
      href: url
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_tooltip, {
      content: title,
      class: "abs-center",
      placement: "right"
    }, {
      default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_icon, {
        name: icon
      }, null, 8
      /* PROPS */
      , ["name"])]),
      _: 2
      /* DYNAMIC */

    }, 1032
    /* PROPS, DYNAMIC_SLOTS */
    , ["content"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "ellipsis",
      textContent: (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(decodeURIComponent(url))
    }, null, 8
    /* PROPS */
    , _hoisted_11)], 8
    /* PROPS */
    , _hoisted_10);
  }), 128
  /* KEYED_FRAGMENT */
  )), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "descr",
    textContent: (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.descr)
  }, null, 8
  /* PROPS */
  , _hoisted_12), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "lists flex flex-wrap",
    "data-collapsed": !_ctx.listsShown
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "toggle abs-center",
    onClick: _cache[0] || (_cache[0] = $event => _ctx.listsShown = !_ctx.listsShown)
  }, [_ctx.lists ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_tooltip, {
    key: 0,
    content: _ctx.i18n('msgShowHide'),
    placement: "bottom",
    align: "left"
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_icon, {
      name: "info"
    })]),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["content"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.lists, (list, name) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("dl", {
      key: name,
      "data-type": name,
      hidden: !list.length,
      tabindex: "0"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("dt", {
      textContent: (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(name ? `@${name}` : _ctx.i18n('genericError'))
    }, null, 8
    /* PROPS */
    , _hoisted_15), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("dd", {
      textContent: (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(list),
      class: "ellipsis"
    }, null, 8
    /* PROPS */
    , _hoisted_16)], 8
    /* PROPS */
    , _hoisted_14);
  }), 128
  /* KEYED_FRAGMENT */
  ))], 8
  /* PROPS */
  , _hoisted_13)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: _ctx.safeIcon
  }, null, 8
  /* PROPS */
  , _hoisted_19)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    id: "confirm",
    ref: "confirm",
    textContent: (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.reinstall ? _ctx.i18n('buttonConfirmReinstallation') : _ctx.i18n('buttonConfirmInstallation')),
    "data-hotkey": _ctx.confirmHotkey,
    onClick: _cache[1] || (_cache[1] = (...args) => _ctx.installScript && _ctx.installScript(...args)),
    disabled: !_ctx.installable
  }, null, 8
  /* PROPS */
  , _hoisted_21), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    textContent: (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.i18n('buttonClose')),
    onClick: _cache[2] || (_cache[2] = (...args) => _ctx.close && _ctx.close(...args))
  }, null, 8
  /* PROPS */
  , _hoisted_22), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_setting_check, {
    name: "closeAfterInstall",
    label: _ctx.i18n('installOptionClose'),
    "data-disabled": _ctx.isLocal && !!((_ctx$$refs$trackLocal = _ctx.$refs.trackLocalFile) != null && _ctx$$refs$trackLocal.value),
    ref: "closeAfterInstall"
  }, null, 8
  /* PROPS */
  , ["label", "data-disabled"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_setting_check, {
    name: "trackLocalFile",
    onChange: _ctx.trackLocalFile,
    ref: "trackLocalFile",
    "data-disabled": !_ctx.isLocal
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_tooltip, {
      content: _ctx.trackTooltip,
      disabled: !_ctx.trackTooltip
    }, {
      default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        textContent: (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.i18n('installOptionTrack'))
      }, null, 8
      /* PROPS */
      , _hoisted_24)]),
      _: 1
      /* STABLE */

    }, 8
    /* PROPS */
    , ["content", "disabled"])]),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["onChange", "data-disabled"])]), _ctx.message ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    textContent: (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.message),
    title: _ctx.error,
    class: "status"
  }, null, 8
  /* PROPS */
  , _hoisted_25)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), _ctx.info.incognito ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    class: "incognito",
    textContent: (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.i18n('msgIncognitoChanges'))
  }, null, 8
  /* PROPS */
  , _hoisted_26)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [_ctx.script ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_vm_externals, {
    key: 0,
    ref: "externals",
    value: _ctx.script,
    class: "abs-full",
    "cm-options": _ctx.cmOptions,
    commands: _ctx.commands,
    install: {
      code: _ctx.code,
      deps: _ctx.deps,
      url: _ctx.info.url
    }
  }, null, 8
  /* PROPS */
  , ["value", "cm-options", "commands", "install"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])], 2
  /* CLASS */
  );
}

/***/ }),

/***/ "./src/confirm/index.js":
/*!******************************!*\
  !*** ./src/confirm/index.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _home_runner_work_violentmonkey_violentmonkey_src_common_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/common/browser */ "./src/common/browser.js");
/* harmony import */ var _home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/common */ "./src/common/index.js");
/* harmony import */ var _home_runner_work_violentmonkey_violentmonkey_src_common_handlers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/common/handlers */ "./src/common/handlers.js");
/* harmony import */ var _home_runner_work_violentmonkey_violentmonkey_src_common_options__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/common/options */ "./src/common/options.js");
/* harmony import */ var _home_runner_work_violentmonkey_violentmonkey_src_common_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./src/common/ui */ "./src/common/ui/index.js");
/* harmony import */ var _home_runner_work_violentmonkey_violentmonkey_src_common_ui_favicon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./src/common/ui/favicon */ "./src/common/ui/favicon.js");
/* harmony import */ var _home_runner_work_violentmonkey_violentmonkey_src_common_ui_style__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./src/common/ui/style */ "./src/common/ui/style/index.js");
/* harmony import */ var _views_app__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./views/app */ "./src/confirm/views/app.vue");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./style.css */ "./src/confirm/style.css");









document.title = `${(0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_1__.i18n)('labelInstall')} - ${(0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_1__.i18n)('extName')}`;
_home_runner_work_violentmonkey_violentmonkey_src_common_options__WEBPACK_IMPORTED_MODULE_3__["default"].ready.then(() => {
  (0,_home_runner_work_violentmonkey_violentmonkey_src_common_ui__WEBPACK_IMPORTED_MODULE_4__.render)(_views_app__WEBPACK_IMPORTED_MODULE_7__["default"]);
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-6.use[1]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-6.use[2]!./src/confirm/style.css":
/*!***************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-6.use[1]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-6.use[2]!./src/confirm/style.css ***!
  \***************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-6.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-6.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/confirm/views/app.vue?vue&type=style&index=0&id=74f0cb68&lang=css":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-6.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-6.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/confirm/views/app.vue?vue&type=style&index=0&id=74f0cb68&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n/* TODO: fix PostCSS calc() which doesn't work here*/\n.page-confirm h1 {\n    line-height: 1.3;\n    margin: .25rem 0;\n}\n.page-confirm a:not(:hover) {\n    color: unset;\n    text-decoration: none;\n}\n.page-confirm p {\n    margin-top: 1rem;\n}\n.page-confirm .self-start {\n    align-self: flex-start;\n}\n.page-confirm .image {\n    flex: 0 0 48px;\n    align-items: center;\n    justify-content: center;\n    height: 48px; /* reserve the height so it doesn't shift when the icon loads*/\n    padding: 0 14px 0 .25rem;\n    box-sizing: content-box;\n}\n.page-confirm .image img {\n      max-width: 100%;\n      max-height: 100%;\n}\n.page-confirm .info {\n    overflow: hidden;\n}\n.page-confirm .info .descr {\n      max-height: 4rem;\n      overflow-y: auto;\n}\n.page-confirm .info .abs-center {\n      position: absolute;\n      margin-left: -47px;\n      cursor: pointer;\n}\n.page-confirm .icon {\n    width: 18px;\n    height: 18px;\n}\n.page-confirm .lists {\n    margin-top: 1rem;\n}\n.page-confirm .lists dl {\n      margin: 0 1rem 1rem 0;\n}\n.page-confirm .lists dl[data-type=\"antifeature\"] dd {\n        border: 1px solid rgba(255, 0, 0, .5);\n        background: rgba(255, 0, 0, .05);\n        padding: 2px 6px;\n        max-width: 25em;\n}\n.page-confirm .lists dl[data-type=\"\"] {\n        color: red;\n}\n.page-confirm .lists dt {\n      font-weight: bold;\n}\n.page-confirm .lists dd {\n      white-space: pre-wrap;\n      min-width: 5rem;\n      max-height: 10vh;\n      min-height: 1.5rem;\n      overflow-y: auto;\n      overflow-wrap: anywhere;\n}\n.page-confirm [data-collapsed=\"true\"] dd {\n      display: none;\n}\n@media (max-width: 1800px) {\n.page-confirm [data-collapsed=\"true\"] dl:focus dd {\n        display: flex;\n        position: absolute;\n        max-height: 50vh;\n        z-index: 100;\n        background: var(--fill-0-5);\n        box-shadow: 1px 3px 9px rgba(128, 128, 128, .5);\n        padding: .5rem;\n}\n}\n.page-confirm [data-collapsed=\"true\"] dt {\n      cursor: pointer;\n}\n.page-confirm [data-collapsed=\"true\"] .toggle {\n      opacity: .3;\n}\n.page-confirm [data-disabled=\"true\"] {\n    opacity: .4\n}\n.page-confirm .actions {\n    align-items: center;\n}\n.page-confirm .actions label {\n      align-items: center;\n}\n.page-confirm .actions .status {\n      border-left: 5px solid darkorange;\n      padding: .5em;\n      color: #d33a00;\n      animation: fade-in .5s 1 both;\n}\n.page-confirm .incognito {\n    padding: .25em 0;\n    color: red;\n}\n.page-confirm #confirm {\n    font-weight: bold;\n    background: #d4e2d4;\n    border-color: #75a775;\n    color: darkgreen;\n}\n.page-confirm #confirm:hover {\n      border-color: #488148;\n}\n.page-confirm #confirm::after {\n      content: \" (\" attr(data-hotkey) \")\";\n      opacity: .75;\n      font-weight: normal;\n}\n.page-confirm.reinstall #confirm {\n    background: #d1e0ea;\n    border-color: #6699ce;\n    color: #004fc5;\n}\n.page-confirm.reinstall #confirm:hover {\n      border-color: #35699f;\n}\n@media (prefers-color-scheme: dark) {\n.page-confirm .incognito {\n      color: orange;\n}\n.page-confirm #confirm {\n      background: #3a5d3a;\n      border-color: #598059;\n      color: #9cd89c;\n}\n.page-confirm #confirm:hover {\n        border-color: #80a980;\n}\n.page-confirm.reinstall #confirm {\n      background: #224a73;\n      border-color: #3d6996;\n      color: #9fcdfd;\n}\n.page-confirm.reinstall #confirm:hover {\n        border-color: #608cb8;\n}\n.page-confirm .actions .status {\n        color: darkorange;\n}\n}\n.page-confirm .edit-externals .select {\n    resize: vertical;\n}\n.page-confirm .edit-externals .select[style] {\n      max-height: 80%;\n}\n@media (max-width: 1599px) {\n.page-confirm >:first-child {\n      min-height: 5em;\n      max-height: 80vh;\n      width: auto !important; /* resetting the inline style attribute if the user resized it*/\n      resize: vertical;\n      overflow-y: auto;\n}\n}\n@media (min-width: 1801px) {\n.page-confirm {\n    flex-direction: row\n}\n.page-confirm >:first-child {\n      min-width: 30em;\n      max-width: 80%;\n      width: 40%;\n      height: auto !important; /* resetting the inline style attribute if the user resized it*/\n      resize: horizontal;\n      overflow: hidden;\n}\n.page-confirm .info .descr {\n      max-height: 20vh;\n}\n.page-confirm .lists {\n      overflow-y: auto;\n      max-height: 75vh;\n}\n.page-confirm .lists dd {\n      max-height: 30vh;\n      display: block;\n}\n.page-confirm .edit-externals {\n      border-top: none;\n      border-left: var(--border);\n}\n}\n.confirm-options label {\n    display: block;\n}\n.confirm-options .vl-dropdown-menu {\n    width: 13rem;\n}\n.vl-tooltip-bottom > i {\n    margin-left: 10px;\n}\n.vl-tooltip-bottom.vl-tooltip-align-left {\n    margin-left: -13px;\n}\n@keyframes fade-in {\nfrom {\n    opacity: 0;\n}\nto {\n    opacity: 1;\n}\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ "./src/confirm/style.css":
/*!*******************************!*\
  !*** ./src/confirm/style.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_6_use_1_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_6_use_2_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-6.use[1]!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-6.use[2]!./style.css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-6.use[1]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-6.use[2]!./src/confirm/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_6_use_1_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_6_use_2_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_6_use_1_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_6_use_2_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_clonedRuleSet_6_use_1_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_6_use_2_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_clonedRuleSet_6_use_1_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_6_use_2_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-6.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-6.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/confirm/views/app.vue?vue&type=style&index=0&id=74f0cb68&lang=css":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-6.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-6.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/confirm/views/app.vue?vue&type=style&index=0&id=74f0cb68&lang=css ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_6_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_6_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_app_vue_vue_type_style_index_0_id_74f0cb68_lang_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-6.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-6.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0]!./app.vue?vue&type=style&index=0&id=74f0cb68&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-6.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-6.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/confirm/views/app.vue?vue&type=style&index=0&id=74f0cb68&lang=css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_6_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_6_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_app_vue_vue_type_style_index_0_id_74f0cb68_lang_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_6_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_6_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_app_vue_vue_type_style_index_0_id_74f0cb68_lang_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_clonedRuleSet_6_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_6_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_app_vue_vue_type_style_index_0_id_74f0cb68_lang_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_clonedRuleSet_6_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_6_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_app_vue_vue_type_style_index_0_id_74f0cb68_lang_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/confirm/views/app.vue":
/*!***********************************!*\
  !*** ./src/confirm/views/app.vue ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _app_vue_vue_type_template_id_74f0cb68__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.vue?vue&type=template&id=74f0cb68 */ "./src/confirm/views/app.vue?vue&type=template&id=74f0cb68");
/* harmony import */ var _app_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.vue?vue&type=script&lang=js */ "./src/confirm/views/app.vue?vue&type=script&lang=js");
/* harmony import */ var _app_vue_vue_type_style_index_0_id_74f0cb68_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.vue?vue&type=style&index=0&id=74f0cb68&lang=css */ "./src/confirm/views/app.vue?vue&type=style&index=0&id=74f0cb68&lang=css");
/* harmony import */ var _home_runner_work_violentmonkey_violentmonkey_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_home_runner_work_violentmonkey_violentmonkey_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_app_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_app_vue_vue_type_template_id_74f0cb68__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"src/confirm/views/app.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./src/confirm/views/app.vue?vue&type=script&lang=js":
/*!***********************************************************!*\
  !*** ./src/confirm/views/app.vue?vue&type=script&lang=js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_dist_index_js_ruleSet_0_app_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_dist_index_js_ruleSet_0_app_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/dist/index.js??ruleSet[0]!./app.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/confirm/views/app.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./src/confirm/views/app.vue?vue&type=template&id=74f0cb68":
/*!*****************************************************************!*\
  !*** ./src/confirm/views/app.vue?vue&type=template&id=74f0cb68 ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_app_vue_vue_type_template_id_74f0cb68__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_app_vue_vue_type_template_id_74f0cb68__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0]!./app.vue?vue&type=template&id=74f0cb68 */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/confirm/views/app.vue?vue&type=template&id=74f0cb68");


/***/ }),

/***/ "./src/confirm/views/app.vue?vue&type=style&index=0&id=74f0cb68&lang=css":
/*!*******************************************************************************!*\
  !*** ./src/confirm/views/app.vue?vue&type=style&index=0&id=74f0cb68&lang=css ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_6_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_6_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_app_vue_vue_type_style_index_0_id_74f0cb68_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-6.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-6.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0]!./app.vue?vue&type=style&index=0&id=74f0cb68&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-6.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-6.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/confirm/views/app.vue?vue&type=style&index=0&id=74f0cb68&lang=css");


/***/ }),

/***/ "./src/resources/svg sync \\.svg$":
/*!*****************************************************!*\
  !*** ./src/resources/svg/ sync nonrecursive \.svg$ ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./arrow.svg": "./src/resources/svg/arrow.svg",
	"./author.svg": "./src/resources/svg/author.svg",
	"./code.svg": "./src/resources/svg/code.svg",
	"./cog.svg": "./src/resources/svg/cog.svg",
	"./command.svg": "./src/resources/svg/command.svg",
	"./filter.svg": "./src/resources/svg/filter.svg",
	"./home.svg": "./src/resources/svg/home.svg",
	"./info.svg": "./src/resources/svg/info.svg",
	"./more.svg": "./src/resources/svg/more.svg",
	"./plus.svg": "./src/resources/svg/plus.svg",
	"./question.svg": "./src/resources/svg/question.svg",
	"./refresh.svg": "./src/resources/svg/refresh.svg",
	"./search.svg": "./src/resources/svg/search.svg",
	"./toggle-off.svg": "./src/resources/svg/toggle-off.svg",
	"./toggle-on.svg": "./src/resources/svg/toggle-on.svg",
	"./trash.svg": "./src/resources/svg/trash.svg",
	"./undo.svg": "./src/resources/svg/undo.svg"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src/resources/svg sync \\.svg$";

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _extends)
/* harmony export */ });
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"confirm/index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkviolentmonkey"] = self["webpackChunkviolentmonkey"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["public/lib/codemirror","common-ui"], () => (__webpack_require__("./src/confirm/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLCtCQUErQix3Q0FBd0M7V0FDdkU7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQkFBaUIscUJBQXFCO1dBQ3RDO1dBQ0E7V0FDQSxrQkFBa0IscUJBQXFCO1dBQ3ZDO1dBQ0E7V0FDQSxLQUFLO1dBQ0w7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQzNCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1dDaERBOzs7OztVRUFBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92aW9sZW50bW9ua2V5Ly4vc3JjL2NvbmZpcm0vdmlld3MvYXBwLnZ1ZSIsIndlYnBhY2s6Ly92aW9sZW50bW9ua2V5Ly4vc3JjL2NvbmZpcm0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vdmlvbGVudG1vbmtleS8uL3NyYy9jb25maXJtL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly92aW9sZW50bW9ua2V5Ly4vc3JjL2NvbmZpcm0vdmlld3MvYXBwLnZ1ZT85OTZhIiwid2VicGFjazovL3Zpb2xlbnRtb25rZXkvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3Zpb2xlbnRtb25rZXkvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvbm9Tb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3Zpb2xlbnRtb25rZXkvLi9zcmMvY29uZmlybS9zdHlsZS5jc3M/ZDdjZSIsIndlYnBhY2s6Ly92aW9sZW50bW9ua2V5Ly4vc3JjL2NvbmZpcm0vdmlld3MvYXBwLnZ1ZT9kYjhhIiwid2VicGFjazovL3Zpb2xlbnRtb25rZXkvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vdmlvbGVudG1vbmtleS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vdmlvbGVudG1vbmtleS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly92aW9sZW50bW9ua2V5Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3Zpb2xlbnRtb25rZXkvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly92aW9sZW50bW9ua2V5Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vdmlvbGVudG1vbmtleS8uL3NyYy9jb25maXJtL3ZpZXdzL2FwcC52dWU/NzkwYiIsIndlYnBhY2s6Ly92aW9sZW50bW9ua2V5Ly4vc3JjL2NvbmZpcm0vdmlld3MvYXBwLnZ1ZT8yNTBlIiwid2VicGFjazovL3Zpb2xlbnRtb25rZXkvLi9zcmMvY29uZmlybS92aWV3cy9hcHAudnVlPzhlNDQiLCJ3ZWJwYWNrOi8vdmlvbGVudG1vbmtleS8uL3NyYy9jb25maXJtL3ZpZXdzL2FwcC52dWU/NmRlZSIsIndlYnBhY2s6Ly92aW9sZW50bW9ua2V5Ly4vc3JjL3Jlc291cmNlcy9zdmcvIHN5bmMgbm9ucmVjdXJzaXZlIFxcLnN2ZyQiLCJ3ZWJwYWNrOi8vdmlvbGVudG1vbmtleS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzLmpzIiwid2VicGFjazovL3Zpb2xlbnRtb25rZXkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdmlvbGVudG1vbmtleS93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL3Zpb2xlbnRtb25rZXkvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vdmlvbGVudG1vbmtleS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdmlvbGVudG1vbmtleS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Zpb2xlbnRtb25rZXkvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly92aW9sZW50bW9ua2V5L3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL3Zpb2xlbnRtb25rZXkvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL3Zpb2xlbnRtb25rZXkvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly92aW9sZW50bW9ua2V5L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly92aW9sZW50bW9ua2V5L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJwYWdlLWNvbmZpcm0gZnJhbWUgZmxleCBmbGV4LWNvbCBoLXNjcmVlblwiIDpjbGFzcz1cInsgcmVpbnN0YWxsIH1cIj5cbiAgICA8ZGl2IGNsYXNzPVwiZnJhbWUtYmxvY2tcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJmbGV4XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbWFnZVwiPlxuICAgICAgICAgIDxpbWcgc3JjPVwiL3B1YmxpYy9pbWFnZXMvaWNvbjEyOC5wbmdcIj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbmZvXCI+XG4gICAgICAgICAgPGgxPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPHNwYW4gdi10ZXh0PVwiaGVhZGluZ1wiLz5cbiAgICAgICAgICAgICAgPHNwYW4gdi10ZXh0PVwiaTE4bignbXNnU2FtZUNvZGUnKVwiIHN0eWxlPVwiZm9udC13ZWlnaHQ6bm9ybWFsXCIgdi1pZj1cInNhbWVDb2RlXCIvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWxsaXBzaXNcIiB2LXRleHQ9XCJuYW1lXCIvPlxuICAgICAgICAgIDwvaDE+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZsZXhcIj5cbiAgICAgICAgICAgIDx0b29sdGlwIDpjb250ZW50PVwiaTE4bignZWRpdE5hdkNvZGUnKVwiIGNsYXNzPVwiYWJzLWNlbnRlclwiIHBsYWNlbWVudD1cInJpZ2h0XCI+XG4gICAgICAgICAgICAgIDxpY29uIG5hbWU9XCJjb2RlXCIvPlxuICAgICAgICAgICAgPC90b29sdGlwPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJlbGxpcHNpc1wiIHYtdGV4dD1cImluZm8udXJsID8gZGVjb2RlVVJJQ29tcG9uZW50KGluZm8udXJsKSA6ICcuLi4nXCIvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxhIHYtZm9yPVwiKFt1cmwsIGljb24sIHRpdGxlXSkgaW4gaWNvbnNcIiA6a2V5PVwiaWNvblwiXG4gICAgICAgICAgICAgY2xhc3M9XCJmbGV4XCIgdGFyZ2V0PVwiX2JsYW5rXCIgOmhyZWY9XCJ1cmxcIj5cbiAgICAgICAgICAgIDx0b29sdGlwIDpjb250ZW50PVwidGl0bGVcIiBjbGFzcz1cImFicy1jZW50ZXJcIiBwbGFjZW1lbnQ9XCJyaWdodFwiPlxuICAgICAgICAgICAgICA8aWNvbiA6bmFtZT1cImljb25cIi8+XG4gICAgICAgICAgICA8L3Rvb2x0aXA+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImVsbGlwc2lzXCIgdi10ZXh0PVwiZGVjb2RlVVJJQ29tcG9uZW50KHVybClcIi8+XG4gICAgICAgICAgPC9hPlxuICAgICAgICAgIDxwIGNsYXNzPVwiZGVzY3JcIiB2LXRleHQ9XCJkZXNjclwiLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdHMgZmxleCBmbGV4LXdyYXBcIiA6ZGF0YS1jb2xsYXBzZWQ9XCIhbGlzdHNTaG93blwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZ2dsZSBhYnMtY2VudGVyXCIgQGNsaWNrPVwibGlzdHNTaG93biA9ICFsaXN0c1Nob3duXCI+XG4gICAgICAgICAgICAgIDx0b29sdGlwIDpjb250ZW50PVwiaTE4bignbXNnU2hvd0hpZGUnKVwiIHBsYWNlbWVudD1cImJvdHRvbVwiIGFsaWduPVwibGVmdFwiIHYtaWY9XCJsaXN0c1wiPlxuICAgICAgICAgICAgICAgIDxpY29uIG5hbWU9XCJpbmZvXCIvPlxuICAgICAgICAgICAgICA8L3Rvb2x0aXA+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkbCB2LWZvcj1cIihsaXN0LCBuYW1lKSBpbiBsaXN0c1wiIDprZXk9XCJuYW1lXCJcbiAgICAgICAgICAgICAgICA6ZGF0YS10eXBlPVwibmFtZVwiIDpoaWRkZW49XCIhbGlzdC5sZW5ndGhcIiB0YWJpbmRleD1cIjBcIj5cbiAgICAgICAgICAgICAgPGR0IHYtdGV4dD1cIm5hbWUgPyBgQCR7bmFtZX1gIDogaTE4bignZ2VuZXJpY0Vycm9yJylcIi8+XG4gICAgICAgICAgICAgIDxkZCB2LXRleHQ9XCJsaXN0XCIgY2xhc3M9XCJlbGxpcHNpc1wiLz5cbiAgICAgICAgICAgIDwvZGw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiZmxleFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW1hZ2UgZmxleFwiPlxuICAgICAgICAgIDxpbWcgOnNyYz1cInNhZmVJY29uXCI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWN0aW9ucyBmbGV4IGZsZXgtd3JhcCBtci0yY1wiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGlkPVwiY29uZmlybVwiXG4gICAgICAgICAgICByZWY9XCJjb25maXJtXCJcbiAgICAgICAgICAgIHYtdGV4dD1cInJlaW5zdGFsbFxuICAgICAgICAgICAgICA/IGkxOG4oJ2J1dHRvbkNvbmZpcm1SZWluc3RhbGxhdGlvbicpXG4gICAgICAgICAgICAgIDogaTE4bignYnV0dG9uQ29uZmlybUluc3RhbGxhdGlvbicpXCJcbiAgICAgICAgICAgIDpkYXRhLWhvdGtleT1cImNvbmZpcm1Ib3RrZXlcIlxuICAgICAgICAgICAgQGNsaWNrPVwiaW5zdGFsbFNjcmlwdFwiIDpkaXNhYmxlZD1cIiFpbnN0YWxsYWJsZVwiLz5cbiAgICAgICAgICA8YnV0dG9uIHYtdGV4dD1cImkxOG4oJ2J1dHRvbkNsb3NlJylcIiBAY2xpY2s9XCJjbG9zZVwiLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleCBmbGV4LWNvbCBteS0xXCI+XG4gICAgICAgICAgICA8c2V0dGluZy1jaGVjayBuYW1lPVwiY2xvc2VBZnRlckluc3RhbGxcIiA6bGFiZWw9XCJpMThuKCdpbnN0YWxsT3B0aW9uQ2xvc2UnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICA6ZGF0YS1kaXNhYmxlZD1cImlzTG9jYWwgJiYgISEkcmVmcy50cmFja0xvY2FsRmlsZT8udmFsdWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPVwiY2xvc2VBZnRlckluc3RhbGxcIiAvPlxuICAgICAgICAgICAgPHNldHRpbmctY2hlY2sgbmFtZT1cInRyYWNrTG9jYWxGaWxlXCIgQGNoYW5nZT1cInRyYWNrTG9jYWxGaWxlXCIgcmVmPVwidHJhY2tMb2NhbEZpbGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgOmRhdGEtZGlzYWJsZWQ9XCIhaXNMb2NhbFwiPlxuICAgICAgICAgICAgICA8dG9vbHRpcCA6Y29udGVudD1cInRyYWNrVG9vbHRpcFwiIDpkaXNhYmxlZD1cIiF0cmFja1Rvb2x0aXBcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiB2LXRleHQ9XCJpMThuKCdpbnN0YWxsT3B0aW9uVHJhY2snKVwiLz5cbiAgICAgICAgICAgICAgPC90b29sdGlwPlxuICAgICAgICAgICAgPC9zZXR0aW5nLWNoZWNrPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgdi10ZXh0PVwibWVzc2FnZVwiIHYtaWY9XCJtZXNzYWdlXCIgOnRpdGxlPVwiZXJyb3JcIiBjbGFzcz1cInN0YXR1c1wiLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbmNvZ25pdG9cIiB2LWlmPVwiaW5mby5pbmNvZ25pdG9cIiB2LXRleHQ9XCJpMThuKCdtc2dJbmNvZ25pdG9DaGFuZ2VzJylcIi8+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImZyYW1lLWJsb2NrIGZsZXgtMSBwb3MtcmVsXCI+XG4gICAgICA8dm0tZXh0ZXJuYWxzXG4gICAgICAgIHJlZj1cImV4dGVybmFsc1wiXG4gICAgICAgIHYtaWY9XCJzY3JpcHRcIlxuICAgICAgICA6dmFsdWU9XCJzY3JpcHRcIlxuICAgICAgICBjbGFzcz1cImFicy1mdWxsXCJcbiAgICAgICAgOmNtLW9wdGlvbnM9XCJjbU9wdGlvbnNcIlxuICAgICAgICA6Y29tbWFuZHM9XCJjb21tYW5kc1wiXG4gICAgICAgIDppbnN0YWxsPVwieyBjb2RlLCBkZXBzLCB1cmw6IGluZm8udXJsIH1cIlxuICAgICAgLz5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IFRvb2x0aXAgZnJvbSAndnVlbGV0b24vbGliL3Rvb2x0aXAnO1xuaW1wb3J0IEljb24gZnJvbSAnQC9jb21tb24vdWkvaWNvbic7XG5pbXBvcnQge1xuICBnZXRGdWxsVXJsLCBnZXRMb2NhbGVTdHJpbmcsIGdldFNjcmlwdEhvbWUsIGlzUmVtb3RlLFxuICBtYWtlUGF1c2UsIG1ha2VSYXcsIHJlcXVlc3QsIHNlbmRDbWREaXJlY3RseSwgdHJ1ZUpvaW4sXG59IGZyb20gJ0AvY29tbW9uJztcbmltcG9ydCB7IGtleWJvYXJkU2VydmljZSB9IGZyb20gJ0AvY29tbW9uL2tleWJvYXJkJztcbmltcG9ydCBpbml0Q2FjaGUgZnJvbSAnQC9jb21tb24vY2FjaGUnO1xuaW1wb3J0IFZtRXh0ZXJuYWxzIGZyb20gJ0AvY29tbW9uL3VpL2V4dGVybmFscyc7XG5pbXBvcnQgU2V0dGluZ0NoZWNrIGZyb20gJ0AvY29tbW9uL3VpL3NldHRpbmctY2hlY2snO1xuaW1wb3J0IHsgbG9hZFNjcmlwdEljb24gfSBmcm9tICdAL2NvbW1vbi9sb2FkLXNjcmlwdC1pY29uJztcbmltcG9ydCB7IGRlZXBFcXVhbCwgb2JqZWN0UGljayB9IGZyb20gJ0AvY29tbW9uL29iamVjdCc7XG5pbXBvcnQgeyByb3V0ZSB9IGZyb20gJ0AvY29tbW9uL3JvdXRlcic7XG5pbXBvcnQgdWEgZnJvbSAnQC9jb21tb24vdWEnO1xuXG5jb25zdCBLRUVQX0lORk9fREVMQVkgPSA1MDAwO1xuY29uc3QgUkVUUllfREVMQVkgPSAzMDAwO1xuY29uc3QgUkVUUllfQ09VTlQgPSAyO1xuY29uc3QgTUFYX1RJVExFX05BTUVfTEVOID0gMTAwO1xuY29uc3QgQ09ORklSTV9IT1RLRVkgPSBgJHsvTWFjLy50ZXN0KG5hdmlnYXRvci5wbGF0Zm9ybSkgPyAnQ21kJyA6ICdDdHJsJ30tRW50ZXJgO1xuY29uc3QgY2FjaGUgPSBpbml0Q2FjaGUoeyBsaWZldGltZTogUkVUUllfREVMQVkgKiAoUkVUUllfQ09VTlQgKyAxKSB9KTtcbi8qKiBAdHlwZSB7Y2hyb21lLnJ1bnRpbWUuUG9ydH0gKi9cbmxldCBmaWxlUG9ydDtcbi8qKiBAdHlwZSB7ZnVuY3Rpb24oKX0gKi9cbmxldCBmaWxlUG9ydFJlc29sdmU7XG4vKiogQHR5cGUge2Jvb2xlYW59ICovXG5sZXQgZmlsZVBvcnROZWVkZWQ7XG5sZXQgYmFzaWNUaXRsZTtcbmxldCBjYWNoZWRDb2RlUHJvbWlzZTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBjb21wb25lbnRzOiB7XG4gICAgSWNvbixcbiAgICBWbUV4dGVybmFscyxcbiAgICBTZXR0aW5nQ2hlY2ssXG4gICAgVG9vbHRpcCxcbiAgfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaW5zdGFsbGFibGU6IGZhbHNlLFxuICAgICAgaW5zdGFsbGVkOiBmYWxzZSxcbiAgICAgIG1lc3NhZ2U6ICcnLFxuICAgICAgY21PcHRpb25zOiB7XG4gICAgICAgIGxpbmVXcmFwcGluZzogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICBjb2RlOiAnJyxcbiAgICAgIGNvbW1hbmRzOiB7XG4gICAgICAgIGNsb3NlOiB0aGlzLmNsb3NlLFxuICAgICAgfSxcbiAgICAgIGNvbmZpcm1Ib3RrZXk6IENPTkZJUk1fSE9US0VZLFxuICAgICAgLyoqIEB0eXBlIHtWTS5Db25maXJtQ2FjaGV9ICovXG4gICAgICBpbmZvOiB7fSxcbiAgICAgIGRlcHM6IHt9LCAvLyBjb21iaW5lcyBgdGhpcy5yZXF1aXJlYCBhbmQgYHRoaXMucmVzb3VyY2VzYCA9IGFsbCBhY3R1YWxseSBsb2FkZWQgZGVwc1xuICAgICAgZGVzY3I6ICcnLFxuICAgICAgZXJyb3I6IG51bGwsXG4gICAgICBoZWFkaW5nOiB0aGlzLmkxOG4oJ21zZ0xvYWRpbmdEYXRhJyksXG4gICAgICBsaXN0czogbnVsbCxcbiAgICAgIGxpc3RzU2hvd246IHRydWUsXG4gICAgICBuYW1lOiAnLi4uJyxcbiAgICAgIHJlaW5zdGFsbDogZmFsc2UsXG4gICAgICBzYWZlSWNvbjogbnVsbCxcbiAgICAgIHNhbWVDb2RlOiBmYWxzZSxcbiAgICAgIHNjcmlwdDogbnVsbCxcbiAgICB9O1xuICB9LFxuICBjb21wdXRlZDoge1xuICAgIHRyYWNrVG9vbHRpcCgpIHtcbiAgICAgIHJldHVybiB1YS5maXJlZm94ID49IDY4ID8gdGhpcy5pMThuKCdpbnN0YWxsT3B0aW9uVHJhY2tUb29sdGlwJykgOiBudWxsO1xuICAgIH0sXG4gICAgaXNMb2NhbCgpIHtcbiAgICAgIHJldHVybiAhaXNSZW1vdGUodGhpcy5pbmZvLnVybCk7XG4gICAgfSxcbiAgICBpY29ucygpIHtcbiAgICAgIGNvbnN0IHsgc2NyaXB0IH0gPSB0aGlzO1xuICAgICAgY29uc3QgaG9tZXBhZ2VVUkwgPSBzY3JpcHQgJiYgZ2V0U2NyaXB0SG9tZShzY3JpcHQpO1xuICAgICAgY29uc3Qgc3VwcG9ydFVSTCA9IHNjcmlwdD8ubWV0YS5zdXBwb3J0VVJMO1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAgaG9tZXBhZ2VVUkwgJiYgW2hvbWVwYWdlVVJMLCAnaG9tZScsIHRoaXMuaTE4bignbGFiZWxIb21lcGFnZScpXSxcbiAgICAgICAgc3VwcG9ydFVSTCAmJiBbc3VwcG9ydFVSTCwgJ3F1ZXN0aW9uJywgdGhpcy5pMThuKCdidXR0b25TdXBwb3J0JyldLFxuICAgICAgXS5maWx0ZXIoQm9vbGVhbik7XG4gICAgfSxcbiAgfSxcbiAgYXN5bmMgbW91bnRlZCgpIHtcbiAgICBjb25zdCBpZCA9IHJvdXRlLnBhdGhzWzBdO1xuICAgIGNvbnN0IGtleSA9IGBjb25maXJtLSR7aWR9YDtcbiAgICBjb25zdCBpbmZvID0gYXdhaXQgc2VuZENtZERpcmVjdGx5KCdDYWNoZUxvYWQnLCBrZXkpO1xuICAgIHRoaXMuaW5mbyA9IGluZm87XG4gICAgaWYgKCFpbmZvKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8qIHNlbmRDbWREaXJlY3RseSBtYWtlcyB0aGUgcGFnZSBsb2FkIHNvIGZhc3QgdGhhdCB0aGUgbG9jYWwgYHVhYCBpcyBzdGlsbCB1bnZlcmlmaWVkLFxuICAgICAgIHNvIHdlIHVzZSB0aGUgYmFja2dyb3VuZCBgdWFgIHRvIGNoZWNrIGZvciBGRjY4IHRoYXQgZGlzYWxsb3dzIGZpbGU6IHNjaGVtZSBpbiBmZXRjaCgpICovXG4gICAgZmlsZVBvcnROZWVkZWQgPSBpbmZvLmZmID49IDY4ICYmIGluZm8udXJsLnN0YXJ0c1dpdGgoJ2ZpbGU6Jyk7XG4gICAgY2FjaGVkQ29kZVByb21pc2UgPSBzZW5kQ21kRGlyZWN0bHkoJ0NhY2hlUG9wJywgaW5mby51cmwpO1xuICAgIHRoaXMuZ3VhcmQgPSBzZXRJbnRlcnZhbChzZW5kQ21kRGlyZWN0bHksIEtFRVBfSU5GT19ERUxBWSwgJ0NhY2hlSGl0JywgeyBrZXkgfSk7XG4gICAgYXdhaXQgdGhpcy5sb2FkRGF0YSgpO1xuICAgIGF3YWl0IHRoaXMucGFyc2VNZXRhKCk7XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgdGhpcy5jaGVja1NhbWVDb2RlKCksXG4gICAgICAoYXN5bmMgKCkgPT4ge1xuICAgICAgICBsZXQgcmV0cmllcyA9IFJFVFJZX0NPVU5UO1xuICAgICAgICB3aGlsZSAoIWF3YWl0IHRoaXMubG9hZERlcHMoKSAmJiByZXRyaWVzKSB7XG4gICAgICAgICAgYXdhaXQgbWFrZVBhdXNlKFJFVFJZX0RFTEFZKTtcbiAgICAgICAgICByZXRyaWVzIC09IDE7XG4gICAgICAgIH1cbiAgICAgIH0pKCksXG4gICAgXSk7XG4gICAgaWYgKHRoaXMuaW5zdGFsbGFibGUpIHtcbiAgICAgIHRoaXMuaGVhZGluZyA9IHRoaXMucmVpbnN0YWxsID8gdGhpcy5pMThuKCdsYWJlbFJlaW5zdGFsbCcpIDogdGhpcy5pMThuKCdsYWJlbEluc3RhbGwnKTtcbiAgICB9XG4gICAgdGhpcy5kaXNwb3NlTGlzdCA9IFtcbiAgICAgIGtleWJvYXJkU2VydmljZS5yZWdpc3RlcignY3RybGNtZC1lbnRlcicsICgpID0+IHRoaXMuJHJlZnMuY29uZmlybS5jbGljaygpKSxcbiAgICBdO1xuICAgIGtleWJvYXJkU2VydmljZS5lbmFibGUoKTtcbiAgfSxcbiAgYmVmb3JlVW5tb3VudCgpIHtcbiAgICBpZiAodGhpcy5ndWFyZCkge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmd1YXJkKTtcbiAgICAgIHRoaXMuZ3VhcmQgPSBudWxsO1xuICAgIH1cbiAgICB0aGlzLmRpc3Bvc2VMaXN0Py5mb3JFYWNoKGRpc3Bvc2UgPT4gZGlzcG9zZSgpKTtcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGFzeW5jIGxvYWREYXRhKGNoYW5nZWRPbmx5KSB7XG4gICAgICB0aGlzLmluc3RhbGxhYmxlID0gZmFsc2U7XG4gICAgICBjb25zdCBjb2RlID0gZmlsZVBvcnROZWVkZWRcbiAgICAgICAgPyBhd2FpdCBuZXcgUHJvbWlzZSh0aGlzLnBpbmdGaWxlUG9ydClcbiAgICAgICAgOiBhd2FpdCB0aGlzLmdldFNjcmlwdCh0aGlzLmluZm8udXJsKTtcbiAgICAgIGlmIChjb2RlID09IG51bGwgfHwgY2hhbmdlZE9ubHkgJiYgdGhpcy5jb2RlID09PSBjb2RlKSB0aHJvdyAwO1xuICAgICAgdGhpcy5zZXRDb2RlKGNvZGUpO1xuICAgIH0sXG4gICAgc2V0Q29kZShjb2RlKSB7XG4gICAgICBjb25zdCBsaW5lcyA9IGNvZGUuc3BsaXQoL1xccj9cXG4vKTtcbiAgICAgIGNvbnN0IGNtID0gdGhpcy4kcmVmcy5leHRlcm5hbHM/LiRyZWZzLmNvZGU/LmNtO1xuICAgICAgbGV0IGkgPSAtMTtcbiAgICAgIGxldCBpc0RpZmY7XG4gICAgICBpZiAoY20pIHtcbiAgICAgICAgY20uZWFjaExpbmUoKHsgdGV4dCB9KSA9PiB7XG4gICAgICAgICAgaXNEaWZmID0gdGV4dCAhPT0gbGluZXNbaSArPSAxXTtcbiAgICAgICAgICByZXR1cm4gaXNEaWZmO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY29kZSA9IGNvZGU7XG4gICAgICBpZiAoaXNEaWZmIHx8IGNtICYmIGkgPCBsaW5lcy5sZW5ndGggLSAxKSB7XG4gICAgICAgIHRoaXMuJG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICBjbS5zZXRDdXJzb3IoaSk7XG4gICAgICAgICAgY20uc2Nyb2xsSW50b1ZpZXcobnVsbCwgY20uZGlzcGxheS5sYXN0V3JhcEhlaWdodCAvIDMpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGFzeW5jIHBhcnNlTWV0YSgpIHtcbiAgICAgIGNvbnN0IHsgbWV0YSwgZXJyb3JzIH0gPSBhd2FpdCBzZW5kQ21kRGlyZWN0bHkoJ1BhcnNlTWV0YScsIHRoaXMuY29kZSk7XG4gICAgICBjb25zdCBuYW1lID0gZ2V0TG9jYWxlU3RyaW5nKG1ldGEsICduYW1lJyk7XG4gICAgICBkb2N1bWVudC50aXRsZSA9IGAke25hbWUuc2xpY2UoMCwgTUFYX1RJVExFX05BTUVfTEVOKX0ke25hbWUubGVuZ3RoID4gTUFYX1RJVExFX05BTUVfTEVOID8gJy4uLicgOiAnJ30gLSAke1xuICAgICAgICBiYXNpY1RpdGxlIHx8IChiYXNpY1RpdGxlID0gZG9jdW1lbnQudGl0bGUpXG4gICAgICB9YDtcbiAgICAgIHRoaXMubmFtZSA9IFtuYW1lLCBtZXRhLnZlcnNpb25dOjp0cnVlSm9pbignLCAnKTtcbiAgICAgIHRoaXMuZGVzY3IgPSBnZXRMb2NhbGVTdHJpbmcobWV0YSwgJ2Rlc2NyaXB0aW9uJyk7XG4gICAgICB0aGlzLmxpc3RzID0gb2JqZWN0UGljayhtZXRhLCBbXG4gICAgICAgICdhbnRpZmVhdHVyZScsXG4gICAgICAgICdncmFudCcsXG4gICAgICAgICdtYXRjaCcsXG4gICAgICAgICdpbmNsdWRlJyxcbiAgICAgICAgJ2V4Y2x1ZGUnLFxuICAgICAgICAnZXhjbHVkZU1hdGNoJyxcbiAgICAgICAgJ2NvbXBhdGlibGUnLFxuICAgICAgICAnY29ubmVjdCcsXG4gICAgICBdLCBsaXN0ID0+IChcbiAgICAgICAgbGlzdFxuICAgICAgICA/Lm1hcChzID0+IFtzLnJlcGxhY2UoL15cXFcrLywgJycpIHx8IHMsIHNdKVxuICAgICAgICAuc29ydCgoW2FdLCBbYl0pID0+IChhIDwgYiA/IC0xIDogYSA+IGIpKVxuICAgICAgICAubWFwKChbLCBzXSkgPT4gcylcbiAgICAgICAgLmpvaW4oJ1xcbicpXG4gICAgICAgIHx8ICcnXG4gICAgICApKTtcbiAgICAgIHRoaXMubGlzdHNbJyddID0gZXJyb3JzPy5qb2luKCdcXG4nKSB8fCAnJztcbiAgICAgIHRoaXMuc2NyaXB0ID0geyBtZXRhLCBjdXN0b206IHt9LCBwcm9wczoge30gfTtcbiAgICAgIHRoaXMuYWxsRGVwcyA9IFtcbiAgICAgICAgWy4uLm5ldyBTZXQobWV0YS5yZXF1aXJlKV0sXG4gICAgICAgIFsuLi5uZXcgU2V0KE9iamVjdC52YWx1ZXMobWV0YS5yZXNvdXJjZXMpKV0sXG4gICAgICBdO1xuICAgIH0sXG4gICAgYXN5bmMgbG9hZERlcHMoKSB7XG4gICAgICBjb25zdCB7IHNjcmlwdCwgYWxsRGVwczogW3JlcXVpcmUsIHJlc291cmNlXSB9ID0gdGhpcztcbiAgICAgIGlmICghdGhpcy5zYWZlSWNvbikge1xuICAgICAgICBsb2FkU2NyaXB0SWNvbihzY3JpcHQpLnRoZW4odXJsID0+IHsgdGhpcy5zYWZlSWNvbiA9IHVybDsgfSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5yZXF1aXJlXG4gICAgICAgICAgJiYgZGVlcEVxdWFsKHJlcXVpcmUuc2xpY2UoKS5zb3J0KCksIE9iamVjdC5rZXlzKHRoaXMucmVxdWlyZSkuc29ydCgpKVxuICAgICAgICAgICYmIGRlZXBFcXVhbChyZXNvdXJjZS5zbGljZSgpLnNvcnQoKSwgT2JqZWN0LmtleXModGhpcy5yZXNvdXJjZXMpLnNvcnQoKSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5yZXF1aXJlID0ge307XG4gICAgICB0aGlzLnJlc291cmNlcyA9IHt9O1xuICAgICAgY29uc3QgbGVuZ3RoID0gcmVxdWlyZS5sZW5ndGggKyByZXNvdXJjZS5sZW5ndGg7XG4gICAgICBsZXQgZmluaXNoZWQgPSAwO1xuICAgICAgLy8gQWxsIHJlc291cmNlcyBtYXkgZmluaXNoIHF1aWNrbHkgc28gd2UgZGVsYXkgdGhlIHN0YXR1cyB0byBhdm9pZCBmbGlja2VyXG4gICAgICBjb25zdCBTVEFUVVNfREVMQVkgPSA1MDA7XG4gICAgICBjb25zdCBzdGFydFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgIGNvbnN0IHVwZGF0ZVN0YXR1cyA9ICgpID0+IHtcbiAgICAgICAgaWYgKHBlcmZvcm1hbmNlLm5vdygpIC0gc3RhcnRUaW1lID4gU1RBVFVTX0RFTEFZKSB7XG4gICAgICAgICAgdGhpcy5tZXNzYWdlID0gdGhpcy5pMThuKCdtc2dMb2FkaW5nRGVwZW5kZW5jeScsIFtmaW5pc2hlZCwgbGVuZ3RoXSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICAvKiogQHJldHVybnMge3N0cmluZ3x1bmRlZmluZWR9IFVSTCBpbiBjYXNlIG9mIGVycm9yIG9yIGB1bmRlZmluZWRgIG9uIHN1Y2Nlc3MgKi9cbiAgICAgIGNvbnN0IGRvd25sb2FkID0gYXN5bmMgKHVybCwgdGFyZ2V0LCBpc0Jsb2IpID0+IHtcbiAgICAgICAgY29uc3QgZnVsbFVybCA9IGdldEZ1bGxVcmwodXJsLCB0aGlzLmluZm8udXJsKTtcbiAgICAgICAgY29uc3QgZGVwc1VybCA9IGAkeytpc0Jsb2J9JHt1cmx9YDsgLy8gdGhlIHNhbWUgVVJMIG1heSBiZSBsaXN0ZWQgaW4gYm90aCBjYXRlZ29yaWVzXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgZmlsZSA9IGF3YWl0IHRoaXMuZ2V0RmlsZShmdWxsVXJsLCB7IGlzQmxvYiwgdXNlQ2FjaGU6IHRydWUgfSk7XG4gICAgICAgICAgdGFyZ2V0W2Z1bGxVcmxdID0gZmlsZTtcbiAgICAgICAgICB0aGlzLmRlcHNbZGVwc1VybF0gPSBmaWxlO1xuICAgICAgICAgIGZpbmlzaGVkICs9IDE7XG4gICAgICAgICAgdXBkYXRlU3RhdHVzKCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICB0aGlzLmRlcHNbZGVwc1VybF0gPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gdXJsO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY29uc3QgZGVsYXllZFN0YXR1cyA9IHNldFRpbWVvdXQodXBkYXRlU3RhdHVzLCBTVEFUVVNfREVMQVkpO1xuICAgICAgY29uc3QgcHJvbWlzZXMgPSBbXG4gICAgICAgIC4uLnJlcXVpcmUubWFwKHVybCA9PiBkb3dubG9hZCh1cmwsIHRoaXMucmVxdWlyZSwgZmFsc2UpKSxcbiAgICAgICAgLi4ucmVzb3VyY2UubWFwKHVybCA9PiBkb3dubG9hZCh1cmwsIHRoaXMucmVzb3VyY2VzLCB0cnVlKSksXG4gICAgICBdO1xuICAgICAgY29uc3QgZXJyb3IgPSAoYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpKTo6dHJ1ZUpvaW4oJ1xcbicpO1xuICAgICAgY2xlYXJUaW1lb3V0KGRlbGF5ZWRTdGF0dXMpO1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IHRoaXMuaTE4bignbXNnRXJyb3JMb2FkaW5nRGVwZW5kZW5jeScpO1xuICAgICAgICB0aGlzLmVycm9yID0gZXJyb3I7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmVycm9yID0gbnVsbDtcbiAgICAgICAgdGhpcy5pbnN0YWxsYWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG51bGw7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0sXG4gICAgY2xvc2UoKSB7XG4gICAgICBzZW5kQ21kRGlyZWN0bHkoJ1RhYkNsb3NlJyk7XG4gICAgfSxcbiAgICBhc3luYyBnZXRGaWxlKHVybCwgeyBpc0Jsb2IsIHVzZUNhY2hlIH0gPSB7fSkge1xuICAgICAgY29uc3QgY2FjaGVLZXkgPSBpc0Jsb2IgPyBgYmxvYiske3VybH1gIDogYHRleHQrJHt1cmx9YDtcbiAgICAgIGlmICh1c2VDYWNoZSAmJiBjYWNoZS5oYXMoY2FjaGVLZXkpKSB7XG4gICAgICAgIHJldHVybiBjYWNoZS5nZXQoY2FjaGVLZXkpO1xuICAgICAgfVxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCByZXF1ZXN0KHVybCwge1xuICAgICAgICBba1Jlc3BvbnNlVHlwZV06IGlzQmxvYiA/ICdibG9iJyA6IG51bGwsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGRhdGEgPSBpc0Jsb2JcbiAgICAgICAgPyBhd2FpdCBtYWtlUmF3KHJlc3BvbnNlKVxuICAgICAgICA6IHJlc3BvbnNlLmRhdGE7XG4gICAgICBpZiAodXNlQ2FjaGUpIGNhY2hlLnB1dChjYWNoZUtleSwgZGF0YSk7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9LFxuICAgIGFzeW5jIGdldFNjcmlwdCh1cmwpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBjYWNoZWRDb2RlUHJvbWlzZSAmJiBhd2FpdCBjYWNoZWRDb2RlUHJvbWlzZSB8fCBhd2FpdCB0aGlzLmdldEZpbGUodXJsKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gdGhpcy5pMThuKCdtc2dFcnJvckxvYWRpbmdEYXRhJyk7XG4gICAgICAgIHRocm93IHVybDtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGNhY2hlZENvZGVQcm9taXNlID0gbnVsbDtcbiAgICAgIH1cbiAgICB9LFxuICAgIGFzeW5jIGluc3RhbGxTY3JpcHQoKSB7XG4gICAgICB0aGlzLmluc3RhbGxhYmxlID0gZmFsc2U7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB7IHVwZGF0ZSB9ID0gYXdhaXQgc2VuZENtZERpcmVjdGx5KCdQYXJzZVNjcmlwdCcsIHtcbiAgICAgICAgICBjb2RlOiB0aGlzLmNvZGUsXG4gICAgICAgICAgdXJsOiB0aGlzLmluZm8udXJsLFxuICAgICAgICAgIGZyb206IHRoaXMuaW5mby5mcm9tLFxuICAgICAgICAgIHJlcXVpcmU6IHRoaXMucmVxdWlyZSxcbiAgICAgICAgICBjYWNoZTogdGhpcy5yZXNvdXJjZXMsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCB0aW1lID0gbmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoWydmciddKTtcbiAgICAgICAgY29uc3QgdGltZTAgPSB0aGlzLmNvbmZpcm1lZFRpbWUgfHwgKHRoaXMuY29uZmlybWVkVGltZSA9IHRpbWUpO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBgJHt1cGRhdGUubWVzc2FnZX0gJHt0aW1lMH0ke3RpbWUwID09PSB0aW1lID8gJycgOiBgIC0tPiAke3RpbWV9YH1gO1xuICAgICAgICB0aGlzLmluc3RhbGxlZCA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLmlzTG9jYWwgJiYgdGhpcy4kcmVmcy50cmFja0xvY2FsRmlsZS52YWx1ZSkge1xuICAgICAgICAgIHRoaXMudHJhY2tMb2NhbEZpbGUoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLiRyZWZzLmNsb3NlQWZ0ZXJJbnN0YWxsLnZhbHVlKSB7XG4gICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gYCR7ZXJyfWA7XG4gICAgICAgIHRoaXMuaW5zdGFsbGFibGUgPSB0cnVlO1xuICAgICAgfVxuICAgIH0sXG4gICAgYXN5bmMgdHJhY2tMb2NhbEZpbGUoKSB7XG4gICAgICBpZiAodGhpcy50cmFja2luZyB8fCAhdGhpcy5pc0xvY2FsIHx8ICF0aGlzLmluc3RhbGxlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjYWNoZWRDb2RlUHJvbWlzZSA9IG51bGw7IC8vIGFsd2F5cyByZS1yZWFkIGJlY2F1c2UgdGhlIGZpbGUgbWF5IGhhdmUgY2hhbmdlZCBzaW5jZSB0aGVuXG4gICAgICB0aGlzLnRyYWNraW5nID0gdHJ1ZTtcbiAgICAgIHdoaWxlICh0aGlzLiRyZWZzLnRyYWNrTG9jYWxGaWxlLnZhbHVlICYmIHRoaXMudHJhY2tpbmcgIT09ICdzdG9wJykge1xuICAgICAgICBhd2FpdCBtYWtlUGF1c2UoNTAwKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLmxvYWREYXRhKHRydWUpO1xuICAgICAgICAgIGF3YWl0IHRoaXMucGFyc2VNZXRhKCk7XG4gICAgICAgICAgYXdhaXQgdGhpcy5sb2FkRGVwcygpO1xuICAgICAgICAgIGF3YWl0IHRoaXMuaW5zdGFsbFNjcmlwdCgpO1xuICAgICAgICAgIHRoaXMuc2FtZUNvZGUgPSBmYWxzZTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyAvKiBOT1AgKi8gfVxuICAgICAgfVxuICAgICAgdGhpcy50cmFja2luZyA9IGZhbHNlO1xuICAgIH0sXG4gICAgYXN5bmMgY2hlY2tTYW1lQ29kZSgpIHtcbiAgICAgIGNvbnN0IHsgbmFtZSwgbmFtZXNwYWNlIH0gPSB0aGlzLnNjcmlwdC5tZXRhIHx8IHt9O1xuICAgICAgY29uc3Qgb2xkID0gYXdhaXQgc2VuZENtZERpcmVjdGx5KCdHZXRTY3JpcHQnLCB7IG1ldGE6IHsgbmFtZSwgbmFtZXNwYWNlIH0gfSk7XG4gICAgICB0aGlzLnJlaW5zdGFsbCA9ICEhb2xkO1xuICAgICAgdGhpcy5zYW1lQ29kZSA9IG9sZCAmJiB0aGlzLmNvZGUgPT09IGF3YWl0IHNlbmRDbWREaXJlY3RseSgnR2V0U2NyaXB0Q29kZScsIG9sZC5wcm9wcy5pZCk7XG4gICAgfSxcbiAgICBjcmVhdGVGaWxlUG9ydCgpIHtcbiAgICAgIGZpbGVQb3J0ID0gYnJvd3Nlci50YWJzLmNvbm5lY3QodGhpcy5pbmZvLnRhYklkLCB7IG5hbWU6ICdGZXRjaFNlbGYnIH0pO1xuICAgICAgZmlsZVBvcnQub25NZXNzYWdlLmFkZExpc3RlbmVyKGNvZGUgPT4geyBmaWxlUG9ydFJlc29sdmUoY29kZSk7IH0pO1xuICAgICAgZmlsZVBvcnQub25EaXNjb25uZWN0LmFkZExpc3RlbmVyKCgpID0+IHsgdGhpcy50cmFja2luZyA9ICdzdG9wJzsgfSk7XG4gICAgfSxcbiAgICBwaW5nRmlsZVBvcnQocmVzb2x2ZSkge1xuICAgICAgaWYgKCFmaWxlUG9ydCkgdGhpcy5jcmVhdGVGaWxlUG9ydCgpO1xuICAgICAgZmlsZVBvcnRSZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgIGZpbGVQb3J0LnBvc3RNZXNzYWdlKG51bGwpO1xuICAgIH0sXG4gIH0sXG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cbiRpbWdTaXplOiA0OHB4O1xuJGltZ0dhcFI6IDE0cHg7XG4kaW5mb0ljb25TaXplOiAxOHB4O1xuLy8gVE9ETzogZml4IFBvc3RDU1MgY2FsYygpIHdoaWNoIGRvZXNuJ3Qgd29yayBoZXJlXG4kdmVydExheW91dFRocmVzaG9sZDogMTgwMXB4O1xuJHZlcnRMYXlvdXRUaHJlc2hvbGRNaW51czE6IDE4MDBweDtcblxuLnBhZ2UtY29uZmlybSB7XG4gIGgxIHtcbiAgICBsaW5lLWhlaWdodDogMS4zO1xuICAgIG1hcmdpbjogLjI1cmVtIDA7XG4gIH1cbiAgYTpub3QoOmhvdmVyKSB7XG4gICAgY29sb3I6IHVuc2V0O1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgfVxuICBwIHtcbiAgICBtYXJnaW4tdG9wOiAxcmVtO1xuICB9XG4gIC5zZWxmLXN0YXJ0IHtcbiAgICBhbGlnbi1zZWxmOiBmbGV4LXN0YXJ0O1xuICB9XG4gIC5pbWFnZSB7XG4gICAgZmxleDogMCAwICRpbWdTaXplO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgaGVpZ2h0OiAkaW1nU2l6ZTsgLy8gcmVzZXJ2ZSB0aGUgaGVpZ2h0IHNvIGl0IGRvZXNuJ3Qgc2hpZnQgd2hlbiB0aGUgaWNvbiBsb2Fkc1xuICAgIHBhZGRpbmc6IDAgJGltZ0dhcFIgMCAuMjVyZW07XG4gICAgYm94LXNpemluZzogY29udGVudC1ib3g7XG4gICAgaW1nIHtcbiAgICAgIG1heC13aWR0aDogMTAwJTtcbiAgICAgIG1heC1oZWlnaHQ6IDEwMCU7XG4gICAgfVxuICB9XG4gIC5pbmZvIHtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIC5kZXNjciB7XG4gICAgICBtYXgtaGVpZ2h0OiA0cmVtO1xuICAgICAgb3ZlcmZsb3cteTogYXV0bztcbiAgICB9XG4gICAgLmFicy1jZW50ZXIge1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgbWFyZ2luLWxlZnQ6IGNhbGMoLTEgKiAkaW1nU2l6ZSAvIDIgLSAkaW5mb0ljb25TaXplIC8gMiAtICRpbWdHYXBSKTtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICB9XG4gIH1cbiAgLmljb24ge1xuICAgIHdpZHRoOiAkaW5mb0ljb25TaXplO1xuICAgIGhlaWdodDogJGluZm9JY29uU2l6ZTtcbiAgfVxuICAubGlzdHMge1xuICAgIG1hcmdpbi10b3A6IDFyZW07XG4gICAgZGwge1xuICAgICAgbWFyZ2luOiAwIDFyZW0gMXJlbSAwO1xuICAgICAgJltkYXRhLXR5cGU9XCJhbnRpZmVhdHVyZVwiXSBkZCB7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCAwLCAwLCAuNSk7XG4gICAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAwLCAwLCAuMDUpO1xuICAgICAgICBwYWRkaW5nOiAycHggNnB4O1xuICAgICAgICBtYXgtd2lkdGg6IDI1ZW07XG4gICAgICB9XG4gICAgICAmW2RhdGEtdHlwZT1cIlwiXSB7XG4gICAgICAgIGNvbG9yOiByZWQ7XG4gICAgICB9XG4gICAgfVxuICAgIGR0IHtcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIH1cbiAgICBkZCB7XG4gICAgICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XG4gICAgICBtaW4td2lkdGg6IDVyZW07XG4gICAgICBtYXgtaGVpZ2h0OiAxMHZoO1xuICAgICAgbWluLWhlaWdodDogMS41cmVtO1xuICAgICAgb3ZlcmZsb3cteTogYXV0bztcbiAgICAgIG92ZXJmbG93LXdyYXA6IGFueXdoZXJlO1xuICAgIH1cbiAgfVxuICBbZGF0YS1jb2xsYXBzZWQ9XCJ0cnVlXCJdIHtcbiAgICBkZCB7XG4gICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cbiAgICBAbWVkaWEgKG1heC13aWR0aDogJHZlcnRMYXlvdXRUaHJlc2hvbGRNaW51czEpIHtcbiAgICAgIGRsOmZvY3VzIGRkIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBtYXgtaGVpZ2h0OiA1MHZoO1xuICAgICAgICB6LWluZGV4OiAxMDA7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLWZpbGwtMC01KTtcbiAgICAgICAgYm94LXNoYWRvdzogMXB4IDNweCA5cHggcmdiYSgxMjgsIDEyOCwgMTI4LCAuNSk7XG4gICAgICAgIHBhZGRpbmc6IC41cmVtO1xuICAgICAgfVxuICAgIH1cbiAgICBkdCB7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgfVxuICAgIC50b2dnbGUge1xuICAgICAgb3BhY2l0eTogLjM7XG4gICAgfVxuICB9XG4gIFtkYXRhLWRpc2FibGVkPVwidHJ1ZVwiXSB7XG4gICAgb3BhY2l0eTogLjRcbiAgfVxuICAuYWN0aW9ucyB7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBsYWJlbCB7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIH1cbiAgICAuc3RhdHVzIHtcbiAgICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgZGFya29yYW5nZTtcbiAgICAgIHBhZGRpbmc6IC41ZW07XG4gICAgICBjb2xvcjogI2QzM2EwMDtcbiAgICAgIGFuaW1hdGlvbjogZmFkZS1pbiAuNXMgMSBib3RoO1xuICAgIH1cbiAgfVxuICAuaW5jb2duaXRvIHtcbiAgICBwYWRkaW5nOiAuMjVlbSAwO1xuICAgIGNvbG9yOiByZWQ7XG4gIH1cbiAgI2NvbmZpcm0ge1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIGJhY2tncm91bmQ6ICNkNGUyZDQ7XG4gICAgYm9yZGVyLWNvbG9yOiAjNzVhNzc1O1xuICAgIGNvbG9yOiBkYXJrZ3JlZW47XG4gICAgJjpob3ZlciB7XG4gICAgICBib3JkZXItY29sb3I6ICM0ODgxNDg7XG4gICAgfVxuICAgICY6OmFmdGVyIHtcbiAgICAgIGNvbnRlbnQ6IFwiIChcIiBhdHRyKGRhdGEtaG90a2V5KSBcIilcIjtcbiAgICAgIG9wYWNpdHk6IC43NTtcbiAgICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgfVxuICB9XG4gICYucmVpbnN0YWxsICNjb25maXJtIHtcbiAgICBiYWNrZ3JvdW5kOiAjZDFlMGVhO1xuICAgIGJvcmRlci1jb2xvcjogIzY2OTljZTtcbiAgICBjb2xvcjogIzAwNGZjNTtcbiAgICAmOmhvdmVyIHtcbiAgICAgIGJvcmRlci1jb2xvcjogIzM1Njk5ZjtcbiAgICB9XG4gIH1cbiAgQG1lZGlhIChwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyaykge1xuICAgIC5pbmNvZ25pdG8ge1xuICAgICAgY29sb3I6IG9yYW5nZTtcbiAgICB9XG4gICAgI2NvbmZpcm0ge1xuICAgICAgYmFja2dyb3VuZDogIzNhNWQzYTtcbiAgICAgIGJvcmRlci1jb2xvcjogIzU5ODA1OTtcbiAgICAgIGNvbG9yOiAjOWNkODljO1xuICAgICAgJjpob3ZlciB7XG4gICAgICAgIGJvcmRlci1jb2xvcjogIzgwYTk4MDtcbiAgICAgIH1cbiAgICB9XG4gICAgJi5yZWluc3RhbGwgI2NvbmZpcm0ge1xuICAgICAgYmFja2dyb3VuZDogIzIyNGE3MztcbiAgICAgIGJvcmRlci1jb2xvcjogIzNkNjk5NjtcbiAgICAgIGNvbG9yOiAjOWZjZGZkO1xuICAgICAgJjpob3ZlciB7XG4gICAgICAgIGJvcmRlci1jb2xvcjogIzYwOGNiODtcbiAgICAgIH1cbiAgICB9XG4gICAgLmFjdGlvbnMge1xuICAgICAgLnN0YXR1cyB7XG4gICAgICAgIGNvbG9yOiBkYXJrb3JhbmdlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICAuZWRpdC1leHRlcm5hbHMgLnNlbGVjdCB7XG4gICAgcmVzaXplOiB2ZXJ0aWNhbDtcbiAgICAmW3N0eWxlXSB7XG4gICAgICBtYXgtaGVpZ2h0OiA4MCU7XG4gICAgfVxuICB9XG4gIEBtZWRpYSAobWF4LXdpZHRoOiAxNTk5cHgpIHtcbiAgICA+OmZpcnN0LWNoaWxkIHtcbiAgICAgIG1pbi1oZWlnaHQ6IDVlbTtcbiAgICAgIG1heC1oZWlnaHQ6IDgwdmg7XG4gICAgICB3aWR0aDogYXV0byAhaW1wb3J0YW50OyAvLyByZXNldHRpbmcgdGhlIGlubGluZSBzdHlsZSBhdHRyaWJ1dGUgaWYgdGhlIHVzZXIgcmVzaXplZCBpdFxuICAgICAgcmVzaXplOiB2ZXJ0aWNhbDtcbiAgICAgIG92ZXJmbG93LXk6IGF1dG87XG4gICAgfVxuICB9XG4gIEBtZWRpYSAobWluLXdpZHRoOiAkdmVydExheW91dFRocmVzaG9sZCkge1xuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgPjpmaXJzdC1jaGlsZCB7XG4gICAgICBtaW4td2lkdGg6IDMwZW07XG4gICAgICBtYXgtd2lkdGg6IDgwJTtcbiAgICAgIHdpZHRoOiA0MCU7XG4gICAgICBoZWlnaHQ6IGF1dG8gIWltcG9ydGFudDsgLy8gcmVzZXR0aW5nIHRoZSBpbmxpbmUgc3R5bGUgYXR0cmlidXRlIGlmIHRoZSB1c2VyIHJlc2l6ZWQgaXRcbiAgICAgIHJlc2l6ZTogaG9yaXpvbnRhbDtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgfVxuICAgIC5pbmZvIC5kZXNjciB7XG4gICAgICBtYXgtaGVpZ2h0OiAyMHZoO1xuICAgIH1cbiAgICAubGlzdHMge1xuICAgICAgb3ZlcmZsb3cteTogYXV0bztcbiAgICAgIG1heC1oZWlnaHQ6IDc1dmg7XG4gICAgfVxuICAgIC5saXN0cyBkZCB7XG4gICAgICBtYXgtaGVpZ2h0OiAzMHZoO1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgfVxuICAgIC5lZGl0LWV4dGVybmFscyB7XG4gICAgICBib3JkZXItdG9wOiBub25lO1xuICAgICAgYm9yZGVyLWxlZnQ6IHZhcigtLWJvcmRlcik7XG4gICAgfVxuICB9XG59XG4uY29uZmlybS1vcHRpb25zIHtcbiAgbGFiZWwge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICB9XG4gIC52bC1kcm9wZG93bi1tZW51IHtcbiAgICB3aWR0aDogMTNyZW07XG4gIH1cbn1cbi52bC10b29sdGlwLWJvdHRvbSB7XG4gID4gaSB7XG4gICAgbWFyZ2luLWxlZnQ6IDEwcHg7XG4gIH1cbiAgJi52bC10b29sdGlwLWFsaWduLWxlZnQge1xuICAgIG1hcmdpbi1sZWZ0OiAtMTNweDtcbiAgfVxufVxuQGtleWZyYW1lcyBmYWRlLWluIHtcbiAgZnJvbSB7XG4gICAgb3BhY2l0eTogMDtcbiAgfVxuICB0byB7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxufVxuPC9zdHlsZT5cbiIsImltcG9ydCAnQC9jb21tb24vYnJvd3Nlcic7XG5pbXBvcnQgeyBpMThuIH0gZnJvbSAnQC9jb21tb24nO1xuaW1wb3J0ICdAL2NvbW1vbi9oYW5kbGVycyc7XG5pbXBvcnQgb3B0aW9ucyBmcm9tICdAL2NvbW1vbi9vcHRpb25zJztcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJ0AvY29tbW9uL3VpJztcbmltcG9ydCAnQC9jb21tb24vdWkvZmF2aWNvbic7XG5pbXBvcnQgJ0AvY29tbW9uL3VpL3N0eWxlJztcbmltcG9ydCBBcHAgZnJvbSAnLi92aWV3cy9hcHAnO1xuaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5cbmRvY3VtZW50LnRpdGxlID0gYCR7aTE4bignbGFiZWxJbnN0YWxsJyl9IC0gJHtpMThuKCdleHROYW1lJyl9YDtcblxub3B0aW9ucy5yZWFkeS50aGVuKCgpID0+IHtcbiAgcmVuZGVyKEFwcCk7XG59KTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9OT19TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvbm9Tb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfTk9fU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJcIiwgXCJcIl0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfTk9fU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL25vU291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX05PX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuLyogVE9ETzogZml4IFBvc3RDU1MgY2FsYygpIHdoaWNoIGRvZXNuJ3Qgd29yayBoZXJlKi9cXG4ucGFnZS1jb25maXJtIGgxIHtcXG4gICAgbGluZS1oZWlnaHQ6IDEuMztcXG4gICAgbWFyZ2luOiAuMjVyZW0gMDtcXG59XFxuLnBhZ2UtY29uZmlybSBhOm5vdCg6aG92ZXIpIHtcXG4gICAgY29sb3I6IHVuc2V0O1xcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxufVxcbi5wYWdlLWNvbmZpcm0gcCB7XFxuICAgIG1hcmdpbi10b3A6IDFyZW07XFxufVxcbi5wYWdlLWNvbmZpcm0gLnNlbGYtc3RhcnQge1xcbiAgICBhbGlnbi1zZWxmOiBmbGV4LXN0YXJ0O1xcbn1cXG4ucGFnZS1jb25maXJtIC5pbWFnZSB7XFxuICAgIGZsZXg6IDAgMCA0OHB4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgaGVpZ2h0OiA0OHB4OyAvKiByZXNlcnZlIHRoZSBoZWlnaHQgc28gaXQgZG9lc24ndCBzaGlmdCB3aGVuIHRoZSBpY29uIGxvYWRzKi9cXG4gICAgcGFkZGluZzogMCAxNHB4IDAgLjI1cmVtO1xcbiAgICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcXG59XFxuLnBhZ2UtY29uZmlybSAuaW1hZ2UgaW1nIHtcXG4gICAgICBtYXgtd2lkdGg6IDEwMCU7XFxuICAgICAgbWF4LWhlaWdodDogMTAwJTtcXG59XFxuLnBhZ2UtY29uZmlybSAuaW5mbyB7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxufVxcbi5wYWdlLWNvbmZpcm0gLmluZm8gLmRlc2NyIHtcXG4gICAgICBtYXgtaGVpZ2h0OiA0cmVtO1xcbiAgICAgIG92ZXJmbG93LXk6IGF1dG87XFxufVxcbi5wYWdlLWNvbmZpcm0gLmluZm8gLmFicy1jZW50ZXIge1xcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICBtYXJnaW4tbGVmdDogLTQ3cHg7XFxuICAgICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG4ucGFnZS1jb25maXJtIC5pY29uIHtcXG4gICAgd2lkdGg6IDE4cHg7XFxuICAgIGhlaWdodDogMThweDtcXG59XFxuLnBhZ2UtY29uZmlybSAubGlzdHMge1xcbiAgICBtYXJnaW4tdG9wOiAxcmVtO1xcbn1cXG4ucGFnZS1jb25maXJtIC5saXN0cyBkbCB7XFxuICAgICAgbWFyZ2luOiAwIDFyZW0gMXJlbSAwO1xcbn1cXG4ucGFnZS1jb25maXJtIC5saXN0cyBkbFtkYXRhLXR5cGU9XFxcImFudGlmZWF0dXJlXFxcIl0gZGQge1xcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDAsIDAsIC41KTtcXG4gICAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAwLCAwLCAuMDUpO1xcbiAgICAgICAgcGFkZGluZzogMnB4IDZweDtcXG4gICAgICAgIG1heC13aWR0aDogMjVlbTtcXG59XFxuLnBhZ2UtY29uZmlybSAubGlzdHMgZGxbZGF0YS10eXBlPVxcXCJcXFwiXSB7XFxuICAgICAgICBjb2xvcjogcmVkO1xcbn1cXG4ucGFnZS1jb25maXJtIC5saXN0cyBkdCB7XFxuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcbi5wYWdlLWNvbmZpcm0gLmxpc3RzIGRkIHtcXG4gICAgICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XFxuICAgICAgbWluLXdpZHRoOiA1cmVtO1xcbiAgICAgIG1heC1oZWlnaHQ6IDEwdmg7XFxuICAgICAgbWluLWhlaWdodDogMS41cmVtO1xcbiAgICAgIG92ZXJmbG93LXk6IGF1dG87XFxuICAgICAgb3ZlcmZsb3ctd3JhcDogYW55d2hlcmU7XFxufVxcbi5wYWdlLWNvbmZpcm0gW2RhdGEtY29sbGFwc2VkPVxcXCJ0cnVlXFxcIl0gZGQge1xcbiAgICAgIGRpc3BsYXk6IG5vbmU7XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiAxODAwcHgpIHtcXG4ucGFnZS1jb25maXJtIFtkYXRhLWNvbGxhcHNlZD1cXFwidHJ1ZVxcXCJdIGRsOmZvY3VzIGRkIHtcXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgICBtYXgtaGVpZ2h0OiA1MHZoO1xcbiAgICAgICAgei1pbmRleDogMTAwO1xcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0tZmlsbC0wLTUpO1xcbiAgICAgICAgYm94LXNoYWRvdzogMXB4IDNweCA5cHggcmdiYSgxMjgsIDEyOCwgMTI4LCAuNSk7XFxuICAgICAgICBwYWRkaW5nOiAuNXJlbTtcXG59XFxufVxcbi5wYWdlLWNvbmZpcm0gW2RhdGEtY29sbGFwc2VkPVxcXCJ0cnVlXFxcIl0gZHQge1xcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLnBhZ2UtY29uZmlybSBbZGF0YS1jb2xsYXBzZWQ9XFxcInRydWVcXFwiXSAudG9nZ2xlIHtcXG4gICAgICBvcGFjaXR5OiAuMztcXG59XFxuLnBhZ2UtY29uZmlybSBbZGF0YS1kaXNhYmxlZD1cXFwidHJ1ZVxcXCJdIHtcXG4gICAgb3BhY2l0eTogLjRcXG59XFxuLnBhZ2UtY29uZmlybSAuYWN0aW9ucyB7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcbi5wYWdlLWNvbmZpcm0gLmFjdGlvbnMgbGFiZWwge1xcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcbi5wYWdlLWNvbmZpcm0gLmFjdGlvbnMgLnN0YXR1cyB7XFxuICAgICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCBkYXJrb3JhbmdlO1xcbiAgICAgIHBhZGRpbmc6IC41ZW07XFxuICAgICAgY29sb3I6ICNkMzNhMDA7XFxuICAgICAgYW5pbWF0aW9uOiBmYWRlLWluIC41cyAxIGJvdGg7XFxufVxcbi5wYWdlLWNvbmZpcm0gLmluY29nbml0byB7XFxuICAgIHBhZGRpbmc6IC4yNWVtIDA7XFxuICAgIGNvbG9yOiByZWQ7XFxufVxcbi5wYWdlLWNvbmZpcm0gI2NvbmZpcm0ge1xcbiAgICBmb250LXdlaWdodDogYm9sZDtcXG4gICAgYmFja2dyb3VuZDogI2Q0ZTJkNDtcXG4gICAgYm9yZGVyLWNvbG9yOiAjNzVhNzc1O1xcbiAgICBjb2xvcjogZGFya2dyZWVuO1xcbn1cXG4ucGFnZS1jb25maXJtICNjb25maXJtOmhvdmVyIHtcXG4gICAgICBib3JkZXItY29sb3I6ICM0ODgxNDg7XFxufVxcbi5wYWdlLWNvbmZpcm0gI2NvbmZpcm06OmFmdGVyIHtcXG4gICAgICBjb250ZW50OiBcXFwiIChcXFwiIGF0dHIoZGF0YS1ob3RrZXkpIFxcXCIpXFxcIjtcXG4gICAgICBvcGFjaXR5OiAuNzU7XFxuICAgICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG59XFxuLnBhZ2UtY29uZmlybS5yZWluc3RhbGwgI2NvbmZpcm0ge1xcbiAgICBiYWNrZ3JvdW5kOiAjZDFlMGVhO1xcbiAgICBib3JkZXItY29sb3I6ICM2Njk5Y2U7XFxuICAgIGNvbG9yOiAjMDA0ZmM1O1xcbn1cXG4ucGFnZS1jb25maXJtLnJlaW5zdGFsbCAjY29uZmlybTpob3ZlciB7XFxuICAgICAgYm9yZGVyLWNvbG9yOiAjMzU2OTlmO1xcbn1cXG5AbWVkaWEgKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKSB7XFxuLnBhZ2UtY29uZmlybSAuaW5jb2duaXRvIHtcXG4gICAgICBjb2xvcjogb3JhbmdlO1xcbn1cXG4ucGFnZS1jb25maXJtICNjb25maXJtIHtcXG4gICAgICBiYWNrZ3JvdW5kOiAjM2E1ZDNhO1xcbiAgICAgIGJvcmRlci1jb2xvcjogIzU5ODA1OTtcXG4gICAgICBjb2xvcjogIzljZDg5YztcXG59XFxuLnBhZ2UtY29uZmlybSAjY29uZmlybTpob3ZlciB7XFxuICAgICAgICBib3JkZXItY29sb3I6ICM4MGE5ODA7XFxufVxcbi5wYWdlLWNvbmZpcm0ucmVpbnN0YWxsICNjb25maXJtIHtcXG4gICAgICBiYWNrZ3JvdW5kOiAjMjI0YTczO1xcbiAgICAgIGJvcmRlci1jb2xvcjogIzNkNjk5NjtcXG4gICAgICBjb2xvcjogIzlmY2RmZDtcXG59XFxuLnBhZ2UtY29uZmlybS5yZWluc3RhbGwgI2NvbmZpcm06aG92ZXIge1xcbiAgICAgICAgYm9yZGVyLWNvbG9yOiAjNjA4Y2I4O1xcbn1cXG4ucGFnZS1jb25maXJtIC5hY3Rpb25zIC5zdGF0dXMge1xcbiAgICAgICAgY29sb3I6IGRhcmtvcmFuZ2U7XFxufVxcbn1cXG4ucGFnZS1jb25maXJtIC5lZGl0LWV4dGVybmFscyAuc2VsZWN0IHtcXG4gICAgcmVzaXplOiB2ZXJ0aWNhbDtcXG59XFxuLnBhZ2UtY29uZmlybSAuZWRpdC1leHRlcm5hbHMgLnNlbGVjdFtzdHlsZV0ge1xcbiAgICAgIG1heC1oZWlnaHQ6IDgwJTtcXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDE1OTlweCkge1xcbi5wYWdlLWNvbmZpcm0gPjpmaXJzdC1jaGlsZCB7XFxuICAgICAgbWluLWhlaWdodDogNWVtO1xcbiAgICAgIG1heC1oZWlnaHQ6IDgwdmg7XFxuICAgICAgd2lkdGg6IGF1dG8gIWltcG9ydGFudDsgLyogcmVzZXR0aW5nIHRoZSBpbmxpbmUgc3R5bGUgYXR0cmlidXRlIGlmIHRoZSB1c2VyIHJlc2l6ZWQgaXQqL1xcbiAgICAgIHJlc2l6ZTogdmVydGljYWw7XFxuICAgICAgb3ZlcmZsb3cteTogYXV0bztcXG59XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiAxODAxcHgpIHtcXG4ucGFnZS1jb25maXJtIHtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvd1xcbn1cXG4ucGFnZS1jb25maXJtID46Zmlyc3QtY2hpbGQge1xcbiAgICAgIG1pbi13aWR0aDogMzBlbTtcXG4gICAgICBtYXgtd2lkdGg6IDgwJTtcXG4gICAgICB3aWR0aDogNDAlO1xcbiAgICAgIGhlaWdodDogYXV0byAhaW1wb3J0YW50OyAvKiByZXNldHRpbmcgdGhlIGlubGluZSBzdHlsZSBhdHRyaWJ1dGUgaWYgdGhlIHVzZXIgcmVzaXplZCBpdCovXFxuICAgICAgcmVzaXplOiBob3Jpem9udGFsO1xcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxufVxcbi5wYWdlLWNvbmZpcm0gLmluZm8gLmRlc2NyIHtcXG4gICAgICBtYXgtaGVpZ2h0OiAyMHZoO1xcbn1cXG4ucGFnZS1jb25maXJtIC5saXN0cyB7XFxuICAgICAgb3ZlcmZsb3cteTogYXV0bztcXG4gICAgICBtYXgtaGVpZ2h0OiA3NXZoO1xcbn1cXG4ucGFnZS1jb25maXJtIC5saXN0cyBkZCB7XFxuICAgICAgbWF4LWhlaWdodDogMzB2aDtcXG4gICAgICBkaXNwbGF5OiBibG9jaztcXG59XFxuLnBhZ2UtY29uZmlybSAuZWRpdC1leHRlcm5hbHMge1xcbiAgICAgIGJvcmRlci10b3A6IG5vbmU7XFxuICAgICAgYm9yZGVyLWxlZnQ6IHZhcigtLWJvcmRlcik7XFxufVxcbn1cXG4uY29uZmlybS1vcHRpb25zIGxhYmVsIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxufVxcbi5jb25maXJtLW9wdGlvbnMgLnZsLWRyb3Bkb3duLW1lbnUge1xcbiAgICB3aWR0aDogMTNyZW07XFxufVxcbi52bC10b29sdGlwLWJvdHRvbSA+IGkge1xcbiAgICBtYXJnaW4tbGVmdDogMTBweDtcXG59XFxuLnZsLXRvb2x0aXAtYm90dG9tLnZsLXRvb2x0aXAtYWxpZ24tbGVmdCB7XFxuICAgIG1hcmdpbi1sZWZ0OiAtMTNweDtcXG59XFxuQGtleWZyYW1lcyBmYWRlLWluIHtcXG5mcm9tIHtcXG4gICAgb3BhY2l0eTogMDtcXG59XFxudG8ge1xcbiAgICBvcGFjaXR5OiAxO1xcbn1cXG59XFxuXCIsIFwiXCJdKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpKSB7XG4gIHJldHVybiBpWzFdO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9jbG9uZWRSdWxlU2V0LTYudXNlWzFdIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/Y2xvbmVkUnVsZVNldC02LnVzZVsyXSEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9jbG9uZWRSdWxlU2V0LTYudXNlWzFdIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/Y2xvbmVkUnVsZVNldC02LnVzZVsyXSEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P2Nsb25lZFJ1bGVTZXQtNi51c2VbMV0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvZGlzdC9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9jbG9uZWRSdWxlU2V0LTYudXNlWzJdIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2Rpc3QvaW5kZXguanM/P3J1bGVTZXRbMF0hLi9hcHAudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NzRmMGNiNjgmbGFuZz1jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/Y2xvbmVkUnVsZVNldC02LnVzZVsxXSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9kaXN0L3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvZGlzdC9janMuanM/P2Nsb25lZFJ1bGVTZXQtNi51c2VbMl0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvZGlzdC9pbmRleC5qcz8/cnVsZVNldFswXSEuL2FwcC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD03NGYwY2I2OCZsYW5nPWNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCJpbXBvcnQgeyByZW5kZXIgfSBmcm9tIFwiLi9hcHAudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTc0ZjBjYjY4XCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vYXBwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qc1wiXG5leHBvcnQgKiBmcm9tIFwiLi9hcHAudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzXCJcblxuaW1wb3J0IFwiLi9hcHAudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NzRmMGNiNjgmbGFuZz1jc3NcIlxuXG5pbXBvcnQgZXhwb3J0Q29tcG9uZW50IGZyb20gXCIvaG9tZS9ydW5uZXIvd29yay92aW9sZW50bW9ua2V5L3Zpb2xlbnRtb25rZXkvbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvZGlzdC9leHBvcnRIZWxwZXIuanNcIlxuY29uc3QgX19leHBvcnRzX18gPSAvKiNfX1BVUkVfXyovZXhwb3J0Q29tcG9uZW50KHNjcmlwdCwgW1sncmVuZGVyJyxyZW5kZXJdLFsnX19maWxlJyxcInNyYy9jb25maXJtL3ZpZXdzL2FwcC52dWVcIl1dKVxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgX19leHBvcnRzX18uX19obXJJZCA9IFwiNzRmMGNiNjhcIlxuICBjb25zdCBhcGkgPSBfX1ZVRV9ITVJfUlVOVElNRV9fXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFhcGkuY3JlYXRlUmVjb3JkKCc3NGYwY2I2OCcsIF9fZXhwb3J0c19fKSkge1xuICAgIGFwaS5yZWxvYWQoJzc0ZjBjYjY4JywgX19leHBvcnRzX18pXG4gIH1cbiAgXG4gIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9hcHAudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTc0ZjBjYjY4XCIsICgpID0+IHtcbiAgICBhcGkucmVyZW5kZXIoJzc0ZjBjYjY4JywgcmVuZGVyKVxuICB9KVxuXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgX19leHBvcnRzX18iLCJleHBvcnQgeyBkZWZhdWx0IH0gZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvZGlzdC9pbmRleC5qcz8/cnVsZVNldFswXSEuL2FwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anNcIjsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvZGlzdC9pbmRleC5qcz8/cnVsZVNldFswXSEuL2FwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anNcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2Rpc3QvdGVtcGxhdGVMb2FkZXIuanM/P3J1bGVTZXRbMV0ucnVsZXNbMl0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvZGlzdC9pbmRleC5qcz8/cnVsZVNldFswXSEuL2FwcC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NzRmMGNiNjhcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P2Nsb25lZFJ1bGVTZXQtNi51c2VbMV0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvZGlzdC9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9jbG9uZWRSdWxlU2V0LTYudXNlWzJdIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2Rpc3QvaW5kZXguanM/P3J1bGVTZXRbMF0hLi9hcHAudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NzRmMGNiNjgmbGFuZz1jc3NcIiIsInZhciBtYXAgPSB7XG5cdFwiLi9hcnJvdy5zdmdcIjogXCIuL3NyYy9yZXNvdXJjZXMvc3ZnL2Fycm93LnN2Z1wiLFxuXHRcIi4vYXV0aG9yLnN2Z1wiOiBcIi4vc3JjL3Jlc291cmNlcy9zdmcvYXV0aG9yLnN2Z1wiLFxuXHRcIi4vY29kZS5zdmdcIjogXCIuL3NyYy9yZXNvdXJjZXMvc3ZnL2NvZGUuc3ZnXCIsXG5cdFwiLi9jb2cuc3ZnXCI6IFwiLi9zcmMvcmVzb3VyY2VzL3N2Zy9jb2cuc3ZnXCIsXG5cdFwiLi9jb21tYW5kLnN2Z1wiOiBcIi4vc3JjL3Jlc291cmNlcy9zdmcvY29tbWFuZC5zdmdcIixcblx0XCIuL2ZpbHRlci5zdmdcIjogXCIuL3NyYy9yZXNvdXJjZXMvc3ZnL2ZpbHRlci5zdmdcIixcblx0XCIuL2hvbWUuc3ZnXCI6IFwiLi9zcmMvcmVzb3VyY2VzL3N2Zy9ob21lLnN2Z1wiLFxuXHRcIi4vaW5mby5zdmdcIjogXCIuL3NyYy9yZXNvdXJjZXMvc3ZnL2luZm8uc3ZnXCIsXG5cdFwiLi9tb3JlLnN2Z1wiOiBcIi4vc3JjL3Jlc291cmNlcy9zdmcvbW9yZS5zdmdcIixcblx0XCIuL3BsdXMuc3ZnXCI6IFwiLi9zcmMvcmVzb3VyY2VzL3N2Zy9wbHVzLnN2Z1wiLFxuXHRcIi4vcXVlc3Rpb24uc3ZnXCI6IFwiLi9zcmMvcmVzb3VyY2VzL3N2Zy9xdWVzdGlvbi5zdmdcIixcblx0XCIuL3JlZnJlc2guc3ZnXCI6IFwiLi9zcmMvcmVzb3VyY2VzL3N2Zy9yZWZyZXNoLnN2Z1wiLFxuXHRcIi4vc2VhcmNoLnN2Z1wiOiBcIi4vc3JjL3Jlc291cmNlcy9zdmcvc2VhcmNoLnN2Z1wiLFxuXHRcIi4vdG9nZ2xlLW9mZi5zdmdcIjogXCIuL3NyYy9yZXNvdXJjZXMvc3ZnL3RvZ2dsZS1vZmYuc3ZnXCIsXG5cdFwiLi90b2dnbGUtb24uc3ZnXCI6IFwiLi9zcmMvcmVzb3VyY2VzL3N2Zy90b2dnbGUtb24uc3ZnXCIsXG5cdFwiLi90cmFzaC5zdmdcIjogXCIuL3NyYy9yZXNvdXJjZXMvc3ZnL3RyYXNoLnN2Z1wiLFxuXHRcIi4vdW5kby5zdmdcIjogXCIuL3NyYy9yZXNvdXJjZXMvc3ZnL3VuZG8uc3ZnXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8obWFwLCByZXEpKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdHJldHVybiBtYXBbcmVxXTtcbn1cbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSBcIi4vc3JjL3Jlc291cmNlcy9zdmcgc3luYyBcXFxcLnN2ZyRcIjsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfZXh0ZW5kcygpIHtcbiAgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduID8gT2JqZWN0LmFzc2lnbi5iaW5kKCkgOiBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfTtcbiAgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJjb25maXJtL2luZGV4XCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua3Zpb2xlbnRtb25rZXlcIl0gPSBzZWxmW1wid2VicGFja0NodW5rdmlvbGVudG1vbmtleVwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJwdWJsaWMvbGliL2NvZGVtaXJyb3JcIixcImNvbW1vbi11aVwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9jb25maXJtL2luZGV4LmpzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOlsiVG9vbHRpcCIsIkljb24iLCJnZXRGdWxsVXJsIiwiZ2V0TG9jYWxlU3RyaW5nIiwiZ2V0U2NyaXB0SG9tZSIsImlzUmVtb3RlIiwibWFrZVBhdXNlIiwibWFrZVJhdyIsInJlcXVlc3QiLCJzZW5kQ21kRGlyZWN0bHkiLCJ0cnVlSm9pbiIsImtleWJvYXJkU2VydmljZSIsImluaXRDYWNoZSIsIlZtRXh0ZXJuYWxzIiwiU2V0dGluZ0NoZWNrIiwibG9hZFNjcmlwdEljb24iLCJkZWVwRXF1YWwiLCJvYmplY3RQaWNrIiwicm91dGUiLCJ1YSIsIktFRVBfSU5GT19ERUxBWSIsIlJFVFJZX0RFTEFZIiwiUkVUUllfQ09VTlQiLCJNQVhfVElUTEVfTkFNRV9MRU4iLCJDT05GSVJNX0hPVEtFWSIsInRlc3QiLCJuYXZpZ2F0b3IiLCJwbGF0Zm9ybSIsImNhY2hlIiwibGlmZXRpbWUiLCJmaWxlUG9ydCIsImZpbGVQb3J0UmVzb2x2ZSIsImZpbGVQb3J0TmVlZGVkIiwiYmFzaWNUaXRsZSIsImNhY2hlZENvZGVQcm9taXNlIiwiY29tcG9uZW50cyIsImRhdGEiLCJpbnN0YWxsYWJsZSIsImluc3RhbGxlZCIsIm1lc3NhZ2UiLCJjbU9wdGlvbnMiLCJsaW5lV3JhcHBpbmciLCJjb2RlIiwiY29tbWFuZHMiLCJjbG9zZSIsImNvbmZpcm1Ib3RrZXkiLCJpbmZvIiwiZGVwcyIsImRlc2NyIiwiZXJyb3IiLCJoZWFkaW5nIiwiaTE4biIsImxpc3RzIiwibGlzdHNTaG93biIsIm5hbWUiLCJyZWluc3RhbGwiLCJzYWZlSWNvbiIsInNhbWVDb2RlIiwic2NyaXB0IiwiY29tcHV0ZWQiLCJ0cmFja1Rvb2x0aXAiLCJmaXJlZm94IiwiaXNMb2NhbCIsInVybCIsImljb25zIiwiaG9tZXBhZ2VVUkwiLCJzdXBwb3J0VVJMIiwibWV0YSIsImZpbHRlciIsIkJvb2xlYW4iLCJtb3VudGVkIiwiaWQiLCJwYXRocyIsImtleSIsImZmIiwic3RhcnRzV2l0aCIsImd1YXJkIiwic2V0SW50ZXJ2YWwiLCJsb2FkRGF0YSIsInBhcnNlTWV0YSIsIlByb21pc2UiLCJhbGwiLCJjaGVja1NhbWVDb2RlIiwicmV0cmllcyIsImxvYWREZXBzIiwiZGlzcG9zZUxpc3QiLCJyZWdpc3RlciIsIiRyZWZzIiwiY29uZmlybSIsImNsaWNrIiwiZW5hYmxlIiwiYmVmb3JlVW5tb3VudCIsImNsZWFySW50ZXJ2YWwiLCJmb3JFYWNoIiwiZGlzcG9zZSIsIm1ldGhvZHMiLCJjaGFuZ2VkT25seSIsInBpbmdGaWxlUG9ydCIsImdldFNjcmlwdCIsInNldENvZGUiLCJsaW5lcyIsInNwbGl0IiwiY20iLCJleHRlcm5hbHMiLCJpIiwiaXNEaWZmIiwiZWFjaExpbmUiLCJ0ZXh0IiwibGVuZ3RoIiwiJG5leHRUaWNrIiwic2V0Q3Vyc29yIiwic2Nyb2xsSW50b1ZpZXciLCJkaXNwbGF5IiwibGFzdFdyYXBIZWlnaHQiLCJlcnJvcnMiLCJkb2N1bWVudCIsInRpdGxlIiwic2xpY2UiLCJ2ZXJzaW9uIiwibGlzdCIsIm1hcCIsInMiLCJyZXBsYWNlIiwic29ydCIsImEiLCJiIiwiam9pbiIsImN1c3RvbSIsInByb3BzIiwiYWxsRGVwcyIsIlNldCIsInJlcXVpcmUiLCJPYmplY3QiLCJ2YWx1ZXMiLCJyZXNvdXJjZXMiLCJyZXNvdXJjZSIsInRoZW4iLCJrZXlzIiwiZmluaXNoZWQiLCJTVEFUVVNfREVMQVkiLCJzdGFydFRpbWUiLCJwZXJmb3JtYW5jZSIsIm5vdyIsInVwZGF0ZVN0YXR1cyIsImRvd25sb2FkIiwidGFyZ2V0IiwiaXNCbG9iIiwiZnVsbFVybCIsImRlcHNVcmwiLCJmaWxlIiwiZ2V0RmlsZSIsInVzZUNhY2hlIiwiZSIsImRlbGF5ZWRTdGF0dXMiLCJzZXRUaW1lb3V0IiwicHJvbWlzZXMiLCJjbGVhclRpbWVvdXQiLCJjYWNoZUtleSIsImhhcyIsImdldCIsInJlc3BvbnNlIiwia1Jlc3BvbnNlVHlwZSIsInB1dCIsImluc3RhbGxTY3JpcHQiLCJ1cGRhdGUiLCJmcm9tIiwidGltZSIsIkRhdGUiLCJ0b0xvY2FsZVRpbWVTdHJpbmciLCJ0aW1lMCIsImNvbmZpcm1lZFRpbWUiLCJ0cmFja0xvY2FsRmlsZSIsInZhbHVlIiwiY2xvc2VBZnRlckluc3RhbGwiLCJlcnIiLCJ0cmFja2luZyIsIm5hbWVzcGFjZSIsIm9sZCIsImNyZWF0ZUZpbGVQb3J0IiwiYnJvd3NlciIsInRhYnMiLCJjb25uZWN0IiwidGFiSWQiLCJvbk1lc3NhZ2UiLCJhZGRMaXN0ZW5lciIsIm9uRGlzY29ubmVjdCIsInJlc29sdmUiLCJwb3N0TWVzc2FnZSIsImNsYXNzIiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsInNyYyIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfY3R4IiwiX2hvaXN0ZWRfMyIsIl90b0Rpc3BsYXlTdHJpbmciLCJzdHlsZSIsIl9jcmVhdGVWTm9kZSIsIl9jb21wb25lbnRfdG9vbHRpcCIsImNvbnRlbnQiLCJwbGFjZW1lbnQiLCJfY29tcG9uZW50X2ljb24iLCJkZWNvZGVVUklDb21wb25lbnQiLCJfRnJhZ21lbnQiLCJfcmVuZGVyTGlzdCIsImljb24iLCJocmVmIiwib25DbGljayIsIl9jcmVhdGVCbG9jayIsImFsaWduIiwiaGlkZGVuIiwidGFiaW5kZXgiLCJfaG9pc3RlZF8xOSIsInJlZiIsImRpc2FibGVkIiwiX2NvbXBvbmVudF9zZXR0aW5nX2NoZWNrIiwibGFiZWwiLCJvbkNoYW5nZSIsImluY29nbml0byIsIl9jb21wb25lbnRfdm1fZXh0ZXJuYWxzIiwiaW5zdGFsbCIsIm9wdGlvbnMiLCJyZW5kZXIiLCJBcHAiLCJyZWFkeSJdLCJzb3VyY2VSb290IjoiIn0=