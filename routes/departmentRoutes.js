const express = require('express');
const departmentController = require('../controllers/departmentController');
const protectRoute = require('../middlewares/protectRoute');

const router = express.Router();

router.route('/')
    .post(protectRoute, departmentController.createDepartment)
    .get(protectRoute, departmentController.getAllDepartments);
router.route('/sale/weekly-sales')
    .get(protectRoute, departmentController.getWeeklyDepartmentSales);

router.route('/:id')
    .get(protectRoute, departmentController.getDepartment)
    .put(protectRoute, departmentController.updateDepartment)
    .delete(protectRoute, departmentController.deleteDepartment);


module.exports = router;
