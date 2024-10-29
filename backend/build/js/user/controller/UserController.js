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
class UserController {
    constructor(userModel) {
        this.userModel = userModel;
        this.getUsers = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            const products = yield this.userModel.getUsers();
            if (products.length === 0) {
                res.status(200).json([]);
                return;
            }
            res.status(200).json(products);
        });
        this.getUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (id) {
                const product = yield this.userModel.getUserById(id);
                if (product) {
                    res.status(200).json(product);
                }
                else {
                    res.status(404).json({ message: 'User not found' });
                }
            }
            else {
                res.status(400).json({ message: 'Id is required' });
            }
        });
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            if (user) {
                yield this.userModel.createUser(user);
                res.status(201).json({ message: 'User created' });
            }
            else {
                res.status(400).json({ message: 'User is required' });
            }
        });
    }
}
exports.default = UserController;
