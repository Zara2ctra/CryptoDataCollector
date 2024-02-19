import {ApiProperty} from "@nestjs/swagger";

export class LoginUserDto {
  @ApiProperty({
    example: 'john@example.com',
    description: 'The email of the user',
  })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}
