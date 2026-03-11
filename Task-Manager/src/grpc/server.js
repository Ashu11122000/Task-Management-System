/**
 * gRPC (Google Remote Procedure Call) is a framework used for communication between services. 
 * It allows one service to call functions on another service over the network.
 * In gRPC, the API is defined using Protocol Buffers (.proto file).
 * path is a built-in module of Node.js which is used to work with file and directory paths.
 * path helps in build, resolve, and manipulate file paths safely accross operating systems.
 * url is a built-in module of Node.js and its main propose is to convert a file URL into a normal file system path.
 */
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import { taskService } from "./task.service.js";
import path from "path";
import { fileURLToPath } from "url";

// Node.js module to get the full path of the current file.
const __filename = fileURLToPath(import.meta.url);

// Gets the directory (folder) path of the current file.
const __dirname = path.dirname(__filename);

// loads a .proto file and converts it into a JavaScript object that Node.js can use gRPC service.
// loadSync in gRPC is a method from @grpc/proto-loader library used to synchronously and analyze .proto into a package definition.
const packageDefinition = protoLoader.loadSync(

  // creates the correct file path to task.proto by joining the current directory with the protos folder.
  // path.join combines multiple path segments into a single valid path.
  path.join(__dirname, "./protos/task.proto")
);

/**
 * converts the loaded .proto definitions into usable gRPC service objects and accesses the task package.
 */
const proto = grpc.loadPackageDefinition(packageDefinition).task;

// Creates a new gRPC server instance in Node.js
const server = new grpc.Server();

/**
 * Registers a gRPC service with the server and connects it to the actual handler functions.
 * It tells the server thich service methods exist and which functions should execute when they are called.
 * server.addService() adds a service definition from the .proto file and links it with implementation functions.
 */
server.addService(proto.TaskService.service, taskService);

/**
 * This method is used to bind the gRPC server to a network address and port so that it can start listening for client requests.
 * In simple terms, it assigns the server a port to run on it.
 */
server.bindAsync(

  // This string represents the IP address and port number where the gRPC server will run and listen for requests.
  // 0.0.0.0 means listen on all network interfaces of the machine.
  // 50051 is a port number used so multiple services can run on the same machine.
  "0.0.0.0:50051",

  /**
   * Tells the gRPC server tun run without SSL/TLS encryption.
   * In simple terms, the server will accept unencrypted connections from the clients.
   * SSL (Secure Socket Layer) and TLS (Transport Layer Security) are cryptographic protocols that secure internet communications by encrypting data between a client and a server.
   * ServerCredentials defines the security settings of the gRPC server.
   */ 
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log("gRPC Server running on port 50051");
    server.start();
  }
);