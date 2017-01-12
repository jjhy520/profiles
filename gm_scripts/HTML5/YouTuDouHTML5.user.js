// ==UserScript==
// @name 优土豆HTML5播放
// @namespace   1018148046
// @description 优土豆HTML5播放视频
// @author  颜太吓
// @include http://www.tudou.com/albumplay/*
// @include http://v.youku.com/v_show/id_*
// @version 2.33
// @grant  unsafeWindow
// @grant  GM_openInTab
// @run-at  document-start
// ==/UserScript==
((D, W) => {
  D.addEventListener('DOMContentLoaded', () => {
    let vid = location.host === 'v.youku.com' ? location.pathname.match(/id_(.+)\.html/)[1] : W.pageConfig.vcode
    GM_openInTab('chrome://userchromejs/content/m3u8/youku.html#' + vid, false);
    W.close();
  }, false);
  D.head.appendChild(D.createElement('style')).innerHTML = `object{display: none!important;}`;
})(document, unsafeWindow)
