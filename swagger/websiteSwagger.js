/**
 * @swagger
 * tags:
 *   name: Websites
 *   description: Website management
 */

/**
 * @swagger
 * /api/website:
 *   post:
 *     summary: Create a new website
 *     tags: [Websites]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *               timeZone:
 *                 type: string
 *               companyId:
 *                 type: string
 *               POCIds:
 *                 type: array
 *                 items:
 *                   type: string
 *               smtpId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Website created successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Company or SMTP configuration not found
 *       500:
 *         description: Internal server error
 *
 *   get:
 *     summary: Get all websites
 *     tags: [Websites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of websites
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Website'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/website/{id}:
 *   get:
 *     summary: Get a website by ID
 *     tags: [Websites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Website ID
 *     responses:
 *       200:
 *         description: Website details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Website'
 *       404:
 *         description: Website not found
 *       500:
 *         description: Internal server error
 *
 *   put:
 *     summary: Update a website by ID
 *     tags: [Websites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Website ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *               timeZone:
 *                 type: string
 *               POCIds:
 *                 type: array
 *                 items:
 *                   type: string
 *               smtpId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Website updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Website or SMTP configuration not found
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete a website by ID
 *     tags: [Websites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Website ID
 *     responses:
 *       200:
 *         description: Website deleted successfully
 *       404:
 *         description: Website not found
 *       500:
 *         description: Internal server error
 */
