var log = require('logging').from(__filename),
    Util = require('./util');

var Lean = exports.Lean = function(clone) {
    if (!(this instanceof Lean)) return new Lean(clone);

    this._data = {};
    this._urls = {};


    if (clone) {
        var new_lean = this;
        clone.forEach(function(key, value) {
            new_lean.set(key, value);
        });
    }

};

Lean.Lean = Lean;
module.exports = Lean;

Lean.prototype.set = function(key, val) {
    if (val === undefined) {
        delete this._data[key];
        delete this._urls[Util.url(key)];
    } else {
        this._data[key] = val;
        this._urls[Util.url(key)] = key;
    }
};

Lean.prototype.get = function(key) {
    return this._data[key];
};

Lean.prototype.url = function(url) {
    return this.get(this._urls[url]);
};

Lean.prototype.rm = function(key, cb) {
    this.set(key, undefined, cb);
};

Lean.prototype.__defineGetter__('length', function() {
    return this.keys.length;
});

Lean.prototype.__defineGetter__('keys', function() {
    return Object.keys(this._data);
});


Lean.prototype.forEach = function(fn) {
    Util.forEach(this._data, fn);
};

Lean.prototype.query = function(query) {
    var result_db = new Lean(),
        query_array = [];

    Util.forEach(query,function(value, key){
        query_array.push({key: key, value: value});
    });

    this.forEach(function(data, id) {
        var found = true;
        for (var i = 0; i < query_array.length; i++) {
            if (data[query_array[i].key] != query_array[i].value) {
                found = false;
            }
        }

        if (found) {
            result_db.set(id, data);
        }
    });

    return result_db;
};

Lean.prototype.toArray = function () {
    var out = [];
    Util.forEach(this._data, function(value, key) {
        out.push(value);
    });
    return out;
};