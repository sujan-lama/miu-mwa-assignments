
async function getAllStudents(req, res, next) {
    try {
        const students = await req.collection.find().toArray();
        res.json({ success: true, message: "Data retrieved succesfully", data: students });
    } catch (error) {
        console.log("Get all students ", error);
        next(error);
    }

}

async function addStudents(req, res, next) {
    try {
        const body = req.body;
        const maxObject = await req.collection.find().sort({ _id: -1 }).limit(1).toArray();
        const id = (maxObject.length !== 0) ? parseInt(maxObject[0]._id) + 1 : 1;
        const insertedStudent = { id: id, name: body.name, course: body.course, grade: body.grade };
        const response = await req.collection.insertOne({ _id: id, name: body.name, course: body.course, grade: body.grade });
        res.json({ success: true, message: "Students added succesfully", data: insertedStudent });
    } catch (error) {
        console.log("Add Students error: ", error);
        next(error);
    }

}

async function getStudentById(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const student = (await req.collection.findOne({ _id: id }));
        if (student == null) {
            return next(new Error(`No student found for id: ${id}`));
        }
        res.json({ success: true, message: "Data retrieved succesfully", data: student });
    } catch (error) {
        console.log("get student by id error: ", error);
        return next(error);
    }
}

async function updateStudentById(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const body = req.body;
        const response = await req.collection.updateOne({ _id: id }, { $set: body });
        if (response.modifiedCount === 0) {
            return next(new Error(`No student found for id: ${id}`));
        }
        const updatedStudent = { id: id, name: body.name, course: body.course, grade: body.grade };

        res.json({ success: true, message: "Update successful", data: updatedStudent });
    } catch (error) {
        console.log("update student by id error: ", error);
        return next(error);
    }
}

async function deleteStudentById(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const response = await req.collection.deleteOne({ _id: id });
        if (response.deletedCount === 0) {
            return next(new Error(`No student found for id: ${id}`));
        }
        return res.json({ success: true, message: "Successfully deleted", data: { id: id } });

    } catch (error) {
        console.log("delete student by id error: ", error);
        return next(error);
    }
}

async function uploadPhotoById(req, res, next) {
    try {

        const id = parseInt(req.body.id);
        const response = await req.collection.updateOne({ _id: id }, { $set: { pictures: req.file.filename } });

        // We have declared middleware to handle error. So, if we get response, we already uploaded file
        return res.status(200).json({
            success: true,
            message: "File upload successful",
            data: { id: id }
        });
    } catch (error) {
        console.log("upload photo by id error: ", error);
        return next(error)
    }

}

async function searchStudent(req, res, next) {
    try {
        const q = req.params.q;
        let query = { "name": new RegExp('^' + q, 'i') };

        const students = await req.collection.find(query).toArray();
        return res.status(200).json({
            success: true,
            message: `searching student: ${q}`,
            data: students
        });
    } catch (error) {
        console.log("search error: ", error);
        return next(error)
    }
}

module.exports = { getAllStudents, addStudents, getStudentById, updateStudentById, uploadPhotoById, deleteStudentById, searchStudent };