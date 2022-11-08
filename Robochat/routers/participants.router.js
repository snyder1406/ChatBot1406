const router = require("express").Router();
const passport = require("passport");
const participantServices = require("../services/participants.services");
require("../middlewares/auth.middleware")(passport);

router
  .route("/:conversation_id/participants")
  .get(
    passport.authenticate("jwt", { session: false }),
    participantServices.getAllParticipants
  )
  .post(
    passport.authenticate("jwt", { session: false }),
    participantServices.addParticipant
  );

router
  .route("/:conversation_id/participants/:participant_id")
  .get(
    passport.authenticate("jwt", { session: false }),
    participantServices.getParticipants
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    participantServices.removeParticipant
  );

module.exports = router;
