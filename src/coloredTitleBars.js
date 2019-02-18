const vscode    = require('vscode');
const ft        = require('./functions');
"use strict"

const setColors = (safe) => {
    console.log('Path: setColors');
    if (safe){
        const safeColors = {
            "titleBar.activeBackground": "#33ff00", //green
            "titleBar.activeForeground": "#000000" //black
        }
        vscode.workspace.getConfiguration('workbench').update('colorCustomizations', safeColors, false);
    }
    else {
        const unsafeColors = {
            "titleBar.activeBackground": "#ff0000", //red
            "titleBar.activeForeground": "#000000" //black
        }
        vscode.workspace.getConfiguration('workbench').update('colorCustomizations', unsafeColors, false);
    };
};

module.exports = {
    setColors
};