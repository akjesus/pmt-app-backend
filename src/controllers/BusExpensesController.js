//bus expenses controller

const BusExpenses = require('../models/BusExpenseModel');

exports.getAllBusExpenses = async (req, res) => {
    try {
        const {dateFrom, dateTo, vehicleId1, vehicleId2} = req.query;
        const start = new Date(dateFrom);
	      const end = new Date(dateTo);
        end.setHours(23, 59, 59, 999);
        const expenses = await BusExpenses.find({
          vehicleId: { $gte: vehicleId1, $lte: vehicleId2 },
          transDate: { $gte: start, $lte: end },
        })
          .populate("vehicleId", "name")
          .populate("createdBy", "username")
          .sort({ transDate: 1 });
          if(expenses.length === 0) {
            return res.status(200).json({message: "No Expenses for the search criteria", expenses});
          }
        return res.status(200).json({message: "Expenses for bus fetched", expenses});
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching bus expenses', error: error.message });
    }
}

exports.createBusExpense = async (req, res) => {

  try {
    const user = req.user.id;
    const { busId, data, date } = req.body;
    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ message: "No expense items provided" });
    }

    const newExpense = await BusExpenses.create({
      name: busId.split(":")[1],
      vehicleId: busId.split(":")[0],
      expensesItems: data,
      createdBy: user,
      transDate: date,
    });
    res.status(201).json(newExpense);
  } catch (error) {
    console.log("Error creating bus expense:", error);
    res.status(500).json({ message: "Error creating bus expense", error });
  }
};