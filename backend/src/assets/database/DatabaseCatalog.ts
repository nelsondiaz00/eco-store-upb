import { createConnection, Connection } from 'mysql2/promise';
import mysql from 'mysql2'
import dotenv from 'dotenv';

dotenv.config();

export default class DatabaseCatalog {
    private connection: Connection | null = null;

    private dbConfig = mysql.createPool({
        host: process.env['DB_HOST'] ?? 'localhost',  
        user: process.env['DB_USER'] ?? 'root',     
        password: process.env['DB_PASSWORD'] ?? '',
        database: process.env['DB_NAME'] ?? 'database' 
    }).promise();

    public async connect(): Promise<void> {
        try {
            this.connection = await createConnection(this.dbConfig);
            console.log('Conectado a la base de datos');
        } catch (error) {
            console.error('Error al conectar a la base de datos:', error);
            process.exit(1);
        }
    }

    public getPool() {
        return this.dbConfig;
    }

    public getConnection(): Connection | null {
        return this.connection;
    }

    public async closeConnection(): Promise<void> {
        if (this.connection) {
            await this.connection.end();
            console.log('Conexión cerrada');
        } else {
            console.log('No hay ninguna conexión activa');
        }
    }
}




