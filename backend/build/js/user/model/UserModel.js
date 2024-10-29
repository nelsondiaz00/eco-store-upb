import DatabaseCatalog from '../../assets/database/DatabaseCatalog';
export default class UserModel {
    db;
    pool;
    constructor() {
        this.db = new DatabaseCatalog();
        this.pool = this.db.getPool();
    }
    async getUsers() {
        const [rows] = await this.pool.query('SELECT * FROM users');
        const users = rows.map((row) => ({
            id: row['id'],
            name: row['name'],
            email: row['email'],
            password: row['password'],
            role: row['role'],
        }));
        return users;
    }
    async getUserById(id) {
        const users = await this.getUsers();
        return users.find((user) => user.id === id);
    }
    async createUser(user) {
        const { id, name, email, password, role } = user;
        await this.pool.query('INSERT INTO users (id, name, email, password, role) VALUES (?,?,?,?,?)', [id, name, email, password, role]);
        console.log('user added');
    }
}
