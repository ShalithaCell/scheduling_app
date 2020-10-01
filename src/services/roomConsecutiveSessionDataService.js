const { RoomConsecutiveSession } = require('../models/index'); //import the room model

global.share.ipcMain.on('room-consecutive-sessions:add', async (event, values) => {
    new RoomConsecutiveSession({ roomID: values.roomID, conSessionID: values.conSessionID}).save(); //save to database
    event.returnValue = true;
});

global.share.ipcMain.on('room-consecutive-sessions:getByRoom', async (event, values) => {
    const roomSessions = await RoomConsecutiveSession.findAll({
        where: {
            roomID: values
        },
        raw: true});
    event.returnValue = roomSessions;
});


global.share.ipcMain.on('room-consecutive-sessions:remove', async (event, values) => {
    RoomConsecutiveSession.destroy({
        where: {
            roomID: values
        }
    });
    event.returnValue = true;
});
