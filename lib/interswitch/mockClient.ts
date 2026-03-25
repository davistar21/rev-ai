import type {
  Transaction,
  QuickSearchResponse,
} from "@/types/interswitch";

/**
 * Mock Interswitch client for development/hackathon use.
 *
 * Simulates the Transaction Search APIs (Quick Search, Reference Search)
 * with randomized but realistic Nigerian transaction data.
 *
 * Replace with real Interswitch client post-hackathon.
 */
export const mockInterswitch = {
  /** Simulates Interswitch Passport OAuth token retrieval. */
  async getAccessToken(): Promise<string> {
    return "mock_bearer_token_revai_2026";
  },

  /**
   * Simulates the Quick Search endpoint.
   * Generates 30 varied fake transactions spanning Jan 2026 → now.
   */
  async quickSearch(
    params: {
      dateFrom?: string;
      dateTo?: string;
      merchantCode?: string;
    } = {}
  ): Promise<QuickSearchResponse> {
    const startDate = new Date("2026-01-01");
    const endDate = new Date();
    const transactions: Transaction[] = [];

    for (let i = 0; i < 30; i++) {
      const date = new Date(
        startDate.getTime() +
          Math.random() * (endDate.getTime() - startDate.getTime())
      );
      const amount = Math.floor(1000 + Math.random() * 799000);
      const status: Transaction["status"] =
        Math.random() > 0.15
          ? "SUCCESS"
          : Math.random() > 0.5
            ? "FAILED"
            : "PENDING";

      transactions.push({
        retrieval_reference_number: `RRN${Math.floor(Math.random() * 10000000)}`,
        merchant_code: "MX" + Math.floor(Math.random() * 10000),
        terminal_id: "TERM" + Math.floor(Math.random() * 1000),
        amount,
        currency: "NGN",
        status,
        transactionDate: date.toISOString(),
        responseCode: status === "SUCCESS" ? "00" : "51",
        responseDescription:
          status === "SUCCESS" ? "Approved" : "Declined",
      });
    }

    // Sort by date descending (newest first)
    transactions.sort(
      (a, b) =>
        new Date(b.transactionDate).getTime() -
        new Date(a.transactionDate).getTime()
    );

    return {
      timeStamp: new Date().toISOString(),
      responseMessage: "Mock Transactions",
      responseCode: "202",
      dataSize: transactions.length,
      totalPages: 1,
      pageNumber: 1,
      pageSize: 30,
      data: transactions,
      errors: null,
    };
  },

  /**
   * Simulates the Reference Search endpoint.
   * Returns null for now — expand when needed.
   */
  async referenceSearch(rrn: string): Promise<Transaction | null> {
    return null;
  },
};
