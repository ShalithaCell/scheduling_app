// all the ExtendSubGroup database operations are initialized in here

const { ExtendSubGroup } = require('../models/index'); //import the tag model

// add new tag
global.share.ipcMain.on('extend-sub-group:add', async (event, values) => {
    const group = new ExtendSubGroup({ groupName: values.name, studentCount : values.studentCount}).save(); //save to database
    event.returnValue = true;
});

// get all existing groups list from database
global.share.ipcMain.on('extend-sub-group:get', async (event, values) => {
    const groups = await ExtendSubGroup.findAll({raw: true}); // get the list
    event.returnValue = groups;
});

// get specific group by using id from the database
global.share.ipcMain.on('extend-sub-group:getByName', async (event, values) => {
    const groups = await ExtendSubGroup.findAll({
        where: {
            groupName: values
        },
        raw: true}); // get the specific data
    event.returnValue = groups;
});

// update existing data by using id
global.share.ipcMain.on('extend-sub-group:update', async (event, values) => {

    await ExtendSubGroup.findOne({where: {groupName: values.name}})
        .then( group => {
            // Check if record exists in db
            group.update({studentCount: values.studentCount }).then( updatedRecord => {
                console.log(`updated record ${JSON.stringify(updatedRecord,null,2)}`)
                // login into your DB and confirm update
            })
        });
    event.returnValue = true;
});


// remove tag data from the database
global.share.ipcMain.on('extend-sub-group:remove', async (event, values) => {
    ExtendSubGroup.destroy({
        where: {
            groupName: values
        }
    });
    event.returnValue = true;
});