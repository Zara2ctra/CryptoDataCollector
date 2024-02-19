import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from '../types/signUp.dto';
import { LoginDto } from '../types/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    try {
      const { username, email, password } = signUpDto;

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.userService.createUser({
        username,
        email,
        password: hashedPassword,
      });

      const token = this.jwtService.sign({ id: user.id });
      return { token };
    } catch (error) {
      this.handleSignUpError(error);
    }
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    try {
      const { email, password } = loginDto;

      const user = await this.userService.findOneByEmail(email);
      this.validateLoginUser(user, password);

      const token = this.jwtService.sign({ id: user.id });
      return { token };
    } catch (error) {
      throw new UnauthorizedException('There was an error with a user');
    }
  }

  private handleSignUpError(error): void {
    if (error.code === 'P2002' && error.meta?.target?.includes('username')) {
      throw new ConflictException('Username already exists.');
    } else if (
      error.code === 'P2002' &&
      error.meta?.target?.includes('email')
    ) {
      throw new ConflictException('Email already exists.');
    } else {
      throw new BadRequestException(
        'An error occurred while creating the user.',
      );
    }
  }

  private async validateLoginUser(user: User, password: string): Promise<void> {
    if (!(await bcrypt.compare(password, user.password)) || !user) {
      throw new UnauthorizedException('Invalid email or password');
    }
  }

  private handleLoginError(): void {
    throw new UnauthorizedException('Invalid email or password');
  }
}
