const { PrismaClient } = require('../generated/client');
const prisma = new PrismaClient();

const getProductCartById = async (productIds) => {
    try {
        const productData = await prisma.product.findMany({
            where: {
                id: {
                    in: productIds
                }
            }
        })

        return productData;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Could not retrieve products");
    }
};

module.exports = {
    getProductCartById
}