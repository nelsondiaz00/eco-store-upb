import Observer from '../types/observer.js';
export default class LoginView extends Observer {
    // private selector: HTMLDivElement;
    constructor(subject) {
        super(subject);
    }
    init() {
        // this.addListeners();
    }
    update() {
        this.render();
    }
    render() {
        // this.fillProducts();
    }
}
