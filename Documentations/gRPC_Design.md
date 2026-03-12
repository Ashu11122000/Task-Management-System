#  gRPC service defination

# gRPC Overview
gRPC is a powerful framework for working with Remote Procedure Calls. RPCs allow you to write code as though it will be run on a local computer, even though it may be executed on another computer.

# gRPC Architectural Flow
gRPC Flow
Client (Postman gRPC) -> task.proto -> gRPC server -> task.service.js (v1) -> PostgreSQL database

# Proto Buffers(.proto) Design
Protobuf is the most commonly used IDL (Interface Definition Language) for gRPC. It's where you basically store your data and function contracts in the form of a proto file.

message TaskRequest {
  string id = 1;
}

message CreateTaskRequest {
  string title = 1;
  string description = 2;
}

message Task {
  string id = 1;
  string title = 2;
  string description = 3;
}

# Service Definations
A gRPC service definition, written in Protocol Buffers (protobuf), is a structured contract that specifies the methods a service provides and the message types it uses for communication. These definitions serve as a critical piece of documentation that outlines how clients can interact with a service, what data they should provide, and what responses they can expect in return.

service TaskService {
  rpc GetTasks (Empty) returns (TaskList);
  rpc GetTaskById (TaskRequest) returns (Task);
  rpc CreateTask (CreateTaskRequest) returns (Task);
}

1. Service : This is the top-level element in a gRPC service definition. It represents the service as a whole and is used to define the available remote methods.
2. RPC Method : Under the service, you define RPC methods. Each method outlines the name, input message type, and output message type. These methods are the entry points for client-server communication.
3. Message Types : Protobuf message types define the structure of the data sent and received in RPCs. These types are used for serializing and deserializing data, ensuring a consistent format during communication.

# gRPC URLs
URL for greating and getting tasks using gRPC: http://localhost:50051
