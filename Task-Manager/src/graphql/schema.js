/**
 * The purpose of schema.js in GraphQL is to define the structure of API - What data exists and what operations clients can perform.
 * Schema = Blueprint of GraphQL API.
 * It tells GraphQL about:
 *   - What types of data exists?
 *   - What queries can fetch data?
 *   - What mutations can modify data?
 *   - What arguments each operation needs?
 *   - What data type will be returned?
 */

// buildSchema converts schema defination string into a GraphQL schema object that the server understands.
import { buildSchema } from "graphql";

const schema = buildSchema(`
    type Task {
        id: ID!
        title: String!
        description: String
        completed: Boolean
    }

    type Query {
        tasks: [Task]
    }

    type Mutation {
        createTask(title: String!, description: String): Task
        updateTask(id: ID!, title: String, description: String, completed: Boolean): Task
        deleteTask(id: ID!): String
    }
`);

export default schema;