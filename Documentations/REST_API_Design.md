# APIs Designing
REST_API_Design.md : Rest API Specification for application including:

# Resource Sharing
Resource sharing is a crucial aspect of designing RESTful APIs. It invloves defining the resources, their URIs, and the relationships between them.
1. Determines the main entities of API will expose.
2. Create meaningful and consistent URIs for accessing resources.
3. Establish how resources relate to each other.
4. Choose appropriate formats for representing resource data.

# API URL structure & method
A REST (Repsentational State Transfer) API uses standard HTTP methods - like GET, POST, PUT, PATCH, DELETE - to let different software systems talk to each other. Every REST API request has a URL (Uniform Resource Locator) that tells the server what we want. It consists of -

1. Base URL: http://localhost:5000 (main address)
2. Resource: (/api/v1/tasks)
3. Path Parameter: (/:id)

When we send an API request, the server answers with a status code.

1. 1xx(Informational): Still Processing, rarely seen
2. 2xx(success): (200 Ok, 201 Created).
3. 4xx: (404 Not Found, 401 Unauthorized).
3. 5xx: (500 Internal Server Error).

# Request / response contract
A request/response contract is a formal agreement or specification that defines the precise rules and data formats for how two softwares (a client and a server, or consumer and provider) interact with each other via an API or service. A request/response contract typically specifies the following details:

1. EndPoints: The specific URLs (/users, /tasks, /comments) available for interactions.
2. Request Format: The structure and data types of the data sent to the API, including required and optional fields, validation rules, parameters, headers.
3. Response Format: The structure and data types of the data returned from the API for various scenarios (success, error), including the body, headers, and status codes (e.g., 200 OK, 404 Not Found, 500 Internal Server Error)
4. Authentication: The Security requirements for accessing the API like JWT tokens.

# Proper HTTP status codes including error scenarios like bad data
HTTP status codes are essential for indicating the outcome of a client's request.

1. Success Scenarios: These codes signify a successful request with 200 OK indicating a successful request, 201 Created signifying resource creation, 204 No Content for successful requests with no return body and 202 Accepted for asynchronous processings.
2. Client Errors: These indicate client-side issues ;ole 400 Bad Request (invalid syntax, data), 401 Unauthorized (invalid/missing credentials), 403 Forbidden (lack of permissions).
3. Server Errors: These indicate unexpected server-side issues like 500 Internal Server Error, 503 Service Unavailable (maintainance/overload), 502 Bad Gateway and 504 Gateway Timeout.

# Basic crud endpoints (list, get, search, create, update, delete)
GET /api/v1/tasks: To get all tasks 
POST /api/v1/tasks: To create tasks 
PUT /api/v1/tasks/:id: To update complete tasks 
PATCH /api/v1/tasks/:id: To update Partial/Half details of tasks 
DELETE /api/v1/tasks/:id: To delete specific tasks

# Nested resources (eg. comments under a note or a task)
Nested resources in RESTful APIs are used to represent hierarchical relationships where a child resource cannot exist without its parent. (e.g., a comment belongs to a specific task). 
POST /api/v1/tasks/{taskId}/comments: To create comments on tasks 
GET /api/v1/tasks/{taskId}/comments: To get all the comments on a particular task.

# Partial vs Full Update
A full update (PUT) replaces an entire resource or record, requiring all data fields to be submitted. (Replaces the existing record.) 
PUT /api/v1/tasks/:id: To update complete tasks

A Partial update (PATCH) modifies only specific, provided fields, leaving others unchanged. 
PATCH /api/v1/tasks/:id: To update Partial/Half details of tasks

# Endpoint that handles Long-running job
Long-running job endpoints should be asynchrounously to prevent timeout errors and poor user experience. The standard approach invloves returning 202 Accepted status check endpoint (e.g., /tasks/{id}). The client then polls this endpoint to track progress or completion.

# CREATE endpoint should return no content
When a CREATE operation (typically a POST or PUT request that creates a new resource) successfully returns no content in the response body, the appropriate HTTP status code is 201 Created. This status code indicates that the request has been fulfilled and resulted in a new resource being created.