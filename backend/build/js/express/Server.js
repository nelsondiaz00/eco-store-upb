"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const DatabaseCatalog_1 = __importDefault(require("../assets/database/DatabaseCatalog"));
class Server {
    constructor(productView, clientView, userView) {
        this.productView = productView;
        this.clientView = clientView;
        this.userView = userView;
        this.config = () => {
            this.app.use(express_1.default.json());
            this.app.use(express_1.default.urlencoded({ extended: true }));
            this.app.use((0, cors_1.default)());
        };
        this.statics = () => {
            this.app.use(express_1.default.static(path_1.default.resolve(__dirname, '../client/public')));
        };
        this.routes = () => {
            this.app.use('/api/v1.0/store', (0, cors_1.default)(), this.productView.router);
            this.app.use('/api/v1.0/user', (0, cors_1.default)(), this.userView.router);
            this.app.use('/', (0, cors_1.default)(), this.clientView.router);
            this.app.use('*', (0, cors_1.default)());
        };
        this.start = () => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const PORT = (_a = process.env['PORT']) !== null && _a !== void 0 ? _a : 3000;
            const HOST = (_b = process.env['HOST']) !== null && _b !== void 0 ? _b : 'localhost';
            yield this.database.connect();
            this.app.listen(PORT, () => {
                console.log(`Server is running on http://${HOST}:${PORT}`);
            });
        });
        this.app = (0, express_1.default)();
        this.database = new DatabaseCatalog_1.default();
        this.statics();
        this.config();
        this.routes();
    }
}
exports.default = Server;
