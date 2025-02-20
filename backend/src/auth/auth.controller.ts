import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth') // All routes start with /auth
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<{ id: string; email: string }> {
    return this.authService.register(registerDto);
  }

  @Post('login') // ✅ Add the login route
  async login(@Body() loginDto: LoginDto) {
    console.log('🔹 Login request received:', loginDto);
    return this.authService.login(loginDto.email, loginDto.password);
  }
}
