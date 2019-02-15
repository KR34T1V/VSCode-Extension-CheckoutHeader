const fs        = require('fs');
const vscode    = require('vscode');
"use strict"

const vscodeDir = this.workspaceRoot + '/.vscode';
const workspaceSettings = vscodeDir + '/settings.json';
const settingsJson = JSON.parse(fs.readFileSync(workspaceSettings,'utf8')); //MAKE SURE THIS UPDATES!
const clearEffects = () => {
    console.log('Path: clearEffects');
    //Restore default color settings
    fs.unlinkSync(workspaceSettings)
};

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
