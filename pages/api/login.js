"use server";
import sql from 'mssql';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { verifyToken } from './verifyToken';
import cookie from 'cookie';
import { setCookie } from 'cookies-next';


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

            ("user...", user);

            // Compare password with stored hashed password
            const isMatch = await bcrypt.compare(password, user.PasswordHash);

            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            // Create JWT token (sign with a secret key, make sure to store it securely in env)
            const token = jwt.sign(
                { userId: user.UserUID, email: user.Email, userType: user.UserType, firstName: user.FirstName, lastName: user.LastName },
                process.env.JWT_SECRET, // Store secret securely
                { expiresIn: '1d' } // Set token expiry
            );

            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            console.error('Error logging in user:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
