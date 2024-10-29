"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = __importDefault(require("./controller/UserController"));
const UserModel_1 = __importDefault(require("./model/UserModel"));
const UserView_1 = __importDefault(require("./view/UserView"));
class Movies {
    static createView = () => {
        const model = new UserModel_1.default();
        const controller = new UserController_1.default(model);
        return new UserView_1.default(controller);
    };
}
exports.default = Movies;
