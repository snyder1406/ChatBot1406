const messagesController = require("../controller/messages.controller");

const getAllMessages = (req, res) => {
  messagesController
    .getAllMessages()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const getAllMessagesByIdOfconversation = (req, res) => {
  const conversationId = req.params.conversation_id;
  const userId = req.user.id;
  messagesController
    .getMessagesByIdOfConversation(conversationId, userId)
    .then((data) => {
     
      res.status(200).json(data);
    
    })
    .catch((err) => {
      res.status(404).json({ message: err.message });
    });
};
const getMessagesByIdOfConversationAndIdOfMessage = (req, res) => {
  const conversationId = req.params.conversation_id;
  const messageId = req.params.message_id;
  const userId = req.user.id;
  messagesController
    .getMessagesByIdOfConversationAndIdOfMessage(
      conversationId,
      messageId,
      userId
    )
    .then((data) => {
      if (data) res.status(200).json(data);
      else
        res.status(400).json({ message: "invalid messageId o conversationId" });
    })
    .catch((err) => {
      res.status(404).json({ message: err.message });
    });
};

const getMyMessage = (req, res) => {
  const id = req.params.id;
  messagesController
    .getMessageById(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(404).json({ message: err.message });
    });
};
const createMessage = (req, res) => {
  const { message } = req.body;
  const conversationId = req.params.conversation_id;
  const userId = req.user.id;
  if (message && conversationId) {
    messagesController
      .createMessage({ userId, conversationId, message })
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  } else {
    res.status(400).json({
      message: "Missing Data",
      fields: {
        message: "string",
      },
    });
  }
};

const deleteMessage = (req, res) => {
  const id = req.params.id;
  messagesController
    .deleteMessage(id)
    .then(() => {
      res.status(204).json({ message: `the message was deleted succesfully` });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const updateMessage = () => {};
const deleteMyMessageByConversationIdAndMessageId = (req, res) => {
  const conversationId = req.params.conversation_id;
  const messageId = req.params.message_id;
  const userId = req.user.id;
  messagesController
    .deleteMessage(conversationId, messageId, userId)
    .then((data) => {
      if (data)
        res
          .status(204)
          .json({ message: `the message was deleted succesfully` });
      else
        res
          .status(400)
          .json({ message: "Invalida MessageId o conversationId" });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

module.exports = {
  getAllMessages,
  getAllMessagesByIdOfconversation,
  getMessagesByIdOfConversationAndIdOfMessage,
  getMyMessage,
  createMessage,
  deleteMessage,
  deleteMyMessageByConversationIdAndMessageId,
};
