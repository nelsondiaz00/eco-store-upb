"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class MoviesView {
    productController;
    router;
    constructor(productController) {
        this.productController = productController;
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes = () => {
        this.router.get('/products', this.productController.getProducts.bind(this.productController));
        this.router.get('/products/product/image/:id', this.productController.getProductImage.bind(this.productController));
        this.router.delete('/products/product/delete/:id', this.productController.deleteProduct.bind(this.productController));
        this.router.post('/products/product/add', this.productController.addProduct.bind(this.productController));
        this.router.patch('/products/product/update', this.productController.updateProduct.bind(this.productController));
    };
}
exports.default = MoviesView;
