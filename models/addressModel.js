const mongoose = require('mongoose');

const { Schema } = mongoose;

const addressModel = new Schema(
  {
    userid: { type: String },
    name: { type: String },
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zipcode: { type: String },
    telephone: { type: String },
    email: { type: String },
  }
);

module.exports = mongoose.model('Address', addressModel);