import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
    const token = req.cookies.token; // Get token from cookies

    if (!token) {

        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user information to request object
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid token' });
    }
}
