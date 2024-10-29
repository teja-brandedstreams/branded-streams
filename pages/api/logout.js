export default async function logout(req, res) {
    // Clear the JWT token by setting a past expiration date
    res.setHeader('Set-Cookie', 'token=; HttpOnly; Path=/; Max-Age=0');
    res.status(200).json({ message: 'Logout successful' });
}
