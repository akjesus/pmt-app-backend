const ExpensesItems = require("../models/ExpensesItemsModel");
const BusExpense = require("../models/BusExpenseModel");

//get all expense items 
exports.getAllExpensesItems = async (req, res) => {
    try {
        const items = await ExpensesItems.find();
        res.status(200).json({message: "Items fetched successfully", items});
    } catch (error) {
        res.status(500).json({ message: "Error fetching expense items" });
    }
};

//create a new expense item
exports.createExpensesItem = async (req, res) => {
    try {
        const { name, amount, quantity } = req.body.data;
        const newItem = new ExpensesItems({ name, amount, quantity });
        await newItem.save();
        res.status(201).json({ message: "Expense item created successfully", data: newItem });
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error creating expense item" });
    }
};

//update an expense item
exports.updateExpensesItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, amount, quantity } = req.body;
        const updatedItem = await ExpensesItems.findByIdAndUpdate
            (id, { name, amount, quantity }, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ message: "Expense item not found" });
        }
        res.status(200).json({ message: "Expense item updated successfully", data: updatedItem });
    } catch (error) {
        res.status(500).json({ message: "Error updating expense item" });
    }
};
//delete an expense item
exports.deleteExpensesItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await ExpensesItems.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).json({ message: "Expense item not found" });
        }
        res.status(200).json({ message: "Expense item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting expense item" });
    }
}
//add an expense item to a vehicle's expenses
exports.addExpenseItemToVehicle = async (req, res) => {
    try {
        const { vehicleId, itemId } = req.params;
        const vehicle = await BusExpense.findById(vehicleId);
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        const item = await ExpensesItems.findById(itemId);
        if (!item) {
            return res.status(404).json({ message: "Expense item not found" });
        }
        vehicle.expenses.push(item);
        await vehicle.save();
        res.status(200).json({ message: "Expense item added to vehicle successfully", data: vehicle });
    }
    catch (error) {
        res.status(500).json({ message: "Error adding expense item to vehicle" });
    }   
};