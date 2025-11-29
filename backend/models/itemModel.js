import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    price: Number,
    ownerId: String,
    category: String,
})

export const itemModel = mongoose.models.Item || mongoose.model('Item', itemSchema)