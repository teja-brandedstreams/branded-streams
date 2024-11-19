// utils/auth.js
import jwt from 'jsonwebtoken';

export const verifyToken = (req) => {
    try {
        // Extract token from cookies
        const token = req.cookies.token;
        console.log("...token", token);
        if (!token) throw new Error('Unauthorized');
        // Verify and decode token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Return user info
        return { userId: decoded.userId, email: decoded.email, userType: decoded.userType };
    } catch (err) {
        throw new Error('Forbidden: Invalid token');
    }
};
