package com.example.app;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebChromeClient;
import android.webkit.WebViewClient;
import android.content.SharedPreferences;
import android.content.Context;
import android.webkit.JavascriptInterface;
import android.graphics.Bitmap;
import java.io.IOException;
import java.io.InputStream;


public class MainActivity extends Activity {

    private WebView mWebView;
    private SharedPreferences sharedPreferences;

    @Override
    @SuppressLint("SetJavaScriptEnabled")
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mWebView = findViewById(R.id.activity_main_webview);
        WebSettings webSettings = mWebView.getSettings();
        mWebView.setWebContentsDebuggingEnabled(true);
        webSettings.setJavaScriptEnabled(true);
        //webSettings.setUserAgentString("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.196 Safari/537.36");
        mWebView.setWebChromeClient(new WebChromeClient());
        mWebView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) {
                super.onPageStarted(view, url, favicon);
                if (url.matches("^(https?://(www|m)\\.youtube\\.com/.*)|(https?://.*\\.youtube-nocookie\\.com/embed/.*)|(https?://youtube\\.googleapis\\.com/embed/.*)|(https?://raingart\\.github\\.io/options\\.html.*)$") &&
                    !url.matches("^(https?://.*\\.youtube\\.com/.*\\.xml.*)|(https?://.*\\.youtube\\.com/error.*)|(https?://music\\.youtube\\.com/.*)|(https?://accounts\\.youtube\\.com/.*)|(https?://studio\\.youtube\\.com/.*)|(https?://.*\\.youtube\\.com/redirect\\?.*)$")) {
                    

        // Inject JavaScript code from the assets folder
        try {
            InputStream inputStream = getAssets().open("script.js");
            int size = inputStream.available();
            byte[] buffer = new byte[size];
            inputStream.read(buffer);
            inputStream.close();
            String script = new String(buffer);

            view.evaluateJavascript(script, null);
        } catch (IOException e) {
            e.printStackTrace();
        }
                    //view.loadUrl("file:///android_asset/script.js");
                    //mWebView.evaluateJavascript(script, null);
                }
            }
        });
        mWebView.addJavascriptInterface(new JavaScriptInterface(), "Android");
        sharedPreferences = getSharedPreferences("GMPrefs", Context.MODE_PRIVATE);

        
        // REMOTE RESOURCE
        mWebView.loadUrl("https://www.google.com/");
        
//        String javascriptCode = ""function e(){function e(){var e=document.getElementsByTagName(\"video\");if(e.length>0){e[0].outerHTML;window.location.href.match(/^https:\\/\\/m\\.youtube\\.com\\/watch\\?v=/)?function(){var e=document.querySelector(\"video\"),t=function(e){let t=\"\";try{if(e.includes(\"youtu.be/\"))return e.substring(e.lastIndexOf(\"/\")+1);var n=new URL(e).search;if(!n)return\"\";t=new URLSearchParams(n).get(\"v\")}catch(e){console.error(e)}return t}(window.location.href),n=Math.min(window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,window.screen.width||window.screen.availWidth||document.documentElement.offsetWidth),i=Math.min(window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,window.screen.height||window.screen.availHeight||document.documentElement.offsetHeight),o=Math.max(n,i);let d=\"\";d=o<320?`https://i.ytimg.com/vi_webp/${t}/default.webp`:o<480?`https://i.ytimg.com/vi_webp/${t}/mqdefault.webp`:o<640?`https://i.ytimg.com/vi_webp/${t}/hqdefault.webp`:o<1280?`https://i.ytimg.com/vi_webp/${t}/sddefault.webp`:`https://i.ytimg.com/vi_webp/${t}/maxresdefault.webp`;e.setAttribute(\"poster\",d),console.log(\"poster has been set with: \"+d+\"\\n\\nbaseDimension :\\n\\n\"+o)}():window.location.href.match(/^https:\\/\\/www\\.youtube\\.com\\/watch\\?v=/)||e.hasAttribute(\"poster\")}}e(),window.addEventListener(\"hashchange\",e)}window.location.href.match(/^https:\\/\\/m\\.youtube\\.com\\//)?window.addEventListener(\"state-navigateend\",e):window.addEventListener(\"DOMContentLoaded\",e);";
//        mWebView.loadUrl("javascript:" + javascriptCode);
//webView.evaluateJavascript(javascriptCode, null);
        
        
        // LOCAL RESOURCE
        // mWebView.loadUrl("file:///android_asset/index.html");
    }

    private class JavaScriptInterface {
        @JavascriptInterface
        public void GM_setValue(String key, String value) {
            SharedPreferences.Editor editor = sharedPreferences.edit();
            editor.putString(key, value);
            editor.apply();
        }

        @JavascriptInterface
        public String GM_getValue(String key, String defaultValue) {
            return sharedPreferences.getString(key, defaultValue);
        }

        @JavascriptInterface
        public void GM_registerMenuCommand(String caption, String configPage) {
            mWebView.loadUrl(configPage);
        }

        @JavascriptInterface
        public void GM_openInWindow(String url) {
            mWebView.loadUrl(url);
        }
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
