// all the studyType database operations are initialized in here

const { StudyTypes } = require('../models/index'); //import the studyType model

// add new studyType
global.share.ipcMain.on('studyType:add', async (event, values) => {
    const studyType = new StudyTypes({ studyTypeName: values, isActive: 1}).save(); //save to database
    event.returnValue = true;
});

// get all existing studyType list from database
global.share.ipcMain.on('studyType:get', async (event, values) => {
    const studyTypes = await StudyTypes.findAll({raw: true}); // get the list
    event.returnValue = studyTypes;
});

// get specific studyType by using id from the database
global.share.ipcMain.on('studyType:getByID', async (event, values) => {
    const studyTypes = await StudyTypes.findAll({
        where: {
            id: values,
            isActive: 1
        },
        raw: true}); // get the specific data
    event.returnValue = studyTypes;
});

// update existing data by using id
global.share.ipcMain.on('studyType:update', async (event, values) => {

    await StudyTypes.findOne({where: {id: values.id}})
        .then( studyType => {
            // Check if record exists in db
            studyType.update({studyTypeName : values.name}).then( updatedRecord => {
                console.log(`updated record ${JSON.stringify(updatedRecord,null,2)}`)
                // login into your DB and confirm update
            })
        });
    event.returnValue = true;
});


// remove studyType data from the database
global.share.ipcMain.on('studyType:remove', async (event, values) => {
    StudyTypes.destroy({
        where: {
            id: values
        }
    });
    event.returnValue = true;
});
