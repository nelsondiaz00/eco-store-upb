import LoginController from './controller/login-controller';
import LoginModel from './model/login-model';
import LoginView from './view/login-view';
export default class Product {
    static create() {
        const model = new LoginModel();
        const view = new LoginView(model);
        const controller = new LoginController(model, view);
        return controller;
    }
}
