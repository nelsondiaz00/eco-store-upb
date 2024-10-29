import { Router } from 'express';
export default class UserView {
    userController;
    router;
    constructor(userController) {
        this.userController = userController;
        this.router = Router();
        this.routes();
    }
    routes = () => {
        this.router.get('/users', this.userController.getUsers.bind(this.userController));
        this.router.get('/users/:id', this.userController.getUserById.bind(this.userController));
        this.router.post('/users/create', this.userController.createUser.bind(this.userController));
    };
}
