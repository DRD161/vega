export interface PositionsInterface {
  id: number;
  asset: string;
  quantity?: number;
  value: number;
  asOf: string;
}

export interface PortfolioInterface {
  id: string;
  totalValue: number;
  asOf: string;
  positions: PositionsInterface[];
}

// Portfolio mock data
export const portfolios: PortfolioInterface[] = [
  {
    id: "1",
    totalValue: 31500,
    asOf: "2024-06-01",
    positions: [
      { id: 1, asset: "BTC", quantity: 1, value: 29000, asOf: "2024-06-01" },
      { id: 2, asset: "AAPL", quantity: 10, value: 1500, asOf: "2024-06-01" },
      { id: 3, asset: "GBP", value: 1000, asOf: "2024-06-01" },
    ],
  },
  {
    id: "2",
    totalValue: 34125,
    asOf: "2024-07-01",
    positions: [
      { id: 1, asset: "BTC", quantity: 1, value: 31000, asOf: "2024-07-01" },
      { id: 2, asset: "AAPL", quantity: 10, value: 1550, asOf: "2024-07-01" },
      { id: 3, asset: "GBP", value: 1575, asOf: "2024-07-01" },
    ],
  },
  {
    id: "3",
    totalValue: 37000,
    asOf: "2024-08-01",
    positions: [
      { id: 1, asset: "BTC", quantity: 1, value: 32500, asOf: "2024-08-01" },
      { id: 2, asset: "AAPL", quantity: 10, value: 1750, asOf: "2024-08-01" },
      { id: 3, asset: "GBP", value: 2750, asOf: "2024-08-01" },
    ],
  },
];
