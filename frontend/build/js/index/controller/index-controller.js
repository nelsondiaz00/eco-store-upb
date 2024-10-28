import Product from '../../product/product.js';
import Login from '../../login/login.js';
export default class IndexController {
    indexModel;
    indexView;
    product;
    login;
    constructor(indexModel, indexView) {
        this.indexModel = indexModel;
        this.indexView = indexView;
        this.product = Product.create();
        this.login = Login.create();
    }
    init = async () => {
        this.indexModel.init();
        this.indexView.init();
        this.loadMain(this.indexView.getPageFromMeta());
    };
    loadMain = async (component) => {
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
    loadProducts = async () => {
        this.product.init();
    };
    loadLogin = async () => {
        this.login.init();
    };
}
