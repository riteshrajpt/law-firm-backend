const cron = require("node-cron");
const Appointment = require("../models/Appointment");
const sendEmail = require("./email");

const scheduleReminders = () => {
    cron.schedule("0 * * * *", async () => { // Runs every hour
        try {
            const now = new Date();
            const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

            // Find appointments starting in the next hour
            const upcomingAppointments = await Appointment.find({
                date: { $gte: now, $lte: oneHourLater },
                status: "Scheduled",
            }).populate("client lawyer");

            for (const appointment of upcomingAppointments) {
                // Notify client
                await sendEmail({
                    to: appointment.client.email,
                    subject: "Appointment Reminder",
                    text: `Reminder: You have an appointment with ${appointment.lawyer.name} at ${appointment.time}.`,
                });

                // Notify lawyer
                await sendEmail({
                    to: appointment.lawyer.email,
                    subject: "Appointment Reminder",
                    text: `Reminder: You have an appointment with ${appointment.client.name} at ${appointment.time}.`,
                });
            }
        } catch (error) {
            console.error("Error scheduling reminders:", error);
        }
    });
};

module.exports = scheduleReminders;
