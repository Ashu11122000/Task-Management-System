/**
 * UUID stands for Universlly Unique Identifier. 
 * It is a 128-bit unique value used to identify something uniquely (like users, tasks, etc.)
 */
import pool from "../../../config/db.js";
import { v4 as uuidv4 } from "uuid";


// CREATE TASK
export const createTaskService = async (userId, title, description) => {

    // Generates a unique ID for a task using uuidv4() function and stores it in the variable taskId.
    const taskId = uuidv4();

    //Creates a SQL query that inserts a new task into the tasks table and returns the inserted task.
    const query = `INSERT INTO tasks (id, title, description, user_id)
                   VALUES ($1, $2, $3, $4) RETURNING *`;

    // Creates an array of values that will be passed to the SQL query placeholders when inserting a task into the database.
    const values = [taskId, title, description, userId];

    // Executes the SQL query on the PostgreSQL database and stores the response from the database in the variable result.
    const result = await pool.query(query, values);

    // Returns the first row of data returned from the database query.
    return result.rows[0];
};


// GET TASKS
export const getTasksService = async (userId) => {

    // Creates a SQL query to fetch all tasks belonging to a specific user, sorted by the newest task first.
    const query = `SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC`;

    /**
     * Runs the SQL query on the PostgreSQL database to get tasks for a specific user
     * Stores the database response in the variable result.
     */
    const result = await pool.query(query, [userId]);

    // Returns all rows (records) returned by the database query.
    return result.rows;
};


// UPDATE TASK
export const updateTaskService = async (taskId, userId, title, description, status) => {

    // Creates a SQL query that updates a task in the tasks table and returns the updated task.
    const query = `UPDATE tasks SET title = $1, description = $2, status = $3
                   WHERE id = $4 AND user_id = $5 RETURNING *`;

    // Creates an array of values that will be passed to the SQL query placeholders when updating a task in the database.
    const values = [title, description, status, taskId, userId];

    // Runs the SQL query in the database.
    const result = await pool.query(query, values);

    // After executing the query, PostgreSQL returns an object.
    // rows is an array containing the rows returned by the query.
    return result.rows[0];
};

/**
 * Partially updates a task in the database.
 * This function dynamically builds a SQL UPDATE query based on
 * the fields provided in the request body.
 */
export const updatePatchedTaskService = async (id, data) => {

  // Array to store field assignments for SQL query (e.g., "title=$1")
  const fields = [];

  // Array to store values corresponding to the fields
  const values = [];

  // Index used for PostgreSQL parameter placeholders ($1, $2, $3...)
  let index = 1;

  /**
   * Loop through the data object sent by the client.
   * Example data:
   * { title: "New Task", status: "completed" }
   */
  for (const key in data) {

    // Create dynamic SQL field assignment like "title=$1"
    fields.push(`${key}=$${index}`);

    // Add the actual value for the field into the values array
    values.push(data[key]);

    // Increase index for the next placeholder
    index++;
  }

  // Add task ID to the values array for the WHERE clause
  values.push(id);

  /**
   * Build the final SQL query dynamically.
   * result:
   *   - UPDATE tasks
   *   - SET title=$1, status=$2
   *   - WHERE id=$3
   *   - RETURNING *
   */
  const query = ` UPDATE tasks SET ${fields.join(",")} WHERE id=$${index} RETURNING * `;

  // Execute the query with the collected values
  const result = await pool.query(query, values);

  // Return the updated task (first row of result)
  return result.rows[0];
};


// DELETE TASK
export const deleteTaskService = async (taskId, userId) => {

    // Creates a SQL query that deletes a task from the tasks table and retuns the deleted task.
    const query = `DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *`;

    // Executes the SQL query in the PostgreSQL database to delete a task.
    // Stores the database response in the variable result.
    const result = await pool.query(query, [taskId, userId]);

    // Returns the first row of data returned by the database query.
    return result.rows[0];
};