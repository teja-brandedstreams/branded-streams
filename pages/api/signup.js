"use server";
// pages/api/signup.js
import sql from 'mssql';
import bcrypt from "bcrypt";

const config = {
    user: process.env.AZURE_SQL_USER,
    password: process.env.AZURE_SQL_PASSWORD,
    server: process.env.AZURE_SQL_SERVER, // Server name
    database: process.env.AZURE_SQL_DATABASE,
    options: {
        encrypt: true, // Required for Azure SQL
    },
};

export default async function signup(req, res) {
    console.log("Signup");
    if (req.method === 'POST') {
        const { email, password, userType } = req.body;

        try {
            // Hash the password for security (bcrypt or similar can be used)
            const hashedPassword = await bcrypt.hash(password, 10);// Replace with actual hash function

            // Connect to the Azure SQL Database
            let pool = await sql.connect(config);

            // Insert user into the database
            await pool.request()
                .input('email', sql.NVarChar, email)
                .input('passwordHash', sql.NVarChar, hashedPassword)
                .input('userType', sql.NVarChar, userType)
                .query(`INSERT INTO Users (Email, PasswordHash, UserType) VALUES (@email, @passwordHash, @userType)`);

            res.status(200).json({ message: 'User signed up successfully!' });
        } catch (error) {
            console.error('Error signing up user:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}

