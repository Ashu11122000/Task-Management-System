# PostgreSQL Database table sepcification

# ERD diagram
![Database ERD](Task-Manager/src/images/Task Manager Database Tables ERD Diagram.png)

# Table definitions
A table is a collection of related data in an organized manner in the form of rows and columns. It is an organized arrangement of data and information in tabular form containing rows and columns, making it easier to understand and compare data.

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

# Relationships
Users and Tasks table: One-to-Many relationship
Users and Comments table: One-to-Many relationship
Tasks and Comments table: One-to-Many relationship

# Primary keys & Foreign Key
Primary Keys: User id, Tasks id, Comments id
Foriegn Keys: user_id in Tasks table