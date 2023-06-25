package com.example.app;

import android.content.Intent;
import android.net.Uri;
import android.webkit.WebView;
import android.webkit.WebViewClient;

class MyWebViewClient extends WebViewClient {

//    @Override
//    public boolean shouldOverrideUrlLoading(WebView view, String url) {
//        view.loadUrl(url);
//        return true;
//    }

        @Override
    public void onPageFinished(WebView view, String url) {
        super.onPageFinished(view, url);
        String javascriptCode = "async function t(){var t;function e(){var t,e,o=document.getElementsByTagName(\"video\");o.length>0&&(window.location.href.match(/^https:\\/\\/m\\.youtube\\.com\\/watch\\?v=/)?(t=document.querySelector(\"video\"),e=\"https://i.ytimg.com/vi_webp/\"+function(t){let e=\"\";try{if(t.includes(\"youtu.be/\"))return t.substring(t.lastIndexOf(\"/\")+1);var o=new URL(t).search;if(!o)return\"\";e=new URLSearchParams(o).get(\"v\")}catch(t){console.error(t)}return e}(window.location.href)+\"/mqdefault.webp\",console.log(\"poster set: \"+e),t.setAttribute(\"poster\",e)):window.location.href.match(/^https:\\/\\/www\\.youtube\\.com\\/watch\\?v=/)||o.hasAttribute(\"poster\")||console.log(\"The <video> tag does not have the \'poster\' attribute.\"))}await(t=100,new Promise((e=>setTimeout(e,t)))),e(),window.addEventListener(\"hashchange\",e)}window.location.href.match(/^https:\\/\\/m\\.youtube\\.com\\//)?(t(),window.addEventListener(\"state-navigatestart\",t)):window.location.href.match(/^https:\\/\\/www\\.youtube\\.com\\/watch\\?v=/)||window.addEventListener(\"DOMContentLoaded\",t),window.location.href.match(/^https:\\/\\/m\\.youtube\\.com\\//)?(window.addEventListener(\"state-navigatestart\",(function(){var t=document.querySelector(\"video\");t&&(t.removeAttribute(\"poster\"),console.log(\"poster unset.\"))})),window.addEventListener(\"beforeunload\",(function(){var t=document.querySelector(\"video\");t&&(t.removeAttribute(\"poster\"),console.log(\"poster unset.\"))}))):window.location.href.match(/^https:\\/\\/www\\.youtube\\.com\\/watch\\?v=/)||window.addEventListener(\"beforeunload\",(function(){var t=document.querySelector(\"video\");t&&(t.removeAttribute(\"poster\"),console.log(\"poster unset.\"))}));";
        view.loadUrl("javascript:" + javascriptCode);
    }
}
