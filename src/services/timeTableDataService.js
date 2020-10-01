// all the timetable database operations are initialized in here

const { TimeTableSlots } = require('../models/index'); //import the tag model

// add new tag
global.share.ipcMain.on('timetable:add', async (event, values) => {
    const data = new TimeTableSlots({ type: values.type, slot: values.slot, day : values.day, period: values.period}).save(); //save to database
    event.returnValue = true;
});

// get all existing tag list from database
global.share.ipcMain.on('timetable:get', async (event, values) => {
    const data = await TimeTableSlots({raw: true}); // get the list
    event.returnValue = data;
});

// get specific tag by using id from the database
global.share.ipcMain.on('timetable:getByType', async (event, values) => {
    const data = await TimeTableSlots.findAll({
        where: {
            type: values
        },
        raw: true}); // get the specific data
    event.returnValue = data;
});

// get specific tag by using id from the database
global.share.ipcMain.on('timetable:getByTypeAndDay', async (event, values) => {
    const data = await TimeTableSlots.findAll({
        where: {
            type: values.type,
            day : values.day,
        },
        raw: true}); // get the specific data
    event.returnValue = data;
});


// remove tag data from the database
global.share.ipcMain.on('timetable:removeAllByTypeAndDay', async (event, values) => {
    TimeTableSlots.destroy({
        where: {
            type: values.type,
            day : values.day
        }
    });
    event.returnValue = true;
});