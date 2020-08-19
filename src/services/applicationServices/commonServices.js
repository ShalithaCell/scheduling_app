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

module.exports = { jsonHasKeyValFoRDays }