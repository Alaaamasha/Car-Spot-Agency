const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    price: { 
        type: Number,
        required: true
    },
    publish_date: { 
        type: Date,
        required: false
    }
})

const Vehicle = mongoose.model('Vehicle',VehicleSchema)
module.exports = {Vehicle}