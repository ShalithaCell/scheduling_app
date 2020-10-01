const { NotOverlapSessions, sequelize } = require('../models/index'); //import the room model

global.share.ipcMain.on('notOverlapSession:add', async (event, values) => {
    const session = new NotOverlapSessions({ ...values}).save(); //save to database
    event.returnValue = true;
});

global.share.ipcMain.on('notOverlapSession:get', async (event, values) => {
    const consecutiveSession = await NotOverlapSessions.findAll({raw: true}); // get the list
    event.returnValue = consecutiveSession;
});

global.share.ipcMain.on('notOverlapSession:getByID', async (event, values) => {
    const consecutiveSession = await NotOverlapSessions.findAll({
        where: {
            id: values
        },
        raw: true}); // get the specific data
    event.returnValue = consecutiveSession;
});

global.share.ipcMain.on('notOverlapSession:update', async (event, values) => {

    await NotOverlapSessions.findOne({where: {id: values.id}})
        .then( session => {
            // Check if record exists in db
            session.update(
                {
                    session1ID : values.session1ID,
                    session2ID : values.session2ID,
                    session3ID : values.session3ID,
                    session4ID : values.session4ID,
                    session5ID : values.session5ID,
                    session6ID : values.session6ID
                }).then( updatedRecord => {
                console.log(`updated record ${JSON.stringify(updatedRecord,null,2)}`)
                // login into your DB and confirm update
            })
        });
    event.returnValue = true;
});

global.share.ipcMain.on('notOverlapSession:remove', async (event, values) => {
    NotOverlapSessions.destroy({
        where: {
            id: values
        }
    });
    event.returnValue = true;
});