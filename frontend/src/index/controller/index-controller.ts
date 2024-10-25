import IndexModel from '../model/index-model.js';
import IndexView from '../view/index-view.js';
import ProductController from '../../product/controller/products-controller.js';
import Product from '../../product/product.js';
export default class IndexController {
  private readonly product: ProductController;
  constructor(
    private readonly indexModel: IndexModel,
    private readonly indexView: IndexView
  ) {
    this.product = Product.create();
  }

  public init = async (): Promise<void> => {
    this.indexModel.init();
    this.indexView.init();
    this.loadMain(this.indexView.getPageFromMeta());
  };

  public loadMain = async (component: string): Promise<void> => {
    this.indexView.renderMain(component ?? 'error');
    switch (component) {
      case 'products':
        this.loadProducts();
        break;

      case 'update-appointment':
        break;
      default:
        console.log('Error');
      //this.loadError();
    }
  };

  public loadProducts = async (): Promise<void> => {
    this.product.init();
  };
}
