import { Router } from "express";
import { helloRouter } from "./hello.routes";

const router = Router();

// Register all routes here
router.use("/hello", helloRouter);

// Add more routers below if needed
// router.use('/users', userRouter);

export default router;
