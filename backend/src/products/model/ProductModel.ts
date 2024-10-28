import path from 'path';
import { promises as fs } from 'fs';
import IProduct from '../types/Product';
import Environment from '../shared/Environment';
import DatabaseCatalog from '../../assets/database/DatabaseCatalog';
import {Pool, RowDataPacket } from 'mysql2/promise';
export default class ProductModel {
  private db: DatabaseCatalog;
  private pool: Pool;

  constructor() {
    this.db = new DatabaseCatalog();
    this.pool = this.db.getPool();
}
  private async readProductsFromFile(): Promise<IProduct[]> {
    const [rows] = await this.pool.query<RowDataPacket[]>('SELECT * FROM products');
    const products = rows.map((row) =>({
      id: row['id'],
      title: row['title'],
      amount: row['amount'],
      price: row['price'],
      description: row['description'],
      favorite: row['favorite'],
      discount: row['discount'],
      discountPer: row['discount_per'],
      discountUni: row['discount_uni'],
  })) as IProduct[]
    return products;
  }

  public fetchProducts = async (): Promise<IProduct[]> => {
    const rows = await  this.readProductsFromFile()
    
    const products = (rows as IProduct[])
      .map((product) => ({
        ...product,
          image: `${Environment.getDomain()}/api/v1.0/store/products/product/image/${product.id}.jpg`,
      }))

    return products.sort((a, b) => a.id - b.id); // Ordenar por ID
  };

  public getProductImage = async (file: string): Promise<string> => {
    const absolutePath = path.join(__dirname, `../../assets/images/`);
    const defaultImage = 'not-found.jpg';
    try {
      // console.log(absolutePath + file);
      await fs.access(absolutePath + file, fs.constants.F_OK);
      const stats = await fs.stat(absolutePath + file);
      if (stats.isFile()) {
        return absolutePath + file;
      }
      return absolutePath + defaultImage;
    } catch (err) {
      return absolutePath + defaultImage;
    }
  };

  public deleteProduct = async (id: number): Promise<boolean> => {
    const [result] = await this.pool.query('DELETE FROM products WHERE id =?', [id]);
    const affectedRows = (result as any).affectedRows;
    if (affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  }; 

  

  public addProduct = async (product: IProduct): Promise<void> => {
    const {title, amount, price, description, favorite, discount, discountPer, discountUni, image} = product;
    await this.pool.query('INSERT INTO products(tittle, amount, price, description_, favorite, discount, discountPer, discountUni,image) VALUES(?,?,?,?,?,?,?,?,?)', [title, amount, price, description, favorite, discount, discountPer, discountUni, image]);
    /*const products_json = await this.readProductsFromFile();
    const products = products_json as IProduct[];
    products.push(product);
    await fs.writeFile(
      path.join(this.PATH_PRODUCTS_JSON),
      JSON.stringify(products, null, 2)
    );*/
    console.log('Product added');
  };

  public updateProduct = async (product: IProduct): Promise<void> => {
    const {title, amount, price, description, favorite, discount, discountPer, discountUni, image} = product;
    await this.pool.query('UPDATE products SET tittle=?, amount=?, price=?, description_=?, favorite=?, discount=?, discountPer=?, discountUni=?, image=? WHERE id=?', [title, amount, price, description, favorite, discount, discountPer, discountUni, image, product.id]);
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
  };
}
