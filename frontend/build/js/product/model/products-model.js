import Environment from '../../shared/enviroments.js';
import Subject from '../types/subject.js';
export default class ProductsModel extends Subject {
    products;
    actualProduct;
    page;
    constructor() {
        super();
        this.products = [];
        this.actualProduct = undefined;
        this.page = 0;
    }
    init = async () => {
        this.products = await this.getProductsFromFile();
        this.setProductsByPage(this.page);
    };
    getProducts = () => {
        return this.products;
    };
    getProduct = () => {
        if (this.actualProduct) {
            return this.actualProduct;
        }
        return;
    };
    getProductsFromFile = async () => {
        const response = await fetch(await Environment.getEndPointProducts());
        if (response.status !== 200) {
            return [];
        }
        return await response.json();
    };
    setProductsByPage = (page) => {
        if (this.products.length === 0) {
            this.page = 0;
            const form = document.querySelector('form');
            form.reset();
        }
        else if (page < 0) {
            this.page = this.products.length - 1;
            page = this.page;
        }
        this.actualProduct = this.products[page];
        this.page = page;
        // console.log('Page: ' + this.page, ' pageee: ' + page);
        this.notifyAllObservers();
    };
    nextPage = () => {
        if (this.page < this.products.length - 1) {
            this.page++;
            this.setProductsByPage(this.page);
        }
        else {
            this.showModal('No hay más registros', 'Error');
            this.page = 0;
            this.setProductsByPage(this.page);
        }
    };
    previousPage = () => {
        console.log(this.actualProduct);
        if (this.page > 0) {
            this.page--;
            this.setProductsByPage(this.page);
        }
        else {
            this.showModal('No hay más registros', 'Error');
            this.page = this.products.length - 1;
            this.setProductsByPage(this.page);
        }
    };
    showModal = (message, title) => {
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
            const modal = new window.bootstrap.Modal(modalElement);
            modal.show();
        }
    };
    addProduct = async (product) => {
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
        }
        catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };
    deleteProduct = async (id) => {
        try {
            const endpoint = await Environment.getEndPointDeleteProduct(id);
            // console.log('IDD: ' + id);
            const response = await fetch(endpoint, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`Error al eliminar el producto: ${response.statusText}`);
            }
            this.products = await this.getProductsFromFile();
            // this.page = id - 2;
            this.setProductsByPage(this.page - 1);
            // console.log(id - 2);
            this.showModal('Producto eliminado', 'Info');
            // console.log(this.products, this.page);
        }
        catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };
    updateProduct = async (product) => {
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
                throw new Error(`Error al actualizar el producto: ${response.statusText}`);
            }
            this.products = await this.getProductsFromFile();
            this.setProductsByPage(this.page);
            this.showModal('Producto actualizado', 'Info');
        }
        catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };
    favoriteProduct = async () => {
        try {
            const endpoint = await Environment.getEndPointFavoriteProduct();
            // console.log('IDD: ' + id);
            const user = JSON.parse(localStorage.getItem('user'));
            console.log(user);
            console.log(this.actualProduct);
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Establece el tipo de contenido
                },
                body: JSON.stringify({
                    idUser: user.id, // Asegúrate de que idUser sea el correcto
                    idProduct: this.actualProduct?.id,
                }),
            });
            if (!response.ok) {
                throw new Error(`Error al marcar como favorito el producto: ${response.statusText}`);
            }
            this.products = await this.getProductsFromFile();
            this.setProductsByPage(this.page);
            this.showModal('Producto marcado como favorito', 'Info');
        }
        catch (error) {
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
