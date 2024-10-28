import { promises as fs } from 'fs';
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

  public async getUserById(id: string): Promise<User> {
    const users = await this.getUsers();
    return users.find((user) => user.id === id) as User;
  }

  public async createUser(user: User): Promise<void> {
    const users = await this.getUsers();
    const maxIdUser = users.reduce(
      (max, current) => (current.id > (max?.id ?? '') ? current : max),
      users[0] || { id: '0' }
    );
    user.id = (parseInt(maxIdUser.id) + 1).toString();
    users.push(user);
    await fs.writeFile(this.PATH_PRODUCTS_JSON, JSON.stringify(users, null, 2));
  }
}
