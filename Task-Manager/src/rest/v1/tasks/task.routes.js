// Import Express framework
import express from "express";

// Import authentication middleware that verifies JWT token
import authMiddleware from "../../../middleware/auth.middleware.js";

// Import controller functions that handle business logic for tasks
import { createTask, getTasks, updateTask, deleteTask, updatePatchedTask } from "./task.controller.js";

// Create an Express router instance to define task routes
const router = express.Router();


/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks for the authenticated user
 *     description: Returns a list of tasks that belong to the currently authenticated user.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []   # Requires JWT authentication
 *     responses:
 *       200:
 *         description: List of user tasks retrieved successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 */

// Route: GET /tasks
// Middleware flow: authMiddleware -> getTasks controller
// This route retrieves all tasks for the logged-in user
router.get("/", authMiddleware, getTasks);



/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     description: Creates a new task associated with the authenticated user.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []   # Requires JWT authentication
 *     requestBody:
 *       required: true
 *       description: Task details required to create a new task
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Complete project
 *               description:
 *                 type: string
 *                 example: Finish the backend API
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 */

// Route: POST /tasks
// Creates a new task for the authenticated user
router.post("/", authMiddleware, createTask);



/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task completely
 *     description: Replaces the entire task resource with new data.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []   # Requires JWT authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique ID of the task to update
 *     requestBody:
 *       required: true
 *       description: Updated task data
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 */

// Route: PUT /tasks/:id
// Updates an entire task record (full replacement)
router.put("/:id", authMiddleware, updateTask);



/**
 * @swagger
 * /tasks/{id}:
 *   patch:
 *     summary: Partially update a task
 *     description: Updates specific fields of a task without replacing the entire resource.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []   # Requires JWT authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique ID of the task to update
 *     requestBody:
 *       required: true
 *       description: Fields to update
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 */

// Route: PATCH /tasks/:id
// Allows partial updates of task fields
router.patch("/:id", authMiddleware, updatePatchedTask);



/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: Deletes a task belonging to the authenticated user.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []   # Requires JWT authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique ID of the task to delete
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */

// Route: DELETE /tasks/:id
// Deletes a task belonging to the authenticated user
router.delete("/:id", authMiddleware, deleteTask);


// Export the router so it can be used in the main server routing
export default router;