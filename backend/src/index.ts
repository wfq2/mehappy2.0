import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { RestaurantResolver } from "./restaurants/restaurant.resolver";
import { buildSchema, AuthChecker } from "type-graphql";
import { createConnection, useContainer } from "typeorm";
import { MenuResolver } from "./menus/menu.resolver";
import { Container } from "typedi";
import { MenuItemResolver } from "./menuitems/menu-item.resolver";
import { UserResolver } from "./users/user.resolver";
import { SessionService } from "./sessions/session.service";

async function main() {
  const _ = await useContainer(Container);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const connection = await createConnection();

  const sessionService = Container.get(SessionService);

  const schema = await buildSchema({
    resolvers: [
      RestaurantResolver,
      MenuResolver,
      MenuItemResolver,
      UserResolver,
    ],
    container: Container,
    authChecker: customAuthChecker,
  });

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      // get the user token from the headers
      const token = req.headers.authorization || "";

      // try to retrieve a user with the token
      try {
        const user = await sessionService.getUser(token);
        return { user };
      } catch (e) {
        return null;
      }
    },
  });

  await server.listen(4000);

  console.log("Server has started!");
}

export const customAuthChecker: AuthChecker<any> = ({ context }, roles) => {
  if (roles?.length > 0) {
    return (
      roles.filter((value) => context?.user?.roles?.includes(value)).length > 0
    );
  } else if (context.user) {
    return false;
  }

  return true; // or false if access is denied
};

main();
