"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const ssh2_1 = require("ssh2");
const promise_1 = require("mysql2/promise");
const mysql2_1 = __importDefault(require("mysql2"));
const fs = __importStar(require("fs"));
class DatabaseCatalog {
    constructor() {
        var _a, _b, _c, _d, _e;
        this.connection = null;
        this.sshClient = null;
        this.dbConfig = {
            host: '52.87.172.131', // Se redirigirá a través del túnel SSH
            user: (_a = process.env['DB_USER']) !== null && _a !== void 0 ? _a : 'root',
            password: (_b = process.env['DB_PASSWORD']) !== null && _b !== void 0 ? _b : '',
            database: (_c = process.env['DB_NAME']) !== null && _c !== void 0 ? _c : 'database',
            port: 3306, // Puerto estándar de MySQL
        };
        // SSH Configuration
        this.sshConfig = {
            host: (_d = process.env['SSH_HOST']) !== null && _d !== void 0 ? _d : '', // IP de la instancia EC2
            port: 22, // Puerto SSH estándar
            username: 'ec2-user', // Usuario de EC2
            privateKey: fs.readFileSync((_e = process.env['SSH_KEY_PATH']) !== null && _e !== void 0 ? _e : ''), // Ruta a la clave PEM
        };
        this.pool = mysql2_1.default.createPool(this.dbConfig).promise();
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Estableciendo conexión SSH...');
                this.sshClient = new ssh2_1.Client();
                console.log("host" + this.sshConfig.host);
                console.log("privateKey" + this.sshConfig.privateKey);
                // Establecer el túnel SSH y redirigir al puerto MySQL
                this.sshClient.on('ready', () => __awaiter(this, void 0, void 0, function* () {
                    var _a, _b;
                    console.log('Conexión SSH establecida');
                    (_a = this.sshClient) === null || _a === void 0 ? void 0 : _a.forwardOut('127.0.0.1', 0, (_b = process.env['DB_HOST']) !== null && _b !== void 0 ? _b : 'localhost', 3306, (err, stream) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            console.error('Error creando el túnel SSH:', err);
                            return;
                        }
                        // Conectar a MySQL usando el túnel SSH
                        this.connection = yield (0, promise_1.createConnection)(Object.assign(Object.assign({}, this.dbConfig), { stream }));
                        console.log('Conexión a la base de datos MySQL establecida');
                    }));
                })).connect(this.sshConfig);
            }
            catch (error) {
                console.error('Error al conectar a la base de datos o SSH:', error);
                process.exit(1);
            }
        });
    }
    getPool() {
        return this.pool;
    }
    getConnection() {
        return this.connection;
    }
    closeConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.connection) {
                yield this.connection.end();
                console.log('Conexión a la base de datos cerrada');
            }
            else {
                console.log('No hay ninguna conexión activa');
            }
            if (this.sshClient) {
                this.sshClient.end();
                console.log('Conexión SSH cerrada');
            }
        });
    }
}
exports.default = DatabaseCatalog;
