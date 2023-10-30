import { prisma } from "../../../../prisma/client";

export class GetAllTasksUseCase {
  async execute(): Promise<any[]> {
    const tasks = await prisma.tasks.findMany({});

    return tasks;
  }
}