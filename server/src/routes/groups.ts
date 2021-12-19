import { Router } from "express";
import { createGroup, getMemberRequestInfo, reviewGroupRequests, updateStudentGroup,getGroups,getGroupMembers } from "../controllers/groups";

const router = Router();

router.route("/").post(createGroup);
router.route("/").get(reviewGroupRequests);
router.route("/members").get(getMemberRequestInfo);
router.route("/members").put(updateStudentGroup);
router.route("/section").get(getGroups);
router.route("/info").get(getGroupMembers);
export default router;