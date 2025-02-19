import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrismaModule } from '../prisma/prisma.module'; // 👈 Import PrismaModule

@Module({
  imports: [PrismaModule], // 👈 Now AuthModule can use PrismaService
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
