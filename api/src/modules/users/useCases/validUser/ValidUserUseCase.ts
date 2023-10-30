//import { AppError } from "../../../../errors/AppError";
import { Request, Response } from "express";
import { prisma } from "../../../../prisma/client";
import { CreateUserDto } from "../../dtos/CreateUserDTO";

export class ValidUserUseCase {
    async execute(data: CreateUserDto, req: Request, res: Response): Promise<any> {

        const user = await prisma.user.findUnique({
            where: {
              id: data.userId,
            },
          });
        
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }

        return user
    }
}