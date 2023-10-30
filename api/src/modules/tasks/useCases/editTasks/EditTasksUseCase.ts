import { prisma } from "../../../../prisma/client";
import { CreateTasksDto } from "../../dtos/CreateTasksDTO";

export class EditTasksUseCase {
  async execute(data: CreateTasksDto): Promise<any> {
    const tasks = await prisma.tasks.update({
      where: {
        id: data.id,
      },
      data: data
    })

    return tasks;
  }
}