// ==UserScript==
// @name          Shadowsocks.uc.js
// @description   Shadowsocks 科学上网，和美国网友谈笑风生
// @author         Runningcheese
// @namespace   http://www.runningcheese.com
// @include        main
// @license         MIT License
// @compatibility  Firefox 29+
// @charset        UTF-8
// @version        v2016.01.05 
// @note            2016-01-05 版本V1.0
// @homepage    http://www.runningcheese.com/firefox-v7
// ==/UserScript==

//载入脚本
function jsonToDOM(json, doc, nodes) {

    var namespaces = {
        html: 'http://www.w3.org/1999/xhtml',
        xul: 'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul'
    };
    var defaultNamespace = namespaces.html;

    function namespace(name) {
        var m = /^(?:(.*):)?(.*)$/.exec(name);        
        return [namespaces[m[1]], m[2]];
    }

    function tag(name, attr) {
        if (Array.isArray(name)) {
            var frag = doc.createDocumentFragment();
            Array.forEach(arguments, function (arg) {
                if (!Array.isArray(arg[0]))
                    frag.appendChild(tag.apply(null, arg));
                else
                    arg.forEach(function (arg) {
                        frag.appendChild(tag.apply(null, arg));
                    });
            });
            return frag;
        }

        var args = Array.slice(arguments, 2);
        var vals = namespace(name);
        var elem = doc.createElementNS(vals[0] || defaultNamespace, vals[1]);

        for (var key in attr) {
            var val = attr[key];
            if (nodes && key == 'id')
                nodes[val] = elem;

            vals = namespace(key);
            if (typeof val == 'function')
                elem.addEventListener(key.replace(/^on/, ''), val, false);
            else
                elem.setAttributeNS(vals[0] || '', vals[1], val);
        }
        args.forEach(function(e) {
            try {
                elem.appendChild(
                                    Object.prototype.toString.call(e) == '[object Array]'
                                    ?
                                        tag.apply(null, e)
                                    :
                                        e instanceof doc.defaultView.Node
                                        ?
                                            e
                                        :
                                            doc.createTextNode(e)
                                );
            } catch (ex) {
                elem.appendChild(doc.createTextNode(ex));
            }
        });
        return elem;
    }
    return tag.apply(null, json);
}


//定义按钮
CustomizableUI.createWidget({
    id: 'Shadowsocks',
    defaultArea: CustomizableUI.AREA_NAVBAR,
    label: 'Shadowsocks',
    tooltiptext: '一键翻墙',
    onCreated: function(aNode) {
    aNode.setAttribute('type', 'menu');    

        
 //定义菜单      
        var myMenuJson = 
                                ['xul:menupopup', {id: 'Shadowsocks_pop'},
                                ['xul:menuitem', {label: '日本①  ',oncommand: 'RunSSjp();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABGklEQVR4XsWTMW7CQBRE31pUbhENBUfhChQgKgouQpH0SNRJmXSIig4pqeEYiMYNlpBwYbzyJMp6tUYbpUnBl0bz/eWZ/bOyjST+UwnwWANTFEWUoa5rz+0+gv1GByBNUwOgcCG4TviRpAhZlrkIsVjw+YGentFiQb3d+lOjrZJfxZsNWq3QYY/2B7RcoteXaANvwJ34fEbrNaoqdLsFvL2j0+nOwFpL4tfxQ2UZulyCsGr4ekXHY3jPRXAGYSjU66EkCcKydCyhft+xBO0IYQjqdtFohMrGwEcZj9FggL8uz512BM+az1Gaot3OiYdDNJuFg5qy1v4YRK4YA9MpZjIByT1LDhhAAGGDPM9bX5eltq7/C74e/zd+AXscbYfJObujAAAAAElFTkSuQmCC'}],
                                ['xul:menuitem', {label: '美国①  ',oncommand: 'RunSSus();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB4ElEQVR4XsWTv2sUQRTHP5PsoVERE1CTIh42/gFWikpMEY2kFSQBRRS0MCKIuIUQxZwWKSUgqBiFqEWaFN5VQcORzh+NBI5AUI4UHoqed5e9vd3Z98ThCAspLfLgw/vOMG++84YZo6r8T3QAW7uBuXx1SUmHCIgFIkBdfpJdQIN1fv747maljQU8gKePjzJbVEYHhNfvOxg7obwsGs4ft8wseiSDw6jCHhXad4aqUCjM4U4wMHqEN0UhERyRVRJ1mtAqn7gDv6pQ+wONOgQBZuwMpY9LeBCjAvO+cuqBoeDHDOU88rcDTua6WDYQTNxFRDbo7r5BszlO4/AxPKQTgNOTBhF1xTYGV0wLu/6BHRemnSuNBhqGSBTRdWkKu/wZDwlcz88WlLd+yNDkdvJ+jd6HEd9uCv3jLWozzzfcVdXl6v59/C7M4YHyYtFgLQzmtiFW6c0FJK0S/VcSKAu7R0acM63WP5zee+0cpdUSplxe1b6+A8RxnHZI603jZrPJwQxMz89ikvvX1QyfRfPv0EoFqlXXqyMM0SCAKELTOo7pvHWRV2tfMSsrXzSbPUQ9k2FXFKIKqs5tE9bGhGEPsEaSCD2P7uHtnPKpKAhQAyxA6qWFQB0I2sRAmFq39b/xLxJtS2mONlo4AAAAAElFTkSuQmCC'}],
                                ['xul:menuitem', {label: '香港①  ',oncommand: 'RunSShk();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABc0lEQVR4XsVTvU7CUBT+WitQqCGGmVdgYNTNNxETXZiYSHgJJYGnIAw4sugTsLAwoUETGYxRCMb29h7P6b1QCG4ONPl67r3nft/5ax0iwn8el3FYAecdII300andg2LAWm2je7IJWi3L0iBBHAMqZqsAXlMUGSi1Y2eDATxTA0G/vAoxAdgpNjg7BxXy+Or1oEMRCUEhg/1uuZwwPROZUjLDdV2QyF7VQKMRcqUSvudviMNUwGEoKUMDhqwUIA4i+FySX6+Dpk+gnI+jdhuF2zt42SxoS0SvMyBl6gSL6IjXkwno4gI0uAf5Pkjz2XAIvVpBMxmmD0bAZKCEbGqMFD67XZzIebVqmpr3sej3ES0WaQ+2ShBF61BJhEyxCKpUzNnjQ5LFcRCY/Tq6YCNgx6LthZ/5HFGzieXNNT46HehGA8vZzPpDaDsl4TpTgE4vayC1nnW8Wevd2ZseMZEsJuMxnGeAwr0vbn+t/vhCM4zD/42/2hFVn5BfIpIAAAAASUVORK5CYII='}],
                                ['xul:menuitem', {label: '日本②  ',oncommand: 'RunSSjp2();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABGklEQVR4XsWTMW7CQBRE31pUbhENBUfhChQgKgouQpH0SNRJmXSIig4pqeEYiMYNlpBwYbzyJMp6tUYbpUnBl0bz/eWZ/bOyjST+UwnwWANTFEWUoa5rz+0+gv1GByBNUwOgcCG4TviRpAhZlrkIsVjw+YGentFiQb3d+lOjrZJfxZsNWq3QYY/2B7RcoteXaANvwJ34fEbrNaoqdLsFvL2j0+nOwFpL4tfxQ2UZulyCsGr4ekXHY3jPRXAGYSjU66EkCcKydCyhft+xBO0IYQjqdtFohMrGwEcZj9FggL8uz512BM+az1Gaot3OiYdDNJuFg5qy1v4YRK4YA9MpZjIByT1LDhhAAGGDPM9bX5eltq7/C74e/zd+AXscbYfJObujAAAAAElFTkSuQmCC'}],
                                ['xul:menuitem', {label: '美国②  ',oncommand: 'RunSSus2();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB4ElEQVR4XsWTv2sUQRTHP5PsoVERE1CTIh42/gFWikpMEY2kFSQBRRS0MCKIuIUQxZwWKSUgqBiFqEWaFN5VQcORzh+NBI5AUI4UHoqed5e9vd3Z98ThCAspLfLgw/vOMG++84YZo6r8T3QAW7uBuXx1SUmHCIgFIkBdfpJdQIN1fv747maljQU8gKePjzJbVEYHhNfvOxg7obwsGs4ft8wseiSDw6jCHhXad4aqUCjM4U4wMHqEN0UhERyRVRJ1mtAqn7gDv6pQ+wONOgQBZuwMpY9LeBCjAvO+cuqBoeDHDOU88rcDTua6WDYQTNxFRDbo7r5BszlO4/AxPKQTgNOTBhF1xTYGV0wLu/6BHRemnSuNBhqGSBTRdWkKu/wZDwlcz88WlLd+yNDkdvJ+jd6HEd9uCv3jLWozzzfcVdXl6v59/C7M4YHyYtFgLQzmtiFW6c0FJK0S/VcSKAu7R0acM63WP5zee+0cpdUSplxe1b6+A8RxnHZI603jZrPJwQxMz89ikvvX1QyfRfPv0EoFqlXXqyMM0SCAKELTOo7pvHWRV2tfMSsrXzSbPUQ9k2FXFKIKqs5tE9bGhGEPsEaSCD2P7uHtnPKpKAhQAyxA6qWFQB0I2sRAmFq39b/xLxJtS2mONlo4AAAAAElFTkSuQmCC'}],
                                ['xul:menuitem', {label: '香港②  ',oncommand: 'RunSShk2();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABc0lEQVR4XsVTvU7CUBT+WitQqCGGmVdgYNTNNxETXZiYSHgJJYGnIAw4sugTsLAwoUETGYxRCMb29h7P6b1QCG4ONPl67r3nft/5ax0iwn8el3FYAecdII300andg2LAWm2je7IJWi3L0iBBHAMqZqsAXlMUGSi1Y2eDATxTA0G/vAoxAdgpNjg7BxXy+Or1oEMRCUEhg/1uuZwwPROZUjLDdV2QyF7VQKMRcqUSvudviMNUwGEoKUMDhqwUIA4i+FySX6+Dpk+gnI+jdhuF2zt42SxoS0SvMyBl6gSL6IjXkwno4gI0uAf5Pkjz2XAIvVpBMxmmD0bAZKCEbGqMFD67XZzIebVqmpr3sej3ES0WaQ+2ShBF61BJhEyxCKpUzNnjQ5LFcRCY/Tq6YCNgx6LthZ/5HFGzieXNNT46HehGA8vZzPpDaDsl4TpTgE4vayC1nnW8Wevd2ZseMZEsJuMxnGeAwr0vbn+t/vhCM4zD/42/2hFVn5BfIpIAAAAASUVORK5CYII='}],
                                ['xul:menuitem', {label: 'hosts  ',oncommand: 'UPHosts();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAANwAAADcBYx2BhQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAENSURBVDiNpZO9SsRAFIXPyQ8EG1/AWlgtVh8hEJLK2Nik8n18gmU7K5u1MFZJkxewsNHCYt9BBAnEzLHJLIvsBENudYe557tnZu5QEuaEN0sNILBJlmVXxphC0tmYgOS753kPVVU9AwAlIU3TXNLTlM4kr+u6LgMA6Pv+zff9yymAvu+/dkcg+WiMmaIHSQC4sIClo2gDAJJuXKDAtUFy03VdAQBhGDohBwFW3DTNDwDEcVy4IK45WPi+/2IXQ774twNJ58MlWUdL18RaB1uHk7HY7jtYAbj7W5Ekyevg4BBgtQ9YkzyRdAvg2FY4nveT5L2kNTCMso08z4/atj0d8x1F0UdZlt+7JnO/8y8MoWIWIaNd4AAAAABJRU5ErkJggg=='}],
                                ['xul:menuitem', {label: '启动教程  ',tooltiptext: '右击右下角SS图标扫描屏幕的二维码', oncommand: 'RunSS();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAYAAAAmL5yKAAABEklEQVQokZ2SIW7DQBBFF4YVhYYUhhWVdUmQpf0zs/tllgtUKuoZfALz9giVcoWQgMCCoNDAoFYKcUG9lWs5TpuRFu28P19/xrkri2ShqvW14DqE0Kjq63/AJCKbEEKTX0ppOQp57ycppaWqbkMIDYATgFMr8Ckit6MggPc8DcCh60BVt0M2b2KMjyKy61oVkZ2ZVQCOHYH6F5hSegaw74Jt45pk0f8jmX7CAXDogy38RnLWDw/AkeQsC0xJPphZJSKbHJKq1t77SQhhNeTqbPIxxjnJwjnnzKwacmZm1YWtf2+iLMt7ksnMXroZ5AGjFWOci8hHjPEpC6rqwswqktOLAmZ2B2B/9lj+4kBVF5f6vgB9cLmjfO5AewAAAABJRU5ErkJggg=='}],
                                ['xul:menuitem', {label: '更新修复  ',tooltiptext: '测试中', oncommand: 'updateSSID();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACAUlEQVQ4jY2SLW8bQRCGVzoWGhhiElZgYBhqYlhpgUmkFlwuPsd3e73dnazv5P1Ies119wcEBoUalZWFBJlZKii1YmDJMjCzXOD4+uXaHelBs/POOzOL0J7okn6DDcpnruw0yYthl/QbQQy1fTVVnIfXx0yWL0leDEn28R0dlCPQbs21WyZ5MfR9/+ifxb7vH5Hs9pFrt9w+DGKoEWGiiKkm13aR5p++BoSc7BSIxc09V3Yag36/Kx8x1WSyHH/Iiy+/JYIYaufh9fG+4qoJM2+5tvOfqmAo13YeUtlK8mKY5ndPEZdnu3aTCCO5/PytchAQcsK1XYByqyQvhhe97DTN755Au3XE5RnG2CPZ7WNMVTsRRoJ26zQrHqodXHF1Cdqtt6RZ8RDEUIvFzT2TdsZkOebazpm0M1B2ElPVrixhjL1tt1+hg3LUobIeU9UmwkQdKusdKutd0m9ETDUxxh5CaPNZQLnVnwKbm9tFmhUPBIylg3IEyk64slPQbh2k4g1CCCECxm7slS9/Y2dcuyXXbrkZZQPXdpEII6tzXHF1SYQhRJjoACQCQ3ug/ZDKFsbYe3XglqDc6hDbRXJtF0QYghBCiGs73zX/LkIqWxe97BSUWzFZjjHGHgJlJ/8rkAgjtydng/IZY+yhHmifK/edKzs9xKv9OVNuHFLZQgihH1czpQJLGBo1AAAAAElFTkSuQmCC'}],
                                ['xul:menuitem', {label: '更多账号  ',tooltiptext: '来自逗比根据地',oncommand: 'SSID();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACRklEQVQ4jW2TTUhUYRSG7z4cdRxm5vuSEtq0CGpZWe2CVgVuItqVm343BUGrFhFImxB07r3nMyV0F5EoOveeM+M0FJg/jTqTSVIRSdDPJAoFUtPbQmaae8ezfc97eM7hPZYVKs3OMc3Ur8UsaKayYvNdMxU0mz7tm85wf61ioz1NiimlmCpaDJQYRLwU4uyiPTMALQaKqaLZ9MVGe5oC5uhEb0QJ+VrMdqMQ4uziSnEK99/NY29mEEkm1HSmdGCIEteuiloMWjwbt948BwBcXBS0ejbqdS0GmqnfsizLinvu0Sq2FoMEE3aLQWHjKwDgwLNhxHynYYBiqiSYDluKyakXEkzYk3mIpc1vAIA7b6exK93fSFClUGyKYaHFs+F8LAIANn5v4dTLp2jZaQ2hRUuLWQ8LMd/FofwIPvzcAAC83ixj39QQ4uyGCco7DkgyIZJOoWtuHF+2fgEAbizn0RRehalsKaFS2NyRHcSlYhZXS1O4uzqDrcofPP68iqhnQwkFV1Bs3CC+g7Pzk7i5nMfp2TF0LzKG11aQK68hzi6SEshDytK+6fyfPkJ7xuBaKYfzhTTurc7g5PQTXFhgDH1aDhxSMVXiYh/ZDlIdRZvv4HIxi3OvJnEwP4L9uUd48L6AM7NjaKvLg2JK1ZLYyk6zZiPVG7RnBtC9JLheyuH2ygt0zY0HzUJ+dKI3EviHVnaaFZOjxPxNMqHNd9CRHYQSg6hv17CVuHaDub6UZ59QTI5iU0wIrSuhH5ppSYlrqzQdD/f/A4SWL/ZX6bo4AAAAAElFTkSuQmCC'}],
                                ['xul:menuitem', {label: '上次账号  ',tooltiptext: '使用上次账号启动SS',oncommand: 'backSSID();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAgklEQVQ4jc2SwQ2EMAwEKYRGqGI1Fi3QAfWkM2rJffzIOTlIQDphya94x1470/TqAJYn4gTkYYiZzcDh4jEAsARxBrZe8RaEZR5AMrP5jjiCakvFwrqymsQXNwJJ3VYk7ZJWfyubtK/TuMRXocOypP3nRcJfqDo5pG0jFp41uQT8JT41W5p2QrVvEAAAAABJRU5ErkJggg=='}],
                        ];
        aNode.appendChild(jsonToDOM(myMenuJson, aNode.ownerDocument, {}));
        aNode.setAttribute('menupopup', 'Shadowsocks_pop');
    }
});


//定义图标
var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){'
		 + '#Shadowsocks[cui-areatype="toolbar"] .toolbarbutton-icon {'
		 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAYAAAAmL5yKAAABEklEQVQokZ2SIW7DQBBFF4YVhYYUhhWVdUmQpf0zs/tllgtUKuoZfALz9giVcoWQgMCCoNDAoFYKcUG9lWs5TpuRFu28P19/xrkri2ShqvW14DqE0Kjq63/AJCKbEEKTX0ppOQp57ycppaWqbkMIDYATgFMr8Ckit6MggPc8DcCh60BVt0M2b2KMjyKy61oVkZ2ZVQCOHYH6F5hSegaw74Jt45pk0f8jmX7CAXDogy38RnLWDw/AkeQsC0xJPphZJSKbHJKq1t77SQhhNeTqbPIxxjnJwjnnzKwacmZm1YWtf2+iLMt7ksnMXroZ5AGjFWOci8hHjPEpC6rqwswqktOLAmZ2B2B/9lj+4kBVF5f6vgB9cLmjfO5AewAAAABJRU5ErkJggg==)'
		 + '}}'
     + '#Shadowsocks[cui-areatype="menu-panel"] .toolbarbutton-icon, toolbarpaletteitem[place="palette"]> #Shadowsocks .toolbarbutton-icon {'
		 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAdCAYAAADLnm6HAAACTklEQVRIicWWv2vbQBTHhSFj/4CAx5IhYzQUTAPBewyFepIs7Bpb0h3SHYJ3kk53kDGQrXunbIEMmfIHdAlk8pItY2ZvGYxBXXIgVP10ZfdtEnf3ee9933t3mvafjFI6DILg5uBgz/POAeBBSpkyxu4PDhZCpFLKVEqZYox/HATMGLtXYCFEKoRIkyTZ2rZ9ujcwQmhQBFbfYRi+6Lp+1Dm4LOK8A4SQ207BVREXOdCZ/gqcJMm2CMw53xT9syzrZK9gIUTKGPvNOV93qj9CaAAAd2WpllKmSZJsMcbXAPBcVIBBEPxqDV4ul18A4K4qYillyjl/dxxnQgi5LXPQcZxJp+AMfI0QGiwWC1G2lnO+adT/TcEKHsfxq2VZJ7PZ7HtVhmr1bwNWhwLAs2max6ZpnnHON1UOlOrfFpyBP4xGo0+maR5HUfRWJ9Nf+n9cEo/qgmgCzkXT03X9CACe6vYX9r/needBEPxkjK1U9E00p5ReqTPKKj6/hzG20jStVyZ/z3VdnRACHwPkPe+M6nHf97HaVFXx/9T/8/n8s+/7GAAeOefrTJtdqjWWZX1rUy87z3/DMPqO40wQQgP1bzwef1VZauJAJ/M/a77v4ziOX1V0ddVfp//OhhAaBEFwwxhblTmz8/wvM9u2TwkhkBupPdd1dUrpFQA8ZTuq9fyvM0rpUHVEGIYv2cLMO6mu5E71p5QOVWqjKHozDKNftd4wjH6n779sBqbT6UVnB7d1AGN8fXC4pmkaQuiSMbbay7O6ibmuq5umedbFWX8AAmtvwJnVvooAAAAASUVORK5CYII=)'
		 + '}}';
	var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
	var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
	sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);




//定义函数
function    RunSSjp() { gBrowser.mPrefs.setIntPref("network.proxy.type","1"); var file = FileUtils.getFile('UChrm',['Batch', 'Readssjpid.bat']).launch();};

function    RunSSus() { gBrowser.mPrefs.setIntPref("network.proxy.type","1"); var file = FileUtils.getFile('UChrm',['Batch', 'Readssusid.bat']).launch();};

function    RunSShk() { gBrowser.mPrefs.setIntPref("network.proxy.type","1"); var file = FileUtils.getFile('UChrm',['Batch', 'Readsshkid.bat']).launch();};

function    RunSSjp2() { gBrowser.mPrefs.setIntPref("network.proxy.type","0"); gBrowser.loadURI("http://free.shadowsocks8.cc/images/server03.png"); };

function    RunSSus2() { gBrowser.mPrefs.setIntPref("network.proxy.type","0"); gBrowser.loadURI("http://free.shadowsocks8.cc/images/server01.png"); };

function    RunSShk2() { gBrowser.mPrefs.setIntPref("network.proxy.type","0"); gBrowser.loadURI("http://free.shadowsocks8.cc/images/server02.png"); };

function    UPHosts() { gBrowser.mPrefs.setIntPref("network.proxy.type","1"); var file = FileUtils.getFile('UChrm',['Batch', 'update-Hosts.bat']).launch();};

function    RunSS() { gBrowser.mPrefs.setIntPref("network.proxy.type","0"); gBrowser.loadURI("http://71bbs.people.com.cn/postImages/78/96/78/2B/1483786844203.gif"); };

function    updateSSID() { gBrowser.mPrefs.setIntPref("network.proxy.type","1"); var file = FileUtils.getFile('UChrm',['Batch', 'update-SSID.bat']).launch();};

function    SSID() { gBrowser.mPrefs.setIntPref("network.proxy.type","0"); gBrowser.loadURI("https://doub.io/sszhfx"); };

function    backSSID() { gBrowser.mPrefs.setIntPref("network.proxy.type","1"); var file = FileUtils.getFile('UChrm',['Batch', 'back-SSID.bat']).launch();};

