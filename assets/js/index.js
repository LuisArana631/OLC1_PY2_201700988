"use strict";
//Config of save,up files and tabs
var count = 0;
var pest_focus = "pestana1";
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
    var cont_pestana = document.getElementById('c' + pestana);
    var list_cont = document.getElementById('contenido' + pestanas);
    var i = 0;
    while (typeof list_cont.getElementsByTagName('div')[i] != 'undefined') {
        $j(document).ready(function () {
            $j(list_cont.getElementsByTagName('div')[i]).css('display', 'none');
            $j(list_pestanas.getElementsByTagName('li')[i]).css('background', '');
            $j(list_pestanas.getElementsByTagName('li')[i]).css('padding-bottom', '');
        });
        i += 1;
    }
    $j(document).ready(function () {
        $j(cont_pestana).css('display', '');
        $j(pestana1).css('background', 'dimgray');
        $j(pestana1).css('padding-bottom', '2px');
    });
    try {
        var actual = document.getElementById('cpestana' + id);
        var text_actual = document.getElementById('textarea' + id);
        while (actual.firstChild) {
            actual.removeChild(actual.firstChild);
        }
        actual.appendChild(text_actual);
        var edit = CodeMirror(actual, {
            lineNumbers: true,
            value: text_actual.value,
            theme: "darcula",
            mode: "text/x-java",
            indentWithTabs: true
        }).on('change', edit => {
            text_actual.value = edit.getValue();
        });
    }
    catch (error) {
    }
}
function add() {
    var num = get_count();
    var lu = document.getElementById("lista");
    var li = document.createElement("li");
    li.setAttribute('id', 'pestana' + num);
    var a = document.createElement("a");
    a.setAttribute('id', 'a' + num);
    a.setAttribute('href', 'javascript:index("pestanas","pestana' + num + '")');
    a.text = 'pestana' + num;
    li.appendChild(a);
    lu.appendChild(li);
    index("pestanas", "pestana" + num);
    var contenido = document.getElementById("contenidopestanas");
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
        mode: "text/x-java",
        indentWithTabs: true
    }).on('change', editor => {
        tact.value = editor.getValue();
    });
}
let addButton = document.getElementById('btn-add');
addButton.addEventListener('click', add, false);
function quit() {
    try {
        var lu = document.getElementById("lista");
        lu.removeChild(document.getElementById(get_pest().replace("textarea", "pestana")));
        var contenido = document.getElementById("contenidopestanas");
        contenido.removeChild(document.getElementById(get_pest().replace("textarea", "cpestana")));
    }
    catch (error) { }
}
let deleteButton = document.getElementById('btn-delete');
deleteButton.addEventListener('click', quit, false);
function openFile(files) {
    var file = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var _a;
        var actual = document.getElementById(get_pest().replace("textarea", "cpestana"));
        var text_actual = document.getElementById(get_pest());
        text_actual.value = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
        while (actual.firstChild) {
            actual.removeChild(actual.firstChild);
        }
        actual.appendChild(text_actual);
        var edit = CodeMirror(actual, {
            lineNumbers: true,
            value: text_actual.value,
            theme: "darcula",
            mode: "text/x-java",
            indentWithTabs: true,
        }).on('change', edit => {
            text_actual.value = edit.getValue();
        });
    };
    reader.readAsText(file);
    var a = document.getElementById(get_pest().replace("textarea", "a"));
    a.textContent = file.name;
    insert_pest(get_pest(), file.name);
    document.getElementById('fileInput').value = "";
}
function downloadFile() {
    var ta = document.getElementById(get_pest());
    var contenido = ta.value;
    var title = document.getElementById(get_pest().replace("textarea", "a"));
    var nombre = title.textContent;
    if (nombre.includes("pestana")) {
        nombre = nombre + ".java";
    }
    var file = new Blob([contenido], { type: 'text/plain' });
    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(file, nombre);
    }
    else {
        var a = document.createElement("a"), url = URL.createObjectURL(file);
        a.href = url;
        a.download = nombre;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}
let saveButton = document.getElementById('btn-save');
saveButton.addEventListener('click', downloadFile, false);
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
function Restablecer() {
    var urlRestablecer = "http://localhost:3000/restablecer/";
    $j.get(urlRestablecer, function (data, status) {
        if (status.toString() == 'success') {
            console.log(data);
        }
        else {
            alert("Error estado de conexion " + status);
        }
    });
}
let restablecerButton = document.getElementById('btn-restablecer');
restablecerButton.addEventListener('click', Restablecer, false);
// End points de go para conectar con express
function Conn() {
    var texto = document.getElementById(get_pest()).value;
    var urlAnalizar = "http://localhost:3000/analizar/";
    var urlErrores = "http://localhost:3000/errores/";
    var urlCopias = "http://localhost:3000/copias/";
    $j.post(urlAnalizar, { text: texto }, function (data, status) {
        if (status.toString() == 'success') {
            console.log(data);
            /* CREAR JSTREE */
            createJSTree(data);
        }
        else {
            alert("Error estado de conexion " + status);
        }
    });
    $j.get(urlCopias, function (data, status) {
        console.log(data);
        if (status.toString() == 'success') {
            /* PINTAR TABLA DE COPIAS */
            let conteoVariables = 1;
            let conteoFunciones = 1;
            let conteoClases = 1;
            let tableVariables = document.getElementById('tablaVariables');
            let tableFunciones = document.getElementById('tablaFunciones');
            let tableClases = document.getElementById('tablaClases');
            var iVar = tableVariables.rows.length;
            while (iVar > 1) {
                iVar--;
                tableVariables.deleteRow(iVar);
            }
            if (tableVariables) {
                data.forEach(variables => {
                    let newRow = tableVariables.insertRow(tableVariables.rows.length);
                    let no = newRow.insertCell(0);
                    let tipo = newRow.insertCell(1);
                    let id = newRow.insertCell(2);
                    no.innerHTML = conteoVariables.toString();
                    tipo.innerHTML = variables.tipo;
                    id.innerHTML = variables.identificador;
                    conteoVariables++;
                });
            }
        }
        else {
            alert("Error estado de conexion " + status);
        }
    });
    $j.get(urlErrores, function (data, status) {
        if (status.toString() == 'success') {
            /* PINTAR LA TABLA CON LOS ERRORES */
            let conteo = 1;
            let table = document.getElementById('tablaErrores');
            var i = table.rows.length;
            while (i > 1) {
                i--;
                table.deleteRow(i);
            }
            if (table) {
                data.forEach(error => {
                    let newRow = table.insertRow(table.rows.length);
                    let no = newRow.insertCell(0);
                    let tipo = newRow.insertCell(1);
                    let er = newRow.insertCell(2);
                    let linea = newRow.insertCell(3);
                    let descripcion = newRow.insertCell(4);
                    no.innerHTML = conteo.toString();
                    tipo.innerHTML = error.tipo;
                    er.innerHTML = error.valor;
                    linea.innerHTML = error.linea.toString();
                    descripcion.innerHTML = error.descripcion;
                    conteo++;
                });
            }
            console.log(data);
        }
        else {
            alert("Error estado de conexion " + status);
        }
    });
}
function createJSTree(jsondata) {
    $('#html').jstree("destroy");
    $('#html').jstree({
        'core': {
            'data': jsondata
        }
    });
}
let evaluarButton = document.getElementById('btn-evaluar');
evaluarButton.addEventListener('click', Conn, false);
