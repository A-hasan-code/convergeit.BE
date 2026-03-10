const SMTP = require('../models/smptpModel');
const SMTP_CONFIGS = require('../models/smtpConfigModel');

// Create a new SMTP configuration
const createSMTP = async (req, res) => {
    try {
        const { configName, smtpConfigs } = req.body;

        const smtpConfig = await SMTP_CONFIGS.findById(smtpConfigs);
        if (!smtpConfig) {
            return res.status(404).json({ error: 'SMTP configuration details not found' });
        }

        const smtp = await SMTP.create({
            configName,
            smtpConfigs
        });

        res.status(201).json({ message: 'SMTP configuration created successfully', smtp });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all SMTP configurations
const getAllSMTPs = async (req, res) => {
    try {
        const smtps = await SMTP.find().populate('smtpConfigs');
        res.status(200).json(smtps);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single SMTP configuration by ID
const getSMTP = async (req, res) => {
    try {
        const smtpId = req.params.id;

        const smtp = await SMTP.findById(smtpId).populate('smtpConfigs');

        if (!smtp) {
            return res.status(404).json({ error: 'SMTP configuration not found' });
        }

        res.status(200).json(smtp);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an SMTP configuration by ID
const updateSMTP = async (req, res) => {
    try {
        const smtpId = req.params.id;
        const { configName, smtpConfigs } = req.body;

        const smtpConfig = await SMTP_CONFIGS.findById(smtpConfigs);
        if (!smtpConfig) {
            return res.status(404).json({ error: 'SMTP configuration details not found' });
        }

        const smtp = await SMTP.findByIdAndUpdate(smtpId, {
            configName,
            smtpConfigs
        }, { new: true }).populate('smtpConfigs');

        if (!smtp) {
            return res.status(404).json({ error: 'SMTP configuration not found' });
        }

        res.status(200).json({ message: 'SMTP configuration updated successfully', smtp });
    } catch (error) {
        res.status500().json({ error: error.message });
    }
};

// Delete an SMTP configuration by ID
const deleteSMTP = async (req, res) => {
    try {
        const smtpId = req.params.id;

        const smtp = await SMTP.findByIdAndDelete(smtpId);

        if (!smtp) {
            return res.status(404).json({ error: 'SMTP configuration not found' });
        }

        res.status(200).json({ message: 'SMTP configuration deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createSMTP,
    getAllSMTPs,
    getSMTP,
    updateSMTP,
    deleteSMTP
};
