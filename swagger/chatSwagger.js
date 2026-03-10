/**
 * @swagger
 * tags:
 *   name: Chats
 *   description: Chat management
 */

/**
 * @swagger
 * /api/chat:
 *   post:
 *     summary: Create a new chat
 *     tags: [Chats]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               websiteId:
 *                 type: string
 *               departmentId:
 *                 type: string
 *               visitorName:
 *                 type: string
 *               visitorEmail:
 *                 type: string
 *               visitorPhone:
 *                 type: string
 *               visitorAddress:
 *                 type: string
 *               time:
 *                 type: string
 *               chatTranscript:
 *                 type: string
 *               ipAddress:
 *                 type: string
 *               duration:
 *                 type: number
 *               device:
 *                 type: string
 *               startedOn:
 *                 type: string
 *               cameFromUrl:
 *                 type: string
 *               pagesVisited:
 *                 type: array
 *                 items:
 *                   type: string
 *               browser:
 *                 type: string
 *     responses:
 *       201:
 *         description: Chat created successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Website or Department not found
 *       500:
 *         description: Internal server error
 *
 *   get:
 *     summary: Get all chats
 *     tags: [Chats]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of chats
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Chat'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/chat/{id}:
 *   get:
 *     summary: Get a chat by ID
 *     tags: [Chats]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Chat ID
 *     responses:
 *       200:
 *         description: Chat details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chat'
 *       404:
 *         description: Chat not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/chat/website/{websiteId}:
 *   get:
 *     summary: Get chats by website ID
 *     tags: [Chats]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: websiteId
 *         schema:
 *           type: string
 *         required: true
 *         description: Website ID
 *     responses:
 *       200:
 *         description: List of chats for the website
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Chat'
 *       404:
 *         description: Website not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/chat/company/{companyId}:
 *   get:
 *     summary: Get chats by company ID
 *     tags: [Chats]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: companyId
 *         schema:
 *           type: string
 *         required: true
 *         description: Company ID
 *     responses:
 *       200:
 *         description: List of chats for the company
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Chat'
 *       404:
 *         description: Company not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/chat/user/{userId}:
 *   get:
 *     summary: Get chats by user ID
 *     tags: [Chats]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of chats for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Chat'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
