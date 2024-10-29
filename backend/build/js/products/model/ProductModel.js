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
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const Environment_1 = __importDefault(require("../shared/Environment"));
const DatabaseCatalog_1 = __importDefault(require("../../assets/database/DatabaseCatalog"));
class ProductModel {
    constructor() {
        this.fetchProducts = () => __awaiter(this, void 0, void 0, function* () {
            const rows = yield this.readProductsFromFile();
            const products = rows
                .map((product) => (Object.assign(Object.assign({}, product), { image: `${Environment_1.default.getDomain()}/api/v1.0/store/products/product/image/${product.id}.jpg` })));
            return products.sort((a, b) => a.id - b.id); // Ordenar por ID
        });
        this.getProductImage = (file) => __awaiter(this, void 0, void 0, function* () {
            const absolutePath = path_1.default.join(__dirname, `../../assets/images/`);
            const defaultImage = 'not-found.jpg';
            try {
                // console.log(absolutePath + file);
                yield fs_1.promises.access(absolutePath + file, fs_1.promises.constants.F_OK);
                const stats = yield fs_1.promises.stat(absolutePath + file);
                if (stats.isFile()) {
                    return absolutePath + file;
                }
                return absolutePath + defaultImage;
            }
            catch (err) {
                return absolutePath + defaultImage;
            }
        });
        this.deleteProduct = (id) => __awaiter(this, void 0, void 0, function* () {
            const [result] = yield this.pool.query('DELETE FROM products WHERE id =?', [id]);
            const affectedRows = result.affectedRows;
            if (affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        });
        this.addProduct = (product) => __awaiter(this, void 0, void 0, function* () {
            const { title, amount, price, description, favorite, discount, discountPer, discountUni, image } = product;
            yield this.pool.query('INSERT INTO products(tittle, amount, price, description_, favorite, discount, discountPer, discountUni,image) VALUES(?,?,?,?,?,?,?,?,?)', [title, amount, price, description, favorite, discount, discountPer, discountUni, image]);
            /*const products_json = await this.readProductsFromFile();
            const products = products_json as IProduct[];
            products.push(product);
            await fs.writeFile(
              path.join(this.PATH_PRODUCTS_JSON),
              JSON.stringify(products, null, 2)
            );*/
            console.log('Product added');
        });
        this.updateProduct = (product) => __awaiter(this, void 0, void 0, function* () {
            const { title, amount, price, description, favorite, discount, discountPer, discountUni, image } = product;
            yield this.pool.query('UPDATE products SET tittle=?, amount=?, price=?, description_=?, favorite=?, discount=?, discountPer=?, discountUni=?, image=? WHERE id=?', [title, amount, price, description, favorite, discount, discountPer, discountUni, image, product.id]);
            console.log('Product updated');
            /*const products_json = await this.readProductsFromFile();
            const products = products_json as IProduct[];
            const index = products.findIndex((p) => p.id === product.id);
            if (index !== -1) {
              products[index] = product;
              await fs.writeFile(
                path.join(this.PATH_PRODUCTS_JSON),
                JSON.stringify(products, null, 2)
              );
            }*/
        });
        this.db = new DatabaseCatalog_1.default();
        this.pool = this.db.getPool();
    }
    readProductsFromFile() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield this.pool.query('SELECT * FROM products');
            const products = rows.map((row) => ({
                id: row['id'],
                title: row['title'],
                amount: row['amount'],
                price: row['price'],
                description: row['description'],
                favorite: row['favorite'],
                discount: row['discount'],
                discountPer: row['discount_per'],
                discountUni: row['discount_uni'],
            }));
            return products;
        });
    }
}
exports.default = ProductModel;
