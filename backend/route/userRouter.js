import express from "express";
import { getAllUsers, getUser, loginUser, registerUser, updateUser } from "../controller/userController.js";
import multer from "multer";
export const userRouter = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})


const upload = multer({ storage: storage })

userRouter.get('/get', getAllUsers)
userRouter.get('/get/:id', getUser)

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.patch('/update/:id', upload.single('profileImage'), updateUser)