const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
    name:{
        type:String,
    },
    lastName:{
        type:String,
    },
    birthOfYear:{
        type:Number,
    },
    biography:{
        type:String,
    }
});
module.exports = mongoose.model('director',DirectorSchema);