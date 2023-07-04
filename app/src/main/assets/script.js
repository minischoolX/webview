window.nova_plugins = [];
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
   id: 'player-progress-bar-color',
   title: 'Player progress bar color',
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
      },
   }
});
window.nova_plugins.push({
   id: 'subtitle-style',
   title: 'Subtitles (captions) style',
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
         type: 'checkbox',
      },
      subtitle_bold: {
         _tagName: 'input',
         label: 'Bold text',
         type: 'checkbox',
      },
      subtitle_fixed: {
         _tagName: 'input',
         label: 'Fixed from below',
         type: 'checkbox',
         title: 'Preventing captions jumping up/down when pause/resume',
      },
      subtitle_selectable: {
         _tagName: 'input',
         label: 'Make selectable',
         type: 'checkbox',
      },
   }
});
window.nova_plugins.push({
   id: 'video-quality',
   title: 'Video quality',
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
