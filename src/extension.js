"use strict"
//Required Inputs
const path   = require('path');
const vscode = require('vscode');
const moment = require('moment');
const header = require('./templates');
const ft     = require('./functions');

function activate(context) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	console.log('CheckoutHeader: Now active!');
    
	let blankHeader = vscode.commands.registerCommand('CheckoutHeader.new', ft.insertNewHeader);
	context.subscriptions.push(blankHeader);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
