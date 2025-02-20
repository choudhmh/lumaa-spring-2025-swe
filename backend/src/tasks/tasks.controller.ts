import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // ✅ Get all tasks for a specific user
  @Get(':userId')
  getTasks(@Param('userId') userId: string) {
    return this.tasksService.getTasks(userId);
  }

  // ✅ Get a single task by its ID
  @Get('task/:id') // 🔹 New endpoint to fetch a specific task
  getTask(@Param('id') id: string) {
    return this.tasksService.getTask(id);
  }

  // ✅ Create a new task
  @Post()
  createTask(
    @Body() body: { userId: string; title: string; description: string },
  ) {
    return this.tasksService.createTask(
      body.userId,
      body.title,
      body.description,
    );
  }

  @Put(':id')
  updateTask(
    @Param('id') id: string,
    @Body() body: { title?: string; description?: string; completed?: boolean },
  ) {
    return this.tasksService.updateTask(id, body);
  }

  // ✅ Delete a task
  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }
}
