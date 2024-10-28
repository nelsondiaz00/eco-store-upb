import path from 'path';
import { promises as fs } from 'fs';
import IProduct from '../types/Product';
import Environment from '../shared/Environment';
import DatabaseCatalog from '../../assets/database/DatabaseCatalog';
import Favorite from '../types/Favorite';
export default class ProductModel {
  private db: DatabaseCatalog;
  // private pool: Pool;

  constructor() {
    this.db = new DatabaseCatalog();
    // this.pool = this.db.getPool();
  }
  private async readProductsFromFile(): Promise<IProduct[]> {
    const rows = await this.db.query('SELECT * FROM products');
    // console.log('Filas obtenidas:', rows);

    const products = rows.map((row: any) => ({
      id: row['id'],
      title: row['title'],
      amount: row['amount'],
      price: row['price'],
      description: row['description_'],
      favorite: Boolean(row['favorite']),
      discount: Boolean(row['discount']),
      discountPer: row['discountPer'],
      discountUni: row['discountUni'],
      image: row['image'] ?? '',
    })) as IProduct[];

    return products;
  }

  public fetchProducts = async (idUser: string): Promise<IProduct[]> => {
    const rows = await this.readProductsFromFile();
    const favorites = await this.getFavoriteProducts(idUser);
    const favoriteProductIds = new Set(
      favorites.map((favorite) => favorite.idProduct)
    );

    const products = (rows as IProduct[]).map((product) => ({
      ...product,
      favorite: favoriteProductIds.has(product.id),
      image: `${Environment.getDomain()}/api/v1.0/store/products/product/image/${
        product.id
      }.jpg`,
    }));

    return products.sort((a, b) => a.id - b.id);
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
    console.log(id);
    const result = await this.db.query('DELETE FROM products WHERE id =?', [
      id,
    ]);
    // console.log(result);
    const affectedRows = (result as any).affectedRows;
    if (affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  };

  public addProduct = async (product: IProduct): Promise<void> => {
    const {
      title,
      amount,
      price,
      description,
      favorite,
      discount,
      discountPer,
      discountUni,
      image,
    } = product;
    await this.db.query(
      'INSERT INTO products(title, amount, price, description_, favorite, discount, discountPer, discountUni,image) VALUES(?,?,?,?,?,?,?,?,?)',
      [
        title,
        amount,
        price,
        description,
        favorite,
        discount,
        discountPer,
        discountUni,
        image,
      ]
    );
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
    const {
      title,
      amount,
      price,
      description,
      favorite,
      discount,
      discountPer,
      discountUni,
      image,
    } = product;
    console.log(product);
    await this.db.query(
      'UPDATE products SET title=?, amount=?, price=?, description_=?, favorite=?, discount=?, discountPer=?, discountUni=?, image=? WHERE id=?',
      [
        title,
        amount,
        price,
        description,
        favorite,
        discount,
        discountPer,
        discountUni,
        image,
        product.id,
      ]
    );
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

  public addFavoriteProduct = async (
    idUser: number,
    idProduct: number
  ): Promise<void> => {
    await this.db.query(
      'INSERT INTO favorites (id_user, id_product) VALUES (?, ?)',
      [idUser, idProduct]
    );
    console.log('Product added to favorites');
  };

  public getFavoriteProducts = async (id: string): Promise<Favorite[]> => {
    const rows = await this.db.query(
      'SELECT * FROM favorites WHERE id_user = ?',
      [id]
    );

    const favorites: Favorite[] = rows.map((row: any) => ({
      idUser: row.id_user,
      idProduct: row.id_product,
    }));

    return favorites;
  };

  public deleteFavoriteProduct = async (
    idUser: string,
    idProduct: string
  ): Promise<boolean> => {
    const result = await this.db.query(
      'DELETE FROM favorites WHERE id_user = ? AND id_product = ?',
      [idUser, idProduct]
    );
    const affectedRows = (result as any).affectedRows;
    if (affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  };
}
