import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout, NestSchedule } from 'nest-schedule';
import { CsasService } from './csas.service';
import { WriteToSpreadsheetService } from '../../google/write-to-spreadsheet/write-to-spreadsheet.service';

@Injectable() // Only support SINGLETON scope
export class CsasScheduleService extends NestSchedule {
  constructor(private readonly bankService: CsasService, private readonly writeToSpreadsheetService: WriteToSpreadsheetService) {
    super();
  }

  @Cron('0 0 2 * *')
  async cronJob() {
    Logger.log('Executing cron job', this.constructor.name);
  }

  @Timeout(5000)
  onceJob() {
    Logger.log('Executing once job', this.constructor.name);
  }

  @Interval(10000)
  // @Cron('0 23 * * *')
  async intervalJob() {
    Logger.log('Executing interval job', this.constructor.name);

    const allTransactions = await this.bankService.transactions();

    await this.writeToSpreadsheetService.writeBalancesToGoogleSheet(
      allTransactions.map((b) => {
        return {
          accountId: b.account.id,
          bankId: b.account.name,
          iban: b.account.iban,
          currency: b.account.currency,
          closingBalance: b.balance.amount.value,
          date: new Date(b.balance.dateTime),
        };
      }),
      { CZK: 1 }, //TODO: add currency rate
    );

    Logger.log('Transactions written to GSheet', this.constructor.name);
  }
}
