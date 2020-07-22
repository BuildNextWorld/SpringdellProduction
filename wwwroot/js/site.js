/*
  2020 Copyright BuildNextWorld
 */

if (typeof Object.keys !== "function") {
    (function () {
        var hasOwn = Object.prototype.hasOwnProperty;
        Object.keys = Object_keys;
        function Object_keys(obj) {
            var keys = [], name;
            for (name in obj) {
                if (hasOwn.call(obj, name)) {
                    keys.push(name);
                }
            }
            return keys;
        }
    })();
}
var editor = {
    createFileEditor: function (ele, data, type, readonly, scroll) {
        if (readonly == null || readonly === "false") {
            this.changeTheme("vs-light");
        }
        var shows = scroll ? 'visible' : 'hidden';
        this.languageFile(type);
        var editor = monaco.editor.create(ele, {
            model: null,
            readOnly: readonly,
            minimap: { enabled: false },
            automaticLayout: true,
            scrollBeyondLastLine: false
        });
        var oldModel = editor.getModel();
        var newModel = monaco.editor.createModel(data, type);
        editor.setModel(newModel);
        if (ele.getAttribute("pb-insertinto") != null) {
            editor.setValue($("#" + ele.getAttribute("pb-insertinto")).val());
        }
        if (oldModel) {
            oldModel.dispose();
        }
        if (!scroll) {
            var height = editor.getModel().getLineCount() * 19;
            $("#diffeditor").css("height", height + 60);
            editor.layout();
        }
        

        $("[class=language-picker]").unbind(); $("[class=language-picker]").off();
        $("[class=language-picker]").change(function () {
            var modelX = editor.getModel(); // we'll create a model for you if the editor created from string value.
            monaco.editor.setModelLanguage(modelX, $(this).val());
            _tsot("Editor Langauage set to : " + $(this).val());
        });
        $("#_save_file").unbind(); $("#_save_file").off();
        $(document).bind('keydown', function (e) {
            if (e.ctrlKey && (e.which == 83)) {
                e.preventDefault();
                var urls = $("#_save_file").attr("href");
                var fd = new FormData();
                fd.append("Content", editor.getValue());
                $.ajax({
                    url: urls,
                    //headers: _http_h(),
                    data: fd,
                    global: true,
                    type: "post",
                    contentType: false,
                    processData: false,
                    async: true,
                    success: function (data) {
                        popup("Message",data)
                    },
                    error: function (xhr, ajaxOptions, thrownErro) {
                        popup("Error", "Got an error-->"+thrownErro)
                    }
                });

                return false;
            }
        });
        $("#_save_file").click(function (e) {
            e.preventDefault();
            var urls = $(this).attr("href");
            var fd = new FormData();
            fd.append("Content", editor.getValue());
            $.ajax({
                url: urls,
                //headers: _http_h(),
                data: fd,
                global: true,
                type: "post",
                contentType: false,
                processData: false,
                async: true,
                success: function (data) {
                    popup("Message", data);
                },
                error: function (xhr, ajaxOptions, thrownErro) {
                    popup("Error", "Got an error-->" + thrownErro);
                }
            });

        });
        $("#_download").click(function (e) {
            e.preventDefault();
            _tsot("Starting Download !NEW");
            var ext = mapFileToExtension($(".language-picker") != null ? $(".language-picker").val() : "txt");
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(editor.getValue()));
            element.setAttribute('download', "OpenEditorFile." + ext);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            _fpro(); RemoveByID("loadwrapp");
            //return;
            var urls = $(this).attr("href");
            var fd = new FormData();
            fd.append("content", editor.getValue());

            $.ajax({
                url: urls,
                headers: _http_h(),
                data: fd,
                global: true,
                type: "post",
                contentType: false,
                processData: false,
                async: true,
                success: function (data) {
                    RemoveByID("loadwrapp");
                    _tsot("Starting Download");
                    var out = setTimeout(function () {
                        window.location.href = "/file/downloadtemp/" + data;
                        clearTimeout(out);
                    }, 2000);
                },
                error: function (xhr, ajaxOptions, thrownErro) {
                    _tsot("Problem submitting form");
                    console.log(thrownErro + " FORM AJACC " + xhr.status + ajaxOptions + "   ");
                    RemoveByID("loadwrapp");
                }
            });
        });
        editor.onDidChangeModelContent(function (e) {
            if (ele.getAttribute("pb-insertinto") != null) {
                $("#"+ele.getAttribute("pb-insertinto")).val(editor.getValue());
            }
        });
    },
    compareFiles: function (lhs, rhs, type, ele, readonly) {
        this.languageFile(type);
        var diffEditor = monaco.editor.createDiffEditor(ele, {
            enableSplitViewResizing: false,
            readOnly: readonly
        });
        var lhsModel = monaco.editor.createModel(lhs, type);
        var rhsModel = monaco.editor.createModel(rhs, type);
        diffEditor.setModel({
            original: lhsModel,
            modified: rhsModel
        });
    },
    changeTheme: function (theme) {
        monaco.editor.setTheme(theme);
    },
    languageFile: function (lang) {
        //var fileHtml = "<script src=\"/cdn-server/static/javascripts/vs/basic-languages/" + lang + "/" + lang + ".js\"><\/script>";
        //$("head").append(fileHtml);
    }
};
document.onreadystatechange = function () {
    var state = document.readyState;
    switch (state) {
        case "interactive":
            _pre();
            break;
        case "complete":
            $("#preload").fadeOut();
            _run(); _singleton();
            break;
    }
}
function _pre() {
    $("#preload").fadeIn();
}
function _run() {
    var b = document.getElementsByTagName("body")[0];
    $('[id=tempPopup]').remove();
    $("[pb-autosubmit]").each(function () {
        $(this).unbind();
        $(this).off();
    });
    $("[id=generate]").each(function () {
        $(this).unbind();
        $(this).off();
    });
    $("[pb-form]").each(function () {
        $(this).unbind();
        $(this).off();
    });
    $("[pb-url]").each(function () {
        $(this).unbind();
        $(this).off();
    });
    $("[id=func-editor]").each(function () {
        $(this).unbind();
        $(this).off();
    });
    $("a").each(function () {
        $(this).unbind();
        $(this).off();
    });
    $("[data-value]").each(function () {
        $(this).unbind();
        $(this).off();
    });
    $("[data-auto]").each(function () {
        $(this).unbind();
        $(this).off();
    });
    $("[data-value]").each(function () {
        $(this).val($(this).attr("data-value"));
    });

    $("[data-auto]").each(function () {
        var ___ = '';
        var urihd = $(this).attr("href");
        $(this).click(function (e) {
            e.preventDefault();
            pre();
            $.ajax({
                beforeSend: function () {
                    $("#_centeralpoint").append("");
                },
                cache: false,
                url: urihd,
                global: true,
                type: 'GET',
                async: true,
                success: function (data) {
                    window.scrollTo(0, 0); 
                    ___ = data;
                    var _x = document.createElement("html");
                    _x.innerHTML = ___;
                    try {
                        $("#_centeralpoint").html(_x.querySelectorAll('[id=_centeralpoint]')[0].innerHTML);
                        _run();
                        post();
                    }
                    catch (e) {
                        console.log(e);
                        try {
                            $("#standard-target").html(_x.innerHTML);
                            _run();
                            post();
                        }
                        catch (ex) {
                            console.log(ex);
                        }
                    }
                    history.pushState(null, null, urihd);
                    post();
                },
                error: function (request, status, error) {
                    console.log(status);
                    message(error);
                    post();
                }
            });
        });


    });
    $("[id=func-editor]").each(function () {
        var data = $(this).find("code").text().trim();
        $(this).html("");
        var scroll = $(this).attr("data-scroll") != null && $(this).attr("data-scroll") === "false" ? false : true;
        editor.createFileEditor(document.getElementById("func-editor"), data, $(this).attr("data-exn"), $(this).attr("data-read"), scroll);
        $(this).show();
    });

    $("[pb-autosubmit]").each(function () {
        var url = $(this).attr("pb-autosubmit");
        var nameCol = $(this).attr("name");
        var t = $(this).attr("pb-target"); 
        $(this).change(function (e) {
            var fd = new FormData(); 
            fd.append(nameCol, this.value);
            $.ajax({
                url: url,
                data: fd,
                cache: false,
                processData: false,
                contentType: false,
                type: 'POST'
            }).done(function (data) {
                $("#" + t).html(data);
                try { callAjax(); } catch (e) { }
            });
        });
    });
    b.querySelectorAll("[id=generate]").forEach(function (e, i) {
        e.onclick = function () {
            var token = tokenGenerateComplex(256);
            document.getElementsByName("token")[0].value = token;
        }
    });
    b.querySelectorAll("[pb-form]").forEach(function (e, i) {
        var target = e.getAttribute("pb-target") != null ? e.getAttribute("pb-target") : "modal";
        var scroll = e.getAttribute("pb-scroll") != null ? e.getAttribute("pb-scroll") : "";
        var aysncpage = e.getAttribute("pb-async") != null ? e.getAttribute("pb-async") : "true";
        var progress = e.getAttribute("pb-progress") != null ? e.getAttribute("pb-progress") : "true";
        e.onsubmit = function (fe) {
            if (scroll=="top") {
                b.scroll({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
            }
            if (progress == "true") {
                pre();
            }
            fe.preventDefault();

            var datax = new FormData(e);
            $.ajax({
                url: e.getAttribute("action"),
                data: datax,
                cache: false,
                processData: false,
                contentType: false,
                type: e.getAttribute("method")
            }).done(function (data) {
                if (aysncpage == "true") {
                    lostAndFound();
                }
                else {
                    post();
                }
                if (target == 'modal') {
                    createModal('<img src="/cdn/images/springdell-white.png" style="width: 113px;padding: 7px;" >', data);
                }
                else {
                    $("#" + target).html(data);
                }
                try { callAjax(); } catch (ex) {  }
                _run();
            });
        }
    });
    b.querySelectorAll("[pb-popup]").forEach(function (e, i) {
        var target = e.getAttribute("pb-popup") != null ? e.getAttribute("pb-popup") : "modal";
        e.onclick = function (fe) {
            $("#target_" + target).fadeIn();
        }
        $("#target_" + target).find("[id=close]").each(function () {
            console.log("test");
            $(this).click(function () {
                $("#target_" + target).fadeOut();
            });
        })
    });
    b.querySelectorAll("[pb-url]").forEach(function (e, i) {
        var target = e.getAttribute("pb-target") != null ? e.getAttribute("pb-target") : "modal";
        var critcal = e.getAttribute("pb-critical") != null ? e.getAttribute("pb-critical") : "";
        var aysncpage = e.getAttribute("pb-async") != null ? e.getAttribute("pb-async") : "true";
        var historyX = e.getAttribute("pb-push") != null ? e.getAttribute("pb-push") : "true";
        var rerun = e.getAttribute("pb-run") != null ? e.getAttribute("pb-run") : "true";
        e.onclick = function (fe) {
            if (critcal != null && critcal != "" ) {
                if (!confirm(critcal)) {
                    return;
                }
            }
            pre();
            fe.preventDefault();
            $.ajax({
                url: e.getAttribute("pb-url"),
                //data: datax,
                cache: false,
                processData: false,
                contentType: false,
                type: e.getAttribute("pb-method") != null ? e.getAttribute("pb-method") : "GET"
            }).done(function (data) {
                if (aysncpage == "true") {
                    lostAndFound();
                    post();
                }
                else if (historyX=='true')  {
                    history.pushState(null, null, e.getAttribute("pb-url"));
                    post();
                }
                if (target == 'modal') {
                    post();
                    createModal('<img src="/cdn/images/springdell-white.png" style="width: 113px;padding: 7px;" >', data);
                }
                else {
                    $("#" + target).html(data);
                }
                try { callAjax(); } catch (ex) { }
                if (rerun == 'true') {
                    _run();
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                popup("Error",textStatus + "..." + errorThrown);
            });
        }
    });
}

function _singleton() {
    var height = window.innerHeight;
    var topnav = $("#topnav").height();
    $("[data-window-height]").each(function () {
        if ($(this).attr("data-window-height") == "full") {
            $(this).css("min-height", height - (topnav+10));
            $(this).css("height", height - (topnav+10));
        }
        else {
            $(this).css("min-height", height - (topnav + bottomnav));
        }
    });
    var b = document.getElementsByTagName("body")[0];
    $("input").attr("placeholder", "Type here....");
    $("textarea").attr("placeholder", "Type here....");
    $("input").attr("autocomplete", "off");
    $("textarea").attr("autocomplete", "off");
    b.querySelectorAll("[pb-load]").forEach(function (e, i) {
        if (e.id == null || e.id == "") {
            e.id = "pb-id-" + tokenGenerate(5);
        }
        var target = e.id;
        var request = new XMLHttpRequest();
        request.addEventListener('load', function (re) {
            $("#" + target).html(request.response);
        });
        request.upload.addEventListener('progress', function (ex) {
            var percent_complete = (ex.loaded / ex.total) * 100;
            console.log(percent_complete);
        });
        request.open("GET", e.getAttribute("pb-load"));
        request.send();
    });
}
function targetHandler(data, target) {
    //alert(data);
    var t = document.getElementById(target);
    var dt = t.getAttribute("pb-datatype") != null ? t.getAttribute("pb-datatype") : "html";
    var merge = t.getAttribute("pb-merge") != null ? t.getAttribute("pb-merge") : "full";
    if (dt == "json") {
        var parsedJson = JSON.parse(data);
        var data = parsedJson.responseData;
        if (data instanceof Array) {
            var loop = t.getElementsByTagName("pb-repeat");
            if (loop.length == 0) {
                message("<pb-repeat> tag not found");
                return;
            }
            var template = loop[0].innerHTML;
            t.innerHTML = "";
            for (var i = 0; i < data.length; i++) {
                var temp = document.createElement("div");
                temp.id = "parent_temp";
                temp.innerHTML = template;
                var jsonData = data[i];
                var keys = Object.keys(jsonData);
                for (var keyIndex in keys) {
                    var key = keys[keyIndex];
                    elementInsidevirtual(temp, key).innerHTML = data[i][key];
                }
                t.innerHTML = t.innerHTML + temp.innerHTML;
            }
        }
        else {
            var keys = Object.keys(data);
            for (var keyIndex in keys) {
                var key = keys[keyIndex];
                elementInside(t.id, key).innerHTML = data[key];
            }
        }
    }
    else {
        if (merge == "after") {
            t.innerHTML = t.innerHTML + data;
        }
        else if (merge == "before") {
            t.innerHTML = data + t.innerHTML;
        }
        else {
            t.innerHTML = data;
        }
    }
    _run();
}
function elementInside(containerID, childID) {
    var elm = {};
    var elms = document.getElementById(containerID).getElementsByTagName("*");
    for (var i = 0; i < elms.length; i++) {
        if (elms[i].id === childID) {
            elm = elms[i];
            break;
        }
    }
    return elm;
}
function elementInsidevirtual(virtual, childID) {
    var elm = {};
    var elms = virtual.getElementsByTagName("*");
    for (var i = 0; i < elms.length; i++) {
        if (elms[i].id === childID) {
            elm = elms[i];
            break;
        }
    }
    return elm;
}
function tokenGenerate(length) {
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    var b = [];
    for (var i = 0; i < length; i++) {
        var j = (Math.random() * (a.length - 1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}
function tokenGenerateComplex(length) {
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()[]".split("");
    var b = [];
    for (var i = 0; i < length; i++) {
        var j = (Math.random() * (a.length - 1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}
function message(msg) {
    popup("Message",msg);
}
function ToUrl(url) {
    window.location.href = url;
}

function popup(header, body) {
    $('[id=tempPopup]').remove();
    var template = '<div id="tempPopup" class="wrapper"><div class="popupmessage" > <div class="popuphear" >' + header + '<a id="popupclose" class="btn btn-sm float-right btn-default btn-close"><i class="icofont-close-circled"></i></a></div> <div class="popup-body" >' + body + '</div></div></div>'
    $('body').append(template);
    $("#tempPopup .popupmessage").addClass("showp");
    $('#popupclose').click(function () {
        $('[id=tempPopup]').fadeOut();
        $('[id=tempPopup]').unbind();
        $('[id=popupclose]').unbind();
        $(this).attr("id", "expired");
        $('[id=tempPopup]').attr("id", "expired");
    });
}
function createModal(header, body) {
    $(".modal").remove();
    var template = '<div class="modal" tabindex="-1" role="dialog"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">' + header + '</h5><button id="tempclose" type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">' + body + '</div></div></div></div>';
    $('body').append(template);
    $(".modal").show();
    $('#tempclose').click(function () {
        $('.modal').fadeOut().remove();
    });
}

function lostAndFound()
{
    var ___ = '';
    var urihd = window.location.href;
    $.ajax({
        beforeSend: function () {
            $("#_centeralpoint").append("");
        },
        cache: false,
        url: urihd,
        global: true,
        type: 'GET',
        async: true,
        success: function (data) {
            ___ = data;
            var _x = document.createElement("html");
            _x.innerHTML = ___;
            try {
                $("#_centeralpoint").html(_x.querySelectorAll('[id=_centeralpoint]')[0].innerHTML);          
                _run();
                post();
            }
            catch (e) {
                console.log(e);
                try {
                    $("#standard-target").html(_x.innerHTML);          
                    _run();
                    post();
                }
                catch (ex) {
                    console.log(ex);
                }
            }
            history.pushState(null, null, urihd);
        },
        error: function (request, status, error) {
                
        }
    });
}

function pre() {
    var html = '<div id="asyn" class="synchronize"><img src="/cdn/svg/synchronize.svg"  /></div>';
    $('body').append(html);
    $("#asyn").addClass("open");
}
function post() {
    var i = 0;
    var st = setInterval(function () {
        i++;
        if (i == 1) {
            $("#asyn").removeClass("open").addClass("remove");

        }
        else if (i == 2) {
            $("#asyn").remove();
            clearInterval(st);
        }
    },1000)
    
}