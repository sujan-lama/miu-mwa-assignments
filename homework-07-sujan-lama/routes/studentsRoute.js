const express = require('express');
const { getAllStudents, addStudents, getStudentById, updateStudentById, deleteStudentById, uploadPhotoById, searchStudent } = require('../controllers/studentsController');
const router = express.Router({ strict: true });
const customMiddleware = require('../middleware/customMiddleware');
const fileUploadMiddleware = require('../middleware/fileUploadMiddleware');

router.get('/', getAllStudents);
router.post('/', customMiddleware, addStudents);
router.post('/upload', fileUploadMiddleware, uploadPhotoById)
router.get('/:id', getStudentById);
router.put('/:id', customMiddleware, updateStudentById);
router.delete('/:id', deleteStudentById);
router.get("/search/:q", searchStudent)


module.exports = router;