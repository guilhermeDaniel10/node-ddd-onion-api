import { Result } from "../../core/logic/Result";
import { IUserDTO } from "../../dto/IUserDTO";

export default interface IUserService {
  signUp(userDTO: IUserDTO): Promise<Result<IUserDTO>>;
}
