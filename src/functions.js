"use strict"
//Required Includes
const path   = require('path');
const vscode = require('vscode');
const moment = require('moment');
const head   = require('./templates');
const lang   = require('./comments');

//Functions
const padHeaderInfo = (string, padding, minSize) => {
    console.log("Path: padHeaderInfo");
    while(string.length < minSize){
        string += padding;
    };
    if (string.length > minSize)
        string = string.substring(0, minSize);
    return string;
};

const populateCheckOutHeader = (template, history) => {
    console.log('Path: populateCheckoutHeader');
    template = template.replace(/(\$FILENAME)(_*)/, padHeaderInfo(getFileName(), " ", 38));

    template = template.replace(/(\$TimeLastIn)(_*)/,padHeaderInfo(history.timeIn," ", 35));
    template = template.replace(/(\$LastInBy)(_*)/, padHeaderInfo(history.inBy, " ", 35));

    template = template.replace(/(\$TimeLastOut)(_*)/,padHeaderInfo(moment()
        .format('YYYY/MM/DD, hh:mm:ss a'), " ", 34));
    template = template.replace(/(\$LastOutBy)(_*)/, padHeaderInfo(getUserEmail(), " ", 34));
    return template;
};

const populateCheckInHeader = (template, history) => {
    console.log('Path: populateCheckoutHeader');
    template = template.replace(/(\$FILENAME)(_*)/, padHeaderInfo(getFileName(), " ", 38));

    template = template.replace(/(\$TimeLastIn)(_*)/,padHeaderInfo(moment()
    .format('YYYY/MM/DD, hh:mm:ss a'), " ", 35));
    template = template.replace(/(\$LastInBy)(_*)/, padHeaderInfo(getUserEmail(), " ", 35));
    
    template = template.replace(/(\$TimeLastOut)(_*)/,padHeaderInfo(history.timeOut," ", 34));
    template = template.replace(/(\$LastOutBy)(_*)/, padHeaderInfo(history.outBy, " ", 34));
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

const commentHeader = (template, languageId) => {
    console.log('Path: commentHeader');
    const [start, stop] = lang.demiliters[languageId]
    const width = start.length
  
    template = template.replace(new RegExp(`^(.*)`, 'gm'),
      start + '$1' + stop);
    template += '\n';
    return template;
  }

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
    var lastIn = header.match(/(Last-In: )(.{38})/);
    //console.log(lastIn);
    if (lastIn != null)
        return lastIn[2];
    return null;
};

const getHistoryInBy = (header) => {
    console.log('Path: getHistoryInBy');
    var inBy = header.match(/(In By: )(.{38})/);
    //console.log(inBy);
    if (inBy != null)
        return inBy[2];
    return null;
};

const getHistoryTimeOut = (header) => {
    console.log("Path: getHistoryTimeOut")
    var lastOut = header.match(/(Last-Out: )(.{37})/);
    //console.log(lastOut);
    if (lastOut != null)
        return lastOut[2];
    return null;
};

const getHistoryOutBy = (header) => {
    console.log('Path: getHistoryOutBy');
    var outBy = header.match(/(Out By: )(.{37})/);
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
    var languageId = vscode.window.activeTextEditor.document.languageId;
    vscode.window.activeTextEditor.edit((editor) => {
        editor.insert(new vscode.Position(0, 0), commentHeader(populateEmptyHeader(head.blank).substring(1), languageId));
    });
};

const checkOutHeader = () => {
    console.log('Path: checkOutHeader');
    var header = getCurrentHeader();
    
    if (headerExists(header)){
        //Check Perms and replace data
        var languageId = vscode.window.activeTextEditor.document.languageId;
        var history = getHeaderHistory(header);

        if (history.status != 2){
            //edit and replace header
            vscode.window.activeTextEditor.edit((editor) => {
            editor.insert(new vscode.Position(0, 0), commentHeader(
                populateCheckOutHeader(head.out, history).substring(1),languageId));
            });
        }
        else{
            //do error
            vscode.window.
                showInformationMessage('This File Is already Checked out\nby: "' 
                    + history.outBy + '"\non: < ' + history.timeOut +'>', 'Override', 'Cancel')
                    .then(value => {
                        console.log(value +' Was Selected!');
                        //Save and sync
                        //or do nothing
                    });
        };
    }
    else {
        insertNewHeader();
    }
};

const checkInHeader = () => {
    console.log('Path: checkInHeader');
    var languageId = vscode.window.activeTextEditor.document.languageId;
    var header = getCurrentHeader();
    
    if (headerExists(header)){
        //Check Perms and replace data
        var history = getHeaderHistory(header);

        if (history.status != 1){
            //edit and replace header
            vscode.window.activeTextEditor.edit((editor) => {
            editor.insert(new vscode.Position(0, 0), commentHeader(
                populateCheckInHeader(head.in, history).substring(1), languageId));
            });
        }
        else{
            //do error
            vscode.window.
                showInformationMessage('This File Is already Checked In\nby: "' 
                    + history.inBy + '"\non: < ' + history.timeIn +'>', 'Override', 'Cancel');
        };
    }
    else {
        insertNewHeader();
    }
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

const getHeaderConfig = () => {
    console.log('Path: getUserName');
    var file = vscode.workspace.getConfiguration('CheckoutHeader');
    return file;
};

const getUserEmail = () => {
    console.log('Path: getUserEmail');
    var name = getHeaderConfig().get('email') ||
        'CheckoutHeader.email not set';
    return name;
};

module.exports = {
    insertNewHeader,
    checkOutHeader,
    checkInHeader
};