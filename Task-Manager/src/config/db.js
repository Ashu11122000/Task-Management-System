/**
 * Imports the PostgreSQL client library (pg) in a Node.js project that uses ES Modules.
 * pg is a Node.js package used to connect to PostgreSQL database.
 */
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

/**
 * JavaScript destructuring is an ES6 syntax that makes it possible to unpack
 * values from arrays or properties from objects into distinct, individual variables
 * in a concise and readable way.
 * Here, I use JavaScript destructuring to extract the Pool class from the pkg object.
 * And, as I import pkg as pg, it means pkg is the entire PostgreSQL library object.
 * Pool is a connection pool manager for PostgreSQL. 
 * Pool manages multiple database connections efficiently instead of opening a new connection every time.
 */
const { Pool } = pkg;

console.log("DB ENV CHECK");
console.log("HOST:", process.env.PGHOST);
console.log("USER:", process.env.PGUSER);
console.log("PASSWORD:", process.env.PGPASSWORD);
console.log("DATABASE:", process.env.PGDATABASE);

/**
 * This code creates a connection pool to our PostgreSQL database using the pg library in Node.js.
 * Pool is the class from the PostgreSQL client (pg) package.
 * It creates a new Pool.
 */
const pool = new Pool({
    host: process.env.PGHOST,    // This tells Node.js, where the database server is running
    user: process.env.PGUSER,    // This is the PostgreSQL username
    port: process.env.PGPORT,    // The port where PostgreSQL listens
    database: process.env.PGDATABASE,    // This specifies which database to connect to
    password: process.env.PGPASSWORD    // This is the password for the PostgreSQL user.
});

export default pool;