export interface PricesInterface {
  id: string;
  asset: string;
  price: number;
  asOf: string;
}

export const prices: PricesInterface[] = [
  // Bitcoin (BTC) over 6 months
  { id: "1", asset: "BTC", price: 29000, asOf: "2024-06-01" },
  { id: "2", asset: "BTC", price: 29500, asOf: "2024-06-11" },
  { id: "3", asset: "BTC", price: 30000, asOf: "2024-06-21" },
  { id: "4", asset: "BTC", price: 31000, asOf: "2024-07-01" },
  { id: "5", asset: "BTC", price: 32000, asOf: "2024-07-11" },
  { id: "6", asset: "BTC", price: 33000, asOf: "2024-07-21" },
  { id: "7", asset: "BTC", price: 32500, asOf: "2024-08-01" },
  { id: "8", asset: "BTC", price: 33500, asOf: "2024-08-11" },
  { id: "9", asset: "BTC", price: 34000, asOf: "2024-08-21" },
  { id: "10", asset: "BTC", price: 34500, asOf: "2024-09-01" },
  { id: "11", asset: "BTC", price: 35500, asOf: "2024-09-11" },
  { id: "12", asset: "BTC", price: 36000, asOf: "2024-09-21" },
  { id: "13", asset: "BTC", price: 37000, asOf: "2024-10-01" },
  { id: "14", asset: "BTC", price: 37500, asOf: "2024-10-11" },
  { id: "15", asset: "BTC", price: 38000, asOf: "2024-10-21" },
  { id: "16", asset: "BTC", price: 39000, asOf: "2024-11-01" },
  { id: "17", asset: "BTC", price: 40000, asOf: "2024-11-11" },
  { id: "18", asset: "BTC", price: 41000, asOf: "2024-11-21" },
  { id: "19", asset: "BTC", price: 42000, asOf: "2024-12-01" },

  // Apple (AAPL) over 6 months
  { id: "20", asset: "AAPL", price: 150, asOf: "2024-06-01" },
  { id: "21", asset: "AAPL", price: 155, asOf: "2024-06-11" },
  { id: "22", asset: "AAPL", price: 160, asOf: "2024-06-21" },
  { id: "23", asset: "AAPL", price: 155, asOf: "2024-07-01" },
  { id: "24", asset: "AAPL", price: 165, asOf: "2024-07-11" },
  { id: "25", asset: "AAPL", price: 170, asOf: "2024-07-21" },
  { id: "26", asset: "AAPL", price: 175, asOf: "2024-08-01" },
  { id: "27", asset: "AAPL", price: 180, asOf: "2024-08-11" },
  { id: "28", asset: "AAPL", price: 185, asOf: "2024-08-21" },
  { id: "29", asset: "AAPL", price: 190, asOf: "2024-09-01" },
  { id: "30", asset: "AAPL", price: 200, asOf: "2024-09-11" },
  { id: "31", asset: "AAPL", price: 205, asOf: "2024-09-21" },
  { id: "32", asset: "AAPL", price: 210, asOf: "2024-10-01" },
  { id: "33", asset: "AAPL", price: 220, asOf: "2024-10-11" },
  { id: "34", asset: "AAPL", price: 230, asOf: "2024-10-21" },
  { id: "35", asset: "AAPL", price: 240, asOf: "2024-11-01" },
  { id: "36", asset: "AAPL", price: 250, asOf: "2024-11-11" },
  { id: "37", asset: "AAPL", price: 260, asOf: "2024-11-21" },
  { id: "38", asset: "AAPL", price: 270, asOf: "2024-12-01" },

  // British Pound (GBP) over 6 months
  { id: "39", asset: "GBP", price: 1, asOf: "2024-06-01" },
  { id: "40", asset: "GBP", price: 1.02, asOf: "2024-06-11" },
  { id: "41", asset: "GBP", price: 1.03, asOf: "2024-06-21" },
  { id: "42", asset: "GBP", price: 1.05, asOf: "2024-07-01" },
  { id: "43", asset: "GBP", price: 1.06, asOf: "2024-07-11" },
  { id: "44", asset: "GBP", price: 1.08, asOf: "2024-07-21" },
  { id: "45", asset: "GBP", price: 1.1, asOf: "2024-08-01" },
  { id: "46", asset: "GBP", price: 1.12, asOf: "2024-08-11" },
  { id: "47", asset: "GBP", price: 1.13, asOf: "2024-08-21" },
  { id: "48", asset: "GBP", price: 1.14, asOf: "2024-09-01" },
  { id: "49", asset: "GBP", price: 1.16, asOf: "2024-09-11" },
  { id: "50", asset: "GBP", price: 1.18, asOf: "2024-09-21" },
  { id: "51", asset: "GBP", price: 1.2, asOf: "2024-10-01" },
  { id: "52", asset: "GBP", price: 1.22, asOf: "2024-10-11" },
  { id: "53", asset: "GBP", price: 1.24, asOf: "2024-10-21" },
  { id: "54", asset: "GBP", price: 1.26, asOf: "2024-11-01" },
  { id: "55", asset: "GBP", price: 1.28, asOf: "2024-11-11" },
  { id: "56", asset: "GBP", price: 1.3, asOf: "2024-11-21" },
  { id: "57", asset: "GBP", price: 1.32, asOf: "2024-12-01" },
];
