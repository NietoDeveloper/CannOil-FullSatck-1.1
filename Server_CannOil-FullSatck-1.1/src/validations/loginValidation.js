const loginValidation = (data) => {
    const errors = {};
    if (!data.username) {
        errors.username = 'Please enter username';
    }
    if (!data.password) {
        errors.password = 'Please enter password';
    }
    // if (!data.avatar) {
    //   errors.avatar = 'Vui lòng upload file';
    // }
    // Kiểm tra các trường khác và thêm các lỗi nếu cần
    return errors;
};
module.exports = loginValidation;