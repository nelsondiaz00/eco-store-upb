export default class Environment {
    // public static readonly getEndPointContactRegister =
    //   async (): Promise<string> => {
    //     const env = await fetch("./js/env/env.json");
    //     const json = await env.json();
    //     const endpoint = json["contact/register"] as EndPoint;
    //     return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}`;
    //   };
    static getEndPointProducts = async () => {
        const env = await fetch('./js/env/env.json');
        const json = await env.json();
        const endpoint = json['products'];
        return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}`;
    };
    static getEndPointAddProduct = async () => {
        const env = await fetch('./js/env/env.json');
        const json = await env.json();
        const endpoint = json['addProduct'];
        return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}`;
    };
    static getEndPointDeleteProduct = async (id) => {
        const env = await fetch('./js/env/env.json');
        const json = await env.json();
        const endpoint = json['deleteProduct'];
        return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}/${id}`;
    };
    static getEndPointUpdateProduct = async () => {
        const env = await fetch('./js/env/env.json');
        const json = await env.json();
        const endpoint = json['updateProduct'];
        return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}`;
    };
    static getUserById = async (id) => {
        const env = await fetch('./js/env/env.json');
        const json = await env.json();
        const endpoint = json['getUserById'];
        return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}/${id}`;
    };
}
