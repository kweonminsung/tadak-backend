import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './config/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { RanksModule } from './modules/ranks/ranks.module';

@Module({
  imports: [PrismaModule, UsersModule, RanksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
