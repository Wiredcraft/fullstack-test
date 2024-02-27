import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { VotesModule } from './votes/votes.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LikesModule } from './likes/likes.module';

@Module({
  imports: [PrismaModule, VotesModule, UsersModule, AuthModule, LikesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
