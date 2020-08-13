const { Tags } = require('../models/index');

global.share.ipcMain.on('tag:add', async (event, values) => {
    const tag = new Tags({ tagName: values, isActive: 1}).save();
    event.returnValue = true;
});

global.share.ipcMain.on('tag:get', async (event, values) => {
    const tags = await Tags.findAll({raw: true});
    event.returnValue = tags;
});

global.share.ipcMain.on('tag:getByID', async (event, values) => {
    const tags = await Tags.findAll({
        where: {
            id: values,
            isActive: 1
        },
        raw: true});
    event.returnValue = tags;
});

global.share.ipcMain.on('tag:update', async (event, values) => {

    await Tags.findOne({where: {id: values.id}})
        .then( tag => {
            // Check if record exists in db
            tag.update({tagName : values.name}).then( updatedRecord => {
                console.log(`updated record ${JSON.stringify(updatedRecord,null,2)}`)
                // login into your DB and confirm update
            })
        });
    event.returnValue = true;
});

global.share.ipcMain.on('tag:remove', async (event, values) => {
    Tags.destroy({
        where: {
            id: values
        }
    });
    event.returnValue = true;
});