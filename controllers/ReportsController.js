const BusExpenses = require('../models/BusExpenseModel')
const BusIncome = require('../models/BusIncomeModel')



exports.busPerformance = async (req, res) => {
    const { vehicleFrom, vehicleTo, dateFrom, dateTo } = req.query.data
    if (!vehicleFrom || !vehicleTo || !dateFrom || !dateTo) {
        return res.status(400).json({ error: "Invalid PMT or Date Range" });
    }
    try {
        const vehicleFromNum = parseInt(vehicleFrom.split(":")[0]);
        const vehicleToNum = parseInt(vehicleTo.split(":")[0]);
        const start = new Date(dateFrom);
        const end = new Date(dateTo);
        end.setHours(23, 59, 59, 999);
        // Income aggregation
        const incomePipeline = [
          {
            $match: {
              name: { $gte: vehicleFromNum, $lte: vehicleToNum },
              transDate: { $gte: start, $lte: end },
            },
          },
          {
            $group: {
              _id: "$name",
              totalIncome: { $sum: "$income" },
              passengers: { $sum: "$passengers" },
              fuel: { $sum: "$fuel" },
              feeding: { $sum: "$feeding" },
            },
          },
        ];
        const incomeResult = await BusIncome.aggregate(incomePipeline);
        // Expenses aggregation
        const expensePipeline = [
            {
                $match: {
                    name: { $gte: vehicleFromNum, $lte: vehicleToNum },
                    transDate: { $gte: start, $lte: end },
                },
            },
            {
                $group: {
                    _id: "$name",
                    maintenance: {
                        $sum: {
                            $sum: {
                                $map: {
                                    input: "$expensesItems",
                                    as: "item",
                                    in: { $multiply: ["$$item.amount", "$$item.quantity"] }
                                }
                            }
                        }
                    },
                },
            },
        ];
        const expenseResult = await BusExpenses.aggregate(expensePipeline);
        // Merge results by bus name
        const report = {};
        incomeResult.forEach(i => {
            report[i._id] = { totalIncome: i.totalIncome, fuel: i.fuel, feeding: i.feeding, passengers: i.passengers };
        });
        expenseResult.forEach(e => {
            if (!report[e._id]) report[e._id] = { totalIncome: 0, maintenance: 0, passengers: 0 };
            report[e._id].maintenance = e.maintenance;
        });
        // Add net income
        Object.keys(report).forEach(bus => {
            const totalIncome = parseFloat(report[bus].totalIncome);
            const fuel = parseFloat(report[bus].fuel) || 0;
            const feeding = parseFloat(report[bus].feeding) || 0;
            const maintenance = parseFloat(report[bus].maintenance) || 0;

            if (report[bus].maintenance) {
                report[bus].totalExpenses = maintenance + fuel + feeding;
            } else {
                report[bus].totalExpenses = fuel + feeding;
            }

            // If totalIncome is 0, netIncome should be negative (expenses only)
            if (totalIncome === 0) {
                report[bus].netIncome = -report[bus].totalExpenses;
            } else {
                report[bus].netIncome = totalIncome - report[bus].totalExpenses;
            }
            
        });

        // Convert report object to array
        let resultArray = Object.entries(report).map(([bus, data]) => ({ bus, ...data }));

        // Order by highest netIncome
        resultArray = resultArray.sort((a, b) => b.netIncome - a.netIncome);

        // Calculate totals for all fields
        const totals = resultArray.reduce(
          (acc, row) => {
            acc.totalIncome += parseFloat(row.totalIncome) || 0;
            acc.fuel += parseFloat(row.fuel) || 0;
            acc.feeding += parseFloat(row.feeding) || 0;
            acc.passengers += parseFloat(row.passengers) || 0;
            acc.maintenance += parseFloat(row.maintenance) || 0;
            acc.totalExpenses += parseFloat(row.totalExpenses) || 0;
            acc.netIncome += parseFloat(row.netIncome) || 0;
            return acc;
          },
          {
            totalIncome: 0,
            fuel: 0,
            feeding: 0,
            passengers: 0,
            maintenance: 0,
            totalExpenses: 0,
            netIncome: 0,
          }
        );


        if (resultArray.length === 0) {
            return res.status(404).json({ error: "No data found for the given range" });
        }
        return res.status(200).json({result: resultArray, summary: totals});
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

