const mongoose = require("mongoose");

const { Schema } = mongoose;

const insuranceModel = new Schema({
  name: { type: String },
  policies: [
     {
      code: { type: String },
      percent: { type: Number },
      deduct: { type: Number },
      max: { type: Number },
    },
  ],
});

module.exports = mongoose.model("Insurance", insuranceModel);
