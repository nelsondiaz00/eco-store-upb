import EndPoint from './end-point.js';

export default class Environment {
  // public static readonly getEndPointContactRegister =
  //   async (): Promise<string> => {
  //     const env = await fetch("./js/env/env.json");
  //     const json = await env.json();
  //     const endpoint = json["contact/register"] as EndPoint;
  //     return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}`;
  //   };

  public static readonly getEndPointProducts = async (): Promise<string> => {
    const env = await fetch('./js/env/env.json');
    const json = await env.json();
    const endpoint = json['products'] as EndPoint;
    return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}`;
  };

  public static readonly getEndPointAddProduct = async (): Promise<string> => {
    const env = await fetch('./js/env/env.json');
    const json = await env.json();
    const endpoint = json['addProduct'] as EndPoint;
    return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}`;
  };

  public static readonly getEndPointDeleteProduct = async (
    id: number
  ): Promise<string> => {
    const env = await fetch('./js/env/env.json');
    const json = await env.json();
    const endpoint = json['deleteProduct'] as EndPoint;
    return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}/${id}`;
  };

  public static readonly getEndPointUpdateProduct =
    async (): Promise<string> => {
      const env = await fetch('./js/env/env.json');
      const json = await env.json();
      const endpoint = json['updateProduct'] as EndPoint;
      return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}`;
    };

  public static readonly getUserById = async (id: string): Promise<string> => {
    const env = await fetch('./js/env/env.json');
    const json = await env.json();
    const endpoint = json['getUserById'] as EndPoint;
    return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}/${id}`;
  };
}
