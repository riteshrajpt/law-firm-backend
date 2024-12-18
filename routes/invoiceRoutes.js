const express = require("express");
const { protect } = require("../middlewares/authMiddleware"); // Middleware to protect routes
const {
    createInvoice,
    recordPayment,
    updateInvoiceStatus,
    getInvoiceHistory,
} = require("../controllers/invoiceController");

const router = express.Router();

// Route to create a new invoice
router.post("/", protect, createInvoice);

// Route to record a payment for an invoice
// router.post("/:id/payment", protect, recordPayment);

// Route to update the status of an invoice
// router.put("/:id/status", protect, updateInvoiceStatus);

// Route to fetch invoice history for the logged-in user
// router.get("/history", protect, getInvoiceHistory);

module.exports = router;
