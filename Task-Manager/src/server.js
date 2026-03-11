/**
 * Express.js is a free, open-source, and flexible web application framework for Node.js.
 *
 * CORS (Cross-Origin Resource Sharing):
 * A browser security mechanism that allows a web page to make requests
 * to a different domain than the one that served it.
 * It controls whether a frontend application from one origin
 * is allowed to access a backend API from another origin.
 *
 * Dotenv:
 * Loads environment variables from a .env file into the application's
 * runtime environment (process.env).
 */

import dotenv from "dotenv";

// Load variables from .env file into process.env
dotenv.config();

import express from "express";
import cors from "cors";

// Function that runs database migrations before starting the server
import runMigrations from "./database/runMigrations.js";

// Import REST API routes
import authRoutes from "./rest/v1/auth/auth.routes.js";
import taskRoutes from "./rest/v1/tasks/task.routes.js";
import taskRoutesV2 from "./rest/v2/task.routes.js";
import commentRoutes from "./rest/v1/comments/comment.routes.js";

// Import Swagger configuration for API documentation
import swaggerSpec from "./swagger/swagger.js";
import swaggerUi from "swagger-ui-express";

// GraphQL imports
import { graphqlHTTP } from "express-graphql";
import schema from "./graphql/schema.js";
import root from "./graphql/resolver.js";

// Global error handling middleware
import errorMiddleware from "./middleware/error.middleware.js";

// Start gRPC server
import "./grpc/server.js";

/**
 * Create a new instance of the Express application.
 * This object represents the web server.
 */
const app = express();

/**
 * Enable CORS for the server.
 * Allows frontend applications (React, Angular, etc.)
 * running on a different origin to access this API.
 */
app.use(cors());

/**
 * express.json()
 * Built-in middleware that parses incoming JSON request bodies.
 *
 * Example request body:
 * {
 *   "title": "Complete project",
 *   "description": "Finish backend implementation"
 * }
 *
 * The parsed data becomes available in:
 * req.body
 */
app.use(express.json());

/**
 * Register authentication routes.
 * Any request starting with /api/v1/auth
 * will be handled by authRoutes.
 */
app.use("/api/v1/auth", authRoutes);

/**
 * Register Task API routes (version 1).
 *
 * Example endpoints:
 * GET /api/v1/tasks
 * POST /api/v1/tasks
 * PUT /api/v1/tasks/:id
 * DELETE /api/v1/tasks/:id
 */
app.use("/api/v1/tasks", taskRoutes);

/**
 * Register Task API routes (version 2).
 * This version may include improved features or changes.
 */
app.use("/api/v2/tasks", taskRoutesV2);

/**
 * Register Comment routes for tasks.
 * Example:
 * POST /api/v1/tasks/:taskId/comments
 */
app.use("/api/v1/tasks", commentRoutes);

/**
 * Global error handling middleware.
 * Any error thrown in controllers/services
 * will be processed here.
 */
app.use(errorMiddleware);

/**
 * Swagger API documentation.
 * Accessible at:
 * http://localhost:5000/api-docs
 */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * GraphQL endpoint.
 * GraphiQL UI is enabled for testing queries in the browser.
 */
import authMiddleware from "./middleware/auth.middleware.js";

app.use(
  "/graqhl",
  authMiddleware,
  graphqlHTTP((req) => ({
    schema,
    rootValue: root,
    graphiql: true,
    context: req
  }))
);

/**
 * Define the port where the server will run.
 * If PORT is defined in .env it will use that,
 * otherwise it defaults to 5000.
 */
const PORT = process.env.PORT || 5000;

/**
 * Function responsible for starting the server.
 * Steps:
 * 1. Run database migrations
 * 2. Start Express server
 */
const startServer = async () => {
  try {

    // Run database migrations before server startup
    await runMigrations();

    /**
     * Start the Express server and listen for incoming HTTP requests.
     */
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Swagger docs: http://localhost:5000/api-docs`);
    });

  } catch (error) {

    // Log server startup errors
    console.error("Server starting error", error);
  }
};

// Start the server
startServer();