import Observer from '../types/observer.js';
import ProductsModel from '../model/products-model.js';
import Product from '../types/product.js';
export default class ProductsView extends Observer<ProductsModel> {
  // private selector: HTMLDivElement;

  constructor(subject: ProductsModel) {
    super(subject);
  }

  public init() {
    this.addListeners();
  }

  public override update(): void {
    this.render();
  }

  public render(): void {
    this.fillProducts();
  }

  private fillProducts(): void {
    const product = (this.subject as ProductsModel).getProduct();
    if (product) {
      const id = document.getElementById('id') as HTMLInputElement;
      id.value = product.id.toString();
      const title = document.getElementById('title') as HTMLInputElement;
      title.value = product.title.toString();
      const description = document.getElementById(
        'description'
      ) as HTMLInputElement;
      description.value = product.description.toString();
      const price = document.getElementById('price') as HTMLInputElement;
      price.value = product.price.toString();
      const amount = document.getElementById('amount') as HTMLInputElement;
      amount.value = product.amount.toString();
      const discount = document.getElementById('discount') as HTMLSelectElement;
      discount.value = product.discount.toString();
      const discountper = document.getElementById(
        'discountper'
      ) as HTMLInputElement;
      const discountuni = document.getElementById(
        'discountuni'
      ) as HTMLInputElement;
      if (discount) {
        discountper.value = product.discountPer.toString();

        discountuni.value = product.discountUni.toString();
      }

      const img = document.getElementById('proImg') as HTMLImageElement;
      img.src = product.image;
    }
  }

  private recolectProduct(): Product {
    const id = (document.getElementById('id') as HTMLInputElement).value;
    const title = (document.getElementById('title') as HTMLInputElement).value;
    const description = (
      document.getElementById('description') as HTMLInputElement
    ).value;
    const price = (document.getElementById('price') as HTMLInputElement).value;
    const amount = (document.getElementById('amount') as HTMLInputElement)
      .value;
    const discount = (document.getElementById('discount') as HTMLSelectElement)
      .value;
    let discountper = (
      document.getElementById('discountper') as HTMLInputElement
    ).value;
    let discountuni = (
      document.getElementById('discountuni') as HTMLInputElement
    ).value;
    if (discountper === '' || discountuni === '') {
      discountper = '0';
      discountuni = '';
    }
    return {
      id: parseInt(id),
      title: title,
      description: description,
      price: parseInt(price),
      amount: amount,
      favorite: false,
      discount: discount === 'true',
      discountPer: parseInt(discountper),
      discountUni: discountuni,
      image: '',
    };
  }

  public addListeners(): void {
    const buttonPrev = document.getElementById('prev') as HTMLButtonElement;

    buttonPrev.addEventListener('click', () => {
      (this.subject as ProductsModel).previousPage();
    });

    const buttonNext = document.getElementById('next') as HTMLButtonElement;
    buttonNext.addEventListener('click', () => {
      (this.subject as ProductsModel).nextPage();
    });

    const discountElement = document.getElementById(
      'discount'
    ) as HTMLSelectElement;
    const discountperElement = document.getElementById(
      'discountper'
    ) as HTMLInputElement;
    const discountuniElement = document.getElementById(
      'discountuni'
    ) as HTMLInputElement;
    discountElement.addEventListener('change', () => {
      if (discountElement.value === 'true') {
        discountperElement.removeAttribute('readonly');
        discountuniElement.removeAttribute('readonly');
      } else {
        discountperElement.value = '0';
        discountuniElement.value = '';
        discountperElement.setAttribute('readonly', 'true');
        discountuniElement.setAttribute('readonly', 'true');
      }
    });

    const createButton = document.getElementById('create') as HTMLButtonElement;
    const saveButton = document.getElementById('save') as HTMLButtonElement;

    createButton.addEventListener('click', (event: MouseEvent) => {
      const img = document.getElementById('proImg') as HTMLImageElement;
      img.src = '';
      const idInput = document.getElementById('id') as HTMLInputElement;
      const form = document.getElementById('prods') as HTMLFormElement;
      discountperElement.setAttribute('readonly', 'true');
      discountuniElement.setAttribute('readonly', 'true');
      event.preventDefault();
      form.reset();
      idInput.value = (this.subject as ProductsModel)
        .getNextProductId()
        .toString();
      saveButton.classList.remove('visually-hidden');
    });

    saveButton.addEventListener('click', () => {
      (this.subject as ProductsModel).addProduct(this.recolectProduct());
      saveButton.classList.add('visually-hidden');
      // console.log('saving!!');
    });

    const deleteButton = document.getElementById('del') as HTMLButtonElement;
    deleteButton.addEventListener('click', () => {
      const id = (document.getElementById('id') as HTMLInputElement).value;
      (this.subject as ProductsModel).deleteProduct(parseInt(id));
    });

    const updateButton = document.getElementById('update') as HTMLButtonElement;
    updateButton.addEventListener('click', () => {
      (this.subject as ProductsModel).updateProduct(this.recolectProduct());
    });
  }
}
