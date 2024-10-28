import LoginController from './controller/login-controller.js';
import LoginModel from './model/login-model.js';
import LoginView from './view/login-view.js';
export default class Login {
    static create() {
        const model = new LoginModel();
        const view = new LoginView(model);
        const controller = new LoginController(model, view);
        return controller;
    }
}
