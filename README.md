## Features
Ctrl+Alt+I (Check-In File)
```
*********************************************************************************
* File: $FILENAME_____________________________   *      |File Checked|1|        *
*                                                *                              *
*                                                *      ██╗    ███╗   ██╗       *
* Last-In: $TimeLastIn________________________   *      ██║    ████╗  ██║       *
*   In By: $LastInBy__________________________   *      ██║    ██╔██╗ ██║       *
*                                                *      ██║    ██║╚██╗██║       *
* Last-Out: $TimeLastOut______________________   *      ██║    ██║ ╚████║       *
*   Out By: $LastOutBy________________________   *      ╚═╝    ╚═╝  ╚═══╝       *
*                                                *                              *
*********************************************************************************
```
Ctrl+Alt+O (CheckOut File)
```
*********************************************************************************
* File: $FILENAME_____________________________   *      |File Checked|2|        *
*                                                *                              *
*                                                *   ██████╗ ██╗   ██╗████████╗ *
* Last-In: $TimeLastIn________________________   *  ██╔═══██╗██║   ██║╚══██╔══╝ *
*   In By: $LastInBy__________________________   *  ██║   ██║██║   ██║   ██║    *
*                                                *  ██║   ██║██║   ██║   ██║    *
* Last-Out: $TimeLastOut______________________   *  ╚██████╔╝╚██████╔╝   ██║    *
*   Out By: $LastOutBy________________________   *   ╚═════╝  ╚═════╝    ╚═╝    *
*                                                *                              *
*********************************************************************************
```
Checkout Header is a header based file control extension focused on providing the ability to mark files, "Checked In" or "Checked Out", to prevent colaborations from overwriting code.

The extension applies with live changes in mind as to prevent more then one person working on a single file at any given time.

It works locally or with the SFTP extension for live server edits.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `CheckoutHeader.email`: email@email.com (email to stamp onto header)
* `CheckoutHeader.enableSFTP`: bolean (enables SFTP live sync)

## Known Issues
(none)

## Release Notes

### 1.0.0

Initial release of CheckoutHeader

**Enjoy!**
