// all the room-tags database operations are initialized in here

const { RoomSessions, sequelize } = require('../models/index'); //import the room model

global.share.ipcMain.on('room-sessions:all', async (event, values) => {
    const roomSessions = await sequelize.query(
        `select S.id, S.room, R.roomName, s.session
from RoomSessions S
inner join Rooms R on S.room = R.id`,
        {
            type: sequelize.QueryTypes.SELECT
        }
    );
    event.returnValue = roomSessions;
});

// get specific room-tags by using id from the database
global.share.ipcMain.on('room-sessions:getByRoom', async (event, values) => {
    const roomSessions = await sequelize.query(
        `SELECT session AS sessionId FROM RoomSessions
        WHERE room = :id`,
        {
            replacements: { id: values },
            type: sequelize.QueryTypes.SELECT
        }
    );
    event.returnValue = roomSessions;
});

// update existing data by using id
global.share.ipcMain.on('room-sessions:update', async (event, { roomId, sessionIds }) => {
    // TODO: This algorithm should be changed
    await RoomSessions.destroy({
        where: {
            room: roomId
        }
    });

    for(const sessionId of sessionIds){
        await new RoomSessions({ room: roomId, session: Number(sessionId) }).save();
    }
    event.returnValue = true;
});
