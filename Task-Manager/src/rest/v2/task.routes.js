import express from "express";

// Import authentication middleware to protect the route
import authMiddleware from "./../../middleware/auth.middleware.js";

// Import controller function that handles the logic for fetching tasks (v2)
import { getTasksV2 } from "./task.controller.js";

// Create a new Express router instance
const router = express.Router();

/**
 * Swagger documentation for the endpoint below
 * This comment block is read by swagger-jsdoc to generate API documentation
 * 
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get tasks (API v2)               # Short description shown in Swagger UI
 *     tags: [Tasks V2]                          # Groups this endpoint under "Tasks V2"
 *     description: Retrieve tasks using version 2 API
 *     security:
 *       - bearerAuth: []                        # Requires JWT authentication
 *     responses:
 *       200:
 *         description: Successfully retrieved tasks (v2)
 *       401:
 *         description: Unauthorized
 */

// Define GET /tasks route
// authMiddleware → verifies JWT token before allowing access
// getTasksV2 → controller that fetches tasks from database
router.get("/", authMiddleware, getTasksV2);

// Export router so it can be used in the main server or route index
export default router;