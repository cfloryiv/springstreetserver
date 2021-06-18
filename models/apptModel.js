const mongoose=require('mongoose');

const { Schema } = mongoose;

const apptModel=new Schema(
    {
        date: { type: String},
        time: { type: String},
        name: { type: String},
    }
);

module.exports=mongoose.model('Appt', apptModel);