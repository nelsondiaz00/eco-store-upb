"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class ClientView {
    clientController;
    router;
    constructor(clientController) {
        this.clientController = clientController;
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes = () => {
        this.router.get('/', this.clientController.index.bind(this.clientController));
        this.router.get('/:module', this.clientController.index.bind(this.clientController));
    };
}
exports.default = ClientView;
