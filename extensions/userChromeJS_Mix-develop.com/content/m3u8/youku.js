(() => {
  let video = document.getElementById('video'), hls = new Hls(), vid = location.hash.substr(1);
  function urlParameter(a) {
    var b = [];
    for (var c in a) b.push(c + "=" + a[c]);
    return b.join("&")
  };
  function player() {
    let vid = location.hash.substr(1), params = {vid: vid, type: 'hd3', ts: 1, ep: 1, sid: 1, ctype: 12};
    let url = "http://pl.youku.com/playlist/m3u8?" + urlParameter(params);
    hls.loadSource(url), hls.attachMedia(video), hls.on(Hls.Events.MANIFEST_PARSED, () => video.play());
    fetch(`http://play-ali.youku.com/play/get.json?vid=${vid}&ct=10`, {credentials: 'include'}).then(e => e.json()).then(e => {
      let data = e.data, title = data.video.title, playlist = data.videos.list, videolist = '';
      document.title = title;
      playlist.forEach(e => {
        let vid = e.vid, title = e.title, ele = `<li><a href=#${vid}>${title}</a></li>`;
        videolist += ele
      })
      document.getElementById('videolist').innerHTML = videolist;
    })
  };
  player();
  window.onhashchange = () => player();
})()
