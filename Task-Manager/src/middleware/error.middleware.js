export default function errorMiddleware(err, req, res, next) {

    // Used  to print an error message in the console. It helps developers debud problems in the application.
    console.error(err);

    /**
     * Used in Express.js error handling to send HTTP error response to the client.
     * res.status sets the HTTP status code of the response.
     * If the err.status exist -> use it, otherwise -> use 500
     */
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
    });
}