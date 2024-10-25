import Environment from '../../shared/enviroments.js';
import Product from '../types/product.js';
import Subject from '../types/subject.js';
import ProductsView from '../view/products-view.js';
export default class ProductsModel extends Subject<ProductsView> {
  private products: Product[];
  private actualProduct: Product | undefined;
  private page: number;

  constructor() {
    super();
    this.products = [];
    this.actualProduct = undefined;
    this.page = 0;
  }

  public init = async (): Promise<void> => {
    this.products = await this.getProductsFromFile();
    this.setProductsByPage(this.page);
  };

  public getProducts = (): Product[] => {
    return this.products;
  };

  public getProduct = (): Product | undefined => {
    if (this.actualProduct) {
      return this.actualProduct;
    }
    return;
  };

  public getProductsFromFile = async (): Promise<Product[]> => {
    const response = await fetch(await Environment.getEndPointProducts());
    if (response.status !== 200) {
      return [];
    }
    return await response.json();
  };

  public setProductsByPage = (page: number): void => {
    if (this.products.length === 0) {
      this.page = 0;
      const form = document.querySelector('form') as HTMLFormElement;
      form.reset();
    } else if (page < 0) {
      this.page = this.products.length - 1;
      page = this.page;
    }
    this.actualProduct = this.products[page];
    this.page = page;
    // console.log('Page: ' + this.page, ' pageee: ' + page);

    this.notifyAllObservers();
  };

  public nextPage = (): void => {
    if (this.page < this.products.length - 1) {
      this.page++;
      this.setProductsByPage(this.page);
    } else {
      this.showModal('No hay más registros', 'Error');
      this.page = 0;
      this.setProductsByPage(this.page);
    }
  };

  public previousPage = (): void => {
    if (this.page > 0) {
      this.page--;
      this.setProductsByPage(this.page);
    } else {
      this.showModal('No hay más registros', 'Error');
      this.page = this.products.length - 1;
      this.setProductsByPage(this.page);
    }
  };

  private showModal = (message: string, title: string): void => {
    const modalElement = document.getElementById('modal');
    if (modalElement) {
      const modalTitle = modalElement.querySelector('.modal-title');
      const modalBody = modalElement.querySelector('.modal-body p');
      if (modalTitle) {
        modalTitle.textContent = title;
      }
      if (modalBody) {
        modalBody.textContent = message;
      }
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  };

  public addProduct = async (product: Product): Promise<void> => {
    try {
      const endpoint = await Environment.getEndPointAddProduct();

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error(`Error al agregar el producto: ${response.statusText}`);
      }
      this.products = await this.getProductsFromFile();
      this.page = this.products.length - 1;
      this.setProductsByPage(this.page);
      this.showModal('Producto guardado', 'Info');
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  public deleteProduct = async (id: number): Promise<void> => {
    try {
      const endpoint = await Environment.getEndPointDeleteProduct(id);
      // console.log('IDD: ' + id);

      const response = await fetch(endpoint, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(
          `Error al eliminar el producto: ${response.statusText}`
        );
      }
      this.products = await this.getProductsFromFile();
      // this.page = id - 2;
      this.setProductsByPage(this.page - 1);
      // console.log(id - 2);
      this.showModal('Producto eliminado', 'Info');
      // console.log(this.products, this.page);
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  public updateProduct = async (product: Product): Promise<void> => {
    try {
      const endpoint = await Environment.getEndPointUpdateProduct();

      const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error(
          `Error al actualizar el producto: ${response.statusText}`
        );
      }
      this.products = await this.getProductsFromFile();
      this.setProductsByPage(this.page);
      this.showModal('Producto actualizado', 'Info');
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  getNextProductId() {
    if (this.products.length === 0) {
      return 1;
    }
    const maxId = Math.max(...this.products.map((product) => product.id));
    return maxId + 1;
  }
}
