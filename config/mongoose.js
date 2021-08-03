const mongoose = require('mongoose');
const env = require('./environment');

mongoose.connect(`mongodb://localhost/${env.db}` , {
    useNewUrlParser: true,
    useUnifiedTopology : true
});

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error in connecting to database'));

db.once('open', function(){
    console.log('sucessfully connected');
});