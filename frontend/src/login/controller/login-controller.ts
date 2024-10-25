import LoginModel from '../model/login-model.js';
import LoginView from '../view/login-view.js';

export default class LoginController {
  private model: LoginModel;
  private view: LoginView;

  constructor(model: LoginModel, view: LoginView) {
    this.model = model;
    this.view = view;
  }

  public init(): void {
    this.model.init();
    this.view.init();
  }
}
