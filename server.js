const express = require('express');
const jobboard = require('./src/server/routes/controller');
const cors = require('cors')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const MongoStore = require('connect-mongo');
const path = require('path');


const PORT = 8000;

//Setup MongoDB Connection
const MONGO_DB_URL = 'mongodb+srv://admin:admin@cluster0.klxah.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

require('dotenv').config()

mongoose.connect(
  MONGO_DB_URL,
  { useNewUrlParser: true }
)

const mongoDB = mongoose.connection;

mongoDB.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

const app = express();

app.use(session({secret: "my_secret_ssshhhhh_1234567890",
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


app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function (req, res) {
  console.log("received request");
  res.sendFile(path.join(__dirname, "build", "index.html"));
  // res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(process.env.PORT || 8000 , function() {
  console.log(`Starting server: ${PORT}`);
});