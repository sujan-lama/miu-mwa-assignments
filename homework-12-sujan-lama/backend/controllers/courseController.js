const Courses = require("../model/courses") // new

async function getAllCourses(req, res) {
    const courses = await Courses.find();
    res.json({ success: true, data: courses });
}

async function deleteCourse(req, res) {
    const id = parseInt(req.params.id);

    const response = await Courses.deleteOne({ _id: id });
    if (response.deletedCount === 1) {
        return res.json({ success: true, message: "Delete successful", data: { _id: id } });
    }

    return res.json({ success: false, message: `Error deleting course of id ${id}` })
}

module.exports = { getAllCourses, deleteCourse };