
const obj = {
    timeTableType: 1
};
const objProx = new Proxy(obj, {
    get(obj, prop) {
        //console.log('On obj', obj, 'getting', prop);
        return obj[prop];
    },
    set(obj, prop, newVal) {
        //console.log('On obj', obj, 'setting', prop, 'to', newVal);
        return obj[prop] = newVal;
    },
});

module.exports = { objProx }