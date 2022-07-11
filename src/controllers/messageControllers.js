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

let fakeMessages = [
  { username: "minho", text: "how are u?" },
  { username: "bot", text: "No andswer" },
];

export const handleHome = (req, res) => {
  return res.render("home", { pageTitle: "Home", fakeMessages });
};

export const postMessage = async (req, res) => {
  const { username, text } = req.body;
  console.log(req.body);
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

  // res.send(result);

  const newMessages = {
    username,
    text,
  };
  fakeMessages.push(newMessages);
  return res.render("home", { pageTitle: "Home", fakeMessages });
};

export const textQuery = async (req, res) => {
  console.log(req.body);
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

  res.send(result);
};

export const eventQuery = async (req, res) => {
  const request = {
    session: sessionPath,
    queryInput: {
      event: {
        // The query to send to the dialogflow agent
        name: req.body.event,
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

  res.send(result);
};
