// all the facility database operations are initialized in here

const { Facilities } = require('../models/index'); //import the facility model

// add new facility
global.share.ipcMain.on('facility:add', async (event, values) => {
    const facility = new Facilities({ facilityName: values, isActive: 1}).save(); //save to database
    event.returnValue = true;
});

// get all existing facility list from database
global.share.ipcMain.on('facility:get', async (event, values) => {
    const facilities = await Facilities.findAll({raw: true}); // get the list
    event.returnValue = facilities;
});

// get specific facility by using id from the database
global.share.ipcMain.on('facility:getByID', async (event, values) => {
    const facilities = await Facilities.findAll({
        where: {
            id: values,
            isActive: 1
        },
        raw: true}); // get the specific data
    event.returnValue = facilities;
});

// update existing data by using id
global.share.ipcMain.on('facility:update', async (event, values) => {

    await Facilities.findOne({where: {id: values.id}})
        .then( facility => {
            // Check if record exists in db
            facility.update({facilityName : values.name}).then( updatedRecord => {
                console.log(`updated record ${JSON.stringify(updatedRecord,null,2)}`)
                // login into your DB and confirm update
            })
        });
    event.returnValue = true;
});


// remove facility data from the database
global.share.ipcMain.on('facility:remove', async (event, values) => {
    Facilities.destroy({
        where: {
            id: values
        }
    });
    event.returnValue = true;
});
