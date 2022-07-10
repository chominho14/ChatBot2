import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";

const app = express();
// log를 관리
const logger = morgan("dev");

// pug 실행
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", globalRouter);
app.use("/textQuery", globalRouter);
app.use("/eventQuery", globalRouter);

export default app;
