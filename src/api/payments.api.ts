import baseApi, { GenericApiResponse } from './base.api';

// API STARTS

export const getPaymentsInvoice = (id: number) =>
  baseApi.get<GetPaymentInvoiceRes>(`/api/Payments/${id}/Invoice`);

// API ENDS

// TYPES STARTS

interface GetPaymentInvoiceRes extends GenericApiResponse {
  data: InvoiceData;
}

interface InvoiceData {
  id: number;
  billId: number;
  billCycleId: number;
  purpose: number;
  purposeText: string;
  invoiceNumber: string;
  amount: number;
  description: string;
  status: number;
  statusText: string;
  statusMessage: string;
  fromEntity: number;
  fromEntityText: string;
  fromEntityId: number;
  toEntity: number;
  toEntityText: string;
  toEntityId: number;
  grossAmount: number;
  discountRate: number;
  discountValue: number;
  vatRate: number;
  vatValue: number;
  dueDate: string;
  timeCreated: string;
  timeLastActionTaken: string;
  lastActionTaken: string;
  timeCreatedFormatted: string;
  paymentMethod: string;
  items: InvoiceItemData[];
  estate: string;
  recipient: string;
  payees: PayeeData[];
}

interface InvoiceItemData {
  itemId: number;
  invoiceParentId: number;
  reference: string;
  description: string;
  amount: number;
  status: number;
  statusText: string;
  statusMessage: string;
  dueDate: string;
  timeUpdated: string;
  timeCreated: string;
  timeCreatedFormatted: string;
  paidByUserId: number;
  order: number;
  payees: PayeeData[];
}

interface PayeeData {
  userId: number;
  residentId: number;
  firstName: string;
  lastName: string;
  code: string;
  emailAddress: string;
  phoneNumber: string;
}

// TYPES ENDS
