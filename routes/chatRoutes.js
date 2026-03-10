const express = require('express');
const chatController = require('../controllers/chatController');
const protectRoute = require('../middlewares/protectRoute');

const router = express.Router();  


router.route('/')
    .post( chatController.createChat)
    .get(protectRoute, chatController.getAllChats);

router.route('/user/:userId')
    .get(protectRoute, chatController.getChatsByUserId);

router.route('/company/:companyId')
    .get(protectRoute, chatController.getChatsByCompanyId);

router.route('/department/:departmentId')
    .get(protectRoute, chatController.getChatsByDepartmentId);

router.route('/website/:websiteId')
    .get(protectRoute, chatController.getChatsByWebsiteId);

router.route('/counts')
    .get(protectRoute, chatController.getChatCountsPerCompany);

    router.route('/weekly-chat-counts')
    .get(protectRoute, chatController.getWeeklyChatCounts);
    router.route('/total-count')
    .get(protectRoute, chatController.getTotalChats);

    

    router.route('/:id')
    .get( chatController.getChatById);    

module.exports = router;
