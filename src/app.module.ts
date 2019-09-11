import { Module } from '@nestjs/common';
import { ScheduleModule } from 'nest-schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BankModule } from './bank/bank.module';
import { GoogleModule } from './google/google.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ScheduleModule.register(), BankModule, GoogleModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
