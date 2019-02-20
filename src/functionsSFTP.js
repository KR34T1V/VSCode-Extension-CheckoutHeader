"use strict"
//Requires
const vscode    = require('vscode');
const f_Config  = require('./functionsConfig');


const sftpSyncGet = () => {
    console.log('Path: sftpSyncGet');
    
    if (f_Config.getUserConfig('CheckoutHeader.enableSFTP')){
        vscode.commands.executeCommand('sftp.download.activeFile').then((success, err) => {
            if (success){
                console.log("CheckoutHeader: SFTP File Synced!");
                vscode.window.showInformationMessage("CheckoutHeader: SFTP File Synced!");
            }
            else if (err){
                console.log("CheckoutHeader: SFTP Failed to Sync File!", err);
                vscode.window.showWarningMessage("CheckoutHeader: SFTP File Failed to Sync!");
            }
        });
    }
};

const sftpSyncSave = () => {
    console.log('Path: sftpSyncSave');

    if (f_Config.getUserConfig('CheckoutHeader.enableSFTP')){
        vscode.commands.executeCommand('sftp.upload.activeFile').then((success, err) => {
            if (success){
                console.log("CheckoutHeader: SFTP File Uploaded!");
                vscode.window.showInformationMessage("CheckoutHeader: SFTP File Uploaded!");
            }
            else if (err){
                console.log("CheckoutHeader: SFTP File Uploaded!", err);
                vscode.window.showWarningMessage("CheckoutHeader: SFTP File Failed to Upload!");
            }
        });
    }
};

//export
module.exports = {
    sftpSyncGet,
    sftpSyncSave
}