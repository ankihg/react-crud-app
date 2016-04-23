'use strict';
const bcrypt = require('bcrypt');

module.exports = (mongoose, models) => {
  const userSchema = new mongoose.Schema({
    name: String,
    password: String
  });

  userSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.pasword, bcrypt.genSaltSync(10));
    next();
  });

  models.User = mongoose.model('User', userSchema);
}
