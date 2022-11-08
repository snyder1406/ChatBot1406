const express = require("express");
const db = require("./project/utils/database");
const initModels = require("./project/models/initModels");
const config = require("./config");
const userRouter = require("./project/routers/users.router");
const authRouter = require("./project/auth/auth.router");
const conversationRouter = require("./project/routers/conversations.router");
const messageRouter = require("./project/routers/messages.router");
const participantsRouter = require("./project/routers/participants.router");

const server = express();

server.use(express.json());

db.authenticate()
  .then(() => console.log("Server authenticated"))
  .catch((error) => console.log(error));

db.sync()
  .then(() => console.log("Database synced"))
  .catch((error) => console.log(error));

initModels();

server.get("/", (_, res) => {
  res
    .status(200)
    .json({ message: "OK!", users: `localHost:${config.port}/api/v1/users` });
});

server.use("/api/v1/auth", authRouter);
server.use("/api/v1/users", userRouter);

server.use("/api/v1/conversations", conversationRouter);
server.use("/api/v1/conversations", messageRouter);
server.use("/api/v1/conversations", participantsRouter);

server.listen(config.port, () =>
  console.log(
    `Server running at port ${config.port}`)
);
