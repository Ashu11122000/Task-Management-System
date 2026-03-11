import { registerUser, loginUser } from "./auth.service.js";

/**
 * It usually handles user registration (signup) in backend API.
 * (req, res) are Express request and response objects
 * req -> request: contains data sent by the client.
 * res -> response: Used to send data back to the client
 */
export const register = async (req, res) => {
  try {
    /**
     * Object Destructuring allows to extract properties from an object and
     *     bind them to distinct variables in a concise and readable way.
     * This is Object Destructuring in JavaScript. 
     * It extracts specific fields from an object.
     * req.body contains the data sent by the client in the request body.
     */
    const { name, email, password } = req.body;

    /**
     * Calls a function that creates a new user in the database and waits for the result.
     * registerUser() is usually a service function that contains the database logic for inserting a user.
     * This function:
     *   - Recieves the user data
     *   - Inserts it into PostgreSQL
     *   - Returns the created user
     */
    const user = await registerUser(name, email, password);

    /**
     * This line sends a response from the server back to the client after the user is successfully registered.
     * res is used to send back the response to the client.
     * 201 is the HTTP status code of the successfully created response.
     * .json() sends the response in JSON format
     */
    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {

    /**
     * 500 - Internal Server Error which means Something went wrong on the server.
     * Examples of server errors:
     *   - database connection failure
     *   - SQL query error
     *   - unexpected code error
     *   - missing environment variables
     */
     

    res.status(500).json({ error: error.message });
  }
};

/**
 * It usually handles user login in backend API.
 * (req, res) are Express request and response objects
 * req -> request: contains data sent by the client.
 * res -> response: Used to send data back to the client
 */
export const login = async (req, res) => {
  try {
      /**
     * Object Destructuring allows to extract properties from an object and
     *     bind them to distinct variables in a concise and readable way.
     * This is Object Destructuring in JavaScript. 
     * It extracts specific fields from an object.
     * req.body contains the data sent by the client in the request body.
     */
    const { email, password } = req.body;

    /**
     * This calls a function that authenticates the user and generates a JWT token.
     * Typical tasks inside loginUser: 
     *     - Find user in the database
     *     - Compare password with hashed password
     *     - Generate JWT token if password is correct
     */
    const token = await loginUser(email, password);

    /**
     * This sends the login response from the server to the client after the user successfully logs in.
     * Client sends login request -> Server processes login -> Server sends response using res.
     */
    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    /**
     * 401 is an HTTP status code that means unauthorized.
     * 401 is used when a client tries to access a resource but is not authenticated.
     * (no valid token/login)
     */
    res.status(401).json({ error: error.message });
  }
};
