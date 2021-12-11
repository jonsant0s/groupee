import express, { Router } from "express";
import { getNumGroups } from "../controllers/groupGenerate";

const router: Router = express.Router();

router.route('/groups').get(getNumGroups);

export default router;