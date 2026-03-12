# Swagger Overview
Swagger is an open-source software framework that helps developers design, build, document, and consume RESTful web services. It provides a powerful set of tools for creating interactive API documentation, including automatic documentation generation, and API testing.

# Swagger Integration

First, do installation using npm in terminal: npm install swagger-jsdoc swagger-ui-express 

Then, import the required modules and define the Swagger in main file (src/server.js). 

// Import Swagger configuration for API documentation
import swaggerSpec from "./swagger/swagger.js";
import swaggerUi from "swagger-ui-express";

console.log(`Swagger docs: http://localhost:5000/api-docs`);

# Swagger arcitectural Flow
Swagger UI -> Reads Routes Comments -> Build OpenAPI Specification automatically -> Display Interactive Docs

# Swagger URL
http://localhost:5000/api-docs

# Swagger Endpoint
/api-docs
