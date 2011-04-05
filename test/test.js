/*
To run test:

nodeunit test
 */
var Lean = require('../index');

var DB;

module.exports = {
    DB: function(test) {

        DB = new Lean();
        test.ok(DB);
        test.done();
    },
    set_get: function(test) {
        DB.set('a', 'apple');
        DB.set(1, 'pear');
        DB.set('this.test', 'this is a test');
        DB.set('ob-1', {a: 1});

        test.equal(DB.get('a'), 'apple');
        test.equal(DB.get(1), 'pear');
        test.equal(DB.get('this.test'), 'this is a test');
        test.deepEqual(DB.get('ob-1'), {a: 1});

        test.done();
    },

    length: function(test) {
        test.equal(DB.length, 4);
        test.done();
    },

    query: function(test) {
        DB.set('ob-1', {a: 1});
        DB.set('ob-2', {a: 2});
        DB.set('ob-3', {a: 3, b:1});
        DB.set('ob-4', {b: 1});


        var out = DB.query({ a: 1 });
        test.equal(out.length, 1);
        out.forEach(function(data, id) {
            test.equal(id, 'ob-1');
            test.deepEqual(data, {a: 1});

        });

        var out2 = DB.query({ a: 3, b: 1 });
        test.equal(out2.length, 1);


        test.done();
    },

    array: function(test) {
        var array = DB.toArray();

        test.ok(array);
        test.equal(array.length, 7);


        var results = DB.query({ b: 1});

        test.ok(results);
        test.equal(results.length, 2);

        test.done();
    }
};