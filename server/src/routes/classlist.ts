import { Router } from "express";
import { FileWatcherEventKind } from "typescript";
import { searchStudent, fetchStudentClasses } from "../controllers/classlist";

const router = Router();

router.route('/').get(searchStudent);
router.route('/fetch').get(fetchStudentClasses);

export default router;