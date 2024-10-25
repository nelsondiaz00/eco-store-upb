import Product from '../../product/product.js';
export default class IndexController {
    indexModel;
    indexView;
    product;
    constructor(indexModel, indexView) {
        this.indexModel = indexModel;
        this.indexView = indexView;
        this.product = Product.create();
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
            case 'update-appointment':
                break;
            default:
                console.log('Error');
            //this.loadError();
        }
    };
    loadProducts = async () => {
        this.product.init();
    };
}
