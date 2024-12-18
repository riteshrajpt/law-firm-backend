const Case = require("../models/Case");

// Get all cases
exports.getCases = async (req, res) => {
    try {
        const cases = await Case.find().populate("client lawyer", "name email");
        res.json(cases);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single case by ID
exports.getCaseById = async (req, res) => {
    try {
        const caseDetail = await Case.findById(req.params.id).populate("client lawyer");
        if (!caseDetail) return res.status(404).json({ message: "Case not found" });
        res.json(caseDetail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new case
exports.createCase = async (req, res) => {
    const { caseName, client, lawyer, description, startDate, endDate, status } = req.body;
    try {
        const caseDetail = await Case.create({ caseName, client, lawyer, description, startDate, endDate, status });
        res.status(201).json(caseDetail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update case details
exports.updateCase = async (req, res) => {
    try {
        const caseDetail = await Case.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!caseDetail) return res.status(404).json({ message: "Case not found" });
        res.json(caseDetail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a case
exports.deleteCase = async (req, res) => {
    try {
        const caseDetail = await Case.findByIdAndDelete(req.params.id);
        if (!caseDetail) return res.status(404).json({ message: "Case not found" });
        res.json({ message: "Case deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
