const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
   
    name: { 
        type: String, 
        required: true,
        unique: true, // Ensure the company name is unique
    },
    website: { type: String },
    POCs: [{ type: Schema.Types.ObjectId, ref: 'POC' }],
    phone: { type: String },
    mobile: { type: String },
    timeZone: { type: String },
    address: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    websites: [{ type: Schema.Types.ObjectId, ref: 'Website' }],
    status: { type: String, default: 'active' } 

}, { timestamps: true });

companySchema.index({ name: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });

module.exports = mongoose.model('Company', companySchema);
