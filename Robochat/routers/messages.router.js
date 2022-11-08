const router = require("express").Router();
const messageServices = require("../services/messages.services");
const passport = require("passport");

router
  .route("/:conversation_id/messages")
  .post(
    passport.authenticate("jwt", { session: false }),
    messageServices.createMessage
  )
  .get(
    passport.authenticate("jwt", { session: false }),
    messageServices.getAllMessagesByIdOfconversation
  );

router
  .route("/:conversation_id/message/:message_id")
  .get(
    passport.authenticate("jwt", { session: false }),
    messageServices.getMessagesByIdOfConversationAndIdOfMessage
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    messageServices.deleteMyMessageByConversationIdAndMessageId
  );

module.exports = router;
