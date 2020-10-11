const { app, BrowserWindow, ipcMain } = require('electron');
const printer = require("./services/applicationServices/print");
const path = require('path');
global.share= {ipcMain};

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

let mainWindow ;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences:
        {
          devTools : true,
          nodeIntegration: true,
        }
  });

  mainWindow.maximize();
  //mainWindow.setMenu(null);
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


global.share.ipcMain.on('print-data', async (event, data) => {

});

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
require('./services/notAvailableGroupsDataService');
require('./services/roomTagsDataService');
require('./services/roomSubjectsDataServices');
require('./services/roomLecturersDataService');
require('./services/sessionDataService');
require('./services/notAvailableLecturerTimeDataService');
require('./services/notAvailableSessionTimeDataService');
require('./services/notAvailableSubGroupDataService');
require('./services/notAvailableRoomTimeDataService');
require('./services/roomSessionsDataServices');
require('./services/consecutiveSessionsDataService');
require('./services/parallelSessionDataService');
require('./services/notOverlapSessionsService');
require('./services/roomConsecutiveSessionDataService');
require('./services/roomSubGroupsDataService');
require('./services/timeTableGDataService');

