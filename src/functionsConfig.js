"use strict"
//Requires
const vscode    = require('vscode');
const path      = require('path');

const getFileName = () => {
    console.log('Path: getFileName');

    var activeTextEditor = vscode.window.activeTextEditor;
    var activeDocument   = activeTextEditor.document;

    return path.basename(activeDocument.fileName);
};

const getUserConfig = (id) => {
    console.log('Path: getUserConfig');

    var file = vscode.workspace.getConfiguration('CheckoutHeader').get(id);
    
    return file;
};

const getUserEmail = () => {
    console.log('Path: getUserEmail');

    var name = getUserConfig('email') || 'CheckSettings';

    return name;
};

const saveFile = () => {
    console.log('Path: saveFile');
    return new Promise((res, rej) =>{

        vscode.window.activeTextEditor.document.save().then((saved) => {
            if (saved){
                console.log("File Saved");
                vscode.window.showInformationMessage("CheckoutHeader: File Saved!");
                res(1);
            }
            else {
                rej("Failed to Save File");
                console.log("Failed to Save File");
                vscode.window.showWarningMessage("CheckoutHeader: File Failed to Save!");
            }
        });
    });
};

const autoSaveDisable = () => {
    console.log('Path: autoSaveDisable');

    console.log(getUserConfig('autoSaveDisable'));
    
    
    if (getUserConfig('autoSaveDisable'))
        vscode.workspace.getConfiguration('files').update('autoSave', "off", false);
}

//export
module.exports = {
    getFileName,
    getUserConfig,
    getUserEmail,
    saveFile,
    autoSaveDisable
}