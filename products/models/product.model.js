const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

let productSchema = new Schema({
    product: {
        type: String,
        required: [true, 'Product is required field'],
        max: 100,
        unique: true,
        trim: true,
        lowercase: true
    },
    cost: {
        type: Number,
        required: [true, 'Cost is required field'],
        max: 100
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        max: 100
    },
    quantity: {
        type: Number,
        required: [true, 'Surname is required field'],
        max: 100
    }
},
    {
    collection: 'products', 
    timestamps: true
    }
);


productSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Product', productSchema)