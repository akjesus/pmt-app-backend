// CRUD for bus loading information
const BusIncome = require('../models/BusIncomeModel');

exports.createLoadingInfo = async (req, res) => {
    try {
        const {vehicle, route, fare, fuel, feeding, passengers, date} = req.body.data;
        if(!vehicle || !route || !fare || !fuel || !passengers || !date || !feeding) {
            return res.status(400).json({message: "All fields required!"})
        }
        let income;
        const existing = await BusIncome.find({
            route: route, vehicleId: vehicle.split(":")[0], transdate: date
        })
        if(!existing){
            income = (parseInt(passengers) * parseInt(fare)) - (parseInt(fuel) + parseInt(feeding));
        }
        else {
            income = (parseInt(passengers) * parseInt(fare));
        }
        
        const loadingInfo = {
            vehicleId: vehicle.split(":")[0],
            name: vehicle.split(":")[1],
            routeId: route,
            transDate: date,
            fare: fare,
            fuel: fuel,
            passengers: passengers,
            feeding: feeding,
            income: income,
            createdBy: req.user.id,
        };

        const newLoadingInfo = new BusIncome(loadingInfo);
        await newLoadingInfo.save();
        res.status(201).json({ message: 'Loading information created successfully', data: loadingInfo });
    } catch (error) {
        console.error('Error creating loading info:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.createLoadingInfo2 = async (req, res) => {
    try {
        // Create loading info object from body array
        if (!Array.isArray(req.body)) {
            return res.status(400).json({ message: 'Invalid data format' });
        }
        const loadingInfo = req.body.map(item => ({
            vehicleId:item.vehicleId,
            name: item.name,
            routeId: item.routeId,
            transDate: Date.now(),
            fare: item.fare,
            fuel: item.fuel,
            passengers: item.passengers,
            income: item.income,
            createdBy: req.user.id,
        }));

        // Save loading information to the database
        if (loadingInfo.length === 0) {
            return res.status(400).json({ message: 'No loading information provided' });
        }
// save each loading info object
        for (const info of loadingInfo) {
            
                // Create new record
                const newLoadingInfo = new BusIncome(info);
                await newLoadingInfo.save();
            }

        res.status(201).json({ message: 'Loading information created successfully', data: loadingInfo });
    } catch (error) {
        console.error('Error creating loading info:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
// Get all loading information
exports.getAllLoadingInfo = async (req, res) => {
    try {
        const {dateFrom, dateTo} = req.query;
        const start = new Date(dateFrom);
	    const end = new Date(dateTo);
        end.setHours(23, 59, 59, 999);
        const loadingInfo = await BusIncome.find({
           createdAt: { $gte: start, $lte: end },
        })
          .populate("vehicleId", "name")
          .populate("routeId", "desc")
          .populate("createdBy", "username");
          if(loadingInfo.length === 0) {
           return res.status(404).json({message: "No loading Info for selected date"});
          }
        return res.status(200).json(loadingInfo);

    } catch (error) {
        console.error('Error fetching loading info:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}