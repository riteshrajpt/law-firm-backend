const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String },
    cases: [{ type: mongoose.Schema.Types.ObjectId, ref: "Case" }], // Linked cases
}, { timestamps: true });

module.exports = mongoose.model("Client", ClientSchema);
