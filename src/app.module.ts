import { Module } from '@nestjs/common';
import { CryptocurrencyModule } from './cryptocurrency/cryptocurrency.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    PrismaModule,
    TaskModule,
    CryptocurrencyModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
