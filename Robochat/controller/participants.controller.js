const Participants = require("../models/participants.models");
const Conversations = require("../models/conversations.models");
const Users = require("../models/users.model");
const uuid = require("uuid");

const getParticipantByIdConversation = async (conversation_id, userId) => {
  const data = await Conversations.findOne({
    where: {
      id: conversation_id,
      userId,
    },
    include: {
      model: Participants,
      attributes: ["id"],
      include: [
        {
          model: Users,
          attributes: ["id", "firstName", "lastName", "email", "role"],
        },
      ],
    },
  });
  return data;
};

const addParticiparToConvertation = async (conversation_id, userId) => {
  const participant = await Participants.create({
    id: uuid.v4(),
    conversationId: conversation_id,
    userId,
  });
  return participant;
};

const getParticipantFromConvertation = async (participant_id) => {
  const data = await Participants.findOne({
    where: {
      id: participant_id,
    },
    attributes: ["id"],
    include: [
      {
        model: Conversations,
      },
      {
        model: Users,
        attributes: ["id", "firstName", "lastName", "email", "role"],
      },
    ],
  });

  return data;
};

const deleteParticipantFromConversation = async (participant_id) => {
  const result = await Participants.destroy({
    where: {
      id: participant_id,
    },
  });
  return result;
};

module.exports = {
  getParticipantByIdConversation,
  addParticiparToConvertation,
  getParticipantFromConvertation,
  deleteParticipantFromConversation,
};
