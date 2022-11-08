const uuid = require("uuid");
const Conversations = require("../models/conversations.models");
const Messages = require("../models/messages.models");
const Users = require("../models/users.model");

const getAllMessages = async () => {
  const data = await Messages.findAll();
  return data;
};

const getMessagesByIdOfConversation = async (conversationId, userId) => {
  const data = await Messages.findAll({
    where: {
      conversationId,
      userId,
    },
    attributes: {
      exclude: ["userId", "conversationId"],
    },
    include: [
      {
        model: Conversations,
        attributes: ["id", "title", "imageUrl"],
      },
      {
        model: Users,
        attributes: ["id", "firstName", "lastName"],
      },
    ],
  });
  return data;
};
const getMessagesByIdOfConversationAndIdOfMessage = async (
  conversationId,
  messageId,
  userId
) => {
  const data = await Messages.findOne({
    where: {
      id: messageId,
      conversationId: conversationId,
      userId,
    },
    attributes: {
      exclude: ["userId", "conversationId"],
    },
    include: [
      {
        model: Conversations,
        attributes: ["id", "title", "imageUrl"],
      },
      {
        model: Users,
        attributes: ["id", "firstName", "lastName"],
      },
    ],
  });
  return data;
};

const createMessage = async (data) => {
  const newMessage = await Messages.create({
    id: uuid.v4(),
    userId: data.userId,
    conversationId: data.conversationId,
    message: data.message,
  });
  return newMessage;
};

const updateMessage = async (id, data) => {
  const newData = await Messages.update(data, {
    where: {
      id,
    },
  });
  return newData;
};

const deleteMessage = async (conversationId, messageId, userId) => {
  const data = await Messages.destroy({
    where: {
      id: messageId,
      conversationId,
      userId,
    },
  });
  return data;
};

module.exports = {
  getAllMessages,
  getMessagesByIdOfConversation,
  getMessagesByIdOfConversationAndIdOfMessage,
  createMessage,
  updateMessage,
  deleteMessage,
};
