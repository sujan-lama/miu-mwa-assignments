const { Worker } = require('worker_threads');

const worker = new Worker('./worker.js', { workerData: { name: 'Asaad Saad' } });
worker.on('message', (msg) => { console.log(msg); });