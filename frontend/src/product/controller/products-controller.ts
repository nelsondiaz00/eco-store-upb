import ProductsModel from "../model/products-model.js"
import ProductsView from "../view/products-view.js"

export default class ProductController {
  private model: ProductsModel
  private view: ProductsView

  constructor(model: ProductsModel, view: ProductsView) {
    this.model = model
    this.view = view
  }

  public init(): void {
    this.model.init()
    this.view.init()
  }

}