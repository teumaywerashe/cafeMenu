import { Request, Response } from 'express';
import { accountRequestModel } from "../models/accountRequestModel.js";
import nodemailer from "nodemailer";
import { userModel } from "../models/userModel.js";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendStatusEmail = async (request: any, status: string): Promise<void> => {
    const isApproved = status === "approved";
    const subject = isApproved
        ? "Your Account Request Has Been Approved ✅"
        : "Update on Your Account Request";

    const html = `
        <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;border:1px solid #eee;border-radius:12px;">
            <h2 style="color:#ea580c;">The Daily Feast — Account Request Update</h2>
            <p>Hi <strong>${request.name}</strong>,</p>
            ${isApproved
                ? `<p>Great news! Your account request for <strong>${request.cafeName}</strong> has been <span style="color:#16a34a;font-weight:bold;">approved</span>.</p>
                   <p>Our team will reach out to you shortly with your login credentials and next steps.</p>
                   <a href="${process.env.FRONTEND_URL || "http://localhost:5173"}/login" style="display:inline-block;margin:16px 0;padding:12px 24px;background:#ea580c;color:#fff;border-radius:8px;text-decoration:none;font-weight:bold;">Go to Login</a>`
                : `<p>We've reviewed your account request for <strong>${request.cafeName}</strong> and unfortunately it has been <span style="color:#dc2626;font-weight:bold;">rejected</span> at this time.</p>
                   <p>If you believe this is a mistake or would like more information, please contact us directly.</p>`
            }
            <p style="color:#888;font-size:12px;margin-top:24px;">If you did not submit this request, you can safely ignore this email.</p>
        </div>
    `;

    await transporter.sendMail({
        from: `"The Daily Feast" <${process.env.EMAIL_USER}>`,
        to: request.email,
        subject,
        html,
    });
};

export const submitRequest = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, phone, cafeName, message } = req.body;
        if (!name || !email || !cafeName) {
            res.status(400).json({ success: false, msg: "Name, email, and cafe name are required." });
            return;
        }
        const existing = await accountRequestModel.findOne({ email, status: 'pending' });
        const userExist = await userModel.findOne({ email });
        if (existing) {
            res.status(200).json({ success: false, msg: "A request with this email is already pending." });
            return;
        }
        if (userExist) {
            res.status(200).json({ success: false, msg: "A user with this email already exist please login" });
            return;
        }
        const request = new accountRequestModel({ name, email, phone, cafeName, message });
        await request.save();
        res.status(201).json({ success: true, msg: "Request submitted successfully. We'll contact you soon.", request });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "Server error" });
    }
};

export const getAllRequests = async (req: Request, res: Response): Promise<void> => {
    try {
        const requests = await accountRequestModel.find({}).sort({ createdAt: -1 });
        res.status(200).json({ success: true, requests });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "Server error" });
    }
};

export const updateRequestStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!['approved', 'rejected'].includes(status)) {
            res.status(400).json({ success: false, msg: "Invalid status." });
            return;
        }
        const request = await accountRequestModel.findByIdAndUpdate(id, { status }, { new: true });
        if (!request) {
            res.status(404).json({ success: false, msg: "Request not found." });
            return;
        }

        sendStatusEmail(request, status).catch((err) =>
            console.error("Failed to send status email:", err)
        );

        res.status(200).json({ success: true, msg: `Request ${status}.`, request });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "Server error" });
    }
};

export const deleteRequest = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await accountRequestModel.findByIdAndDelete(id);
        res.status(200).json({ success: true, msg: "Request deleted." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "Server error" });
    }
};
