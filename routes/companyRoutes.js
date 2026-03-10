const express = require('express');
const companyController = require('../controllers/companyController');
const protectRoute = require('../middlewares/protectRoute');

const router = express.Router();

router.route('/')
    .post(protectRoute, companyController.createCompany)
    .get(protectRoute, companyController.getAllCompanies); 


router.route('/:id')
    .get(protectRoute, companyController.getCompany)
    .put(protectRoute, companyController.updateCompany)
    .delete(protectRoute, companyController.deleteCompany);

router.route('/:id/addUser')
    .post(protectRoute, companyController.addUserToCompany);

router.put('/updateCompanyStatus/:id', companyController.updateCompanyStatus);


module.exports = router;
