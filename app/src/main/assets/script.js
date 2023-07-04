// ==UserScript==
// @name            Nova YouTube
// @namespace       https://github.com/raingart/Nova-YouTube-extension/
// @version         0.43.0
// @description     Gives you more control on YouTube

// @author          raingart <raingart+scriptaddons@protonmail.com>
// @license         Apache-2.0
// @icon            https://raw.github.com/raingart/Nova-YouTube-extension/master/icons/48.png

// @homepageURL     https://github.com/raingart/Nova-YouTube-extension
// @supportURL      https://github.com/raingart/Nova-YouTube-extension/issues
// @contributionURL https://www.patreon.com/raingart
// @contributionURL https://www.buymeacoffee.com/raingart
// @contributionURL https://www.paypal.com/donate/?hosted_button_id=B44WLWHZ8AGU2

// @domain          youtube.com
// @include         http*://www.youtube.com/*
// @include         http*://m.youtube.com/*
// @include         http*://*.youtube-nocookie.com/embed/*
// @include         http*://youtube.googleapis.com/embed/*
// @include         http*://raingart.github.io/options.html*

// @exclude         http*://*.youtube.com/*.xml*
// @exclude         http*://*.youtube.com/error*
// @exclude         http*://music.youtube.com/*
// @exclude         http*://accounts.youtube.com/*
// @exclude         http*://studio.youtube.com/*
// @exclude         http*://*.youtube.com/redirect?*

// @run-at          document-start

// ==/UserScript==
/*jshint esversion: 6 */

window.nova_plugins = [];
window.nova_plugins.push({
   id: 'comments-sort',
   title: 'Comments sort',
   run_on_pages: 'watch, -mobile',
   opt_api_key_warn: true,
   section: 'comments',
   desc: 'add modal',
   _runtime: user_settings => {
      const
         MODAL_NAME_SELECTOR_ID = 'nova-modal-comments',
         MODAL_CONTENT_SELECTOR_ID = 'modal-content';
      insertButton();
      function insertButton() {
         NOVA.waitSelector(
            user_settings['comments-popup']
               ? '#masthead-container'
               : '#comments ytd-comments-header-renderer #title'
         )
            .then(menu => {
               const btn = document.createElement('span');
               btn.setAttribute('data-open-modal', MODAL_NAME_SELECTOR_ID);
               btn.title = 'Nova Comments';
               btn.textContent = '►';
               btn.addEventListener('click', () => {
                  if (!document.body.querySelector(`#${MODAL_CONTENT_SELECTOR_ID} table`)) {
                     genTable();
                  }
                  btn.dispatchEvent(new CustomEvent(MODAL_NAME_SELECTOR_ID, { bubbles: true, detail: 'test' }));
               });
               Object.assign(btn.style,
                  user_settings['comments-popup']
                     ? {
                        position: 'fixed',
                        right: '0',
                        top: 'var(--ytd-masthead-height)',
                        visibility: 'visible',
                        'z-index':
                           1 + Math.max(
                              NOVA.css.getValue('.ytp-chrome-top', 'z-index'),
                              60),
                        'font-size': '18px',
                     }
                     : {
                        'font-size': '24px',
                        'text-decoration': 'none',
                        padding: '0 10px',
                        background: 'transparent',
                        border: 'none',
                     },
                  {
                     color: 'orange',
                     cursor: 'pointer',
                  });
               user_settings['comments-popup']
                  ? menu.append(btn)
                  : menu.prepend(btn);
               insertModal();
               connectSortable();
               NOVA.runOnPageInitOrTransition(() => {
                  if (NOVA.currentPage == 'watch') {
                     document.getElementById(MODAL_CONTENT_SELECTOR_ID).innerHTML = '<pre>Loading data...</pre>';
                  }
               });
            });
      }
      function genTable() {
         NOVA.request.API({
            request: 'commentThreads',
            params: {
               'videoId': NOVA.queryURL.get('v') || movie_player.getVideoData().video_id,
               'part': 'snippet',
               'maxResults': 100,
               'order': 'relevance',
            },
            api_key: user_settings['user-api-key'],
         })
            .then(res => {
               if (res?.error) {
                  if (res.reason) {
                     document.getElementById(MODAL_NAME_SELECTOR_ID)
                        .dispatchEvent(new CustomEvent(MODAL_NAME_SELECTOR_ID, { bubbles: true, detail: 'test' }));
                     return alert(`Error [${res.code}]: ${res.reason}`);
                  }
                  else {
                     return document.getElementById(MODAL_CONTENT_SELECTOR_ID).innerHTML =
                        `<pre>Error [${res.code}]: ${res.reason}</pre>
                        <pre>${res.error}</pre>`;
                  }
               }
               let commentList = []
               res?.items?.forEach(item => {
                  if (comment = item.snippet?.topLevelComment?.snippet) {
                     commentList.push(
                        Object.assign(
                           { 'totalReplyCount': item.snippet.totalReplyCount },
                           { 'id': item.id },
                           comment,
                        )
                     );
                  }
                  else {
                     console.warn('API is change', item);
                  }
               });
               if (!commentList.length) {
                  return document.getElementById(MODAL_CONTENT_SELECTOR_ID).innerHTML =
                     `<pre>Total number of comments: ${res.pageInfo.totalResults}</pre>`;
               }
               const ul = document.createElement('tbody');
               commentList
                  .sort((a, b) => b.likeCount - a.likeCount)
                  .forEach(comment => {
                     try {
                        const li = document.createElement('tr');
                        li.className = 'item';
                        li.innerHTML =
                           `<td>${comment.likeCount}</td>
                           <td>${+comment.totalReplyCount ?
                              `<a href="https://www.youtube.com/watch?v=${comment.videoId}&lc=${comment.id}" target="_blank" title="Open">${comment.totalReplyCount}</a>` : comment.totalReplyCount}
                           </td>
                           <td sorttable_customkey="${new Date(comment.updatedAt).getTime()}">${NOVA.timeFormatTo.ago(new Date(comment.updatedAt))}</td>
                           <td>
                              <a href="${comment.authorChannelUrl}" target="_blank" title="${comment.authorDisplayName}">
                                 <img src="${comment.authorProfileImageUrl}" alt="${comment.authorDisplayName}" />
                              </a>
                           </td>
                           <td sorttable_customkey="${comment.textDisplay.length}">
                              <span class="text-overflow-dynamic-ellipsis">${comment.textDisplay}</span>
                           </td>`;
                        ul.append(li);
                     } catch (error) {
                        console.error('Error comment generate:\n', error.stack + '\n', comment);
                     }
                  });
               const MODAL_CONTENT_FILTER_SELECTOR_ID = 'nova-search-comment';
               document.getElementById(MODAL_CONTENT_SELECTOR_ID).innerHTML =
                  `<table class="sortable" border="0" cellspacing="0" cellpadding="0">
                     <thead id="${MODAL_CONTENT_FILTER_SELECTOR_ID}">
                        <tr>
                           <th class="sorttable_numeric">likes</th>
                           <th class="sorttable_numeric">replys</th>
                           <th class="sorttable_numeric">date</th>
                           <th class="sorttable_nosort">avatars</th>
                           <th class="sorttable_numeric">comments (${res.pageInfo.totalResults})</th>
                        </tr>
                     </thead>
                     ${ul.innerHTML}
                  </table>`;
               sorttable.makeSortable(document.body.querySelector('.sortable'));
               insertFilterInput(MODAL_CONTENT_FILTER_SELECTOR_ID);
            });
      }
      function insertFilterInput(parent_selector_id = required()) {
         if (typeof parent_selector_id !== 'string') {
            return console.error('typeof "parent_selector_id":', (typeof parent_selector_id));
         }
         NOVA.css.push(
            `#${parent_selector_id} {
               position: relative;
            }
            #${parent_selector_id} input {
              position: absolute;
              top: 0;
              right: 0;
              
              
            }
            #${parent_selector_id} input[type=search]:focus,
            #${parent_selector_id} input[type=text]:focus {
               outline: 1px solid #00b7fc;
            }`);
         const searchInput = document.createElement('input');
         searchInput.setAttribute('type', 'search');
         searchInput.setAttribute('placeholder', 'Filter');
         ['change', 'keyup'].forEach(evt => {
            searchInput
               .addEventListener(evt, function () {
                  NOVA.searchFilterHTML({
                     'keyword': this.value,
                     'filter_selectors': 'tr',
                     'highlight_selector': '.text-overflow-dynamic-ellipsis',
                  });
               });
            searchInput
               .addEventListener('click', () => {
                  searchInput.value = '';
                  searchInput.dispatchEvent(new Event('change'));
               });
         });
         document.getElementById(parent_selector_id).append(searchInput);
      };
      function insertModal() {
         NOVA.css.push(
            `.modal {
               --animation-time: .2s;
               z-index: 9999;
               position: fixed;
               top: 0;
               left: 0;
               background: rgba(0, 0, 0, .8);
               display: flex;
               align-items: center;
               justify-content: center;
               width: 100%;
               height: 100%;
               box-sizing: border-box;
               visibility: hidden;
               opacity: 0;
               
            }
            .modal.modal-visible {
               animation: microModalFadeIn var(--animation-time) cubic-bezier(0, 0, .2, 1);
               visibility: visible;
               opacity: 1;
            }
            @keyframes microModalFadeIn {
               from { opacity: 0; }
               to { opacity: 1; }
            }
            .modal-container {
               border-radius: 4px;
               background-color: silver;
               position: relative;
               display: flex;
               box-sizing: border-box;
               overflow-y: auto;
               max-width: 70%;
               max-height: 100vh;
               transform: scale(0.9);
               transition: all var(--animation-time) ease-out;
            }
            .modal.modal-visible .modal-container {
               transform: scale(1);
            }
            .modal-close {
               position: absolute;
               top: 0;
               right: 0;
               cursor: pointer;
               font-size: 2em;
               padding: 0 5px;
               transition: background-color var(--animation-time) ease-out;
            }
            .modal-close:before { content: "\\2715"; }
            .modal-close:hover {
               background-color: #ea3c3c;
            }
            .modal-content {
               padding: 2rem;
            }`);
         NOVA.css.push(
            `.modal {}
            .modal-container {
               
               background-color: var(--yt-spec-base-background);
               background-color: var(--yt-spec-raised-background);
            }
            .modal-content {
               font-size: 12px;
               color: var(--yt-spec-text-primary);
            }`);
         document.body
            .insertAdjacentHTML('beforeend',
               `<div id="${MODAL_NAME_SELECTOR_ID}" class="modal" data-modal>
                  <div class="modal-container">
                     <div class="modal-close" data-close-modal></div>
                     <div class="modal-content" id="${MODAL_CONTENT_SELECTOR_ID}"></div>
                  </div>
               </div>`);
         const modalShowClass = 'modal-visible';
         document.getElementById(MODAL_NAME_SELECTOR_ID)
            .addEventListener('click', ({ target }) => {
               target.dispatchEvent(new CustomEvent(MODAL_NAME_SELECTOR_ID, { bubbles: true, detail: 'test' }));
            });
         document.addEventListener(MODAL_NAME_SELECTOR_ID, ({ target }) => {
            const
               attrModal = target.hasAttribute('data-modal'),
               attrOpen = target.getAttribute('data-open-modal'),
               attrClose = target.hasAttribute('data-close-modal');
            if (attrModal) {
               target.classList.remove(modalShowClass);
            }
            else if (attrOpen && (modal = document.getElementById(attrOpen))) {
               modal.classList.add(modalShowClass);
            }
            else if (attrClose && (modal = target.closest('[data-modal]'))) {
               modal.classList.remove(modalShowClass);
            }
         });
      }
      function connectSortable() {
         NOVA.css.push(
            `table.sortable table {
               width: 100%;
            }
            table.sortable thead {}
            table.sortable thead th {
               text-transform: uppercase;
               cursor: pointer;
            }
            thead, th, td {
               text-align: center;
            }
            table tbody {
               counter-reset: sortabletablescope;
            }
            
            
            #${MODAL_CONTENT_SELECTOR_ID} td .text-overflow-dynamic-ellipsis {
               display: block;
               max-height: 25vh;
               overflow-y: auto;
               text-align: left;
               font-size: 1.2em;
               line-height: 1.4;
               padding: 10px 5px;
               max-width: 600px;
            }
            #${MODAL_CONTENT_SELECTOR_ID} td a {
               text-decoration: none;
               color: var(--yt-spec-call-to-action);
            }`);
//         function dean_addEvent(t, e, r) { if (t.addEventListener) t.addEventListener(e, r, !1); else { r.$$guid || (r.$$guid = dean_addEvent.guid++), t.events || (t.events = {}); var o = t.events[e]; o || (o = t.events[e] = {}, t["on" + e] && (o[0] = t["on" + e])), o[r.$$guid] = r, t["on" + e] = handleEvent } } function handleEvent(t) { var e = !0; t = t || fixEvent(((this.ownerDocument || this.document || this).parentWindow || window).event); var r = this.events[t.type]; for (var o in r) this.$$handleEvent = r[o], !1 === this.$$handleEvent(t) && (e = !1); return e } function fixEvent(t) { return t.preventDefault = fixEvent.preventDefault, t.stopPropagation = fixEvent.stopPropagation, t } sorttable = { makeSortable: function (t) { if (0 == t.getElementsByTagName("thead").length && (the = document.createElement("thead"), the.appendChild(t.rows[0]), t.insertBefore(the, t.firstChild)), null == t.tHead && (t.tHead = t.getElementsByTagName("thead")[0]), 1 == t.tHead.rows.length) { sortbottomrows = []; for (var e = 0; e < t.rows.length; e++)-1 != t.rows[e].className.search(/\bsortbottom\b/) && (sortbottomrows[sortbottomrows.length] = t.rows[e]); if (sortbottomrows) { null == t.tFoot && (tfo = document.createElement("tfoot"), t.appendChild(tfo)); for (e = 0; e < sortbottomrows.length; e++)tfo.appendChild(sortbottomrows[e]); delete sortbottomrows } headrow = t.tHead.rows[0].cells; for (e = 0; e < headrow.length; e++)headrow[e].className.match(/\bsorttable_nosort\b/) || (mtch = headrow[e].className.match(/\bsorttable_([a-z0-9]+)\b/), mtch && (override = mtch[1]), mtch && "function" == typeof sorttable["sort_" + override] ? headrow[e].sorttable_sortfunction = sorttable["sort_" + override] : headrow[e].sorttable_sortfunction = sorttable.guessType(t, e), headrow[e].sorttable_columnindex = e, headrow[e].sorttable_tbody = t.tBodies[0], dean_addEvent(headrow[e], "click", sorttable.innerSortFunction = function (t) { if (-1 != this.className.search(/\bsorttable_sorted\b/)) return sorttable.reverse(this.sorttable_tbody), this.className = this.className.replace("sorttable_sorted", "sorttable_sorted_reverse"), this.removeChild(document.getElementById("sorttable_sortfwdind")), sortrevind = document.createElement("span"), sortrevind.id = "sorttable_sortrevind", sortrevind.innerHTML = "&nbsp;&#x25B4;", void this.appendChild(sortrevind); if (-1 != this.className.search(/\bsorttable_sorted_reverse\b/)) return sorttable.reverse(this.sorttable_tbody), this.className = this.className.replace("sorttable_sorted_reverse", "sorttable_sorted"), this.removeChild(document.getElementById("sorttable_sortrevind")), sortfwdind = document.createElement("span"), sortfwdind.id = "sorttable_sortfwdind", sortfwdind.innerHTML = "&nbsp;&#x25BE;", void this.appendChild(sortfwdind); theadrow = this.parentNode, forEach(theadrow.childNodes, (function (t) { 1 == t.nodeType && (t.className = t.className.replace("sorttable_sorted_reverse", ""), t.className = t.className.replace("sorttable_sorted", "")) })), sortfwdind = document.getElementById("sorttable_sortfwdind"), sortfwdind && sortfwdind.parentNode.removeChild(sortfwdind), sortrevind = document.getElementById("sorttable_sortrevind"), sortrevind && sortrevind.parentNode.removeChild(sortrevind), this.className += " sorttable_sorted", sortfwdind = document.createElement("span"), sortfwdind.id = "sorttable_sortfwdind", sortfwdind.innerHTML = "&nbsp;&#x25BE;", this.appendChild(sortfwdind), row_array = [], col = this.sorttable_columnindex, rows = this.sorttable_tbody.rows; for (var e = 0; e < rows.length; e++)row_array[row_array.length] = [sorttable.getInnerText(rows[e].cells[col]), rows[e]]; row_array.sort(this.sorttable_sortfunction).reverse(), tb = this.sorttable_tbody; for (e = 0; e < row_array.length; e++)tb.appendChild(row_array[e][1]); delete row_array })) } }, guessType: function (t, e) { sortfn = sorttable.sort_alpha; for (var r = 0; r < t.tBodies[0].rows.length; r++)if (text = sorttable.getInnerText(t.tBodies[0].rows[r].cells[e]), "" != text && text.match(/^-?[£$¤]?[\d,.]+%?$/)) return sorttable.sort_numeric; return sortfn }, getInnerText: function (t) { if (!t) return ""; if (hasInputs = "function" == typeof t.getElementsByTagName && t.getElementsByTagName("input").length, null != t.getAttribute("sorttable_customkey")) return t.getAttribute("sorttable_customkey"); if (void 0 !== t.textContent && !hasInputs) return t.textContent.replace(/^\s+|\s+$/g, ""); if (void 0 !== t.innerText && !hasInputs) return t.innerText.replace(/^\s+|\s+$/g, ""); if (void 0 !== t.text && !hasInputs) return t.text.replace(/^\s+|\s+$/g, ""); switch (t.nodeType) { case 3: if ("input" == t.nodeName.toLowerCase()) return t.value.replace(/^\s+|\s+$/g, ""); case 4: return t.nodeValue.replace(/^\s+|\s+$/g, ""); case 1: case 11: for (var e = "", r = 0; r < t.childNodes.length; r++)e += sorttable.getInnerText(t.childNodes[r]); return e.replace(/^\s+|\s+$/g, ""); default: return "" } }, reverse: function (t) { newrows = []; for (var e = 0; e < t.rows.length; e++)newrows[newrows.length] = t.rows[e]; for (e = newrows.length - 1; e >= 0; e--)t.appendChild(newrows[e]); delete newrows }, sort_numeric: function (t, e) { return aa = parseFloat(t[0].replace(/[^0-9.-]/g, "")), isNaN(aa) && (aa = 0), bb = parseFloat(e[0].replace(/[^0-9.-]/g, "")), isNaN(bb) && (bb = 0), aa - bb }, sort_alpha: function (t, e) { return t[0].localeCompare(e[0]) } }, dean_addEvent.guid = 1, fixEvent.preventDefault = function () { this.returnValue = !1 }, fixEvent.stopPropagation = function () { this.cancelBubble = !0 }, Function.prototype.forEach = function (t, e, r) { for (var o in t) void 0 === this.prototype[o] && e.call(r, t[o], o, t) }, String.forEach = function (t, e, r) { Array.forEach(t.split(""), (function (o, n) { e.call(r, o, n, t) })) }; var forEach = function (t, e, r) { if (t) { var o = Object; if (t instanceof Function) o = Function; else { if (t.forEach instanceof Function) return void t.forEach(e, r); "string" == typeof t ? o = String : "number" == typeof t.length && (o = Array) } o.forEach(t, e, r) } };
      }
   },
});
window.nova_plugins.push({
   id: 'comments-popup',
   title: 'Comments section in popup',
   run_on_pages: 'watch, -mobile',
   section: 'comments',
   _runtime: user_settings => {
      if (user_settings['comments_visibility_mode'] == 'disable') return;
      const
         COMMENTS_SELECTOR = 'html:not(:fullscreen) #page-manager #comments:not([hidden]):not(:empty)',
         counterAttrName = 'data-counter';
      NOVA.runOnPageInitOrTransition(() => {
         if (NOVA.currentPage == 'watch') {
            NOVA.waitSelector('ytd-comments-header-renderer #title #count', { stop_on_page_change: true })
               .then(count => {
                  document.body.querySelector(COMMENTS_SELECTOR)
                     ?.setAttribute(counterAttrName,
                        NOVA.prettyRoundInt(parseInt(count.textContent.replace(/,/g, '')))
                     );
               });
         }
      });
      NOVA.waitSelector('#masthead-container')
         .then(masthead => {
            NOVA.css.push(
               `${COMMENTS_SELECTOR},
               ${COMMENTS_SELECTOR}:before {
                  position: fixed;
                  top: ${masthead.offsetHeight || 56}px;
                  right: 0;
                  z-index: ${1 + Math.max(getComputedStyle(masthead || movie_player)['z-index'], 601)};
               }
               
               ${COMMENTS_SELECTOR}:not(:hover):before {
                  content: attr(${counterAttrName}) " comments ▼";
                  cursor: pointer;
                  visibility: visible;
                  
                  right: 3em;
                  padding: 0 6px 2px;
                  line-height: normal;
                  font-family: Roboto, Arial, sans-serif;
                  font-size: 11px;
                  color: #eee;
                  background: rgba(0,0,0,0.3);
               }
               
               ${COMMENTS_SELECTOR} {
                  ${(user_settings.comments_popup_width === 100) ? 'margin: 0 1%;' : ''}
                  padding: 0 15px;
                  background-color: #222;
                  border: 1px solid #333;
                  max-width: ${user_settings.comments_popup_width || 40}%;
               }
               ${COMMENTS_SELECTOR}:not(:hover) {
                  visibility: collapse;
               }
               
               ${COMMENTS_SELECTOR}:hover {
                  visibility: visible !important;
               }
               
               ${COMMENTS_SELECTOR} > #sections > #contents {
                  overflow-y: auto;
                  max-height: 88vh;
                  padding-top: 1em;
               }
               #expander.ytd-comment-renderer {
                  overflow-x: hidden;
               }
               
               ${COMMENTS_SELECTOR} #sections {
                  min-width: 500px;
               }
               
               ${COMMENTS_SELECTOR} #contents::-webkit-scrollbar {
                  height: 8px;
                  width: 10px;
               }
               ${COMMENTS_SELECTOR} #contents::-webkit-scrollbar-button {
                  height: 0;
                  width: 0;
               }
               ${COMMENTS_SELECTOR} #contents::-webkit-scrollbar-corner {
                  background: transparent;
               }
               ${COMMENTS_SELECTOR} #contents::-webkit-scrollbar-thumb {
                  background: #e1e1e1;
                  border: 0;
                  border-radius: 0;
               }
               ${COMMENTS_SELECTOR} #contents::-webkit-scrollbar-track {
                  background: #666;
                  border: 0;
                  border-radius: 0;
               }
               ${COMMENTS_SELECTOR} #contents::-webkit-scrollbar-track:hover {
                  background: #666;
               }`);
            if (user_settings.comments_popup_hide_textarea) {
               NOVA.css.push(
                  `${COMMENTS_SELECTOR} > #sections > #contents {
                     overflow-y: auto;
                     max-height: 88vh;
                     border-top: 1px solid #333;
                     padding-top: 1em;
                  }
                  ${COMMENTS_SELECTOR} #header #simple-box {
                     display: none;
                  }
                  
                  ytd-comments-header-renderer {
                     height: 0;
                     margin-top: 10px;
                  }`);
            }
            else {
               NOVA.css.push(
                  `
                  ytd-comments-header-renderer {
                     margin: 10px 0;
                  }`);
            }
         });
   },
   options: {
      comments_popup_width: {
         _tagName: 'input',
         label: 'Width',
         'label:ua': 'Ширина',
         type: 'number',
         title: '% of the screen width',
         placeholder: '%',
         step: 5,
         min: 10,
         max: 100,
         value: 40,
      },
      comments_popup_hide_textarea: {
         _tagName: 'input',
         label: 'Hide textarea',
         'label:ua': 'Приховати поле вводу',
         type: 'checkbox',
      },
   }
});
window.nova_plugins.push({
   id: 'comments-expand',
   title: 'Expand comments',
   run_on_pages: 'watch, -mobile',
   section: 'comments',
   _runtime: user_settings => {
      NOVA.css.push(
         `#expander.ytd-comment-renderer {
            overflow-x: hidden;
         }`);
      NOVA.watchElements({
         selectors: ['#comment #expander[collapsed] #more:not([hidden])'],
         attr_mark: 'nova-comment-expanded',
         callback: btn => {
            const moreExpand = () => btn.click();
            const comment = btn.closest('#expander[collapsed]');
            switch (user_settings.comments_expand_mode) {
               case 'onhover':
                  comment.addEventListener('mouseenter', moreExpand, { capture: true, once: true });
                  break;
               case 'always':
                  moreExpand();
                  break;
            }
         },
      });
      NOVA.watchElements({
         selectors: ['#replies #more-replies button'],
         attr_mark: 'nova-replies-expanded',
         callback: btn => {
            const moreExpand = () => btn.click();
            switch (user_settings.comments_view_reply) {
               case 'onhover':
                  btn.addEventListener('mouseenter', moreExpand, { capture: true, once: true });
                  break;
               case 'always':
                  moreExpand();
                  break;
            }
         },
      });
      if (NOVA.queryURL.has('lc')) {
         NOVA.waitSelector('#comment #linked-comment-badge + #body #expander[collapsed] #more:not([hidden])')
            .then(btn => btn.click());
         NOVA.waitSelector('ytd-comment-thread-renderer:has(#linked-comment-badge) #replies #more-replies button')
            .then(btn => btn.click());
      }
   },
   options: {
      comments_expand_mode: {
         _tagName: 'select',
         label: 'Expand comment',
         options: [
            {
               label: 'always', value: 'always', selected: true,
            },
            {
               label: 'on hover', value: 'onhover',
            },
            {
               label: 'disable', value: false,
            },
         ],
      },
      comments_view_reply: {
         _tagName: 'select',
         label: 'Expand reply',
         options: [
            {
               label: 'always', value: 'always',
            },
            {
               label: 'on hover', value: 'onhover', selected: true,
            },
            {
               label: 'disable', value: false,
            },
         ],
      },
   }
});
window.nova_plugins.push({
   id: 'square-avatars',
   title: 'Square avatars',
   run_on_pages: '*, -live_chat',
   section: 'comments',
   desc: 'Make user images squared',
   _runtime: user_settings => {
      NOVA.css.push(
         [
            'yt-img-shadow',
            '.ytp-title-channel-logo',
            '#player .ytp-title-channel',
            'ytm-profile-icon',
            'a.ytd-thumbnail',
         ]
            .join(',\n') + ` {
               border-radius: 0 !important;
            }`);
      NOVA.waitUntil(() => {
         if (window.yt && (obj = yt?.config_?.EXPERIMENT_FLAGS) && Object.keys(obj).length) {
            yt.config_.EXPERIMENT_FLAGS.web_rounded_thumbnails = false;
            return true;
         }
      });
   },
});
window.nova_plugins.push({
   id: 'comments-visibility',
   title: 'Collapse comments section',
   run_on_pages: 'watch, -mobile',
   restart_on_location_change: true,
   section: 'comments',
   _runtime: user_settings => {
      NOVA.collapseElement({
         selector: '#comments',
         title: 'comments',
         remove: (user_settings.comments_visibility_mode == 'disable') ? true : false,
      });
   },
   options: {
      comments_visibility_mode: {
         _tagName: 'select',
         label: 'Mode',
         options: [
            {
               label: 'collapse', value: 'hide', selected: true,
            },
            {
               label: 'remove', value: 'disable',
            },
         ],
      },
   }
});
window.nova_plugins.push({
   id: 'metadata-hide',
   title: 'Hide metadata',
   run_on_pages: 'watch',
   section: 'details',
   desc: 'Cover link to games, movies, etc.',
   _runtime: user_settings => {
      NOVA.css.push(
         `ytd-watch-metadata > ytd-metadata-row-container-renderer {
            display: none;
         }`);
   },
});
window.nova_plugins.push({
   id: 'description-expand',
   title: 'Expand description',
   run_on_pages: 'watch, -mobile',
   section: 'details',
   _runtime: user_settings => {
      if (user_settings['description-popup']) return;
      NOVA.watchElements({
         selectors: [
            '#meta [collapsed] #more',
            '[description-collapsed] #description #expand',
         ],
         callback: btn => {
            if (user_settings.description_expand_mode == 'onhover') {
               btn.addEventListener('mouseenter', ({ target }) => btn.click(), { capture: true, once: true });
            }
            else {
               btn.click();
            }
         }
      });
   },
   options: {
      description_expand_mode: {
         _tagName: 'select',
         label: 'Mode',
         options: [
            {
               label: 'always', value: 'always', selected: true,
            },
            {
               label: 'on hover', value: 'onhover',
            },
         ],
      },
   }
});
window.nova_plugins.push({
   id: 'description-timestamps-scroll',
   title: 'No scroll to top when clicking timestamps',
   run_on_pages: 'watch, -mobile',
   section: 'details',
   desc: 'Disable scrolling to player when clicking on timestamps',
   _runtime: user_settings => {
      document.addEventListener('click', evt => {
         if (evt.isTrusted && !evt.target.matches('a[href*="&t="]')) return;
         if (sec = parseInt(NOVA.queryURL.get('t', evt.target.href))) {
            evt.preventDefault();
            evt.stopPropagation();
            evt.stopImmediatePropagation();
            movie_player.seekTo(sec);
         }
      }, { capture: true });
   },
});
window.nova_plugins.push({
   id: 'redirect-disable',
   title: 'Clear links from redirect',
   run_on_pages: 'watch, channel',
   section: 'details',
   desc: 'Direct external links',
   _runtime: user_settings => {
      document.addEventListener('click', ({ target }) => patchLink(target), { capture: true });
      document.addEventListener('auxclick', evt => evt.button === 1 && patchLink(evt.target), { capture: true });
      function patchLink(target = required()) {
         const linkSelector = 'a[href*="/redirect?"]';
         if (!target.matches(linkSelector)) {
            if (!(target = target.closest(linkSelector))) return;
         }
         if (q = NOVA.queryURL.get('q', target.href)) {
            target.href = decodeURIComponent(q);
         }
      }
   },
});
window.nova_plugins.push({
   id: 'details-buttons',
   title: 'Buttons',
   run_on_pages: 'watch, -mobile',
   section: 'details',
   _runtime: user_settings => {
      if (user_settings.details_buttons_hide?.includes('subscribe')) {
         stylesList.push('#below #subscribe-button');
      }
      if (user_settings.details_buttons_hide?.includes('all')) {
         return NOVA.css.push(
            `ytd-watch-metadata #actions button {
               display: none !important;
            }`);
      }
      let styles = '';
      if (user_settings.details_button_no_labels) {
         styles +=
            `ytd-watch-metadata #actions button .cbox {
               display: none;
            }
            ytd-watch-metadata #actions button .yt-spec-button-shape-next__icon {
               margin: 0 !important;
            }
            
            ytd-watch-metadata #actions ytd-segmented-like-dislike-button-renderer ~ * button,
            ytd-watch-metadata #actions #top-level-buttons-computed ~ * button.yt-spec-button-shape-next--size-m {
               padding: 0 7px;
            }`;
      }
      if (+user_settings.details_button_no_labels_opacity) {
         styles +=
            `#subscribe-button:not(:hover),
            ytd-watch-metadata #actions #menu:not(:hover) {
               transition: opacity .2s ease-in-out;
               opacity: ${user_settings.details_button_no_labels_opacity || .1};
            }`;
      }
      if (styles) {
         NOVA.css.push(styles);
      }
      if (user_settings.details_buttons_hide?.length) {
         const buttonSelectors = [
            'ytd-watch-metadata #menu ytd-button-renderer',
            'ytd-watch-metadata #menu button',
            'ytd-popup-container ytd-menu-service-item-renderer',
         ];
         let stylesList = [];
         if (user_settings.details_buttons_hide.includes('join')) {
            stylesList.push('#below #sponsor-button');
         }
         if (user_settings.details_buttons_hide.includes('like_dislike')) {
            stylesList.push('ytd-watch-metadata #menu ytd-segmented-like-dislike-button-renderer');
         }
         if (user_settings.details_buttons_hide.includes('dislike')) {
            stylesList.push('ytd-watch-metadata #menu #segmented-dislike-button');
            NOVA.css.push(
               `ytd-watch-metadata #menu ytd-segmented-like-dislike-button-renderer button {
                  border-radius: 100%;
                  width: 40px;
                  border: 0;
               }`);
         }
         if (user_settings.details_buttons_hide.includes('download')) {
            stylesList.push('ytd-watch-metadata #menu ytd-download-button-renderer');
         }
         if (user_settings.details_buttons_hide.includes('share')) {
            stylesList.push(buttonSelectors.map(e => `\n${e}:has(path[d^="M15,5.63L20.66,12L15"])`));
         }
         if (user_settings.details_buttons_hide.includes('thanks')) {
            stylesList.push(buttonSelectors.map(e => `\n${e}:has(path[d^="M16.5,3C19.02,3,21,5.19,21"])`));
         }
         if (user_settings.details_buttons_hide.includes('clip')) {
            stylesList.push(buttonSelectors.map(e => `\n${e}:has(path[d^="M8,7c0,0.55-0.45"])`));
         }
         if (user_settings.details_buttons_hide.includes('save')) {
            stylesList.push(buttonSelectors.map(e => `\n${e}:has(path[d$="M2,16h8v-1H2V16z"])`));
         }
         if (user_settings.details_buttons_hide.includes('report')) {
            stylesList.push(buttonSelectors.map(e => `\n${e}:has(path[d$="L14,3z"])`));
         }
         if (user_settings.details_buttons_hide.includes('transcript')) {
            stylesList.push(buttonSelectors.map(e => `\n${e}:has(path[d^="M5,11h2v2H5V11z"])`));
         }
         if (stylesList.length) {
            NOVA.css.push(
               stylesList.join(',\n').trim() + ` {
                  display: none !important;
               }`);
         }
      }
   },
   options: {
      details_button_no_labels: {
         _tagName: 'input',
         label: 'Buttons without labels',
         type: 'checkbox',
         title: 'Requires support for css tag ":has()"',
      },
      details_button_no_labels_opacity: {
         _tagName: 'input',
         label: 'Opacity',
         type: 'number',
         title: '0 - disable',
         placeholder: '0-1',
         step: .05,
         min: 0,
         max: 1,
         value: .1,
      },
      details_buttons_hide: {
         _tagName: 'select',
         label: 'Hide items',
         title: '[Ctrl+Click] to select several',
         multiple: null,
         size: 8,
         options: [
            {
               label: 'subscribe', value: 'subscribe',
            },
            {
               label: 'all (below)', value: 'all',
            },
            {
               label: 'join', value: 'join',
            },
            {
               label: 'like/dislike', value: 'like_dislike',
            },
            {
               label: 'dislike', value: 'dislike',
            },
            {
               label: 'share', value: 'share',
            },
            {
               label: 'clip', value: 'clip',
            },
            {
               label: 'save', value: 'save',
            },
            {
               label: 'download', value: 'download',
            },
            {
               label: 'thanks', value: 'thanks',
            },
            {
               label: 'report', value: 'report',
            },
            {
               label: 'transcript', value: 'transcript',
            },
         ],
      },
   }
});
window.nova_plugins.push({
   id: 'description-popup',
   title: 'Description section in popup',
   run_on_pages: 'watch, -mobile',
   section: 'details',
   _runtime: user_settings => {
      const
         DESCRIPTION_SELECTOR = 'html:not(:fullscreen) ytd-watch-metadata #description.ytd-watch-metadata:not([hidden]):not(:empty)',
         DATE_SELECTOR_ID = 'nova-description-date';
      NOVA.waitSelector('#masthead-container')
         .then(masthead => {
            NOVA.css.push(
               `${DESCRIPTION_SELECTOR},
               ${DESCRIPTION_SELECTOR}:before {
                  position: fixed;
                  top: ${masthead.offsetHeight || 56}px;
                  right: 0;
                  z-index: ${1 + Math.max(getComputedStyle(masthead || movie_player)['z-index'], 601)};
               }
               
               ${DESCRIPTION_SELECTOR}:not(:hover):before {
                  content: "info ▼";
                  cursor: pointer;
                  visibility: visible;
                  
                  right: 12.5em;
                  padding: 0 8px 2px;
                  line-height: normal;
                  font-family: Roboto, Arial, sans-serif;
                  font-size: 11px;
                  color: #eee;
                  background: rgba(0,0,0,0.3);
               }
               
               ${DESCRIPTION_SELECTOR} {
                  margin: 0 1%;
                  overflow-y: auto;
                  max-height: 88vh;
                  max-width: 55%;
                  background-color: #222;
                  border: 1px solid #333;
                  border-radius: 0 !important;
               }
               ${DESCRIPTION_SELECTOR}:not(:hover) {
                  visibility: collapse;
                  overflow: hidden;
               }
               
               ${DESCRIPTION_SELECTOR}:hover {
                  visibility: visible !important;
               }
               
               ${DESCRIPTION_SELECTOR}::-webkit-scrollbar {
                  height: 8px;
                  width: 10px;
               }
               ${DESCRIPTION_SELECTOR}::-webkit-scrollbar-button {
                  height: 0;
                  width: 0;
               }
               ${DESCRIPTION_SELECTOR}::-webkit-scrollbar-corner {
                  background: transparent;
               }
               ${DESCRIPTION_SELECTOR}::-webkit-scrollbar-thumb {
                  background: #e1e1e1;
                  border: 0;
                  border-radius: 0;
               }
               ${DESCRIPTION_SELECTOR}::-webkit-scrollbar-track {
                  background: #666;
                  border: 0;
                  border-radius: 0;
               }
               ${DESCRIPTION_SELECTOR}::-webkit-scrollbar-track:hover {
                  background: #666;
               }`);
         });
      NOVA.runOnPageInitOrTransition(() => (NOVA.currentPage == 'watch') && restoreDateLine());
      NOVA.waitSelector(DESCRIPTION_SELECTOR)
         .then(descriptionEl => {
            descriptionEl.addEventListener('mouseenter', evt => {
               document.body.querySelector('#meta [collapsed] #more, [description-collapsed] #description #expand')
                  ?.click();
            });
         });
      let oldDateText;
      function restoreDateLine() {
         NOVA.waitSelector('#title h1')
            .then(container => {
               NOVA.waitSelector('ytd-watch-metadata #description.ytd-watch-metadata')
                  .then(async textDateEl => {
                     await NOVA.waitUntil(() => {
                        if ((text = [...textDateEl.querySelectorAll('span.bold.yt-formatted-string:not(:empty)')]
                           .map(e => e.textContent)
                           ?.join('').trim()
                        )
                           && text != oldDateText
                        ) {
                           oldDateText = text;
                           insertToHTML({ 'text': oldDateText, 'container': container });
                           return true;
                        }
                     }, 1000);
                  });
            });
         function insertToHTML({ text = '', container = required() }) {
            if (!(container instanceof HTMLElement)) return console.error('container not HTMLElement:', container);
            (document.getElementById(DATE_SELECTOR_ID) || (function () {
               container.insertAdjacentHTML('afterend',
                  `<span id="${DATE_SELECTOR_ID}" class="style-scope yt-formatted-string bold" style="font-size: 1.35rem; line-height: 2rem; font-weight:400;">${text}</span>`);
               return document.getElementById(DATE_SELECTOR_ID);
            })())
               .textContent = text;
         }
      }
   },
});
window.nova_plugins.push({
   id: 'save-to-playlist',
   title: 'Add sort/filter to "Save to playlist" menu',
   run_on_pages: 'home, feed, channel, results, watch, -mobile',
   section: 'details',
   _runtime: user_settings => {
      NOVA.waitSelector('tp-yt-paper-dialog #playlists')
         .then(playlists => {
            const container = playlists.closest('tp-yt-paper-dialog');
            new IntersectionObserver(([entry]) => {
               const searchInput = container.querySelector('input[type=search]')
               if (entry.isIntersecting) {
                  if (user_settings.save_to_playlist_sort) sortPlaylistsMenu(playlists);
                  if (!searchInput) insertFilterInput(playlists);
               }
               else if (searchInput) {
                  searchInput.value = '';
                  searchInput.dispatchEvent(new Event('change'));
               }
            })
               .observe(container);
         });
      function sortPlaylistsMenu(playlists = required()) {
         if (!(playlists instanceof HTMLElement)) return console.error('playlists not HTMLElement:', playlists);
         playlists.append(
            ...Array.from(playlists.childNodes)
               .sort(sortByLabel)
         );
         function sortByLabel(a, b) {
            const getLabel = el => el.innerText.trim();
            return stringLocaleCompare(getLabel(a), getLabel(b));
            function stringLocaleCompare(a = required(), b = required()) {
               return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
            }
         }
      }
      function insertFilterInput(container = required()) {
         if (!(container instanceof HTMLElement)) return console.error('container not HTMLElement:', container);
         const searchInput = document.createElement('input');
         searchInput.setAttribute('type', 'search');
         searchInput.setAttribute('placeholder', 'Playlist Filter');
         Object.assign(searchInput.style, {
            padding: '.4em .6em',
            border: 0,
            outline: 0,
            width: '100%',
            'margin-bottom': '1.5em',
            height: '2.5em',
            color: 'var(--ytd-searchbox-text-color)',
            'background-color': 'var(--ytd-searchbox-background)',
         });
         ['change', 'keyup'].forEach(evt => {
            searchInput
               .addEventListener(evt, function () {
                  NOVA.searchFilterHTML({
                     'keyword': this.value,
                     'filter_selectors': '#playlists #checkbox',
                     'highlight_selector': '#label',
                  });
               });
            searchInput
               .addEventListener('click', () => {
                  searchInput.value = '';
                  searchInput.dispatchEvent(new Event('change'));
               });
         });
         container.prepend(searchInput);
      };
   },
   options: {
      save_to_playlist_sort: {
         _tagName: 'input',
         label: 'Default sorting alphabetically',
         type: 'checkbox',
      },
   }
});
window.nova_plugins.push({
   id: 'channel-videos-count',
   title: 'Show channel videos count',
   run_on_pages: 'watch, -mobile',
   restart_on_location_change: true,
   section: 'details',
   opt_api_key_warn: true,
   desc: 'Display uploaded videos on channel',
   _runtime: user_settings => {
      const
         CACHE_PREFIX = 'nova-channel-videos-count:',
         SELECTOR_ID = 'nova-video-count';
      NOVA.waitSelector('#upload-info #owner-sub-count, ytm-slim-owner-renderer .subhead', { stop_on_page_change: true })
         .then(el => setVideoCount(el));
      async function setVideoCount(container = required()) {
         await NOVA.delay(500);
         const channelId = NOVA.getChannelId();
         if (!channelId) return console.error('setVideoCount channelId: empty', channelId);
         if (storage = sessionStorage.getItem(CACHE_PREFIX + channelId)) {
            insertToHTML({ 'text': storage, 'container': container });
         }
         else {
            NOVA.request.API({
               request: 'channels',
               params: { 'id': channelId, 'part': 'statistics' },
               api_key: user_settings['user-api-key'],
            })
               .then(res => {
                  if (res?.error) return alert(`Error [${res.code}]: ${res.reason}\n` + res.error);
                  res?.items?.forEach(item => {
                     if (videoCount = NOVA.prettyRoundInt(item.statistics.videoCount)) {
                        insertToHTML({ 'text': videoCount, 'container': container });
                        sessionStorage.setItem(CACHE_PREFIX + channelId, videoCount);
                     } else console.warn('API is change', item);
                  });
               });
         }
         function insertToHTML({ text = '', container = required() }) {
            if (!(container instanceof HTMLElement)) return console.error('container not HTMLElement:', container);
            (document.getElementById(SELECTOR_ID) || (function () {
               container.insertAdjacentHTML('beforeend',
                  `<span class="date style-scope ytd-video-secondary-info-renderer" style="margin-right:5px;"> • <span id="${SELECTOR_ID}">${text}</span> videos</span>`);
               return document.getElementById(SELECTOR_ID);
            })())
               .textContent = text;
            container.title = `${text} videos`;
         }
      }
   },
});
window.nova_plugins.push({
   id: 'video-date-format',
   title: 'Show date format',
   run_on_pages: 'watch, -mobile',
   section: 'details',
   opt_api_key_warn: true,
   _runtime: user_settings => {
      if (user_settings['description-popup']) return
      const
         CACHE_PREFIX = 'nova-video-date:',
         DATE_SELECTOR_ID = 'nova-video-published-date';
      NOVA.runOnPageInitOrTransition(() => {
         if (NOVA.currentPage == 'watch') {
            NOVA.waitSelector('#title h1', { stop_on_page_change: true })
               .then(el => setVideoDate(el));
         }
      });
      function setVideoDate(container = required()) {
         const videoId = movie_player.getVideoData().video_id || NOVA.queryURL.get('v');
         if (storage = sessionStorage.getItem(CACHE_PREFIX + videoId)) {
            insertToHTML({ 'text': storage, 'container': container });
         }
         NOVA.request.API({
            request: 'videos',
            params: { 'id': videoId, 'part': 'snippet,liveStreamingDetails' },
            api_key: user_settings['user-api-key'],
         })
            .then(res => {
               if (res?.error) return alert(`Error [${res.code}]: ${res.reason}\n` + res.error);
               res?.items?.forEach(item => {
                  let innerHTML = '';
                  if (item.snippet.publishedAt) {
                     innerHTML = NOVA.dateformat.apply(new Date(item.snippet.publishedAt), [user_settings.video_date_format]);
                  }
                  if (item.liveStreamingDetails) {
                     const
                        ACTIVE_LIVE_START = 'Active Livestream since ',
                        ENDED_STREAM_START = `${movie_player.getVideoData().isLive ? 'Livestream' : 'Premiere'} from `,
                        DATETIME_UNTIL_PATTERN = ' until ';
                     if (item.liveStreamingDetails.actualStartTime && item.liveStreamingDetails.actualEndTime) {
                        const
                           timeStart = new Date(item.liveStreamingDetails.actualStartTime),
                           timeEnd = new Date(item.liveStreamingDetails.actualEndTime);
                        innerHTML = ENDED_STREAM_START
                           + NOVA.dateformat.apply(timeStart, [user_settings.video_date_format]);
                        innerHTML += DATETIME_UNTIL_PATTERN
                           + NOVA.dateformat.apply(timeEnd, [
                              timeStart.getDay() === timeEnd.getDay()
                                 ? user_settings.video_date_format.split(' at ')[1]
                                 : user_settings.video_date_format
                           ]);
                     }
                     else if (item.liveStreamingDetails.scheduledStartTime) {
                        innerHTML = ACTIVE_LIVE_START
                           + NOVA.dateformat.apply(new Date(item.liveStreamingDetails.scheduledStartTime), [user_settings.video_date_format]);
                     }
                  }
                  if (innerHTML) {
                     insertToHTML({ 'text': innerHTML, 'container': container });
                     sessionStorage.setItem(CACHE_PREFIX + videoId, innerHTML);
                  }
               });
            });
         function insertToHTML({ text = '', container = required() }) {
            if (!(container instanceof HTMLElement)) return console.error('container not HTMLElement:', container);
            (document.getElementById(DATE_SELECTOR_ID) || (function () {
               container.insertAdjacentHTML('afterend',
                  `<span id="${DATE_SELECTOR_ID}" class="style-scope yt-formatted-string bold" style="font-size: 1.35rem; line-height: 2rem; font-weight:400;">${text}</span>`);
               return document.getElementById(DATE_SELECTOR_ID);
            })())
               .textContent = text;
         }
      }
   },
   options: {
      video_date_format: {
         _tagName: 'select',
         label: 'Date pattern',
         options: [
            { label: 'D MMM Y', value: 'D MMM YYYY' },
            { label: 'D MMM Y HH:mm:ss', value: 'D MMM YYYY at HH:mm:ss', selected: true },
            { label: 'DDD DD/MM/YYYY', value: 'DDD DD/MM/YYYY HH:mm:ss' },
            { label: 'DDDD DD/MM/YYYY', value: 'DDDD DD/MM/YYYY HH:mm:ss' },
            { label: 'Y/MM/DD', value: 'YYYY/MM/DD' },
            { label: 'Y-MM-D', value: 'YYYY-MM-D' },
            { label: 'Y.MM.D', value: 'YYYY.MM.D' },
            { label: 'MM/DD/Y', value: 'MM/DD/YYYY' },
            { label: 'MM/DD/Y HH:mm:ss', value: 'MM/DD/YYYY at HH:mm:ss' },
            { label: 'MM-D-Y', value: 'MM-D-YYYY' },
            { label: 'MM-D-Y HH:mm:ss', value: 'MM-D-YYYY at HH:mm:ss' },
            { label: 'MM.D.Y', value: 'MM.D.YYYY' },
            { label: 'MM.D.Y HH:mm:ss', value: 'MM.D.YYYY at HH:mm:ss' },
         ],
      },
   }
});
window.nova_plugins.push({
   id: 'return-dislike',
   title: 'Show dislike count',
   run_on_pages: 'watch, -mobile',
   section: 'details',
   _runtime: user_settings => {
      if (user_settings.details_button_no_labels
         || user_settings.details_buttons_hide?.includes('like_dislike')
      ) {
         return;
      }
      const
         CACHE_PREFIX = 'nova-dislikes-count:',
         SELECTOR_ID = 'nova-dislikes-count';
      NOVA.runOnPageInitOrTransition(() => {
         if (NOVA.currentPage == 'watch') {
            NOVA.waitSelector('ytd-watch-metadata #menu #segmented-dislike-button button', { stop_on_page_change: true })
               .then(el => setDislikeCount(el));
         }
      });
      async function setDislikeCount(container = required()) {
         const videoId = movie_player.getVideoData().video_id || NOVA.queryURL.get('v');
         if (!videoId) return console.error('return-dislike videoId: empty', videoId);
         container.style.width = 'auto';
         if (storage = sessionStorage.getItem(CACHE_PREFIX + videoId)) {
            insertToHTML({ 'text': storage, 'container': container });
         }
         else if (dislikeCount = await getDislikeCount()) {
            insertToHTML({ 'text': dislikeCount, 'container': container });
         }
         async function getDislikeCount() {
            const videoId = movie_player.getVideoData().video_id || NOVA.queryURL.get('v');
            const fetchAPI = () => fetch(`https://returnyoutubedislikeapi.com/votes?videoId=${videoId}`,
               {
                  method: 'GET',
                  headers: { 'Content-Type': 'application/json' }
               }
            )
               .then(response => response.json())
               .then(json => json.dislikes)
               .catch(error => {
               });
            if (result = await fetchAPI()) {
               sessionStorage.setItem(CACHE_PREFIX + videoId, JSON.stringify(result));
               return result;
            }
         }
         function insertToHTML({ text = '', container = required() }) {
            if (!(container instanceof HTMLElement)) return console.error('container not HTMLElement:', container);
            (document.getElementById(SELECTOR_ID) || (function () {
               container.insertAdjacentHTML('beforeend',
                  `<span id="${SELECTOR_ID}" style="text-overflow:ellipsis; overflow:visible; white-space:nowrap; padding-left:3px;">${text}</span>`);
               return document.getElementById(SELECTOR_ID);
            })())
               .textContent = text;
            container.title = text;
         }
      }
   },
});
window.nova_plugins.push({
   id: 'page-logo',
   title: 'YouTube logo link',
   'title:zh': 'YouTube 徽标',
   'title:ja': 'YouTubeロゴ',
   'title:ko': '유튜브 로고',
   'title:ua': 'YouTube лого',
   run_on_pages: '*, -embed, -mobile, -live_chat',
   section: 'header',
   _runtime: user_settings => {
      NOVA.waitSelector('#masthead a#logo')
         .then(a => a.href = new URL(user_settings.page_logo_url_mode)?.href);
   },
   options: {
      page_logo_url_mode: {
         _tagName: 'input',
         label: 'URL',
         type: 'url',
         pattern: "https://.*",
         placeholder: 'https://youtube.com/...',
         value: 'https://youtube.com/feed/subscriptions',
      },
   }
});
window.nova_plugins.push({
   id: 'search-query',
   title: 'Search filter',
   'title:zh': '搜索过滤器',
   'title:ja': '検索フィルター',
   'title:ko': '검색 필터',
   'title:id': 'Filter pencarian',
   'title:es': 'Filtros de búsqueda',
   'title:pt': 'Filtros de pesquisa',
   'title:fr': 'Filtres de recherche',
   'title:it': 'Filtri di ricerca',
   'title:de': 'Suchfilter',
   'title:pl': 'Filtry wyszukiwania',
   'title:ua': 'Фільтр пошуку',
   run_on_pages: 'results',
   restart_on_location_change: true,
   section: 'header',
   _runtime: user_settings => {
      if (!NOVA.queryURL.has('sp')
         && (sp = user_settings.search_query_date || user_settings.search_query_sort)
      ) {
         location.href = NOVA.queryURL.set({ 'sp': sp });
      }
   },
   options: {
      search_query_sort: {
         _tagName: 'select',
         label: 'Sort by',
         'label:zh': '排序方式',
         'label:ja': '並び替え',
         'label:ko': '정렬 기준',
         'label:id': 'Sortir dengan',
         'label:es': 'Ordenar por',
         'label:pt': 'Ordenar por',
         'label:fr': 'Trier par',
         'label:it': 'Ordina per',
         'label:de': 'Sortieren nach',
         'label:pl': 'Sortuj według',
         'label:ua': 'Сортувати за',
         options: [
            {
               label: 'relevance', value: false, selected: true,
               'label:ua': 'актуальність',
            },
            {
               label: 'upload date', value: 'cai%253d',
               'label:ua': 'дата завантаження',
            },
            {
               label: 'view count', value: 'cam%253d',
               'label:ua': 'кількість переглядів',
            },
            {
               label: 'rating', value: 'cae%253d',
               'label:ua': 'вподобайки',
            },
         ],
         'data-dependent': { 'search_query_date': false },
      },
      search_query_date: {
         _tagName: 'select',
         label: 'Upload date',
         'label:zh': '上传日期',
         'label:ja': 'アップロード日',
         'label:ko': '업로드 날짜',
         'label:id': 'Tanggal unggah',
         'label:es': 'Fecha de carga',
         'label:pt': 'data de upload',
         'label:fr': 'Date de dépôt',
         'label:it': 'data di caricamento',
         'label:de': 'Datum des Hochladens',
         'label:pl': 'Data przesłania',
         'label:ua': 'Дата завантаження',
         options: [
            {
               label: 'all time', value: false, selected: true,
               'label:ua': 'за увесь час',
            },
            {
               label: 'last hour', value: 'egiiaq%253d%253d',
               'label:ua': 'за останню годину',
            },
            {
               label: 'today', value: 'egiiag%253d%253d',
               'label:ua': 'сьогодні',
            },
            {
               label: 'this week', value: 'egiiaw%253d%253d',
               'label:ua': 'цього тижня',
            },
            {
               label: 'this month', value: 'egiiba%253d%253d',
               'label:ua': 'цього місяця',
            },
            {
               label: 'this year', value: 'egiibq%253d%253d',
               'label:ua': 'цього року',
            },
         ],
         'data-dependent': { 'search_query_sort': false },
      },
   }
});
window.nova_plugins.push({
   id: 'header-compact',
   title: 'Header compact',
   'title:zh': '标题紧凑',
   'title:ja': 'ヘッダーコンパクト',
   'title:ko': '헤더 컴팩트',
   'title:id': 'Kompak tajuk',
   'title:es': 'Encabezado compacto',
   'title:pt': 'Cabeçalho compacto',
   'title:fr': 'En-tête compact',
   'title:it': 'Testata compatta',
   'title:de': 'Header kompakt',
   'title:pl': 'Kompaktowy nagłówek',
   'title:ua': 'Компактна шапка сайту',
   run_on_pages: '*, -embed, -mobile, -live_chat',
   section: 'header',
   _runtime: user_settings => {
      const height = '36px';
      NOVA.css.push(
         `#masthead #container.ytd-masthead {
            max-height: ${height} !important;
         }
         
         #masthead #background {
            max-height: ${height} !important;
         }
         #search-form, #search-icon-legacy {
            max-height: ${height} !important;
         }
         body,
         html:not(:fullscreen) #page-manager {
            --ytd-masthead-height: ${height};
         }
         #chips-wrapper.ytd-feed-filter-chip-bar-renderer {
            --ytd-rich-grid-chips-bar-top: ${height};
         }`);
   },
});
window.nova_plugins.push({
   id: 'header-unfixed',
   title: 'Header unpinned',
   'title:zh': '标题未固定',
   'title:ja': 'ヘッダーは固定されていません',
   'title:ko': '헤더가 고정되지 않음',
   'title:id': 'Tajuk tidak diperbaiki',
   'title:es': 'Encabezado sin arreglar',
   'title:pt': 'Cabeçalho não corrigido',
   'title:fr': 'En-tête non corrigé',
   'title:it': 'Intestazione non fissata',
   'title:de': 'Kopfleiste nicht fixiert',
   'title:pl': 'Przewijany nagłówek',
   'title:ua': 'Відкріпити шапку сайту',
   run_on_pages: '*, -embed, -mobile, -live_chat',
   section: 'header',
   desc: 'Prevent header from sticking',
   'desc:zh': '防止头部粘连',
   'desc:ja': 'ヘッダーがくっつくのを防ぎます',
   'desc:ko': '헤더가 달라붙는 것을 방지',
   'desc:id': 'Mencegah header menempel',
   'desc:es': 'Evita que el cabezal se pegue',
   'desc:pt': 'Impede que o cabeçalho grude',
   'desc:fr': "Empêcher l'en-tête de coller",
   'desc:it': "Impedisci che l'intestazione si attacchi",
   'desc:de': 'Verhindert das Ankleben des Headers',
   'desc:pl': 'Nagłówek będzie przewijany wraz ze stroną',
   'desc:ua': 'Відкріпляє шапку при прокрутці сайту',
   _runtime: user_settings => {
      const
         CLASS_NAME_TOGGLE = 'nova-header-unfixed',
         SELECTOR = 'html.' + CLASS_NAME_TOGGLE;
      NOVA.css.push(
         `${SELECTOR} #masthead-container {
            position: absolute !important;
         }
         ${SELECTOR} #chips-wrapper {
            position: sticky !important;
         }
         ${SELECTOR} #header {
            margin-top: 0 !important;
         }`);
      document.documentElement.classList.add(CLASS_NAME_TOGGLE);
      if (user_settings.header_unfixed_hotkey) {
         const hotkey = user_settings.header_unfixed_hotkey || 'v';
         document.addEventListener('keyup', evt => {
            if (['input', 'textarea', 'select'].includes(evt.target.localName) || evt.target.isContentEditable) return;
            if (evt.key === hotkey) {
               document.documentElement.classList.toggle(CLASS_NAME_TOGGLE);
            }
         });
      }
      if (user_settings.header_unfixed_scroll) {
         createArrowButton();
         document.addEventListener('yt-action', evt => {
            if (evt.detail?.actionName == 'yt-store-grafted-ve-action'
            ) {
               scrollAfter();
            }
         });
         function scrollAfter() {
            if ((masthead = document.getElementById('masthead'))
               && (topOffset = masthead.offsetHeight)
               && NOVA.isInViewport(masthead)
            ) {
               window.scrollTo({ top: topOffset });
            }
         }
         function createArrowButton() {
            const scrollDownButton = document.createElement('button');
            scrollDownButton.textContent = '▼';
            scrollDownButton.title = 'Scroll down';
            Object.assign(scrollDownButton.style, {
               cursor: 'pointer',
               background: 'transparent',
               color: 'deepskyblue',
               border: 'none',
            });
            scrollDownButton.onclick = scrollAfter;
            if (endnode = document.getElementById('end')) {
               endnode.parentElement.insertBefore(scrollDownButton, endnode);
            }
         }
      }
   },
   options: {
      header_unfixed_scroll: {
         _tagName: 'input',
         label: 'Scroll after header',
         'label:zh': '在标题后滚动',
         'label:ja': 'ヘッダーの後にスクロール',
         'label:ko': '헤더 뒤 스크롤',
         'label:id': 'Gulir setelah tajuk',
         'label:es': 'Desplazarse después del encabezado',
         'label:pt': 'Role após o cabeçalho',
         'label:fr': "Faire défiler après l'en-tête",
         'label:it': "Scorri dopo l'intestazione",
         'label:de': 'Nach der Kopfzeile scrollen',
         'label:pl': 'Przewiń nagłówek',
         'label:ua': 'Прокручувати після шапки сайту',
         title: 'Makes sense on a small screen',
         'title:zh': '在小屏幕上有意义',
         'title:ja': '小さな画面で意味があります',
         'title:ko': '작은 화면에서 이해하기',
         'title:id': 'Masuk akal di layar kecil',
         'title:es': 'Tiene sentido en una pantalla pequeña',
         'title:pt': 'Faz sentido em uma tela pequena',
         'title:fr': 'A du sens sur un petit écran',
         'title:it': 'Ha senso su un piccolo schermo',
         'title:de': 'Macht auf einem kleinen Bildschirm Sinn',
         'title:pl': 'Przydatne na małym ekranie',
         'title:ua': 'Ефективно на малому екрані',
         type: 'checkbox',
      },
      header_unfixed_hotkey: {
         _tagName: 'select',
         label: 'Hotkey toggle',
         'label:ua': 'Перемикання гарячою клавішею',
         options: [
            { label: 'V', value: 'v', selected: true },
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'w', 'x', 'y', 'z', ']', '[', '+', '-', ',', '.', '/', '<', ';', '\\'
         ],
      },
   },
});
const NOVA = {
   waitSelector(selector = required(), limit_data) {
      if (typeof selector !== 'string') return console.error('wait > selector:', typeof selector);
      if (limit_data?.container && !(limit_data.container instanceof HTMLElement)) return console.error('wait > container not HTMLElement:', limit_data.container);
      if (selector.includes(':has(') && !CSS.supports('selector(:has(*))')) {
         return new Promise((resolve, reject) => {
            console.warn('CSS ":has()" unsupported');
            reject('CSS ":has()" unsupported');
         });
      }
      return new Promise(resolve => {
         if (element = (limit_data?.container || document.body || document).querySelector(selector)) {
            return resolve(element);
         }
         const observer1 = new MutationObserver((mutationRecordsArray, observer) => {
            for (const record of mutationRecordsArray) {
               for (const node of record.addedNodes) {
                  if (![1, 3, 8].includes(node.nodeType) || !(node instanceof HTMLElement)) continue;
                  if (node.matches && node.matches(selector)) {
                     observer.disconnect();
                     return resolve(node);
                  }
                  else if (
                     (parentEl = node.parentElement || node)
                     && (parentEl instanceof HTMLElement)
                     && (element = parentEl.querySelector(selector))
                  ) {
                     observer.disconnect();
                     return resolve(element);
                  }
               }
            }
            if (document?.readyState != 'loading'
               && (element = (limit_data?.container || document?.body || document).querySelector(selector))
            ) {
               observer.disconnect();
               return resolve(element);
            }
         })
         observer1
            .observe(limit_data?.container || document.body || document.documentElement || document, {
               childList: true,
               subtree: true,
               attributes: true,
            });
         if (limit_data?.stop_on_page_change) {
            isURLChange();
            window.addEventListener('transitionend', ({ target }) => {
               if (isURLChange()) {
                  observer1.disconnect();
               }
            });
            function isURLChange() {
               return (this.prevURL === location.href) ? false : this.prevURL = location.href;
            }
         }
      });
   },
   waitUntil(condition = required(), timeout = 100) {
      if (typeof condition !== 'function') return console.error('waitUntil > condition is not fn:', typeof condition);
      return new Promise((resolve) => {
         if (result = condition()) {
            resolve(result);
         }
         else {
            const interval = setInterval(() => {
               if (result = condition()) {
                  clearInterval(interval);
                  resolve(result);
               }
            }, timeout);
         }
      });
   },
   delay(ms = 100) {
      return new Promise(resolve => setTimeout(resolve, ms));
   },
   watchElements_list: {},
   watchElements({ selectors = required(), attr_mark, callback = required() }) {
      if (!Array.isArray(selectors) && typeof selectors !== 'string') return console.error('watch > selector:', typeof selectors);
      if (typeof callback !== 'function') return console.error('watch > callback:', typeof callback);
      this.waitSelector((typeof selectors === 'string') ? selectors : selectors.join(','))
         .then(video => {
            !Array.isArray(selectors) && (selectors = selectors.split(',').map(s => s.trim()));
            process();
            this.watchElements_list[attr_mark] = setInterval(() =>
               document.visibilityState == 'visible' && process(), 1000 * 1.5);
            function process() {
               selectors
                  .forEach(selectorItem => {
                     if (selectorItem.includes(':has(') && !CSS.supports('selector(:has(*))')) {
                        return console.warn('CSS ":has()" unsupported');
                     }
                     if (attr_mark) selectorItem += `:not([${attr_mark}])`;
                     document.body.querySelectorAll(selectorItem)
                        .forEach(el => {
                           if (attr_mark) el.setAttribute(attr_mark, true);
                           callback(el);
                        });
                  });
            }
         });
   },
   runOnPageInitOrTransition(callback) {
      if (!callback || typeof callback !== 'function') {
         return console.error('runOnPageInitOrTransition > callback not function:', ...arguments);
      }
      let prevURL = location.href;
      const isURLChange = () => (prevURL === location.href) ? false : prevURL = location.href;
      isURLChange() || callback();
      document.addEventListener('yt-navigate-finish', () => isURLChange() && callback());
   },
   css: {
      push(css = required(), selector, important) {
         if (typeof css === 'object') {
            if (!selector) return console.error('injectStyle > empty json-selector:', ...arguments);
            injectCss(selector + json2css(css));
            function json2css(obj) {
               let css = '';
               Object.entries(obj)
                  .forEach(([key, value]) => {
                     css += key + ':' + value + (important ? ' !important' : '') + ';';
                  });
               return `{ ${css} }`;
            }
         }
         else if (css && typeof css === 'string') {
            if (document.head) {
               injectCss(css);
            }
            else {
               window.addEventListener('load', () => injectCss(css), { capture: true, once: true });
            }
         }
         else {
            console.error('addStyle > css:', typeof css);
         }
         function injectCss(source = required()) {
            let sheet;
            if (source.endsWith('.css')) {
               sheet = document.createElement('link');
               sheet.rel = 'sheet';
               sheet.href = source;
            }
            else {
               const sheetId = 'NOVA-style';
               sheet = document.getElementById(sheetId) || (function () {
                  const style = document.createElement('style');
                  style.type = 'text/css';
                  style.id = sheetId;
                  return (document.head || document.documentElement).appendChild(style);
               })();
            }
            sheet.textContent += '\n' + source
               .replace(/\n+\s{2,}/g, ' ')
               + '\n';
         }
      },
      getValue(selector = required(), prop_name = required()) {
         return (el = (selector instanceof HTMLElement) ? selector : document.body?.querySelector(selector))
            ? getComputedStyle(el).getPropertyValue(prop_name) : null;
      },
   },
   prettyRoundInt(num) {
      num = +num;
      if (num === 0) return '';
      if (num < 1000) return num;
      const sizes = ['', 'K', 'M', 'B'];
      const i = ~~(Math.log(Math.abs(num)) / Math.log(1000));
      if (!sizes[i]) return num;
      return round(num / 1000 ** i, 1) + sizes[i];
      function round(n, precision = 2) {
         const prec = 10 ** precision;
         return ~~(n * prec) / prec;
      }
   },
   isInViewport(el = required()) {
      if (!(el instanceof HTMLElement)) return console.error('el is not HTMLElement type:', el);
      if (bounding = el.getBoundingClientRect()) {
         return (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.bottom <= window.innerHeight &&
            bounding.right <= window.innerWidth
         );
      }
   },
   collapseElement({ selector = required(), title = required(), remove }) {
      const selector_id = `${title.match(/[a-z]+/gi).join('')}-prevent-load-btn`;
      this.waitSelector(selector.toString())
         .then(el => {
            if (remove) el.remove();
            else {
               if (document.getElementById(selector_id)) return;
               el.style.display = 'none';
               const btn = document.createElement('a');
               btn.textContent = `Load ${title}`;
               btn.id = selector_id;
               btn.className = 'more-button style-scope ytd-video-secondary-info-renderer';
               Object.assign(btn.style, {
                  cursor: 'pointer',
                  'text-align': 'center',
                  'text-transform': 'uppercase',
                  display: 'block',
                  color: 'var(--yt-spec-text-secondary)',
               });
               btn.addEventListener('click', () => {
                  btn.remove();
                  el.style.display = 'unset';
                  window.dispatchEvent(new Event('scroll'));
               });
               el.before(btn);
            }
         });
   },
   aspectRatio: {
      sizeToFit({
         srcWidth = 0, srcHeight = 0,
         maxWidth = window.innerWidth, maxHeight = window.innerHeight
      }) {
         const aspectRatio = Math.min(+maxWidth / +srcWidth, +maxHeight / +srcHeight);
         return {
            width: +srcWidth * aspectRatio,
            height: +srcHeight * aspectRatio,
         };
      },
      getAspectRatio({ width = required(), height = required() }) {
         const
            gcd = (a, b) => b ? gcd(b, a % b) : a,
            divisor = gcd(width, height);
         return width / divisor + ':' + height / divisor;
      },
      chooseAspectRatio({ width = required(), height = required(), layout }) {
         const acceptedRatioList = {
            'landscape': {
               '1:1': 1,
               '3:2': 1.5,
               '4:3': 1.33333333333,
               '5:4': 1.25,
               '5:3': 1.66666666667,
               '16:9': 1.77777777778,
               '16:10': 1.6,
               '17:9': 1.88888888889,
               '21:9': 2.33333333333,
               '24:10': 2.4,
            },
            'portrait': {
               '1:1': 1,
               '2:3': .66666666667,
               '3:4': .75,
               '3:5': .6,
               '4:5': .8,
               '9:16': .5625,
               '9:17': .5294117647,
               '9:21': .4285714286,
               '10:16': .625,
            },
         };
         return choiceRatioFromList(this.getAspectRatio(...arguments)) || acceptedRatioList['landscape']['16:9'];
         function choiceRatioFromList(ratio = required()) {
            const layout_ = layout || ((ratio < 1) ? 'portrait' : 'landscape');
            return acceptedRatioList[layout_][ratio];
         }
      },
      calculateHeight: (width = required(), aspectRatio = (16 / 9)) => parseFloat((width / aspectRatio).toFixed(2)),
      calculateWidth: (height = required(), aspectRatio = (16 / 9)) => parseFloat((height * aspectRatio).toFixed(2)),
   },
   bezelTrigger(text) {
      if (!text) return;
      if (typeof this.fateBezel === 'number') clearTimeout(this.fateBezel);
      const bezelEl = document.body.querySelector('.ytp-bezel-text');
      if (!bezelEl) return console.warn(`bezelTrigger ${text}=>${bezelEl}`);
      const
         bezelContainer = bezelEl.parentElement.parentElement,
         BEZEL_SELECTOR_TOGGLE = '.ytp-text-root';
      if (!this.bezel_css_inited) {
         this.bezel_css_inited = true;
         this.css.push(
            `${BEZEL_SELECTOR_TOGGLE} { display: block !important; }
            ${BEZEL_SELECTOR_TOGGLE} .ytp-bezel-text-wrapper {
               pointer-events: none;
               z-index: 40 !important;
            }
            ${BEZEL_SELECTOR_TOGGLE} .ytp-bezel-text { display: inline-block !important; }
            ${BEZEL_SELECTOR_TOGGLE} .ytp-bezel { display: none !important; }`);
      }
      bezelEl.textContent = text;
      bezelContainer.classList.add(BEZEL_SELECTOR_TOGGLE);
      this.fateBezel = setTimeout(() => {
         bezelContainer.classList.remove(BEZEL_SELECTOR_TOGGLE);
         bezelEl.textContent = '';
      }, 600);
   },
   getChapterList(video_duration = required()) {
      if (NOVA.currentPage != 'embed'
         && (chapsCollect = getFromDescriptionText() || getFromDescriptionChaptersBlock())
         && chapsCollect.length
      ) {
         return chapsCollect;
      }
      else {
         chapsCollect = getFromAPI();
      }
      return chapsCollect;
      function getFromDescriptionText() {
         const selectorTimestampLink = 'a[href*="&t="]';
         let
            timestampsCollect = [],
            nowComment,
            prevSec = -1;
         [
            (
               document.body.querySelector('ytd-watch-flexy')?.playerData?.videoDetails.shortDescription
               || document.body.querySelector('ytd-watch-metadata #description.ytd-watch-metadata')?.textContent
            ),
            //...[...document.body.querySelectorAll(`#comments #comment #comment-content:has(${selectorTimestampLink})`)]
            ...[...document.body.querySelectorAll(`#comments #comment #comment-content ${selectorTimestampLink} + *:last-child`)]
               .map(el => ({
                  'source': 'comment',
                  'text': el.closest('#comment-content')?.textContent,
               })),
         ]
            .forEach(data => {
               if (timestampsCollect.length > 1) return;
               nowComment = Boolean(data?.source);
               (data?.text || data)
                  ?.split('\n')
                  .forEach(line => {
                     line = line?.toString().trim();
                     if (line.length > 5 && line.length < 200 && (timestamp = /((\d?\d:){1,2}\d{2})/g.exec(line))) {
                        timestamp = timestamp[0];
                        const
                           sec = NOVA.timeFormatTo.hmsToSec(timestamp),
                           timestampPos = line.indexOf(timestamp);
                        if (
                           (nowComment ? true : (sec > prevSec && sec < +video_duration))
                           && (timestampPos < 5 || (timestampPos + timestamp.length) === line.length)
                        ) {
                           if (nowComment) prevSec = sec;
                           timestampsCollect.push({
                              'sec': sec,
                              'time': timestamp,
                              'title': line
                                 .replace(timestamp, '')
                                 .trim().replace(/^[:\-–—|]|(\[\])?|[:\-–—.;|]$/g, '')
                                 //.trim().replace(/^([:\-–—|]|(\d+[\.)]))|(\[\])?|[:\-–—.;|]$/g, '') 
                                 .trim()
                           });
                        }
                     }
                  });
            });
         if (timestampsCollect.length == 1 && timestampsCollect[0].sec < (video_duration / 4)) {
            return timestampsCollect;
         }
         else if (timestampsCollect.length > 1) {
            if (nowComment) {
               timestampsCollect = timestampsCollect.sort((a, b) => a.sec - b.sec);
            }
            return timestampsCollect;
         }
      }
      async function getFromDescriptionChaptersBlock() {
         await NOVA.delay(500);
         const selectorTimestampLink = 'a[href*="&t="]';
         let timestampsCollect = [];
         document.body.querySelectorAll(`#structured-description ${selectorTimestampLink}`)
            .forEach(chaperLink => {
               if (sec = parseInt(NOVA.queryURL.get('t', chaperLink.href))) {
                  timestampsCollect.push({
                     'time': NOVA.timeFormatTo.HMS.digit(sec),
                     'sec': sec,
                     'title': chaperLink.textContent.trim().split('\n')[0].trim(),
                  });
               }
            });
         if (timestampsCollect.length == 1 && timestampsCollect[0].sec < (video_duration / 4)) {
            return timestampsCollect;
         }
         else if (timestampsCollect.length > 1) {
            return timestampsCollect;
         }
      }
      function getFromAPI() {
         if (!window.ytPubsubPubsubInstance) {
            return console.warn('ytPubsubPubsubInstance is null:', ytPubsubPubsubInstance);
         }
         if (ytPubsubPubsubInstance = ytPubsubPubsubInstance.i
            || ytPubsubPubsubInstance.j
            || ytPubsubPubsubInstance.subscriptions_
         ) {
            const data = Object.values(
               ytPubsubPubsubInstance.find(a => a?.player)?.player.app
            )
               .find(a => a?.videoData)
               ?.videoData.multiMarkersPlayerBarRenderer;
            if (data?.markersMap?.length) {
               return data.markersMap[0].value.chapters
                  ?.map(c => {
                     const sec = +c.chapterRenderer.timeRangeStartMillis / 1000;
                     return {
                        'sec': sec,
                        'time': NOVA.timeFormatTo.HMS.digit(sec),
                        'title':
                           c.chapterRenderer.title.simpleText
                           || c.chapterRenderer.title.runs[0].text,
                     };
                  });
            }
         }
      }
   },
   searchFilterHTML({ keyword = required(), filter_selectors = required(), highlight_selector }) {
      keyword = keyword.toString().toLowerCase();
      document.body.querySelectorAll(filter_selectors)
         .forEach(item => {
            const
               text = item.textContent,
               hasText = text?.toLowerCase().includes(keyword),
               highlight = el => {
                  if (el.innerHTML.includes('<mark ')) {
                     el.innerHTML = el.innerHTML
                        .replace(/<\/?mark[^>]*>/g, '');
                  }
                  item.style.display = hasText ? '' : 'none';
                  if (hasText && keyword) {
                     highlightTerm({
                        'target': el,
                        'keyword': keyword,
                     });
                  }
               };
            (highlight_selector ? item.querySelectorAll(highlight_selector) : [item])
               .forEach(highlight);
         });
      function highlightTerm({ target = required(), keyword = required(), highlightClass }) {
         const
            content = target.textContent,
            pattern = new RegExp('(>[^<.]*)?(' + keyword + ')([^<.]*)?', 'gi'),
            highlightStyle = highlightClass ? `class="${highlightClass}"` : 'style="background-color:#afafaf"',
            replaceWith = `$1<mark ${highlightStyle}>$2</mark>$3`,
            marked = content.replaceAll(pattern, replaceWith);
         return (target.innerHTML = marked) !== content;
      }
   },
   isMusic() {
      return checkMusicType();
      function checkMusicType() {
         const
            channelName = movie_player.getVideoData().author,
            titleStr = movie_player.getVideoData().title.toUpperCase(),
            titleWordsList = titleStr?.toUpperCase().match(/\w+/g),
            playerData = document.body.querySelector('ytd-watch-flexy')?.playerData;
         return [
            titleStr,
            location.href,
            channelName,
            playerData?.microformat?.playerMicroformatRenderer.category,
            playerData?.title,
         ]
            .some(i => i?.toUpperCase().includes('MUSIC'))
            || document.body.querySelector('#upload-info #channel-name .badge-style-type-verified-artist')
            || (channelName && /(VEVO|Topic|Records|RECORDS|AMV)$/.test(channelName))
            || (channelName && /(MUSIC|ROCK|SOUNDS|SONGS)/.test(channelName.toUpperCase()))
            || titleWordsList?.length && ['🎵', '♫', 'AUDIO', 'SONG', 'SOUND', 'SONGS', 'SOUNDTRACK', 'LYRIC', 'LYRICS', 'AMBIENT', 'MIX', 'VEVO', 'CLIP', 'KARAOKE', 'OPENING', 'COVER', 'COVERED', 'VOCAL', 'INSTRUMENTAL', 'ORCHESTRAL', 'DJ', 'DNB', 'BASS', 'BEAT', 'HITS', 'ALBUM', 'PLAYLIST', 'DUBSTEP', 'CHILL', 'RELAX', 'CLASSIC', 'CINEMATIC']
               .some(i => titleWordsList.includes(i))
            || ['OFFICIAL VIDEO', 'OFFICIAL AUDIO', 'FEAT.', 'FT.', 'LIVE RADIO', 'DANCE VER', 'HIP HOP', 'ROCK N ROLL', 'HOUR VER', 'HOURS VER', 'INTRO THEME']
               .some(i => titleStr.includes(i))
            || titleWordsList?.length && ['OP', 'ED', 'MV', 'OST', 'NCS', 'BGM', 'EDM', 'GMV', 'AMV', 'MMD', 'MAD']
               .some(i => titleWordsList.includes(i));
      }
   },
   timeFormatTo: {
      hmsToSec(str) {
         let
            parts = str?.split(':'),
            t = 0;
         switch (parts?.length) {
            case 2: t = (parts[0] * 60); break;
            case 3: t = (parts[0] * 60 * 60) + (parts[1] * 60); break;
            case 4: t = (parts[0] * 24 * 60 * 60) + (parts[1] * 60 * 60) + (parts[2] * 60); break;
         }
         return t + +parts.pop();
      },
      HMS: {
         digit(time_sec = required()) {
            const
               ts = Math.abs(+time_sec),
               d = ~~(ts / 86400),
               h = ~~((ts % 86400) / 3600),
               m = ~~((ts % 3600) / 60),
               s = ~~(ts % 60);
            return (d ? `${d}d ` : '')
               + (h ? (d ? h.toString().padStart(2, '0') : h) + ':' : '')
               + (h ? m.toString().padStart(2, '0') : m) + ':'
               + s.toString().padStart(2, '0');
         },
         abbr(time_sec = required()) {
            const
               ts = Math.abs(+time_sec),
               d = ~~(ts / 86400),
               h = ~~((ts % 86400) / 3600),
               m = ~~((ts % 3600) / 60),
               s = ~~(ts % 60);
            return (d ? `${d}d ` : '')
               + (h ? (d ? h.toString().padStart(2, '0') : h) + 'h' : '')
               + (m ? (h ? m.toString().padStart(2, '0') : m) + 'm' : '')
               + (s ? (m ? s.toString().padStart(2, '0') : s) + 's' : '');
         },
      },
      ago(date = required()) {
         if (!(date instanceof Date)) return console.error('"date" is not Date type:', date);
         const samples = [
            { label: 'year', seconds: 31536000 },
            { label: 'month', seconds: 2592000 },
            { label: 'day', seconds: 86400 },
            { label: 'hour', seconds: 3600 },
            { label: 'minute', seconds: 60 },
            { label: 'second', seconds: 1 }
         ];
         const
            now = date.getTime(),
            seconds = ~~((Date.now() - Math.abs(now)) / 1000),
            interval = samples.find(i => i.seconds < seconds),
            time = ~~(seconds / interval.seconds);
         return `${(now < 0 ? '-' : '') + time} ${interval.label}${time !== 1 ? 's' : ''}`;
      },
   },
   dateformat(format = 'YYYY/MM/DD') {
      if (!(date instanceof Date)) return console.error('dateformat - is not Date type:', this);
      const
         twoDigit = n => n.toString().padStart(2, '0'),
         date = this.getDate(),
         year = this.getFullYear(),
         month = this.getMonth(),
         day = this.getDay(),
         hours = this.getHours(),
         minutes = this.getMinutes(),
         seconds = this.getSeconds();
      return format
         .replace(/A|Z|S(SS)?|ss?|mm?|HH?|hh?|D{1,4}|M{1,4}|YY(YY)?|'([^']|'')*'/g, partPattern => {
            let out;
            switch (partPattern) {
               case 'YY': out = year.substr(2); break;
               case 'YYYY': out = year; break;
               case 'M': out = month; break;
               case 'MM': out = twoDigit(month); break;
               case 'MMM': out = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month]; break;
               case 'MMMM': out = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][month]; break;
               case 'D': out = date; break;
               case 'DD': out = twoDigit(date); break;
               case 'DDD': out = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'][day]; break;
               case 'DDDD': out = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day]; break;
               case 'h': out = (hours % 12) || 12; break;
               case 'H': out = hours; break;
               case 'HH': out = twoDigit(hours); break;
               case 'mm': out = twoDigit(minutes); break;
               case 's': out = seconds; break;
               case 'ss': out = twoDigit(seconds); break;
               case 'SS': out = twoDigit(seconds); break;
               case 'A': out = (hours < 12 ? 'AM' : 'PM'); break;
               case 'Z': out = ('+' + -this.getTimezoneOffset() / 60)
                  .replace(/^\D?(\D)/, "$1")
                  .replace(/^(.)(.)$/, "$10$2") + '00';
                  break;
            }
            return out;
         });
   },
   updateUrl: (new_url = required()) => window.history.replaceState(null, null, new_url),
   queryURL: {
      has: (query = required(), url_string) => new URL(url_string || location).searchParams.has(query.toString()),
      get: (query = required(), url_string) => new URL(url_string || location).searchParams.get(query.toString()),
      set(query_obj = {}, url_string) {
         if (typeof query_obj != 'object' || !Object.keys(query_obj).length) return console.error('query_obj:', query_obj)
         const url = new URL(url_string || location);
         Object.entries(query_obj).forEach(([key, value]) => url.searchParams.set(key, value));
         return url.toString();
      },
      remove(query = required(), url_string) {
         const url = new URL(url_string || location);
         url.searchParams.delete(query.toString());
         return url.toString();
      },
   },
   request: (() => {
      const API_STORE_NAME = 'YOUTUBE_API_KEYS';
      async function getKeys() {
         NOVA.log('request.API: fetch to youtube_api_keys.json');
         return await fetch('https://gist.githubusercontent.com/raingart/ff6711fafbc46e5646d4d251a79d1118/raw/youtube_api_keys.json')
            .then(res => res.text())
            .then(keys => {
               NOVA.log(`get and save keys in localStorage`, keys);
               localStorage.setItem(API_STORE_NAME, keys);
               return JSON.parse(keys);
            })
            .catch(error => {
               localStorage.removeItem(API_STORE_NAME);
               throw error;
            })
            .catch(reason => console.error('Error get keys:', reason));
      }
      return {
         async API({ request = required(), params = required(), api_key }) {
            const YOUTUBE_API_KEYS = localStorage.hasOwnProperty(API_STORE_NAME)
               ? JSON.parse(localStorage.getItem(API_STORE_NAME)) : await getKeys();
            if (!api_key && (!Array.isArray(YOUTUBE_API_KEYS) || !YOUTUBE_API_KEYS?.length)) {
               localStorage.hasOwnProperty(API_STORE_NAME) && localStorage.removeItem(API_STORE_NAME);
               return console.error('YOUTUBE_API_KEYS empty:', YOUTUBE_API_KEYS);
            }
            const referRandKey = arr => api_key || 'AIzaSy' + arr[~~(Math.random() * arr.length)];
            const query = Object.keys(params)
               .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
               .join('&');
            const URL = `https://www.googleapis.com/youtube/v3/${request}?${query}&key=` + referRandKey(YOUTUBE_API_KEYS);
            return await fetch(URL)
               .then(response => response.json())
               .then(json => {
                  if (!json?.error && Object.keys(json).length) return json;
                  console.warn('used key:', NOVA.queryURL.get('key', URL));
                  if (json?.error && Object.keys(json.error).length) {
                     throw new Error(JSON.stringify(json?.error));
                  }
               })
               .catch(error => {
                  localStorage.removeItem(API_STORE_NAME);
                  console.error(`Request API failed:${URL}\n${error}`);
                  if (error?.message && (err = JSON.parse(error?.message))) {
                     return {
                        'code': err.code,
                        'reason': err.errors?.length && err.errors[0].reason,
                        'error': err.message,
                     };
                  }
               });
         },
      };
   })(),
   getPlayerState(state) {
      return {
         '-1': 'UNSTARTED',
         0: 'ENDED',
         1: 'PLAYING',
         2: 'PAUSED',
         3: 'BUFFERING',
         5: 'CUED'
      }[state || movie_player.getPlayerState()];
   },
   videoElement: (() => {
      const videoSelector = '#movie_player:not(.ad-showing) video';
      document.addEventListener('canplay', ({ target }) => {
         target.matches(videoSelector) && (NOVA.videoElement = target);
      }, { capture: true, once: true });
      document.addEventListener('play', ({ target }) => {
         target.matches(videoSelector) && (NOVA.videoElement = target);
      }, true);
   })(),
   isFullscreen: () => (
      movie_player.classList.contains('ytp-fullscreen')
      || (movie_player.hasOwnProperty('isFullscreen') && movie_player.isFullscreen())
   ),
   getChannelId(api_key) {
      const isChannelId = id => id && /UC([a-z0-9-_]{22})$/i.test(id);
      let result = [
         document.querySelector('meta[itemprop="channelId"][content]')?.content,
         (document.body.querySelector('ytd-app')?.__data?.data?.response
            || document.body.querySelector('ytd-app')?.data?.response
            || window.ytInitialData
         )
            ?.metadata?.channelMetadataRenderer?.externalId,
         document.querySelector('link[itemprop="url"][href]')?.href.split('/')[4],
         location.pathname.split('/')[2],
         document.body.querySelector('#video-owner a[href]')?.href.split('/')[4],
         document.body.querySelector('a.ytp-ce-channel-title[href]')?.href.split('/')[4],
         document.body.querySelector('ytd-watch-flexy')?.playerData?.videoDetails.channelId,
         ((typeof ytcfg === 'object') && (obj = ytcfg.data_?.PLAYER_VARS?.embedded_player_response)
            && NOVA.seachInObjectBy.key({
               'obj': JSON.parse(obj),
               'keys': 'channelId',
            })?.data),
      ]
         .find(i => isChannelId(i));
      return result;
   },
   storage_obj_manager: {
      STORAGE_NAME: 'nova-channels-state',
      async initStorage() {
         this.channelId = location.search.includes('list=')
            ? (NOVA.queryURL.get('list') || movie_player?.getPlaylistId())
            : await NOVA.waitUntil(NOVA.getChannelId, 1000);
      },
      read(return_all) {
         if (store = JSON.parse(localStorage.getItem(this.STORAGE_NAME))) {
            return return_all ? store : store[this.channelId];
         }
      },
      write(obj_save) {
         if ((storage = this.read('all') || {})) {
            if (Object.keys(obj_save).length) {
               storage = Object.assign(storage, { [this.channelId]: obj_save });
            }
            else {
               delete storage[this.channelId];
            }
         }
         localStorage.setItem(this.STORAGE_NAME, JSON.stringify(storage));
      },
      _getParam(key = required()) {
         if (storage = this.read()) {
            return storage[key];
         }
      },
      async getParam(key = required()) {
         if (!this.channelId) await this.initStorage();
         return this._getParam(...arguments);
      },
      save(obj_save) {
         if (storage = this.read()) {
            obj_save = Object.assign(storage, obj_save);
         }
         this.write(obj_save);
      },
      remove(key) {
         if ((storage = this.read())) {
            delete storage[key];
            this.write(storage);
         }
      },
   },
   seachInObjectBy: {
      key({ obj = required(),
         keys = required(),
         match_fn = data => data.constructor.name !== 'Object',
         multiple = false,
         path = ''
      }) {
         const setPath = d => (path ? path + '.' : '') + d;
         let hasKey, results = [];
         for (const prop in obj) {
            if (obj.hasOwnProperty(prop) && obj[prop]) {
               hasKey = keys.constructor.name === 'String' ? (keys === prop) : keys.indexOf(prop) > -1;
               if (hasKey && (!match_fn || match_fn(obj[prop]))) {
                  if (multiple) {
                     results.push({
                        'path': setPath(prop),
                        'data': obj[prop],
                     });
                  }
                  else {
                     return {
                        'path': setPath(prop),
                        'data': obj[prop],
                     };
                  }
               }
               else {
                  switch (obj[prop].constructor.name) {
                     case 'Object':
                        if (result = this.key({
                           'obj': obj[prop],
                           'keys': keys,
                           'path': setPath(prop),
                           'match_fn': match_fn,
                        })) {
                           if (multiple) results.push(result);
                           else return result;
                        }
                        break;
                     case 'Array':
                        for (let i = 0; i < obj[prop].length; i++) {
                           if (result = this.key({
                              'obj': obj[prop][i],
                              'keys': keys,
                              'path': path + `[${i}]`,
                              'match_fn': match_fn,
                           })) {
                              if (multiple) results.push(result);
                              else return result;
                           }
                        }
                        break;
                     case 'Function':
                        if (Object.keys(obj[prop]).length) {
                           for (const j in obj[prop]) {
                              if (typeof obj[prop] !== 'undefined') {
                                 if (result = this.key({
                                    'obj': obj[prop][j],
                                    'keys': keys,
                                    'path': setPath(prop) + '.' + j,
                                    'match_fn': match_fn,
                                 })) {
                                    if (multiple) results.push(result);
                                    else return result;
                                 }
                              }
                           }
                        }
                        break;
                  }
               }
            }
         }
         if (multiple) return results;
      },
   },
   log() {
      if (this.DEBUG && arguments.length) {
         console.groupCollapsed(...arguments);
         console.trace();
         console.groupEnd();
      }
   }
}
window.nova_plugins.push({
   id: 'scroll-to-top',
   title: 'Add "Scroll to top" button',
   'title:zh': '滚动到顶部按钮',
   'title:ja': 'トップボタンまでスクロール',
   'title:ko': '맨 위로 스크롤 버튼',
   'title:id': 'Gulir ke tombol atas',
   'title:es': 'Desplazarse al botón superior',
   'title:pt': 'Role para o botão superior',
   'title:fr': 'Faites défiler vers le haut',
   'title:it': 'Scorri fino al pulsante in alto',
   'title:de': 'Nach oben scrollen',
   'title:pl': 'Przycisk przewijania do góry',
   'title:ua': 'Прокрутити до гори',
   run_on_pages: '*, -embed, -mobile, -live_chat',
   section: 'other',
   desc: 'Displayed on long pages',
   'desc:zh': '出现在长页面上',
   'desc:ja': '長いページに表示されます',
   'desc:ko': '긴 페이지에 표시됨',
   'desc:id': 'Ditampilkan di halaman panjang',
   'desc:es': 'Mostrado en páginas largas',
   'desc:pt': 'Exibido em páginas longas',
   'desc:fr': 'Affiché sur de longues pages',
   'desc:it': 'Visualizzato su pagine lunghe',
   'desc:de': 'Wird auf langen Seiten angezeigt',
   'desc:pl': 'Wyświetlaj na długich stronach',
   'desc:ua': 'Відображається на довгих сторінках',
   _runtime: user_settings => {
      document.addEventListener('scroll', insertButton, { capture: true, once: true });
      function insertButton() {
         const SELECTOR_ID = 'nova-scrollTop-btn';
         const btn = document.createElement('button');
         btn.id = SELECTOR_ID;
         Object.assign(btn.style, {
            position: 'fixed',
            cursor: 'pointer',
            bottom: 0,
            left: '20%',
            visibility: 'hidden',
            opacity: .5,
            width: '40%',
            height: '40px',
            border: 'none',
            outline: 'none',
            'z-index': 1,
            'border-radius': '100% 100% 0 0',
            'font-size': '16px',
            'background-color': 'rgba(0,0,0,.3)',
            'box-shadow': '0 16px 24px 2px rgba(0, 0, 0, .14), 0 6px 30px 5px rgba(0, 0, 0, .12), 0 8px 10px -5px rgba(0, 0, 0, .4)',
         });
         btn.addEventListener('click', () => {
            window.scrollTo({
               top: 0,
               behavior: user_settings.scroll_to_top_smooth ? 'smooth' : 'instant',
            });
            if (user_settings.scroll_to_top_autoplay && NOVA.currentPage == 'watch'
               && ['UNSTARTED', 'PAUSED'].includes(NOVA.getPlayerState())
            ) {
               movie_player.playVideo();
            }
         });
         const arrow = document.createElement('span');
         Object.assign(arrow.style, {
            border: 'solid white',
            'border-width': '0 3px 3px 0',
            display: 'inline-block',
            padding: '4px',
            'vertical-align': 'middle',
            transform: 'rotate(-135deg)',
         });
         btn.append(arrow);
         document.body.append(btn);
         NOVA.css.push(
            `#${SELECTOR_ID}:hover {
               opacity: 1 !important;
               background-color: rgba(0,0,0,.6) !important;
            }`);
         const scrollTop_btn = document.getElementById(SELECTOR_ID);
         let sOld;
         window.addEventListener('scroll', () => {
            const sCurr = document.documentElement.scrollTop > (window.innerHeight / 2);
            if (sCurr == sOld) return;
            sOld = sCurr;
            scrollTop_btn.style.visibility = sCurr ? 'visible' : 'hidden';
         });
      }
   },
   options: {
      scroll_to_top_smooth: {
         _tagName: 'input',
         label: 'Smooth',
         'label:zh': '光滑的',
         'label:ja': 'スムーズ',
         'label:ko': '매끄러운',
         'label:id': 'Mulus',
         'label:es': 'Suave',
         'label:pt': 'Suave',
         'label:fr': 'Lisse',
         'label:it': 'Scorrimento fluido',
         'label:de': 'Glatt',
         'label:pl': 'Płynnie',
         'label:ua': 'Плавно',
         type: 'checkbox',
      },
      scroll_to_top_autoplay: {
         _tagName: 'input',
         label: 'Unpause video',
         'label:zh': '视频取消暂停',
         'label:ja': 'ビデオの一時停止解除',
         'label:ko': '비디오 일시 중지 해제',
         'label:id': 'Video batalkan Jeda',
         'label:es': 'Reanudar video',
         'label:pt': 'Retomar vídeo',
         'label:fr': 'Annuler la pause de la vidéo',
         'label:it': 'Annulla pausa video',
         'label:de': 'Video wieder anhalten',
         'label:pl': 'Wyłącz wstrzymanie odtwarzania filmu',
         'label:ua': 'Продовжити програвання відео',
         type: 'checkbox',
      },
   }
});
window.nova_plugins.push({
   id: 'thumbs-title-filter',
   title: 'Block thumbnails by title',
   'title:zh': '按标题阻止缩略图',
   'title:ja': 'タイトルでサムネイルをブロックする',
   'title:ko': '제목으로 축소판 차단',
   'title:id': 'Blokir gambar mini berdasarkan judul',
   'title:es': 'Bloquear miniaturas por título',
   'title:pt': 'Bloquear miniaturas por título',
   'title:fr': 'Bloquer les vignettes par titre',
   'title:it': 'Blocca le miniature per titolo',
   'title:de': 'Thumbnails nach Titel blockieren',
   'title:pl': 'Blokuj miniatury według tytułu',
   'title:ua': 'Блокуйте мініатюри за назвою',
   run_on_pages: '*, -embed, -mobile, -live_chat',
   section: 'other',
   _runtime: user_settings => {
      const keywords = user_settings.thumb_filter_title_blocklist
         ?.split(/[\n,;]/)
         .map(e => e.toString().trim().toLowerCase())
         .filter(e => e.length);
      const thumbsSelectors = [
         'ytd-rich-item-renderer',
         'ytd-video-renderer',
         'ytd-compact-video-renderer',
         'ytm-compact-video-renderer',
         'ytm-item-section-renderer'
      ]
         .join(',');
      if (NOVA.isMobile) {
         NOVA.watchElements({
            selectors: ['#video-title:not(:empty)'],
            attr_mark: 'nova-thumb-title-filtered',
            callback: video_title => {
               keywords.forEach(keyword => {
                  if (video_title.textContent.trim().toLowerCase().includes(keyword)
                     && (thumb = channel_name.closest(thumbsSelectors))
                  ) {
                  }
               });
            }
         });
      } else {
         document.addEventListener('yt-action', evt => {
            if ([
               'yt-append-continuation-items-action',
               'ytd-update-grid-state-action',
               'yt-service-request',
               'ytd-rich-item-index-update-action',
            ]
               .includes(evt.detail?.actionName)
            ) {
               hideThumb();
            }
         });
         function hideThumb() {
            document.body.querySelectorAll('#video-title')
               .forEach(el => {
                  keywords.forEach(keyword => {
                     if (el.innerText.toLowerCase().includes(keyword)
                        && (thumb = el.closest(thumbsSelectors))
                     ) {
                        thumb.remove();
                     }
                  });
               });
         }
      }
   },
   options: {
      thumb_filter_title_blocklist: {
         _tagName: 'textarea',
         label: 'Words list',
         'label:zh': '单词列表',
         'label:ja': '単語リスト',
         'label:ko': '단어 목록',
         'label:id': 'Daftar kata',
         'label:es': 'lista de palabras',
         'label:pt': 'Lista de palavras',
         'label:fr': 'Liste de mots',
         'label:it': 'Elenco di parole',
         'label:de': 'Wortliste',
         'label:pl': 'Lista słów',
         'label:ua': 'Список слів',
         title: 'separator: "," or ";" or "new line"',
         'title:zh': '分隔器： "," 或 ";" 或 "新队"',
         'title:ja': 'セパレータ： "," または ";" または "改行"',
         'title:ko': '구분 기호: "," 또는 ";" 또는 "새 줄"',
         'title:id': 'pemisah: "," atau ";" atau "baris baru"',
         'title:es': 'separador: "," o ";" o "new line"',
         'title:pt': 'separador: "," ou ";" ou "new line"',
         'title:fr': 'séparateur : "," ou ";" ou "nouvelle ligne"',
         'title:it': 'separatore: "," o ";" o "nuova linea"',
         'title:de': 'separator: "," oder ";" oder "new line"',
         'title:pl': 'separator: "," lub ";" lub "now linia"',
         'title:ua': 'розділювач: "," або ";" або "новий рядок"',
         placeholder: 'text1, text2',
         required: true,
      },
   }
});
window.nova_plugins.push({
   id: 'scrollbar-hide',
   title: 'Hide scrollbar in watch page',
   'title:ua': 'Приховати смугу прокрутки на сторінці перегляду',
   run_on_pages: '*, -embed, -mobile',
   section: 'other',
   _runtime: user_settings => {
      const HIDE_SCROLL_ATTR = 'nova-scrollbar-hide';
      NOVA.css.push(
         `html[${HIDE_SCROLL_ATTR}] body::-webkit-scrollbar {
            display: none;
         }`);
      NOVA.runOnPageInitOrTransition(() => {
         let hasAttr = document.documentElement.hasAttribute(HIDE_SCROLL_ATTR);
         if ((NOVA.currentPage == 'watch') && !hasAttr) {
            document.documentElement.toggleAttribute(HIDE_SCROLL_ATTR);
         }
         else if ((NOVA.currentPage != 'watch') && hasAttr) {
            document.documentElement.removeAttribute(HIDE_SCROLL_ATTR);
         }
      });
      if (user_settings.scrollbar_hide_livechat && NOVA.currentPage == 'live_chat') {
         return NOVA.css.push(
            `*,
            #item-scroller {
               -ms-overflow-style: none; 
               scrollbar-width: none; 
            }
            *::-webkit-scrollbar,
            #item-scroller::-webkit-scrollbar {
               display: none; 
            }`);
      }
   },
   options: {
      scrollbar_hide_livechat: {
         _tagName: 'input',
         label: 'In live-chat frame',
         'label:ua': 'У живому чаті',
         type: 'checkbox',
         'data-dependent': { 'livechat_visibility_mode': ['!disable'] },
      },
   }
});
window.nova_plugins.push({
   id: 'disable-video-cards',
   title: 'Hide html garbage',
   'title:ua': 'Приховайте сміття: анотації, кінцеві заставки тощо',
   run_on_pages: 'results, watch, embed, -mobile',
   section: 'other',
   desc: 'Remove the annoying stuff',
   'desc:ua': 'Приховайте набридливий контент',
   _runtime: user_settings => {
      let selectorsList = [
         '.ytp-paid-content-overlay',
         '.iv-branding',
         '#movie_player:not(:hover) > [class^="ytp-ce-"]',
         '.ytp-cards-teaser-text',
         'ytm-paid-content-overlay-renderer',
      ];
      switch (NOVA.currentPage) {
         case 'embed':
            selectorsList.push([
               '.ytp-pause-overlay',
               '.ytp-info-panel-preview',
            ]);
            break;
         default:
            selectorsList.push([
               'ytd-search-pyv-renderer',
               '[class^="ytd-promoted-"]',
               'ytd-video-renderer + ytd-shelf-renderer',
               'ytd-video-renderer + ytd-reel-shelf-renderer',
               '#clarify-box',
               '.ytd-watch-flexy.attached-message',
               'ytd-popup-container tp-yt-paper-dialog ytd-single-option-survey-renderer',
               '#donation-shelf ytd-donation-unavailable-renderer',
               '.sparkles-light-cta',
               'ytd-feed-nudge-renderer',
            ]);
            NOVA.css.push(
               [
                  'ytd-rich-item-renderer:has(ytd-ad-slot-renderer)',
                  'ytd-live-chat-frame#chat[collapsed]:has(iframe#chatframe[src="about:blank"])',
               ]
                  .join(',\n') + `{ display: none !important;}`);
      }
      if (selectorsList.length) {
         NOVA.css.push(
            selectorsList.join(',\n') + ` {
               display: none !important;
            }`);
      }
   },
});
window.nova_plugins.push({
   id: 'thumbnails-clear',
   title: 'Clear thumbnails',
   'title:zh': '清除缩略图',
   'title:ja': 'サムネイルをクリアする',
   'title:ko': '썸네일 지우기',
   'title:id': 'Hapus gambar mini',
   'title:es': 'Miniaturas claras',
   'title:pt': 'Limpar miniaturas',
   'title:fr': 'Effacer les vignettes',
   'title:it': 'Cancella miniature',
   'title:de': 'Miniaturansichten löschen',
   'title:pl': 'Wyczyść miniatury',
   'title:ua': 'Очистити мініатюри',
   run_on_pages: 'home, feed, channel, watch',
   section: 'other',
   desc: 'Replaces the predefined clickbait thumbnails',
   'desc:zh': '替换预定义的缩略图',
   'desc:ja': '事前定義されたサムネイルを置き換えます',
   'desc:ko': '미리 정의된 축소판을 대체합니다',
   'desc:id': 'Menggantikan gambar mini yang telah ditentukan sebelumnya',
   'desc:es': 'Reemplaza la miniatura predefinida',
   'desc:pt': 'Substitui a miniatura predefinida',
   'desc:it': 'Sostituisce la miniatura predefinita',
   'desc:de': 'Ersetzt das vordefinierte Thumbnail',
   'desc:pl': 'Zastępuje predefiniowaną miniaturkę',
   'desc:ua': 'Замінює попередньо визначені мініатюри клікбейти',
   _runtime: user_settings => {
      const
         ATTR_MARK = 'nova-thumb-preview-cleared',
         thumbsSelectors = [
            'ytd-rich-item-renderer',
            'ytd-video-renderer',
            'ytm-compact-video-renderer',
            'ytm-item-section-renderer'
         ];
      let DISABLE_YT_IMG_DELAY_LOADING_default = false;
      NOVA.watchElements({
         selectors: [
            '#thumbnail:not(.ytd-playlist-thumbnail):not([class*=markers]):not([href*="/shorts/"]) img[src]:not([src*="_live.jpg"])',
            'a:not([href*="/shorts/"]) img.video-thumbnail-img[src]:not([src*="_live.jpg"])'
         ],
         attr_mark: ATTR_MARK,
         callback: async img => {
            if (NOVA.currentPage == 'results') return;
            if (window.yt?.config_?.DISABLE_YT_IMG_DELAY_LOADING
               && DISABLE_YT_IMG_DELAY_LOADING_default !== window.yt?.config_?.DISABLE_YT_IMG_DELAY_LOADING
            ) {
               DISABLE_YT_IMG_DELAY_LOADING_default = window.yt?.config_?.DISABLE_YT_IMG_DELAY_LOADING;
               await NOVA.delay(100);
               document.body.querySelectorAll(`[${ATTR_MARK}]`).forEach(e => e.removeAttribute(ATTR_MARK));
            }
            if ((thumb = img.closest(thumbsSelectors))
               && thumb.querySelector(
                  `#badges [class*="live-now"],
                  #overlays [aria-label="PREMIERE"],
                  ytd-thumbnail-overlay-time-status-renderer [overlay-style="UPCOMING"]`)
            ) {
               return;
            }
            if (src = patchImg(img.src)) img.src = patchImg(src);
         },
      });
      if (user_settings.thumbnails_clear_overlay) {
         NOVA.css.push(
            `#hover-overlays {
               visibility: hidden !important;
            }`);
      }
      function patchImg(str) {
         if ((re = /(\w{2}default|hq\d+)./i) && re.test(str)) {
            return str.replace(re, (user_settings.thumbnails_clear_preview_timestamp || 'hq2') + '.');
         }
      }
   },
   options: {
      thumbnails_clear_preview_timestamp: {
         _tagName: 'select',
         label: 'Thumbnail timestamps',
         'label:zh': '缩略图时间戳',
         'label:ja': 'サムネイルのタイムスタンプ',
         'label:ko': '썸네일 타임스탬프',
         'label:id': 'Stempel waktu gambar mini',
         'label:es': 'Marcas de tiempo en miniatura',
         'label:pt': 'Carimbos de data e hora em miniatura',
         'label:fr': 'Horodatages des vignettes',
         'label:it': 'Timestamp in miniatura',
         'label:de': 'Thumbnail-Zeitstempel',
         'label:pl': 'Znaczniki czasowe miniatur',
         'label:ua': 'Мітки часу мініатюр',
         title: 'Show thumbnail from video time position',
         'title:zh': '从视频时间位置显示缩略图',
         'title:ja': 'ビデオの時間位置からサムネイルを表示',
         'title:ko': '비디오 시간 위치에서 썸네일 표시',
         'title:id': 'Tampilkan thumbnail dari posisi waktu video',
         'title:es': 'Mostrar miniatura de la posición de tiempo del video',
         'title:pt': 'Mostrar miniatura da posição no tempo do vídeo',
         'title:fr': 'Afficher la vignette à partir de la position temporelle de la vidéo',
         'title:it': "Mostra la miniatura dalla posizione dell'ora del video",
         'title:de': 'Miniaturansicht von der Videozeitposition anzeigen',
         'title:pl': 'Pokaż miniaturkę z pozycji czasu wideo',
         'title:ua': 'Показати мініатюру з часової позиції відео',
         options: [
            {
               label: 'start', value: 'hq1',
               'label:zh': '开始',
               'label:ja': '始まり',
               'label:ko': '시작',
               'label:id': 'awal',
               'label:es': 'comienzo',
               'label:pt': 'começar',
               'label:fr': 'le début',
               'label:it': 'inizio',
               'label:de': 'anfang',
               'label:pl': 'początek',
               'label:ua': 'початок',
            },
            {
               label: 'middle', value: 'hq2', selected: true,
               'label:zh': '中间',
               'label:ja': '真ん中',
               'label:ko': '~ 아니다',
               'label:id': 'tengah',
               'label:es': 'medio',
               'label:pt': 'meio',
               'label:fr': 'ne pas',
               'label:it': 'mezzo',
               'label:de': 'mitte',
               'label:pl': 'środek',
               'label:ua': 'середина',
            },
            {
               label: 'end', value: 'hq3',
               'label:zh': '结尾',
               'label:ja': '終わり',
               'label:ko': '끝',
               'label:id': 'akhir',
               'label:es': 'fin',
               'label:pt': 'fim',
               'label:fr': 'finir',
               'label:it': 'fine',
               'label:de': 'ende',
               'label:pl': 'koniec',
               'label:ua': 'кінець',
            }
         ],
      },
      thumbnails_clear_overlay: {
         _tagName: 'input',
         label: 'Hide overlay buttons on a thumbnail',
         'label:zh': '隐藏覆盖在缩略图上的按钮',
         'label:ja': 'サムネイルにオーバーレイされたボタンを非表示にする',
         'label:ko': '축소판에서 오버레이 버튼 숨기기',
         'label:id': 'Sembunyikan tombol overlay pada thumbnail',
         'label:es': 'Ocultar botones superpuestos en una miniatura',
         'label:pt': 'Ocultar botões de sobreposição em uma miniatura',
         'label:fr': 'Masquer les boutons de superposition sur une vignette',
         'label:it': 'Nascondi pulsanti sovrapposti su una miniatura',
         'label:de': 'Überlagerungsschaltflächen auf einer Miniaturansicht ausblenden',
         'label:pl': 'Ukryj przyciski nakładki na miniaturce',
         'label:ua': 'Приховати кнопки на мініатюрі',
         type: 'checkbox',
         title: 'Hide [ADD TO QUEUE] [WATCH LATER]',
      },
   }
});
window.nova_plugins.push({
   id: 'search-filter',
   title: 'Blocked channels',
   'title:zh': '屏蔽频道列表',
   'title:ja': 'ブロックされたチャネルのリスト',
   'title:ko': '차단된 채널 목록',
   'title:id': 'Saluran yang diblokir',
   'title:es': 'Lista de canales bloqueados',
   'title:pt': 'Lista de canais bloqueados',
   'title:fr': 'Liste des chaînes bloquées',
   'title:it': 'Canali bloccati',
   'title:de': 'Liste der gesperrten Kanäle',
   'title:pl': 'Zablokowane kanały',
   'title:ua': 'Заблоковані канали',
   run_on_pages: 'results, feed, -mobile',
   section: 'other',
   desc: 'Hide channels on the search page',
   'desc:zh': '在搜索页面上隐藏频道',
   'desc:ja': '検索ページでチャンネルを非表示にする',
   'desc:ko': '검색 페이지에서 채널 숨기기',
   'desc:id': 'Sembunyikan saluran di halaman pencarian',
   'desc:es': 'Ocultar canales en la página de búsqueda',
   'desc:pt': 'Ocultar canais na página de pesquisa',
   'desc:fr': 'Masquer les chaînes sur la page de recherche',
   'desc:it': 'Nascondi i canali nella pagina di ricerca',
   'desc:de': 'Kanäle auf der Suchseite ausblenden',
   'desc:pl': 'Ukryj kanały na stronie wyszukiwania',
   'desc:ua': 'Приховує канали на сторінці пошуку',
   _runtime: user_settings => {
      const keywords = user_settings.search_filter_channel_blocklist
         ?.split(/[\n,;]/)
         .map(e => e.toString().trim().toLowerCase())
         .filter(e => e.length);
      const thumbsSelectors = [
         'ytd-rich-item-renderer',
         'ytd-video-renderer',
         'ytm-compact-video-renderer',
      ]
         .join(',');
      if (NOVA.isMobile) {
         NOVA.watchElements({
            selectors: ['#channel-name'],
            attr_mark: 'nova-thumb-channel-filtered',
            callback: channel_name => {
               keywords.forEach(keyword => {
                  if (channel_name.textContent.trim().toLowerCase().includes(keyword)
                     && (thumb = channel_name.closest(thumbsSelectors))
                  ) {
                     thumb.remove();
                  }
               });
            }
         });
      }
      else {
         document.addEventListener('yt-action', evt => {
            if ([
               'yt-append-continuation-items-action',
               'ytd-update-grid-state-action',
               'yt-service-request',
            ]
               .includes(evt.detail?.actionName)
            ) {
               document.body.querySelectorAll(
                  '#channel-name a[href]'
               )
                  .forEach(channel_name => {
                     keywords.forEach(keyword => {
                        if (keyword.startsWith('@')
                           && channel_name.href.includes(keyword)
                           && (thumb = channel_name.closest(thumbsSelectors))
                        ) {
                           thumb.remove();
                        }
                        else if (channel_name.textContent.trim().toLowerCase().includes(keyword)
                           && (thumb = channel_name.closest(thumbsSelectors))
                        ) {
                           thumb.remove();
                        }
                     });
                  });
            }
         });
      }
   },
   options: {
      search_filter_channel_blocklist: {
         _tagName: 'textarea',
         label: 'List',
         'label:zh': '频道列表',
         'label:ja': 'チャンネルリスト',
         'label:ko': '채널 목록',
         'label:id': 'Daftar',
         'label:es': 'Lista',
         'label:pt': 'Lista',
         'label:fr': 'Liste',
         'label:it': 'Elenco',
         'label:de': 'Liste',
         'label:pl': 'Lista',
         'label:ua': 'Список',
         title: 'separator: "," or ";" or "new line"',
         'title:zh': '分隔器： "," 或 ";" 或 "新队"',
         'title:ja': 'セパレータ： "," または ";" または "改行"',
         'title:ko': '구분 기호: "," 또는 ";" 또는 "새 줄"',
         'title:id': 'pemisah: "," atau ";" atau "baris baru"',
         'title:es': 'separador: "," o ";" o "new line"',
         'title:pt': 'separador: "," ou ";" ou "new line"',
         'title:fr': 'séparateur : "," ou ";" ou "nouvelle ligne"',
         'title:it': 'separatore: "," o ";" o "nuova linea"',
         'title:de': 'separator: "," oder ";" oder "new line"',
         'title:pl': 'separator: "," lub ";" lub "now linia"',
         'title:ua': 'розділювач: "," або ";" або "новий рядок"',
         placeholder: 'channel1, channel2',
         required: true,
      },
   }
});
window.nova_plugins.push({
   id: 'thumbnails-grid-count',
   title: 'Thumbnails count in line',
   run_on_pages: 'feed, channel, -mobile',
   section: 'other',
   _runtime: user_settings => {
      const
         origMathMin = Math.min,
         addRowCount = +user_settings.thumbnails_grid_count || 1;
      Math.min = function () {
         return origMathMin.apply(Math, arguments)
            + (/calcElementsPerRow/img.test(Error().stack || '') ? addRowCount : 0);
      };
      NOVA.css.push(
         `ytd-rich-grid-video-renderer[mini-mode] #video-title.ytd-rich-grid-video-renderer {
            font-size: 1.4rem;
            font-weight: 500;
            line-height: 1.6rem;
         }
         #avatar-link.ytd-rich-grid-video-renderer {
            display: none !important;
         }
         ytd-video-renderer[use-prominent-thumbs] ytd-thumbnail.ytd-video-renderer {
            min-width: 120px !important;
            max-width: 240px !important;
         }`);
   },
   options: {
      thumbnails_grid_count: {
         _tagName: 'input',
         label: 'Add to row',
         type: 'number',
         placeholder: '1-10',
         step: 1,
         min: 1,
         max: 10,
         value: 1,
      },
   }
});
window.nova_plugins.push({
   id: 'thumbs-shorts-duration',
   title: 'Add time for shorts thumbnail',
   'label:zh': '对于短裤添加缩略图叠加时间',
   'label:ja': '短い場合は、サムネイルのオーバーレイ時間を追加します',
   'label:ko': 'Shorts의 경우 미리보기 이미지 오버레이 시간 추가',
   'label:id': 'Untuk celana pendek tambahkan waktu overlay thumbnail',
   'label:es': 'Para cortos, agregue tiempo de superposición de miniaturas',
   'label:pt': 'Para shorts, adicione o tempo de sobreposição da miniatura',
   'label:fr': 'Pour les courts métrages, ajoutez le temps de superposition des vignettes',
   'label:it': 'Per i cortometraggi aggiungi il tempo di sovrapposizione delle miniature',
   'label:de': 'Fügen Sie für Kurzfilme eine Überlagerungszeit für Miniaturansichten hinzu',
   'label:pl': 'W przypadku filmów krótkometrażowych dodaj czas nakładki miniatury',
   'label:ua': 'Для шортів додайте час накладання мініатюр',
   run_on_pages: 'feed, -mobile',
   section: 'other',
   _runtime: user_settings => {
      if (user_settings['shorts_disable']) return;
      document.addEventListener('yt-action', evt => {
         if (!['feed', 'channel'].includes(NOVA.currentPage)) return;
         if ([
            'yt-append-continuation-items-action',
            'ytd-update-grid-state-action',
         ]
            .includes(evt.detail?.actionName)
         ) {
            addTimeToOverlay();
         }
      });
      const
         ATTR_MARK = 'nova-thumb-shorts-time',
         thumbsSelectors = [
            'ytd-rich-item-renderer',
         ]
            .join(',');
      function addTimeToOverlay() {
         document.body.querySelectorAll(`a[href*="/shorts/"]:not([${ATTR_MARK}])`)
            .forEach(link => {
               link.setAttribute(ATTR_MARK, true);
               if (thumb = link.closest(thumbsSelectors)) {
                  NOVA.waitSelector('ytd-thumbnail-overlay-time-status-renderer', { container: link, stop_on_page_change: true })
                     .then(overlay => {
                        if ((thumb = link.closest(thumbsSelectors)?.data)
                           && (time = getThumbTime(thumb))
                        ) {
                           overlay.setAttribute('overlay-style', 'DEFAULT');
                           if (timeLabelEl = overlay.$['text']) {
                              timeLabelEl.textContent = time;
                           }
                        }
                     });
               }
            });
      }
      function getThumbTime(videoData = required()) {
         if ((location.pathname + location.search) == '/playlist?list=WL') return;
         if ((title = videoData.title?.accessibility.accessibilityData?.label)
            && (publishedTimeText = videoData.publishedTimeText?.simpleText)
            && (viewCountText = videoData.viewCountText?.simpleText)
         ) {
            const
               from = title.search(publishedTimeText) + publishedTimeText.length,
               to = title.search(viewCountText),
               time = parseInt(title.substring(from, to).replace(/\D/g, ''));
            return NOVA.timeFormatTo.HMS.digit(time === 1 ? 60 : time)
         }
         else {
            console.error('getThumbTime empty:',
               '\ntitle:', title,
               '\npublishedTimeText:', publishedTimeText,
               '\nviewCountText:', viewCountText);
         }
      }
   },
});
window.nova_plugins.push({
   id: 'thumbnails-watched',
   title: 'Mark watched thumbnails',
   'title:zh': '标记您观看的缩略图',
   'title:ja': '視聴したサムネイルにマークを付ける',
   'title:ko': '본 썸네일 표시',
   'title:id': 'Tandai gambar mini yang ditonton',
   'title:es': 'Mark vio miniaturas',
   'title:pt': 'Mark assistiu às miniaturas',
   'title:fr': 'Marquer les vignettes visionnées',
   'title:it': 'Contrassegna le miniature visualizzate',
   'title:de': 'Angesehene Miniaturansichten markieren',
   'title:pl': 'Oznacz obejrzane miniaturki',
   'title:ua': 'Позначити переглянуті мініатюри',
   run_on_pages: 'home, results, feed, channel, watch, -mobile',
   section: 'other',
   _runtime: user_settings => {
      NOVA.css.push(
         `a#thumbnail,
         a[class*="thumbnail"] {
            outline: 1px solid var(--yt-spec-general-background-a);
         }
         
         a#thumbnail:visited,
         a[class*="thumbnail"]:visited {
            outline: 1px solid ${user_settings.thumbnails_watched_frame_color || 'red'} !important;
         }
         
         ytd-playlist-panel-video-renderer a:visited #meta * {
            color: ${user_settings.thumbnails_watched_title_color || '#ff4500'} !important;
         }`);
      if (user_settings.thumbnails_watched_title) {
         NOVA.css.push(
            `a#video-title:visited:not(:hover),
            #description a:visited {
               color: ${user_settings.thumbnails_watched_title_color} !important;
            }`);
      }
   },
   options: {
      thumbnails_watched_frame_color: {
         _tagName: 'input',
         label: 'Frame color',
         'label:zh': '框架颜色',
         'label:ja': 'フレームカラー',
         'label:ko': '프레임 색상',
         'label:id': 'Warna bingkai',
         'label:es': 'Color del marco',
         'label:pt': 'Cor da moldura',
         'label:fr': 'Couleur du cadre',
         'label:it': 'Colore del telaio',
         'label:de': 'Rahmenfarbe',
         'label:pl': 'Kolor ramki',
         'label:ua': 'Колір рамки',
         type: 'color',
         value: '#FF0000',
      },
      thumbnails_watched_title: {
         _tagName: 'input',
         label: 'Set title color',
         'label:zh': '您要更改标题颜色吗？',
         'label:ja': 'タイトルの色を変更しますか？',
         'label:ko': '제목 색상 설정',
         'label:id': 'Setel warna judul',
         'label:es': 'Establecer el color del título',
         'label:pt': 'Definir a cor do título',
         'label:fr': 'Définir la couleur du titre',
         'label:it': 'Imposta il colore del titolo',
         'label:de': 'Titelfarbe festlegen',
         'label:pl': 'Ustaw kolor tytułu',
         'label:ua': 'Встановити колір заголовку',
         type: 'checkbox',
      },
      thumbnails_watched_title_color: {
         _tagName: 'input',
         label: 'Choose title color',
         'label:zh': '选择标题颜色',
         'label:ja': 'タイトルの色を選択',
         'label:ko': '제목 색상 선택',
         'label:id': 'Pilih warna judul',
         'label:es': 'Elija el color del título',
         'label:pt': 'Escolha a cor do título',
         'label:fr': 'Choisissez la couleur du titre',
         'label:it': 'Scegli il colore del titolo',
         'label:de': 'Titelfarbe auswählen',
         'label:pl': 'Wybierz kolor tytułu',
         'label:ua': 'Обрати колір заголовку',
         type: 'color',
         value: '#ff4500',
         'data-dependent': { 'thumbnails_watched_title': true },
      },
   }
});
window.nova_plugins.push({
   id: 'miniplayer-disable',
   title: 'Disable miniplayer',
   'title:ua': 'Вимкнути мінівідтворювач',
   run_on_pages: 'watch, -mobile',
   section: 'other',
   desc: 'shown on changeable page when playing playlist',
   'desc:ua': 'Відображається на іншій сторінці під час відтворення плейлиста',
   _runtime: user_settings => {
      NOVA.css.push(
         `.ytp-right-controls .ytp-miniplayer-button {
            display: none !important;
         }`);
      document.addEventListener('yt-action', evt => {
         if (NOVA.currentPage != 'watch' && evt.detail?.actionName.includes('miniplayer')) {
            document.body.querySelector('ytd-miniplayer[active] #movie_player .ytp-miniplayer-scrim button.ytp-miniplayer-close-button')
               ?.click();
         }
      });
   },
});
window.nova_plugins.push({
   id: 'channel-trailer-stop-preload',
   title: 'Stop play channel trailer',
   'title:zh': '停止频道预告片',
   'title:ja': 'チャンネルの予告編を停止する',
   'title:ko': '채널 예고편 중지',
   'title:id': 'Hentikan cuplikan saluran',
   'title:es': 'Detener el tráiler del canal',
   'title:pt': 'Parar o trailer do canal',
   'title:fr': 'Arrêter la bande-annonce de la chaîne',
   'title:it': 'Interrompi il trailer del canale',
   'title:de': 'Kanaltrailer stoppen',
   'title:pl': 'Zatrzymaj zwiastun kanału',
   'title:ua': 'Не відтворювати трейлер каналу',
   run_on_pages: 'channel, -mobile',
   restart_on_location_change: true,
   section: 'channel',
   _runtime: user_settings => {
      NOVA.waitSelector('#c4-player[playing-mode]', { stop_on_page_change: true })
         .then(player => player.stopVideo());
   },
});
window.nova_plugins.push({
   id: 'thumbnails-title-normalize',
   title: 'Decapitalize thumbnails title',
   'title:zh': '从大写中删除缩略图标题',
   'title:ja': 'サムネイルのタイトルを大文字から外す',
   'title:ko': '썸네일 제목을 대문자로',
   'title:id': 'Judul gambar mini decapitalize',
   'title:es': 'Descapitalizar el título de las miniaturas',
   'title:pt': 'Decapitalize o título das miniaturas',
   'title:fr': 'Démajuscule le titre des vignettes',
   'title:it': 'Decapitalizza il titolo delle miniature',
   'title:de': 'Thumbnails-Titel entfernen',
   'title:pl': 'Zmniejsz czcionkę w tytule miniatur',
   'title:ua': 'Завжди маленькі літери для назв мініатюр',
   run_on_pages: 'home, feed, channel, watch',
   section: 'other',
   desc: 'Upper Case thumbnails title back to normal',
   'desc:ua': 'Зняти слова з великої літери для назв мініатюр',
   _runtime: user_settings => {
      const
         VIDEO_TITLE_SELECTOR = [
            '#video-title',
            'a > [class*="media-item-headline"]',
         ]
            .map(i => i + ':not(:empty)'),
         MAX_CAPS_LETTERS = +user_settings.thumbnails_title_normalize_smart_max_words || 2,
         ATTR_MARK = 'nova-thumb-title-normalized',
         clearOfSymbols = str => str.replace(/[\u2011-\u26FF]/g, ' ').replace(/\s{2,}/g, ' '),
         clearOfEmoji = str => str.replace(/[^\p{L}\p{N}\p{P}\p{Z}{\^\$}]/gu, ' ').replace(/\s{2,}/g, ' ');
      if (user_settings.thumbnails_title_normalize_show_full) {
         NOVA.css.push(
            VIDEO_TITLE_SELECTOR.join(',') + `{
               display: block !important;
               max-height: unset !important;
            }`);
      }
      const UpperCaseLetterRegex = new RegExp("([\-0-9A-ZÀ-ÖØ-ÞĀĂĄĆĈĊČĎĐĒĔĖĘĚĜĞĠĢĤĦĨĪĬĮİĲĴĶĹĻĽĿŁŃŅŇŊŌŎŐŒŔŖŘŚŜŞŠŢŤŦŨŪŬŮŰŲŴŶŸ-ŹŻŽƁ-ƂƄƆ-ƇƉ-ƋƎ-ƑƓ-ƔƖ-ƘƜ-ƝƟ-ƠƢƤƦ-ƧƩƬƮ-ƯƱ-ƳƵƷ-ƸƼǄǇǊǍǏǑǓǕǗǙǛǞǠǢǤǦǨǪǬǮǱǴǶ-ǸǺǼǾȀȂȄȆȈȊȌȎȐȒȔȖȘȚȜȞȠȢȤȦȨȪȬȮȰȲȺ-ȻȽ-ȾɁɃ-ɆɈɊɌɎͰͲͶΆΈ-ΊΌΎ-ΏΑ-ΡΣ-ΫϏϒ-ϔϘϚϜϞϠϢϤϦϨϪϬϮϴϷϹ-ϺϽ-ЯѠѢѤѦѨѪѬѮѰѲѴѶѸѺѼѾҀҊҌҎҐҒҔҖҘҚҜҞҠҢҤҦҨҪҬҮҰҲҴҶҸҺҼҾӀ-ӁӃӅӇӉӋӍӐӒӔӖӘӚӜӞӠӢӤӦӨӪӬӮӰӲӴӶӸӺӼӾԀԂԄԆԈԊԌԎԐԒԔԖԘԚԜԞԠԢԱ-Ֆ֊־٠-٩۰-۹߀-߉०-९০-৯੦-੯૦-૯୦-୯௦-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩၀-၉႐-႙Ⴀ-Ⴥ០-៩᠆᠐-᠙᥆-᥏᧐-᧙᭐-᭙᮰-᮹᱀-᱉᱐-᱙ḀḂḄḆḈḊḌḎḐḒḔḖḘḚḜḞḠḢḤḦḨḪḬḮḰḲḴḶḸḺḼḾṀṂṄṆṈṊṌṎṐṒṔṖṘṚṜṞṠṢṤṦṨṪṬṮṰṲṴṶṸṺṼṾẀẂẄẆẈẊẌẎẐẒẔẞẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼẾỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴỶỸỺỼỾἈ-ἏἘ-ἝἨ-ἯἸ-ἿὈ-ὍὙὛὝὟὨ-ὯᾸ-ΆῈ-ΉῘ-ΊῨ-ῬῸ-Ώ‐-―ℂℇℋ-ℍℐ-ℒℕℙ-ℝℤΩℨK-ℭℰ-ℳℾ-ℿⅅↃⰀ-ⰮⱠⱢ-ⱤⱧⱩⱫⱭ-ⱯⱲⱵⲀⲂⲄⲆⲈⲊⲌⲎⲐⲒⲔⲖⲘⲚⲜⲞⲠⲢⲤⲦⲨⲪⲬⲮⲰⲲⲴⲶⲸⲺⲼⲾⳀⳂⳄⳆⳈⳊⳌⳎⳐⳒⳔⳖⳘⳚⳜⳞⳠⳢ⸗⸚〜〰゠꘠-꘩ꙀꙂꙄꙆꙈꙊꙌꙎꙐꙒꙔꙖꙘꙚꙜꙞꙢꙤꙦꙨꙪꙬꚀꚂꚄꚆꚈꚊꚌꚎꚐꚒꚔꚖꜢꜤꜦꜨꜪꜬꜮꜲꜴꜶꜸꜺꜼꜾꝀꝂꝄꝆꝈꝊꝌꝎꝐꝒꝔꝖꝘꝚꝜꝞꝠꝢꝤꝦꝨꝪꝬꝮꝹꝻꝽ-ꝾꞀꞂꞄꞆꞋ꣐-꣙꤀-꤉꩐-꩙︱-︲﹘﹣－０-９Ａ-Ｚ]|\ud801[\udc00-\udc27\udca0-\udca9]|\ud835[\udc00-\udc19\udc34-\udc4d\udc68-\udc81\udc9c\udc9e-\udc9f\udca2\udca5-\udca6\udca9-\udcac\udcae-\udcb5\udcd0-\udce9\udd04-\udd05\udd07-\udd0a\udd0d-\udd14\udd16-\udd1c\udd38-\udd39\udd3b-\udd3e\udd40-\udd44\udd46\udd4a-\udd50\udd6c-\udd85\udda0-\uddb9\uddd4-\udded\ude08-\ude21\ude3c-\ude55\ude70-\ude89\udea8-\udec0\udee2-\udefa\udf1c-\udf34\udf56-\udf6e\udf90-\udfa8\udfca\udfce-\udfff]){2,}", 'g');
      NOVA.css.push({
         'text-transform': 'uppercase',
      }, VIDEO_TITLE_SELECTOR.map(e => `${e}[${ATTR_MARK}]::first-letter`), 'important');
      NOVA.watchElements({
         selectors: VIDEO_TITLE_SELECTOR,
         attr_mark: ATTR_MARK,
         callback: async videoTitleEl => {
            if (NOVA.currentPage == 'results') return;
            let countCaps = 0;
            if (user_settings.thumbnails_title_clear_emoji) {
               videoTitleEl.textContent = clearOfEmoji(videoTitleEl.innerText).trim();
            }
            if (user_settings.thumbnails_title_clear_symbols) {
               videoTitleEl.textContent = clearOfSymbols(videoTitleEl.innerText).trim();
            }
            const normalizedText = videoTitleEl.innerText.replace(UpperCaseLetterRegex, match => {
               ++countCaps;
               return (
                  /\d/.test(match)
                  || (match.length === 1 && /[A-Z]/.test(match))
                  //|| (match.length < 5 && match.includes('.') && /([A-Z]\.){2,}/.test(match)) 
                  || (match.length < 5 && match.length > 1 && ['HD', 'UHD', 'USB', 'TV', 'CPU', 'GPU', 'APU', 'AMD', 'XT', 'RX', 'GTX', 'RTX', 'GT', 'FX', 'SE', 'HP', 'SSD', 'RAM', 'PC', 'FPS', 'RDNA', 'FSR', 'DLSS', 'MSI', 'VR', 'GOTY', 'AAA', 'UI', 'BBC', 'WWE', 'OS', 'OP', 'ED', 'MV', 'PV', 'OST', 'NCS', 'BGM', 'EDM', 'GMV', 'AMV', 'MMD', 'MAD', 'SQL', 'CAPS'].includes(match))
                  || (match.length < 5 && /(M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3}))/i.test(match))
               ) ? match : match.toLowerCase();
            });
            if (countCaps > MAX_CAPS_LETTERS
               || (countCaps > 1 && normalizedText.split(/\s+/).length === countCaps)
            ) {
               videoTitleEl.innerText = normalizedText;
            }
         }
      });
      document.addEventListener('yt-action', evt => {
         if (evt.detail?.actionName == 'yt-chip-cloud-chip-select-action') {
            window.addEventListener('transitionend', restoreTitle, { capture: true, once: true });
         }
      });
      function restoreTitle() {
         const selectorOldTitle = '#video-title-link[title]';
         if (NOVA.channelTab == 'videos') {
            document.body.querySelectorAll(`${selectorOldTitle} ${VIDEO_TITLE_SELECTOR}[${ATTR_MARK}]`)
               .forEach(el => {
                  if (oldTitle = el.closest(selectorOldTitle)?.title) {
                     el.innerText = oldTitle;
                     el.removeAttribute(ATTR_MARK);
                  }
               });
         }
      }
   },
   options: {
      thumbnails_title_normalize_show_full: {
         _tagName: 'input',
         label: 'Show full title',
         'label:zh': '显示完整标题',
         'label:ja': '完全なタイトルを表示',
         'label:ko': '전체 제목 표시',
         'label:id': 'Tampilkan judul lengkap',
         'label:es': 'Mostrar título completo',
         'label:pt': 'Mostrar título completo',
         'label:fr': 'Afficher le titre complet',
         'label:it': 'Mostra il titolo completo',
         'label:de': 'Vollständigen Titel anzeigen',
         'label:pl': 'Pokaż pełny tytuł',
         'label:ua': 'Показати повну назву',
         type: 'checkbox'
      },
      thumbnails_title_normalize_smart_max_words: {
         _tagName: 'input',
         label: 'Max words in uppercase',
         'label:zh': '大写字数上限',
         'label:ja': '大文字の最大単語数',
         'label:ko': '대문자의 최대 단어 수',
         'label:id': 'Maks kata dalam huruf besar',
         'label:es': 'Máximo de palabras en mayúsculas',
         'label:pt': 'Máximo de palavras em maiúsculas',
         'label:fr': 'Mots maximum en majuscules',
         'label:it': 'Max parole in maiuscolo',
         'label:de': 'Maximale Wörter in Großbuchstaben',
         'label:pl': 'Maksymalna liczba słów pisanych wielkimi literami',
         'label:ua': 'Максимальна кількість слів ВЕЛИКИМИ літерами',
         type: 'number',
         placeholder: '1-10',
         min: 1,
         max: 10,
         value: 2,
      },
      thumbnails_title_clear_emoji: {
         _tagName: 'input',
         label: 'Remove emoji',
         'label:zh': '从表情符号中清除标题',
         'label:ja': 'クリア絵文字',
         'label:ko': '이모티콘 지우기',
         'label:id': 'Hapus emoji',
         'label:es': 'Borrar emoji',
         'label:pt': 'Limpar emoji',
         'label:fr': 'Emoji clair',
         'label:it': 'Emoji trasparenti',
         'label:de': 'Emoji löschen',
         'label:pl': 'Usuń emoji',
         'label:ua': 'Очистити емодзі',
         type: 'checkbox',
      },
      thumbnails_title_clear_symbols: {
         _tagName: 'input',
         label: 'Remove symbols',
         type: 'checkbox',
      },
   }
});
window.nova_plugins.push({
   id: 'collapse-navigation-panel',
   title: 'Hide navigation panel',
   run_on_pages: '*, -watch, -embed, -live_chat',
   section: 'other',
   _runtime: user_settings => {
      NOVA.waitSelector('#guide[opened]')
         .then(el => {
            document.getElementById('guide-button').click();
            el.removeAttribute('opened');
         });
   },
});
window.nova_plugins.push({
   id: 'shorts-redirect',
   title: 'Redirect Shorts to regular (watch) URLs',
   'title:zh': '将 Shorts 重定向到常规（watch）URL',
   'title:ja': 'ショートパンツを通常の（watch）URLにリダイレクトする',
   'title:ko': 'Shorts를 일반(watch) URL로 리디렉션',
   'title:id': 'Redirect Shorts ke URL reguler (watch)',
   'title:es': 'Redirigir Shorts a URL normales (watch)',
   'title:pt': 'Redirecionar Shorts para URLs regulares (watch)',
   'title:fr': 'Rediriger les shorts vers des URL normales (watch)',
   'title:it': 'Reindirizza i cortometraggi a URL normali (watch).',
   'title:de': 'Leiten Sie Shorts zu regulären (watch) URLs um',
   'title:pl': 'Przełączaj Shorts na zwykłe adresy URL',
   'title:ua': 'Перенаправляйте прев`ю на звичайні URL-адреси (для перегляду)',
   run_on_pages: 'shorts',
   restart_on_location_change: true,
   section: 'other',
   desc: 'Redirect Shorts video to normal player',
   'desc:zh': '将 Shorts 视频重定向到普通播放器',
   'desc:ja': 'ショートパンツのビデオを通常のプレーヤーにリダイレクトする',
   'desc:ko': 'Shorts 비디오를 일반 플레이어로 리디렉션',
   'desc:id': 'Redirect video Shorts ke pemutar normal',
   'desc:es': 'Redirigir el video de Shorts al reproductor normal',
   'desc:pt': 'Redirecionar o vídeo do Shorts para o player normal',
   'desc:fr': 'Rediriger la vidéo Short vers un lecteur normal',
   'desc:it': 'Reindirizza il video dei cortometraggi al lettore normale',
   'desc:de': 'Shorts-Video auf normalen Player umleiten',
   'desc:pl': 'Przełącza krótkie filmy do normalnego odtwarzacza',
   'desc:ua': 'Перенаправляйте прев`ю відео у звичайний відтворювач',
   _runtime: user_settings => {
      location.href = location.href.replace('shorts/', 'watch?v=');
   },
});
window.nova_plugins.push({
   id: 'thumbs-hide',
   title: 'Thumbnails filtering',
   'title:zh': '缩略图过滤',
   'title:ja': 'サムネイルのフィルタリング',
   'title:ko': '썸네일 필터링',
   'title:id': 'Pemfilteran gambar mini',
   'title:es': 'Filtrado de miniaturas',
   'title:pt': 'Filtragem de miniaturas',
   'title:fr': 'Filtrage des vignettes',
   'title:it': 'Filtraggio miniature',
   'title:de': 'Filtrowanie miniatur',
   'title:pl': 'Ukryj kilka miniatur',
   'title:ua': 'Фільтрування мініатюр',
   run_on_pages: 'home, results, feed, channel, watch, -mobile',
   section: 'other',
   _runtime: user_settings => {
      const
         thumbsSelectors = [
            'ytd-rich-item-renderer',
            'ytd-video-renderer',
            'ytd-compact-video-renderer',
            'ytm-compact-video-renderer',
            'ytm-item-section-renderer'
         ]
            .join(',');
      document.addEventListener('yt-action', evt => {
         if ([
            'yt-append-continuation-items-action',
            'ytd-update-grid-state-action',
            'yt-service-request',
            'ytd-rich-item-index-update-action',
         ]
            .includes(evt.detail?.actionName)
         ) {
            switch (NOVA.currentPage) {
               case 'home':
                  thumbRemove.live();
                  thumbRemove.mix();
                  thumbRemove.watched();
                  break;
               case 'results':
                  thumbRemove.live();
                  thumbRemove.shorts();
                  thumbRemove.mix();
                  break;
               case 'feed':
                  thumbRemove.live();
                  thumbRemove.streamed();
                  thumbRemove.shorts();
                  thumbRemove.durationLimits();
                  thumbRemove.premieres();
                  thumbRemove.mix();
                  thumbRemove.watched();
                  break;
               case 'channel':
                  thumbRemove.live();
                  thumbRemove.streamed();
                  thumbRemove.premieres();
                  thumbRemove.watched();
                  break;
               case 'watch':
                  thumbRemove.live();
                  thumbRemove.mix();
                  thumbRemove.watched();
                  break;
            }
         }
      });
      const thumbRemove = {
         shorts() {
            if (!user_settings.shorts_disable) return;
            if (NOVA.currentPage == 'channel' && NOVA.channelTab == 'shorts') return;
            document.body.querySelectorAll('a#thumbnail[href*="shorts/"]')
               .forEach(el => el.closest(thumbsSelectors)?.remove());
         },
         durationLimits() {
            if (!+user_settings.shorts_disable_min_duration) return;
            const OVERLAYS_TIME_SELECTOR = '#thumbnail #overlays #text:not(:empty)';
            NOVA.waitSelector(OVERLAYS_TIME_SELECTOR)
               .then(() => {
                  document.body.querySelectorAll(OVERLAYS_TIME_SELECTOR)
                     .forEach(el => {
                        if ((thumb = el.closest(thumbsSelectors))
                           && (time = NOVA.timeFormatTo.hmsToSec(el.textContent.trim()))
                           && time < (+user_settings.shorts_disable_min_duration || 60)
                        ) {
                           thumb.remove();
                        }
                     });
               });
         },
         premieres() {
            if (!user_settings.premieres_disable) return;
            document.body.querySelectorAll(
               `#thumbnail #overlays [aria-label="Premiere"],
               #thumbnail #overlays [aria-label="Upcoming"]`
            )
               .forEach(el => el.closest(thumbsSelectors)?.remove());
            document.body.querySelectorAll('#video-badges > [class*="live-now"]')
               .forEach(el => el.closest(thumbsSelectors)?.remove());
         },
         live() {
            if (!user_settings.live_disable) return;
            if (NOVA.currentPage == 'channel' && NOVA.channelTab == 'streams') return;
            document.body.querySelectorAll('#thumbnail img[src*="_live.jpg"]')
               .forEach(el => el.closest(thumbsSelectors)?.remove());
         },
         streamed() {
            if (!user_settings.streamed_disable) return;
            if (NOVA.currentPage == 'channel' && NOVA.channelTab == 'streams') return;
            document.body.querySelectorAll('#metadata-line > span:last-of-type')
               .forEach(el => {
                  if (el.textContent?.split(' ').length === 4
                     && (thumb = el.closest(thumbsSelectors))) {
                     thumb.remove();
                  }
               });
         },
         mix() {
            if (!user_settings.mix_disable) return;
            document.body.querySelectorAll(
               `a[href*="list="][href*="start_radio="]:not([hidden]),
               #video-title[title^="Mix -"]:not([hidden])`
            )
               .forEach(el => el.closest('ytd-radio-renderer, ytd-compact-radio-renderer, ' + thumbsSelectors)?.remove());
         },
         watched() {
            if (!user_settings.watched_disable) return;
            if (!user_settings['thumbnails-watched']) return;
            const PERCENT_COMPLETE = user_settings.watched_disable_percent_complete || 90;
            document.body.querySelectorAll('#thumbnail #overlays #progress')
               .forEach(el => {
                  if (parseInt(el.style.width) > PERCENT_COMPLETE) {
                     el.closest(thumbsSelectors)?.remove();
                  }
               });
         },
      };
      if (user_settings.mix_disable) {
         NOVA.css.push(
            `ytd-radio-renderer {
               display: none !important;
            }`);
      }
   },
   options: {
      shorts_disable: {
         _tagName: 'input',
         label: 'Hide Shorts',
         'label:zh': '隐藏短裤',
         'label:ja': 'ショーツを隠す',
         'label:ko': '반바지 숨기기',
         'label:id': 'Sembunyikan Celana Pendek',
         'label:es': 'Ocultar pantalones cortos',
         'label:pt': 'Ocultar shorts',
         'label:fr': 'Masquer les shorts',
         'label:it': 'Nascondi pantaloncini',
         'label:de': 'Shorts verstecken',
         'label:pl': 'Ukryj YouTube Shorts',
         'label:ua': 'Приховати прев`ю',
         type: 'checkbox',
      },
      shorts_disable_min_duration: {
         _tagName: 'input',
         label: 'Min duration in sec (for regular video)',
         'label:zh': '最短持续时间（以秒为单位）',
         'label:ja': '秒単位の最小期間',
         'label:ko': '최소 지속 시간(초)',
         'label:id': 'Durasi lebih sedikit dalam detik',
         'label:es': 'Duración mínima en segundos',
         'label:pt': 'Duração mínima em segundos',
         'label:fr': 'Durée minimale en secondes',
         'label:it': 'Meno durata in sec',
         'label:de': 'Mindestdauer in Sekunden',
         'label:pl': 'Poniżej czasu trwania w sekundach',
         'label:ua': 'Мінімальна триваліcть в cекундах',
         type: 'number',
         title: '0 - disable',
         placeholder: '60-3600',
         step: 1,
         min: 0,
         max: 3600,
         value: 0,
      },
      premieres_disable: {
         _tagName: 'input',
         label: 'Hide Premieres/Upcoming',
         'label:zh': '隐藏首映/即将上映',
         'label:ja': 'プレミア公開/近日公開を非表示',
         'label:ko': 'Premieres/예정 숨기기',
         'label:id': 'Sembunyikan Tayang Perdana/Mendatang',
         'label:es': 'Ocultar estrenos/próximos',
         'label:pt': 'Ocultar Estreias/Próximas',
         'label:fr': 'Masquer les premières/à venir',
         'label:it': 'Nascondi anteprime/in arrivo',
         'label:de': 'Premieren/Kommende ausblenden',
         'label:pl': 'Ukrywaj premiery',
         'label:ua': 'Приховати прем`єри',
         type: 'checkbox',
         title: 'Premiere Announcements',
      },
      live_disable: {
         _tagName: 'input',
         label: 'Hide Live streams',
         'label:zh': '隐藏直播',
         'label:ja': 'ライブ ストリームを非表示にする',
         'label:ko': '라이브 스트림 숨기기',
         'label:id': 'Sembunyikan streaming langsung',
         'label:es': 'Ocultar transmisiones en vivo',
         'label:pt': 'Ocultar transmissões ao vivo',
         'label:fr': 'Masquer les flux en direct',
         'label:it': 'Nascondi live streaming',
         'label:de': 'Live-Streams ausblenden',
         'label:pl': 'Ukryj strumień (na żywo)',
         'label:ua': 'Приховати живі транcляції',
         type: 'checkbox',
         title: 'Now airing',
         'title:zh': '正在播出',
         'title:ja': '放映中',
         'title:ko': '지금 방영중',
         'title:id': 'Sekarang ditayangkan',
         'title:es': 'Ahora al aire',
         'title:pt': 'Agora no ar',
         'title:fr': 'Diffusion en cours',
         'title:it': 'Ora in onda',
         'title:de': 'Jetzt Lüften',
         'title:pl': 'Teraz wietrzenie',
         'title:ua': 'Зараз в ефірі',
      },
      streamed_disable: {
         _tagName: 'input',
         label: 'Hide finished streams',
         'label:zh': '隐藏完成的流',
         'label:ja': '終了したストリームを非表示にする',
         'label:ko': '완료된 스트림 숨기기',
         'label:id': 'Sembunyikan aliran yang sudah selesai',
         'label:es': 'Ocultar flujos terminados',
         'label:pt': 'Ocultar streams concluídos',
         'label:fr': 'Masquer les flux terminés',
         'label:it': 'Nascondi i flussi finiti',
         'label:de': 'Fertige Streams ausblenden',
         'label:pl': 'Ukryj po streamie',
         'label:ua': 'cховати завершені транcляції',
         type: 'checkbox',
         //title: '',
         'data-dependent': { 'live_disable': true },
      },
      mix_disable: {
         _tagName: 'input',
         label: "Hide 'Mix' thumbnails",
         'label:zh': '隐藏[混合]缩略图',
         'label:ja': '「Mix」サムネイルを非表示',
         'label:ko': '"믹스" 썸네일 숨기기',
         'label:id': 'Sembunyikan gambar mini "Mix"',
         'label:es': "Ocultar miniaturas de 'Mix'",
         'label:pt': "Ocultar miniaturas de 'Mix'",
         'label:fr': 'Masquer les vignettes "Mix"',
         'label:it': 'Nascondi le miniature "Mix".',
         'label:de': '„Mix“-Thumbnails ausblenden',
         'label:pl': 'Ukryj miniaturki "Mix"',
         'label:ua': 'Приховати мікc мініатюр',
         type: 'checkbox',
         title: '[Mix] offers to rewatch what has already saw',
         'title:zh': '[混合]提供重新观看已经看过的内容',
         'title:ja': '「Mix」は、すでに見たものを再視聴することを提案します',
         'title:ko': '[Mix]는 이미 본 것을 다시 볼 것을 제안합니다',
         'title:id': '[Mix] menawarkan untuk menonton ulang apa yang telah dilihat',
         'title:es': '[Mix] ofrece volver a ver lo que ya vio',
         'title:pt': '[Mix] se oferece para rever o que já viu',
         'title:it': '[Mix] si offre di rivedere ciò che ha già visto',
         'title:de': '[Mix] bietet an, bereits Gesehenes noch einmal anzuschauen',
         'title:pl': '[Mix] proponuje ponowne obejrzenie już obejrzanych filmów',
         'title:ua': '[Mix] пропонує передивитиcя вже побачене',
      },
      watched_disable: {
         _tagName: 'input',
         label: 'Hide watched',
         'label:zh': '隐藏观看',
         'label:ja': '監視対象を非表示',
         'label:ko': '시청 숨기기',
         'label:id': 'Sembunyikan ditonton',
         'label:es': 'Ocultar visto',
         'label:pt': 'Ocultar assistidos',
         'label:fr': 'Masquer surveillé',
         'label:it': 'Nascondi guardato',
         'label:de': 'Ausblenden beobachtet',
         'label:pl': 'Ukryj oglądane',
         'label:ua': 'cховати переглянуті відео',
         type: 'checkbox',
         title: 'Need to Turn on [YouTube History]',
      },
      watched_disable_percent_complete: {
         _tagName: 'input',
         label: 'Threshold percent',
         type: 'number',
         title: 'in %',
         placeholder: '%',
         step: 5,
         min: 5,
         max: 100,
         value: 90,
         'data-dependent': { 'watched_disable': true },
      },
   }
});
window.nova_plugins.push({
   id: 'rss-link',
   title: 'Add RSS feed link',
   'title:zh': '添加 RSS 提要链接',
   'title:ja': 'RSSフィードリンクを追加',
   'title:ko': 'RSS 피드 링크 추가',
   'title:id': 'Tambahkan tautan Umpan RSS',
   'title:es': 'Agregar enlace de fuente RSS',
   'title:pt': 'Adicionar link de feed RSS',
   'title:fr': 'Ajouter un lien de flux RSS',
   'title:it': 'Aggiungi collegamento al feed RSS',
   'title:de': 'RSS-Feed-Link hinzufügen',
   'title:pl': 'Dodaj kanał RSS',
   'title:ua': 'Додати RSS-посилання',
   run_on_pages: 'channel, playlist, -mobile',
   restart_on_location_change: true,
   section: 'channel',
   _runtime: user_settings => {
      const
         SELECTOR_ID = 'nova-rss-link',
         rssLinkPrefix = '/feeds/videos.xml',
         playlistURL = rssLinkPrefix + '?playlist_id=' + NOVA.queryURL.get('list'),
         genChannelURL = channelId => rssLinkPrefix + '?channel_id=' + channelId;
      switch (NOVA.currentPage) {
         case 'channel':
            NOVA.waitSelector('#channel-header #links-holder #primary-links')
               .then(container => {
                  if (!parseInt(NOVA.css.getValue('#header div.banner-visible-area', 'height'))) {
                     container = document.body.querySelector('#channel-header #inner-header-container #buttons');
                  }
                  if (url = (document.querySelector('link[type="application/rss+xml"][href]')?.href
                     || genChannelURL(NOVA.getChannelId(user_settings['user-api-key'])))
                  ) {
                     insertToHTML({ 'url': url, 'container': container });
                  }
               });
            break;
         case 'playlist':
            NOVA.waitSelector('ytd-playlist-header-renderer .metadata-buttons-wrapper', { stop_on_page_change: true })
               .then(container => {
                  insertToHTML({ 'url': playlistURL, 'container': container, 'is_playlist': true });
               });
            break;
      }
      function insertToHTML({ url = required(), container = required(), is_playlist }) {
         if (!(container instanceof HTMLElement)) return console.error('container not HTMLElement:', container);
         (container.querySelector(`#${SELECTOR_ID}`) || (function () {
            const link = document.createElement('a');
            link.id = SELECTOR_ID;
            link.target = '_blank';
            link.className = `yt-spec-button-shape-next--overlay`;
            link.innerHTML =
               `<svg viewBox="-35 -35 55 55" height="100%" width="100%" style="width: auto;">
                  <g fill="currentColor">
                     <path fill="#F60" d="M-17.392 7.875c0 3.025-2.46 5.485-5.486 5.485s-5.486-2.46-5.486-5.485c0-3.026 2.46-5.486 5.486-5.486s5.486 2.461 5.486 5.486zm31.351 5.486C14.042.744 8.208-11.757-1.567-19.736c-7.447-6.217-17.089-9.741-26.797-9.708v9.792C-16.877-19.785-5.556-13.535.344-3.66a32.782 32.782 0 0 1 4.788 17.004h8.827v.017zm-14.96 0C-.952 5.249-4.808-2.73-11.108-7.817c-4.821-3.956-11.021-6.184-17.255-6.15v8.245c6.782-.083 13.432 3.807 16.673 9.774a19.296 19.296 0 0 1 2.411 9.326h8.278v-.017z"/>
                  </g>
               </svg>`;
            Object.assign(link.style, {
               height: '20px',
               display: 'inline-block',
               padding: '5px',
            });
            if (is_playlist) {
               Object.assign(link.style, {
                  'margin-right': '8px',
                  'border-radius': '20px',
                  'background-color': 'var(--yt-spec-static-overlay-button-secondary)',
                  color: 'var(--yt-spec-static-overlay-text-primary)',
                  padding: '8px',
                  'margin-right': '8px',
                  'white-space': 'nowrap',
                  'font-size': 'var(--ytd-tab-system-font-size, 1.4rem)',
                  'font-weight': 'var(--ytd-tab-system-font-weight, 500)',
                  'letter-spacing': 'var(--ytd-tab-system-letter-spacing, .007px)',
                  'text-transform': 'var(--ytd-tab-system-text-transform, uppercase)',
               });
            }
            container.prepend(link);
            return link;
         })())
            .href = url;
      }
   },
});
window.nova_plugins.push({
   id: 'channel-default-tab',
   title: 'Default tab on channel page',
   'title:zh': '频道页默认选项卡',
   'title:ja': 'チャンネルページのデフォルトタブ',
   'title:ko': '채널 페이지의 기본 탭',
   'title:id': 'Tab default di halaman saluran',
   'title:es': 'La pestaña predeterminada en la página del canal',
   'title:pt': 'A guia padrão na página do canal',
   'title:fr': 'Onglet par défaut sur la page de la chaîne',
   'title:it': 'Scheda predefinita nella pagina del canale',
   'title:de': 'Die Standardregisterkarte auf der Kanalseite',
   'title:pl': 'Domyślna karta na stronie kanału',
   'title:ua': 'Вкладка за умовчанням на сторінці каналу',
   run_on_pages: 'channel',
   restart_on_location_change: true,
   section: 'channel',
   _runtime: user_settings => {
      if (NOVA.channelTab) return;
      if (user_settings.channel_default_tab_mode == 'redirect') {
         location.pathname += '/' + user_settings.channel_default_tab;
      }
      else {
         const tabSelectors = '#tabsContent > [role="tab"]';
         NOVA.waitSelector(tabSelectors, { stop_on_page_change: true })
            .then(() => {
               let tabActive;
               const tabs = [...document.querySelectorAll(tabSelectors)];
               switch (user_settings.channel_default_tab) {
                  case 'videos': tabActive = tabs[1]; break;
                  case 'playlists': tabActive = tabs[tabs.length - 4]; break;
                  case 'community': tabActive = tabs[tabs.length - 3]; break;
                  case 'about': tabActive = tabs.pop(); break;
                  default:
                     location.pathname += '/' + user_settings.channel_default_tab;
               }
               tabActive?.click();
            });
      }
   },
   options: {
      channel_default_tab: {
         _tagName: 'select',
         label: 'Default tab',
         'label:zh': '默认标签页',
         'label:ja': 'デフォルトのタブ',
         'label:ko': '기본 탭',
         'label:id': 'tab bawaan',
         'label:es': 'Ficha predeterminada',
         'label:pt': 'Aba padrão',
         'label:fr': 'Onglet par défaut',
         'label:it': 'Scheda predefinita',
         'label:de': 'Standard-Tab',
         'label:pl': 'Domyślna karta',
         'label:ua': 'Вкладка за умовчанням',
         options: [
            {
               label: 'videos', value: 'videos', selected: true,
               'label:pl': 'wideo',
               'label:ua': 'відео',
            },
            {
               label: 'shorts', value: 'shorts',
            },
            {
               label: 'live', value: 'streams',
            },
            {
               label: 'playlists', value: 'playlists',
               'label:pl': 'playlista',
               'label:ua': 'плейлисти',
            },
            {
               label: 'community', value: 'community',
            },
            {
               label: 'about', value: 'about',
               'label:pl': 'o kanale',
               'label:ua': 'про канал',
            },
         ],
      },
      channel_default_tab_mode: {
         _tagName: 'select',
         label: 'Mode',
         'label:zh': '模式',
         'label:ja': 'モード',
         'label:ko': '방법',
         'label:es': 'Modo',
         'label:pt': 'Modo',
         'label:it': 'Modalità',
         'label:de': 'Modus',
         'label:pl': 'Tryb',
         'label:ua': 'Режим',
         title: 'Redirect is safer but slower',
         'title:zh': '重定向是安全的，但速度很慢',
         'title:ja': 'リダイレクトは安全ですが遅くなります',
         'title:ko': '리디렉션이 더 안전하지만 느립니다',
         'title:id': 'Redirect lebih aman tetapi lebih lambat',
         'title:es': 'La redirección es más segura pero más lenta',
         'title:pt': 'O redirecionamento é mais seguro, mas mais lento',
         'title:fr': 'La redirection est plus sûre mais plus lente',
         'title:it': 'Il reindirizzamento è più sicuro ma più lento',
         'title:de': 'Redirect ist sicherer, aber langsamer',
         'title:pl': 'Przekierowanie jest bezpieczniejsze, ale wolniejsze',
         'title:ua': 'Перенаправлення безпечніше, але повільніше',
         options: [
            {
               label: 'redirect', value: 'redirect',
               'label:pl': 'przekierowanie',
               'label:ua': 'перенаправити',
            },
            {
               label: 'click', selected: true,
               'label:pl': 'klik',
               'label:ua': 'клік',
            },
         ],
         'data-dependent': { 'channel_default_tab': ['videos', 'playlists', 'community', 'about'] },
      },
   }
});
window.nova_plugins.push({
   id: 'thumbs-preview-stop',
   title: 'Autostop thumbnail preview playback',
   run_on_pages: 'home, feed, -mobile',
   section: 'other',
   _runtime: user_settings => {
      NOVA.waitSelector('#inline-preview-player')
         .then(player => {
            NOVA.waitSelector('video', { 'container': player })
               .then(video => {
                  video.addEventListener('play', () => player.stopVideo());
               });
         });
   },
});
window.nova_plugins.push({
   id: 'ad-skip-button',
   title: 'Ad intro skip',
   'title:zh': '广告视频跳过',
   'title:ja': '広告スキップ',
   'title:ko': '광고 건너뛰기',
   'title:id': 'Intro iklan Lewati',
   'title:es': 'Saltar anuncios',
   'title:pt': 'Pular anúncios',
   'title:fr': 'Ignorer les annonces',
   'title:it': 'Salta introduttivo',
   'title:de': 'Anzeigen überspringen',
   'title:pl': 'Pomiń początkową reklamę',
   //'title:ua': 'Натиснути пропустити рекламу',
   'title:ua': 'Кнопка пропустити рекламу',
   run_on_pages: 'watch',
   section: 'player',
   desc: 'Auto click on the [Skip Ad] button',
   'desc:zh': '自动点击“Skip Ad”按钮',
   'desc:ja': '「Skip Ad」ボタンの自動クリック',
   'desc:ko': '【광고 건너뛰기】버튼 자동 클릭',
   'desc:id': 'Klik otomatis pada tombol [Lewati Iklan]',
   'desc:es': 'Haga clic automáticamente en el botón [Omitir anuncio]',
   'desc:pt': 'Clique automaticamente no botão [Ignorar anúncio]',
   'desc:fr': "Clic automatique sur le bouton [Ignorer l'annonce]",
   'desc:it': 'Fare clic automaticamente sul pulsante [Salta annuncio].',
   'desc:pl': 'Auto kliknięcie przycisku [Pomiń reklamę]',
   'desc:ua': 'Автоматично натискати кнопку для пропуску реклами',
   _runtime: user_settings => {
      NOVA.waitSelector('#movie_player.ad-showing video')
         .then(video => {
            adSkip();
            movie_player.addEventListener('onAdStateChange', adSkip.bind(video));
            video.addEventListener('loadedmetadata', adSkip.bind(video));
            video.addEventListener('loadeddata', adSkip.bind(video));
            video.addEventListener('canplay', adSkip.bind(video));
         });
      function adSkip() {
         if (!movie_player.classList.contains('ad-showing')) return;
         this.currentTime = this.duration;
         NOVA.waitSelector('div.ytp-ad-text.ytp-ad-skip-button-text:not([hidden]), button.ytp-ad-skip-button:not([hidden])', { stop_on_page_change: true })
            .then(btn => btn.click());
      }
   },
});
window.nova_plugins.push({
   id: 'player-control-below',
   title: 'Control panel below the player',
   'title:ua': 'Панель керування під плеєром',
   run_on_pages: 'watch, -mobile',
   section: 'player',
   _runtime: user_settings => {
      NOVA.waitSelector('.ytp-chrome-bottom')
         .then(async control_panel => {
            if ((heightPanel = NOVA.css.getValue(control_panel, 'height'))
               && (heightProgressBar = NOVA.css.getValue('.ytp-progress-bar-container', 'height'))
            ) {
               const height = `calc(${heightPanel} + ${heightProgressBar})` || '51px';
               let SELECTOR_CONTAINER = 'ytd-watch-flexy:not([fullscreen])';
               if (['cinema_mode', 'force'].includes(user_settings.player_full_viewport_mode)) {
                  SELECTOR_CONTAINER += `:not([theater])`;
               }
               NOVA.css.push(
                  `
                  ${SELECTOR_CONTAINER} .ytp-caption-window-bottom {
                     margin-bottom: 0;
                  }
                  
                  ${SELECTOR_CONTAINER} .ytp-gradient-bottom {
                     transform: translateY(${height});
                     display: block !important;
                     opacity: 1 !important;
                     height: ${height} !important;
                     padding: 0;
                     background-color: #0f0f0f; 
                  }
                  
                  ${SELECTOR_CONTAINER} .ytp-chrome-bottom {
                     transform: translateY(${height});
                     opacity: 1 !important;
                  }
                  
                  ${SELECTOR_CONTAINER} .html5-video-player {
                     overflow: visible;
                  }
                  
                  ${SELECTOR_CONTAINER} .ytp-player-content.ytp-iv-player-content {
                     bottom: ${NOVA.css.getValue('.ytp-player-content.ytp-iv-player-content', 'left') || '12px'};
                  }
                  
                  ${SELECTOR_CONTAINER} .ytp-tooltip,
                  ${SELECTOR_CONTAINER} .ytp-settings-menu {
                     transform: translateY(${height});
                  }
                  
                  
                  ${SELECTOR_CONTAINER}[theater] > #columns,
                  ${SELECTOR_CONTAINER}:not([theater]) #below {
                     margin-top: ${height} !important;
                  }
                  
                  `);
               if (user_settings['player-float-progress-bar']) {
                  NOVA.css.push(
                     `#movie_player.ytp-autohide .ytp-chrome-bottom .ytp-progress-bar-container {
                        display: none !important;
                     }`);
               }
               fixControlFreeze.apply(document.body.querySelector('ytd-watch-flexy'));
            }
         });
      function fixControlFreeze(ms = 2000) {
         const moveMouse = new Event('mousemove');
         return window.setInterval(() => {
            if (['smart'].includes(user_settings.player_full_viewport_mode) && NOVA.css.getValue(movie_player, 'z-index') != '2020' && NOVA.css.getValue(movie_player, 'position') != 'fixed') return;
            if (NOVA.currentPage === 'watch'
               && document.visibilityState == 'visible'
               && movie_player.classList.contains('playing-mode')
               && !NOVA.isFullscreen()
               && user_settings.player_hide_elements != 'time_display'
               && (!user_settings['theater-mode'] || (user_settings['theater-mode'] && !['cinema_mode', 'force'].includes(user_settings.player_full_viewport_mode)))
            ) {
               movie_player.dispatchEvent(moveMouse);
            }
         }, ms);
      }
   },
});
window.nova_plugins.push({
   id: 'player-hide-elements',
   title: 'Hide some player buttons/elements',
   run_on_pages: 'watch, embed, -mobile',
   section: 'player',
   _runtime: user_settings => {
      const SELECTORS = {
         'videowall_endscreen': '#movie_player .videowall-endscreen',
         'card_endscreen': '#movie_player [class^="ytp-ce-"]',
         'prev_button': '#movie_player .ytp-chrome-bottom .ytp-prev-button',
         'play_button': '#movie_player .ytp-chrome-bottom .ytp-play-button',
         'next_button': '#movie_player .ytp-chrome-bottom .ytp-next-button',
         'volume_area': '#movie_player .ytp-chrome-bottom .ytp-volume-area',
         'time_display': '#movie_player .ytp-chrome-bottom .ytp-time-display'
            + (user_settings['time-remaining'] ? ' span > span:not([id])' : ''),
         'chapter_container': '#movie_player .ytp-chrome-bottom .ytp-chapter-container',
         'autonav_toggle_button': '#movie_player .ytp-chrome-bottom button.ytp-button[data-tooltip-target-id="ytp-autonav-toggle-button"]',
         'subtitles_button': '#movie_player .ytp-chrome-bottom button.ytp-subtitles-button',
         'settings_button': '#movie_player .ytp-chrome-bottom button.ytp-settings-button',
         'size_button': '#movie_player .ytp-chrome-bottom button.ytp-size-button',
         'miniplayer_button': '#movie_player .ytp-chrome-bottom button.ytp-miniplayer-button',
         'logo_button': '#movie_player .ytp-chrome-bottom .yt-uix-sessionlink',
         'fullscreen_button': '#movie_player .ytp-chrome-bottom button.ytp-fullscreen-button',
      };
      const toArray = a => Array.isArray(a) ? a : [a];
      let list = [];
      toArray(user_settings.player_hide_elements)
         .forEach(el => (data = SELECTORS[el]) && list.push(data));
      if (list.length) {
         NOVA.css.push(
            list.join(',\n') + ` {
               display: none !important;
            }`);
      }
   },
   options: {
      player_hide_elements: {
         _tagName: 'select',
         label: 'Items',
         title: '[Ctrl+Click] to select several',
         'title:zh': '[Ctrl+Click] 选择多个',
         'title:ja': '「Ctrl+Click」して、いくつかを選択します',
         'title:ko': '[Ctrl+Click] 여러 선택',
         'title:id': '[Ctrl+Klik] untuk memilih beberapa',
         'title:es': '[Ctrl+Click] para seleccionar varias',
         'title:pt': '[Ctrl+Click] para selecionar vários',
         'title:fr': '[Ctrl+Click] pour sélectionner plusieurs',
         'title:it': '[Ctrl+Clic] per selezionarne diversi',
         'title:de': '[Ctrl+Click] um mehrere auszuwählen',
         'title:pl': 'Ctrl+kliknięcie, aby zaznaczyć kilka',
         'title:ua': '[Ctrl+Click] щоб обрати декілька',
         multiple: null,
         required: true,
         size: 10,
         options: [
            {
               label: 'videowall (thumbs)', value: 'videowall_endscreen',
            },
            {
               label: 'card', value: 'card_endscreen',
            },
            {
               label: 'prev', value: 'prev_button',
            },
            {
               label: 'play', value: 'play_button',
            },
            {
               label: 'next', value: 'next_button',
            },
            {
               label: 'volume', value: 'volume_area',
            },
            {
               label: 'time', value: 'time_display',
            },
            {
               label: 'chapter', value: 'chapter_container',
            },
            {
               label: 'autonav toggle', value: 'autonav_toggle_button',
            },
            {
               label: 'subtitles', value: 'subtitles_button',
            },
            {
               label: 'settings', value: 'settings_button',
            },
            {
               label: 'size', value: 'size_button',
            },
            {
               label: 'miniplayer', value: 'miniplayer_button',
            },
            {
               label: 'logo (embed)', value: 'logo_button',
            },
            {
               label: 'fullscreen', value: 'fullscreen_button',
            },
         ],
      },
   }
});
window.nova_plugins.push({
   id: 'player-resize-ratio',
   title: 'Player force resize 16:9',
   'title:ua': 'Примусова зміна розміру програвача 16:9',
   run_on_pages: 'watch',
   section: 'player',
   desc: 'only for 4:3 video',
   'desc:ua': 'Лише для відео розміром 4:3',
   _runtime: user_settings => {
      NOVA.waitSelector('ytd-watch-flexy:not([theater])')
         .then(ytd_watch => {
            NOVA.waitSelector('#movie_player video')
               .then(video => {
                  console.assert(ytd_watch.calculateCurrentPlayerSize_, '"ytd_watch" does not have fn "calculateCurrentPlayerSize_"');
                  const
                     heightRatio = .5625,
                     check4to3 = () => '4:3' == NOVA.aspectRatio.getAspectRatio({
                        'width': video.videoWidth,
                        'height': video.videoHeight,
                     });
                  if (ytd_watch.calculateCurrentPlayerSize_ && ytd_watch.updateStyles) {
                     const backupFn = ytd_watch.calculateCurrentPlayerSize_;
                     patchYtCalculateFn();
                     video.addEventListener('loadeddata', patchYtCalculateFn);
                     function sizeBypass() {
                        let width = height = NaN;
                        if (!ytd_watch.theater) {
                           width = movie_player.offsetWidth;
                           height = Math.round(movie_player.offsetWidth / (16 / 9));
                           if (ytd_watch.updateStyles) {
                              ytd_watch.updateStyles({
                                 '--ytd-watch-flexy-width-ratio': 1,
                                 '--ytd-watch-flexy-height-ratio': heightRatio,
                              });
                              window.dispatchEvent(new Event('resize'));
                           }
                        }
                        return {
                           'width': width,
                           'height': height,
                        };
                     }
                     function patchYtCalculateFn() {
                        ytd_watch.calculateCurrentPlayerSize_ = check4to3() ? sizeBypass : backupFn;
                     }
                  }
                  else {
                     new MutationObserver(mutationRecordsArray => {
                        if (!ytd_watch.theater && heightRatio != ytd_watch.style.getPropertyValue('--ytd-watch-flexy-height-ratio')) {
                           updateRatio();
                        }
                     })
                        .observe(ytd_watch, { attributes: true, attributeFilter: ['style'] });
                  }
                  window.addEventListener('resize', updateRatio);
                  function updateRatio() {
                     if (check4to3()) {
                        ytd_watch.style.setProperty('--ytd-watch-flexy-width-ratio', 1);
                        ytd_watch.style.setProperty('--ytd-watch-flexy-height-ratio', heightRatio);
                     }
                  }
               });
         });
   },
});
window.nova_plugins.push({
   id: 'player-hotkeys-focused',
   title: 'Player shortcuts always active',
   'title:zh': '播放器热键始终处于活动状态',
   'title:ja': 'プレーヤーのホットキーは常にアクティブです',
   'title:ko': '플레이어 단축키는 항상 활성화되어 있습니다',
   'title:id': 'Tombol pintas pemain selalu aktif',
   'title:es': 'Teclas de acceso rápido del jugador siempre activas',
   'title:pt': 'Teclas de atalho do jogador sempre ativas',
   'title:fr': 'Les raccourcis clavier du joueur sont toujours actifs',
   'title:it': 'Tasti di scelta rapida del giocatore sempre attivi',
   'title:de': 'Player-Hotkeys immer aktiv',
   'title:pl': 'Klawisze skrótów dla graczy zawsze aktywne',
   'title:ua': 'Гарячі клавіші відтворювача завжди активні',
   run_on_pages: 'watch, embed, -mobile',
   section: 'player',
   _runtime: user_settings => {
      document.addEventListener('keydown', evt => {
         if (['input', 'textarea', 'select'].includes(evt.target.localName) || evt.target.isContentEditable) return;
         movie_player.focus();
         if (user_settings.hotkeys_disable_numpad && evt.code.startsWith('Numpad')) {
            evt.preventDefault();
            evt.stopPropagation();
            evt.stopImmediatePropagation();
         }
      });
   },
   options: {
      hotkeys_disable_numpad: {
         _tagName: 'input',
         label: 'Disable numpad hotkeys',
         type: 'checkbox',
      },
   }
});
window.nova_plugins.push({
   id: 'disable-player-sleep-mode',
   title: 'Disable the "Continue watching?" popup',
   'title:zh': '玩家永远保持活跃',
   'title:ja': 'プレーヤーは永遠にアクティブなままです',
   'title:ko': '플레이어는 영원히 활성 상태를 유지',
   'title:id': 'Pemain tetap aktif selamanya',
   'title:es': 'El jugador permanece activo para siempre',
   'title:pt': 'Jogador permanece ativo para sempre',
   'title:fr': 'Le joueur reste actif pour toujours',
   'title:it': 'Il giocatore resta attivo per sempre',
   'title:de': 'Spieler bleiben für immer aktiv',
   'title:pl': 'Wyłącz tryb uśpienia odtwarzacza',
   'title:ua': 'Вимкнути режим сну відтворювача',
   run_on_pages: 'watch, -mobile',
   section: 'player',
   _runtime: user_settings => {
      window.setInterval(() => {
         if (!document.hasFocus()) {
            document.dispatchEvent(
               new KeyboardEvent('keyup', { bubbles: true, cancelable: true, keyCode: 143, which: 143 })
            );
         }
      }, 1000 * 60 * 5);
   },
});
window.nova_plugins.push({
   id: 'embed-show-control-force',
   title: 'Force enable control panel in embed',
   'title:zh': '埋め込みでコントロール パネルを強制的に有効にする',
   'title:ja': '强制启用嵌入的控制面板',
   'title:ko': '임베디드에서 강제 활성화 제어판',
   'title:id': 'Paksa aktifkan panel kontrol di sematan',
   'title:es': 'Forzar habilitar el panel de control en incrustar',
   'title:pt': 'Forçar ativação do painel de controle na incorporação',
   'title:fr': "Forcer l'activation du panneau de contrôle dans l'intégration",
   'title:it': "Forza l'abilitazione del pannello di controllo nell'incorporamento",
   'title:de': 'Erzwingen Sie die Aktivierung des Bedienfelds in der Einbettung',
   'title:pl': 'Wymuś włączenie panelu sterowania w osadzeniu',
   'title:ua': 'Примусово показувати панель керування у вбудованому відео',
   run_on_pages: 'embed',
   section: 'player',
   _runtime: user_settings => {
      if (['0', 'false'].includes(NOVA.queryURL.get('controls'))) {
         NOVA.updateUrl(NOVA.queryURL.remove('controls'));
      }
   },
});
window.nova_plugins.push({
   id: 'time-jump',
   title: 'Time jump',
   'title:zh': '时间跳跃',
   'title:ja': 'タイムジャンプ',
   'title:ko': '시간 점프',
   'title:id': 'Lompatan waktu',
   'title:es': 'Salto de tiempo',
   'title:pt': 'Salto no tempo',
   'title:fr': 'Saut dans le temps',
   'title:it': 'Salto nel tempo',
   'title:de': 'Zeitsprung',
   'title:pl': 'Skok czasowy',
   'title:ua': 'Стрибок часу',
   run_on_pages: 'watch, embed, -mobile',
   section: 'player',
   desc: 'Use to skip the intro or ad inserts',
   'desc:zh': '用于跳过介绍或广告插入',
   'desc:ja': 'イントロや広告挿入をスキップするために使用します',
   'desc:ko': '인트로 또는 광고 삽입을 건너뛸 때 사용',
   'desc:id': 'Gunakan untuk melewati intro atau sisipan iklan',
   'desc:pt': 'Use para pular a introdução ou inserções de anúncios',
   'desc:fr': "Utiliser pour ignorer l'intro ou les encarts publicitaires",
   'desc:pl': 'Służy do pomijania wstępu lub wstawek reklamowych',
   'desc:ua': 'Використовуйте щоб пропустити інтро',
   _runtime: user_settings => {
      if (user_settings.time_jump_title_offset) addTitleOffset();
      NOVA.waitSelector('#movie_player video')
         .then(video => {
            let chapterList;
            video.addEventListener('loadeddata', () => chapterList = []);
            doubleKeyPressListener(timeLeap, user_settings.time_jump_hotkey);
            function timeLeap() {
               if (movie_player.getVideoData().isLive
                  || (NOVA.currentPage == 'embed' && window.self.location.href.includes('live_stream'))
               ) return;
               if (chapterList !== null && !chapterList?.length) {
                  chapterList = NOVA.getChapterList(movie_player.getDuration()) || null;
               }
               const
                  currentTime = movie_player.getCurrentTime(),
                  nextChapterIndex = chapterList?.findIndex(c => c.sec > currentTime),
                  separator = ' • ';
               let msg;
               if (chapterList?.length
                  && nextChapterIndex !== -1
               ) {
                  const nextChapterData = chapterList?.find(({ sec }) => sec >= currentTime);
                  seekTime(nextChapterData.sec + .5);
                  msg = nextChapterData.title + separator + nextChapterData.time;
               }
               else {
                  seekTime(+user_settings.time_jump_step + currentTime);
                  msg = `+${user_settings.time_jump_step} sec` + separator + NOVA.timeFormatTo.HMS.digit(currentTime);
               }
               NOVA.bezelTrigger(msg);
            }
            function seekTime(sec) {
               if (typeof movie_player.seekBy === 'function') {
                  movie_player.seekTo(sec);
               }
               else if (NOVA.videoElement) {
                  NOVA.videoElement.currentTime = sec;
               }
               else {
                  const errorText = '[time-jump] > "seekTime" detect player error'
                  console.error(errorText);
                  throw errorText;
               }
            }
         });
      function addTitleOffset() {
         NOVA.css.push(
            `.ytp-tooltip-text:after {
               content: attr(data-before);
               color: #ffcc00;
            }`);
         NOVA.waitSelector('.ytp-progress-bar')
            .then(progressContainer => {
               if (tooltipEl = document.body.querySelector('.ytp-tooltip-text')) {
                  progressContainer.addEventListener('mousemove', () => {
                     if (movie_player.getVideoData().isLive
                        || (NOVA.currentPage == 'embed' && window.self.location.href.includes('live_stream'))
                     ) return;
                     const
                        cursorTime = NOVA.timeFormatTo.hmsToSec(tooltipEl.textContent),
                        offsetTime = cursorTime - NOVA.videoElement?.currentTime,
                        sign = (offsetTime >= 1) ? '+' : (Math.sign(offsetTime) === -1) ? '-' : '';
                     tooltipEl.setAttribute('data-before', ` ${sign + NOVA.timeFormatTo.HMS.digit(offsetTime)}`);
                  });
                  progressContainer.addEventListener('mouseleave', () => tooltipEl.removeAttribute('data-before'));
               }
            });
      }
      function doubleKeyPressListener(callback, keyCodeFilter) {
         let
            pressed,
            isDoublePress,
            lastPressed = parseInt(keyCodeFilter) || null;
         const
            timeOut = () => setTimeout(() => isDoublePress = false, 500),
            handleDoublePresss = key => {
               if (callback && typeof callback === 'function') return callback(key);
            };
         function keyPress(evt) {
            if (['input', 'textarea', 'select'].includes(evt.target.localName) || evt.target.isContentEditable) return;
            pressed = evt.keyCode;
            if (isDoublePress && pressed === lastPressed) {
               isDoublePress = false;
               handleDoublePresss(evt);
            }
            else {
               isDoublePress = true;
               timeOut();
            }
            if (!keyCodeFilter) lastPressed = pressed;
         }
         document.addEventListener('keyup', keyPress);
      }
      if (user_settings['save-channel-state']) {
         NOVA.waitSelector('#movie_player video')
            .then(video => {
               NOVA.runOnPageInitOrTransition(async () => {
                  const
                     CACHE_PREFIX = 'nova-resume-playback-time',
                     getCacheName = () => CACHE_PREFIX + ':' + (NOVA.queryURL.get('v') || movie_player.getVideoData().video_id);
                  if ((NOVA.currentPage == 'watch' || NOVA.currentPage == 'embed')
                     && !+sessionStorage.getItem(getCacheName())
                     && !NOVA.queryURL.has('t')
                     && (userSeek = await NOVA.storage_obj_manager.getParam('skip-into'))
                  ) {
                     video.addEventListener('canplay', timeLeapInto.apply(video, [userSeek]), { capture: true, once: true });
                  }
               });
            });
      }
      else if (+user_settings.skip_into_step) {
         NOVA.waitSelector('#movie_player video')
            .then(video => {
               NOVA.runOnPageInitOrTransition(() => {
                  if (NOVA.currentPage == 'watch') {
                     video.addEventListener('canplay', timeLeapInto.bind(video), { capture: true, once: true });
                  }
               });
            });
      }
      function timeLeapInto(time_seek = user_settings.skip_into_step || 10) {
         if (!time_seek && !user_settings.skip_into_step_in_music && NOVA.isMusic()) return;
         const
            CACHE_PREFIX = 'resume-playback-time',
            getCacheName = () => CACHE_PREFIX + ':' + (NOVA.queryURL.get('v') || movie_player.getVideoData().video_id);
         if (user_settings['player-resume-playback']
            && (saveTime = +sessionStorage.getItem(getCacheName()))
            && (saveTime > (this.duration - 3))
         ) return;
         if ((isNaN(this.duration) || this.duration > 30)
            && this.currentTime < (+user_settings.skip_into_step || +time_seek)
         ) {
            this.currentTime = +time_seek;
         }
      }
   },
   options: {
      time_jump_step: {
         _tagName: 'input',
         label: 'Step time',
         'label:zh': '步骤时间',
         'label:ko': '단계 시간',
         'label:id': 'Langkah waktu',
         'label:es': 'Tiempo de paso',
         'label:pt': 'Tempo da etapa',
         'label:fr': 'Temps de pas',
         'label:it': 'Tempo di passaggio',
         'label:de': 'Schrittzeit',
         'label:pl': 'Krok czasowy',
         'label:ua': 'Крок часу',
         type: 'number',
         title: 'In seconds',
         placeholder: 'sec',
         min: 3,
         max: 300,
         value: 30,
      },
      time_jump_hotkey: {
         _tagName: 'select',
         label: 'Hotkey (double click)',
         'label:zh': '热键（双击）',
         'label:ja': 'Hotkey (ダブルプレス)',
         'label:ko': '단축키(더블 클릭)',
         'label:id': 'Tombol pintas (klik dua kali)',
         'label:es': 'Tecla de acceso rápido (doble clic)',
         'label:pt': 'Atalho (duplo clique)',
         'label:fr': 'Raccourci clavier (double clic)',
         'label:it': 'Tasto di scelta rapida (doppio clic)',
         'label:de': 'Hotkey (Doppelklick)',
         'label:pl': 'Klawisz skrótu (podwójne kliknięcie)',
         'label:ua': 'Гаряча клавіша (двічі натиснути)',
         options: [
            { label: 'alt', value: 18 },
            { label: 'shift', value: 16 },
            { label: 'ctrl', value: 17, selected: true },
         ],
      },
      time_jump_title_offset: {
         _tagName: 'input',
         label: 'Show time offset on progress bar',
         'label:zh': '在进度条中显示时间偏移',
         'label:ja': 'プログレスバーに時間オフセットを表示する',
         'label:ko': '진행률 표시줄에 시간 오프셋 표시',
         'label:id': 'Tampilkan offset waktu di bilah kemajuan',
         'label:es': 'Mostrar compensación de tiempo en la barra de progreso',
         'label:pt': 'Mostrar a diferença de tempo na barra de progresso',
         'label:fr': 'Afficher le décalage horaire sur la barre de progression',
         'label:it': "Mostra l'offset di tempo sulla barra di avanzamento",
         'label:de': 'Zeitverschiebung im Fortschrittsbalken anzeigen',
         'label:pl': 'Pokaż przesunięcie czasu na pasku postępu',
         'label:ua': 'Показувати часовий зсув на панелі прогресу',
         type: 'checkbox',
         title: 'Time offset from current playback time',
         'title:zh': '与当前播放时间的时间偏移',
         'title:ja': '現在の再生時間からの時間オフセット',
         'title:ko': '현재 재생 시간으로부터의 시간 오프셋',
         'label:id': 'Waktu offset dari waktu pemutaran saat ini',
         'title:es': 'Desfase de tiempo del tiempo de reproducción actual',
         'title:pt': 'Deslocamento de tempo do tempo de reprodução atual',
         'title:fr': "Décalage temporel par rapport à l'heure de lecture actuelle",
         'title:it': 'Spostamento temporale dal tempo di riproduzione corrente',
         'title:de': 'Zeitverschiebung zur aktuellen Wiedergabezeit',
         'title:pl': 'Przesunięcie czasu względem bieżącego czasu odtwarzania',
         'title:ua': 'Часовий зсув відносно поточного часу відтворення',
      },
      skip_into_step: {
         _tagName: 'input',
         label: 'Start playback at',
         'label:zh': '设置开始时间',
         'label:ja': '開始時刻を設定',
         'label:ko': '시작 시간 설정',
         'label:id': 'Tetapkan waktu mulai',
         'label:es': 'Establecer hora de inicio',
         'label:pt': 'Definir horário de início',
         'label:fr': "Définir l'heure de début",
         'label:it': "Imposta l'ora di inizio",
         'label:de': 'Startzeit festlegen',
         'label:pl': 'Ustaw czas rozpoczęcia',
         'label:ua': 'Встановіть час початку',
         type: 'number',
         title: 'sec',
         placeholder: '1-30',
         step: 1,
         min: 0,
         max: 30,
         value: 0,
      },
      skip_into_step_in_music: {
         _tagName: 'input',
         label: 'Apply for music genre',
         type: 'checkbox',
         'data-dependent': { 'skip_into_step': "!0" },
      },
   }
});
window.nova_plugins.push({
   id: 'player-indicator',
   title: 'Replace HUD (bezel)',
   'title:zh': '替换默认指示器',
   'title:ja': 'デフォルトのインジケーターを置き換える',
   'title:ko': '기본 표시기 교체',
   'title:id': 'Ganti HUD (bezel)',
   'title:es': 'Reemplazar indicador predeterminado',
   'title:pt': 'Substituir o indicador padrão',
   'title:fr': "Remplacer l'indicateur par défaut",
   'title:it': 'Sostituisci HUD (cornice)',
   'title:de': 'Standardkennzeichen ersetzen',
   'title:pl': 'Zamień wskaźnik standardowy',
   'title:ua': 'Замінити стандартний інтерфейс',
   run_on_pages: 'watch, embed, -mobile',
   section: 'player',
   _runtime: user_settings => {
      const
         SELECTOR_ID = 'nova-player-indicator-info',
         COLOR_HUD = user_settings.player_indicator_color || '#ff0000';
      NOVA.waitSelector('#movie_player video')
         .then(video => {
            video.addEventListener('volumechange', function () {
               HUD.set({
                  'pt': Math.round(movie_player.getVolume()),
                  'suffix': '%',
               });
            });
            video.addEventListener('ratechange', () => HUD.set({
               'pt': video.playbackRate,
               'suffix': 'x',
            }));
            if (user_settings.player_indicator_chapter) {
               NOVA.waitSelector('ytd-watch-metadata #description.ytd-watch-metadata')
                  .then(() => {
                     const getNextChapterIndex = () => chapterList?.findIndex(c => c.sec > ~~video.currentTime);
                     let chapterList, lastChapTime = 0;
                     video.addEventListener('loadeddata', () => chapterList = []);
                     video.addEventListener('timeupdate', function () {
                        if (chapterList !== null && !chapterList?.length) {
                           chapterList = NOVA.getChapterList(movie_player.getDuration()) || null;
                        }
                        if (chapterList?.length
                           && this.currentTime > lastChapTime
                        ) {
                           const nextChapterIndex = getNextChapterIndex();
                           lastChapTime = chapterList[nextChapterIndex].sec;
                           if (chapterData = chapterList[nextChapterIndex - 1]) {
                              const separator = ' • ';
                              const msg = chapterData.title + separator + chapterData.time;
                              NOVA.bezelTrigger(msg);
                           }
                        }
                     });
                     video.addEventListener('seeking', function () {
                        if (chapterList?.length && (nexChapterData = chapterList[getNextChapterIndex()])) {
                           lastChapTime = nexChapterData.sec;
                        }
                     });
                  });
               if (user_settings.player_indicator_chapter_default_container_hide
                  && !(user_settings.player_hide_elements.length && user_settings.player_hide_elements.includes('chapter_container'))
               ) {
                  NOVA.css.push(
                     `#movie_player .ytp-chrome-bottom .ytp-chapter-container { display: none !important; }`
                  );
               }
            }
         });
      NOVA.waitSelector('.ytp-bezel-text')
         .then(target => {
            new MutationObserver(mutationRecordsArray => {
               let timeout_ms;
               if (target.textContent) {
                  if (!target.textContent.startsWith('+') && target.textContent.includes(' • ')) {
                     timeout_ms = 1800;
                  }
                  HUD.set({
                     'pt': target.textContent,
                     'timeout_ms': timeout_ms,
                  });
               }
            })
               .observe(target, { attributes: true, childList: true });
         });
      const HUD = {
         get() {
            return this.container || this.create();
         },
         create() {
            NOVA.css.push(
               `.ytp-bezel-text-wrapper,
               .ytp-doubletap-ui-legacy.ytp-time-seeking,
               
               .ytp-chapter-seek {
                  display:none !important;
               }`);
            NOVA.css.push(
               `#${SELECTOR_ID} {
                  --color: #fff;
                  --bg-color: rgba(0,0,0,${user_settings.player_indicator_opacity || .3});
                  --zindex: ${1 + Math.max(NOVA.css.getValue('.ytp-chrome-top', 'z-index'), 60)};
                  position: absolute;
                  right: 0;
                  z-index: calc(var(--zindex) + 1);
                  margin: 0 auto;
                  text-align: center;
                  opacity: 0;
                  background-color: var(--bg-color);
                  color: var(--color);
               }`);
            movie_player.insertAdjacentHTML('beforeend', `<div id="${SELECTOR_ID}"><span></span></div>`);
            this.container = document.getElementById(SELECTOR_ID);
            this.hudSpan = this.container.querySelector('span');
            switch (user_settings.player_indicator_type) {
               case 'bar-center':
                  Object.assign(this.container.style, {
                     left: 0,
                     bottom: '20%',
                     width: '30%',
                     'font-size': '1.2em',
                  });
                  Object.assign(this.hudSpan.style, {
                     'background-color': COLOR_HUD,
                     transition: 'width 100ms ease-out 0s',
                     display: 'inline-block',
                  });
                  break;
               case 'bar-vertical':
                  Object.assign(this.container.style, {
                     top: 0,
                     height: '100%',
                     width: '25px',
                     'font-size': '1.2em',
                  });
                  Object.assign(this.hudSpan.style, {
                     position: 'absolute',
                     bottom: 0,
                     right: 0,
                     'background-color': COLOR_HUD,
                     transition: 'height 100ms ease-out 0s',
                     display: 'inline-block',
                     width: '100%',
                     'font-weight': 'bold',
                  });
                  break;
               default:
                  Object.assign(this.container.style, {
                     top: 0,
                     width: '100%',
                     padding: '.2em',
                     'font-size': '1.55em',
                  });
            }
            return this.container;
         },
         set({ pt = 100, suffix = '', timeout_ms = 800 }) {
            if (typeof this.fateNovaHUD === 'number') clearTimeout(this.fateNovaHUD);
            let hudContainer = this.get();
            const text = pt + suffix;
            if (suffix == 'x') {
               const maxPercent = (+user_settings.rate_step % .25) === 0 ? 2 : 3;
               pt = (+pt / maxPercent) * 100;
            }
            pt = Math.round(pt);
            switch (user_settings.player_indicator_type) {
               case 'bar-center':
                  this.hudSpan.style.width = pt + '%';
                  this.hudSpan.textContent = text;
                  break;
               case 'bar-vertical':
                  this.hudSpan.style.height = pt + '%';
                  this.hudSpan.textContent = text;
                  break;
               case 'bar-top':
                  hudContainer.style.background = `linear-gradient(to right, ${COLOR_HUD}50 ${pt}%, rgba(0,0,0,.8) ${pt}%)`;
                  this.hudSpan.style.width = pt + '%';
                  this.hudSpan.textContent = text;
                  break;
               default:
                  this.hudSpan.textContent = text;
            }
            hudContainer.style.transition = 'none';
            hudContainer.style.opacity = 1;
            this.fateNovaHUD = setTimeout(() => {
               hudContainer.style.transition = 'opacity 200ms ease-in';
               hudContainer.style.opacity = null;
            }, timeout_ms); //total 1s = 800ms + 200ms(hudContainer.style.transition)
         }
      };
   },
   options: {
      player_indicator_type: {
         _tagName: 'select',
         label: 'Indicator type',
         'label:zh': '指标类型',
         'label:ja': 'インジケータータイプ',
         'label:ko': '표시기 유형',
         'label:id': 'Gösterge tipi',
         'label:es': 'Tipo de indicador',
         'label:pt': 'Tipo de indicador',
         'label:fr': "Type d'indicateur",
         'label:it': 'Tipo di indicatore',
         'label:de': 'Indikatortyp',
         'label:pl': 'Typ wskaźnika',
         'label:ua': 'Тип індикатора',
         options: [
            {
               label: 'text-top', value: 'text-top', selected: true,
               'label:ua': 'текст зверху',
            },
            {
               label: 'bar-top', value: 'bar-top',
               'label:ua': 'панель зверху',
            },
            {
               label: 'bar-center', value: 'bar-center',
               'label:ua': 'панель в центрі',
            },
            {
               label: 'bar-vertical', value: 'bar-vertical',
               'label:ua': 'вертикальна панель',
            },
         ],
      },
      player_indicator_color: {
         _tagName: 'input',
         type: 'color',
         value: '#ff0000',
         label: 'Color',
         'label:zh': '颜色',
         'label:ja': '色',
         'label:ko': '색깔',
         'label:id': 'Warna',
         'label:pt': 'Cor',
         'label:fr': 'Couleur',
         'label:it': 'Colore',
         'label:de': 'Farbe',
         'label:pl': 'Kolor',
         'label:ua': 'Колір',
         'data-dependent': { 'player_indicator_type': '!text-top' },
      },
      player_indicator_chapter: {
         _tagName: 'input',
         label: 'Show info at start chapter',
         'label:zh': '在开始章节显示信息',
         'label:ja': '章の開始時に情報を表示',
         'label:ko': '시작 장에 정보 표시',
         'label:id': 'Tampilkan info di awal bab',
         'label:es': 'Mostrar información al inicio del capítulo',
         'label:pt': 'Mostrar informações no capítulo inicial',
         'label:fr': 'Afficher les informations au début du chapitre',
         'label:it': "Mostra informazioni all'inizio del capitolo",
         'label:de': 'Info beim Startkapitel anzeigen',
         'label:pl': 'Pokaż informacje na początku rozdziału',
         'label:ua': 'Показати інформацію на початку розділу',
         type: 'checkbox',
      },
      player_indicator_chapter_default_container_hide: {
         _tagName: 'input',
         label: 'Hide default block in player control panel',
         type: 'checkbox',
         'data-dependent': { 'player_indicator_chapter': true },
      },
      player_indicator_opacity: {
         _tagName: 'input',
         label: 'Opacity',
         'label:zh': '不透明度',
         'label:ja': '不透明度',
         'label:ko': '불투명',
         'label:id': 'Kegelapan',
         'label:es': 'Opacidad',
         'label:pt': 'Opacidade',
         'label:fr': 'Opacité',
         'label:it': 'Opacità',
         'label:tr': 'opaklık',
         'label:de': 'Opazität',
         'label:pl': 'Przezroczystość',
         'label:ua': 'Прозорість',
         type: 'number',
         title: 'less value - more transparency',
         placeholder: '0-1',
         step: .1,
         min: .1,
         max: .9,
         value: .3,
      },
   }
});
window.nova_plugins.push({
   id: 'theater-mode',
   title: 'Theater mode',
   'title:pl': 'Tryb kinowy',
   'title:ua': 'Режим кінотеарту',
   run_on_pages: 'watch, -mobile',
   section: 'player',
   _runtime: user_settings => {
      if (user_settings.player_full_viewport_mode == 'redirect_watch_to_embed') {
         return location.assign(`https://www.youtube.com/embed/` + NOVA.queryURL.get('v'));
      }
      NOVA.waitSelector('ytd-watch-flexy')
         .then(el => {
            if (location.search.includes('list=')) {
               if (user_settings.theater_mode_ignore_playlist == 'all'
                  || (user_settings.theater_mode_ignore_playlist == 'music' && NOVA.isMusic())
               ) {
                  el.theaterModeChanged_(false);
                  return;
               }
            }
            el.theaterModeChanged_(true);
         });
      if (user_settings.player_full_viewport_mode == '') return;
      if ((user_settings['player-fullscreen-mode'] || user_settings['embed-popup'])
         && !user_settings.player_fullscreen_mode_embed
         && user_settings.player_full_viewport_mode != 'cinema_mode'
      ) {
         return;
      }
      NOVA.waitSelector('#movie_player')
         .then(movie_player => {
            const
               PLAYER_CONTAINER_SELECTOR = 'ytd-watch-flexy[theater]:not([fullscreen]) #player-theater-container',
               PINNED_SELECTOR = '.nova-player-pin',
               PLAYER_SCROLL_LOCK_CLASS_NAME = 'nova-lock-scroll',
               PLAYER_SELECTOR = `${PLAYER_CONTAINER_SELECTOR} #movie_player:not(${PINNED_SELECTOR}):not(.${PLAYER_SCROLL_LOCK_CLASS_NAME})`,
               zIindex = Math.max(getComputedStyle(movie_player)['z-index'], 2020);
            addScrollDownBehavior();
            switch (user_settings.player_full_viewport_mode) {
               case 'force':
                  setPlayerFullViewport(user_settings.player_full_viewport_mode_exit);
               case 'smart':
                  if (user_settings.player_full_viewport_mode_exclude_shorts && NOVA.currentPage == 'shorts') {
                     return;
                  }
                  NOVA.waitSelector('video')
                     .then(video => {
                        video.addEventListener('loadeddata', function () {
                           if (user_settings.player_full_viewport_mode_exclude_shorts && this.videoWidth < this.videoHeight) {
                              return;
                           }
                           const miniSize = NOVA.aspectRatio.sizeToFit({
                              'srcWidth': this.videoWidth,
                              'srcHeight': this.videoHeight,
                           });
                           if (miniSize.width < window.innerWidth) {
                              setPlayerFullViewport('player_full_viewport_mode_exit');
                           }
                        });
                     });
                  break;
               case 'cinema_mode':
                  NOVA.css.push(
                     PLAYER_CONTAINER_SELECTOR + `{
                        z-index: ${zIindex};
                     }
                     ${PLAYER_SELECTOR}:before {
                        content: '';
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, ${+user_settings.cinema_mode_opacity});
                        opacity: 0;
                        transition: opacity .4s ease-in-out;
                        pointer-events: none;
                     }
                     
                     ${PLAYER_SELECTOR}.playing-mode:before {
                        opacity: 1;
                     }
                     
                     .ytp-ad-player-overlay,
                     #playlist:hover,
                     #masthead-container:hover,
                     iframe, 
                     #guide,
                     [class*="popup"],
                     [role="navigation"],
                     [role="dialog"] {
                        z-index: ${zIindex + 1};
                     }
                     #playlist:hover {
                        position: relative;
                     }
                     
                     body { overflow: hidden; }`);
                  break;
            }
            function setPlayerFullViewport(exclude_pause) {
               const CLASS_OVER_PAUSED = 'nova-player-fullviewport';
               NOVA.css.push(
                  `${PLAYER_SELECTOR}.playing-mode
                  ${exclude_pause ? '' : `, ${PLAYER_SELECTOR}.paused-mode`}
                  , ${PLAYER_SELECTOR}.${CLASS_OVER_PAUSED} {
                     width: 100vw;
                     height: 100vh;
                     position: fixed;
                     bottom: 0 !important;
                     z-index: ${zIindex};
                     background-color: black;
                  }
                  
                  body { overflow: hidden; }`);
               if (user_settings.player_full_viewport_mode_exit) {
                  NOVA.waitSelector('video')
                     .then(video => {
                        video.addEventListener('pause', () => {
                           if (!document.body.querySelector('.ytp-progress-bar')?.contains(document.activeElement)) {
                              window.dispatchEvent(new Event('resize'));
                           }
                        });
                     });
                  NOVA.waitSelector('.ytp-progress-bar')
                     .then(progress_bar => {
                        ['mousedown', 'mouseup'].forEach(evt => {
                           progress_bar.addEventListener(evt, () => {
                              movie_player.classList.add(CLASS_OVER_PAUSED);
                           });
                        });
                     });
               }
            }
            function addScrollDownBehavior() {
               if (activateScrollElement = document.body.querySelector('.ytp-chrome-controls')) {
                  activateScrollElement.addEventListener('wheel', evt => {
                     switch (Math.sign(evt.wheelDelta)) {
                        case -1:
                           movie_player.classList.add(PLAYER_SCROLL_LOCK_CLASS_NAME);
                           break;
                     }
                  });
                  document.addEventListener('scroll', evt => {
                     if (window.scrollY === 0
                        && movie_player.classList.contains(PLAYER_SCROLL_LOCK_CLASS_NAME)
                     ) {
                        movie_player.classList.remove(PLAYER_SCROLL_LOCK_CLASS_NAME);
                     }
                  });
               }
            }
         });
   },
   options: {
      player_full_viewport_mode: {
         _tagName: 'select',
         label: 'Mode',
         'label:zh': '模式',
         'label:ja': 'モード',
         'label:ko': '방법',
         'label:es': 'Modo',
         'label:pt': 'Modo',
         'label:it': 'Modalità',
         'label:de': 'Modus',
         'label:pl': 'Tryb',
         'label:ua': 'Режим',
         options: [
            {
               label: 'default', selected: true,
               'label:ua': 'за замовчуванням',
            },
            {
               label: 'cinema', value: 'cinema_mode',
               'label:ua': 'кінотеатр',
            },
            {
               label: 'full-viewport (auto)', value: 'smart',
               'label:ua': 'повноекранний (авто)',
            },
            {
               label: 'full-viewport', value: 'force',
               'label:ua': 'повноекранний',
            },
            {
               label: 'redirect to embedded', value: 'redirect_watch_to_embed',
               'label:ua': 'передавати на вбудований',
            },
         ],
      },
      player_full_viewport_mode_exit: {
         _tagName: 'input',
         label: 'Full-viewport exit if video ends/pause',
         'label:zh': '视频结束/暂停时退出',
         'label:ja': 'ビデオが終了/一時停止したら終了します',
         'label:ko': '동영상이 종료/일시 중지되면 종료',
         'label:id': 'Keluar dari viewport penuh jika video berakhir/jeda',
         'label:es': 'Salir si el video termina/pausa',
         'label:pt': 'Sair se o vídeo terminar/pausar',
         'label:fr': 'Quitter si la vidéo se termine/pause',
         'label:it': 'Uscita dalla visualizzazione completa se il video termina/mette in pausa',
         'label:de': 'Beenden, wenn das Video endet/pausiert',
         'label:pl': 'Wyjdź, gdy film się kończy/pauzuje',
         'label:ua': 'Вихід із повного вікна перегляду, якщо відео закінчується/призупиняється',
         type: 'checkbox',
         'data-dependent': { 'player_full_viewport_mode': ['force', 'smart'] },
      },
      player_full_viewport_mode_exclude_shorts: {
         _tagName: 'input',
         label: 'Full-viewport exclude shorts',
         'label:zh': '全视口不包括短裤',
         'label:ja': 'フルビューポートはショートパンツを除外します',
         'label:ko': '전체 뷰포트 제외 반바지',
         'label:id': 'Area pandang penuh tidak termasuk celana pendek',
         'label:es': 'Vista completa excluir pantalones cortos',
         'label:pt': 'Shorts de exclusão da janela de visualização completa',
         'label:fr': 'La fenêtre complète exclut les shorts',
         'label:it': 'La visualizzazione completa esclude i cortometraggi',
         'label:de': 'Vollbildansicht schließt Shorts aus',
         'label:pl': 'Pełny ekran wyklucza krótkie filmy',
         'label:ua': 'Повне вікно перегляду без прев`ю',
         type: 'checkbox',
         'data-dependent': { 'player_full_viewport_mode': 'smart' },
      },
      cinema_mode_opacity: {
         _tagName: 'input',
         label: 'Opacity',
         'label:zh': '不透明度',
         'label:ja': '不透明度',
         'label:ko': '불투명',
         'label:id': 'Kegelapan',
         'label:es': 'Opacidad',
         'label:pt': 'Opacidade',
         'label:fr': 'Opacité',
         'label:it': 'Opacità',
         'label:de': 'Opazität',
         'label:pl': 'Przezroczystość',
         'label:ua': 'Прозорість',
         type: 'number',
         title: '0-1',
         placeholder: '0-1',
         step: .05,
         min: 0,
         max: 1,
         value: .75,
         'data-dependent': { 'player_full_viewport_mode': 'cinema_mode' },
      },
      theater_mode_ignore_playlist: {
         _tagName: 'select',
         label: 'Ignore playlist',
         options: [
            {
               label: 'false', selected: true,
            },
            {
               label: 'all', value: 'all',
            },
            {
               label: 'only music', value: 'music',
            },
         ],
      },
   }
});
window.nova_plugins.push({
   id: 'page-title-time',
   title: 'Show time in tab title',
   'title:zh': '在标签标题中显示时间',
   'title:ja': 'タブタイトルに時間を表示する',
   'title:ko': '탭 제목에 시간 표시',
   'title:id': 'Tampilkan waktu di judul tab',
   'title:es': 'Mostrar la hora en el título de la pestaña',
   'title:pt': 'Mostrar tempo no título da guia',
   'title:fr': "Afficher l'heure dans le titre de l'onglet",
   'title:it': "Mostra l'ora nel titolo della scheda",
   'title:de': 'Zeit im Tab-Titel anzeigen',
   'title:pl': 'Pokaż czas w tytule karty',
   'title:ua': 'Відображення часу в заголовку вкладки',
   run_on_pages: 'watch',
   section: 'player',
   _runtime: user_settings => {
      NOVA.waitSelector('video')
         .then(video => {
            document.addEventListener('yt-navigate-start', () => pageTitle.backup = null);
            video.addEventListener('playing', pageTitle.save.bind(pageTitle));
            video.addEventListener('timeupdate', () => pageTitle.update(video));
            video.addEventListener('pause', () => pageTitle.restore(video));
            video.addEventListener('ended', () => pageTitle.restore(video));
         });
      const pageTitle = {
         strSplit: ' | ',
         saveCheck() {
            return (result = (this.backup || document.title).includes(this.strSplit))
               ? new RegExp(`^((\\d?\\d:){1,2}\\d{2})(${this.strSplit.replace('|', '\\|')})`, '')
                  .test(document.title)
               : result;
         },
         save() {
            if (this.backup
               || movie_player.getVideoData().isLive
               || movie_player.classList.contains('ad-showing')
               || this.saveCheck()
            ) {
               return;
            }
            this.backup = movie_player.getVideoData().title;
         },
         update(video = NOVA.videoElement) {
            if (!this.backup) return;
            let newTitleArr = [];
            switch (movie_player.getVideoData().isLive ? 'current' : user_settings.page_title_time_mode) {
               case 'current':
                  newTitleArr = [video.currentTime];
                  break;
               case 'current-duration':
                  if (!isNaN(video.duration)) {
                     newTitleArr = [video.currentTime, ' / ', video.duration];
                  }
                  break;
               default:
                  if (!isNaN(video.duration)) {
                     newTitleArr = [video.duration - video.currentTime];
                  }
            }
            newTitleArr = newTitleArr
               .map(t => (typeof t === 'string') ? t : NOVA.timeFormatTo.HMS.digit(t / video.playbackRate))
               .join('');
            this.set([newTitleArr, this.backup]);
         },
         restore(video = NOVA.videoElement) {
            if (!this.backup) return;
            this.set([movie_player.getVideoData().isLive && video.currentTime, this.backup]);
         },
         set(arr) {
            document.title = arr
               .filter(Boolean)
               .join(this.strSplit);
         },
      };
   },
   options: {
      page_title_time_mode: {
         _tagName: 'select',
         label: 'Mode',
         'label:zh': '模式',
         'label:ja': 'モード',
         'label:ko': '방법',
         'label:es': 'Modo',
         'label:pt': 'Modo',
         'label:it': 'Modalità',
         'label:de': 'Modus',
         'label:pl': 'Tryb',
         'label:ua': 'Режим',
         options: [
            {
               label: 'left', value: 'left', selected: true,
               'label:zh': '剩下',
               'label:ja': '左',
               'label:ko': '왼쪽',
               'label:id': 'tetap',
               'label:es': 'izquierda',
               'label:pt': 'deixou',
               'label:fr': 'à gauche',
               'label:it': 'è rimasta',
               'label:de': 'links',
               'label:pl': 'pozostało',
               'label:ua': 'лишилось',
            },
            {
               label: 'current/duration', value: 'current-duration',
               'label:zh': '现在/期间',
               'label:ja': '現在/期間',
               'label:ko': '현재/기간',
               'label:id': 'saat ini/durasi',
               'label:es': 'actual/duración',
               'label:pt': 'atual/duração',
               'label:fr': 'courant/durée',
               'label:it': 'corrente/durata',
               'label:de': 'strom/dauer',
               'label:pl': 'bieżący czas',
               'label:ua': 'поточний/тривалість',
            },
         ],
      },
   }
});
window.nova_plugins.push({
   id: 'player-progress-bar-color',
   title: 'Player progress bar color',
   'title:ua': 'Колір індикатора прогресу програвача',
   run_on_pages: 'watch, embed, -mobile',
   section: 'player',
   _runtime: user_settings => {
      NOVA.css.push(
         `.ytp-swatch-background-color {
            background-color: ${user_settings.player_progress_bar_color || '#f00'} !important;
         }`);
   },
   options: {
      player_progress_bar_color: {
         _tagName: 'input',
         type: 'color',
         value: '#0089ff',
         label: 'Color',
         'label:zh': '颜色',
         'label:ja': '色',
         'label:ko': '색깔',
         'label:id': 'Warna',
         'label:pt': 'Cor',
         'label:fr': 'Couleur',
         'label:it': 'Colore',
         'label:de': 'Farbe',
         'label:pl': 'Kolor',
         'label:ua': 'Колір',
      },
   }
});
window.nova_plugins.push({
   id: 'embed-popup',
   title: 'Redirect embedded to popup',
   'title:zh': '将嵌入式视频重定向到弹出窗口',
   'title:ja': '埋め込まれたビデオをポップアップにリダイレクトします',
   'title:ko': '포함된 비디오를 팝업으로 리디렉션',
   'title:id': '포함된 비디오를 팝업으로 리디렉션',
   'title:es': 'Redirigir video incrustado a ventana emergente',
   'title:pt': 'Redirecionar vídeo incorporado para pop-up',
   'title:fr': 'Rediriger la vidéo intégrée vers une fenêtre contextuelle',
   'title:it': 'Reindirizza il video incorporato al popup',
   'title:de': 'Leiten Sie eingebettete Videos zum Popup um',
   'title:pl': 'Przekieruj osadzone wideo do wyskakującego okienka',
   'title:ua': 'Переспрямувати вбудоване відео у спливаюче вікно',
   run_on_pages: 'embed, -mobile',
   section: 'player',
   _runtime: user_settings => {
      if (window.top === window.self) return;
      if (NOVA.queryURL.has('popup')) return;
      if (user_settings.player_full_viewport_mode == 'redirect_watch_to_embed') return;
      NOVA.waitSelector('#movie_player video')
         .then(video => {
            video.addEventListener('loadeddata', createPopup.bind(video));
         });
      function createPopup() {
         movie_player.stopVideo();
         const { width, height } = NOVA.aspectRatio.sizeToFit({
            'srcWidth': this.videoWidth,
            'srcHeight': this.videoHeight,
            'maxWidth': screen.width / (+user_settings.player_buttons_custom_popup_width || 4),
         });
         const url = new URL(
            document.querySelector('link[itemprop="embedUrl"][href]')?.href
            || (location.origin + '/embed/' + movie_player.getVideoData().video_id)
         );
         url.searchParams.set('autoplay', 1);
         url.searchParams.set('popup', true);
         openPopup({ 'url': url.href, 'title': document.title, 'width': width, 'height': height });
         function openPopup({ url, title, width, height }) {
            const left = (screen.width / 2) - (width / 2);
            const top = (screen.height / 2) - (height / 2);
            const newWindow = window.open(url, '_blank', `popup=1,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes,copyhistory=no,width=${width},height=${height},top=${top},left=${left}`);
            newWindow.document.title = title;
         }
      }
   },
});
window.nova_plugins.push({
   id: 'sponsor-block',
   title: 'SponsorBlock',
   run_on_pages: 'watch, embed',
   section: 'player',
   _runtime: user_settings => {
      NOVA.waitSelector('#movie_player video')
         .then(video => {
            let segmentsList = [];
            let muteState;
            video.addEventListener('loadeddata', init.bind(video));
            async function init() {
               const videoId = movie_player.getVideoData().video_id || NOVA.queryURL.get('v');
               segmentsList = await getSkipSegments(videoId) || [];
               if (user_settings['player-float-progress-bar'] && segmentsList.length) {
                  const SELECTOR = 'nova-player-float-progress-bar-chapters';
                  let el;
                  await NOVA.waitUntil(() =>
                     (el = document.body.querySelectorAll(`#${SELECTOR} > span[time]`)) && el.length
                     , 1000);
                  el.forEach(chapterEl => {
                     const sec = NOVA.timeFormatTo.hmsToSec(chapterEl.getAttribute('time'));
                     for (const [i, value] of segmentsList.entries()) {
                        const [start, end, category] = value;
                        if (sec >= (~~start - 5) && sec <= (Math.ceil(end) + 5)) {
                           chapterEl.style.title = category;
                           let color;
                           switch (category) {
                              case 'sponsor': color = 'rgb(255,231,0,.3)'; break;
                              case 'interaction': color = 'rgb(255,127,80,.3)'; break;
                              case 'selfpromo': color = 'rgb(255,99,71,.3)'; break;
                              case 'intro': color = 'rgb(255,165,0,.3)'; break;
                              case 'outro': color = 'rgb(255,165,0,.3)'; break;
                           }
                           chapterEl.style.background = color;
                        }
                     }
                  });
               }
            }
            video.addEventListener('timeupdate', function () {
               let start, end, category;
               for (let i = 0; i < segmentsList.length; i++) {
                  [start, end, category] = segmentsList[i];
                  start = ~~start;
                  end = Math.ceil(end);
                  const inSegment = (this.currentTime > start && this.currentTime < end);
                  switch (user_settings.sponsor_block_action) {
                     case 'mute':
                        if (inSegment && !muteState && !this.muted) {
                           muteState = true;
                           movie_player.mute(true);
                           return novaNotification('muted');
                        }
                        else if (!inSegment && muteState && this.muted) {
                           muteState = false;
                           movie_player.unMute();
                           segmentsList.splice(i, 1);
                           return novaNotification('unMuted');
                        }
                        break;
                     case 'skip':
                        if (inSegment) {
                           this.currentTime = end;
                           segmentsList.splice(i, 1);
                           return novaNotification('skipped');
                        }
                        break;
                  }
               }
               function novaNotification(prefix = '') {
                  const msg = `${prefix} [${category}] • ${NOVA.timeFormatTo.HMS.digit(start)} - ${NOVA.timeFormatTo.HMS.digit(end)}`;
                  console.info(msg);
                  NOVA.bezelTrigger(msg);
               }
            });
         });
      async function getSkipSegments(videoId = required()) {
         const CACHE_PREFIX = 'nova-videos-sponsor-block:';
         if (storage = sessionStorage.getItem(CACHE_PREFIX + videoId)) {
            return JSON.parse(storage);
         }
         else {
            const
               actionTypes = (Array.isArray(user_settings.sponsor_block_action)
                  ? user_settings.sponsor_block_action : [user_settings.sponsor_block_action])
                  || ['skip', 'mute'],
               categories = user_settings.sponsor_block_category || [
                  'sponsor',
                  'interaction',
                  'selfpromo',
                  'intro',
                  'outro',
               ],
               params = {
                  'videoID': videoId,
                  'actionTypes': JSON.stringify(actionTypes),
                  'categories': JSON.stringify(categories),
               },
               query = Object.keys(params)
                  .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                  .join('&');
            const fetchAPI = () => fetch((user_settings.sponsor_block_url || 'https://sponsor.ajay.app')
               + `/api/skipSegments?${query}`,
               {
                  method: 'GET',
                  headers: { 'Content-Type': 'application/json' }
               }
            )
               .then(response => response.json())
               .then(json => json
                  .map(a => [...a.segment, a.category])
               )
               .catch(error => {
               });
            if (result = await fetchAPI()) {
               sessionStorage.setItem(CACHE_PREFIX + videoId, JSON.stringify(result));
               return result;
            }
         }
      }
   },
   options: {
      sponsor_block_category: {
         _tagName: 'select',
         label: 'Category',
         title: '[Ctrl+Click] to select several',
         'title:zh': '[Ctrl+Click] 选择多个',
         'title:ja': '「Ctrl+Click」して、いくつかを選択します',
         'title:ko': '[Ctrl+Click] 여러 선택',
         'title:id': '[Ctrl+Klik] untuk memilih beberapa',
         'title:es': '[Ctrl+Click] para seleccionar varias',
         'title:pt': '[Ctrl+Click] para selecionar vários',
         'title:fr': '[Ctrl+Click] pour sélectionner plusieurs',
         'title:it': '[Ctrl+Clic] per selezionarne diversi',
         'title:de': '[Ctrl+Click] um mehrere auszuwählen',
         'title:pl': 'Ctrl+kliknięcie, aby zaznaczyć kilka',
         'title:ua': '[Ctrl+Click] щоб обрати декілька',
         multiple: null,
         required: true,
         size: 7,
         options: [
            {
               label: 'Sponsor', value: 'sponsor',
            },
            {
               label: 'Unpaid/Self Promotion', value: 'selfpromo',
            },
            {
               label: 'Reminder Subscribe', value: 'interaction',
            },
            {
               label: 'Intro', value: 'intro',
            },
            {
               label: 'Endcards/Credits (Outro)', value: 'outro',
            },
            {
               label: 'Preview/Recap', value: 'preview',
            },
            {
               label: 'Music: Non-Music Section', value: 'music_offtopic',
            },
            {
               label: 'Full Video Label Only', value: 'exclusive_access',
            },
         ],
      },
      sponsor_block_action: {
         _tagName: 'select',
         label: 'Mode',
         'label:zh': '模式',
         'label:ja': 'モード',
         'label:ko': '방법',
         'label:es': 'Modo',
         'label:pt': 'Modo',
         'label:it': 'Modalità',
         'label:de': 'Modus',
         'label:pl': 'Tryb',
         'label:ua': 'Режим',
         options: [
            {
               label: 'skip', value: 'skip', selected: true,
            },
            {
               label: 'mute', value: 'mute',
            },
         ],
      },
      sponsor_block_url: {
         _tagName: 'input',
         label: 'URL',
         type: 'url',
         pattern: "https://.*",
         placeholder: 'https://youtube.com/...',
         value: 'https://sponsor.ajay.app',
         required: true,
      },
   }
});
window.nova_plugins.push({
   id: 'player-live-duration',
   title: 'Show duration on live',
   'title:ua': 'Показувати тривалість трансляції',
   run_on_pages: 'watch, embed, -mobile',
   section: 'player',
   _runtime: user_settings => {
      NOVA.waitSelector('#movie_player video')
         .then(video => {
            video.addEventListener('canplay', function () {
               if (movie_player.getVideoData().isLive
                  && (el = document.body.querySelector('#movie_player .ytp-chrome-controls .ytp-live .ytp-time-current'))
               ) {
                  el.style = 'display: block !important; margin-right: 5px;';
               }
            });
            NOVA.css.push(
               `#movie_player .ytp-chrome-controls .ytp-time-display.ytp-live {
                  display: flex !important;
               }`);
         });
   },
});
window.nova_plugins.push({
   id: 'player-disable-fullscreen-scroll',
   title: 'Disable scrolling in Full Screen player',
   'title:zh': '禁用全屏滚动',
   'title:ja': 'フルスクリーンスクロールを無効にする',
   'title:ko': '전체 화면 스크롤 비활성화',
   'title:id': 'Nonaktifkan pengguliran pemain dalam mode layar penuh',
   'title:es': 'Desactivar el desplazamiento a pantalla completa',
   'title:pt': 'Desabilitar rolagem em tela cheia',
   'title:fr': 'Désactiver le défilement plein écran',
   'title:it': 'Disabilita lo scorrimento del lettore in modalità a schermo intero',
   'title:de': 'Deaktivieren Sie das Scrollen im Vollbildmodus',
   'title:pl': 'Wyłącz przewijanie w trybie pełnoekranowym',
   'title:ua': 'Вимкнути прокрутку у повноекранному режимі',
   run_on_pages: 'watch',
   section: 'player',
   _runtime: user_settings => {
      NOVA.css.push(`.ytp-fullerscreen-edu-button { display: none !important; }`);
      document.addEventListener('fullscreenchange', () => {
         document.fullscreenElement
            ? document.addEventListener('wheel', lockscroll, { passive: false })
            : document.removeEventListener('wheel', lockscroll)
      }
      );
      function lockscroll(evt) {
         evt.preventDefault();
      }
   },
});
window.nova_plugins.push({
   id: 'player-control-autohide',
   title: 'Hide player control panel if not hovered',
   'title:zh': '播放器上的自动隐藏控件',
   'title:ja': 'プレーヤーのコントロールを自動非表示',
   'title:ko': '플레이어의 자동 숨기기 컨트롤',
   'title:id': 'Sembunyikan kontrol pada pemutar',
   'title:es': 'Ocultar automáticamente los controles en el reproductor',
   'title:pt': 'Auto-ocultar controles no player',
   'title:fr': 'Masque le panneau de contrôle du lecteur',
   'title:it': 'Nascondi i controlli sul giocatore',
   'title:de': 'Blendet das Player-Bedienfeld aus',
   'title:pl': 'Ukrywaj elementy w odtwarzaczu',
   'title:ua': 'Приховати панель керування у відтворювачі',
   run_on_pages: 'watch, -mobile',
   section: 'player',
   desc: 'Hover controls to display it',
   'desc:zh': '将鼠标悬停在它上面以显示它',
   'desc:ja': 'カーソルを合わせると表示されます',
   'desc:ko': '그것을 표시하려면 그 위로 마우스를 가져갑니다',
   'desc:id': 'Arahkan kontrol untuk menampilkannya',
   'desc:es': 'Coloca el cursor sobre él para mostrarlo',
   'desc:pt': 'Passe o mouse sobre ele para exibi-lo',
   'desc:fr': "Survolez-le pour l'afficher",
   'desc:it': 'Passa il mouse sui controlli per visualizzarlo',
   'desc:de': 'Bewegen Sie den Mauszeiger darüber, um es anzuzeigen',
   'desc:pl': 'Najedź, aby wyświetlić',
   'desc:ua': 'Наведіть мишкою щоб показати',
   _runtime: user_settings => {
      if (user_settings['player-control-below']) return;
      let selectorHover, selectorGradientHide;
      switch (user_settings.player_control_autohide_container) {
         case 'player':
            selectorHover = 'ytd-watch-flexy:not([fullscreen]) #movie_player:hover .ytp-chrome-bottom';
            selectorGradientHide = '#movie_player:not(:hover) .ytp-gradient-bottom';
            elementOnHoverChangeState({
               'element': movie_player,
               'callback': function (hovered) {
                  if (hovered) this.mouseMoveIntervalId = fixControlFreeze();
                  else clearInterval(this.mouseMoveIntervalId);
               },
            });
            break;
         default:
            selectorHover = '.ytp-chrome-bottom:hover';
            selectorGradientHide = '#movie_player:has(.ytp-chrome-bottom:not(:hover)) .ytp-gradient-bottom';
            break;
      }
      NOVA.css.push(
         `.ytp-chrome-bottom {
            opacity: 0;
         }
         ${selectorHover} {
            opacity: 1;
         }
         
         ytd-watch-flexy:not([fullscreen]) #movie_player.ytp-autohide:hover #nova-player-float-progress-bar {
            visibility: hidden !important;
         }`);
      NOVA.css.push(
         `${selectorGradientHide} {
            opacity: 0;
         }`);
      function elementOnHoverChangeState({ element = required(), callback = required() }) {
         if (!(element instanceof HTMLElement)) return console.error('elementOnHoverChangeState:', typeof element);
         if (typeof callback !== 'function') return console.error('elementOnHoverChangeState:', typeof callback);
         const isHover = e => e.parentElement.querySelector(':hover') === e;
         document.addEventListener('mousemove', function checkHover() {
            const hovered = isHover(movie_player);
            if (hovered !== checkHover.hovered) {
               checkHover.hovered = hovered;
               return callback(hovered);
            }
         });
      }
      function fixControlFreeze(ms = 2000) {
         const moveMouse = new Event('mousemove');
         return window.setInterval(() => {
            if (NOVA.currentPage === 'watch'
               && document.visibilityState == 'visible'
               && movie_player.classList.contains('playing-mode')
               && !NOVA.isFullscreen()
            ) {
               movie_player.dispatchEvent(moveMouse);
            }
         }, ms);
      }
   },
   options: {
      player_control_autohide_container: {
         _tagName: 'select',
         label: 'Hover container',
         'label:ua': 'Відображати вміст при наведенні',
         options: [
            {
               label: 'player', value: 'player', selected: true,
               'label:ua': 'програвач',
            },
            {
               label: 'control', value: 'control',
               'label:ua': 'панель керування',
            },
         ],
      },
   }
});
window.nova_plugins.push({
   id: 'player-fullscreen-mode',
   title: 'Auto fullscreen on playback',
   'title:zh': '播放时自动全屏',
   'title:ja': '再生時に全画面表示',
   'title:ko': '재생 시 자동 전체 화면',
   'title:id': 'Layar penuh otomatis saat diputar',
   'title:es': 'Pantalla completa automática en reproducción',
   'title:pt': 'Tela cheia automática na reprodução',
   'title:fr': 'Plein écran automatique lors de la lecture',
   'title:it': 'Schermo intero automatico durante la riproduzione',
   'title:de': 'Automatischer Vollbildmodus bei Wiedergabe',
   'title:pl': 'Pełny ekran podczas odtwarzania',
   'title:ua': 'Автоматичне ввімкнення повного екрану при відтворенні',
   run_on_pages: 'watch, embed',
   section: 'player',
   _runtime: user_settings => {
      if (NOVA.currentPage == 'embed' && (window.self === window.top)) return;
      if (user_settings.player_fullscreen_mode_embed && NOVA.currentPage != 'embed') return;
      NOVA.css.push(
         `.ytp-popup:has(a[href="https://support.google.com/youtube/answer/6276924"]),
         #ytd-player .html5-video-player.ytp-fullscreen.playing-mode > .ytp-popup.ytp-generic-popup[role="alert"][style] {
            visibility: hidden !important;
         }`);
      NOVA.waitSelector('video')
         .then(video => {
            video.addEventListener('play', setFullscreen.bind(video), { capture: true, once: true });
            video.addEventListener('loaddata', setFullscreen.bind(video));
            video.addEventListener('ended', exitFullscreen);
            if (user_settings.player_fullscreen_mode_onpause) {
               video.addEventListener('pause', () => {
                  if (!document.body.querySelector('.ytp-progress-bar')?.contains(document.activeElement)) {
                     exitFullscreen();
                  }
               });
               video.addEventListener('play', setFullscreen.bind(video));
            }
         });
      function setFullscreen() {
         if (movie_player.classList.contains('ad-showing')) return;
         if (user_settings.player_fullscreen_mode_ignore_music && NOVA.isMusic()) return;
         if (user_settings.player_fullscreen_mode_ignore_playlist && (location.search.includes('list=')
         )) return;
         if (!document.fullscreenElement) {
            movie_player.requestFullscreen()
               .catch(error => console.warn('Fullscreen not allowed', error));
         }
      }
      function exitFullscreen() {
         document.fullscreenElement && document?.exitFullscreen();
      }
      if (NOVA.currentPage == 'embed') {
         NOVA.waitSelector('#movie_player .ytp-chrome-bottom .ytp-fullscreen-button[aria-disabled="true"]')
            .then(btn => btn.setAttribute('aria-disabled', false));
      }
   },
   options: {
      player_fullscreen_mode_embed: {
         _tagName: 'select',
         label: 'Apply to video type',
         'label:ua': 'Застосувати до відео',
         options: [
            {
               label: 'all', value: false, selected: true,
               'label:ua': 'всіх',
            },
            {
               label: 'embed', value: 'on',
               'label:ua': 'вбудованих',
            },
         ],
         title: 'Unavailable if emded fullscreen is not allow',
      },
      player_fullscreen_mode_onpause: {
         _tagName: 'input',
         label: 'Exit on video pause',
         'label:zh': '如果视频暂停，则退出全屏模式',
         'label:ja': 'ビデオが一時停止している場合は、全画面表示モードを終了します',
         'label:ko': '비디오가 일시 중지되면 전체 화면 모드 종료',
         'label:id': 'Keluar dari mode layar penuh jika video dijeda',
         'label:es': 'Salga del modo de pantalla completa si el video está en pausa',
         'label:pt': 'Saia do modo de tela cheia se o vídeo estiver pausado',
         'label:fr': 'Quitter le mode plein écran si la vidéo est en pause',
         'label:it': 'Uscire dalla modalità a schermo intero se il video è in pausa',
         'label:de': 'Beenden Sie den Vollbildmodus, wenn das Video angehalten ist',
         'label:pl': 'Wyjdź z trybu pełnoekranowego, jeśli wideo jest wstrzymane',
         'label:ua': 'Вихід з повного екрану зупиняє відео',
         type: 'checkbox',
      },
      player_fullscreen_mode_ignore_playlist: {
         _tagName: 'input',
         label: 'Ignore playlist',
         'label:zh': '忽略播放列表',
         'label:ja': 'プレイリストを無視する',
         'label:ko': '재생목록 무시',
         'label:id': 'Abaikan daftar putar',
         'label:es': 'Ignorar lista de reproducción',
         'label:pt': 'Ignorar lista de reprodução',
         'label:fr': 'Ignorer la liste de lecture',
         'label:it': 'Ignora playlist',
         'label:de': 'Wiedergabeliste ignorieren',
         'label:pl': 'Zignoruj listę odtwarzania',
         'label:ua': 'Ігнорувати список відтворення',
         type: 'checkbox',
      },
      player_fullscreen_mode_ignore_music: {
         _tagName: 'input',
         label: 'Ignore music',
         'label:zh': '忽略音乐',
         'label:ja': '音楽を無視',
         'label:ko': '음악 무시',
         'label:id': 'Abaikan musik',
         'label:es': 'ignorar la musica',
         'label:pt': 'Ignorar música',
         'label:fr': 'Ignorer la musique',
         'label:it': 'Ignora la musica',
         'label:de': 'Musik ignorieren',
         'label:pl': 'Ignoruj ​​muzykę',
         'label:ua': 'Ігноруйте музику',
         type: 'checkbox',
      },
   }
});
window.nova_plugins.push({
   id: 'video-unblock-warn-content',
   title: 'Skip warn about inappropriate or offensive content',
   'title:ua': 'Пропустити попередження про неприйнятний або образливий вміст',
   run_on_pages: 'watch, embed, -mobile',
   section: 'player',
   desc: "skip 'The following content may contain suicide or self-harm topics.'",
   'desc:ua': 'пропустити "Наступний контент може містити теми суїциду або самоушкодження".',
   _runtime: user_settings => {
      NOVA.waitSelector('ytd-watch-flexy[player-unavailable] yt-player-error-message-renderer #button.yt-player-error-message-renderer button', { stop_on_page_change: true })
         .then(btn => btn.click());
   },
});
window.nova_plugins.push({
   id: 'save-channel-state',
   title: 'Add button Save for specific channel',
   'title:zh': '특정 채널에 저장',
   'title:ja': '特定のチャンネル用に保存',
   'title:ko': '특정 채널에 저장',
   'title:id': 'Simpan untuk saluran tertentu',
   'title:es': 'Guardar para un canal específico',
   'title:pt': 'Salvar para canal específico',
   'title:fr': 'Enregistrer pour un canal spécifique',
   'title:it': 'Salva per canale specifico',
   'title:de': 'Speichern Sie für einen bestimmten Kanal',
   'title:pl': 'Zapisz dla określonego kanału',
   'title:ua': 'Зберегти для конкретного каналу',
   run_on_pages: 'watch, embed',
   section: 'player',
   _runtime: user_settings => {
      const
         SELECTOR_BUTTON_ID = 'nova-channels-state',
         SELECTOR_BUTTON = '#' + SELECTOR_BUTTON_ID,
         SELECTOR_BUTTON_CLASS_NAME = 'nova-right-custom-button',
         SELECTOR_BUTTON_LIST_ID = SELECTOR_BUTTON_CLASS_NAME + '-list',
         SELECTOR_BUTTON_LIST = '#' + SELECTOR_BUTTON_LIST_ID,
         SELECTOR_BUTTON_TITLE_ID = SELECTOR_BUTTON_CLASS_NAME + '-title';
      NOVA.waitSelector('#movie_player .ytp-right-controls')
         .then(container => {
            initStyles();
            NOVA.runOnPageInitOrTransition(async () => {
               if (NOVA.currentPage == 'watch' || NOVA.currentPage == 'embed') {
                  await NOVA.storage_obj_manager.initStorage();
                  if (btn = document.getElementById(SELECTOR_BUTTON_ID)) {
                     btn.append(genList());
                  }
                  else {
                     const btn = document.createElement('button');
                     btn.id = SELECTOR_BUTTON_ID;
                     btn.className = `ytp-button ${SELECTOR_BUTTON_CLASS_NAME}`;
                     btn.title = 'Save channel state';
                     const btnTitle = document.createElement('span');
                     btnTitle.id = SELECTOR_BUTTON_TITLE_ID;
                     btnTitle.style.display = 'flex';
                     btnTitle.innerHTML =
                        `<svg width="100%" height="100%" viewBox="-140 -140 500 500">
                           <g fill="currentColor">
                              <path d="M198.5,0h-17v83h-132V0h-49v231h230V32.668L198.5,0z M197.5,199h-165v-83h165V199z" />
                              <rect width="33" x="131.5" height="66" />
                           </g>
                        </svg>`;
                     btn.prepend(btnTitle);
                     btn.append(genList());
                     container.prepend(btn);
                  }
                  btnTitleStateUpdate(Boolean(NOVA.storage_obj_manager.read()));
               }
            });
         });
      function btnTitleStateUpdate(state) {
         document.getElementById(SELECTOR_BUTTON_TITLE_ID)
            .style.setProperty('opacity', state ? 1 : .3);
      }
      function genList() {
         const ul = document.createElement('ul');
         ul.id = SELECTOR_BUTTON_LIST_ID;
         let listItem = [];
         if (user_settings['video-quality']) {
            listItem.push({ name: 'quality', getSaveDataFn: movie_player.getPlaybackQuality });
         }
         if (user_settings['rate-wheel']) {
            listItem.push({ name: 'speed', getSaveDataFn: movie_player.getPlaybackRate });
         }
         if (user_settings['volume-wheel']) {
            listItem.push({ name: 'volume', getSaveDataFn: () => ~~(movie_player.getVolume()) });
         }
         listItem.push({
            name: 'subtitles',
            getSaveDataFn: () => {
               movie_player.toggleSubtitlesOn();
               return true;
            },
            customInit: () => {
               NOVA.waitUntil(() => {
                  movie_player.toggleSubtitlesOn();
                  return document.body.querySelector('.ytp-caption-window-top[id^="caption-window"]');
               }, 500);
            },
         });
         if (user_settings['player-resume-playback']) {
            listItem.push({ name: 'ignore-playback', label: 'unsave playback time', getSaveDataFn: () => true });
         }
         listItem.forEach(async element => {
            const storage = NOVA.storage_obj_manager._getParam(element.name);
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `checkbox-${element.name}`;
            checkbox.checked = Boolean(storage);
            checkbox.className = 'ytp-menuitem-toggle-checkbox';
            const li = document.createElement('li');
            li.innerHTML =
               `<label for="checkbox-${element.name}">
                  ${element.label || element.name} <span>${storage || ''}</span>
               </label>`;
            li.title = storage ? `Currently stored value ${storage}` : 'none';
            if (Boolean(storage) && element.hasOwnProperty('customInit') && typeof element.customInit === 'function') {
               element.customInit();
            }
            checkbox.addEventListener('change', () => {
               let state;
               if (checkbox.checked && (state = element.getSaveDataFn())) {
                  NOVA.storage_obj_manager.save({ [element.name]: state });
               }
               else {
                  NOVA.storage_obj_manager.remove(element.name);
               }
               li.title = state ? `Currently stored value ${state}` : 'none';
               li.querySelector('span').textContent = state || '';
               btnTitleStateUpdate(Boolean(state));
            });
            li.prepend(checkbox);
            ul.append(li);
         });
         if (user_settings['time-jump']) {
            const
               SLIDER_LABEL = 'skip into',
               SLIDER_STORAGE_NAME = 'skip-into',
               storage = +NOVA.storage_obj_manager._getParam(SLIDER_STORAGE_NAME);
            const slider = document.createElement('input');
            slider.type = 'range';
            slider.min = 0;
            slider.max = 120;
            slider.step = 1;
            slider.value = storage || 0;
            const li = document.createElement('li');
            li.innerHTML =
               `<label for="checkbox-${SLIDER_STORAGE_NAME}">
                  ${SLIDER_LABEL} <span>${storage || ''}</span>
               </label>`;
            li.title = 'Simple alternative SponsorBlock';
            slider.addEventListener('change', sliderChange);
            slider.addEventListener('input', sliderChange);
            slider.addEventListener('wheel', evt => {
               evt.preventDefault();
               evt.target.value = +evt.target.value + Math.sign(evt.wheelDelta);
               sliderChange(evt);
            });
            li.prepend(slider);
            ul.append(li);
            function sliderChange({ target }) {
               if (state = +target.value) {
                  NOVA.storage_obj_manager.save({ [SLIDER_STORAGE_NAME]: +target.value });
               }
               else {
                  NOVA.storage_obj_manager.remove(SLIDER_STORAGE_NAME);
               }
               li.title = state ? `Currently stored value ${state}` : 'none';
               li.querySelector('span').textContent = state || '';
               btnTitleStateUpdate(Boolean(state));
            }
         }
         return ul;
      }
      function initStyles() {
         NOVA.css.push(
            SELECTOR_BUTTON + ` {
               overflow: visible !important;
               position: relative;
               text-align: center !important;
               vertical-align: top;
               font-weight: bold;
            }
            .ytp-left-controls {
               overflow: visible !important;
            }
            ${SELECTOR_BUTTON_LIST} {
               position: absolute;
               bottom: 2.5em !important;
               left: -2.2em;
               list-style: none;
               padding-bottom: 1.5em !important;
               z-index: ${+NOVA.css.getValue('.ytp-progress-bar', 'z-index') + 1};
            }
            
            html[data-cast-api-enabled] ${SELECTOR_BUTTON_LIST} {
               margin: 0;
               padding: 0;
               bottom: 3.3em;
               
            }
            ${SELECTOR_BUTTON}:not(:hover) ${SELECTOR_BUTTON_LIST} {
               display: none;
            }
            ${SELECTOR_BUTTON_LIST} li {
               cursor: pointer;
               white-space: nowrap;
               line-height: 1.4;
               background: rgba(28, 28, 28, 0.9);
               margin: .3em 0;
               padding: .5em 1em;
               border-radius: .3em;
               color: #fff;
               text-align: left !important;
               display: grid;
               grid-template-columns: auto auto;
               align-items: center;
               justify-content: start;
            }
            ${SELECTOR_BUTTON_LIST} li label {
               cursor: pointer;
               padding-left: 5px;
            }
            ${SELECTOR_BUTTON_LIST} li.active { background: #720000; }
            ${SELECTOR_BUTTON_LIST} li.disable { color: #666; }
            ${SELECTOR_BUTTON_LIST} li:not(:hover) { opacity: .8; }
            
            ${SELECTOR_BUTTON_LIST} li span:not(:empty):before { content: '('; }
            ${SELECTOR_BUTTON_LIST} li span:not(:empty):after { content: ')'; }
            
            ${SELECTOR_BUTTON_LIST} [type="checkbox"] {
               appearance: none;
               outline: none;
               cursor: pointer;
            }
            ${SELECTOR_BUTTON_LIST} [type="checkbox"]:checked {
               background: #f00;
            }
            ${SELECTOR_BUTTON_LIST} [type="checkbox"]:checked:after {
               left: 20px;
               background-color: #fff;
            }`);
      }
   },
});
window.nova_plugins.push({
   id: 'time-remaining',
   title: 'Remaining time',
   'title:zh': '剩余时间',
   'title:ja': '余日',
   'title:ko': '남은 시간',
   'title:id': 'Waktu yang tersisa',
   'title:es': 'Tiempo restante',
   'title:pt': 'Tempo restante',
   'title:fr': 'Temps restant',
   'title:it': 'Tempo rimanente',
   'title:de': 'Verbleibende Zeit',
   'title:pl': 'Pozostały czas',
   'title:ua': 'Час, що залишився',
   run_on_pages: 'watch, embed, -mobile',
   section: 'player',
   desc: 'Remaining time until the end of the video',
   'desc:zh': '距离视频结束的剩余时间',
   'desc:ja': 'ビデオの終わりまでの残り時間',
   'desc:ko': '영상 끝까지 남은 시간',
   'desc:id': 'Sisa waktu sampai akhir video',
   'desc:es': 'Tiempo restante hasta el final del video',
   'desc:pt': 'Tempo restante até o final do vídeo',
   'desc:fr': "Temps restant jusqu'à la fin de la vidéo",
   'desc:it': 'Tempo rimanente fino alla fine del video',
   'desc:de': 'Verbleibende Zeit bis zum Ende des Videos',
   'desc:pl': 'Czas pozostały do końca filmu',
   'desc:ua': 'Час, що залишився до кінця відео',
   _runtime: user_settings => {
      const SELECTOR_ID = 'nova-player-time-remaining';
      NOVA.waitSelector('.ytp-time-duration, ytm-time-display .time-display-content')
         .then(container => {
            NOVA.waitSelector('video')
               .then(video => {
                  video.addEventListener('timeupdate', setRemaining.bind(video));
                  video.addEventListener('ratechange', setRemaining.bind(video));
                  video.addEventListener('ended', () => insertToHTML({ 'container': container }));
                  document.addEventListener('yt-navigate-finish', () => insertToHTML({ 'container': container }));
               });
            function setRemaining() {
               if (isNaN(this.duration)
                  || movie_player.getVideoData().isLive
                  || (NOVA.currentPage == 'embed' && window.self.location.href.includes('live_stream'))
                  || document.visibilityState == 'hidden'
                  || movie_player.classList.contains('ytp-autohide')
               ) return;
               const
                  getProgressPt = () => {
                     const floatRound = pt => (this.duration > 3600) ? pt.toFixed(2)
                        : (this.duration > 1500) ? pt.toFixed(1)
                           : Math.round(pt);
                     return floatRound((this.currentTime / this.duration) * 100) + '%';
                  },
                  getLeftTime = () => '-' + NOVA.timeFormatTo.HMS.digit((this.duration - this.currentTime) / this.playbackRate);
               let text;
               switch (user_settings.time_remaining_mode) {
                  case 'pt': text = ' • ' + getProgressPt(); break;
                  case 'time': text = getLeftTime(); break;
                  default:
                     text = getLeftTime();
                     text += text && ` (${getProgressPt()})`;
               }
               if (text) {
                  insertToHTML({ 'text': text, 'container': container });
               }
            }
            function insertToHTML({ text = '', container = required() }) {
               if (!(container instanceof HTMLElement)) return console.error('container not HTMLElement:', container);
               (document.getElementById(SELECTOR_ID) || (function () {
                  container.insertAdjacentHTML('afterend', `&nbsp;<span id="${SELECTOR_ID}">${text}</span>`);
                  return document.getElementById(SELECTOR_ID);
               })())
                  .textContent = text;
            }
         });
   },
   options: {
      time_remaining_mode: {
         _tagName: 'select',
         label: 'Mode',
         'label:zh': '模式',
         'label:ja': 'モード',
         'label:ko': '방법',
         'label:es': 'Modo',
         'label:pt': 'Modo',
         'label:it': 'Modalità',
         'label:de': 'Modus',
         'label:pl': 'Tryb',
         'label:ua': 'Режим',
         options: [
            {
               label: 'time+(%)', value: 'full',
               'label:ua': 'час+(%)',
            },
            {
               label: 'time', value: 'time', selected: true,
               'label:ua': 'час',
            },
            {
               label: '%', value: 'pt',
            },
         ],
      },
   }
});
window.nova_plugins.push({
   id: 'player-float-progress-bar',
   title: 'Float player progress bar',
   'title:zh': '浮动播放器进度条',
   'title:ja': 'フロートプレーヤーのプログレスバー',
   'title:ko': '플로팅 플레이어 진행률 표시줄',
   'title:id': 'Bilah kemajuan pemain mengambang',
   'title:es': 'Barra de progreso flotante del jugador',
   'title:pt': 'Barra de progresso do jogador flutuante',
   'title:fr': 'Barre de progression du joueur flottant',
   'title:it': 'Barra di avanzamento del giocatore mobile',
   'title:de': 'Float-Player-Fortschrittsbalken',
   'title:pl': 'Pływający pasek postępu odtwarzacza',
   'title:ua': 'Плаваючий індикатор прогресу відтворення',
   run_on_pages: 'watch, embed, -mobile',
   section: 'player',
   _runtime: user_settings => {
      if (NOVA.currentPage == 'embed' && window.self.location.href.includes('live_stream')
      ) return;
      if (NOVA.currentPage == 'embed' && ['0', 'false'].includes(NOVA.queryURL.get('controls'))) return;
      const
         SELECTOR_ID = 'nova-player-float-progress-bar',
         SELECTOR = '#' + SELECTOR_ID,
         CHAPTERS_MARK_WIDTH_PX = '2px';
      NOVA.waitSelector('#movie_player.ytp-autohide video')
         .then(video => {
            const
               container = insertFloatBar(Math.max(
                  NOVA.css.getValue('.ytp-chrome-bottom', 'z-index'), 59
               ) + 1),
               bufferEl = document.getElementById(`${SELECTOR_ID}-buffer`),
               progressEl = document.getElementById(`${SELECTOR_ID}-progress`);
            renderChapters.init(video);
            video.addEventListener('loadeddata', resetBar);
            video.addEventListener('timeupdate', function () {
               if (notInteractiveToRender()) return;
               if (!isNaN(this.duration)) {
                  progressEl.style.transform = `scaleX(${this.currentTime / this.duration})`;
               }
            });
            video.addEventListener('progress', renderBuffer.bind(video));
            video.addEventListener('seeking', renderBuffer.bind(video));
            function renderBuffer() {
               if (notInteractiveToRender()) return;
               if ((totalDuration = movie_player.getDuration()) && !isNaN(totalDuration)) {
                  bufferEl.style.transform = `scaleX(${movie_player.getVideoLoadedFraction()})`;
               }
            }
            function resetBar() {
               container.style.display = movie_player.getVideoData().isLive ? 'none' : 'initial';
               container.classList.remove('transition');
               bufferEl.style.transform = 'scaleX(0)';
               progressEl.style.transform = 'scaleX(0)';
               container.classList.add('transition');
               renderChapters.init(video);
            }
            function notInteractiveToRender() {
               return (document.visibilityState == 'hidden'
                  || movie_player.getVideoData().isLive
               );
            }
         });
      function insertFloatBar(z_index = 60) {
         return document.getElementById(SELECTOR_ID) || (function () {
            movie_player.insertAdjacentHTML('beforeend',
               `<div id="${SELECTOR_ID}" class="transition">
                  <div class="container">
                     <div id="${SELECTOR_ID}-buffer" class="ytp-load-progress"></div>
                     <div id="${SELECTOR_ID}-progress" class="ytp-swatch-background-color"></div>
                  </div>
                  <div id="${SELECTOR_ID}-chapters"></div>
               </div>`);
            NOVA.css.push(
               `[id|=${SELECTOR_ID}] {
                  position: absolute;
                  bottom: 0;
               }
               ${SELECTOR} {
                  --opacity: ${+user_settings.player_float_progress_bar_opacity || .7};
                  --height: ${+user_settings.player_float_progress_bar_height || 3}px;
                  --bg-color: ${NOVA.css.getValue('.ytp-progress-list', 'background-color') || 'rgba(255,255,255,.2)'};
                  --zindex: ${z_index};
                  opacity: var(--opacity);
                  z-index: var(--zindex);
                  background-color: var(--bg-color);
                  width: 100%;
                  visibility: hidden;
               }
               
               #movie_player.ytp-autohide ${SELECTOR} {
                  visibility: visible;
               }
               
               ${SELECTOR}.transition [id|=${SELECTOR_ID}] {
                  transition: transform .2s linear;
               }
               ${SELECTOR}-progress, ${SELECTOR}-buffer {
                  width: 100%;
                  height: var(--height);
                  transform-origin: 0 0;
                  transform: scaleX(0);
               }
               ${SELECTOR}-progress {
                  z-index: calc(var(--zindex) + 1);
               }
               
               ${SELECTOR}-chapters {
                  position: relative;
                  width: 100%;
                  display: flex;
                  justify-content: flex-end;
               }
               ${SELECTOR}-chapters span {
                  height: var(--height);
                  z-index: calc(var(--zindex) + 1);
                  box-sizing: border-box;
                  padding: 0;
                  margin: 0;
               }
               ${SELECTOR}-chapters span:not(:first-child) {
                  
                  border-left: ${CHAPTERS_MARK_WIDTH_PX} solid rgba(255,255,255,.7);
               }`);
            return document.getElementById(SELECTOR_ID);
         })();
      }
      const renderChapters = {
         async init(vid) {
            if (NOVA.currentPage == 'watch' && !(vid instanceof HTMLElement)) {
               return console.error('vid not HTMLElement:', chaptersContainer);
            }
            await NOVA.waitUntil(() => !isNaN(vid.duration), 1000);
            switch (NOVA.currentPage) {
               case 'watch':
                  this.from_description(vid.duration);
                  break;
               case 'embed':
                  await NOVA.waitUntil(() => (
                     chaptersContainer = document.body.querySelector('.ytp-chapters-container'))
                     && chaptersContainer?.children.length > 1
                     , 1000);
                  (
                     this.renderChaptersMarks(vid.duration)
                     || this.from_div(chaptersContainer)
                  );
                  break;
            }
            NOVA.runOnPageInitOrTransition(() => {
               if (NOVA.currentPage == 'watch') {
                  NOVA.waitSelector('#meta [collapsed] #more, [description-collapsed] #description #expand')
                     .then(btn => btn.click());
               }
            });
         },
         from_description(duration = required()) {
            if (Math.sign(duration) !== 1) return console.error('duration not positive number:', duration);
            const selectorTimestampLink = 'a[href*="&t="]';
            NOVA.waitSelector(`ytd-watch-metadata #description.ytd-watch-metadata ${selectorTimestampLink}`, { stop_on_page_change: true })
               .then(() => this.renderChaptersMarks(duration));
            NOVA.waitSelector(`#comments #comment #comment-content ${selectorTimestampLink}`, { stop_on_page_change: true })
               .then(() => this.renderChaptersMarks(duration));
         },
         from_div(chaptersContainer = required()) {
            if (!(chaptersContainer instanceof HTMLElement)) return console.error('container not HTMLElement:', chaptersContainer);
            const
               progressContainerWidth = parseInt(getComputedStyle(chaptersContainer).width),
               chaptersOut = document.getElementById(`${SELECTOR_ID}-chapters`);
            for (const chapter of chaptersContainer.children) {
               const
                  newChapter = document.createElement('span'),
                  { width, marginLeft, marginRight } = getComputedStyle(chapter),
                  chapterMargin = parseInt(marginLeft) + parseInt(marginRight);
               newChapter.style.width = (((parseInt(width) + chapterMargin) / progressContainerWidth) * 100) + '%';
               chaptersOut.append(newChapter);
            }
         },
         renderChaptersMarks(duration) {
            if (isNaN(duration)) return console.error('duration isNaN:', duration);
            if (chaptersContainer = document.getElementById(`${SELECTOR_ID}-chapters`)) {
               chaptersContainer.innerHTML = '';
            }
            const chapterList = NOVA.getChapterList(duration);
            chapterList
               ?.forEach((chapter, i, chapters_list) => {
                  const newChapter = document.createElement('span');
                  const nextChapterSec = chapters_list[i + 1]?.sec || duration;
                  newChapter.style.width = ((nextChapterSec - chapter.sec) / duration) * 100 + '%';
                  if (chapter.title) newChapter.title = chapter.title;
                  newChapter.setAttribute('time', chapter.time);
                  chaptersContainer.append(newChapter);
               });
            return chapterList;
         },
      };
   },
   options: {
      player_float_progress_bar_height: {
         _tagName: 'input',
         label: 'Height',
         'label:zh': '高度',
         'label:ja': '身長',
         'label:ko': '키',
         'label:id': 'Tinggi',
         'label:es': 'Altura',
         'label:pt': 'Altura',
         'label:fr': 'Hauteur',
         'label:it': 'Altezza',
         'label:de': 'Höhe',
         'label:pl': 'Wysokość',
         'label:ua': 'Висота',
         type: 'number',
         title: 'in pixels',
         placeholder: 'px',
         min: 1,
         max: 9,
         value: 3,
      },
      player_float_progress_bar_opacity: {
         _tagName: 'input',
         label: 'Opacity',
         'label:zh': '不透明度',
         'label:ja': '不透明度',
         'label:ko': '불투명',
         'label:id': 'Kegelapan',
         'label:es': 'Opacidad',
         'label:pt': 'Opacidade',
         'label:fr': 'Opacité',
         'label:it': 'Opacità',
         'label:de': 'Opazität',
         'label:pl': 'Przejrzystość',
         'label:ua': 'Прозорість',
         type: 'number',
         placeholder: '0-1',
         step: .05,
         min: 0,
         max: 1,
         value: .7,
      },
   }
});
window.nova_plugins.push({
   id: 'player-quick-buttons',
   title: 'Custom player buttons',
   'title:zh': '自定义按钮',
   'title:ja': 'カスタムボタン',
   'title:ko': '사용자 정의 버튼',
   'title:id': 'Tombol pemutar khusus',
   'title:es': 'Botones personalizados',
   'title:pt': 'Botões personalizados',
   'title:fr': 'Boutons personnalisés',
   'title:it': 'Pulsanti personalizzati del giocatore',
   'title:de': 'Benutzerdefinierte Schaltflächen',
   'title:pl': 'Własne przyciski odtwarzacza',
   'title:ua': 'Власні кнопки відтворювання',
   run_on_pages: 'watch, embed, -mobile',
   section: 'player',
   _runtime: user_settings => {
      const
         SELECTOR_BTN_CLASS_NAME = 'nova-right-custom-button',
         SELECTOR_BTN = '.' + SELECTOR_BTN_CLASS_NAME;
      NOVA.waitSelector('#movie_player .ytp-right-controls')
         .then(async container => {
            NOVA.videoElement = await NOVA.waitSelector('video');
            NOVA.css.push(
               `${SELECTOR_BTN} {
                  user-select: none;
                  
               }
               ${SELECTOR_BTN}:hover { color: #66afe9 !important; }
               ${SELECTOR_BTN}:active { color: #2196f3 !important; }`);
            NOVA.css.push(
               `${SELECTOR_BTN}[tooltip]:hover::before {
                  content: attr(tooltip);
                  position: absolute;
                  top: -3em;
                  transform: translateX(-30%);
                  line-height: normal;
                  background-color: rgba(28,28,28,.9);
                  border-radius: 2px;
                  padding: 5px 9px;
                  color: #fff;
                  font-weight: bold;
                  white-space: nowrap;
               }
               
               html[data-cast-api-enabled] ${SELECTOR_BTN}[tooltip]:hover::before {
                  font-weight: normal;
               }`);
            if (user_settings.player_buttons_custom_items?.includes('picture-in-picture')) {
               const pipBtn = document.createElement('button');
               pipBtn.className = `ytp-button ${SELECTOR_BTN_CLASS_NAME}`;
               pipBtn.setAttribute('tooltip', 'Open in PictureInPicture');
               pipBtn.innerHTML = createSVG();
               pipBtn.addEventListener('click', () => document.pictureInPictureElement
                  ? document.exitPictureInPicture() : NOVA.videoElement.requestPictureInPicture()
               );
               container.prepend(pipBtn);
               NOVA.videoElement?.addEventListener('enterpictureinpicture', () => pipBtn.innerHTML = createSVG(2));
               NOVA.videoElement?.addEventListener('leavepictureinpicture', () => pipBtn.innerHTML = createSVG());
               function createSVG(alt) {
                  const svg = document.createElement('svg');
                  svg.setAttribute('width', '100%');
                  svg.setAttribute('height', '100%');
                  svg.setAttribute('viewBox', '-8 -6 36 36');
                  const path = document.createElement('path');
                  path.setAttribute('fill', 'currentColor');
                  path.setAttribute('d', alt
                     ? 'M18.5,11H18v1h.5A1.5,1.5,0,0,1,20,13.5v5A1.5,1.5,0,0,1,18.5,20h-8A1.5,1.5,0,0,1,9,18.5V18H8v.5A2.5,2.5,0,0,0,10.5,21h8A2.5,2.5,0,0,0,21,18.5v-5A2.5,2.5,0,0,0,18.5,11Z M14.5,4H2.5A2.5,2.5,0,0,0,0,6.5v8A2.5,2.5,0,0,0,2.5,17h12A2.5,2.5,0,0,0,17,14.5v-8A2.5,2.5,0,0,0,14.5,4Z'
                     : 'M2.5,17A1.5,1.5,0,0,1,1,15.5v-9A1.5,1.5,0,0,1,2.5,5h13A1.5,1.5,0,0,1,17,6.5V10h1V6.5A2.5,2.5,0,0,0,15.5,4H2.5A2.5,2.5,0,0,0,0,6.5v9A2.5,2.5,0,0,0,2.5,18H7V17Z M18.5,11h-8A2.5,2.5,0,0,0,8,13.5v5A2.5,2.5,0,0,0,10.5,21h8A2.5,2.5,0,0,0,21,18.5v-5A2.5,2.5,0,0,0,18.5,11Z');
                  svg.append(path);
                  return svg.outerHTML;
               }
            }
            if (user_settings.player_buttons_custom_items?.indexOf('popup') !== -1 && !NOVA.queryURL.has('popup')) {
               const popupBtn = document.createElement('button');
               popupBtn.className = `ytp-button ${SELECTOR_BTN_CLASS_NAME}`;
               popupBtn.setAttribute('tooltip', 'Open in popup');
               popupBtn.innerHTML =
                  `<svg viewBox="-8 -8 36 36" height="100%" width="100%">
                     <g fill="currentColor">
                        <path d="M18 2H6v4H2v12h12v-4h4V2z M12 16H4V8h2v6h6V16z M16 12h-2h-2H8V8V6V4h8V12z" />
                     </g>
                  </svg>`;
               popupBtn.addEventListener('click', () => {
                  const { width, height } = NOVA.aspectRatio.sizeToFit({
                     'srcWidth': NOVA.videoElement.videoWidth,
                     'srcHeight': NOVA.videoElement.videoHeight,
                     'maxWidth': screen.width / (+user_settings.player_buttons_custom_popup_width || 4),
                  });
                  url = new URL(
                     document.querySelector('link[itemprop="embedUrl"][href]')?.href
                     || (location.origin + '/embed/' + movie_player.getVideoData().video_id)
                  );
                  if (currentTime = ~~NOVA.videoElement?.currentTime) url.searchParams.set('start', currentTime);
                  url.searchParams.set('autoplay', 1);
                  url.searchParams.set('popup', true);
                  openPopup({ 'url': url.href, 'title': document.title, 'width': width, 'height': height });
               });
               container.prepend(popupBtn);
               function openPopup({ url, title, width, height }) {
                  const left = (screen.width / 2) - (width / 2);
                  const top = (screen.height / 2) - (height / 2);
                  const newWindow = window.open(url, '_blank', `popup=1,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes,copyhistory=no,width=${width},height=${height},top=${top},left=${left}`);
                  newWindow.document.title = title;
               }
            }
            if (user_settings.player_buttons_custom_items?.includes('screenshot')) {
               const
                  SELECTOR_SCREENSHOT_ID = 'nova-screenshot-result',
                  SELECTOR_SCREENSHOT = '#' + SELECTOR_SCREENSHOT_ID;
               NOVA.css.push(
                  SELECTOR_SCREENSHOT + ` {
                     --width: 400px;
                     --height: 400px;
                     position: fixed;
                     top: 0;
                     right: 0;
                     overflow: hidden;
                     margin: 36px 30px; 
                     box-shadow: 0 0 15px #000;
                     max-width: var(--width);
                     max-height: var(--height);
                  }
                  
                  
                  
                  ${SELECTOR_SCREENSHOT} canvas {
                     max-width: var(--width);
                     max-height: var(--height);
                     
                  }
                  ${SELECTOR_SCREENSHOT} .close-btn {
                     position: absolute;
                     bottom: 0;
                     right: 0;
                     background-color: rgba(0, 0, 0, .5);
                     color: #FFF;
                     cursor: pointer;
                     font-size: 12px;
                     display: grid;
                     height: 100%;
                     width: 25%;
                  }
                  ${SELECTOR_SCREENSHOT} .close-btn:hover { background-color: rgba(0, 0, 0, .65); }
                  ${SELECTOR_SCREENSHOT} .close-btn > * { margin: auto; }`);
               const screenshotBtn = document.createElement('button');
               screenshotBtn.className = `ytp-button ${SELECTOR_BTN_CLASS_NAME}`;
               screenshotBtn.setAttribute('tooltip', 'Take screenshot');
               screenshotBtn.innerHTML =
                  `<svg viewBox="0 -166 512 860" height="100%" width="100%">
                     <g fill="currentColor">
                        <circle cx="255.811" cy="285.309" r="75.217" />
                        <path d="M477,137H352.718L349,108c0-16.568-13.432-30-30-30H191c-16.568,0-30,13.432-30,30l-3.718,29H34 c-11.046,0-20,8.454-20,19.5v258c0,11.046,8.954,20.5,20,20.5h443c11.046,0,20-9.454,20-20.5v-258C497,145.454,488.046,137,477,137 z M255.595,408.562c-67.928,0-122.994-55.066-122.994-122.993c0-67.928,55.066-122.994,122.994-122.994 c67.928,0,122.994,55.066,122.994,122.994C378.589,353.495,323.523,408.562,255.595,408.562z M474,190H369v-31h105V190z" />
                     </g>
                  </svg>`;
               screenshotBtn.addEventListener('click', () => {
                  const
                     container = document.getElementById(SELECTOR_SCREENSHOT_ID) || document.createElement('a'),
                     canvas = container.querySelector('canvas') || document.createElement('canvas');
                  canvas.width = NOVA.videoElement.videoWidth;
                  canvas.height = NOVA.videoElement.videoHeight
                  canvas.getContext('2d').drawImage(NOVA.videoElement, 0, 0, canvas.width, canvas.height);
                  canvas.title = 'Click to save';
                  try {
                     canvas.toBlob(blob => container.href = URL.createObjectURL(blob));
                  } catch (error) {
                  }
                  if (!container.id) {
                     container.id = SELECTOR_SCREENSHOT_ID;
                     container.target = '_blank';
                     if (headerContainer = document.getElementById('masthead-container')) {
                        container.style.marginTop = (headerContainer?.offsetHeight || 0) + 'px';
                        container.style.zIndex = +getComputedStyle(headerContainer)['z-index'] + 1;
                     }
                     canvas.addEventListener('click', evt => {
                        evt.preventDefault();
                        downloadCanvasAsImage(evt.target);
                        container.remove();
                     });
                     container.append(canvas);
                     const close = document.createElement('a');
                     close.className = 'close-btn'
                     close.innerHTML = '<span>CLOSE</span>';
                     close.title = 'Close';
                     close.addEventListener('click', evt => {
                        evt.preventDefault();
                        container.remove();
                     });
                     container.append(close);
                     document.body.append(container);
                  }
               });
               function downloadCanvasAsImage(canvas) {
                  const
                     downloadLink = document.createElement('a'),
                     downloadFileName =
                        [
                           movie_player.getVideoData().title
                              .replace(/[\\/:*?"<>|]+/g, '')
                              .replace(/\s+/g, ' ').trim(),
                           `[${NOVA.timeFormatTo.HMS.abbr(NOVA.videoElement.currentTime)}]`,
                        ]
                           .join(' ');
                  downloadLink.href = canvas.toBlob(blob => URL.createObjectURL(blob));
                  downloadLink.download = downloadFileName +
                     '.' + (user_settings.player_buttons_custom_screenshot || 'png');
                  downloadLink.click();
               }
               container.prepend(screenshotBtn);
            }
            if (user_settings.player_buttons_custom_items?.includes('thumbnail')) {
               const thumbBtn = document.createElement('button');
               thumbBtn.className = `ytp-button ${SELECTOR_BTN_CLASS_NAME}`;
               thumbBtn.setAttribute('tooltip', 'View Thumbnail');
               thumbBtn.innerHTML =
                  `<svg viewBox="0 -10 21 40" height="100%" width="100%">
                     <g fill="currentColor">
                        <circle cx='8' cy='7.2' r='2'/>
                        <path d='M0 2v16h20V2H0z M18 16H2V4h16V16z'/>
                        <polygon points='17 10.9 14 7.9 9 12.9 6 9.9 3 12.9 3 15 17 15' />
                     </g>
                  </svg>`;
               thumbBtn.addEventListener('click', async () => {
                  const
                     videoId = movie_player.getVideoData().video_id || NOVA.queryURL.get('v'),
                     thumbsSizesTemplate = [
                        'maxres',
                        'sd',
                        'hq',
                        'mq',
                        ''
                     ];
                  document.body.style.cursor = 'wait';
                  for (const resPrefix of thumbsSizesTemplate) {
                     const
                        imgUrl = `https://i.ytimg.com/vi/${videoId}/${resPrefix}default.jpg`,
                        response = await fetch(imgUrl);
                     if (response.status === 200) {
                        document.body.style.cursor = 'default';
                        window.open(imgUrl);
                        break;
                     }
                  }
               });
               container.prepend(thumbBtn);
            }
            if (user_settings.player_buttons_custom_items?.includes('rotate')) {
               const
                  hotkey = user_settings.player_buttons_custom_hotkey_rotate || 'r',
                  rotateBtn = document.createElement('button');
               rotateBtn.className = `ytp-button ${SELECTOR_BTN_CLASS_NAME}`;
               rotateBtn.setAttribute('tooltip', `Rotate video (${hotkey})`);
               Object.assign(rotateBtn.style, {
                  padding: '0 1.1em',
               });
               rotateBtn.innerHTML =
                  `<svg viewBox="0 0 1536 1536" height="100%" width="100%">
                     <g fill="currentColor">
                        <path
                           d="M1536 128v448q0 26-19 45t-45 19h-448q-42 0-59-40-17-39 14-69l138-138Q969 256 768 256q-104 0-198.5 40.5T406 406 296.5 569.5 256 768t40.5 198.5T406 1130t163.5 109.5T768 1280q119 0 225-52t179-147q7-10 23-12 14 0 25 9l137 138q9 8 9.5 20.5t-7.5 22.5q-109 132-264 204.5T768 1536q-156 0-298-61t-245-164-164-245T0 768t61-298 164-245T470 61 768 0q147 0 284.5 55.5T1297 212l130-129q29-31 70-14 39 17 39 59z"/>
                        </path>
                     </g>
                  </svg>`;
               rotateBtn.addEventListener('click', rotateVideo);
               document.addEventListener('keyup', evt => {
                  if (['input', 'textarea', 'select'].includes(evt.target.localName) || evt.target.isContentEditable) return;
                  if (evt.key === hotkey) {
                     rotateVideo();
                  }
               });
               function rotateVideo() {
                  let angle = parseInt(NOVA.videoElement.style.transform.replace(/\D+/, '')) || 0;
                  const scale = (angle === 0 || angle === 180) ? movie_player.clientHeight / NOVA.videoElement.clientWidth : 1;
                  angle += 90;
                  NOVA.videoElement.style.transform = (angle === 360) ? '' : `rotate(${angle}deg) scale(${scale})`;
               }
               container.prepend(rotateBtn);
            }
            if (user_settings.player_buttons_custom_items?.includes('aspect-ratio')) {
               const
                  aspectRatioBtn = document.createElement('a'),
                  aspectRatioList = [
                     { '16:9': 1.335 },
                     { '4:3': .75 },
                     { '9:16': 1.777777778 },
                     { 'auto': 1 },
                  ],
                  genTooltip = (key = 0) => `Switch aspect ratio to ` + Object.keys(aspectRatioList[key]);
               aspectRatioBtn.className = `ytp-button ${SELECTOR_BTN_CLASS_NAME}`;
               aspectRatioBtn.style.textAlign = 'center';
               aspectRatioBtn.style.fontWeight = 'bold';
               aspectRatioBtn.setAttribute('tooltip', genTooltip());
               aspectRatioBtn.innerHTML = '1:1';
               aspectRatioBtn.addEventListener('click', () => {
                  if (!NOVA.videoElement) return;
                  const getNextIdx = () => (this.listIdx < aspectRatioList.length - 1) ? this.listIdx + 1 : 0;
                  this.listIdx = getNextIdx();
                  NOVA.videoElement.style.transform = `scaleX(${Object.values(aspectRatioList[this.listIdx])})`;
                  aspectRatioBtn.setAttribute('tooltip', genTooltip(getNextIdx()));
                  aspectRatioBtn.textContent = Object.keys(aspectRatioList[this.listIdx]);
               });
               container.prepend(aspectRatioBtn);
            }
            if (user_settings.player_buttons_custom_items?.includes('watch-later')) {
               NOVA.waitSelector('.ytp-watch-later-button')
                  .then(watchLaterDefault => {
                     NOVA.css.push(
                        `.${SELECTOR_BTN_CLASS_NAME} .ytp-spinner-container {
                           position: relative;
                           top: 0;
                           left: 0;
                           scale: .5;
                           margin: 0;
                        }
                        .${SELECTOR_BTN_CLASS_NAME}.watch-later-btn svg {
                           scale: .85;
                        }`);
                     const watchLaterBtn = document.createElement('button');
                     watchLaterBtn.className = `ytp-button ${SELECTOR_BTN_CLASS_NAME} watch-later-btn`;
                     watchLaterBtn.setAttribute('tooltip', 'Watch later');
                     renderIcon();
                     watchLaterBtn.addEventListener('click', () => {
                        watchLaterDefault.click();
                        renderIcon();
                        const waitStatus = setInterval(() => {
                           if (watchLaterDefault.querySelector('svg')) {
                              clearInterval(waitStatus);
                              renderIcon();
                           }
                        }, 100);
                     });
                     [...document.getElementsByClassName(SELECTOR_BTN_CLASS_NAME)].pop()
                        ?.after(watchLaterBtn);
                     function renderIcon() {
                        watchLaterBtn.innerHTML = watchLaterDefault.querySelector('.ytp-watch-later-icon')?.innerHTML;
                     }
                  });
            }
            if (user_settings.player_buttons_custom_items?.includes('card-switch')
               && !user_settings.player_hide_elements?.includes('videowall_endscreen')
               && !user_settings.player_hide_elements?.includes('card_endscreen')
            ) {
               const
                  cardAttrName = 'nova-hide-endscreen',
                  cardBtn = document.createElement('button');
               NOVA.css.push(
                  `#movie_player[${cardAttrName}] .videowall-endscreen,
                  #movie_player[${cardAttrName}] .ytp-pause-overlay,
                  #movie_player[${cardAttrName}] [class^="ytp-ce-"] {
                     display: none !important;
                  }`);
               cardBtn.className = `ytp-button ${SELECTOR_BTN_CLASS_NAME}`;
               cardBtn.innerHTML = createSVG();
               if (user_settings.player_buttons_custom_card_switch) {
                  switchState(movie_player.toggleAttribute(cardAttrName));
               }
               cardBtn.addEventListener('click', () => switchState(movie_player.toggleAttribute(cardAttrName)));
               function switchState(state = required()) {
                  cardBtn.innerHTML = createSVG(state)
                  cardBtn.setAttribute('tooltip', `The cards are currently ${state ? 'hidden' : 'showing'}`);
               }
               function createSVG(alt) {
                  const svg = document.createElement('svg');
                  svg.setAttribute('width', '100%');
                  svg.setAttribute('height', '100%');
                  svg.setAttribute('viewBox', '-200 0 912 512');
                  const g = document.createElement('g');
                  g.setAttribute('fill', 'currentColor');
                  g.innerHTML = alt
                     ? '<path d="M 409 57.104 C 407.625 57.641, 390.907 73.653, 371.848 92.687 L 337.196 127.293 323.848 120.738 C 301.086 109.561, 283.832 103.994, 265.679 101.969 C 217.447 96.591, 148.112 134.037, 59.026 213.577 C 40.229 230.361, 4.759 265.510, 2.089 270 C -0.440 274.252, -0.674 281.777, 1.575 286.516 C 4.724 293.153, 67.054 352.112, 89.003 369.217 L 92.490 371.934 63.330 401.217 C 37.873 426.781, 34.079 430.988, 33.456 434.346 C 31.901 442.720, 38.176 452.474, 46.775 455.051 C 56.308 457.907, 41.359 471.974, 244.317 269.173 C 350.152 163.421, 429.960 82.914, 431.067 80.790 C 436.940 69.517, 428.155 55.840, 415.185 56.063 C 413.158 56.098, 410.375 56.566, 409 57.104 M 245.500 137.101 C 229.456 139.393, 201.143 151.606, 177.500 166.433 C 151.339 182.839, 120.778 206.171, 89.574 233.561 C 72.301 248.723, 42 277.649, 42 278.977 C 42 280.637, 88.281 323.114, 108.367 339.890 L 117.215 347.279 139.209 325.285 L 161.203 303.292 159.601 293.970 C 157.611 282.383, 157.570 272.724, 159.465 261.881 C 165.856 225.304, 193.011 195.349, 229.712 184.389 C 241.299 180.929, 261.648 179.996, 272.998 182.405 L 280.496 183.996 295.840 168.652 L 311.183 153.309 303.342 149.583 C 292.100 144.242, 277.007 139.186, 267.205 137.476 C 257.962 135.865, 254.565 135.806, 245.500 137.101 M 377.500 163.164 C 374.231 164.968, 369.928 169.297, 368.295 172.423 C 366.203 176.431, 366.351 184.093, 368.593 187.889 C 369.597 189.587, 375.944 195.270, 382.699 200.516 C 406.787 219.226, 444.129 252.203, 462.500 270.989 L 470.500 279.170 459 290.204 C 374.767 371.030, 302.827 418.200, 259.963 420.709 C 239.260 421.921, 213.738 412.918, 179.575 392.352 C 167.857 385.298, 166.164 384.571, 161.448 384.571 C 154.702 384.571, 149.091 388.115, 146.121 394.250 C 143.531 399.600, 143.472 403.260, 145.890 408.500 C 148.270 413.656, 150.468 415.571, 162 422.535 C 198.520 444.590, 230.555 455.992, 256 455.992 C 305.062 455.992, 376.663 414.097, 462 335.458 C 483.584 315.567, 509.652 289.051, 510.931 285.685 C 512.694 281.042, 512.218 273.876, 509.889 270 C 507.494 266.017, 484.252 242.741, 463.509 223.552 C 437.964 199.922, 398.967 167.566, 391.300 163.639 C 387.656 161.773, 380.470 161.526, 377.500 163.164 M 235.651 219.459 C 231.884 220.788, 226.369 223.351, 223.395 225.153 C 216.405 229.389, 206.759 239.019, 202.502 246.010 C 198.959 251.828, 193.677 266.197, 194.194 268.611 C 194.372 269.437, 205.637 258.890, 220.993 243.519 C 249.683 214.801, 249.910 214.427, 235.651 219.459 M 316.962 223.250 C 313.710 224.890, 311.876 226.720, 310.200 230 C 307.188 235.893, 307.781 240.006, 313.805 255 C 317.867 265.109, 318.470 267.589, 318.790 275.500 C 319.554 294.378, 313.786 309.236, 300.522 322.557 C 287.282 335.854, 274.164 341.408, 256 341.408 C 244.216 341.408, 238.392 340.027, 226.837 334.489 C 214.541 328.596, 204.996 330.563, 200.250 339.966 C 191.301 357.697, 210.339 372.220, 247.484 375.998 C 301.141 381.456, 350.063 339.760, 353.664 285.500 C 354.618 271.136, 351.039 249.928, 345.577 237.579 C 342.933 231.601, 337.061 224.600, 332.875 222.435 C 328.782 220.319, 322.095 220.661, 316.962 223.250" fill-rule="evenodd" />'
                     : `<path d="M 377.5 163.164 C 374.231 164.968 375.944 195.27 382.699 200.516 C 406.787 219.226 444.129 252.203 462.5 270.989 L 470.5 279.17 L 459 290.204 C 374.767 371.03 302.827 418.2 259.963 420.709 C 239.26 421.921 213.738 412.918 179.575 392.352 C 167.857 385.298 166.164 384.571 161.448 384.571 C 154.702 384.571 149.091 388.115 146.121 394.25 C 143.531 399.6 143.472 403.26 145.89 408.5 C 148.27 413.656 150.468 415.571 162 422.535 C 198.52 444.59 230.555 455.992 256 455.992 C 305.062 455.992 376.663 414.097 462 335.458 C 483.584 315.567 509.652 289.051 510.931 285.685 C 512.694 281.042 512.218 273.876 509.889 270 C 507.494 266.017 484.252 242.741 463.509 223.552 C 437.964 199.922 398.967 167.566 391.3 163.639 C 387.656 161.773 380.47 161.526 377.5 163.164 M 316.962 223.25 C 313.71 224.89 311.876 226.72 310.2 230 C 307.188 235.893 307.781 240.006 313.805 255 C 317.867 265.109 318.47 267.589 318.79 275.5 C 319.554 294.378 313.786 309.236 300.522 322.557 C 287.282 335.854 274.164 341.408 256 341.408 C 244.216 341.408 238.392 340.027 226.837 334.489 C 214.541 328.596 204.996 330.563 200.25 339.966 C 191.301 357.697 210.339 372.22 247.484 375.998 C 301.141 381.456 350.063 339.76 353.664 285.5 C 354.618 271.136 351.039 249.928 345.577 237.579 C 342.933 231.601 337.061 224.6 332.875 222.435 C 328.782 220.319 322.095 220.661 316.962 223.25"></path>
                     <path d="M 377.487 163.483 C 374.218 165.287 369.915 169.616 368.282 172.742 C 366.19 176.75 366.338 184.412 368.58 188.208 C 369.584 189.906 375.931 195.589 382.686 200.835 C 406.774 219.545 444.116 252.522 462.487 271.308 L 470.487 279.489 L 458.987 290.523 C 374.754 371.349 302.814 418.519 259.95 421.028 C 239.247 422.24 213.725 413.237 179.562 392.671 C 167.844 385.617 166.151 384.89 161.435 384.89 C 154.689 384.89 149.078 388.434 146.108 394.569 C 143.518 399.919 143.459 403.579 145.877 408.819 C 148.257 413.975 150.455 415.89 161.987 422.854 C 198.507 444.909 230.542 456.311 255.987 456.311 C 305.049 456.311 376.65 414.416 461.987 335.777 C 483.571 315.886 509.639 289.37 510.918 286.004 C 512.681 281.361 512.205 274.195 509.876 270.319 C 507.481 266.336 484.239 243.06 463.496 223.871 C 437.951 200.241 398.954 167.885 391.287 163.958 C 387.643 162.092 380.457 161.845 377.487 163.483 M 316.949 223.569 C 313.697 225.209 311.863 227.039 310.187 230.319 C 307.175 236.212 307.768 240.325 313.792 255.319 C 317.854 265.428 318.457 267.908 318.777 275.819 C 319.541 294.697 313.773 309.555 300.509 322.876 C 287.269 336.173 274.151 341.727 255.987 341.727 C 244.203 341.727 238.379 340.346 226.824 334.808 C 214.528 328.915 204.983 330.882 200.237 340.285 C 191.288 358.016 210.326 372.539 247.471 376.317 C 301.128 381.775 350.05 340.079 353.651 285.819 C 354.605 271.455 351.026 250.247 345.564 237.898 C 342.92 231.92 337.048 224.919 332.862 222.754 C 328.769 220.638 322.082 220.98 316.949 223.569" transform="matrix(-1, 0, 0, -1, 512.000305, 558.092285)"></path>`;
                  svg.append(g);
                  return svg.outerHTML;
               }
               container.prepend(cardBtn);
            }
            if (user_settings.player_buttons_custom_items?.includes('quick-quality')) {
               const
                  SELECTOR_QUALITY_CLASS_NAME = 'nova-quick-quality',
                  SELECTOR_QUALITY = '.' + SELECTOR_QUALITY_CLASS_NAME,
                  qualityContainerBtn = document.createElement('a'),
                  SELECTOR_QUALITY_LIST_ID = SELECTOR_QUALITY_CLASS_NAME + '-list',
                  SELECTOR_QUALITY_LIST = '#' + SELECTOR_QUALITY_LIST_ID,
                  listQuality = document.createElement('ul'),
                  SELECTOR_QUALITY_TITLE_ID = SELECTOR_QUALITY_CLASS_NAME + '-title',
                  qualityBtn = document.createElement('span'),
                  qualityFormatList = {
                     highres: { label: '4320p', badge: '8K' },
                     hd2880: { label: '2880p', badge: '5K' },
                     hd2160: { label: '2160p', badge: '4K' },
                     hd1440: { label: '1440p', badge: 'QHD' },
                     hd1080: { label: '1080p', badge: 'FHD' },
                     hd720: { label: '720p', badge: 'ᴴᴰ' },
                     large: { label: '480p' },
                     medium: { label: '360p' },
                     small: { label: '240p' },
                     tiny: { label: '144p' },
                     auto: { label: 'auto' },
                  };
               NOVA.css.push(
                  SELECTOR_QUALITY + ` {
                     overflow: visible !important;
                     position: relative;
                     text-align: center !important;
                     vertical-align: top;
                     font-weight: bold;
                  }
                  ${SELECTOR_QUALITY_LIST} {
                     position: absolute;
                     bottom: 2.5em !important;
                     left: -2.2em;
                     list-style: none;
                     padding-bottom: 1.5em !important;
                     z-index: ${1 + Math.max(NOVA.css.getValue('.ytp-progress-bar', 'z-index'), 31)};
                  }
                  
                  html[data-cast-api-enabled] ${SELECTOR_QUALITY_LIST} {
                     margin: 0;
                     padding: 0;
                     bottom: 3.3em;
                     
                  }
                  ${SELECTOR_QUALITY}:not(:hover) ${SELECTOR_QUALITY_LIST} {
                     display: none;
                  }
                  ${SELECTOR_QUALITY_LIST} li {
                     cursor: pointer;
                     white-space: nowrap;
                     line-height: 1.4;
                     background: rgba(28, 28, 28, 0.9);
                     margin: .3em 0;
                     padding: .5em 3em;
                     border-radius: .3em;
                     color: #fff;
                  }
                  ${SELECTOR_QUALITY_LIST} li .quality-menu-item-label-badge {
                     position: absolute;
                     right: 1em;
                     width: 1.7em;
                  }
                  ${SELECTOR_QUALITY_LIST} li.active { background: #720000; }
                  ${SELECTOR_QUALITY_LIST} li.disable { color: #666; }
                  ${SELECTOR_QUALITY_LIST} li:hover:not(.active) { background: #c00; }`);
               qualityContainerBtn.className = `ytp-button ${SELECTOR_BTN_CLASS_NAME} ${SELECTOR_QUALITY_CLASS_NAME}`;
               qualityBtn.id = SELECTOR_QUALITY_TITLE_ID;
               qualityBtn.textContent = qualityFormatList[movie_player.getPlaybackQuality()]?.label || '[out of range]';
               listQuality.id = SELECTOR_QUALITY_LIST_ID;
               movie_player.addEventListener('onPlaybackQualityChange', quality => {
                  document.getElementById(SELECTOR_QUALITY_TITLE_ID)
                     .textContent = qualityFormatList[quality]?.label || '[out of range]';
               });
               qualityContainerBtn.prepend(qualityBtn);
               qualityContainerBtn.append(listQuality);
               container.prepend(qualityContainerBtn);
               fillQualityMenu();
               NOVA.videoElement?.addEventListener('canplay', fillQualityMenu);
               function fillQualityMenu() {
                  if (qualityList = document.getElementById(SELECTOR_QUALITY_LIST_ID)) {
                     qualityList.innerHTML = '';
                     movie_player.getAvailableQualityLevels()
                        .forEach(quality => {
                           const qualityItem = document.createElement('li');
                           if (qualityData = qualityFormatList[quality]) {
                              qualityItem.textContent = qualityData.label;
                              if (badge = qualityData.badge) {
                                 qualityItem.insertAdjacentHTML('beforeend',
                                    `<span class="quality-menu-item-label-badge">${badge}</span>`);
                              }
                              if (movie_player.getPlaybackQuality() == quality) {
                                 qualityItem.className = 'active';
                              } else {
                                 const maxWidth = (NOVA.currentPage == 'watch') ? window.screen.width : window.innerWidth;
                                 if (+(qualityData.label.replace(/[^0-9]/g, '') || 0) <= (maxWidth * 1.3)) {
                                    qualityItem.addEventListener('click', () => {
                                       movie_player.setPlaybackQualityRange(quality, quality);
                                       if (quality == 'auto') return;
                                       qualityList.innerHTML = '';
                                    });
                                 }
                                 else {
                                    qualityItem.className = 'disable';
                                    qualityItem.title = 'Max (window viewport + 30%)';
                                 }
                              }
                              qualityList.append(qualityItem);
                           }
                        });
                  }
               }
            }
            if (user_settings.player_buttons_custom_items?.includes('clock')) {
               const clockEl = document.createElement('span');
               clockEl.className = 'ytp-time-display';
               clockEl.title = 'Now time';
               container.prepend(clockEl);
               setInterval(() => {
                  if (document.visibilityState == 'hidden'
                     || movie_player.classList.contains('ytp-autohide')
                  ) {
                     return;
                  }
                  const time = new Date().toTimeString().slice(0, 8);
                  clockEl.textContent = time;
               }, 1000);
            }
            if (user_settings.player_buttons_custom_items?.includes('toggle-speed')) {
               const
                  speedBtn = document.createElement('a'),
                  hotkey = user_settings.player_buttons_custom_hotkey_toggle_speed || 'a',
                  defaultRateText = '1x',
                  genTooltip = () => `Switch to ${NOVA.videoElement.playbackRate}>${speedBtn.textContent} (${hotkey})`;
               let rateOrig = {};
               speedBtn.className = `ytp-button ${SELECTOR_BTN_CLASS_NAME}`;
               speedBtn.style.textAlign = 'center';
               speedBtn.style.fontWeight = 'bold';
               speedBtn.innerHTML = defaultRateText;
               speedBtn.setAttribute('tooltip', genTooltip());
               document.addEventListener('keyup', evt => {
                  if (['input', 'textarea', 'select'].includes(evt.target.localName) || evt.target.isContentEditable) return;
                  if (evt.key === hotkey) {
                     switchRate();
                  }
               });
               speedBtn.addEventListener('click', switchRate);
               function switchRate() {
                  if (Object.keys(rateOrig).length) {
                     playerRate.set(rateOrig);
                     rateOrig = {};
                     speedBtn.innerHTML = defaultRateText;
                  }
                  else {
                     rateOrig = (movie_player && NOVA.videoElement.playbackRate % .25) === 0
                        ? { 'default': movie_player.getPlaybackRate() }
                        : { 'html5': NOVA.videoElement.playbackRate };
                     let resetRate = Object.assign({}, rateOrig);
                     resetRate[Object.keys(resetRate)[0]] = 1;
                     playerRate.set(resetRate);
                     speedBtn.textContent = rateOrig[Object.keys(rateOrig)[0]] + 'x';
                  }
                  speedBtn.setAttribute('tooltip', genTooltip());
               }
               const playerRate = {
                  set(obj) {
                     if (obj.hasOwnProperty('html5') || !movie_player) {
                        NOVA.videoElement.playbackRate = obj.html5;
                     }
                     else {
                        movie_player.setPlaybackRate(obj.default);
                     }
                  },
               };
               container.prepend(speedBtn);
               visibilitySwitch();
               NOVA.videoElement?.addEventListener('ratechange', visibilitySwitch);
               NOVA.videoElement?.addEventListener('loadeddata', () => {
                  rateOrig = {};
                  speedBtn.textContent = defaultRateText;
                  visibilitySwitch();
               });
               function visibilitySwitch() {
                  if (!Object.keys(rateOrig).length) {
                     speedBtn.style.display = (NOVA.videoElement?.playbackRate === 1) ? 'none' : '';
                  }
               }
            }
         });
   },
   options: {
      player_buttons_custom_items: {
         _tagName: 'select',
         label: 'Buttons',
         'label:zh': '纽扣',
         'label:ja': 'ボタン',
         'label:ko': '버튼',
         'label:id': 'Tombol',
         'label:es': 'Botones',
         'label:pt': 'Botões',
         'label:fr': 'Boutons',
         'label:it': 'Bottoni',
         'label:de': 'Tasten',
         'label:pl': 'Przyciski',
         'label:ua': 'Кнопки',
         title: '[Ctrl+Click] to select several',
         'title:zh': '[Ctrl+Click] 选择多个',
         'title:ja': '「Ctrl+Click」して、いくつかを選択します',
         'title:ko': '[Ctrl+Click] 여러 선택',
         'title:id': '[Ctrl+Klik] untuk memilih beberapa',
         'title:es': '[Ctrl+Click] para seleccionar varias',
         'title:pt': '[Ctrl+Click] para selecionar vários',
         'title:fr': '[Ctrl+Click] pour sélectionner plusieurs',
         'title:it': '[Ctrl+Clic] per selezionarne diversi',
         'title:de': '[Ctrl+Click] um mehrere auszuwählen',
         'title:pl': 'Ctrl+kliknięcie, aby zaznaczyć kilka',
         'title:ua': '[Ctrl+Click] щоб обрати декілька',
         multiple: null,
         required: true,
         size: 7,
         options: [
            {
               label: 'clock', value: 'clock',
            },
            {
               label: 'quick quality', value: 'quick-quality',
               'label:zh': '质量',
               'label:ja': '品質',
               'label:ko': '품질',
               'label:id': 'kualitas',
               'label:es': 'calidad',
               'label:pt': 'qualidade',
               'label:fr': 'qualité',
               'label:it': 'qualità',
               'label:de': 'qualität',
               'label:pl': 'jakość',
               'label:ua': 'якість',
            },
            {
               label: 'toggle speed', value: 'toggle-speed',
               'label:zh': '切换速度',
               'label:ja': 'トグル速度',
               'label:ko': '토글 속도',
               'label:id': 'beralih kecepatan',
               'label:es': 'alternar velocidad',
               'label:pt': 'velocidade de alternância',
               'label:fr': 'basculer la vitesse',
               'label:it': 'alternare la velocità',
               'label:de': 'geschwindigkeit umschalten',
               'label:pl': 'szybkość',
               'label:ua': 'швидкість',
            },
            {
               label: 'card-switch', value: 'card-switch',
            },
            {
               label: 'screenshot', value: 'screenshot',
               'label:zh': '截屏',
               'label:ja': 'スクリーンショット',
               'label:ko': '스크린샷',
               'label:id': 'tangkapan layar',
               'label:es': 'captura de pantalla',
               'label:pt': 'captura de tela',
               'label:fr': "capture d'écran",
               'label:it': 'immagine dello schermo',
               'label:de': 'bildschirmfoto',
               'label:ua': 'фото екрану',
            },
            {
               label: 'picture-in-picture', value: 'picture-in-picture',
               'label:pl': 'obraz w obrazie',
               'label:ua': 'картинка в картинці',
            },
            {
               label: 'popup', value: 'popup',
               'label:zh': '弹出式播放器',
               'label:ja': 'ポップアッププレーヤー',
               'label:ko': '썸네일',
               'label:id': 'muncul',
               'label:pt': 'jogador pop-up',
               'label:fr': 'lecteur contextuel',
               'label:it': 'apparire',
               'label:de': 'auftauchen',
               'label:pl': 'w okienku',
               'label:ua': 'спливаюче повідомлення',
            },
            {
               label: 'rotate', value: 'rotate',
               'label:zh': '旋转',
               'label:ja': '回転する',
               'label:ko': '회전',
               'label:id': 'memutar',
               'label:es': 'girar',
               'label:pt': 'girar',
               'label:fr': 'tourner',
               'label:it': 'ruotare',
               'label:de': 'drehen',
               'label:pl': 'obróć',
               'label:ua': 'повернути',
            },
            {
               label: 'aspect-ratio', value: 'aspect-ratio',
               'label:ua': 'співвідношення сторін',
            },
            {
               label: 'watch later', value: 'watch-later',
               'label:ua': 'переглянути пізніше',
            },
            {
               label: 'thumbnail', value: 'thumbnail',
               'label:zh': '缩略图',
               'label:ja': 'サムネイル',
               'label:ko': '썸네일',
               'label:es': 'miniatura',
               'label:pt': 'captura de tela',
               'label:fr': 'la vignette',
               'label:it': 'miniatura',
               'label:de': 'bildschirmfoto',
               'label:pl': 'miniaturka',
               'label:ua': 'мініатюра',
            },
         ],
      },
      player_buttons_custom_popup_width: {
         _tagName: 'input',
         label: 'Player window size aspect ratio',
         'label:zh': '播放器窗口大小纵横比',
         'label:ja': 'プレーヤーのウィンドウサイズのアスペクト比',
         'label:ko': '플레이어 창 크기 종횡비',
         'label:id': 'Rasio aspek ukuran jendela pemutar',
         'label:es': 'Relación de aspecto del tamaño de la ventana del reproductor',
         'label:pt': 'Proporção do tamanho da janela do jogador',
         'label:fr': "Rapport d'aspect de la taille de la fenêtre du lecteur",
         'label:it': 'Proporzioni della dimensione della finestra del lettore',
         'label:de': 'Seitenverhältnis der Player-Fenstergröße',
         'label:pl': 'Rozmiar okna odtwarzacza',
         'label:ua': 'Співвідношення розміру вікна відтворювача',
         type: 'number',
         title: 'Less value - larger size',
         'title:zh': '较小的值 - 较大的尺寸',
         'title:ja': '小さい値-大きいサイズ',
         'title:ko': '더 작은 값 - 더 큰 크기',
         'title:id': 'Nilai lebih kecil - ukuran lebih besar',
         'title:es': 'Valor más pequeño - tamaño más grande',
         'title:pt': 'Valor menor - tamanho maior',
         'title:fr': 'Plus petite valeur - plus grande taille',
         'title:it': 'Meno valore - dimensioni maggiori',
         'title:de': 'Kleiner Wert - größere Größe',
         'title:pl': 'Mniejsza wartość - większy rozmiar',
         'title:ua': 'Менше значення - більший розмір',
         placeholder: '1.5-4',
         step: 0.1,
         min: 1.5,
         max: 4,
         value: 2.5,
         'data-dependent': { 'player_buttons_custom_items': ['popup'] },
      },
      player_buttons_custom_hotkey_toggle_speed: {
         _tagName: 'select',
         label: 'Hotkey toggle speed',
         'label:zh': '热键切换速度',
         'label:ja': '速度を切り替えるためのホットボタン',
         'label:ko': '단축키 토글 속도',
         'label:id': 'Kecepatan beralih tombol pintas',
         'label:es': 'Velocidad de cambio de teclas de acceso rápido',
         'label:pt': 'Velocidade de alternância da tecla de atalho',
         'label:fr': 'Vitesse de basculement des raccourcis clavier',
         'label:it': 'Tasto di scelta rapida per attivare/disattivare la velocità',
         'label:de': 'Hotkey-Umschaltgeschwindigkeit',
         'label:pl': 'Skrót przełączania prędkości',
         'label:ua': 'Гаряча клавіша увімкнути швидкість',
         options: [
            { label: 'A', value: 'a', selected: true },
            'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ']', '[', '+', '-', ',', '.', '/', '<', ';', '\\'
         ],
         'data-dependent': { 'player_buttons_custom_items': ['toggle-speed'] },
      },
      player_buttons_custom_hotkey_rotate: {
         _tagName: 'select',
         label: 'Hotkey rotate',
         options: [
            { label: 'R', value: 'r', selected: true },
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ']', '[', '+', '-', ',', '.', '/', '<', ';', '\\'
         ],
         'data-dependent': { 'player_buttons_custom_items': ['rotate'] },
      },
      player_buttons_custom_card_switch: {
         _tagName: 'select',
         label: 'Default card state',
         options: [
            {
               label: 'show', value: false, selected: true,
            },
            {
               label: 'hide', value: true,
            },
         ],
         'data-dependent': { 'player_buttons_custom_items': ['card-switch'] },
      },
      player_buttons_custom_screenshot: {
         _tagName: 'select',
         label: 'Default screenshot format',
         options: [
            {
               label: 'png', value: 'png', selected: true,
            },
            {
               label: 'jpg', value: 'jpg',
            },
         ],
         'data-dependent': { 'player_buttons_custom_items': ['screenshot'] },
      },
   }
});
window.nova_plugins.push({
   id: 'video-unblock-region',
   title: 'Try unblock if video not available in your country',
   'title:zh': '尝试解锁您所在地区的视频',
   'title:ja': 'お住まいの地域の動画のブロックを解除してみてください',
   'title:ko': '해당 지역의 동영상 차단을 해제해 보세요',
   'title:id': 'Coba buka blokir jika video tidak tersedia di negara Anda',
   'title:es': 'Intenta desbloquear videos para tu región',
   'title:pt': 'Tente desbloquear vídeos para sua região',
   'title:fr': 'Débloquer la vidéo de la région',
   'title:it': 'Prova a sbloccare se il video non è disponibile nel tuo paese',
   'title:de': 'Versuchen Sie, Videos für Ihre Region zu entsperren',
   'title:pl': 'Spróbuj odblokować, jeśli film nie jest dostępny w Twoim kraju',
   'title:ua': 'Спробувати розблокувати якщо відео не доступне у країні',
   run_on_pages: 'watch, -mobile',
   section: 'player',
   desc: 'Attempt fix "is not available in your country"',
   'desc:zh': '尝试修复“在您的国家不可用”',
   'desc:ja': '「お住まいの国では利用できません」という修正を試みる',
   'desc:ko': '수정 시도 "해당 국가에서는 사용할 수 없습니다"',
   'desc:id': 'Coba perbaiki "tidak tersedia di negara Anda"',
   'desc:es': 'Intento de corrección "no está disponible en su país"',
   'desc:pt': 'Tentativa de correção "não está disponível em seu país"',
   'desc:fr': 'Tentative de correction "n\'est pas disponible dans votre pays"',
   'desc:it': 'Tentativo di correzione "non è disponibile nel tuo paese"',
   'desc:de': 'Versuchen Sie, "ist in Ihrem Land nicht verfügbar" zu beheben',
   'desc:pl': 'Próba naprawienia nie jest dostępna w Twoim kraju',
   'desc:ua': 'Спроба розблокувати доступ до відео',
   _runtime: user_settings => {
      NOVA.waitSelector('ytd-watch-flexy[player-unavailable]', { stop_on_page_change: true })
         .then(el => el.querySelector('yt-player-error-message-renderer #button.yt-player-error-message-renderer button') || redirect());
      function redirect(new_tab_url) {
         if (new_tab_url) {
            window.open(`${location.protocol}//${user_settings.video_unblock_region_domain || 'hooktube.com'}${location.port ? ':' + location.port : ''}/watch?v=` + movie_player.getVideoData().video_id);
         }
         else {
            location.hostname = user_settings.video_unblock_region_domain || 'hooktube.com';
         }
         if (user_settings.video_unblock_region_open_map) {
            window.open(`https://watannetwork.com/tools/blocked/#url=${NOVA.queryURL.get('v')}:~:text=Allowed%20countries`);
         }
      }
   },
   options: {
      video_unblock_region_domain: {
         _tagName: 'input',
         label: 'URL',
         type: 'text',
         list: 'video_unblock_region_domain_help_list',
         pattern: "^[a-zA-Z0-9-]{2,20}\.[a-zA-Z]{2,5}$",
         title: 'without "https://"',
         'title:zh': '没有“https://”',
         'title:ja': '「https://」なし',
         'title:ko': '"https://" 없이',
         'title:id': 'tanpa "https://"',
         'title:es': 'sin "https://"',
         'title:pt': 'sem "https://"',
         'title:fr': 'sans "https://"',
         'title:it': 'senza "https://"',
         'title:de': 'ohne "https://"',
         'title:pl': 'bez „https://”',
         'title:ua': 'без "https://"',
         placeholder: 'hooktube.com',
         minlength: 5,
         maxlength: 20,
         required: true,
      },
      video_unblock_region_domain_help_list: {
         _tagName: 'datalist',
         options: [
            { label: 'hooktube.com', value: 'hooktube.com' },
            { label: 'clipzag.com', value: 'clipzag.com' },
            { label: 'piped.video', value: 'piped.video' },
            { label: 'yewtu.be', value: 'yewtu.be' },
         ],
      },
      video_unblock_region_open_map: {
         _tagName: 'input',
         label: 'Open map with availability in regions',
         'label:zh': '打开地图，显示区域可用性',
         'label:ja': '地域で利用可能なマップを開く',
         'label:ko': '지역에서 사용 가능한 지도 열기',
         'label:id': 'Buka peta dengan ketersediaan di wilayah',
         'label:es': 'Abrir mapa con disponibilidad en regiones',
         'label:pt': 'Abrir mapa com disponibilidade nas regiões',
         'label:fr': 'Carte ouverte avec disponibilité dans les régions',
         'label:it': 'Apri la mappa con la disponibilità nelle regioni',
         'label:de': 'Karte mit Verfügbarkeit in Regionen öffnen',
         'label:pl': 'Otwórz mapę z dostępnością w regionach',
         'label:ua': 'Відкрити карту з доступністю в регіонах',
         type: 'checkbox',
      },
   }
});
window.nova_plugins.push({
   id: 'subtitle-style',
   title: 'Subtitles (captions) style',
   'title:zh': '字幕样式',
   'title:ja': '字幕スタイル',
   'title:ko': '자막 스타일',
   'title:id': 'Gaya subtitel',
   'title:es': 'Estilo de subtítulos',
   'title:pt': 'estilo de legenda',
   'title:fr': 'Style de sous-titre',
   'title:it': 'Stile dei sottotitoli',
   'title:de': 'Untertitelstil',
   'title:pl': 'Styl napisów',
   'title:ua': 'Стиль субтитрів',
   run_on_pages: 'watch, embed, -mobile',
   section: 'player',
   _runtime: user_settings => {
      const SELECTOR = '.ytp-caption-segment';
      let css = {}
      if (user_settings.subtitle_transparent) {
         css = {
            'background': 'Transparent',
            'text-shadow':
               `rgb(0, 0, 0) 0 0 .1em,
               rgb(0, 0, 0) 0 0 .2em,
               rgb(0, 0, 0) 0 0 .4em`,
         };
      }
      if (user_settings.subtitle_bold) css['font-weight'] = 'bold';
      if (user_settings.subtitle_fixed) {
         NOVA.css.push(
            `.caption-window {
               margin-bottom: 1px !important;
               bottom: 1% !important;
            }`);
      }
      if (user_settings.subtitle_selectable) {
         NOVA.watchElements({
            selectors: [
               SELECTOR,
               '#caption-window-1',
            ]
               .map(i => i + ':not(:empty)'),
            callback: el => {
               el.addEventListener('mousedown', evt => evt.stopPropagation(), true);
               el.setAttribute('draggable', 'false');
               el.setAttribute('selectable', 'true');
               el.style.userSelect = 'text';
               el.style.WebkitUserSelect = 'text';
               el.style.cursor = 'text';
            }
         });
      }
      if (Object.keys(css).length) {
         NOVA.css.push(css, SELECTOR, 'important');
      }
   },
   options: {
      subtitle_transparent: {
         _tagName: 'input',
         label: 'Transparent',
         'label:zh': '透明的',
         'label:ja': '透明',
         'label:ko': '투명한',
         'label:id': 'Transparan',
         'label:es': 'Transparentes',
         'label:pt': 'Transparentes',
         'label:fr': 'Transparents',
         'label:it': 'Trasparenti',
         'label:de': 'Transparente',
         'label:pl': 'Przezroczyste',
         'label:ua': 'Прозорі',
         type: 'checkbox',
      },
      subtitle_bold: {
         _tagName: 'input',
         label: 'Bold text',
         'label:zh': '粗体',
         'label:ja': '太字',
         'label:ko': '굵은 텍스트',
         'label:id': 'Teks tebal',
         'label:es': 'Texto en negrita',
         'label:pt': 'Texto em negrito',
         'label:fr': 'Texte en gras',
         'label:it': 'Testo grassetto',
         'label:de': 'Fetter Text',
         'label:pl': 'Tekst pogrubiony',
         'label:ua': 'Жирний текст',
         type: 'checkbox',
      },
      subtitle_fixed: {
         _tagName: 'input',
         label: 'Fixed from below',
         'label:zh': '从下方固定',
         'label:ja': '下から固定',
         'label:ko': '아래에서 고정',
         'label:id': 'Diperbaiki dari bawah',
         'label:es': 'Fijado desde abajo',
         'label:pt': 'Fixo por baixo',
         'label:fr': 'Fixé par le bas',
         'label:it': 'Risolto dal basso',
         'label:de': 'Von unten befestigt',
         'label:pl': 'Przyklejone na dole',
         'label:ua': 'Фіксація знизу',
         type: 'checkbox',
         title: 'Preventing captions jumping up/down when pause/resume',
         'title:zh': '暂停/恢复时防止字幕跳上/跳下',
         'title:ja': '一時停止/再開時にキャプションが上下にジャンプしないようにする',
         'title:ko': '일시 중지/다시 시작 시 캡션이 위/아래로 점프하는 것을 방지',
         'title:id': 'Mencegah teks melompat ke atas/bawah saat menjeda/melanjutkan',
         'title:es': 'Evitar que los subtítulos salten hacia arriba/abajo al pausar/reanudar',
         'title:pt': 'Evitando que as legendas subam/descem ao pausar/reiniciar',
         'title:fr': "Empêcher les sous-titres de sauter vers le haut/bas lors d'une pause/reprise",
         'title:it': 'Prevenire i sottotitoli che saltano su/giù durante la pausa/ripresa',
         'title:de': 'Verhindern, dass Untertitel beim Anhalten/Fortsetzen nach oben/unten springen',
         'title:pl': 'Zapobieganie przeskakiwaniu napisów w górę/w dół podczas pauzy/wznowienia',
         'title:ua': 'Запобігання стрибкам титрів вгору/вниз під час паузи/продовження',
      },
      subtitle_selectable: {
         _tagName: 'input',
         label: 'Make selectable',
         'label:zh': '使字幕可选',
         'label:ja': '字幕を選択可能にする',
         'label:ko': '자막 선택 가능',
         'label:id': 'Jadikan subtitle dapat dipilih',
         'label:es': 'Hacer subtítulos seleccionables',
         'label:pt': 'Tornar as legendas selecionáveis',
         'label:fr': 'Rendre les sous-titres sélectionnables',
         'label:it': 'Rendi i sottotitoli selezionabili',
         'label:de': 'Untertitel auswählbar machen',
         'label:pl': 'Ustaw napisy do wyboru',
         'label:ua': 'Зробити субтитри доступними для виділення',
         type: 'checkbox',
      },
   }
});
window.nova_plugins.push({
   id: 'video-stop-preload',
   title: 'Stop video preload',
   'title:zh': '停止视频预加载',
   'title:ja': 'ビデオのプリロードを停止します',
   'title:ko': '비디오 미리 로드 중지',
   'title:id': 'Hentikan pramuat video',
   'title:es': 'Detener la precarga de video',
   'title:pt': 'Parar o pré-carregamento de vídeo',
   'title:fr': 'Arrêter le préchargement de la vidéo',
   'title:it': 'Interrompi il precaricamento del video',
   'title:de': 'Beenden Sie das Vorladen des Videos',
   'title:pl': 'Zatrzymaj ładowanie wideo',
   'title:ua': 'Зупинити передзавантаження відео',
   run_on_pages: 'watch, embed',
   section: 'player',
   desc: 'Prevent auto-buffering',
   _runtime: user_settings => {
      if (user_settings.stop_preload_embed && NOVA.currentPage != 'embed') return;
      if (location.hostname == 'youtube.googleapis.com') return;
      if (NOVA.queryURL.has('popup')) return;
      if (NOVA.currentPage == 'embed'
         && window.self !== window.top
         && ['0', 'false'].includes(NOVA.queryURL.get('autoplay'))
      ) {
         return;
      }
      NOVA.waitSelector('#movie_player')
         .then(async movie_player => {
            let disableStop;
            document.addEventListener('yt-navigate-start', () => disableStop = false);
            await NOVA.waitUntil(() => typeof movie_player === 'object' && typeof movie_player.stopVideo === 'function');
            movie_player.stopVideo();
            movie_player.addEventListener('onStateChange', onPlayerStateChange.bind(this));
            function onPlayerStateChange(state) {
               if (user_settings.stop_preload_ignore_playlist && location.search.includes('list=')) return;
               if (user_settings.stop_preload_ignore_live && movie_player.getVideoData().isLive) return;
               if (!disableStop && state > 0 && state < 5) {
                  movie_player.stopVideo();
               }
            }
            document.addEventListener('keyup', ({ code }) => (code == 'Space') && disableHoldStop());
            document.addEventListener('click', evt => {
               if (//movie_player.contains(document.activeElement) ||
                  evt.isTrusted
                  && ['button[class*="play-button"]', '.ytp-cued-thumbnail-overlay-image'].some(s => evt.srcElement.matches(s))
               ) {
                  disableHoldStop();
               }
            });
            function disableHoldStop() {
               if (!disableStop) {
                  disableStop = true;
                  movie_player.playVideo();
               }
            }
         });
   },
   options: {
      stop_preload_ignore_playlist: {
         _tagName: 'input',
         label: 'Ignore playlist',
         'label:zh': '忽略播放列表',
         'label:ja': 'プレイリストを無視する',
         'label:ko': '재생목록 무시',
         'label:id': 'Abaikan daftar putar',
         'label:es': 'Ignorar lista de reproducción',
         'label:pt': 'Ignorar lista de reprodução',
         'label:fr': 'Ignorer la liste de lecture',
         'label:it': 'Ignora playlist',
         'label:de': 'Wiedergabeliste ignorieren',
         'label:pl': 'Zignoruj listę odtwarzania',
         'label:ua': 'Ігнорувати список відтворення',
         type: 'checkbox',
         'data-dependent': { 'stop_preload_embed': false },
      },
      stop_preload_ignore_live: {
         _tagName: 'input',
         label: 'Ignore live',
         'label:ua': 'Ігнорувати живі трансляції',
         type: 'checkbox',
         'data-dependent': { 'stop_preload_embed': false },
      },
      stop_preload_embed: {
         _tagName: 'select',
         label: 'Apply to video type',
         'label:ua': 'Застосувати до відео',
         options: [
            {
               label: 'all', value: false, selected: true,
               'label:ua': 'всіх',
            },
            {
               label: 'embed', value: 'on',
               'label:ua': 'вбудованих',
            },
         ],
      },
   }
});
window.nova_plugins.push({
   id: 'player-resume-playback',
   title: 'Remember playback time',
   'title:zh': '恢复播放时间状态',
   'title:ja': '再生時間の位置を再開します',
   'title:ko': '재생 시간 위치 재개',
   'title:id': 'Lanjutkan posisi waktu pemutaran',
   'title:es': 'Reanudar posición de tiempo de reproducción',
   'title:pt': 'Retomar a posição do tempo de reprodução',
   'title:fr': 'Reprendre la position de temps de lecture',
   'title:it': 'Riprende la posizione del tempo di riproduzione',
   'title:de': 'Wiedergabezeitposition fortsetzen',
   'title:pl': 'Powrót do pozycji czasowej odtwarzania',
   'title:ua': 'Запам`ятати час відтворення',
   run_on_pages: 'watch, embed',
   section: 'player',
   desc: 'On page reload - resume playback',
   'desc:zh': '在页面重新加载 - 恢复播放',
   'desc:ja': 'ページがリロードされると、再生が復元されます',
   'desc:ko': '페이지 새로고침 시 - 재생 재개',
   'desc:id': 'Muat ulang halaman - lanjutkan pemutaran',
   'desc:es': 'En la recarga de la página - reanudar la reproducción',
   'desc:pt': 'Recarregar na página - retomar a reprodução',
   'desc:fr': 'Lors du rechargement de la page - reprendre la lecture',
   'desc:it': 'Ricarica alla pagina: riprende la riproduzione',
   'desc:de': 'Auf Seite neu laden - Wiedergabe fortsetzen',
   'desc:pl': 'Przy ponownym załadowaniu strony - wznawiaj odtwarzanie',
   'desc:ua': 'Після завантаження - продовжити відтворення',
   _runtime: user_settings => {
      if (!navigator.cookieEnabled && NOVA.currentPage == 'embed') return;
      const
         CACHE_PREFIX = 'nova-resume-playback-time',
         getCacheName = () => CACHE_PREFIX + ':' + (NOVA.queryURL.get('v') || movie_player.getVideoData().video_id);
      let cacheName;
      NOVA.waitSelector('video')
         .then(video => {
            cacheName = getCacheName();
            resumePlayback.apply(video);
            video.addEventListener('loadeddata', resumePlayback.bind(video));
            video.addEventListener('timeupdate', savePlayback.bind(video));
            video.addEventListener('ended', () => sessionStorage.removeItem(cacheName));
            if (user_settings.player_resume_playback_url_mark && NOVA.currentPage != 'embed') {
               if (NOVA.queryURL.has('t')) {
                  document.addEventListener('yt-navigate-finish',
                     connectSaveStateInURL.bind(video), { capture: true, once: true });
               }
               else {
                  connectSaveStateInURL.apply(video);
               }
            }
         });
      function savePlayback() {
         if (this.currentTime > 5 && this.duration > 30 && !movie_player.classList.contains('ad-showing')) {
            sessionStorage.setItem(cacheName, ~~this.currentTime);
         }
      }
      async function resumePlayback() {
         if (NOVA.queryURL.has('t')
            || (user_settings['save-channel-state'] && await NOVA.storage_obj_manager.getParam('ignore-playback'))
         ) {
            return;
         }
         cacheName = getCacheName();
         if ((time = +sessionStorage.getItem(cacheName))
            && (time < (this.duration - 1))
         ) {
            this.currentTime = time;
         }
      }
      function connectSaveStateInURL() {
         let delaySaveOnPauseURL;
         this.addEventListener('pause', () => {
            if (this.currentTime < (this.duration - 1) && this.currentTime > 5 && this.duration > 10) {
               delaySaveOnPauseURL = setTimeout(() => {
                  NOVA.updateUrl(NOVA.queryURL.set({ 't': ~~this.currentTime + 's' }));
               }, 100);
            }
         });
         this.addEventListener('play', () => {
            if (typeof delaySaveOnPauseURL === 'number') clearTimeout(delaySaveOnPauseURL);
            if (NOVA.queryURL.has('t')) NOVA.updateUrl(NOVA.queryURL.remove('t'));
         });
      }
   },
   options: {
      player_resume_playback_url_mark: {
         _tagName: 'input',
         label: 'Mark time in URL when paused',
         'label:zh': '暂停时在 URL 中节省时间',
         'label:ja': '一時停止したときにURLで時間を節約する',
         'label:ko': '일시 중지 시 URL에 시간 표시',
         'label:id': 'Tandai waktu di URL saat dijeda',
         'label:es': 'Marcar tiempo en URL cuando está en pausa',
         'label:pt': 'Marcar tempo no URL quando pausado',
         'label:fr': "Marquer l'heure dans l'URL en pause",
         'label:it': "Segna il tempo nell'URL quando è in pausa",
         'label:de': 'Zeit in URL markieren, wenn pausiert',
         'label:pl': 'Zaznacz czas w adresie URL po wstrzymaniu',
         'label:ua': 'Маркувати час в URL-посиланні під час паузи',
         type: 'checkbox',
         title: 'Makes sense when saving bookmarks',
         'title:zh': '保存书签时有意义',
         'title:ja': 'ブックマークを保存するときに意味があります',
         'title:ko': '북마크를 저장할 때 의미가 있습니다.',
         'title:id': 'Masuk akal saat menyimpan bookmark',
         'title:es': 'Tiene sentido al guardar marcadores',
         'title:pt': 'Faz sentido ao salvar favoritos',
         'title:fr': "Cela a du sens lors de l'enregistrement de signets",
         'title:it': 'Ha senso quando si salvano i segnalibri',
         'title:de': 'Sinnvoll beim Speichern von Lesezeichen',
         'title:pl': 'Ma sens podczas zapisywania zakładek',
         'title:ua': 'Має сенс при збереженні закладок',
      },
   }
});
window.nova_plugins.push({
   id: 'video-quality',
   title: 'Video quality',
   'title:zh': '视频质量',
   'title:ja': 'ビデオ品質',
   'title:ko': '비디오 품질',
   'title:id': 'Kualitas video',
   'title:es': 'Calidad de video',
   'title:pt': 'Qualidade de vídeo',
   'title:fr': 'Qualité vidéo',
   'title:it': 'Qualità video',
   'title:de': 'Videoqualität',
   'title:pl': 'Jakość wideo',
   'title:ua': 'Якість відео',
   run_on_pages: 'watch, embed',
   section: 'player',
   _runtime: user_settings => {
      const qualityFormatListWidth = {
         highres: 4320,
         hd2880: 2880,
         hd2160: 2160,
         hd1440: 1440,
         hd1080: 1080,
         hd720: 720,
         large: 480,
         medium: 360,
         small: 240,
         tiny: 144,
      };
      let selectedQuality = user_settings.video_quality;
      NOVA.waitSelector('#movie_player')
         .then(movie_player => {
            if (user_settings.video_quality_manual_save_in_tab
               && NOVA.currentPage == 'watch'
            ) {
               movie_player.addEventListener('onPlaybackQualityChange', quality => {
                  if (document.activeElement.getAttribute('role') == 'menuitemradio'
                     && quality !== selectedQuality
                  ) {
                     console.info(`keep quality "${quality}" in the session`);
                     selectedQuality = quality;
                     user_settings.video_quality_in_music_playlist = false;
                  }
               });
            }
            if (user_settings['save-channel-state']) {
               NOVA.runOnPageInitOrTransition(async () => {
                  if ((NOVA.currentPage == 'watch' || NOVA.currentPage == 'embed')
                     && (userQuality = await NOVA.storage_obj_manager.getParam('quality'))
                  ) {
                     selectedQuality = userQuality;
                  }
               });
            }
            setQuality();
            movie_player.addEventListener('onStateChange', setQuality);
         });
      function setQuality(state) {
         if (!selectedQuality) return console.error('selectedQuality unavailable', selectedQuality);
         if (user_settings.video_quality_in_music_playlist
            && location.search.includes('list=')
            && NOVA.isMusic()
         ) {
            selectedQuality = user_settings.video_quality_in_music_quality;
         }
         if (['PLAYING', 'BUFFERING'].includes(NOVA.getPlayerState(state)) && !setQuality.quality_busy) {
            setQuality.quality_busy = true;
            const waitQuality = setInterval(() => {
               let availableQualityLevels = movie_player.getAvailableQualityLevels();
               const maxWidth = (NOVA.currentPage == 'watch') ? window.screen.width : window.innerWidth;
               const maxQualityIdx = availableQualityLevels
                  .findIndex(i => qualityFormatListWidth[i] <= (maxWidth * 1.3));
               availableQualityLevels = availableQualityLevels.slice(maxQualityIdx);
               if (availableQualityLevels?.length) {
                  clearInterval(waitQuality);
                  const maxAvailableQuality = Math.max(availableQualityLevels.indexOf(selectedQuality), 0);
                  const newQuality = availableQualityLevels[maxAvailableQuality];
                  if (movie_player.hasOwnProperty('setPlaybackQuality')) {
                     movie_player.setPlaybackQuality(newQuality);
                  }
                  if (movie_player.hasOwnProperty('setPlaybackQualityRange')) {
                     movie_player.setPlaybackQualityRange(newQuality, newQuality);
                  }
               }
            }, 50);
         }
         else if (state <= 0) {
            setQuality.quality_busy = false;
         }
      }
      NOVA.waitSelector('.ytp-error [class*="reason"]', { stop_on_page_change: true })
         .then(error_reason_el => {
            if (alertText = error_reason_el.textContent) {
               throw alertText;
            }
         });
   },
   options: {
      video_quality: {
         _tagName: 'select',
         label: 'Default quality',
         'label:zh': '默认视频质量',
         'label:ja': 'デフォルトのビデオ品質',
         'label:ko': '기본 비디오 품질',
         'label:id': 'Kualitas bawaan',
         'label:es': 'Calidad predeterminada',
         'label:pt': 'Qualidade padrão',
         'label:fr': 'Qualité par défaut',
         'label:it': 'Qualità predefinita',
         'label:de': 'Standardvideoqualität',
         'label:pl': 'Domyślna jakość',
         'label:ua': 'Звичайна якість',
         title: 'If unavailable, set max available quality',
         'title:zh': '如果不可用，将选择可用的最高质量。',
         'title:ja': '利用できない場合は、利用可能な最高の品質が選択されます。',
         'title:ko': '사용할 수 없는 경우 사용 가능한 최대 품질을 설정합니다.',
         'title:id': 'Jika tidak tersedia, atur kualitas maksimal yang tersedia',
         'title:es': 'Si no está disponible, establezca la calidad máxima disponible',
         'title:pt': 'Se não estiver disponível, defina a qualidade máxima disponível',
         'title:fr': 'Si non disponible, définissez la qualité maximale disponible',
         'title:it': 'Se non disponibile, imposta la massima qualità disponibile',
         'title:pl': 'Jeśli nie dostępna, ustaw maksymalną dostępną jakość',
         'title:ua': 'Якщо недоступно, обрати максимальну доступну якість',
         options: [
            { label: '8K/4320p', value: 'highres' },
            { label: '4K/2160p', value: 'hd2160' },
            { label: 'QHD/1440p', value: 'hd1440' },
            { label: 'FHD/1080p', value: 'hd1080', selected: true },
            { label: 'HD/720p', value: 'hd720' },
            { label: 'SD/480p', value: 'large' },
            { label: 'SD/360p', value: 'medium' },
            { label: 'SD/240p', value: 'small' },
            { label: 'SD/144p', value: 'tiny' },
         ],
      },
      video_quality_manual_save_in_tab: {
         _tagName: 'input',
         label: 'Save manually selected for the same tab',
         'label:zh': '手动选择的质量保存在当前选项卡中',
         'label:ja': '手動で選択した品質が現在のタブに保存されます',
         'label:ko': '동일한 탭에 대해 수동으로 선택한 저장',
         'label:id': 'Simpan dipilih secara manual untuk tab yang sama',
         'label:es': 'Guardar seleccionado manualmente para la misma pestaña',
         'label:pt': 'Salvar selecionado manualmente para a mesma guia',
         'label:fr': 'Enregistrer sélectionné manuellement pour le même onglet',
         'label:it': 'Salva selezionato manualmente per la stessa scheda',
         'label:de': 'Manuell für dieselbe Registerkarte ausgewählt speichern',
         'label:pl': 'Właściwości dla obecnej karty',
         'label:ua': 'Зберігати власноруч обрану якість для вкладки',
         type: 'checkbox',
         title: 'Affects to next videos',
         'title:zh': '对下一个视频的影响',
         'title:ja': '次の動画への影響',
         'title:ko': '다음 동영상에 영향',
         'title:id': 'Mempengaruhi video berikutnya',
         'title:es': 'Afecta a los siguientes videos',
         'title:pt': 'Afeta para os próximos vídeos',
         'title:fr': 'Affecte aux prochaines vidéos',
         'title:it': 'Influisce sui prossimi video',
         'title:de': 'Beeinflusst die nächsten Videos',
         'title:pl': 'Zmiany w następnych filmach',
         'title:ua': 'Впливає на наступні відео',
      },
      video_quality_in_music_playlist: {
         _tagName: 'input',
         label: 'Diff quality for music in playlists',
         'label:ua': 'Змінити якість музики у списках відтворення',
         type: 'checkbox',
         title: 'to save traffic / increase speed',
         'title:zh': '节省流量/提高速度',
         'title:ja': 'トラフィックを節約/速度を上げる',
         'title:ko': '트래픽 절약 / 속도 향상',
         'title:id': 'untuk menghemat lalu lintas / meningkatkan kecepatan',
         'title:es': 'para ahorrar tráfico / aumentar la velocidad',
         'title:pt': 'para economizar tráfego / aumentar a velocidade',
         'title:fr': 'économiser du trafic / augmenter la vitesse',
         'title:it': 'per risparmiare traffico / aumentare la velocità',
         'title:de': 'um Verkehr zu sparen / Geschwindigkeit zu erhöhen',
         'title:pl': 'aby zaoszczędzić ruch / zwiększyć prędkość',
         'title:ua': 'для економії трафіку / збільшення швидкості',
      },
      video_quality_in_music_quality: {
         _tagName: 'select',
         label: 'Quality for music',
         'label:zh': '音乐品质',
         'label:ja': '音楽の品質',
         'label:ko': '음악 품질',
         'label:id': 'Kualitas untuk musik',
         'label:es': 'calidad para la musica',
         'label:pt': 'Qualidade para música',
         'label:fr': 'Qualité pour la musique',
         'label:it': 'Qualità per la musica',
         'label:de': 'Qualität für Musik',
         'label:pl': 'Jakość dla muzyki',
         'label:ua': 'Якість для музики',
         options: [
            { label: '8K/4320p', value: 'highres' },
            { label: '4K/2160p', value: 'hd2160' },
            { label: 'QHD/1440p', value: 'hd1440' },
            { label: 'FHD/1080p', value: 'hd1080' },
            { label: 'HD/720p', value: 'hd720' },
            { label: 'SD/480p', value: 'large', selected: true },
            { label: 'SD/360p', value: 'medium' },
            { label: 'SD/240p', value: 'small' },
            { label: 'SD/144p', value: 'tiny' },
         ],
         'data-dependent': { 'video_quality_in_music_playlist': true },
      },
   }
});
window.nova_plugins.push({
   id: 'player-pin-scroll',
   title: 'Pin player while scrolling',
   'title:zh': '滚动时固定播放器',
   'title:ja': 'スクロール中にプレイヤーを固定する',
   'title:ko': '스크롤하는 동안 플레이어 고정',
   'title:id': 'Sematkan pemutar saat menggulir',
   'title:es': 'Fijar jugador mientras se desplaza',
   'title:pt': 'Fixar jogador enquanto rola',
   'title:fr': 'Épingler le lecteur pendant le défilement',
   'title:it': 'Blocca il lettore durante lo scorrimento',
   'title:de': 'Pin-Player beim Scrollen',
   'title:pl': 'Przypnij odtwarzacz podczas przewijania',
   'title:ua': 'Закріпити відтворювач коли гортаєш сторінку',
   run_on_pages: 'watch, -mobile',
   section: 'player',
   desc: 'Mini player',
   _runtime: user_settings => {
      if (!('IntersectionObserver' in window)) return alert('Nova\n\nPin player Error!\nIntersectionObserver not supported.');
      const
         CLASS_VALUE = 'nova-player-pin',
         PINNED_SELECTOR = '.' + CLASS_VALUE,
         UNPIN_BTN_CLASS_VALUE = CLASS_VALUE + '-unpin-btn',
         UNPIN_BTN_SELECTOR = '.' + UNPIN_BTN_CLASS_VALUE;
      document.addEventListener('scroll', () => {
         NOVA.waitSelector('#ytd-player')
            .then(container => {
               new IntersectionObserver(([entry]) => {
                  if (entry.isIntersecting) {
                     movie_player.classList.remove(CLASS_VALUE);
                     drag.reset();
                  }
                  else if (!movie_player.isFullscreen()
                     && document.documentElement.scrollTop
                  ) {
                     movie_player.classList.add(CLASS_VALUE);
                     drag?.storePos?.X && drag.setTranslate(drag.storePos);
                  }
                  window.dispatchEvent(new Event('resize'));
               }, {
                  threshold: .5,
               })
                  .observe(container);
            });
      }, { capture: true, once: true });
      NOVA.waitSelector(PINNED_SELECTOR)
         .then(async player => {
            drag.init(player);
            await NOVA.waitUntil(
               () => (NOVA.videoElement?.videoWidth && !isNaN(NOVA.videoElement.videoWidth)
                  && NOVA.videoElement?.videoHeight && !isNaN(NOVA.videoElement.videoHeight)
               )
               , 500)
            initMiniStyles();
            insertUnpinButton(player);
            document.addEventListener('fullscreenchange', () => NOVA.isFullscreen() && movie_player.classList.remove(CLASS_VALUE));
            NOVA.waitSelector('#movie_player video')
               .then(video => {
                  video.addEventListener('loadeddata', () => {
                     if (NOVA.currentPage != 'watch') return;
                     NOVA.waitSelector(PINNED_SELECTOR)
                        .then(() => {
                           const width = NOVA.aspectRatio.calculateWidth(
                              movie_player.clientHeight,
                              NOVA.aspectRatio.chooseAspectRatio({
                                 'width': NOVA.videoElement.videoWidth,
                                 'height': NOVA.videoElement.videoHeight,
                                 'layout': 'landscape',
                              }),
                           );
                           player.style.setProperty('--width', `${width}px !important;`);
                        });
                  });
               });
            if (user_settings.player_float_scroll_after_fullscreen_restore_srcoll_pos) {
               let scrollPos = 0;
               document.addEventListener('fullscreenchange', () => {
                  if (!NOVA.isFullscreen()
                     && scrollPos
                     && drag.storePos
                  ) {
                     window.scrollTo({
                        top: scrollPos,
                     });
                  }
               });
               document.addEventListener('yt-action', function (evt) {
                  if (evt.detail?.actionName == 'yt-close-all-popups-action') {
                     scrollPos = document.documentElement.scrollTop;
                  }
               });
               document.addEventListener('yt-navigate-start', () => scrollPos = 0);
            }
         });
      function initMiniStyles() {
         const scrollbarWidth = (window.innerWidth - document.documentElement.clientWidth || 0) + 'px';
         const miniSize = NOVA.aspectRatio.sizeToFit({
            'srcWidth': NOVA.videoElement.videoWidth,
            'srcHeight': NOVA.videoElement.videoHeight,
            'maxWidth': (window.innerWidth / user_settings.player_float_scroll_size_ratio),
            'maxHeight': (window.innerHeight / user_settings.player_float_scroll_size_ratio),
         });
         let initcss = {
            width: NOVA.aspectRatio.calculateWidth(
               miniSize.height,
               NOVA.aspectRatio.chooseAspectRatio({ 'width': miniSize.width, 'height': miniSize.height })
            ) + 'px',
            height: miniSize.height + 'px',
            position: 'fixed',
            'z-index': 'var(--zIndex)',
            'box-shadow': '0 16px 24px 2px rgba(0, 0, 0, 0.14),' +
               '0 6px 30px 5px rgba(0, 0, 0, 0.12),' +
               '0 8px 10px -5px rgba(0, 0, 0, 0.4)',
         };
         switch (user_settings.player_float_scroll_position) {
            case 'top-left':
               initcss.top = user_settings['header-unfixed'] ? 0
                  : (document.getElementById('masthead-container')?.offsetHeight || 0) + 'px';
               initcss.left = 0;
               break;
            case 'top-right':
               initcss.top = user_settings['header-unfixed'] ? 0
                  : (document.getElementById('masthead-container')?.offsetHeight || 0) + 'px';
               initcss.right = scrollbarWidth;
               break;
            case 'bottom-left':
               initcss.bottom = 0;
               initcss.left = 0;
               break;
            case 'bottom-right':
               initcss.bottom = 0;
               initcss.right = scrollbarWidth;
               break;
         }
         NOVA.css.push(initcss, PINNED_SELECTOR, 'important');
         NOVA.css.push(
            PINNED_SELECTOR + `{
               --height: ${initcss.height} !important;
               --width: ${initcss.width} !important;
               width: var(--width) !important;
               height: var(--height) !important;
               background-color: var(--yt-spec-base-background);
            }
            ${PINNED_SELECTOR} video {
               object-fit: contain !important;
            }
            
            ${PINNED_SELECTOR} .ytp-chrome-controls .nova-right-custom-button,
            ${PINNED_SELECTOR} .ytp-chrome-controls #nova-player-time-remaining,
            ${PINNED_SELECTOR} .ytp-chrome-controls button.ytp-size-button,
            ${PINNED_SELECTOR} .ytp-chrome-controls button.ytp-subtitles-button,
            ${PINNED_SELECTOR} .ytp-chrome-controls button.ytp-settings-button,
            ${PINNED_SELECTOR} .ytp-chrome-controls .ytp-chapter-container {
               display: none !important;
            }`);
         NOVA.css.push(`
            ${PINNED_SELECTOR} .ytp-preview,
            ${PINNED_SELECTOR} .ytp-scrubber-container,
            ${PINNED_SELECTOR} .ytp-hover-progress,
            ${PINNED_SELECTOR} .ytp-gradient-bottom { display:none !important; }
            
            ${PINNED_SELECTOR} .ytp-chrome-bottom { width: 96% !important; }
            ${PINNED_SELECTOR} .ytp-chapters-container { display: flex; }`);
         NOVA.css.push(
            `${PINNED_SELECTOR} video {
               width: var(--width) !important;
               height: var(--height) !important;
               left: 0 !important;
               top: 0 !important;
            }
            .ended-mode video {
               visibility: hidden;
            }`);
      }
      function insertUnpinButton(player = movie_player) {
         NOVA.css.push(
            PINNED_SELECTOR + ` {
               --zIndex: ${1 + Math.max(
               NOVA.css.getValue('#chat', 'z-index'),
               NOVA.css.getValue('.ytp-chrome-top .ytp-cards-button', 'z-index'),
               NOVA.css.getValue('#chat', 'z-index'),
               601)};
            }
            ${UNPIN_BTN_SELECTOR} { display: none; }
            ${PINNED_SELECTOR} ${UNPIN_BTN_SELECTOR} {
               display: initial !important;
               position: absolute;
               cursor: pointer;
               top: 10px;
               left: 10px;
               width: 28px;
               height: 28px;
               color: white;
               border: none;
               outline: none;
               opacity: .1;
               
               z-index: var(--zIndex);
               font-size: 24px;
               font-weight: bold;
               background-color: rgba(0, 0, 0, 0.8);
               
            }
            ${PINNED_SELECTOR}:hover ${UNPIN_BTN_SELECTOR} { opacity: .7; }
            ${UNPIN_BTN_SELECTOR}:hover { opacity: 1 !important; }`);
         const btnUnpin = document.createElement('button');
         btnUnpin.className = UNPIN_BTN_CLASS_VALUE;
         btnUnpin.title = 'Unpin player';
         btnUnpin.textContent = '×';
         btnUnpin.addEventListener('click', () => {
            player.classList.remove(CLASS_VALUE);
            drag.reset('clear storePos');
            window.dispatchEvent(new Event('resize'));
         });
         player.append(btnUnpin);
         document.addEventListener('yt-navigate-start', () => {
            if (player.classList.contains(CLASS_VALUE)) {
               player.classList.remove(CLASS_VALUE);
               drag.reset();
            }
         });
      }
      const drag = {
         attrNametoLock: 'force-fix-preventDefault',
         reset(clear_storePos) {
            this.dragTarget?.style.removeProperty('transform');
            if (clear_storePos) this.storePos = this.xOffset = this.yOffset = 0;
            else this.storePos = { 'X': this.xOffset, 'Y': this.yOffset };
         },
         init(el_target = required()) {
            this.log('drag init', ...arguments);
            if (!(el_target instanceof HTMLElement)) return console.error('el_target not HTMLElement:', el_target);
            this.dragTarget = el_target;
            document.addEventListener('mousedown', evt => {
               if (!el_target.classList.contains(CLASS_VALUE)) return;
               this.dragStart.apply(this, [evt]);
            });
            document.addEventListener('mouseup', evt => {
               if (this.active) this.dragTarget.removeAttribute(this.attrNametoLock);
               this.dragEnd.apply(this, [evt]);
            });
            document.addEventListener('mousemove', evt => {
               if (this.active && !this.dragTarget.hasAttribute(this.attrNametoLock)) {
                  this.dragTarget.setAttribute(this.attrNametoLock, true);
               }
               this.draging.apply(this, [evt]);
            });
            NOVA.css.push(
               `[${this.attrNametoLock}]:active {
                  pointer-events: none;
               }`);
         },
         dragStart(evt) {
            if (!this.dragTarget.contains(evt.target)) return;
            this.log('dragStart');
            switch (evt.type) {
               case 'touchstart':
                  this.initialX = evt.touches[0].clientX - (this.xOffset || 0);
                  this.initialY = evt.touches[0].clientY - (this.yOffset || 0);
                  break;
               case 'mousedown':
                  this.initialX = evt.clientX - (this.xOffset || 0);
                  this.initialY = evt.clientY - (this.yOffset || 0);
                  break;
            }
            this.active = true;
            document.body.style.cursor = 'move';
         },
         dragEnd(evt) {
            if (!this.active) return;
            this.log('dragEnd');
            this.initialX = this.currentX;
            this.initialY = this.currentY;
            this.active = false;
            document.body.style.cursor = 'default';
         },
         draging(evt) {
            if (!this.active) return;
            evt.preventDefault();
            evt.stopImmediatePropagation();
            this.log('draging');
            switch (evt.type) {
               case 'touchmove':
                  this.currentX = evt.touches[0].clientX - this.initialX;
                  this.currentY = evt.touches[0].clientY - this.initialY;
                  break;
               case 'mousemove':
                  const
                     rect = this.dragTarget.getBoundingClientRect();
                  if (rect.left >= document.body.clientWidth - this.dragTarget.offsetWidth) {
                     this.currentX = Math.min(
                        evt.clientX - this.initialX,
                        document.body.clientWidth - this.dragTarget.offsetWidth - this.dragTarget.offsetLeft
                     );
                  }
                  else {
                     this.currentX = Math.max(evt.clientX - this.initialX, 0 - this.dragTarget.offsetLeft);
                  }
                  if (rect.top >= window.innerHeight - this.dragTarget.offsetHeight) {
                     this.currentY = Math.min(
                        evt.clientY - this.initialY,
                        window.innerHeight - this.dragTarget.offsetHeight - this.dragTarget.offsetTop
                     );
                  }
                  else {
                     this.currentY = Math.max(evt.clientY - this.initialY, 0 - this.dragTarget.offsetTop);
                  }
                  break;
            }
            this.xOffset = this.currentX;
            this.yOffset = this.currentY;
            this.setTranslate({ 'X': this.currentX, 'Y': this.currentY });
         },
         setTranslate({ X = required(), Y = required() }) {
            this.log('setTranslate', ...arguments);
            this.dragTarget.style.transform = `translate3d(${X}px, ${Y}px, 0)`;
         },
         log() {
            if (this.DEBUG && arguments.length) {
               console.groupCollapsed(...arguments);
               console.trace();
               console.groupEnd();
            }
         },
      };
   },
   options: {
      player_float_scroll_size_ratio: {
         _tagName: 'input',
         label: 'Player size',
         'label:zh': '播放器尺寸',
         'label:ja': 'プレーヤーのサイズ',
         'label:ko': '플레이어 크기',
         'label:id': 'Ukuran pemain',
         'label:es': 'Tamaño del jugador',
         'label:pt': 'Tamanho do jogador',
         'label:fr': 'Taille du joueur',
         'label:it': 'Dimensioni del giocatore',
         'label:de': 'Spielergröße',
         'label:pl': 'Rozmiar odtwarzacza',
         'label:ua': 'Розмір відтворювача',
         type: 'number',
         title: 'Less value - larger size',
         'title:zh': '较小的值 - 较大的尺寸',
         'title:ja': '小さい値-大きいサイズ',
         'title:ko': '더 작은 값 - 더 큰 크기',
         'title:id': 'Nilai lebih kecil - ukuran lebih besar',
         'title:es': 'Valor más pequeño - tamaño más grande',
         'title:pt': 'Valor menor - tamanho maior',
         'title:fr': 'Plus petite valeur - plus grande taille',
         'title:it': 'Meno valore - dimensioni maggiori',
         'title:de': 'Kleiner Wert - größere Größe',
         'title:pl': 'Mniejsza wartość - większy rozmiar',
         'title:ua': 'Менше значення - більший розмір',
         placeholder: '2-5',
         step: 0.1,
         min: 1,
         max: 5,
         value: 2.5,
      },
      player_float_scroll_position: {
         _tagName: 'select',
         label: 'Player position',
         'label:zh': '球员位置',
         'label:ja': 'プレイヤーの位置',
         'label:ko': '선수 위치',
         'label:id': 'Posisi pemain',
         'label:es': 'Posición de jugador',
         'label:pt': 'Posição do jogador',
         'label:fr': 'La position du joueur',
         'label:it': 'Posizione del giocatore',
         'label:de': 'Spielerposition',
         'label:pl': 'Pozycja odtwarzacza',
         'label:ua': 'Позиція відтворювача',
         options: [
            {
               label: 'Top left', value: 'top-left',
            },
            {
               label: 'Top right', value: 'top-right', selected: true,
            },
            {
               label: 'Bottom left', value: 'bottom-left',
            },
            {
               label: 'Bottom right', value: 'bottom-right',
            },
         ],
      },
      player_float_scroll_after_fullscreen_restore_srcoll_pos: {
         _tagName: 'input',
         label: 'Restore scrolling back there after exiting fullscreen',
         type: 'checkbox',
      },
   }
});
window.nova_plugins.push({
   id: 'video-autopause',
   title: 'Video autopause',
   'title:zh': '视频自动暂停',
   'title:ja': 'ビデオの自動一時停止',
   'title:ko': '비디오 자동 일시 중지',
   'title:id': 'Jeda otomatis video',
   'title:es': 'Pausa automática de video',
   'title:pt': 'Pausa automática de vídeo',
   'title:fr': 'Pause automatique de la vidéo',
   'title:it': 'Pausa automatica del video',
   'title:de': 'Automatische Pause des Videos',
   'title:pl': 'Automatyczne zatrzymanie wideo',
   'title:ua': 'Автопауза',
   run_on_pages: 'watch, embed',
   restart_on_location_change: true,
   section: 'player',
   desc: 'Disable autoplay',
   'desc:zh': '禁用自动播放',
   'desc:ja': '自動再生を無効にする',
   'desc:ko': '자동 재생 비활성화',
   'desc:it': 'Nonaktifkan putar otomatis',
   'desc:es': 'Deshabilitar reproducción automática',
   'desc:pt': 'Desativar reprodução automática',
   'desc:fr': 'Désactiver la lecture automatique',
   'desc:it': 'Disabilita la riproduzione automatica',
   'desc:de': 'Deaktiviere Autoplay',
   'desc:pl': 'Wyłącz autoodtwarzanie',
   'desc:ua': 'Вимкнути автовідтворення',
   _runtime: user_settings => {
      if (user_settings['video-stop-preload'] && !user_settings.stop_preload_embed) return;
      if (user_settings.video_autopause_embed && NOVA.currentPage != 'embed') return;
      if (NOVA.currentPage == 'embed'
         && window.self !== window.top
         && ['0', 'false'].includes(NOVA.queryURL.get('autoplay'))
      ) {
         return;
      }
      NOVA.waitSelector('#movie_player video')
         .then(video => {
            if (user_settings.video_autopause_ignore_live && movie_player.getVideoData().isLive) return;
            forceVideoPause.apply(video);
         });
      function forceVideoPause() {
         if (user_settings.video_autopause_ignore_playlist && location.search.includes('list=')) return;
         this.pause();
         const forceHoldPause = setInterval(() => this.paused || this.pause(), 200);
         document.addEventListener('keyup', ({ code }) => (code == 'Space') && stopForceHoldPause());
         document.addEventListener('click', evt => {
            if (//movie_player.contains(document.activeElement) ||
               evt.isTrusted
               && ['button[class*="play-button"]', '.ytp-cued-thumbnail-overlay-image'].some(s => evt.srcElement.matches(s))
            ) {
               stopForceHoldPause();
            }
         });
         function stopForceHoldPause() {
            clearInterval(forceHoldPause);
            movie_player.playVideo();
         }
      }
   },
   options: {
      video_autopause_ignore_playlist: {
         _tagName: 'input',
         label: 'Ignore playlist',
         'label:zh': '忽略播放列表',
         'label:ja': 'プレイリストを無視する',
         'label:ko': '재생목록 무시',
         'label:id': 'Abaikan daftar putar',
         'label:es': 'Ignorar lista de reproducción',
         'label:pt': 'Ignorar lista de reprodução',
         'label:fr': 'Ignorer la liste de lecture',
         'label:it': 'Ignora playlist',
         'label:de': 'Wiedergabeliste ignorieren',
         'label:pl': 'Zignoruj listę odtwarzania',
         'label:ua': 'Ігнорувати список відтворення',
         type: 'checkbox',
         'data-dependent': { 'video_autopause_embed': false },
      },
      video_autopause_ignore_live: {
         _tagName: 'input',
         label: 'Ignore live',
         'label:ua': 'Ігнорувти живі трансляції',
         type: 'checkbox',
         'data-dependent': { 'video_autopause_embed': false },
      },
      video_autopause_embed: {
         _tagName: 'select',
         label: 'Apply to video type',
         'label:ua': 'Застосувати до відео',
         options: [
            {
               label: 'all', value: false, selected: true,
               'label:ua': 'всіх',
            },
            {
               label: 'embed', value: 'on',
               'label:ua': 'вбудованих',
            },
         ],
      },
   }
});
window.nova_plugins.push({
   id: 'volume-wheel',
   title: 'Volume',
   'title:zh': '体积',
   'title:ja': '音量',
   'title:ko': '용량',
   'title:es': 'Volumen',
   'title:fr': 'Le volume',
   'title:de': 'Volumen',
   'title:pl': 'Głośność',
   'title:ua': 'Гучність',
   run_on_pages: 'watch, embed, -mobile',
   section: 'player',
   desc: 'With mouse wheel',
   'desc:zh': '带鼠标滚轮',
   'desc:ja': 'マウスホイール付き',
   'desc:ko': '마우스 휠로',
   'desc:id': 'Dengan roda mouse',
   'desc:es': 'Con rueda de ratón',
   'desc:pt': 'Com roda do mouse',
   'desc:fr': 'Avec molette de la souris',
   'desc:it': 'Con rotellina del mouse',
   'desc:de': 'Mit mausrad',
   'desc:pl': 'Za pomocą kółka myszy',
   'desc:ua': 'З допомогою колеса мишки',
   _runtime: user_settings => {
      NOVA.waitSelector('video')
         .then(video => {
            video.addEventListener('volumechange', function () {
               NOVA.bezelTrigger(movie_player.getVolume() + '%');
               playerVolume.buildVolumeSlider();
               if (user_settings.volume_mute_unsave) {
                  playerVolume.saveInSession(movie_player.getVolume());
               }
            });
            if (user_settings.volume_hotkey == 'keyboard') {
               document.addEventListener('keydown', evt => {
                  if (['input', 'textarea', 'select'].includes(evt.target.localName) || evt.target.isContentEditable) return;
                  if (evt.ctrlKey || evt.altKey || evt.shiftKey || evt.metaKey) return;
                  let delta;
                  switch (evt.key) {
                     case user_settings.volume_hotkey_custom_up: delta = 1; break;
                     case user_settings.volume_hotkey_custom_down: delta = -1; break;
                  }
                  if (delta) {
                     const rate = playerVolume.adjust(+user_settings.volume_step * Math.sign(delta));
                  }
               });
            }
            else if (user_settings.volume_hotkey) {
               document.body.querySelector('.html5-video-container')
                  .addEventListener('wheel', evt => {
                     evt.preventDefault();
                     if (evt[user_settings.volume_hotkey] || (user_settings.volume_hotkey == 'none' && !evt.ctrlKey && !evt.altKey && !evt.shiftKey && !evt.metaKey)) {
                        if (step = +user_settings.volume_step * Math.sign(evt.wheelDelta)) {
                           playerVolume.adjust(step);
                        }
                     }
                  });
            }
            if (+user_settings.volume_level_default) {
               playerVolume.set(+user_settings.volume_level_default);
            }
            if (user_settings['save-channel-state']) {
               NOVA.runOnPageInitOrTransition(async () => {
                  if ((NOVA.currentPage == 'watch' || NOVA.currentPage == 'embed')
                     && (userVolume = await NOVA.storage_obj_manager.getParam('volume'))
                  ) {
                     video.addEventListener('canplay', () => playerVolume.set(userVolume), { capture: true, once: true });
                  }
               });
            }
         });
      const playerVolume = {
         adjust(delta) {
            const level = movie_player?.getVolume() + +delta;
            return user_settings.volume_unlimit ? this.unlimit(level) : this.set(level);
         },
         set(level = 50) {
            if (typeof movie_player === 'undefined' || !movie_player.hasOwnProperty('getVolume')) return console.error('Error getVolume');
            const newLevel = Math.max(0, Math.min(100, +level));
            if (newLevel !== movie_player.getVolume()) {
               movie_player.isMuted() && movie_player.unMute();
               movie_player.setVolume(newLevel);
               if (newLevel === movie_player.getVolume()) {
                  this.saveInSession(newLevel);
               }
               else {
                  console.error('setVolumeLevel error! Different: %s!=%s', newLevel, movie_player.getVolume());
               }
            }
            return newLevel === movie_player.getVolume() && newLevel;
         },
         saveInSession(level = required()) {
            const storageData = {
               creation: Date.now(),
               data: { 'volume': +level, 'muted': (level ? 'false' : 'true') },
            };
            try {
               localStorage['yt-player-volume'] = JSON.stringify(
                  Object.assign({ expiration: Date.now() + 2592e6 }, storageData)
               );
               sessionStorage['yt-player-volume'] = JSON.stringify(storageData);
            } catch (err) {
               console.warn(`${err.name}: save "volume" in sessionStorage failed. It seems that "Block third-party cookies" is enabled`, err.message);
            }
         },
         unlimit(level = 300) {
            if (level > 100) {
               if (!this.audioCtx) {
                  this.audioCtx = new AudioContext();
                  const source = this.audioCtx.createMediaElementSource(NOVA.videoElement);
                  this.node = this.audioCtx.createGain();
                  this.node.gain.value = 1;
                  source.connect(this.node);
                  this.node.connect(this.audioCtx.destination);
               }
               if (this.node.gain.value < 7) this.node.gain.value += 1;
               NOVA.bezelTrigger(movie_player.getVolume() * this.node.gain.value + '%');
            }
            else {
               if (this.audioCtx && this.node.gain.value !== 1) {
                  this.node.gain.value = 1;
               }
               this.set(level);
            }
         },
         buildVolumeSlider(timeout_ms = 800) {
            if (volumeArea = movie_player?.querySelector('.ytp-volume-area')) {
               if (typeof this.showTimeout === 'number') clearTimeout(this.showTimeout);
               volumeArea.dispatchEvent(new Event('mouseover', { bubbles: true }));
               this.showTimeout = setTimeout(() =>
                  volumeArea.dispatchEvent(new Event('mouseout', { bubbles: true }))
                  , timeout_ms);
               insertToHTML({
                  'text': Math.round(movie_player.getVolume()),
                  'container': volumeArea,
               });
            }
            function insertToHTML({ text = '', container = required() }) {
               if (!(container instanceof HTMLElement)) return console.error('container not HTMLElement:', container);
               const SELECTOR_ID = 'nova-volume-text';
               (document.getElementById(SELECTOR_ID) || (function () {
                  const SELECTOR = '#' + SELECTOR_ID;
                  NOVA.css.push(`
                     ${SELECTOR} {
                        display: none;
                        text-indent: 2px;
                        font-size: 110%;
                        text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
                        cursor: default;
                     }
                     ${SELECTOR}:after { content: '%'; }
                     .ytp-volume-control-hover:not([aria-valuenow="0"])+${SELECTOR} {
                        display: block;
                     }`)
                  const el = document.createElement('span');
                  el.id = SELECTOR_ID;
                  container.insertAdjacentElement('beforeend', el);
                  return el;
               })())
                  .textContent = text;
               container.title = `${text} %`;
            }
         }
      };
   },
   options: {
      volume_level_default: {
         _tagName: 'input',
         label: 'Default level',
         'label:zh': '默认音量',
         'label:ja': 'デフォルトのボリューム',
         'label:ko': '기본 볼륨',
         'label:id': 'Tingkat default',
         'label:es': 'Volumen predeterminado',
         'label:pt': 'Volume padrão',
         'label:fr': 'Volume par défaut',
         'label:it': 'Livello predefinito',
         'label:de': 'Standardlautstärke',
         'label:pl': 'Poziom domyślny',
         'label:ua': 'Базовий рівень',
         type: 'number',
         title: '0 - auto',
         placeholder: '%',
         step: 1,
         min: 0,
         max: 100,
         value: 100,
      },
      volume_step: {
         _tagName: 'input',
         label: 'Step',
         'label:zh': '步',
         'label:ja': 'ステップ',
         'label:ko': '단계',
         'label:id': 'Melangkah',
         'label:es': 'Paso',
         'label:pt': 'Degrau',
         'label:fr': 'Étape',
         'label:it': 'Fare un passo',
         'label:de': 'Schritt',
         'label:pl': 'Krok',
         'label:ua': 'Крок',
         type: 'number',
         title: 'in %',
         placeholder: '%',
         step: 5,
         min: 5,
         max: 30,
         value: 10,
      },
      volume_hotkey: {
         _tagName: 'select',
         label: 'Hotkey',
         'label:zh': '热键',
         'label:ja': 'ホットキー',
         'label:ko': '단축키',
         'label:id': 'Tombol pintas',
         'label:es': 'Tecla de acceso rápido',
         'label:pt': 'Tecla de atalho',
         'label:fr': 'Raccourci',
         'label:it': 'Tasto di scelta rapida',
         'label:de': 'Schnelltaste',
         'label:pl': 'Klawisz skrótu',
         'label:ua': 'Гаряча клавіша',
         options: [
            { label: 'wheel', value: 'none', selected: true },
            { label: 'shift+wheel', value: 'shiftKey' },
            { label: 'ctrl+wheel', value: 'ctrlKey' },
            { label: 'alt+wheel', value: 'altKey' },
            { label: 'keyboard', value: 'keyboard' },
            { label: 'disable', value: false },
         ],
      },
      volume_hotkey_custom_up: {
         _tagName: 'select',
         label: 'Hotkey up',
         options: [
            { label: ']', value: ']', selected: true },
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '[', '+', '-', ',', '.', '/', '<', ';', '\\'
         ],
         'data-dependent': { 'volume_hotkey': ['keyboard'] },
      },
      volume_hotkey_custom_down: {
         _tagName: 'select',
         label: 'Hotkey down',
         options: [
            { label: '[', value: '[', selected: true },
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ']', '+', '-', ',', '.', '/', '<', ';', '\\'
         ],
         'data-dependent': { 'volume_hotkey': ['keyboard'] },
      },
      volume_unlimit: {
         _tagName: 'input',
         label: 'Allow above 100%',
         'label:zh': '允许超过 100%',
         'label:ja': '100％以上を許可する',
         'label:ko': '100% 이상 허용',
         'label:id': 'Izinkan di atas 100%',
         'label:es': 'Permitir por encima del 100%',
         'label:pt': 'Permitir acima de 100%',
         'label:fr': 'Autoriser au-dessus de 100 %',
         'label:it': 'Consenti oltre il 100%',
         'label:de': 'Über 100 % zulassen',
         'label:pl': 'Zezwól powyżej 100%',
         'label:ua': 'Дозволити більше 100%',
         type: 'checkbox',
      },
      volume_mute_unsave: {
         _tagName: 'input',
         label: 'Not keep muted state',
         'label:zh': '不保存静音模式',
         'label:ja': 'マナーモードを保存しない',
         'label:ko': '무음 모드를 저장하지 않음',
         'label:id': 'Jangan simpan mode senyap',
         'label:es': 'No guarde el modo silencioso',
         'label:pt': 'Não salve o modo silencioso',
         'label:fr': 'Ne pas enregistrer le mode silencieux',
         'label:it': 'Non salvare la modalità silenziosa',
         'label:de': 'Silent-Modus nicht speichern',
         'label:pl': 'Nie zachowuj wyciszonego stanu',
         'label:ua': 'Не зберігати беззвучний режим',
         type: 'checkbox',
         title: 'Only affects new tabs',
         'title:zh': '只影响新标签',
         'title:ja': '新しいタブにのみ影響します',
         'title:ko': '새 탭에만 영향',
         'title:id': 'Hanya memengaruhi tab baru',
         'title:es': 'Solo afecta a las pestañas nuevas',
         'title:pt': 'Afeta apenas novas guias',
         'title:fr': "N'affecte que les nouveaux onglets",
         'title:it': 'Riguarda solo le nuove schede',
         'title:de': 'Wirkt sich nur auf neue Registerkarten aus',
         'title:pl': 'Dotyczy tylko nowych kart',
         'title:ua': 'Діє лише на нові вкладки',
      },
   }
});
window.nova_plugins.push({
   id: 'rate-wheel',
   title: 'Playback speed control',
   'title:zh': '播放速度控制',
   'title:ja': '再生速度制御',
   'title:ko': '재생 속도 제어',
   'title:id': 'Kontrol kecepatan pemutaran',
   'title:es': 'Controle de velocidade de reprodução',
   'title:pt': 'Controle de velocidade de reprodução',
   'title:fr': 'Contrôle de la vitesse de lecture',
   'title:it': 'Controllo della velocità di riproduzione',
   'title:de': 'Steuerung der Wiedergabegeschwindigkeit',
   'title:pl': 'Kontrola prędkości odtwarzania',
   'title:ua': 'Контроль швидкості відтворення',
   run_on_pages: 'watch, embed',
   section: 'player',
   desc: 'With mouse wheel',
   'desc:zh': '带鼠标滚轮',
   'desc:ja': 'マウスホイール付き',
   'desc:ko': '마우스 휠로',
   'desc:id': 'Dengan roda mouse',
   'desc:es': 'Con rueda de ratón',
   'desc:pt': 'Com roda do mouse',
   'desc:fr': 'Avec molette de la souris',
   'desc:it': 'Con rotellina del mouse',
   'desc:de': 'Mit mausrad',
   'desc:pl': 'Za pomocą kółka myszy',
   'desc:ua': 'За допомогою колеса мишки',
   _runtime: user_settings => {
      NOVA.waitSelector('#movie_player video')
         .then(video => {
            const sliderContainer = insertSlider.apply(video);
            video.addEventListener('ratechange', function () {
               NOVA.bezelTrigger(this.playbackRate + 'x');
               if (Object.keys(sliderContainer).length) {
                  sliderContainer.slider.value = this.playbackRate;
                  sliderContainer.sliderLabel.textContent = `Speed (${this.playbackRate})`;
                  sliderContainer.sliderCheckbox.checked = (this.playbackRate === 1) ? false : true;
               }
            });
            setDefaultRate.apply(video);
            video.addEventListener('loadeddata', setDefaultRate);
            if (Object.keys(sliderContainer).length) {
               sliderContainer.slider.addEventListener('input', ({ target }) => playerRate.set(target.value));
               sliderContainer.slider.addEventListener('change', ({ target }) => playerRate.set(target.value));
               sliderContainer.slider.addEventListener('wheel', evt => {
                  evt.preventDefault();
                  const rate = playerRate.adjust(+user_settings.rate_step * Math.sign(evt.wheelDelta));
               });
               sliderContainer.sliderCheckbox.addEventListener('change', ({ target }) => {
                  target.checked || playerRate.set(1)
               });
            }
            NOVA.runOnPageInitOrTransition(async () => {
               if (NOVA.currentPage == 'watch' || NOVA.currentPage == 'embed') {
                  if (user_settings['save-channel-state']) {
                     if (userRate = await NOVA.storage_obj_manager.getParam('speed')) {
                        video.addEventListener('canplay', () => playerRate.set(userRate), { capture: true, once: true });
                     }
                  }
                  expandAvailableRatesMenu();
               }
            });
         });
      if (user_settings.rate_hotkey == 'keyboard') {
         document.addEventListener('keydown', evt => {
            if (['input', 'textarea', 'select'].includes(evt.target.localName) || evt.target.isContentEditable) return;
            if (evt.ctrlKey || evt.altKey || evt.shiftKey || evt.metaKey) return;
            let delta;
            switch (evt.key) {
               case user_settings.rate_hotkey_custom_up: delta = 1; break;
               case user_settings.rate_hotkey_custom_down: delta = -1; break;
            }
            if (delta) {
               const rate = playerRate.adjust(+user_settings.rate_step * Math.sign(delta));
            }
         });
      }
      else if (user_settings.rate_hotkey) {
         NOVA.waitSelector('.html5-video-container')
            .then(container => {
               container.addEventListener('wheel', evt => {
                  evt.preventDefault();
                  if (evt[user_settings.rate_hotkey]
                     || (user_settings.rate_hotkey == 'none' && !evt.ctrlKey && !evt.altKey && !evt.shiftKey && !evt.metaKey)) {
                     const rate = playerRate.adjust(+user_settings.rate_step * Math.sign(evt.wheelDelta));
                  }
               });
            });
      }
      if (+user_settings.rate_default !== 1 && user_settings.rate_default_apply_music) {
         NOVA.waitSelector('#upload-info #channel-name .badge-style-type-verified-artist')
            .then(icon => playerRate.set(1));
         NOVA.waitSelector('#upload-info #channel-name a[href]', { stop_on_page_change: true })
            .then(channelName => {
               if (/(VEVO|Topic|Records|AMV)$/.test(channelName.textContent)
                  || channelName.textContent.toUpperCase().includes('MUSIC')
               ) {
                  playerRate.set(1);
               }
            });
      }
      const playerRate = {
         testDefault: rate => (+rate % .25) === 0
            && +rate <= 2
            && +user_settings.rate_default <= 2
            && (typeof movie_player !== 'undefined' && movie_player.hasOwnProperty('getPlaybackRate')),
         async set(level = 1) {
            this.log('set', ...arguments);
            if (this.testDefault(level)) {
               this.log('set:default');
               movie_player.setPlaybackRate(+level) && this.saveInSession(level);
            }
            else {
               this.log('set:html5');
               if (NOVA.videoElement) {
                  NOVA.videoElement.playbackRate = +level;
                  this.clearInSession();
               }
            }
         },
         adjust(rate_step = required()) {
            this.log('adjust', ...arguments);
            return this.testDefault(rate_step) ? this.default(+rate_step) : this.html5(+rate_step);
         },
         default(playback_rate = required()) {
            this.log('default', ...arguments);
            const playbackRate = movie_player.getPlaybackRate();
            const inRange = step => {
               const setRateStep = playbackRate + step;
               return (.1 <= setRateStep && setRateStep <= 2) && +setRateStep.toFixed(2);
            };
            const newRate = inRange(+playback_rate);
            if (newRate && newRate != playbackRate) {
               movie_player.setPlaybackRate(newRate);
               if (newRate === movie_player.getPlaybackRate()) {
                  this.saveInSession(newRate);
               }
               else {
                  console.error('playerRate:default different: %s!=%s', newRate, movie_player.getPlaybackRate());
               }
            }
            this.log('default return', newRate);
            return newRate === movie_player.getPlaybackRate() && newRate;
         },
         html5(playback_rate = required()) {
            this.log('html5', ...arguments);
            if (!NOVA.videoElement) return console.error('playerRate > videoElement empty:', NOVA.videoElement);
            const playbackRate = NOVA.videoElement.playbackRate;
            const inRange = step => {
               const setRateStep = playbackRate + step;
               return (.1 <= setRateStep && setRateStep <= 3) && +setRateStep.toFixed(2);
            };
            const newRate = inRange(+playback_rate);
            if (newRate && newRate != playbackRate) {
               NOVA.videoElement.playbackRate = newRate;
               if (newRate === NOVA.videoElement.playbackRate) {
                  this.clearInSession();
               }
               else {
                  console.error('playerRate:html5 different: %s!=%s', newRate, NOVA.videoElement.playbackRate);
               }
            }
            this.log('html5 return', newRate);
            return newRate === NOVA.videoElement.playbackRate && newRate;
         },
         saveInSession(level = required()) {
            try {
               sessionStorage['yt-player-playback-rate'] = JSON.stringify({
                  creation: Date.now(), data: level.toString(),
               })
               this.log('playbackRate save in session:', ...arguments);
            } catch (err) {
               console.warn(`${err.name}: save "rate" in sessionStorage failed. It seems that "Block third-party cookies" is enabled`, err.message);
            }
         },
         clearInSession() {
            const keyName = 'yt-player-playback-rate';
            try {
               sessionStorage.hasOwnProperty(keyName) && sessionStorage.removeItem(keyName);
               this.log('playbackRate save in session:', ...arguments);
            } catch (err) {
               console.warn(`${err.name}: save "rate" in sessionStorage failed. It seems that "Block third-party cookies" is enabled`, err.message);
            }
         },
         log() {
            if (this.DEBUG && arguments.length) {
               console.groupCollapsed(...arguments);
               console.trace();
               console.groupEnd();
            }
         },
      };
      function setDefaultRate() {
         if (+user_settings.rate_default !== 1) {
            const is_music = NOVA.isMusic();
            if (this.playbackRate !== +user_settings.rate_default
               && (!user_settings.rate_default_apply_music || !is_music)
               && (!isNaN(this.duration) && this.duration > 25)
            ) {
               playerRate.set(user_settings.rate_default);
            }
            else if (this.playbackRate !== 1 && is_music) {
               playerRate.set(1);
            }
         }
      }
      function insertSlider() {
         const
            SELECTOR_ID = 'nova-rate-slider-menu',
            SELECTOR = '#' + SELECTOR_ID;
         NOVA.css.push(
            `${SELECTOR} [type="range"] {
               vertical-align: text-bottom;
               margin: '0 5px',
            }
            ${SELECTOR} [type="checkbox"] {
               appearance: none;
               outline: none;
               cursor: pointer;
            }
            ${SELECTOR} [type="checkbox"]:checked {
               background: #f00;
            }
            ${SELECTOR} [type="checkbox"]:checked:after {
               left: 20px;
               background-color: #fff;
            }`);
         const slider = document.createElement('input');
         slider.className = 'ytp-menuitem-slider';
         slider.type = 'range';
         slider.min = +user_settings.rate_step;
         slider.max = Math.max(2, +user_settings.rate_default);
         slider.step = +user_settings.rate_step;
         slider.value = this.playbackRate;
         const sliderIcon = document.createElement('div');
         sliderIcon.className = 'ytp-menuitem-icon';
         const sliderLabel = document.createElement('div');
         sliderLabel.className = 'ytp-menuitem-label';
         sliderLabel.textContent = `Speed (${this.playbackRate})`;
         const sliderCheckbox = document.createElement('input');
         sliderCheckbox.className = 'ytp-menuitem-toggle-checkbox';
         sliderCheckbox.type = 'checkbox';
         sliderCheckbox.title = 'Remember speed';
         const out = {};
         const right = document.createElement('div');
         right.className = 'ytp-menuitem-content';
         out.sliderCheckbox = right.appendChild(sliderCheckbox);
         out.slider = right.appendChild(slider);
         const speedMenu = document.createElement('div');
         speedMenu.className = 'ytp-menuitem';
         speedMenu.id = SELECTOR_ID;
         speedMenu.append(sliderIcon);
         out.sliderLabel = speedMenu.appendChild(sliderLabel);
         speedMenu.append(right);
         document.body.querySelector('.ytp-panel-menu')
            ?.append(speedMenu);
         return out;
      }
      function expandAvailableRatesMenu() {
         if (typeof _yt_player !== 'object') {
            return console.error('expandAvailableRatesMenu > _yt_player is empty', _yt_player);
         }
         if (path = findPathInObj({ 'obj': _yt_player, 'keys': 'getAvailablePlaybackRates' })) {
            setAvailableRates(_yt_player, 0, path.split('.'));
         }
         function findPathInObj({ obj = required(), keys = required(), path }) {
            const setPath = d => (path ? path + '.' : '') + d;
            for (const prop in obj) {
               if (obj.hasOwnProperty(prop) && obj[prop]) {
                  if (keys === prop) {
                     return this.path = setPath(prop)
                  }
                  if (obj[prop].constructor.name == 'Function' && Object.keys(obj[prop]).length) {
                     for (const j in obj[prop]) {
                        if (typeof obj[prop] !== 'undefined') {
                           findPathInObj({
                              'obj': obj[prop][j],
                              'keys': keys,
                              'path': setPath(prop) + '.' + j,
                           });
                        }
                        if (this.path) return this.path;
                     }
                  }
               }
            }
         }
         function setAvailableRates(path, idx, arr) {
            if (arr.length - 1 == idx) {
               path[arr[idx]] = () => [.25, .5, .75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4, 10];
            }
            else {
               setAvailableRates(path[arr[idx]], idx + 1, arr);
            }
         }
      }
   },
   options: {
      rate_default: {
         _tagName: 'input',
         label: 'Speed at startup',
         'label:zh': '启动速度',
         'label:ja': '起動時の速度',
         'label:ko': '시작 시 속도',
         'label:id': 'Kecepatan saat startup',
         'label:es': 'Velocidad al inicio',
         'label:pt': 'Velocidade na inicialização',
         'label:fr': 'Rapidité au démarrage',
         'label:it': "Velocità all'avvio",
         'label:de': 'Geschwindigkeit beim Start',
         'label:pl': 'Prędkość przy uruchamianiu',
         'label:ua': 'Звичайна швидкість',
         type: 'number',
         title: '1 - default',
         step: 0.05,
         min: 1,
         value: 1,
      },
      rate_default_apply_music: {
         _tagName: 'select',
         label: 'For music genre',
         title: 'Extended detection - may trigger falsely',
         'title:zh': '扩展检测 - 可能会错误触发',
         'title:ja': '拡張検出-誤ってトリガーされる可能性があります',
         'title:ko': '확장 감지 - 잘못 트리거될 수 있음',
         'title:id': 'Deteksi diperpanjang - dapat memicu salah',
         'title:pt': 'Detecção estendida - pode disparar falsamente',
         'title:fr': 'Détection étendue - peut se déclencher par erreur',
         'title:it': 'Rilevamento esteso - potrebbe attivarsi in modo errato',
         'title:de': 'Erweiterte Erkennung - kann fälschlicherweise auslösen',
         'title:pl': 'Rozszerzona detekcja - może działać błędnie',
         'title:ua': 'Розширене виявлення - може спрацювати помилково',
         options: [
            {
               label: 'skip', value: true, selected: true,
               'label:zh': '跳过',
               'label:ja': 'スキップ',
               'label:ko': '건너 뛰기',
               'label:id': 'merindukan',
               'label:es': 'saltar',
               'label:pt': 'pular',
               'label:fr': 'sauter',
               'label:it': 'Perdere',
               'label:de': 'überspringen',
               'label:pl': 'tęsknić',
               'label:ua': 'пропустити',
            },
            {
               label: 'force apply', value: false,
               'label:zh': '施力',
               'label:ja': '力を加える',
               'label:ko': '강제 적용',
               'label:id': 'berlaku paksa',
               'label:es': 'aplicar fuerza',
               'label:pt': 'aplicar força',
               'label:fr': 'appliquer la force',
               'label:it': 'applicare la forza',
               'label:de': 'kraft anwenden',
               'label:pl': 'zastosować siłę',
               'label:ua': 'примусово активувати',
            },
         ],
         'data-dependent': { 'rate_default': '!1' },
      },
      rate_step: {
         _tagName: 'input',
         label: 'Step',
         'label:zh': '步',
         'label:ja': 'ステップ',
         'label:ko': '단계',
         'label:id': 'Melangkah',
         'label:es': 'Paso',
         'label:pt': 'Degrau',
         'label:fr': 'Étape',
         'label:it': 'Fare un passo',
         'label:de': 'Schritt',
         'label:pl': 'Krok',
         'label:ua': 'Крок',
         type: 'number',
         title: '0.25 - default',
         placeholder: '0.1-1',
         step: 0.05,
         min: 0.1,
         max: 0.5,
         value: 0.25,
      },
      rate_hotkey: {
         _tagName: 'select',
         label: 'Hotkey',
         'label:zh': '热键',
         'label:ja': 'ホットキー',
         'label:ko': '단축키',
         'label:id': 'Tombol pintas',
         'label:es': 'Tecla de acceso rápido',
         'label:pt': 'Tecla de atalho',
         'label:fr': 'Raccourci',
         'label:it': 'Tasto di scelta rapida',
         'label:de': 'Schnelltaste',
         'label:pl': 'Klawisz skrótu',
         'label:ua': 'Гаряча клавіша',
         options: [
            { label: 'alt+wheel', value: 'altKey', selected: true },
            { label: 'shift+wheel', value: 'shiftKey' },
            { label: 'ctrl+wheel', value: 'ctrlKey' },
            { label: 'wheel', value: 'none' },
            { label: 'keyboard', value: 'keyboard' },
            { label: 'disable', value: false },
         ],
      },
      rate_hotkey_custom_up: {
         _tagName: 'select',
         label: 'Hotkey up',
         options: [
            { label: ']', value: ']', selected: true },
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '[', '+', '-', ',', '.', '/', '<', ';', '\\'
         ],
         'data-dependent': { 'rate_hotkey': ['keyboard'] },
      },
      rate_hotkey_custom_down: {
         _tagName: 'select',
         label: 'Hotkey down',
         options: [
            { label: '[', value: '[', selected: true },
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ']', '+', '-', ',', '.', '/', '<', ';', '\\'
         ],
         'data-dependent': { 'rate_hotkey': ['keyboard'] },
      },
   }
});
window.nova_plugins.push({
   id: 'pause-background-tab',
   title: 'Autopause when switching tabs',
   'title:zh': '自动暂停除活动选项卡以外的所有选项卡',
   'title:ja': 'アクティブなタブを除くすべてのタブを自動一時停止',
   'title:ko': '활성 탭을 제외한 모든 탭 자동 일시 중지',
   'title:id': 'Jeda otomatis semua tab latar belakang kecuali yang aktif',
   'title:es': 'Pausar automáticamente todas las pestañas excepto la activa',
   'title:pt': 'Pausar automaticamente todas as guias, exceto a ativa',
   'title:fr': "Interrompt la lecture des vidéos dans d'autres onglets",
   'title:it': 'Metti automaticamente in pausa tutte le schede in background tranne quella attiva',
   'title:de': 'Alle Tabs außer dem aktiven automatisch pausieren',
   'title:pl': 'Zatrzymanie kart w tle oprócz aktywnej',
   'title:ua': 'Автопауза усіх фонових вкладок окрім активної',
   run_on_pages: 'watch, embed',
   section: 'player',
   desc: 'Autopause all background tabs except the active one',
   'desc:ua': 'Автоматично призупинити всі фонові вкладки, крім активної. Підтримує iframe та інші вікна',
   _runtime: user_settings => {
      if (location.hostname.includes('youtube-nocookie.com')) location.hostname = 'youtube.com';
      if (typeof window === 'undefined') return;
      const
         storeName = 'nova-playing-instanceIDTab',
         instanceID = String(Math.random()),
         removeStorage = () => localStorage.removeItem(storeName);
      NOVA.waitSelector('video')
         .then(video => {
            video.addEventListener('play', checkInstance);
            video.addEventListener('playing', checkInstance);
            ['pause', 'ended'].forEach(evt => video.addEventListener(evt, removeStorage));
            window.addEventListener('beforeunload', removeStorage);
            window.addEventListener('storage', store => {
               if ((!document.hasFocus() || NOVA.currentPage == 'embed')
                  && store.key === storeName && store.storageArea === localStorage
                  && localStorage.hasOwnProperty(storeName) && localStorage.getItem(storeName) !== instanceID
                  && 'PLAYING' == NOVA.getPlayerState()
               ) {
                  video.pause();
               }
            });
            if (user_settings.pause_background_tab_autoplay_onfocus) {
               window.addEventListener('focus', () => {
                  if (!localStorage.hasOwnProperty(storeName) && localStorage.getItem(storeName) !== instanceID
                     && ['UNSTARTED', 'PAUSED'].includes(NOVA.getPlayerState())
                  ) {
                     video.play();
                  }
               }, user_settings.pause_background_tab_autoplay_onfocus == 'force' ? false : { capture: true, once: true });
            }
            if (user_settings.pause_background_tab_autopause_unfocus) {
               window.addEventListener('blur', () => {
                  if (document.visibilityState == 'hidden' && 'PLAYING' == NOVA.getPlayerState()) {
                     video.pause();
                  }
               });
            }
            function checkInstance() {
               if (user_settings.pause_background_tab_autoplay_onfocus !== true
                  && localStorage.hasOwnProperty(storeName) && localStorage.getItem(storeName) !== instanceID
               ) {
                  video.pause();
               }
               else {
                  localStorage.setItem(storeName, instanceID);
               }
            }
         });
   },
   options: {
      pause_background_tab_autoplay_onfocus: {
         _tagName: 'select',
         label: 'Autoplay on tab focus',
         'label:zh': '在标签焦点上自动播放',
         'label:ja': 'タブフォーカスでの自動再生',
         'label:ko': '탭 포커스에서 자동 재생',
         'label:id': 'Putar otomatis pada fokus tab',
         'label:es': 'Reproducción automática en el enfoque de la pestaña',
         'label:pt': 'Reprodução automática no foco da guia',
         'label:fr': "Lecture automatique sur le focus de l'onglet",
         'label:it': 'Riproduzione automatica su tab focus',
         'label:de': 'Autoplay bei Tab-Fokus',
         'label:pl': 'Autoodtwarzanie po wybraniu karty',
         'label:ua': 'Автовідтворення при виборі вкладки',
         options: [
            {
               label: 'disable', selected: true,
            },
            {
               label: 'once for new tab', value: true,
            },
            {
               label: 'always for not started', value: 'force',
            },
         ],
      },
      pause_background_tab_autopause_unfocus: {
         _tagName: 'input',
         label: 'Autopause if tab loses focus',
         'label:zh': '如果选项卡失去焦点，则自动暂停视频',
         'label:ja': 'タブがフォーカスを失った場合にビデオを自動一時停止',
         'label:ko': '탭이 초점을 잃으면 비디오 자동 일시 중지',
         'label:id': 'Jeda otomatis video jika tab kehilangan fokus',
         'label:es': 'Pausa automática del video si la pestaña pierde el foco',
         'label:pt': 'Pausar automaticamente o vídeo se a guia perder o foco',
         'label:fr': "Pause automatique de la vidéo si l'onglet perd le focus",
         'label:it': 'Metti automaticamente in pausa il video se la scheda perde la messa a fuoco',
         'label:de': 'Video automatisch pausieren, wenn der Tab den Fokus verliert',
         'label:pl': 'Automatycznie wstrzymaj wideo, jeśli karta straci ostrość',
         'label:ua': 'Автопауза при зміні вкладки',
         type: 'checkbox',
      },
   }
});
window.nova_plugins.push({
   id: 'sidebar-channel-links-patch',
   title: 'Fix channel links in sidebar',
   'title:zh': '修复侧边栏中的频道链接',
   'title:ja': 'サイドバーのチャネルリンクを修正',
   'title:ko': '사이드바에서 채널 링크 수정',
   'title:id': 'Perbaiki tautan saluran di bilah sisi',
   'title:es': 'Arreglar enlaces de canales en la barra lateral',
   'title:pt': 'Corrigir links de canais na barra lateral',
   'title:fr': 'Correction des liens de chaîne dans la barre latérale',
   'title:it': 'Correggi i collegamenti ai canali nella barra laterale',
   'title:de': 'Korrigieren Sie die Kanallinks in der Seitenleiste',
   'title:pl': 'Napraw linki do kanałów na pasku bocznym',
   'title:ua': 'Виправити посилання на канали на бічній панелі',
   run_on_pages: 'watch, -mobile',
   section: 'sidebar',
   _runtime: user_settings => {
      document.addEventListener('mouseover', ({ target }) => {
         //console.debug('>', target);
         if (!target.matches('.ytd-channel-name')) return;
         if ((link = target.closest('a'))
            && target.__data?.text?.runs.length
            && target.__data?.text?.runs[0].navigationEndpoint?.commandMetadata?.webCommandMetadata?.webPageType == 'WEB_PAGE_TYPE_CHANNEL'
         ) {
            //const urlOrig = '/watch?v=' + link.data.watchEndpoint.videoId;
            const urlOrig = link.href;
            const url = target.__data.text.runs[0].navigationEndpoint.commandMetadata.webCommandMetadata.url + '/videos';
            link.href = url;
            link.data.commandMetadata.webCommandMetadata.url = url;
            link.data.commandMetadata.webCommandMetadata.webPageType = 'WEB_PAGE_TYPE_CHANNEL';
            link.data.browseEndpoint = target.__data.text.runs[0].navigationEndpoint.browseEndpoint;
            link.data.browseEndpoint.params = encodeURIComponent(btoa(String.fromCharCode(0x12, 0x06) + 'videos'));
            //console.debug('patch link:', 1);
            target.addEventListener('mouseout', ({ target }) => {
               link.href = urlOrig;
               link.data.commandMetadata.webCommandMetadata.url = urlOrig;
               link.data.commandMetadata.webCommandMetadata.webPageType = 'WEB_PAGE_TYPE_WATCH';
               //console.debug('restore link:', 2);
            }, { capture: true, once: true });
         }
      })
   },
});
window.nova_plugins.push({
   id: 'livechat-visibility',
   title: 'Collapse live chat',
   'title:zh': '隐藏实时聊天',
   'title:ja': 'ライブチャットを非表示',
   'title:ko': '실시간 채팅 숨기기',
   'title:id': 'Sembunyikan obrolan langsung',
   'title:es': 'Ocultar chat en vivo',
   'title:pt': 'Ocultar livechat',
   'title:fr': 'Masquer le chat en direct',
   'title:it': 'Nascondi chat dal vivo',
   'title:de': 'Livechat ausblenden',
   'title:pl': 'Ukryj czat na żywo',
   'title:ua': 'Приховати чат',
   run_on_pages: 'watch, -mobile',
   restart_on_location_change: true,
   section: 'sidebar',
   _runtime: user_settings => {
      if (user_settings.livechat_visibility_mode == 'disable') {
         NOVA.waitSelector('#chat', { stop_on_page_change: true })
            .then(chat => {
               chat.remove();
            });
      }
      else {
         NOVA.waitSelector('#chat:not([collapsed]) #show-hide-button button', { stop_on_page_change: true })
            .then(btn => {
               btn.click();
            });
      }
   },
   options: {
      livechat_visibility_mode: {
         _tagName: 'select',
         label: 'Mode',
         'label:zh': '模式',
         'label:ja': 'モード',
         'label:ko': '방법',
         'label:es': 'Modo',
         'label:pt': 'Modo',
         'label:it': 'Mode',
         'label:de': 'Modus',
         'label:pl': 'Tryb',
         'label:ua': 'Режим',
         options: [
            {
               label: 'collapse', value: 'hide', selected: true,
               'label:pl': 'zwiń',
               'label:ua': 'приховати',
            },
            {
               label: 'remove', value: 'disable',
               'label:zh': '消除',
               'label:ja': '削除',
               'label:ko': '제거하다',
               'label:id': 'menghapus',
               'label:es': 'eliminar',
               'label:pt': 'remover',
               'label:fr': 'retirer',
               'label:it': 'rimuovere',
               'label:de': 'entfernen',
               'label:pl': 'usunąć',
               'label:ua': 'видалити',
            },
         ],
      },
   }
});
window.nova_plugins.push({
   id: 'playlist-collapse',
   title: 'Collapse playlist',
   'title:zh': '播放列表自动折叠',
   'title:ja': 'プレイリストの自動折りたたみ',
   'title:ko': '재생목록 자동 축소',
   'title:id': 'Penciutan otomatis daftar putar',
   'title:es': 'Contraer automáticamente la lista de reproducción',
   'title:pt': 'Recolhimento automático da lista de reprodução',
   'title:fr': 'Réduction automatique de la liste de lecture',
   'title:it': 'Comprimi automaticamente la playlist',
   'title:de': 'Automatische Minimierung der Wiedergabeliste',
   'title:pl': 'Automatyczne zwijanie listy odtwarzania',
   'title:ua': 'Автоматичне згортання списку відтворення',
   run_on_pages: 'watch, -mobile',
   section: 'sidebar',
   _runtime: user_settings => {
      if (!location.search.includes('list=')) return;
      NOVA.waitSelector('#secondary #playlist:not([collapsed]) #expand-button button')
         .then(btn => {
            if (user_settings.playlist_collapse_ignore_theater && document.body.querySelector('ytd-watch-flexy[theater]')) return;
            if (user_settings.playlist_collapse_ignore_music && NOVA.isMusic()) return;
            btn.click();
         });
   },
   options: {
      playlist_collapse_ignore_theater: {
         _tagName: 'input',
         label: 'Ignore in theater mode',
         'label:zh': '在影院模式下忽略',
         'label:ja': 'シアターモードでは無視',
         'label:ko': '극장 모드에서 무시',
         'label:id': 'Abaikan dalam mode teater',
         'label:es': 'Ignorar en modo teatro',
         'label:pt': 'Ignorar no modo teatro',
         'label:fr': 'Ignorer en mode théâtre',
         'label:it': 'Ignora in modalità teatro',
         'label:de': 'Im Kinomodus ignorieren',
         'label:pl': 'Ignoruj w trybie kinowym',
         'label:ua': 'Ігнорувати в режимі театру',
         type: 'checkbox',
      },
      playlist_collapse_ignore_music: {
         _tagName: 'input',
         label: 'Ignore music',
         'label:zh': '忽略音乐',
         'label:ja': '音楽を無視',
         'label:ko': '음악 무시',
         'label:id': 'Abaikan musik',
         'label:es': 'ignorar la musica',
         'label:pt': 'Ignorar música',
         'label:fr': 'Ignorer la musique',
         'label:it': 'Ignora la musica',
         'label:de': 'Musik ignorieren',
         'label:pl': 'Ignoruj ​​muzykę',
         'label:ua': 'Ігноруйте музику',
         type: 'checkbox',
      },
   }
});
window.nova_plugins.push({
   id: 'playlist-extended',
   title: 'Extended playlist length',
   'title:ua': 'Розширена довжина списку відтворення',
   run_on_pages: 'watch, -mobile',
   section: 'sidebar',
   _runtime: user_settings => {
      NOVA.css.push(
         `ytd-watch-flexy:not([theater]) #secondary #playlist {
            --ytd-watch-flexy-panel-max-height: 90vh !important;
         }`);
   },
});
window.nova_plugins.push({
   id: 'playlist-toggle-autoplay',
   title: 'Add playlist autoplay control button',
   'title:zh': '播放列表自动播放控制',
   'title:ja': 'プレイリストの自動再生コントロール',
   'title:ko': '재생 목록 자동 재생 제어',
   'title:id': 'Tombol kontrol putar otomatis daftar putar',
   'title:es': 'Control de reproducción automática de listas de reproducción',
   'title:pt': 'Controle de reprodução automática da lista de reprodução',
   'title:fr': 'Contrôle de lecture automatique de la liste de lecture',
   'title:it': 'Pulsante di controllo della riproduzione automatica della playlist',
   'title:de': 'Steuerung der automatischen Wiedergabe von Wiedergabelisten',
   'title:pl': 'Kontrola autoodtwarzania listy odtwarzania',
   'title:ua': 'Кнопка керування автовідтворенням',
   run_on_pages: 'watch, -mobile',
   section: 'sidebar',
   _runtime: user_settings => {
      const
         SELECTOR_ID = 'nova-playlist-autoplay-btn',
         SELECTOR = '#' + SELECTOR_ID;
      let sesionAutoplayState = user_settings.playlist_autoplay;
      NOVA.css.push(
         `#playlist-action-menu .top-level-buttons {
            align-items: center;
         }
         ${SELECTOR}[type=checkbox] {
            --height: 1em;
            width: 2.2em;
         }
         ${SELECTOR}[type=checkbox]:after {
            transform: scale(1.5);
         }
         ${SELECTOR}[type=checkbox] {
            --opacity: .7;
            --color: #fff;
            height: var(--height);
            line-height: 1.6em;
            border-radius: 3em;
            background-color: var(--paper-toggle-button-unchecked-bar-color, #000000);
            appearance: none;
            -webkit-appearance: none;
            position: relative;
            cursor: pointer;
            outline: 0;
            border: none;
         }
         ${SELECTOR}[type=checkbox]:after {
            position: absolute;
            top: 0;
            left: 0;
            content: '';
            width: var(--height);
            height: var(--height);
            border-radius: 50%;
            background-color: var(--color);
            box-shadow: 0 0 .25em rgba(0, 0, 0, .3);
            
         }
         ${SELECTOR}[type=checkbox]:checked:after {
            left: calc(100% - var(--height));
            --color: var(--paper-toggle-button-checked-button-color, var(--primary-color));
         }
         ${SELECTOR}[type=checkbox]:focus, input[type=checkbox]:focus:after {
            transition: all 200ms ease-in-out;
         }
         ${SELECTOR}[type=checkbox]:disabled {
            opacity: .3;
         }`);
      NOVA.runOnPageInitOrTransition(() => {
         if (location.search.includes('list=') && NOVA.currentPage == 'watch') {
            insertButton();
         }
      });
      function insertButton() {
         NOVA.waitSelector('ytd-watch-flexy.ytd-page-manager:not([hidden]) ytd-playlist-panel-renderer:not([collapsed]) #playlist-action-menu .top-level-buttons:not([hidden]), #secondary #playlist #playlist-action-menu #top-level-buttons-computed', { stop_on_page_change: true })
            .then(el => renderCheckbox(el));
         function renderCheckbox(container = required()) {
            if (!(container instanceof HTMLElement)) return console.error('container not HTMLElement:', container);
            document.getElementById(SELECTOR_ID)?.remove();
            const checkboxBtn = document.createElement('input');
            checkboxBtn.id = SELECTOR_ID;
            checkboxBtn.type = 'checkbox';
            checkboxBtn.title = 'Playlist toggle autoplay';
            checkboxBtn.addEventListener('change', ({ target }) => {
               sesionAutoplayState = target.checked;
               setAssociatedAutoplay();
            });
            container.append(checkboxBtn);
            checkboxBtn.checked = sesionAutoplayState;
            setAssociatedAutoplay();
            function setAssociatedAutoplay() {
               if (manager = document.body.querySelector('yt-playlist-manager')) {
                  manager.interceptedForAutoplay = true;
                  manager.canAutoAdvance_ = checkboxBtn.checked;
                  checkboxBtn.checked = manager?.canAutoAdvance_;
                  checkboxBtn.title = `Playlist Autoplay is ${manager?.canAutoAdvance_ ? 'ON' : 'OFF'}`;
                  if (checkboxBtn.checked) checkHiddenVideo();
               }
               else console.error('Error playlist-autoplay. Playlist manager is', manager);
               async function checkHiddenVideo() {
                  const ytdWatch = document.body.querySelector('ytd-watch-flexy');
                  let vids_list;
                  await NOVA.waitUntil(() => {
                     if ((vids_list =
                        ytdWatch?.data?.contents?.twoColumnWatchNextResults?.playlist?.playlist?.contents
                        || ytdWatch?.data?.playlist?.playlist?.contents
                     )
                        && vids_list.length) return true;
                  }, 1000);
                  const
                     currentIndex = movie_player.getPlaylistIndex(),
                     lastAvailableIdx = vids_list.findIndex(i => i.hasOwnProperty('messageRenderer')) - 1;
                  if (currentIndex === lastAvailableIdx) {
                     manager.canAutoAdvance_ = false;
                     alert('Nova [playlist-toggle-autoplay]:\nPlaylist has hide video. Playlist autoplay disabled');
                     checkboxBtn.checked = false;
                  }
               }
            }
         }
      }
   },
   options: {
      playlist_autoplay: {
         _tagName: 'select',
         label: 'Default state',
         'label:zh': '默认状态',
         'label:ja': 'デフォルト状態',
         'label:ko': '기본 상태',
         'label:es': 'Estado predeterminado',
         'label:pt': 'Estado padrão',
         'label:fr': 'État par défaut',
         'label:it': 'Stato predefinito',
         'label:de': 'Standardzustand',
         'label:pl': 'Stan domyślny',
         'label:ua': 'Cтан за замовчуваням',
         options: [
            {
               label: 'play', value: true, selected: true,
               'label:ua': 'грати',
            },
            {
               label: 'stop', value: false,
               'label:ua': 'зупинити',
            },
         ],
      },
   }
});
window.nova_plugins.push({
   id: 'playlist-reverse',
   title: 'Add playlist reverse order button',
   'title:zh': '添加按钮反向播放列表顺序',
   'title:ja': 'ボタンの逆プレイリストの順序を追加',
   'title:ko': '버튼 역 재생 목록 순서 추가',
   'title:id': 'Tambahkan tombol urutan terbalik daftar putar',
   'title:es': 'Agregar orden de lista de reproducción inverso',
   'title:pt': 'Adicionar ordem inversa da lista de reprodução',
   'title:fr': 'Ajouter un ordre de lecture inversé',
   'title:it': "Aggiungi il pulsante dell'ordine inverso della playlist",
   'title:de': 'Umgekehrte Playlist-Reihenfolge hinzufügen',
   'title:pl': 'Dodaj przycisk odtwarzania w odwrotnej kolejności',
   'title:ua': 'Кнопка додавання списку відтворення у зворотному порядку',
   run_on_pages: 'watch, -mobile',
   section: 'sidebar',
   _runtime: user_settings => {
      const
         SELECTOR_ID = 'nova-playlist-reverse-btn',
         SELECTOR = '#' + SELECTOR_ID,
         CLASS_NAME_ACTIVE = 'nova-playlist-reverse-on';
      window.nova_playlistReversed;
      NOVA.css.push(
         SELECTOR + ` {
            background: none;
            border: 0;
         }
         yt-icon-button {
            width: 40px;
            height: 40px;
            padding: 10px;
         }
         ${SELECTOR} svg {
            fill: white;
            fill: var(--yt-spec-text-secondary);
         }
         ${SELECTOR}:hover svg { fill: #66afe9; }
         ${SELECTOR}:active svg,
         ${SELECTOR}.${CLASS_NAME_ACTIVE} svg { fill: #2196f3; }`);
      NOVA.runOnPageInitOrTransition(() => {
         if (location.search.includes('list=') && NOVA.currentPage == 'watch') {
            insertButton();
            reverseControl();
         }
      });
      function insertButton() {
         NOVA.waitSelector('ytd-watch-flexy.ytd-page-manager:not([hidden]) ytd-playlist-panel-renderer:not([collapsed]) #playlist-action-menu .top-level-buttons:not([hidden]), #secondary #playlist #playlist-action-menu #top-level-buttons-computed', { stop_on_page_change: true })
            .then(el => createButton(el));
         function createButton(container = required()) {
            if (!(container instanceof HTMLElement)) return console.error('container not HTMLElement:', container);
            document.getElementById(SELECTOR_ID)?.remove();
            const
               reverseBtn = document.createElement('div'),
               renderTitle = () => reverseBtn.title = `Reverse playlist order is ${window.nova_playlistReversed ? 'ON' : 'OFF'}`;
            if (window.nova_playlistReversed) reverseBtn.className = CLASS_NAME_ACTIVE;
            reverseBtn.id = SELECTOR_ID;
            renderTitle();
            reverseBtn.innerHTML =
               `<yt-icon-button>
                  <svg viewBox="0 0 381.399 381.399" height="100%" width="100%">
                     <g>
                        <path d="M233.757,134.901l-63.649-25.147v266.551c0,2.816-2.286,5.094-5.104,5.094h-51.013c-2.82,0-5.099-2.277-5.099-5.094 V109.754l-63.658,25.147c-2.138,0.834-4.564,0.15-5.946-1.669c-1.389-1.839-1.379-4.36,0.028-6.187L135.452,1.991 C136.417,0.736,137.91,0,139.502,0c1.576,0,3.075,0.741,4.041,1.991l96.137,125.061c0.71,0.919,1.061,2.017,1.061,3.109 c0,1.063-0.346,2.158-1.035,3.078C238.333,135.052,235.891,135.735,233.757,134.901z M197.689,378.887h145.456v-33.62H197.689 V378.887z M197.689,314.444h145.456v-33.622H197.689V314.444z M197.689,218.251v33.619h145.456v-33.619H197.689z"/>
                     </g>
                  </svg>
               </yt-icon-button>`;
            reverseBtn.addEventListener('click', () => {
               reverseBtn.classList.toggle(CLASS_NAME_ACTIVE);
               window.nova_playlistReversed = !window.nova_playlistReversed;
               if (window.nova_playlistReversed) {
                  reverseControl();
                  renderTitle();
                  fixConflictPlugins();
               }
               else location.reload();
            });
            container.append(reverseBtn);
         }
      }
      function fixConflictPlugins() {
         document.getElementById('nova-playlist-duration').innerHTML = '&nbsp; [out of reach] &nbsp;';
         if (autoplayBtn = document.getElementById('nova-playlist-autoplay-btn')) {
            autoplayBtn.disabled = true;
            autoplayBtn.title = 'out of reach';
         }
      }
      async function reverseControl() {
         if (!window.nova_playlistReversed) return;
         if ((ytdWatch = await NOVA.waitSelector('ytd-watch-flexy', { stop_on_page_change: true }))
            && (data = await NOVA.waitUntil(() => ytdWatch?.data.contents?.twoColumnWatchNextResults))
            && (playlist = data.playlist.playlist)
            && (autoplay = data.autoplay.autoplay)
         ) {
            playlist.contents.reverse();
            playlist.currentIndex = (playlist.totalVideos - playlist.currentIndex) - 1;
            playlist.localCurrentIndex = (playlist.contents.length - playlist.localCurrentIndex) - 1;
            for (const i of autoplay.sets) {
               i.autoplayVideo = i.previousButtonVideo;
               i.previousButtonVideo = i.nextButtonVideo;
               i.nextButtonVideo = i.autoplayVideo;
            }
            ytdWatch.updatePageData_(data);
            if ((manager = document.body.querySelector('yt-playlist-manager'))
               && (ytdPlayer = document.getElementById('ytd-player'))
            ) {
               ytdPlayer.updatePlayerComponents(null, autoplay, null, playlist);
               manager.autoplayData = autoplay;
               manager.setPlaylistData(playlist);
               ytdPlayer.updatePlayerPlaylist_(playlist);
            }
         }
         scrollToElement(document.body.querySelector('#secondary #playlist-items[selected], ytm-playlist .item[selected=true]'));
      }
      function scrollToElement(targetEl = required()) {
         if (!(targetEl instanceof HTMLElement)) return console.error('targetEl not HTMLElement:', targetEl);
         const container = targetEl.parentElement;
         container.scrollTop = targetEl.offsetTop - container.offsetTop;
      }
   },
});
window.nova_plugins.push({
   id: 'playlist-duration',
   title: 'Show playlist duration',
   'title:zh': '显示播放列表持续时间',
   'title:ja': 'プレイリストの期間を表示',
   'title:ko': '재생목록 재생시간 표시',
   'title:id': 'Tampilkan durasi daftar putar',
   'title:es': 'Mostrar duración de la lista de reproducción',
   'title:pt': 'Mostrar duração da lista de reprodução',
   'title:fr': 'Afficher la durée de la liste de lecture',
   'title:it': 'Mostra la durata della playlist',
   'title:de': 'Wiedergabelistendauer anzeigen',
   'title:pl': 'Pokaż czas trwania playlisty',
   'title:ua': 'Показувати тривалість списку відтворення',
   run_on_pages: 'watch, playlist, -mobile',
   restart_on_location_change: true,
   section: 'sidebar',
   _runtime: user_settings => {
      const
         SELECTOR_ID = 'nova-playlist-duration',
         playlistId = NOVA.queryURL.get('list');
      if (!playlistId) return;
      switch (NOVA.currentPage) {
         case 'playlist':
            NOVA.waitSelector('#owner-text a')
               .then(el => {
                  if (duration = getPlaylistDuration()) {
                     insertToHTML({ 'container': el, 'text': duration });
                  }
                  else {
                     getPlaylistDurationFromThumbnails({
                        'items_selector': '#primary .ytd-thumbnail-overlay-time-status-renderer:not(:empty)',
                     })
                        .then(duration => insertToHTML({ 'container': el, 'text': duration }));
                  }
                  function getPlaylistDuration() {
                     const vids_list = (document.body.querySelector('ytd-app')?.data?.response || window.ytInitialData)
                        .contents.twoColumnBrowseResultsRenderer
                        ?.tabs[0].tabRenderer?.content?.sectionListRenderer
                        ?.contents[0].itemSectionRenderer
                        ?.contents[0].playlistVideoListRenderer?.contents
                        || document.body.querySelector('ytd-watch-flexy')?.__data.playlistData?.contents
                        || document.body.querySelector('ytd-watch-flexy')?.data?.playlist?.playlist?.contents
                        ;
                     const duration = vids_list?.reduce((acc, vid) => acc + (isNaN(vid.playlistVideoRenderer?.lengthSeconds) ? 0 : parseInt(vid.playlistVideoRenderer.lengthSeconds)), 0);
                     if (duration) {
                        return outFormat(duration);
                     }
                  }
               });
            break;
         case 'watch':
            NOVA.waitSelector('#secondary .index-message-wrapper', { stop_on_page_change: true })
               .then(el => {
                  const waitPlaylist = setInterval(() => {
                     const
                        playlistLength = movie_player.getPlaylist()?.length,
                        playlistList = document.body.querySelector('yt-playlist-manager')?.currentPlaylistData_?.contents
                           .filter(e => e.playlistPanelVideoRenderer?.lengthText?.simpleText)
                           .map(e => NOVA.timeFormatTo.hmsToSec(e.playlistPanelVideoRenderer.lengthText.simpleText));
                     console.assert(playlistList?.length === playlistLength, 'playlist loading:', playlistList?.length + '/' + playlistLength);
                     if (playlistList?.length === playlistLength) {
                        clearInterval(waitPlaylist);
                        if (duration = getPlaylistDuration(playlistList)) {
                           insertToHTML({ 'container': el, 'text': duration });
                        }
                        else if (!user_settings.playlist_duration_progress_type) {
                           getPlaylistDurationFromThumbnails({
                              'container': document.body.querySelector('#secondary #playlist'),
                              'items_selector': '#playlist-items #unplayableText[hidden]',
                           })
                              .then(duration => insertToHTML({ 'container': el, 'text': duration }));
                        }
                     }
                  }, 2000);
                  function getPlaylistDuration(total_list) {
                     const currentIndex = movie_player.getPlaylistIndex();
                     let elapsedList = [...total_list];
                     switch (user_settings.playlist_duration_progress_type) {
                        case 'done':
                           elapsedList.splice(currentIndex);
                           break;
                        case 'left':
                           elapsedList.splice(0, currentIndex);
                           break;
                     }
                     const sumArr = arr => arr.reduce((acc, time) => acc + +time, 0);
                     return outFormat(
                        sumArr(elapsedList),
                        user_settings.playlist_duration_percentage ? sumArr(total_list) : false
                     );
                  }
               });
            break;
      }
      function getPlaylistDurationFromThumbnails({ items_selector = required(), container }) {
         if (container && !(container instanceof HTMLElement)) {
            return console.error('container not HTMLElement:', container);
         }
         return new Promise(resolve => {
            let forcePlaylistRun = false;
            const waitThumbnails = setInterval(() => {
               const
                  playlistLength = movie_player.getPlaylist()?.length
                     || document.body.querySelector('ytd-player')?.player_?.getPlaylist()?.length
                     || document.body.querySelectorAll(items_selector)?.length,
                  timeStampList = (container || document.body)
                     .querySelectorAll('.ytd-thumbnail-overlay-time-status-renderer:not(:empty)'),
                  duration = getTotalTime(timeStampList);
               console.assert(timeStampList.length === playlistLength, 'playlist loading:', timeStampList.length + '/' + playlistLength);
               if (+duration && timeStampList.length
                  && (timeStampList.length === playlistLength || forcePlaylistRun)
               ) {
                  clearInterval(waitThumbnails);
                  resolve(outFormat(duration));
               }
               else if (!forcePlaylistRun) {
                  setTimeout(() => forcePlaylistRun = true, 1000 * 3);
               }
            }, 500);
         });
         function getTotalTime(nodes) {
            const arr = [...nodes]
               .map(e => NOVA.timeFormatTo.hmsToSec(e.textContent))
               .filter(Number);
            return arr.length && arr.reduce((acc, time) => acc + +time, 0);
         }
      }
      function outFormat(duration = 0, total) {
         let outArr = [
            NOVA.timeFormatTo.HMS.digit(
               (NOVA.currentPage == 'watch' && NOVA.videoElement?.playbackRate)
                  ? (duration / NOVA.videoElement.playbackRate) : duration
            )
         ];
         if (total) {
            outArr.push(`(${~~(duration * 100 / total) + '%'})`);
            if (user_settings.playlist_duration_progress_type) {
               outArr.push(user_settings.playlist_duration_progress_type);
            }
         }
         return ' - ' + outArr.join(' ');
      }
      function insertToHTML({ text = '', container = required() }) {
         if (!(container instanceof HTMLElement)) return console.error('container not HTMLElement:', container);
         (container.querySelector(`#${SELECTOR_ID}`) || (function () {
            const el = document.createElement('span');
            el.id = SELECTOR_ID;
            return container.appendChild(el);
         })())
            .textContent = ' ' + text;
      }
   },
   options: {
      playlist_duration_progress_type: {
         _tagName: 'select',
         label: 'Time display mode',
         'label:zh': '时间显示方式',
         'label:ja': '時間表示モード',
         'label:ko': '시간 표시 모드',
         'label:id': 'Mode tampilan waktu',
         'label:es': 'Modo de visualización de la hora',
         'label:pt': 'Modo de exibição de tempo',
         'label:fr': "Mode d'affichage de l'heure",
         'label:it': "Modalità di visualizzazione dell'ora",
         'label:de': 'Zeitanzeigemodus',
         'label:pl': 'Tryb wyświetlania czasu',
         'label:ua': 'Режим відображення часу',
         options: [
            {
               label: 'done', value: 'done',
               'label:zh': '结束',
               'label:ja': '終わり',
               'label:ko': '보았다',
               'label:es': 'hecho',
               'label:pt': 'feito',
               'label:fr': 'regardé',
               'label:de': 'fertig',
               'label:pl': 'zakończone',
               'label:ua': 'завершено',
            },
            {
               label: 'left', value: 'left',
               'label:zh': '剩下',
               'label:ja': '残り',
               'label:ko': '왼쪽',
               'label:es': 'izquierda',
               'label:pt': 'deixou',
               'label:fr': 'à gauche',
               'label:de': 'links',
               'label:pl': 'pozostało',
               'label:ua': 'залишилось',
            },
            {
               label: 'total', value: false, selected: true,
               'label:zh': '全部的',
               'label:ja': '全て',
               'label:ko': '총',
               'label:fr': 'le total',
               'label:de': 'gesamt',
               'label:pl': 'w sumie',
               'label:ua': 'загалом',
            },
         ],
      },
      playlist_duration_percentage: {
         _tagName: 'input',
         label: 'Add percentage',
         'label:zh': '显示百分比',
         'label:ja': 'パーセンテージを表示',
         'label:ko': '백분율 추가',
         'label:id': 'Tambahkan persentase',
         'label:es': 'Agregar porcentaje',
         'label:pt': 'Adicionar porcentagem',
         'label:fr': 'Ajouter un pourcentage',
         'label:it': 'Aggiungi percentuale',
         'label:de': 'Prozent hinzufügen',
         'label:pl': 'Pokaż procenty',
         'label:ua': 'Показати %',
         type: 'checkbox',
         'data-dependent': { 'playlist_duration_progress_type': ['done', 'left'] },
      },
   }
});
window.nova_plugins.push({
   id: 'related-visibility',
   title: 'Collapse related section',
   'title:zh': '收起相关栏目',
   'title:ja': '関連セクションを折りたたむ',
   'title:ko': '관련 섹션 축소',
   'title:id': 'Ciutkan bagian terkait',
   'title:es': 'Ocultar sección relacionada',
   'title:pt': 'Recolher seção relacionada',
   'title:fr': 'Réduire la section associée',
   'title:it': 'Comprimi la sezione relativa',
   'title:de': 'Zugehörigen Abschnitt minimieren',
   'title:pl': 'Zwiń powiązaną sekcję',
   'title:ua': 'Згорнути розділ "пов`язано"',
   run_on_pages: 'watch, -mobile',
   section: 'sidebar',
   _runtime: user_settings => {
      NOVA.collapseElement({
         selector: '#secondary #related',
         title: 'related',
         remove: (user_settings.related_visibility_mode == 'disable') ? true : false,
      });
   },
   options: {
      related_visibility_mode: {
         _tagName: 'select',
         label: 'Mode',
         'label:zh': '模式',
         'label:ja': 'モード',
         'label:ko': '방법',
         'label:es': 'Modo',
         'label:pt': 'Modo',
         'label:it': 'Mode',
         'label:de': 'Modus',
         'label:pl': 'Tryb',
         'label:ua': 'Режим',
         options: [
            {
               label: 'collapse', value: 'hide', selected: true,
               'label:pl': 'zwiń',
               'label:ua': 'приховати',
            },
            {
               label: 'remove', value: 'disable',
               'label:zh': '消除',
               'label:ja': '削除',
               'label:ko': '제거하다',
               'label:id': 'menghapus',
               'label:es': 'eliminar',
               'label:pt': 'remover',
               'label:fr': 'retirer',
               'label:it': 'rimuovere',
               'label:de': 'entfernen',
               'label:pl': 'usunąć',
               'label:ua': 'видалити',
            },
         ],
      },
   }
});
window.nova_plugins.push({
   id: 'comments-sidebar-position-exchange',
   title: 'Exchange comments/sidebar position',
   run_on_pages: 'watch, -mobile',
   restart_on_location_change: true,
   section: 'sidebar',
   _runtime: user_settings => {
      if (user_settings.comments_visibility_mode == 'disable'
         || user_settings['comments-popup']
      ) {
         return;
      }
      NOVA.waitSelector('ytd-watch-flexy:not([theater]) #below #comments', { stop_on_page_change: true })
         .then(comments => {
            document.querySelector('#secondary')?.appendChild(comments);
            Object.assign(comments.style, {
               height: '100vh',
               overflow: 'auto',
            });
         });
      NOVA.waitSelector('ytd-watch-flexy:not([theater]) #secondary #related', { stop_on_page_change: true })
         .then(related => {
            document.querySelector('#below')?.appendChild(related);
         });
   },
});
const Plugins = {
   run: ({ user_settings, app_ver }) => {
      if (!window.nova_plugins?.length) return console.error('nova_plugins empty', window.nova_plugins);
      if (!user_settings) return console.error('user_settings empty', user_settings);
      NOVA.currentPage = (function () {
         const pathnameArray = location.pathname.split('/').filter(Boolean);
         const [page, channelTab] = [pathnameArray[0], pathnameArray.pop()];
         NOVA.channelTab = ['featured', 'videos', 'shorts', 'streams', 'playlists', 'community', 'channels', 'about'].includes(channelTab) ? channelTab : false;
         return (page != 'live_chat')
            && (['channel', 'c', 'user'].includes(page)
               || page?.startsWith('@')
               || /[A-Z\d_]/.test(page)
               || NOVA.channelTab
            ) ? 'channel' : (page == 'clip') ? 'watch' : page || 'home';
      })();
      NOVA.isMobile = location.host == 'm.youtube.com';
      let logTableArray = [],
         logTableStatus,
         logTableTime;
      window.nova_plugins?.forEach(plugin => {
         const pagesAllowList = plugin?.run_on_pages?.split(',').map(p => p.trim().toLowerCase()).filter(Boolean);
         logTableTime = 0;
         logTableStatus = false;
         if (!pluginChecker(plugin)) {
            console.error('Plugin invalid\n', plugin);
            alert('Plugin invalid: ' + plugin?.id);
            logTableStatus = 'INVALID';
         }
         else if (plugin.was_init && !plugin.restart_on_location_change) {
            logTableStatus = 'skiped';
         }
         else if (!user_settings.hasOwnProperty(plugin.id)) {
            logTableStatus = 'off';
         }
         else if (
            (
               pagesAllowList?.includes(NOVA.currentPage)
               || (pagesAllowList?.includes('*') && !pagesAllowList?.includes('-' + NOVA.currentPage))
            )
            && (!NOVA.isMobile || (NOVA.isMobile && !pagesAllowList?.includes('-mobile')))
         ) {
            try {
               const startTableTime = performance.now();
               plugin.was_init = true;
               plugin._runtime(user_settings);
               logTableTime = (performance.now() - startTableTime).toFixed(2);
               logTableStatus = true;
            } catch (err) {
               console.groupEnd('plugins status');
               console.error(`[ERROR PLUGIN] ${plugin.id}\n${err.stack}\n\nPlease report the bug: https://github.com/raingart/Nova-YouTube-extension/issues/new?body=` + encodeURIComponent(app_ver + ' | ' + navigator.userAgent));
               if (user_settings.report_issues && _pluginsCaptureException) {
                  _pluginsCaptureException({
                     'trace_name': plugin.id,
                     'err_stack': err.stack,
                     'app_ver': app_ver,
                     'confirm_msg': `ERROR in Nova YouTube™\n\nCrash plugin: "${plugin.title || plugin.id}"\nPlease report the bug or disable the plugin\n\nSend the bug raport to developer?`,
                  });
               }
               console.groupCollapsed('plugins status');
               logTableStatus = 'ERROR';
            }
         }
         logTableArray.push({
            'launched': logTableStatus,
            'name': plugin?.id,
            'time init (ms)': logTableTime,
         });
      });
      console.table(logTableArray);
      console.groupEnd('plugins status');
      function pluginChecker(plugin) {
         const result = plugin?.id && plugin.run_on_pages && 'function' === typeof plugin._runtime;
         if (!result) {
            console.error('plugin invalid:\n', {
               'id': plugin?.id,
               'run_on_pages': plugin?.run_on_pages,
               '_runtime': 'function' === typeof plugin?._runtime,
            });
         }
         return result;
      }
   },
}
const
   configPage = 'https://raingart.github.io/options.html',
   configStoreName = 'user_settings',
   user_settings = Android.GM_getValue(configStoreName, null);
if (user_settings?.exclude_iframe && (window.frameElement || window.self !== window.top)) {
   return console.warn(': processed in the iframe disable');
}
console.debug(`current ${configStoreName}:`, user_settings);
const keyRenameTemplate = {
   'shorts_thumbnails_time': 'shorts-thumbnails-time',
}
for (const oldKey in user_settings) {
   if (newKey = keyRenameTemplate[oldKey]) {
      console.log(oldKey, '=>', newKey);
      delete Object.assign(user_settings, { [newKey]: user_settings[oldKey] })[oldKey];
   }
   Android.GM_setValue(configStoreName, user_settings);
}
registerMenuCommand();
if (location.hostname === new URL(configPage).hostname) setupConfigPage();
else {
   if (!user_settings?.disable_setting_button) insertSettingButton();
   if (!user_settings || !Object.keys(user_settings).length) {
      if (confirm('Active plugins undetected. Open the settings page now?')) Android.GM_openInWindow(configPage);
      user_settings['report_issues'] = 'on';
      Android.GM_setValue(configStoreName, user_settings);
   }
   else landerPlugins();
}
function setupConfigPage() {
   document.addEventListener('submit', event => {
      event.preventDefault();
      let obj = {};
      for (const [key, value] of new FormData(event.target)) {
         if (obj.hasOwnProperty(key)) {
            obj[key] += ',' + value;
            obj[key] = obj[key].split(',');
         }
         else {
            switch (value) {
               case 'true': obj[key] = true; break;
               case 'false': obj[key] = false; break;
               case 'undefined': delete obj[key]; break;
               default: obj[key] = value;
            }
         };
      }
      console.debug(`update ${configStoreName}:`, obj);
      Android.GM_setValue(configStoreName, obj);
   });
   window.addEventListener('DOMContentLoaded', () => {
      localizePage(user_settings?.lang_code);
      storeData = user_settings;
      //unsafeWindow.window.nova_plugins = window.nova_plugins;
   });
   window.addEventListener('load', () => {
      document.body?.classList?.remove('preload');
      document.body.querySelector('a[href$="issues/new"]')
         .addEventListener('click', ({ target }) => {
            target.href += '?body=' + encodeURIComponent('0.43.0' + ' | ' + navigator.userAgent);
         });
   });
}
function landerPlugins() {
   processLander();
   function processLander() {
      const plugins_lander = setInterval(() => {
         const domLoaded = document?.readyState != 'loading';
         if (!domLoaded) return console.debug('waiting, page loading..');
         clearInterval(plugins_lander);
         console.groupCollapsed('plugins status');
         Plugins.run({
            'user_settings': user_settings,
            'app_ver': '0.43.0',
         });
      }, 500);
   }
   let prevURL = location.href;
   const isURLChanged = () => prevURL == location.href ? false : prevURL = location.href;
   if (isMobile = (location.host == 'm.youtube.com')) {
      window.addEventListener('transitionend', ({ target }) => target.id == 'progress' && isURLChange() && processLander());
   }
   else {
      document.addEventListener('yt-navigate-start', () => isURLChanged() && processLander());
   }
}
function registerMenuCommand() {
   Android.GM_registerMenuCommand('Settings', configPage);
}
function insertSettingButton() {
   NOVA.waitSelector('#masthead #end')
      .then(menu => {
         const
            titleMsg = 'Nova Settings',
            a = document.createElement('a'),
            SETTING_BTN_ID = 'nova_settings_button';
         a.id = SETTING_BTN_ID;
         a.href = configPage + '?tabs=tab-plugins';
         a.target = '_blank';
         a.innerHTML =
            `<yt-icon-button class="style-scope ytd-button-renderer style-default size-default">
               <svg viewBox="-4 0 20 16">
                  <radialGradient id="nova-gradient" gradientUnits="userSpaceOnUse" cx="6" cy="22" r="18.5">
                     <stop class="nova-gradient-start" offset="0"/>
                     <stop class="nova-gradient-stop" offset="1"/>
                  </radialGradient>
                  <g fill="deepskyblue">
                     <polygon points="0,16 14,8 0,0"/>
                  </g>
               </svg>
            </yt-icon-button>`;
         a.addEventListener('click', () => {
            setTimeout(() => document.body.click(), 200);
         });
         a.title = titleMsg;
         const tooltip = document.createElement('tp-yt-paper-tooltip');
         tooltip.className = 'style-scope ytd-topbar-menu-button-renderer';
         tooltip.textContent = titleMsg;
         a.appendChild(tooltip);
         menu.prepend(a);
         NOVA.css.push(
            `#${SETTING_BTN_ID}[tooltip]:hover:after {
               position: absolute;
               top: 50px;
               transform: translateX(-50%);
               content: attr(tooltip);
               text-align: center;
               min-width: 3em;
               max-width: 21em;
               white-space: nowrap;
               overflow: hidden;
               text-overflow: ellipsis;
               padding: 1.8ch 1.2ch;
               border-radius: 0.6ch;
               background-color: #616161;
               box-shadow: 0 1em 2em -0.5em rgb(0 0 0 / 35%);
               color: #fff;
               z-index: 1000;
            }
            #${SETTING_BTN_ID} {
               position: relative;
               opacity: .3;
               transition: opacity .3s ease-out;
            }
            #${SETTING_BTN_ID}:hover {
               opacity: 1 !important;
            }
            #${SETTING_BTN_ID} path,
            #${SETTING_BTN_ID} polygon {
               fill: url(#nova-gradient);
            }
            #${SETTING_BTN_ID} .nova-gradient-start,
            #${SETTING_BTN_ID} .nova-gradient-stop {
               transition: .6s;
               stop-color: #7a7cbd;
            }
            #${SETTING_BTN_ID}:hover .nova-gradient-start {
               stop-color: #0ff;
            }
            #${SETTING_BTN_ID}:hover .nova-gradient-stop {
               stop-color: #0095ff;
               
            }`);
      });
}
function _pluginsCaptureException({ trace_name, err_stack, confirm_msg, app_ver }) {
}
