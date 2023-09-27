require("dotenv").config();
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const auth = require('./routes/auth');
// const employee = require('./routes/employee');
const project = require('./routes/project');
const user = require('./routes/user');
const group = require('./routes/group');
const organization = require('./routes/organization');
const connectMongoDB = require('./db/connection');
const port = process.env.DEV_PORT || 5000;
const app = express();
// const allowedOrigins = ["115.79.199.129"]

//DB Connection
const connectionURL = process.env.HOST + process.env.DB;
connectMongoDB(connectionURL).then(()=>{
    console.log("mongoDb Connected");
}).catch((err)=>{
    console.log(err);
});

// app.use(cors({
//     origin: function(origin, callback){
//       if (!origin) {
//         return callback(null, true);
//       }
  
//       if (allowedOrigins.includes(origin)) {
//         const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     }
  
//   }));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/public', express.static('public'));

app.use((req, res, next) => {
    // res.setHeader("Access-Control-Allow-Private-Network", "true")
    res.set("Access-Control-Allow-Private-Network", "true");
    next();
})
app.use(cors());

app.use(express.json());
auth.use(require("cors")({credentials: true}))
project.use(require("cors")({credentials: true}))
user.use(require("cors")({credentials: true}))
group.use(require("cors")({credentials: true}))
organization.use(require("cors")({credentials: true}))
app.use('/api/v1/auth',auth);
app.use('/api/v1/project',project);
app.use('/api/v1/user',user);
app.use('/api/v1/group',group);
app.use('/api/v1/organization', organization);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port,()=>{
    console.log(`server started at ${port}`);
})