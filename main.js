//Drag and drop
//Listeners de Drag&Drop
$(document).ready(function() {
var area = document.getElementById('DRAGDROP');
if (area == null) {return false;}
area.addEventListener('drop', handleFileSelect, false);
area.addEventListener('dragover', handleDragOver, false);
area.addEventListener('dragleave', handleDragLeave, false);
});
//DROP: Se ejecuta cuando se realiza un drop
function handleFileSelect(evt) {
evt.stopPropagation();
evt.preventDefault();
var file = evt.dataTransfer.files;
if (file[0]) {
var r = new FileReader();
r.onload = function(e) {
var contents = e.target.result;
INPUT.innerHTML = contents;
}
r.readAsText(file[0]);
}
else {
alert("Error al cargar el fichero");
}
evt.target.style.background = "#FFF";
}
//DRAGOVER: Se ejecuta cuando el fichero se encuentra encima del area de drop
function handleDragOver(evt) {
evt.stopPropagation();
evt.preventDefault();
evt.target.style.background = "#DDD";
}
//DRAGLEAVE: Se ejecuta cuando se sale del area de drop
function handleDragLeave(evt) {
evt.stopPropagation();
evt.preventDefault();
evt.target.style.background = "#FFF";
}
/*jslint evil: true */
/*members create, error, message, name, prototype, stringify, toSource,
toString, write
*/
/*global JSON, make_parse, parse, source, tree */
// Transform a token object into an exception object and throw it.
// http://stackoverflow.com/questions/17857670/javascript-prototype-throw-the-error-as-object-object-object-has-no-method
// Thanks Eliasib for pointing the error
Object.constructor.prototype.error = function (message, t) {
t = t || this;
t.name = "SyntaxError";
t.message = message;
throw t;
};
function main() {
var parse = make_parse();
var source = INPUT.value;
var string, tree;
try {
tree = parse(source);
//string = JSON.stringify(tree, ['type', 'value', 'from', 'to'], 4);
string = JSON.stringify(tree, ['key', 'name', 'message',
'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
} catch (e) {
string = JSON.stringify(e, ['name', 'message', 'from', 'to', 'key',
'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
}
OUTPUT.innerHTML = string.replace(/&/g, '&amp;').replace(/[<]/g, '&lt;');
};
window.onload = function() {
PARSE.onclick = main;
}