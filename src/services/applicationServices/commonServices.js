const jsonHasKeyValFoRDays = (json, value) =>
{
    var hasMatch =false;

    for (var index = 0; index < json.length; ++index) {

        var row = json[index];

        if(row.day == value){
            hasMatch = true;
            break;
        }
    }

    return hasMatch;
}

const generateLecturerArray = (ipcRenderer, lecturerIDs) =>
{
    const returnArray = [];

    if(lecturerIDs === null){
        return  returnArray;
    }

    const lecturerIDsArray = lecturerIDs.split(',');

    const lectures = ipcRenderer.sendSync('lecturer:get', null);

    lecturerIDsArray.forEach((item, index)=>{

        const lec = lectures.filter((l) => l.id === Number(item));
        if(lec.length !== 0){
            returnArray.push(lec[0].lecturerName);
        }
    });

    return  returnArray;
}

const generateTagArray = (ipcRenderer, tagIDs) =>
{
    const returnArray = [];

    if(tagIDs === null){
        return  returnArray;
    }

    const tagIDsArray = tagIDs.split(',');

    const tags = ipcRenderer.sendSync('tag:get', null);

    tagIDsArray.forEach((item, index)=>{
        const lec = tags.filter((l) => l.id === Number(item));
        if(lec.length !== 0){
            returnArray.push(lec[0].tagName);
        }
    });

    return  returnArray;
}

const generateDayArray = (ipcRenderer, dayIDs) =>
{
    const returnArray = [];

    if(dayIDs === null){
        return  returnArray;
    }

    const dayIDsArray = dayIDs.split(',');

    const days = ipcRenderer.sendSync('day:get', null);

    dayIDsArray.forEach((item, index)=>{
        const day = days.filter((l) => l.id === Number(item));
        if(day.length !== 0){
            returnArray.push(day[0].day);
        }
    });

    return  returnArray;
}

const generateSessionDetailObjects = (ipcRenderer) =>
{
    const sessionList = ipcRenderer.sendSync('session:get', null);

    const returnObj = [];

    sessionList.forEach((item, index)=>{
        const lecturerNames = generateLecturerArray(ipcRenderer, item.lectures);
        const tagNames = generateTagArray(ipcRenderer, item.tags);

        const obj = { ...item, lecturerNames : lecturerNames.join(', '), tagNames : tagNames.join(', ')}
        returnObj.push(obj);
    });

    return returnObj;
}

const generateNotAvailableLectureObjects = (ipcRenderer) =>
{
    const dataSet = ipcRenderer.sendSync('notAvailableLecturer:get', null);

    const returnDataObj = [];

    dataSet.forEach((item, index)=>{
        const dayNames = generateDayArray(ipcRenderer, item.dayIDs);

        const obj = { ...item, dayNames : dayNames.join(', ') }
        returnDataObj.push(obj);
    });

    return returnDataObj;
}

const generateNotAvailableRoomObjects = (ipcRenderer) =>
{
    const dataSet = ipcRenderer.sendSync('notAvailableRoom:get', null);

    const returnDataObj = [];

    dataSet.forEach((item, index)=>{
        const dayNames = generateDayArray(ipcRenderer, item.dayIDs);

        const obj = { ...item, dayNames : dayNames.join(', ') }
        returnDataObj.push(obj);
    });

    return returnDataObj;
}

const validateString = (char) =>
{
    let regx = new RegExp(/^[A-Za-z]{1}$/g);
    return regx.test(char);
}

const isNumber = (string) => {
    //it has whitespace
    if(string.trim() === ''){
        return false
    }
    return string - 0 === string * 1
}

module.exports = { jsonHasKeyValFoRDays,generateLecturerArray, generateTagArray, generateSessionDetailObjects, generateDayArray, generateNotAvailableLectureObjects, generateNotAvailableRoomObjects, validateString, isNumber  }
