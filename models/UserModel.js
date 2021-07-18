const mongoose = require('mongoose');  //importing mongoose
const bcrypt = require('bcrypt');       //importing bcryptD

//userSchema for user
var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  password: String,
  avatar: String,
  age: Number,
  contact: Number,
  address: String,
  gender: {
    type: String,
    enum: ['men', 'women'],
    required: false,
    default: 'men'
  }
});


userSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(this.password, salt)
    this.password = hashPassword
    next()
  } catch (err) {
    console.log(err)
  }
})


module.exports = mongoose.model('User', userSchema); //exporting schema
