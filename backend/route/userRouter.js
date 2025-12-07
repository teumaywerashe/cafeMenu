import express from "express";
import { deleteUser, getAllUsers, getUser, loginUser, registerUser, updateUser } from "../controller/userController.js";
import multer from "multer";
import { authMiddleware } from "../middleWare/auth.js";
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
userRouter.delete('/remove/:id', deleteUser)