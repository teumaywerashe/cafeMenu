import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    profileImage: {
        type: String,
        default: 'default.jpg'
    }
})



export const userModel = mongoose.models.uUser || mongoose.model('User', userSchema)