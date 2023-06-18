package com.example.app;

import android.content.Intent;
import android.net.Uri;
import android.webkit.WebView;
import android.webkit.WebViewClient;

class MyWebViewClient extends WebViewClient {

    @Override
    public boolean shouldOverrideUrlLoading(WebView view, String url) {
        view.loadUrl(url);
        return true;
    }

        @Override
    public void onPageFinished(WebView view, String url) {
        super.onPageFinished(view, url);

String javascriptCode = "document.addEventListener(\"DOMContentLoaded\",(function(){var e=document.getElementsByTagName(\"video\").length>0;setTimeout((function(){document.body.innerHTML=\"\";var t=document.createElement(\"h1\");t.textContent=e?\"videoTag is available\":\"Page is eaten by google.com\",document.body.appendChild(t)}),2500)}));";

//webView.evaluateJavascript(javascriptCode, null);

                view.loadUrl("javascript:" + javascriptCode);

        
    }

}
