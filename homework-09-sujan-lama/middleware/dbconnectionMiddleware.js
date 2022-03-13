const MongoClient = require('mongodb').MongoClient
let collection;
module.exports = async (req, res, next) => {
    if (collection) {
        req.collection = collection;
        return next();
    }

    try {
        const connectionString = "mongodb://172.22.112.1:27017";
        const client = await MongoClient.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("DB connection successful");
        const db = client.db('homework09');
        collection = db.collection('locations');
        req.collection = collection;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
}
