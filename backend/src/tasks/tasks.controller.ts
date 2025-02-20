import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
  BadRequestException,
  Request, // ✅ Import `@Request()`
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express'; // ✅ Alias Express Request
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserPayload } from 'src/auth/user.interface';

// ✅ Ensure UserPayload has an `id`
interface AuthRequest extends ExpressRequest {
  user: UserPayload & { id: string };
}

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // ✅ GET all tasks for the logged-in user
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUserTasks(@Request() req: AuthRequest): Promise<any> {
    const userId = req.user.id; // ✅ Strongly typed userId

    if (!userId) {
      throw new BadRequestException('User ID not found in token.');
    }

    console.log('Fetching tasks for user:', userId);
    return this.tasksService.getTasks(userId);
  }

  // ✅ POST - Create a new task (only for logged-in users)
  @UseGuards(AuthGuard('jwt')) // ✅ PROTECTED Route
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTask(
    @Request() req: AuthRequest,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    const userId = req.user.id; // ✅ Get userId from token

    if (!createTaskDto.title) {
      throw new BadRequestException('Task Title is required.');
    }

    return this.tasksService.createTask(
      userId,
      createTaskDto.title,
      createTaskDto.description || '',
    );
  }

  // ✅ PUT - Update task completion status
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<any> {
    if (!id) {
      throw new BadRequestException('Task ID is required.');
    }

    return this.tasksService.updateTask(id, updateTaskDto.completed);
  }

  // ✅ DELETE - Remove a task
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTask(@Param('id') id: string): Promise<void> {
    if (!id) {
      throw new BadRequestException('Task ID is required.');
    }

    await this.tasksService.deleteTask(id);
  }
}
