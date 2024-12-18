const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const AppointmentSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    time: { type: String, required: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
    lawyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["Scheduled", "Completed", "Cancelled"], default: "Scheduled" },
    notes: { type: String },
    isRecurring: { type: Boolean, default: false },
    recurrencePattern: {
        type: String,
        enum: ["Daily", "Weekly", "Monthly", "Custom"],
    },
    recurrenceInterval: { type: Number, default: 1 }, // Interval (e.g., every 2 days)
    recurrenceDays: [{ type: Number }], // Days of the week for Custom (0 = Sunday, 6 = Saturday)    
}, { timestamps: true });

AppointmentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Appointment", AppointmentSchema);
