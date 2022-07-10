import express from "express";
import { handleHome } from "../controollers/messageControllers";
import { getMessage, postMessage } from "../controollers/messageControllers";

const homeRouter = express.Router();

homeRouter.get("/", handleHome);

homeRouter.get("/message", getMessage);
homeRouter.post("/message", postMessage);

export default homeRouter;
