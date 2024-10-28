import { Client } from 'ssh2';
import * as fs from 'fs';
import mysql from 'mysql2/promise';

export default class DatabaseCatalog {
  private sshClient: Client | null = null;
  private dbConnection: mysql.Connection | null = null;

  private sshConfig = {
    host: process.env['SSH_HOST'], // IP de la instancia EC2
    port: process.env['SSH_PORT'], // Puerto SSH estándar
    username: process.env['SSH_USER'], // Usuario de EC2
    privateKey: fs.readFileSync(process.env['SSH_KEY_PATH']), // Ruta a la clave PEM
  };

  private dbConfig = {
    host: '127.0.0.1', // localhost para el túnel
    user: 'admin', // Usuario de la base de datos
    password: 'stefanny', // Contraseña de la base de datos
    database: 'catalog', // Nombre de la base de datos
    port: 3306, // Puerto de MySQL
  };

  public async connect(): Promise<void> {
    const conn = new Client();

    return new Promise((resolve, reject) => {
      console.log('Configuración SSH:', this.sshConfig); // Verificar configuración SSH

      conn
        .on('ready', () => {
          console.log('SSH Client :: ready');
          console.log('Preparándose para establecer el túnel...'); // Mensaje de depuración
          conn.exec('ls -la', (err, stream) => {
            if (err) throw err;
            stream
              .on('close', (code, signal) => {
                console.log(
                  `Comando finalizado con código ${code} y señal ${signal}`
                );
                conn.end();
              })
              .on('data', (data) => {
                console.log(`Salida: ${data}`);
              })
              .stderr.on('data', (data) => {
                console.error(`Error: ${data}`);
              });
          });
        })
        .on('error', (err) => {
          console.error('Error en la conexión SSH:', err);
          reject(err);
        })
        .connect(this.sshConfig);
    });
  }

  public async query(sql: string, params: any[] = []): Promise<any> {
    if (!this.dbConnection) {
      throw new Error('No hay conexión a la base de datos');
    }
    const [results] = await this.dbConnection.execute(sql, params);
    return results;
  }

  public async closeConnection(): Promise<void> {
    if (this.dbConnection) {
      await this.dbConnection.end();
      console.log('Conexión a la base de datos MySQL cerrada');
    }

    if (this.sshClient) {
      this.sshClient.end();
      console.log('Conexión SSH cerrada');
    } else {
      console.log('No hay ninguna conexión SSH activa');
    }
  }
}
