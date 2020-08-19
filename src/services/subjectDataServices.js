// all the subject database operations are initialized in here

const { Subjects, sequelize } = require('../models/index'); //import the subject model

// add new subject
global.share.ipcMain.on('subject:add', async (event, values) => {
    const subject = new Subjects({ ...values, isActive: 1}).save(); //save to database
    event.returnValue = true;
});

// get all existing subject list from database
global.share.ipcMain.on('subject:get', async (event, values) => {
    const subjects = await sequelize.query(
        `select s.id, s.subjectName, s.subjectCode, s.lectureHours, s.tutorialHours, s.labHours, s.evaluationHours, a.AcademicYearsandSemesters
         from Subjects s
         inner join academicyearsandsemesters a on a.id = s.academicYearAndSemester`,
        {
            type: sequelize.QueryTypes.SELECT
        }
    );
    event.returnValue = subjects;
});

// get specific subject by using id from the database
global.share.ipcMain.on('subject:getByID', async (event, values) => {
    const subject = await sequelize.query(
        `select s.id, s.subjectName, s.subjectCode, s.lectureHours, s.tutorialHours, s.labHours, s.evaluationHours, s.academicYearAndSemester, a.AcademicYearsandSemesters
         from Subjects s
         inner join academicyearsandsemesters a on a.id = s.academicYearAndSemester
         where s.isActive = 1 and s.id = :id`,
        {
            replacements: { id: values },
            type: sequelize.QueryTypes.SELECT
        }
    );
    event.returnValue = subject;
});

// update existing data by using id
global.share.ipcMain.on('subject:update', async (event, values) => {

    await Subjects.findOne({where: {id: values.id}})
        .then( subject => {
            // Check if record exists in db
            delete values.id;
            subject.update(values).then( updatedRecord => {
                console.log(`updated record ${JSON.stringify(updatedRecord,null,2)}`)
                // login into your DB and confirm update
            })
        });
    event.returnValue = true;
});


// remove subject data from the database
global.share.ipcMain.on('subject:remove', async (event, values) => {
    Subjects.destroy({
        where: {
            id: values
        }
    });
    event.returnValue = true;
});
