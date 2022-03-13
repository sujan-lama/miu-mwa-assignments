//SET UV_THREADPOOL_SIZE=2 && node threads.js
//SET UV_THREADPOOL_SIZE=5 && node threads.js
// export UV_THREADPOOL_SIZE=2 && node threads.js
// export UV_THREADPOOL_SIZE=4 && node threads.js
// export UV_THREADPOOL_SIZE=20 && node threads.js
const crypto = require('crypto');

const start_time = Date.now();

crypto.pbkdf2("A", "B", 100000, 512, 'sha512', () => {
    console.log(`1. ${Date.now() - start_time}`);
})

crypto.pbkdf2("A", "B", 100000, 512, 'sha512', () => {
    console.log(`2. ${Date.now() - start_time}`);
})

crypto.pbkdf2("A", "B", 100000, 512, 'sha512', () => {
    console.log(`3. ${Date.now() - start_time}`);
})

crypto.pbkdf2("A", "B", 100000, 512, 'sha512', () => {
    console.log(`4. ${Date.now() - start_time}`);
})

crypto.pbkdf2("A", "B", 100000, 512, 'sha512', () => {
    console.log(`5. ${Date.now() - start_time}`);
})

crypto.pbkdf2("A", "B", 100000, 512, 'sha512', () => {
    console.log(`6. ${Date.now() - start_time}`);
})

crypto.pbkdf2("A", "B", 100000, 512, 'sha512', () => {
    console.log(`7. ${Date.now() - start_time}`);
})

crypto.pbkdf2("A", "B", 100000, 512, 'sha512', () => {
    console.log(`8. ${Date.now() - start_time}`);
})

crypto.pbkdf2("A", "B", 100000, 512, 'sha512', () => {
    console.log(`9. ${Date.now() - start_time}`);
})

crypto.pbkdf2("A", "B", 100000, 512, 'sha512', () => {
    console.log(`10. ${Date.now() - start_time}`);
})

crypto.pbkdf2("A", "B", 100000, 512, 'sha512', () => {
    console.log(`11. ${Date.now() - start_time}`);
})

crypto.pbkdf2("A", "B", 100000, 512, 'sha512', () => {
    console.log(`12. ${Date.now() - start_time}`);
})

crypto.pbkdf2("A", "B", 100000, 512, 'sha512', () => {
    console.log(`13. ${Date.now() - start_time}`);
})

crypto.pbkdf2("A", "B", 100000, 512, 'sha512', () => {
    console.log(`14. ${Date.now() - start_time}`);
})

crypto.pbkdf2("A", "B", 100000, 512, 'sha512', () => {
    console.log(`15. ${Date.now() - start_time}`);
})

crypto.pbkdf2("A", "B", 100000, 512, 'sha512', () => {
    console.log(`16. ${Date.now() - start_time}`);
})

crypto.pbkdf2("A", "B", 100000, 512, 'sha512', () => {
    console.log(`17. ${Date.now() - start_time}`);
})

crypto.pbkdf2("A", "B", 100000, 512, 'sha512', () => {
    console.log(`18. ${Date.now() - start_time}`);
})

crypto.pbkdf2("A", "B", 100000, 512, 'sha512', () => {
    console.log(`19. ${Date.now() - start_time}`);
})

crypto.pbkdf2("A", "B", 100000, 512, 'sha512', () => {
    console.log(`20. ${Date.now() - start_time}`);
})
