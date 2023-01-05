const mongoose = require('mongoose');

const { Schema } = mongoose;

const customerSchema = new Schema( {
    name: { type: String, required: true },
    email: { type: String, required: true }
} )

const Customer = mongoose.model('customer', customerSchema);


module.exports = Customer;