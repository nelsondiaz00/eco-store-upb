import IndexModel from '../model/index-model.js';
import IndexView from '../view/index-view.js';
import ProductController from '../../product/controller/products-controller.js';
import Product from '../../product/product.js';
import LoginController from '../../login/controller/login-controller.js';
import Login from '../../login/login.js';
export default class IndexController {
  private readonly product: ProductController;
  private readonly login: LoginController;
  constructor(
    private readonly indexModel: IndexModel,
    private readonly indexView: IndexView
  ) {
    this.product = Product.create();
    this.login = Login.create();
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
      case 'login':
        this.loadLogin();
        break;

      // case 'update-appointment':
      //   break;
      default:
        // this.loadLogin();
        console.log('Error');
      //this.loadError();
    }
  };

  public loadProducts = async (): Promise<void> => {
    this.product.init();
  };

  public loadLogin = async (): Promise<void> => {
    this.login.init();
  };
}
