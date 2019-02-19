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

//d
//e
//f
//g


const getUserEmail = () => {
    console.log('Path: getUserEmail');

    var name = getUserConfig('email') || 'CheckSettings';

    return name;
};














//h

//i
//j
//k
//l
//m
//n
//o
//p
//q
//r
//s








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
    getUserConfig,
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