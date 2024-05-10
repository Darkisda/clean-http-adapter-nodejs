import Fastify, { FastifyInstance } from "fastify";
import { HttpHandler, HttpMethods, HttpServer } from "./adapters";

export class FastifyServer implements HttpServer {
  application: FastifyInstance;

  constructor() {
    this.application = Fastify({
      logger: true,
    });
  }

  register<I = any, O = any>(method: HttpMethods, url: string, httpHandler: HttpHandler<I, O>): void {
    const handler = this.extractHttpHandler(httpHandler);
    this.application[method](url, async function (req, res) {
      try {
        const { data, status } = await handler(req);
        res.send(data).status(status);
      } catch (error) {
        return res.status(422).send({
          message: error,
        });
      }
    });
  }

  listen(port: number): void {
    this.application.listen({
      port,
    });
  }

  private extractHttpHandler(handler: HttpHandler) {
    if (typeof handler === "function") return handler;
    return handler.handle;
  }
}
