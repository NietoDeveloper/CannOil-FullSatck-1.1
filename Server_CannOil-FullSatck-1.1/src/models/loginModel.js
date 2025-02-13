const { PrismaClient } = require('../generated/client')
const prisma = new PrismaClient();


const checkLogin = async (username) => {
    return prisma.user.findUnique({
        where: { username }
    });
}

module.exports = {
    checkLogin
}