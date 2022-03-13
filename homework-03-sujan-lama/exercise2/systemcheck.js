const os = require('os');

async function checkSystem() {
    console.log("\nChecking your system...")

    const checkSystemPromise = new Promise((resolve, reject) => {
        const totalRam = parseInt(os.totalmem() / (1024 * 1024 * 1024));
        if (totalRam < 4) {
            reject(`This app needs at least 4 GB of RAM. You have ${totalRam} GB RAM`);
        }

        const cpuCount = os.cpus().length
        if (cpuCount < 2) {
            reject(`Processor is not supported. You have ${cpuCount} processor`)
        }
        resolve("System is checked successfully")

    })

    try {
        const res = await checkSystemPromise;
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}

checkSystem();