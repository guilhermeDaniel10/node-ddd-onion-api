import { Inject, Service } from "typedi";
import IUserService from "../interface_services/IUserService";
import { Result } from "../../core/logic/Result";
import { IUserDTO } from "../../dto/IUserDTO";
import config from "../../config";
import IUserRepo from "../../repositories/interface_repositories/IUserRepo";
import { UserFirstName } from "../../domain/user/userFirstName";
import { UserLastName } from "../../domain/user/userLastName";
import { UserEmail } from "../../domain/user/userEmail";
import { UserPassword } from "../../domain/user/userPassword";
import { randomBytes } from "crypto";
import { UserAddress } from "../../domain/user/userAddress";
import { User } from "../../domain/user/user";
import { UserMapper } from "../../mappers/UserMapper";
import { StatusCodes } from "http-status-codes";
const argon2 = require("argon2");

@Service()
export default class UserService implements IUserService {
  constructor(@Inject(config.repos.user.name) private userRepo: IUserRepo) {}

  async signUp(userDTO: IUserDTO): Promise<Result<IUserDTO>> {
    try {
      const foundUser = await this.userRepo.findByEmail(userDTO.email);

      const found = !!foundUser;
      if (found) {
        return Result.fail<IUserDTO>(
          "User already exists with email=" + userDTO.email,
          StatusCodes.CONFLICT
        );
      }
      const salt = randomBytes(32);
      const hashedPassword = await argon2.hash(userDTO.password, { salt });

      const firstName = await UserFirstName.create(userDTO.firstName);
      console.log(firstName.getValue());
      const lastName = await UserLastName.create(userDTO.lastName);
      console.log(lastName.getValue());
      const email = await UserEmail.create(userDTO.email);
      console.log(email.getValue());
      const password = await UserPassword.create({
        value: hashedPassword,
        hashed: true,
      });
      console.log(password.getValue());
      const address = await UserAddress.create(userDTO.address);
      console.log(address.getValue());

      const userOrError = await User.create({
        firstName: firstName.getValue(),
        lastName: lastName.getValue(),
        email: email.getValue(),
        address: address.getValue(),
        password: password.getValue(),
      });

      if (userOrError.isFailure) {
        throw Result.fail<User>(userOrError.getErrorValue(), StatusCodes.FORBIDDEN);
      }

      const userResult = userOrError.getValue();
      await this.userRepo.save(userResult);
      const userDTOResult = UserMapper.toDTO(userResult) as IUserDTO;
      console.log(userDTOResult);
      return Result.ok<IUserDTO>(userDTOResult);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
