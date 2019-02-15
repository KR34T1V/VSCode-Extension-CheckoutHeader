/* ********************************************************************************* */
/* * File: functions.js                             *      |File Checked|2|        * */
/* *                                                *                              * */
/* *                                                *   ██████╗ ██╗   ██╗████████╗ * */
/* * Last-In: 2019/02/14, 10:01:56 pm               *  ██╔═══██╗██║   ██║╚══██╔══╝ * */
/* *   In By: m4dm0nk3y.za@gmail.com                *  ██║   ██║██║   ██║   ██║    * */
/* *                                                *  ██║   ██║██║   ██║   ██║    * */
/* * Last-Out: 2019/02/14, 10:01:56 pm              *  ╚██████╔╝╚██████╔╝   ██║    * */
/* *   Out By: m4dm0nk3y.za@gmail.com               *   ╚═════╝  ╚═════╝    ╚═╝    * */
/* *                                                *                              * */
/* ********************************************************************************* */
"use strict"
//Required Includes
const path   = require('path');
const vscode = require('vscode');
const moment = require('moment');
const head   = require('./templates');
const lang   = require('./comments');

//Functions
//a
//b
//c
const checkOutHeader = (history) => {
    const activeTextEditor = vscode.window.activeTextEditor;
    const document = activeTextEditor.document;
    const languageId = document.languageId;
    console.log("Path: checkOutHeader");

    activeTextEditor.edit((editor) => {
        editor.replace(new vscode.Range(0,0,10,100), commentHeader(
            populateCheckOutHeader(head.out, history).substring(1), languageId));
    }).then(()=>{
        saveFile();
    });
};

const checkOutHandler = () => {
    const activeTextEditor = vscode.window.activeTextEditor;
    const document = activeTextEditor.document;
    const languageId = document.languageId;
    console.log('Path: checkOutHandler');

    var header = getCurrentHeader();
        
    if (headerExists(header)){
        var history = getHeaderHistory(header);

        if (history.status != 2){
                checkOutHeader(history);
        }
        else {
            vscode.window
                .showInformationMessage('This File Is already Checked Out\nby: "' 
                    + history.outBy + '"\non: < ' + history.timeOut +'>', 'Override', 'Cancel')
                    .then((select) => {
                        if (select == 'Override')
                            checkOutHeader(history);
                    });
        }
    }
    else {
        activeTextEditor.edit((editor) => {
            editor.insert(new vscode.Position(0,0), commentHeader(
                populateCheckOutHeader(head.out).substring(1), languageId) +'\n');
        }).then(()=>{
            saveFile();
        });
    }
};

const checkInHeader = (history) => {
    const activeTextEditor = vscode.window.activeTextEditor;
    const document = activeTextEditor.document;
    const languageId = document.languageId;
    console.log("Path: checkInHeader");
    
    activeTextEditor.edit((editor) => {
        editor.replace(new vscode.Range(0,0,10,100), commentHeader(
            populateCheckInHeader(head.in, history).substring(1), languageId));
    }).then(()=>{
        saveFile();
    });
};

const checkInHandler = () => {
    const activeTextEditor = vscode.window.activeTextEditor;
    const document = activeTextEditor.document;
    const languageId = document.languageId;
    console.log('Path: checkInHandler');

    var header = getCurrentHeader();
        
    if (headerExists(header)){
        var history = getHeaderHistory(header);

        if (history.status != 1){
            if (history.outBy == getUserEmail())
                checkInHeader(history);
            else {
                vscode.window
                .showInformationMessage('This File Was Checked Out\nby: "' 
                    + history.outBy + '"\non: < ' + history.timeOut +'>', 'Override', 'Cancel')
                    .then((select) => {
                        if (select == 'Override')
                            checkInHeader(history);
                    });
            }
        }
        else {
            vscode.window
                .showInformationMessage('This File Is already Checked In\nby: "' 
                    + history.inBy + '"\non: < ' + history.timeIn +'>', 'Override', 'Cancel')
                    .then((select) => {
                        if (select == 'Override')
                            checkInHeader(history);
                    });
        }
    }
    else {
        activeTextEditor.edit((editor) => {
            editor.insert(new vscode.Position(0,0), commentHeader(
                populateCheckInHeader(head.in).substring(1), languageId) +'\n');
        }).then(()=>{
            saveFile();
        });
    }
};

const commentHeader = (template, languageId) => {
    console.log('Path: commentHeader');
    const [start, stop] = lang.demiliters[languageId]
    const width = start.length
  
    template = template.replace(new RegExp(`^(.*)`, 'gm'),
      start + '$1' + stop);
    //template += '\n';
    return template;
};
//d
//e
//f
//g
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
    console.log('Path: getHeaderConfig');
    var file = vscode.workspace.getConfiguration('CheckoutHeader');
    return file;
};

const getUserEmail = () => {
    console.log('Path: getUserEmail');
    var name = getHeaderConfig().get('email') ||
        'CheckSettings';
    return name;
};

const getHistoryFileName = (header) => {
    console.log('Path: getHistoryFileName');
    var file = header.match(/(File: )(.*)(\*)(.*)(\*)/);
    //console.log(file);
    return file[2].trim();
};

const getHistoryFileStatus = (header) => {
    console.log('Path: getHistoryFileStatus');
    var status = header.match(/(\|File Checked\|)(.)(\|)/);
    //console.log(status);
    if (status != null)
        return status[2].trim();
    return null;
};

const getHistoryTimeIn = (header) => {
    console.log('Path: getHistoryTimeIn')
    var lastIn = header.match(/(Last-In: )(.{38})/);
    //console.log(lastIn);
    if (lastIn != null)
        return lastIn[2].trim();
    return null;
};

const getHistoryInBy = (header) => {
    console.log('Path: getHistoryInBy');
    var inBy = header.match(/(In By: )(.{38})/);
    //console.log(inBy);
    if (inBy != null)
        return inBy[2].trim();
    return null;
};

const getHistoryTimeOut = (header) => {
    console.log("Path: getHistoryTimeOut")
    var lastOut = header.match(/(Last-Out: )(.{37})/);
    //console.log(lastOut);
    if (lastOut != null)
        return lastOut[2].trim();
    return null;
};

const getHistoryOutBy = (header) => {
    console.log('Path: getHistoryOutBy');
    var outBy = header.match(/(Out By: )(.{37})/);
    //console.log(outBy);
    if (outBy != null)
        return outBy[2].trim();
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
//h
const headerExists = (header) => {
    var exists = getHistoryFileStatus(header);
    if (exists != null)
        return 1;
    return (0);
};
//i
//j
//k
//l
//m
//n
//o
//p
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
    if (history && history.timeIn.length > 0 && history.inBy.length > 0){
        template = template.replace(/(\$TimeLastIn)(_*)/,padHeaderInfo(history.timeIn," ", 35));
        template = template.replace(/(\$LastInBy)(_*)/, padHeaderInfo(history.inBy, " ", 35));
    }
    else {
        template = template.replace(/(\$TimeLastIn)(_*)/,padHeaderInfo("<Never>"," ", 35));
        template = template.replace(/(\$LastInBy)(_*)/, padHeaderInfo("", " ", 35));
    }
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
    if (history && history.timeOut.length > 0 && history.outBy.length > 0) {
        template = template.replace(/(\$TimeLastOut)(_*)/,padHeaderInfo(history.timeOut," ", 34));
        template = template.replace(/(\$LastOutBy)(_*)/, padHeaderInfo(history.outBy, " ", 34));
    }
    else {
        template = template.replace(/(\$TimeLastOut)(_*)/,padHeaderInfo("<Never>"," ", 34));
        template = template.replace(/(\$LastOutBy)(_*)/, padHeaderInfo("", " ", 34));
    }
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

//q
//r
//s
const saveFile = () => {
    vscode.window.activeTextEditor.document.save().then((saved) => {
        if (saved){
            console.log("File Saved");
            vscode.window.showInformationMessage("CheckoutHeader: File Saved!");
        }
        else {
            vscode.window.showWarningMessage("CheckoutHeader: File Failed to Save!");
        }
    });
};

const sftpSyncGet = () => {
    vscode.commands.executeCommand('sftp.download.activeFile').then((success) => {
        if (success){
            console.log("CheckoutHeader: SFTP File Synced!");
            vscode.window.showInformationMessage("CheckoutHeader: SFTP File Synced!");
        }
        else
        vscode.window.showWarningMessage("CheckoutHeader: SFTP File Failed to Sync!");
    });
};

const sftpSyncSave = () => {
    vscode.commands.executeCommand('sftp.upload.activeFile').then((success) => {
        if (success){
            console.log("CheckoutHeader: SFTP File Uploaded!");
            vscode.window.showInformationMessage("CheckoutHeader: SFTP File Uploaded!");
        }
        else
            vscode.window.showWarningMessage("CheckoutHeader: SFTP File Failed to Upload!");
    });
};

const supportHeaderLanguage = (languageId) => {
    console.log('Path: supportHeaderLanguage');
    return languageId in lang.demiliters;
};
//t
//v
//w
//x
//y
//z

module.exports = {
    checkOutHeader,
    checkOutHandler,
    checkInHeader,
    checkInHandler,
    commentHeader,
    getCurrentHeader,
    getFileName,
    getHeaderConfig,
    getUserEmail,
    getHistoryFileName,
    getHistoryFileStatus,
    getHistoryTimeIn,
    getHistoryInBy,
    getHistoryTimeOut,
    getHistoryOutBy,
    getHeaderHistory,
    headerExists,
    padHeaderInfo,
    populateCheckOutHeader,
    populateCheckInHeader,
    populateEmptyHeader,
    supportHeaderLanguage,
    sftpSyncGet,
    sftpSyncSave
};