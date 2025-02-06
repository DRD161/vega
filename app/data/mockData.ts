export interface AssetsInterface {
  id: string;
  name: string;
  type: string;
}

export interface PricesInterface {
  id: string;
  asset: string;
  price: number;
  asOf: string;
}

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

// Assets mock data
export const assets: AssetsInterface[] = [
  { id: "1", name: "BTC", type: "crypto" },
  { id: "2", name: "AAPL", type: "stock" },
  { id: "3", name: "GBP", type: "fiat" },
];

// Prices mock data
export const prices: PricesInterface[] = [
  // Bitcoin (BTC) price for the last 6 months
  { id: "1", asset: "BTC", price: 29000, asOf: "2023-06-01" },
  { id: "2", asset: "BTC", price: 29500, asOf: "2023-06-11" },
  { id: "3", asset: "BTC", price: 30000, asOf: "2023-06-21" },
  { id: "4", asset: "BTC", price: 31000, asOf: "2023-07-01" },
  { id: "5", asset: "BTC", price: 32000, asOf: "2023-07-11" },
  { id: "6", asset: "BTC", price: 33000, asOf: "2023-07-21" },
  { id: "7", asset: "BTC", price: 32500, asOf: "2023-08-01" },
  { id: "8", asset: "BTC", price: 33500, asOf: "2023-08-11" },
  { id: "9", asset: "BTC", price: 34000, asOf: "2023-08-21" },
  { id: "10", asset: "BTC", price: 34500, asOf: "2023-09-01" },
  { id: "11", asset: "BTC", price: 35500, asOf: "2023-09-11" },
  { id: "12", asset: "BTC", price: 36000, asOf: "2023-09-21" },
  { id: "13", asset: "BTC", price: 37000, asOf: "2023-10-01" },

  // Apple (AAPL) price for the last 6 months
  { id: "14", asset: "AAPL", price: 150, asOf: "2023-06-01" },
  { id: "15", asset: "AAPL", price: 155, asOf: "2023-06-11" },
  { id: "16", asset: "AAPL", price: 160, asOf: "2023-06-21" },
  { id: "17", asset: "AAPL", price: 155, asOf: "2023-07-01" },
  { id: "18", asset: "AAPL", price: 165, asOf: "2023-07-11" },
  { id: "19", asset: "AAPL", price: 170, asOf: "2023-07-21" },
  { id: "20", asset: "AAPL", price: 175, asOf: "2023-08-01" },
  { id: "21", asset: "AAPL", price: 180, asOf: "2023-08-11" },
  { id: "22", asset: "AAPL", price: 185, asOf: "2023-08-21" },
  { id: "23", asset: "AAPL", price: 190, asOf: "2023-09-01" },
  { id: "24", asset: "AAPL", price: 200, asOf: "2023-09-11" },
  { id: "25", asset: "AAPL", price: 205, asOf: "2023-09-21" },
  { id: "26", asset: "AAPL", price: 210, asOf: "2023-10-01" },

  // British Pound (GBP) price for the last 6 months
  { id: "27", asset: "GBP", price: 1, asOf: "2023-06-01" },
  { id: "28", asset: "GBP", price: 1.02, asOf: "2023-06-11" },
  { id: "29", asset: "GBP", price: 1.03, asOf: "2023-06-21" },
  { id: "30", asset: "GBP", price: 1.05, asOf: "2023-07-01" },
  { id: "31", asset: "GBP", price: 1.06, asOf: "2023-07-11" },
  { id: "32", asset: "GBP", price: 1.08, asOf: "2023-07-21" },
  { id: "33", asset: "GBP", price: 1.1, asOf: "2023-08-01" },
  { id: "34", asset: "GBP", price: 1.12, asOf: "2023-08-11" },
  { id: "35", asset: "GBP", price: 1.13, asOf: "2023-08-21" },
  { id: "36", asset: "GBP", price: 1.14, asOf: "2023-09-01" },
  { id: "37", asset: "GBP", price: 1.16, asOf: "2023-09-11" },
  { id: "38", asset: "GBP", price: 1.18, asOf: "2023-09-21" },
  { id: "39", asset: "GBP", price: 1.2, asOf: "2023-10-01" },
];

// Portfolio mock data
export const portfolios: PortfolioInterface[] = [
  {
    id: "1",
    totalValue: 31000,
    asOf: "2023-01-01",
    positions: [
      { id: 1, asset: "BTC", quantity: 1, value: 29000, asOf: "2023-01-01" },
      { id: 2, asset: "AAPL", quantity: 10, value: 1000, asOf: "2023-01-01" },
      { id: 3, asset: "GBP", value: 1000, asOf: "2023-01-01" },
    ],
  },
  {
    id: "2",
    totalValue: 32500,
    asOf: "2023-02-01",
    positions: [
      { id: 1, asset: "BTC", quantity: 1, value: 30000, asOf: "2023-02-01" },
      { id: 2, asset: "AAPL", quantity: 10, value: 1000, asOf: "2023-02-01" },
      { id: 3, asset: "GBP", value: 1500, asOf: "2023-02-01" },
    ],
  },
  {
    id: "3",
    totalValue: 34000,
    asOf: "2023-03-01",
    positions: [
      { id: 1, asset: "BTC", quantity: 1, value: 31000, asOf: "2023-03-01" },
      { id: 2, asset: "AAPL", quantity: 10, value: 1000, asOf: "2023-03-01" },
      { id: 3, asset: "GBP", value: 2000, asOf: "2023-03-01" },
    ],
  },
  {
    id: "4",
    totalValue: 35500,
    asOf: "2023-04-01",
    positions: [
      { id: 1, asset: "BTC", quantity: 1, value: 32000, asOf: "2023-04-01" },
      { id: 2, asset: "AAPL", quantity: 10, value: 1000, asOf: "2023-04-01" },
      { id: 3, asset: "GBP", value: 2500, asOf: "2023-04-01" },
    ],
  },
  {
    id: "5",
    totalValue: 37500,
    asOf: "2023-05-01",
    positions: [
      { id: 1, asset: "BTC", quantity: 1, value: 33000, asOf: "2023-05-01" },
      { id: 2, asset: "AAPL", quantity: 10, value: 1000, asOf: "2023-05-01" },
      { id: 3, asset: "GBP", value: 3500, asOf: "2023-05-01" },
    ],
  },
  {
    id: "6",
    totalValue: 40000,
    asOf: "2023-06-01",
    positions: [
      { id: 1, asset: "BTC", quantity: 1, value: 34000, asOf: "2023-06-01" },
      { id: 2, asset: "AAPL", quantity: 10, value: 1000, asOf: "2023-06-01" },
      { id: 3, asset: "GBP", value: 4000, asOf: "2023-06-01" },
    ],
  },
];
