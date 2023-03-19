import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findByEmail(
    email: string,
    select?: (keyof User)[],
  ): Promise<Partial<User>> {
    return this.findOne({
      where: {
        email,
      },
      ...(select && { select }),
    });
  }
}
