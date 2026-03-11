import { verifyToken } from "../utils/jwt.js";

// Defines a middleware function for authentication in Express.js
const authMiddleware = (req, res, next) => {

    /**
     * Gets the Authorization header from the HTTP request. 
     * It is commonly used for JWT authentication.
     * req: Request object from the client.
     * req.headers: All headers sent with the request.
     * authorization Header used to send authentication tokens.
     * authHeader: Variable storing the authorization value.
     */
    const authHeader = req.headers.authorization;

    /**
     * This checks whether the client sent an Authorization token or not.
     * If the token is missing, the server returns an error response.
     * Authorization Header is an HTTP request Header used to send authentication credentials from the client to the server.
     * Bearer is a type of authentication scheme used in the Authorization header.
     * The word Bearer means: Whoever bears (holds) the token can access the resource.
     */
    if(!authHeader) {
        return res.status(401). json({ message: "Token required" });
    }

    // Extracts the actual token from the Authorization header.
    // .split(" ") separates the string by space.
    const token = authHeader.split(" ")[1];

    try {

        /**
         * This verifies the JWT token and extracts the user information stored inside it.
         * It is commonly used in JWT authentication middleware.
         * It will do:
         *   - Takes the JWT Token
         *   - Sends it to verifyToken() function
         *   - Checks if the token is valid 
         *   - Returns the decoded payload
         */
        const decoded = verifyToken(token);

        // Attaches the decoded user information to the request object so that it can be used in the next middleware or route handler.
        req.user = decoded;

        // Function in Express Middleware used to pass control to the next middleware or route handler in the request-response cycle.
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invaid Token" });
    }
};

export default authMiddleware;