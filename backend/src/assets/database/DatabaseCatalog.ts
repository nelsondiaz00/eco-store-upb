import { Client } from 'ssh2';
import * as fs from 'fs';
import mysql from 'mysql2/promise';
export default class DatabaseCatalog {
  private sshClient: Client | null = null;
  private dbConnection: mysql.Connection | null = null;

  private sshConfig = {
    host: process.env['SSH_HOST'],
    port: parseInt(process.env['SSH_PORT'] || '22', 10),
    username: process.env['SSH_USER'],
    privateKey: fs.readFileSync(process.env['SSH_KEY_PATH']),
  };

  private dbConfig = {
    host: '127.0.0.1',
    user: process.env['DB_USER'] ?? 'admin',
    password: process.env['DB_PASSWORD'] ?? 'stefanny',
    database: process.env['DB_NAME'] ?? 'catalog',
    port: 3306,
  };

  public async initialize(): Promise<void> {
    if (!this.dbConnection) {
      console.log('Inicializando conexión a la base de datos...');
      await this.connect();
    }
  }

  public async connect(): Promise<void> {
    const conn = new Client();
    this.sshClient = conn;

    return new Promise((resolve, reject) => {
      console.log('Configuración SSH:', this.sshConfig);

      conn
        .on('ready', async () => {
          console.log('SSH Client :: ready');
          console.log('Estableciendo el túnel...');

          conn.forwardOut(
            '127.0.0.1',
            3306,
            'catalog.cxam00ygk110.us-east-1.rds.amazonaws.com',
            3306,
            async (err, stream) => {
              if (err) {
                console.error('Error al establecer el túnel:', err);
                return reject(err);
              }

              try {
                const connection = await mysql.createConnection({
                  stream: stream,
                  user: this.dbConfig.user,
                  password: this.dbConfig.password,
                  database: this.dbConfig.database,
                });

                console.log('Conectado a MySQL a través del túnel SSH');
                this.dbConnection = connection;

                const [rows] = await connection.query('SHOW DATABASES');
                console.log('Bases de datos:', rows);

                resolve();
              } catch (mysqlErr) {
                console.error('Error al conectarse a MySQL:', mysqlErr);
                reject(mysqlErr);
              }
            }
          );
        })
        .on('error', (err) => {
          console.error('Error en la conexión SSH:', err);
          reject(err);
        })
        .connect(this.sshConfig);
    });
  }

  public async query(sql: string, params: any[] = []): Promise<any> {
    await this.initialize();

    if (!this.dbConnection) {
      console.error('Error: dbConnection es null al ejecutar la query.');
      throw new Error('No hay conexión a la base de datos');
    }
    const [results] = await this.dbConnection.execute(sql, params);
    // console.log(results);
    return results;
  }

  public async closeConnection(): Promise<void> {
    if (this.dbConnection) {
      await this.dbConnection.end();
      console.log('Conexión a MySQL cerrada');
    }

    if (this.sshClient) {
      this.sshClient.end();
      console.log('Conexión SSH cerrada');
    }
  }
}
