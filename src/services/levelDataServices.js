// all the level database operations are initialized in here

const { Levels } = require('../models/index'); //import the level model

// add new level
global.share.ipcMain.on('level:add', async (event, { category, level }) => {
    const record = new Levels({ category, level, isActive: 1}).save(); //save to database
    event.returnValue = true;
});

// get all existing level list from database
global.share.ipcMain.on('level:get', async (event, values) => {
    const levels = await Levels.findAll({raw: true}); // get the list
    event.returnValue = levels;
});

// get specific level by using id from the database
global.share.ipcMain.on('level:getByID', async (event, values) => {
    const levels = await Levels.findAll({
        where: {
            id: values,
            isActive: 1
        },
        raw: true}); // get the specific data
    event.returnValue = levels;
});

// update existing data by using id
global.share.ipcMain.on('level:update', async (event, values) => {

    await Levels.findOne({where: {id: values.id}})
        .then( level => {
            // Check if record exists in db
            level.update({category : values.category, level: values.level}).then( updatedRecord => {
                console.log(`updated record ${JSON.stringify(updatedRecord,null,2)}`)
                // login into your DB and confirm update
            })
        });
    event.returnValue = true;
});


// remove level data from the database
global.share.ipcMain.on('level:remove', async (event, values) => {
    Levels.destroy({
        where: {
            id: values
        }
    });
    event.returnValue = true;
});
