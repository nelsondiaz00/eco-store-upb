"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductController {
    productModel;
    constructor(productModel) {
        this.productModel = productModel;
    }
    getProducts = async (_req, res) => {
        const products = await this.productModel.fetchProducts();
        if (products.length === 0) {
            res.status(200).json([]);
            return;
        }
        res.status(200).json(products);
    };
    getProductImage = async (req, res) => {
        const id = req.params['id'];
        res.status(200).sendFile(await this.productModel.getProductImage(id ?? ''));
    };
    deleteProduct = async (req, res) => {
        const id = req.params['id'];
        if (await this.productModel.deleteProduct(Number(id))) {
            res.status(200).send({ message: 'Product deleted' });
        }
        else {
            res.status(404).send({ message: 'Product not found' });
        }
    };
    addProduct = async (req, res) => {
        const product = req.body;
        await this.productModel.addProduct(product);
        res.status(200).send({ message: 'Product added' });
    };
    updateProduct = async (req, res) => {
        const product = req.body;
        await this.productModel.updateProduct(product);
        res.status(200).send({ message: 'Product updated' });
    };
}
exports.default = ProductController;
