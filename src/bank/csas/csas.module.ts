import { Module } from '@nestjs/common';
import { CsasService } from './csas.service';
import { CsasScheduleService } from './csas.schedule.service';
import { WriteToSpreadsheetService } from '../../google/write-to-spreadsheet/write-to-spreadsheet.service';

@Module({
  providers: [CsasService, CsasScheduleService, WriteToSpreadsheetService],
})
export class CsasModule {}
