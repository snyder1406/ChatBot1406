const Users = require("../models/users.model");
const Messages = require("../models/messages.models");
const Conversations = require("../models/conversations.models");
const Participants = require("../models/participants.models");

const initModels = () => {
  Messages.belongsTo(Users);
  Users.hasMany(Messages);

  Messages.belongsTo(Conversations);
  Conversations.hasMany(Messages);

  Participants.belongsTo(Users);
  Users.hasMany(Participants);

  Participants.belongsTo(Conversations);
  Conversations.hasMany(Participants);

  Conversations.belongsTo(Users);
  Users.hasMany(Conversations);
};

module.exports = initModels;
