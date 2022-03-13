
const superagent = require('superagent');

async function fetchUsers(query) {
    try {
        const results = query.results || 10;
        const page = query.page || 1;
        const url = `https://randomuser.me/api/?page=${page}&results=${results}`;
        let res = await superagent.get(url);
        let data = JSON.parse(res.text).results;

        data = data.map(v => {
            return {
                'firstname': v.name.first,
                'lastname': v.name.last
            }
        });

        process.send(data);
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(0);
    }

}

process.on("message", (query) => {
    fetchUsers(query);
});
