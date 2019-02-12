"use strict"
//Required Includes
const path   = require('path');
const vscode = require('vscode');
const moment = require('moment');
const head   = require('./templates');

//Functions
const padHeaderInfo = (string, padding, minSize) => {
    console.log("Path: padHeaderInfo");
    while(string.length < minSize){
        string += padding;
    };
    return string;
};

const populateCheckOutHeader = (template) => {
    template = template.replace(/(\$FILENAME)(_*)/m, padHeaderInfo(getFileName(), " ", 38));
    template = template.replace(/(\$TimeLastOut)(_*)/m,padHeaderInfo(moment()
        .format('YYYY/MM/DD, hh:mm:ssa'), " ", 35));
    template = template.replace(/(\$LastOutBy)(_*)/m, padHeaderInfo(getUserName(), " ", 38));
    return template;
};

const populateCheckInHeader = (template) => {
    template = template.replace(/(\$FILENAME)(_*)/m, padHeaderInfo(getFileName(), " ", 38));
    template = template.replace(/(\$TimeLastIn)(_*)/m,padHeaderInfo(moment()
        .format('YYYY/MM/DD, hh:mm:ssa'), " ", 35));
    template = template.replace(/(\$LastInBy)(_*)/m, padHeaderInfo(getUserName(), " ", 38));
    return template;
};

const populateEmptyHeader = (template) => {
    console.log('Path: populateHeader');
    template = template.replace(/(\$FILENAME)(_*)/m, padHeaderInfo(getFileName(), " ", 38));
    template = template.replace(/(\$AUTHOR)(_*)/m, padHeaderInfo(getUserName(), " ", 38));
    return template;
};

const getCurrentHeader = () =>{
    console.log('Path: checkActiveHeader');
    var currentHeader = vscode.window.activeTextEditor.document
        .getText(new vscode.Range(0,0,10,100));
    console.log("Header: \n" + currentHeader);
    console.log(currentHeader.match(/^(.*)(File:)(.*)(\*)$/m));
};

const insertNewHeader = () => {
    console.log('Path: insertNewHeader');
    vscode.window.activeTextEditor.edit((editor) => {
        editor.insert(new vscode.Position(0, 0), populateEmptyHeader(head.blank).substring(1));
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
    return vscode.workspace.getConfiguration('CheckoutHeader').get('username');
};

const getUserEmail = () => {
    console.log('Path: getUserEmail');
    return vscode.workspace.getConfiguration('CheckoutHeader').get('email');
};

module.exports = {
    insertNewHeader
};