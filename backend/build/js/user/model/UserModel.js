"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseCatalog_1 = __importDefault(require("../../assets/database/DatabaseCatalog"));
class UserModel {
    constructor() {
        this.db = new DatabaseCatalog_1.default();
        this.pool = this.db.getPool();
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield this.pool.query('SELECT * FROM users');
            const users = rows.map((row) => ({
                id: row['id'],
                name: row['name'],
                email: row['email'],
                password: row['password'],
                role: row['role'],
            }));
            return users;
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.getUsers();
            return users.find((user) => user.id === id);
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, name, email, password, role } = user;
            yield this.pool.query('INSERT INTO users (id, name, email, password, role) VALUES (?,?,?,?,?)', [id, name, email, password, role]);
            console.log('user added');
        });
    }
}
exports.default = UserModel;
