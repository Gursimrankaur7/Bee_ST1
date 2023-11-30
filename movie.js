const mongoose = require('mongoose');
const schema = mongoose.Schema
const movieSchema = new schema({
    Title: {
        type:String,
        required:true
    },
    Description: {
        type:String,
        required:true
    },
    Genre: {
        type:String,
        required:true
    },
    ReleaseYear: {
        type: Number,
        required:true
    }
})

module.exports = mongoose.model("movie", movieSchema);
