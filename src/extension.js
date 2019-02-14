"use strict"
//Required Inputs
const path   = require('path');
const vscode = require('vscode');
const moment = require('moment');
const header = require('./templates');
const ft     = require('./functions');
const lang   = require('./comments');


const handleHeader = (val) => {
    const activeTextEditor = vscode.window.activeTextEditor;
    const document = activeTextEditor.document;
    const languageId = document.languageId;
    console.log("Path: handleHeader");
    console.log("Supported: "+ft.supportHeaderLanguage(languageId));

    if(ft.supportHeaderLanguage(languageId)){
        if (val == 1)
            ft.checkInHandler();
        else if (val == 2)
            ft.checkOutHandler();
    }
    else {
        vscode.window.showErrorMessage('CheckoutHeaders: Language: "'+languageId+'" Not Supported!');
    };
}

const changedConfig = () => {
    if (ft.getHeaderConfig().get('enableSFTP'))
        vscode.workspace.onDidSaveTextDocument(ft.sftpSyncSave);
};

const handlerCheckIn = () => handleHeader(1);
const handlerCheckOut = () => handleHeader(2);

function activate(context) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	console.log('CheckoutHeader: Now active!');
    
	let checkInHeader = vscode.commands.registerCommand('CheckoutHeader.in', handlerCheckIn);
	let checkOutHeader = vscode.commands.registerCommand('CheckoutHeader.out', handlerCheckOut);
    
	context.subscriptions.push(checkInHeader);
    context.subscriptions.push(checkOutHeader);
    vscode.workspace.onDidChangeConfiguration(changedConfig);
    console.log("enableSFTP = "+ft.getHeaderConfig().get('enableSFTP'));
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
