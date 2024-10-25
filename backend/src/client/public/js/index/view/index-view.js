export default class IndexView {
    elements;
    constructor() {
        this.elements = {
            searchForm: document.querySelector("#search") ??
                document.createElement("form"),
            main: document.querySelector("main") ?? document.createElement("main"),
            path: document.querySelector("meta[name=path]") ??
                document.createElement("meta"),
        };
    }
    getPageFromMeta = () => {
        const pathElement = this.elements["path"];
        return pathElement ? pathElement.getAttribute("page") ?? "error" : "error";
    };
    init = () => {
        console.log("Index view init");
    };
    renderMain = (componentName) => {
        if (this.elements["main"] !== undefined) {
            this.elements["main"].innerHTML = "";
            this.elements["main"].appendChild(document.createElement(componentName));
        }
    };
}
