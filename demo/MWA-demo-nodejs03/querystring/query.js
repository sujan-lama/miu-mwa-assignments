
const http = require('http');

const server = http.createServer();

// to test: http://localhost:3000?q=asaad,saad
server.on('request', (req, res) => {
    console.log(`Request received: ${req.url}`)
    const searchParams = new URLSearchParams(req.url.substring(1));
    const query = searchParams.get('q')
    res.end(`Query is ${query}`);
});

server.listen(3000);