//create a model for bus income
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BusIncomeSchema = new Schema(
  {
    vehicleId: {
      type: Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    name: {
      type: Number,
      required: true,
    },
    transDate: {
      type: Date,
      default: Date.now,
    },
    income: {
      type: Number,
      required: true,
    },
    routeId: {
      type: Schema.Types.ObjectId,
      ref: "Route",
      required: true,
    },
    fare: {
      type: Number,
      required: true,
    },
    fuel: {
      type: Number,
      required: true,
    },
    passengers: {
      type: Number,
      required: true,
    },
    feeding: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("BusIncome", BusIncomeSchema);