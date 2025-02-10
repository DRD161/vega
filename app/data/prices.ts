export interface PricesInterface {
  id: string;
  asset: string;
  price: number;
  asOf: string;
}

export const prices: PricesInterface[] = [
  { id: "1", asset: "BTC", price: 29000, asOf: "2024-06-01" },
  { id: "2", asset: "BTC", price: 29500, asOf: "2024-06-11" },
  { id: "3", asset: "BTC", price: 30000, asOf: "2024-06-21" },
  { id: "4", asset: "BTC", price: 31000, asOf: "2024-07-01" },
  { id: "5", asset: "BTC", price: 32000, asOf: "2024-07-11" },
  { id: "6", asset: "BTC", price: 33000, asOf: "2024-07-21" },
  { id: "7", asset: "BTC", price: 32500, asOf: "2024-08-01" },

  { id: "20", asset: "AAPL", price: 150, asOf: "2024-06-01" },
  { id: "21", asset: "AAPL", price: 155, asOf: "2024-06-11" },
  { id: "22", asset: "AAPL", price: 160, asOf: "2024-06-21" },
  { id: "23", asset: "AAPL", price: 155, asOf: "2024-07-01" },
  { id: "24", asset: "AAPL", price: 165, asOf: "2024-07-11" },
  { id: "25", asset: "AAPL", price: 170, asOf: "2024-07-21" },
  { id: "26", asset: "AAPL", price: 175, asOf: "2024-08-01" },

  { id: "39", asset: "GBP", price: 1, asOf: "2024-06-01" },
  { id: "40", asset: "GBP", price: 1.02, asOf: "2024-06-11" },
  { id: "41", asset: "GBP", price: 1.03, asOf: "2024-06-21" },
  { id: "42", asset: "GBP", price: 1.05, asOf: "2024-07-01" },
  { id: "43", asset: "GBP", price: 1.06, asOf: "2024-07-11" },
  { id: "44", asset: "GBP", price: 1.08, asOf: "2024-07-21" },
  { id: "45", asset: "GBP", price: 1.1, asOf: "2024-08-01" },
];
