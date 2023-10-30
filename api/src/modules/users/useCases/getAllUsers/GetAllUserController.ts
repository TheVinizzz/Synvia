import { Request, Response } from "express";
import { GetAllUserUseCase } from "./GetAllUserUseCase";

export class GetAllUserController {
  async handle(req: Request, res: Response) {
    const getAllUserUseCase = new GetAllUserUseCase();

    const result = await getAllUserUseCase.execute();

    return res.status(200).json(result);
  }
}