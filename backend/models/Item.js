import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    desc : {
        type : String
    },
    owner : {
        type : mongoose.Types.ObjectId,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    finder : {
        type : mongoose.Types.ObjectId,
        default : null
    }
}, {timestamps : true})

const Item = mongoose.model('Item', itemSchema);
export default Item;