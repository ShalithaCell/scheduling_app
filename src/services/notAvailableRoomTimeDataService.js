const { NotAvailableRoomTime, sequelize } = require('../models/index'); //import the tag model

global.share.ipcMain.on('notAvailableRoom:add', async (event, values) => {
    new NotAvailableRoomTime({ ...values }).save(); //save to database
    event.returnValue = true;
});

global.share.ipcMain.on('notAvailableRoom:get', async (event, values) => {
    const rooms = await sequelize.query(
        `SELECT N.*, L.roomName
        FROM NotAvailableRoomTimes N
        inner join Rooms L on N.roomID = L.id`,
        {
            type: sequelize.QueryTypes.SELECT
        }
    );
    event.returnValue = rooms;
});

global.share.ipcMain.on('notAvailableRoom:getByID', async (event, values) => {
    const rooms = await sequelize.query(
        `SELECT N.*, L.roomName
        FROM NotAvailableRoomTimes N
        inner join Rooms L on N.roomID = L.id
        WHERE N.id = :id`,
        {
            replacements: { id: values },
            type: sequelize.QueryTypes.SELECT
        }
    );
    event.returnValue = rooms;
});

global.share.ipcMain.on('notAvailableRoom:update', async (event, values) => {

    await NotAvailableRoomTime.findOne({where: {id: values.id}})
        .then( session => {
            // Check if record exists in db
            session.update(
                {
                    roomID : values.roomID,
                    dayIDs : values.dayIDs,
                    timeFrom : values.timeFrom,
                    timeTo : values.timeTo
                }).then( updatedRecord => {
                console.log(`updated record ${JSON.stringify(updatedRecord,null,2)}`)
                // login into your DB and confirm update
            })
        });
    event.returnValue = true;
});

global.share.ipcMain.on('notAvailableRoom:remove', async (event, values) => {
    NotAvailableRoomTime.destroy({
        where: {
            id: values
        }
    });
    event.returnValue = true;
});
