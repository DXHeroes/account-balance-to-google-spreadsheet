export type BankCsasTransaction = {
  transactionId: string;
  transactionType: string;
  transactionTypeI18N: string;

  cardNumber: number;
  description: string;

  // symbols
  constantSymbol: string;
  specificSymbol: string;
  variableSymbol: string;

  // rates
  currRateEURDate: string;
  currRateEURValue: number;

  // notes
  payeeNote: string;
  payerNote: string;

  // party 🎉
  accountParty: {
    accountNumber: string;
    accountPrefix: string;
    bankCode: string;
    iban: string;
    accountPartyInfo: string;
    partyDescription: string;
  };

  // amounts
  amount: {
    value: number;
    currency: string;
    precision: number;
  };

  amountSender: {
    value: number;
    currency: string;
    precision: number;
  };
};

export type BankCsasAccount = {
  id: string;
  accountName: string;
  currency: string;

  // acc info
  accountNo: {
    iban: string;
    accountPrefix: number;
    accountNumber: number;
    bankCode: string;
  };

  // owner
  accountOwner: {
    type: string;
    company: {
      name: string;
      regNum: string;
    };
    person: {
      firstName: string;
      lastName: string;
      title: string;
      additionalTitle: string;
    };
  };
};

export type BankCsasBalance = {
  balance: {
    value: number;
    currency: string;
    precision: number;
  };
  disposable: {
    value: number;
    currency: string;
    precision: number;
  };
};

export enum BankCsasApiBaseUrl {
  sandbox = 'https://webapi.developers.erstegroup.com/api/csas/public/sandbox/',
  production = 'https://www.csas.cz/webapi/api/',
}
