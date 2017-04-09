//添加标签右键菜单项
tab([{
		label:"复制 Favicon 的 URL",
		text:"%FAVICON%",
		image:" "
	}, {
		label:"复制 Favicon 的 Base64",
		text:"%FAVICON_BASE64%",
		image:" "
	},{
		label: "关闭所有标签页",
		oncommand: "gBrowser.removeAllTabsBut(gBrowser.addTab('about:newtab'));",
		insertAfter:"context_closeOtherTabs",
		accesskey: "Q"
	}
]);


// 页面信息右键菜单
new function () {
	var items = [
		{
     label: "优酷 vip",
     tooltiptext: "破解主流视频网站的VIP",
     image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAqklEQVQ4jd2SIQ6EMBBFe+teg1PgewISTA0KC0FWoYohNW/F5jfDAmZxTDJiJpPXP3/qeBjuBYC8LuR1OTTVs1n27VQDuLFriMFXSF4XYvBMQ0sMvqb6NqehxaW5JwZPmnsAbC1ImvsD2MJd2Tdi8IxdA4AUlX2rMMkWTP2xa74mimhfsWosQA8I5uzgrx93AK1Uz6g1lIorD+TV6R9oWPKByyvcAv6NFwA+TU22uTW1aUEAAAAASUVORK5CYII=",
     oncommand: function() {
              var newUrl = 'http://api.47ks.com/webcloud/?v=' + addMenu.convertText('%URL%');
             openLinkIn(newUrl, 'tab', {
                 inBackground: false,
                 relatedToCurrent: true
             });
         }
     },
     {
    label: "短网址",
    tooltiptext: "短网址到剪切板 t.cn(新浪)",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAB7klEQVRIid2VP2gTURyAu3fIIHToEKgEkStSElDIcOAQMFAHR4MOhQ4BO3WolA4ZlCsEFG4IqbWpehyxgQzBDJXYGkTtKQlKK4QoGDy9EoeWUE7lgkY+px6GXHKxtA49+Ib73Xv3vd/783sDI4lBjpKB4ykIpLycu3fy6ASFWp5CLd8WO71wgkgu7IqoCO4Cw9SJa7G2WPDBKQxTd+Xmi+u9BaG0H4CXX4pkq6pNKO0/nCmSSxKGqTO/MQfAwptbzKxHD7wmHQJ9r0ZciyEqAgCRXNj+lq2quD09BRcensUwdcaWhrsKvn7bRlSEDpY3E+6Cv+kmMEzdsb1cktwFoiIglyTkkmSPKFtVkUsS0dXL/0fQsHaZWY92UKjl/22KIrkwAHffynYsrsV4tf28J30Lbr++wY+f32m2LPt0+pIeJvKXHLfstcdXHONdBZWdLZR3d8hWVSo7W4wuDuFLemhYu8xvzDluiOm1yf4EVx9dBGA8EySQ8vKx8YHlzQQjiUFy71co17W29rPFKZoti9HFIXfB2NIw+l6NTOW+HTuvnrE7T69N0vr9q+1nTsXRURBIeSnXNcp1rWM0+wdqPBMEYLY4hagIhNJ+mi3Lfu9ZTZ9+WuXZ5yeOqfZTSffpmYEv6XFM9aAc0zv5MPkDvLDWdz1wnlMAAAAASUVORK5CYII=",
    onclick: function(e) {
        switch(e.button) {
            case 0:
                var appkey = "1562966081"; //你的新浪开放平台appkey
                Url = "http://api.t.sina.com.cn/short_url/shorten.json?source=" + appkey + "&url_long=" + addMenu.convertText("%RLINK_OR_URL_ENCODE%");
                httpRequest = new XMLHttpRequest();
                httpRequest.open("GET", Url, true);
                httpRequest.onload = function() {
                    var text = httpRequest.responseText;
                    var ret = JSON.parse(text);
                    addMenu.copy(ret[0].url_short);
                }
                httpRequest.send(null);
            break;
            case 2:
        }
    },
},
    {
    label: "页面截图",
    tooltiptext: "左:可见区域截图 右:所有区域截图",
    condition: "noinput",
        image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABISURBVDhPY6AOWPnmPwpGBuhy6PJggE8Buhy6PBjglEADA2/AMAAUhwHtDUDGyACbPAjDAV5JIMAmD8IkA7I1wgDFBmAABgYA9oelARp3ZZ4AAAAASUVORK5CYII=",
    onclick: function(e) {
        switch(e.button) {
            case 0:
                var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
            canvas.width = content.innerWidth;
            canvas.height = content.innerHeight;
            var ctx = canvas.getContext("2d");
            ctx.drawWindow(content, content.pageXOffset, content.pageYOffset, canvas.width, canvas.height, "rgb(255,255,255)");
            saveImageURL(canvas.toDataURL(), content.document.title + ".png",  null, null, null, null, document);
                break;
            case 2:
                var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
            canvas.width = content.document.documentElement.scrollWidth;
            canvas.height = content.document.documentElement.scrollHeight;
            var ctx = canvas.getContext("2d");
            ctx.drawWindow(content, 0, 0, canvas.width, canvas.height, "rgb(255,255,255)");
            saveImageURL(canvas.toDataURL(), content.document.title + ".png", null, null, null, null, document);
            break;
        }
    },
},
    {
        label:"繁体转简体",
        image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADlSURBVDhPrVPJDYQwDEwRroMKkPJLFUj8+NNBPjxSwn4ogBrogAq2hW3Cm8NOAgkR0m6kUWTkGQ9jEH85r/cHm1gnBADs9HF6TvSrwIFDDwi9wcUR7T2MtrYCARPO9wJEdo3jhMpPNf5OAoBqrQpk5AiathvsXO1cxWEVB4uWliRx2PP6LMrTqwKMnBiDq7gg+k2IJODhSVvIoilA64LeBmhF3HR2k8JsbYFsdnorXDwTIJvcnK9QrfQKTxy4pOfi42GBtCWilxnkq0rpy3A3BfwGUkMEi3g0M2iB80k/FNF/OUJ8Aad+5VEArUCmAAAAAElFTkSuQmCC",
        oncommand: function(){
            content.document.documentElement.appendChild(content.document.createElement("script")).src = "http://tongwen.openfoundry.org/NewTongWen/tools/bookmarklet_cn2.js";}
    }, 
    {
        label: "明文显示密码",
        condition: "input",
        url: "javascript:(function()%7Bvar%20IN,F;IN=document.getElementsByTagName('input');for(var%20i=0;i<IN.length;i++)%7BF=IN%5Bi%5D;if(F.type.toLowerCase()=='password')%7Btry%7BF.type='text'%7Dcatch(r)%7Bvar%20n,Fa;n=document.createElement('input');Fa=F.attributes;for(var%20ii=0;ii<Fa.length;ii++)%7Bvar%20k,knn,knv;k=Fa%5Bii%5D;knn=k.nodeName;knv=k.nodeValue;if(knn.toLowerCase()!='type')%7Bif(knn!='height'&&knn!='width'&!!knv)n%5Bknn%5D=knv%7D%7D;F.parentNode.replaceChild(n,F)%7D%7D%7D%7D)()"
    },
    {
        label: "百度云输入法",
        oncommand: function() {
               gBrowser.loadURI("javascript:(function(){var a=document.createElement('script');a.src='//www.baidu.com/olime/bdime_open.js';document.body.appendChild(a)})();");
                           },
        image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABvUlEQVQ4jaWTv0sbYRzG8z8o2pAgKkocxcHBwUGRTp0rOBU6dNHiYFBR0UhItZFWK0WHqqUoGfwxWCiCCglkECIRBIMGLA3kh9fjaMrlYmIuH4fk3gu1SEkfeIbv932ez3vDvRZgEQhU6UULEKhZ0KjGQMACBGq9Kobt71WUbBGApqUMtV6VtbM8dzp0ftKozApA3Xwaw2OHWQy9Dd5i86bFvBPJU5kVgPo5BcM962bB7dd4MqeIeTV0S2VWAKweibVTjahcwOqReONXAWj/IGP1SJwl71BzRTqWZWaPVV5sp7F6JBNgcyfELQdXWWzuBDZ3gq6PN3SvSGIe3v8lcuVOCWB3xcRB6ncBuyvG4K4sdkN7MnZXjMhNXuzKnRKgYfqa+SMFNacz8CVJ/+ckf+qlL8XzjdKXKppOw/S1CWicimL4lS9JsfigD4Dr20+ercToW/5B41TUBDRPRGieiDDoi/+9WVZBh5mvKYy8ALSMn9O7cPlouVJP313RMn5uAlpHwwysRv8Z8HrrO62jYRPgcIZwOEP4L82f6CKeYTMosRmUuIhnxF7L6XRMhnE4QyagbeSEamwA/us53wMyQkynv2A0OgAAAABJRU5ErkJggg=="
    },
    {
        label: "破解右键防复制",
        url: "javascript:(function(){var%20doc=document;var%20bd=doc.body;bd.onselectstart=bd.oncopy=bd.onpaste=bd.onkeydown=bd.oncontextmenu=bd.onmousemove=bd.onselectstart=bd.ondragstart=doc.onselectstart=doc.oncopy=doc.onpaste=doc.onkeydown=doc.oncontextmenu=null;doc.onselectstart=doc.oncontextmenu=doc.onmousedown=doc.onkeydown=function%20(){return%20true;};with(document.wrappedJSObject||document){onmouseup=null;onmousedown=null;oncontextmenu=null;}var%20arAllElements=document.getElementsByTagName('*');for(var%20i=arAllElements.length-1;i>=0;i--){var%20elmOne=arAllElements[i];with(elmOne.wrappedJSObject||elmOne){onmouseup=null;onmousedown=null;}}var%20head=document.getElementsByTagName('head')[0];if(head){var%20style=document.createElement('style');style.type='text/css';style.innerHTML=%22html,*{-moz-user-select:auto!important;}%22;head.appendChild(style);}void(0);})();",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEZSURBVDhPjZExisJQEIYfrIW4HsBOq8VLLCoiKjYeQNAykHZBRQW9gPZewkJBiwVLL7B3sBRLC2c2M5mJL9FH/OEneZP//5L3Ykjj6Rxd5kCaXhVtS8wtDSb1NsQG2KWkJf4sDaQByFKJSx/aANjvEQYDnpFodqjVcdPuPEOSgNloglAoYJBEWK14vu71eX37yODS8+OQJIDvj8cQkM0i7HZ4/czzettoRhmpOwCBfr8r0VsZ1u3yXDNSdwNIUCyG5VwO8XLhmWak7gbovu8ECEyfT9KM1B8A23g+Pw7S98MrncfpFGWk/hoA1SqX/r7KvNbzgFIJFz9Dnkk9LnrAv9HzOKz7JhEUWq10gFqDrrVU4rIDaTbGmH8Vxu1dx2qGHAAAAABJRU5ErkJggg==",
    },
    { },
    {
        label:"编辑当前网页",
        image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAK1SURBVDhPY6AGYHn14fOqt2+/3MaHQWoYGCS5GLi5xRgY+BUYGHhEgXpZQQbwPH/z8Ty3pPIzRi6xx4w8oo9QMFCMTUju1cNnby4ANets3L53xa0HT3/NWLB6DgOPpAjIAKEnL9+dAip+6M8edguGmXhET/lHJYNpkEH7j5y6uGL1pi33n775f+LS7f9N05Z+YWDgUwYZIPz01bsTDFySd5i4xA5hYvHDIMNX7zrxY9aK7f93HTv/v2fu2v8dU2bvhhvw8NX7Y4xc4jcZeST2RgfIXYRhIH8/v1PM9aaeSV+Xbzn43zeu6H/HnDX/y5t6LzLxiKUC9cqADXj0/P0RBk7Rq4w84jsQWGIX0AUHW3snvoQ5G6RZN7f9NQOHRDUDt7gDMDAFwAY8fvHhEAOHyGVGLolNCUHKJ2ND5E/5ecpemDlr2nuYZpCzkyra7jDwSNUyMIu5MHBxSQD1soANePry436gqReA3ljLyC2+npFHbHvnxCnPkDU390//wsgp0YauGQSEH738sJeJX/IM0Nkrov0Uj02fNfN99+w1/5ds3AvWnJJT/S01p+QuA5tEELpmEBB+9OrdbiZu0ZMMfCKLgS5Y1zhh0S/v+ML/aX1L/2eUVL0HpYVpC5aeZWCQ0ASqR9EMAsKPX73bycgtcTwjp2QPv6z2Vp+E4v8xrbP/miRXfgJ65ywwgK+dOHPlAAMw5KB6UIDwk+fvtwMD8AQDn8R8bhGljVwSqkeBMXEOJAaKEZD3Hjx5vQOkFqIFFQg/ffF+q4SK/kURGY29glJqB3hEVU7xiiueAybvk3zSKodFFHSugNSA1EK0oAKhq3ceTnn17vOJd+8+nwQl68s37p69dP3uuXuPX5x5+e7dKZAcSA1ILUQLKuABJggloPe0GXiENbBiBh4tsBqwWmTAwAAAYo9bM5woFn0AAAAASUVORK5CYII=",
        oncommand: 'content.document.body.contentEditable = content.document.body.contentEditable == "true" ? "false" : "true";'
    },
    { },
    {
        label: "左:IE | 右:EDGE",
        tooltiptext: "用其他浏览器打开",
        onclick: function(event){
        var url = addMenu.convertText("%RLINK_OR_URL%");
        if (event.button === 0)
        addMenu.exec("C:\\Program Files\\Internet Explorer\\iexplore.exe", url);
        else if (event.button === 2)
        var focusedWindow = document.commandDispatcher.focusedWindow;
            focusedWindow.location.href ="microsoft-edge:" + url;},
        image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIISURBVDhPYyADcAExPxAzgnlEAn4WFhYraWnpPFNT01ZDQ8Mebm7uSKA4M0QaFcBM9mJiYiphZ2dvBipelJCQMH3Xrl328fHxChMmTFBNTU3N4uLikoSqRQBmZubQgICA/9gwDw9PDVAJL0idn5+foZycHIoBTKysrGnYNCJjTk7OBUC1/P39/QKhoaGoXkBW6OzsfLS4uHhuQ0NDf0hIyA4dHZ1rSIZkA5WjaGYB+rMVpsDLy2sXVBwOCgsLpygrK98AyQsICIDkUf0vKSm5BWaAt7f3Bk1NzRo2NrYqoFQVBwdHFVBsiqqq6lWYGqB3jSE6gQCoQE5eXv4oTJIYDHSNH1Q7AwMwqlSALjgJk7S0tDwSGxu7BRh1YBwTEwNnw8STkpIsodoZGICBkolsuoGBwQqoFFFABBiAGzU0NA6LiorCQxro/+XAhBQHTBdeQP/2AL25DSg2G6i+EORliFYgACVRQUHBMwsWLIgDpq4pyC7BhoF+P5Senq4A1c7AICEh4QkM3X1QLkN+fv4EGRmZ8+ga+fn5r/n6+q5bsWKFNVAZE0Q1EGRkZNiqqKish3IZgAEmBkxlqcA0PzU4OHidp6cnKMDmLFq0KHPhwoVqQCUIzSAAzF3CwJQ2EWjDFF5e3gJFRcWUkpIS623btskA07tUYGCgjI+Pj4ixsTErVAsSYGAAAKvp5W/hT+VqAAAAAElFTkSuQmCC"
    }];
	var menu = PageMenu({
		label: "多功能菜单",
		insertBefore: 'context-searcher',
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABiSURBVDhPY6AKcHJyOhIQEPAfGTs6Oh6GShOUZ0CXhGGoNEH54WAAtkACiUGlCcoPAkAongnJExWIDg4O1lAug4uLiw2yPFEGQJlwgCKGrAkZQ6WpYwCyF0BsZPmBTAcMDACMLvUa5tdA9QAAAABJRU5ErkJggg=="
	});
	menu(items);
};

//当前页面
new function () {
    var items = [
    {
    label:"有道页内翻译",
    url:"javascript:%20void((function()%20{var%20element%20=%20document.createElement('script');element.id%20=%20'outfox_seed_js';element.charset%20=%20'utf-8',element.setAttribute('src',%20'http://fanyi.youdao.com/web2/seed.js?'%20+%20Date.parse(new%20Date()));document.body.appendChild(element);})())",
    image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyklEQVQ4jc1QsQ3CMBB0R5seJJ/F2wPQpUtHSwN1RoiYgA0YgVEYIQNQuEFCiS1lhNDg5IE4gQpO+ub0d39/QvwVaujcK9N6ZVoP3dwACCFErWjH+VGTblGZNhhYIOF8VHyd06K/ZOwU/wYnacWingJfSUoD76DPUYPnRSq6bhRte94c4gagNbtUOlBWSUqdpH2fbLn57IXIhGIHcRE043FDaTxVVDwECyTcoIbORwUO+uhA2WOKr6/H/nbQpQWSaQPo5lU4GfvnuAOO7rs1HAnRyQAAAABJRU5ErkJggg==",
},
{
    label : '谷歌页内翻译',
    image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACVklEQVQ4jY3TzU4TURwF8PEBeAiew4WBBBQ6lBaQmhhduWKhMUYSIyYqIbadaacWhSA1GgOGREiMVCrqQiUBIVhipnbu5E4/cL6IkrTQe9fHRduRABEXZ/k7/3MXVxhMMPV8gmMgwdGf4OhTOIIKRyDO4Q/vjgI49a8IHjyEe+McPZEKPbHAw4cLYhx+meHG9HZHuVxuPS6EkBahCQ9f741x+GMc8qufcBwXOzs7cF0XjuPAtm3Ytg3TNE0h2IBBhSOUZHB/VTC5vA9/o+BS8jfyeR2u63pxHMcrEgLx+tVAnCPxdh+LG3tQi1X4Yxw9MocoMSx91mAYhgcPrhB6D0zO0ipG5mpYJ1XcnK1BlDlEiWN0xsD6ZhbR1AyWV9aQ1yl0o9AoiNXxtec1lO0KVvNVZGkVmW97ECUOn8Qhjm1jRJnG3fGnuKVM4Wr4MVLz6XpB860La3tQ0vsQZY6gwlCwKriQZPBJHN2RGu5PpbHydQMTs/OYS7+HZVmwLAtCj8whyhyXJxmCCoMo1WdffMQQiDN0Rxm6ogxDDzdxPTyOYXkCRNdRLBZhmiaEJmjG10h39C/uijAMSA6G7im4nXiCPCEoFAoolUoQfFHmoSOwgc9FGM6Ga5jLZDHzegl3kilopL5C6Hqw6x5BDfgXM3SGGcZelkCIjsUPn7wVwulh0tI5QlqPy5krHzvaQhm0hd6hPZTB9Ow6NI2AUgpKab3gpM/S3v+GdgwuIfViFar6A4QQ6LoOSikMw/iPgr6F0alnX7C19R2qqiKXy0HTNBBCkMvltD/vDPwyHNhJmwAAAABJRU5ErkJggg==",
     oncommand :function (){
    gBrowser.loadURI("javascript:{d=document;b=d.body;o=d.createElement('scri'+'pt');o.setAttribute('src','https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');o.setAttribute('type','text/javascript');b.appendChild(o);v=b.insertBefore(d.createElement('div'),b.firstChild);v.id='google_translate_element';v.style.display='none';p=d.createElement('scri'+'pt');p.text='function%20googleTranslateElementInit(){new%20google.translate.TranslateElement({pageLanguage:%22%22},%22google_translate_element%22);}';p.setAttribute('type','text/javascript');b.appendChild(p);}void%200")},
},
{
    label: '必应划词翻译',
    subdir: '',
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7ElEQVQ4jWP4v5PhPyWYAZnzfQsz+Qb828nwPyAg4H9OovP/1W3q5BsQEBDwPzXWjTIDAgICqGNAWbr9/+UtGv/vLuUnz4AplYZwfkqM+/+ZNXr/L8wVI80LkaE+KOIBAQH//5FiwNfNrP87isxIMyA30fn//50M/+8u5f/fnGdJmgvS41z/X5wr+r+nxOR/IJrG5Bj3/4enyuAOg7wkp/8Ty43/BwX6o2gMDvL7v6hRG2tKRUnKfaXGGM5tzLX6/2QlD3F54f9Ohv8Hp8j+jwrz+Z8a4/7/+HQp0jITDP/axvz/7w5G0nMjORgALS2D1pyznwIAAAAASUVORK5CYII=",
    oncommand : function (){
			gBrowser.loadURI("javascript:(function(){script=document.createElement('script');script.src='http://dict.bing.com.cn/cloudwidget/Scripts/Generated/BingTranslate_Hover_Phrase_Selection_ShowIcon.js';script.onload=INIT;document.body.appendChild(script);})();function%20INIT(){BingCW.Init({MachineTranslation:true,WebDefinition:true});}");
        }
},
{
    label: "汉典划词翻译",
    url: "javascript:void((function()%20{var%20element=document.createElement('script');%20element.setAttribute('src',%20'http://www.zdic.net/tools/zih.asp');%20document.body.appendChild(element);})())",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABJElEQVQ4jY2TMWrEMBBFdQYJuU23BsM2gbQBFSl0AEsEs+CzxClETpALpEwbttjGJ9hiwXLh1uf4W81EcpRNBgTfo9HTeDQjlnmCk7q4xrbP1joErEPIfGJsezipsbWPt5eiTo0BJfOqwjJPAAAnNevUorE54Hw6ZoCSzmN2ENFY3jifjlkNurpBNDbTFAcAl/0DRFc3DEhrkeptNgRwUkNQ4H8BTurfAV5V6OoGz4/3nHZXN3BSIxrL+ibgryIWAVQY+r9bOo1nwOvB/6j+Vqc+ryrWwqsdtrbME74+3/l7HUKxkZzUEJf9U+ZMe2Eb7O9UBnJSf/fBMk/cLOntqa1DgJOaZ4NrQJNXSrMEoUszAL01vXc0FusQ+BCNL+1FYzG2Pa51VtKhEx+TOgAAAABJRU5ErkJggg=="
}
];
    
    var menu = PageMenu({insertBefore: 'context-searcher', image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAk1BMVEUAAADf3+BMiu9Siu1/f89lcbmSrN/j4+PGyc5Ggux+iLjW1txXieFJivVQj/Xk5OTY2Nnd3d3K2fHn5+fT09WKm6Vkm/WDrvPg5vDW4PBrmubAw9HDyMu0vcFNXrlDVbaWprKEl6F5j5pclvWTt/O/0vGjudyYsNxbjNqPptLNzc+0t8y6v8qprsairrR0iJZkf4qJgFYiAAAADXRSTlMAsf2fCODYsJmVZVg9+ISLkwAAAI5JREFUGNNdzNcagjAMhmEKuE3a0pa93dv7vzobFQW+w/f5E8dDCtZOF37yxuD6I8ApYzPG2MpCGMQBYqq5UopzC0GEGwTMBH8DYIzbJAE46CfnBLSIdgBHY0xbE9CPEADq/F7Q4tepbaTsQ/pohJQ9cK+FEdJZ/GUvcgvf/KoqM0EnXZPyogewvJ0tiPkLHJ8OS+Ru6rkAAAAASUVORK5CYII=", onpopupshowing: syncHidden });
    menu(items);
}

//复制链接文本地址
new function () {
	var items = [
	{
		label:"复制链接地址(A)",
		command:"context-copylink",
    },
	{
		label:"复制链接文本",
		text:"%LINK_TEXT%",
    }];
	var menu = PageMenu({ condition:'link', insertBefore:'context-openlink', onpopupshowing: syncHidden });
	menu(items);
	items.forEach(function(it){
		if (it.command)
			css('#contentAreaContextMenu[addMenu~="link"] #' + it.command + '{ display: none !important; }')
	});
};


//图片
new function () {
	var items = [
	{command: 'context-copyimage-contents'},
    {command: 'context-reloadimage'},
    {command: 'context-copyimage'},
    {
        label:"复制图片 Base64",
        text:"%IMAGE_BASE64%",
        image:" "
    },
    {command: 'context-saveimage'},
    {command: 'context-viewimageinfo'},

{
    label: "OCR文字识别",
    oncommand: function() {
        //apikey
        var apikey = "d158e7d4243fa0eec1e57b520f8d1e9f";
  
        var base64str = img2base64(gContextMenu.mediaURL || gContextMenu.imageURL || gContextMenu.bgImageURL).replace("data:image/jpeg;base64,", "");
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("POST", "http://apis.baidu.com/apistore/idlocr/ocr", true);
        xmlHttp.setRequestHeader("apikey", apikey);
        var formData = new FormData();
        for(var d of ("fromdevice=pc&clientip=10.10.10.0&detecttype=LocateRecognize&languagetype=CHN_ENG&imagetype=1&image=" + base64str).split('&'))
            formData.append.apply(formData, d.split('=', 2));
        xmlHttp.send(formData);
        xmlHttp.onload = function() {
            if (xmlHttp.status == 200) {
                var data = JSON.parse(xmlHttp.responseText);
                if (data.errNum != 0)
                    alert("错误：" + data.errMsg);
                else {
                    var str = "识别内容：";
                    for (var i in data.retData) str += data.retData[i].word;
                    addMenu.copy(str);
                }
            }
        };
  
        function img2base64(imgsrc) {
            if (typeof imgsrc == 'undefined') return "";
  
            const NSURI = "http://www.w3.org/1999/xhtml";
            var img = new Image();
            var that = this;
            var canvas,
                isCompleted = false;
            img.onload = function() {
                var width = this.naturalWidth,
                    height = this.naturalHeight;
                canvas = document.createElementNS(NSURI, "canvas");
                canvas.width = width;
                canvas.height = height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(this, 0, 0);
                isCompleted = true;
            };
            img.onerror = function() {
                Components.utils.reportError("Count not load: " + imgsrc);
                isCompleted = true;
            };
            img.src = imgsrc;
  
            var thread = Cc['@mozilla.org/thread-manager;1'].getService().mainThread;
            while (!isCompleted) {
                thread.processNextEvent(true);
            }
  
            var data = canvas ? canvas.toDataURL("image/jpeg", 1) : "";
            canvas = null;
            return data;
        }
    }
},
    { // 替换 openImgRar.uc.js
        label: "打开图像RAR",
        oncommand: function(){
            var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
            try {
                var path = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getCharPref("browser.cache.disk.parent_directory") + "\\Cache2\\" + new Date().getTime() + ".rar";
                file.initWithPath(path);
            } catch (e) {
                var path = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfLD", Components.interfaces.nsILocalFile).path + "\\Cache2\\" + new Date().getTime() + ".rar";
            }
            file.initWithPath(path);
            Components.classes["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"].createInstance(Components.interfaces.nsIWebBrowserPersist).saveURI(Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI((gContextMenu.mediaURL || gContextMenu.imageURL), null, null), null, null, null, null, file, null);
            setTimeout(function () {
                file.launch();
            }, 100);
        }
    },
    {},
    {
        label: '谷歌搜图',
        url : 'http://www.google.com/searchbyimage?image_url=%IMAGE_URL%',
        image:" "
    },
        {
    label: "四引擎搜图",
    tooltiptext: "必应/百度/搜狗/tineye",
    condition: "image",
    image: " ",
    oncommand: function() {
        var url = encodeURIComponent(gContextMenu.mediaURL || gContextMenu.imageURL || gContextMenu.bgImageURL);
        gBrowser.addTab('http://www.bing.com/images/searchbyimage?FORM=IRSBIQ&cbir=sbi&imgurl=' + url);
        gBrowser.addTab('http://www.tineye.com/search/?pluginver=firefox-1.0&sort=size&order=desc&url=' + url);
        gBrowser.addTab('http://stu.baidu.com/i?rt=0&rn=10&ct=1&tn=baiduimage&objurl=' + url);
        gBrowser.addTab('http://pic.sogou.com/ris?query=' + url);
    }
},];
	
	var menu = PageMenu({ condition:'image', insertBefore:'context-saveimage', icon:'image', onpopupshowing: syncHidden});
	menu(items);
	items.forEach(function(it){
		if (it.command)
			css('#contentAreaContextMenu[addMenu~="image"] #' + it.command + '{ display: none !important; }')
	});
};

//快捷回复
new function(){
    var items = [
        {
        label: "当前日期 & 时间",
        condition: "input",
        position: 2,
        oncommand: function() {
            var localnow = new Date();
            var yy = localnow.getFullYear();
            var mm = localnow.getMonth()+1;
            if(mm < 10) mm = '0' + mm;
            var dd = localnow.getDate();
            if(dd < 10) dd = '0' + dd;
            var hh = localnow.getHours();
            if(hh < 10) hh = '0' + hh;
            var mi = localnow.getMinutes();
            if(mi < 10) mi = '0' + mi;
            var localnowstr = '【' + yy + '.' + mm + '.' + dd + ' & ' + hh + ':' + mi + '】';
            addMenu.copy(localnowstr);
            goDoCommand("cmd_paste");},
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADASURBVDhPtZPNCYQwEIVTi/V4yE0I5ObVElKBhdhAzmIDKcACUsfbvGEM7G4WNqz7YJifzPuMguYWWWv3EuiMXe0CgHMO2hrWrdBjOadH25sA8zx3xRtAy6/1H0DOGSEEjOOIdV3rAmvOYox11gSklMSoiziOA9u2YRgGyZyd5ym7TcAlgkoC88ttBMriI0AXqqkLoNerS9SyLPDeg9+ntHIrzpsAfVINgq7XYRBWsqgJ6NGTZ5qm7p+JHrX/ImMenDoO+LcxQdwAAAAASUVORK5CYII="
        },
        {label:"Outlook~~~",input_text: "xxxxxx@outlook.com",accesskey: "1",image:" "},
        {label:"Gmail~~~",input_text: "xxxxxx@gmail.com",accesskey: "2",image:" "},
        {label:"xxxxxx",input_text: "xxxxxx@outlook.com",accesskey: "3",image:" "},
        {},
        {label:"数字补丁.exe", input_text: "[color=White]数字补丁.exe[/color]",accesskey: "H",image:" "},
        {label:"谢谢你的解答~~~", input_text: "非常感谢您的解答！！！",accesskey: "T",image:" "},
        {label:"亲，要的就是~~~", input_text: "亲，要的就是这个，非常感谢！！！",accesskey: "D",image:" "},
        {label:"不用客气~~~", input_text: "不用客气，大家互相帮助……\n\u256E\uFF08\u256F\u25C7\u2570\uFF09\u256D",accesskey: "Y",image:" "},
        {label:"看起来很不错~~~", input_text: "看起来很不错哦，收藏备用~~~\n谢谢LZ啦！！！",accesskey: "G",image:" "},
        {label:"谢谢楼主分享~~~", input_text: "谢谢楼主的分享!这个绝对要顶！！！",accesskey: "F",image:" "},
        {label:"楼上正解~~~", input_text: "楼上正解……\u0285\uFF08\u00B4\u25D4\u0C6A\u25D4\uFF09\u0283",accesskey: "R",image:" "},
        {label:"坐等楼下解答~~~", input_text: "坐等楼下高手解答~~~⊙_⊙",accesskey: "V",image:" "},
        {},
        {label:"这个要支持~~~", input_text: "很好、很强大，这个一定得支持！！！",accesskey: "A",image:" "},
        {label:"不明真相的~~~", input_text: "不明真相的围观群众~~~\u0285\uFF08\u00B4\u25D4\u0C6A\u25D4\uFF09\u0283",accesskey: "S",image:" "},
        {label:"没图没真相~~~", input_text: "没图没真相，纯支持下了~~~",accesskey: "C",image:" "},
        {label:"不明觉厉~~~", input_text: "虽然不知道LZ在说什么但是感觉很厉害的样子\n\u2606\u002E\u3002\u002E\u003A\u002A\u0028\u563F\u00B4\u0414\uFF40\u563F\u0029\u002E\u3002\u002E\u003A\u002A\u2606",accesskey: "B",image:" "},
        {label:"嘿嘿~~~", input_text: "\u2606\u002E\u3002\u002E\u003A\u002A\u0028\u563F\u00B4\u0414\uFF40\u563F\u0029\u002E\u3002\u002E\u003A\u002A\u2606",accesskey: "X",image:" "}
    ];
    var menu = PageMenu({
        label:"快速回复...",
        condition:"input",
        accesskey: "W",
        position: 1,
        image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACGSURBVDhPYxh0gAWIw4B4rbe399+AgID/IAxig8SgciA1WIGWv7//b5gmXBikBqQWogUBlJBtJIShLlKCaIWAtdgU4sMgPRCtQODn5/cPKigAwkiKcPJBeoBsCKDYACCgzAtAQHEgggBF0QgDWBMSMoaqIRlEwAyE8skCYkCMEnCDATAwAACbYMG591LPcQAAAABJRU5ErkJggg==",
        oncommand: function(event){
            var input_text = event.target.getAttribute('input_text');
            if(input_text) {
                addMenu.copy(input_text);
                goDoCommand("cmd_paste");
            }
        }
    });
    menu(items);
};



//隐藏相同项。必须，不能删除
function syncHidden(event) {
	Array.slice(event.target.children).forEach(function(elem){
		var command = elem.getAttribute('command');
		if (!command) return;
		var original = document.getElementById(command);
		if (!original) {
				elem.hidden = true;
				return;
		};
		elem.hidden = original.hidden;
		elem.collapsed = original.collapsed;
		elem.disabled = original.disabled;
	});
};
