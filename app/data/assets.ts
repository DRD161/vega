export interface AssetsInterface {
  id: string;
  name: string;
  type: string;
}

export const assets: AssetsInterface[] = [
  { id: "1", name: "BTC", type: "crypto" },
  { id: "2", name: "AAPL", type: "stock" },
  { id: "3", name: "GBP", type: "fiat" },
];
