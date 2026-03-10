const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const smtpSchema = new Schema({
    configName: { type: String, required: true },
    smtpConfigs: { type: Schema.Types.ObjectId, ref: 'SMTP_CONFIGS' }
}, { timestamps: true });

module.exports = mongoose.model('SMTP', smtpSchema);
