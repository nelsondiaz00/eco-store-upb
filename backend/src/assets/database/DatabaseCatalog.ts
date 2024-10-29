import { Client } from 'ssh2';
import { createConnection, Connection } from 'mysql2/promise';
import mysql from 'mysql2';
import * as fs from 'fs';

export default class DatabaseCatalog {
    private connection: Connection | null = null;
    private sshClient: Client | null = null;
    private dbConfig = {
        host: '18.208.193.86',  // Se redirigirá a través del túnel SSH
        user: process.env['DB_USER'] ?? 'root',
        password: process.env['DB_PASSWORD'] ?? '',
        database: process.env['DB_NAME'] ?? 'database',
        port: 3306, // Puerto estándar de MySQL
    };

    // SSH Configuration
    private sshConfig = {
        host: process.env['SSH_HOST'] ?? '', // IP de la instancia EC2
        port: 22,                            // Puerto SSH estándar
        username: 'ec2-user',                // Usuario de EC2
        privateKey: fs.readFileSync(process.env['SSH_KEY_PATH'] ?? ''), // Ruta a la clave PEM
    };

    private pool = mysql.createPool(this.dbConfig).promise();

    public async connect(): Promise<void> {
        try {
        console.log('Estableciendo conexión SSH...');

        this.sshClient = new Client();

        console.log("host" + this.sshConfig.host)
        console.log("privateKey" + this.sshConfig.privateKey)

        // Establecer el túnel SSH y redirigir al puerto MySQL
        this.sshClient.on('ready', async () => {
            console.log('Conexión SSH establecida');

            this.sshClient?.forwardOut(
            '127.0.0.1',
            0,
            process.env['DB_HOST'] ?? 'localhost',
            3306,
            async (err: any, stream: any) => {
                if (err) {
                console.error('Error creando el túnel SSH:', err);
                return;
                }

                // Conectar a MySQL usando el túnel SSH
                this.connection = await createConnection({
                ...this.dbConfig,
                stream, // Redirigir la conexión a través del túnel SSH
                });

                console.log('Conexión a la base de datos MySQL establecida');
            }
            );
        }).connect(this.sshConfig);

        } catch (error) {
        console.error('Error al conectar a la base de datos o SSH:', error);
        process.exit(1);
        }
    }

    public getPool() {
        return this.pool;
    }

    public getConnection(): Connection | null {
        return this.connection;
    }

    public async closeConnection(): Promise<void> {
        if (this.connection) {
        await this.connection.end();
        console.log('Conexión a la base de datos cerrada');
        } else {
        console.log('No hay ninguna conexión activa');
        }

        if (this.sshClient) {
        this.sshClient.end();
        console.log('Conexión SSH cerrada');
        }
    }

}





