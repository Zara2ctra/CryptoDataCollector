import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, SignUpDto } from '../types/signUp.dto';
import { LoginDto, LoginUserDto } from '../types/login.dto';
import { ApiBody, ApiOperation, ApiProperty } from '@nestjs/swagger';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({ summary: 'Signup' })
  @ApiBody({ type: CreateUserDto })
  @ApiProperty({ type: CreateUserDto, description: 'User data' })
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login' })
  @ApiBody({ type: LoginUserDto })
  @ApiProperty({ type: LoginUserDto, description: 'User data' })
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }
}
