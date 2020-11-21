const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    director_id : Schema.Types.ObjectId,
    title:{
        type: String,
    },
    content: {
        type: String,
    },
    category: {
        type: String,
    },
    year:{
        type: Number,
    },
    imdb: {
        type:Number
    }
});
module.exports = mongoose.model('movie',MovieSchema);