import { Router } from "express";
import { requestToJoin,
         updateJoinRequest,
         getPostingRequests,
         getRequestIssues,
         getJoinRequest,
         deleteJoinRequest } from "../controllers/joinGroup";

const router = Router();

router.route("/").post(requestToJoin); // When student joins a group posting on forum
router.route("/").put(updateJoinRequest); // Updates state of join request
router.route("/").delete(deleteJoinRequest);
router.route("/requests").get(getJoinRequest); // Shows own join requests with current status.
router.route("/conflict").get(getRequestIssues); // Professor's homepage, shows join requests with conflicts
router.route("/posting").get(getPostingRequests); // At homepage of student who created group_requests (posts on forum)

export default router;