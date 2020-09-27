// all the room-tags database operations are initialized in here

const { RoomTags, sequelize } = require('../models/index'); //import the room model

// get specific room-tags by using id from the database
global.share.ipcMain.on('room-tags:getByRoom', async (event, values) => {
    const roomTags = await sequelize.query(
        `SELECT rt.tag AS tagId, t.tagName FROM RoomTags rt
        INNER JOIN Tags t ON t.id = rt.tag
        WHERE rt.room = :id`,
        {
            replacements: { id: values },
            type: sequelize.QueryTypes.SELECT
        }
    );
    event.returnValue = roomTags;
});

// update existing data by using id
global.share.ipcMain.on('room-tags:update', async (event, { roomId, tagIds }) => {
    // TODO: This algorithm should be changed
    await RoomTags.destroy({
        where: {
            room: roomId
        }
    });

    for(const tagId of tagIds){
        await new RoomTags({ room: roomId, tag: Number(tagId) }).save();
    }
    event.returnValue = true;
});
