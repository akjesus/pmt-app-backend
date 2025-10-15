
// Import Required Modules
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });



const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json());
// Enable files upload
app.use(fileUpload());
// Test Route
app.get("/api", (req, res) => {
    res.json({ message: "PEC App Backend is Running!" });
});

// Import Routes
const authRoutes = require("./routes/AuthRoutes");
const adminRoutes = require("./routes/AdminRoutes");
const VehicleRoutes = require("./routes/VehicleRoutes");
const RouteFareRoutes = require("./routes/RouteFareRoutes");
const LoadingInfoRoutes = require("./routes/BusIncomeRoutes");
const BusExpenseRoutes = require("./routes/BusExpenseRoutes");
const ReportRoutes = require("./routes/ReportRoutes");
const TownRoutes = require("./routes/TownRoutes");



app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/vehicles", VehicleRoutes);
app.use("/api/routes", RouteFareRoutes);
app.use("/api/towns", TownRoutes);
app.use("/api/loading-info", LoadingInfoRoutes);
app.use("/api/bus-expenses", BusExpenseRoutes);
app.use("/api/reports", ReportRoutes)


app.all("*", (req, res, next) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  res.status(404).json({
    code: 404,
    status: "Not found",
    message: `Can not find ${fullUrl} on this server`,
  });
});


module.exports = app;
