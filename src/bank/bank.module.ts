import { Module } from '@nestjs/common';
import { CsasModule } from './csas/csas.module';

@Module({
  providers: [],
  controllers: [],
  imports: [CsasModule],
})
export class BankModule {}
