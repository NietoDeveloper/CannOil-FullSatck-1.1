const { PrismaClient } = require("../generated/client");
const prisma = new PrismaClient();

const getProduct = async () => {
    try {
        return prisma.product.findMany();
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}

const getProductById = async (id) => {
    try {
        return prisma.product.findUnique({
            where: { id: id }
        })
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}

module.exports = {
    getProduct,
    getProductById
}