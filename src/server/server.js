const express = require('express');
const jobboard = require('./routes/jobboard.js');
const cors = require('cors')
const mongoose = require('mongoose');


const PORT = 8000;

//Setup MongoDB Connection
mongoose.connect(
  'mongodb+srv://admin:admin@cluster0.yvhvj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true }
)

const mongoDB = mongoose.connection;

mongoDB.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/jobboard', jobboard);
// Note that it is common practice got backend APIs in Node to start with the api prefix
// to distinguish them from frontend routes

app.get('/', (req, res) => {
  res.send('NOT BANANA!');
});

app.listen(PORT, function() {
  console.log(`Starting server: ${PORT}`);
});