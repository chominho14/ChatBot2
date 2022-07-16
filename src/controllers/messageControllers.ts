import { Request, Response } from "express";
import Message, { MessageInterface } from "../models/Message";

// ---------- dialogflow 실행 설정 ----------

const dialogflow = require("dialogflow");
const uuid = require("uuid");

const config = require("../config/keys");

const projectId = config.googleProjectID;
const sessionId = config.dialogFlowSessionID;
const languageCode = config.dialogFlowSessionLanguageCode;

// Create a new session
const sessionClient = new dialogflow.SessionsClient({
  keyFilename:
    "/Users/chominho/Documents/quintet/chatbot4/chatbot-fbyq-7e2ec81aa4a5.json",
});
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

// --------------------------------------

// GET요청 시 실행 함수
export const getMessage = async (req: Request, res: Response) => {
  const messages: MessageInterface[] = await Message.find({});
  // 클라이언트로 렌더링
  return res.render("home", { pageTitle: "Home", messages });
};

// POST요청 시 실행 함수
export const postMessage = async (req: Request, res: Response) => {
  try {
    // req.body에 들어온 name과 text를 DB에 저장
    const { name, text } = req.body;
    await Message.create({
      name,
      text,
    });
    console.log(name, text);

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // 입력받은 text를 dialogflow에 전달
          text: req.body.text,
          languageCode: languageCode,
        },
      },
    };

    // dialogflow에 요청을 보내고 볻아온 정보를 변수 response에 담는다
    const responses = await sessionClient.detectIntent(request);
    console.log("Detected intent");
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);

    // dialogflow에서 받은 데이터중 text만 추가해 DB에 답는다
    await Message.create({
      name: "Bot",
      text: result.fulfillmentText,
    });

    // 홈화면으로 redirect한다.
    return res.redirect("/");
  } catch (error) {
    res.sendStatus(500);
    return console.log("error", error);
  } finally {
    console.log("Message Posted");
  }
};
