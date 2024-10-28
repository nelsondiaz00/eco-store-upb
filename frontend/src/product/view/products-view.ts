import Observer from '../types/observer.js';
import ProductsModel from '../model/products-model.js';
import Product from '../types/product.js';
import ProductsTemplate from '../template/ProductTemplate.js';
export default class ProductsView extends Observer<ProductsModel> {
  // private selector: HTMLDivElement;

  constructor(subject: ProductsModel) {
    super(subject);
  }

  public async init() {
    const main_container = document.querySelector(
      '#container-fluid'
    ) as HTMLFormElement;
    if (main_container) {
      main_container.innerHTML = await ProductsTemplate.render();
    }
    this.addListeners();
  }

  public override update(): void {
    this.render();
  }

  public async render(): Promise<void> {
    this.fillProduct();
  }

  private fillProduct(): void {
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
      if (product.favorite) {
        const dValue =
          'M11.5 4v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m0 6.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132';
        this.changeHeartIcon(dValue);
      } else {
        const dValue =
          'M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M14 14V5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1M8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132';
        this.changeHeartIcon(dValue);
      }
      const img = document.getElementById('proImg') as HTMLImageElement;
      img.src = product.image;
    }
  }

  public changeHeartIcon(newPathData: string): void {
    const heartPath = document.getElementById(
      'heart-path'
    ) as unknown as SVGPathElement;

    if (heartPath) {
      heartPath.setAttribute('d', newPathData);
    } else {
      console.error('El elemento SVG no se encontró');
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
    window.addEventListener('DOMContentLoaded', () => {
      this.addSubmitListeners();
      // const submitIdentification = document.querySelector(
      //   '#submit-identification-user'
      // ) as HTMLButtonElement;

      // console.log(submitIdentification);
    });
  }

  public addSubmitListeners(): void {
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

    const favoriteButton = document.getElementById(
      'favorite'
    ) as HTMLButtonElement;
    favoriteButton.addEventListener('click', () => {
      (this.subject as ProductsModel).favoriteProduct();
    });
  }
}
