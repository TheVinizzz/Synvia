import { Request, Response } from "express";
import { GetAllTasksUseCase } from "./GetAllTasksUseCase";
import { ValidUserUseCase } from "../../../users/useCases/validUser/ValidUserUseCase";

export class GetAllTasksController {
  async handle(req: Request, res: Response) {

    const data = req.body;

    const validUserUseCase = new ValidUserUseCase()

    await validUserUseCase.execute(data, req, res)

    delete data.userId
    
    const getAllTasksUseCase = new GetAllTasksUseCase();

    const result = await getAllTasksUseCase.execute();

    return res.status(200).json(result);
  }
}