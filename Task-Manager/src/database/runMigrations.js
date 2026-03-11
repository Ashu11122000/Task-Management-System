/**
 * fs module is a built-in Node.js module which allows Node.js application 
 *   -- to read, write, update, delete, and manage files on computer.
 * path module is used to workfs.r with file and directory paths and helps to build, resolve, and manipulate file paths.
 */
import fs from "fs";
import path from "path";
import pool from "../config/db.js";
/**
 * This is a declaration of asunchronous arrow function which helps in run database migration scripts.
 * Migration Scripts defines and executes changes to a database's structure (schema) and data over time.
 */
const runMigrations = async () => {
    try {
        /**
         * This reads the SQL file (init.sql) from application 
         * Stores its content in a variable so it can later be executed in PostgreSQL.
         * fs.readFileSync: This function is from Node.js file system (fs) module.
         * It reads a file from the application
         * Sync: synchronous (Node.js waits until the file is read)
         * utf8: This tells Node how to read a file.
         * Files are stored as binary data and utf8 converts the file into readable text (String).
         */
        const initSQL = eadFileSync(
            path.resolve("src/database/init.sql"),
            "utf8"
        );

        const indexSQL = fs.readFileSync(
            path.resolve("src/database/indexes.sql"),
            "utf8"
        );

        // Executes the SQL commands stored in initSQL and indexSQL on PostgreSQL database.
        await pool.query(initSQL);
        await pool.query(indexSQL);

        console.log("Database tables and indexes created successfully");
    } catch (error) {
        console.error("Database migration error", error);
    }
};

export default runMigrations;