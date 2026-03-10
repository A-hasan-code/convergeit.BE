const mongoose = require('mongoose');

const emailFromSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  }
});

const EmailFrom = mongoose.model('EmailFrom', emailFromSchema);

module.exports = EmailFrom;
