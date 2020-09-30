const { NotAvailableGroupTime, sequelize } = require('../models/index'); //import the tag model

global.share.ipcMain.on('notAvailableGroup:add', async (event, values) => {
    new NotAvailableGroupTime({ ...values }).save(); //save to database
    event.returnValue = true;
});

global.share.ipcMain.on('notAvailableGroup:get', async (event, values) => {
    const lecturers = await sequelize.query(
        `SELECT N.*, G.groupName
            FROM NotAvailableGroupTimes N
            inner join Groups G on N.groupID = G.id`,
        {
            type: sequelize.QueryTypes.SELECT
        }
    );
    event.returnValue = lecturers;
});

global.share.ipcMain.on('notAvailableGroup:getByID', async (event, values) => {
    const lecturers = await sequelize.query(
        `SELECT N.*, G.groupName
            FROM NotAvailableGroupTimes N
            inner join Groups G on N.groupID = G.id
            where N.id = :id`,
        {
            replacements: { id: values },
            type: sequelize.QueryTypes.SELECT
        }
    );
    event.returnValue = lecturers;
});

global.share.ipcMain.on('notAvailableGroup:update', async (event, values) => {

    await NotAvailableGroupTime.findOne({where: {id: values.id}})
        .then( session => {
            // Check if record exists in db
            session.update(
                {
                    groupID : values.groupID,
                    subGroup: values.subGroup,
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

global.share.ipcMain.on('notAvailableGroup:remove', async (event, values) => {
    NotAvailableGroupTime.destroy({
        where: {
            id: values
        }
    });
    event.returnValue = true;
});