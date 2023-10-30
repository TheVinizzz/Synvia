import { prisma } from "../../../../prisma/client";

export class DeleteTasksUseCase {
  async execute(id: string): Promise<any> {
    const tasks = await prisma.tasks.delete({
      where: {
        id,
      }
    })

    return tasks;
  }
}