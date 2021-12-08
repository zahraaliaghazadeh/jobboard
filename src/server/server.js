const express = require('express');
const jobboard = require('./routes/controller');
const cors = require('cors')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const MongoStore = require('connect-mongo');
const path = require('path');


const PORT = 8000;

//Setup MongoDB Connection
const MONGO_DB_URL = 'mongodb+srv://admin:admin@cluster0.yvhvj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

require('dotenv').config()

mongoose.connect(
  MONGO_DB_URL,
  { useNewUrlParser: true }
)

const mongoDB = mongoose.connection;

mongoDB.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

const app = express();

app.use(session({secret: process.env.SUPER_SECRET,
  store: MongoStore.create({ mongoUrl: MONGO_DB_URL }),
}));
// app.use(cors({credentials: true, origin: '*'}));
app.use(cors({
  methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
  credentials: true,
  origin: 'http://localhost:3000'
}));
// app.use(cors({credentials: true}));
// app.use(cors());
// app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/jobboard', jobboard);
// Note that it is common practice got backend APIs in Node to start with the api prefix
// to distinguish them from frontend routes

// app.get('/', (req, res) => {
//   res.send('NOT BANANA!');
// });


// app.use(express.static(path.join(__dirname, 'build')));

// app.get('*', function (req, res) {
//   console.log("received request");
//   res.sendFile(path.join(__dirname, "../../build", "index.html"));
//   // res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.listen(PORT, function() {
  console.log(`Starting server: ${PORT}`);
});