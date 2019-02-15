## Features
Ctrl+Alt+I (Check-In File)
```
/* ********************************************************************************* */
/* * File: functions.js                             *      |File Checked|1|        * */
/* *                                                *                              * */
/* *                                                *      ██╗    ███╗   ██╗       * */
/* * Last-In: 2019/02/14, 09:57:26 pm               *      ██║    ████╗  ██║       * */
/* *   In By: m4dm0nk3y                             *      ██║    ██╔██╗ ██║       * */
/* *                                                *      ██║    ██║╚██╗██║       * */
/* * Last-Out: 2019/02/14, 09:57:19 pm              *      ██║    ██║ ╚████║       * */
/* *   Out By: m4dm0nk3y                            *      ╚═╝    ╚═╝  ╚═══╝       * */
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
/* *   In By: m4dm0nk3y                             *  ██║   ██║██║   ██║   ██║    * */
/* *                                                *  ██║   ██║██║   ██║   ██║    * */
/* * Last-Out: 2019/02/14, 09:58:23 pm              *  ╚██████╔╝╚██████╔╝   ██║    * */
/* *   Out By: m4dm0nk3y                            *   ╚═════╝  ╚═════╝    ╚═╝    * */
/* *                                                *                              * */
/* ********************************************************************************* */
```
Checkout Header is a header based file control extension focused on providing the same ability as Dreamweaver on vscode.
Mark files, "Checked In" or "Checked Out", to prevent colaborations from overwriting code.

The extension applies with live changes in mind as to prevent more then one person working on a single file at any given time.

It works locally or with the SFTP extension for live server edits.

SFTP:
https://github.com/liximomo/vscode-sftp.git

## Extension Settings
### Suggested SFTP Settings
```
{
    "uploadOnSave": false,
    "downloadOnOpen": true,
    "ignore": [
        "**/.vscode/**",
        "**/.git/**",
        "**/.DS_Store"
    ]
}
```
This extension contributes the following settings:

* `CheckoutHeader.email`: email@email.com (email to stamp onto header)
* `CheckoutHeader.enableSFTP`: bolean (enables SFTP live sync)

## Known Issues
(none)

## Release Notes

## [1.0.0]
###1.0.1
    -Initial release
###1.0.2
    -Added HTML
###1.0.3
    -CFML support
###1.0.4
    -Updated Readme
###1.0.5
    -Cannot check-in if same user did not checkout (Override Option Available)

**Enjoy!**
