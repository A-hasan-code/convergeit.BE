const express = require('express');
const router = express.Router();
const EmailFrom = require('../models/emailFromModel');

// Get all email addresses
router.get('/', async (req, res) => {
  try {
    const emails = await EmailFrom.find();
    res.status(200).json(emails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
