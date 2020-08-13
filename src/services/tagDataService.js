// all the tag database operations are initialized in here

const { Tags } = require('../models/index'); //import the tag model

// add new tag
global.share.ipcMain.on('tag:add', async (event, values) => {
    const tag = new Tags({ tagName: values, isActive: 1}).save(); //save to database
    event.returnValue = true;
});

// get all existing tag list from database
global.share.ipcMain.on('tag:get', async (event, values) => {
    const tags = await Tags.findAll({raw: true}); // get the list
    event.returnValue = tags;
});

// get specific tag by using id from the database
global.share.ipcMain.on('tag:getByID', async (event, values) => {
    const tags = await Tags.findAll({
        where: {
            id: values,
            isActive: 1
        },
        raw: true}); // get the specific data
    event.returnValue = tags;
});

// update existing data by using id
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


// remove tag data from the database
global.share.ipcMain.on('tag:remove', async (event, values) => {
    Tags.destroy({
        where: {
            id: values
        }
    });
    event.returnValue = true;
});