import express from "express";
import { getMessage, postMessage } from "../controllers/messageControllers";

const homeRouter = express.Router();

// '/' url로 GET요청이 들어오면 handleHome함수 실행
// POST요청이 들어오면 postMessage함수 실행
homeRouter.get("/", getMessage);
homeRouter.post("/", postMessage);

export default homeRouter;
