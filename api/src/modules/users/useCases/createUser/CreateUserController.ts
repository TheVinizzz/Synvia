import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";
import bcrypt from 'bcrypt';

export class CreateUserController {
    async handle(req: Request, res: Response) {
        const {name, email, password} = req.body;
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const createUserUseCase = new CreateUserUseCase();

        const result = await createUserUseCase.execute({
            name, 
            email, 
            password: hashedPassword
        });

        delete result.password

        return res.status(201).json(result)
    }

    async signIn(req: Request, res: Response) {
        const {email, password} = req.body;

        const createUserUseCase = new CreateUserUseCase();

        const result = await createUserUseCase.signIn({email, password}, req, res);

        return res.json(result);
    }
}