// all the room-tags database operations are initialized in here

const { RoomLecturers, sequelize } = require('../models/index'); //import the room model

// get specific room-tags by using id from the database
global.share.ipcMain.on('room-lecturers:getByRoom', async (event, values) => {
    const roomLecturers = await sequelize.query(
        `SELECT rl.lecturer AS lecturerId, l.lecturerName FROM RoomLecturers rl
        INNER JOIN Lecturers l ON l.id = rl.lecturer
        WHERE rl.room = :id`,
        {
            replacements: { id: values },
            type: sequelize.QueryTypes.SELECT
        }
    );
    event.returnValue = roomLecturers;
});

// update existing data by using id
global.share.ipcMain.on('room-lecturers:update', async (event, { roomId, lecturerIds }) => {
    // TODO: This algorithm should be changed
    await RoomLecturers.destroy({
        where: {
            room: roomId
        }
    });

    for(const lecturerId of lecturerIds){
        await new RoomLecturers({ room: roomId, lecturer: Number(lecturerId) }).save();
    }
    event.returnValue = true;
});
