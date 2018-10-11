const {ObjectID} = require('mongodb');
const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

Todo.findOneAndRemove({_id: '5bbef32f0950f205914fdcbf'}).then((todo) => {

});


Todo.findByIdAndRemove('5bbef32f0950f205914fdcbf').then((todo) => {
    console.log(JSON.stringify(todo, undefined, 2));
});

