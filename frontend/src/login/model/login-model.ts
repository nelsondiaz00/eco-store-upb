import Environment from '../../shared/enviroments.js';
import Subject from '../types/subject.js';
import LoginView from '../view/login-view.js';
export default class LoginModel extends Subject<LoginView> {
  constructor() {
    super();
  }

  public init = async (): Promise<void> => {};
}
