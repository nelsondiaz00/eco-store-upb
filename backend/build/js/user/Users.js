import UserController from './controller/UserController';
import UserModel from './model/UserModel';
import UserView from './view/UserView';
export default class Movies {
    static createView = () => {
        const model = new UserModel();
        const controller = new UserController(model);
        return new UserView(controller);
    };
}
