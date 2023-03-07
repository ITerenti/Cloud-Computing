const http = require("http");

const StudentController = require("./students/controllers");
const TodosController = require("./todos/controllers");
const { getReqData } = require("./utils")

const server = http.createServer(async (req, res) => {
    //set the request routes
    if(req.url === '/api/students' && req.method === "GET") {
        const students = await new StudentController().getStudents();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(students)); 
    } 
    else if (req.url === '/api/todos' && req.method === "GET") {
        const todos = await new TodosController().getTodos();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(todos)); 
    }
    else if (req.url.match(/\/api\/students\/([0-9]+)\/todos/) && req.method === "GET") {
        try {
            const studentTodos = await new TodosController().getStudentTodos(req.url.split("/")[3]);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(studentTodos)); 
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({message: error})); 
        }
    }
    else if (req.url.match(/\/api\/students\/([0-9]+)/) && req.method === "GET") {
        try {
            const student = await new StudentController().getStudent(req.url.split("/")[3]);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(student)); 
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({message: error})); 
        }
    }
    else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "GET") {
        try {
            const todo = await new TodosController().getTodo(req.url.split("/")[3]);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(todo)); 
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({message: error})); 
        }
    } 
    else if (req.url === '/api/students' && req.method === "POST") {
        try {
            const newStudent = await getReqData(req);
            const createdStudent = await new StudentController().createStudent(JSON.parse(newStudent));
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(createdStudent)); 
        } catch (error) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({message: error})); 
        }
    }
    else if (req.url.match(/\/api\/students\/([0-9]+)\/todos/) && req.method === "POST") {
        try {
            const newTodo = await getReqData(req);
            const createdTodo = await new TodosController().createTodo({...JSON.parse(newTodo), studentId: parseInt(req.url.split("/")[3])});
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(createdTodo)); 
        } catch (error) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({message: error})); 
        }
    }
    else if (req.url.match(/\/api\/students\/([0-9]+)\/todos\/([0-9]+)/) && req.method === "PUT") {
        try {
            const newTodo = await getReqData(req);
            const updatedTodo = await new TodosController().updateTodo({...JSON.parse(newTodo), studentId: parseInt(req.url.split("/")[3]), id: parseInt(req.url.split("/")[5])});
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(updatedTodo)); 
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({message: error})); 
        }
    }
    else if (req.url.match(/\/api\/students\/([0-9]+)/) && req.method === "PUT") {
        try {
            const newStudent = await getReqData(req);
            const updatedStudent = await new StudentController().updateStudent({...JSON.parse(newStudent), id: parseInt(req.url.split("/")[3])});
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(updatedStudent)); 
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({message: error})); 
        }
    }
    else if (req.url.match(/\/api\/students\/([0-9]+)\/todos\/([0-9]+)/) && req.method === "DELETE") {
        try {
            const removedTodo = await new TodosController().deleteTodo(parseInt(req.url.split("/")[3]), parseInt(req.url.split("/")[5]));
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify("OK")); 
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({message: error})); 
        }
    }
    else if (req.url.match(/\/api\/students\/([0-9]+)/) && req.method === "DELETE") {
        try {
            const removedStudent = await new StudentController().deleteStudent(parseInt(req.url.split("/")[3]));
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify("OK")); 
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({message: error})); 
        }
    }

    // If no route present
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

server.listen(8080, () => {
    console.log(`server started on port: 8080`);
});