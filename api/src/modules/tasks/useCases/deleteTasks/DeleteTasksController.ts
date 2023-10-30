import { Request, Response } from "express";
import { DeleteTasksUseCase } from "./DeleteTasksUseCase";
import { ValidUserUseCase } from "../../../users/useCases/validUser/ValidUserUseCase";

export class DeleteTasksController {
  async handle(req: Request, res: Response) {

    const data = req.body;
    
    const id = req.params.id;
    
    const validUserUseCase = new ValidUserUseCase()

    await validUserUseCase.execute(data, req, res)

    delete data.userId

    const deleteTasksUseCase = new DeleteTasksUseCase();

    const result = await deleteTasksUseCase.execute(id);

    return res.status(200).json(result);
  }
}