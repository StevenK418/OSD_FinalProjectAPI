const dotenv = require('dotenv').config(); // this loads env varsconst dotenv
const express = require('express')
const db = require('./database')
const cors = require('cors');
const app = express()
const port = process.env.port
const cars = require('./routes/cars');
const home = require('./routes/home');
const employees = require('./routes/employees');


//Middleware: must precede routes in order to work as expected. 
app.use(express.json());
app.use(express.urlencoded({extended: false})); //Parse URL-encoded bodies

//Add CORS
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  //Pass in the options and call CORS
  app.use(cors(corsOptions));

app.use('/', home);
app.use('/cars', cors(), cars);
app.use('/employees', cors(), employees);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))