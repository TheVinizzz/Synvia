import { Request, Response } from "express";
import { CreateTaskUseCase } from "./CreateTaskUseCase";
import { ValidUserUseCase } from "../../../users/useCases/validUser/ValidUserUseCase";

export class CreateTaskController {
    async handle(req: Request, res: Response) {
        const data = req.body;

        const validUserUseCase = new ValidUserUseCase()

        await validUserUseCase.execute(data, req, res)

        delete data.userId

        const createTaskUseCase = new CreateTaskUseCase();

        const result = await createTaskUseCase.execute(data);

        return res.status(201).json(result)
    }
}