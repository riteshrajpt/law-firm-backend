const mongoose = require("mongoose");

const CaseSchema = new mongoose.Schema({
    caseName: { type: String, required: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
    lawyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["Open", "Closed", "Pending"], default: "Open" },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model("Case", CaseSchema);
