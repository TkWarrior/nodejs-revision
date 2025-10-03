// Authentication middleware file
const passport = require("passport");
const localStrategy = require("passport-local");
const Person = require("../model/Person");

// passport.use accept a verification function which consist of parameters username , password , done  : done is a callback function
passport.use(
  new localStrategy(async (USERNAME, PASSWORD, done) => {
    try {
      const user = await Person.findOne({ username: USERNAME });

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      const isPasswordValid = user.password == PASSWORD ? true : false;

      if (!isPasswordValid) {
        return done(null, false, { message: "Incorrect password" });
      } else {
        return done(null, user);
      }
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = passport