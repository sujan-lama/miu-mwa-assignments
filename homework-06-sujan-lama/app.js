// dependencies
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const studentRoutes = require('./routes/studentsRoute');
// instantiations
const app = express();


// Config
app.set('port', process.env.PORT || 3000);
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// Middleware
app.use(morgan('combined', { stream: accessLogStream }))
app.use('/pictures', express.static('./assets/pics'))
app.use(cors());
app.use(express.json())


// Routes
app.use('/students', studentRoutes);


app.all('*', (req, res, next) => {
    res.status(404);
    return next(new Error('404 No route found'));
});

// Error Handler
app.use((err, req, res, next) => {
    return res.status(400).json({ success: false, message: err.message });
});

// Boot up
const port = app.get('port');
app.listen(port, 'localhost', () => console.log(`Listening on port ${port}`));