//create a model for routes 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FareSchema = new Schema(
  {
    routeId: {
      type: Schema.Types.ObjectId,
      ref: "Route",
      required: true,
    },
    fareAmount: {
      type: Number,
      required: true,
    },
    routeFuel: {
      type: Number,
      required: true,
    },
    feeding: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Fare", FareSchema);