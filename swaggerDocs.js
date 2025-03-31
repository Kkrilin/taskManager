/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User Login successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [task]
 *     parameters:
 *       - in: cookie
 *         name: jwt
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the task
 *               description:
 *                 type: string
 *                 description: Detailed description of the task
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 description: Priority level of the task
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 description: Due date of the task
 *               status:
 *                 type: string
 *                 enum: [pending, completed]
 *                 description: Current status of the task
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [task]
 *     parameters:
 *       - in: cookie
 *         name: jwt
 *         required: true
 *         schema:
 *           type: string
 *         description: Authentication token stored in cookies
 *     responses:
 *       200:
 *         description: All tasks listed successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [task]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: the Id of the task to retrieve
 *       - in: cookie
 *         name: jwt
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT token for authentication
 *     responses:
 *       201:
 *         description: recieve task successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task by ID
 *     tags: [task]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: the Id of the task to Update
 *       - in: cookie
 *         name: jwt
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the task
 *               description:
 *                 type: string
 *                 description: Detailed description of the task
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 description: Priority level of the task
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 description: Due date of the task
 *               status:
 *                 type: string
 *                 enum: [pending, completed]
 *                 description: Current status of the task
 *     responses:
 *       201:
 *         description: update task successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: delete task
 *     tags: [task]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: the Id of the task to Delete
 *       - in: cookie
 *         name: jwt
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT token for authentication
 *     responses:
 *       201:
 *         description: delete task successfully
 *       400:
 *         description: Bad request
 */
