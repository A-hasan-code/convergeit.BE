const express = require('express');
const {
    createWebsite,
    getWebsite,
    getAllWebsites,
    updateWebsite,
    deleteWebsite,
    getDepartmentsByWebsiteId,
    updateWebsiteStatus
} = require('../controllers/websiteController');
const protectRoute = require('../middlewares/protectRoute');

const router = express.Router();

router.route('/')
    .post(protectRoute, createWebsite)
    .get(protectRoute, getAllWebsites);


router.route('/:id')
    .get(protectRoute, getWebsite)
    .put(protectRoute, updateWebsite)
    .delete(protectRoute, deleteWebsite);


router.route('/:websiteId/departments')
    .get(getDepartmentsByWebsiteId);


router.route('/updateWebsiteStatus/:websiteId')
    .put(
        protectRoute, updateWebsiteStatus);

module.exports = router;
