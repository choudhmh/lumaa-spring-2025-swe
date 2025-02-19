//import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  name: string;
  email: string;
  password: string;
}
