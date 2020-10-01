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

const generateNotAvailableSessionObjects = (ipcRenderer) =>
{
    const notAvailableSessionDataSet = ipcRenderer.sendSync('notAvailableSession:get', null);
    const sessionsDetails = generateSessionDetailObjects(ipcRenderer);

    const returnDataObj = [];

    notAvailableSessionDataSet.forEach((item, index)=>{
        const dayNames = generateDayArray(ipcRenderer, item.dayIDs);
        const session = sessionsDetails.filter((s) => s.id === item.sessionID);

        const obj = {...item, dayNames:dayNames.join(', '),
            lecturerNames : session[0].lecturerNames,
            subjectCode : session[0].subjectCode,
            subjectName : session[0].subjectName,
            tagNames : session[0].tagNames,
            groupName : session[0].groupName,
        }
        returnDataObj.push(obj);
    });
    return returnDataObj;
}

const generateNotAvailableSubGroupsObjects = (ipcRenderer) =>
{
    const dataSet = ipcRenderer.sendSync('notAvailableSubGroup:get', null);

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

const generateConsecutiveSessions = (ipcRenderer) =>
{
    const dataSet = ipcRenderer.sendSync('consecutiveSessions:get', null);

    const sessionData = generateSessionDetailObjects(ipcRenderer);

    const returnDataObj = [];

    dataSet.forEach((item, index)=>{
        const currentSession1 = item.session1ID !== null && item.session1ID !== '' ?sessionData.filter((i) => i.id === Number(item.session1ID)) : null;
        const currentSession2 = item.session2ID !== null && item.session2ID !== '' ?sessionData.filter((i) => i.id === Number(item.session2ID)) : null;
        const currentSession3 = item.session3ID !== null && item.session3ID !== '' ?sessionData.filter((i) => i.id === Number(item.session3ID)) : null;

        const obj = {
            ...item,
            program: currentSession1[0].groupName,
            Session1Name : currentSession1.length !== 0 ? `${currentSession1[0].subGroup}-${currentSession1[0].subjectName}-${currentSession1[0].lecturerNames}` : '',
            Session2Name : currentSession2.length !== 0 ? `${currentSession2[0].subGroup}-${currentSession2[0].subjectName}-${currentSession2[0].lecturerNames}` : '',
            Session3Name : currentSession3.length !== 0 ? `${currentSession3[0].subGroup}-${currentSession3[0].subjectName}-${currentSession3[0].lecturerNames}` : '',
        }

        returnDataObj.push(obj);
    });
    return returnDataObj;
}

const generateParallelSessions = (ipcRenderer) =>
{
    const dataSet = ipcRenderer.sendSync('parallelSession:get', null);

    const sessionData = generateSessionDetailObjects(ipcRenderer);

    const returnDataObj = [];

    dataSet.forEach((item, index)=>{

        const currentSession1 = item.session1ID !== null && item.session1ID !== '' ?sessionData.filter((i) => i.id === Number(item.session1ID)) : null;
        const currentSession2 = item.session2ID !== null && item.session2ID !== '' ?sessionData.filter((i) => i.id === Number(item.session2ID)) : null;
        const currentSession3 = item.session3ID !== null && item.session3ID !== '' ?sessionData.filter((i) => i.id === Number(item.session3ID)) : null;
        const currentSession4 = item.session4ID !== null && item.session4ID !== '' ?sessionData.filter((i) => i.id === Number(item.session4ID)) : null;
        const currentSession5 = item.session5ID !== null && item.session5ID !== '' ?sessionData.filter((i) => i.id === Number(item.session5ID)) : null;
        const currentSession6 = item.session6ID !== null && item.session6ID !== '' ?sessionData.filter((i) => i.id === Number(item.session6ID)) : null;

        const obj = {
            ...item,
            program: currentSession1[0].groupName,
            Session1Name : currentSession1.length !== 0 ? `${currentSession1[0].subGroup}-${currentSession1[0].subjectName}-${currentSession1[0].lecturerNames}` : '',
            Session2Name : currentSession2.length !== 0 ? `${currentSession2[0].subGroup}-${currentSession2[0].subjectName}-${currentSession2[0].lecturerNames}` : '',
            Session3Name : currentSession3.length !== 0 ? `${currentSession3[0].subGroup}-${currentSession3[0].subjectName}-${currentSession3[0].lecturerNames}` : '',
            Session4Name : currentSession4.length !== 0 ? `${currentSession4[0].subGroup}-${currentSession4[0].subjectName}-${currentSession4[0].lecturerNames}` : '',
            Session5Name : currentSession5.length !== 0 ? `${currentSession5[0].subGroup}-${currentSession5[0].subjectName}-${currentSession5[0].lecturerNames}` : '',
            Session6Name : currentSession6.length !== 0 ? `${currentSession6[0].subGroup}-${currentSession6[0].subjectName}-${currentSession6[0].lecturerNames}` : '',
        }

        returnDataObj.push(obj);
    });
    return returnDataObj;
}

const generateOverlapSessions = (ipcRenderer) =>
{
    const dataSet = ipcRenderer.sendSync('notOverlapSession:get', null);

    const sessionData = generateSessionDetailObjects(ipcRenderer);

    const returnDataObj = [];

    dataSet.forEach((item, index)=>{

        const currentSession1 = item.session1ID !== null && item.session1ID !== '' ?sessionData.filter((i) => i.id === Number(item.session1ID)) : null;
        const currentSession2 = item.session2ID !== null && item.session2ID !== '' ?sessionData.filter((i) => i.id === Number(item.session2ID)) : null;
        const currentSession3 = item.session3ID !== null && item.session3ID !== '' ?sessionData.filter((i) => i.id === Number(item.session3ID)) : null;
        const currentSession4 = item.session4ID !== null && item.session4ID !== '' ?sessionData.filter((i) => i.id === Number(item.session4ID)) : null;
        const currentSession5 = item.session5ID !== null && item.session5ID !== '' ?sessionData.filter((i) => i.id === Number(item.session5ID)) : null;
        const currentSession6 = item.session6ID !== null && item.session6ID !== '' ?sessionData.filter((i) => i.id === Number(item.session6ID)) : null;

        const obj = {
            ...item,
            program: currentSession1[0].groupName,
            Session1Name : currentSession1.length !== 0 ? `${currentSession1[0].subGroup}-${currentSession1[0].subjectName}-${currentSession1[0].lecturerNames}` : '',
            Session2Name : currentSession2.length !== 0 ? `${currentSession2[0].subGroup}-${currentSession2[0].subjectName}-${currentSession2[0].lecturerNames}` : '',
            Session3Name : currentSession3.length !== 0 ? `${currentSession3[0].subGroup}-${currentSession3[0].subjectName}-${currentSession3[0].lecturerNames}` : '',
            Session4Name : currentSession4.length !== 0 ? `${currentSession4[0].subGroup}-${currentSession4[0].subjectName}-${currentSession4[0].lecturerNames}` : '',
            Session5Name : currentSession5.length !== 0 ? `${currentSession5[0].subGroup}-${currentSession5[0].subjectName}-${currentSession5[0].lecturerNames}` : '',
            Session6Name : currentSession6.length !== 0 ? `${currentSession6[0].subGroup}-${currentSession6[0].subjectName}-${currentSession6[0].lecturerNames}` : '',
        }

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

module.exports = {
    jsonHasKeyValFoRDays,
    generateLecturerArray,
    generateTagArray,
    generateSessionDetailObjects,
    generateDayArray,
    generateNotAvailableLectureObjects,
    generateNotAvailableSessionObjects,
    generateNotAvailableSubGroupsObjects,
    generateNotAvailableRoomObjects,
    generateConsecutiveSessions,
    generateParallelSessions,
    generateOverlapSessions,
    validateString,
    isNumber
}