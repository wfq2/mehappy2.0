import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { RestaurantResolver } from "./restaurants/restaurant.resolver";
import { buildSchema } from "type-graphql";
import { createConnection, useContainer } from "typeorm";
import { MenuResolver } from "./menus/menu.resolver";
import { Container } from "typedi";

async function getUser(token: string): Promise<boolean> {
  if (token) {
    return true;
  }
  return false;
}

async function main() {
  const _ = await useContainer(Container);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const connection = await createConnection();

  const schema = await buildSchema({
    resolvers: [RestaurantResolver, MenuResolver],
    container: Container,
  });

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      // get the user token from the headers
      const token = req.headers.authorization || "";

      // try to retrieve a user with the token
      const user = getUser(token);

      // optionally block the user
      // we could also check user roles/permissions here
      if (!user) throw new Error("you must be logged in");

      // add the user to the context
      return { user };
    },
  });

  await server.listen(4000);

  console.log("Server has started!");
}

main();
