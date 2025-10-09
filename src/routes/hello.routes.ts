import { Router } from "express";
import { getHello, postEcho } from "../controllers/hello.controller";

export const helloRouter = Router();

helloRouter.get("/", getHello);
helloRouter.post("/echo", postEcho);
