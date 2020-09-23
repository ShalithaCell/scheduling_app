// all theNotAvailableGroups database operations are initialized in here

const { notAvailableGroups, sequelize } = require('../models/index'); //import the lecturer model

// add new NotAvailableGroups
global.share.ipcMain.on('NotAvailableGroups:add', async (event, values) => {
    const NotAvailableGroups = new notAvailableGroups({ ...values, isActive: 1}).save(); //save to database
    event.returnValue = true;
});

// get all existing NotAvailableGroups list from database
global.share.ipcMain.on('NotAvailableGroups:get', async (event, values) => {
    const NotAvailableGroups = await sequelize.query(
        `select g.id as 'notID', d.groupName,g.groupid,f.day as 'fday',g.day,g.fromt,g.tot 
         from notAvailableGroups g
         inner join Groups d on d.id = g.groupid
         inner join Days f on f.id = g.day`,
        {
            type: sequelize.QueryTypes.SELECT
        }
    );
    event.returnValue = NotAvailableGroups;
});

// get specific NotAvailableGroups by using id from the database
global.share.ipcMain.on('NotAvailableGroups:getByID', async (event, values) => {
    const NotAvailableGroups = await sequelize.query(
        `select d.groupName,g.groupid,f.day as 'fday',g.day,g.fromt,g.tot 
        from notAvailableGroups g
        inner join Groups d on d.id = g.groupid
        inner join Days f on f.id = g.day
         where g.isActive = 1 and g.id = :id`,
        {
            replacements: { id: values },
            type: sequelize.QueryTypes.SELECT
        }
    );
    event.returnValue = NotAvailableGroups;
});

// update existing data by using id
global.share.ipcMain.on('NotAvailableGroups:update', async (event, values) => {

    await notAvailableGroups.findOne({where: {id: values.id}})
        .then( NotAvailableGroups => {
            // Check if record exists in db
            delete values.id;
            NotAvailableGroups.update({groupid:values.groupid,day:values.day,fromt:values.fromt,tot:values.tot}).then( updatedRecord => {
                console.log(`updated record ${JSON.stringify(updatedRecord,null,2)}`)
                // login into your DB and confirm update
            })
        });
    event.returnValue = true;
});


// remove lecturer data from the database
global.share.ipcMain.on('NotAvailableGroups:remove', async (event, values) => {
    notAvailableGroups.destroy({
        where: {
            id: values
        }
    });
    event.returnValue = true;
});
