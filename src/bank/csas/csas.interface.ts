export type BankCsasTransaction = {
  amount: {
    value: number;
    currency: string;
  };
};

export type BankCsasAccount = {
  id: string;
  identification: {
    iban: string;
  };
  servicer: {
    bankCode: string;
    countryCode: string;
    bic: string;
  };
  currency: string;
  nameI18N: string;
  productI18N: string;
};

export type BankCsasBalance = {
  type: {
    codeOrProprietary: {
      code: string;
    };
  };
  creditLine: {
    included: boolean;
  };
  amount: {
    value: number;
    currency: string;
  };
  creditDebitIndicator: string;
  date: {
    dateTime: string;
  };
};

export enum BankCsasApiBaseUrl {
  sandbox = 'https://webapi.developers.erstegroup.com/api/csas/public/sandbox/',
  production = 'https://www.csas.cz/webapi/api/',
}
