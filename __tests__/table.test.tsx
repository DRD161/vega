import { render, screen } from "@testing-library/react";
import TableComponent from "@/components/TableComponent";
import { PortfolioInterface } from "@/app/data/portfolio";
import { fetchChartData } from "@/lib/utils";
import "@testing-library/jest-dom";

jest.mock("@/components/DateSelect", () => {
  const MockDateSelect = () => <div data-testid="mock-date-select"></div>;
  MockDateSelect.displayName = "MockDateSelect";
  return MockDateSelect;
});

// Mock fetchChartData
jest.mock("@/lib/utils", () => ({
  ...jest.requireActual("@/lib/utils"),
  fetchChartData: jest.fn(),
}));

const portfolios: PortfolioInterface[] = [
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
];

describe("TableComponent", () => {
  it("renders the table with data", async () => {
    (fetchChartData as jest.Mock).mockResolvedValue(portfolios);

    render(<TableComponent data={portfolios} />);

    // Flatten the asset data to count how many times each asset appears
    const assets = portfolios.flatMap((portfolio) =>
      portfolio.positions.map((position) => position.asset),
    );

    // Verify that each asset appears the correct number of times
    assets.forEach((asset) => {
      const assetRows = screen.getAllByText(asset);
      expect(assetRows).toHaveLength(assets.filter((a) => a === asset).length);
    });
  });

  it("does not render the table when data is null", () => {
    render(<TableComponent data={null} />);

    expect(screen.queryByTestId("tableComponent")).not.toBeInTheDocument();
  });
});
