const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1]; // Extract token from Bearer <token>
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token

            req.user = decoded; // Attach user information to the request
            next(); // Proceed to the next middleware
        } catch (error) {
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    }

    if (!token) {
        res.status(401).json({ message: "Not authorized, no token provided" });
    }
};

const admin = (req, res, next) => {
    if (req.user?.role === "admin") next();
    else res.status(403).json({ message: "Access denied" });
};

module.exports = { protect, admin };
