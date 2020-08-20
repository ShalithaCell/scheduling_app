// all the group database operations are initialized in here

const { SubGroups } = require('../models/index'); //import the tag model

// add new tag
global.share.ipcMain.on('sub-group:add', async (event, values) => {
    const group = new SubGroups({ groupName: values.name, studentCount : values.studentCount}).save(); //save to database
    event.returnValue = true;
});

// get all existing groups list from database
global.share.ipcMain.on('sub-group:get', async (event, values) => {
    const groups = await SubGroups.findAll({raw: true}); // get the list
    event.returnValue = groups;
});

// get specific group by using id from the database
global.share.ipcMain.on('sub-group:getByName', async (event, values) => {
    const groups = await SubGroups.findAll({
        where: {
            groupName: values
        },
        raw: true}); // get the specific data
    event.returnValue = groups;
});

// update existing data by using id
global.share.ipcMain.on('sub-group:update', async (event, values) => {

    await SubGroups.findOne({where: {groupName: values.name}})
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
global.share.ipcMain.on('sub-group:remove', async (event, values) => {
    SubGroups.destroy({
        where: {
            groupName: values
        }
    });
    event.returnValue = true;
});