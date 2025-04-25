const express = require('express')
const app = express()
const port = 3000

app.use(express.json()) // logic to decode body

const USERS = [];

const QUESTIONS = [{
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "5"
    }]
}];


const SUBMISSION = [

]

app.post('/signup', function (req, res) {

    // body should have email and password
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    //Store email and password (as is for now) in the USERS array above (only if the user with the given email doesnt exist)
    const userExists = USERS.find(user => user.email === email);
    if (userExists) {
        return res.status(409).json({ message: 'User already exists' });
    }

    USERS.push({ email, password })
    // return back 200 status code to the client
    res.status(200).json({ message: 'Signup Successful' })
})

app.post('/login', function (req, res) {
    const { email, password } = req.body// body should have email and password

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if the user with the given email exists in the USERS array
    const user = USERS.find(user => user.email === email)
    if (!user) {
        return res.status(400).json({ message: "User with the provided email doesn't exists" })
    }
    // Also ensure that the password is the same
    if (user.password != password) {
        return res.status(400).json({ message: "Invalid Password" })

    }
    // If the password is the same, return back 200 status code to the client
    // Also send back a token (any random string will do for now)
    const token = Math.random().toString(36).substring(2);

    // If the password is not the same, return back 401 status code to the client
    return res.status(200).json({ message: "Login Successful", token })

})

app.get('/questions', function (req, res) {

    //return the user all the questions in the QUESTIONS array
    res.send("Hello World from route 3!")
})

app.get("/submissions", function (req, res) {
    // return the users submissions for this problem
    res.send("Hello World from route 4!")
});


app.post("/submissions", function (req, res) {
    // let the user submit a problem, randomly accept or reject the solution
    // Store the submission in the SUBMISSION array above
    res.send("Hello World from route 4!")
});

// leaving as hard todos
// Create a route that lets an admin add a new problem
// ensure that only admins can do that.

app.listen(port, function () {
    console.log(`Example app listening on port ${port}`)
})