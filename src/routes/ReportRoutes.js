//create a report route
const express = require('express');
const router = express.Router()


const { busPerformance } = require("../controllers/ReportsController");

router.get('/bus-performance', busPerformance)

module.exports = router;