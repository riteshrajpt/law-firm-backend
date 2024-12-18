require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const scheduleReminders = require("./utils/reminderScheduler");
scheduleReminders();
const app = express();
connectDB();

// Middleware
app.use(express.json());
app.use(require("cors")());
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/clients", require("./routes/clientRoutes"));
app.use("/api/cases", require("./routes/caseRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/invoices",  require("./routes/invoiceRoutes"));

// Routes
app.get("/", (req, res) => res.send("API is running..."));

// Listen on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
