import pool from "../../../config/db.js";

export const createComment = async (taskId, userId, message) => {
  const query = ` INSERT INTO comments (task_id, user_id, message)
                  VALUES ($1, $2, $3) RETURNING * `;

  // Executes a SQL query on the database using PostgreSQL and waits for the result.
  const result = await pool.query(query, [taskId, userId, message]);

  // Returns the first row of the database query result.
  return result.rows[0];
};

export const getCommentsByTask = async (taskId) => {
  const query = ` SELECT * FROM comments WHERE task_id = $1 ORDER BY created_at DESC `;

  // Executes a SQL query in PostgreSQL and passes taskId as a parameter, then waits for the database to return the result.
  const result = await pool.query(query, [taskId]);

  // Returns all rows (records) by the database query.
  return result.rows;
};

export const deleteComment = async (id) => {
  const query = ` DELETE FROM comments WHERE id = $1 `;

  // Executes a SQL query in PostgreSQL using the value id and waits for the query to complete.
  await pool.query(query, [id]);
};