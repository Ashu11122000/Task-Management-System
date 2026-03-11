/**
 * In GraphQL, a resolver is a function that fetches or returns the data for a specific field in a query or mutation.
 * A resolver tells GraphQL how to get the data requested in the query.
 * GraphQL itself does not know, where data is stored (database, API, file, etc.).
 * The resolver contains the logic to retrieve that data.
 * The main purpose of resolver.js in GraphQL is to handle the logic for queries and mutations and connect them to backend services/database/
 * In GraphQL, a Mutation is used to change data on the server (create, update, or delete).
 * Mutation = Write operation (modify data).
 */

/**
 * Import service layer functions.
 * We rename them using aliases to avoid name conflicts with resolver functions.
 */
import { getTasksService as getTasksServiceDB, createTaskService as createTaskServiceDB, updateTaskService as updateTaskServiceDB, deleteTaskService as deleteTaskServiceDB } from "../rest/v1/tasks/task.service.js";


const root = {

  /**
   * gettasksService is a GraphQL resolver function.
   * _ is a parent parameter. It represents the result returned by the resolver on the previous level of the query execution chain.
   * req: Arguement passes in the query. 
   * context: shared data like DB, auth. Context is a shared object or value provided to every resolver function during the execution of a single GraphQL operation.
   * info: Query metadata. It is a crucial object that contains the entire Abstract Syntax Tree of the incoming GraphQL query and other execution details.
   * Abstract Syntax Tree: A tree-structured, machine-readable representation of a GraphQL query string.
   */
  tasks: async (_, req) => {

    /**
     * uses optional chaining(?.) to safely access a property.
     * req: request object (usually from context or middleware)
     * user: authenticated user object
     * id: user's id
     * ?. : Access id only if user exists, otherwise return undefined instead of throwing an error.
     */
    const userId = req.user?.id;

    /**
     * Calls the function  getTasksService
     * Passes userId as an argument
     * Waits for the function to finish(await)
     * Returns the result to the 
     * Resolver -> getTasksService(userId -> Database query -> Return tasks)
     */
    return await getTasksServiceDB(userId);
  },

  /**
   * This is a GraphQL resolver function using argument destructuring.
   * Instead of writing args.title and args.description, directly extract them using destructuring.
   */
  createTask: async ({ title, description }, req) => {

    // Uses optional chaining(?.) means access this property if the object exists.
    // If req.user exists, return req.user.id, otherwise return undefined instead of throwing an error.
    const userId = req.user?.id;

    // Calls a service function to create a task and returns its result.
    // This service layer function probably insrts a task into the database.
    return await createTaskServiceDB(userId, title, description);
  },


 /**
  * This resolver is used to update a task.
  * ({ id, title, description, completed }) means destructuring the arguments.
  */
  updateTask: async ({ id, title, description, completed }, req) => {

    // Extract authenticated user id
    const userId = req.user?.id;

    // Calls the service function that updates a task in the database
    return await updateTaskServiceDB(id, userId, title, description, completed);
  },

  /**
   * This is object destructuring. 
   * It means the function expects an object that contains id, and it extracts the id from it.
   */
  deleteTask: async ({ id }, req) => {

    // Extract authenticated user id
    const userId = req.user?.id;

    // It calls the service function that deletes a task from the database and waits until the opertion finishes.
    await deleteTaskServiceDB(id, userId);

    return "Task deleted successfully";
  }

};

export default root;