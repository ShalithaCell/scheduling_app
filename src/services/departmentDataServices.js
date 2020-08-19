// all the department database operations are initialized in here

const { Departments } = require('../models/index'); //import the department model

// add new department
global.share.ipcMain.on('department:add', async (event, { departmentName }) => {
    const record = new Departments({ departmentName, isActive: 1}).save(); //save to database
    event.returnValue = true;
});

// get all existing department list from database
global.share.ipcMain.on('department:get', async (event, values) => {
    const departments = await Departments.findAll({raw: true}); // get the list
    event.returnValue = departments;
});

// get specific department by using id from the database
global.share.ipcMain.on('department:getByID', async (event, values) => {
    const departments = await Departments.findAll({
        where: {
            id: values,
            isActive: 1
        },
        raw: true}); // get the specific data
    event.returnValue = departments;
});

// update existing data by using id
global.share.ipcMain.on('department:update', async (event, values) => {

    await Departments.findOne({where: {id: values.id}})
        .then( department => {
            // Check if record exists in db
            delete values.id;
            department.update(values).then( updatedRecord => {
                console.log(`updated record ${JSON.stringify(updatedRecord,null,2)}`)
                // login into your DB and confirm update
            })
        });
    event.returnValue = true;
});


// remove department data from the database
global.share.ipcMain.on('department:remove', async (event, values) => {
    Departments.destroy({
        where: {
            id: values
        }
    });
    event.returnValue = true;
});
