import express from "express"
import { createOder } from "../controllers/orderController.js";
const orderRouter=express.Router();
orderRouter.post("/",createOder)

export default orderRouter
