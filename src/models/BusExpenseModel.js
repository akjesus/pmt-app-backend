//create a model for bus expenses
const mongoose = require('mongoose');
const BusExpenseSchema = new mongoose.Schema({
    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true
    },
    name: {
        type: Number,
        required: true
    },
    transDate: {
        type: Date,
        required: true
    },
    expensesItems: [{
            name: {
                type: String,
                required: true
            },
            amount: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {                
    timestamps: true
});
// Create the model
const BusExpense = mongoose.model('BusExpense', BusExpenseSchema);
// Export the model
module.exports = BusExpense;