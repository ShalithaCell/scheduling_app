// all the building database operations are initialized in here

const { Buildings, sequelize } = require('../models/index'); //import the building model

// add new building
global.share.ipcMain.on('building:add', async (event, { buildingName, center }) => {
    const building = new Buildings({ buildingName, center: Number(center), isActive: 1}).save(); //save to database
    event.returnValue = true;
});

// get all existing building list from database
global.share.ipcMain.on('building:get', async (event, values) => {
    const buildings = await sequelize.query(
        `select b.id, b.buildingName, b.center, c.centerName from Buildings b
         inner JOIN Centers c on c.id = b.center
        `,
        {
            type: sequelize.QueryTypes.SELECT
        }
    );
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

// get specific building by using id from the database
global.share.ipcMain.on('building:getByCenterID', async (event, values) => {
    const buildings = await Buildings.findAll({
        where: {
            center: values,
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
            building.update({buildingName : values.buildingName, center: Number(values.center)}).then( updatedRecord => {
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
