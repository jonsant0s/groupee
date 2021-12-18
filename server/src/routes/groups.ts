import { Router } from "express";
import { createGroup,  getMemberRequestInfo, reviewGroupRequests, updateStudentGroup } from "../controllers/groups";

const router = Router();

router.route("/").post(createGroup);
router.route("/").get(reviewGroupRequests);
router.route("/members").get(getMemberRequestInfo);
router.route("/members").put(updateStudentGroup);

export default router;