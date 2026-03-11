/**
 * uuidv4 is used to generate a unique ID in JavaScript.
 * uuidv4 comes from the UUID (Universal Unique Identifier) library.
 * uuidv4 is commonly used to create unique identifiers for database records like users, tasks, etc.
 * hashPassword is a function used to convert a plain password into a secure encrypted hash before storing it in the database.
 * hashPassword is used for security so that real passwords are never stored directly in the database.
 */
import pool from "../../../config/db.js";
import { v4 as uuidv4 } from "uuid";
import { hashPassword, comparePassword } from "../../../utils/password.js";
import { generateToken } from "../../../utils/jwt.js";

// This defines and exports an asynchronous function called regiesterUser that is used to create a new user in the database.
export const registerUser = async (name, email, password) => {

  // Converts the user's plain password into a secure hashed password beforestoring it in the database.
  const hashedPassword = await hashPassword(password);

  // This line generates a unique ID for a user using the uuidv4() function.
  const userId = uuidv4();

  // This creates a SQL query string that will be used to insert a new user into the PostgreSQL database.
  // Backticks(``) is called template literal in JavaScript.
  const query = ` INSERT INTO users (id, name, email, password)
        VALUES ($1, $2, $3, $4) RETURNING id, name, email `;

  // This creates an array of values that will be passed to the SQL query placeholders.
  const values = [userId, name, email, hashedPassword];

  // This executes the SQL query on the PostgreSQL database and stores the result.
  const result = await pool.query(query, values);

  // This returns the first row of data returned from the database query.
  return result.rows[0];
};


// Defines and exports an asynchronous function called loginUser that is used to authenticate a user during login.
export const loginUser = async (email, password) => {

  // This line creates a SQL query that retrieves a user from the database using their email.
  const query = `SELECT * FROM users WHERE email = $1`;

  // This runs the SQL query on the PostgreSQL database to find a user with the given email and stores the result.
  const result = await pool.query(query, [email]);

  // This get the first user record returned from the database query and stores it in the variable "user".
  const user = result.rows[0];

  /**
   * This checks whether the user exists in the database.
   * If the user does not exists, it throws an error.
   */
  if (!user) {
    throw new Error("User not found");
  }

  // This checks whether the password entered by the user matcehs the hashed password stored in the database.
  const validPassword = await comparePassword(password, user.password);

  /**
   * This checks whether the entered password is correct. 
   * If the password is incorrect, it throws an error and stops the login process.
   */
  if (!validPassword) {
    throw new Error("Invalid credentials");
  }

  // This creates a JWT (JSON web token) for the user after successful login.
  // generateToken is a function that creates a JWT token.
  // The object passed inside generateToken() is called the payload.
  const token = generateToken({
    id: user.id,
    email: user.email,
  });

  // This returns the generated JWT token from the function to the place where the function was called.
  return token;
};
