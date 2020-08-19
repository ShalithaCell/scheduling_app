// all the building database operations are initialized in here

const { Buildings } = require('../models/index'); //import the building model

// add new building
global.share.ipcMain.on('building:add', async (event, values) => {
    const building = new Buildings({ buildingName: values, isActive: 1}).save(); //save to database
    event.returnValue = true;
});

// get all existing building list from database
global.share.ipcMain.on('building:get', async (event, values) => {
    const buildings = await Buildings.findAll({raw: true}); // get the list
    event.returnValue = buildings;
});

// get specific building by using id from the database
global.share.ipcMain.on('building:getByID', async (event, values) => {
    const buildings = await Buildings.findAll({
        where: {
            id: values,
            isActive: 1
        },
        raw: true}); // get the specific data
    event.returnValue = buildings;
});

// update existing data by using id
global.share.ipcMain.on('building:update', async (event, values) => {

    await Buildings.findOne({where: {id: values.id}})
        .then( building => {
            // Check if record exists in db
            building.update({buildingName : values.name}).then( updatedRecord => {
                console.log(`updated record ${JSON.stringify(updatedRecord,null,2)}`)
                // login into your DB and confirm update
            })
        });
    event.returnValue = true;
});


// remove building data from the database
global.share.ipcMain.on('building:remove', async (event, values) => {
    Buildings.destroy({
        where: {
            id: values
        }
    });
    event.returnValue = true;
});
