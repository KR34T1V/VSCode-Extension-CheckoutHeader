"use strict"
//Required
const vscode                = require('vscode');
const f_ColoredTitleBars    = require('./functionsColoredTitleBars');
const f_Config              = require('./functionsConfig');
const f_Headers             = require('./functionsHeaders');
const f_SFTP                = require('./functionsSFTP');
const t_Headers             = require('./templatesHeaders');


//Functions
const checkIn = () => handlerHeader(1);
const checkOut = () => handlerHeader(2);

const handlerHeader = (select) => {
    console.log(`Path: handlerHeader [select(${select})]`);

    const activeTextEditor = vscode.window.activeTextEditor;
    const document = activeTextEditor.document;
    const languageId = document.languageId;
    
    if (f_Headers.supportHeaderLanguage(languageId)){
        if (select == 1)
            handlerCheckIn();
        else if (select == 2)
            handlerCheckOut();
    }
    else
        vscode.window.showErrorMessage(`CheckoutHeader: Language <${languageId}> Not Supported!`);
};

const handlerCheckIn = () => {
    console.log('Path: handlerCheckIn');
    const activeTextEditor = vscode.window.activeTextEditor;
    const document = activeTextEditor.document;
    const languageId = document.languageId;
    var     header              = f_Headers.getCurrentHeader();

    if (f_Headers.headerExists(header)){
        var history = f_Headers.getHeaderHistory(header);
        var email   = f_Config.getUserEmail();
        
        if (history.status != 1)
            if (history.outBy == email)
                f_Headers.checkInHeader(history);
            else {
                vscode.window.showInformationMessage(
                    `This file is checked-out!\nBy: "${history.outBy}"\n Time: <${history.timeOut}>.`,
                        'Overwrite', 'Cancel').then((selection) => {
                            if (selection == 'Overwrite')
                                f_Headers.checkInHeader(history);
                        });
            }
        else {
            vscode.window.showInformationMessage(`
            This file is already checked-in!\nBy: "${history.inBy}"\nOn: <${history.timeIn}>.`,
            'Overwrite', 'Cancel').then((selection) => {
                f_Headers.checkInHeader(history);
            });
        }
    }
    else {
        activeTextEditor.edit((editor) => {
            editor.insert(new vscode.Position(0, 0), f_Headers.commentHeader(
                f_Headers.populateCheckInHeader(t_Headers.in).substring(1), languageId)+'\n');
        });
    }
};

const handlerCheckOut = () => {

};

// this method is called when your extension is activated
function activate(context) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	console.log('CheckoutHeader: Now active!');
    
	let checkInHeader = vscode.commands.registerCommand('CheckoutHeader.in', checkIn);
	let checkOutHeader = vscode.commands.registerCommand('CheckoutHeader.out', checkOut);
    
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