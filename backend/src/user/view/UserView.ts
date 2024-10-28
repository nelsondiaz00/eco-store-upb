import { Router } from 'express';
import UserController from '../controller/UserController';

export default class UserView {
  router: Router;

  constructor(private readonly userController: UserController) {
    this.router = Router();
    this.routes();
  }

  public routes = (): void => {
    this.router.get(
      '/users',
      this.userController.getUsers.bind(this.userController)
    );

    this.router.get(
      '/users/:email',
      this.userController.getUserByEmail.bind(this.userController)
    );
    this.router.post(
      '/users/create',
      this.userController.createUser.bind(this.userController)
    );
  };
}
