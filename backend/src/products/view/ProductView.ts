import { Router } from 'express';
import ProductController from '../controller/ProductController';

export default class MoviesView {
  router: Router;

  constructor(private readonly productController: ProductController) {
    this.router = Router();
    this.routes();
  }

  public routes = (): void => {
    this.router.get(
      '/products/:id',
      this.productController.getProducts.bind(this.productController)
    );

    this.router.get(
      '/products/product/image/:id',
      this.productController.getProductImage.bind(this.productController)
    );

    this.router.delete(
      '/products/product/delete/:id',
      this.productController.deleteProduct.bind(this.productController)
    );

    this.router.post(
      '/products/product/add',
      this.productController.addProduct.bind(this.productController)
    );

    this.router.patch(
      '/products/product/update',
      this.productController.updateProduct.bind(this.productController)
    );

    this.router.post(
      '/products/product/favorites/favorite/add',
      this.productController.addFavoriteProduct.bind(this.productController)
    );

    this.router.get(
      '/products/product/favorites/:id',
      this.productController.getFavoriteProducts.bind(this.productController)
    );

    this.router.delete(
      '/products/product/favorites/favorite/delete',
      this.productController.deleteFavoriteProduct.bind(this.productController)
    );
  };
}
