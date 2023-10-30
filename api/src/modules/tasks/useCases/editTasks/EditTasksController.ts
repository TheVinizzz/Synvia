import { Request, Response } from "express";
import { EditTasksUseCase } from "./EditTasksUseCase";
import { ValidUserUseCase } from "../../../users/useCases/validUser/ValidUserUseCase";

export class EditTasksController {
  async handle(req: Request, res: Response) {

    const data = req.body;

    const validUserUseCase = new ValidUserUseCase()

    await validUserUseCase.execute(data, req, res)

    delete data.userId
    
    const editTasksUseCase = new EditTasksUseCase();

    const result = await editTasksUseCase.execute(data);

    return res.status(200).json(result);
  }
}