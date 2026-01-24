import express from "express";
import { createComment, showComments } from "../controllers/commentController.js";

const commentRouter=express.Router();
commentRouter.post("/:productId",createComment)
commentRouter.get("/:productId",showComments)

export default commentRouter