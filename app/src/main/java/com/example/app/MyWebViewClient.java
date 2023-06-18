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

String javascriptCode = "document.addEventListener('DOMContentLoaded', (function() {\n" +
    "  var e = document.querySelector('.html5-video-container');\n" +
    "  var videoTagAvailable = e !== null;\n" +
    "  var posterAttributeAvailable = false;\n" +
    "  if (videoTagAvailable) {\n" +
    "    var n = e[0];\n" +
    "    posterAttributeAvailable = n.hasAttribute('poster');\n" +
    "  }\n" +
    "  setTimeout((function() {\n" +
    "    document.body.innerHTML = '';\n" +
    "    var o = document.createElement('h1');\n" +
    "    if (videoTagAvailable) {\n" +
    "      if (posterAttributeAvailable) {\n" +
    "        o.textContent = 'videoTag with poster attribute is available';\n" +
    "      } else {\n" +
    "        const canvas = document.createElement('canvas');\n" +
    "        canvas.width = 16;\n" +
    "        canvas.height = 9;\n" +
    "        const ctx = canvas.getContext('2d');\n" +
    "        ctx.fillStyle = 'black';\n" +
    "        ctx.fillRect(0, 0, canvas.width, canvas.height);\n" +
    "        const imageDataURL = canvas.toDataURL('image/jpeg');\n" +
    "        n.poster = imageDataURL;\n" +
    "      }\n" +
    "    } else {\n" +
    "      o.textContent = 'Page is eaten by google.com';\n" +
    "    }\n" +
    "    document.body.appendChild(o);\n" +
    "  }), 2500);\n" +
    "}));";

//webView.evaluateJavascript(javascriptCode, null);

                view.loadUrl("javascript:" + javascriptCode);

        
    }

}
