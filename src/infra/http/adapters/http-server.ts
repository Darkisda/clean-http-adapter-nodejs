export type HttpMethods = "get" | "post" | "put" | "delete" | "patch";
export type HttpResponse<O = any> = Promise<{
  data: O;
  status: number;
}>;
export interface HttpRequest<T> {
  headers: any;
  params: any;
  query: any;
  body: T;
}

export interface IHttpHandler<I = any, O = any> {
  handle(input: HttpRequest<I>): HttpResponse<O>;
}
export type HttpHandlerCallback<I, O = any> = (input: HttpRequest<I>) => HttpResponse<O>;
export type HttpHandler<I = any, O = any> = IHttpHandler<I, O> | HttpHandlerCallback<I, O>;

export interface HttpServer {
  register<I = any, O = any>(method: HttpMethods, url: string, httpHandler: HttpHandler<I, O>): void;
  listen(port: number): void;
}
