const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentEmailSchema = new Schema({
    emailsTo: [{ type: String, required: true }],
    emailsCc: [{ type: String }],
    emailsBcc: [{ type: String }],
    departmentName: { type: String, required: true },
    website: { type: Schema.Types.ObjectId, ref: 'Website', required: true },
    subjectLine: { type: String, required: true },
    outgoingEmail: { type: String },
    smtp: { type: Schema.Types.ObjectId, ref: 'SMTP' },
    emailFrom: { type: String, required: true } ,
    crmIntegration: {
        apiUrl: { type: String },
        username: { type: String },
        password: { type: String },
        accessToken: { type: String }
      },
}, { timestamps: true });

module.exports = mongoose.model('DepartmentEmail', departmentEmailSchema);
