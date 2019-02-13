"use strict"
//Required Inputs
const path   = require('path');
const vscode = require('vscode');
const moment = require('moment');
const header = require('./templates');
const ft     = require('./functions');
const lang   = require('./comments');
//Globals
const activeTextEditor = vscode.window.activeTextEditor;
const document = activeTextEditor.document;
const languageId = document.languageId;
var history = {};

const handleHeader = (val) => {
    if(ft.supportHeaderLanguage(languageId)){
        if (val == 0)
            ft.insertNewHeader();
        else if (val == 1)
            ft.checkInHandler();
        else if (val == 2)
            ft.checkOutHandler();
    }
    else {
        vscode.window.showErrorMessage('CheckoutHeaders: Language: "'+languageId+'" Not Supported!');
    };
}

const handlerBlank = () => handleHeader(0);
const handlerCheckIn = () => handleHeader(1);
const handlerCheckOut = () => handleHeader(2);
//Check Language Support
//Get Header
//Check Header
//Get History
//Create New Header
//Replace Header
//Save File
//Sync Server


function activate(context) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	console.log('CheckoutHeader: Now active!');
    
    let blankHeader = vscode.commands.registerCommand('CheckoutHeader.new', handlerBlank);
	let checkInHeader = vscode.commands.registerCommand('CheckoutHeader.in', handlerCheckIn);
	let checkOutHeader = vscode.commands.registerCommand('CheckoutHeader.out', handlerCheckOut);
    
	context.subscriptions.push(blankHeader);
	context.subscriptions.push(checkInHeader);
	context.subscriptions.push(checkOutHeader);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
