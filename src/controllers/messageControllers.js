import Message from "../models/Message";

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

export const handleHome = async (req, res) => {
  const messages = await Message.find({});
  return res.render("home", { pageTitle: "Home", messages });
};

export const postMessage = async (req, res) => {
  const { name, text } = req.body;
  await Message.create({
    name,
    text,
  });

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: req.body.text,
        // The language used by the client (en-US)
        languageCode: languageCode,
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log("Detected intent");
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);

  await Message.create({
    name: "bot",
    text: result.fulfillmentText,
  });

  return res.redirect("/");
};
