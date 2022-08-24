
// //require the library 
const mongoose=require('mongoose');

//connect to the database
mongoose.connect('mongodb://localhost/contacts_list_db');

//define database acquire the connection (to check if it is successful)
const db=mongoose.connection;

//error if the error find when connecting to db then this message is shown 
db.on('error',console.error.bind(console,'error connecting to db'));

//up and running then print the message 
db.once('open',function(){
    console.log('successfully connected to the database');
});

// const mongoose = require('mongoose');

// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://localhost/contacts_list_db');
// }