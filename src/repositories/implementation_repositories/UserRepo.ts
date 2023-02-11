import { Service } from "typedi";
import IUserRepo from "../interface_repositories/IUserRepo";
import { UserEmail } from "../../domain/user/userEmail";
import { User } from "../../domain/user/user";
import { UserSchema } from "../../sequelize_schemas/UserSchema";
import { UserMapper } from "../../mappers/UserMapper";

@Service()
export default class UserRepo implements IUserRepo {
  async exists(userEmail: string | UserEmail): Promise<boolean> {
    const wantedUserEmail =
      userEmail instanceof UserEmail ? (<UserEmail>userEmail).value : userEmail;
    const wantedUser = await UserSchema.findOne({
      where: { email: wantedUserEmail },
    });

    return !!wantedUser === true;
  }
  async save(user: User): Promise<User> {
    console.log("HEREEEEEE");
    const foundUser = await UserSchema.findOne({
      where: { email: user.emailValue },
    });
    try {
      if (!foundUser) {
        const rawUser: any = UserMapper.toPersistence(user);
        console.log("HERE 1");
        console.log(rawUser);

        const userCreated = await UserSchema.create(rawUser);
        
        console.log("HERE 2");
        console.log(userCreated);
        await userCreated.save();

        return UserMapper.toDomain(userCreated);
      } else {
        foundUser.firstName = user.firstName;
        foundUser.lastName = user.lastName;
        foundUser.email = user.email.value;
        foundUser.address = user.address.value;

        await foundUser.save();
        return user;
      }
    } catch (err) {
      throw err;
    }
  }
  async findByEmail(userEmail: string | UserEmail): Promise<User | null> {
    const wantedUserEmail =
      userEmail instanceof UserEmail ? (<UserEmail>userEmail).value : userEmail;
    const wantedUser = await UserSchema.findOne({
      where: { email: wantedUserEmail },
    });

    if (wantedUser != null) {
      return UserMapper.toDomain(wantedUser);
    }
    return null;
  }
  findById(id: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
}
