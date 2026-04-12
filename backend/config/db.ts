import mongoose from "mongoose";
export const connectDB = async (url: string): Promise<void> => {
    try {
        await mongoose.connect(url, {})
    } catch (error) {
        console.log(error);
    }
}
