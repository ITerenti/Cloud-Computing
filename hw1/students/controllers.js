const {students} = require("../data");

class Controller {
    // get all
    async getStudents () {
        return new Promise((resolve, _) => resolve(students))
    }

    // get by id 
    async getStudent (id) {
        return new Promise((resolve, reject) => {
            const student = students.find(student => student.id === parseInt(id));

            if(student) {
                resolve(student)
            } else {
                reject(`Student with id ${id} not found`)
            }
        })
    }

    // create student
    async createStudent(student) {
        return new Promise((resolve, reject) => {
            if (!student.firstName || !student.lastName) {
                reject("Bad request. Student should have valid firstname and lastname");
            } else {
                const largestId = students.reduce((accumulator, currentValue) => {
                    return currentValue.id > accumulator ? currentValue.id : accumulator
                }, -1)
                const newStudent = {year: 1, ...student, id: largestId + 1};
                students.push(newStudent)

                resolve(newStudent)
            }
        })
    }

    // update student
    async updateStudent(student) {
        return new Promise((resolve, reject) => {
            const isStudentIdValid = students.reduce((accumulator, current) => {
                return accumulator || current.id === parseInt(student.id)
            }, false)

            if(!isStudentIdValid) {
                reject(`Student with id ${student.id} not found`)
            } else {
                const outdatedStudentIndex = students.findIndex(item => item.id === parseInt(student.id));
                const updatedStudent = {...students[outdatedStudentIndex], ...student};
                students[outdatedStudentIndex] = updatedStudent
                
                resolve(updatedStudent)
            }
        })
    }

    // delete student
    async deleteStudent(id) {
        return new Promise((resolve, reject) => {
            const isStudentIdValid = students.reduce((accumulator, current) => {
                return accumulator || current.id === parseInt(id)
            }, false)

            if(!isStudentIdValid) {
                reject(`Student with id ${id} not found`)
            } else {
                const currentStudentIndex = students.findIndex(item => item.id === parseInt(id));
                students.splice(currentStudentIndex, 1);
                resolve();
            }
        })
    }
}

module.exports = Controller;