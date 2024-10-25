export default class IndexView {
  private readonly elements: { [name: string]: HTMLElement };

  constructor() {
    this.elements = {
      searchForm:
        (document.querySelector("#search") as unknown as HTMLInputElement) ??
        document.createElement("form"),
      main: document.querySelector("main") ?? document.createElement("main"),
      path:
        document.querySelector("meta[name=path]") ??
        document.createElement("meta"),
    };
  }

  public getPageFromMeta = (): string => {
    const pathElement = this.elements["path"];
    return pathElement ? pathElement.getAttribute("page") ?? "error" : "error";
  };

  public init = () => {
    console.log("Index view init");
  };

  public renderMain = (componentName: string): void => {
    if (this.elements["main"] !== undefined) {
      this.elements["main"].innerHTML = "";
      this.elements["main"].appendChild(document.createElement(componentName));
    }
  };
}
