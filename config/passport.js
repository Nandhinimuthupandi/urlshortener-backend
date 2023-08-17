const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust the path to your User model

// Define the LocalStrategy
passport.use(new LocalStrategy(
  { usernameField: 'email' }, // Use email as the username field
  async (email, password, done) => {
    try {
      // Find the user by email
      const user = await User.findOne({ email });

      // If user doesn't exist, return error message
      if (!user) {
        return done(null, false, { message: 'Invalid email or password' });
      }

      // Compare passwords
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return done(null, false, { message: 'Invalid email or password' });
      }

      // If user exists and passwords match, return the user
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Serialize user object to store in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user object from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;

