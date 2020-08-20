// all the ExtendSubGroupHold database operations are initialized in here

const { ExtendSubGroupHold } = require('../models/index'); //import the tag model

// add new tag
global.share.ipcMain.on('extend-hold-sub-group:add', async (event, values) => {
    const group = new ExtendSubGroupHold({ groupName: values.name }).save(); //save to database
    event.returnValue = true;
});

// get all existing groups list from database
global.share.ipcMain.on('extend-hold-sub-group:get', async (event, values) => {
    const groups = await ExtendSubGroupHold.findAll({raw: true}); // get the list
    event.returnValue = groups;
});

// get specific group by using id from the database
global.share.ipcMain.on('extend-hold-sub-group:getByName', async (event, values) => {
    const groups = await ExtendSubGroupHold.findAll({
        where: {
            groupName: values
        },
        raw: true}); // get the specific data
    event.returnValue = groups;
});

global.share.ipcMain.on('extend-hold-sub-group:removeAll', async (event, values) => {
    ExtendSubGroupHold.destroy({
        where: {},
        truncate: true
    });
    event.returnValue = true;
});



// remove tag data from the database
global.share.ipcMain.on('extend-hold-sub-group:remove', async (event, values) => {
    ExtendSubGroupHold.destroy({
        where: {
            groupName: values
        }
    });
    event.returnValue = true;
});