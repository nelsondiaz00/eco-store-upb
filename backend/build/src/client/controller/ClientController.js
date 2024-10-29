"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class ClientController {
    index = (req, res) => {
        const { module } = req.params;
        const filePath = path_1.default.resolve(__dirname, '../public/index.html');
        fs_1.default.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error leyendo el archivo:', err);
                res.status(500).send('Error del servidor');
                return;
            }
            let pageValue = '';
            switch (module) {
                case 'login':
                    pageValue = module;
                    break;
                case 'products':
                    pageValue = module;
                    break;
                default:
                    pageValue = 'default';
            }
            const modifiedData = data.replace(/(meta name="path" page=")[^"]*(")/, `$1${pageValue}$2`);
            res.status(200).send(modifiedData);
        });
    };
}
exports.default = ClientController;
