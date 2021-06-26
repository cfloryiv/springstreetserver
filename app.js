const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors=require('cors');

const app = express();

if (process.env.ENV === 'Test') {
  console.log('This is a test');
  const db = mongoose.connect('mongodb://localhost/bookAPI_Test');
} else {
  console.log('This is for real');
  const db = mongoose.connect('mongodb://localhost/bookAPI');
}


const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);
const Inventory = require('./models/inventoryModel');
const inventoryRouter = require('./routes/inventoryRouter')(Inventory);
const Appt = require('./models/apptModel');

const Address = require('./models/addressModel');
const Procedure=require('./models/procedureModel');
const Insurance=require('./models/insuranceModel');
const apptRouter = require('./routes/apptRouter')({Appt, Address, Procedure, Insurance});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api', bookRouter);
app.use('/homeapi', inventoryRouter);
app.use('/api/dental', apptRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my Nodemon API!');
});

app.server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = app;
