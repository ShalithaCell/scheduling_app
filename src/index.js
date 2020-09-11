const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
global.share= {ipcMain};

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences:
        {
          //devTools : false,
          nodeIntegration: true,
        }
  });

  mainWindow.maximize();

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'components/index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

//const tag = new Tags({ tagName: "sdsdsd", isActive: 1}).save();
//console.log(tag);

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

/*ipcMain.on('tag:add', async (event, values) => {
  const tag = new Tags({ tagName: values, isActive: 1}).save();
  console.log(tag);
  event.returnValue = true;
})*/


// database operations
require('./services/tagDataService');

require('./services/academicyearDataService');

require('./services/dayDataService');
require('./services/workingDaysDataService');
require('./services/facilityDataServices');
require('./services/departmentDataServices');
require('./services/centerDataServices');
require('./services/buildingDataServices');
require('./services/levelDataServices');
require('./services/roomDataServices');
require('./services/programmeDataServices');
require('./services/groupsDataServices');
require('./services/subGroupDataServices');
require('./services/holdGroupsDataService');
require('./services/holdSubGroupDataService');
require('./services/extendGroupsDataService');
require('./services/extendSubGroupDataService');
require('./services/extendSubGroupHoldDataService');
require('./services/subjectDataServices');
require('./services/lecturerDataServices');
require('./services/timeTableDataService');
