// Creates an empty array named tasks.
const tasks = [];


// Creates and exports an object called taskService that will contain functions related to task operations (like create, get, update, delete)
export const taskService = {

  /**
   * Defines a gRPC service method (handler function) named GetTasks.
   * It handles the GetTasks RPC request sent by a gRPC client.
   * GetTasks is a method defined in the .proto file.
   * call holds the request from the client.
   * callback sends the response back to the client.
   */
  GetTasks: (call, callback) => {

    /**
     * Sends the response from the gRPC server back to the client.
     * In gRPC server handlers, responses are returned using a callback function.
     */
    callback(null, { tasks });
  },

  /**
   * Define a gRPC service method handler named GetTasksById.
   * It must be defined in the .proto file.
   */
  GetTaskById: (call, callback) => {

    // Searches the tasks array to find a task whose id matches the ID sent in the gRPC request.
    const task = tasks.find(t => t.id === call.request.id);

    /**
     * This checks if the task was not found and sends an error response to the gRPC client.
     * If no task matches the id, executes the error block.
     * In gRPC status codes: 
     *   - 0 -> Ok
     *   - 3 -> Invalid Argument
     *   - 5 -> Not Found
     *   - 13 -> Internal Error
     */
    if (!task) {
      return callback({ code: 5, message: "Task not found" });
    }

    // If request is successful and there is no error, then, it returns null as error and sends the task data back to the gRPC client as the response.
    callback(null, task);
  },

  /**
   * gRPC service method implementation in Node.js.
   * It handles a request sent from the gRPC client to create a new task.
   * call: contains the request data sent by the client.
   * callback: used to send the response back to the client.
   */
  CreateTask: (call, callback) => {
    const newTask = {

      // commonly used to generate a unique ID based on the current timestamp.
      id: Date.now().toString(),

      // getting the title value from the request sent by the gRPC client.
      title: call.request.title,

      // extracts the description field from the gRPC request sent by the client and assigns it to the description property of the task object.
      description: call.request.description
    };

    // adds the newly created task into the tasks array.
    tasks.push(newTask);

    //  // If request is successful and there is no error, then, it returns null as error and sends the task data back to the gRPC client as the response.
    callback(null, newTask);
  }
};