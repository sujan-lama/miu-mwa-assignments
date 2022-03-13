// dependencies
const express = require('express');
const { fork } = require('child_process')

// instantiations
const app = express();

// config
app.set("x-powered-by", false);
app.set('port', process.env.PORT || 3000);
app.enable('case sensitive routing');
app.set('strict routing', true);
app.disable('etag');


// Routes
app.get("/users", (req, res) => {

    const results = req.query.results || 10;
    const page = req.query.page || 1;

    // set headers
    res.header('Cache-Control', 'private, max-age=60')


    // delegating to child process
    const fetchUsers = fork('./fetchusers.js');
    fetchUsers.send(req.query);
    fetchUsers.on("message", (data) => {
        res.send(data);
    });


    // set pagination
    res.links({
        'next': `https://randomuser.me/api/?page=${parseInt(page) + 1}&results=${results}`,
        'previous': `https://randomuser.me/api/?page=${parseInt(page) - 1}&results=${results}`
    })
});

app.get("/", (req, res) => {
    res.send("<a href='http://localhost:3000/users?page=1&results=10'>Get Users</a>")
});


// Bootup
const port = app.get('port')
app.listen(port, () => console.log("Server is listening on 3000"));
