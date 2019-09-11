import { Module } from '@nestjs/common';
import { WriteToSpreadsheetService } from './write-to-spreadsheet/write-to-spreadsheet.service';

@Module({
  providers: [WriteToSpreadsheetService],
  exports: [WriteToSpreadsheetService],
})
export class GoogleModule {}
