const {todos, students} = require("../data");

class Controller {
    // get all
    async getTodos () {
        return new Promise((resolve, _) => resolve(todos))
    }

    // get by id 
    async getTodo (id) {
        return new Promise((resolve, reject) => {
            const todo = todos.find(todo => todo.id === parseInt(id));

            if(todo) {
                resolve(todo)
            } else {
                reject(`Todo item with id ${id} not found`)
            }
        })
    }

    // get all by student_id 
    async getStudentTodos (id) {
        return new Promise((resolve, reject) => {
            const studentsTodos = todos.filter(todo => todo.studentId === parseInt(id));

            if(studentsTodos) {
                resolve(studentsTodos)
            } else {
                reject(`Todo item with id ${studentId} not found`)
            }
        })
    }

    // create todo item for a student
    async createTodo(todo) {
        return new Promise((resolve, reject) => {
            const isStudentIdValid = students.reduce((accumulator, current) => {
                return accumulator || current.id === parseInt(todo.studentId)
            }, false)

            if(!isStudentIdValid || !todo.description) {
                reject("Bad request. Invalid student id or missing description");
            } else {
                const largestId = todos.reduce((accumulator, currentValue) => {
                    return currentValue.id > accumulator ? currentValue.id : accumulator
                }, -1)
                const newTodo = {...todo, status: "INCOMPLETE", id: largestId + 1}
                todos.push(newTodo);

                resolve(newTodo)
            }
        })
    }

    // update todo item for a student
    async updateTodo(todo) {
        return new Promise((resolve, reject) => {
            const isStudentIdValid = students.reduce((accumulator, current) => {
                return accumulator || current.id === parseInt(todo.studentId)
            }, false)
            const isTodoIdValid = todos.reduce((accumulator, current) => {
                return accumulator || current.id === parseInt(todo.id)
            }, false)

            if(!isStudentIdValid || !isTodoIdValid) {
                reject("Student or todo item not found");
            } else {
                const outdatedTodoIndex = todos.findIndex(item => item.id === parseInt(todo.id));
                const updatedTodo = {...todos[outdatedTodoIndex], ...todo};
                todos[outdatedTodoIndex] = updatedTodo

                resolve(updatedTodo)
            }
        })
    }

    // delete todo item 
    async deleteTodo(studentId, todoId) {
        return new Promise((resolve, reject) => {
            const isStudentIdValid = students.reduce((accumulator, current) => {
                return accumulator || current.id === parseInt(studentId)
            }, false)
            const isTodoIdValid = todos.reduce((accumulator, current) => {
                return accumulator || current.id === parseInt(todoId)
            }, false)

            if(!isStudentIdValid || !isTodoIdValid) {
                reject("Student or todo item not found");
            } else {
                const currentTodoIndex = todos.findIndex(item => item.id === parseInt(todoId));
                todos.splice(currentTodoIndex, 1);
                resolve();
            }
        })
    }
}

module.exports = Controller;