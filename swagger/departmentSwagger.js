/**
 * @swagger
 * tags:
 *   name: Departments
 *   description: Department management
 */

/**
 * @swagger
 * /api/department:
 *   post:
 *     summary: Create a new department
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emailsTo:
 *                 type: array
 *                 items:
 *                   type: string
 *               emailsCc:
 *                 type: array
 *                 items:
 *                   type: string
 *               emailsBcc:
 *                 type: array
 *                 items:
 *                   type: string
 *               departmentName:
 *                 type: string
 *               websiteId:
 *                 type: string
 *               subjectLine:
 *                 type: string
 *               emailFrom:
 *                 type: string
 *     responses:
 *       201:
 *         description: Department created successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Website not found
 *       500:
 *         description: Internal server error
 *
 *   get:
 *     summary: Get all departments
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of departments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DepartmentEmail'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/department/{id}:
 *   get:
 *     summary: Get a department by ID
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Department ID
 *     responses:
 *       200:
 *         description: Department details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DepartmentEmail'
 *       404:
 *         description: Department not found
 *       500:
 *         description: Internal server error
 *
 *   put:
 *     summary: Update a department by ID
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Department ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emailsTo:
 *                 type: array
 *                 items:
 *                   type: string
 *               emailsCc:
 *                 type: array
 *                 items:
 *                   type: string
 *               emailsBcc:
 *                 type: array
 *                 items:
 *                   type: string
 *               departmentName:
 *                 type: string
 *               subjectLine:
 *                 type: string
 *               emailFrom:
 *                 type: string
 *     responses:
 *       200:
 *         description: Department updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Department not found
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete a department by ID
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Department ID
 *     responses:
 *       200:
 *         description: Department deleted successfully
 *       404:
 *         description: Department not found
 *       500:
 *         description: Internal server error
 */
