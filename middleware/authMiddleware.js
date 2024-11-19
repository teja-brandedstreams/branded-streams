import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export default function authenticateToken(req, res, next) {
    try {
        // Extract token from cookies
        const cookies = req.headers.cookie && cookie.parse(req.headers.cookie);
        const token = cookies?.token;
        console.log("...token", token);
        if (!token) throw new Error('Unauthorized');
        // Verify and decode token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Return user info
        return { userId: decoded.userId, email: decoded.email, userType: decoded.userType };
    } catch (err) {
        throw new Error('Forbidden: Invalid token');
    }
}
