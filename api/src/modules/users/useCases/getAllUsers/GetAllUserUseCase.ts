import { prisma } from "../../../../prisma/client";

export class GetAllUserUseCase {
  async execute(): Promise<any[]> {
    const user = await prisma.user.findMany({
      select: {
        id: true,
        name: true
     }
    });

    return user;
  }
}