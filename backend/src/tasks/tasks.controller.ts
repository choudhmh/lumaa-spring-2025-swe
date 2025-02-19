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

  @Get(':userId')
  getTasks(@Param('userId') userId: string) {
    return this.tasksService.getTasks(userId);
  }

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
  updateTask(@Param('id') id: string, @Body() body: { completed: boolean }) {
    return this.tasksService.updateTask(id, body.completed);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }
}
