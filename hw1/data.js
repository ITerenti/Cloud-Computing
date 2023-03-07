let students = [
    {
        id: 1,
        firstName: "George",
        lastName: "Ionescu",
        year: 2
    },
    {
        id: 2,
        firstName: "Ion",
        lastName: "Georgescu",
        year: 3
    }
];

let todos = [
    {
        id: 1,
        studentId: 1,
        description: "Learn Dijkstra's algorithm.",
        status: "INCOMPLETE"
    },
    {
        id: 2,
        studentId: 1,
        description: "Learn about Java Threads.",
        status: "IN PROGRESS"
    },
    {
        id: 3,
        studentId: 2,
        description: "Learn about IPSec.",
        status: "DONE"
    }
]

module.exports = {students, todos}