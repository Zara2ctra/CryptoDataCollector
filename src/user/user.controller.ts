import {
  Controller,
  Delete,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Delete a user by ID' })
  async deleteUser(@Param('id') id: string): Promise<User> {
    try {
      return await this.userService.deleteById(Number(id));
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
}
