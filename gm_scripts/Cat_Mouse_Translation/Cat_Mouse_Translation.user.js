// ==UserScript==
// @name            Cat Mouse Translation 
// @namespace       https://github.com/catcat520/CatMouseTranslation
// @author          catcat520
// @include         http://*
// @include         https://*
// @include         file://*
// @exclude         http://www.iciba.com*
// @grant           GM_xmlhttpRequest
// @grant           GM_addStyle
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_registerMenuCommand
// @icon            http://tb.himg.baidu.com/sys/portrait/item/d4346e6f65313332ac06
// @version         2017.02.14.1.16
// @connect *
// @description     iciba翻译
// @supportURL      https://github.com/catcat520/
// @contributionURL https://github.com/catcat520/
// ==/UserScript==


/* ------------------ CodeStart ------------------- */

"use strict";

var Iciba = function(){
	this.init();
}

Iciba.prototype.auto_active = 1; //没用~
Iciba.prototype.ctrlKey_actived = null;

/* ----------------function info-----------------
 * name: init
 * parameters: empty
 * return: void
 * 初始化对象 插入样式 读取设置 绑定事件
 * ---------------------------------------------- */
Iciba.prototype.init = function(){
	var _this = this;
	GM_addStyle('#icibaCirclePointer{font-family:"Microsoft Yahei",serif,sans-serif !important;display:block !important;z-index:10000 !important;overflow:hidden !important;width:20px !important;height:20px !important;border:1px solid #555 !important;border-radius:100px !important;background:#ABD !important;box-shadow:0 0 3px #111 !important;opacity:0.7 !important;-moz-transition:0.05s !important;box-sizing:border-box !important;-moz-box-sizing:border-box !important;}#icibaCirclePointer:hover{opacity:1 !important;}#icibaCirclePointer:active{border:1px solid #353535 !important;background:#90A2C4 !important;box-shadow:0 0 3px #222 !important;}#icibaResultContainer{z-index:10000 !important;width:auto !important;height:auto !important;max-width:300px !important;border:none !important;background:#EEE !important;box-shadow:0 0 8px 1px #999 !important;letter-spacing:0 !important;}#iciba_search_box{display:block !important;margin:0 !important;padding:0 !important;width:100% !important;border-bottom:1px solid #CCC !important;font-size:0 !important;letter-spacing:0 !important;word-spacing:0 !important;}#icibaResultContainer input{position:static !important;margin:0 !important;border:none !important;border-radius:0 !important;box-shadow:none !important;box-sizing:border-box !important;-moz-box-sizing:border-box !important;display:inline-block !important;vertical-align:middle !important;float:none !important;transition:0.1s !important;-moz-transition:0.1s !important;}#iciba_search_box > #icibaSearchInput{padding:0 7px !important;width:calc(100% - 29px) !important;height:28px !important;line-height:28px !important;background:white !important;color:#444 !important;font-size:14px !important;letter-spacing:0 !important;font-family:"Microsoft Yahei",serif,sans-serif !important;}#iciba_search_box > #icibaSearchInput:hover,#iciba_search_box > #icibaSearchInput:focus{box-shadow:0 0 3px -1px #999 inset !important;}#iciba_search_box > #icibaSearchButton{padding:0 !important;width:29px !important;height:28px !important;border-left:1px solid #CCC !important;border-radius:0 !important;background-color:#E5E5E5 !important;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAAEgAAABIAEbJaz4AAAAJdnBBZwAAABAAAAAQAFzGrcMAAADcSURBVCjPhdG9TgJhEIXh58M1EGEFjEohiUGk4f4vBaSy0UYRBFEIP8JaLEvWhOjbTc6bzMlMSPxNRICGpopgZejJJosTIRGCtjtLE1uxmrGeZSZEaGh5NzBH5Na9jp7ksMKNtQcL8O1R2bXYLBUKqBjv45QXJ86yoYBg96v4zr55JqzECjmhamedF4ZqWoe4runTJHcHzy60lb3aqmo6tVHJSoZEoKTjSoSdL5GShZ5ZdqhUPVcWrEzVdRXN9X3khTyXuooW+sm04BgjAyux+7TkMd4kWkaE/979AxXnQ1s0DN1UAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDEwLTAyLTExVDExOjUwOjA4LTA2OjAw1hBl+wAAACV0RVh0ZGF0ZTptb2RpZnkAMjAwNi0wNS0wNVQxMzoyMjo0MC0wNTowML/k/hoAAAAASUVORK5CYII=") !important;background-position:6px 6px !important;background-repeat:no-repeat !important;}#iciba_search_box > #icibaSearchButton:hover{background-color:#F0F0F0 !important;}#iciba_search_box > #icibaSearchButton:active{background-color:#DDD !important;box-shadow:0 0 3px -1px #999 inset !important;}#icibaResultTextBox{margin:0 !important;padding:10px !important;color:black !important;font-size:13px !important;}#icibaResultTextBox a{color:#35C !important;text-decoration:none !important;border:none !important;}.icIBahyI-new_word{display:none !important;}.icIBahyI-label_list > LABEL{display:inline !important;}#icibaResultTextBox{text-align:left !important;font-size:14px !important;font-family:Arial,Helvetica,sans-serif !important;}#icibaResultTextBox div,#icibaResultTextBox ul,#icibaResultTextBox li,#icibaResultTextBox p,#icibaResultTextBox form,#icibaResultTextBox input,#icibaResultTextBox label{margin:0 !important;padding:0 !important;font-weight:normal !important;font-size:14px !important;}#icibaResultTextBox input,#icibaResultTextBox button,#icibaResultTextBox textarea{font-weight:inherit !important;font-style:inherit !important;font-size:inherit !important;font-family:Arial,Helvetica,sans-serif !important;}#icibaResultTextBox{background:#fbfbfb !important;}#icibaResultTextBox ul,#icibaResultTextBox li{list-style:none !important;}#icibaResultTextBox a{color:#666 !important;text-decoration:none !important;}#icibaResultTextBox a:hover{color:#4372b6 !important;text-decoration:underline !important;}#icibaResultTextBox a:focus{outline:none !important;}#icibaResultTextBox img{border:0 !important;}#icibaResultTextBox strong{font-weight:100 !important;font-family:"Segoe UI",Verdana,Lucida Sans Regular,Lucida Sans Unicode,Arial,sans-serif !important;}#icibaResultTextBox .icIBahyI-bg_main{background:#fff !important;}#icibaResultTextBox .icIBahyI-usually,#icibaResultTextBox .icIBahyI-prons,#icibaResultTextBox .icIBahyI-tab_list,#icibaResultTextBox .icIBahyI-group_inf{font-size:12px !important;}#icibaResultTextBox .icIBahyI-fl,#icibaResultTextBox .icIBahyI-nav_list li,#icibaResultTextBox .icIBahyI-left_bg,#icibaResultTextBox .icIBahyI-usually label,#icibaResultTextBox .icIBahyI-usually span,#icibaResultTextBox .icIBahyI-tab_list li,#icibaResultTextBox .icIBahyI-group_inf li,#icibaResultTextBox .icIBahyI-eg,#icibaResultTextBox .icIBahyI-us{float:left !important;}#icibaResultTextBox .icIBahyI-register,#icibaResultTextBox .icIBahyI-right_bg,#icibaResultTextBox .icIBahyI-up,#icibaResultTextBox .icIBahyI-down{float:right !important;}#icibaResultTextBox .icIBahyI-register{padding-left:25px !important;}#icibaResultTextBox a.icIBahyI-text_black,#icibaResultTextBox .icIBahyI-nav_list strong{color:#333 !important;}#icibaResultTextBox a{color:#236fd4 !important;text-decoration:underline !important;}#icibaResultTextBox a:hover{color:#236fd4 !important;}#icibaResultTextBox .icIBahyI-handwrite,#icibaResultTextBox .icIBahyI-handwrite_over,#icibaResultTextBox .icIBahyI-drop_down{position:absolute !important;width:16px !important;height:16px !important;cursor:pointer !important;}#icibaResultTextBox .icIBahyI-handwrite{top:14px !important;right:130px !important;background-position:0 -70px !important;}#icibaResultTextBox .icIBahyI-handwrite_over{top:14px !important;right:130px !important;background-position:-18px -70px !important;}#icibaResultTextBox #icIBahyI-dict_main{padding:0 !important;text-align:left !important;}#icibaResultTextBox .icIBahyI-dictbar{display:block !important;padding:0 !important;height:auto !important;line-height:1.2 !important;}#icibaResultTextBox .icIBahyI-title{position:relative !important;padding:16px 17px 0 18px !important;color:#333 !important;font-weight:bold !important;font-size:24px !important;font-family:arial,sans-serif !important;line-height:32px !important;word-break:break-all !important;}#icibaResultTextBox .icIBahyI-prons{display:inline-block !important;padding:0 !important;height:auto !important;white-space:nowrap !important;font-weight:700 !important;word-break:break-all !important;}#icibaResultTextBox .icIBahyI-dict_title{color:#333 !important;font-weight:bold !important;font-family:arial,sans-serif !important;}#icibaResultTextBox .icIBahyI-ico_sound{float:left !important;display:block !important;overflow:hidden !important;margin:1px 0 -2px 4px !important;width:16px !important;height:16px !important;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACK0lEQVQ4jZWTQUuUURSGn3Pu/e6opM5kjYRUk2mZOWC0KqL8AS1cBBUUOf9Af4LbIJRo0yJs0V4hWhTUuC+SAslSclxESMM06cw4OvN9t8VUSgrZ2b8Pz3sOR7z3nLr6ZFpEh1F9LKpjH2euF9nnKICoGb505QKp7tSIdW6579r0yP8BjGW9XAfbTk9vX7ytPT7Vf+Nptv/ms8F9AgxhJHwv1Vgt1mnv6CJ55MSQdU1zZ289nxi4/SL+rwqEHkQVL8J6tUYNS2dXN4lDyVFjg+X0nZd71to28IKoIEYRo3iFSm2L5tZ2jp1MxVva2qbSmWw2nckO7gKghnoEYhQ1AkbZioSNOnxbr/O1GBLvTHK85+iQi7m5dCY7kR55Fd9RQQkjwYtQ2vSUqp4QRQOLa7YYZyhWIkp1S+9AioOH46OIjABYABFDedOzthFhnSFwBusMNjAYq4g0dJuadLumGv4AUKFa86hRbNAIBzHbAAWKc0oyEVBZq/B5cZVqpTr+/tHlyR0GShAI9VAxgWKdwcUMsWZLR8JxIAaLC3mKhfKsj3zm3cOLud9LbBgg2EBRIoxRrFXaWgOSHY5Cocqn+R85H4Zjb+8Pzvx9Rvsrj7WChoILlK5kDB+FfJjPs1ljXNROvr57es//aAC8x1hIxAISccuXlTzlSjgrxmbe3DuT2yu4C9ASEyqVMksLpZwYOzb34Pwu3b1GATx+dmUpR361MO7D8Nx+wwA/Ad9dudwSn5Q6AAAAAElFTkSuQmCC") !important;-moz-transition:0.1s !important;}#icibaResultTextBox .icIBahyI-ico_sound:hover{opacity:0.75 !important;}#icibaResultTextBox .icIBahyI-ico_sound:active{opacity:0.9 !important;}#icibaResultTextBox .icIBahyI-eg,#icibaResultTextBox .icIBahyI-us,#icibaResultTextBox .icIBahyI-group_pos strong,#icibaResultTextBox .icIBahyI-group_inf li{padding-right:10px !important;}#icibaResultTextBox .icIBahyI-eg,#icibaResultTextBox .icIBahyI-us{padding-top:0 !important;font-family:"lucida sans unicode",arial !important;}#icibaResultTextBox .icIBahyI-new_word{float:left !important;padding-top:2px !important;}#icibaResultTextBox .icIBahyI-new_word a{display:block !important;padding:3px 10px 0 20px !important;width:35px !important;height:17px !important;background-position:-274px 0 !important;color:#999 !important;font-weight:100 !important;font-family:"Microsoft Yahei" !important;}#icibaResultTextBox .icIBahyI-new_word a.icIBahyI-new_word2{background-position:-274px -19px !important;}#icibaResultTextBox .icIBahyI-usually,#icibaResultTextBox .icIBahyI-prons{color:#666 !important;}#icibaResultTextBox .icIBahyI-group_prons .icIBahyI-second{float:none !important;padding-top:0 !important;}#icibaResultTextBox .icIBahyI-group_prons .icIBahyI-second .icIBahyI-eg{height:24px !important;}#icibaResultTextBox .icIBahyI-mb9 p{margin-bottom:9px !important;}#icibaResultTextBox .icIBahyI-group_pos{clear:both !important;overflow:hidden !important;color:#232323 !important;line-height:20px !important;}#icibaResultTextBox .icIBahyI-group_pos p{clear:both !important;}#icibaResultTextBox .icIBahyI-label_list{float:left !important;padding-bottom:9px !important;width:87% !important;text-align:left !important;}#icibaResultTextBox .icIBahyI-cn .icIBahyI-group_pos{color:#333 !important;}#icibaResultTextBox .icIBahyI-group_pos strong{color:#8d8d8d !important;}#icibaResultTextBox .icIBahyI-group_prons{clear:both !important;padding-top:7px !important;}#icibaResultTextBox .icIBahyI-margin_top{padding-top:6px !important;}#icibaResultTextBox .icIBahyI-part_list a,#icibaResultTextBox .icIBahyI-tab_list li a,#icibaResultTextBox .icIBahyI-new_word a,#icibaResultTextBox .icIBahyI-part_main h3 a{text-decoration:none !important;}#icibaResultTextBox .icIBahyI-tab_list{display:none;}#icibaResultTextBox .icIBahyI-title{padding:13px 10px 1px !important;font-size:14px !important;line-height:18px !important;}#icibaResultTextBox .icIBahyI-prons{font-weight:100 !important;}#icibaResultTextBox .icIBahyI-group_pos{font-size:14px !important;line-height:20px !important;}#icibaResultTextBox .icIBahyI-group_pos p{float:left !important;padding:0 0 10px 0 !important;}#icibaResultTextBox .icIBahyI-label_list{float:none !important;display:inline !important;padding:0 0 9px 9px !important;width:100% !important;}#icibaResultTextBox .icIBahyI-group_pos .icIBahyI-fl{float:none !important;display:inline !important;color:#666 !important;}#icibaResultTextBox .icIBahyI-synon{color:#333 !important;line-height:28px !important;}#icibaResultTextBox .icIBahyI-suggest,#icibaResultTextBox .icIBahyI-suggest2{padding:0 0 3px 0 !important;color:#333 !important;word-wrap:break-word !important;font-size:14px !important;line-height:22px !important;}#icibaResultTextBox .icIBahyI-suggest ul{padding:7px 0 4px !important;line-height:155% !important;}#icibaResultTextBox .icIBahyI-suggest li{padding-left:14px !important;background-position:-134px -304px !important;}#icibaResultTextBox .icIBahyI-suggest p{line-height:250% !important;}#icibaResultTextBox .icIBahyI-suggest .icIBahyI-pr a{padding-right:3px !important;}#icibaResultTextBox .icIBahyI-suggest p.icIBahyI-pr{margin-top:3px !important;line-height:18px !important;}#icibaResultTextBox .icIBahyI-suggest .icIBahyI-pr a{display:inline-block !important;padding-right:10px !important;}#icibaResultTextBox .icIBahyI-footer{padding:0 !important;width:auto !important;color:#999 !important;text-align:right !important;font-size:12px !important;line-height:18px !important;}#icibaResultTextBox .icIBahyI-footer a{padding:0 3px 0 0 !important;background:none !important;color:#236fd4 !important;text-decoration:none !important;font-size:12px !important;line-height:18px !important;}#icibaResultTextBox .icIBahyI-footer a:hover{color:#236fd4 !important;}#icibaResultTextBox .icIBahyI-text_blue{color:#236fd4 !important;}#icibaResultTextBox .icIBahyI-list li{padding:0 15px !important;}#icibaResultTextBox .icIBahyI-li_dt,.icIBahyI-li_dd{display:inline !important;line-height:24px !important;}#icibaResultTextBox .icIBahyI-li_dt{padding-right:5px !important;color:#232323 !important;}#icibaResultTextBox .icIBahyI-li_dd{color:#777 !important;}#ICIBA_TOO_LONG{padding-top:10px !important;padding-left:10px !important;font-size:12px !important;}');
	GM_registerMenuCommand("iciba翻译设置", this.openSetting);

	_this.loadSetting();
	_this.eventBinding();
}

/* ----------------function info-----------------
 * name: eventBinding
 * parameters: empty
 * return: void
 * 绑定事件
 * ---------------------------------------------- */
Iciba.prototype.eventBinding = function(){
	var _this = this;
	window.addEventListener("mouseup",function(e){
		_this.mouseClick(e,_this);
	},false);
	window.addEventListener("keydown",function(e){
		_this.keyDown(e,_this);
	},false);
}

/* ----------------function info-----------------
 * name: loadSetting
 * parameters: empty
 * return: void
 * 读取设置
 * ---------------------------------------------- */
Iciba.prototype.loadSetting = function(){
	// Ctrl键触发
	var _this = this;
	if(GM_getValue("ctrlKey_actived") == undefined){
		_this.ctrlKey_actived = 0;
	}else{
		_this.ctrlKey_actived = parseInt(GM_getValue("ctrlKey_actived"));
	}
	GM_setValue("ctrlKey_actived",_this.ctrlKey_actived);
}

/* ----------------function info-----------------
 * name: openSetting
 * parameters: empty
 * return: void
 * 设置对话框
 * ---------------------------------------------- */
Iciba.prototype.openSetting = function(){
	var _this = this;
	_this.ctrlKey_actived = confirm("按住ctrl键（当且仅当）开启翻译？")?1:0;
	GM_setValue("ctrlKey_actived",_this.ctrlKey_actived);
}

/* ----------------function info-----------------
 * name: isInsideOf
 * parameters: empty
 * return: boolean
 * 判断是否在内部
 * ---------------------------------------------- */
Iciba.prototype.isInsideOf = function(e,target){
	// when target is not exist
	if(!target){
		return false;
	}
	var e_target = e.target;
	while(e_target != target && e_target){
		e_target = e_target.parentNode;
	}
	if(e_target == target){
		return true;
	}else{
		return false;
	}
}

/* ----------------function info-----------------
 * name: showIcibaCirclePointer
 * parameters: mouseEvent
 * return: void
 * 显示并定位小圆点
 * ---------------------------------------------- */
Iciba.prototype.showIcibaCirclePointer = function(e){
	var _this = this;
	var mouseX = e.pageX;
	var mouseY = e.pageY;
	_this.createCirclePointer();
	_this.icibaCirclePointer.style.top = (mouseY + 8) + "px";
	_this.icibaCirclePointer.style.left = (mouseX + 2) + "px";
	_this.icibaCirclePointer.setAttribute("keyword",window.getSelection().toString().toLowerCase().trim());
}

/* ----------------function info-----------------
 * name: createCirclePointer
 * parameters: empty
 * return: void
 * 创建小圆点
 * ---------------------------------------------- */
Iciba.prototype.createCirclePointer = function(){
	var _this = this;
	_this.icibaCirclePointer = document.createElement("div");
	_this.icibaCirclePointer.id = "icibaCirclePointer";
	_this.icibaCirclePointer.style.position = "absolute";
	_this.icibaCirclePointer.addEventListener("click",function(e){
		_this.showContainer(e);
	},false);
	document.body.appendChild(_this.icibaCirclePointer);
}

/* ----------------function info-----------------
 * name: removeCirclePointer
 * parameters: empty
 * return: void
 * 去除小圆点
 * ---------------------------------------------- */
Iciba.prototype.removeCirclePointer = function(){
	var _this = this;
	if(_this.icibaCirclePointer){
		document.body.removeChild(_this.icibaCirclePointer);
	}
	var icibaCirclePointerList = document.getElementsByClassName('icibaCirclePointer');

	_this.icibaCirclePointer = null;
}

/* ----------------function info-----------------
 * name: showContainer
 * parameters: mouseEvent
 * return: void
 * 显示并定位查词框
 * ---------------------------------------------- */
Iciba.prototype.showContainer = function(e,_this){
	var _this = this;
	var word = _this.icibaCirclePointer.getAttribute("keyword");
	_this.removeCirclePointer();
	_this.createContainer();
	_this.containerSetPosition(e);
    _this.containerLoadData(word,function(){},function(){});

	// getData(word,e,bodyClientHeight,bodyClientWidth,windowInnerHeight,windowInnerWidth,htmlClientHeight,htmlClientWidth);
}

/* ----------------function info-----------------
 * name: createContainer
 * parameters: empty
 * return: void
 * 创建查词框
 * ---------------------------------------------- */
Iciba.prototype.createContainer = function(){
	var _this = this;

	_this.icibaResultContainer = document.createElement("div");
	_this.icibaResultContainer.id = "icibaResultContainer";
	_this.icibaResultContainer.style.position = "absolute";
	_this.icibaResultContainer.innerHTML = '\
	<div id="iciba_search_box">\
		<input id="icibaSearchInput" type="text" />\
		<input id="icibaSearchButton" type="button" />\
	</div>\
	<div id="icibaResultTextBox"></div>';

	document.body.appendChild(_this.icibaResultContainer);

	_this.icibaResultTextBox = document.getElementById("icibaResultTextBox");
	_this.icibaSearchInput = document.getElementById("icibaSearchInput");
	_this.icibaSearchButton = document.getElementById("icibaSearchButton");

	_this.icibaSearchInput.addEventListener("keypress",function(e){
		_this.searchFromInputBox(e,_this);
	},false);
	_this.icibaSearchButton.addEventListener("click",function(e){
		_this.searchFromInputBox(e,_this);
	},false);
}

/* ----------------function info-----------------
 * name: removeContainer
 * parameters: empty
 * return: void
 * 去除查词框
 * ---------------------------------------------- */
Iciba.prototype.removeContainer = function(){
	var _this = this;
	if(_this.icibaResultContainer){
		document.body.removeChild(_this.icibaResultContainer);
		_this.icibaResultContainer = null;
		_this.icibaResultTextBox = null;
		_this.icibaSearchInput = null;
		_this.icibaSearchButton = null;
	}
}

/* ----------------function info-----------------
 * name: containerSetPosition
 * parameters: empty
 * return: void
 * 定位查词框
 * ---------------------------------------------- */
Iciba.prototype.containerSetPosition = function(e){
	var _this = this;
	var bodyClientHeight = document.body.clientHeight;
	var bodyClientWidth = document.body.clientWidth;
	var htmlClientHeight = document.documentElement.clientHeight;
	var htmlClientWidth = document.documentElement.clientWidth;
	var windowInnerHeight = window.innerHeight;
	var windowInnerWidth = window.innerWidth;
	var bodyPosition = document.defaultView.getComputedStyle(document.body)["position"];
	var htmlPosition = document.defaultView.getComputedStyle(document.documentElement)["position"];

	if(bodyPosition != "static"){
		if(bodyClientWidth - e.clientX < 300){
			_this.icibaResultContainer.style.left = "auto";
			_this.icibaResultContainer.style.right = bodyClientWidth - e.pageX + "px";
		}else{
			_this.icibaResultContainer.style.left = e.pageX + "px";
			_this.icibaResultContainer.style.right = "auto";
		}
		if(bodyClientHeight - e.clientY < 200){
			_this.icibaResultContainer.style.top = "auto";
			_this.icibaResultContainer.style.bottom = bodyClientHeight - e.pageY + "px";
		}else{
			_this.icibaResultContainer.style.top = e.pageY + "px";
			_this.icibaResultContainer.style.bottom = "auto";
		}
	}else if(htmlPosition != "static"){
		if(windowInnerWidth - e.clientX < 300){
			_this.icibaResultContainer.style.left = "auto";
			_this.icibaResultContainer.style.right = htmlClientWidth - e.pageX + "px";
		}else{
			_this.icibaResultContainer.style.left = e.pageX + "px";
			_this.icibaResultContainer.style.right = "auto";
		}
		if(windowInnerHeight - e.clientY < 200){
			_this.icibaResultContainer.style.top = "auto";
			_this.icibaResultContainer.style.bottom = htmlClientHeight - e.pageY + "px";
		}else{
			_this.icibaResultContainer.style.top = e.pageY + "px";
			_this.icibaResultContainer.style.bottom = "auto";
		}
	}else{
		if(windowInnerWidth - e.clientX < 300){
			_this.icibaResultContainer.style.left = "auto";
			_this.icibaResultContainer.style.right = windowInnerWidth - e.pageX + "px";
		}else{
			_this.icibaResultContainer.style.left = e.pageX + "px";
			_this.icibaResultContainer.style.right = "auto";
		}
		if(windowInnerHeight - e.clientY < 200){
			_this.icibaResultContainer.style.top = "auto";
			_this.icibaResultContainer.style.bottom = windowInnerHeight - e.pageY + "px";
		}else{
			_this.icibaResultContainer.style.top = e.pageY + "px";
			_this.icibaResultContainer.style.bottom = "auto";
		}
	}
}

/* ----------------function info-----------------
 * name: containerLoadData
 * parameters: word,rs,rj
 * return: void
 * 获取数据查词
 * ---------------------------------------------- */
Iciba.prototype.containerLoadData = function(word,rs,rj){
	var _this = this;
	_this.icibaResultTextBox.innerHTML = "Loading......";
	_this.icibaSearchInput.value = word;
	GM_xmlhttpRequest({
		method:"GET",
		referer:"http://www.iciba.com/",
		url:"http://open.iciba.com/huaci/dict.php?word=" + word,
		timeout:20000,
		ontimeout:function(){
			rj('timeout');
			_this.icibaResultTextBox.innerHTML = '网络超时！'
		},
		onerror:function(){
			rj('error');
			_this.icibaResultTextBox.innerHTML = '网络错误！'
		},
		onload:function(response){
			if(response.status != 200){
				rj(response.status);
				_this.icibaResultTextBox.innerHTML = '网络错误！'
			}
			var text = response.responseText.replace(/\\/g,"");
			text = text.match(/dict\.innerHTML=\'(.*)\'/)[1];
			text = text.replace(/icIBahyI-"ico_sound"/g,'"icIBahyI-ico_sound"');
			_this.icibaResultTextBox.innerHTML = text;
			var playbtn = document.querySelectorAll(".icIBahyI-ico_sound");
			if(playbtn.length != 0){
				for(var i = 0;i < playbtn.length;i++){
					playbtn[i].setAttribute("mp3",playbtn[i].getAttribute("onclick").match(/asplay_hanci\('(.*)'\)/)[1]);
					playbtn[i].removeAttribute("onclick");
					playbtn[i].addEventListener("click",_this.playSound,false);
				}
			}
			rs('success');
		}
	});
}

/* ----------------function info-----------------
 * name: conflictsResolve
 * parameters: empty
 * return: void
 * 不同网站的冲突解决
 * ---------------------------------------------- */
Iciba.prototype.conflictsResolve = function(){
	if(window.location.href.indexOf("http://tieba.baidu.com/photo/p?kw=") == 1){
		GM_addStyle('.af_container{position:relative;}');
	}
}

/* ----------------function info-----------------
 * name: mouseClick
 * parameters: empty
 * return: mousedown 事件处理函数
 * 
 * ---------------------------------------------- */
Iciba.prototype.mouseClick = function(e,_this){
	// console.log('pageX:' + e.pageX + ',pageY:' + e.pageY + ',clientX:' + e.clientX + ',clientY:' + e.clientY)
	// ignore when click on icibaCirclePointer

	if(e.target == _this.icibaCirclePointer){
		return;
	}
	
	if(e.button != 0){
		return;
	}
	
	// ignore when click insideof icibaResultContainer
	if(_this.isInsideOf(e,_this.icibaResultContainer)){
		return;
	}
	
	// Ctrl键触发
	if(_this.ctrlKey_actived){
		if(!(e.ctrlKey == true && e.shiftKey == false && e.altKey == false)){
			_this.removeCirclePointer();
			_this.removeContainer();
			return;
		}
	}

	// remove all things
	if(_this.icibaResultContainer){
		_this.removeContainer();
	}
	if(_this.icibaCirclePointer){
		_this.removeCirclePointer();
	}
	
	// 显示iciba_icon,987变量修改翻译长度
	if(window.getSelection().toString().length >= 987){
		return; // ignore when selection is too loing
	}

	if(window.getSelection().toString().length != 0){
		_this.showIcibaCirclePointer(e);
		return;
	}
	
	// 去除iciba_icon
	if(window.getSelection().toString().length == 0){
		_this.removeCirclePointer();
	}
	
	return;
}

/* ----------------function info-----------------
 * name: keyDown
 * parameters: empty
 * return: keydown 事件处理函数
 * 
 * ---------------------------------------------- */
Iciba.prototype.keyDown = function(e,_this){
	if(e.key === "Control" && e.keyCode === 17){
		_this.removeCirclePointer();
	}
}

/* ----------------function info-----------------
 * name: searchFromInputBox
 * parameters: empty
 * return: void
 * 查词框取词事件
 * ---------------------------------------------- */
Iciba.prototype.searchFromInputBox = function(e,_this){
	if(e.target == icibaSearchInput){
		if(e.keyCode != 13){
			return;
		}
	}
	var keyword = icibaSearchInput.value;
	_this.containerLoadData(keyword);
}

/* ----------------function info-----------------
 * name: playSound
 * parameters: empty
 * return: void
 * 发声
 * ---------------------------------------------- */
Iciba.prototype.playSound = function(e){
	console.log(e)
	var audio = document.createElement('audio');
	var source = document.createElement('source');	 
	source.type = "audio/mpeg";
	source.src = e.target.getAttribute("mp3");
	source.autoplay = "autoplay";
	source.controls = "controls";
	audio.appendChild(source);
	audio.play();
}

{
	let iciba = new Iciba();
}

