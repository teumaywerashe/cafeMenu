import { Request, Response } from 'express';
import { userModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const createToken = ({ id, role, name }: { id: string; role: string; name: string }): string => {
    return jwt.sign({ id, role, name }, process.env.JWT_SECRET as string, {
        expiresIn: (process.env.EXPIRES_TIME || "3d") as any,
    });
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;
        const exist = await userModel.findOne({ email });
        if (!emailRegex.test(email)) {
            res.status(400).json({ success: false, msg: "Invalid email ❌" });
            return;
        }
        if (exist) {
            res.status(200).json({ success: false, msg: "User with this email exist please log in" });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new userModel({ name, password: hashedPassword, email });
        await user.save();

        const token = createToken({ id: user._id.toString(), role: user.role, name: user.name });
        res.status(201).json({ success: true, user, token, msg: "registerd" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server Error" });
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        if (!emailRegex.test(email)) {
            res.status(200).json({ success: false, msg: "Invalid email ❌" });
            return;
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            res.status(200).json({ success: false, msg: "user with this email does not exist" });
            return;
        }
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) {
            res.status(200).json({ success: false, msg: "Incorrect Password" });
            return;
        }
        const token = createToken({ id: user._id.toString(), role: user.role, name: user.name });
        res.status(200).json({ success: true, msg: "logedin", user, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server error" });
    }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await userModel.find({});
        if (!users || users.length === 0) {
            res.status(200).json({ success: false, msg: "no user found" });
            return;
        }
        res.status(200).json({ success: true, msg: "users found", users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "server error", success: false });
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            console.error("❌ User ID missing");
            return;
        }
        const existingUser = await userModel.findById(id);

        if (!existingUser) {
            res.status(404).json({ success: false, msg: "User not found ❌" });
            return;
        }

        if ((req as any).file) {
            req.body.profileImage = (req as any).file.filename;
        }
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }

        const updatedUser = await userModel
            .findByIdAndUpdate(id, { $set: req.body }, { new: true })
            .select("-password");

        let newToken: string | undefined;
        if (req.body.name || req.body.role) {
            newToken = createToken({
                id: updatedUser!._id.toString(),
                role: updatedUser!.role,
                name: updatedUser!.name,
            });
        }

        res.status(200).json({
            success: true,
            msg: "User updated successfully ✔",
            user: updatedUser,
            ...(newToken && { token: newToken }),
        });
    } catch (error) {
        console.error(error);
        console.log(req.body);
        res.status(500).json({ success: false, msg: "Server error " });
    }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id);
        if (!user) {
            res.status(200).json({ success: false, msg: "user not found" });
            return;
        }
        res.status(200).json({ success: true, msg: "user found", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server error" });
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await userModel.findByIdAndDelete(id);
        if (!user) {
            res.status(200).json({ success: false, msg: "user not found" });
            return;
        }
        res.status(200).json({ success: true, msg: "deleted", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server error" });
    }
};

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.body;
        if (!emailRegex.test(email)) {
            res.status(400).json({ success: false, msg: "Invalid email ❌" });
            return;
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            res.status(200).json({ success: true, msg: "If that email exists, a reset link has been sent." });
            return;
        }

        const token = crypto.randomBytes(32).toString("hex");
        user.resetPasswordToken = token;
        user.resetPasswordExpires = new Date(Date.now() + 1000 * 60 * 60);
        await user.save();

        const resetUrl = `${process.env.FRONTEND_URL || "http://localhost:5173"}/reset-password/${token}`;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        });

        await transporter.sendMail({
            from: `"Sara Cafe" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: "Password Reset Request",
            html: `
                <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;border:1px solid #eee;border-radius:12px;">
                    <h2 style="color:#ea580c;">Sara Cafe — Password Reset</h2>
                    <p>Hi <strong>${user.name}</strong>,</p>
                    <p>We received a request to reset your password. Click the button below to set a new one. This link expires in <strong>1 hour</strong>.</p>
                    <a href="${resetUrl}" style="display:inline-block;margin:16px 0;padding:12px 24px;background:#ea580c;color:#fff;border-radius:8px;text-decoration:none;font-weight:bold;">Reset Password</a>
                    <p style="color:#888;font-size:12px;">If you didn't request this, you can safely ignore this email.</p>
                </div>
            `,
        });

        res.status(200).json({ success: true, msg: "If that email exists, a reset link has been sent." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "Server error" });
    }
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await userModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            res.status(400).json({ success: false, msg: "Reset link is invalid or has expired." });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ success: true, msg: "Password reset successfully. You can now log in." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "Server error" });
    }
};
