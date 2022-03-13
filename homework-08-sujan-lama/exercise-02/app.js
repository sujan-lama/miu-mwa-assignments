// dependencies
const express = require('express');
const url = require('url');
const dbConnectionMiddleware = require('./middleware/dbconnectionMiddleware');

// instatiations
const app = express();

// config
app.set('port', process.env.PORT || 3000);

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(dbConnectionMiddleware);


// route

app.get('/', (req, res) => {
    req.collection.find({}).toArray((err, data) => res.json(data));
});

app.delete('/clear', async (req, res) => {
    await req.collection.deleteMany({});
    req.collection.find({}).toArray((err, data) => {
        if (err) {
            return res.json({ success: false, message: err });
        }
        res.json({ success: true, locations: data })
    });
});

app.post('/fill', async (req, res) => {
    await req.collection.insertMany(req.body);
    await req.collection.createIndex({ location: '2d' });
    req.collection.find({}).toArray((err, data) => res.json({ success: true, locations: data }));
});

app.get("/search", async (req, res) => {

    const myURL = url.parse(req.url, true);
    const category = myURL.query.category;
    const myLocation = [-91.96674641043212, 41.022098442770094];
    const location = await req.collection.find({ category: category, location: { $near: myLocation } }).toArray();

    res.json({ success: true, locations: location });

});

app.all('*', (req, res, next) => {
    res.status(404);
    return next(new Error('404 No route found'));
});


// error handler
app.use((err, req, res, next) => {
    return res.status(400).json({ success: false, message: err.message });
});

// Boot up
const port = app.get('port');
app.listen(port, 'localhost', () => console.log(`Listening on port ${port}`));