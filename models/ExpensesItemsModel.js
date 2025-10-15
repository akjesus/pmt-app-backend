const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpensesItemsSchema = new Schema({
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
        required: true,
        default: 1
    }
}, {
    timestamps: true
});


module.exports = mongoose.model("ExpensesItems", ExpensesItemsSchema);