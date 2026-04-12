import express from "express";
import { deleteUser, getAllUsers, getUser, loginUser, registerUser, updateUser, forgotPassword, resetPassword } from "../controller/userController.js";
import multer from "multer";
import { authMiddleware, isSupperAdminAdmin } from "../middleWare/auth.js";
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
userRouter.post('/forgot-password', forgotPassword)
userRouter.post('/reset-password/:token', resetPassword)
userRouter.patch('/update/:id', authMiddleware, isSupperAdminAdmin, upload.single('profileImage'), updateUser)
userRouter.delete('/remove/:id', authMiddleware, isSupperAdminAdmin, deleteUser)
