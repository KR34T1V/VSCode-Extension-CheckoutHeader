"use strict"
//Required Includes
const path   = require('path');
const vscode = require('vscode');
const moment = require('moment');
const head   = require('./templates');

//Functions
const checkCurrentHeader = () =>{
    console.log('Path: checkActiveHeader');
    var currentHeader = vscode.window.activeTextEditor.document
        .getText(new vscode.Range(0,0,12,100));
    console.log("Header: \n" + currentHeader);
};

const insertNewHeader = () => {
    console.log('Path: insertNewHeader');
    vscode.window.activeTextEditor.edit((editor) => {
        editor.insert(new vscode.Position(0, 0), head.blank.substring(1));
        checkCurrentHeader();
    });

};

const getFileName = () => {
    var activeTextEditor = vscode.window.activeTextEditor;
    var activeDocument   = activeTextEditor.document;

    console.log('Path: getFileName');
    return path.basename(activeDocument.fileName);
};

const getUserName = () => {
    console.log('Path: getUserName');
    return vscode.workspace.getConfiguration('CheckoutHeader.name');
};

const getUserEmail = () => {
    console.log('Path: getUserEmail');
    return vscode.workspace.getConfiguration('CheckoutHeader.email');
};

module.exports = {
    insertNewHeader
};