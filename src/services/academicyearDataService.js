// all the academic year and semester database operations are initialized in here

const { academicyearsandsemesters } = require('../models/index'); //import the tag model

// add new academic years and semesters
global.share.ipcMain.on('academic:add', async (event, values) => {
    const academic = new academicyearsandsemesters({ AcademicYearsandSemesters: values, isActive: 1}).save(); //save to database
    event.returnValue = true;
});

// get all existing academic years and semesters list from database
global.share.ipcMain.on('academic:get', async (event, values) => {
    const academics = await academicyearsandsemesters.findAll({where: {
            isActive: 1
        },
        raw: true}); // get the list
    event.returnValue = academics;
});

// get specific academic years and semesters by using id from the database
global.share.ipcMain.on('academic:getByID', async (event, values) => {
    const academics = await academicyearsandsemesters.findAll({
        where: {
            id: values,
            isActive: 1
        },
        raw: true}); // get the specific data
    event.returnValue = academics;
});

// update existing data by using id
global.share.ipcMain.on('academic:update', async (event, values) => {

    await academicyearsandsemesters.findOne({where: {id: values.id}})
        .then( academic => {
            // Check if record exists in db
            academic.update({AcademicYearsandSemesters : values.name}).then( updatedRecord => {
                console.log(`updated record ${JSON.stringify(updatedRecord,null,2)}`)
                // login into your DB and confirm update
            })
        });
    event.returnValue = true;
});


// remove academic years and semesters data from the database
global.share.ipcMain.on('academic:remove', async (event, values) => {
    academicyearsandsemesters.destroy({
        where: {
            id: values
        }
    });
    event.returnValue = true;
});