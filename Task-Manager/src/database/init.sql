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
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
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

INSERT INTO users (name, email, password)
VALUES ('Ashish Sharma', 'ashu@gmail.com', 'ashish123@');

SELECT * FROM users;

SELECT * FROM users
WHERE id = '11111111-1111-1111-1111-111111111111';

SELECT * FROM users
WHERE email = 'ashish@gmail.com';

UPDATE users
SET name = 'Ashish Vats'
WHERE id = '11111111-1111-1111-1111-111111111111';

DELETE FROM users
WHERE id = '22222222-2222-2222-2222-222222222222';

INSERT INTO tasks (user_id, title, description, status)
VALUES ('e581dd23-876d-4cdd-bced-1e917e57a417', 'Finish Backend Project', 'Complete REST, GraphQL and gRPC APIs', 'pending');

UPDATE users
SET name = 'Rohan Verma'
WHERE email = 'ashu@gmail.com';

SELECT * FROM tasks;

SELECT * FROM tasks
WHERE user_id = 'e581dd23-876d-4cdd-bced-1e917e57a417';

UPDATE tasks
SET
title = 'Setup of GraphQL',
description = 'Implement GraphQL schema and resolvers',
status = 'completed'
WHERE id = 'aaaaaaa3-aaaa-aaaa-aaaa-aaaaaaaaaaa3';

INSERT INTO comments (task_id, user_id, message)
VALUES ('aaaaaaa3-aaaa-aaaa-aaaa-aaaaaaaaaaa3', '22222222-2222-2222-2222-222222222222', 'This task needs optimization');

SELECT * FROM comments
WHERE task_id = 'aaaaaaa3-aaaa-aaaa-aaaa-aaaaaaaaaaa3';

SELECT tasks.id, tasks.title, tasks.description, tasks.status, users.name, users.email FROM tasks
JOIN users ON tasks.user_id = users.id;

SELECT comments.message, users.name AS commenter, tasks.title AS task_title FROM comments
JOIN users ON comments.user_id = users.id
JOIN tasks ON comments.task_id = tasks.id;

SELECT tasks.id, tasks.title, COUNT(comments.id) AS comment_count FROM tasks
LEFT JOIN comments
ON tasks.id = comments.task_id
GROUP BY tasks.id;

SELECT tasks.title, comments.message FROM tasks
LEFT JOIN comments
ON tasks.id = comments.task_id;

SELECT users.name, COUNT(tasks.id) AS total_tasks FROM users
LEFT JOIN tasks
ON users.id = tasks.user_id
GROUP BY users.name;

SELECT * FROM tasks ORDER BY created_at DESC LIMIT 10;

SELECT * FROM tasks WHERE title ILIKE '%backend%';

BEGIN;

INSERT INTO tasks (user_id, title, description, status)
VALUES ('11111111-1111-1111-1111-111111111111', 'Build REST API', 'Develop REST APIs using Express', 'pending');

INSERT INTO comments (task_id, user_id, message)
VALUES ('aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1', '11111111-1111-1111-1111-111111111111', 'Complete this task as soon as possible');

COMMIT;

ROLLBACK;