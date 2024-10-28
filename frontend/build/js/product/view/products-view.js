import Observer from '../types/observer.js';
import ProductsTemplate from '../template/ProductTemplate.js';
export default class ProductsView extends Observer {
    // private selector: HTMLDivElement;
    constructor(subject) {
        super(subject);
    }
    async init() {
        const main_container = document.querySelector('#container-fluid');
        if (main_container) {
            main_container.innerHTML = await ProductsTemplate.render();
        }
        this.addListeners();
    }
    update() {
        this.render();
    }
    async render() {
        this.fillProduct();
    }
    fillProduct() {
        const product = this.subject.getProduct();
        if (product) {
            const id = document.getElementById('id');
            id.value = product.id.toString();
            const title = document.getElementById('title');
            title.value = product.title.toString();
            const description = document.getElementById('description');
            description.value = product.description.toString();
            const price = document.getElementById('price');
            price.value = product.price.toString();
            const amount = document.getElementById('amount');
            amount.value = product.amount.toString();
            const discount = document.getElementById('discount');
            discount.value = product.discount.toString();
            const discountper = document.getElementById('discountper');
            const discountuni = document.getElementById('discountuni');
            if (discount) {
                discountper.value = product.discountPer.toString();
                discountuni.value = product.discountUni.toString();
            }
            if (product.favorite) {
                const dValue = 'M11.5 4v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m0 6.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132';
                this.changeHeartIcon(dValue);
            }
            else {
                const dValue = 'M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M14 14V5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1M8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132';
                this.changeHeartIcon(dValue);
            }
            const img = document.getElementById('proImg');
            img.src = product.image;
        }
    }
    changeHeartIcon(newPathData) {
        const heartPath = document.getElementById('heart-path');
        if (heartPath) {
            heartPath.setAttribute('d', newPathData);
        }
        else {
            console.error('El elemento SVG no se encontró');
        }
    }
    recolectProduct() {
        const id = document.getElementById('id').value;
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const price = document.getElementById('price').value;
        const amount = document.getElementById('amount')
            .value;
        const discount = document.getElementById('discount')
            .value;
        let discountper = document.getElementById('discountper').value;
        let discountuni = document.getElementById('discountuni').value;
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
    addListeners() {
        window.addEventListener('DOMContentLoaded', () => {
            this.addSubmitListeners();
            // const submitIdentification = document.querySelector(
            //   '#submit-identification-user'
            // ) as HTMLButtonElement;
            // console.log(submitIdentification);
        });
    }
    addSubmitListeners() {
        const buttonPrev = document.getElementById('prev');
        buttonPrev.addEventListener('click', () => {
            this.subject.previousPage();
        });
        const buttonNext = document.getElementById('next');
        buttonNext.addEventListener('click', () => {
            this.subject.nextPage();
        });
        const discountElement = document.getElementById('discount');
        const discountperElement = document.getElementById('discountper');
        const discountuniElement = document.getElementById('discountuni');
        discountElement.addEventListener('change', () => {
            if (discountElement.value === 'true') {
                discountperElement.removeAttribute('readonly');
                discountuniElement.removeAttribute('readonly');
            }
            else {
                discountperElement.value = '0';
                discountuniElement.value = '';
                discountperElement.setAttribute('readonly', 'true');
                discountuniElement.setAttribute('readonly', 'true');
            }
        });
        const createButton = document.getElementById('create');
        const saveButton = document.getElementById('save');
        createButton.addEventListener('click', (event) => {
            const img = document.getElementById('proImg');
            img.src = '';
            const idInput = document.getElementById('id');
            const form = document.getElementById('prods');
            discountperElement.setAttribute('readonly', 'true');
            discountuniElement.setAttribute('readonly', 'true');
            event.preventDefault();
            form.reset();
            idInput.value = this.subject
                .getNextProductId()
                .toString();
            saveButton.classList.remove('visually-hidden');
        });
        saveButton.addEventListener('click', () => {
            this.subject.addProduct(this.recolectProduct());
            saveButton.classList.add('visually-hidden');
            // console.log('saving!!');
        });
        const deleteButton = document.getElementById('del');
        deleteButton.addEventListener('click', () => {
            const id = document.getElementById('id').value;
            this.subject.deleteProduct(parseInt(id));
        });
        const updateButton = document.getElementById('update');
        updateButton.addEventListener('click', () => {
            this.subject.updateProduct(this.recolectProduct());
        });
        const favoriteButton = document.getElementById('favorite');
        favoriteButton.addEventListener('click', () => {
            this.subject.favoriteProduct();
        });
    }
}
