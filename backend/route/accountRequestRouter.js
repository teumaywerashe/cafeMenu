import express from "express";
import { submitRequest, getAllRequests, updateRequestStatus, deleteRequest } from "../controller/accountRequestController.js";
import { authMiddleware, isSupperAdminAdmin } from "../middleWare/auth.js";

export const accountRequestRouter = express.Router();

// Public: anyone can submit a request
accountRequestRouter.post("/submit", submitRequest);

accountRequestRouter.get("/all", authMiddleware, isSupperAdminAdmin, getAllRequests);
accountRequestRouter.patch("/status/:id", authMiddleware, isSupperAdminAdmin, updateRequestStatus);
accountRequestRouter.delete("/remove/:id", authMiddleware, isSupperAdminAdmin, deleteRequest);
