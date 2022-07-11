import express from "express";
import { handleHome, postMessage } from "../controllers/messageControllers";

const homeRouter = express.Router();

homeRouter.get("/", handleHome);
homeRouter.post("/", postMessage);

export default homeRouter;
