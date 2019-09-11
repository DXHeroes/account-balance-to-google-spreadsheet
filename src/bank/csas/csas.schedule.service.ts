import { Injectable, Inject } from '@nestjs/common';
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
    console.log('executing cron job');
  }

  @Cron('0 0 0 0 0/2')
  async cronJobb() {
    console.log('executing cron jobb');
  }

  @Timeout(5000)
  onceJob() {
    console.log('executing once job');
  }

  @Interval(10000)
  // @Cron('0 23 * * *')
  async intervalJob() {
    console.log('executing interval job');

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

    console.log('transactions written to GSheet');
  }
}
