import ProductController from "./controller/products-controller.js"
import ProductsModel from "./model/products-model.js"
import ProductsView from "./view/products-view.js"

export default class Product {
    public static create(): ProductController {
      const model = new ProductsModel()
      const view = new ProductsView(model)
      const controller = new ProductController(model, view)
      return controller
    }
  }