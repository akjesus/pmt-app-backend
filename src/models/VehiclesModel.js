//create a model for vehicles
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
  name: { type: Number, required: true, unique: true },
  vehiclemake: { type: String, required: true },
  regNo: { type: String, required: true, unique: true },
  chasisNo: { type: String, required: true, unique: true },
  plateNo: { type: String, required: true, unique: true },
  price: { type: Number},
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Vehicle", VehicleSchema);