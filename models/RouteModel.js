//create a model for routes 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RouteSchema = new Schema(
  {
    origin: { type: Schema.Types.ObjectId, ref: "Town", required: true },
    arriving: { type: Schema.Types.ObjectId, ref: "Town", required: true },
    desc: { type: String, required: true, unique: true },
    active: {type: Boolean, required: true},
    fare: {
      type: Schema.Types.ObjectId,
      ref: "Fare",
    },
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Route", RouteSchema);

