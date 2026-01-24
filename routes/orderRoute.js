import express from "express"
import { createOder, getOders } from "../controllers/orderController.js";
const orderRouter=express.Router();
orderRouter.post("/",createOder)
orderRouter.get("/",getOders)

export default orderRouter
