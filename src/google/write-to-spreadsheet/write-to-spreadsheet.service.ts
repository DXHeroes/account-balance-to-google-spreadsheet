/* eslint-disable @typescript-eslint/camelcase, prefer-arrow-callback */

import { Injectable } from '@nestjs/common';
import * as GoogleSpreadsheet from 'google-spreadsheet';
import { AccountSnapshot } from './write-to-spreadsheet.interface';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class WriteToSpreadsheetService {
  private readonly googleAuth;
  private readonly googleSheetId;
  private googleAuthed: boolean;
  private sheet;

  constructor(config: ConfigService) {
    // Please take note that this check is case sensitive!
    this.googleAuth = JSON.parse(Buffer.from(config.get('GOOGLE_AUTH'), 'base64').toString('utf-8'));
    this.googleSheetId = config.get('GOOGLE_SHEET_ID');
    this.googleAuthed = false;
    this.sheet = new GoogleSpreadsheet(this.googleSheetId);
  }

  writeBalancesToGoogleSheet = async (snapshots: AccountSnapshot[], rates: { [currency: string]: number }) => {
    await this.authWithGoogle();
    await this.getSheetInfo(this.sheet);

    const combinedSnapshot: AccountSnapshot = {
      accountId: 'COMBINED',
      bankId: 'COMBINED',
      currency: 'CZK',
      date: snapshots[0].date,
      iban: 'COMBINED',
      closingBalance: Math.round(snapshots.map((s) => s.closingBalance / rates[s.currency]).reduce((prev, next) => prev + next)),
    };
    snapshots.push(combinedSnapshot);

    await Promise.all(
      snapshots.map((s) => {
        console.log(`Writing account ${s.accountId}/${s.bankId} (${s.currency})`);
        const writePromise = this.writeRow(2, {
          Date: s.date.toISOString(),
          Account: `${s.accountId}/${s.bankId} `,
          Balance: Math.round(s.closingBalance),
          Currency: s.currency,
          CZK_Balance: Math.round(s.closingBalance / rates[s.currency]),
        });
        console.log('✅ Done!');
        return writePromise;
      }),
    );
  };

  authWithGoogle = async () => {
    if (this.googleAuthed) {
      return;
    }
    return new Promise((res, rej) => {
      this.sheet.useServiceAccountAuth(this.googleAuth, (e) => {
        if (!e) {
          this.googleAuthed = true;
          res();
        } else {
          rej();
        }
      });
    });
  };

  getSheetInfo = async (sheet) => {
    return new Promise((res, rej) => {
      sheet.getInfo(function(err, info) {
        if (err) {
          rej(err);
          return;
        }
        console.log('Loaded doc: ' + info.title + ' by ' + info.author.email);
        sheet = info.worksheets[0];
        console.log('sheet 1: ' + sheet.title + ' ' + sheet.rowCount + 'x' + sheet.colCount);
        res(info);
      });
    });
  };

  writeRow = async (worksheetId: number, newRow: { [key: string]: any }) => {
    return new Promise((res, rej) => {
      this.sheet.addRow(worksheetId, newRow, (err, row) => {
        if (err) {
          rej(err);
          return;
        }
        res(row);
      });
    });
  };
}
