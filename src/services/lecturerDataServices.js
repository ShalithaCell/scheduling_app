// all the lecturer database operations are initialized in here

const { Lecturers, sequelize } = require('../models/index'); //import the lecturer model

// add new lecturer
global.share.ipcMain.on('lecturer:add', async (event, values) => {
    const lecturer = new Lecturers({ ...values, isActive: 1}).save(); //save to database
    event.returnValue = true;
});

// get all existing lecturer list from database
global.share.ipcMain.on('lecturer:get', async (event, values) => {
    const lecturers = await sequelize.query(
        `select l.id, l.lecturerName, l.empId, l.department, d.departmentName, l.faculty, f.facilityName facultyName, l.center, c.centerName, l.building, b.buildingName, l.level, le.category levelName
         from Lecturers l
         inner join Departments d on d.id = l.department
         inner join Facilities f on f.id = l.faculty
         inner join Centers c on c.id = l.center
         inner join Buildings b on b.id = l.building
         inner join Levels le on le.id = l.level`,
        {
            type: sequelize.QueryTypes.SELECT
        }
    );
    event.returnValue = lecturers;
});

// get specific lecturer by using id from the database
global.share.ipcMain.on('lecturer:getByID', async (event, values) => {
    const lecturer = await sequelize.query(
        `select l.id, l.lecturerName, l.empId, l.department, d.departmentName, l.faculty, f.facilityName facultyName, l.center, c.centerName, l.building, b.buildingName, l.level, le.category levelName from Lecturers l
         inner join Departments d on d.id = l.department
         inner join Facilities f on f.id = l.faculty
         inner join Centers c on c.id = l.center
         inner join Buildings b on b.id = l.building
         inner join Levels le on le.id = l.level
         where l.isActive = 1 and l.id = :id`,
        {
            replacements: { id: values },
            type: sequelize.QueryTypes.SELECT
        }
    );
    event.returnValue = lecturer;
});

// update existing data by using id
global.share.ipcMain.on('lecturer:update', async (event, values) => {

    await Lecturers.findOne({where: {id: values.id}})
        .then( lecturer => {
            // Check if record exists in db
            delete values.id;
            lecturer.update(values).then( updatedRecord => {
                console.log(`updated record ${JSON.stringify(updatedRecord,null,2)}`)
                // login into your DB and confirm update
            })
        });
    event.returnValue = true;
});


// remove lecturer data from the database
global.share.ipcMain.on('lecturer:remove', async (event, values) => {
    Lecturers.destroy({
        where: {
            id: values
        }
    });
    event.returnValue = true;
});
