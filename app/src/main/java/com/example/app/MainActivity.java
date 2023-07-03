package com.example.app;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebChromeClient;
import android.webkit.WebViewClient;

import android.text.TextUtils;
import android.webkit.JavascriptInterface;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

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
        String userAgent = "Mozilla/5.0 (X11; U; Linux i686;en-US; rv:1.9.0.4) Gecko/20100101 Firefox/4.0";    
        webSettings.setUserAgentString(userAgent);
        //mWebView.setWebViewClient(new MyWebViewClient());
        mWebView.setWebChromeClient(new WebChromeClient());
        mWebView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) {
                // Call the injected content script interface and retrieve the JavaScripts
                List<String> javascripts = contentScript.getJavascripts();

                // Inject each script into the webpage
                for (String script : javascripts) {
                    mWebView.evaluateJavascript(script, null);
                }
            }
        });

        VMCScript contentScript = new VMCScript(this);
        mWebView.addJavascriptInterface(contentScript, "ContentScript");
        
        // REMOTE RESOURCE
        mWebView.loadUrl("https://www.youtube.com/");
//        String javascriptCode = ""function e(){function e(){var e=document.getElementsByTagName(\"video\");if(e.length>0){e[0].outerHTML;window.location.href.match(/^https:\\/\\/m\\.youtube\\.com\\/watch\\?v=/)?function(){var e=document.querySelector(\"video\"),t=function(e){let t=\"\";try{if(e.includes(\"youtu.be/\"))return e.substring(e.lastIndexOf(\"/\")+1);var n=new URL(e).search;if(!n)return\"\";t=new URLSearchParams(n).get(\"v\")}catch(e){console.error(e)}return t}(window.location.href),n=Math.min(window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,window.screen.width||window.screen.availWidth||document.documentElement.offsetWidth),i=Math.min(window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,window.screen.height||window.screen.availHeight||document.documentElement.offsetHeight),o=Math.max(n,i);let d=\"\";d=o<320?`https://i.ytimg.com/vi_webp/${t}/default.webp`:o<480?`https://i.ytimg.com/vi_webp/${t}/mqdefault.webp`:o<640?`https://i.ytimg.com/vi_webp/${t}/hqdefault.webp`:o<1280?`https://i.ytimg.com/vi_webp/${t}/sddefault.webp`:`https://i.ytimg.com/vi_webp/${t}/maxresdefault.webp`;e.setAttribute(\"poster\",d),console.log(\"poster has been set with: \"+d+\"\\n\\nbaseDimension :\\n\\n\"+o)}():window.location.href.match(/^https:\\/\\/www\\.youtube\\.com\\/watch\\?v=/)||e.hasAttribute(\"poster\")}}e(),window.addEventListener(\"hashchange\",e)}window.location.href.match(/^https:\\/\\/m\\.youtube\\.com\\//)?window.addEventListener(\"state-navigateend\",e):window.addEventListener(\"DOMContentLoaded\",e);";
//        mWebView.loadUrl("javascript:" + javascriptCode);
//webView.evaluateJavascript(javascriptCode, null);
        
        
        // LOCAL RESOURCE
        // mWebView.loadUrl("file:///android_asset/index.html");
    }

    public class VMCScript {
        private final Context context;
        private List<String> scripts;

        public VMCScript(Context context) {
            this.context = context;
            this.scripts = new ArrayList<>();
            scripts.add("injected.js");
            scripts.add("injected-web.js");
        }

        @JavascriptInterface
        public List<String> getJavascripts() {
            List<String> javascripts = new ArrayList<>();
            for (String fileName : scripts) {
                String javascript = loadJavascriptFromFile(fileName);
                if (!TextUtils.isEmpty(javascript)) {
                    javascripts.add(javascript);
                }
            }
            return javascripts;
        }

        private String loadJavascriptFromFile(String fileName) {
            try {
                InputStream inputStream = context.getAssets().open("violetmonkey/" + fileName);
                int size = inputStream.available();
                byte[] buffer = new byte[size];
                inputStream.read(buffer);
                inputStream.close();
                return new String(buffer, "UTF-8");
            } catch (IOException e) {
                e.printStackTrace();
            }
            return "";
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
