"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductController_1 = __importDefault(require("./controller/ProductController"));
const ProductModel_1 = __importDefault(require("./model/ProductModel"));
const ProductView_1 = __importDefault(require("./view/ProductView"));
class Movies {
}
Movies.createView = () => {
    const model = new ProductModel_1.default();
    const controller = new ProductController_1.default(model);
    return new ProductView_1.default(controller);
};
exports.default = Movies;
