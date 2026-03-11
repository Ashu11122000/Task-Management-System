/**
 * jsonwebtoken is an npm package used to Generate authentication tokens, verify tokens, etc.
 */
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
/**
 * payload refers to the actual data that is sent or recieved in a body of an HTTP request or response.
 * payload is the data which stores inside the JWT token.
 */
export const generateToken = (payload) => {

    /**
     * Uses jsonwebtoken library to generate a token that will later be used for authentication.
     * payload: Data stored in token
     * secret: Secret key used to sign token
     * options: Extra settings like expiration
     * process.env.JWT_SECRET: This is the secret key used to sign the token. (It comes from .env file)
     * expiresIn: This sets how long the token is valid
     */
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_In
    });
};

/**
 * This function is used to verify a JWT token and decode the data stored in it.
 * The function recieves a JWT token as input (token).
 * jwt.verify: This method verifies the token using the secret key
 * process.env.JWT_SECRET: This is the secret key used when generating the token.
 * jwt.verify checks:
 *     - Whether the token was signed with the correct secret
 *     - Whether the token has expired
 *     - Whether the token has been modified 
 */
export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};