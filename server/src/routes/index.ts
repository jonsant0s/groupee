import { Router } from "express";
import { initializeTables } from "../controllers"

const router = Router();

router.route('/')
    .get(initializeTables);

export default router;