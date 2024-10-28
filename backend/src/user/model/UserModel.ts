import path from 'path';
import { promises as fs } from 'fs';
import User from '../types/User';

export default class UserModel {
  PATH_PRODUCTS_JSON = path.join(__dirname, '../../assets/database/users.json');

  public async getUsers(): Promise<User[]> {
    const data = await fs.readFile(this.PATH_PRODUCTS_JSON, 'utf-8');
    return JSON.parse(data) as User[];
  }

  public async getUserByEmail(email: string): Promise<User> {
    const users = await this.getUsers();
    return users.find((user) => user.email === email) as User;
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
