import { createTaskService, getTasksService, updateTaskService, deleteTaskService, updatePatchedTaskService } from "./task.service.js";



export const getTasks = async (req, res) => {
    try {
        // Fetches all tasks that belong to the logged-in user from the database.
        const tasks = await getTasksService(req.user.id);

        // sends the tasks data from the server to the client in JSON format.
        res.json(tasks);
    } catch (error) {

        /**
         * This sends an error response to the client when something goes wrong on the server.
         * 500 - Internal Server Error - Something unexpected happened on the server.
         */
        res.status(500).json({ message: error.message });
    }
};



export const createTask = async (req, res) => {
    try {

        // This line extracts title and description from the request body sent by the client.
        const { title, description } = req.body;

        // creates a new task for the logged-in user by calling the service function and storing the created task in the variable "task"
        const task = await createTaskService( req.user.id, title, description );

        // Sends the newly created task back to the client with success status (201).
        res.status(201).json(task);
    } catch (error) {

        // This sends an error response to the client when something goes wrong on the server.
        res.status(500).json({ message: error.message });
    }
};



export const updateTask = async (req, res) => {
    try {

        /**
         * Extracts the id value from the URL parameters of the request.
         * It uses JavaScript Object Destructuring.
         * JavaScript Object Destructuring extract properties from an object and bind them to distinct variables in a concise way.
         * req.params: an object containing properties mapped to named route "parameters" in a URL path.
         * req.params captures dynakic values directly from the URL structure (like /user/:id captures id from /user/123)
         */
        const { id } = req.params;

        // Extracts title, description, and status from the request body sent by the client.
        // req.body contains the data sent by the client in the request body (usually JSON).
        const { title, description, status } = req.body;

        // Updates an existing task in the database for the logged-in user and stores the updated task in the variable task.
        const task = await updateTaskService( id, req.user.id, title, description, status );

        // Sends the task data from the server to the client in JSON format.
        res.json(task);
    } catch (error) {

        // Sends an error response to the client when something  goes wrong on the server.
        res.status(500).json({ message: error.message });
    }
};

export const updatePatchedTask = async (req, res) => {
    try {

        // Service function to partially update a task and waits for the updated task to be returned.
        const task = await updatePatchedTaskService(req.params.id, req.body);
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const deleteTask = async (req, res) => {
    try {

        /**
         * Extracts the id value from the URL parameters of the request.
         * It uses JavaScript object destructuring to get value from req.params
         * req.params contains route paramaters from the URL.
         */
        const { id } = req.params;

        // Calls a service function to delete a task belonging to the logged-in user and stores the result in the variable task.
        const task = await deleteTaskService(id, req.user.id);

        // Sends a response to the client confirming that the task was deleted, along with the deleted task data.
        res.json({ message: "Task deleted", task });
    } catch (error) {

        // Sends an error response to the client when the server encounters a problem.
        res.status(500).json({ message: error.message });
    }
};