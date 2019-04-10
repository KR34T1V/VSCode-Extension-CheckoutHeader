#Beta Stage

## Features
Ctrl+Alt+I (Check-In File)
```
/* ********************************************************************************* */
/* * File: functions.js                             *      |File Checked|1|        * */
/* *                                                *                              * */
/* *                                                *      ██╗    ███╗   ██╗       * */
/* * Last-In: 2019/02/14, 09:57:26 pm               *      ██║    ████╗  ██║       * */
/* *   In By: m4dm0nk3y.za@gmail.com                *      ██║    ██╔██╗ ██║       * */
/* *                                                *      ██║    ██║╚██╗██║       * */
/* * Last-Out: 2019/02/14, 09:57:19 pm              *      ██║    ██║ ╚████║       * */
/* *   Out By: m4dm0nk3y.za@gmail.com               *      ╚═╝    ╚═╝  ╚═══╝       * */
/* *                                                *                              * */
/* ********************************************************************************* */
```
Ctrl+Alt+O (CheckOut File)
```
/* ********************************************************************************* */
/* * File: functions.js                             *      |File Checked|2|        * */
/* *                                                *                              * */
/* *                                                *   ██████╗ ██╗   ██╗████████╗ * */
/* * Last-In: 2019/02/14, 09:57:26 pm               *  ██╔═══██╗██║   ██║╚══██╔══╝ * */
/* *   In By: m4dm0nk3y.za@gmail.com                *  ██║   ██║██║   ██║   ██║    * */
/* *                                                *  ██║   ██║██║   ██║   ██║    * */
/* * Last-Out: 2019/02/14, 09:58:23 pm              *  ╚██████╔╝╚██████╔╝   ██║    * */
/* *   Out By: m4dm0nk3y.za@gmail.com               *   ╚═════╝  ╚═════╝    ╚═╝    * */
/* *                                                *                              * */
/* ********************************************************************************* */
```
Checkout Header is a header based file control extension focused on providing the same ability as Dreamweaver on vscode.
Mark files, "Checked In" or "Checked Out", to prevent colaborations from overwriting code.

The extension applies with live changes in mind as to prevent more then one person working on a single file at any given time.

It works locally or with the SFTP extension for live server edits.

SFTP:
https://github.com/liximomo/vscode-sftp.git

### Suggested SFTP Settings
```
{
    "uploadOnSave": false,
    "downloadOnOpen": false,
    "ignore": [
        "**/.vscode/**",
        "**/.git/**",
        "**/.DS_Store"
    ]
}
```
## Extension Settings
This extension contributes the following settings:
```
{
    "CheckoutHeader.email": "m4dm0nk3y.za@gmail.com",
    "CheckoutHeader.enableSFTP": false,
    "CheckoutHeader.enableTitleBarColors": false,
    "CheckoutHeader.autoSaveDisabled": false
}
```
## Known Issues
(None)

## Release Notes

## [1.0]
**1.0.1**

    -Initial release

**1.0.2**

    -Added HTML

**1.0.3**

    -CFML support

**1.0.4**

    -Updated Readme
    
**1.0.5**

    -Cannot check-in if same user did not checkout (Overwrite option available)

## [1.1]

**1.1.0**

    -Realeased colored title bar option
    -Disabled SFTP sync for now (use suggested settings)

**1.1.1**

    -Added an editor context menu to Check-In/Out
    -Improved the way color applied
    -Improved how the header is recognised by extension

**1.1.2**
    -broken version

**1.1.3**
    
    -Fixed "1.1.2" (rollback)
    -Refining the Sync ability 
    -Added "htmlcfml" language compatibility
    -Fixed saving  after override not working

**1.1.4**

    -Fixed Sync not working

**1.1.5**

    -Fixed Disable Autosave not working correctly

**1.1.6**

    -Added Yellow Color to titlebar. safe:(yellow) unsafe:(red) checked-in:(green)
    -SFTP Sync now will only put files that contain a header

**1.1.7**

    -Improved the upload Sync trigger

**1.1.8**

    -Removed Ability to Over Write
    -Fixed Titlebar color not changing when header is not present

**1.1.9**

    -Files are now safe from overwriting

**1.1.10**

    -Colors are Rechecked after Download
    -Files now download befor checkout to ensure they are still checked in

**1.1.11**

    -Added cfc language support

**1.1.12**

    -Added "cfchtml" language support
    -Added "cfmhtml" language support
    -Added "htmlcfml" language support


**1.1.13**

    -Fixed Cold Fusion Language Support
    
**Enjoy!**
