const http = require('http');
const { fork } = require('child_process');

const server = http.createServer();


server.on('request', (req, res) => {
  console.log(`Request received: ${req.url}`)
  //  const sum = longComputation();
  //  return res.end(`Sum is ${sum}`);
  const compute = fork('compute.js');
  compute.send('start');
  compute.on('message', sum => {
    res.end(`Sum is ${sum}`);
  })
});

server.listen(3000);
