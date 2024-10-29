"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class ProductController {
    constructor(productModel) {
        this.productModel = productModel;
        this.getProducts = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            const products = yield this.productModel.fetchProducts();
            if (products.length === 0) {
                res.status(200).json([]);
                return;
            }
            res.status(200).json(products);
        });
        this.getProductImage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params['id'];
            res.status(200).sendFile(yield this.productModel.getProductImage(id !== null && id !== void 0 ? id : ''));
        });
        this.deleteProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params['id'];
            if (yield this.productModel.deleteProduct(Number(id))) {
                res.status(200).send({ message: 'Product deleted' });
            }
            else {
                res.status(404).send({ message: 'Product not found' });
            }
        });
        this.addProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const product = req.body;
            yield this.productModel.addProduct(product);
            res.status(200).send({ message: 'Product added' });
        });
        this.updateProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const product = req.body;
            yield this.productModel.updateProduct(product);
            res.status(200).send({ message: 'Product updated' });
        });
    }
}
exports.default = ProductController;
