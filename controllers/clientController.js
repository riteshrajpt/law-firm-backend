const Client = require("../models/Client");

// Get all clients
exports.getClients = async (req, res) => {
    try {
        const clients = await Client.find().populate("cases", "caseName status");
        res.json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single client by ID
exports.getClientById = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id).populate("cases");
        if (!client) return res.status(404).json({ message: "Client not found" });
        res.json(client);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new client
exports.createClient = async (req, res) => {
    const { name, email, phone, address } = req.body;
    try {
        const client = await Client.create({ name, email, phone, address });
        res.status(201).json(client);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update client details
exports.updateClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!client) return res.status(404).json({ message: "Client not found" });
        res.json(client);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a client
exports.deleteClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id);
        if (!client) return res.status(404).json({ message: "Client not found" });
        res.json({ message: "Client deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
