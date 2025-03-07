import React from "react";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Transactions from "../page";
import { fetchTransactions } from "@/api/transaction";
import { CSVLink } from "react-csv";

// Mock the fetchTransactions function
jest.mock("@/api/transaction", () => ({
  fetchTransactions: jest.fn(),
}));

// Mock the CSVLink component
jest.mock("react-csv", () => ({
  CSVLink: jest.fn(({ children }) => <div>{children}</div>),
}));

const queryClient = new QueryClient();

describe("Transactions Component", () => {
  beforeEach(() => {
    queryClient.clear();
  });

  it("displays loader while fetching data", () => {
    (fetchTransactions as jest.Mock).mockReturnValue(new Promise(() => {}));
    render(
      <QueryClientProvider client={queryClient}>
        <Transactions />
      </QueryClientProvider>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("displays error message when there is an error", async () => {
    (fetchTransactions as jest.Mock).mockRejectedValue({
      message: "An error occurred",
    });
    render(
      <QueryClientProvider client={queryClient}>
        <Transactions />
      </QueryClientProvider>
    );
    expect(await screen.findByText(/an error occurred/i)).toBeInTheDocument();
  });

  it("displays no data message when data is empty", async () => {
    (fetchTransactions as jest.Mock).mockResolvedValue([]);
    render(
      <QueryClientProvider client={queryClient}>
        <Transactions />
      </QueryClientProvider>
    );
    expect(await screen.findByText(/no data available/i)).toBeInTheDocument();
  });

  it("displays data when fetched successfully", async () => {
    const mockData = [
      {
        amount: 1000,
        transaction_id: { $oid: "12345" },
        transaction_type: "Credit",
        date: "2023-06-15",
        time: "12:00 PM",
        status: "Completed",
      },
    ];
    (fetchTransactions as jest.Mock).mockResolvedValue(mockData);
    render(
      <QueryClientProvider client={queryClient}>
        <Transactions />
      </QueryClientProvider>
    );
    expect(await screen.findByText(/₦1,000/i)).toBeInTheDocument();
  });
});
