import { Router } from "express";
import { login, signup } from "../controllers/account";

const router = Router();

router.route('/')
    .get(login)
    .post(signup);

export default router;