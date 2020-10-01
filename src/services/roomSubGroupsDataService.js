const { RoomSubGroups } = require('../models/index'); //import the room model

global.share.ipcMain.on('room-subGroup-sessions:add', async (event, values) => {
    new RoomSubGroups({ roomID: values.roomId, SubGroups: values.SubGroups}).save(); //save to database
    event.returnValue = true;
});

global.share.ipcMain.on('room-subGroup-sessions:getByRoom', async (event, values) => {
    const roomSessions = await RoomSubGroups.findAll({
        where: {
            roomID: values
        },
        raw: true});
    event.returnValue = roomSessions;
});


global.share.ipcMain.on('room-subGroup-sessions:remove', async (event, values) => {
    RoomSubGroups.destroy({
        where: {
            roomID: values
        }
    });
    event.returnValue = true;
});
