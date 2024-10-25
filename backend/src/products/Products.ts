import ProductController from './controller/ProductController';
import ProductModel from './model/ProductModel';
import ProductView from './view/ProductView';

export default class Movies {
  public static readonly createView = (): ProductView => {
    const model = new ProductModel();
    const controller = new ProductController(model);
    return new ProductView(controller);
  };
}
