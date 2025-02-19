import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
// import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(
    registerDto: RegisterDto,
  ): Promise<{ id: string; email: string }> {
    try {
      // Check if user already exists
      const existingUser = await this.prisma.user.findUnique({
        where: { email: registerDto.email },
      });

      if (existingUser) {
        throw new ConflictException('Email is already in use');
      }
      // Create user
      const user = await this.prisma.user.create({
        data: {
          name: registerDto.name,
          email: registerDto.email,
          password: registerDto.password,
        },
      });

      return { id: user.id, email: user.email };
    } catch (error: unknown) {
      console.error('❌ Error in register:', error);

      // Ensure error has a `code` property before accessing it
      if (error instanceof Error && 'code' in error) {
        const prismaError = error as { code: string };

        // Handle database constraint errors (duplicate email)
        if (prismaError.code === 'P2002') {
          throw new ConflictException('Email already exists');
        }
      }

      throw new InternalServerErrorException('Registration failed');
    }
  }
}
