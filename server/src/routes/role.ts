import { verifyToken, isStudent, isProfessor } from "../middleware/account";
import { allAccess, userBoard, StudentBoard, ProfessorBoard } from "../controllers/role";
import { Router } from "express";


const router = Router();

router.route('/student').get([verifyToken,isStudent],StudentBoard);
router.route('/professor').get([verifyToken,isProfessor],ProfessorBoard);
router.route('/all').get(allAccess);


export default router;

