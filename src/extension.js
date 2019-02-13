"use strict"
//Required Inputs
const path   = require('path');
const vscode = require('vscode');
const moment = require('moment');
const header = require('./templates');
const ft     = require('./functions');
//Globals
var history = {};

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
    
    let blankHeader = vscode.commands.registerCommand('CheckoutHeader.new', ft.insertNewHeader);
	let checkInHeader = vscode.commands.registerCommand('CheckoutHeader.in', ft.checkInHeader);
	let checkOutHeader = vscode.commands.registerCommand('CheckoutHeader.out', ft.checkOutHeader);
    
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
