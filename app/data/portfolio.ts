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
    totalValue: 32075,
    asOf: "2024-06-11",
    positions: [
      { id: 1, asset: "BTC", quantity: 1, value: 29500, asOf: "2024-06-11" },
      { id: 2, asset: "AAPL", quantity: 10, value: 1525, asOf: "2024-06-11" },
      { id: 3, asset: "GBP", value: 1050, asOf: "2024-06-11" },
    ],
  },
  {
    id: "3",
    totalValue: 31600,
    asOf: "2024-06-21",
    positions: [
      { id: 1, asset: "BTC", quantity: 1, value: 30000, asOf: "2024-06-21" },
      { id: 2, asset: "AAPL", quantity: 10, value: 1600, asOf: "2024-06-21" },
      { id: 3, asset: "GBP", value: 1100, asOf: "2024-06-21" },
    ],
  },
  {
    id: "4",
    totalValue: 34125,
    asOf: "2024-07-01",
    positions: [
      { id: 1, asset: "BTC", quantity: 1, value: 31000, asOf: "2024-07-01" },
      { id: 2, asset: "AAPL", quantity: 10, value: 1550, asOf: "2024-07-01" },
      { id: 3, asset: "GBP", value: 1575, asOf: "2024-07-01" },
    ],
  },
  {
    id: "5",
    totalValue: 33850,
    asOf: "2024-07-11",
    positions: [
      { id: 1, asset: "BTC", quantity: 1, value: 32000, asOf: "2024-07-11" },
      { id: 2, asset: "AAPL", quantity: 10, value: 1650, asOf: "2024-07-11" },
      { id: 3, asset: "GBP", value: 1150, asOf: "2024-07-11" },
    ],
  },
  {
    id: "6",
    totalValue: 35700, // Corrected total for 2024-07-21
    asOf: "2024-07-21",
    positions: [
      { id: 1, asset: "BTC", quantity: 1, value: 33000, asOf: "2024-07-21" },
      { id: 2, asset: "AAPL", quantity: 10, value: 1700, asOf: "2024-07-21" },
      { id: 3, asset: "GBP", value: 1200, asOf: "2024-07-21" },
    ],
  },
  {
    id: "7",
    totalValue: 36000, // Corrected total for 2024-08-01
    asOf: "2024-08-01",
    positions: [
      { id: 1, asset: "BTC", quantity: 1, value: 32500, asOf: "2024-08-01" },
      { id: 2, asset: "AAPL", quantity: 10, value: 1750, asOf: "2024-08-01" },
      { id: 3, asset: "GBP", value: 1250, asOf: "2024-08-01" },
    ],
  },
];
