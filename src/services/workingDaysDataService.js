// all the working days database operations are initialized in here

const { WorkingData, Days } = require('../models/index'); //import the tag model

// add new day
global.share.ipcMain.on('work:add', async (event, values) => {
    const workData = new WorkingData({ day: values.day, time: values.time, isActive: 1}).save(); //save to database
    event.returnValue = true;
});

// get all existing days list from database
global.share.ipcMain.on('work:get', async (event, values) => {
    const workData = await WorkingData.findAll({
        include: [
            { model: Days, as: 'Days' }
        ]
        ,raw: true}); // get the list
    event.returnValue = workData;
});

// get specific day by using id from the database
global.share.ipcMain.on('work:getByID', async (event, values) => {
    const workData = await WorkingData.findAll({
        include: [
            { model: Days, as: 'Days' }
        ],
        where: {
            id: values,
            isActive: 1
        },
        raw: true}); // get the specific data
    event.returnValue = workData;
});

// get specific type by using id from the database
global.share.ipcMain.on('work:getByType', async (event, values) => {
    const workData = await WorkingData.findAll({
        include: [
            { model: Days, as: 'Days' }
        ],
        where: {
            type: values,
            isActive: 1
        },
        raw: true}); // get the specific data
    event.returnValue = workData;
});

// update existing data by using id
global.share.ipcMain.on('work:update', async (event, values) => {
    await WorkingData.findOne({where: {id: values.id}})
        .then( day => {
            // Check if record exists in db
            day.update({day : values.day, time: values.time}).then( updatedRecord => {
                console.log(`updated record ${JSON.stringify(updatedRecord,null,2)}`)
                // login into your DB and confirm update
            })
        });
    event.returnValue = true;
});


// remove tag data from the database
global.share.ipcMain.on('work:remove', async (event, values) => {
    WorkingData.destroy({
        where: {
            id: values
        }
    });
    event.returnValue = true;
});