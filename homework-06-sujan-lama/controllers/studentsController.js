const students = require('../datastore/students');

function getAllStudents(req, res) {
    res.json({ success: true, message: "Data retrieved succesfully", data: students });
}

function addStudents(req, res) {
    const body = req.body;
    const id = Math.max(...students.map(v => v.id));
    const updatedStudents = [...students, { id: id + 1, name: body.name, course: body.course, grade: body.grade }]
    res.json({ success: true, message: "Students added succesfully", data: updatedStudents });
}

function getStudentById(req, res) {
    const id = parseInt(req.params.id);
    const student = students.filter(v => v.id === id)[0];
    res.json({ success: true, message: "Data retrieved succesfully", data: student });
}

function updateStudentById(req, res) {
    const id = parseInt(req.params.id);
    const body = req.body;
    const updatedStudents = [];
    const studentsCopy = JSON.parse(JSON.stringify(students));

    studentsCopy.forEach(v => {
        if (v.id === id) {
            v.name = body.name;
            v.course = body.course;
            v.grade = body.grade;
        }
        updatedStudents.push(v);
    });
    res.json({ success: true, message: "Update successful", data: updatedStudents });
}

function deleteStudentById(req, res) {
    const id = parseInt(req.params.id);
    const studentsCopy = [...students];
    const deletedStudent = studentsCopy.filter(v => v.id === id)[0];
    const deletedIndex = studentsCopy.indexOf(deletedStudent);

    if (deletedIndex === -1) {
        return res.json({ success: false, message: `No student found for id ${id}` });
    }

    studentsCopy.splice(deletedIndex, 1);
    return res.json({ success: true, message: "Successfully deleted", data: deletedStudent });

}

function uploadPhotoById(req, res) {

    const id = parseInt(req.body.id);
    const studentsCopy = JSON.parse(JSON.stringify(students));

    const student = studentsCopy.filter(v => v.id === id)[0];

    // We have declared middleware to handle error. So, if we get response, we already uploaded file
    student['pictures'] = req.file.filename;
    return res.status(200).json({
        success: true,
        message: "File upload successful",
        data: student
    });

}



module.exports = { getAllStudents, addStudents, getStudentById, updateStudentById, uploadPhotoById, deleteStudentById };