/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const mongoose = require("mongoose");

const Bill = require("../models/billModel");
const Procedure = require("../models/procedureModel");
const Address = require("../models/addressModel");

const db = mongoose.connect("mongodb://localhost/bookAPI");

async function getBills() {
  const query = { userid: "cfloryiv" };
  return await Bill.find(query).sort("date").exec();
}
async function getProcedure(code) {
  return await Procedure.findOne({ code: code })
    .exec()
    .then((proc) => {
      return proc._doc;
    });
}
async function getAddress(empid) {
  return Address.findOne({ userid: empid })
    .exec()
    .then((addr) => {
      return addr._doc;
    });
}

function buildBills() {
  const newBills=[];
  getBills().then((doc) => {
    
    doc.forEach((temp) => {
      const bill = temp._doc;
      (async () => {
        // lookup the doctors name
        const { empid } = bill;
        const doctor = await getAddress(empid);
        // lookup the procedure name
        const { code } = bill;
        const procedure = await getProcedure(code);
        const { name } = doctor;
        const { desc } = procedure;
        const newBill = { name, desc, ...bill };
        newBills.push(JSON.stringify(newBill));
      })();
    });
  });
  console.log(newBills);
}
buildBills();
