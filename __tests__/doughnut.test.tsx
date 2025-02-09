import { render, screen, waitFor } from "@testing-library/react";
import DoughnutChart from "@/components/DoughnutChart";
import { PortfolioInterface, portfolios } from "@/app/data/portfolio";
import "@testing-library/jest-dom";

jest.mock("react-chartjs-2", () => ({
  Doughnut: (props: PortfolioInterface[]) => (
    <div data-testid="doughnutChart" {...props} />
  ),
}));

describe("DoughnutChart Component", () => {
  it("renders the chart", async () => {
    render(<DoughnutChart data={portfolios} />);

    const doughnutChart = screen.getByTestId("doughnutChart");
    expect(doughnutChart).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/portfolio balance/i)).toBeInTheDocument();
      expect(
        screen.getByText(
          /Click an asset in the legend to view the balance for that asset/i,
        ),
      ).toBeInTheDocument();
    });
  });
});
