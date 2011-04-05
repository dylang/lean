# Lean

  An in-memory data store with a simple API.
  For when Couch and other nosql solutions are way more than you need.


## API
    var Lean = reqire('lean');

    var DB = new Lean();

    DB.set('a.b', { c: 1, d: 2 });

    var size = DB.length; // 1

    var value = DB.get('a.b');

    DB.forEach(function(data, id, i) {
        console.log(id);
    });

    // Query looks for all keys with that value
    // If more than one key is provided it is an AND search
    var rockandroll = DB.query({ sex: true, drugs: true });

    //Express templating prefers data in arrays
    var array = DB.toArray();

## Built-in Test

    $ nodenunit test
