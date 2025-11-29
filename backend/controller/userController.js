import { userModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const createToken = ({ id, role, name }) => {
    return jwt.sign({ id, role, name }, process.env.JWT_SECRET, {
        expiresIn: process.env.EXPIRE_TIME,
    });
};

export const registerUser = async(req, res) => {
    try {
        const { name, email, password } = req.body;
        const exist = await userModel.findOne({ email });
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, msg: "Invalid email ❌" });
        }
        if (exist) {
            return res.status(200).json({
                success: false,
                msg: "User with this email exist please log in",
            });
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new userModel({ name, password: hashedPassword, email });
        await user.save()

        const token = createToken({ id: user._id.toString(), role: user.role, name: user.name });
        res.status(201).json({ success: true, user, token, msg: "registerd" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: 'server Error' })
    }

};

export const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body
        if (!emailRegex.test(email)) {
            return res.status(200).json({ success: false, msg: "Invalid email ❌" })
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(200).json({ success: false, msg: 'user with this email does not exist' })
        }
        const isCorrectPassword = await bcrypt.compare(password, user.password)
        if (!isCorrectPassword) {
            return res.status(200).json({ success: false, msg: 'Incorrect Password' })
        }
        const token = createToken({
            id: user._id.toString(),
            role: user.role,
            name: user.name
        })
        res.status(200).json({ success: true, msg: 'logedin', user, token })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: 'server error' })
    }
}


export const getAllUsers = async(req, res) => {
    try {
        const users = await userModel.find({ role: 'user' })
        if (!users || users.length === 0) {
            return res.status(200).json({ success: false, msg: 'no user found' })
        }
        return res.status(200).json({ success: true, msg: 'users found', users })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'server error', success: false })
    }

}
export const updateUser = async(req, res) => {
    try {
        const { id } = req.params;

        const existingUser = await userModel.findById(id);
        if (!existingUser) {
            return res.status(404).json({ success: false, msg: "User not found ❌" });
        }

        if (req.file) {
            req.body.profileImage = req.file.filename;
        }

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }

        const updatedUser = await userModel
            .findByIdAndUpdate(id, { $set: req.body }, { new: true })
            .select("-password"); // Remove password from response

        let newToken;
        if (req.body.name || req.body.role) {
            newToken = createToken({
                id: updatedUser._id.toString(),
                role: updatedUser.role,
                name: updatedUser.name
            });
        }

        res.status(200).json({
            success: true,
            msg: "User updated successfully ✔",
            user: updatedUser,
            ...(newToken && { token: newToken })
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: "Server error " });
    }
};

export const getUser = async(req, res) => {
    try {
        const { id } = req.params
        const user = await userModel.findById(id)
        if (!user) {
            return res.status(200).json({ success: false, msg: 'user not found' })
        }
        return res.status(200).json({ success: true, msg: 'user found', user })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: 'server error' })
    }
}