const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    websiteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Website',
        required: true
    },
    emailFrom: {
        type: String,
        required: true
    },
    emailTo: {
        type: [String],
        required: true
    },
    emailCc: {
        type: [String]
    },
    emailBcc: {
        type: [String]
    },
    interval: {
        type: String,
        enum: ['instant', 'weekly', 'monthly', 'annual'],
        required: true
    },
    status: {
        type: String,
        enum: ['scheduled', 'in-progress', 'completed', 'failed','suspended'],
        default: 'scheduled'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
