const dialogflow = require("dialogflow");
const uuid = require("uuid");

const config = require("../config/keys");

const projectId = config.googleProjectID;
const sessionId = config.dialogFlowSessionID;
const languageCode = config.dialogFlowSessio;

// Create a new session
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

let fakeMessages = [
  { username: "minho", text: "how are u?" },
  { username: "bot", text: "No andswer" },
];

export const handleHome = (req, res) => {
  return res.render("home", { pageTitle: "Home", fakeMessages });
};

export const postMessage = (req, res) => {
  const { username, text } = req.body;
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
