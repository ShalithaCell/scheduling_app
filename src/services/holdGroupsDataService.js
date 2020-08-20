// all the hold-group database operations are initialized in here

const { HoldGroups } = require('../models/index'); //import the tag model

// add new tag
global.share.ipcMain.on('hold-group:add', async (event, values) => {
    const group = new HoldGroups({ groupName: values.name }).save(); //save to database
    event.returnValue = true;
});

// get all existing groups list from database
global.share.ipcMain.on('hold-group:get', async (event, values) => {
    const groups = await HoldGroups.findAll({raw: true}); // get the list
    event.returnValue = groups;
});

// get specific group by using id from the database
global.share.ipcMain.on('hold-group:getByName', async (event, values) => {
    const groups = await HoldGroups.findAll({
        where: {
            groupName: values
        },
        raw: true}); // get the specific data
    event.returnValue = groups;
});



// remove tag data from the database
global.share.ipcMain.on('hold-group:remove', async (event, values) => {
    HoldGroups.destroy({
        where: {
            groupName: values
        }
    });
    event.returnValue = true;
});

global.share.ipcMain.on('hold-group:removeAll', async (event, values) => {
    HoldGroups.destroy({
        where: {},
        truncate: true
    });
    event.returnValue = true;
});