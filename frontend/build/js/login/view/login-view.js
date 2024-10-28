import Observer from '../types/observer.js';
export default class LoginView extends Observer {
    // private selector: HTMLDivElement;
    constructor(subject) {
        super(subject);
    }
    init() {
        this.addListeners();
    }
    update() {
        this.render();
    }
    render() {
        // this.fillProducts();
    }
    addListeners() {
        const submitButton = document.getElementById('submit-login');
        const emailInput = document.getElementById('email-user');
        const passwordInput = document.getElementById('password-user');
        if (submitButton) {
            submitButton.addEventListener('click', async () => {
                console.log('Botón de enviar pulsado');
                const user = await this.subject.getUserById(emailInput.value);
                if (user) {
                    console.log('Usuario encontrado');
                    if (user.password === passwordInput.value) {
                        console.log('Contraseña correcta');
                        window.location.href = '/products';
                        // LoginView.showToast('Contraseña correcta');
                    }
                    else {
                        console.log('Contraseña incorrecta');
                        LoginView.showToast('Contraseña incorrecta');
                    }
                }
            });
        }
        else {
            console.log('No se encontró el botón de enviar');
        }
    }
    static renderSuccessful(message) {
        return `
            <div class="toast-container position-fixed bottom-0 end-0 p-3">
            <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                <span class="circle-green me-2"></span>
                <strong class="me-auto">Notificación</strong>
                <small>Now</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                ${message || '¡Proceso exitoso!'} 
                </div>
            </div>
            </div>`;
    }
    static showToast(messageModal) {
        let toastHTML = '';
        toastHTML = LoginView.renderSuccessful(messageModal);
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className =
                'toast-container position-fixed bottom-0 end-0 p-3';
            document.body.appendChild(toastContainer);
        }
        toastContainer.innerHTML = toastHTML;
        const toastElement = document.getElementById('liveToast');
        if (toastElement) {
            const toast = new window.bootstrap.Toast(toastElement);
            toast.show();
        }
        else {
            console.error('Toast element not found');
        }
    }
}
