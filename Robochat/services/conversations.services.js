const conversationController = require("../controller/conversations.controller");
const Conversations = require("../models/conversations.models");

const getAllConversations = (req, res) => {
  conversationController
    .getAllConversations()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const getMyConversationById = (req, res) => {
  const idConversation = req.params.conversation_id;
  const idUser = req.user.id;
  conversationController
    .getMyConversationById(idConversation, idUser)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(400).json({ message: "invalid convertation for this user" });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const getMyConversations = (req, res) => {
  const id = req.user.id;
  conversationController
    .getMyConversations(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const createConversation = (req, res) => {
  const userId = req.user.id;
  const { title, imageUrl } = req.body;

  if (title && imageUrl && userId) {
    conversationController
      .createConversation({ title, imageUrl, userId })
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  } else {
    res.status(400).json({
      message: `Missing Data`,
      fields: {
        title: "string",
        imageUrl: "string",
      },
    });
  }
};

const updateConversation = (req, res) => {
  const idConvertation = req.params.conversation_id;
  const userId = req.user.id;
  const { title, imageUrl } = req.body;

  if (title && imageUrl) {
    conversationController
      .updateConversation(idConvertation, { title, imageUrl }, userId)
      .then((data) => {
        if (data[0])
          res
            .status(200)
            .json({
              message: `conversation with ID: ${userId} edited succesfully!`,
            });
        else res.status(400).json({ message: "Invalid ID" });
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  } else {
    res.status(400).json({
      message: `Missing Data`,
      fields: {
        title: "string",
        imageUrl: "string",
      },
    });
  }
};

const updateMyConversation = (req, res) => {
  const id = req.user.id;
  const { title, imageUrl } = req.body;
  conversationController
    .updateConversation(id, { title, imageUrl })
    .then(() => {
      res
        .status(200)
        .json({ message: `your conversation was edited succesfully!` });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const deleteMyConversation = (req, res) => {
  const conversationId = req.params.conversation_id;
  const userId = req.user.id;
  conversationController
    .deleteConversation(conversationId, userId)
    .then((data) => {
      if (data) res.status(204).json();
      else res.status(400).json({ message: "Invalid ID" });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};
const deleteConversation = (req, res) => {
  const id = req.params.id;
  Conversations.deleteConversation(id)
    .then(() => {
      res.status(204).json();
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

module.exports = {
  getAllConversations,
  getMyConversationById,
  getMyConversations,
  createConversation,
  updateConversation,
  updateMyConversation,
  deleteConversation,
  deleteMyConversation,
};
