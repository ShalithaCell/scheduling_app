// all the Programme database operations are initialized in here

const { Programme } = require('../models/index'); //import the tag model
const { QueryTypes } = require('sequelize');
const {sequelize} = require('../models/index');

// add new programme
global.share.ipcMain.on('programme:add', async (event, values) => {
    const data = new Programme({ name: values.name , startYear: values.startYear, endYear:values.endYear, isActive: 1}).save(); //save to database
    event.returnValue = true;
});

// get all existing programme list from database
global.share.ipcMain.on('programme:get', async (event, values) => {
    const data = await Programme.findAll({where: {
            isActive: 1
        },
        raw: true}); // get the list
    event.returnValue = data;
});

// get all programs by query
global.share.ipcMain.on('programme:getAllByRow', async (event, values) => {

    const data =  await sequelize.query(
        `select P.id, P.name, P.startYear,P.endYear, A.AcademicYearsandSemesters as 'startYearText', AA.AcademicYearsandSemesters as 'endYearText'  
        from Programmes P 
        inner join academicyearsandsemesters A on A.id = P.startYear 
        inner join academicyearsandsemesters AA on AA.id = P.endYear WHERE P.isActive = 1`
        , { type: QueryTypes.SELECT });
    event.returnValue = data;
});

// get specific programme by using id from the database
global.share.ipcMain.on('programme:getByID', async (event, values) => {
    const data = await Programme.findAll({
        where: {
            id: values,
            isActive: 1
        },
        raw: true}); // get the specific data
    event.returnValue = data;
});

// update existing data by using id
global.share.ipcMain.on('programme:update', async (event, values) => {

    await Programme.findOne({where: {id: values.id}})
        .then( data => {
            // Check if record exists in db
            data.update({ name: values.name , startYear: values.startYear, endYear:values.endYear}).then( updatedRecord => {
                console.log(`updated record ${JSON.stringify(updatedRecord,null,2)}`)
                // login into your DB and confirm update
            })
        });
    event.returnValue = true;
});


// remove programme data from the database
global.share.ipcMain.on('programme:remove', async (event, values) => {
    Programme.destroy({
        where: {
            id: values
        }
    });
    event.returnValue = true;
});