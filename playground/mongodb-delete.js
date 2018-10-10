const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server', err)
    }

    console.log('Conntected to MongoDB server.');
    const db =  client.db('TodoApp');

    db.collection('todos').deleteMany({
        text: 'Something to do',
        completed: false
    }.then((result) => {
        console.log(result);
    }));

    db.collection('todos').deleteOne({
        text: 'Something to do'
    }).then((result) => {
        console.log(result);
    });

    db.collection('todos').findOneAndDelete({
        completed: false
    }).then((result) => {
        console.log(result);
    })

    client.close();
});