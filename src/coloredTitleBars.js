const vscode    = require('vscode');
const ft        = require('./functions');
"use strict"

const handleColors = () => {
    console.log('Path: handleColors');
    var header  = ft.getCurrentHeader();
    var history = ft.getHeaderHistory();
    var email   = ft.getUserEmail();

    if (ft.getHeaderConfig().get('enableTitleBarColors')){
        if (history.status == 2 && history.outBy == email)
            setColors(1);
        else 
            setColors(0);
    }
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

module.exports = {
    handleColors
};