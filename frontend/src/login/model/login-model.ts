import Environment from '../../shared/enviroments.js';
import Subject from '../types/subject.js';
import User from '../types/User.js';
import LoginView from '../view/login-view.js';
export default class LoginModel extends Subject<LoginView> {
  constructor() {
    super();
  }

  public init = async (): Promise<void> => {};

  public getUserById = async (id: string): Promise<User | undefined> => {
    const endpoint = await Environment.getUserById(id);
    // console.log(endpoint);
    const response = await fetch(endpoint);
    if (!response.ok) {
      console.error('Error al obtener el usuario');
      return undefined;
    }
    const user = await response.json();
    console.log(user);
    return user;
  };
}
