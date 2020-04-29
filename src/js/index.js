"use strict";
var count = 0;
var pest_focus = "pestaña_1";
var list_pest = new Array;
function get_count() {
    return count++;
}
function get_pest() {
    return pest_focus;
}
function set_pest(pest_actual) {
    pest_focus = pest_actual;
}
function insert_pest(pestana, nombre) {
    var new_pest = new pestana_class(pestana, nombre);
    list_pest.push(new_pest);
}
function delete_pest(pestana) {
    for (var i = 0; i < list_pest.length; i++) {
        if (list_pest[i].Pestana_id == pestana) {
            delete list_pest[i];
        }
    }
}
function index(pestanas, pestana) {
    var id = pestana.replace('pestana', '');
    set_pest('textarea' + id);
    var pestana1 = document.getElementById(pestana);
    var list_pestanas = document.getElementById(pestanas);
    var cont_pestana = document.getElementById('cont' + pestana);
    var list_cont = document.getElementById('cont' + pestanas);
    var i = 0;
    while (typeof (list_cont === null || list_cont === void 0 ? void 0 : list_cont.getElementsByTagName('div')[i]) != 'undefined') {
        $(document).ready(function () {
            if (list_cont) {
                $(list_cont.getElementsByTagName('div')[i]).css('display', 'none');
                $(list_cont.getElementsByTagName('li')[i]).css('background', '');
                $(list_cont.getElementsByTagName('li')[i]).css('padding-bottom', '');
            }
        });
        i++;
    }
    $(document).ready(function () {
        if (cont_pestana) {
            $(cont_pestana).css('display', '');
        }
        if (pestana1) {
            $(pestana1).css('backgroun', 'dimgray');
            $(pestana1).css('padding-bottom', '2px');
        }
    });
    try {
        var actual = document.getElementById('cpestana' + id);
        var text_actual = document.getElementById('textarea' + id);
        while (actual === null || actual === void 0 ? void 0 : actual.firstChild) {
            actual.removeChild(actual.firstChild);
        }
        if (text_actual) {
            actual === null || actual === void 0 ? void 0 : actual.appendChild(text_actual);
        }
        var edit = CodeMirror(actual, {
            lineNumbers: true,
            value: text_actual.value,
            theme: "darcula",
            mode: "text/x-java"
        }).on('change', edit => {
            text_actual.value = edit.getValue();
        });
    }
    catch (error) {
    }
}
function add() {
    var num = get_count();
    var lu = document.getElementById("list");
    var li = document.createElement("li");
    li.setAttribute('id', 'pestana' + num);
    var a = document.createElement("a");
    a.setAttribute('id', 'a' + num);
    a.setAttribute('href', 'javascript:index("pestanas","pestana' + num + '")');
    a.text = 'pestana ' + num;
    li.appendChild(a);
    lu.appendChild(li);
    index("pestanas", "pestana" + num);
    var contenido = document.getElementById("contenedorPestanas");
    var divp = document.createElement("div");
    var ta = document.createElement("textarea");
    divp.setAttribute('id', 'cpestana' + num);
    ta.setAttribute('id', 'textarea' + num);
    ta.setAttribute('name', 'textarea' + num);
    ta.setAttribute('class', 'ta');
    ta.setAttribute('style', 'display:none');
    ta.cols = 123;
    ta.rows = 30;
    divp.appendChild(ta);
    contenido.appendChild(divp);
    var act = document.getElementById('cpestana' + num);
    var tact = document.getElementById('textarea' + num);
    var editor = CodeMirror(act, {
        lineNumbers: true,
        value: tact.value,
        theme: "darcula",
        mode: "text/x-java"
    }).on('change', editor => {
        tact.value = editor.getValue();
    });
}
let addButton = document.getElementById('btn-add');
addButton.addEventListener('click', add, false);
function quit() {
}
class pestana_class {
    constructor(pestana_id, nombre) {
        this.pestana_id = pestana_id;
        this.nombre = nombre;
    }
    get Pestana_id() {
        return this.pestana_id;
    }
    get Nombre() {
        return this.nombre;
    }
}
