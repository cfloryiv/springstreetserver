const mongoose=require('mongoose');

const { Schema } = mongoose;

const procedureModel=new Schema(
    {
        code: { type: String},
        desc: { type: String},
        cost: { type: Number},
        length: { type: Number},
    }
);

module.exports=mongoose.model('Procedure', procedureModel);