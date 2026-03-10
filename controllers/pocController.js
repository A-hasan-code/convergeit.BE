const POC = require('../models/pocModel');

// Create a new POC
const createPoc = async (req, res) => {
    try {
        const { designation, name, phone, email } = req.body;
        const poc = await POC.create({ designation, name, phone, email });
        res.status(201).json({ message: 'POC created successfully', poc });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all POCs
const getPocs = async (req, res) => {
    try {
        const pocs = await POC.find();
        res.status(200).json(pocs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createPoc,
    getPocs,
};
