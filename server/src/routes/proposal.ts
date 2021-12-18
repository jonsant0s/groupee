import { Router } from "express";
import { submitProposal, getProposals, updateProposal } from "../controllers/proposal";

const router = Router();

router.route("/").post(submitProposal);
router.route("/submissions").get(getProposals);
router.route("/review").get(updateProposal);
export default router;