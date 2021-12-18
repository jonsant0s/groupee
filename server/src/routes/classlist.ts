import { Router } from "express";
import { searchStudent, fetchStudentClasses, getCourseInfo } from "../controllers/classlist";

const router = Router();

router.route('/').get(searchStudent);
router.route('/fetch').get(fetchStudentClasses);
router.route('/course').get(getCourseInfo);

export default router;