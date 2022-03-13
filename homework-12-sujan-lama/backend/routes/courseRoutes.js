const express = require("express")
const { getAllCourses, deleteCourse } = require('../controllers/courseController')
const router = express.Router()


router.get("/", getAllCourses);
router.delete("/:id", deleteCourse);

module.exports = router;