import { Router } from 'express';
export default class ClientView {
    clientController;
    router;
    constructor(clientController) {
        this.clientController = clientController;
        this.router = Router();
        this.routes();
    }
    routes = () => {
        this.router.get('/', this.clientController.index.bind(this.clientController));
        this.router.get('/:module', this.clientController.index.bind(this.clientController));
    };
}
