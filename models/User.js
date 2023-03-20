const mongoose = require('mongoose')
const { Schema } = mongoose;
const validator = require('validator')

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: [true, 'username is not available']
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'email is already present']
    , validator(value) {
      if (!validator.isEmail(value)) {
        throw new Error(
          'invalid email'
        )
      }
    }
  },
  password: {
    type: String,
    required: true
  },
  profilePic: {
    type: String,
    default: "https://res.cloudinary.com/djbpmjelt/image/upload/v1672060335/puowcfussvcnazcz5rgt.png"
  },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})


const User = mongoose.model('User', UserSchema);
module.exports = User;