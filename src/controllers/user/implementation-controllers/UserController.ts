import { Inject, Service } from "typedi";
import IUserController from "../interface-controllers/IUserController";
import IUserService from "../../../services/interface_services/IUserService";
import config from "../../../config";
import { NextFunction, Request, Response } from "express";
import { IUserDTO } from "../../../dto/IUserDTO";
import { Result } from "../../../core/logic/Result";

@Service() 
export default class UserController implements IUserController {
  constructor(
    @Inject(config.services.user.name) private userServiceInstance: IUserService
  ) {}

  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const userOrError = (await this.userServiceInstance.signUp(
        req.body as IUserDTO
      )) as Result<IUserDTO>;

      if (userOrError.isFailure) {
        return res.status(userOrError.getErrorCode()).send(userOrError.getErrorValue());
      }

      const userDTO = userOrError.getValue();
      return res.json(userDTO).status(201);
    } catch (e) {
      console.log(e);
      return next(e);
    }
  }
}
