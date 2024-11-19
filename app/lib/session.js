export const sessionOptions = {
    cookieName: 'my-session',
    password: '$2b$10$oluvfKH5JKkgu/0vOiXV.e4pH/wfQxuQudTtNo2VgMDY/dLq1mFuy', // Use a secure password
    cookieOptions: {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30, // 30 days
    },
};