import LoginModel from '../model/login-model.js';
import Observer from '../types/observer.js';
export default class LoginView extends Observer<LoginModel> {
  // private selector: HTMLDivElement;

  constructor(subject: LoginModel) {
    super(subject);
  }

  public init() {
    // this.addListeners();
  }

  public override update(): void {
    this.render();
  }

  public render(): void {
    // this.fillProducts();
  }
}
