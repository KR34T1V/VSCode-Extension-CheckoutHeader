"use_strict"
//Templates

var t_blank = `
*********************************************************************************
* File:$FILENAME______________________________   *      |File Checked|0|        *
*   By: $AUTHOR_______________________________   *                              *
*                                                *                              *
* Last-In: $TimeLastIn________________________   *                              *
*   By: $LastInBy_____________________________   *                              *
*                                                *                              *
* Last-Out: $TimeLastOut______________________   *                              *
*   By: $LastOutBy____________________________   *                              *
*                                                *                              *
*********************************************************************************\n\n\n`;


var t_in =`
*********************************************************************************
* File:$FILENAME______________________________   *      |File Checked|1|        *
*   By: $AUTHOR_______________________________   *                              *
*                                                *      ██╗    ███╗   ██╗       *
* Last-In: $TimeLastIn________________________   *      ██║    ████╗  ██║       *
*   By: $LastInBy_____________________________   *      ██║    ██╔██╗ ██║       *
*                                                *      ██║    ██║╚██╗██║       *
* Last-Out: $TimeLastOut______________________   *      ██║    ██║ ╚████║       *
*   By: $LastOutBy____________________________   *      ╚═╝    ╚═╝  ╚═══╝       *
*                                                *                              *
*********************************************************************************\n\n\n`;


var t_out = `
*********************************************************************************
* File:$FILENAME______________________________   *      |File Checked|2|        *
*   By: $AUTHOR_______________________________   *                              *
*                                                *   ██████╗ ██╗   ██╗████████╗ *
* Last-In: $TimeLastIn________________________   *  ██╔═══██╗██║   ██║╚══██╔══╝ *
*   By: $LastInBy_____________________________   *  ██║   ██║██║   ██║   ██║    *
*                                                *  ██║   ██║██║   ██║   ██║    *
* Last-Out: $TimeLastOut______________________   *  ╚██████╔╝╚██████╔╝   ██║    *
*   By: $LastOutBy____________________________   *   ╚═════╝  ╚═════╝    ╚═╝    *
*                                                *                              *
*********************************************************************************\n\n\n`;

//Template Export List
module.exports = {
    blank:  t_blank,
    in:     t_in,
    out:    t_out
};


/*

*********************************************************************************
* File:$FILENAME______________________________   *      |File Checked|0|        *
* By: $AUTHOR_________________________________   *                              *
*                                                *                              *
* Created: $CREATEDAT_________________________   *                              *
*   by: $CREATEDBY__________________________     *                              *
*                                                *                              *
* Updated: $UPDATEDAT_________________________   *                              *
*   by $UPDATEDBY___________________________     *                              *
*                                                *                              *
*********************************************************************************


*********************************************************************************
* File:$FILENAME______________________________   *      |File Checked|1|        *
* By: $AUTHOR_________________________________   *                              *
*                                                *      ██╗    ███╗   ██╗       *
* Created: $CREATEDAT_________________________   *      ██║    ████╗  ██║       *
*   by: $CREATEDBY__________________________     *      ██║    ██╔██╗ ██║       *
*                                                *      ██║    ██║╚██╗██║       *
* Updated: $UPDATEDAT_________________________   *      ██║    ██║ ╚████║       *
*   by $UPDATEDBY___________________________     *      ╚═╝    ╚═╝  ╚═══╝       *
*                                                *                              *
*********************************************************************************


*********************************************************************************
* File:$FILENAME______________________________   *      |File Checked|2|        *
* By: $AUTHOR_________________________________   *                              *
*                                                *   ██████╗ ██╗   ██╗████████╗ *
* Created: $CREATEDAT_________________________   *  ██╔═══██╗██║   ██║╚══██╔══╝ *
*   by: $CREATEDBY__________________________     *  ██║   ██║██║   ██║   ██║    *
*                                                *  ██║   ██║██║   ██║   ██║    *
* Updated: $UPDATEDAT_________________________   *  ╚██████╔╝╚██████╔╝   ██║    *
*   by $UPDATEDBY___________________________     *   ╚═════╝  ╚═════╝    ╚═╝    *
*                                                *                              *
*********************************************************************************

██╗███╗   ██╗    ██╗   ██╗███████╗███████╗
██║████╗  ██║    ██║   ██║██╔════╝██╔════╝
██║██╔██╗ ██║    ██║   ██║███████╗█████╗  
██║██║╚██╗██║    ██║   ██║╚════██║██╔══╝  
██║██║ ╚████║    ╚██████╔╝███████║███████╗
╚═╝╚═╝  ╚═══╝     ╚═════╝ ╚══════╝╚══════╝
                                          
 ██████╗ ██████╗ ███████╗███╗   ██╗
██╔═══██╗██╔══██╗██╔════╝████╗  ██║
██║   ██║██████╔╝█████╗  ██╔██╗ ██║
██║   ██║██╔═══╝ ██╔══╝  ██║╚██╗██║
╚██████╔╝██║     ███████╗██║ ╚████║
 ╚═════╝ ╚═╝     ╚══════╝╚═╝  ╚═══╝
 
 ██████╗██╗      ██████╗ ███████╗███████╗██████╗ 
██╔════╝██║     ██╔═══██╗██╔════╝██╔════╝██╔══██╗
██║     ██║     ██║   ██║███████╗█████╗  ██║  ██║
██║     ██║     ██║   ██║╚════██║██╔══╝  ██║  ██║
╚██████╗███████╗╚██████╔╝███████║███████╗██████╔╝
 ╚═════╝╚══════╝ ╚═════╝ ╚══════╝╚══════╝╚═════╝ 
                                                
██╗      ██████╗  ██████╗██╗  ██╗███████╗██████╗ 
██║     ██╔═══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗
██║     ██║   ██║██║     █████╔╝ █████╗  ██║  ██║
██║     ██║   ██║██║     ██╔═██╗ ██╔══╝  ██║  ██║
███████╗╚██████╔╝╚██████╗██║  ██╗███████╗██████╔╝
╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝╚══════╝╚═════╝ 
                                                 
██╗    ███╗   ██╗
██║    ████╗  ██║
██║    ██╔██╗ ██║
██║    ██║╚██╗██║
██║    ██║ ╚████║
╚═╝    ╚═╝  ╚═══╝
                 
 ██████╗ ██╗   ██╗████████╗
██╔═══██╗██║   ██║╚══██╔══╝
██║   ██║██║   ██║   ██║   
██║   ██║██║   ██║   ██║   
╚██████╔╝╚██████╔╝   ██║   
 ╚═════╝  ╚═════╝    ╚═╝   
                           
*/