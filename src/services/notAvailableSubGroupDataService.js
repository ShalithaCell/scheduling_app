const { NotAvailableSubGroupTime, sequelize } = require('../models/index'); //import the tag model

global.share.ipcMain.on('notAvailableSubGroup:add', async (event, values) => {
    new NotAvailableSubGroupTime({ ...values }).save(); //save to database
    event.returnValue = true;
});

global.share.ipcMain.on('notAvailableSubGroup:get', async (event, values) => {
    const lecturers = await sequelize.query(
        `SELECT N.*, G.groupName
            FROM NotAvailableSubGroupTimes N
            inner join Groups G on N.groupID = G.id`,
        {
            type: sequelize.QueryTypes.SELECT
        }
    );
    event.returnValue = lecturers;
});

global.share.ipcMain.on('notAvailableSubGroup:getByID', async (event, values) => {
    const lecturers = await sequelize.query(
        `SELECT N.*, G.groupName
            FROM NotAvailableSubGroupTimes N
            inner join Groups G on N.groupID = G.id
            where N.id = :id`,
        {
            replacements: { id: values },
            type: sequelize.QueryTypes.SELECT
        }
    );
    event.returnValue = lecturers;
});

global.share.ipcMain.on('notAvailableSubGroup:update', async (event, values) => {

    await NotAvailableSubGroupTime.findOne({where: {id: values.id}})
        .then( session => {
            // Check if record exists in db
            session.update(
                {
                    groupID : values.groupID,
                    subGroup: values.subGroup,
                    extendSubGroup : values.extendSubGroup,
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

global.share.ipcMain.on('notAvailableSubGroup:remove', async (event, values) => {
    NotAvailableSubGroupTime.destroy({
        where: {
            id: values
        }
    });
    event.returnValue = true;
});