module.exports = (req, res, next) => {

    if (!req.body.hasOwnProperty('name')
        || !req.body.hasOwnProperty('course')
        || !req.body.hasOwnProperty('grade')
    ) {
        return next(new Error("Body should have name, course and grade"));
    }

    next();
}