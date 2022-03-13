const http = require('http');
const fs = require('fs');
const { join } = require('path')
http.createServer((req, res) => {
    // responseHandler1(res);
    // responseHandler2(res);
    responseHandler3(res);
}).listen(8080, () => console.log('listening on port 8080'));


// read file async
const responseHandler1 = (res) => {
    fs.readFile(join(__dirname, "video.mp4"), 'utf-8', (err, data) => {
        res.writeHead(200, { 'Content-Type': 'video/mp4' });
        res.end(data);
    });
}

//read file sync
const responseHandler2 = (res) => {
    const f = fs.readFileSync(join(__dirname, 'video.mp4'), 'utf-8');
    console.log("File read successful");
    res.writeHead(200, { 'Content-Type': 'video/mp4' });
    return res.end(f);

}

//read file stream
const responseHandler3 = (res) => {
    res.writeHead(200, { 'Content-Type': 'video/mp4' });
    fs.createReadStream(join(__dirname, "video.mp4")).pipe(res);
}