const mongoose = require('mongoose');

/*
 * proposal
 */
const Proposal = mongoose.model('Proposal', new mongoose.Schema({
    __v: { select: false, type: Number },
    id: { index: true, required: false, type: Number },
    creator: { required: false, type: String },
    name: { required: true, type: String },
    yeas: { required: true, type: Number },
    nays: { required: true, type: Number },
    blockStart: { required: true, type: Number },
    blockEnd: { required: true, type: Number },
    status: { required: true, type: Boolean },
    budgetTotal: { required: true, type: Number },
    budgetMonthly: { required: true, type: Number },
    budgetPeriod: { required: true, type: Number },
    hash: { required: true, type: String },
    feehash: { required: true, type: String },
    url: { required: true, type: String }
}, { versionKey: false }), 'proposals');

module.exports = Proposal;
