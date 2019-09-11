export interface AccountSnapshot {
  accountId: string;
  bankId: string;
  iban: string;
  currency: string;
  closingBalance: number;
  date: Date;
}
