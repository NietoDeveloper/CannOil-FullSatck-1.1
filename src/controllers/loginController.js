const loginModel = require('../models/loginModel');
const loginValidation = require("../validations/loginValidation");
const { PrismaClient } = require('../generated/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key';

const checkLogin = async (req, res) => {
    const { username, password } = req.body;
    const data = req.body;
    try {
        // console.log(user);
        const errors = loginValidation(data);

        if (Object.keys(errors).length > 0) {
            return res.status(400).json(errors);
        }

        const user = await prisma.user.findUnique({ where: { username } });

        if (!user) {
            return res.status(404).json({
                status: 404,
                error: 'User not found'
            }); // Trả về lỗi 404 khi không tìm thấy người dùng
        }
        // Compare the input password with the stored hashed password - so sánh password thuần với password đã được mã hóa
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('User password hash from database:', user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                status: 401,
                error: "Invalid password"
            }); // Trả về lỗi 401 khi mật khẩu không đúng
        }

        const token = jwt.sign(
            { userId: user.id, username: user.username },
            JWT_SECRET,
            { expiresIn: '1h' } //Token hết hạn sau 1h
        )

        // Trả về token cho client
        res.status(200).json({
            message: 'Login successful',
            token: token,
            username: username
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error" });
    }
}

module.exports = {
    checkLogin
}