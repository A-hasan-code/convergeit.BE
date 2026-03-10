const express = require('express');
const smtpController = require('../controllers/smtpController');
const protectRoute = require('../middlewares/protectRoute');

const router = express.Router();

router.route('/')
    .post(protectRoute, smtpController.createSMTP)
    .get(protectRoute, smtpController.getAllSMTPs);

router.route('/:id')
    .get(protectRoute, smtpController.getSMTP)
    .put(protectRoute, smtpController.updateSMTP)
    .delete(protectRoute, smtpController.deleteSMTP);

module.exports = router;
