'use strict';
const electron = require('electron');
const {
    ipcMain
} = electron;


module.exports = {
    print: print
}

function print(content, win) {

    win.webContents.send('on-print', content);

    ipcMain.on('open-print', (event, data) => {

        try {
            win.webContents.print({
                silent: false,
                printBackground: true,
            })
        } catch (error) {
            console.log(error);
        }

    });

}
