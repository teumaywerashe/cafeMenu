import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    console.log(req.headers.authorization);
    try {
        const tokenHeader = req.headers.authorization;


        if (!tokenHeader || !tokenHeader.includes("Bearer ")) {

            return res.status(401).json({ success: false, msg: "No token provided!" });
        }


        const token = tokenHeader.split(" ")[1];
        console.log("Token received:", token);

        const payload = jwt.verify(token, process.env.JWT_SECRET);


        req.id = payload.id;
        req.role = payload.role;
        req.name = payload.name;

        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({ success: false, msg: "Invalid or expired token!" });
    }
};
export const isAdmin = (req, res, next) => {

    if (req.role === 'user') {
        next()
    } else {

        res.status(400).json({ success: false, msg: 'UnAuthorized Access' })
    }
}

export const isSupperAdminAdmin = (req, res, next) => {

    if (req.role === 'admin') {
        next()
    } else {
        console.log('aut  error')

        res.status(400).json({ success: false, msg: 'UnAuthorized Access' })
    }
}