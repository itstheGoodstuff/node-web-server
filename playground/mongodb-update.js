const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err) {
        return console.log('Unable to connect to MongoDB', err);
    }

    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    db.collection('users').findOneAndUpdate({
        name: 'Gustav'
    }, {
        $set: {
            name: 'Gustaf'
        },
        $inc: {
            age: -1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    // client.close();
});