/**
 * The main purpose of this code is to provide an improved version (v2) of the "Get Tasks" API that:
 *   - Retrieves tasks for the authenticated user
 *   - Allows filtering tasks by completion status
 *   - Supports pagination (page & limit)
 *   - Returns a structured JSON response
 */
import { getTasksService } from "../v1/tasks/task.service.js";

// Creates and exports an asynchronous function used as a controller for an API route
export const getTasksV2 = async(req, res) => {
    try {

        // Extracts the user's ID from the request object that was added by authentication middleware.
        const userId = req.user.userId;

        // Gets the page number from the request query and ensures it is a number, otherwise it defaults to page 1
        const page = parseInt(req.query.page) || 1;

        // Gets the number of records to return per page from the request query and sets a default value of 10 if none is provided.
        const limit = parseInt(req.query.limit) || 10;

        // Reads the completed value from the URL query parameters and stores it in a variable.
        const completed = req.query.completed;

        // Calls a service function to fetch tasks for a specific user from the database and waits for the result.
        const tasks = await getTasksService(userId);

        // Creates a new variable filteredTasks and assigns it the value of tasks so that the tasks can be modified or filtered later.
        let filteredTasks = tasks;

        // This checks whether the completed query parameter exists in the request
        if(completed !== undefined) {

            /**
             * filter() is a JavaScript array method
             * It creates a new array containing only the elements that match a condition.
             * task.completed: This accesses the completed status of the task.
             */
            filteredTasks = tasks.filter(
                task => task.completed === (completed === "true")
            );
        }

        // Used in pagination to calculate from which index the tasks should start when returning results.
        const start = (page - 1) * limit;

        // Used in pagination to calculate the ending index of tasks to return.
        const end = start + limit;

        // Extracts a portion of tasks from the filtered list based on pagination.
        const paginatedTasks = filteredTasks.slice(start, end);

        // Sends a JSON response back to the client containing pagination information and the tasks for the current page.
        res.json({ page, limit, total: filteredTasks.length, data: paginatedTasks });
    } catch (error) {

        // Used to send an error response to the client when something goes wrong on the server.
        res.status(500).json({ message: error.message });
    }
};