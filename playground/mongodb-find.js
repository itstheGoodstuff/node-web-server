const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err) {
        return console.log('Unable to connect to MonngoDB server', err);
    }

    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    db.collection('todos').find({
        _id: new ObjectID('5bbdc133210e8405b12a7f87')
    }).toArray().then((docs) => {
        console.log('todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });

    db.collection('todos').find().count().then((count) => {
        console.log(`Todos count: ${count}`);
    }, (err) => {
        console.log('Unable to fetch todos and count', err);
    });

    db.collection('users').find({
        name: 'Gustaf'
    }).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    });
});