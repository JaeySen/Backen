require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('./routes/auth');
const employee = require('./routes/employee');
const connectMongoDB = require('./db/connection');
const port = process.env.DEV_PORT || 5000;
const app = express();


//DB Connection
const connectionURL = process.env.HOST + process.env.DB;
connectMongoDB(connectionURL).then(()=>{
    console.log("mongoDb Connected");
}).catch((err)=>{
    console.log(err);
});


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/public', express.static('public'));
app.use(cors());

app.use(express.json());
app.use('/auth',auth);
app.use('/employee',employee);

app.listen(port,()=>{
    console.log(`server started at ${port}`);
})