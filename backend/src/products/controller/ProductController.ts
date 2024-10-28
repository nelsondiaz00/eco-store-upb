import { Request, Response } from 'express';
import ProductModel from '../model/ProductModel';
import IProduct from '../types/Product';
import { error } from 'console';

export default class ProductController {
  constructor(private readonly productModel: ProductModel) {}
  public getProducts = async (req: Request, res: Response) => {
    const id = req.params['id'];
    const products = await this.productModel.fetchProducts(id ?? '');
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

  public addFavoriteProduct = async (req: Request, res: Response) => {
    try {
      console.log('Adding favorite product');
      const data = req.body;
      console.log(data);
      await this.productModel.addFavoriteProduct(data.idUser, data.idProduct);
      res.status(200).send({ message: 'Product added to favorites' });
    } catch (e) {
      console.error(e);
      res.status(404).send({ message: 'Error adding favorite product' });
    }
  };

  public getFavoriteProducts = async (req: Request, res: Response) => {
    const { id } = req.params;
    const products = await this.productModel.getFavoriteProducts(id);
    res.status(200).json(products);
  };

  public deleteFavoriteProduct = async (req: Request, res: Response) => {
    const { idProduct } = req.body;
    const { idUser } = req.body;
    if (await this.productModel.deleteFavoriteProduct(idUser, idProduct)) {
      res.status(200).send({ message: 'Product deleted from favorites' });
    } else {
      res.status(404).send({ message: 'Product not found in favorites' });
    }
  };
}
