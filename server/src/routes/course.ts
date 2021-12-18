import { Router } from "express";
import {  fetchProfessor } from "../controllers/course";

const router = Router();

router.route('/fetch').get(fetchProfessor);

export default router;