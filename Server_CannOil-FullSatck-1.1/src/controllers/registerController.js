const registerModel = require('../models/registerModel');
const prisma = require('prisma');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const validateRegister = require('../validations/registerValidation');

// thiết lập Multer để xử lý hình ảnh
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // thư mục lưu trữ hình ảnh
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage }).array('avatar', 5);

const registerUser = async (req, res) => {
    const { username, password, phone, address, email, avatar } = req.body;
    try {
        const data = req.body;
        const avatarFiles = req.files;
        console.log('Files received:', avatarFiles); // Kiểm tra đầu ra
        // console.log(data);

        // mã hóa mật khẩu
        data.password = await bcrypt.hash(password, 10);

        const errors = validateRegister(data, avatarFiles);
        // Kiểm tra lỗi
        if (Object.keys(errors).length > 0) {
            return res.status(400).json(errors);
        }

        // check mail
        const errorEmail = await registerModel.checkEmail(data.username, data.email)
        if (Object.keys(errorEmail).length > 0) {
            return res.status(400).json(errorEmail);
        }

        data.avatar = avatarFiles ? avatarFiles.map(file => file.filename) : [];
        data.avatar = JSON.stringify(data.avatar);

        // Save in Database
        const user = await registerModel.registerUser(data);
        console.log('Người dùng đã được đăng ký thành công:', user);

        res.status(200).json({
            message: "Register successful",
            user: user
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error during registration' }); // Xử lý lỗi
    }
};

module.exports = {
    registerUser,
    upload
}