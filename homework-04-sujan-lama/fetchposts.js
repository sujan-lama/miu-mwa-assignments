const axios = require('axios');

async function fetchPost(myUrl) {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
    const posts = response.data;

    let limitLength = 0;

    if (myUrl.query.limit) {
        limitLength = myUrl.query.limit;
    }

    posts.splice(limitLength, posts.length);

    const filterBy = myUrl.query.filterBy;
    if (!filterBy || filterBy === "") {
        process.send(JSON.stringify(posts));
        process.exit(0);
    }

    const filterByList = filterBy.split(",")
    const filteredPosts = posts.map(v => {
        let returnValue = {};
        filterByList.forEach(element => {
            returnValue[element] = v[element];
        });
        return returnValue;
    });

    process.send(JSON.stringify(filteredPosts));
    process.exit(0);
}

process.on("message", (url) => {
    fetchPost(url)
});