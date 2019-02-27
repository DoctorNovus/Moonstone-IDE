
var app = require('electron').remote
var dialog = app.dialog;

var fs = require('fs');

let menubar = document.getElementById('menubar');
let content = document.getElementById('fileContent');
let lineCount = document.getElementById('lineCount');

menubar.style.width = content.offsetWidth + "px";

lineCount.style.fontSize = content.style.fontSize;
content.style.width = window.innerWidth - 35 + "px";
content.style.left = 35 + "px";
content.style.height = 400 + "px";
content.style.top = 40 + "px";
lineCount.style.width = 34 + "px";
lineCount.style.height = 405 + "px";
lineCount.style.top = content.offsetTop + "px";
lineCount.style.left = content.offsetLeft - 35 + "px";


document.getElementById('createcontent').onclick = function(){
    dialog.showSaveDialog((fileName) => {
        if(fileName == undefined){
            return;
        }

        fs.writeFile(fileName, content.value, (err) => {
            if (err) console.log(err);
        });
    });
}

document.getElementById('loadcontent').onclick = () => {
    dialog.showOpenDialog((fileNames) => {
        if(fileNames == undefined){
            return;
        } else {
            readFile(fileNames[0]);
        }

    })
}

function readFile(filepath){
    fs.readFile(filepath, 'utf-8', (err, data) => {
        if(err){
            return;
        }

        content.value = data;

        console.log(countLine('fileContent'));
    });
}

function countLine(element) {
    lineCount.innerHTML = ""
    var text = document.getElementById(element).value;
    var lines = text.split("\n");
    var count = 1;
    for (var i = 0; i < lines.length-1; i++) {
        lineCount.innerHTML += "<br>" + count;
        count += 1;
    }
    lineCount.innerHTML += "<br>" + count;
}
