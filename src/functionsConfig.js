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

    vscode.window.activeTextEditor.document.save().then((saved) => {
        if (saved){
            console.log("File Saved");
            vscode.window.showInformationMessage("CheckoutHeader: File Saved!");
        }
        else {
            console.log("Failed to Save File");
            vscode.window.showWarningMessage("CheckoutHeader: File Failed to Save!");
        }
    });
};

//export
module.exports = {
    getFileName,
    getUserConfig,
    getUserEmail,
    saveFile
}