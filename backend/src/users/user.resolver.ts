import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Root,
  FieldResolver,
  ResolverInterface,
  Authorized,
} from "type-graphql";
import { User } from "./user.model"
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import { CreateUserInput, LoginInput } from "./user.input";
import bcrypt from "bcrypt";
import { UserSession } from "../sessions/session.model";

@Resolver((of) => User)
export class UserResolver {
  constructor(
    @InjectRepository(UserSession)
    private userSessionRepository: Repository<UserSession>
  ) {}

  @Authorized("admin")
  @Query((returns) => [User])
  users(): Promise<User[]> {
    return User.find();
  }

  @Authorized("admin")
  @Query((returns) => User)
  user(@Arg("id") id: string): Promise<User | undefined> {
    return User.findOne({ where: { id } });
  }

  @Mutation((returns) => User)
  async createUser(@Arg("data") data: CreateUserInput): Promise<User> {
    const user = User.create(data);
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();
    return user;
  }

  @Mutation((returns) => String)
  async login(@Arg("data") data: LoginInput): Promise<string> {
    const user = await User.findOneOrFail({ email: data.email });
    const isVerified = await bcrypt.compare(data.password, user.password);
    if (!isVerified) {
      throw Error("invalid password");
    }
    const userSession = this.userSessionRepository.create();
    userSession.userId = user.id;
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 2);
    userSession.expiresAt = expiresAt;
    await userSession.save();
    return userSession.id;
  }
}
