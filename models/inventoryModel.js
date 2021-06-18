const mongoose=require('mongoose');

const { Schema } = mongoose;

const inventoryModel=new Schema(
    {
        desc: { type: String},
        cls: {type: String},
        subtype: { type: String},
        qty: { type: Number},
        cost: { type: Number},
        status: { type: String},
    }
);

module.exports=mongoose.model('Inventory', inventoryModel);