import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  // ✅ Get all tasks for a user
  getTasks(userId: string) {
    return this.prisma.task.findMany({ where: { userId } });
  }

  // ✅ Get a single task by its ID
  getTask(id: string) {
    return this.prisma.task.findUnique({ where: { id } });
  }

  // ✅ Create a new task
  createTask(userId: string, title: string, description: string) {
    return this.prisma.task.create({ data: { title, description, userId } });
  }

  updateTask(
    id: string,
    data: { title?: string; description?: string; completed?: boolean },
  ) {
    return this.prisma.task.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        completed: data.completed, // ✅ Use "completed" instead of "isComplete"
      },
    });
  }

  // ✅ Delete a task
  deleteTask(id: string) {
    return this.prisma.task.delete({ where: { id } });
  }
}
