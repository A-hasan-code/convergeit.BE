const express = require('express');
const {
    generateReport,
    getAllReports,
    getReportById,
    updateReport,
    deleteReport,
    generateReportBetweenDates,
    suspendReport
} = require('../controllers/reportController');
const protectRoute = require('../middlewares/protectRoute');

const router = express.Router();

router.post('/generate-report', protectRoute, generateReport);
router.get('/', protectRoute, getAllReports);
router.get('/:id', protectRoute, getReportById);
router.put('/:id', protectRoute, updateReport);
router.delete('/:id', protectRoute, deleteReport);
router.post('/generate-report-between-dates', protectRoute, generateReportBetweenDates);
router.put('/suspend/:id', protectRoute , suspendReport);

module.exports = router;
