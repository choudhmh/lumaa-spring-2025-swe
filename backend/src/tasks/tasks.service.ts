import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  getTasks(userId: string) {
    return this.prisma.task.findMany({ where: { userId } });
  }

  createTask(userId: string, title: string, description: string) {
    return this.prisma.task.create({ data: { title, description, userId } });
  }

  updateTask(id: string, completed: boolean) {
    return this.prisma.task.update({ where: { id }, data: { completed } });
  }

  deleteTask(id: string) {
    return this.prisma.task.delete({ where: { id } });
  }
}
