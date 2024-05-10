import { HttpResponse, HttpServer } from "@http/adapters";

type BodyInputExample = {
  name: string;
  age: number;
};

type OutputExample = {
  response: string;
};

export class MainController {
  constructor(private readonly httpServer: HttpServer) {
    this.httpServer.register("get", "/", async (req) => ({ data: "Hello world", status: 200 }));
    this.httpServer.register<BodyInputExample, string>("post", "/", (req) => this.create(req.body));
    this.httpServer.register<BodyInputExample, OutputExample>("put", "/:id", ({ params, body }) =>
      this.update(params, body),
    );
  }

  async create(body: BodyInputExample): HttpResponse<string> {
    // You business logic comes here
    return {
      data: "post action",
      status: 200,
    };
  }

  async update(id: string, body: BodyInputExample): HttpResponse<OutputExample> {
    // You business logic comes here
    return {
      data: {
        response: "put action",
      },
      status: 200,
    };
  }
}
