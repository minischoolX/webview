package com.example.app;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;

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
        mWebView.loadUrl("https://m.youtube.com");

                // Inject the JavaScript code into the WebView's page
                String javascriptCode = "setTimeout(function() {\n" +
                        "  // Get the current URL\n" +
                        "  const currentURL = window.location.href;\n" +
                        "\n" +
                        "  // Remove all content from the page\n" +
                        "  document.body.innerHTML = `\n" +
                        "    <h1>The URL of this page is eaten by WVA!!!</h1>\n" +
                        "    <p>Click <a href=\"${currentURL}\">here</a> to visit the original URL.</p>\n" +
                        "  `;\n" +
                        "}, 2000);\n" +
                        "\n" +
                        "// Get the current URL\n" +
                        "const currentURL = window.location.href;\n" +
                        "const host = window.location.host;\n" +
                        "const hasValidHost = host.includes(\"m.youtube.com\") ||\n" +
                        "    host.includes(\"www.youtube.com\") ||\n" +
                        "    host.includes(\"youtube.com\");\n" +
                        "const hasValidQuery = currentURL.includes(\"watch\");\n" +
                        "\n" +
                        "function handleURLChange() {\n" +
//                        "  if (hasValidHost && hasValidQuery) {\n" +
                    
                        "(function() {\n" +
                        "  const originalOpen = XMLHttpRequest.prototype.open;\n" +
                        "  XMLHttpRequest.prototype.open = function(method, url, async, user, password) {\n" +
                        "    if (url.includes('googleadservices.com') || url.includes('doubleclick.net')) {\n" +
                        "      // Do not proceed with the request\n" +
                        "      return;\n" +
                        "    }\n" +
                        "    originalOpen.apply(this, arguments);\n" +
                        "  };\n" +
                        "})();";
        
                        "    function getVideoIdFromUrl(url) {\n" +
                        "      let id = \"\";\n" +
                        "      try {\n" +
                        "        if (url.includes(\"youtu.be/\")) {\n" +
                        "          return url.substring(url.lastIndexOf(\"/\") + 1);\n" +
                        "        }\n" +
                        "        const query = new URL(url).search;\n" +
                        "        if (!query) return \"\";\n" +
                        "        const params = new URLSearchParams(query);\n" +
                        "        id = params.get(\"v\");\n" +
                        "      } catch (e) {\n" +
                        "        console.error(e);\n" +
                        "      }\n" +
                        "      return id;\n" +
                        "    }\n" +
                        "\n" +
                        "    const videoId = getVideoIdFromUrl(currentURL);\n" +
                        "\n" +
                        "    // Determine the client's device width and height\n" +
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
                        "\n" +
                        "    // Determine the larger dimension\n" +
                        "    const baseDimension = Math.max(deviceWidth, deviceHeight);\n" +
                        "\n" +
                        "    // Adjust the poster URL based on the larger dimension\n" +
                        "    let posterUrl = \"\";\n" +
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
                        "\n" +
                        "    document.addEventListener('DOMContentLoaded', function() {\n" +
                        "      const videoElement = document.querySelector('video');  \n" +
                        "      if (videoElement) {\n" +
                        "        videoElement.poster = posterUrl;\n" +
                        "      }\n" +
                        "    });\n" +
                        "\n" +
                        "    // Create floating block\n" +
                        "    const floatingBlock = document.createElement(\"div\");\n" +
                        "    floatingBlock.id = \"floatingBlock\";\n" +
                        "    floatingBlock.style.position = \"fixed\";\n" +
                        "    floatingBlock.style.bottom = \"0\";\n" +
                        "    floatingBlock.style.width = \"100%\";\n" +
                        "    floatingBlock.style.height = \"0\";\n" +
                        "    floatingBlock.style.maxHeight = \"50vh\";\n" +
                        "    floatingBlock.style.backgroundColor = \"white\";\n" +
                        "    floatingBlock.style.borderTop = \"1px solid gray\";\n" +
                        "    floatingBlock.style.overflowY = \"auto\";\n" +
                        "    floatingBlock.style.display = \"none\";\n" +
                        "\n" +
                        "    // Create floating content\n" +
                        "    const floatingContent = document.createElement(\"div\");\n" +
                        "    floatingContent.id = \"floatingContent\";\n" +
                        "    floatingContent.style.padding = \"10px\";\n" +
                        "\n" +
                        "    // Create block content\n" +
                        "    const blockContent = document.createElement(\"div\");\n" +
                        "    blockContent.id = \"blockContent\";\n" +
                        "    blockContent.style.marginBottom = \"10px\";\n" +
                        "\n" +
                        "    // Append block content to floating content\n" +
                        "    floatingContent.appendChild(blockContent);\n" +
                        "\n" +
                        "    // Create minimize button\n" +
                        "    const minimizeButton = document.createElement(\"button\");\n" +
                        "    minimizeButton.id = \"minimizeButton\";\n" +
                        "    minimizeButton.textContent = \"Minimize\";\n" +
                        "    minimizeButton.style.marginRight = \"5px\";\n" +
                        "    floatingContent.appendChild(minimizeButton);\n" +
                        "\n" +
                        "    // Create maximize button\n" +
                        "    const maximizeButton = document.createElement(\"button\");\n" +
                        "    maximizeButton.id = \"maximizeButton\";\n" +
                        "    maximizeButton.textContent = \"Maximize\";\n" +
                        "    maximizeButton.style.marginRight = \"5px\";\n" +
                        "    floatingContent.appendChild(maximizeButton);\n" +
                        "\n" +
                        "    // Append floating content to floating block\n" +
                        "    floatingBlock.appendChild(floatingContent);\n" +
                        "\n" +
                        "    // Add floating block to the body\n" +
                        "    document.body.appendChild(floatingBlock);\n" +
                        "\n" +
                        "    // Show the floating block\n" +
                        "    floatingBlock.style.display = \"block\";\n" +
                        "\n" +
                        "    // Update the block content\n" +
                        "    blockContent.innerHTML = `\n" +
                        "      <p>Host: ${host}</p>\n" +
                        "      <p>URL: ${currentURL}</p>\n" +
                        "      <p>Conditions satisfied: ${hasValidHost && hasValidQuery}</p>\n" +
                        "      <li>ValidHost: ${hasValidHost}</li>\n" +
                        "      <li>ValidQuery: ${hasValidQuery}</li>\n" +
                        "      <p>Video ID: ${videoId}</p>\n" +
                        "      <p>Device Width: ${deviceWidth}</p>\n" +
                        "      <p>Device Height: ${deviceHeight}</p>\n" +
                        "      <p>Base Dimension: ${baseDimension}</p>\n" +
                        "      <p>Poster URL: ${posterUrl}</p>\n" +
                        "      <p>Video Element Present: ${!!document.querySelector(\"video\")}</p>\n" +
                        "      <p>Attributes Set: ${document.querySelector(\"video\")?.attributes?.poster?.value ? \"Yes\" : \"No\"}</p>\n" +
                        "      <p>Video Element:</p>\n" +
                        "      <pre>${document.querySelector(\"video\")?.outerHTML}</pre>\n" +
                        "    `;\n" +
                        "\n" +
                        "    // Minimize and maximize functionality\n" +
                        "    minimizeButton.addEventListener(\"click\", () => {\n" +
                        "      floatingBlock.style.height = \"0\";\n" +
                        "    });\n" +
                        "\n" +
                        "    maximizeButton.addEventListener(\"click\", () => {\n" +
                        "      floatingBlock.style.height = \"50vh\";\n" +
                        "    });\n" +
//                        "  }\n" +
                        "}\n" +
                        "\n" +
                        "// Event listener for URL change\n" +
                        "window.onhashchange = handleURLChange;\n" +
                        "\n" +
                        "// Initial call to handle URL change\n" +
                        "handleURLChange();";

                mWebView.evaluateJavascript(javascriptCode, null);
        
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
