const express = require("express");
const {
    getCases,
    getCaseById,
    createCase,
    updateCase,
    deleteCase,
} = require("../controllers/caseController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/")
    .get(protect, getCases)
    .post(protect, createCase);

router.route("/:id")
    .get(protect, getCaseById)
    .put(protect, updateCase)
    .delete(protect, deleteCase);

module.exports = router;
