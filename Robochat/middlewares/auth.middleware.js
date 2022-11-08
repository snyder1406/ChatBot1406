const { jwtSecret } = require("../../config");
const { getUserById } = require("../controller/users.controller");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

module.exports = (passport) => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: jwtSecret,
  };
  passport.use(
    new JwtStrategy(options, async (decode, done) => {
      try {
        const response = await getUserById(decode.id);
        if (!response) return done(null, false);
        return done(null, decode);
      } catch (error) {
        return done(error, false);
      }
    })
  );
};
