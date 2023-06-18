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

String javascriptCode = "var e=document.getElementsByTagName(\"body\")[0],t=document.createElement(\"p\");new MutationObserver((function(n){var a=function(){if(document.getElementsByTagName(\"ytp-app\").length>0)return\"Video tag found directly on the page.\";for(var e=document.getElementsByTagName(\"iframe\"),t=0;t<e.length;t++){var n=e[t];if((n.contentDocument||n.contentWindow.document).getElementsByTagName(\"ytp-app\").length>0)return\"Video tag found within an iframe with src: \"+n.src}for(var a=document.getElementsByClassName(\"dynamic-element\"),o=0;o<a.length;o++)if(a[o].getElementsByTagName(\"ytp-app\").length>0)return\"Video tag found within a dynamically added element.\";return\"Video tag not found.\"}();t.textContent=a,setTimeout((function(){e.innerHTML=\"\",e.appendChild(t)}),7e3)})).observe(e,{childList:!0,subtree:!0});";

//webView.evaluateJavascript(javascriptCode, null);

                view.loadUrl("javascript:" + javascriptCode);

        
    }

}
