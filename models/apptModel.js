const mongoose=require('mongoose');

const { Schema } = mongoose;

const apptModel=new Schema(
    {
        date: { type: String},
        time: { type: String},
        name: { type: String},
        empid: { type: String},
        userid: {type: String},
    }
);

module.exports=mongoose.model('Appt', apptModel);