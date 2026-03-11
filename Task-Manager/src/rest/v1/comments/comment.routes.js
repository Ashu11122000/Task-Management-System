// Import Express framework
import express from "express";

// Import authentication middleware to protect routes with JWT verification
import authMiddleware from "../../../middleware/auth.middleware.js";

// Import controller functions that handle comment-related business logic
import { createComment, getCommentsByTask, deleteComment } from "./comment.controller.js";

/*
Create a new router instance.

mergeParams: true
This option allows this router to access route parameters
from the parent router.

Example:
If this router is mounted as:
app.use("/tasks", commentRoutes)

Then routes like:
POST /tasks/:taskId/comments

The router can access taskId using:
req.params.taskId
*/
const router = express.Router({ mergeParams: true });



/**
 * @swagger
 * /tasks/{taskId}/comments:
 *   post:
 *     summary: Create a comment for a task
 *     description: Adds a new comment to the specified task. Only authenticated users can create comments.
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the task for which the comment is being created
 *     requestBody:
 *       required: true
 *       description: Comment content
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - comment
 *             properties:
 *               comment:
 *                 type: string
 *                 example: This task needs to be completed today
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 */

// Route: POST /tasks/:taskId/comments
// Creates a new comment for a specific task
router.post("/:taskId/comments", authMiddleware, createComment);



/**
 * @swagger
 * /tasks/{taskId}/comments:
 *   get:
 *     summary: Get all comments for a task
 *     description: Retrieves all comments associated with a specific task.
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the task whose comments need to be fetched
 *     responses:
 *       200:
 *         description: List of comments retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 */

// Route: GET /tasks/:taskId/comments
// Fetches all comments belonging to a specific task
router.get("/:taskId/comments", authMiddleware, getCommentsByTask);



/**
 * @swagger
 * /tasks/{taskId}/comments/{id}:
 *   delete:
 *     summary: Delete a comment
 *     description: Deletes a specific comment from a task.
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the task
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the comment to delete
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Comment not found
 */

// Route: DELETE /tasks/:taskId/comments/:id
// Deletes a specific comment from a task
router.delete("/:taskId/comments/:id", authMiddleware, deleteComment);


// Export router so it can be used in main route configuration
export default router;