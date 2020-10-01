const { consecutiveSessions, sequelize } = require('../models/index'); //import the room model

global.share.ipcMain.on('consecutiveSessions:add', async (event, values) => {
    const session = new consecutiveSessions({ ...values}).save(); //save to database
    event.returnValue = true;
});

global.share.ipcMain.on('consecutiveSessions:get', async (event, values) => {
    const consecutiveSession = await consecutiveSessions.findAll({raw: true}); // get the list
    event.returnValue = consecutiveSession;
});

global.share.ipcMain.on('consecutiveSessions:getByID', async (event, values) => {
    const consecutiveSession = await consecutiveSessions.findAll({
        where: {
            id: values
        },
        raw: true}); // get the specific data
    event.returnValue = consecutiveSession;
});

global.share.ipcMain.on('consecutiveSessions:update', async (event, values) => {

    await consecutiveSessions.findOne({where: {id: values.id}})
        .then( session => {
            // Check if record exists in db
            session.update(
                {
                    session1ID : values.session1ID,
                    session2ID : values.session2ID,
                    session3ID : values.session3ID
                }).then( updatedRecord => {
                console.log(`updated record ${JSON.stringify(updatedRecord,null,2)}`)
                // login into your DB and confirm update
            })
        });
    event.returnValue = true;
});

global.share.ipcMain.on('consecutiveSessions:remove', async (event, values) => {
    consecutiveSessions.destroy({
        where: {
            id: values
        }
    });
    event.returnValue = true;
});