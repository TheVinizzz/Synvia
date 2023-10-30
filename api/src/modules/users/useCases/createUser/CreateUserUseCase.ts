//import { AppError } from "../../../../errors/AppError";
import { Request, Response } from "express";
import { prisma } from "../../../../prisma/client";
import { CreateUserDto } from "../../dtos/CreateUserDTO";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class CreateUserUseCase {
    async execute(data: CreateUserDto): Promise<any> {

        const UserAlreadyExist = await prisma.user.findUnique({
            where: {
                email: data.email,
            }
        });

        if (UserAlreadyExist) {
            throw new Error("Email ja existe no sistema")
        }

        const createDate = await prisma.user.create({
            data: data
        })

        return createDate
    }

    async signIn(data: {email: string, password: string}, req: Request, res: Response): Promise<any> {

        const user = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });

        const secretKey = process.env.SECRET_KEY_JWT || ""

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(data.password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, secretKey, {
            expiresIn: 86400, // 24 hours
        });

        const result = { auth: true, token }

        return result
    }
}