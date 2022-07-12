import express, { Express } from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import "./models/Message";

const app: Express = express();
// log를 관리
const logger = morgan("dev");

// pug 실행, 설정
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger);
// request를 파싱
app.use(express.urlencoded({ extended: true }));
// json으로 request.body 받을 수 있게 설정
app.use(express.json());

app.use("/", globalRouter);

export default app;
