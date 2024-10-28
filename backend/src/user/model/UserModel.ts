import User from '../types/User';
import DatabaseCatalog from '../../assets/database/DatabaseCatalog';
import { Pool, RowDataPacket } from 'mysql2/promise';

export default class UserModel {
  private db: DatabaseCatalog;
  private pool: Pool;

  constructor() {
    this.db = new DatabaseCatalog();
    this.pool = this.db.getPool();
}

  public async getUsers(): Promise<User[]> {
    const [rows] = await this.pool.query<RowDataPacket[]>('SELECT * FROM users');
    const users = rows.map((row) => ({
      id: row['id'],
      name: row['name'],
      email: row['email'],
      password: row['password'],
      role: row['role'],
    })) as User[];
    return users;
  }

  public async getUserByEmail(email: string): Promise<User> {
    const users = await this.getUsers();
    return users.find((user) => user.email === email) as User;
  }

  public async createUser(user: User): Promise<void> {
    const {id, name, email, password, role} = user
    await this.pool.query('INSERT INTO users (id, name, email, password, role) VALUES (?,?,?,?,?)', [id, name, email, password, role]);
    console.log('user added');
  }
}
