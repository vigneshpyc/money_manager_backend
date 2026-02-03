const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const transactionRoutes = require("./routes/transactionRoutes");

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// app.options("/*", cors());

// app.use(cors());
app.use(express.json());

app.use("/api/transactions", transactionRoutes);

module.exports = app;
