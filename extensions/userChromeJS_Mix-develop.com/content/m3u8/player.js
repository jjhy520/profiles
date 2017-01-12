(() => {
  let video = document.getElementById('video'), hls = new Hls(), url = location.search.substr(1);
  hls.loadSource(url), hls.attachMedia(video), hls.on(Hls.Events.MANIFEST_PARSED, () => video.play());
})()
