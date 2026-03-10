const express = require('express');
const pocController = require('../controllers/pocController');
const protectRoute = require('../middlewares/protectRoute');

const router = express.Router();

router.route('/')
    .post(protectRoute, pocController.createPoc)
    .get(protectRoute, pocController.getPocs);

module.exports = router;
