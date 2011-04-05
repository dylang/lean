function url(s) {
    if (!s || typeof s != 'string' || !s.length) {
        return s;
    }
    s = s.replace(/[^a-zA-Z0-9\s]/g, '').trim().replace(/\s+/g, '-').toLowerCase();
    return s;
}

function forEach(object, fn) {
    var keys = Object.keys(object);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (fn(object[key], key, i) === false) {
            break;
        }
    }
}


module.exports.url = url;
module.exports.forEach = forEach;