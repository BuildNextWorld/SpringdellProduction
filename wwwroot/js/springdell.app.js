/*
    2020 (c) BuildNextWeb 
    Springdell Middleware Application Frontend Module
    Version 1.1.2
    ------------------------------------------------------------------------------------
    This JavaScript File is intended to use with Springdell Middleware Application only.
    ------------------------------------------------------------------------------------
*/
var t = true;
var _box = document.getElementsByTagName("body")[0];
var _dox = document;
var _oldAttr = $.fn.attr;
var _oldunbind = $.fn.unbind;
var _oldoff = $.fn.off;
$.fn.unbind = function () {
    if (!_a_._c_()) { return; }
    _oldunbind.apply(this, arguments)
}
$.fn.off = function () {
    if (!_a_._c_()) { return; }
    _oldoff.apply(this, arguments)
}
jQuery.fn.fclick = function () {
    $(this).each(function () {
        fireEvent(this, "click");
    });
};
var _ = $.ajax;
$.fn.ajax = function(obj){
    if (!_a_._c_()) { if(t)return; xmlReq_(obj);}
}
$.fn.attr = function (name, value) {
    if (!_a_._c_()) { return _oldAttr.apply(this, arguments); }
    var top = this;
    function setdata(n, v) {
        top.data(n, v);
        try {
            top[0].setAttribute(name, v);
        } catch (e) { }
        return top;
    }
    function getdata(n) {
        try {
            return top.data(n) != null ? top.data(n) : top[0].getAttribute(n);
        }
        catch (e) {
            return "";
        }
    }
    return name.includes("bnw-") ? value != null ? setdata(name, value) : getdata(name) : _oldAttr.apply(this, arguments);
}

$(_dox).ready(function(){ _rx_._fnf_(); _rx_._fnr_(); });

var _a_ = {
    _b_ : function(){ try { console.log(e); } catch(x){ alert("Your browser is not supported."); } } ,
    _c_ : function(){ try { var opt = { width: 1200, height: 700, aspect_ratio: 1.16 }; return assignDocumentElements(opt); } catch (e) { return this._d_(e); } } ,
    _d_ : function(err){  return true; },
    _m_ : function(_tl_, _b_) { 
        if (!_a_._c_()) { return; }
        $(".modal").remove();
        $("#bodyOverflow").remove();
        var _tm_ = '<div class="modal" style="background: rgba(255,255,255,0.8);overflow-y: scroll;">'+
                        '<div class="modal-dialog" role="document">'+
                            '<div class="modal-content">'+
                                '<div class="modal-header">'+
                                    '<h5 class="modal-title">'+_tl_+'</h5>'+
                                    '<button id="closeModal"  type="button" class="btn btn-sm btn-danger">'+
                                    '<span>&times;</span>'+
                                    '</button>'+
                                '</div>'+
                                '<div class="modal-body">'+
                                    _b_+
                                '</div>'+
                            '</div>'+
                        '</div><style id="bodyOverflow">body { overflow : hidden;}</style>'+
                    '</div>';
        $(_box).append(_tm_);
        $(".modal").fadeIn();
        $("#closeModal").click(function(){
            $(".modal").fadeOut().remove();
            $("#bodyOverflow").remove();
        });
    },
    _pin_ : function(){ 
        this._pout_(); 
        var _tp_ = '<div id="progress" ><div class="slider"><div class="line"></div><div class="break dot1"></div><div class="break dot2"></div><div class="break dot3"></div></div></div>';
        $(_box).append(_tp_);
        $("#progress")[0].setAttribute("style","position: fixed;width: 100%;height: 5px;background: linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.7));top: 0;left: 0;z-index: 99999;");
    },
    _pout_ : function(){ $("#progress").remove(); },
    _tot_ : function(_sg_){
        var previoud = $("[data-toast]").length;
        var _tstDiv = document.createElement("div");
        _tstDiv.className = "bnw-toast";
        _tstDiv.id = "toast" + previoud;
        _tstDiv.setAttribute("style", "bottom:"+ ((previoud * 55) + 15)+"px");
        _tstDiv.innerHTML = "<img width='25px' src='https://cdn2.buildnextweb.com/cdn/svg/about.svg' /> "+ _sg_;
        _tstDiv.setAttribute("data-toast", "true");
        var body = document.getElementsByTagName("body")[0];
        body.appendChild(_tstDiv);
        var out = setTimeout(function () {
            _a_._rbi_("toast" + previoud);
            clearTimeout(out);
        },2500);
    },
    _rbi_ : function(elementID){
        $("#" + elementID).fadeOut().remove();
    },
    _pl_ : function(col,row){
        var colmd = 12;
        if(col==2) colmd=6;
        if(col==3) colmd=4;
        if(col==4) colmd=3;
        if(col==6) colmd=2;
        var temp = '<div class="col-md-'+colmd+'"><div class="loading"></div></div>';
        var final ="";
        for(var i=0;i<row;i++){
            final+=temp;
        }
        return final;
    }
};

var _rx_ = {
    formatDate: function(date) {
                const monthNames = ["Jan", "Feb", "Mar", "April", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
                var hours = date.getHours();
                var minutes = date.getMinutes();
                var ampm = hours >= 12 ? 'pm' : 'am';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? '0'+minutes : minutes;
                var strTime = hours + ':' + minutes + ' ' + ampm;
                return  date.getDate() +" "+ monthNames[date.getMonth()] + " " + date.getFullYear()+" - "+strTime ;
    },
    _dt_ : function(d){
        var seconds = ((Date.parse($("[app-utc]")[0].getAttribute("app-utc")) - Date.parse(d)) / 1000);
        var interval = (seconds / 31536000);
        interval =(seconds / 2592000);
        interval = (seconds / 86400);
        if(interval>3){
            return _rx_.formatDate(new Date(Date.parse(d)));
        }
        if (interval > 1) {
            return Math.round(interval) + " days ago";
        }
        interval = (seconds / 3600);
        if (interval > 1) {
            return Math.round(interval) + " hours ago";
        }
        interval = (seconds / 60);
        if (interval > 1) {
            return Math.round(interval) + " minutes ago";
        }
        return Math.floor(seconds) + " seconds ago";
    },
    _fnr_ : function(e){
        if (!_a_._c_()) { return; }
        this._ptr_();
        var __ol = this._atr_("*", "bnw-");
        for(var i in __ol){ $(__ol[i]).unbind(); $(__ol[i]).off(); $(__ol[i]).find("*").unbind(); }
        try { springdell.execute();  } catch(e){ console.log(e); }
        _box.querySelectorAll("[bnw-datetime]").forEach(function (e, i){
            $(e).text(_rx_._dt_($(e).text()));
            e.removeAttribute("bnw-datetime");
        });
        _box.querySelectorAll("[bnw-quick]").forEach(function (e, i) {
            var _t_   = $(e).attr("bnw-landing") != null ? $(e).attr("bnw-landing") : "win";
            var _y_   = $(e).attr("bnw-fasync") != null ? $(e).attr("bnw-fasync") : "false";
            var _rop_ = $(e).attr("bnw-progress") != null ? $(e).attr("bnw-progress") : "true";
            var _dat_ = $(e).attr("bnw-res") != null ? $(e).attr("bnw-res") : "";
            var form_data = "";
            if(_dat_!=""){
                form_data = new FormData();
                 _dat_ = JSON.parse(_dat_);
                for ( var key in _dat_) {
                    form_data.append(key, _dat_[key]);
                }

            }
            e.onclick = function(fe)
            {
                if (_rop_ == "true") {
                    _a_._pin_();
                }
                fe.preventDefault();
                _({ url: $(e).attr("bnw-quick"),  data : form_data, cache: false, processData: false, contentType: false, type: ($(e).attr("bnw-door")==null?"GET":$(e).attr("bnw-door")) })
                    .done(function (_k_) {
                    if (typeof _k_ =='object'){
                        try {  springdell.messageHandler(_k_.responseMessage, e.getAttribute("action")); }
                        catch(e) { _a_._m_("BuildNextWeb", _k_.responseMessage);    }
                    }
                    else {
                        if (_t_ == 'win') {
                            _a_._m_("BuildNextWeb", _k_);   
                        }
                        else {
                            $("#" + _t_).html(_k_);
                        }
                    }
                    if (_y_ == "true") {
                            _rx_._wx_();
                        }
                    _a_._pout_();
                    _rx_._fnr_();
                }).fail(function(_e_){
                    _a_._tot_("Problem submitting data "+_e_);
                });
            }
        });
        $("[bnw-copy]").each(function(){
            var inputName = $(this).attr("bnw-copy");
            var top = this;
            if(inputName!="")
            {
                $("[name="+inputName+"]").each(function(){
                    $(this).change(function(){
                        $(top).val($(this).val());
                    });
                });
            }
        });
        $("[bnw-menu]").each(function(){
            var btn = $(this).find("button");
            var menu = $(this).find("[class=dropdown-menu]");
            var activate = false;
            btn.click(function(){
                menu.show();
                $("body").append("<div id='dropback' class='backdrop'></div>")
                $("#dropback").click(function(){
                    menu.fadeOut();
                    $(this).remove();
                    $(this).unbind();
                });
            });
        });
        _box.querySelectorAll("[bnw-smartinput]").forEach(function (e, i) {
            var _resultset_ = $(e).find("[bnw-resultset]");
            var inputText = $(e).find("input[type=text]");
            var inputHidden = $(e).find("input[type=hidden]");
            var template = _resultset_.html();
            $(e).find("button").click(function(){
                var _btn_ = $(this);
                _a_._pin_();
                var _dx_ = new FormData();
                _dx_.append(inputText.attr("data-name"), inputText.val());
                _({ url: $(e).attr("bnw-smartinput"), data: _dx_, cache: false, processData: false, contentType: false, type: ($(e).attr("bnw-door")==null?"GET":$(e).attr("bnw-door")) })
                    .done(function (_k_) {
                        console.log(_k_);
                    if (typeof _k_ =='object'){
                        _resultset_.html("");
                        var __rs = _k_;
                        var incomingContent= "";
                        for(var i =0;i<__rs.length;i++)
                        {
                            var tempTemp = template;
                            incomingContent+=tempTemp.replace("{value}", __rs[i].value).replace("{name}", __rs[i].name);
                        }
                        _resultset_.html(incomingContent);
                        _resultset_.find("[data-value]").each(function(){
                            $(this).click(function(){
                                inputHidden.val($(this).attr("data-value"));
                                inputText.val($(this).text());
                                inputText.attr("disabled", "disabled");
                                _resultset_.html("");
                                _btn_.hide();
                                $(e).append("<a id='clearInput'>Clear Input</a>");
                                $(e).find("[id=clearInput]").click(function(){
                                    inputText.removeAttr("disabled");
                                    inputText.val("");
                                    _btn_.fadeIn();
                                    $(this).remove();
                                });
                            });
                        });
                        
                    }
                    _a_._pout_();
                }).fail(function(_e_){
                    _a_._tot_("Problem submitting data "+_e_);
                });
            });
        });
        _box.querySelectorAll("[bnw-form]").forEach(function (e, i) {
            var _t_   = $(e).attr("bnw-landing") != null ? $(e).attr("bnw-landing") : "win";
            var _y_   = $(e).attr("bnw-fasync") != null ? $(e).attr("bnw-fasync") : "true";
            var _rop_ = $(e).attr("bnw-progress") != null ? $(e).attr("bnw-progress") : "true";
            e.onsubmit = function (fe) {
                if (_rop_ == "true") {
                    _a_._pin_();
                }
                fe.preventDefault();
                var _dx_ = new FormData(e);
                _({ url: e.getAttribute("action"), data: _dx_, cache: false, processData: false, contentType: false, type: e.getAttribute("method") })
                    .done(function (_k_) {
                    if (typeof _k_ =='object'){
                        try {   springdell.messageHandler(_k_, e.getAttribute("action"));  }
                        catch(e) {  _a_._m_("BuildNextWeb", _k_.responseMessage);    }
                    }
                    else {
                        if (_t_ == 'win') {
                            _a_._m_("BuildNextWeb", _k_);   
                        }
                        else {
                            $("#" + _t_).html();
                        }
                    }
                    if (_y_ == "true") {
                            $(".modal").remove();
                            $("#bodyOverflow").remove();
                            _rx_._wx_();
                    }
                    _a_._pout_();
                    _rx_._fnr_();
                }).fail(function(_e_){
                    _a_._tot_("Problem submitting data "+_e_);
                });
            }
        });
        $("[bnw-window]").each(function(){
            var _tl_ = $(this).attr("bnw-window");
            if(_tl_=='height'){
                $(this).css("height", window.innerHeight);
            }
        });
        $("[bnw-async]").each(function(){
            $(this).click(function(e){
                e.preventDefault();
                var url= $(this).attr("href");
                _rx_._px_(url);
            });
        });
        $("[data-value]").each(function(){
            $(this).val($(this).attr("data-value"));
        });
        $("[bnw-context]").each(function(){
            if($(this).attr("bnw-context")=='true') return;
            $(this).attr("bnw-context", 'true');
            var data = $(this).text();
            data = data.replace(/&#39;/gi, "'");
            var openTagSH =false, openTagp=false, openTagB=false, openUl = false, openLi = false;
            for(var i=0;i<data.length;i++)
            {
                if(data[i]=='#')
                {
                    if(!openTagSH){
                        data = setCharAt(data,i,"<h4>");
                        openTagSH = true;
                    }
                    else {
                        data = setCharAt(data,i,"</h4>");
                        openTagSH = false;
                    }
                }
                if( data[i]=='^')
                {
                    if(!openTagp){
                        data = setCharAt(data,i,"<p>");
                        openTagp = true;
                    }
                    else {
                        data = setCharAt(data,i,"</p>");
                        openTagp = false;
                    }
                    i++;
                }
                if( data[i]=='*')
                {
                    if(!openTagB){
                        data = setCharAt(data,i,"<b>");
                        openTagB = true;
                    }
                    else {
                        data = setCharAt(data,i,"</b>");
                        openTagB = false;
                    }
                    i++;
                }
            }
            $(this).html(data);
        });
        _box.querySelectorAll("[bnw-component]").forEach(function (e, i) {
            if($(e).attr("bnw-component")!=null && $(e).attr("bnw-component")!=''){
                _a_._pin_();
                _({
                    cache: false, url: $(e).attr("bnw-component"), global: true, type: (e.getAttribute("bnw-door")==null?"GET":e.getAttribute("bnw-door")), async: true }).done(function (_k_) {
                        e.innerHTML =_k_;
                        _a_._pout_();
                        _rx_._fnr_();
                }).fail(function(_e_){
                    _a_._tot_("Problem submitting data "+_e_);
                    _a_._pout_();
                });    
            }
            e.removeAttribute("bnw-component");
            $(e).attr("bnw-component", null);
            $(e).removeData("bnw-component");
        });

        _box.querySelectorAll("[bnw-infinite]").forEach(function (e, i) {
            var allOver = true, scrollIn = false;
            $(window).scroll(function() {
                if(parseInt($(window).scrollTop() + $(window).height()) >= ($(document).height()-5) && !scrollIn) 
                {
                    scrollIn= true;
                    if($(e).attr("bnw-infinite")!=null && $(e).attr("bnw-infinite")!='' && $(e).attr("bnw-lock")!="true" && allOver){
                        allOver= false;
                        var _rl_ = $(e).attr("bnw-infinite");
                        if($(e).attr("bnw-sufix")!=null)
                        {
                            _rl_+=$(e).attr("bnw-sufix");
                            $(e).attr("bnw-sufix", (parseInt($(e).attr("bnw-sufix"))+1));
                        }
                        _a_._pin_();
                        _({
                            cache: false, url: _rl_, global: true, type: (e.getAttribute("bnw-door")==null?"GET":e.getAttribute("bnw-door")), async: false }).done(function (_k_) {
                                if(_k_.includes("<p class='no-data'>Data not available.</p>"))
                                {
                                    $(e).attr("bnw-lock", "true");
                                }
                                $(e).append(_k_);
                                _a_._pout_();
                                _rx_._fnr_();
                                allOver= true;
                                scrollIn= false;
                        }).fail(function(_e_){
                            _a_._tot_("Problem submitting data "+_e_);
                            _a_._pout_();
                        });    
                    }    
                }
            });
        });

    },
    _fnf_ : function(e){
        if (!_a_._c_()) { return; }
        this._ptr_();
        this._js_();
        $(window).on('popstate', function(event) { 
            var state = event.originalEvent.state; 
            if (state) { 
                _rx_._px_(state.uriState);
            }
        });
        try { springdell.singletone();  } catch(e){ }
    },
    _wx_  : function(){
            if (!_a_._c_()) { return; }
            _a_._pin_();
            var ___ = '';
            var urihd = window.location.href;
            _({
                cache: false, url: urihd, global: true, type: 'GET', async: true }).done(function (_k_) {
                ___ = _k_;
                var _x = document.createElement("html");
                _x.innerHTML = ___;
                try {
                    $("[springdell]").html(_x.querySelectorAll('[springdell=async]')[0].innerHTML);          
                    _rx_._fnr_();
                }
                catch (e) {
                        _a_._tot_("Problem refreshing data");
                    try {
                        _rx_._fnr_();
                    }
                    catch (ex) {
                        _a_._tot_("Problem refreshing data");
                    }         
                }
                _a_._pout_();
                history.pushState(null, null, urihd);
            }).fail(function(_e_){
                _a_._tot_("Problem submitting data "+_e_);
            });
    },
    _px_  : function(urihd){
            if (!_a_._c_()) { return; }
            _a_._pin_();
            var ___ = '';
            _({
                cache: false, url: urihd, global: true, type: 'GET', async: true }).done(function (_k_) {
                ___ = _k_;
                var _x = document.createElement("html");
                _x.innerHTML = ___;
                try {
                    $("body").html(_x.querySelectorAll('body')[0].innerHTML);          
                    _a_._pin_();
                    _rx_._fnf_();
                    _rx_._fnr_();
                }
                catch (e) {
                        _a_._tot_("Problem refreshing data");
                    try {
                        _rx_._fnr_();
                    }
                    catch (ex) {
                        _a_._tot_("Problem refreshing data");
                    }         
                }
                _a_._pout_();
                history.pushState({uriState : urihd}, _x.getElementsByTagName("title")[0].innerHTML, urihd);
            }).fail(function(_e_){
                _a_._tot_("Problem submitting data "+_e_);
            });
    },
    _ptr_ : function(){
        if (!_a_._c_()) { return; }
        var sel = "*", str="bnw-";
        var el = document.querySelectorAll(sel), res=[];  
        for (var i = 0, n=el.length; i < n; i++){
            for (var j=0;j<el[i].attributes.length;j++) {
                if (el[i].attributes[j].name.indexOf(str)==0) {
                    var ol_ = el[i].getAttribute(el[i].attributes[j].name);
                    if(! (ol_=='' || ol_==null)){
                        $(el[i]).attr(el[i].attributes[j].name, ol_);
                    }
                    el[i].setAttribute(el[i].attributes[j].name, "");
                }
            }
        }
        return res;
    },
    _atr_ : function(sel,str){
        if (!_a_._c_()) { return; }
        var el = document.querySelectorAll(sel), res=[];  
        for (var i = 0, n=el.length; i < n; i++){
            for (var j=0;j<el[i].attributes.length;j++) {
                if (el[i].attributes[j].name.indexOf(str)==0) {
                    res.push(el[i]); 
                }
            }
        }
        return res;
    },
    _js_ : function(){
        try 
        {
            for(var i=0;i<pagejs.length;i++)
            {
                var script = "<script type='text/javascript' src='"+pagejs[i]+"'></script>";
                $("body").append(script);
            }
        }
        catch(e){ }
    }
};
function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}