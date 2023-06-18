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

String javascriptCode = "function e(e){var n=document.createElement(\"div\");n.textContent=e,document.body.appendChild(n)}window.addEventListener(\"hashchange\",(function(){document.body.innerHTML=\"\",setTimeout((function(){document.querySelector(\"ytm-app\")?e(\"<ytm-app> found.\"):e(\"No <ytm-app> found.\")}),5e3)}));";

//webView.evaluateJavascript(javascriptCode, null);

                view.loadUrl("javascript:" + javascriptCode);

        
    }

}
