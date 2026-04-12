import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { connectDB } from "./config/db.js";
import { userRouter } from "./route/userRouter.js";
import { itemRouter } from "./route/itemRouter.js";
import { accountRequestRouter } from "./route/accountRequestRouter.js";
dotenv.config();
const app = express();

app.use(
    cors({
        origin: ["http://localhost:5173", /\.onrender\.com$/],
        credentials: true,
    })
);

app.use(express.json());

app.use(
    "/uploads",
    (req, res, next) => {
        res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
        next();
    },
    express.static(path.join(__dirname, "uploads"))
);

app.use("/user", userRouter);
app.use("/items", itemRouter);
app.use("/requests", accountRequestRouter);

const port =  process.env.PORT || 3000;

const start = async (): Promise<void> => {
    try {
        await connectDB(process.env.MONGODB_URL as string)
            .then(() => console.log("db connected"))
            .catch(() => console.log("error connecting the data base"));
    } catch (error) {
        console.log(error);
    }
};

start();

app.listen(port, () => {
    console.log(`server running on port http://localhost:${port}`);
});
