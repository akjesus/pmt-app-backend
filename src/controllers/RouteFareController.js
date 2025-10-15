//create a controller to handle route fare operations
const Fare = require("../models/FareModel");
const Route = require("../models/RouteModel");

//create a new route
exports.createRoute = async (req, res) => {
    try {
        const {active} = req.body;
        const origin = req.body.origin.split(":")[0];
        const arriving = req.body.arriving.split(":")[0]
        const desc = `${req.body.origin.split(":")[1]} => ${req.body.arriving.split(":")[1]}`;
        const existingRoute = await Route.findOne({ desc });
        if (existingRoute) {
            return res.status(409).json({ message: "Route already exists" });
        }
        // Create a new route
        const route = new Route({
            origin, arriving, desc, active
        });
        await route.save();
        res.status(201).json(route);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get all routes
exports.getAllRoutes = async (req, res) => {
    try {
        const routes = await Route.find().populate("fare", "fareAmount");
        res.status(200).json(routes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// Get route by ID
exports.getRouteById = async (req, res) => {
    try {
        const { routeId } = req.params;
        const route = await Route.findById(routeId).populate("fare");
        if (!route) {
            return res.status(404).json({ message: "Route not found" });
        }
        res.status(200).json(route);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// Update route by ID
exports.updateRoute = async (req, res) => {
    try {
        const { routeId } = req.params;
        const { desc } = req.body;

        // Find route by ID
        const route = await Route.findById(routeId);
        if (!route) {
            return res.status(404).json({ message: "Route not found" });
        }

        // Update route description
        route.desc = desc;
        await route.save();

        res.status(200).json(route);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// Delete route by ID and remove associated fare
exports.deleteRoute = async (req, res) => {
    try {
        const { routeId } = req.params;

        // Find route by ID
        const route = await Route.findById(routeId);
        if (!route) {
            return res.status(404).json({ message: "Route not found" });
        }

        // Delete associated fare if exists
        if (route.fare) {
            await Fare.findByIdAndDelete(route.fare);
        }

        // Delete route
        await route.remove();

        res.status(200).json({ message: "Route deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//get all fares 
exports.getAllFares = async (req, res) => {
    try {
        const fares = await Fare.find().populate("routeId", "desc");
        res.status(200).json(fares);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Create a new fare for a route
exports.createFare = async (req, res) => {
    try {
        const { route, fareAmount, feeding, routeFuel } = req.body.data;   
        // Check if the route exists
        const routeExists = await Route.findById(route);
        if (!routeExists) {
        return res.status(404).json({ message: "Route not found" });
        }
    
        // Create a new fare
        const fare = new Fare({
        routeId: route,
        fareAmount,
        feeding,
        routeFuel
        });
    
        await fare.save();
        res.status(201).json({fare});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    }

// Get fare by route ID
exports.getFareByRouteId = async (req, res) => {
    try {
        const { routeId } = req.params;
    
        // Find fare by route ID
        const fare = await Fare
            .findOne({ routeId });
        if (!fare) {
            return res.status(404).json({ message: "Fare not found for this route" });
        }
        res.status(200).json(fare);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update fare by ID
exports.updateFare = async (req, res) => {
    try {
        const { fareId } = req.params;
        const { fareAmount } = req.body;
    
        // Find fare by ID
        const fare = await Fare.findById(fareId);
        if (!fare) {
            return res.status(404).json({ message: "Fare not found" });
        }
    
        // Update fare amount
        fare.fareAmount = fareAmount;
        await fare.save();
    
        res.status(200).json(fare);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// Delete fare by ID
exports.deleteFare = async (req, res) => {
    try {
        const { fareId } = req.params;
    
        // Find fare by ID
        const fare = await Fare.findById(fareId);
        if (!fare) {
            return res.status(404).json({ message: "Fare not found" });
        }
    
        // Delete fare
        await fare.remove();
    
        res.status(200).json({ message: "Fare deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
