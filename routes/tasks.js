import express from 'express';
import taskService from '../services/task.js';

const router = express();

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   priority:
 *                     type: string
 *                   dueDate:
 *                     type: string
 *                     format: date-time
 */
router.post('/', taskService.createTask);
router.get('/', taskService.listAll);
router.get('/:id', taskService.findTask);
router.put('/:id', taskService.updateTask);
router.delete('/:id', taskService.deleteTask);
export default router;
