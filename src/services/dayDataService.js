// all the days database operations are initialized in here

const { Days } = require('../models/index'); //import the tag model

// add new day
global.share.ipcMain.on('day:add', async (event, values) => {
    const day = new Days({ day: values, isActive: 1}).save(); //save to database
    event.returnValue = true;
});

// get all existing days list from database
global.share.ipcMain.on('day:get', async (event, values) => {
    const days = await Days.findAll({raw: true}); // get the list
    event.returnValue = days;
});

// get specific day by using id from the database
global.share.ipcMain.on('day:getByID', async (event, values) => {
    const days = await Days.findAll({
        where: {
            id: values,
            isActive: 1
        },
        raw: true}); // get the specific data
    event.returnValue = days;
});

// update existing data by using id
global.share.ipcMain.on('day:update', async (event, values) => {

    await Days.findOne({where: {id: values.id}})
        .then( day => {
            // Check if record exists in db
            day.update({day : values.name}).then( updatedRecord => {
                console.log(`updated record ${JSON.stringify(updatedRecord,null,2)}`)
                // login into your DB and confirm update
            })
        });
    event.returnValue = true;
});


// remove tag data from the database
global.share.ipcMain.on('day:remove', async (event, values) => {
    Days.destroy({
        where: {
            id: values
        }
    });
    event.returnValue = true;
});