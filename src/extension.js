"use strict"
//Required
const vscode = require('vscode');


// this method is called when your extension is activated
function activate(context) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	console.log('CheckoutHeader: Now active!');
    
	let checkInHeader = vscode.commands.registerCommand('CheckoutHeader.in', handlerCheckIn);
	let checkOutHeader = vscode.commands.registerCommand('CheckoutHeader.out', handlerCheckOut);
    
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