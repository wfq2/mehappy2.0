import { UserSession } from "./session.model";
import { User } from "../users/user.model";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Service } from "typedi";

@Service()
export class SessionService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async getUser(sessionId: string): Promise<User> {
    const session = await UserSession.findOneOrFail(sessionId);
    return this.userRepository.findOneOrFail(session.userId);
  }
}
