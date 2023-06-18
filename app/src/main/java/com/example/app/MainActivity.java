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

mWebView.setWebChromeClient(new WebChromeClient() {
    @Override
    public boolean onJsAlert(WebView view, String url, String message, JsResult result) {
        // Handle the alert here
        // You can display it as a toast or perform any other action
        Toast.makeText(getApplicationContext(), message, Toast.LENGTH_SHORT).show();

        result.confirm(); // Confirm the alert
        return true; // Return true to indicate that you've handled the alert
    }

});

        
        // REMOTE RESOURCE
        mWebView.loadUrl("https://m.youtube.com/watch?v=yFoG42xk85U");

        String javascriptCode = "const canvas = document.createElement('canvas');\n" +
        "canvas.width = 16;\n" +
        "canvas.height = 9;\n" +
        "\n" +
        "const context = canvas.getContext('2d');\n" +
        "context.fillStyle = 'black';\n" +
        "context.fillRect(0, 0, canvas.width, canvas.height);\n" +
        "\n" +
        "const imageDataURL = canvas.toDataURL('image/jpeg');\n" +
        "\n" +
        "function addDynamicStyles() {\n" +
        "  const style = document.createElement('style');\n" +
        "  style.innerHTML = `\n" +
        "    /* CSS styles for the sticky floating block */\n" +
        "    #dynamicContent {\n" +
        "      position: fixed;\n" +
        "      bottom: 0;\n" +
        "      left: 0;\n" +
        "      width: 100%;\n" +
        "      height: 40%;\n" +
        "      background-color: #f1f1f1;\n" +
        "      padding: 20px;\n" +
        "      box-sizing: border-box;\n" +
        "      overflow-y: auto;\n" +
        "    }\n" +
        "  `;\n" +
        "  document.head.appendChild(style);\n" +
        "}\n" +
        "\n" +
        "function updateDynamicContent() {\n" +
        "  const currentURL = window.location.href;\n" +
        "  const host = window.location.host;\n" +
        "  const hasValidHost =\n" +
        "    host.includes('m.youtube.com') ||\n" +
        "    host.includes('www.youtube.com') ||\n" +
        "    host.includes('youtube.com') ||\n" +
        "    host.includes('w3schools.com');\n" +
        "  const hasValidQuery = currentURL.includes('watch');\n" +
        "  const videoElement = document.querySelector('video');\n" +
        "  if (!videoElement.getAttribute('poster')) {\n" +
        "    videoElement.setAttribute('poster', imageDataURL);\n" +
        "  }\n" +
        "  if (hasValidHost && hasValidQuery) {\n" +
        "    const videoId = getVideoIdFromUrl(`${currentURL}`);\n" +
        "    const deviceWidth = Math.min(\n" +
        "      window.innerWidth ||\n" +
        "        document.documentElement.clientWidth ||\n" +
        "        document.body.clientWidth,\n" +
        "      window.screen.width ||\n" +
        "        window.screen.availWidth ||\n" +
        "        document.documentElement.offsetWidth\n" +
        "    );\n" +
        "    const deviceHeight = Math.min(\n" +
        "      window.innerHeight ||\n" +
        "        document.documentElement.clientHeight ||\n" +
        "        document.body.clientHeight,\n" +
        "      window.screen.height ||\n" +
        "        window.screen.availHeight ||\n" +
        "        document.documentElement.offsetHeight\n" +
        "    );\n" +
        "    const baseDimension = Math.max(deviceWidth, deviceHeight);\n" +
        "    let posterUrl = '';\n" +
        "    if (baseDimension < 320) {\n" +
        "      posterUrl = `https://i.ytimg.com/vi_webp/${videoId}/default.webp`;\n" +
        "    } else if (baseDimension < 480) {\n" +
        "      posterUrl = `https://i.ytimg.com/vi_webp/${videoId}/mqdefault.webp`;\n" +
        "    } else if (baseDimension < 640) {\n" +
        "      posterUrl = `https://i.ytimg.com/vi_webp/${videoId}/hqdefault.webp`;\n" +
        "    } else if (baseDimension < 1280) {\n" +
        "      posterUrl = `https://i.ytimg.com/vi_webp/${videoId}/sddefault.webp`;\n" +
        "    } else {\n" +
        "      posterUrl = `https://i.ytimg.com/vi_webp/${videoId}/maxresdefault.webp`;\n" +
        "    }\n" +
        "    videoElement.setAttribute('poster', posterUrl);\n" +
        "  }\n" +
        "  const attributesSet = videoElement && videoElement.attributes.poster && videoElement.attributes.poster.value\n" +
        "    ? 'Yes'\n" +
        "    : 'No';\n" +
        "  const videoElementHTML = videoElement ? escapeHtml(videoElement.outerHTML) : '';\n" +
        "  const dynamicContentDiv = document.createElement('div');\n" +
        "  dynamicContentDiv.id = 'dynamicContent';\n" +
        "  dynamicContentDiv.innerHTML = `\n" +
        "    <p>Host: ${host}</p>\n" +
        "    <p>URL: ${currentURL}</p>\n" +
        "    <p>Conditions satisfied: ${hasValidHost && hasValidQuery}</p>\n" +
        "    <ul>\n" +
        "      <li>ValidHost: ${hasValidHost}</li>\n" +
        "      <li>ValidQuery: ${hasValidQuery}</li>\n" +
        "    </ul>\n" +
        "    <p>Video Element:</p>\n" +
        "    <pre><code>${videoElementHTML}</code></pre>\n" +
        "  `;\n" +
        "  document.body.appendChild(dynamicContentDiv);\n" +
        "}\n" +
        "\n" +
        "function escapeHtml(text) {\n" +
        "  const map = {\n" +
        "    '&': '&amp;',\n" +
        "    '<': '&lt;',\n" +
        "    '>': '&gt;',\n" +
        "    '\"': '&quot;',\n" +
        "    \"'\": '&#039;'\n" +
        "  };\n" +
        "  return text.replace(/[&<>\"']/g, m => map[m]);\n" +
        "}\n" +
        "\n" +
        "function getVideoIdFromUrl(url) {\n" +
        "  const regex = /[?&]v=([^&#]*)/;\n" +
        "  const match = url.match(regex);\n" +
        "  return match && match[1] ? match[1] : '';\n" +
        "}\n" +
        "\n" +
        "updateDynamicContent();";

//webView.evaluateJavascript(javascriptCode, null);

                mWebView.loadUrl("javascript:" + javascriptCode);
        
        
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
