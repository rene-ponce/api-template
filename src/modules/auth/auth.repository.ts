import { genSalt, hash } from 'bcryptjs';
import { EntityRepository, getConnection, Repository } from 'typeorm';
import { Role } from '../role/role.entity';
import { RoleRepository } from '../role/role.repository';
import { RoleType } from '../role/roletype.enum';
import { UserDetail } from '../user/user.details.entity';
import { User } from '../user/user.entity';
import { SignupDto } from './dto';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async signup(signupDto: SignupDto) {
    const { username, email, password, name, lastName } = signupDto;
    const user = new User();
    user.username = username;
    user.email = email;

    const roleRepository: RoleRepository = getConnection().getRepository(Role);

    const defaultRole: Role = await roleRepository.findOne({
      where: { name: RoleType.STUDENT },
    });

    user.roles = [defaultRole];

    const details = new UserDetail();
    details.name = name;
    details.lastName = lastName;

    user.details = details;

    const salt = await genSalt(10);

    user.password = await hash(password, salt);

    await user.save();
  }
}
