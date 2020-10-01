const { NotAvailableLecturerTime, sequelize } = require('../models/index'); //import the tag model

global.share.ipcMain.on('notAvailableLecturer:add', async (event, values) => {
    new NotAvailableLecturerTime({ ...values }).save(); //save to database
    event.returnValue = true;
});

global.share.ipcMain.on('notAvailableLecturer:get', async (event, values) => {
    const lecturers = await sequelize.query(
        `SELECT N.*, L.lecturerName, L.empId
        FROM NotAvailableLecturerTimes N
        inner join Lecturers L on N.lecID = L.id`,
        {
            type: sequelize.QueryTypes.SELECT
        }
    );
    event.returnValue = lecturers;
});

global.share.ipcMain.on('notAvailableLecturer:getByID', async (event, values) => {
    const lecturers = await sequelize.query(
        `SELECT N.*, L.lecturerName, L.empId
        FROM NotAvailableLecturerTimes N
        inner join Lecturers L on N.lecID = L.id
        WHERE N.id = :id`,
        {
            replacements: { id: values },
            type: sequelize.QueryTypes.SELECT
        }
    );
    event.returnValue = lecturers;
});

global.share.ipcMain.on('notAvailableLecturer:update', async (event, values) => {

    await NotAvailableLecturerTime.findOne({where: {id: values.id}})
        .then( session => {
            // Check if record exists in db
            session.update(
                {
                    lecID : values.lecID,
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

global.share.ipcMain.on('notAvailableLecturer:remove', async (event, values) => {
    NotAvailableLecturerTime.destroy({
        where: {
            id: values
        }
    });
    event.returnValue = true;
});