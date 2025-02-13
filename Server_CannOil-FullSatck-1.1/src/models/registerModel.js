const { PrismaClient } = require('../generated/client');
const prisma = new PrismaClient;


const registerUser = async (data) => {
    return prisma.user.create({ data });
};

const checkEmail = async (username, email) => {

    const exitsUsername = await prisma.user.findFirst({
        where: {
            username: username,
        }
    })

    console.log(username);

    // kiểm tra email có tồn tại trong csdl chưa
    const exitsEmail = await prisma.user.findFirst({
        where: {
            email: email,
        }
    })

    const error = {}

    // Kiểm tra tồn tại của username
    if (exitsUsername) {
        error.username = "Username đã tồn tại";
    }

    if (exitsEmail) {
        error.email = "Email đã tồn tại";
    }
    return error;
}

module.exports = {
    registerUser,
    checkEmail
}