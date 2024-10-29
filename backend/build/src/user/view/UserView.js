"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class UserView {
    userController;
    router;
    constructor(userController) {
        this.userController = userController;
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes = () => {
        this.router.get('/users', this.userController.getUsers.bind(this.userController));
        this.router.get('/users/:id', this.userController.getUserById.bind(this.userController));
        this.router.post('/users/create', this.userController.createUser.bind(this.userController));
    };
}
exports.default = UserView;
