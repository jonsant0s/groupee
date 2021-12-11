import { Router } from "express";
import { searchStudent } from "../controllers/classlist";

const router = Router();

router.route('/').get(searchStudent);

export default router;