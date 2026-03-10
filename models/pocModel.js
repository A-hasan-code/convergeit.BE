const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pocSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String },
    phone: { type: String },
    mobile: { type: String },
    designation: { type: String },
    company: { type: Schema.Types.ObjectId, ref: 'Company' },
    website: { type: Schema.Types.ObjectId, ref: 'Website' }
}, { timestamps: true });

module.exports = mongoose.model('POC', pocSchema);
