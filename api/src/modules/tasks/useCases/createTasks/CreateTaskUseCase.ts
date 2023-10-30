//import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { CreateTasksDto } from "../../dtos/CreateTasksDTO";

export class CreateTaskUseCase {
    async execute(date: CreateTasksDto): Promise<any> {

        const tasks = await prisma.user.findMany({
            where: {
                id: date.responsible
            }
        });
        console.log("🚀 ~ file: CreateTaskUseCase.ts:13 ~ CreateTaskUseCase ~ execute ~ tasks:", tasks)
        
        const createTask = await prisma.tasks.create({
            data: {...date, responsible: tasks[0]?.name}
        })

        return createTask
    }
}