const mongoose = require('mongoose');


const CrudSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,    
    },
    number: {
        type: String,
        required: true,
        // unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    hidden: {
        type: Boolean,
        default: true
    }
});
const CrudModel = mongoose.model('records', CrudSchema);

module.exports = CrudModel; 