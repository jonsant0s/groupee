import { Router } from "express";
import { submitProposal, getGroupProposal, updateProposal } from "../controllers/proposal";

const router = Router();

router.route("/").post(submitProposal);
router.route("/submissions").get(getGroupProposal);
router.route("/review").put(updateProposal);
export default router;