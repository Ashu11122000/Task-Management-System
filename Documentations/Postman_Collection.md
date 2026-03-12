# Add all designed APIs to Postman
Register: POST {{base_url}}/api/v1/auth/register
Login: POST {{base_url}}/api/v1/auth/login
Get All Tasks: GET {{base_url}}/api/v1/tasks
Get All Tasks by Versioning: GET {{base_url}}/api/v2/tasks?page=1&limit=5&completed=false
Create Tasks: POST {{base_url}}/api/v1/tasks
Update Tasks by Id: PUT {{base_url}}/api/v1/tasks/{{task_id}}
Delete Tasks by Id: DELETE {{base_url}}/api/v1/tasks/{{task_id}}
GraphQL Get Tasks: GET {{base_url}}/graqhl
GraphQL Create Tasks: POST {{base_url}}/graqhl
Create Comments: POST {{base_url}}/api/v1/tasks/{{task_id}}/comments
Get Comments by Id: GET {{base_url}}/api/v1/tasks/{{task_id}}/comments
Delete Comments by user id and comment id: DELETE {{base_url}}/api/v1/tasks/{{task_id}}/comments/{{comment_id}}

# Add test scripts (basic response validation)
1. Click on the Task Manager collection
2. Then, select scripts
3. In Scripts, then select post-response
4. In post-response, enter all these scripts

pm.test("Status code is successful", function () {
    pm.expect(pm.response.code).to.be.oneOf([200,201,204]);
});

pm.test("Response time is less than 2000ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(2000);
});

pm.test("Response body is not empty", function () {
    pm.expect(pm.response.text()).to.not.be.empty;
});

pm.test("Response is JSON", function () {
    pm.response.to.be.json;
});

5. Then save these scripts.
6. Lastly, run the complete collection.

# Ensure APIs can be easily switched between dev, prod, and stage environments
The collection of Task Manager supports environments of DEV, PROD, and STAGE, which allows th switched between development, staging, and production environments without modifying request URLS more. All API endpoints use the variable {{base_url}}.

Environment Variables                        Base URLs
DEV                                          http://localhost:5000
PROD                                         https://api.taskmanager.com
STAGE                                        https://staging-api.taskmanager.com

-> Open the Environment Selector in the top-right corner of Postman.
-> Select the Environment from there: DEV, PROD, or STAGE.

# Export collection JSON and commit to repo
1. Right-click on the Task Manager Collection
2. Click Export
3. Select the folder from the local computer 
4. Postman collection imported into the selected folder.
{
  "info": {
    "_postman_id": "a0fa4ef1-eaf2-451b-be03-4804a107e65f",
    "name": "Task Manager",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Register",
      "id": "4d943add-8632-47d0-bd83-a45ed3e86333",
      "request": {
        "auth": {
          "type": "noauth"
        },
        "method": "POST",
        "header": [],
        "body": {
          "mode": "raw",
          "raw": "{\r\n \"name\": \"Ashish\",\r\n \"email\": \"ashu@gmail.com\",\r\n \"password\": \"123456789\"\r\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "http://localhost:5000/api/v1/auth/register",
          "protocol": "http",
          "host": [
            "localhost"
          ],
          "port": "5000",
          "path": [
            "api",
            "v1",
            "auth",
            "register"
          ]
        }
      },
      "response": []
    },
    {
      "name": "Login",
      "id": "f818e1ed-a1dc-4b57-9a16-28f0f253755b",
      "request": {
        "auth": {
          "type": "noauth"
        },
        "method": "POST",
        "header": [],
        "body": {
          "mode": "raw",
          "raw": "{\r\n \"email\": \"ashu@gmail.com\",\r\n \"password\": \"123456789\"\r\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "http://localhost:5000/api/v1/auth/login",
          "protocol": "http",
          "host": [
            "localhost"
          ],
          "port": "5000",
          "path": [
            "api",
            "v1",
            "auth",
            "login"
          ]
        }
      },
      "response": []
    },
    {
      "name": "Get All Tasks",
      "id": "2e623061-9f2d-43d4-9687-d5dae01ee9a4",
      "request": {
        "auth": {
          "type": "noauth"
        },
        "method": "GET",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY2YTAzMGM2LTE2NzYtNGNjMS1iNDVkLWEwNWU4NjljODUzZCIsImVtYWlsIjoiYXNodUBnbWFpbC5jb20iLCJpYXQiOjE3NzMyMjE0ODcsImV4cCI6MTc3NTgxMzQ4N30.ZK3B96sQT38gDns1m57KYdAv-W-HYwcGpAZsYmJrPCM",
            "type": "text"
          }
        ],
        "url": {
          "raw": "{{base_url}}/api/v1/tasks",
          "host": [
            "{{base_url}}"
          ],
          "path": [
            "api",
            "v1",
            "tasks"
          ]
        }
      },
      "response": []
    },
    {
      "name": "Get All Tasks By Versioning",
      "id": "15a1baaf-b6aa-4882-acc5-e23df8e194e8",
      "request": {
        "auth": {
          "type": "noauth"
        },
        "method": "GET",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY2YTAzMGM2LTE2NzYtNGNjMS1iNDVkLWEwNWU4NjljODUzZCIsImVtYWlsIjoiYXNodUBnbWFpbC5jb20iLCJpYXQiOjE3NzMyMjE0ODcsImV4cCI6MTc3NTgxMzQ4N30.ZK3B96sQT38gDns1m57KYdAv-W-HYwcGpAZsYmJrPCM",
            "type": "text"
          }
        ],
        "url": {
          "raw": "{{base_url}}/api/v2/tasks?page=1&limit=5&completed=false",
          "host": [
            "{{base_url}}"
          ],
          "path": [
            "api",
            "v2",
            "tasks"
          ],
          "query": [
            {
              "key": "page",
              "value": "1"
            },
            {
              "key": "limit",
              "value": "5"
            },
            {
              "key": "completed",
              "value": "false"
            }
          ]
        }
      },
      "response": []
    },
    {
      "name": "Update Task",
      "id": "5bca754b-e3e4-417f-8f7e-ecbf2ed64855",
      "request": {
        "auth": {
          "type": "noauth"
        },
        "method": "PUT",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY2YTAzMGM2LTE2NzYtNGNjMS1iNDVkLWEwNWU4NjljODUzZCIsImVtYWlsIjoiYXNodUBnbWFpbC5jb20iLCJpYXQiOjE3NzMyMjE0ODcsImV4cCI6MTc3NTgxMzQ4N30.ZK3B96sQT38gDns1m57KYdAv-W-HYwcGpAZsYmJrPCM",
            "type": "text"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\r\n  \"title\": \"Learn Node.js authentication deeply\",\r\n  \"completed\": true\r\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "{{base_url}}/api/v1/tasks/0d254a32-bc9a-41d2-981e-7ca6df178d61",
          "host": [
            "{{base_url}}"
          ],
          "path": [
            "api",
            "v1",
            "tasks",
            "0d254a32-bc9a-41d2-981e-7ca6df178d61"
          ]
        }
      },
      "response": []
    },
    {
      "name": "Create Tasks",
      "id": "449df283-1ba2-4135-8c71-d6adf118e01a",
      "request": {
        "auth": {
          "type": "noauth"
        },
        "method": "POST",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY2YTAzMGM2LTE2NzYtNGNjMS1iNDVkLWEwNWU4NjljODUzZCIsImVtYWlsIjoiYXNodUBnbWFpbC5jb20iLCJpYXQiOjE3NzMyMjE0ODcsImV4cCI6MTc3NTgxMzQ4N30.ZK3B96sQT38gDns1m57KYdAv-W-HYwcGpAZsYmJrPCM",
            "type": "text"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\r\n  \"title\": \"Learn Node.js authentication\"\r\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "{{base_url}}/api/v1/tasks",
          "host": [
            "{{base_url}}"
          ],
          "path": [
            "api",
            "v1",
            "tasks"
          ]
        }
      },
      "response": []
    },
    {
      "name": "Delete Task",
      "id": "4e7ca111-c156-4479-bd01-ebbf480fee59",
      "request": {
        "auth": {
          "type": "noauth"
        },
        "method": "DELETE",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY2YTAzMGM2LTE2NzYtNGNjMS1iNDVkLWEwNWU4NjljODUzZCIsImVtYWlsIjoiYXNodUBnbWFpbC5jb20iLCJpYXQiOjE3NzMyMjE0ODcsImV4cCI6MTc3NTgxMzQ4N30.ZK3B96sQT38gDns1m57KYdAv-W-HYwcGpAZsYmJrPCM",
            "type": "text"
          }
        ],
        "url": {
          "raw": "{{base_url}}/api/v1/tasks/6e7922d8-de18-4883-bd8d-855a1b0a4589",
          "host": [
            "{{base_url}}"
          ],
          "path": [
            "api",
            "v1",
            "tasks",
            "6e7922d8-de18-4883-bd8d-855a1b0a4589"
          ]
        }
      },
      "response": []
    },
    {
      "name": "Get Tasks Query",
      "id": "387dd58f-1ef8-4a26-b359-31c1cc21ca55",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY2YTAzMGM2LTE2NzYtNGNjMS1iNDVkLWEwNWU4NjljODUzZCIsImVtYWlsIjoiYXNodUBnbWFpbC5jb20iLCJpYXQiOjE3NzMyMjE0ODcsImV4cCI6MTc3NTgxMzQ4N30.ZK3B96sQT38gDns1m57KYdAv-W-HYwcGpAZsYmJrPCM",
            "type": "text"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\r\n  \"query\": \"query { tasks { id title description completed } }\"\r\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "{{base_url}}/graqhl",
          "host": [
            "{{base_url}}"
          ],
          "path": [
            "graqhl"
          ]
        }
      },
      "response": []
    },
    {
      "name": "Create Task Query",
      "id": "3d476529-9b45-4176-9446-15c0ddfe50f5",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY2YTAzMGM2LTE2NzYtNGNjMS1iNDVkLWEwNWU4NjljODUzZCIsImVtYWlsIjoiYXNodUBnbWFpbC5jb20iLCJpYXQiOjE3NzMyMjE0ODcsImV4cCI6MTc3NTgxMzQ4N30.ZK3B96sQT38gDns1m57KYdAv-W-HYwcGpAZsYmJrPCM",
            "type": "text"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\r\n  \"query\": \"mutation { createTask(title:\\\"Learn GraphQL\\\", description:\\\"Practice schema and resolvers\\\") { id title description completed } }\"\r\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "{{base_url}}/graqhl",
          "host": [
            "{{base_url}}"
          ],
          "path": [
            "graqhl"
          ]
        }
      },
      "response": []
    },
    {
      "name": "Partial Update Task",
      "id": "f799ec19-8226-489e-ad7a-7467469d18b9",
      "request": {
        "method": "PATCH",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY2YTAzMGM2LTE2NzYtNGNjMS1iNDVkLWEwNWU4NjljODUzZCIsImVtYWlsIjoiYXNodUBnbWFpbC5jb20iLCJpYXQiOjE3NzMyMjE0ODcsImV4cCI6MTc3NTgxMzQ4N30.ZK3B96sQT38gDns1m57KYdAv-W-HYwcGpAZsYmJrPCM",
            "type": "text"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\r\n  \"title\": \"Learn GraphQL Advanced\",\r\n  \"status\": \"completed\"\r\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "{{base_url}}/api/v1/tasks/fb010fb1-d83a-4c04-965f-188eb08dbe8d",
          "host": [
            "{{base_url}}"
          ],
          "path": [
            "api",
            "v1",
            "tasks",
            "fb010fb1-d83a-4c04-965f-188eb08dbe8d"
          ]
        }
      },
      "response": []
    },
    {
      "name": "Create Comment",
      "id": "6f7a3817-2f84-4f18-aacc-60904d3ccbf1",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY2YTAzMGM2LTE2NzYtNGNjMS1iNDVkLWEwNWU4NjljODUzZCIsImVtYWlsIjoiYXNodUBnbWFpbC5jb20iLCJpYXQiOjE3NzMyMjE0ODcsImV4cCI6MTc3NTgxMzQ4N30.ZK3B96sQT38gDns1m57KYdAv-W-HYwcGpAZsYmJrPCM",
            "type": "text"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\r\n  \"message\": \"This task needs to be completed today\"\r\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "{{base_url}}/api/v1/tasks/aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1/comments",
          "host": [
            "{{base_url}}"
          ],
          "path": [
            "api",
            "v1",
            "tasks",
            "aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1",
            "comments"
          ]
        }
      },
      "response": []
    },
    {
      "name": "Get comments",
      "id": "e4fca88a-00e8-4ad1-9137-5d70168e8bc1",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY2YTAzMGM2LTE2NzYtNGNjMS1iNDVkLWEwNWU4NjljODUzZCIsImVtYWlsIjoiYXNodUBnbWFpbC5jb20iLCJpYXQiOjE3NzMyMjE0ODcsImV4cCI6MTc3NTgxMzQ4N30.ZK3B96sQT38gDns1m57KYdAv-W-HYwcGpAZsYmJrPCM",
            "type": "text"
          }
        ],
        "url": {
          "raw": "{{base_url}}/api/v1/tasks/aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1/comments",
          "host": [
            "{{base_url}}"
          ],
          "path": [
            "api",
            "v1",
            "tasks",
            "aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1",
            "comments"
          ]
        }
      },
      "response": []
    },
    {
      "name": "Delete Comment",
      "id": "ee81aebb-8bb0-4cb3-8a23-6f47d6af1e5d",
      "request": {
        "method": "DELETE",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY2YTAzMGM2LTE2NzYtNGNjMS1iNDVkLWEwNWU4NjljODUzZCIsImVtYWlsIjoiYXNodUBnbWFpbC5jb20iLCJpYXQiOjE3NzMyMjE0ODcsImV4cCI6MTc3NTgxMzQ4N30.ZK3B96sQT38gDns1m57KYdAv-W-HYwcGpAZsYmJrPCM",
            "type": "text"
          }
        ],
        "url": {
          "raw": "{{base_url}}/api/v1/tasks/aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1/comments/173a5c85-84e9-4efa-b7a2-d72468108f2a",
          "host": [
            "{{base_url}}"
          ],
          "path": [
            "api",
            "v1",
            "tasks",
            "aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1",
            "comments",
            "173a5c85-84e9-4efa-b7a2-d72468108f2a"
          ]
        }
      },
      "response": []
    },
    {
      "name": "New Request",
      "id": "7663cf4e-93bf-4a5f-aaeb-347cf32fa1cf",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": ""
        }
      },
      "response": []
    },
    {
      "name": "New Request",
      "id": "b1d9231a-f424-43a3-b957-26b1f8468b3c",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": ""
        }
      },
      "response": []
    },
    {
      "name": "New Request",
      "id": "113eb529-4036-40ca-9d7b-75f563fb4cf5",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": ""
        }
      },
      "response": []
    },
    {
      "name": "New Request",
      "id": "a0b13e4e-2ff8-49a4-a9c5-4fc86693d262",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": ""
        }
      },
      "response": []
    },
    {
      "name": "New Request",
      "id": "6fdf51d0-c5b7-4bb9-91df-5c65a18e875a",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": ""
        }
      },
      "response": []
    }
  ],
  "event": [
    {
      "listen": "prerequest",
      "script": {
        "id": "2c6ef6c9-b9f2-4000-bb67-238be7f8c313",
        "type": "text/javascript",
        "packages": {},
        "requests": {},
        "exec": [
          ""
        ]
      }
    },
    {
      "listen": "test",
      "script": {
        "id": "35a7e2b0-bd6b-4a09-9299-33943c374d38",
        "type": "text/javascript",
        "packages": {},
        "requests": {},
        "exec": [
          "pm.test(\"Status code is successful\", function () {\r",
          "    pm.expect(pm.response.code).to.be.oneOf([200, 201, 204]);\r",
          "});\r",
          "\r",
          "pm.test(\"Response time < 500ms\", function () {\r",
          "    pm.expect(pm.response.responseTime).to.be.below(500);\r",
          "});\r",
          "\r",
          "pm.test(\"Response is JSON\", function () {\r",
          "    pm.expect(pm.response.headers.get(\"Content-Type\")).to.include(\"application/json\");\r",
          "});"
        ]
      }
    }
  ]
}





