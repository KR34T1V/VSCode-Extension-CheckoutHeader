"use strict"
//Requires
const vscode    = require('vscode');


const setColors = (safe) => {
    console.log('Path: setColors');
    
    if (safe == 1){
        const neutral = {
            "titleBar.activeBackground": "#33ff00", //green
            "titleBar.activeForeground": "#000000", //black
            "editorCursor.foreground": "#33ff00",
            "menu.selectionBackground": "#33ff00",
            "menu.background": "#092c00"
        }
        vscode.workspace.getConfiguration('workbench').update('colorCustomizations', neutral, false);
    }
    else if (safe == 2) {
        const safeColors = {
            "titleBar.activeBackground": "#ffee00", //yellow
            "titleBar.activeForeground": "#000000", //black
            "editorCursor.foreground": "#ffee00",
            "menu.selectionBackground": "#ffee00",
            "menu.background": "#2c2b00"
        }
        vscode.workspace.getConfiguration('workbench').update('colorCustomizations', safeColors, false);
    }
    else {
        const unsafeColors = {
            "titleBar.activeBackground": "#ff0000", //red
            "titleBar.activeForeground": "#000000", //black
            "editorCursor.foreground": "#ff0000",
            "menu.selectionBackground": "#ff0000",
            "menu.background": "#720000"
        }
        vscode.workspace.getConfiguration('workbench').update('colorCustomizations', unsafeColors, false);
    };
};

const clearColors = () => {
    console.log('Path: clearColors');
    vscode.workspace.getConfiguration('workbench').update('colorCustomizations', {}, false);
};

module.exports = {
    setColors,
    clearColors
};