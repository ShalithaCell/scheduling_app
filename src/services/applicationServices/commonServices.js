const jsonHasKeyVal = (json, keyname, value) =>
    Object.keys(json).some(key =>
        typeof json[key] === 'object' ?
            jsonHasKeyVal(json[key], keyname, value) :
            key === keyname && json[key] === value
    );

module.exports = { jsonHasKeyVal }