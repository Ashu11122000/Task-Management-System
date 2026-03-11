import * as commentService from "./comment.service.js";

export const createComment = async (req, res, next) => {
  try {

    // Extracts the taskId value from the URL parameters in an Express route.
    // req.params contains route parametes from the URL.
    const { taskId } = req.params;

    /**
     * This extracts the message field from the request body using JavaScript Destructuring.
     * JavaScript Object Destructuring allows to extract properties from an object and bind them to distinct variables in a readable way.
     * req.body contains data sent by the client in the request body, usually in POST, PUT and PATCH requests.
     */
    const { message } = req.body;

    /**
     * Service function to create a new comment and eaits for the result.
     * req.user.id: Identifies user in creating the comment.
     */
    const comment = await commentService.createComment( taskId, req.user.id, message );

    // Sends a successful HTTP response to the client with the created comment in JSON format.
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

export const getCommentsByTask = async (req, res, next) => {
  try {

    // Extracts the taskId value from the URL parameters in an Express route.
    // req.params contains route parametes from the URL.
    const { taskId } = req.params;

    // Fetches all comments related to a specific task and waits for the result.
    const comments = await commentService.getCommentsByTask(taskId);

    res.json(comments);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {

    // Extracts the taskId value from the URL parameters in an Express route.
    // req.params contains route parametes from the URL.
    const { id } = req.params;

    // Service function to delete a comment with the given id and waits until the deletion is completed.
    await commentService.deleteComment(id);

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    next(error);
  }
};