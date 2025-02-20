import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module'; // ✅ Import TasksModule
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TasksModule, AuthModule], // ✅ Ensure TasksModule is included
})
export class AppModule {}
