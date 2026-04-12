import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    console.log(req.headers.authorization);
    try {
        const tokenHeader = req.headers.authorization;

        if (!tokenHeader || !tokenHeader.includes("Bearer ")) {
            res.status(401).json({ success: false, msg: "No token provided!" });
            return;
        }

        const token = tokenHeader.split(" ")[1];
        console.log("Token received:", token);

        const payload = jwt.verify(token, process.env.JWT_SECRET as string) as any;

        (req as any).id = payload.id;
        (req as any).role = payload.role;
        (req as any).name = payload.name;

        next();
    } catch (error) {
        console.log(error);
        res.status(403).json({ success: false, msg: "Invalid or expired token!" });
    }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
    if ((req as any).role === 'user') {
        next();
    } else {
        res.status(400).json({ success: false, msg: 'UnAuthorized Access' });
    }
};

export const isSupperAdminAdmin = (req: Request, res: Response, next: NextFunction): void => {
    if ((req as any).role === 'admin') {
        next();
    } else {
        console.log('aut  error');
        res.status(400).json({ success: false, msg: 'UnAuthorized Access' });
    }
};
