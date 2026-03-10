const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const smtpConfigSchema = new Schema({
    configName: { type: String, required: true },
    host: { type: String, required: true },
    port: { type: Number, required: true },
    secure: { type: Boolean, required: true },
    authUser: { type: String, required: true },
    authPass: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('SMTP_CONFIGS', smtpConfigSchema);
