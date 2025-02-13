const validateRegister = (data, file) => {
    const errors = {};

    if (!data.username) {
        errors.username = "Please enter username";
    }

    if (!data.password) {
        errors.password = "Please enter password";
    }

    if (!data.phone) {
        errors.phone = "Please enter phone";
    }

    if (!data.address) {
        errors.address = "Please enter address";
    }

    if (file.lenght == 0) {
        errors.avatar = 'Please enter avatar';
    } else {
        file.map((value, key) => {
            // Kiểm tra định dạng của file avatar
            const allowedFormats = ['image/jpeg', 'image/png', 'image/gif'];
            if (!allowedFormats.includes(value.mimetype)) {
                errors.avatar = 'Định dạng file không hợp lệ. Chỉ chấp nhận JPEG, PNG hoặc GIF';
            }

            // Kiểm tra dung lượng của file avatar (giả sử giới hạn là 1MB)
            const maxSize = 1024 * 1024; // 1MB
            if (value.size > maxSize) {
                errors.avatar = 'Dung lượng file quá lớn. Vui lòng chọn file có dung lượng nhỏ hơn 1MB';
            }
        })

    }
    return errors;
};

module.exports = validateRegister;
