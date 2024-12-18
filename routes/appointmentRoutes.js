const express = require("express");
const {
    getAppointments,
    getAppointmentById,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    updateRecurringAppointments
} = require("../controllers/appointmentController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.put("/:id/recurring", protect, updateRecurringAppointments);

router.route("/")
    .get(protect, getAppointments)
    .post(protect, createAppointment);

router.route("/:id")
    .get(protect, getAppointmentById)
    .put(protect, updateAppointment)
    .delete(protect, deleteAppointment);

module.exports = router;
