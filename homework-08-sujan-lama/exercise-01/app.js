const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient('mongodb+srv://172.31.192.1/', { useNewUrlParser: true, useUnifiedTopology: true });
let db;

const app = express();

//////////////////////////////////////
////////////// DO NOT TOUCH //////////
/////////////////////////////////////
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    if (!db) {
        client.connect(function (err) {
            db = client.db('rich');
            req.db = db.collection('schools');
            next();
        });
    } else {
        req.db = db.collection('schools');
        next();
    }
})
////////////// DO NOT TOUCH //////////
// Get all data - FOR TESTING PURPOSES ONLY
app.get('/', (req, res) => {
    req.db.find({}).toArray((err, data) => res.json(data))
})
////////////// DO NOT TOUCH //////////
// delete all data - FOR TESTING PURPOSES ONLY
app.delete('/clear', async (req, res) => {
    await req.db.removeMany({})
    req.db.find({}).toArray((err, data) => res.json(data))

})
////////////// DO NOT TOUCH //////////
// fill with dummy data - FOR TESTING PURPOSES ONLY
app.post('/fill', async (req, res) => {
    await req.db.insertOne(req.body, (err, results) => res.json(results))
});

//////////////////////////////////////
////////////// YOUR CODE BELOW ///////
/////////////////////////////////////
// NOTE: all params are fetched as String /////////////////////////
// You will need to parse them as numbers before using them ///////
// Example: {_id: parseInt(req.params.teacher_id)} ////////////////
//////////////////////////////////////////////////////////////////

// Add teacher
app.post('/schools/:school_id/teachers', async (req, res) => {
    // YOUR QUERY HERE
    const schoolId = parseInt(req.params.school_id);
    await req.db.updateOne({ _id: schoolId }, { $addToSet: { "teachers": req.body } });
    req.db.find({}).toArray((err, data) => res.json(data))
})
// Update teacher by ID
app.patch('/schools/:school_id/teachers/:teacher_id', async (req, res) => {
    // YOUR QUERY HERE
    const schoolId = parseInt(req.params.school_id);
    const teacherId = parseInt(req.params.teacher_id);

    await req.db.updateOne({ _id: schoolId, "teachers._id": teacherId }, { $set: { "teachers.$.name": req.body.name } });
    req.db.find({}).toArray((err, data) => res.json(data))
})
// Delete teacher by ID
app.delete('/schools/:school_id/teachers/:teacher_id', async (req, res) => {
    // YOUR QUERY HERE
    const schoolId = parseInt(req.params.school_id);
    const teacherId = parseInt(req.params.teacher_id);
    // await req.db.updateOne({ _id: schoolId, "teachers._id": teacherId }, { $unset: { "teachers.$": 1 } })
    await req.db.updateOne({ _id: schoolId }, { $pull: { "teachers": { _id: teacherId } } })
    req.db.find({}).toArray((err, data) => res.json(data))
})

// Add a new student to specific course
app.post('/schools/:school_id/courses/:course_id', async (req, res) => {
    // YOUR QUERY HERE
    const schoolId = parseInt(req.params.school_id);
    const courseId = parseInt(req.params.course_id);
    await req.db.updateOne({ _id: schoolId, "courses._id": courseId }, { $addToSet: { "courses.$.students": req.body } })
    req.db.find({}).toArray((err, data) => res.json(data))
})


// Update a student's name
app.patch('/schools/:school_id/courses/:course_id/students/:student_id', async (req, res) => {
    // YOUR QUERY HERE   
    const schoolId = parseInt(req.params.school_id);
    const courseId = parseInt(req.params.course_id);
    const studentId = parseInt(req.params.student_id);

    await req.db.updateOne({ _id: schoolId }, { $set: { "courses.$[courseObj].students.$[studentObj].name": req.body.name } }, { arrayFilters: [{ "courseObj._id": courseId }, { "studentObj._id": studentId }] })

    req.db.find({}).toArray((err, data) => res.json(data))
})

// Delete a student
app.delete('/schools/:school_id/courses/:course_id/students/:student_id', async (req, res) => {
    // YOUR QUERY HERE
    const schoolId = parseInt(req.params.school_id);
    const courseId = parseInt(req.params.course_id);
    const studentId = parseInt(req.params.student_id);
    // await req.db.updateOne({ _id: schoolId }, { $unset: { "courses.$[courseObj].students.$[studentObj]": 1 } }, { arrayFilters: [{ "courseObj._id": courseId }, { "studentObj._id": studentId }] })
    await req.db.updateOne({ _id: schoolId, "courses._id": courseId }, { $pull: { "courses.$.students": { _id: studentId } } })
    req.db.find({}).toArray((err, data) => res.json(data))
})

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});

app.listen(3000, 'localhost', () => console.log('listening to 3000'));
