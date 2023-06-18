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

String javascriptCode = "document.addEventListener(\"DOMContentLoaded\",(function(){var e=document.getElementsByTagName(\"video\").length>0,t=!1;if(e){var n=document.getElementsByTagName(\"video\")[0];t=n.hasAttribute(\"poster\")}setTimeout((function(){document.body.innerHTML=\"\";var o=document.createElement(\"h1\");if(e&&!t){const e=document.createElement(\"canvas\");e.width=16,e.height=9;const t=e.getContext(\"2d\");t.fillStyle=\"black\",t.fillRect(0,0,e.width,e.height);const o=e.toDataURL(\"image/jpeg\");n.poster=o}document.body.appendChild(o)}),2500)}));";

//webView.evaluateJavascript(javascriptCode, null);

                view.loadUrl("javascript:" + javascriptCode);

        
    }

}
