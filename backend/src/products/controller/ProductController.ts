import { Request, Response } from 'express';
import ProductModel from '../model/ProductModel';
import IProduct from '../types/Product';

export default class ProductController {
  constructor(private readonly productModel: ProductModel) {}
  public getProducts = async (_req: Request, res: Response) => {
    const products = await this.productModel.fetchProducts();
    if (products.length === 0) {
      res.status(200).json([]);
      return;
    }
    res.status(200).json(products);
  };

  public getProductImage = async (req: Request, res: Response) => {
    const id = req.params['id'];
    res.status(200).sendFile(await this.productModel.getProductImage(id ?? ''));
  };

  public deleteProduct = async (req: Request, res: Response) => {
    const id = req.params['id'];
    if (await this.productModel.deleteProduct(Number(id))) {
      res.status(200).send({ message: 'Product deleted' });
    } else {
      res.status(404).send({ message: 'Product not found' });
    }
  };

  public addProduct = async (req: Request, res: Response) => {
    const product: IProduct = req.body;
    await this.productModel.addProduct(product);
    res.status(200).send({ message: 'Product added' });
  };

  public updateProduct = async (req: Request, res: Response) => {
    const product = req.body;
    await this.productModel.updateProduct(product);
    res.status(200).send({ message: 'Product updated' });
  };
}
