// all the center database operations are initialized in here

const { Centers } = require('../models/index'); //import the center model

// add new center
global.share.ipcMain.on('center:add', async (event, values) => {
    const center = new Centers({ centerName: values, isActive: 1}).save(); //save to database
    event.returnValue = true;
});

// get all existing center list from database
global.share.ipcMain.on('center:get', async (event, values) => {
    const centers = await Centers.findAll({raw: true}); // get the list
    event.returnValue = centers;
});

// get specific center by using id from the database
global.share.ipcMain.on('center:getByID', async (event, values) => {
    const centers = await Centers.findAll({
        where: {
            id: values,
            isActive: 1
        },
        raw: true}); // get the specific data
    event.returnValue = centers;
});

// update existing data by using id
global.share.ipcMain.on('center:update', async (event, values) => {

    await Centers.findOne({where: {id: values.id}})
        .then( center => {
            // Check if record exists in db
            center.update({centerName : values.name}).then( updatedRecord => {
                console.log(`updated record ${JSON.stringify(updatedRecord,null,2)}`)
                // login into your DB and confirm update
            })
        });
    event.returnValue = true;
});


// remove center data from the database
global.share.ipcMain.on('center:remove', async (event, values) => {
    Centers.destroy({
        where: {
            id: values
        }
    });
    event.returnValue = true;
});
