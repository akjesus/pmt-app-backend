// create a vehicle router 
const express = require("express");
const router = express.Router();
const VehicleController = require("../controllers/VehicleController");

// Create a new vehicle
router.post("/", VehicleController.createVehicle);
router.post("/bulk", VehicleController.bulkcreateVehicle);
router.get("/", VehicleController.getAllVehicles);
router.get("/:id", VehicleController.getVehicleById);
router.put("/:id", VehicleController.updateVehicleById);
router.delete("/:id", VehicleController.deleteVehicleById);


module.exports = router;