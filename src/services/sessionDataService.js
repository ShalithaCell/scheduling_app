const { sessions, sequelize } = require('../models/index'); //import the room model

global.share.ipcMain.on('session:add', async (event, values) => {
    const session = new sessions({ ...values, isActive: 1}).save(); //save to database
    event.returnValue = true;
});

// get specific room-tags by using id from the database
global.share.ipcMain.on('session:get', async (event, values) => {
    const session = await sequelize.query(
        `SELECT S.id, L.id as 'lecturerID', 
            L.lecturerName, 
            T.id as 'tagID', 
            T.tagName, 
            G.id as 'groupID', 
            G.groupName, 
            S.subGroup, 
            S.student, 
            S.duration, 
            S.isActive
            from sessions S
            inner join Lecturers L on S.lectures = L.id
            inner join Tags T on S.tags = T.id
            inner join Groups G on S.sgroup = G.id
            WHERE S.isActive = 1`,
        {
            type: sequelize.QueryTypes.SELECT
        }
    );
    event.returnValue = session;
});