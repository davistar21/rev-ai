import type { Transaction } from "@/types/interswitch";

function generateMockBatch(count: number, amountPrefix: number, variation: number, overrideDate?: string): Transaction[] {
  return Array.from({ length: count }).map((_, i) => {
    const mockAmount = amountPrefix * 100 + (Math.random() * variation);
    return {
      id: `mock-csv-tx-${Math.random().toString(36).substring(7)}`,
      merchantId: "demo-merchant",
      merchant_code: "DEMO123",
      terminal_id: "T123",
      transactionRef: `REF-${Math.random().toString(36).substring(7).toUpperCase()}`,
      retrieval_reference_number: `RRN${Math.random().toString(36).substring(7)}`,
      amount: mockAmount.toString(),
      currency: "NGN",
      transactionDate: overrideDate || new Date(Date.now() - (Math.random() * 10000000000)).toISOString(),
      responseCode: Math.random() > 0.1 ? "00" : "91",
      responseMessage: "Approved",
      status: Math.random() > 0.1 ? "SUCCESS" : "FAILED",
      customerId: `CUST-${Math.random().toString(36).substring(7)}`,
      paymentMethod: "Card",
      channel: "POS",
      createdAt: new Date().toISOString()
    } as Transaction;
  });
}

export const simulatedCSVs = [
  {
    id: "january_2026_settlements.csv",
    title: "January 2026 Settlements.csv",
    size: "1.2 MB",
    rows: 854,
    data: generateMockBatch(150, 45000, 25000)
  },
  {
    id: "weekend_surge_pos.csv",
    title: "Weekend Surge POS.csv",
    size: "845 KB",
    rows: 420,
    data: generateMockBatch(120, 85000, 45000)
  },
  {
    id: "q1_financials.csv",
    title: "Q1 Financials Complete.csv",
    size: "3.4 MB",
    rows: 2450,
    data: generateMockBatch(200, 55000, 50000)
  }
];
