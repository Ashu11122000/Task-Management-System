# Dockerfile Designing 

# Create a postgres based docker file that should be auto initialized on startup. No manual SQL after container runs. 

# Use the official PostgreSQL image
FROM postgres:latest

# Set default environment variables
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=taskmanager

# Copy initialization SQL scripts into the special directory
# PostgreSQL automatically runs these scripts when the container starts for the first time
COPY src/database/init/ /docker-entrypoint-initdb.d/

# Expose PostgreSQL default port
EXPOSE 5432


- Database auto-created on startup - named after your app
version: "3.9"

services:

  postgres:
    image: postgres:latest
    container_name: task_manager
    restart: always
    environment:
      POSTGRES_DB: task_manager
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: task123@
    ports:
      - "5432:5432"
    volumes:
      - task_manager_data:/var/lib/postgresql/data
      - ./src/database/init.sql:/docker-entrypoint-initdb.d/01-init.sql
      - ./src/database/indexes.sql:/docker-entrypoint-initdb.d/02-indexes.sql
    networks:
      - task-network

  pgadmin:
    image: dpage/pgadmin4
    container_name: pgadmin-contai
    restart: always
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@taskmanager.com
      PGADMIN_DEFAULT_PASSWORD: admin123
    ports:
      - "5050:80"
    depends_on:
      - postgres
    volumes:
      - pgadmin_data:/var/lib/pgadmin
    networks:
      - task-network

  app:
    build: .
    container_name: task-manager-api
    restart: always
    depends_on:
      - postgres
    ports:
      - "5000:5000"
    environment:
      PORT: 5000
      PGHOST: postgres
      PGUSER: postgres
      PGPORT: 5432
      PGDATABASE: task_manager
      PGPASSWORD: task123@
      JWT_SECRET: taskmanagersecret
      JWT_EXPIRES_IN: 30d
    volumes:
      - .:/app
    command: npx nodemon src/server.js
    networks:
      - task-network


volumes:
  task_manager_data:
  pgadmin_data:

networks:
  task-network:

# Tables auto-initialized
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

# Seed data inserted automatically
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