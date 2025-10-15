// Bus Expense Routes
const express = require('express');
const router = express.Router();
const BusExpensesController = require('../controllers/BusExpensesController');
const {verifyToken} =  require('../controllers/AuthController');
const {createExpensesItem, getAllExpensesItems} = require('../controllers/ExpensesItemController');


router.use(verifyToken);
router.post("/expense-items/", createExpensesItem);
router.get("/expense-items/", getAllExpensesItems);
router.get('/', BusExpensesController.getAllBusExpenses);
router.post("/", BusExpensesController.createBusExpense);


// Export the router
module.exports = router;
