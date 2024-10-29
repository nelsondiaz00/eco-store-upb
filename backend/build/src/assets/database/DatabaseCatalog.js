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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ssh2_1 = require("ssh2");
const promise_1 = require("mysql2/promise");
const mysql2_1 = __importDefault(require("mysql2"));
const fs = __importStar(require("fs"));
class DatabaseCatalog {
    connection = null;
    sshClient = null;
    dbConfig = {
        host: '52.87.172.131', // Se redirigirá a través del túnel SSH
        user: process.env['DB_USER'] ?? 'root',
        password: process.env['DB_PASSWORD'] ?? '',
        database: process.env['DB_NAME'] ?? 'database',
        port: 3306, // Puerto estándar de MySQL
    };
    // SSH Configuration
    sshConfig = {
        host: process.env['SSH_HOST'] ?? '', // IP de la instancia EC2
        port: 22, // Puerto SSH estándar
        username: 'ec2-user', // Usuario de EC2
        privateKey: fs.readFileSync(process.env['SSH_KEY_PATH'] ?? ''), // Ruta a la clave PEM
    };
    pool = mysql2_1.default.createPool(this.dbConfig).promise();
    async connect() {
        try {
            console.log('Estableciendo conexión SSH...');
            this.sshClient = new ssh2_1.Client();
            console.log("host" + this.sshConfig.host);
            console.log("privateKey" + this.sshConfig.privateKey);
            // Establecer el túnel SSH y redirigir al puerto MySQL
            this.sshClient.on('ready', async () => {
                console.log('Conexión SSH establecida');
                this.sshClient?.forwardOut('127.0.0.1', 0, process.env['DB_HOST'] ?? 'localhost', 3306, async (err, stream) => {
                    if (err) {
                        console.error('Error creando el túnel SSH:', err);
                        return;
                    }
                    // Conectar a MySQL usando el túnel SSH
                    this.connection = await (0, promise_1.createConnection)({
                        ...this.dbConfig,
                        stream, // Redirigir la conexión a través del túnel SSH
                    });
                    console.log('Conexión a la base de datos MySQL establecida');
                });
            }).connect(this.sshConfig);
        }
        catch (error) {
            console.error('Error al conectar a la base de datos o SSH:', error);
            process.exit(1);
        }
    }
    getPool() {
        return this.pool;
    }
    getConnection() {
        return this.connection;
    }
    async closeConnection() {
        if (this.connection) {
            await this.connection.end();
            console.log('Conexión a la base de datos cerrada');
        }
        else {
            console.log('No hay ninguna conexión activa');
        }
        if (this.sshClient) {
            this.sshClient.end();
            console.log('Conexión SSH cerrada');
        }
    }
}
exports.default = DatabaseCatalog;
