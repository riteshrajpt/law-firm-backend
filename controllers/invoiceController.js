const Invoice = require("../models/Invoice");
const Appointment = require("../models/Appointment");
const sendEmail = require("../utils/email");

exports.createInvoice = async (req, res) => {
    const { appointmentId, amount, dueDate, notes } = req.body;

    try {
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) return res.status(404).json({ message: "Appointment not found" });

        const invoice = new Invoice({
            appointment: appointmentId,
            client: appointment.client,
            lawyer: appointment.lawyer,
            amount,
            dueDate,
            notes
        });

        await invoice.save();

        // Send email notification to client and lawyer about the invoice
        const clientEmail = appointment.client.email;
        const lawyerEmail = appointment.lawyer.email;

        await sendEmail({
            to: clientEmail,
            subject: "Invoice Created",
            text: `Your invoice for appointment with ${appointment.lawyer.name} on ${appointment.date} has been created. Total: $${amount}. Due Date: ${dueDate}.`,
        });

        await sendEmail({
            to: lawyerEmail,
            subject: "Invoice Created for Your Appointment",
            text: `An invoice has been created for your appointment with ${appointment.client.name} on ${appointment.date}. Total: $${amount}. Due Date: ${dueDate}.`,
        });

        res.status(201).json(invoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
