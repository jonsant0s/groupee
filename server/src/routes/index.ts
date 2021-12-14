import { Router } from "express";
import { initializeTables, populateTables } from "../controllers";

const router = Router();

router.route("/").get(initializeTables);
router.route("/populate").get(populateTables);

export default router;
