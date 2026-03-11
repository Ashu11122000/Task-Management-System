-- Enable UUID generation extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS users;

-- USERS TABLE
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TASKS TABLE
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    title VARCHAR(225),
    description TEXT,
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- COMMENTS TABLE
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INSERT USERS
INSERT INTO users (id, name, email, password) VALUES
('11111111-1111-1111-1111-111111111111', 'Ashish Sharma', 'ashish@gmail.com', 'ashish11@'),
('22222222-2222-2222-2222-222222222222', 'Rahul Verma', 'rahul@gmail.com', 'rahul2@'),
('33333333-3333-3333-3333-333333333333', 'Neha Gupta', 'neha@gmail.com', 'neha30@');

-- INSERT TASKS
INSERT INTO tasks (id, user_id, title, description, status) VALUES
('aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1', '11111111-1111-1111-1111-111111111111', 'Build REST API', 'Develop REST APIs using Express', 'pending'),
('aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2', '11111111-1111-1111-1111-111111111111', 'Integrate Swagger', 'Add API documentation using Swagger', 'in-progress'),
('aaaaaaa3-aaaa-aaaa-aaaa-aaaaaaaaaaa3', '22222222-2222-2222-2222-222222222222', 'Setup GraphQL', 'Implement GraphQL schema and resolvers', 'pending'),
('aaaaaaa4-aaaa-aaaa-aaaa-aaaaaaaaaaa4', '33333333-3333-3333-3333-333333333333', 'Add gRPC service', 'Implement gRPC server for task service', 'completed');

-- INSERT COMMENTS
INSERT INTO comments (task_id, user_id, message) VALUES
('aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1', '11111111-1111-1111-1111-111111111111', 'Great start on the REST API'),
('aaaaaaa4-aaaa-aaaa-aaaa-aaaaaaaaaaa4', '33333333-3333-3333-3333-333333333333', 'Remember to add validation'),
('aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2', '11111111-1111-1111-1111-111111111111', 'Swagger UI looks good'),
('aaaaaaa3-aaaa-aaaa-aaaa-aaaaaaaaaaa3', '11111111-1111-1111-1111-111111111111', 'GraphQL schema implemented successfully');