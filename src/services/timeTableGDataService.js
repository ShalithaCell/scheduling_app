const { TimeTableG } = require('../models/index'); //import the tag model

// add new tag
global.share.ipcMain.on('timeTableG:add', async (event, values) => {
    const timeTable = new TimeTableG({ ...values}).save(); //save to database
    event.returnValue = true;
});

global.share.ipcMain.on('timeTableG:get', async (event, values) => {
    const timeTableData = await TimeTableG.findAll({raw: true}); // get the list
    event.returnValue = timeTableData;
});

global.share.ipcMain.on('timeTableG:remove', async (event, values) => {
    TimeTableG.destroy();
    event.returnValue = true;
});