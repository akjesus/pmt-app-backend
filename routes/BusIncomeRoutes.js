//loading information controller
const express = require('express');
const router = express.Router();
const LoadingInfoController = require('../controllers/BusIncomeController');
const {verifyToken} = require('../controllers/AuthController')


// Define routes for loading information
router.post('/', verifyToken, LoadingInfoController.createLoadingInfo);
router.get('/', LoadingInfoController.getAllLoadingInfo);
// router.get('/:id', LoadingInfoController.getLoadingInfoById);
// router.put('/:id', LoadingInfoController.updateLoadingInfo);
// router.delete('/:id', LoadingInfoController.deleteLoadingInfo);
// router.get('/vehicle/:vehicleId', LoadingInfoController.getLoadingInfoByVehicleId);
// router.get('/route/:routeId', LoadingInfoController.getLoadingInfoByRouteId);
// router.get('/date/:date', LoadingInfoController.getLoadingInfoByDate);
// router.get('/vehicle/:vehicleId/date/:date', LoadingInfoController.getLoadingInfoByVehicleAndDate);
// router.get('/route/:routeId/date/:date', LoadingInfoController.getLoadingInfoByRouteAndDate);

// Export the router
module.exports = router;
