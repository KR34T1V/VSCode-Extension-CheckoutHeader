"use strict"
//Requires
const vscode        = require('vscode');
const moment        = require('moment');
const t_headers     = require('./templatesHeaders');
const t_delimiters  = require('./templatesDelimiters');
const f_config      = require('./functionsConfig');

//Functions

const checkOutHeader = (history) => {
    console.log("Path: checkOutHeader");

    const activeTextEditor = vscode.window.activeTextEditor;
    const document = activeTextEditor.document;
    const languageId = document.languageId;

    activeTextEditor.edit((editor) => {
        editor.replace(new vscode.Range(0,0,10,100), commentHeader(
            populateCheckOutHeader(t_headers.out, history).substring(1), languageId));
    });
};

const checkInHeader = (history) => {
    console.log("Path: checkInHeader");

    const activeTextEditor = vscode.window.activeTextEditor;
    const document = activeTextEditor.document;
    const languageId = document.languageId;
    
    activeTextEditor.edit((editor) => {
        editor.replace(new vscode.Range(0,0,10,100), commentHeader(
            populateCheckInHeader(t_headers.in, history).substring(1), languageId));
    });
};

const commentHeader = (template, languageId) => {
    console.log('Path: commentHeader');

    const [start, stop] = t_delimiters.demiliters[languageId]
  
    template = template.replace(new RegExp(`^(.*)`, 'gm'),
      start + '$1' + stop);
    return template;
};

const getCurrentHeader = () =>{
    console.log('Path: getCurrentHeader');

    var currentHeader = vscode.window.activeTextEditor.document
        .getText(new vscode.Range(0,0,10,100));

    return(currentHeader);
};

const getHistoryFileName = (header) => {
    console.log('Path: getHistoryFileName');

    var file = header.match(/(File: )(.*)(\*)(.*)(\*)/);

    return file[2].trim();
};

const getHistoryFileStatus = (header) => {
    console.log('Path: getHistoryFileStatus');

    var status = header.match(/(\|File Checked\|)(.)(\|)/);

    if (status != null)
        return status[2].trim();
    return null;
};

const getHistoryTimeIn = (header) => {
    console.log('Path: getHistoryTimeIn');

    var lastIn = header.match(/(Last-In: )(.{38})/);

    if (lastIn != null)
        return lastIn[2].trim();
    return null;
};

const getHistoryInBy = (header) => {
    console.log('Path: getHistoryInBy');
    
    var inBy = header.match(/(In By: )(.{38})/);

    if (inBy != null)
        return inBy[2].trim();
    return null;
};

const getHistoryTimeOut = (header) => {
    console.log("Path: getHistoryTimeOut")

    var lastOut = header.match(/(Last-Out: )(.{37})/);

    if (lastOut != null)
        return lastOut[2].trim();
    return null;
};

const getHistoryOutBy = (header) => {
    console.log('Path: getHistoryOutBy');

    var outBy = header.match(/(Out By: )(.{37})/);

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

const headerExists = (header) => {
    console.log('Path: headerExists');

    var exists = header.match(new RegExp(
                                            ['(\\*{81})(.*)',
                                            '(\\*\\sFile:.{42}\\*.{6}\\|File Checked\\|.\\|.{8}\\*)',
                                            '(.*)(\\*\\s{48}\\*.{30}\\*)(.*)',
                                            '(\\*\\s{48}\\*.{30}\\*)(.*)',
                                            '(\\*\\sLast-In:\\s.{38}\\*.{30}\\*)(.*)',
                                            '(\\*\\s{3}In By:.{39}\\*.{30}\\*)(.*)',
                                            '(\\*\\s{48}\\*.{30}\\*)(.*)',
                                            '(\\*\\sLast-Out:.{38}\\*.{30}\\*)(.*)',
                                            '(\\*\\s{3}Out By:.{38}\\*.{30}\\*)(.*)',
                                            '(\\*\\s{48}\\*\\s{30}\\*)(.*)(\\*{81})'
                                            ].join(''), 's'
                                        )
                                );
    
    if (exists != null)
        return 1;
    return (0);
};

const padHeaderInfo = (string, padding, minSize) => {
    console.log("Path: padHeaderInfo");

    while(string.length < minSize){
        string += padding;
    };
    if (string.length > minSize)
        string = string.substring(0, minSize);
    return string;
};

const populateCheckInHeader = (template, history) => {
    console.log('Path: populateCheckoutHeader');

    template = template.replace(/(\$FILENAME)(_*)/, padHeaderInfo(f_config.getFileName(), " ", 38));

    template = template.replace(/(\$TimeLastIn)(_*)/,padHeaderInfo(moment()
    .format('YYYY/MM/DD, hh:mm:ss a'), " ", 35));
    template = template.replace(/(\$LastInBy)(_*)/, padHeaderInfo(f_config.getUserEmail(), " ", 35));
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

const populateCheckOutHeader = (template, history) => {
    console.log('Path: populateCheckoutHeader');

    template = template.replace(/(\$FILENAME)(_*)/, padHeaderInfo(f_config.getFileName(), " ", 38));
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
    template = template.replace(/(\$LastOutBy)(_*)/, padHeaderInfo(f_config.getUserEmail(), " ", 34));
    return template;
};

const supportHeaderLanguage = (languageId) => {
    console.log('Path: supportHeaderLanguage');
    return languageId in t_delimiters.demiliters;
};

//export
module.exports = {
    checkOutHeader,
    checkInHeader,
    commentHeader,
    getCurrentHeader,
    getHistoryFileName,
    getHistoryFileStatus,
    getHistoryTimeIn,
    getHistoryInBy,
    getHistoryTimeOut,
    getHistoryOutBy,
    getHeaderHistory,
    headerExists,
    padHeaderInfo,
    populateCheckInHeader,
    populateCheckOutHeader,
    supportHeaderLanguage
}