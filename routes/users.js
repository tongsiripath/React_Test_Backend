import express, { Router } from "express";
import { getUser } from "../controllers/user.js";

const router = express.Router()

//เป็นการทดสอบ Router ให้พิมพ์ที่แอดเดรทบาร์ http://localhost:8900/api/users/test
// router.get("/test",(req,res)=>{
//     res.send("มันแก๋ววว...")
// })

router.get("/find/:userID", getUser)

export default router