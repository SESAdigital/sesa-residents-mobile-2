import baseApi, {
  GenericApiResponse,
  GenericPaginatedResponse,
  GenericPaginationRequest,
  GenericTypeWithId,
} from './base.api';
import {
  BillFrequencyType,
  CollectionType,
  InvoicePurposeType,
  InvoiceStatusType,
} from './constants/default';

// API STARTS

export const getBillsMetrics = (id: number) =>
  baseApi.get<GetBillsMetricsRes>('/Bills/Metrics', { PropertyId: id });

export const getBillsOlder = (val: GetBillOlderReq) =>
  baseApi.get<GetBillOlderRes>('/Bills/Older', val);

export const getBillsUnpaid = (val: GenericPaginationRequest) =>
  baseApi.get<GetBillOlderRes>('/Bills/Unpaid', val);

export const getBillInvoice = (id: number) =>
  baseApi.get<GetBillInvoiceRes>(`/Bills/${id}`);

export const postPayBillInvoice = (
  val: GenericTypeWithId<PostPayBillInvoiceReq>,
) => baseApi.post<GenericApiResponse>(`/Bills/${val?.id}`, val?.value);

// API ENDS

// TYPES STARTS

interface GetBillsMetricsRes extends GenericApiResponse {
  data: {
    totalDueBillCount: number;
    totalDueCollectionCount: number;
    isBillOverDue: boolean;
    isCollectionOverDue: boolean;
    overDueBillCount: number;
    overDueCollectionCount: number;
    dueBillDays: number;
    dueCollectionDays: number;
    totalUnpaidBillCount: number;
    totalUnpaidCollectionCount: number;
    totalBillDueAmount: number;
    totalColllectionDueAmount: number;
  };
}

interface GetBillOlderReq extends GenericPaginationRequest {
  PropertyId: number;
}

export interface GetBillOlderResData {
  billId: number;
  billCycleId: number;
  invoiceParentId: number;
  invoiceId: number;
  description: string;
  amount: number;
  billFrequency: BillFrequencyType;
  billFrequencyText: string;
  datePaid: string;
  dueDate: string;
  dueDayCount: number;
  billType: number;
  collectionType: CollectionType;
  installments: string;
}

interface GetBillOlderRes extends GenericApiResponse {
  data: GenericPaginatedResponse<GetBillOlderResData>;
}

interface GetBillInvoiceRes extends GenericApiResponse {
  data: {
    billId: number;
    billCycleId: number;
    billPurpose: InvoicePurposeType;
    billPurposeText: string;
    installmentCount: number;
    invoiceId: number;
    invoiceParentId: number;
    invoiceNumber: string;
    description: string;
    amount: number;
    status: InvoiceStatusType;
    statusText: string;
    address: string;
    billFrequencyText: string;
    collectionType: CollectionType;
    collectionTypeText: string;
    paymentMethod: string;
    datePaid: string;
    dueDate: string;
    dateCreated: string;
    billStartDate: string;
    billEndDate: string;
    nextInstallmentDate: string;
    dueDayCount: number;
  };
}

interface PostPayBillInvoiceReq {
  transactionPin: string;
  amount: number;
}

// TYPES ENDS
