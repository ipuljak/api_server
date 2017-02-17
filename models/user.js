const mongoose = require('mongoose')
  , bcrypt = require('bcrypt-nodejs')
  , Schema = mongoose.Schema;

/**
 *  User Schema
 *    username -> STRING: A unique username to represent the user
 *    password -> STRING: The user's password which is encrypted
 *    favorites -> ARRAY (LOCATION): A list of locations that are favorited by the user 
 */
const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: "Location"
    }
  ]
});

// Save hook to encrypt the user's password before storing it to the database
userSchema.pre('save', next => {
  // Get access to the user model - user is a specific user now
  const user = this;
  // Generate a salt for the password and then run the next callback
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    // Hash/encrypt the password using the salt
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);
      // Overwrite plain text password with encrypted password
      user.password = hash;
      next();
    });
  });
});

// Method to compare given user passwords with encrypted passwords in the database
userSchema.methods.comparePassword = (candidatePassword, callback) => {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;