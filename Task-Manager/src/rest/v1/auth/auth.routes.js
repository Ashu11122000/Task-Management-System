import express from "express";

// Import controller functions that handle user registration and login logic
import { register, login } from "./auth.controller.js";

// Create a new Express router instance
const router = express.Router();

/**
 * Swagger documentation for user registration endpoint
 * Swagger reads this comment block and automatically generates API docs
 * 
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user             # Short description shown in Swagger UI
 *     tags: [Auth]                             # Groups this API under "Auth"
 *     description: Creates a new user account
 *     requestBody:
 *       required: true                         # Request body must be provided
 *       content:
 *         application/json:
 *           schema:
 *             type: object                     # Request body must be a JSON object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ashish Sharma
 *               email:
 *                 type: string
 *                 example: ashish@email.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */

// Route to register a new user
// Endpoint: POST /auth/register
// Controller: register()
router.post("/register", register);

/**
 * Swagger documentation for login endpoint
 * Describes how the login API works in Swagger UI
 * 
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user                      # Short description
 *     tags: [Auth]                             # Group under Auth section
 *     description: Authenticate user and return JWT token
 *     requestBody:
 *       required: true                         # Request body is required
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: ashish@email.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

// Route to authenticate a user
// Endpoint: POST /auth/login
// Controller: login()
router.post("/login", login);

// Export router so it can be used in the main server routes
export default router;