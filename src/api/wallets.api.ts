import baseApi, {
  GenericApiResponse,
  GenericPaginatedResponse,
  GenericPaginationRequest,
} from './base.api';
import {
  TransactionEntryType,
  TransactionPurposeType,
} from './constants/default';

// API STARTS

export const getWalletTransactions = (val: GenericPaginationRequest) =>
  baseApi.get<GetWalletTransactions>('/Wallets/Transactions', val);

// API ENDS

// TYPES STARTS

export interface WalletTransactionDetails {
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
}

export interface GetWalletTransactionData {
  date: string;
  transactions: WalletTransactionDetails[];
}

interface GetWalletTransactions extends GenericApiResponse {
  data: GenericPaginatedResponse<GetWalletTransactionData>;
}

// TYPES ENDS
