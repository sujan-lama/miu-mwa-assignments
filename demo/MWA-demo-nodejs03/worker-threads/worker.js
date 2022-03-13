const { workerData, parentPort } = require('worker_threads');

const data = { ...workerData, course: 'CS572' }
parentPort.postMessage({ data });