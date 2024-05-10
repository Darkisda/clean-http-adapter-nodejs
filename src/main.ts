import { MainController } from "@http/controllers";
import { FastifyServer } from "@http/fastify-server";

async function main() {
  const server = new FastifyServer();
  // const server = new ExpressServer();
  new MainController(server);
  server.listen(3000);
}

main();
