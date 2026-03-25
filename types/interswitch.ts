export interface Transaction {
  transactionId?: string;
  retrieval_reference_number: string; // RRN
  paymentReference?: string;
  merchant_code: string;
  terminal_id: string;
  amount: number;
  currency: string; // 'NGN'
  status: "SUCCESS" | "FAILED" | "PENDING" | "APPROVED";
  transactionDate: string; // ISO e.g. '2026-03-01T14:30:00Z'
  responseCode: string;
  responseDescription?: string;
  channel?: string;
  beneficiaryAccount?: string;
  issuer_code?: string;
}

export interface QuickSearchResponse {
  timeStamp: string;
  responseMessage: string;
  responseCode: string;
  dataSize: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  data: Transaction[];
  errors: null | any;
}
