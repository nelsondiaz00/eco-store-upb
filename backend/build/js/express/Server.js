import cors from 'cors';
import express from 'express';
import path from 'path';
import DatabaseCatalog from '../assets/database/DatabaseCatalog';
export default class Server {
    productView;
    clientView;
    userView;
    app;
    database;
    constructor(productView, clientView, userView) {
        this.productView = productView;
        this.clientView = clientView;
        this.userView = userView;
        this.app = express();
        this.database = new DatabaseCatalog();
        this.statics();
        this.config();
        this.routes();
    }
    config = () => {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
    };
    statics = () => {
        this.app.use(express.static(path.resolve(__dirname, '../client/public')));
    };
    routes = () => {
        this.app.use('/api/v1.0/store', cors(), this.productView.router);
        this.app.use('/api/v1.0/user', cors(), this.userView.router);
        this.app.use('/', cors(), this.clientView.router);
        this.app.use('*', cors());
    };
    start = async () => {
        const PORT = process.env['PORT'] ?? 3000;
        const HOST = process.env['HOST'] ?? 'localhost';
        await this.database.connect();
        this.app.listen(PORT, () => {
            console.log(`Server is running on http://${HOST}:${PORT}`);
        });
    };
}
