require('dotenv').config();
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
const { getAllProjects } = require('./controller/project');
const port = process.env.DEV_PORT || 5000;
const app = express();

//DB Connection
const connectionURL = process.env.HOST + process.env.DB;
connectMongoDB(connectionURL)
  .then(() => {
    console.log('mongoDb Connected');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/public', express.static('public'));
app.use(cors());

app.use(express.json());

app.use('/api/v1/auth', auth);
// app.use('/employee',employee);
app.use('/api/v1/project', project);
app.use('/api/v1/user', user);
app.use('/api/v1/group', group);
app.use('/api/v1/organization', organization);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`server started at ${port}`);
});
