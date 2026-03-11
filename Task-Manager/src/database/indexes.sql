/*
- These are PostgreSQL index creation statements. 
- An index helps the database fine rows faster when queries search by certail columns
*/
CREATE INDEX IF NOT EXISTS user_email ON users(email);

CREATE INDEX IF NOT EXISTS tasks_user_id ON tasks(user_id);

CREATE INDEX IF NOT EXISTS tasks_status ON tasks(status);

CREATE INDEX idx_comments_task_id ON comments(task_id);