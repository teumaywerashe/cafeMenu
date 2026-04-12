import mongoose from "mongoose";

const accountRequestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    cafeName: { type: String, required: true },
    message: { type: String },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

export const accountRequestModel = mongoose.models.AccountRequest || mongoose.model('AccountRequest', accountRequestSchema);
