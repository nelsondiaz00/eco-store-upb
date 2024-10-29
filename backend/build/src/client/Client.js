"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ClientController_1 = __importDefault(require("./controller/ClientController"));
const ClientView_1 = __importDefault(require("./view/ClientView"));
class Client {
    static createView = () => {
        const controller = new ClientController_1.default();
        return new ClientView_1.default(controller);
    };
}
exports.default = Client;
