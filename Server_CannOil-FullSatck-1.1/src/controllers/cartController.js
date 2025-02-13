const cartModel = require('../models/cartModel');
const { PrismaClient } = require("../generated/client");
const prisma = new PrismaClient();

const getCartProduct = async (req, res) => {
    const products = req.body;

    // lấy danh sach id
    const productIds = Object.keys(products).map(id => parseInt(id));

    if (productIds.length === 0) {
        return res.status(400).json({ error: "No product" })
    }
    try {
        const productData = await cartModel.getProductCartById(productIds);
        // thêm số lượng qty vào dữ liệu từng sản phẩm
        const productsWithQuantity = productData.map(product => ({
            ...product, quantity: products[product.id]
        }));
        console.log(productsWithQuantity);
        return res.status(200).json(productsWithQuantity); // Trả về dữ liệu sản phẩm
    } catch (error) {
        console.error(error); // Ghi log lỗi
        return res.status(500).json({ error: "An error occurred while fetching products." });
    }

}

module.exports = {
    getCartProduct
}