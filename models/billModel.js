const mongoose = require('mongoose');

const { Schema } = mongoose;

const billModel = new Schema(
  {
    userid: { type: String },
    empid: { type: String },
    code: { type: String },
    insurance: { type: String },
    cost: { type: Number },
    insurance_portion: { type: Number },
    patient_portion: { type: Number },
    balance: { type: Number },
    date: { type: String },
  }
);

module.exports = mongoose.model('Bill', billModel);