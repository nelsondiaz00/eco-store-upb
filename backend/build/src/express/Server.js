"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const DatabaseCatalog_1 = __importDefault(require("../assets/database/DatabaseCatalog"));
class Server {
    productView;
    clientView;
    userView;
    app;
    database;
    constructor(productView, clientView, userView) {
        this.productView = productView;
        this.clientView = clientView;
        this.userView = userView;
        this.app = (0, express_1.default)();
        this.database = new DatabaseCatalog_1.default();
        this.statics();
        this.config();
        this.routes();
    }
    config = () => {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cors_1.default)());
    };
    statics = () => {
        this.app.use(express_1.default.static(path_1.default.resolve(__dirname, '../client/public')));
    };
    routes = () => {
        this.app.use('/api/v1.0/store', (0, cors_1.default)(), this.productView.router);
        this.app.use('/api/v1.0/user', (0, cors_1.default)(), this.userView.router);
        this.app.use('/', (0, cors_1.default)(), this.clientView.router);
        this.app.use('*', (0, cors_1.default)());
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
exports.default = Server;
