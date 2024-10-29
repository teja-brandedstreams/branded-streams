"use server";
import sql from 'mssql';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const config = {
    user: process.env.AZURE_SQL_USER,
    password: process.env.AZURE_SQL_PASSWORD,
    server: process.env.AZURE_SQL_SERVER,
    database: process.env.AZURE_SQL_DATABASE,
    options: {
        encrypt: true,
    },
};

export default async function login(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        try {
            // Connect to the Azure SQL Database
            let pool = await sql.connect(config);

            // Fetch the user details by email
            const result = await pool.request()
                .input('email', sql.NVarChar, email)
                .query(`SELECT * FROM Users WHERE Email = @email`);

            const user = result.recordset[0];

            if (!user) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            // Compare password with stored hashed password
            const isMatch = await bcrypt.compare(password, user.PasswordHash);

            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            // Create JWT token (sign with a secret key, make sure to store it securely in env)
            const token = jwt.sign(
                { userId: user.UserUId, email: user.Email, userType: user.UserType },
                process.env.JWT_SECRET, // Store secret securely
                { expiresIn: '1h' } // Set token expiry
            );

            // Set token in HTTP-only cookie (for security)
            res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600`);

            return res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            console.error('Error logging in user:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
