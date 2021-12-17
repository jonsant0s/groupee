import { Router } from "express";
import { postComment, getComments, deleteComment,getStudentComments } from "../controllers/comments";

const router = Router();

router.route("/").post(postComment);
router.route("/").get(getComments);
router.route("/").delete(deleteComment);
router.route("/user").get(getStudentComments);
export default router;