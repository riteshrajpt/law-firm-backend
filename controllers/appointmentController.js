const Appointment = require("../models/Appointment");
const sendEmail = require("../utils/email");

// Get all appointments
exports.getAppointments = async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Default values

    try {
        const appointments = await Appointment.paginate({}, {
            page,
            limit,
            populate: ["client", "lawyer"],
        });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




// Get an appointment by ID
exports.getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id)
            .populate("client", "name email")
            .populate("lawyer", "name email");
        if (!appointment) return res.status(404).json({ message: "Appointment not found" });
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new appointment
exports.createAppointment = async (req, res) => {
    const { date, time, client, lawyer, status, notes } = req.body;

    try {
        // Check for appointment conflict
        const conflict = await Appointment.findOne({ date, time, lawyer });
        if (conflict) {
            return res.status(400).json({
                message: "Appointment conflict: The lawyer is already booked at this time.",
            });
        }

        // Find the client and lawyer from the database
        const clientUser = await User.findById(client);
        const lawyerUser = await User.findById(lawyer);

        // If either user is not found, return an error
        if (!clientUser) {
            return res.status(404).json({ message: "Client not found" });
        }
        if (!lawyerUser) {
            return res.status(404).json({ message: "Lawyer not found" });
        }

        // Create the appointment
        const appointment = await Appointment.create({ date, time, client, lawyer, status, notes });

        // Get client and lawyer emails dynamically
        const clientEmail = clientUser.email;
        const lawyerEmail = lawyerUser.email;

        // Send emails to the client and lawyer
        await sendEmail({
            to: clientEmail,
            subject: "Appointment Scheduled",
            text: `Your appointment is scheduled for ${date} at ${time}.`,
        });

        await sendEmail({
            to: lawyerEmail,
            subject: "New Appointment Scheduled",
            text: `You have a new appointment with a client on ${date} at ${time}.`,
        });

        // Return the created appointment as response
        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update an appointment
exports.updateAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate("client", "name email")
            .populate("lawyer", "name email");

        if (!appointment) return res.status(404).json({ message: "Appointment not found" });

        // Notify client
        await sendEmail({
            to: appointment.client.email,
            subject: "Appointment Updated",
            text: `Your appointment with ${appointment.lawyer.name} has been updated to ${appointment.date} at ${appointment.time}.`,
        });

        // Notify lawyer
        await sendEmail({
            to: appointment.lawyer.email,
            subject: "Appointment Updated",
            text: `Your appointment with ${appointment.client.name} has been updated to ${appointment.date} at ${appointment.time}.`,
        });

        res.json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an appointment
exports.deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) return res.status(404).json({ message: "Appointment not found" });
        res.json({ message: "Appointment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const createRecurringAppointments = async (appointment) => {
    const { date, time, client, lawyer, status, notes, recurrencePattern, recurrenceEndDate, recurrenceInterval, recurrenceDays } = appointment;

    const recurringAppointments = [];
    let currentDate = new Date(date);

    while (currentDate <= new Date(recurrenceEndDate)) {
        if (recurrencePattern === "Custom") {
            const dayOfWeek = currentDate.getDay();
            if (!recurrenceDays.includes(dayOfWeek)) {
                currentDate.setDate(currentDate.getDate() + 1);
                continue; // Skip non-recurring days
            }
        }

        recurringAppointments.push({
            date: new Date(currentDate),
            time,
            client,
            lawyer,
            status,
            notes,
        });

        if (recurrencePattern === "Daily") {
            currentDate.setDate(currentDate.getDate() + recurrenceInterval);
        } else if (recurrencePattern === "Weekly") {
            currentDate.setDate(currentDate.getDate() + recurrenceInterval * 7);
        } else if (recurrencePattern === "Monthly") {
            currentDate.setMonth(currentDate.getMonth() + recurrenceInterval);
        } else {
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }

    return recurringAppointments;
};


exports.createAppointment = async (req, res) => {
    const appointmentData = req.body;

    try {
        if (appointmentData.isRecurring) {
            const recurringAppointments = await createRecurringAppointments(appointmentData);
            await Appointment.insertMany(recurringAppointments);
            res.status(201).json({ message: "Recurring appointments created successfully" });
        } else {
            const appointment = await Appointment.create(appointmentData);
            res.status(201).json(appointment);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateRecurringAppointments = async (req, res) => {
    const { id } = req.params; // ID of the parent/first recurring appointment
    const { updateAll, ...updateData } = req.body;

    try {
        if (updateAll) {
            const parentAppointment = await Appointment.findById(id);
            if (!parentAppointment) return res.status(404).json({ message: "Appointment not found" });

            // Update all recurring instances
            const appointments = await Appointment.updateMany(
                { date: { $gte: parentAppointment.date }, lawyer: parentAppointment.lawyer },
                updateData
            );
            res.json({ message: `${appointments.modifiedCount} appointments updated.` });
        } else {
            const appointment = await Appointment.findByIdAndUpdate(id, updateData, { new: true });
            if (!appointment) return res.status(404).json({ message: "Appointment not found" });
            res.json(appointment);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPaginatedAppointments = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const appointments = await Appointment.paginate({}, { page, limit });

        res.status(200).json({
            success: true,
            data: appointments,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching appointments",
            error: error.message,
        });
    }
};

