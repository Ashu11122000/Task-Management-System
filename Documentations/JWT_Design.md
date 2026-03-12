# JWT Design relavent to Application

# Overview
A JSON Web Token (JWT) is a secure way to send information between a client and a server. It is mainly used in web applications and APIs to verify users and prevent unauthorized access. A JWT is JSON data secured with a cryptographic signature.

# Authentication Flow
Register User (v1) -> Created Password -> Stores in Database (as a Hashed Password) -> login user (v1) -> Verify Password -> Generate JWT Token and returns to client

Client stores token -> calls protected apis using JWT token -> GET (/api/v1/tasks) or (/api/v2/taks) -> Auth Middleware verifies token

Auth Middleware verifies token -> req.user created -> controllers executed -> service queries database using userId -> Return authorized data

# JWT Structure
A JWT consists of three parts, separated by dots (.)

Header. Payload. Signature

1. Header: Contains metadata about the token, such as the algorithm used for signing.
2. Payload: Stores the claims, i.e., data being transmitted.
3. Signature: Ensures the token's integrity and authenticity.