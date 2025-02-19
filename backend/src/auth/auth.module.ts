import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module'; // 👈 Import PrismaModule
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule], // 👈 PrismaModule must be imported
  providers: [AuthService, JwtService], // 👈 Ensure all dependencies are listed
  exports: [AuthService],
})
export class AuthModule {}
