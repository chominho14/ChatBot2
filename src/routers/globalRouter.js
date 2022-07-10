import express from "express";
import {
  handleHome,
  postMessage,
  textQuery,
  eventQuery,
} from "../controllers/messageControllers";

const homeRouter = express.Router();

homeRouter.get("/", handleHome);
homeRouter.post("/", postMessage);
homeRouter.post("/textQuery", textQuery);
homeRouter.post("/eventQuery", eventQuery);

export default homeRouter;
