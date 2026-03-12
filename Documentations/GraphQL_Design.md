# GraphQL specification

# GraphQL Overview
GraphQL is a query language for APIs that allows clients to request exactly the data they need, and nothing more. With GraphQL, clients can specify the shape and structure of the data they want to receive, and the server will return only that data. This makes it possible to build more efficient and flexible APIs that can better support a wide range of client applications.

# GraphQL Endpoint
/graqhl

# GraphQL Flow Architecture
Client -> /graqhl endpoint -> schema.js (defines the structure of APIs) -> resolver.js (Used to fetch actual data) -> task.service(v1) -> PostgreSQL Database

# GraphQL URLs
POST http://localhost:5000/graqhl (To create GraphQL query)
GET http://localhost:5000/graqhl (To get GraphQL query)

# Mutation Types
Mutations allows to add, update, or delete data.
createTask
updateTask
deleteTask

# Query
Queries fetch data without altering it.
In task manager, query is for tasks.

# Resolvers
A resolver is a function that resolves a value for a type or field in a schema. Resolvers can return objects or scalars like Strings, Numbers, Booleans, etc.
In Task manager, there are three resolvers: getTasks, createTask, updateTask and deleteTask
