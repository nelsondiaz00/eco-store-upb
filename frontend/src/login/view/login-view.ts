import LoginModel from '../model/login-model.js';
import Observer from '../types/observer.js';
export default class LoginView extends Observer<LoginModel> {
  // private selector: HTMLDivElement;

  constructor(subject: LoginModel) {
    super(subject);
  }

  public init() {
    this.addListeners();
  }

  public override update(): void {
    this.render();
  }

  public render(): void {
    // this.fillProducts();
  }

  public addListeners(): void {
    const submitButton = document.getElementById('submit-login');
    const emailInput = document.getElementById(
      'email-user'
    ) as HTMLInputElement;
    const passwordInput = document.getElementById(
      'password-user'
    ) as HTMLInputElement;
    if (submitButton) {
      submitButton.addEventListener('click', async () => {
        console.log('Botón de enviar pulsado');
        const user = await (this.subject as LoginModel).getUserById(
          emailInput.value
        );
        if (user) {
          console.log('Usuario encontrado');
          if (user.password === passwordInput.value) {
            console.log('Contraseña correcta');
            window.location.href = '/products';
            // LoginView.showToast('Contraseña correcta');
          } else {
            console.log('Contraseña incorrecta');
            LoginView.showToast('Contraseña incorrecta');
          }
        }
      });
    } else {
      console.log('No se encontró el botón de enviar');
    }
  }
  public static renderSuccessful(message: string): string {
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

  public static showToast(messageModal: string): void {
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
      const toast = new (window as any).bootstrap.Toast(toastElement);
      toast.show();
    } else {
      console.error('Toast element not found');
    }
  }
}
