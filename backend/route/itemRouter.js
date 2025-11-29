import express from 'express'
import { addItem, deleteItem, getAllItems, getItem, getUserItems, updateItem } from '../controller/ietmController.js'
import multer from 'multer'
import { authMiddleware } from '../middleWare/auth.js'
export const itemRouter = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})


const upload = multer({ storage: storage })

itemRouter.get('/get', authMiddleware, getAllItems)
itemRouter.get('/get/:id', getUserItems)
itemRouter.get('/getItem/:id', getItem)
itemRouter.post('/add', authMiddleware, upload.single('image'), addItem)
itemRouter.patch('/update/:id', authMiddleware, upload.single('image'), updateItem)

itemRouter.delete('/remove/:id', authMiddleware, deleteItem)