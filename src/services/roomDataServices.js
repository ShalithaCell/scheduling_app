// all the room database operations are initialized in here

const { Rooms, sequelize } = require('../models/index'); //import the room model

// add new room
global.share.ipcMain.on('room:add', async (event, values) => {
    const room = new Rooms({ ...values, isActive: 1}).save(); //save to database
    event.returnValue = true;
});

// get all existing room list from database
global.share.ipcMain.on('room:get', async (event, values) => {
    const rooms = await sequelize.query(
        `select r.id, r.roomName, r.building, b.buildingName, r.capacity, b.center, s.centerName from Rooms r
         inner join Buildings b on b.id = r.building
         inner join Centers s on s.id = b.center`,
        {
            type: sequelize.QueryTypes.SELECT
        }
    );
    event.returnValue = rooms;
});

// get specific room by using id from the database
global.share.ipcMain.on('room:getByID', async (event, values) => {
    const room = await sequelize.query(
        `select r.id, r.roomName, r.building, b.buildingName, r.capacity, b.center, s.centerName from Rooms r
         inner join Buildings b on b.id = r.building
         inner join Centers s on s.id = b.center
         where r.isActive = 1 and r.id = :id`,
        {
            replacements: { id: values },
            type: sequelize.QueryTypes.SELECT
        }
    );
    event.returnValue = room;
});

// update existing data by using id
global.share.ipcMain.on('room:update', async (event, values) => {

    await Rooms.findOne({where: {id: values.id}})
        .then( room => {
            // Check if record exists in db
            delete values.id;
            room.update(values).then( updatedRecord => {
                console.log(`updated record ${JSON.stringify(updatedRecord,null,2)}`)
                // login into your DB and confirm update
            })
        });
    event.returnValue = true;
});


// remove room data from the database
global.share.ipcMain.on('room:remove', async (event, values) => {
    Rooms.destroy({
        where: {
            id: values
        }
    });
    event.returnValue = true;
});
