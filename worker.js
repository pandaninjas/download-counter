export default {
  async fetch(request, env) {
    return await handleRequest(request)
  }
}

async function handleRequest(request) {
  let url = new URL(request.url);
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
