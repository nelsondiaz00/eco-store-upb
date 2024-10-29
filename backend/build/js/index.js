"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = __importDefault(require("./client/Client"));
const Server_1 = __importDefault(require("./express/Server"));
const Products_1 = __importDefault(require("./products/Products"));
const Users_1 = __importDefault(require("./user/Users"));
const productsView = Products_1.default.createView();
const clientView = Client_1.default.createView();
const userView = Users_1.default.createView();
const server = new Server_1.default(productsView, clientView, userView);
server.start();
