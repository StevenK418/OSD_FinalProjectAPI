const mongoose = require('mongoose')

//const connectionString = 'mongodb+srv://osd_Admin:therionABRAXAS93@cluster0.ngkb6n6.mongodb.net/sample_mflix?retryWrites=true&w=majority'
//const connectionString = 'mongodb://127.0.0.1:27017/web2_2022'
const connectionString = process.env.connection_String

mongoose.connect(connectionString, {"useNewURLParser":true,"useUnifiedTopology": true})
.catch (error => {
    console.log(`Database connection refused ${error}`);
    process.exit(2);
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => 
{
  console.log("DB connected")
});



