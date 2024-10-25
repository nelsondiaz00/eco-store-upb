import path from 'path';
import { promises as fs } from 'fs';
import IProduct from '../types/Product';
import Environment from '../shared/Environment';

export default class ProductModel {
  PATH_PRODUCTS_JSON = path.join(
    __dirname,
    '../../assets/database/products.json'
  );

  private async readProductsFromFile(): Promise<IProduct[]> {
    const data = await fs.readFile(this.PATH_PRODUCTS_JSON, 'utf-8');
    return JSON.parse(data) as IProduct[];
  }

  public fetchProducts = async (): Promise<IProduct[]> => {
    const products_json = await this.readProductsFromFile();
    const products = (products_json as IProduct[])
      .map((product) => ({
        ...product,
        image: `${Environment.getDomain()}/api/v1.0/store/products/product/image/${
          product.id
        }.jpg`,
      }))
      .sort((a, b) => a.id - b.id);

    return products;
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
    const products_json = await this.readProductsFromFile();
    const products = products_json as IProduct[];
    const index = products.findIndex((product) => product.id === id);
    if (index !== -1) {
      products.splice(index, 1);
      await fs.writeFile(
        path.join(this.PATH_PRODUCTS_JSON),
        JSON.stringify(products, null, 2)
      );
      return true;
    } else {
      return false;
    }
  };

  public addProduct = async (product: IProduct): Promise<void> => {
    const products_json = await this.readProductsFromFile();
    const products = products_json as IProduct[];
    products.push(product);
    await fs.writeFile(
      path.join(this.PATH_PRODUCTS_JSON),
      JSON.stringify(products, null, 2)
    );
    // console.log('Product added');
  };

  public updateProduct = async (product: IProduct): Promise<void> => {
    const products_json = await this.readProductsFromFile();
    const products = products_json as IProduct[];
    const index = products.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      products[index] = product;
      await fs.writeFile(
        path.join(this.PATH_PRODUCTS_JSON),
        JSON.stringify(products, null, 2)
      );
    }
  };
}
