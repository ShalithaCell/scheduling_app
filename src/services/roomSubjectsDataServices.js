// all the room-tags database operations are initialized in here

const { RoomSubjects, sequelize } = require('../models/index'); //import the room model

// get specific room-tags by using id from the database
global.share.ipcMain.on('room-subjects:getByRoom', async (event, values) => {
    const roomSubjects = await sequelize.query(
        `SELECT rs.subject AS subjectId, s.subjectName FROM RoomSubjects rs
        INNER JOIN Subjects s ON s.id = rs.subject
        WHERE rs.room = :id`,
        {
            replacements: { id: values },
            type: sequelize.QueryTypes.SELECT
        }
    );
    event.returnValue = roomSubjects;
});

// update existing data by using id
global.share.ipcMain.on('room-subjects:update', async (event, { roomId, subjectIds }) => {
    // TODO: This algorithm should be changed
    await RoomSubjects.destroy({
        where: {
            room: roomId
        }
    });

    for(const subjectId of subjectIds){
        await new RoomSubjects({ room: roomId, subject: Number(subjectId) }).save();
    }
    event.returnValue = true;
});
