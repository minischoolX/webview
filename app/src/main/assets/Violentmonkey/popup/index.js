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

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/popup/views/app.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/popup/views/app.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm-bundler.js");
/* harmony import */ var vueleton_lib_tooltip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vueleton/lib/tooltip */ "./node_modules/vueleton/lib/tooltip/index.js");
/* harmony import */ var _home_runner_work_violentmonkey_violentmonkey_src_common_options__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/common/options */ "./src/common/options.js");
/* harmony import */ var _home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./src/common */ "./src/common/index.js");
/* harmony import */ var _home_runner_work_violentmonkey_violentmonkey_src_common_object__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./src/common/object */ "./src/common/object.js");
/* harmony import */ var _home_runner_work_violentmonkey_violentmonkey_src_common_ui__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./src/common/ui */ "./src/common/ui/index.js");
/* harmony import */ var _home_runner_work_violentmonkey_violentmonkey_src_common_ui_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./src/common/ui/icon */ "./src/common/ui/icon.vue");
/* harmony import */ var _home_runner_work_violentmonkey_violentmonkey_src_common_keyboard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./src/common/keyboard */ "./src/common/keyboard.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils */ "./src/popup/utils/index.js");










let mousedownElement;
const NAME = `${extensionManifest.name} ${"2.14.2"}`;
const SCRIPT_CLS = '.script';
const RUN_AT_ORDER = ['start', 'body', 'end', 'idle'];
const optionsData = (0,vue__WEBPACK_IMPORTED_MODULE_1__.reactive)({
  isApplied: _home_runner_work_violentmonkey_violentmonkey_src_common_options__WEBPACK_IMPORTED_MODULE_3__["default"].get('isApplied'),
  filtersPopup: _home_runner_work_violentmonkey_violentmonkey_src_common_options__WEBPACK_IMPORTED_MODULE_3__["default"].get('filtersPopup') || {}
});
_home_runner_work_violentmonkey_violentmonkey_src_common_options__WEBPACK_IMPORTED_MODULE_3__["default"].hook(changes => {
  if ('isApplied' in changes) {
    optionsData.isApplied = changes.isApplied;
  }

  if ('filtersPopup' in changes) {
    optionsData.filtersPopup = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, optionsData.filtersPopup, changes.filtersPopup);
  }
});

function compareBy(...keys) {
  return (a, b) => {
    for (let _i = 0; _i < keys.length; _i++) {
      const key = keys[_i];
      const ka = key(a);
      const kb = key(b);
      if (ka < kb) return -1;
      if (ka > kb) return 1;
    }

    return 0;
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    Icon: _home_runner_work_violentmonkey_violentmonkey_src_common_ui_icon__WEBPACK_IMPORTED_MODULE_7__["default"],
    Tooltip: vueleton_lib_tooltip__WEBPACK_IMPORTED_MODULE_2__["default"]
  },

  data() {
    return {
      store: _utils__WEBPACK_IMPORTED_MODULE_9__.store,
      options: optionsData,
      activeMenu: 'scripts',
      activeExtras: null,
      focusBug: false,
      message: null,
      focusedItem: null,
      name: NAME
    };
  },

  computed: {
    activeLinks() {
      const script = this.activeExtras.data;
      const support = (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_4__.getScriptSupportUrl)(script);
      const home = !support && (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_4__.getScriptHome)(script); // not showing homepage if supportURL exists

      return [support && [support, (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_4__.i18n)('menuFeedback')], home && [home, (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_4__.i18n)('buttonHome')]].filter(Boolean);
    },

    injectionScopes() {
      const {
        sort,
        enabledFirst,
        groupRunAt,
        hideDisabled
      } = this.options.filtersPopup;
      const {
        injectable
      } = _utils__WEBPACK_IMPORTED_MODULE_9__.store;
      const groupDisabled = hideDisabled === 'group';
      return [injectable && ['scripts', (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_4__.i18n)('menuMatchedScripts'), groupDisabled || null], injectable && groupDisabled && ['disabled', (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_4__.i18n)('menuMatchedDisabledScripts'), false], ['frameScripts', (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_4__.i18n)('menuMatchedFrameScripts')]].filter(Boolean).map(([name, title, groupByEnabled]) => {
        let list = _utils__WEBPACK_IMPORTED_MODULE_9__.store[name] || _utils__WEBPACK_IMPORTED_MODULE_9__.store.scripts;

        if (groupByEnabled != null) {
          list = list.filter(script => !script.config.enabled === !groupByEnabled);
        }

        const numTotal = list.length;
        const numEnabled = groupByEnabled == null ? list.reduce((num, script) => num + script.config.enabled, 0) : numTotal;

        if (hideDisabled === 'hide' || hideDisabled === true) {
          list = list.filter(script => script.config.enabled);
        }

        list = list.map(script => {
          const scriptName = (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_4__.getScriptName)(script);
          return {
            id: script.props.id,
            name: scriptName,
            data: script,
            key: `${enabledFirst && +!script.config.enabled}${sort === 'alpha' ? scriptName.toLowerCase() : groupRunAt && RUN_AT_ORDER.indexOf((0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_4__.getScriptRunAt)(script))}${1e6 + script.props.position}`,
            excludes: null,
            upd: null
          };
        }).sort((a, b) => a.key < b.key ? -1 : a.key > b.key);
        return numTotal && {
          name,
          title,
          list,
          totals: numEnabled < numTotal ? `${numEnabled} / ${numTotal}` : `${numTotal}`
        };
      }).filter(Boolean);
    },

    failureReason() {
      return safeCall(_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_4__.trueJoin, [!_utils__WEBPACK_IMPORTED_MODULE_9__.store.injectable && 'noninjectable', _utils__WEBPACK_IMPORTED_MODULE_9__.store.blacklisted && 'blacklisted', // undefined means the data isn't ready yet
      optionsData.isApplied === false && 'scripts-disabled'], ' ');
    },

    failureReasonText() {
      return !_utils__WEBPACK_IMPORTED_MODULE_9__.store.injectable && (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_4__.i18n)('failureReasonNoninjectable') || _utils__WEBPACK_IMPORTED_MODULE_9__.store.blacklisted && (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_4__.i18n)('failureReasonBlacklisted') || optionsData.isApplied === false && (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_4__.i18n)('menuScriptDisabled') || '';
    },

    findUrls() {
      const query = encodeURIComponent(_utils__WEBPACK_IMPORTED_MODULE_9__.store.domain);
      return {
        [`${(0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_4__.i18n)('menuFindScripts')} (GF)`]: `https://greasyfork.org/scripts/by-site/${query}`,
        OUJS: `https://openuserjs.org/?q=${query}`
      };
    },

    tabIndex() {
      return this.activeExtras ? -1 : 0;
    }

  },
  methods: {
    canUpdate: _home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_4__.getScriptUpdateUrl,

    toggleMenu(name) {
      this.activeMenu = this.activeMenu === name ? null : name;
    },

    toggleExtras(item, evt) {
      this.activeExtras = this.activeExtras === item ? null : item;
      _home_runner_work_violentmonkey_violentmonkey_src_common_keyboard__WEBPACK_IMPORTED_MODULE_8__.keyboardService.setContext('activeExtras', this.activeExtras);

      if (this.activeExtras) {
        item.el = evt.target.closest(SCRIPT_CLS);
        this.$nextTick(() => {
          const {
            extrasMenu
          } = this.$refs;
          extrasMenu.style.top = `${Math.min(window.innerHeight - extrasMenu.getBoundingClientRect().height, (evt.currentTarget || evt.target).getBoundingClientRect().top + 16)}px`;
        });
      }
    },

    getSymbolCheck(bool) {
      return `toggle-${bool ? 'on' : 'off'}`;
    },

    onToggle() {
      _home_runner_work_violentmonkey_violentmonkey_src_common_options__WEBPACK_IMPORTED_MODULE_3__["default"].set('isApplied', optionsData.isApplied = !optionsData.isApplied);
      this.checkReload();
    },

    onManage() {
      (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_4__.sendCmdDirectly)('OpenEditor', '').then(close);
    },

    onOpenUrl(e) {
      const el = e.target.closest('a[href][target=_blank]');
      if (!el) return;
      e.preventDefault();
      (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_4__.sendCmdDirectly)('TabOpen', {
        url: el.href
      }).then(close);
    },

    onEditScript(item) {
      (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_4__.sendCmdDirectly)('OpenEditor', item.data.props.id).then(close);
    },

    onCommand(evt) {
      const {
        type,
        currentTarget: el
      } = evt;

      if (type === 'mousedown') {
        mousedownElement = el;
        evt.preventDefault();
      } else if (type === 'keydown' || mousedownElement === el) {
        (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_4__.sendTabCmd)(_utils__WEBPACK_IMPORTED_MODULE_9__.store.currentTab.id, 'Command', (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, el.CMD, {
          evt: (0,_home_runner_work_violentmonkey_violentmonkey_src_common_object__WEBPACK_IMPORTED_MODULE_5__.objectPick)(evt, ['type', 'button', 'shiftKey', 'altKey', 'ctrlKey', 'metaKey', 'key', 'keyCode', 'code'])
        })).then(close);
      }
    },

    onToggleScript(item) {
      const {
        data
      } = item;
      const enabled = !data.config.enabled;
      (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_4__.sendCmdDirectly)('UpdateScriptInfo', {
        id: data.props.id,
        config: {
          enabled
        }
      }).then(() => {
        data.config.enabled = enabled;
        this.checkReload();
      });
    },

    checkReload() {
      if (_home_runner_work_violentmonkey_violentmonkey_src_common_options__WEBPACK_IMPORTED_MODULE_3__["default"].get('autoReload')) {
        browser.tabs.reload(_utils__WEBPACK_IMPORTED_MODULE_9__.store.currentTab.id);
        _utils__WEBPACK_IMPORTED_MODULE_9__.store.idMap = {};
        _utils__WEBPACK_IMPORTED_MODULE_9__.store.scripts.length = 0;
        _utils__WEBPACK_IMPORTED_MODULE_9__.store.frameScripts.length = 0;
        _utils__WEBPACK_IMPORTED_MODULE_9__.mutex.init();
      }
    },

    async onCreateScript() {
      (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_4__.sendCmdDirectly)('OpenEditor').then(close);
    },

    async onInjectionFailureFix() {
      // TODO: promisify options.set, resolve on storage write, await it instead of makePause
      _home_runner_work_violentmonkey_violentmonkey_src_common_options__WEBPACK_IMPORTED_MODULE_3__["default"].set('defaultInjectInto', AUTO);
      await (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_4__.makePause)(100);
      await browser.tabs.reload();
      window.close();
    },

    onRemoveScript() {
      const {
        config,
        props: {
          id
        }
      } = this.activeExtras.data;
      const removed = +!config.removed;
      config.removed = removed;
      (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_4__.sendCmdDirectly)('MarkRemoved', {
        id,
        removed
      });
    },

    async onUpdateScript() {
      const item = this.activeExtras;
      const chk = (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_4__.i18n)('msgCheckingForUpdate');

      if (item.upd !== chk) {
        item.upd = chk;
        item.upd = (await (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_4__.sendCmdDirectly)('CheckUpdate', item.data.props.id)) ? (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_4__.i18n)('msgUpdated') : (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_4__.i18n)('msgNoUpdate');
      }
    },

    async onExclude() {
      const item = this.activeExtras;
      const {
        data
      } = item;
      const url = data.pageUrl;
      const {
        host,
        domain
      } = await (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_4__.sendCmdDirectly)('GetTabDomain', url);
      item.excludes = [`${url.split('#')[0]}*`, {
        host,
        group: `*.${domain}`
      }];
      await (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_4__.makePause)(); // $nextTick runs too early

      item.el.querySelector('input').focus(); // not using $refs as multiple items may show inputs
    },

    onExcludeClose(item) {
      item.excludes = null;
      this.focus(item);
    },

    async onExcludeSave(item, btn) {
      await (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_4__.sendCmdDirectly)('UpdateScriptInfo', {
        id: item.data.props.id,
        custom: {
          excludeMatch: [...(item.data.custom.excludeMatch || []), ...[btn || item.excludes[0].trim()].filter(Boolean)]
        }
      });
      this.onExcludeClose(item);
      this.checkReload();
    },

    navigate(dir) {
      var _items$index;

      const {
        activeElement
      } = document;
      const items = Array.from(this.$el.querySelectorAll('[tabindex="0"]')).map(el => ({
        el,
        rect: el.getBoundingClientRect()
      })).filter(({
        rect
      }) => rect.width && rect.height);
      items.sort(compareBy(item => item.rect.top, item => item.rect.left));
      let index = items.findIndex(({
        el
      }) => el === activeElement);

      const findItemIndex = (step, test) => {
        for (let i = index + step; i >= 0 && i < items.length; i += step) {
          if (test(items[index], items[i])) return i;
        }
      };

      if (index < 0) {
        index = 0;
      } else if (dir === 'u' || dir === 'd') {
        const step = dir === 'u' ? -1 : 1;
        index = findItemIndex(step, (a, b) => (a.rect.top - b.rect.top) * step < 0);

        if (dir === 'u') {
          while (index > 0 && items[index - 1].rect.top === items[index].rect.top) index -= 1;
        }
      } else {
        const step = dir === 'l' ? -1 : 1;
        index = findItemIndex(step, (a, b) => (a.rect.left - b.rect.left) * step < 0);
      }

      (_items$index = items[index]) == null ? void 0 : _items$index.el.focus();
    },

    focus(item) {
      var _item$el, _item$el$querySelecto;

      item == null ? void 0 : (_item$el = item.el) == null ? void 0 : (_item$el$querySelecto = _item$el.querySelector('.menu-area')) == null ? void 0 : _item$el$querySelecto.focus();
    },

    delegateMouseEnter(e) {
      const {
        target
      } = e;
      if (target.tabIndex >= 0) target.focus();
    },

    delegateMouseLeave(e) {
      const {
        target
      } = e;
      if (target === document.activeElement && !(0,_home_runner_work_violentmonkey_violentmonkey_src_common_keyboard__WEBPACK_IMPORTED_MODULE_8__.isInput)(target)) target.blur();
    },

    updateMessage() {
      var _document$activeEleme;

      this.message = ((_document$activeEleme = document.activeElement) == null ? void 0 : _document$activeEleme.dataset.message) || '';
    },

    showButtons(item) {
      var _this$activeExtras, _this$focusedItem;

      return ((_this$activeExtras = this.activeExtras) == null ? void 0 : _this$activeExtras.id) === item.id || ((_this$focusedItem = this.focusedItem) == null ? void 0 : _this$focusedItem.id) === item.id || this.focusBug;
    }

  },

  mounted() {
    (0,_home_runner_work_violentmonkey_violentmonkey_src_common_ui__WEBPACK_IMPORTED_MODULE_6__.focusMe)(this.$el);
    _home_runner_work_violentmonkey_violentmonkey_src_common_keyboard__WEBPACK_IMPORTED_MODULE_8__.keyboardService.enable(); // innerHeight may be bigger than 600px in a mobile browser which displays the popup as a fullscreen page

    this.$el.style.maxHeight = Math.min(Math.max(600, innerHeight), screen.availHeight - window.screenY - 8) + 'px';
    this.disposeList = [_home_runner_work_violentmonkey_violentmonkey_src_common_keyboard__WEBPACK_IMPORTED_MODULE_8__.keyboardService.register('escape', () => {
      var _document$activeEleme2;

      const item = this.activeExtras;

      if (item) {
        this.toggleExtras(null);
        this.focus(item);
      } else if ((_document$activeEleme2 = document.activeElement) != null && _document$activeEleme2.value) {
        document.activeElement.blur();
      } else {
        window.close();
      }
    }), ...(IS_FIREFOX ? [_home_runner_work_violentmonkey_violentmonkey_src_common_keyboard__WEBPACK_IMPORTED_MODULE_8__.keyboardService.register('tab', () => {
      (0,_home_runner_work_violentmonkey_violentmonkey_src_common_keyboard__WEBPACK_IMPORTED_MODULE_8__.handleTabNavigation)(1);
    }), _home_runner_work_violentmonkey_violentmonkey_src_common_keyboard__WEBPACK_IMPORTED_MODULE_8__.keyboardService.register('s-tab', () => {
      (0,_home_runner_work_violentmonkey_violentmonkey_src_common_keyboard__WEBPACK_IMPORTED_MODULE_8__.handleTabNavigation)(-1);
    })] : []), ...['up', 'down', 'left', 'right'].map(key => _home_runner_work_violentmonkey_violentmonkey_src_common_keyboard__WEBPACK_IMPORTED_MODULE_8__.keyboardService.register(key, this.navigate.bind(this, key[0]), {
      condition: '!inputFocus'
    })), _home_runner_work_violentmonkey_violentmonkey_src_common_keyboard__WEBPACK_IMPORTED_MODULE_8__.keyboardService.register('e', () => {
      this.onEditScript(this.focusedItem);
    }, {
      condition: '!inputFocus'
    })];
  },

  activated() {
    // issue #1520: Firefox + Wayland doesn't autofocus the popup so CSS hover doesn't work
    this.focusBug = !document.hasFocus();
  },

  beforeUnmount() {
    var _this$disposeList;

    _home_runner_work_violentmonkey_violentmonkey_src_common_keyboard__WEBPACK_IMPORTED_MODULE_8__.keyboardService.disable();
    (_this$disposeList = this.disposeList) == null ? void 0 : _this$disposeList.forEach(dispose => {
      dispose();
    });
  }

});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/popup/views/app.vue?vue&type=template&id=6f2db414":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/popup/views/app.vue?vue&type=template&id=6f2db414 ***!
  \**********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm-bundler.js");

const _hoisted_1 = ["data-failure-reason"];
const _hoisted_2 = {
  class: "flex menu-buttons"
};

const _hoisted_3 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
  src: "/public/images/icon128.png"
}, null, -1
/* HOISTED */
);

const _hoisted_4 = [_hoisted_3];
const _hoisted_5 = ["textContent"];
const _hoisted_6 = ["data-message", "tabIndex"];
const _hoisted_7 = ["data-message", "tabIndex"];
const _hoisted_8 = ["data-message", "tabIndex"];
const _hoisted_9 = {
  key: 0,
  class: "menu"
};
const _hoisted_10 = {
  class: "menu-item menu-area menu-find"
};
const _hoisted_11 = ["href", "data-message", "tabIndex"];
const _hoisted_12 = {
  key: 1,
  class: "failure-reason"
};
const _hoisted_13 = ["textContent"];
const _hoisted_14 = ["textContent"];
const _hoisted_15 = ["data-type"];
const _hoisted_16 = ["tabIndex", "onClick"];
const _hoisted_17 = ["textContent", "data-totals"];
const _hoisted_18 = ["tabIndex", "data-message", "onFocus", "onKeydown", "onClick"];
const _hoisted_19 = ["src"];
const _hoisted_20 = ["data-upd", "onClick", "onContextmenu", "onMousedown"];
const _hoisted_21 = ["textContent"];
const _hoisted_22 = {
  class: "submenu-buttons"
};
const _hoisted_23 = ["tabIndex", "onClick", "title"];
const _hoisted_24 = ["tabIndex", "onClick"];
const _hoisted_25 = {
  key: 0,
  class: "excludes-menu mb-1c mr-1c"
};
const _hoisted_26 = ["textContent", "title", "onClick"];
const _hoisted_27 = ["onUpdate:modelValue", "onKeypress", "onKeydown"];
const _hoisted_28 = ["textContent", "onClick"];
const _hoisted_29 = ["textContent", "onClick"];
const _hoisted_30 = {
  class: "mb-1"
};
const _hoisted_31 = ["textContent"];
const _hoisted_32 = {
  class: "submenu-commands"
};
const _hoisted_33 = ["tabIndex", ".CMD", "data-message"];
const _hoisted_34 = ["textContent"];
const _hoisted_35 = {
  key: 2,
  class: "failure-reason"
};
const _hoisted_36 = ["textContent"];
const _hoisted_37 = ["textContent"];
const _hoisted_38 = ["textContent"];
const _hoisted_39 = ["tabIndex", "textContent"];
const _hoisted_40 = {
  class: "message"
};
const _hoisted_41 = ["textContent"];
const _hoisted_42 = {
  key: 4,
  class: "extras-menu",
  ref: "extrasMenu"
};
const _hoisted_43 = ["href", "data-message", "textContent"];
const _hoisted_44 = ["textContent"];
const _hoisted_45 = ["textContent"];
const _hoisted_46 = ["textContent"];
function render(_ctx, _cache) {
  var _ctx$store$currentTab;

  const _component_icon = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("icon");

  const _component_tooltip = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("tooltip");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    class: "page-popup flex flex-col",
    onClick: _cache[11] || (_cache[11] = $event => _ctx.activeExtras && _ctx.toggleExtras(null)),
    onClickCapture: _cache[12] || (_cache[12] = (...args) => _ctx.onOpenUrl && _ctx.onOpenUrl(...args)),
    onContextmenu: _cache[13] || (_cache[13] = $event => _ctx.activeExtras && (_ctx.toggleExtras(null), $event.preventDefault())),
    onMouseenterCapture: _cache[14] || (_cache[14] = (...args) => _ctx.delegateMouseEnter && _ctx.delegateMouseEnter(...args)),
    onMouseleaveCapture: _cache[15] || (_cache[15] = (...args) => _ctx.delegateMouseLeave && _ctx.delegateMouseLeave(...args)),
    onFocusCapture: _cache[16] || (_cache[16] = (...args) => _ctx.updateMessage && _ctx.updateMessage(...args)),
    "data-failure-reason": _ctx.failureReason
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["logo", {
      disabled: !_ctx.options.isApplied
    }])
  }, _hoisted_4, 2
  /* CLASS */
  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["flex-1 ext-name", {
      disabled: !_ctx.options.isApplied
    }]),
    textContent: (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.name)
  }, null, 10
  /* CLASS, PROPS */
  , _hoisted_5), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["menu-area", {
      disabled: !_ctx.options.isApplied
    }]),
    "data-message": _ctx.options.isApplied ? _ctx.i18n('menuScriptEnabled') : _ctx.i18n('menuScriptDisabled'),
    tabIndex: _ctx.tabIndex,
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onToggle && _ctx.onToggle(...args))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_icon, {
    name: _ctx.getSymbolCheck(_ctx.options.isApplied)
  }, null, 8
  /* PROPS */
  , ["name"])], 10
  /* CLASS, PROPS */
  , _hoisted_6), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "menu-area",
    "data-message": _ctx.i18n('menuDashboard'),
    tabIndex: _ctx.tabIndex,
    onClick: _cache[1] || (_cache[1] = (...args) => _ctx.onManage && _ctx.onManage(...args))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_icon, {
    name: "cog"
  })], 8
  /* PROPS */
  , _hoisted_7), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "menu-area",
    "data-message": _ctx.i18n('menuNewScript'),
    tabIndex: _ctx.tabIndex,
    onClick: _cache[2] || (_cache[2] = (...args) => _ctx.onCreateScript && _ctx.onCreateScript(...args))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_icon, {
    name: "plus"
  })], 8
  /* PROPS */
  , _hoisted_8)]), _ctx.store.injectable ? (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)(((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.findUrls, (url, text, i) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      key: url
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      target: "_blank",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)({
        ellipsis: !i,
        'mr-1': !i,
        'ml-1': i
      }),
      href: url,
      "data-message": url.split('://')[1],
      tabIndex: _ctx.tabIndex
    }, [!i ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_icon, {
      key: 0,
      name: "search"
    })) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(text), 1
    /* TEXT */
    )], 10
    /* CLASS, PROPS */
    , _hoisted_11), !i ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      key: 0
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("/")], 64
    /* STABLE_FRAGMENT */
    )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 64
    /* STABLE_FRAGMENT */
    );
  }), 128
  /* KEYED_FRAGMENT */
  ))])], 512
  /* NEED_PATCH */
  )), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, _ctx.store.domain]]) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.failureReasonText ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_12, [_ctx.injectionScopes[0] && !_ctx.options.isApplied ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_tooltip, {
    key: 0,
    content: _ctx.i18n('labelAutoReloadCurrentTabDisabled'),
    class: "reload-hint",
    align: "start",
    placement: "bottom"
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_icon, {
      name: "info"
    })]),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["content"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    textContent: (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.failureReasonText)
  }, null, 8
  /* PROPS */
  , _hoisted_13), _ctx.store.blacklisted ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("code", {
    key: 1,
    textContent: (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.store.blacklisted),
    class: "ellipsis inline-block"
  }, null, 8
  /* PROPS */
  , _hoisted_14)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.injectionScopes, scope => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["menu menu-scripts flex flex-col", {
        expand: _ctx.activeMenu === scope.name,
        'block-scroll': _ctx.activeExtras
      }]),
      "data-type": scope.name,
      key: scope.name
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "menu-item menu-area menu-group",
      tabIndex: _ctx.tabIndex,
      onClick: $event => _ctx.toggleMenu(scope.name)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_icon, {
      name: "arrow",
      class: "icon-collapse"
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "flex-auto",
      textContent: (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(scope.title),
      "data-totals": scope.totals
    }, null, 8
    /* PROPS */
    , _hoisted_17)], 8
    /* PROPS */
    , _hoisted_16), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "submenu",
      ref_for: true,
      ref: "scriptList",
      focusme: ""
    }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(scope.list, item => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: item.id,
        class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([{
          disabled: !item.data.config.enabled,
          failed: item.data.failed,
          removed: item.data.config.removed,
          runs: item.data.runs,
          'extras-shown': _ctx.activeExtras === item,
          'excludes-shown': item.excludes
        }, "script"])
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        class: "menu-item menu-area",
        tabIndex: _ctx.tabIndex,
        "data-message": item.name,
        onFocus: $event => _ctx.focusedItem = item,
        onKeydown: [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.onEditScript(item), ["exact", "stop"]), ["enter"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.onToggleScript(item), ["exact", "stop"]), ["space"])],
        onClick: $event => _ctx.onToggleScript(item)
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
        class: "script-icon",
        src: item.data.safeIcon
      }, null, 8
      /* PROPS */
      , _hoisted_19), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_icon, {
        name: _ctx.getSymbolCheck(item.data.config.enabled)
      }, null, 8
      /* PROPS */
      , ["name"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        class: "script-name flex-auto ellipsis",
        "data-upd": item.upd,
        onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.onEditScript(item), ["ctrl", "exact", "stop"]),
        onContextmenu: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.onEditScript(item), ["exact", "stop", "prevent"]),
        onMousedown: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.onEditScript(item), ["middle", "exact", "stop"])
      }, [item.data.syntax ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("sup", {
        key: 0,
        class: "syntax",
        textContent: (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.i18n('msgSyntaxError'))
      }, null, 8
      /* PROPS */
      , _hoisted_21)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.name), 1
      /* TEXT */
      )], 40
      /* PROPS, HYDRATE_EVENTS */
      , _hoisted_20)], 40
      /* PROPS, HYDRATE_EVENTS */
      , _hoisted_18), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Using a standard tooltip that's shown after a delay to avoid nagging the user "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        class: "submenu-button",
        tabIndex: _ctx.tabIndex,
        onClick: $event => _ctx.onEditScript(item),
        title: _ctx.i18n('buttonEditClickHint')
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_icon, {
        name: "code"
      })], 8
      /* PROPS */
      , _hoisted_23), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        class: "submenu-button",
        tabIndex: _ctx.tabIndex,
        onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.toggleExtras(item, $event), ["stop"])
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_icon, {
        name: "more"
      })], 8
      /* PROPS */
      , _hoisted_24)], 512
      /* NEED_PATCH */
      ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, _ctx.showButtons(item)]]), item.excludes ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_25, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(item.excludes[1], (val, key) => {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
          key: key,
          textContent: (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(val),
          class: "ellipsis",
          title: `*://${val}/*`,
          onClick: $event => _ctx.onExcludeSave(item, `*://${val}/*`)
        }, null, 8
        /* PROPS */
        , _hoisted_26);
      }), 128
      /* KEYED_FRAGMENT */
      )), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
        "onUpdate:modelValue": $event => item.excludes[0] = $event,
        spellcheck: "false",
        onKeypress: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)($event => _ctx.onExcludeSave(item), ["enter"]),
        onKeydown: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.onExcludeClose(item), ["exact", "stop", "prevent"]), ["esc"])
      }, null, 40
      /* PROPS, HYDRATE_EVENTS */
      , _hoisted_27), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, item.excludes[0]]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Esc interception works in Chrome not in Firefox "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        textContent: (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.i18n('buttonOK')),
        onClick: $event => _ctx.onExcludeSave(item)
      }, null, 8
      /* PROPS */
      , _hoisted_28), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        textContent: (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.i18n('buttonCancel')),
        onClick: $event => _ctx.onExcludeClose(item)
      }, null, 8
      /* PROPS */
      , _hoisted_29), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" not using tooltip to preserve line breaks "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("details", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("summary", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_icon, {
        name: "info"
      })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.i18n('menuExcludeHint')) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.i18n('labelRelated')), 1
      /* TEXT */
      ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
        textContent: (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.i18n('labelExcludeMatch')),
        target: "_blank",
        href: "https://violentmonkey.github.io/api/matching/"
      }, null, 8
      /* PROPS */
      , _hoisted_31)])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.store.commands[item.data.props.id], (cap, i) => {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
          class: "menu-item menu-area",
          key: i,
          tabIndex: _ctx.tabIndex,
          ".CMD": {
            id: item.data.props.id,
            cap
          },
          "data-message": cap,
          onMousedown: _cache[3] || (_cache[3] = (...args) => _ctx.onCommand && _ctx.onCommand(...args)),
          onMouseup: _cache[4] || (_cache[4] = (...args) => _ctx.onCommand && _ctx.onCommand(...args)),
          onKeydown: [_cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((...args) => _ctx.onCommand && _ctx.onCommand(...args), ["enter"])), _cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((...args) => _ctx.onCommand && _ctx.onCommand(...args), ["space"]))]
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_icon, {
          name: "command"
        }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
          class: "flex-auto ellipsis",
          textContent: (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(cap)
        }, null, 8
        /* PROPS */
        , _hoisted_34)], 40
        /* PROPS, HYDRATE_EVENTS */
        , _hoisted_33);
      }), 128
      /* KEYED_FRAGMENT */
      ))])], 2
      /* CLASS */
      );
    }), 128
    /* KEYED_FRAGMENT */
    ))], 512
    /* NEED_PATCH */
    )], 10
    /* CLASS, PROPS */
    , _hoisted_15);
  }), 128
  /* KEYED_FRAGMENT */
  )), _ctx.store.injectionFailure ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_35, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    textContent: (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.i18n('menuInjectionFailed'))
  }, null, 8
  /* PROPS */
  , _hoisted_36), _ctx.store.injectionFailure.fixable ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("a", {
    key: 0,
    textContent: (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.i18n('menuInjectionFailedFix')),
    href: "#",
    onClick: _cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => _ctx.onInjectionFailureFix && _ctx.onInjectionFailureFix(...args), ["prevent"]))
  }, null, 8
  /* PROPS */
  , _hoisted_37)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (_ctx$store$currentTab = _ctx.store.currentTab) != null && _ctx$store$currentTab.incognito ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 3,
    class: "incognito",
    textContent: (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.i18n('msgIncognitoChanges'))
  }, null, 8
  /* PROPS */
  , _hoisted_38)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("footer", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "https://violentmonkey.github.io/",
    target: "_blank",
    tabIndex: _ctx.tabIndex,
    textContent: (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.i18n('visitWebsite'))
  }, null, 8
  /* PROPS */
  , _hoisted_39)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    textContent: (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.message)
  }, null, 8
  /* PROPS */
  , _hoisted_41)], 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, _ctx.message]]), _ctx.activeExtras ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_42, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.activeLinks, ([url, text]) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("a", {
      key: url,
      href: url,
      "data-message": url,
      tabindex: "0",
      textContent: (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(text),
      rel: "noopener noreferrer",
      target: "_blank"
    }, null, 8
    /* PROPS */
    , _hoisted_43);
  }), 128
  /* KEYED_FRAGMENT */
  )), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    textContent: (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.i18n('menuExclude')),
    tabindex: "0",
    onClick: _cache[8] || (_cache[8] = (...args) => _ctx.onExclude && _ctx.onExclude(...args))
  }, null, 8
  /* PROPS */
  , _hoisted_44), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    textContent: (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.activeExtras.data.config.removed ? _ctx.i18n('buttonRestore') : _ctx.i18n('buttonRemove')),
    tabindex: "0",
    onClick: _cache[9] || (_cache[9] = (...args) => _ctx.onRemoveScript && _ctx.onRemoveScript(...args))
  }, null, 8
  /* PROPS */
  , _hoisted_45), !_ctx.activeExtras.data.config.removed && _ctx.canUpdate(_ctx.activeExtras.data) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    textContent: (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.i18n('buttonUpdate')),
    tabindex: "0",
    onClick: _cache[10] || (_cache[10] = (...args) => _ctx.onUpdateScript && _ctx.onUpdateScript(...args))
  }, null, 8
  /* PROPS */
  , _hoisted_46)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 512
  /* NEED_PATCH */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 40
  /* PROPS, HYDRATE_EVENTS */
  , _hoisted_1);
}

/***/ }),

/***/ "./src/popup/index.js":
/*!****************************!*\
  !*** ./src/popup/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _home_runner_work_violentmonkey_violentmonkey_src_common_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/common/browser */ "./src/common/browser.js");
/* harmony import */ var _home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/common */ "./src/common/index.js");
/* harmony import */ var _home_runner_work_violentmonkey_violentmonkey_src_common_consts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/common/consts */ "./src/common/consts.js");
/* harmony import */ var _home_runner_work_violentmonkey_violentmonkey_src_common_handlers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/common/handlers */ "./src/common/handlers.js");
/* harmony import */ var _home_runner_work_violentmonkey_violentmonkey_src_common_load_script_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./src/common/load-script-icon */ "./src/common/load-script-icon.js");
/* harmony import */ var _home_runner_work_violentmonkey_violentmonkey_src_common_object__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./src/common/object */ "./src/common/object.js");
/* harmony import */ var _home_runner_work_violentmonkey_violentmonkey_src_common_ui__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./src/common/ui */ "./src/common/ui/index.js");
/* harmony import */ var _home_runner_work_violentmonkey_violentmonkey_src_common_ui_style__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./src/common/ui/style */ "./src/common/ui/style/index.js");
/* harmony import */ var _views_app__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./views/app */ "./src/popup/views/app.vue");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils */ "./src/popup/utils/index.js");










_utils__WEBPACK_IMPORTED_MODULE_9__.mutex.init();
(0,_home_runner_work_violentmonkey_violentmonkey_src_common_ui__WEBPACK_IMPORTED_MODULE_6__.render)(_views_app__WEBPACK_IMPORTED_MODULE_8__["default"]);
Object.assign(_home_runner_work_violentmonkey_violentmonkey_src_common_handlers__WEBPACK_IMPORTED_MODULE_3__["default"], {
  async SetPopup(data, {
    frameId,
    tab,
    url
  }) {
    // No `tab` is a FF bug when it sends messages from removed iframes
    if (!tab || _utils__WEBPACK_IMPORTED_MODULE_9__.store.currentTab && _utils__WEBPACK_IMPORTED_MODULE_9__.store.currentTab.id !== tab.id) return;
    /* SetPopup from a sub-frame may come first so we need to wait for the main page
     * because we only show the iframe menu for unique scripts that don't run in the main page */

    const isTop = frameId === 0;
    if (!isTop) await _utils__WEBPACK_IMPORTED_MODULE_9__.mutex.ready;else {
      _utils__WEBPACK_IMPORTED_MODULE_9__.store.commands = safeCall(_home_runner_work_violentmonkey_violentmonkey_src_common_object__WEBPACK_IMPORTED_MODULE_5__.mapEntry, data.menus, Object.keys); // executeScript may(?) fail in a discarded or lazy-loaded tab, which is actually injectable

      _utils__WEBPACK_IMPORTED_MODULE_9__.store.injectable = true;
    }
    const idMapAllFrames = _utils__WEBPACK_IMPORTED_MODULE_9__.store.idMap;
    const idMapMain = idMapAllFrames[0] || (idMapAllFrames[0] = {});
    const idMapOld = idMapAllFrames[frameId] || (idMapAllFrames[frameId] = {});
    const idMap = safeCall(_home_runner_work_violentmonkey_violentmonkey_src_common_object__WEBPACK_IMPORTED_MODULE_5__.mapEntry, data[IDS], null, (id, val) => val !== idMapOld[id] && id);
    const ids = Object.keys(idMap).map(Number);

    if (ids.length) {
      var _data$SCRIPTS;

      Object.assign(idMapOld, idMap); // frameScripts may be appended multiple times if iframes have unique scripts

      const scope = _utils__WEBPACK_IMPORTED_MODULE_9__.store[isTop ? SCRIPTS : 'frameScripts'];
      const metas = ((_data$SCRIPTS = data[SCRIPTS]) == null ? void 0 : _data$SCRIPTS.filter(({
        props: {
          id
        }
      }) => ids.includes(id))) || Object.assign(data, await (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_1__.sendCmdDirectly)('GetData', {
        ids
      }))[SCRIPTS];
      metas.forEach(script => {
        (0,_home_runner_work_violentmonkey_violentmonkey_src_common_load_script_icon__WEBPACK_IMPORTED_MODULE_4__.loadScriptIcon)(script, data);
        const {
          id
        } = script.props;
        const state = idMap[id];
        const badRealm = state === ID_BAD_REALM;
        const renderedScript = scope.find(({
          props
        }) => props.id === id);
        if (renderedScript) script = renderedScript;else if (isTop || !(id in idMapMain)) {
          scope.push(script);

          if (isTop) {
            // removing script from frameScripts if it ran there before the main frame
            const {
              frameScripts
            } = _utils__WEBPACK_IMPORTED_MODULE_9__.store;
            const i = frameScripts.findIndex(({
              props
            }) => props.id === id);
            if (i >= 0) frameScripts.splice(i, 1);
          }
        }
        script.runs = state === CONTENT || state === PAGE;
        script.pageUrl = url; // each frame has its own URL

        script.failed = badRealm || state === ID_INJECTING;
        script.syntax = state === ID_INJECTING;

        if (badRealm && !_utils__WEBPACK_IMPORTED_MODULE_9__.store.injectionFailure) {
          _utils__WEBPACK_IMPORTED_MODULE_9__.store.injectionFailure = {
            fixable: data[INJECT_INTO] === PAGE
          };
        }
      });
    }

    if (isTop) _utils__WEBPACK_IMPORTED_MODULE_9__.mutex.resolve(); // resolving at the end after all `await` above are settled
  }

});
(0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_1__.sendCmdDirectly)('CachePop', 'SetPopup').then(data => {
  safeCall(_home_runner_work_violentmonkey_violentmonkey_src_common_object__WEBPACK_IMPORTED_MODULE_5__.forEachValue, data, val => _home_runner_work_violentmonkey_violentmonkey_src_common_handlers__WEBPACK_IMPORTED_MODULE_3__["default"].SetPopup(...val));
});
/* Since new Chrome prints a warning when ::-webkit-details-marker is used,
 * we add it only for old Chrome, which is detected via feature added in 89. */

if (!(CSS.supports != null && CSS.supports('list-style-type', 'disclosure-open'))) {
  document.styleSheets[0].insertRule('.excludes-menu ::-webkit-details-marker {display:none}');
}

(0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_1__.sendCmdDirectly)('GetTabDomain').then(async ({
  tab,
  domain
}) => {
  _utils__WEBPACK_IMPORTED_MODULE_9__.store.currentTab = tab;
  _utils__WEBPACK_IMPORTED_MODULE_9__.store.domain = domain;
  browser.runtime.connect({
    name: `${tab.id}`
  });

  if (!_home_runner_work_violentmonkey_violentmonkey_src_common_consts__WEBPACK_IMPORTED_MODULE_2__.INJECTABLE_TAB_URL_RE.test(tab.url) // executeScript runs code in own pages in FF
  || !(await browser.tabs.executeScript({
    code: '1',
    [RUN_AT]: 'document_start'
  }).catch(() => []))) {
    _utils__WEBPACK_IMPORTED_MODULE_9__.store.injectable = false;
    _utils__WEBPACK_IMPORTED_MODULE_9__.mutex.resolve();
  } else {
    _utils__WEBPACK_IMPORTED_MODULE_9__.store.blacklisted = await (0,_home_runner_work_violentmonkey_violentmonkey_src_common__WEBPACK_IMPORTED_MODULE_1__.sendCmdDirectly)('TestBlacklist', tab.url);
  }
});

/***/ }),

/***/ "./src/popup/utils/index.js":
/*!**********************************!*\
  !*** ./src/popup/utils/index.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mutex": () => (/* binding */ mutex),
/* harmony export */   "store": () => (/* binding */ store)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm-bundler.js");

const store = (0,vue__WEBPACK_IMPORTED_MODULE_0__.reactive)({
  scripts: [],
  frameScripts: [],
  idMap: {},
  commands: [],
  domain: '',
  injectionFailure: null,
  injectable: true,
  blacklisted: false
});
const mutex = {
  init(delay = 100) {
    this.ready = new Promise(resolve => {
      this.resolve = resolve; // pages like Chrome Web Store may forbid injection in main page so we need a timeout

      setTimeout(resolve, delay);
    });
  }

};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-6.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-6.use[2]!./src/popup/style.css?vue&type=style&index=0&lang=css":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-6.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-6.use[2]!./src/popup/style.css?vue&type=style&index=0&lang=css ***!
  \***********************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  width: 320px;\n  max-width: 100%;\n  /* Latest Chrome renders an extra blank for a nonexistent scrollbar */\n  overflow: hidden;\n  background: var(--fill-0-5);\n  font-weight: normal;\n}\n@media (min-width: 360px) {body {\n    width: 100%\n}\n}\na,\n  a:focus {\n    color: inherit;\n}\n.page-popup {\n  /* hardcoded popup height in Chrome */\n  max-height: 600px;\n  overflow: hidden;\n}\n.page-popup .incognito {\n    padding: 8px 8px 0 46px;\n}\nfooter {\n  height: 40px;\n  line-height: 40px;\n  text-align: center;\n  font-size: 12px;\n  color: var(--fill-6);\n}\n.logo {\n  text-align: center;\n  margin: 0 7px;\n}\n.logo img {\n    width: 32px;\n}\n.logo.disabled > img {\n    opacity: .5;\n}\n.menu-area {\n  cursor: pointer;\n}\n.menu-area:hover,\n  .menu-area:focus {\n    background: cornflowerblue;\n    color: var(--bg);\n}\n@media (prefers-color-scheme: dark) {\n.menu-area:hover,\n  .menu-area:focus {\n      background: #404c5c;\n      color: var(--fill-15)\n}\n}\n.script:not(.disabled):not(.runs) .menu-area .script-name,\n  .disabled:not(.runs) > .menu-area {\n    color: var(--fill-8);\n}\n.script:not(.disabled):not(.runs) .menu-area .script-name:hover,\n    .script:not(.disabled):not(.runs) .menu-area .script-name:focus,\n    .disabled:not(.runs) > .menu-area:hover,\n    .disabled:not(.runs) > .menu-area:focus {\n      color: var(--fill-2);\n}\n.ext-name.disabled {\n    color: var(--fill-8);\n}\n.script-icon:not([src]) {\n    display: none;\n}\n.script-icon {\n  max-width: 18px;\n  max-height: 18px;\n  margin-left: 2px;\n  position: absolute;\n}\n.script-icon + .icon {\n    margin-left: 22px;\n    margin-right: 10px;\n}\n.menu-buttons {\n  align-items: center;\n  padding: 8px 8px 8px 0;\n  background: var(--bg);\n}\n.menu-buttons > .menu-area {\n    padding: 8px;\n}\n.menu-buttons .icon {\n    display: block;\n    width: 20px;\n    height: 20px;\n}\n.menu {\n  background: var(--bg);\n}\n.menu, .menu:not(.expand) + footer {\n    border-top: 1px solid var(--fill-4);\n}\n.menu-item {\n    position: relative;\n    display: flex;\n    align-items: center;\n    min-height: 2rem;\n    padding-left: 14px;\n    padding-right: 14px;\n    text-align: left;\n    white-space: nowrap;\n}\n.submenu .menu-item {\n      text-align: left;\n}\n.menu-item .icon {\n      flex: 0 0 14px;\n}\n.menu-item .icon.icon-collapse {\n        flex: 0 0 16px;\n        width: 16px;\n        height: 16px;\n}\n.menu-item > .icon:first-child {\n      margin-right: 10px;\n}\n.menu-item > .flex-auto {\n      display: flex;\n      align-self: stretch;\n      align-items: center;\n}\n.menu-item > .flex-auto:last-child {\n        padding-right: 14px;\n}\n.menu-item > .flex-1 {\n      padding-right: 2rem;\n}\n.failed .menu-item {\n      text-decoration: line-through red;\n}\n.removed .menu-item {\n      text-decoration: line-through;\n}\n.menu-find {\n    padding-left: 0;\n    cursor: default;\n}\n.menu-find a {\n      display: flex;\n      align-items: center;\n      align-self: stretch;\n}\n.menu-find .icon {\n      flex-basis: 16px;\n      width: 16px;\n      height: 16px;\n      margin: 0 10px 0 20px;\n}\n.menu-group {\n    padding-left: 20px;\n    color: #4a7792;\n}\n@media (prefers-color-scheme: dark) {\n.menu-group {\n      color: #eee\n}\n}\n.menu-group [data-totals]::after {\n      content: \": \" attr(data-totals);\n}\n.menu.expand {\n    overflow-y: auto;\n}\n.menu.expand > .submenu {\n      display: block;\n      border-color: var(--fill-4);\n}\n.menu.expand .icon-collapse {\n      transform: rotate(90deg);\n}\n.menu.expand > .menu-group {\n      font-weight: bold;\n}\n.submenu {\n  display: none;\n  min-height: 2rem;\n  overflow-y: auto;\n  background: var(--bg);\n  border-top: 1px dashed var(--fill-3);\n}\n.submenu > * {\n    position: relative;\n}\n.submenu > * .menu-item {\n      padding-left: 0;\n}\n.submenu-buttons {\n    display: flex;\n    position: absolute;\n    top: 0;\n    right: 0;\n}\n.touch .submenu-buttons {\n      display: flex !important;\n}\n.submenu-button {\n    padding: .5rem;\n    background: var(--bg);\n    cursor: pointer;\n}\n.submenu-button:focus {\n      color: var(--bg);\n      background: cornflowerblue;\n}\n.menu-item:hover + .submenu-buttons .submenu-button:not(:focus) {\n      background: #a0c1fd;\n}\n@media (prefers-color-scheme: dark) {\n.menu-item:hover + .submenu-buttons .submenu-button:not(:focus) {\n        background: #5b6979\n}\n}\n.submenu-button .icon {\n      display: block;\n}\n.submenu-commands {\n    font-size: .8rem;\n    color: var(--fill-12);\n}\n.submenu-commands > .menu-item {\n      padding-left: 46px;\n}\n.submenu-commands > .menu-item > .icon {\n        margin-right: .5rem;\n}\n.message {\n  position: absolute;\n  max-width: 100%;\n  left: 0;\n  bottom: 0;\n  padding: 4px 8px;\n  word-wrap: break-word;\n  font-size: 12px;\n  line-height: 1.2; /* lower values cut descender in \"g\" */\n  background: var(--fill-0-5);\n  border: 1px solid var(--fill-2);\n}\n.message > div {\n    max-height: 40px;\n    overflow: hidden;\n}\n.failure-reason {\n  padding: .5rem 14px .5rem 46px;\n}\n[data-failure-reason=\"\"] > .failure-reason {\n    /* Making the warning noticeable at the bottom of the script list*/\n    background: hsla(30, 100%, 50%, .2);\n}\n.failure-reason code {\n    max-width: 100%;\n}\n.reload-hint .icon {\n    position: absolute;\n    left: 20px;\n    width: 16px;\n    height: 16px;\n}\n.extras-menu {\n  position: fixed;\n  right: 1rem;\n  box-shadow: 1px 1px 10px #0008;\n  z-index: 100;\n  background: var(--bg);\n  color: var(--fg);\n  border: 1px solid var(--fill-6);\n}\n.extras-menu > * {\n    cursor: pointer;\n    display: block;\n    padding: .25rem 1rem;\n    text-decoration: none;\n}\n.extras-menu > *:first-child {\n      padding-top: .75rem;\n}\n.extras-menu > *:last-child {\n      padding-bottom: .75rem;\n}\n.extras-menu > *:focus {\n      color: var(--bg);\n      background: cornflowerblue;\n}\n.excludes-menu {\n  padding: .25rem .5rem .25rem 46px;\n}\n.excludes-menu button {\n    text-align: left;\n    max-width: 100%;\n}\n.excludes-menu input {\n    width: 100%;\n}\n.excludes-menu details summary {\n      list-style-type: none;\n}\n.excludes-menu details[open] {\n      padding-top: .25rem;\n}\n.excludes-menu details[open] summary {\n        position: absolute;\n        left: 18px;\n}\n.excludes-menu details:not([open]) {\n      display: inline;\n}\n.excludes-menu .icon {\n    cursor: pointer;\n    width: 18px;\n    height: 18px;\n}\n.extras-shown .script-name {\n  text-decoration: underline;\n}\n.block-scroll {\n  pointer-events: none;\n  -moz-user-select: none;\n       user-select: none;\n}\n[data-upd]::after {\n  content: attr(data-upd);\n  position: absolute;\n  font-size: 10px;\n  bottom: -4px;\n  line-height: 1;\n  color: var(--fill-7);\n}\n.syntax {\n  font-size: xx-small;\n  position: absolute;\n  top: 2.5em;\n  color: red;\n}\n", ""]);
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

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-6.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-6.use[2]!./src/popup/style.css?vue&type=style&index=0&lang=css":
/*!***************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-6.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-6.use[2]!./src/popup/style.css?vue&type=style&index=0&lang=css ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************/
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_6_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_6_use_2_style_css_vue_type_style_index_0_lang_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-6.use[1]!../../node_modules/vue-loader/dist/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-6.use[2]!./style.css?vue&type=style&index=0&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-6.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-6.use[2]!./src/popup/style.css?vue&type=style&index=0&lang=css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_6_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_6_use_2_style_css_vue_type_style_index_0_lang_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_6_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_6_use_2_style_css_vue_type_style_index_0_lang_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_clonedRuleSet_6_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_6_use_2_style_css_vue_type_style_index_0_lang_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_clonedRuleSet_6_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_6_use_2_style_css_vue_type_style_index_0_lang_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


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

/***/ "./src/popup/views/app.vue":
/*!*********************************!*\
  !*** ./src/popup/views/app.vue ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _app_vue_vue_type_template_id_6f2db414__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.vue?vue&type=template&id=6f2db414 */ "./src/popup/views/app.vue?vue&type=template&id=6f2db414");
/* harmony import */ var _app_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.vue?vue&type=script&lang=js */ "./src/popup/views/app.vue?vue&type=script&lang=js");
/* harmony import */ var _style_css_vue_type_style_index_0_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../style.css?vue&type=style&index=0&lang=css */ "./src/popup/style.css?vue&type=style&index=0&lang=css");
/* harmony import */ var _home_runner_work_violentmonkey_violentmonkey_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_home_runner_work_violentmonkey_violentmonkey_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_app_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_app_vue_vue_type_template_id_6f2db414__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"src/popup/views/app.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./src/popup/views/app.vue?vue&type=script&lang=js":
/*!*********************************************************!*\
  !*** ./src/popup/views/app.vue?vue&type=script&lang=js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_dist_index_js_ruleSet_0_app_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_dist_index_js_ruleSet_0_app_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/dist/index.js??ruleSet[0]!./app.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/popup/views/app.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./src/popup/views/app.vue?vue&type=template&id=6f2db414":
/*!***************************************************************!*\
  !*** ./src/popup/views/app.vue?vue&type=template&id=6f2db414 ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_app_vue_vue_type_template_id_6f2db414__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_app_vue_vue_type_template_id_6f2db414__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0]!./app.vue?vue&type=template&id=6f2db414 */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/popup/views/app.vue?vue&type=template&id=6f2db414");


/***/ }),

/***/ "./src/popup/style.css?vue&type=style&index=0&lang=css":
/*!*************************************************************!*\
  !*** ./src/popup/style.css?vue&type=style&index=0&lang=css ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_6_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_6_use_2_style_css_vue_type_style_index_0_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-6.use[1]!../../node_modules/vue-loader/dist/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-6.use[2]!./style.css?vue&type=style&index=0&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-6.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-6.use[2]!./src/popup/style.css?vue&type=style&index=0&lang=css");


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
/******/ 			"popup/index": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["common-ui"], () => (__webpack_require__("./src/popup/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92aW9sZW50bW9ua2V5Ly4vc3JjL3BvcHVwL3ZpZXdzL2FwcC52dWUiLCJ3ZWJwYWNrOi8vdmlvbGVudG1vbmtleS8uL3NyYy9wb3B1cC9pbmRleC5qcyIsIndlYnBhY2s6Ly92aW9sZW50bW9ua2V5Ly4vc3JjL3BvcHVwL3V0aWxzL2luZGV4LmpzIiwid2VicGFjazovL3Zpb2xlbnRtb25rZXkvLi9zcmMvcG9wdXAvc3R5bGUuY3NzIiwid2VicGFjazovL3Zpb2xlbnRtb25rZXkvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3Zpb2xlbnRtb25rZXkvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvbm9Tb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3Zpb2xlbnRtb25rZXkvLi9zcmMvcG9wdXAvc3R5bGUuY3NzPzQ3ZWMiLCJ3ZWJwYWNrOi8vdmlvbGVudG1vbmtleS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly92aW9sZW50bW9ua2V5Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly92aW9sZW50bW9ua2V5Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3Zpb2xlbnRtb25rZXkvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vdmlvbGVudG1vbmtleS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3Zpb2xlbnRtb25rZXkvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly92aW9sZW50bW9ua2V5Ly4vc3JjL3BvcHVwL3ZpZXdzL2FwcC52dWU/N2E2NyIsIndlYnBhY2s6Ly92aW9sZW50bW9ua2V5Ly4vc3JjL3BvcHVwL3ZpZXdzL2FwcC52dWU/MThjNSIsIndlYnBhY2s6Ly92aW9sZW50bW9ua2V5Ly4vc3JjL3BvcHVwL3ZpZXdzL2FwcC52dWU/ZGE2ZCIsIndlYnBhY2s6Ly92aW9sZW50bW9ua2V5Ly4vc3JjL3BvcHVwL3N0eWxlLmNzcz9kNDU5Iiwid2VicGFjazovL3Zpb2xlbnRtb25rZXkvLi9zcmMvcmVzb3VyY2VzL3N2Zy8gc3luYyBub25yZWN1cnNpdmUgXFwuc3ZnJCIsIndlYnBhY2s6Ly92aW9sZW50bW9ua2V5Ly4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2V4dGVuZHMuanMiLCJ3ZWJwYWNrOi8vdmlvbGVudG1vbmtleS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly92aW9sZW50bW9ua2V5L3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vdmlvbGVudG1vbmtleS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly92aW9sZW50bW9ua2V5L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly92aW9sZW50bW9ua2V5L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdmlvbGVudG1vbmtleS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Zpb2xlbnRtb25rZXkvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vdmlvbGVudG1vbmtleS93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vdmlvbGVudG1vbmtleS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3Zpb2xlbnRtb25rZXkvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3Zpb2xlbnRtb25rZXkvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgPGRpdlxuICAgIGNsYXNzPVwicGFnZS1wb3B1cCBmbGV4IGZsZXgtY29sXCJcbiAgICBAY2xpY2s9XCJhY3RpdmVFeHRyYXMgJiYgdG9nZ2xlRXh0cmFzKG51bGwpXCJcbiAgICBAY2xpY2suY2FwdHVyZT1cIm9uT3BlblVybFwiXG4gICAgQGNvbnRleHRtZW51PVwiYWN0aXZlRXh0cmFzICYmICh0b2dnbGVFeHRyYXMobnVsbCksICRldmVudC5wcmV2ZW50RGVmYXVsdCgpKVwiXG4gICAgQG1vdXNlZW50ZXIuY2FwdHVyZT1cImRlbGVnYXRlTW91c2VFbnRlclwiXG4gICAgQG1vdXNlbGVhdmUuY2FwdHVyZT1cImRlbGVnYXRlTW91c2VMZWF2ZVwiXG4gICAgQGZvY3VzLmNhcHR1cmU9XCJ1cGRhdGVNZXNzYWdlXCJcbiAgICA6ZGF0YS1mYWlsdXJlLXJlYXNvbj1cImZhaWx1cmVSZWFzb25cIj5cbiAgICA8ZGl2IGNsYXNzPVwiZmxleCBtZW51LWJ1dHRvbnNcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJsb2dvXCIgOmNsYXNzPVwie2Rpc2FibGVkOiFvcHRpb25zLmlzQXBwbGllZH1cIj5cbiAgICAgICAgPGltZyBzcmM9XCIvcHVibGljL2ltYWdlcy9pY29uMTI4LnBuZ1wiPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPVwiZmxleC0xIGV4dC1uYW1lXCJcbiAgICAgICAgOmNsYXNzPVwie2Rpc2FibGVkOiFvcHRpb25zLmlzQXBwbGllZH1cIlxuICAgICAgICB2LXRleHQ9XCJuYW1lXCJcbiAgICAgIC8+XG4gICAgICA8c3BhblxuICAgICAgICBjbGFzcz1cIm1lbnUtYXJlYVwiXG4gICAgICAgIDpjbGFzcz1cIntkaXNhYmxlZDohb3B0aW9ucy5pc0FwcGxpZWR9XCJcbiAgICAgICAgOmRhdGEtbWVzc2FnZT1cIm9wdGlvbnMuaXNBcHBsaWVkID8gaTE4bignbWVudVNjcmlwdEVuYWJsZWQnKSA6IGkxOG4oJ21lbnVTY3JpcHREaXNhYmxlZCcpXCJcbiAgICAgICAgOnRhYkluZGV4PVwidGFiSW5kZXhcIlxuICAgICAgICBAY2xpY2s9XCJvblRvZ2dsZVwiPlxuICAgICAgICA8aWNvbiA6bmFtZT1cImdldFN5bWJvbENoZWNrKG9wdGlvbnMuaXNBcHBsaWVkKVwiPjwvaWNvbj5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxzcGFuXG4gICAgICAgIGNsYXNzPVwibWVudS1hcmVhXCJcbiAgICAgICAgOmRhdGEtbWVzc2FnZT1cImkxOG4oJ21lbnVEYXNoYm9hcmQnKVwiXG4gICAgICAgIDp0YWJJbmRleD1cInRhYkluZGV4XCJcbiAgICAgICAgQGNsaWNrPVwib25NYW5hZ2VcIj5cbiAgICAgICAgPGljb24gbmFtZT1cImNvZ1wiPjwvaWNvbj5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxzcGFuXG4gICAgICAgIGNsYXNzPVwibWVudS1hcmVhXCJcbiAgICAgICAgOmRhdGEtbWVzc2FnZT1cImkxOG4oJ21lbnVOZXdTY3JpcHQnKVwiXG4gICAgICAgIDp0YWJJbmRleD1cInRhYkluZGV4XCJcbiAgICAgICAgQGNsaWNrPVwib25DcmVhdGVTY3JpcHRcIj5cbiAgICAgICAgPGljb24gbmFtZT1cInBsdXNcIj48L2ljb24+XG4gICAgICA8L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cIm1lbnVcIiB2LWlmPVwic3RvcmUuaW5qZWN0YWJsZVwiIHYtc2hvdz1cInN0b3JlLmRvbWFpblwiPlxuICAgICAgPGRpdiBjbGFzcz1cIm1lbnUtaXRlbSBtZW51LWFyZWEgbWVudS1maW5kXCI+XG4gICAgICAgIDx0ZW1wbGF0ZSB2LWZvcj1cIih1cmwsIHRleHQsIGkpIGluIGZpbmRVcmxzXCIgOmtleT1cInVybFwiPlxuICAgICAgICAgIDxhIHRhcmdldD1cIl9ibGFua1wiIDpjbGFzcz1cInsgZWxsaXBzaXM6ICFpLCAnbXItMSc6ICFpLCAnbWwtMSc6IGkgfVwiXG4gICAgICAgICAgICAgOmhyZWY9XCJ1cmxcIiA6ZGF0YS1tZXNzYWdlPVwidXJsLnNwbGl0KCc6Ly8nKVsxXVwiIDp0YWJJbmRleD1cInRhYkluZGV4XCI+XG4gICAgICAgICAgICA8aWNvbiBuYW1lPVwic2VhcmNoXCIgdi1pZj1cIiFpXCIvPnt7dGV4dH19XG4gICAgICAgICAgPC9hPlxuICAgICAgICAgIDx0ZW1wbGF0ZSB2LWlmPVwiIWlcIj4vPC90ZW1wbGF0ZT5cbiAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJmYWlsdXJlLXJlYXNvblwiIHYtaWY9XCJmYWlsdXJlUmVhc29uVGV4dFwiPlxuICAgICAgPHRvb2x0aXAgdi1pZj1cImluamVjdGlvblNjb3Blc1swXSAmJiAhb3B0aW9ucy5pc0FwcGxpZWRcIlxuICAgICAgICAgICAgOmNvbnRlbnQ9XCJpMThuKCdsYWJlbEF1dG9SZWxvYWRDdXJyZW50VGFiRGlzYWJsZWQnKVwiXG4gICAgICAgICAgICBjbGFzcz1cInJlbG9hZC1oaW50XCIgYWxpZ249XCJzdGFydFwiIHBsYWNlbWVudD1cImJvdHRvbVwiPlxuICAgICAgICA8aWNvbiBuYW1lPVwiaW5mb1wiLz5cbiAgICAgIDwvdG9vbHRpcD5cbiAgICAgIDxzcGFuIHYtdGV4dD1cImZhaWx1cmVSZWFzb25UZXh0XCIvPlxuICAgICAgPGNvZGUgdi10ZXh0PVwic3RvcmUuYmxhY2tsaXN0ZWRcIiB2LWlmPVwic3RvcmUuYmxhY2tsaXN0ZWRcIiBjbGFzcz1cImVsbGlwc2lzIGlubGluZS1ibG9ja1wiLz5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2XG4gICAgICB2LWZvcj1cInNjb3BlIGluIGluamVjdGlvblNjb3Blc1wiXG4gICAgICBjbGFzcz1cIm1lbnUgbWVudS1zY3JpcHRzIGZsZXggZmxleC1jb2xcIlxuICAgICAgOmNsYXNzPVwie1xuICAgICAgICBleHBhbmQ6IGFjdGl2ZU1lbnUgPT09IHNjb3BlLm5hbWUsXG4gICAgICAgICdibG9jay1zY3JvbGwnOiBhY3RpdmVFeHRyYXMsXG4gICAgICB9XCJcbiAgICAgIDpkYXRhLXR5cGU9XCJzY29wZS5uYW1lXCJcbiAgICAgIDprZXk9XCJzY29wZS5uYW1lXCI+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPVwibWVudS1pdGVtIG1lbnUtYXJlYSBtZW51LWdyb3VwXCJcbiAgICAgICAgOnRhYkluZGV4PVwidGFiSW5kZXhcIlxuICAgICAgICBAY2xpY2s9XCJ0b2dnbGVNZW51KHNjb3BlLm5hbWUpXCI+XG4gICAgICAgIDxpY29uIG5hbWU9XCJhcnJvd1wiIGNsYXNzPVwiaWNvbi1jb2xsYXBzZVwiPjwvaWNvbj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZsZXgtYXV0b1wiIHYtdGV4dD1cInNjb3BlLnRpdGxlXCIgOmRhdGEtdG90YWxzPVwic2NvcGUudG90YWxzXCIgLz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInN1Ym1lbnVcIiByZWY9XCJzY3JpcHRMaXN0XCIgZm9jdXNtZT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIHYtZm9yPVwiaXRlbSBpbiBzY29wZS5saXN0XCJcbiAgICAgICAgICA6a2V5PVwiaXRlbS5pZFwiXG4gICAgICAgICAgOmNsYXNzPVwie1xuICAgICAgICAgICAgZGlzYWJsZWQ6ICFpdGVtLmRhdGEuY29uZmlnLmVuYWJsZWQsXG4gICAgICAgICAgICBmYWlsZWQ6IGl0ZW0uZGF0YS5mYWlsZWQsXG4gICAgICAgICAgICByZW1vdmVkOiBpdGVtLmRhdGEuY29uZmlnLnJlbW92ZWQsXG4gICAgICAgICAgICBydW5zOiBpdGVtLmRhdGEucnVucyxcbiAgICAgICAgICAgICdleHRyYXMtc2hvd24nOiBhY3RpdmVFeHRyYXMgPT09IGl0ZW0sXG4gICAgICAgICAgICAnZXhjbHVkZXMtc2hvd24nOiBpdGVtLmV4Y2x1ZGVzLFxuICAgICAgICAgIH1cIlxuICAgICAgICAgIGNsYXNzPVwic2NyaXB0XCI+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3M9XCJtZW51LWl0ZW0gbWVudS1hcmVhXCJcbiAgICAgICAgICAgIDp0YWJJbmRleD1cInRhYkluZGV4XCJcbiAgICAgICAgICAgIDpkYXRhLW1lc3NhZ2U9XCJpdGVtLm5hbWVcIlxuICAgICAgICAgICAgQGZvY3VzPVwiZm9jdXNlZEl0ZW0gPSBpdGVtXCJcbiAgICAgICAgICAgIEBrZXlkb3duLmVudGVyLmV4YWN0LnN0b3A9XCJvbkVkaXRTY3JpcHQoaXRlbSlcIlxuICAgICAgICAgICAgQGtleWRvd24uc3BhY2UuZXhhY3Quc3RvcD1cIm9uVG9nZ2xlU2NyaXB0KGl0ZW0pXCJcbiAgICAgICAgICAgIEBjbGljaz1cIm9uVG9nZ2xlU2NyaXB0KGl0ZW0pXCI+XG4gICAgICAgICAgICA8aW1nIGNsYXNzPVwic2NyaXB0LWljb25cIiA6c3JjPVwiaXRlbS5kYXRhLnNhZmVJY29uXCI+XG4gICAgICAgICAgICA8aWNvbiA6bmFtZT1cImdldFN5bWJvbENoZWNrKGl0ZW0uZGF0YS5jb25maWcuZW5hYmxlZClcIj48L2ljb24+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2NyaXB0LW5hbWUgZmxleC1hdXRvIGVsbGlwc2lzXCJcbiAgICAgICAgICAgICAgICAgOmRhdGEtdXBkPVwiaXRlbS51cGRcIlxuICAgICAgICAgICAgICAgICBAY2xpY2suY3RybC5leGFjdC5zdG9wPVwib25FZGl0U2NyaXB0KGl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgQGNvbnRleHRtZW51LmV4YWN0LnN0b3AucHJldmVudD1cIm9uRWRpdFNjcmlwdChpdGVtKVwiXG4gICAgICAgICAgICAgICAgIEBtb3VzZWRvd24ubWlkZGxlLmV4YWN0LnN0b3A9XCJvbkVkaXRTY3JpcHQoaXRlbSlcIj5cbiAgICAgICAgICAgICAgPHN1cCBjbGFzcz1cInN5bnRheFwiIHYtaWY9XCJpdGVtLmRhdGEuc3ludGF4XCIgdi10ZXh0PVwiaTE4bignbXNnU3ludGF4RXJyb3InKVwiLz5cbiAgICAgICAgICAgICAge3tpdGVtLm5hbWV9fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInN1Ym1lbnUtYnV0dG9uc1wiXG4gICAgICAgICAgICAgICB2LXNob3c9XCJzaG93QnV0dG9ucyhpdGVtKVwiPlxuICAgICAgICAgICAgPCEtLSBVc2luZyBhIHN0YW5kYXJkIHRvb2x0aXAgdGhhdCdzIHNob3duIGFmdGVyIGEgZGVsYXkgdG8gYXZvaWQgbmFnZ2luZyB0aGUgdXNlciAtLT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdWJtZW51LWJ1dHRvblwiIDp0YWJJbmRleD1cInRhYkluZGV4XCIgQGNsaWNrPVwib25FZGl0U2NyaXB0KGl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgOnRpdGxlPVwiaTE4bignYnV0dG9uRWRpdENsaWNrSGludCcpXCI+XG4gICAgICAgICAgICAgIDxpY29uIG5hbWU9XCJjb2RlXCI+PC9pY29uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzPVwic3VibWVudS1idXR0b25cIlxuICAgICAgICAgICAgICA6dGFiSW5kZXg9XCJ0YWJJbmRleFwiXG4gICAgICAgICAgICAgIEBjbGljay5zdG9wPVwidG9nZ2xlRXh0cmFzKGl0ZW0sICRldmVudClcIj5cbiAgICAgICAgICAgICAgPGljb24gbmFtZT1cIm1vcmVcIi8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IHYtaWY9XCJpdGVtLmV4Y2x1ZGVzXCIgY2xhc3M9XCJleGNsdWRlcy1tZW51IG1iLTFjIG1yLTFjXCI+XG4gICAgICAgICAgICA8YnV0dG9uIHYtZm9yPVwiKHZhbCwga2V5KSBpbiBpdGVtLmV4Y2x1ZGVzWzFdXCIgOmtleT1cImtleVwiXG4gICAgICAgICAgICAgICAgICAgIHYtdGV4dD1cInZhbFwiIGNsYXNzPVwiZWxsaXBzaXNcIiA6dGl0bGU9XCJgKjovLyR7dmFsfS8qYFwiXG4gICAgICAgICAgICAgICAgICAgIEBjbGljaz1cIm9uRXhjbHVkZVNhdmUoaXRlbSwgYCo6Ly8ke3ZhbH0vKmApXCIvPlxuICAgICAgICAgICAgPGlucHV0IHYtbW9kZWw9XCJpdGVtLmV4Y2x1ZGVzWzBdXCIgc3BlbGxjaGVjaz1cImZhbHNlXCJcbiAgICAgICAgICAgICAgICAgICBAa2V5cHJlc3MuZW50ZXI9XCJvbkV4Y2x1ZGVTYXZlKGl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICBAa2V5ZG93bi5lc2MuZXhhY3Quc3RvcC5wcmV2ZW50PVwib25FeGNsdWRlQ2xvc2UoaXRlbSlcIi8+XG4gICAgICAgICAgICA8IS0tIEVzYyBpbnRlcmNlcHRpb24gd29ya3MgaW4gQ2hyb21lIG5vdCBpbiBGaXJlZm94IC0tPlxuICAgICAgICAgICAgPGJ1dHRvbiB2LXRleHQ9XCJpMThuKCdidXR0b25PSycpXCIgQGNsaWNrPVwib25FeGNsdWRlU2F2ZShpdGVtKVwiLz5cbiAgICAgICAgICAgIDxidXR0b24gdi10ZXh0PVwiaTE4bignYnV0dG9uQ2FuY2VsJylcIiBAY2xpY2s9XCJvbkV4Y2x1ZGVDbG9zZShpdGVtKVwiLz5cbiAgICAgICAgICAgIDwhLS0gbm90IHVzaW5nIHRvb2x0aXAgdG8gcHJlc2VydmUgbGluZSBicmVha3MgLS0+XG4gICAgICAgICAgICA8ZGV0YWlscyBjbGFzcz1cIm1iLTFcIj5cbiAgICAgICAgICAgICAgPHN1bW1hcnk+PGljb24gbmFtZT1cImluZm9cIi8+PC9zdW1tYXJ5PlxuICAgICAgICAgICAgICA8c21hbGw+e3tpMThuKCdtZW51RXhjbHVkZUhpbnQnKX19IHt7aTE4bignbGFiZWxSZWxhdGVkJyl9fTxhXG4gICAgICAgICAgICAgICAgdi10ZXh0PVwiaTE4bignbGFiZWxFeGNsdWRlTWF0Y2gnKVwiIHRhcmdldD1cIl9ibGFua1wiXG4gICAgICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vdmlvbGVudG1vbmtleS5naXRodWIuaW8vYXBpL21hdGNoaW5nL1wiLz5cbiAgICAgICAgICAgICAgPC9zbWFsbD5cbiAgICAgICAgICAgIDwvZGV0YWlscz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic3VibWVudS1jb21tYW5kc1wiPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzcz1cIm1lbnUtaXRlbSBtZW51LWFyZWFcIlxuICAgICAgICAgICAgICB2LWZvcj1cIihjYXAsIGkpIGluIHN0b3JlLmNvbW1hbmRzW2l0ZW0uZGF0YS5wcm9wcy5pZF1cIlxuICAgICAgICAgICAgICA6a2V5PVwiaVwiXG4gICAgICAgICAgICAgIDp0YWJJbmRleD1cInRhYkluZGV4XCJcbiAgICAgICAgICAgICAgOkNNRC5wcm9wPVwieyBpZDogaXRlbS5kYXRhLnByb3BzLmlkLCBjYXAgfVwiXG4gICAgICAgICAgICAgIDpkYXRhLW1lc3NhZ2U9XCJjYXBcIlxuICAgICAgICAgICAgICBAbW91c2Vkb3duPVwib25Db21tYW5kXCJcbiAgICAgICAgICAgICAgQG1vdXNldXA9XCJvbkNvbW1hbmRcIlxuICAgICAgICAgICAgICBAa2V5ZG93bi5lbnRlcj1cIm9uQ29tbWFuZFwiXG4gICAgICAgICAgICAgIEBrZXlkb3duLnNwYWNlPVwib25Db21tYW5kXCI+XG4gICAgICAgICAgICAgIDxpY29uIG5hbWU9XCJjb21tYW5kXCIgLz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZsZXgtYXV0byBlbGxpcHNpc1wiIHYtdGV4dD1cImNhcFwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZmFpbHVyZS1yZWFzb25cIiB2LWlmPVwic3RvcmUuaW5qZWN0aW9uRmFpbHVyZVwiPlxuICAgICAgPGRpdiB2LXRleHQ9XCJpMThuKCdtZW51SW5qZWN0aW9uRmFpbGVkJylcIi8+XG4gICAgICA8YSB2LXRleHQ9XCJpMThuKCdtZW51SW5qZWN0aW9uRmFpbGVkRml4JylcIiBocmVmPVwiI1wiXG4gICAgICAgICB2LWlmPVwic3RvcmUuaW5qZWN0aW9uRmFpbHVyZS5maXhhYmxlXCJcbiAgICAgICAgIEBjbGljay5wcmV2ZW50PVwib25JbmplY3Rpb25GYWlsdXJlRml4XCIvPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJpbmNvZ25pdG9cIlxuICAgICAgIHYtaWY9XCJzdG9yZS5jdXJyZW50VGFiPy5pbmNvZ25pdG9cIlxuICAgICAgIHYtdGV4dD1cImkxOG4oJ21zZ0luY29nbml0b0NoYW5nZXMnKVwiLz5cbiAgICA8Zm9vdGVyPlxuICAgICAgPGEgaHJlZj1cImh0dHBzOi8vdmlvbGVudG1vbmtleS5naXRodWIuaW8vXCIgdGFyZ2V0PVwiX2JsYW5rXCIgOnRhYkluZGV4PVwidGFiSW5kZXhcIiB2LXRleHQ9XCJpMThuKCd2aXNpdFdlYnNpdGUnKVwiIC8+XG4gICAgPC9mb290ZXI+XG4gICAgPGRpdiBjbGFzcz1cIm1lc3NhZ2VcIiB2LXNob3c9XCJtZXNzYWdlXCI+XG4gICAgICA8ZGl2IHYtdGV4dD1cIm1lc3NhZ2VcIj48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IHYtaWY9XCJhY3RpdmVFeHRyYXNcIiBjbGFzcz1cImV4dHJhcy1tZW51XCIgcmVmPVwiZXh0cmFzTWVudVwiPlxuICAgICAgPGEgdi1mb3I9XCJbdXJsLCB0ZXh0XSBpbiBhY3RpdmVMaW5rc1wiXG4gICAgICAgICA6a2V5PVwidXJsXCIgOmhyZWY9XCJ1cmxcIiA6ZGF0YS1tZXNzYWdlPVwidXJsXCIgdGFiaW5kZXg9XCIwXCIgdi10ZXh0PVwidGV4dFwiXG4gICAgICAgICByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCIgdGFyZ2V0PVwiX2JsYW5rXCIvPlxuICAgICAgPGRpdiB2LXRleHQ9XCJpMThuKCdtZW51RXhjbHVkZScpXCIgdGFiaW5kZXg9XCIwXCIgQGNsaWNrPVwib25FeGNsdWRlXCIvPlxuICAgICAgPGRpdiB2LXRleHQ9XCJhY3RpdmVFeHRyYXMuZGF0YS5jb25maWcucmVtb3ZlZCA/IGkxOG4oJ2J1dHRvblJlc3RvcmUnKSA6IGkxOG4oJ2J1dHRvblJlbW92ZScpXCJcbiAgICAgICAgICAgdGFiaW5kZXg9XCIwXCJcbiAgICAgICAgICAgQGNsaWNrPVwib25SZW1vdmVTY3JpcHRcIi8+XG4gICAgICA8ZGl2IHYtaWY9XCIhYWN0aXZlRXh0cmFzLmRhdGEuY29uZmlnLnJlbW92ZWQgJiYgY2FuVXBkYXRlKGFjdGl2ZUV4dHJhcy5kYXRhKVwiXG4gICAgICAgICAgIHYtdGV4dD1cImkxOG4oJ2J1dHRvblVwZGF0ZScpXCJcbiAgICAgICAgICAgdGFiaW5kZXg9XCIwXCJcbiAgICAgICAgICAgQGNsaWNrPVwib25VcGRhdGVTY3JpcHRcIi8+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCB7IHJlYWN0aXZlIH0gZnJvbSAndnVlJztcbmltcG9ydCBUb29sdGlwIGZyb20gJ3Z1ZWxldG9uL2xpYi90b29sdGlwJztcbmltcG9ydCBvcHRpb25zIGZyb20gJ0AvY29tbW9uL29wdGlvbnMnO1xuaW1wb3J0IHtcbiAgZ2V0U2NyaXB0SG9tZSwgZ2V0U2NyaXB0TmFtZSwgZ2V0U2NyaXB0UnVuQXQsIGdldFNjcmlwdFN1cHBvcnRVcmwsIGdldFNjcmlwdFVwZGF0ZVVybCxcbiAgaTE4biwgbWFrZVBhdXNlLCBzZW5kQ21kRGlyZWN0bHksIHNlbmRUYWJDbWQsIHRydWVKb2luLFxufSBmcm9tICdAL2NvbW1vbic7XG5pbXBvcnQgeyBvYmplY3RQaWNrIH0gZnJvbSAnQC9jb21tb24vb2JqZWN0JztcbmltcG9ydCB7IGZvY3VzTWUgfSBmcm9tICdAL2NvbW1vbi91aSc7XG5pbXBvcnQgSWNvbiBmcm9tICdAL2NvbW1vbi91aS9pY29uJztcbmltcG9ydCB7IGtleWJvYXJkU2VydmljZSwgaXNJbnB1dCwgaGFuZGxlVGFiTmF2aWdhdGlvbiB9IGZyb20gJ0AvY29tbW9uL2tleWJvYXJkJztcbmltcG9ydCB7IG11dGV4LCBzdG9yZSB9IGZyb20gJy4uL3V0aWxzJztcblxubGV0IG1vdXNlZG93bkVsZW1lbnQ7XG5jb25zdCBOQU1FID0gYCR7ZXh0ZW5zaW9uTWFuaWZlc3QubmFtZX0gJHtwcm9jZXNzLmVudi5WTV9WRVJ9YDtcbmNvbnN0IFNDUklQVF9DTFMgPSAnLnNjcmlwdCc7XG5jb25zdCBSVU5fQVRfT1JERVIgPSBbJ3N0YXJ0JywgJ2JvZHknLCAnZW5kJywgJ2lkbGUnXTtcbmNvbnN0IG9wdGlvbnNEYXRhID0gcmVhY3RpdmUoe1xuICBpc0FwcGxpZWQ6IG9wdGlvbnMuZ2V0KCdpc0FwcGxpZWQnKSxcbiAgZmlsdGVyc1BvcHVwOiBvcHRpb25zLmdldCgnZmlsdGVyc1BvcHVwJykgfHwge30sXG59KTtcbm9wdGlvbnMuaG9vaygoY2hhbmdlcykgPT4ge1xuICBpZiAoJ2lzQXBwbGllZCcgaW4gY2hhbmdlcykge1xuICAgIG9wdGlvbnNEYXRhLmlzQXBwbGllZCA9IGNoYW5nZXMuaXNBcHBsaWVkO1xuICB9XG4gIGlmICgnZmlsdGVyc1BvcHVwJyBpbiBjaGFuZ2VzKSB7XG4gICAgb3B0aW9uc0RhdGEuZmlsdGVyc1BvcHVwID0ge1xuICAgICAgLi4ub3B0aW9uc0RhdGEuZmlsdGVyc1BvcHVwLFxuICAgICAgLi4uY2hhbmdlcy5maWx0ZXJzUG9wdXAsXG4gICAgfTtcbiAgfVxufSk7XG5cbmZ1bmN0aW9uIGNvbXBhcmVCeSguLi5rZXlzKSB7XG4gIHJldHVybiAoYSwgYikgPT4ge1xuICAgIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICAgIGNvbnN0IGthID0ga2V5KGEpO1xuICAgICAgY29uc3Qga2IgPSBrZXkoYik7XG4gICAgICBpZiAoa2EgPCBrYikgcmV0dXJuIC0xO1xuICAgICAgaWYgKGthID4ga2IpIHJldHVybiAxO1xuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBjb21wb25lbnRzOiB7XG4gICAgSWNvbixcbiAgICBUb29sdGlwLFxuICB9LFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzdG9yZSxcbiAgICAgIG9wdGlvbnM6IG9wdGlvbnNEYXRhLFxuICAgICAgYWN0aXZlTWVudTogJ3NjcmlwdHMnLFxuICAgICAgYWN0aXZlRXh0cmFzOiBudWxsLFxuICAgICAgZm9jdXNCdWc6IGZhbHNlLFxuICAgICAgbWVzc2FnZTogbnVsbCxcbiAgICAgIGZvY3VzZWRJdGVtOiBudWxsLFxuICAgICAgbmFtZTogTkFNRSxcbiAgICB9O1xuICB9LFxuICBjb21wdXRlZDoge1xuICAgIGFjdGl2ZUxpbmtzKCkge1xuICAgICAgY29uc3Qgc2NyaXB0ID0gdGhpcy5hY3RpdmVFeHRyYXMuZGF0YTtcbiAgICAgIGNvbnN0IHN1cHBvcnQgPSBnZXRTY3JpcHRTdXBwb3J0VXJsKHNjcmlwdCk7XG4gICAgICBjb25zdCBob21lID0gIXN1cHBvcnQgJiYgZ2V0U2NyaXB0SG9tZShzY3JpcHQpOyAvLyBub3Qgc2hvd2luZyBob21lcGFnZSBpZiBzdXBwb3J0VVJMIGV4aXN0c1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAgc3VwcG9ydCAmJiBbc3VwcG9ydCwgaTE4bignbWVudUZlZWRiYWNrJyldLFxuICAgICAgICBob21lICYmIFtob21lLCBpMThuKCdidXR0b25Ib21lJyldLFxuICAgICAgXS5maWx0ZXIoQm9vbGVhbik7XG4gICAgfSxcbiAgICBpbmplY3Rpb25TY29wZXMoKSB7XG4gICAgICBjb25zdCB7IHNvcnQsIGVuYWJsZWRGaXJzdCwgZ3JvdXBSdW5BdCwgaGlkZURpc2FibGVkIH0gPSB0aGlzLm9wdGlvbnMuZmlsdGVyc1BvcHVwO1xuICAgICAgY29uc3QgeyBpbmplY3RhYmxlIH0gPSBzdG9yZTtcbiAgICAgIGNvbnN0IGdyb3VwRGlzYWJsZWQgPSBoaWRlRGlzYWJsZWQgPT09ICdncm91cCc7XG4gICAgICByZXR1cm4gW1xuICAgICAgICBpbmplY3RhYmxlICYmIFsnc2NyaXB0cycsIGkxOG4oJ21lbnVNYXRjaGVkU2NyaXB0cycpLCBncm91cERpc2FibGVkIHx8IG51bGxdLFxuICAgICAgICBpbmplY3RhYmxlICYmIGdyb3VwRGlzYWJsZWQgJiYgWydkaXNhYmxlZCcsIGkxOG4oJ21lbnVNYXRjaGVkRGlzYWJsZWRTY3JpcHRzJyksIGZhbHNlXSxcbiAgICAgICAgWydmcmFtZVNjcmlwdHMnLCBpMThuKCdtZW51TWF0Y2hlZEZyYW1lU2NyaXB0cycpXSxcbiAgICAgIF1cbiAgICAgIC5maWx0ZXIoQm9vbGVhbilcbiAgICAgIC5tYXAoKFtuYW1lLCB0aXRsZSwgZ3JvdXBCeUVuYWJsZWRdKSA9PiB7XG4gICAgICAgIGxldCBsaXN0ID0gc3RvcmVbbmFtZV0gfHwgc3RvcmUuc2NyaXB0cztcbiAgICAgICAgaWYgKGdyb3VwQnlFbmFibGVkICE9IG51bGwpIHtcbiAgICAgICAgICBsaXN0ID0gbGlzdC5maWx0ZXIoc2NyaXB0ID0+ICFzY3JpcHQuY29uZmlnLmVuYWJsZWQgPT09ICFncm91cEJ5RW5hYmxlZCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbnVtVG90YWwgPSBsaXN0Lmxlbmd0aDtcbiAgICAgICAgY29uc3QgbnVtRW5hYmxlZCA9IGdyb3VwQnlFbmFibGVkID09IG51bGxcbiAgICAgICAgICA/IGxpc3QucmVkdWNlKChudW0sIHNjcmlwdCkgPT4gbnVtICsgc2NyaXB0LmNvbmZpZy5lbmFibGVkLCAwKVxuICAgICAgICAgIDogbnVtVG90YWw7XG4gICAgICAgIGlmIChoaWRlRGlzYWJsZWQgPT09ICdoaWRlJyB8fCBoaWRlRGlzYWJsZWQgPT09IHRydWUpIHtcbiAgICAgICAgICBsaXN0ID0gbGlzdC5maWx0ZXIoc2NyaXB0ID0+IHNjcmlwdC5jb25maWcuZW5hYmxlZCk7XG4gICAgICAgIH1cbiAgICAgICAgbGlzdCA9IGxpc3QubWFwKHNjcmlwdCA9PiB7XG4gICAgICAgICAgY29uc3Qgc2NyaXB0TmFtZSA9IGdldFNjcmlwdE5hbWUoc2NyaXB0KTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6IHNjcmlwdC5wcm9wcy5pZCxcbiAgICAgICAgICAgIG5hbWU6IHNjcmlwdE5hbWUsXG4gICAgICAgICAgICBkYXRhOiBzY3JpcHQsXG4gICAgICAgICAgICBrZXk6IGAke1xuICAgICAgICAgICAgICBlbmFibGVkRmlyc3QgJiYgKyFzY3JpcHQuY29uZmlnLmVuYWJsZWRcbiAgICAgICAgICAgIH0ke1xuICAgICAgICAgICAgICBzb3J0ID09PSAnYWxwaGEnXG4gICAgICAgICAgICAgICAgPyBzY3JpcHROYW1lLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgICAgICA6IGdyb3VwUnVuQXQgJiYgUlVOX0FUX09SREVSLmluZGV4T2YoZ2V0U2NyaXB0UnVuQXQoc2NyaXB0KSlcbiAgICAgICAgICAgIH0ke1xuICAgICAgICAgICAgICAxZTYgKyBzY3JpcHQucHJvcHMucG9zaXRpb25cbiAgICAgICAgICAgIH1gLFxuICAgICAgICAgICAgZXhjbHVkZXM6IG51bGwsXG4gICAgICAgICAgICB1cGQ6IG51bGwsXG4gICAgICAgICAgfTtcbiAgICAgICAgfSkuc29ydCgoYSwgYikgPT4gKGEua2V5IDwgYi5rZXkgPyAtMSA6IGEua2V5ID4gYi5rZXkpKTtcbiAgICAgICAgcmV0dXJuIG51bVRvdGFsICYmIHtcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgIGxpc3QsXG4gICAgICAgICAgdG90YWxzOiBudW1FbmFibGVkIDwgbnVtVG90YWxcbiAgICAgICAgICAgID8gYCR7bnVtRW5hYmxlZH0gLyAke251bVRvdGFsfWBcbiAgICAgICAgICAgIDogYCR7bnVtVG90YWx9YCxcbiAgICAgICAgfTtcbiAgICAgIH0pLmZpbHRlcihCb29sZWFuKTtcbiAgICB9LFxuICAgIGZhaWx1cmVSZWFzb24oKSB7XG4gICAgICByZXR1cm4gW1xuICAgICAgICAhc3RvcmUuaW5qZWN0YWJsZSAmJiAnbm9uaW5qZWN0YWJsZScsXG4gICAgICAgIHN0b3JlLmJsYWNrbGlzdGVkICYmICdibGFja2xpc3RlZCcsXG4gICAgICAgIC8vIHVuZGVmaW5lZCBtZWFucyB0aGUgZGF0YSBpc24ndCByZWFkeSB5ZXRcbiAgICAgICAgb3B0aW9uc0RhdGEuaXNBcHBsaWVkID09PSBmYWxzZSAmJiAnc2NyaXB0cy1kaXNhYmxlZCcsXG4gICAgICBdOjp0cnVlSm9pbignICcpO1xuICAgIH0sXG4gICAgZmFpbHVyZVJlYXNvblRleHQoKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICAhc3RvcmUuaW5qZWN0YWJsZSAmJiBpMThuKCdmYWlsdXJlUmVhc29uTm9uaW5qZWN0YWJsZScpXG4gICAgICAgIHx8IHN0b3JlLmJsYWNrbGlzdGVkICYmIGkxOG4oJ2ZhaWx1cmVSZWFzb25CbGFja2xpc3RlZCcpXG4gICAgICAgIHx8IG9wdGlvbnNEYXRhLmlzQXBwbGllZCA9PT0gZmFsc2UgJiYgaTE4bignbWVudVNjcmlwdERpc2FibGVkJylcbiAgICAgICAgfHwgJydcbiAgICAgICk7XG4gICAgfSxcbiAgICBmaW5kVXJscygpIHtcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gZW5jb2RlVVJJQ29tcG9uZW50KHN0b3JlLmRvbWFpbik7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBbYCR7aTE4bignbWVudUZpbmRTY3JpcHRzJyl9IChHRilgXTogYGh0dHBzOi8vZ3JlYXN5Zm9yay5vcmcvc2NyaXB0cy9ieS1zaXRlLyR7cXVlcnl9YCxcbiAgICAgICAgT1VKUzogYGh0dHBzOi8vb3BlbnVzZXJqcy5vcmcvP3E9JHtxdWVyeX1gLFxuICAgICAgfTtcbiAgICB9LFxuICAgIHRhYkluZGV4KCkge1xuICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlRXh0cmFzID8gLTEgOiAwO1xuICAgIH0sXG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBjYW5VcGRhdGU6IGdldFNjcmlwdFVwZGF0ZVVybCxcbiAgICB0b2dnbGVNZW51KG5hbWUpIHtcbiAgICAgIHRoaXMuYWN0aXZlTWVudSA9IHRoaXMuYWN0aXZlTWVudSA9PT0gbmFtZSA/IG51bGwgOiBuYW1lO1xuICAgIH0sXG4gICAgdG9nZ2xlRXh0cmFzKGl0ZW0sIGV2dCkge1xuICAgICAgdGhpcy5hY3RpdmVFeHRyYXMgPSB0aGlzLmFjdGl2ZUV4dHJhcyA9PT0gaXRlbSA/IG51bGwgOiBpdGVtO1xuICAgICAga2V5Ym9hcmRTZXJ2aWNlLnNldENvbnRleHQoJ2FjdGl2ZUV4dHJhcycsIHRoaXMuYWN0aXZlRXh0cmFzKTtcbiAgICAgIGlmICh0aGlzLmFjdGl2ZUV4dHJhcykge1xuICAgICAgICBpdGVtLmVsID0gZXZ0LnRhcmdldC5jbG9zZXN0KFNDUklQVF9DTFMpO1xuICAgICAgICB0aGlzLiRuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgY29uc3QgeyBleHRyYXNNZW51IH0gPSB0aGlzLiRyZWZzO1xuICAgICAgICAgIGV4dHJhc01lbnUuc3R5bGUudG9wID0gYCR7XG4gICAgICAgICAgICBNYXRoLm1pbih3aW5kb3cuaW5uZXJIZWlnaHQgLSBleHRyYXNNZW51LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCxcbiAgICAgICAgICAgICAgKGV2dC5jdXJyZW50VGFyZ2V0IHx8IGV2dC50YXJnZXQpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIDE2KVxuICAgICAgICAgIH1weGA7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgZ2V0U3ltYm9sQ2hlY2soYm9vbCkge1xuICAgICAgcmV0dXJuIGB0b2dnbGUtJHtib29sID8gJ29uJyA6ICdvZmYnfWA7XG4gICAgfSxcbiAgICBvblRvZ2dsZSgpIHtcbiAgICAgIG9wdGlvbnMuc2V0KCdpc0FwcGxpZWQnLCBvcHRpb25zRGF0YS5pc0FwcGxpZWQgPSAhb3B0aW9uc0RhdGEuaXNBcHBsaWVkKTtcbiAgICAgIHRoaXMuY2hlY2tSZWxvYWQoKTtcbiAgICB9LFxuICAgIG9uTWFuYWdlKCkge1xuICAgICAgc2VuZENtZERpcmVjdGx5KCdPcGVuRWRpdG9yJywgJycpLnRoZW4oY2xvc2UpO1xuICAgIH0sXG4gICAgb25PcGVuVXJsKGUpIHtcbiAgICAgIGNvbnN0IGVsID0gZS50YXJnZXQuY2xvc2VzdCgnYVtocmVmXVt0YXJnZXQ9X2JsYW5rXScpO1xuICAgICAgaWYgKCFlbCkgcmV0dXJuO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgc2VuZENtZERpcmVjdGx5KCdUYWJPcGVuJywgeyB1cmw6IGVsLmhyZWYgfSkudGhlbihjbG9zZSk7XG4gICAgfSxcbiAgICBvbkVkaXRTY3JpcHQoaXRlbSkge1xuICAgICAgc2VuZENtZERpcmVjdGx5KCdPcGVuRWRpdG9yJywgaXRlbS5kYXRhLnByb3BzLmlkKS50aGVuKGNsb3NlKTtcbiAgICB9LFxuICAgIG9uQ29tbWFuZChldnQpIHtcbiAgICAgIGNvbnN0IHsgdHlwZSwgY3VycmVudFRhcmdldDogZWwgfSA9IGV2dDtcbiAgICAgIGlmICh0eXBlID09PSAnbW91c2Vkb3duJykge1xuICAgICAgICBtb3VzZWRvd25FbGVtZW50ID0gZWw7XG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAna2V5ZG93bicgfHwgbW91c2Vkb3duRWxlbWVudCA9PT0gZWwpIHtcbiAgICAgICAgc2VuZFRhYkNtZChzdG9yZS5jdXJyZW50VGFiLmlkLCAnQ29tbWFuZCcsIHtcbiAgICAgICAgICAuLi5lbC5DTUQsXG4gICAgICAgICAgZXZ0OiBvYmplY3RQaWNrKGV2dCwgWyd0eXBlJywgJ2J1dHRvbicsICdzaGlmdEtleScsICdhbHRLZXknLCAnY3RybEtleScsICdtZXRhS2V5JyxcbiAgICAgICAgICAgICdrZXknLCAna2V5Q29kZScsICdjb2RlJ10pLFxuICAgICAgICB9KS50aGVuKGNsb3NlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIG9uVG9nZ2xlU2NyaXB0KGl0ZW0pIHtcbiAgICAgIGNvbnN0IHsgZGF0YSB9ID0gaXRlbTtcbiAgICAgIGNvbnN0IGVuYWJsZWQgPSAhZGF0YS5jb25maWcuZW5hYmxlZDtcbiAgICAgIHNlbmRDbWREaXJlY3RseSgnVXBkYXRlU2NyaXB0SW5mbycsIHtcbiAgICAgICAgaWQ6IGRhdGEucHJvcHMuaWQsXG4gICAgICAgIGNvbmZpZzogeyBlbmFibGVkIH0sXG4gICAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBkYXRhLmNvbmZpZy5lbmFibGVkID0gZW5hYmxlZDtcbiAgICAgICAgdGhpcy5jaGVja1JlbG9hZCgpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBjaGVja1JlbG9hZCgpIHtcbiAgICAgIGlmIChvcHRpb25zLmdldCgnYXV0b1JlbG9hZCcpKSB7XG4gICAgICAgIGJyb3dzZXIudGFicy5yZWxvYWQoc3RvcmUuY3VycmVudFRhYi5pZCk7XG4gICAgICAgIHN0b3JlLmlkTWFwID0ge307XG4gICAgICAgIHN0b3JlLnNjcmlwdHMubGVuZ3RoID0gMDtcbiAgICAgICAgc3RvcmUuZnJhbWVTY3JpcHRzLmxlbmd0aCA9IDA7XG4gICAgICAgIG11dGV4LmluaXQoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGFzeW5jIG9uQ3JlYXRlU2NyaXB0KCkge1xuICAgICAgc2VuZENtZERpcmVjdGx5KCdPcGVuRWRpdG9yJykudGhlbihjbG9zZSk7XG4gICAgfSxcbiAgICBhc3luYyBvbkluamVjdGlvbkZhaWx1cmVGaXgoKSB7XG4gICAgICAvLyBUT0RPOiBwcm9taXNpZnkgb3B0aW9ucy5zZXQsIHJlc29sdmUgb24gc3RvcmFnZSB3cml0ZSwgYXdhaXQgaXQgaW5zdGVhZCBvZiBtYWtlUGF1c2VcbiAgICAgIG9wdGlvbnMuc2V0KCdkZWZhdWx0SW5qZWN0SW50bycsIEFVVE8pO1xuICAgICAgYXdhaXQgbWFrZVBhdXNlKDEwMCk7XG4gICAgICBhd2FpdCBicm93c2VyLnRhYnMucmVsb2FkKCk7XG4gICAgICB3aW5kb3cuY2xvc2UoKTtcbiAgICB9LFxuICAgIG9uUmVtb3ZlU2NyaXB0KCkge1xuICAgICAgY29uc3QgeyBjb25maWcsIHByb3BzOiB7IGlkIH0gfSA9IHRoaXMuYWN0aXZlRXh0cmFzLmRhdGE7XG4gICAgICBjb25zdCByZW1vdmVkID0gKyFjb25maWcucmVtb3ZlZDtcbiAgICAgIGNvbmZpZy5yZW1vdmVkID0gcmVtb3ZlZDtcbiAgICAgIHNlbmRDbWREaXJlY3RseSgnTWFya1JlbW92ZWQnLCB7IGlkLCByZW1vdmVkIH0pO1xuICAgIH0sXG4gICAgYXN5bmMgb25VcGRhdGVTY3JpcHQoKSB7XG4gICAgICBjb25zdCBpdGVtID0gdGhpcy5hY3RpdmVFeHRyYXM7XG4gICAgICBjb25zdCBjaGsgPSBpMThuKCdtc2dDaGVja2luZ0ZvclVwZGF0ZScpO1xuICAgICAgaWYgKGl0ZW0udXBkICE9PSBjaGspIHtcbiAgICAgICAgaXRlbS51cGQgPSBjaGs7XG4gICAgICAgIGl0ZW0udXBkID0gYXdhaXQgc2VuZENtZERpcmVjdGx5KCdDaGVja1VwZGF0ZScsIGl0ZW0uZGF0YS5wcm9wcy5pZClcbiAgICAgICAgICA/IGkxOG4oJ21zZ1VwZGF0ZWQnKVxuICAgICAgICAgIDogaTE4bignbXNnTm9VcGRhdGUnKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGFzeW5jIG9uRXhjbHVkZSgpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmFjdGl2ZUV4dHJhcztcbiAgICAgIGNvbnN0IHsgZGF0YSB9ID0gaXRlbTtcbiAgICAgIGNvbnN0IHVybCA9IGRhdGEucGFnZVVybDtcbiAgICAgIGNvbnN0IHsgaG9zdCwgZG9tYWluIH0gPSBhd2FpdCBzZW5kQ21kRGlyZWN0bHkoJ0dldFRhYkRvbWFpbicsIHVybCk7XG4gICAgICBpdGVtLmV4Y2x1ZGVzID0gW1xuICAgICAgICBgJHt1cmwuc3BsaXQoJyMnKVswXX0qYCxcbiAgICAgICAgeyBob3N0LCBncm91cDogYCouJHtkb21haW59YCB9LFxuICAgICAgXTtcbiAgICAgIGF3YWl0IG1ha2VQYXVzZSgpOyAvLyAkbmV4dFRpY2sgcnVucyB0b28gZWFybHlcbiAgICAgIGl0ZW0uZWwucXVlcnlTZWxlY3RvcignaW5wdXQnKS5mb2N1cygpOyAvLyBub3QgdXNpbmcgJHJlZnMgYXMgbXVsdGlwbGUgaXRlbXMgbWF5IHNob3cgaW5wdXRzXG4gICAgfSxcbiAgICBvbkV4Y2x1ZGVDbG9zZShpdGVtKSB7XG4gICAgICBpdGVtLmV4Y2x1ZGVzID0gbnVsbDtcbiAgICAgIHRoaXMuZm9jdXMoaXRlbSk7XG4gICAgfSxcbiAgICBhc3luYyBvbkV4Y2x1ZGVTYXZlKGl0ZW0sIGJ0bikge1xuICAgICAgYXdhaXQgc2VuZENtZERpcmVjdGx5KCdVcGRhdGVTY3JpcHRJbmZvJywge1xuICAgICAgICBpZDogaXRlbS5kYXRhLnByb3BzLmlkLFxuICAgICAgICBjdXN0b206IHtcbiAgICAgICAgICBleGNsdWRlTWF0Y2g6IFtcbiAgICAgICAgICAgIC4uLml0ZW0uZGF0YS5jdXN0b20uZXhjbHVkZU1hdGNoIHx8IFtdLFxuICAgICAgICAgICAgLi4uW2J0biB8fCBpdGVtLmV4Y2x1ZGVzWzBdLnRyaW0oKV0uZmlsdGVyKEJvb2xlYW4pLFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIHRoaXMub25FeGNsdWRlQ2xvc2UoaXRlbSk7XG4gICAgICB0aGlzLmNoZWNrUmVsb2FkKCk7XG4gICAgfSxcbiAgICBuYXZpZ2F0ZShkaXIpIHtcbiAgICAgIGNvbnN0IHsgYWN0aXZlRWxlbWVudCB9ID0gZG9jdW1lbnQ7XG4gICAgICBjb25zdCBpdGVtcyA9IEFycmF5LmZyb20odGhpcy4kZWwucXVlcnlTZWxlY3RvckFsbCgnW3RhYmluZGV4PVwiMFwiXScpKVxuICAgICAgLm1hcChlbCA9PiAoe1xuICAgICAgICBlbCxcbiAgICAgICAgcmVjdDogZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICB9KSlcbiAgICAgIC5maWx0ZXIoKHsgcmVjdCB9KSA9PiByZWN0LndpZHRoICYmIHJlY3QuaGVpZ2h0KTtcbiAgICAgIGl0ZW1zLnNvcnQoY29tcGFyZUJ5KGl0ZW0gPT4gaXRlbS5yZWN0LnRvcCwgaXRlbSA9PiBpdGVtLnJlY3QubGVmdCkpO1xuICAgICAgbGV0IGluZGV4ID0gaXRlbXMuZmluZEluZGV4KCh7IGVsIH0pID0+IGVsID09PSBhY3RpdmVFbGVtZW50KTtcbiAgICAgIGNvbnN0IGZpbmRJdGVtSW5kZXggPSAoc3RlcCwgdGVzdCkgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gaW5kZXggKyBzdGVwOyBpID49IDAgJiYgaSA8IGl0ZW1zLmxlbmd0aDsgaSArPSBzdGVwKSB7XG4gICAgICAgICAgaWYgKHRlc3QoaXRlbXNbaW5kZXhdLCBpdGVtc1tpXSkpIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICBpbmRleCA9IDA7XG4gICAgICB9IGVsc2UgaWYgKGRpciA9PT0gJ3UnIHx8IGRpciA9PT0gJ2QnKSB7XG4gICAgICAgIGNvbnN0IHN0ZXAgPSBkaXIgPT09ICd1JyA/IC0xIDogMTtcbiAgICAgICAgaW5kZXggPSBmaW5kSXRlbUluZGV4KHN0ZXAsIChhLCBiKSA9PiAoYS5yZWN0LnRvcCAtIGIucmVjdC50b3ApICogc3RlcCA8IDApO1xuICAgICAgICBpZiAoZGlyID09PSAndScpIHtcbiAgICAgICAgICB3aGlsZSAoaW5kZXggPiAwICYmIGl0ZW1zW2luZGV4IC0gMV0ucmVjdC50b3AgPT09IGl0ZW1zW2luZGV4XS5yZWN0LnRvcCkgaW5kZXggLT0gMTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgc3RlcCA9IGRpciA9PT0gJ2wnID8gLTEgOiAxO1xuICAgICAgICBpbmRleCA9IGZpbmRJdGVtSW5kZXgoc3RlcCwgKGEsIGIpID0+IChhLnJlY3QubGVmdCAtIGIucmVjdC5sZWZ0KSAqIHN0ZXAgPCAwKTtcbiAgICAgIH1cbiAgICAgIGl0ZW1zW2luZGV4XT8uZWwuZm9jdXMoKTtcbiAgICB9LFxuICAgIGZvY3VzKGl0ZW0pIHtcbiAgICAgIGl0ZW0/LmVsPy5xdWVyeVNlbGVjdG9yKCcubWVudS1hcmVhJyk/LmZvY3VzKCk7XG4gICAgfSxcbiAgICBkZWxlZ2F0ZU1vdXNlRW50ZXIoZSkge1xuICAgICAgY29uc3QgeyB0YXJnZXQgfSA9IGU7XG4gICAgICBpZiAodGFyZ2V0LnRhYkluZGV4ID49IDApIHRhcmdldC5mb2N1cygpO1xuICAgIH0sXG4gICAgZGVsZWdhdGVNb3VzZUxlYXZlKGUpIHtcbiAgICAgIGNvbnN0IHsgdGFyZ2V0IH0gPSBlO1xuICAgICAgaWYgKHRhcmdldCA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJiAhaXNJbnB1dCh0YXJnZXQpKSB0YXJnZXQuYmx1cigpO1xuICAgIH0sXG4gICAgdXBkYXRlTWVzc2FnZSgpIHtcbiAgICAgIHRoaXMubWVzc2FnZSA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ/LmRhdGFzZXQubWVzc2FnZSB8fCAnJztcbiAgICB9LFxuICAgIHNob3dCdXR0b25zKGl0ZW0pIHtcbiAgICAgIHJldHVybiB0aGlzLmFjdGl2ZUV4dHJhcz8uaWQgPT09IGl0ZW0uaWQgfHwgdGhpcy5mb2N1c2VkSXRlbT8uaWQgPT09IGl0ZW0uaWQgfHwgdGhpcy5mb2N1c0J1ZztcbiAgICB9LFxuICB9LFxuICBtb3VudGVkKCkge1xuICAgIGZvY3VzTWUodGhpcy4kZWwpO1xuICAgIGtleWJvYXJkU2VydmljZS5lbmFibGUoKTtcbiAgICAvLyBpbm5lckhlaWdodCBtYXkgYmUgYmlnZ2VyIHRoYW4gNjAwcHggaW4gYSBtb2JpbGUgYnJvd3NlciB3aGljaCBkaXNwbGF5cyB0aGUgcG9wdXAgYXMgYSBmdWxsc2NyZWVuIHBhZ2VcbiAgICB0aGlzLiRlbC5zdHlsZS5tYXhIZWlnaHQgPSBNYXRoLm1pbihNYXRoLm1heCg2MDAsIGlubmVySGVpZ2h0KSwgc2NyZWVuLmF2YWlsSGVpZ2h0IC0gd2luZG93LnNjcmVlblkgLSA4KSArICdweCc7XG4gICAgdGhpcy5kaXNwb3NlTGlzdCA9IFtcbiAgICAgIGtleWJvYXJkU2VydmljZS5yZWdpc3RlcignZXNjYXBlJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5hY3RpdmVFeHRyYXM7XG4gICAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgICAgdGhpcy50b2dnbGVFeHRyYXMobnVsbCk7XG4gICAgICAgICAgdGhpcy5mb2N1cyhpdGVtKTtcbiAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50Py52YWx1ZSkge1xuICAgICAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1cigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdpbmRvdy5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIC4uLklTX0ZJUkVGT1ggPyBbXG4gICAgICAgIGtleWJvYXJkU2VydmljZS5yZWdpc3RlcigndGFiJywgKCkgPT4ge1xuICAgICAgICAgIGhhbmRsZVRhYk5hdmlnYXRpb24oMSk7XG4gICAgICAgIH0pLFxuICAgICAgICBrZXlib2FyZFNlcnZpY2UucmVnaXN0ZXIoJ3MtdGFiJywgKCkgPT4ge1xuICAgICAgICAgIGhhbmRsZVRhYk5hdmlnYXRpb24oLTEpO1xuICAgICAgICB9KSxcbiAgICAgIF0gOiBbXSxcbiAgICAgIC4uLlsndXAnLCAnZG93bicsICdsZWZ0JywgJ3JpZ2h0J10ubWFwKGtleSA9PiAoXG4gICAgICAgIGtleWJvYXJkU2VydmljZS5yZWdpc3RlcihrZXksXG4gICAgICAgICAgdGhpcy5uYXZpZ2F0ZS5iaW5kKHRoaXMsIGtleVswXSksXG4gICAgICAgICAgeyBjb25kaXRpb246ICchaW5wdXRGb2N1cycgfSlcbiAgICAgICkpLFxuICAgICAga2V5Ym9hcmRTZXJ2aWNlLnJlZ2lzdGVyKCdlJywgKCkgPT4ge1xuICAgICAgICB0aGlzLm9uRWRpdFNjcmlwdCh0aGlzLmZvY3VzZWRJdGVtKTtcbiAgICAgIH0sIHtcbiAgICAgICAgY29uZGl0aW9uOiAnIWlucHV0Rm9jdXMnLFxuICAgICAgfSksXG4gICAgXTtcbiAgfSxcbiAgYWN0aXZhdGVkKCkge1xuICAgIC8vIGlzc3VlICMxNTIwOiBGaXJlZm94ICsgV2F5bGFuZCBkb2Vzbid0IGF1dG9mb2N1cyB0aGUgcG9wdXAgc28gQ1NTIGhvdmVyIGRvZXNuJ3Qgd29ya1xuICAgIHRoaXMuZm9jdXNCdWcgPSAhZG9jdW1lbnQuaGFzRm9jdXMoKTtcbiAgfSxcbiAgYmVmb3JlVW5tb3VudCgpIHtcbiAgICBrZXlib2FyZFNlcnZpY2UuZGlzYWJsZSgpO1xuICAgIHRoaXMuZGlzcG9zZUxpc3Q/LmZvckVhY2goZGlzcG9zZSA9PiB7IGRpc3Bvc2UoKTsgfSk7XG4gIH0sXG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzcmM9XCIuLi9zdHlsZS5jc3NcIj48L3N0eWxlPlxuIiwiaW1wb3J0ICdAL2NvbW1vbi9icm93c2VyJztcbmltcG9ydCB7IHNlbmRDbWREaXJlY3RseSB9IGZyb20gJ0AvY29tbW9uJztcbmltcG9ydCB7IElOSkVDVEFCTEVfVEFCX1VSTF9SRSB9IGZyb20gJ0AvY29tbW9uL2NvbnN0cyc7XG5pbXBvcnQgaGFuZGxlcnMgZnJvbSAnQC9jb21tb24vaGFuZGxlcnMnO1xuaW1wb3J0IHsgbG9hZFNjcmlwdEljb24gfSBmcm9tICdAL2NvbW1vbi9sb2FkLXNjcmlwdC1pY29uJztcbmltcG9ydCB7IGZvckVhY2hWYWx1ZSwgbWFwRW50cnkgfSBmcm9tICdAL2NvbW1vbi9vYmplY3QnO1xuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAnQC9jb21tb24vdWknO1xuaW1wb3J0ICdAL2NvbW1vbi91aS9zdHlsZSc7XG5pbXBvcnQgQXBwIGZyb20gJy4vdmlld3MvYXBwJztcbmltcG9ydCB7IG11dGV4LCBzdG9yZSB9IGZyb20gJy4vdXRpbHMnO1xuXG5tdXRleC5pbml0KCk7XG5cbnJlbmRlcihBcHApO1xuXG5PYmplY3QuYXNzaWduKGhhbmRsZXJzLCB7XG4gIGFzeW5jIFNldFBvcHVwKGRhdGEsIHsgZnJhbWVJZCwgdGFiLCB1cmwgfSkge1xuICAgIC8vIE5vIGB0YWJgIGlzIGEgRkYgYnVnIHdoZW4gaXQgc2VuZHMgbWVzc2FnZXMgZnJvbSByZW1vdmVkIGlmcmFtZXNcbiAgICBpZiAoIXRhYiB8fCBzdG9yZS5jdXJyZW50VGFiICYmIHN0b3JlLmN1cnJlbnRUYWIuaWQgIT09IHRhYi5pZCkgcmV0dXJuO1xuICAgIC8qIFNldFBvcHVwIGZyb20gYSBzdWItZnJhbWUgbWF5IGNvbWUgZmlyc3Qgc28gd2UgbmVlZCB0byB3YWl0IGZvciB0aGUgbWFpbiBwYWdlXG4gICAgICogYmVjYXVzZSB3ZSBvbmx5IHNob3cgdGhlIGlmcmFtZSBtZW51IGZvciB1bmlxdWUgc2NyaXB0cyB0aGF0IGRvbid0IHJ1biBpbiB0aGUgbWFpbiBwYWdlICovXG4gICAgY29uc3QgaXNUb3AgPSBmcmFtZUlkID09PSAwO1xuICAgIGlmICghaXNUb3ApIGF3YWl0IG11dGV4LnJlYWR5O1xuICAgIGVsc2Uge1xuICAgICAgc3RvcmUuY29tbWFuZHMgPSBkYXRhLm1lbnVzOjptYXBFbnRyeShPYmplY3Qua2V5cyk7XG4gICAgICAvLyBleGVjdXRlU2NyaXB0IG1heSg/KSBmYWlsIGluIGEgZGlzY2FyZGVkIG9yIGxhenktbG9hZGVkIHRhYiwgd2hpY2ggaXMgYWN0dWFsbHkgaW5qZWN0YWJsZVxuICAgICAgc3RvcmUuaW5qZWN0YWJsZSA9IHRydWU7XG4gICAgfVxuICAgIGNvbnN0IGlkTWFwQWxsRnJhbWVzID0gc3RvcmUuaWRNYXA7XG4gICAgY29uc3QgaWRNYXBNYWluID0gaWRNYXBBbGxGcmFtZXNbMF0gfHwgKGlkTWFwQWxsRnJhbWVzWzBdID0ge30pO1xuICAgIGNvbnN0IGlkTWFwT2xkID0gaWRNYXBBbGxGcmFtZXNbZnJhbWVJZF0gfHwgKGlkTWFwQWxsRnJhbWVzW2ZyYW1lSWRdID0ge30pO1xuICAgIGNvbnN0IGlkTWFwID0gZGF0YVtJRFNdOjptYXBFbnRyeShudWxsLCAoaWQsIHZhbCkgPT4gdmFsICE9PSBpZE1hcE9sZFtpZF0gJiYgaWQpO1xuICAgIGNvbnN0IGlkcyA9IE9iamVjdC5rZXlzKGlkTWFwKS5tYXAoTnVtYmVyKTtcbiAgICBpZiAoaWRzLmxlbmd0aCkge1xuICAgICAgT2JqZWN0LmFzc2lnbihpZE1hcE9sZCwgaWRNYXApO1xuICAgICAgLy8gZnJhbWVTY3JpcHRzIG1heSBiZSBhcHBlbmRlZCBtdWx0aXBsZSB0aW1lcyBpZiBpZnJhbWVzIGhhdmUgdW5pcXVlIHNjcmlwdHNcbiAgICAgIGNvbnN0IHNjb3BlID0gc3RvcmVbaXNUb3AgPyBTQ1JJUFRTIDogJ2ZyYW1lU2NyaXB0cyddO1xuICAgICAgY29uc3QgbWV0YXMgPSBkYXRhW1NDUklQVFNdPy5maWx0ZXIoKHsgcHJvcHM6IHsgaWQgfSB9KSA9PiBpZHMuaW5jbHVkZXMoaWQpKVxuICAgICAgICB8fCAoT2JqZWN0LmFzc2lnbihkYXRhLCBhd2FpdCBzZW5kQ21kRGlyZWN0bHkoJ0dldERhdGEnLCB7IGlkcyB9KSkpW1NDUklQVFNdO1xuICAgICAgbWV0YXMuZm9yRWFjaChzY3JpcHQgPT4ge1xuICAgICAgICBsb2FkU2NyaXB0SWNvbihzY3JpcHQsIGRhdGEpO1xuICAgICAgICBjb25zdCB7IGlkIH0gPSBzY3JpcHQucHJvcHM7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gaWRNYXBbaWRdO1xuICAgICAgICBjb25zdCBiYWRSZWFsbSA9IHN0YXRlID09PSBJRF9CQURfUkVBTE07XG4gICAgICAgIGNvbnN0IHJlbmRlcmVkU2NyaXB0ID0gc2NvcGUuZmluZCgoeyBwcm9wcyB9KSA9PiBwcm9wcy5pZCA9PT0gaWQpO1xuICAgICAgICBpZiAocmVuZGVyZWRTY3JpcHQpIHNjcmlwdCA9IHJlbmRlcmVkU2NyaXB0O1xuICAgICAgICBlbHNlIGlmIChpc1RvcCB8fCAhKGlkIGluIGlkTWFwTWFpbikpIHtcbiAgICAgICAgICBzY29wZS5wdXNoKHNjcmlwdCk7XG4gICAgICAgICAgaWYgKGlzVG9wKSB7IC8vIHJlbW92aW5nIHNjcmlwdCBmcm9tIGZyYW1lU2NyaXB0cyBpZiBpdCByYW4gdGhlcmUgYmVmb3JlIHRoZSBtYWluIGZyYW1lXG4gICAgICAgICAgICBjb25zdCB7IGZyYW1lU2NyaXB0cyB9ID0gc3RvcmU7XG4gICAgICAgICAgICBjb25zdCBpID0gZnJhbWVTY3JpcHRzLmZpbmRJbmRleCgoeyBwcm9wcyB9KSA9PiBwcm9wcy5pZCA9PT0gaWQpO1xuICAgICAgICAgICAgaWYgKGkgPj0gMCkgZnJhbWVTY3JpcHRzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2NyaXB0LnJ1bnMgPSBzdGF0ZSA9PT0gQ09OVEVOVCB8fCBzdGF0ZSA9PT0gUEFHRTtcbiAgICAgICAgc2NyaXB0LnBhZ2VVcmwgPSB1cmw7IC8vIGVhY2ggZnJhbWUgaGFzIGl0cyBvd24gVVJMXG4gICAgICAgIHNjcmlwdC5mYWlsZWQgPSBiYWRSZWFsbSB8fCBzdGF0ZSA9PT0gSURfSU5KRUNUSU5HO1xuICAgICAgICBzY3JpcHQuc3ludGF4ID0gc3RhdGUgPT09IElEX0lOSkVDVElORztcbiAgICAgICAgaWYgKGJhZFJlYWxtICYmICFzdG9yZS5pbmplY3Rpb25GYWlsdXJlKSB7XG4gICAgICAgICAgc3RvcmUuaW5qZWN0aW9uRmFpbHVyZSA9IHsgZml4YWJsZTogZGF0YVtJTkpFQ1RfSU5UT10gPT09IFBBR0UgfTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChpc1RvcCkgbXV0ZXgucmVzb2x2ZSgpOyAvLyByZXNvbHZpbmcgYXQgdGhlIGVuZCBhZnRlciBhbGwgYGF3YWl0YCBhYm92ZSBhcmUgc2V0dGxlZFxuICB9LFxufSk7XG5cbnNlbmRDbWREaXJlY3RseSgnQ2FjaGVQb3AnLCAnU2V0UG9wdXAnKS50aGVuKChkYXRhKSA9PiB7XG4gIGRhdGE6OmZvckVhY2hWYWx1ZSh2YWwgPT4gaGFuZGxlcnMuU2V0UG9wdXAoLi4udmFsKSk7XG59KTtcblxuLyogU2luY2UgbmV3IENocm9tZSBwcmludHMgYSB3YXJuaW5nIHdoZW4gOjotd2Via2l0LWRldGFpbHMtbWFya2VyIGlzIHVzZWQsXG4gKiB3ZSBhZGQgaXQgb25seSBmb3Igb2xkIENocm9tZSwgd2hpY2ggaXMgZGV0ZWN0ZWQgdmlhIGZlYXR1cmUgYWRkZWQgaW4gODkuICovXG5pZiAoIUNTUy5zdXBwb3J0cz8uKCdsaXN0LXN0eWxlLXR5cGUnLCAnZGlzY2xvc3VyZS1vcGVuJykpIHtcbiAgZG9jdW1lbnQuc3R5bGVTaGVldHNbMF0uaW5zZXJ0UnVsZSgnLmV4Y2x1ZGVzLW1lbnUgOjotd2Via2l0LWRldGFpbHMtbWFya2VyIHtkaXNwbGF5Om5vbmV9Jyk7XG59XG5cbnNlbmRDbWREaXJlY3RseSgnR2V0VGFiRG9tYWluJykudGhlbihhc3luYyAoeyB0YWIsIGRvbWFpbiB9KSA9PiB7XG4gIHN0b3JlLmN1cnJlbnRUYWIgPSB0YWI7XG4gIHN0b3JlLmRvbWFpbiA9IGRvbWFpbjtcbiAgYnJvd3Nlci5ydW50aW1lLmNvbm5lY3QoeyBuYW1lOiBgJHt0YWIuaWR9YCB9KTtcbiAgaWYgKCFJTkpFQ1RBQkxFX1RBQl9VUkxfUkUudGVzdCh0YWIudXJsKSAvLyBleGVjdXRlU2NyaXB0IHJ1bnMgY29kZSBpbiBvd24gcGFnZXMgaW4gRkZcbiAgfHwgIWF3YWl0IGJyb3dzZXIudGFicy5leGVjdXRlU2NyaXB0KHsgY29kZTogJzEnLCBbUlVOX0FUXTogJ2RvY3VtZW50X3N0YXJ0JyB9KS5jYXRjaCgoKSA9PiBbXSkpIHtcbiAgICBzdG9yZS5pbmplY3RhYmxlID0gZmFsc2U7XG4gICAgbXV0ZXgucmVzb2x2ZSgpO1xuICB9IGVsc2Uge1xuICAgIHN0b3JlLmJsYWNrbGlzdGVkID0gYXdhaXQgc2VuZENtZERpcmVjdGx5KCdUZXN0QmxhY2tsaXN0JywgdGFiLnVybCk7XG4gIH1cbn0pO1xuIiwiaW1wb3J0IHsgcmVhY3RpdmUgfSBmcm9tICd2dWUnO1xuXG5leHBvcnQgY29uc3Qgc3RvcmUgPSByZWFjdGl2ZSh7XG4gIHNjcmlwdHM6IFtdLFxuICBmcmFtZVNjcmlwdHM6IFtdLFxuICBpZE1hcDoge30sXG4gIGNvbW1hbmRzOiBbXSxcbiAgZG9tYWluOiAnJyxcbiAgaW5qZWN0aW9uRmFpbHVyZTogbnVsbCxcbiAgaW5qZWN0YWJsZTogdHJ1ZSxcbiAgYmxhY2tsaXN0ZWQ6IGZhbHNlLFxufSk7XG5cbmV4cG9ydCBjb25zdCBtdXRleCA9IHtcbiAgaW5pdChkZWxheSA9IDEwMCkge1xuICAgIHRoaXMucmVhZHkgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHRoaXMucmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICAvLyBwYWdlcyBsaWtlIENocm9tZSBXZWIgU3RvcmUgbWF5IGZvcmJpZCBpbmplY3Rpb24gaW4gbWFpbiBwYWdlIHNvIHdlIG5lZWQgYSB0aW1lb3V0XG4gICAgICBzZXRUaW1lb3V0KHJlc29sdmUsIGRlbGF5KTtcbiAgICB9KTtcbiAgfSxcbn07XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfTk9fU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL25vU291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX05PX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiYm9keSB7XFxuICB3aWR0aDogMzIwcHg7XFxuICBtYXgtd2lkdGg6IDEwMCU7XFxuICAvKiBMYXRlc3QgQ2hyb21lIHJlbmRlcnMgYW4gZXh0cmEgYmxhbmsgZm9yIGEgbm9uZXhpc3RlbnQgc2Nyb2xsYmFyICovXFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgYmFja2dyb3VuZDogdmFyKC0tZmlsbC0wLTUpO1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDM2MHB4KSB7Ym9keSB7XFxuICAgIHdpZHRoOiAxMDAlXFxufVxcbn1cXG5hLFxcbiAgYTpmb2N1cyB7XFxuICAgIGNvbG9yOiBpbmhlcml0O1xcbn1cXG4ucGFnZS1wb3B1cCB7XFxuICAvKiBoYXJkY29kZWQgcG9wdXAgaGVpZ2h0IGluIENocm9tZSAqL1xcbiAgbWF4LWhlaWdodDogNjAwcHg7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG4ucGFnZS1wb3B1cCAuaW5jb2duaXRvIHtcXG4gICAgcGFkZGluZzogOHB4IDhweCAwIDQ2cHg7XFxufVxcbmZvb3RlciB7XFxuICBoZWlnaHQ6IDQwcHg7XFxuICBsaW5lLWhlaWdodDogNDBweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMTJweDtcXG4gIGNvbG9yOiB2YXIoLS1maWxsLTYpO1xcbn1cXG4ubG9nbyB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBtYXJnaW46IDAgN3B4O1xcbn1cXG4ubG9nbyBpbWcge1xcbiAgICB3aWR0aDogMzJweDtcXG59XFxuLmxvZ28uZGlzYWJsZWQgPiBpbWcge1xcbiAgICBvcGFjaXR5OiAuNTtcXG59XFxuLm1lbnUtYXJlYSB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5tZW51LWFyZWE6aG92ZXIsXFxuICAubWVudS1hcmVhOmZvY3VzIHtcXG4gICAgYmFja2dyb3VuZDogY29ybmZsb3dlcmJsdWU7XFxuICAgIGNvbG9yOiB2YXIoLS1iZyk7XFxufVxcbkBtZWRpYSAocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspIHtcXG4ubWVudS1hcmVhOmhvdmVyLFxcbiAgLm1lbnUtYXJlYTpmb2N1cyB7XFxuICAgICAgYmFja2dyb3VuZDogIzQwNGM1YztcXG4gICAgICBjb2xvcjogdmFyKC0tZmlsbC0xNSlcXG59XFxufVxcbi5zY3JpcHQ6bm90KC5kaXNhYmxlZCk6bm90KC5ydW5zKSAubWVudS1hcmVhIC5zY3JpcHQtbmFtZSxcXG4gIC5kaXNhYmxlZDpub3QoLnJ1bnMpID4gLm1lbnUtYXJlYSB7XFxuICAgIGNvbG9yOiB2YXIoLS1maWxsLTgpO1xcbn1cXG4uc2NyaXB0Om5vdCguZGlzYWJsZWQpOm5vdCgucnVucykgLm1lbnUtYXJlYSAuc2NyaXB0LW5hbWU6aG92ZXIsXFxuICAgIC5zY3JpcHQ6bm90KC5kaXNhYmxlZCk6bm90KC5ydW5zKSAubWVudS1hcmVhIC5zY3JpcHQtbmFtZTpmb2N1cyxcXG4gICAgLmRpc2FibGVkOm5vdCgucnVucykgPiAubWVudS1hcmVhOmhvdmVyLFxcbiAgICAuZGlzYWJsZWQ6bm90KC5ydW5zKSA+IC5tZW51LWFyZWE6Zm9jdXMge1xcbiAgICAgIGNvbG9yOiB2YXIoLS1maWxsLTIpO1xcbn1cXG4uZXh0LW5hbWUuZGlzYWJsZWQge1xcbiAgICBjb2xvcjogdmFyKC0tZmlsbC04KTtcXG59XFxuLnNjcmlwdC1pY29uOm5vdChbc3JjXSkge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbn1cXG4uc2NyaXB0LWljb24ge1xcbiAgbWF4LXdpZHRoOiAxOHB4O1xcbiAgbWF4LWhlaWdodDogMThweDtcXG4gIG1hcmdpbi1sZWZ0OiAycHg7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxufVxcbi5zY3JpcHQtaWNvbiArIC5pY29uIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDIycHg7XFxuICAgIG1hcmdpbi1yaWdodDogMTBweDtcXG59XFxuLm1lbnUtYnV0dG9ucyB7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgcGFkZGluZzogOHB4IDhweCA4cHggMDtcXG4gIGJhY2tncm91bmQ6IHZhcigtLWJnKTtcXG59XFxuLm1lbnUtYnV0dG9ucyA+IC5tZW51LWFyZWEge1xcbiAgICBwYWRkaW5nOiA4cHg7XFxufVxcbi5tZW51LWJ1dHRvbnMgLmljb24ge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgd2lkdGg6IDIwcHg7XFxuICAgIGhlaWdodDogMjBweDtcXG59XFxuLm1lbnUge1xcbiAgYmFja2dyb3VuZDogdmFyKC0tYmcpO1xcbn1cXG4ubWVudSwgLm1lbnU6bm90KC5leHBhbmQpICsgZm9vdGVyIHtcXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHZhcigtLWZpbGwtNCk7XFxufVxcbi5tZW51LWl0ZW0ge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIG1pbi1oZWlnaHQ6IDJyZW07XFxuICAgIHBhZGRpbmctbGVmdDogMTRweDtcXG4gICAgcGFkZGluZy1yaWdodDogMTRweDtcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG59XFxuLnN1Ym1lbnUgLm1lbnUtaXRlbSB7XFxuICAgICAgdGV4dC1hbGlnbjogbGVmdDtcXG59XFxuLm1lbnUtaXRlbSAuaWNvbiB7XFxuICAgICAgZmxleDogMCAwIDE0cHg7XFxufVxcbi5tZW51LWl0ZW0gLmljb24uaWNvbi1jb2xsYXBzZSB7XFxuICAgICAgICBmbGV4OiAwIDAgMTZweDtcXG4gICAgICAgIHdpZHRoOiAxNnB4O1xcbiAgICAgICAgaGVpZ2h0OiAxNnB4O1xcbn1cXG4ubWVudS1pdGVtID4gLmljb246Zmlyc3QtY2hpbGQge1xcbiAgICAgIG1hcmdpbi1yaWdodDogMTBweDtcXG59XFxuLm1lbnUtaXRlbSA+IC5mbGV4LWF1dG8ge1xcbiAgICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgICAgYWxpZ24tc2VsZjogc3RyZXRjaDtcXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG4ubWVudS1pdGVtID4gLmZsZXgtYXV0bzpsYXN0LWNoaWxkIHtcXG4gICAgICAgIHBhZGRpbmctcmlnaHQ6IDE0cHg7XFxufVxcbi5tZW51LWl0ZW0gPiAuZmxleC0xIHtcXG4gICAgICBwYWRkaW5nLXJpZ2h0OiAycmVtO1xcbn1cXG4uZmFpbGVkIC5tZW51LWl0ZW0ge1xcbiAgICAgIHRleHQtZGVjb3JhdGlvbjogbGluZS10aHJvdWdoIHJlZDtcXG59XFxuLnJlbW92ZWQgLm1lbnUtaXRlbSB7XFxuICAgICAgdGV4dC1kZWNvcmF0aW9uOiBsaW5lLXRocm91Z2g7XFxufVxcbi5tZW51LWZpbmQge1xcbiAgICBwYWRkaW5nLWxlZnQ6IDA7XFxuICAgIGN1cnNvcjogZGVmYXVsdDtcXG59XFxuLm1lbnUtZmluZCBhIHtcXG4gICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgICAgYWxpZ24tc2VsZjogc3RyZXRjaDtcXG59XFxuLm1lbnUtZmluZCAuaWNvbiB7XFxuICAgICAgZmxleC1iYXNpczogMTZweDtcXG4gICAgICB3aWR0aDogMTZweDtcXG4gICAgICBoZWlnaHQ6IDE2cHg7XFxuICAgICAgbWFyZ2luOiAwIDEwcHggMCAyMHB4O1xcbn1cXG4ubWVudS1ncm91cCB7XFxuICAgIHBhZGRpbmctbGVmdDogMjBweDtcXG4gICAgY29sb3I6ICM0YTc3OTI7XFxufVxcbkBtZWRpYSAocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspIHtcXG4ubWVudS1ncm91cCB7XFxuICAgICAgY29sb3I6ICNlZWVcXG59XFxufVxcbi5tZW51LWdyb3VwIFtkYXRhLXRvdGFsc106OmFmdGVyIHtcXG4gICAgICBjb250ZW50OiBcXFwiOiBcXFwiIGF0dHIoZGF0YS10b3RhbHMpO1xcbn1cXG4ubWVudS5leHBhbmQge1xcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xcbn1cXG4ubWVudS5leHBhbmQgPiAuc3VibWVudSB7XFxuICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1maWxsLTQpO1xcbn1cXG4ubWVudS5leHBhbmQgLmljb24tY29sbGFwc2Uge1xcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcXG59XFxuLm1lbnUuZXhwYW5kID4gLm1lbnUtZ3JvdXAge1xcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG4uc3VibWVudSB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgbWluLWhlaWdodDogMnJlbTtcXG4gIG92ZXJmbG93LXk6IGF1dG87XFxuICBiYWNrZ3JvdW5kOiB2YXIoLS1iZyk7XFxuICBib3JkZXItdG9wOiAxcHggZGFzaGVkIHZhcigtLWZpbGwtMyk7XFxufVxcbi5zdWJtZW51ID4gKiB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuLnN1Ym1lbnUgPiAqIC5tZW51LWl0ZW0ge1xcbiAgICAgIHBhZGRpbmctbGVmdDogMDtcXG59XFxuLnN1Ym1lbnUtYnV0dG9ucyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAwO1xcbiAgICByaWdodDogMDtcXG59XFxuLnRvdWNoIC5zdWJtZW51LWJ1dHRvbnMge1xcbiAgICAgIGRpc3BsYXk6IGZsZXggIWltcG9ydGFudDtcXG59XFxuLnN1Ym1lbnUtYnV0dG9uIHtcXG4gICAgcGFkZGluZzogLjVyZW07XFxuICAgIGJhY2tncm91bmQ6IHZhcigtLWJnKTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG4uc3VibWVudS1idXR0b246Zm9jdXMge1xcbiAgICAgIGNvbG9yOiB2YXIoLS1iZyk7XFxuICAgICAgYmFja2dyb3VuZDogY29ybmZsb3dlcmJsdWU7XFxufVxcbi5tZW51LWl0ZW06aG92ZXIgKyAuc3VibWVudS1idXR0b25zIC5zdWJtZW51LWJ1dHRvbjpub3QoOmZvY3VzKSB7XFxuICAgICAgYmFja2dyb3VuZDogI2EwYzFmZDtcXG59XFxuQG1lZGlhIChwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyaykge1xcbi5tZW51LWl0ZW06aG92ZXIgKyAuc3VibWVudS1idXR0b25zIC5zdWJtZW51LWJ1dHRvbjpub3QoOmZvY3VzKSB7XFxuICAgICAgICBiYWNrZ3JvdW5kOiAjNWI2OTc5XFxufVxcbn1cXG4uc3VibWVudS1idXR0b24gLmljb24ge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG4uc3VibWVudS1jb21tYW5kcyB7XFxuICAgIGZvbnQtc2l6ZTogLjhyZW07XFxuICAgIGNvbG9yOiB2YXIoLS1maWxsLTEyKTtcXG59XFxuLnN1Ym1lbnUtY29tbWFuZHMgPiAubWVudS1pdGVtIHtcXG4gICAgICBwYWRkaW5nLWxlZnQ6IDQ2cHg7XFxufVxcbi5zdWJtZW51LWNvbW1hbmRzID4gLm1lbnUtaXRlbSA+IC5pY29uIHtcXG4gICAgICAgIG1hcmdpbi1yaWdodDogLjVyZW07XFxufVxcbi5tZXNzYWdlIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIG1heC13aWR0aDogMTAwJTtcXG4gIGxlZnQ6IDA7XFxuICBib3R0b206IDA7XFxuICBwYWRkaW5nOiA0cHggOHB4O1xcbiAgd29yZC13cmFwOiBicmVhay13b3JkO1xcbiAgZm9udC1zaXplOiAxMnB4O1xcbiAgbGluZS1oZWlnaHQ6IDEuMjsgLyogbG93ZXIgdmFsdWVzIGN1dCBkZXNjZW5kZXIgaW4gXFxcImdcXFwiICovXFxuICBiYWNrZ3JvdW5kOiB2YXIoLS1maWxsLTAtNSk7XFxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1maWxsLTIpO1xcbn1cXG4ubWVzc2FnZSA+IGRpdiB7XFxuICAgIG1heC1oZWlnaHQ6IDQwcHg7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxufVxcbi5mYWlsdXJlLXJlYXNvbiB7XFxuICBwYWRkaW5nOiAuNXJlbSAxNHB4IC41cmVtIDQ2cHg7XFxufVxcbltkYXRhLWZhaWx1cmUtcmVhc29uPVxcXCJcXFwiXSA+IC5mYWlsdXJlLXJlYXNvbiB7XFxuICAgIC8qIE1ha2luZyB0aGUgd2FybmluZyBub3RpY2VhYmxlIGF0IHRoZSBib3R0b20gb2YgdGhlIHNjcmlwdCBsaXN0Ki9cXG4gICAgYmFja2dyb3VuZDogaHNsYSgzMCwgMTAwJSwgNTAlLCAuMik7XFxufVxcbi5mYWlsdXJlLXJlYXNvbiBjb2RlIHtcXG4gICAgbWF4LXdpZHRoOiAxMDAlO1xcbn1cXG4ucmVsb2FkLWhpbnQgLmljb24ge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGxlZnQ6IDIwcHg7XFxuICAgIHdpZHRoOiAxNnB4O1xcbiAgICBoZWlnaHQ6IDE2cHg7XFxufVxcbi5leHRyYXMtbWVudSB7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICByaWdodDogMXJlbTtcXG4gIGJveC1zaGFkb3c6IDFweCAxcHggMTBweCAjMDAwODtcXG4gIHotaW5kZXg6IDEwMDtcXG4gIGJhY2tncm91bmQ6IHZhcigtLWJnKTtcXG4gIGNvbG9yOiB2YXIoLS1mZyk7XFxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1maWxsLTYpO1xcbn1cXG4uZXh0cmFzLW1lbnUgPiAqIHtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgcGFkZGluZzogLjI1cmVtIDFyZW07XFxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG59XFxuLmV4dHJhcy1tZW51ID4gKjpmaXJzdC1jaGlsZCB7XFxuICAgICAgcGFkZGluZy10b3A6IC43NXJlbTtcXG59XFxuLmV4dHJhcy1tZW51ID4gKjpsYXN0LWNoaWxkIHtcXG4gICAgICBwYWRkaW5nLWJvdHRvbTogLjc1cmVtO1xcbn1cXG4uZXh0cmFzLW1lbnUgPiAqOmZvY3VzIHtcXG4gICAgICBjb2xvcjogdmFyKC0tYmcpO1xcbiAgICAgIGJhY2tncm91bmQ6IGNvcm5mbG93ZXJibHVlO1xcbn1cXG4uZXhjbHVkZXMtbWVudSB7XFxuICBwYWRkaW5nOiAuMjVyZW0gLjVyZW0gLjI1cmVtIDQ2cHg7XFxufVxcbi5leGNsdWRlcy1tZW51IGJ1dHRvbiB7XFxuICAgIHRleHQtYWxpZ246IGxlZnQ7XFxuICAgIG1heC13aWR0aDogMTAwJTtcXG59XFxuLmV4Y2x1ZGVzLW1lbnUgaW5wdXQge1xcbiAgICB3aWR0aDogMTAwJTtcXG59XFxuLmV4Y2x1ZGVzLW1lbnUgZGV0YWlscyBzdW1tYXJ5IHtcXG4gICAgICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XFxufVxcbi5leGNsdWRlcy1tZW51IGRldGFpbHNbb3Blbl0ge1xcbiAgICAgIHBhZGRpbmctdG9wOiAuMjVyZW07XFxufVxcbi5leGNsdWRlcy1tZW51IGRldGFpbHNbb3Blbl0gc3VtbWFyeSB7XFxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgICBsZWZ0OiAxOHB4O1xcbn1cXG4uZXhjbHVkZXMtbWVudSBkZXRhaWxzOm5vdChbb3Blbl0pIHtcXG4gICAgICBkaXNwbGF5OiBpbmxpbmU7XFxufVxcbi5leGNsdWRlcy1tZW51IC5pY29uIHtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICB3aWR0aDogMThweDtcXG4gICAgaGVpZ2h0OiAxOHB4O1xcbn1cXG4uZXh0cmFzLXNob3duIC5zY3JpcHQtbmFtZSB7XFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXG59XFxuLmJsb2NrLXNjcm9sbCB7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xcbn1cXG5bZGF0YS11cGRdOjphZnRlciB7XFxuICBjb250ZW50OiBhdHRyKGRhdGEtdXBkKTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGZvbnQtc2l6ZTogMTBweDtcXG4gIGJvdHRvbTogLTRweDtcXG4gIGxpbmUtaGVpZ2h0OiAxO1xcbiAgY29sb3I6IHZhcigtLWZpbGwtNyk7XFxufVxcbi5zeW50YXgge1xcbiAgZm9udC1zaXplOiB4eC1zbWFsbDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMi41ZW07XFxuICBjb2xvcjogcmVkO1xcbn1cXG5cIiwgXCJcIl0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGkpIHtcbiAgcmV0dXJuIGlbMV07XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P2Nsb25lZFJ1bGVTZXQtNi51c2VbMV0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvZGlzdC9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9jbG9uZWRSdWxlU2V0LTYudXNlWzJdIS4vc3R5bGUuY3NzP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmbGFuZz1jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/Y2xvbmVkUnVsZVNldC02LnVzZVsxXSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9kaXN0L3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvZGlzdC9janMuanM/P2Nsb25lZFJ1bGVTZXQtNi51c2VbMl0hLi9zdHlsZS5jc3M/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZsYW5nPWNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCJpbXBvcnQgeyByZW5kZXIgfSBmcm9tIFwiLi9hcHAudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTZmMmRiNDE0XCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vYXBwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qc1wiXG5leHBvcnQgKiBmcm9tIFwiLi9hcHAudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzXCJcblxuaW1wb3J0IFwiLi4vc3R5bGUuY3NzP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmbGFuZz1jc3NcIlxuXG5pbXBvcnQgZXhwb3J0Q29tcG9uZW50IGZyb20gXCIvaG9tZS9ydW5uZXIvd29yay92aW9sZW50bW9ua2V5L3Zpb2xlbnRtb25rZXkvbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvZGlzdC9leHBvcnRIZWxwZXIuanNcIlxuY29uc3QgX19leHBvcnRzX18gPSAvKiNfX1BVUkVfXyovZXhwb3J0Q29tcG9uZW50KHNjcmlwdCwgW1sncmVuZGVyJyxyZW5kZXJdLFsnX19maWxlJyxcInNyYy9wb3B1cC92aWV3cy9hcHAudnVlXCJdXSlcbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIF9fZXhwb3J0c19fLl9faG1ySWQgPSBcIjZmMmRiNDE0XCJcbiAgY29uc3QgYXBpID0gX19WVUVfSE1SX1JVTlRJTUVfX1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghYXBpLmNyZWF0ZVJlY29yZCgnNmYyZGI0MTQnLCBfX2V4cG9ydHNfXykpIHtcbiAgICBhcGkucmVsb2FkKCc2ZjJkYjQxNCcsIF9fZXhwb3J0c19fKVxuICB9XG4gIFxuICBtb2R1bGUuaG90LmFjY2VwdChcIi4vYXBwLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD02ZjJkYjQxNFwiLCAoKSA9PiB7XG4gICAgYXBpLnJlcmVuZGVyKCc2ZjJkYjQxNCcsIHJlbmRlcilcbiAgfSlcblxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IF9fZXhwb3J0c19fIiwiZXhwb3J0IHsgZGVmYXVsdCB9IGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2Rpc3QvaW5kZXguanM/P3J1bGVTZXRbMF0hLi9hcHAudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzXCI7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2Rpc3QvaW5kZXguanM/P3J1bGVTZXRbMF0hLi9hcHAudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9kaXN0L3RlbXBsYXRlTG9hZGVyLmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzJdIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2Rpc3QvaW5kZXguanM/P3J1bGVTZXRbMF0hLi9hcHAudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTZmMmRiNDE0XCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9jbG9uZWRSdWxlU2V0LTYudXNlWzFdIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2Rpc3Qvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/Y2xvbmVkUnVsZVNldC02LnVzZVsyXSEuL3N0eWxlLmNzcz92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmxhbmc9Y3NzXCIiLCJ2YXIgbWFwID0ge1xuXHRcIi4vYXJyb3cuc3ZnXCI6IFwiLi9zcmMvcmVzb3VyY2VzL3N2Zy9hcnJvdy5zdmdcIixcblx0XCIuL2F1dGhvci5zdmdcIjogXCIuL3NyYy9yZXNvdXJjZXMvc3ZnL2F1dGhvci5zdmdcIixcblx0XCIuL2NvZGUuc3ZnXCI6IFwiLi9zcmMvcmVzb3VyY2VzL3N2Zy9jb2RlLnN2Z1wiLFxuXHRcIi4vY29nLnN2Z1wiOiBcIi4vc3JjL3Jlc291cmNlcy9zdmcvY29nLnN2Z1wiLFxuXHRcIi4vY29tbWFuZC5zdmdcIjogXCIuL3NyYy9yZXNvdXJjZXMvc3ZnL2NvbW1hbmQuc3ZnXCIsXG5cdFwiLi9maWx0ZXIuc3ZnXCI6IFwiLi9zcmMvcmVzb3VyY2VzL3N2Zy9maWx0ZXIuc3ZnXCIsXG5cdFwiLi9ob21lLnN2Z1wiOiBcIi4vc3JjL3Jlc291cmNlcy9zdmcvaG9tZS5zdmdcIixcblx0XCIuL2luZm8uc3ZnXCI6IFwiLi9zcmMvcmVzb3VyY2VzL3N2Zy9pbmZvLnN2Z1wiLFxuXHRcIi4vbW9yZS5zdmdcIjogXCIuL3NyYy9yZXNvdXJjZXMvc3ZnL21vcmUuc3ZnXCIsXG5cdFwiLi9wbHVzLnN2Z1wiOiBcIi4vc3JjL3Jlc291cmNlcy9zdmcvcGx1cy5zdmdcIixcblx0XCIuL3F1ZXN0aW9uLnN2Z1wiOiBcIi4vc3JjL3Jlc291cmNlcy9zdmcvcXVlc3Rpb24uc3ZnXCIsXG5cdFwiLi9yZWZyZXNoLnN2Z1wiOiBcIi4vc3JjL3Jlc291cmNlcy9zdmcvcmVmcmVzaC5zdmdcIixcblx0XCIuL3NlYXJjaC5zdmdcIjogXCIuL3NyYy9yZXNvdXJjZXMvc3ZnL3NlYXJjaC5zdmdcIixcblx0XCIuL3RvZ2dsZS1vZmYuc3ZnXCI6IFwiLi9zcmMvcmVzb3VyY2VzL3N2Zy90b2dnbGUtb2ZmLnN2Z1wiLFxuXHRcIi4vdG9nZ2xlLW9uLnN2Z1wiOiBcIi4vc3JjL3Jlc291cmNlcy9zdmcvdG9nZ2xlLW9uLnN2Z1wiLFxuXHRcIi4vdHJhc2guc3ZnXCI6IFwiLi9zcmMvcmVzb3VyY2VzL3N2Zy90cmFzaC5zdmdcIixcblx0XCIuL3VuZG8uc3ZnXCI6IFwiLi9zcmMvcmVzb3VyY2VzL3N2Zy91bmRvLnN2Z1wiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1hcCwgcmVxKSkge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRyZXR1cm4gbWFwW3JlcV07XG59XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gXCIuL3NyYy9yZXNvdXJjZXMvc3ZnIHN5bmMgXFxcXC5zdmckXCI7IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2V4dGVuZHMoKSB7XG4gIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiA/IE9iamVjdC5hc3NpZ24uYmluZCgpIDogZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG4gIHJldHVybiBfZXh0ZW5kcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwicG9wdXAvaW5kZXhcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rdmlvbGVudG1vbmtleVwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmt2aW9sZW50bW9ua2V5XCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcImNvbW1vbi11aVwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9wb3B1cC9pbmRleC5qc1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbInJlYWN0aXZlIiwiVG9vbHRpcCIsIm9wdGlvbnMiLCJnZXRTY3JpcHRIb21lIiwiZ2V0U2NyaXB0TmFtZSIsImdldFNjcmlwdFJ1bkF0IiwiZ2V0U2NyaXB0U3VwcG9ydFVybCIsImdldFNjcmlwdFVwZGF0ZVVybCIsImkxOG4iLCJtYWtlUGF1c2UiLCJzZW5kQ21kRGlyZWN0bHkiLCJzZW5kVGFiQ21kIiwidHJ1ZUpvaW4iLCJvYmplY3RQaWNrIiwiZm9jdXNNZSIsIkljb24iLCJrZXlib2FyZFNlcnZpY2UiLCJpc0lucHV0IiwiaGFuZGxlVGFiTmF2aWdhdGlvbiIsIm11dGV4Iiwic3RvcmUiLCJtb3VzZWRvd25FbGVtZW50IiwiTkFNRSIsImV4dGVuc2lvbk1hbmlmZXN0IiwibmFtZSIsInByb2Nlc3MiLCJlbnYiLCJWTV9WRVIiLCJTQ1JJUFRfQ0xTIiwiUlVOX0FUX09SREVSIiwib3B0aW9uc0RhdGEiLCJpc0FwcGxpZWQiLCJnZXQiLCJmaWx0ZXJzUG9wdXAiLCJob29rIiwiY2hhbmdlcyIsImNvbXBhcmVCeSIsImtleXMiLCJhIiwiYiIsImtleSIsImthIiwia2IiLCJjb21wb25lbnRzIiwiZGF0YSIsImFjdGl2ZU1lbnUiLCJhY3RpdmVFeHRyYXMiLCJmb2N1c0J1ZyIsIm1lc3NhZ2UiLCJmb2N1c2VkSXRlbSIsImNvbXB1dGVkIiwiYWN0aXZlTGlua3MiLCJzY3JpcHQiLCJzdXBwb3J0IiwiaG9tZSIsImZpbHRlciIsIkJvb2xlYW4iLCJpbmplY3Rpb25TY29wZXMiLCJzb3J0IiwiZW5hYmxlZEZpcnN0IiwiZ3JvdXBSdW5BdCIsImhpZGVEaXNhYmxlZCIsImluamVjdGFibGUiLCJncm91cERpc2FibGVkIiwibWFwIiwidGl0bGUiLCJncm91cEJ5RW5hYmxlZCIsImxpc3QiLCJzY3JpcHRzIiwiY29uZmlnIiwiZW5hYmxlZCIsIm51bVRvdGFsIiwibGVuZ3RoIiwibnVtRW5hYmxlZCIsInJlZHVjZSIsIm51bSIsInNjcmlwdE5hbWUiLCJpZCIsInByb3BzIiwidG9Mb3dlckNhc2UiLCJpbmRleE9mIiwicG9zaXRpb24iLCJleGNsdWRlcyIsInVwZCIsInRvdGFscyIsImZhaWx1cmVSZWFzb24iLCJibGFja2xpc3RlZCIsImZhaWx1cmVSZWFzb25UZXh0IiwiZmluZFVybHMiLCJxdWVyeSIsImVuY29kZVVSSUNvbXBvbmVudCIsImRvbWFpbiIsIk9VSlMiLCJ0YWJJbmRleCIsIm1ldGhvZHMiLCJjYW5VcGRhdGUiLCJ0b2dnbGVNZW51IiwidG9nZ2xlRXh0cmFzIiwiaXRlbSIsImV2dCIsInNldENvbnRleHQiLCJlbCIsInRhcmdldCIsImNsb3Nlc3QiLCIkbmV4dFRpY2siLCJleHRyYXNNZW51IiwiJHJlZnMiLCJzdHlsZSIsInRvcCIsIk1hdGgiLCJtaW4iLCJ3aW5kb3ciLCJpbm5lckhlaWdodCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImhlaWdodCIsImN1cnJlbnRUYXJnZXQiLCJnZXRTeW1ib2xDaGVjayIsImJvb2wiLCJvblRvZ2dsZSIsInNldCIsImNoZWNrUmVsb2FkIiwib25NYW5hZ2UiLCJ0aGVuIiwiY2xvc2UiLCJvbk9wZW5VcmwiLCJlIiwicHJldmVudERlZmF1bHQiLCJ1cmwiLCJocmVmIiwib25FZGl0U2NyaXB0Iiwib25Db21tYW5kIiwidHlwZSIsImN1cnJlbnRUYWIiLCJDTUQiLCJvblRvZ2dsZVNjcmlwdCIsImJyb3dzZXIiLCJ0YWJzIiwicmVsb2FkIiwiaWRNYXAiLCJmcmFtZVNjcmlwdHMiLCJpbml0Iiwib25DcmVhdGVTY3JpcHQiLCJvbkluamVjdGlvbkZhaWx1cmVGaXgiLCJBVVRPIiwib25SZW1vdmVTY3JpcHQiLCJyZW1vdmVkIiwib25VcGRhdGVTY3JpcHQiLCJjaGsiLCJvbkV4Y2x1ZGUiLCJwYWdlVXJsIiwiaG9zdCIsInNwbGl0IiwiZ3JvdXAiLCJxdWVyeVNlbGVjdG9yIiwiZm9jdXMiLCJvbkV4Y2x1ZGVDbG9zZSIsIm9uRXhjbHVkZVNhdmUiLCJidG4iLCJjdXN0b20iLCJleGNsdWRlTWF0Y2giLCJ0cmltIiwibmF2aWdhdGUiLCJkaXIiLCJhY3RpdmVFbGVtZW50IiwiZG9jdW1lbnQiLCJpdGVtcyIsIkFycmF5IiwiZnJvbSIsIiRlbCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJyZWN0Iiwid2lkdGgiLCJsZWZ0IiwiaW5kZXgiLCJmaW5kSW5kZXgiLCJmaW5kSXRlbUluZGV4Iiwic3RlcCIsInRlc3QiLCJpIiwiZGVsZWdhdGVNb3VzZUVudGVyIiwiZGVsZWdhdGVNb3VzZUxlYXZlIiwiYmx1ciIsInVwZGF0ZU1lc3NhZ2UiLCJkYXRhc2V0Iiwic2hvd0J1dHRvbnMiLCJtb3VudGVkIiwiZW5hYmxlIiwibWF4SGVpZ2h0IiwibWF4Iiwic2NyZWVuIiwiYXZhaWxIZWlnaHQiLCJzY3JlZW5ZIiwiZGlzcG9zZUxpc3QiLCJyZWdpc3RlciIsInZhbHVlIiwiSVNfRklSRUZPWCIsImJpbmQiLCJjb25kaXRpb24iLCJhY3RpdmF0ZWQiLCJoYXNGb2N1cyIsImJlZm9yZVVubW91bnQiLCJkaXNhYmxlIiwiZm9yRWFjaCIsImRpc3Bvc2UiLCJjbGFzcyIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJzcmMiLCJfaG9pc3RlZF8zIiwicmVmIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIm9uQ2xpY2siLCJfY3R4Iiwib25Db250ZXh0bWVudSIsIiRldmVudCIsImRpc2FibGVkIiwiX3RvRGlzcGxheVN0cmluZyIsIl9jcmVhdGVWTm9kZSIsIl9jb21wb25lbnRfaWNvbiIsIl9GcmFnbWVudCIsIl9yZW5kZXJMaXN0IiwidGV4dCIsImVsbGlwc2lzIiwiX2NyZWF0ZUJsb2NrIiwiX2NvbXBvbmVudF90b29sdGlwIiwiY29udGVudCIsImFsaWduIiwicGxhY2VtZW50Iiwic2NvcGUiLCJmb2N1c21lIiwiZmFpbGVkIiwicnVucyIsIm9uRm9jdXMiLCJvbktleWRvd24iLCJzYWZlSWNvbiIsIm9uTW91c2Vkb3duIiwic3ludGF4IiwiX2NyZWF0ZUNvbW1lbnRWTm9kZSIsInZhbCIsInNwZWxsY2hlY2siLCJvbktleXByZXNzIiwiY29tbWFuZHMiLCJjYXAiLCJvbk1vdXNldXAiLCJpbmplY3Rpb25GYWlsdXJlIiwiZml4YWJsZSIsImluY29nbml0byIsInRhYmluZGV4IiwicmVsIiwiSU5KRUNUQUJMRV9UQUJfVVJMX1JFIiwiaGFuZGxlcnMiLCJsb2FkU2NyaXB0SWNvbiIsImZvckVhY2hWYWx1ZSIsIm1hcEVudHJ5IiwicmVuZGVyIiwiQXBwIiwiT2JqZWN0IiwiYXNzaWduIiwiU2V0UG9wdXAiLCJmcmFtZUlkIiwidGFiIiwiaXNUb3AiLCJyZWFkeSIsIm1lbnVzIiwiaWRNYXBBbGxGcmFtZXMiLCJpZE1hcE1haW4iLCJpZE1hcE9sZCIsIklEUyIsImlkcyIsIk51bWJlciIsIlNDUklQVFMiLCJtZXRhcyIsImluY2x1ZGVzIiwic3RhdGUiLCJiYWRSZWFsbSIsIklEX0JBRF9SRUFMTSIsInJlbmRlcmVkU2NyaXB0IiwiZmluZCIsInB1c2giLCJzcGxpY2UiLCJDT05URU5UIiwiUEFHRSIsIklEX0lOSkVDVElORyIsIklOSkVDVF9JTlRPIiwicmVzb2x2ZSIsIkNTUyIsInN1cHBvcnRzIiwic3R5bGVTaGVldHMiLCJpbnNlcnRSdWxlIiwicnVudGltZSIsImNvbm5lY3QiLCJleGVjdXRlU2NyaXB0IiwiY29kZSIsIlJVTl9BVCIsImNhdGNoIiwiZGVsYXkiLCJQcm9taXNlIiwic2V0VGltZW91dCJdLCJzb3VyY2VSb290IjoiIn0=