const MongoClient = require('mongodb').MongoClient
let collection;
module.exports = async (req, res, next) => {
    if (collection) {
        req.collection = collection;
        return next();
    }

    try {
        const connectionString = process.env.ATLAS_URI || "mongodb://172.21.224.1:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false";
        const client = await MongoClient.connect(connectionString);
        console.log("DB connection successful");
        const db = client.db('homework07');
        collection = db.collection('students');
        req.collection = collection;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
}