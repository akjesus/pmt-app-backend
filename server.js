// // Server entry point
const mongoose = require("mongoose");
const app = require("./app");
const PORT = process.env.API_PORT;
const IP_ADDRESS = process.env.API_SERVER_IP || "localhost";
const DB = process.env.MONGODB_URI;


process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('Uncaught Exception! Application is shutting down!');
  process.exit(1);
});

async function connectDB() {
  try {
    await mongoose.connect(DB);
    console.log('Connected to MongoDB successfully!');
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
  }
}

connectDB();

const server = app.listen(PORT, () => {
  console.log(
    `PEC App is running on http://${IP_ADDRESS} at port: ${PORT}, in ${process.env.NODE_ENV} mode`
  );
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('Unhandled Error! Application is shutting down!');
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED! Application is shutting down!');
  server.close(() => {
    console.log('Process Terminated!');
  });
});