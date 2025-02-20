import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService, // ✅ Injecting JwtService properly
  ) {}

  // 🔹 Register a new user
  async register(
    registerDto: RegisterDto,
  ): Promise<{ id: string; email: string }> {
    try {
      console.log('🔹 Checking if user exists:', registerDto.email);

      // ✅ Check if user already exists
      const existingUser = await this.prisma.user.findUnique({
        where: { email: registerDto.email },
      });

      if (existingUser) {
        console.warn('⚠️ Email already in use:', registerDto.email);
        throw new ConflictException('Email is already in use');
      }

      // ✅ Hash password before storing
      console.log('🔹 Hashing password...');
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);
      console.log('✅ Hashed Password:', hashedPassword);

      // ✅ Create user
      console.log('🔹 Creating user in database...');
      const user = await this.prisma.user.create({
        data: {
          name: registerDto.name,
          email: registerDto.email,
          password: hashedPassword, // ✅ Store hashed password
        },
      });

      console.log('✅ User registered successfully:', user);

      return { id: user.id, email: user.email };
    } catch (error) {
      console.error('❌ Registration Error:', error);

      // ✅ Handle database constraint errors (duplicate email)
      if (error instanceof Error && 'code' in error) {
        const prismaError = error as { code: string };
        if (prismaError.code === 'P2002') {
          console.warn('⚠️ Duplicate email error detected.');
          throw new ConflictException('Email already exists');
        }
      }

      throw new InternalServerErrorException('Registration failed');
    }
  }

  // 🔹 Login user
  async login(email: string, password: string) {
    console.log('🔹 Attempting login for:', email);

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.warn('⚠️ User not found for email:', email);
      throw new UnauthorizedException('Invalid credentials'); // ❌ User not found
    }

    console.log('🔹 User found:', user);

    console.log('🔹 Comparing passwords...');
    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log('🔹 Password Match:', isPasswordValid);

    if (!isPasswordValid) {
      console.warn('⚠️ Incorrect password for:', email);
      throw new UnauthorizedException('Invalid credentials'); // ❌ Password incorrect
    }

    // ✅ Generate JWT token with correct structure
    console.log('🔹 Generating JWT token for user:', user.id);
    const token = this.jwtService.sign({
      sub: user.id, // ✅ Use "sub" instead of "userId" for NestJS standards
      email: user.email,
    });

    console.log('✅ Login successful for:', email);

    return { token, userId: user.id };
  }
}
