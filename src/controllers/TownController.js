const Town = require("../models/TownModel");


// Create a new town
exports.createTown = async (req, res) => {
    try {
        const town = new Town(req.body);
        await town.save();
        res.status(201).json(town);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// Get all towns
exports.getTowns = async (req, res) => {
    try {
        const towns = await Town.find();
        res.status(200).json(towns);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTown = async (req, res) => {
    try {
        const town = await Town.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!town) {
            return res.status(404).json({ message: "Town not found" });
        }
        res.status(200).json(town);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// Delete a town
exports.deleteTown = async (req, res) => {
    try {
        const town = await Town.findByIdAndDelete(req.params.id);
        if (!town) {
            return res.status(404).json({ message: "Town not found" });
        }
        res.status(200).json({ message: "Town deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
