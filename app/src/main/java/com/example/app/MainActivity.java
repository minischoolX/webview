package com.example.app;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.widget.Toast;

public class MainActivity extends Activity {

    private WebView mWebView;

    @Override
    @SuppressLint("SetJavaScriptEnabled")
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mWebView = findViewById(R.id.activity_main_webview);
        WebSettings webSettings = mWebView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        mWebView.setWebViewClient(new MyWebViewClient());
        
        // REMOTE RESOURCE
        mWebView.loadUrl("https://m.youtube.com/");
//        String javascriptCode = ""function e(){function e(){var e=document.getElementsByTagName(\"video\");if(e.length>0){e[0].outerHTML;window.location.href.match(/^https:\\/\\/m\\.youtube\\.com\\/watch\\?v=/)?function(){var e=document.querySelector(\"video\"),t=function(e){let t=\"\";try{if(e.includes(\"youtu.be/\"))return e.substring(e.lastIndexOf(\"/\")+1);var n=new URL(e).search;if(!n)return\"\";t=new URLSearchParams(n).get(\"v\")}catch(e){console.error(e)}return t}(window.location.href),n=Math.min(window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,window.screen.width||window.screen.availWidth||document.documentElement.offsetWidth),i=Math.min(window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,window.screen.height||window.screen.availHeight||document.documentElement.offsetHeight),o=Math.max(n,i);let d=\"\";d=o<320?`https://i.ytimg.com/vi_webp/${t}/default.webp`:o<480?`https://i.ytimg.com/vi_webp/${t}/mqdefault.webp`:o<640?`https://i.ytimg.com/vi_webp/${t}/hqdefault.webp`:o<1280?`https://i.ytimg.com/vi_webp/${t}/sddefault.webp`:`https://i.ytimg.com/vi_webp/${t}/maxresdefault.webp`;e.setAttribute(\"poster\",d),console.log(\"poster has been set with: \"+d+\"\\n\\nbaseDimension :\\n\\n\"+o)}():window.location.href.match(/^https:\\/\\/www\\.youtube\\.com\\/watch\\?v=/)||e.hasAttribute(\"poster\")}}e(),window.addEventListener(\"hashchange\",e)}window.location.href.match(/^https:\\/\\/m\\.youtube\\.com\\//)?window.addEventListener(\"state-navigateend\",e):window.addEventListener(\"DOMContentLoaded\",e);";
//        mWebView.loadUrl("javascript:" + javascriptCode);
//webView.evaluateJavascript(javascriptCode, null);
        
        
        // LOCAL RESOURCE
        // mWebView.loadUrl("file:///android_asset/index.html");
    }

    @Override
    public void onBackPressed() {
        if(mWebView.canGoBack()) {
            mWebView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
