# Task Manager Backend System Design

## Overview

This project documents the design of a simple **Task Manager backend system**.
A Task Management System is really helpful for people and teams to keep track of tasks. It should be easy for users to create tasks by adding a title and description and priority level. 

## Requirements
* Login/Register of users: The system should let people log in or sign up. That's the way, everyone has their own account.
* Functionality to give tasks to individual users.
* Allows users to create, update, or delete tasks. This feature lets users make tasks change existing ones and delete them if
  necessary.
* Each task inclueds: id, title, description, and status (pending, in progress, completed).
* Commenting on tasks, sharing files related to it. 

The system explains backend architecture using:

* REST API Design
* GraphQL API Design
* gRPC Service Design
* PostgreSQL Database Design
* JWT Authentication Strategy
* Dockerized PostgreSQL Setup
* Postman API Collection
* OpenAPI / Swagger Specification

This repository focuses on **backend architecture and API design practices**.

---

# Project Structure

```
task-manager
│
├── src
│   │
│   ├── config
│   │   └── db.js
│   │
│   ├── database
│   │   ├── init.sql
│   │   ├── indexes.sql
│   │   └── userMigration.js
│   │
│   ├── rest
│   │   ├── v1
│   │   │   ├── auth
│   │   │   │   ├── auth.controller.js
│   │   │   │   ├── auth.routes.js
│   │   │   │   └── auth.service.js
│   │   │   │
│   │   │   ├── tasks
│   │   │   │   ├── task.routes.js
│   │   │   │   ├── task.controller.js
│   │   │   │   └── task.service.js
│   │   │   │
│   │   │   └── comments
│   │   │       ├── comment.routes.js
│   │   │       ├── comment.controller.js
│   │   │       └── comment.service.js
│   │   │
│   │   └── v2
│   │       ├── task.routes.js
│   │       └── task.controller.js
│   │
│   ├── graphql
│   │   ├── schema.js
│   │   └── resolver.js
│   │
│   ├── grpc
│   │   ├── protos
│   │   │   └── task.proto
│   │   ├── server.js
│   │   └── task.service.js
│   │
│   ├── middleware
│   │   └── auth.middleware.js
│   │
│   ├── swagger
│   │   └── swagger.js
│   │
│   ├── utils
│   │   ├── jwt.js
│   │   └── password.js
│   │
│   └── server.js
│
├── docker-compose.yml
├── Dockerfile
├── .env
├── package.json
└── README.md
```

---

# System Design Components

This project includes documentation for the following backend components:

* REST APIs
* GraphQL APIs
* gRPC Services
* PostgreSQL Database Design
* Authentication Strategy (JWT)
* Docker-based PostgreSQL Setup
* API Testing via Postman
* Swagger / OpenAPI Documentation


---

## Installation and Setup
1. Clone the Repository: https://github.com/Ashu11122000/Task-Manager.git

2. cd Task-Manager

3. npm install

4. npm install nodemon bcrypt cors dotenv express jsonwebtoken pg uuid fs

5. npm install @grpc/grpc-js @grpc/proto-loader path grpc-tools

6. npm install express-graphql graphql

7. npm install swagger-jsdoc swagger-ui-express 

8. Run the application: nodemon src/server.js

---

# Technologies Used

* Node.js
* Express.js
* PostgreSQL
* GraphQL
* gRPC
* JWT Authentication
* Docker
* Swagger
* Postman



