const http = require('http');
const axios = require('axios');
const url = require('url');
const server = http.createServer();
const { fork } = require('child_process');

server.on('request', (req, res) => {

    const myUrl = url.parse(req.url, true)
    if (myUrl.pathname === "/posts") {
        // delegating to child process
        const getPostsProcess = fork('./fetchposts.js');
        getPostsProcess.send(myUrl);

        // recieving event
        getPostsProcess.on("message", (data) => {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.write(data);
            res.end();
        })
    } else {
        res.write("<a href='http://localhost:4000/posts?filterBy=id,title&limit=50'>Posts List filtered by id and title and limit of 50</a>");
        res.end();
    }
})



server.listen(4000, () => console.log("Listening on port 4000"));
