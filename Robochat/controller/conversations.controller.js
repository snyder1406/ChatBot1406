const uuid = require("uuid");
const Conversation = require("../models/conversations.models");
const Users = require("../models/users.model");

const getAllConversations = async () => {
  const data = await Conversation.findAll();
  return data;
};

const getMyConversationById = async (idConversation, userId) => {
  const data = await Conversation.findOne({
    where: {
      id: idConversation,
      userId,
    },
    attributes: {
      exclude: ["userId"],
    },
    include: {
      model: Users,
      // as: 'user',
      attributes: ["id", "firstName", "lastName"],
    },
  });
  return data;
};

// const getMyConversations = async (id) => {
//     const data = await Conversation.findAll({
//         where: {
//             userId: id
//         }
//     })
//     return data
// }

const getMyConversations = async (id) => {
  const data = await Conversation.findAll({
    where: {
      userId: id,
    },
    attributes: {
      exclude: ["userId"],
    },
    include: {
      model: Users,
      // as: 'user',
      attributes: ["id", "firstName", "lastName"],
    },
  });
  return data;
};

const createConversation = async (data) => {
  console.log(data, typeof uuid.v4);

  const newData = await Conversation.create({
    id: uuid.v4(),
    title: data.title,
    imageUrl: data.imageUrl,
    userId: data.userId,
  });
  return newData;
};

const updateConversation = async (id, data, userId) => {
  const result = await Conversation.update(data, {
    where: {
      id,
      userId,
    },
  });
  return result;
};

const deleteMyConversation = async (conversationId, userId) => {
  const newData = await Conversation.destroy({
    where: {
      id: conversationId,
      userId,
    },
  });
  return newData;
};
const deleteConversation = async (id) => {
  const newData = await Conversation.destroy({
    where: {
      id,
    },
  });
  return newData;
};

module.exports = {
  getAllConversations,
  getMyConversationById,
  createConversation,
  updateConversation,
  deleteMyConversation,
  deleteConversation,
  getMyConversations,
};
