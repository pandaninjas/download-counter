export default {
  async fetch(request, env) {
    return await handleRequest(request)
  }
}

async function handleRequest(request) {
  let url = new URL(request.url);
  if (url.pathname === "/") {
    let html = `<!DOCTYPE html>
    <html>
        <head>
            <title>Github Release Download Counter</title>
        </head>
        <body>
            <label for="repo">Repo in user/reponame format</label>
            <input id="repo"></input>
            <br>
            <label for="filter">Only show files that end with: (optional)</label>
            <input id="filter"></input>
            <br>
            <button id="button" type="button">Show image</button>
            <br>
            <img id="result">
            <script>
                'use strict';
                document.getElementById("button").onclick = (event) => {
                    let url = new URL(window.location.href);
                    url.pathname = "/" + document.getElementById("repo").value
                    if (document.getElementById("filter").value !== "") {
                        url.searchParams.set("filter", document.getElementById("filter").value);
                    }
                    document.getElementById("result").src = url.toString();
                }
            </script>
        </body>        
    </html>`;
    return new Response(html, {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
      },
    });  
  } else {
    let repo = url.pathname.split("/")[1] + "/" + url.pathname.split("/")[2];
    let apiresp = await fetch(
      `https://api.github.com/repos/${repo}/releases`,
      {
        headers: {
          "User-Agent": "DownloadCounter (+github.com/pandaninjas/download-counter)"
        }
      }
    ).then(res => res.json());
    let sum = 0;
    for (let i = 0; i < apiresp.length; i++) {
      let release = apiresp[i];
      for (let j = 0; j < release.assets.length; j++) {
        let asset = release.assets[j];
        if (url.searchParams.get("filter") == null || asset.name.endsWith(url.searchParams.get("filter"))) {
          sum += asset.download_count
        }
      }
    }
    return await fetch(`https://img.shields.io/badge/downloads-${sum}-green`);
  }
}
