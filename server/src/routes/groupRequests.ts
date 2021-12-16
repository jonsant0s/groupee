import express, { Router } from "express";
import {
    getGroupRequests,
    createGroupRequest,
    deleteGroupPreference
} from "../controllers/groupRequests";

const router: Router = express.Router();

router.route("/").get(getGroupRequests);
router.route("/").delete(deleteGroupPreference);
router.route("/create").post(createGroupRequest);

// router.post('/edit', createGroupRequest);

export default router;
