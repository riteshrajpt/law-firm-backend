const express = require("express");
const {
    getClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient,
} = require("../controllers/clientController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/")
    .get(protect, getClients)
    .post(protect, createClient);

router.route("/:id")
    .get(protect, getClientById)
    .put(protect, updateClient)
    .delete(protect, deleteClient);

module.exports = router;
