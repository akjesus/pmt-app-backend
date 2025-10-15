//create a full vehicle controller
const Vehicle = require("../models/VehiclesModel");

    // Create a new vehicle 
exports.createVehicle = async (req, res) => {

        try {
            const { name, regNo, chasisNo, vehiclemake, plateNo} = req.body;
            const newVehicle = new Vehicle({
              name,
              chasisNo,
              vehiclemake,
              regNo,
              plateNo,
            });
            await newVehicle.save();
            res.status(201).json({ message: "Vehicle created successfully", vehicle: newVehicle });
        } catch (error) {
            res.status(500).json({ message: "Error creating vehicle", error: error.message });
        }
    }

exports.bulkcreateVehicle = async (req, res) => {
    const { vehicles } = req.body;
    console.log(req.body)
    if(!vehicles) return res.status(400).json({error: "No vehicles in request!"})
  try {
    const promises = vehicles.map((vehicle) => new Vehicle(vehicle).save());
    const result = await Promise.all(promises);
    console.log(`Vehicles saved successfully: ${result.length}`);
    return res.status(201).json({success: true, message : `${result.length} vehicles created`});
  } catch (error) {
    console.error(`Error saving vehicles: ${error.message}`);
    return res.status(400).json({error: error});
  }

};
    // Get all vehicles
exports.getAllVehicles = async (req, res) => {
        try {
            const vehicles = await Vehicle.find()
            .sort('name');
            res.status(200).json({ vehicles });
        } catch (error) {
            res.status(500).json({ message: "Error retrieving vehicles", error: error.message });
        }
    }
    // Get a vehicle by ID
exports.getVehicleById = async (req, res) => {
        try {
            const vehicle = await Vehicle.findOne({ vehicleId: req.params.id });
            if (!vehicle) {
                return res.status(404).json({ message: "Vehicle not found" });
            }
            res.status(200).json({ message: "Vehicle retrieved successfully", vehicle });
        } catch (error) {
            res.status(500).json({ message: "Error retrieving vehicle", error: error.message });
        }
    }
    // Update a vehicle by ID
exports.updateVehicleById = async (req, res) => {
        try {
            const { name, make, model, year, regNo, plateNo, mileage, price } = req.body;
            const updatedVehicle = await Vehicle.findOneAndUpdate(
              { _id: req.params.id },
              { name, make, model, year, regNo, plateNo, mileage, price },
              { new: true }
            );
            if (!updatedVehicle) {
                return res.status(404).json({ message: "Vehicle not found" });
            }
            res.status(200).json({ message: "Vehicle updated successfully", vehicle: updatedVehicle });
        } catch (error) {
            res.status(500).json({ message: "Error updating vehicle", error: error.message });
        }
    }
    // Delete a vehicle by ID
exports.deleteVehicleById = async (req, res) => {
        try {
            const deletedVehicle = await Vehicle.findOneAndDelete({ vehicleId: req.params.id });
            if (!deletedVehicle) {
                return res.status(404).json({ message: "Vehicle not found" });
            }
            res.status(200).json({ message: "Vehicle deleted successfully", vehicle: deletedVehicle });
        } catch (error) {
            res.status(500).json({ message: "Error deleting vehicle", error: error.message });
        }
    }   
