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
                                ['xul:menuitem', {label: '启动飞机  ',oncommand: 'RunSS();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAYAAAAmL5yKAAABEklEQVQokZ2SIW7DQBBFF4YVhYYUhhWVdUmQpf0zs/tllgtUKuoZfALz9giVcoWQgMCCoNDAoFYKcUG9lWs5TpuRFu28P19/xrkri2ShqvW14DqE0Kjq63/AJCKbEEKTX0ppOQp57ycppaWqbkMIDYATgFMr8Ckit6MggPc8DcCh60BVt0M2b2KMjyKy61oVkZ2ZVQCOHYH6F5hSegaw74Jt45pk0f8jmX7CAXDogy38RnLWDw/AkeQsC0xJPphZJSKbHJKq1t77SQhhNeTqbPIxxjnJwjnnzKwacmZm1YWtf2+iLMt7ksnMXroZ5AGjFWOci8hHjPEpC6rqwswqktOLAmZ2B2B/9lj+4kBVF5f6vgB9cLmjfO5AewAAAABJRU5ErkJggg=='}],
                              //['xul:menuitem', {label: '上次账号  ',tooltiptext: '使用上次账号启动SS-可退5次',oncommand: 'backSSID();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAgklEQVQ4jc2SwQ2EMAwEKYRGqGI1Fi3QAfWkM2rJffzIOTlIQDphya94x1470/TqAJYn4gTkYYiZzcDh4jEAsARxBrZe8RaEZR5AMrP5jjiCakvFwrqymsQXNwJJ3VYk7ZJWfyubtK/TuMRXocOypP3nRcJfqDo5pG0jFp41uQT8JT41W5p2QrVvEAAAAABJRU5ErkJggg=='}],
                                ['xul:menuitem', {label: '日本①  ',oncommand: 'RunSSjp1();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABGklEQVR4XsWTMW7CQBRE31pUbhENBUfhChQgKgouQpH0SNRJmXSIig4pqeEYiMYNlpBwYbzyJMp6tUYbpUnBl0bz/eWZ/bOyjST+UwnwWANTFEWUoa5rz+0+gv1GByBNUwOgcCG4TviRpAhZlrkIsVjw+YGentFiQb3d+lOjrZJfxZsNWq3QYY/2B7RcoteXaANvwJ34fEbrNaoqdLsFvL2j0+nOwFpL4tfxQ2UZulyCsGr4ekXHY3jPRXAGYSjU66EkCcKydCyhft+xBO0IYQjqdtFohMrGwEcZj9FggL8uz512BM+az1Gaot3OiYdDNJuFg5qy1v4YRK4YA9MpZjIByT1LDhhAAGGDPM9bX5eltq7/C74e/zd+AXscbYfJObujAAAAAElFTkSuQmCC'}],
                                ['xul:menuitem', {label: '日本②  ',oncommand: 'RunSSjp2();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABGklEQVR4XsWTMW7CQBRE31pUbhENBUfhChQgKgouQpH0SNRJmXSIig4pqeEYiMYNlpBwYbzyJMp6tUYbpUnBl0bz/eWZ/bOyjST+UwnwWANTFEWUoa5rz+0+gv1GByBNUwOgcCG4TviRpAhZlrkIsVjw+YGentFiQb3d+lOjrZJfxZsNWq3QYY/2B7RcoteXaANvwJ34fEbrNaoqdLsFvL2j0+nOwFpL4tfxQ2UZulyCsGr4ekXHY3jPRXAGYSjU66EkCcKydCyhft+xBO0IYQjqdtFohMrGwEcZj9FggL8uz512BM+az1Gaot3OiYdDNJuFg5qy1v4YRK4YA9MpZjIByT1LDhhAAGGDPM9bX5eltq7/C74e/zd+AXscbYfJObujAAAAAElFTkSuQmCC'}],
                                ['xul:menuitem', {label: '日本③  ',oncommand: 'RunSSjp3();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABGklEQVR4XsWTMW7CQBRE31pUbhENBUfhChQgKgouQpH0SNRJmXSIig4pqeEYiMYNlpBwYbzyJMp6tUYbpUnBl0bz/eWZ/bOyjST+UwnwWANTFEWUoa5rz+0+gv1GByBNUwOgcCG4TviRpAhZlrkIsVjw+YGentFiQb3d+lOjrZJfxZsNWq3QYY/2B7RcoteXaANvwJ34fEbrNaoqdLsFvL2j0+nOwFpL4tfxQ2UZulyCsGr4ekXHY3jPRXAGYSjU66EkCcKydCyhft+xBO0IYQjqdtFohMrGwEcZj9FggL8uz512BM+az1Gaot3OiYdDNJuFg5qy1v4YRK4YA9MpZjIByT1LDhhAAGGDPM9bX5eltq7/C74e/zd+AXscbYfJObujAAAAAElFTkSuQmCC'}],
                                ['xul:menuitem', {label: '日本④  ',oncommand: 'RunSSjp4();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABGklEQVR4XsWTMW7CQBRE31pUbhENBUfhChQgKgouQpH0SNRJmXSIig4pqeEYiMYNlpBwYbzyJMp6tUYbpUnBl0bz/eWZ/bOyjST+UwnwWANTFEWUoa5rz+0+gv1GByBNUwOgcCG4TviRpAhZlrkIsVjw+YGentFiQb3d+lOjrZJfxZsNWq3QYY/2B7RcoteXaANvwJ34fEbrNaoqdLsFvL2j0+nOwFpL4tfxQ2UZulyCsGr4ekXHY3jPRXAGYSjU66EkCcKydCyhft+xBO0IYQjqdtFohMrGwEcZj9FggL8uz512BM+az1Gaot3OiYdDNJuFg5qy1v4YRK4YA9MpZjIByT1LDhhAAGGDPM9bX5eltq7/C74e/zd+AXscbYfJObujAAAAAElFTkSuQmCC'}],
                                ['xul:menuitem', {label: '美国①  ',oncommand: 'RunSSus1();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB4ElEQVR4XsWTv2sUQRTHP5PsoVERE1CTIh42/gFWikpMEY2kFSQBRRS0MCKIuIUQxZwWKSUgqBiFqEWaFN5VQcORzh+NBI5AUI4UHoqed5e9vd3Z98ThCAspLfLgw/vOMG++84YZo6r8T3QAW7uBuXx1SUmHCIgFIkBdfpJdQIN1fv747maljQU8gKePjzJbVEYHhNfvOxg7obwsGs4ft8wseiSDw6jCHhXad4aqUCjM4U4wMHqEN0UhERyRVRJ1mtAqn7gDv6pQ+wONOgQBZuwMpY9LeBCjAvO+cuqBoeDHDOU88rcDTua6WDYQTNxFRDbo7r5BszlO4/AxPKQTgNOTBhF1xTYGV0wLu/6BHRemnSuNBhqGSBTRdWkKu/wZDwlcz88WlLd+yNDkdvJ+jd6HEd9uCv3jLWozzzfcVdXl6v59/C7M4YHyYtFgLQzmtiFW6c0FJK0S/VcSKAu7R0acM63WP5zee+0cpdUSplxe1b6+A8RxnHZI603jZrPJwQxMz89ikvvX1QyfRfPv0EoFqlXXqyMM0SCAKELTOo7pvHWRV2tfMSsrXzSbPUQ9k2FXFKIKqs5tE9bGhGEPsEaSCD2P7uHtnPKpKAhQAyxA6qWFQB0I2sRAmFq39b/xLxJtS2mONlo4AAAAAElFTkSuQmCC'}],
                                ['xul:menuitem', {label: '美国②  ',oncommand: 'RunSSus2();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB4ElEQVR4XsWTv2sUQRTHP5PsoVERE1CTIh42/gFWikpMEY2kFSQBRRS0MCKIuIUQxZwWKSUgqBiFqEWaFN5VQcORzh+NBI5AUI4UHoqed5e9vd3Z98ThCAspLfLgw/vOMG++84YZo6r8T3QAW7uBuXx1SUmHCIgFIkBdfpJdQIN1fv747maljQU8gKePjzJbVEYHhNfvOxg7obwsGs4ft8wseiSDw6jCHhXad4aqUCjM4U4wMHqEN0UhERyRVRJ1mtAqn7gDv6pQ+wONOgQBZuwMpY9LeBCjAvO+cuqBoeDHDOU88rcDTua6WDYQTNxFRDbo7r5BszlO4/AxPKQTgNOTBhF1xTYGV0wLu/6BHRemnSuNBhqGSBTRdWkKu/wZDwlcz88WlLd+yNDkdvJ+jd6HEd9uCv3jLWozzzfcVdXl6v59/C7M4YHyYtFgLQzmtiFW6c0FJK0S/VcSKAu7R0acM63WP5zee+0cpdUSplxe1b6+A8RxnHZI603jZrPJwQxMz89ikvvX1QyfRfPv0EoFqlXXqyMM0SCAKELTOo7pvHWRV2tfMSsrXzSbPUQ9k2FXFKIKqs5tE9bGhGEPsEaSCD2P7uHtnPKpKAhQAyxA6qWFQB0I2sRAmFq39b/xLxJtS2mONlo4AAAAAElFTkSuQmCC'}],
                                ['xul:menuitem', {label: '美国③  ',oncommand: 'RunSSus3();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB4ElEQVR4XsWTv2sUQRTHP5PsoVERE1CTIh42/gFWikpMEY2kFSQBRRS0MCKIuIUQxZwWKSUgqBiFqEWaFN5VQcORzh+NBI5AUI4UHoqed5e9vd3Z98ThCAspLfLgw/vOMG++84YZo6r8T3QAW7uBuXx1SUmHCIgFIkBdfpJdQIN1fv747maljQU8gKePjzJbVEYHhNfvOxg7obwsGs4ft8wseiSDw6jCHhXad4aqUCjM4U4wMHqEN0UhERyRVRJ1mtAqn7gDv6pQ+wONOgQBZuwMpY9LeBCjAvO+cuqBoeDHDOU88rcDTua6WDYQTNxFRDbo7r5BszlO4/AxPKQTgNOTBhF1xTYGV0wLu/6BHRemnSuNBhqGSBTRdWkKu/wZDwlcz88WlLd+yNDkdvJ+jd6HEd9uCv3jLWozzzfcVdXl6v59/C7M4YHyYtFgLQzmtiFW6c0FJK0S/VcSKAu7R0acM63WP5zee+0cpdUSplxe1b6+A8RxnHZI603jZrPJwQxMz89ikvvX1QyfRfPv0EoFqlXXqyMM0SCAKELTOo7pvHWRV2tfMSsrXzSbPUQ9k2FXFKIKqs5tE9bGhGEPsEaSCD2P7uHtnPKpKAhQAyxA6qWFQB0I2sRAmFq39b/xLxJtS2mONlo4AAAAAElFTkSuQmCC'}],
                                ['xul:menuitem', {label: '美国④  ',oncommand: 'RunSSus4();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB4ElEQVR4XsWTv2sUQRTHP5PsoVERE1CTIh42/gFWikpMEY2kFSQBRRS0MCKIuIUQxZwWKSUgqBiFqEWaFN5VQcORzh+NBI5AUI4UHoqed5e9vd3Z98ThCAspLfLgw/vOMG++84YZo6r8T3QAW7uBuXx1SUmHCIgFIkBdfpJdQIN1fv747maljQU8gKePjzJbVEYHhNfvOxg7obwsGs4ft8wseiSDw6jCHhXad4aqUCjM4U4wMHqEN0UhERyRVRJ1mtAqn7gDv6pQ+wONOgQBZuwMpY9LeBCjAvO+cuqBoeDHDOU88rcDTua6WDYQTNxFRDbo7r5BszlO4/AxPKQTgNOTBhF1xTYGV0wLu/6BHRemnSuNBhqGSBTRdWkKu/wZDwlcz88WlLd+yNDkdvJ+jd6HEd9uCv3jLWozzzfcVdXl6v59/C7M4YHyYtFgLQzmtiFW6c0FJK0S/VcSKAu7R0acM63WP5zee+0cpdUSplxe1b6+A8RxnHZI603jZrPJwQxMz89ikvvX1QyfRfPv0EoFqlXXqyMM0SCAKELTOo7pvHWRV2tfMSsrXzSbPUQ9k2FXFKIKqs5tE9bGhGEPsEaSCD2P7uHtnPKpKAhQAyxA6qWFQB0I2sRAmFq39b/xLxJtS2mONlo4AAAAAElFTkSuQmCC'}],
                                ['xul:menuitem', {label: '新加坡①  ',oncommand: 'RunSSsg1();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABRUlEQVR4XsWTsW4iMRRFjz2OEhAVSoMSkg+AD4HvoSZlvoNvoKJAASqitNDTRCIpFmmK3SW25zm2sMSuolWySsEbHd3rke59cmEVQuA7o4HTFqhXCAKYWg2sxVcVAglI+g88hzECXD49UXS72PkcWa3QnQ5SlvjHR4L3CXAOST5qyPo8HmMAihhwyyV+OsX0euxHI/TNDerqGjd7OIRsxFnE2nSmaLfxgAEIVUVxe8t+u0UmEy4Gg7SFX3d3KYi4FLKHklwgCUAL4BYLaDY56/eR7Qu/7+/5ORymbUfejr7KJRYwBqjWa+xsRkBBowH+HF2vI/nuOpK3gvcoF2m1MBB9WQYdQyEE0kcg+U/RWvNjs0ELx8BXw+SMB7SIkH/8N3iPEZG/Wv8cpRQfRwEBAAEMIux3uyiS8YhP+hEiPqvkutO/xndPo2JKPsNXegAAAABJRU5ErkJggg=='}],
                                ['xul:menuitem', {label: '新加坡②  ',oncommand: 'RunSSsg2();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABRUlEQVR4XsWTsW4iMRRFjz2OEhAVSoMSkg+AD4HvoSZlvoNvoKJAASqitNDTRCIpFmmK3SW25zm2sMSuolWySsEbHd3rke59cmEVQuA7o4HTFqhXCAKYWg2sxVcVAglI+g88hzECXD49UXS72PkcWa3QnQ5SlvjHR4L3CXAOST5qyPo8HmMAihhwyyV+OsX0euxHI/TNDerqGjd7OIRsxFnE2nSmaLfxgAEIVUVxe8t+u0UmEy4Gg7SFX3d3KYi4FLKHklwgCUAL4BYLaDY56/eR7Qu/7+/5ORymbUfejr7KJRYwBqjWa+xsRkBBowH+HF2vI/nuOpK3gvcoF2m1MBB9WQYdQyEE0kcg+U/RWvNjs0ELx8BXw+SMB7SIkH/8N3iPEZG/Wv8cpRQfRwEBAAEMIux3uyiS8YhP+hEiPqvkutO/xndPo2JKPsNXegAAAABJRU5ErkJggg=='}],
                                ['xul:menuitem', {label: '新加坡③  ',oncommand: 'RunSSsg3();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABRUlEQVR4XsWTsW4iMRRFjz2OEhAVSoMSkg+AD4HvoSZlvoNvoKJAASqitNDTRCIpFmmK3SW25zm2sMSuolWySsEbHd3rke59cmEVQuA7o4HTFqhXCAKYWg2sxVcVAglI+g88hzECXD49UXS72PkcWa3QnQ5SlvjHR4L3CXAOST5qyPo8HmMAihhwyyV+OsX0euxHI/TNDerqGjd7OIRsxFnE2nSmaLfxgAEIVUVxe8t+u0UmEy4Gg7SFX3d3KYi4FLKHklwgCUAL4BYLaDY56/eR7Qu/7+/5ORymbUfejr7KJRYwBqjWa+xsRkBBowH+HF2vI/nuOpK3gvcoF2m1MBB9WQYdQyEE0kcg+U/RWvNjs0ELx8BXw+SMB7SIkH/8N3iPEZG/Wv8cpRQfRwEBAAEMIux3uyiS8YhP+hEiPqvkutO/xndPo2JKPsNXegAAAABJRU5ErkJggg=='}],
                                ['xul:menuitem', {label: '新加坡④  ',oncommand: 'RunSSsg4();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABRUlEQVR4XsWTsW4iMRRFjz2OEhAVSoMSkg+AD4HvoSZlvoNvoKJAASqitNDTRCIpFmmK3SW25zm2sMSuolWySsEbHd3rke59cmEVQuA7o4HTFqhXCAKYWg2sxVcVAglI+g88hzECXD49UXS72PkcWa3QnQ5SlvjHR4L3CXAOST5qyPo8HmMAihhwyyV+OsX0euxHI/TNDerqGjd7OIRsxFnE2nSmaLfxgAEIVUVxe8t+u0UmEy4Gg7SFX3d3KYi4FLKHklwgCUAL4BYLaDY56/eR7Qu/7+/5ORymbUfejr7KJRYwBqjWa+xsRkBBowH+HF2vI/nuOpK3gvcoF2m1MBB9WQYdQyEE0kcg+U/RWvNjs0ELx8BXw+SMB7SIkH/8N3iPEZG/Wv8cpRQfRwEBAAEMIux3uyiS8YhP+hEiPqvkutO/xndPo2JKPsNXegAAAABJRU5ErkJggg=='}],
                                ['xul:menuitem', {label: '启动教程  ',tooltiptext: '右击右下角SS图标扫描屏幕的二维码', oncommand: 'RunJC();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAYAAAAmL5yKAAABEklEQVQokZ2SIW7DQBBFF4YVhYYUhhWVdUmQpf0zs/tllgtUKuoZfALz9giVcoWQgMCCoNDAoFYKcUG9lWs5TpuRFu28P19/xrkri2ShqvW14DqE0Kjq63/AJCKbEEKTX0ppOQp57ycppaWqbkMIDYATgFMr8Ckit6MggPc8DcCh60BVt0M2b2KMjyKy61oVkZ2ZVQCOHYH6F5hSegaw74Jt45pk0f8jmX7CAXDogy38RnLWDw/AkeQsC0xJPphZJSKbHJKq1t77SQhhNeTqbPIxxjnJwjnnzKwacmZm1YWtf2+iLMt7ksnMXroZ5AGjFWOci8hHjPEpC6rqwswqktOLAmZ2B2B/9lj+4kBVF5f6vgB9cLmjfO5AewAAAABJRU5ErkJggg=='}],
                                ['xul:menuitem', {label: '更新修复  ',tooltiptext: '测试中', oncommand: 'updateSSID();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACAUlEQVQ4jY2SLW8bQRCGVzoWGhhiElZgYBhqYlhpgUmkFlwuPsd3e73dnazv5P1Ies119wcEBoUalZWFBJlZKii1YmDJMjCzXOD4+uXaHelBs/POOzOL0J7okn6DDcpnruw0yYthl/QbQQy1fTVVnIfXx0yWL0leDEn28R0dlCPQbs21WyZ5MfR9/+ifxb7vH5Hs9pFrt9w+DGKoEWGiiKkm13aR5p++BoSc7BSIxc09V3Yag36/Kx8x1WSyHH/Iiy+/JYIYaufh9fG+4qoJM2+5tvOfqmAo13YeUtlK8mKY5ndPEZdnu3aTCCO5/PytchAQcsK1XYByqyQvhhe97DTN755Au3XE5RnG2CPZ7WNMVTsRRoJ26zQrHqodXHF1Cdqtt6RZ8RDEUIvFzT2TdsZkOebazpm0M1B2ElPVrixhjL1tt1+hg3LUobIeU9UmwkQdKusdKutd0m9ETDUxxh5CaPNZQLnVnwKbm9tFmhUPBIylg3IEyk64slPQbh2k4g1CCCECxm7slS9/Y2dcuyXXbrkZZQPXdpEII6tzXHF1SYQhRJjoACQCQ3ug/ZDKFsbYe3XglqDc6hDbRXJtF0QYghBCiGs73zX/LkIqWxe97BSUWzFZjjHGHgJlJ/8rkAgjtydng/IZY+yhHmifK/edKzs9xKv9OVNuHFLZQgihH1czpQJLGBo1AAAAAElFTkSuQmCC'}],
                                ['xul:menuitem', {label: '更多账号  ',tooltiptext: 'Alvin9999主页',oncommand: 'SSID();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACRklEQVQ4jW2TTUhUYRSG7z4cdRxm5vuSEtq0CGpZWe2CVgVuItqVm343BUGrFhFImxB07r3nMyV0F5EoOveeM+M0FJg/jTqTSVIRSdDPJAoFUtPbQmaae8ezfc97eM7hPZYVKs3OMc3Ur8UsaKayYvNdMxU0mz7tm85wf61ioz1NiimlmCpaDJQYRLwU4uyiPTMALQaKqaLZ9MVGe5oC5uhEb0QJ+VrMdqMQ4uziSnEK99/NY29mEEkm1HSmdGCIEteuiloMWjwbt948BwBcXBS0ejbqdS0GmqnfsizLinvu0Sq2FoMEE3aLQWHjKwDgwLNhxHynYYBiqiSYDluKyakXEkzYk3mIpc1vAIA7b6exK93fSFClUGyKYaHFs+F8LAIANn5v4dTLp2jZaQ2hRUuLWQ8LMd/FofwIPvzcAAC83ixj39QQ4uyGCco7DkgyIZJOoWtuHF+2fgEAbizn0RRehalsKaFS2NyRHcSlYhZXS1O4uzqDrcofPP68iqhnQwkFV1Bs3CC+g7Pzk7i5nMfp2TF0LzKG11aQK68hzi6SEshDytK+6fyfPkJ7xuBaKYfzhTTurc7g5PQTXFhgDH1aDhxSMVXiYh/ZDlIdRZvv4HIxi3OvJnEwP4L9uUd48L6AM7NjaKvLg2JK1ZLYyk6zZiPVG7RnBtC9JLheyuH2ygt0zY0HzUJ+dKI3EviHVnaaFZOjxPxNMqHNd9CRHYQSg6hv17CVuHaDub6UZ59QTI5iU0wIrSuhH5ppSYlrqzQdD/f/A4SWL/ZX6bo4AAAAAElFTkSuQmCC'}],
                                ['xul:menuseparator'],
                                ['xul:menuitem', {label: 'hosts更新  ',oncommand: 'UPHosts();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAANwAAADcBYx2BhQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAENSURBVDiNpZO9SsRAFIXPyQ8EG1/AWlgtVh8hEJLK2Nik8n18gmU7K5u1MFZJkxewsNHCYt9BBAnEzLHJLIvsBENudYe557tnZu5QEuaEN0sNILBJlmVXxphC0tmYgOS753kPVVU9AwAlIU3TXNLTlM4kr+u6LgMA6Pv+zff9yymAvu+/dkcg+WiMmaIHSQC4sIClo2gDAJJuXKDAtUFy03VdAQBhGDohBwFW3DTNDwDEcVy4IK45WPi+/2IXQ774twNJ58MlWUdL18RaB1uHk7HY7jtYAbj7W5Ekyevg4BBgtQ9YkzyRdAvg2FY4nveT5L2kNTCMso08z4/atj0d8x1F0UdZlt+7JnO/8y8MoWIWIaNd4AAAAABJRU5ErkJggg=='}],
                                ['xul:menuitem', {label: 'hosts还原  ',oncommand: 'HostsBackup();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAANwAAADcBYx2BhQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAENSURBVDiNpZO9SsRAFIXPyQ8EG1/AWlgtVh8hEJLK2Nik8n18gmU7K5u1MFZJkxewsNHCYt9BBAnEzLHJLIvsBENudYe557tnZu5QEuaEN0sNILBJlmVXxphC0tmYgOS753kPVVU9AwAlIU3TXNLTlM4kr+u6LgMA6Pv+zff9yymAvu+/dkcg+WiMmaIHSQC4sIClo2gDAJJuXKDAtUFy03VdAQBhGDohBwFW3DTNDwDEcVy4IK45WPi+/2IXQ774twNJ58MlWUdL18RaB1uHk7HY7jtYAbj7W5Ekyevg4BBgtQ9YkzyRdAvg2FY4nveT5L2kNTCMso08z4/atj0d8x1F0UdZlt+7JnO/8y8MoWIWIaNd4AAAAABJRU5ErkJggg=='}],
                                ['xul:menuseparator'],
                                ['xul:menuitem', {label: 'GoAgent  ',oncommand: 'RunGae();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAChElEQVQ4jYWSQUhaARjH3ykmMceiQyNpeBk1Dy0I2qPoGSVzolMHD6zVGOQKctJsBQUhEnsdDLQiIiQGISTVoahBLsi20JwEsyg76Fbx1sW3R7iItsOe/x3Wc+ZYffC7fb//xx8+gsgZ41hIr3MFV9WDK7yIss93UGbsGlMopAW5+xdGRtISw3CQjx19h20qgrr+edT1z4PqnUGDYxFlxq6xqwPcIWE6zMI2FUGDYxFU7wxqur2gemcgrzev/1fWONeKNM61ouqOoY3y5oEtkZpuL0Tk9eZ1hUJagFTTzQuizhVcNQwHM33JF+NJkZpuL8jON6i0eHDP2Bblt/Usjk2prbfVkzKSlhCPRiKTBndI0DoDUDN+qBk/GhyLme6iXGnxoIK2hpObKh6HWoBVQkPmNRJ6dyihdQYgBmTL2ddvP/H8sjnalnGgOk3HKYBVYqJPOkoYhoN8tlzdM3dS22rfqWrqjIpU0NawzdG2/DXy4HM6TkHYrQLi5fAxhQuEenCFz5ZdHtsSlzDvc7EWjou1cPy2nk1uqnjxsrBbBWFLAezJzwNe+yOZgI6hDS5h3sdZD/Dt+R+OTMChFtmyEC2BEC2B/dm1AaJUZ7Eb3CFBzfhR22rf4WItXEY8l8EqkY5TQLwc2JMDe3L8eH/jrKyYuE/ISFpSqrPYK2hr+A6l82YHJDdVvH+y9JPI0khxZJbJD8wy+QENmdf4zzMpFNKCk4OnKfHySZT6+eXd3aSI6+X1uUtfOfHxoRTHplRuZ5x+AE7HMcvkBy4NIAiCiAeoabBKgFX+7XxkQjpOwfqYeHVlgIykJdbmW+3TzpIpH1O44GMKFyb6pKMaMq9RRtKS3P3fAmvbyVVPmI0AAAAASUVORK5CYII='}],
                                ['xul:menuitem', {label: 'GoProxy  ',oncommand: 'RunGop();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAChElEQVQ4jYWSQUhaARjH3ykmMceiQyNpeBk1Dy0I2qPoGSVzolMHD6zVGOQKctJsBQUhEnsdDLQiIiQGISTVoahBLsi20JwEsyg76Fbx1sW3R7iItsOe/x3Wc+ZYffC7fb//xx8+gsgZ41hIr3MFV9WDK7yIss93UGbsGlMopAW5+xdGRtISw3CQjx19h20qgrr+edT1z4PqnUGDYxFlxq6xqwPcIWE6zMI2FUGDYxFU7wxqur2gemcgrzev/1fWONeKNM61ouqOoY3y5oEtkZpuL0Tk9eZ1hUJagFTTzQuizhVcNQwHM33JF+NJkZpuL8jON6i0eHDP2Bblt/Usjk2prbfVkzKSlhCPRiKTBndI0DoDUDN+qBk/GhyLme6iXGnxoIK2hpObKh6HWoBVQkPmNRJ6dyihdQYgBmTL2ddvP/H8sjnalnGgOk3HKYBVYqJPOkoYhoN8tlzdM3dS22rfqWrqjIpU0NawzdG2/DXy4HM6TkHYrQLi5fAxhQuEenCFz5ZdHtsSlzDvc7EWjou1cPy2nk1uqnjxsrBbBWFLAezJzwNe+yOZgI6hDS5h3sdZD/Dt+R+OTMChFtmyEC2BEC2B/dm1AaJUZ7Eb3CFBzfhR22rf4WItXEY8l8EqkY5TQLwc2JMDe3L8eH/jrKyYuE/ISFpSqrPYK2hr+A6l82YHJDdVvH+y9JPI0khxZJbJD8wy+QENmdf4zzMpFNKCk4OnKfHySZT6+eXd3aSI6+X1uUtfOfHxoRTHplRuZ5x+AE7HMcvkBy4NIAiCiAeoabBKgFX+7XxkQjpOwfqYeHVlgIykJdbmW+3TzpIpH1O44GMKFyb6pKMaMq9RRtKS3P3fAmvbyVVPmI0AAAAASUVORK5CYII='}],
                                ['xul:menuitem', {label: 'GAEip更新  ',tooltiptext: 'Alvin9999维护',oncommand: 'UPGAEip1();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAvUlEQVQ4ja3TMQrEIBAFUFshYCF4g7Q5pK1VStu09iklpExnI+lS5hh/i2XYTMwuMazwG8d5MqBCCCFslHgSQc3DqjHtXVWGVb8RGyWmvUPIBsOqWXxS8EkV+yEbTHvHgfOhfmlA6wphwLi17NZjMwD0S1MA49ZeA+fm2wDNS4CNkgFUp3wFCHHzB3CzrAN8UvVAvzQsxxFslEWdASGbaiBk82fAzbIIvfmr2i3gVxjgk0LIpio+Kf4jn37nF0kui1H/Y0oiAAAAAElFTkSuQmCC'}],
                                ['xul:menuitem', {label: 'GAEip更新  ',tooltiptext: 'Alvin9999维护',oncommand: 'UPGAEip2();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA1UlEQVQ4jZ2TLQ7EIBCFkZCQJojKHqGHxOJwq5DVPQECi6giTS/Qa8yKDZOZbml3S/IEP++bFxiEEELYKOGJRDVPaw9xH//StPYfiI0SF6pCMRCKgdfSwWvpcE7PxH08B4RiwGcNx+GzZpAvQK0SimEmlxTOaZpLAI1O09QUtwAKogmagHkbsCoVNbuk2N68DW2AzxpslGi2UYLP+hrgs0admY9qAmhs2nUuKXBJ3QNo9eNoAqa1xwouqWbv0zOsledtYJu/iCWot0p7/Ur11diPfPqd356ij8kokqZTAAAAAElFTkSuQmCC'}],
                                ['xul:menuseparator'],
                                ['xul:menuitem', {label: 'Lantern  ',oncommand: 'Lantern();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABjElEQVQ4jZXTP0gCcRQH8N+hOIjb7Y2FpjZJg3U45CKIKcaJq/+oRUQUQgQJBCUEBxWcHJwEwcG5TgjC4QYhQhNUdDkwQ9Eh/Z3Ha/KmztPhTe/xgS/vPYQQIqRKbXA61AanY98MkmzoPRZkpMPISIfRqfPiaEBFhWqEzg0Ksx9UVKh2HKD3WDQmL78DSFtUMPvT1oOAs7skozD7gdC5gdC5gbRFBS2dAiqQhevA85ss4Esk2fvHIKSegiKQL6chX06DL5FkZYFNL1bFw5zQZ4si0GeLgIc5YdOLVeWBUTGOuTpM+k0gdG7Q0imY9JuAuTpsRsW4LLAeV+z8rAVTriMCU64D/KwF63HFLgssuwVyO28Lq8VABFaLAWznbWHZLZAHrRF/v37tACqQhdViAPzP+8fBd4C5RglzdRHYztsC5hqlg4H1uGLHw5ygMXl5KpAFzNWl8v8PLLsFcvP5wJ9c0eCKZAAPc1L5pX/hl718Ob+5BVckAxL73w8wDFKqDU6H2Z+2MgxSSs39AZSp4jf3ZncDAAAAAElFTkSuQmCC'}],
                                ['xul:menuseparator'],
                                ['xul:menuitem', {label: '自动代理  ',tooltiptext: 'Alvin9999维护',oncommand: 'AutoPAN1();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAdklEQVQ4jd3Tuw2EMBCEYWdXAwmRG5j5+3BXNOPGXIALgGTJ7iRsjoRgpA1WX7CPBCxAtd1HAlRgSVHsk6kptCnAdn8UaLa3yNeen4DtLqnknD/ACrRhAGiSSmxpDDjzEiAGOQfY3iSV4TX+65CuAdx9Jm6+8wEO54DJFSlwIQAAAABJRU5ErkJggg=='}],
                                ['xul:menuitem', {label: '自动代理  ',tooltiptext: 'Alvin9999维护',oncommand: 'AutoPAN2();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAkElEQVQ4jbWTsRHFIAxDGYE9UliWe3bJOpnF47AJAyQN/OP+/Z8LcCnUUMg8yQ4AIkknWQblAGIg6WZ2zoikB5JlwaC8Y1AZD1VNqpr+Yd79IIvIRnJX1QQgmlkeQujec23qmMqg1fUL44lBm77PtPDJYabGDCC26VXPEUi6iGy9hkNsO//VyDubuHZMq+d8AWyyecOWpfyJAAAAAElFTkSuQmCC'}],
                                ['xul:menuitem', {label: '自动代理  ',tooltiptext: 'Alvin9999维护',oncommand: 'AutoPAN3();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAkklEQVQ4jbWTuxEDIQwFlbuE6wHNvE3ph3KowhnlUAkN2AlkBhtuHChDi1Yfc/dLUgHaTkgq7n5ZT36dhKRinXgEANr/AJIyEIG40JwCWk9MQAwhPIB6pCCpmNms2UtAHb/3SrabWIeCu1/HCkDrCp+qmAKqpCQpS0pmZsBzCzBG2KeRTxfpu94Pj9aA28d095zfB2F5FwRPRccAAAAASUVORK5CYII='}],
                                ['xul:menuitem', {label: '自动代理  ',tooltiptext: 'Alvin9999维护',oncommand: 'AutoPAN4();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAkklEQVQ4jb3TsRHEMAgEQPek+Dq4WpzTDrVQAk1QBHMf2dF7LNnzH1ymWUADW1XJzARgKWamqtJmZhpjPIqZaQPwGADwY4Ck3F1XY94CEaHuVkSsA8cvZ+Y6QFJVpX3fFRFrAABFxAlkpjJTJOeAo/qR7lZ3y93nRwAgkiJ5dnD17nYP3P1r9f8s0hTw+pjenvMHLIHepUFX08oAAAAASUVORK5CYII='}],
                                ['xul:menuitem', {label: '自动代理  ',tooltiptext: 'Alvin9999维护',oncommand: 'AutoPAN5();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAmElEQVQ4jbWTsREDMQgE1ZPCHyqhBsU0QSXXA42oBDogOkf+yPZbejvYdJkDrmUmzYwisoSZMTPZzIy99y3MjE1EtgUi8kfBGIMATlR1TRARzExGBCNiXTDnJAB+ingpqCpmJgHwOI41gapSVQmAVUV3379CVRHA94LnZHdnRLCqOMZYE8w5T95962WEV4v7/SfeLtPdOj8ALzDc+1EgNs0AAAAASUVORK5CYII='}],
                                
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
function    RunSS() { gBrowser.mPrefs.setIntPref("network.proxy.type","1"); var file = FileUtils.getFile('UChrm',['Batch', 'Shadowsocks.exe']).launch();};
//function    backSSID() { gBrowser.mPrefs.setIntPref("network.proxy.type","1"); var file = FileUtils.getFile('UChrm',['Batch', 'back-SSID.bat']).launch();};

function    RunSSjp1() { gBrowser.mPrefs.setIntPref("network.proxy.type","0"); gBrowser.loadURI("http://ss8.pm/images/server03.png"); };
function    RunSSjp2() { gBrowser.mPrefs.setIntPref("network.proxy.type","0"); gBrowser.loadURI("http://isx.yt/img/qr/jpaxxoo.png"); };
function    RunSSjp3() { gBrowser.mPrefs.setIntPref("network.proxy.type","0"); gBrowser.loadURI("http://isx.yt/img/qr/jpbxxoo.png"); };
function    RunSSjp4() { gBrowser.mPrefs.setIntPref("network.proxy.type","0"); gBrowser.loadURI("http://isx.yt/img/qr/jpcxxoo.png"); };

function    RunSSus1() { gBrowser.mPrefs.setIntPref("network.proxy.type","0"); gBrowser.loadURI("http://ss8.pm/images/server01.png"); };
function    RunSSus2() { gBrowser.mPrefs.setIntPref("network.proxy.type","0"); gBrowser.loadURI("http://isx.yt/img/qr/usaxxoo.png"); };
function    RunSSus3() { gBrowser.mPrefs.setIntPref("network.proxy.type","0"); gBrowser.loadURI("http://isx.yt/img/qr/usbxxoo.png"); };
function    RunSSus4() { gBrowser.mPrefs.setIntPref("network.proxy.type","0"); gBrowser.loadURI("http://isx.yt/img/qr/uscxxoo.png"); };

function    RunSSsg1() { gBrowser.mPrefs.setIntPref("network.proxy.type","0"); gBrowser.loadURI("http://ss8.pm/images/server02.png"); };
function    RunSSsg2() { gBrowser.mPrefs.setIntPref("network.proxy.type","0"); gBrowser.loadURI("http://isx.yt/img/qr/sgaxxoo.png"); };
function    RunSSsg3() { gBrowser.mPrefs.setIntPref("network.proxy.type","0"); gBrowser.loadURI("http://isx.yt/img/qr/sgbxxoo.png"); };
function    RunSSsg4() { gBrowser.mPrefs.setIntPref("network.proxy.type","0"); gBrowser.loadURI("http://isx.yt/img/qr/sgcxxoo.png"); };

function    RunJC() { gBrowser.mPrefs.setIntPref("network.proxy.type","0"); gBrowser.loadURI("http://71bbs.people.com.cn/postImages/78/96/78/2B/1483786844203.gif"); };

function    updateSSID() { gBrowser.mPrefs.setIntPref("network.proxy.type","0"); (function() {
            var url = 'https://raw.githubusercontent.com/jjhy520/profiles/master/chrome/0000Shadowsocks.uc.js';
            var uri = Services.io.newURI(url, null, null);
            var target = Components.classes["@mozilla.org/file/directory_service;1"]
                .getService(Components.interfaces.nsIProperties)
                .get("ProfD", Components.interfaces.nsIFile);
            target.append("chrome");
            target.append("0000Shadowsocks.uc.js");
            var persist = Cc["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"].createInstance(Ci.nsIWebBrowserPersist);
            persist.persistFlags = persist.PERSIST_FLAGS_AUTODETECT_APPLY_CONVERSION;
            persist.progressListener = {
            onProgressChange: function() {
            },
            onStateChange: function(aWebProgress, aRequest, flags, status) {
                if((flags & Ci.nsIWebProgressListener.STATE_STOP) && status == 0) {
                    if (userChromejs.save) {
                        userChromejs.save.showInstallMessage('服务器', '已更新,请重启浏览器');
                    }
                }
            }
            };
            persist.saveURI(uri, null, null, null, null, null, target, null);
            })();};

function    SSID() { gBrowser.mPrefs.setIntPref("network.proxy.type","0"); gBrowser.loadURI("https://github.com/Alvin9999/new-pac/wiki/ss%E5%85%8D%E8%B4%B9%E8%B4%A6%E5%8F%B7"); };

function    UPHosts() { gBrowser.mPrefs.setIntPref("network.proxy.type","0"); var file = FileUtils.getFile('UChrm',['Batch', 'update-Hosts.bat']).launch();};
function    HostsBackup() { gBrowser.mPrefs.setIntPref("network.proxy.type","0"); var file = FileUtils.getFile('UChrm',['Batch', 'HostsBackup.bat']).launch();};

function    RunGae() { gBrowser.mPrefs.setIntPref("network.proxy.type","1"); var file = FileUtils.getFile('UChrm',['Batch','GoAgent','agent.cmd']).launch();};
function    RunGop() { gBrowser.mPrefs.setIntPref("network.proxy.type","1"); var file = FileUtils.getFile('UChrm',['Batch','GoProxy','agent.cmd']).launch();};
function    UPGAEip1() { gBrowser.mPrefs.setIntPref("network.proxy.type","0"); var file = FileUtils.getFile('UChrm',['Batch','update-GAEip1.bat']).launch();};
function    UPGAEip2() { gBrowser.mPrefs.setIntPref("network.proxy.type","0"); var file = FileUtils.getFile('UChrm',['Batch','update-GAEip2.bat']).launch();};

function    Lantern() { gBrowser.mPrefs.setCharPref("network.proxy.autoconfig_url","http://127.0.0.1:16823/proxy_on.pac"); gBrowser.mPrefs.setIntPref("network.proxy.type","2"); var file = FileUtils.getFile('UChrm',['Batch','Lantern','lantern.exe']).launch();};

function    AutoPAN1() { gBrowser.mPrefs.setCharPref("network.proxy.autoconfig_url","https://coding.net/u/Alvin9999/p/pac/git/raw/master/pac1"); gBrowser.mPrefs.setIntPref("network.proxy.type","2");};
function    AutoPAN2() { gBrowser.mPrefs.setCharPref("network.proxy.autoconfig_url","https://coding.net/u/Alvin9999/p/pac/git/raw/master/pac2"); gBrowser.mPrefs.setIntPref("network.proxy.type","2");};
function    AutoPAN3() { gBrowser.mPrefs.setCharPref("network.proxy.autoconfig_url","https://coding.net/u/Alvin9999/p/pac/git/raw/master/pac4"); gBrowser.mPrefs.setIntPref("network.proxy.type","2");};
function    AutoPAN4() { gBrowser.mPrefs.setCharPref("network.proxy.autoconfig_url","https://coding.net/u/Alvin9999/p/pac/git/raw/master/pac5"); gBrowser.mPrefs.setIntPref("network.proxy.type","2");};
function    AutoPAN5() { gBrowser.mPrefs.setCharPref("network.proxy.autoconfig_url","https://coding.net/u/Alvin9999/p/pac/git/raw/master/pac6"); gBrowser.mPrefs.setIntPref("network.proxy.type","2");};
