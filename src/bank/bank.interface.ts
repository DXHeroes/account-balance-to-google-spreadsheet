export interface IBankService {
  /* List all transactions with accounts and balances */
  transactions(): Promise<
    {
      account: BankAccount;
      balance: BankBalance;
      transactions: BankTransaction[];
    }[]
  >;

  /* List transactions on an account */
  transactionsForAccount(accessToken: string, accountId: string): Promise<BankTransaction[]>;

  /* Get balance on account */
  accounts(accessToken: string): Promise<BankAccount[]>;

  /* List all my accounts */
  balanceForAccount(accessToken: string, accountId: string): Promise<BankBalance>;
}

export interface BankTransaction {
  amount: {
    value: number;
    currency: string;
  };
}

export interface BankAccount {
  id: string;
  name: string;
  iban: string;
  bankCode: string;
  currency: string;
}

export interface BankBalance {
  amount: {
    value: number;
    currency: string;
  };
  dateTime: string;
}
