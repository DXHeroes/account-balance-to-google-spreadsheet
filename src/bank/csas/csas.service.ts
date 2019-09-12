/* eslint-disable @typescript-eslint/camelcase */

import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as qs from 'querystring';
import { BankCsasAccount, BankCsasApiBaseUrl, BankCsasTransaction, BankCsasBalance } from './csas.interface';
import { ConfigService } from '../../config/config.service';
import { ConfigKeys } from '../../config/config.interface';
import { IBankService, BankTransaction, BankAccount, BankBalance } from '../bank.interface';

@Injectable()
export class CsasService implements IBankService {
  private readonly config: ConfigService;

  constructor(config: ConfigService) {
    this.config = config;
  }

  /* List all transactions with accounts and balances */
  async transactions(): Promise<
    {
      account: BankAccount;
      balance: BankBalance;
      transactions: BankTransaction[];
    }[]
  > {
    Logger.debug('#transactions', this.constructor.name);
    const response = [];
    const accessToken = await this.getAccessToken();

    const accounts = await this.accounts(accessToken);

    for (const account of accounts) {
      const transactions = await this.transactionsForAccount(accessToken, account.id);
      const balance = await this.balanceForAccount(accessToken, account.id);
      response.push({ account, transactions, balance });
    }

    Logger.debug(response, this.constructor.name);

    return response;
  }

  /* List transactions on an account */
  async transactionsForAccount(accessToken: string, accountId: string): Promise<BankTransaction[]> {
    Logger.debug('#transactionsForAccount', this.constructor.name);

    const listTransactionsUrl = `${this.bankEnvironmentBaseUrl()}v1/corporate/our/accounts/${accountId}/transactions`;

    const response = await axios.get(listTransactionsUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip',
        'web-api-key': this.config.get(ConfigKeys.BANK_CSAS_WEB_API_KEY),
      },
    });

    const transactions: BankCsasTransaction[] = response.data.transactions;

    Logger.debug(transactions, this.constructor.name);

    return transactions.map((t) => {
      return {
        ...t,
      };
    });
  }

  /* Get balance on account */
  async balanceForAccount(accessToken: string, accountId: string): Promise<BankBalance> {
    Logger.debug('#balanceForAccount', this.constructor.name);

    const listTransactionsUrl = `${this.bankEnvironmentBaseUrl()}v1/corporate/our/accounts/${accountId}/balance`;

    const response = await axios.get(listTransactionsUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip',
        'web-api-key': this.config.get(ConfigKeys.BANK_CSAS_WEB_API_KEY),
      },
    });

    const balance: BankCsasBalance = response.data;

    Logger.debug(balance, this.constructor.name);

    return {
      amount: {
        value: balance.balance.value,
        currency: balance.balance.currency,
      },
      dateTime: new Date().toISOString(),
    };
  }

  /* List all my accounts */
  async accounts(accessToken: string): Promise<BankAccount[]> {
    Logger.debug('#accounts', this.constructor.name);

    const listAccountsUrl = `${this.bankEnvironmentBaseUrl()}v1/corporate/our/accounts`;

    const response = await axios.get(listAccountsUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip',
        'web-api-key': this.config.get(ConfigKeys.BANK_CSAS_WEB_API_KEY),
      },
    });

    const accounts: BankCsasAccount[] = response.data.accounts;

    Logger.debug(accounts, this.constructor.name);

    return accounts.map((a) => {
      return {
        id: a.id,
        name: a.accountName,
        iban: a.accountNo.iban,
        bankCode: a.accountNo.bankCode,
        currency: a.currency,
      };
    });
  }

  /* Get access token from IDP */
  private async getAccessToken(): Promise<string> {
    Logger.debug('#getAccessToken', this.constructor.name);

    const idpUrl = `https://webapi.developers.erstegroup.com/api/csas/sandbox/v1/sandbox-idp/token`;

    const idpBody = {
      grant_type: 'refresh_token',
      refresh_token: this.config.get(ConfigKeys.BANK_CSAS_REFRESH_TOKEN),
      client_id: this.config.get(ConfigKeys.BANK_CSAS_CLIENT_ID),
      client_secret: this.config.get(ConfigKeys.BANK_CSAS_CLIENT_SECRET),
      redirect_uri: 'http://localhost:3000',
    };

    let response;
    try {
      response = await axios.post(idpUrl, qs.stringify(idpBody), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
    } catch (error) {
      Logger.error(error.response.data);

      throw error;
    }

    return response.data.access_token;
  }

  /* Get API base URL */
  private bankEnvironmentBaseUrl = (): BankCsasApiBaseUrl => {
    if (process.env.NODE_ENV === 'production') {
      return BankCsasApiBaseUrl['production'];
    } else {
      return BankCsasApiBaseUrl['sandbox'];
    }
  };
}
