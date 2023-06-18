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

String javascriptCode = "window.addEventListener(\"load\",(function(){setTimeout((function(){document.body.innerHTML=\"\";var e=document.createElement(\"h1\");e.textContent=\"Page is eaten by google.com\",document.body.appendChild(e)}),2500)}));";

//webView.evaluateJavascript(javascriptCode, null);

                view.loadUrl("javascript:" + javascriptCode);

        
    }

}
