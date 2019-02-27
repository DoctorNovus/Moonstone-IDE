'use strict'

const electron = require('electron');
const {app, BrowserWindow, nativeImage} = electron;

const path = require('path');
const url = require('url');

const icon = nativeImage.createFromPath('./icon.png');

let win

function createWindow () {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: icon
    })

    //win.setMenu(null);

    win.loadURL(url.format({
        pathname: path.join(__dirname, `index.html`),
        protocol: 'file:',
        slashes: true
    }))

}

app.on('ready', () => {
    createWindow();
}); 