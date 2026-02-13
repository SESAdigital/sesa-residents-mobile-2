import baseApi, {
  GenericApiResponse,
  GenericPaginatedResponse,
} from './base.api';
import {
  TransactionEntryType,
  TransactionPurposeType,
} from './constants/default';

// API STARTS

export const getWalletTransactions = () =>
  baseApi.get<GetWalletTransactions>('/Wallets/Transactions');

// API ENDS

// TYPES STARTS

export interface GetWalletTransactionData {
  date: string;
  transactions: {
    id: number;
    description: string;
    amount: number;
    entryType: TransactionEntryType;
    entryTypeText: string;
    purpose: TransactionPurposeType;
    purposeText: string;
    reference: string;
    paymentMethod: string;
    timeCreated: string;
  }[];
}

interface GetWalletTransactions extends GenericApiResponse {
  data: GenericPaginatedResponse<GetWalletTransactionData>;
}

// TYPES ENDS
