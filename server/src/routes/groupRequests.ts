import express, { Router } from "express";
import {
    getGroupRequests,
    createGroupRequest,
    deleteGroupPreference,
    getGroupPreferencePost,
    updateMemberCount
} from "../controllers/groupRequests";

const router: Router = express.Router();

router.route("/").get(getGroupRequests);
router.route("/").delete(deleteGroupPreference);
router.route("/").put(updateMemberCount);
router.route("/create").post(createGroupRequest);
router.route("/profile").get(getGroupPreferencePost);


export default router;
