const { sessions, sequelize } = require('../models/index'); //import the room model

global.share.ipcMain.on('session:add', async (event, values) => {
    const session = new sessions({ ...values, isActive: 1}).save(); //save to database
    event.returnValue = true;
});

global.share.ipcMain.on('session:get', async (event, values) => {
    const session = await sequelize.query(
        `SELECT S.*,
             G.id as 'groupID', 
            G.groupName,
            B.subjectName,
            B.subjectCode
            from sessions S
            inner join Groups G on S.sgroup = G.id
            inner join Subjects B on S.subject = B.id
            WHERE S.isActive = 1`,
        {
            type: sequelize.QueryTypes.SELECT
        }
    );
    event.returnValue = session;
});

global.share.ipcMain.on('session:getByID', async (event, values) => {
    const session = await sequelize.query(
        `SELECT S.*,
            G.id as 'groupID', 
            G.groupName,
            B.subjectName,
            B.subjectCode
            from sessions S
            inner join Groups G on S.sgroup = G.id
            inner join Subjects B on S.subject = B.id
            WHERE S.isActive = 1 and S.id = :id`,
        {
            replacements: { id: values },
            type: sequelize.QueryTypes.SELECT
        }
    );
    event.returnValue = session;
});

global.share.ipcMain.on('session:update', async (event, values) => {

    await sessions.findOne({where: {id: values.id}})
        .then( session => {
            // Check if record exists in db
            session.update(
                {
                    lectures : values.name,
                    tags : values.tags,
                    sgroup : values.sgroup,
                    subGroup : values.subGroup,
                    student : values.student,
                    duration : values.duration,
                    subject : values.subject
                }).then( updatedRecord => {
                console.log(`updated record ${JSON.stringify(updatedRecord,null,2)}`)
                // login into your DB and confirm update
            })
        });
    event.returnValue = true;
});

global.share.ipcMain.on('session:remove', async (event, values) => {
    sessions.destroy({
        where: {
            id: values
        }
    });
    event.returnValue = true;
});