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

const populateCheckOutHeader = (template, history) => {
    template = template.replace(/(\$FILENAME)(_*)/m, padHeaderInfo(getFileName(), " ", 38));
    template = template.replace(/(\$TimeLastOut)(_*)/m,padHeaderInfo(moment()
        .format('YYYY/MM/DD, hh:mm:ss a'), " ", 35));
    template = template.replace(/(\$LastOutBy)(_*)/m, padHeaderInfo(getUserEmail(), " ", 38));
    return template;
};

const populateCheckInHeader = (template, history) => {
    return template;
};

const populateEmptyHeader = (template) => {
    console.log('Path: populateHeader');
    template = template.replace(/(\$FILENAME)(_*)/, padHeaderInfo(getFileName(), " ", 38));

    template = template.replace(/(\$TimeLastIn)(_*)/,padHeaderInfo("<Never>"," ", 35));
    template = template.replace(/(\$LastInBy)(_*)/, padHeaderInfo("", " ", 35));

    template = template.replace(/(\$TimeLastOut)(_*)/,padHeaderInfo("<Never>"," ", 34))
    template = template.replace(/(\$LastOutBy)(_*)/, padHeaderInfo("", " ", 34));

    return template;
};

const getHistoryFileName = (header) => {
    console.log('Path: getHistoryFileName');
    var file = header.match(/(File: )(.*)(\*)(.*)(\*)/);
    //console.log(file);
    return file[2];
};

const getHistoryFileStatus = (header) => {
    console.log('Path: getHistoryFileStatus');
    var status = header.match(/(\|File Checked\|)(.)(\|)/);
    //console.log(status);
    if (status != null)
        return status[2];
    return null;
};

const getHistoryTimeIn = (header) => {
    console.log('Path: getHistoryTimeIn')
    var lastIn = header.match(/(Last-In: )(.*)(\*)(.*)(\*)/);
    //console.log(lastIn);
    if (lastIn != null)
        return lastIn[2];
    return null;
};

const getHistoryInBy = (header) => {
    console.log('Path: getHistoryInBy');
    var inBy = header.match(/(In By: )(.*)(\*)(.*)(\*)/);
    //console.log(inBy);
    if (inBy != null)
        return inBy[2];
    return null;
};

const getHistoryTimeOut = (header) => {
    console.log("Path: getHistoryTimeOut")
    var lastOut = header.match(/(Last-Out: )(.*)(\*)(.*)(\*)/);
    //console.log(lastOut);
    if (lastOut != null)
        return lastOut[2];
    return null;
};

const getHistoryOutBy = (header) => {
    console.log('Path: getHistoryOutBy');
    var outBy = header.match(/(Out By: )(.*)(\*)(.*)(\*)/);
    //console.log(outBy);
    if (outBy != null)
        return outBy[2];
    return null;
};

const getHeaderHistory = (header) => {
    console.log('Path: getHeaderHistory');
    var history ={};
    history.file = getHistoryFileName(header);
    history.status = getHistoryFileStatus(header);
    history.timeIn = getHistoryTimeIn(header);
    history.inBy = getHistoryInBy(header);
    history.timeOut = getHistoryTimeOut(header);
    history.outBy = getHistoryOutBy(header);
    return history;
};


const insertNewHeader = () => {
    console.log('Path: insertNewHeader');
    console.log("Does Exist: " + headerExists(getCurrentHeader()));
    vscode.window.activeTextEditor.edit((editor) => {
        editor.insert(new vscode.Position(0, 0), populateEmptyHeader(head.blank).substring(1));
    });
};

const checkOutHeader = () => {
    console.log('Path: checkOutHeader');
    console.log(getCurrentHeader());
    console.log("Does Exist: " + headerExists(getCurrentHeader()));
    //console.log(getHeaderHistory(getCurrentHeader()));
};

const checkInHeader = () => {
};

const headerExists = (header) => {
    var exists = getHistoryFileStatus(header);
    if (exists != null)
        return 1;
    return (0);
};

const getCurrentHeader = () =>{
    console.log('Path: getCurrentHeader');
    var currentHeader = vscode.window.activeTextEditor.document
        .getText(new vscode.Range(0,0,10,100));
    return(currentHeader);
};
const getFileName = () => {
    var activeTextEditor = vscode.window.activeTextEditor;
    var activeDocument   = activeTextEditor.document;

    console.log('Path: getFileName');
    return path.basename(activeDocument.fileName);
};

const getUserName = () => {
    console.log('Path: getUserName');
    var name = vscode.workspace.getConfiguration('CheckoutHeader').get('username') ||
        'CheckoutHeader.name not set';
    return name;
};

const getUserEmail = () => {
    console.log('Path: getUserEmail');
    var name = vscode.workspace.getConfiguration('CheckoutHeader').get('email') ||
        'CheckoutHeader.email not set';
    return name;
};

module.exports = {
    insertNewHeader,
    checkOutHeader,
    checkInHeader
};