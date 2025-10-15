// create a router for routes and fares 
const express = require("express");
const router = express.Router();
const RouteFareController = require("../controllers/RouteFareController");


//get all fares 
router.get("/fares", RouteFareController.getAllFares);
// Create a new fare for a route
router.post("/fares", RouteFareController.createFare);
// Get fare by route ID
router.get("/fares/:routeId", RouteFareController.getFareByRouteId);
// Update fare by ID
// router.put("/fares/:fareId", RouteFareController.updateFare);
// Delete fare by ID
// router.delete("/fares/:fareId", RouteFareController.deleteFare);



// Create a new route
router.post("/", RouteFareController.createRoute);
router.get("/", RouteFareController.getAllRoutes);


module.exports = router;