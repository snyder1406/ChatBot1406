const participantController = require("../controller/participants.controller");

const getAllParticipants = (req, res) => {
  const conversarion_id = req.params.conversation_id;
  const userId = req.user.id;
  participantController
    .getParticipantByIdConversation(conversarion_id, userId)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(400).json({ message: "invalid convertation for this user" });
      }
    })
    .catch((error) => res.status(400).json({ message: error.message }));
};

const getParticipants = (req, res) => {
  const participant_id = req.params.participant_id;
  participantController
    .getParticipantFromConvertation(participant_id)
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(400).json({ message: error.message }));
};

const addParticipant = (req, res) => {
  const conversarion_id = req.params.conversation_id;
  const { userId } = req.body;
  if (conversarion_id && userId) {
    participantController
      .addParticiparToConvertation(conversarion_id, userId)
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((error) => res.status(400).json({ message: error.message }));
  } else {
    res.status(400).json({
      message: `Missing Data, conversation_id`,
      fields: {
        userId: "uuid",
      },
    });
  }
};

const removeParticipant = (req, res) => {
  const participant_id = req.params.participant_id;

  if (participant_id) {
    participantController
      .deleteParticipantFromConversation(participant_id)
      .then((_) => res.status(204).json())
      .catch((error) => res.status(400).json({ message: error.message }));
  } else {
  }
};

module.exports = {
  getAllParticipants,
  addParticipant,
  getParticipants,
  removeParticipant,
};
