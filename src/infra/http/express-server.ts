import express from "express";
import { HttpHandler, HttpMethods, HttpServer } from "./adapters";

export class ExpressServer implements HttpServer {
  application: express.Application;

  constructor() {
    this.application = express();
    this.application.use(express.json());
  }

  register<I = any, O = any>(method: HttpMethods, url: string, httpHandler: HttpHandler<I, O>): void {
    console.log(`Mapped [ ${method} ] - ${url}`);
    const handler = this.extractHttpHandler(httpHandler);
    this.application[method](url, async function (req, res) {
      try {
        const { data, status } = await handler(req);
        res.json(data).status(status);
      } catch (error) {
        return res.status(422).json({
          message: error,
        });
      }
    });
  }

  listen(port: number): void {
    this.application.listen(port).on("listening", () => console.log(`Listening on port ${port}`));
  }

  private extractHttpHandler(handler: HttpHandler) {
    if (typeof handler === "function") return handler;
    return handler.handle;
  }
}
