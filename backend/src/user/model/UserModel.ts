import User from '../types/User';
import DatabaseCatalog from '../../assets/database/DatabaseCatalog';

export default class UserModel {
  private db: DatabaseCatalog;
  // private pool: Pool;

  constructor() {
    this.db = new DatabaseCatalog();
    // this.pool = this.db.getPool();
  }

  public async getUsers(): Promise<User[]> {
    const rows = await this.db.query('SELECT * FROM users');
    // console.log(rows);
    const users = rows.map((row: any) => ({
      id: row['id'],
      name: row['name_user'],
      email: row['email'],
      password: row['password_user'],
      role: row['role_user'],
    })) as User[];
    return users;
  }

  public async getUserByEmail(email: string): Promise<User> {
    const users = await this.getUsers();
    return users.find((user) => user.email === email) as User;
  }

  public async createUser(user: User): Promise<void> {
    const { id, name, email, password, role } = user;
    await this.db.query(
      'INSERT INTO users (id, name, email, password, role) VALUES (?,?,?,?,?)',
      [id, name, email, password, role]
    );
    console.log('user added');
  }
}
