const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const websiteSchema = new Schema({
    title: { type: String, required: true, unique: true },
    url: { type: String, required: true ,unique:true},
    POCs: [{ type: Schema.Types.ObjectId, ref: 'POC' }],
    timeZone: { type: String },
    departments: [{ type: Schema.Types.ObjectId, ref: 'DepartmentEmail' }],
    company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    smtp: { type: Schema.Types.ObjectId, ref: 'SMTP', required: true },
    formUrl: { type: String },
    formFields: [{ type: String }], 
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
      }

}, { timestamps: true });

module.exports = mongoose.model('Website', websiteSchema);
