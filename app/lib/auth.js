import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

export function verifyToken(req) {
    const token = req.cookies?.token;

    if (!token) {
        throw new Error('No token found');
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded;
    } catch (error) {
        throw new Error('Invalid token');
    }
}