// dependencies
const express = require('express');
const dbconnectionMiddleware = require('./middleware/dbconnectionMiddleware');
// instantiation
const app = express();

// config
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// middleware
app.use(dbconnectionMiddleware);

// routes
// all the zip codes in Iowa state.
// http://localhost:3000/zip_codes/IA
app.get("/zip_codes/:state", async (req, res) => {

    const state = req.params.state;

    const zip = await req.collection.aggregate([
        { $match: { "state": state } },
        { $group: { _id: "$_id" } },
        { $project: { _id: 0, "zip_code": "$_id" } }
    ]).toArray();

    res.json(zip);

})

//Find all the zip codes with a population less than 10,000.
app.get("/zip_code_less_than/:max_population", async (req, res) => {

    const maxPopulation = parseInt(req.params.max_population);

    const zip = await req.collection.aggregate([
        { $match: { pop: { $lt: maxPopulation } } },
        { $group: { _id: "$_id" } },
        { $project: { _id: 0, "zip_code": "$_id" } }

    ]).toArray();
    res.json(zip);

});

// Find all cities that have more than one zip code, sort the results by state and city name.
app.get("/cities", async (req, res) => {

    const cities = await req.collection.aggregate([

        { $group: { _id: { state: "$state", city: "$city" }, zip_codes: { $addToSet: "$_id" } } },
        { $match: { $expr: { $gt: [{ $size: "$zip_codes" }, 1] } } },
        { $project: { _id: 0, "state": "$_id.state", "city": "$_id.city", count: { $size: "$zip_codes" } } },
        { $sort: { state: 1, city: 1 } },


    ]).toArray();

    res.json(cities);

});

// Display the least populated city in each state
app.get("/least_populated_city", async (req, res) => {

    const city = await req.collection.aggregate([
        { $sort: { state: 1, pop: 1 } },
        {
            $group: {
                _id: "$state", population: {
                    $first: {
                        city: '$city',
                        pop: '$pop'
                    }
                }
            }
        },

        { $project: { _id: 0, "state": "$_id", "city": "$population.city", "population": "$population.pop" } },
        { $sort: { state: 1 } }


    ]).toArray();

    res.json(city);
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