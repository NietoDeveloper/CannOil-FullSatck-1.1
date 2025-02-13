const productModel = require("../models/productModel");
const { PrismaClient } = require("../generated/client");
const prisma = new PrismaClient();

const getProduct = async (req, res) => {
    const products = await productModel.getProduct();
    res.json(products);
}

const getProductById = async (req, res) => {
    const id = parseInt(req.params.id);
    const productId = await productModel.getProductById(id);
    if (productId) {
        res.json(productId);
    } else {
        res.status(400).json({
            error: "Not Product"
        });
    }
}

module.exports = {
    getProduct,
    getProductById
}