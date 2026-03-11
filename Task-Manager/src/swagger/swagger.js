import swaggerJsdoc from "swagger-jsdoc";

// Swagger configuration options
const options = {
  definition: {

    // OpenAPI specification version
    openapi: "3.0.0",

    // Basic API information shown in Swagger UI
    info: {
      title: "Task Manager API",   // Name of the API
      version: "1.0.0",   // API version
      description: "Task Manager API Documentation",   // Short description of the API
    },

    // List of servers where the API is available
    servers: [
      {
        url: "http://localhost:5000/api/v1",   // Base URL for version 1 APIs
        description: "API v1",
      },
      {
        url: "http://localhost:5000/api/v2",   // Base URL for version 2 APIs
        description: "API v2",
      },
    ],

    // Tags are used to group APIs in Swagger UI
    tags: [
      {
        name: "Auth",   // Authentication-related APIs
        description: "Authentication APIs",
      },
      {
        name: "Tasks",   // Task APIs for version 1
        description: "Task management APIs (v1)",
      },
      {
        name: "Tasks V2",   // Task APIs for version 2
        description: "Task management APIs (v2)",
      },
    ],

    // Reusable components used across the API documentation
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",   // Authentication type
          scheme: "bearer",   // Bearer authentication scheme
          bearerFormat: "JWT",   // Token format (JSON Web Token)
        },
      },
    },
  },

  // Paths where Swagger should scan for API documentation comments
  apis: [
    "./src/rest/v1/**/*.js",   // Scan all v1 API route files
    "./src/rest/v2/**/*.js"    // Scan all v2 API route files
  ],
};

// Generate Swagger specification from the options above
const swaggerSpec = swaggerJsdoc(options);

// Export the Swagger specification so it can be used in the main server file
export default swaggerSpec;