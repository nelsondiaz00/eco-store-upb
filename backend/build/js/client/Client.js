import ClientController from './controller/ClientController';
import ClientView from './view/ClientView';
export default class Client {
    static createView = () => {
        const controller = new ClientController();
        return new ClientView(controller);
    };
}
