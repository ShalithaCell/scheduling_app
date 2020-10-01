const { NotAvailableSessionTime, sequelize } = require('../models/index'); //import the tag model

global.share.ipcMain.on('notAvailableSession:add', async (event, values) => {
    new NotAvailableSessionTime({ ...values }).save(); //save to database
    event.returnValue = true;
});

global.share.ipcMain.on('notAvailableSession:get', async (event, values) => {
    const lecturers = await sequelize.query(
        `SELECT N.*
        FROM NotAvailableSessionTimes N`,
        {
            type: sequelize.QueryTypes.SELECT
        }
    );
    event.returnValue = lecturers;
});

global.share.ipcMain.on('notAvailableSession:getByID', async (event, values) => {
    const lecturers = await sequelize.query(
        `SELECT N.*
        FROM NotAvailableSessionTimes N
        WHERE N.id = :id`,
        {
            replacements: { id: values },
            type: sequelize.QueryTypes.SELECT
        }
    );
    event.returnValue = lecturers;
});

global.share.ipcMain.on('notAvailableSession:update', async (event, values) => {

    await NotAvailableSessionTime.findOne({where: {id: values.id}})
        .then( session => {
            // Check if record exists in db
            session.update(
                {
                    sessionID : values.lecID,
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

global.share.ipcMain.on('notAvailableSession:remove', async (event, values) => {
    NotAvailableSessionTime.destroy({
        where: {
            id: values
        }
    });
    event.returnValue = true;
});