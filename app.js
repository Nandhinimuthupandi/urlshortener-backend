const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Database setup 
const dbURL = 'mongodb+srv://nandhinivijaya03:kavinaya123@urlshortening.cmtnbuy.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DB connected'))
  .catch(err => console.error(err));

// Passport configuration
const User = require('./models/User');
passport.use(new LocalStrategy({
    usernameField: 'email', // Use email as the username field
    passwordField: 'password', // Use password as the password field
  },
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


app.use(passport.initialize()); // Initialize passport

// Routes
const authRoutes = require('./routes/authRoutes');
const urlRoutes = require('./routes/urlRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/url', urlRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
