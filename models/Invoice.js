const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
    appointment: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    lawyer: { type: mongoose.Schema.Types.ObjectId, ref: "Lawyer", required: true },
    amount: { type: Number, required: true }, // The total amount to be invoiced
    status: { type: String, enum: ['Paid', 'Unpaid', 'Pending'], default: 'Unpaid' },
    dueDate: { type: Date, required: true },
    issueDate: { type: Date, default: Date.now },
    paymentDate: { type: Date, default: null },
    paymentAmount: { type: Number, default: 0 },
    notes: { type: String },
}, { timestamps: true });

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
