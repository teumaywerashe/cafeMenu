import express from "express";
import { getAllUsers, getUser, loginUser, registerUser, updateUser } from "../controller/userController.js";
export const userRouter = express.Router()
userRouter.get('/get', getAllUsers)
userRouter.get('/get/:id', getUser)

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.patch('/update/:id', updateUser)