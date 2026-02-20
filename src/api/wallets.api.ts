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

export const getWalletsBankAccount = () =>
  baseApi.get<GetWalletBankAccountRes>('/Wallets/BankAccount');

export const postWalletInitiateCardTopUp = (
  val: PostWalletInitiateCardTopUpReq,
) => {
  return baseApi.post<PostWalletInitiateCardTopUpRes>(
    '/Wallets/InitiateCardTopUp',
    val,
  );
};

export const postWalletCompleteCardTopUp = (
  val: PostWalletCompleteCardTopUpReq,
) => baseApi.post<GenericApiResponse>('/Wallets/CompleteCardTopUp', val);

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

interface GetWalletBankAccountRes extends GenericApiResponse {
  data: {
    id: number;
    accountName: string;
    accountNumber: string;
    bankName: string;
    bankLogo: string;
  };
}

export interface PostWalletInitiateCardTopUpReq {
  amount: number | string;
}

interface PostWalletInitiateCardTopUpRes {
  data: string;
}

interface PostWalletCompleteCardTopUpReq {
  transactionReference: string;
}

// TYPES ENDS
