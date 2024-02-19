import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOneById(id: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id: Number(id),
        },
      });
      if (user) {
        return user;
      }
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async findOneByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email: email,
        },
      });
      if (user) {
        return user;
      } else {
        throw new NotFoundException('User not found');
      }
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    try {
      return await this.prisma.user.create({
        data,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('User with this email already exists');
      } else {
        throw new Error('Internal Server Error');
      }
    }
  }

  async deleteById(id: number): Promise<User> {
    try {
      const user = await this.prisma.user.delete({
        where: {
          id: id,
        },
      });
      if (user) {
        return user;
      } else {
        throw new NotFoundException('User not found');
      }
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
}
