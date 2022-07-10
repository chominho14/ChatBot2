import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";

const PORT = 4000;

const app = express();
// log를 관리
const logger = morgan("dev");

// pug 실행
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);

app.get("/", globalRouter);
app.get("/message", globalRouter);

const handleListening = () =>
  console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
